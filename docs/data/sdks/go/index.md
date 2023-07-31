---
title: Go SDK
description: The Amplitude Go SDK installation and quick start guide.
icon: simple/go
---

The Go SDK lets you send events to Amplitude. This library is open-source, check it out on [GitHub](https://github.com/amplitude/analytics-go).

!!!info "Go SDK Resources"
    [:material-github: GitHub](https://github.com/amplitude/analytics-go) · [:material-code-tags-check: Releases](https://github.com/amplitude/analytics-go/releases) · [:material-book: API Reference](https://pkg.go.dev/github.com/amplitude/analytics-go/amplitude)

--8<-- "includes/ampli-vs-amplitude.md"
    Click here for more documentation on [Ampli for Go](./ampli.md).

## Getting started

Use [this quickstart guide](../../sdks/sdk-quickstart#go) to get started with Amplitude Go SDK.

## Usage

### Initialize the SDK

You must initialize the SDK before you can instrument any events. The API key for your Amplitude project is required to construct a Config `struct`. Use that Config `struct` to initialize a client `struct` which implements Client interface. You can use it across requests after it's initialized. See examples in the next section. 

### Configuration

???config "Configuration Options"
    | <div class="big-column">Name</div>  | Description | Default Value |
    | --- | --- | --- |
    | `APIKey` | Required. `string`. The API key of the Amplitude project. Events sent by the Client `struct` are in this project. Set when you initialize the Client `struct`. | `nil` |
    | `FlushQueueSize` | `int`. Events wait in the buffer and are sent in a batch. The buffer is flushed when the number of events reaches `FlushQueueSize`. |`200` |
    | `FlushInterval` | `time.Duration`. Events wait in the buffer and are sent in a batch. The buffer is flushed every `FlushInterval`. | `10 seconds` |
    | `FlushMaxRetries` | `int`. The number of times the client retries an event when the request returns an error. | `12` |
    | `RetryBaseInterval` | `time.Duration`. Base interval between retries when the request returns an error. | `100 milliseconds`|
    | `RetryThrottledInterval` | `time.Duration`. Base interval between retries for throttled requests. | `30 seconds` |
    | `Logger` | Logger interface. The logger used by Amplitude client. | `[Go standard Logger](https://pkg.go.dev/log#Logger): log.Logger.`|
    | `ServerZone` | `string`. The server zone of the projects. Supports EU and US. For EU data residency, change to EU. | `US` |
    | `ServerURL` | `string`. The API endpoint URL that events are sent to. Automatically selected by `ServerZone` and `UseBatch`. If this field is set, then `ServerZone` and `UseBatch` are ignored and the string value is used. | `https://api2.amplitude.com/2/httpapi` |
    | `UseBatch` | `boolean`. Whether to use [batch api](../../../analytics/apis/batch-event-upload-api/#batch-event-upload). By default, the SDK will use the default `serverUrl`. | `false` |   
    | `StorageFactory` | `function`. Used to create storage struct to hold events in the storage buffer. Events in storage buffer are waiting to be sent. | `InMemoryStorage` |
    | `OptOut` | `bool`. Opt out option. If set to `true`, client doesn't process and send events.| `false` |
    | `ConnectionTimeout` | `time.Duration`. A time limit for API requests. | `10 seconds` |
    | `MaxStorageCapacity` | `int`. The maximum count of pending events in the storage.  | `20000` |
    | `MinIDLength` | `int`. The minimum length of user_id and device_id. | `5` |
    | `ExecuteCallback`| `function`. Client level callback function. | `nil` |

Set your configuration before a client is initialized.

#### Configure batching behavior

To support high performance environments, the SDK sends events in batches. Every event logged by `track` method is queued in memory. Events are flushed in batch in background. You can customize batch behavior with `FlushQueueSize` and `FlushInterval`. By default, the SDK is in regular mode with `serverUrl` to `https://api2.amplitude.com/2/httpapi`. For customers who want to send large batches of data at a time, switch to batch mode by setting `UseBatch` to `true` to set setServerUrl to batch event upload API `https://api2.amplitude.com/batch`. Both the regular mode and the batch mode use the same flush queue size and flush intervals.

```GO
package main

import (
    "github.com/amplitude/analytics-go/amplitude"
)

func main() {
    // Create a Config struct
    config := amplitude.NewConfig("your-api-key")
    
    // Events queued in memory will flush when number of events exceed upload threshold
    // Default value is 200
    config.FlushQueueSize = 100
    // Events queue will flush every certain milliseconds based on setting
    // Default value is 10 seconds
    config.FlushInterval = 5000
    // Pass a Config struct
    // to initialize a Client struct
    // which implements Client interface
    client := amplitude.NewClient(config)
}

```

### Track an event

Events represent how users interact with your application. For example, "Button Clicked" may be an action you want to note.

```Go
// Track a basic event
// EventOne of UserID and DeviceID is required as well as EventType
client.Track(amplitude.Event{
    UserID:    "user-id",
    EventType: "Button Clicked",
})

// Track events with optional properties
client.Track(amplitude.Event{
    UserID:    "user-id",
    EventType: "Button Clicked",
    EventProperties: map[string]interface{}{
        "name":       "Checkout",
        "a property": "a value",
    },
    EventOptions: amplitude.EventOptions{
        Price: 1.99,
    },
})
```

### User Properties

User properties help you understand your users at the time they perform some actions within your app such as their device details, their preferences, or languages.

`Identify` is for setting the user properties of a particular user without sending any event. The SDK supports the operations `Set`, `SetOnce`, `Unset`, `Add`, `Append`, `Prepend`, `PreInsert`, `PostInsert`,`Remove`, and `ClearAll` on individual user properties. The operations are declared as `Identify` struct methods. Multiple operations can be chained together in a single `Identify` struct which is then passed to the Amplitude client to send to the server.

!!!info "Important Note"
    If the Identify call is sent after the event, the results of operations will be visible immediately in the dashboard user’s profile area, but it won't  appear in chart result until another event is sent after the Identify call. The identify call only affects events going forward. More details [here](https://amplitude.zendesk.com/hc/en-us/articles/115002380567-User-Properties-Event-Properties#applying-user-properties-to-events).

#### Setting a User Property

`Identify` struct provides controls over setting user properties. An `Identify` struct must first be instantiated, then `Client.Identify()` methods can be called on it.

```Go
identifyObj := amplitude.Identify{}
client.Identify(identifyObj, amplitude.EventOptions{UserID: "user-id"})
```

#### `Identify.Set`

This method sets the value of a user property. For example, you can set a role property of a user.

```Go
identifyObj := amplitude.Identify{}
identifyObj.Set("location", "LAX")
client.Identify(identifyObj, amplitude.EventOptions{UserID: "user-id"})
```

#### `Identify.SetOnce`

This method sets the value of a user property only once. Subsequent calls using `SetOnce()` will be ignored. For example, you can set an initial login method for a user and since only the initial value is tracked, `SetOnce()` ignores subsequent calls.

```Go
identifyObj := amplitude.Identify{}
identifyObj.SetOnce("initial-location", "SFO")
client.Identify(identifyObj, amplitude.EventOptions{UserID: "user-id"})
```

#### `Identify.Add`

This method increments a user property by some numerical value. If the user property doesn't have a value set yet, it will be initialized to 0 before being incremented. For example, you can track a user's travel count.

```Go
identifyObj := amplitude.Identify{}
identifyObj.Add("travel-count", 1)
client.Identify(identifyObj, amplitude.EventOptions{UserID: "user-id"})
```

#### Arrays in user properties

Arrays can be used as user properties. You can directly set arrays or use `Prepend()`, `Append()`, `PreInsert()` and `PostInsert()` to generate an array.

#### `Identify.Prepend`

This method prepends a value or values to a user property array. If the user property doesn't have a value set yet, it will be initialized to an empty list before the new values are prepended.

```Go
identifyObj := amplitude.Identify{}
identifyObj.Prepend("visited-locations", "LAX")
client.Identify(identifyObj, amplitude.EventOptions{UserID: "user-id"})
```

#### `Identify.Append`

This method appends a value or values to a user property array. If the user property doesn't have a value set yet, it will be initialized to an empty list before the new values are appended.

```Go
identifyObj := amplitude.Identify{}
identifyObj.Append("visited-locations", "SFO")
client.Identify(identifyObj, amplitude.EventOptions{UserID: "user-id"})
```

#### `Identify.PreInsert`

This method pre-inserts a value or values to a user property, if it doesn't exist in the user property yet. Pre-insert means inserting the value at the beginning of a given list. If the user property doesn't have a value set yet, it will be initialized to an empty list before the new values are pre-inserted. If the user property has an existing value, it will be no operation.

```Go
identifyObj := amplitude.Identify{}
identifyObj.PreInsert("unique-locations", "LAX")
client.Identify(identifyObj, amplitude.EventOptions{UserID: "user-id"})
```

#### `Identify.PostInsert`

This method post-inserts a value or values to a user property, if it doesn't exist in the user property yet. Post-insert means inserting the value at the end of a given list. If the user property doesn't have a value set yet, it will be initialized to an empty list before the new values are post-inserted. If the user property has an existing value, it will be no operation.

```Go
identifyObj := amplitude.Identify{}
identifyObj.PostInsert("unique-locations", "SFO")
client.Identify(identifyObj, amplitude.EventOptions{UserID: "user-id"})
```

#### `Identify.Remove`

This method removes a value or values to a user property, if it exists in the user property. Remove means remove the existing value from the given list. If the item doesn't exist in the user property, it will be no operation.

```Go
identifyObj := amplitude.Identify{}
identifyObj.Remove("unique-locations", "JFK")
client.Identify(identifyObj, amplitude.EventOptions{UserID: "user-id"})
```

### User groups

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

Amplitude supports assigning users to groups and performing queries such as Count by Distinct on those groups. An example would be if you want to group your users based on what organization they're in by using an 'orgId'. You can designate Joe to be in 'orgId' '10' while Sue is in 'orgId' '15'. When performing a query in Amplitude's Event Segmentation chart, you can then select "..performed by" 'orgId' to query the number of different organizations that have performed a specific event. As long as at least one member of that group has performed the specific event, that group will be included in the count.

When setting groups, you need to define a `groupType` and `groupName`. In the above example, 'orgId' is the `groupType` and each value, '10' and '15', is a `groupName`. Another example of a `groupType` could be 'sport' with `groupName` values like 'tennis' and 'baseball'. You can use `SetGroup()` to designate which groups a user belongs to. Note: This also sets the `groupType:groupName` as a user property. This overwrites any existing `groupName` value set for that user's `groupType`, as well as the corresponding user property value. `groupType` is a string and `groupName` is an array of strings to show that a user being in one group or in multiple groups (for example, if Joe is in 'orgId' '10' and '16', then the `groupName` would be '[10, 16]'). Here is what your code might look like.

```Go
// set group with single group name
client.SetGroup("org-id", []string{"15"}, amplitude.EventOptions{UserID: "user-id"})

// set group with multiple group names
client.SetGroup("org-id", []string{"15", "21"}, amplitude.EventOptions{UserID: "user-id"})
```

Event level groups are set by `Groups` attribute of events

```Go
// set groups when initial an Event struct
event := amplitude.Event{
    UserID:          "user-id",
    EventType:       "event-type",
    Groups: map[string][]string{"org-id": {"15", "21"}},
  }

// set groups for an existing Event struct
event.Groups["Sport"] = []string{"soccer"}

client.Track(event)
```

### Group properties

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

Use the Group Identify API to set or update properties of particular groups. However, these updates will only affect events going forward.

The `GroupIdentify()` method accepts a group type and group name string parameter, as well as an Identify struct that will be applied to the group.

```Go
identifyObj := amplitude.Identify{}
identifyObj.Set("local", "en-us")
client.GroupIdentify("org-id", "15", identifyObj, amplitude.EventOptions{})
```

### Revenue Tracking

The preferred method of tracking revenue for a user is to use `Revenue()` in conjunction with the provided Revenue interface. Revenue `struct` stores each revenue transaction and allow you to define several special revenue properties (such as 'RevenueType' and 'ProductID') that are used in Amplitude's Event Segmentation and Revenue LTV charts. These Revenue struct are then passed into `Revenue` to send as revenue events to Amplitude. This allows Amplitude to automatically display data relevant to revenue in the platform. You can use this to track both in-app and non-in-app purchases.

To track revenue from a user, call `Revenue()` each time a user generates revenue. For example, 3 units of a product was purchased at $3.99.

```Go
revenueObj := amplitude.Revenue{
    Price:       3.99,
    Quantity:    3,
    ProductID:   "com.company.productID",
}
client.Revenue(revenueObj, amplitude.EventOptions{UserID: "user-id"})
```

#### Revenue Interface

Name |  Type  |Description | Default
-----|-------|--------------|--------
ProductID (optional) | string | An identifier for the product. Amplitude recommends something like the Google Play Store product ID. | ""
Quantity (optional) | int| The quantity of products purchased. Note: Revenue = Quantity * Price | 0
Price (optional *required for revenue data if the revenue field isn't set) | float64 | The price of the products purchased. You can use negative values to indicate refunds. Note: Revenue = Quantity * Price | 0
RevenueType (optional) | string| The revenue type (for example, tax, refund, income). | ""
Receipt (optional) | string| The receipt identifier of the revenue. | ""
ReceiptSig (optional) | string| The receipt signature of the revenue. | ""
Properties (optional) | map[string]interface{}| An map of event properties to include in the revenue event.| nil
Revenue (optional) | float64 | Use negative values to indicate refunds. Note: Revenue = Quantity * Price | 0

### Flush

The `Flush` method triggers the client to send buffered events.

```Go
client.Flush()
```

### `Shutdown`

The `Shutdown` method closes the Client `struct`.  A closed Client `struct`  won't accept new events and tries to flush events in the buffer. Then the Client `struct` shuts down running threads.

```Go
client.Shutdown()
```

## Amplitude SDK plugin

Plugins allow you to extend Amplitude SDK's behavior by, for example, modifying event properties (enrichment type) or sending to a third-party APIs (destination type). A plugin is struct with methods `Setup()` and `Execute()`.

### `Client.Add`

The `Add` method adds a plugin to Amplitude Client `struct`. Plugins can help processing and sending events. [Learn more about plugins](#amplitude-sdk-plugin).

```Go
client.Add(pluginObj)
```

### `Client.Remove`

The `Remove` method removes the given plugin from the Client `struct` if exists.

```Go
client.Remove(pluginName)
```

### `Plugin.Setup`

This method contains logic for preparing the plugin for use and has `Config` struct as a parameter. The expected return value is `nil`. A typical use for this method, is to copy configuration from `Config` or instantiate plugin dependencies. This method is called when you register the plugin to the client via `client.Add()`.

### `Plugin.Execute`

This method contains the logic for processing events and has `*Event` as parameter. If used as enrichment type plugin, the expected return value is the modified/enriched event. If used as a destination type plugin, the expected return value is a map with keys: `event` (BaseEvent), `code` (number), and `message` (string). This method is called for each event instrumented using the client interface, including Identify, GroupIdentify and Revenue events.

### Plugin examples

#### Enrichment type plugin

Here's an example of a plugin that modifies each event that's instrumented by adding an increment integer to `EventID` property of an event.

```Go
package main

import "github.com/amplitude/analytics-go/amplitude"

type addEventIDPlugin struct {
    currentID int
    config    amplitude.Config
}

func (plugin *addEventIDPlugin) Name() string {
    return "AddEventId"
}

func (plugin *addEventIDPlugin) Setup(config amplitude.Config) {
    plugin.config = config
}

func (plugin *addEventIDPlugin) Type() amplitude.PluginType {
    return amplitude.PluginTypeEnrichment
}

func (plugin *addEventIDPlugin) Execute(event *amplitude.Event) *amplitude.Event {
    event.EventID = plugin.currentID
    plugin.currentID += 1
    return event
}

func main() {
    config := amplitude.NewConfig("your-api-key")
    client := amplitude.NewClient(config)
    defer client.Shutdown()

    client.Add(&addEventIDPlugin{})
}
```

#### Destination type plugin

Here's an example of a plugin that sends each event that's instrumented to a target server URL.

```Go
package main

import (
    "bytes"
    "encoding/json"
    "net/http"
  
    "github.com/amplitude/analytics-go/amplitude"
)

type myDestinationPlugin struct {
    url        string
    config     amplitude.Config
    httpClient http.Client
}

func (plugin *myDestinationPlugin) Name() string {
    return "MyDestinationPlugin"
}

// Setup is called on plugin installation
func (plugin *myDestinationPlugin) Setup(config amplitude.Config) {
    plugin.config = config
    plugin.httpClient = http.Client{}
}

// Type defines your amplitude.PluginType from:
//  - amplitude.PluginTypeBefore
//  - amplitude.PluginTypeEnrichment
//  - amplitude.PluginTypeDestination
func (plugin *myDestinationPlugin) Type() amplitude.PluginType {
    return amplitude.PluginTypeDestination
}

// Execute is called on each event instrumented
func (plugin *myDestinationPlugin) Execute(event *amplitude.Event) {
    payload := map[string]interface{}{"key": "secret", "events": event}
    payloadBytes, err := json.Marshal(payload)

    if err != nil {
        plugin.config.Logger.Errorf("Event encoding failed: ", err)
    }

    request, err := http.NewRequest("POST", plugin.url, bytes.NewReader(payloadBytes))
    if err != nil {
        plugin.config.Logger.Errorf("Building new request failed", err)
    }

    response, err := plugin.httpClient.Do(request)
    if err != nil {
        plugin.config.Logger.Errorf("HTTP request failed", err)
    } else {
        defer response.Body.Close()
    }
}

func main() {
    config := amplitude.NewConfig("your-api-key")
    client := amplitude.NewClient(config)
    defer client.Shutdown()

    client.Add(&myDestinationPlugin{
        // Change it to your target server URL
        url: "https://custom.domain.com",
    })

    client.Track(amplitude.Event{
        UserID: "user-id",
        EventType: "Button Clicked",
    })
}
```

The example above sends a HTTP POST request with a body as JSON format

```json
{
  "events":
    {
      "event_type":"Button Clicked",
      "user_id":"user-id",
      "time":1660683660056,
      "insert_id":"1c8aac41-8257-4bea-ab3f-de914e39df5e",
      "library":"amplitude-go/0.0.2",
      "plan":{}
    },
  "key":"secret"
}
```
