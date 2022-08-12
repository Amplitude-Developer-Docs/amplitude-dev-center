---
title: Go SDK (Alpha)
description: The Amplitude Go SDK installation and quick start guide.
icon: fontawesome/brands/golang
---

!!!info "SDK Resources"
    - [Go SDK Repository :material-github:](https://github.com/amplitude/analytics-go)
    - [Go SDK Releases :material-code-tags-check:](https://github.com/amplitude/analytics-go/releases)

--8<-- "includes/no-ampli.md"

The Go SDK lets you send events to Amplitude. This library is open-source, check it out on [GitHub](https://github.com/amplitude/analytics-go).

## Getting Started

### Installation

Install `Amplitude-Go` for analytics:

```bash
go get https://github.com/amplitude/analytics-go
```

## Usage

### Initializing SDK

Initialization is necessary before any instrumentation is done. The API key for your Amplitude project is required to construct a Config struct. Use that Config struct to initialize a client struct which implements Client interface. It can be used across requests after it is initialized. See the example in next Configuration section. 

### Configuration

```GO
package main

import (
	"github.com/amplitude/analytics-go/amplitude"
)

func main() {
	// Create a Config struct
	config := amplitude.NewConfig("your-api-key")
	// Modify your configuration if necessary
	config.FlushQueueSize = 200

	// Pass a Config struct
	// to initialize a client struct
	// which implements Client interface
	client := amplitude.NewClient(config)
}

```

Set your configuration before a client is initialized.

| <div class="big-column">Name</div> | Description  |
| --- | --- |
| `APIKey` | Required. string. The API key of the Amplitude project. Events sent by the client struct can be found under this project. Set when you initialize the client struct. |
| `FlushQueueSize` | int. Events wait in the buffer and are sent in a batch. The buffer is flushed when the number of events reaches `FlushQueueSize`. Defaults to 200.|
| `FlushInterval` | time.Duration. Events wait in the buffer and are sent in a batch. The buffer is flushed every `FlushInterval`. Defaults to 10 seconds.|
| `Logger` | Logger interface. The logger used by Amplitude client. Defaults to using a wrapper of [Go standard Logger](https://pkg.go.dev/log#Logger): `log.Logger`. |
| `ServerURL` | string. The API endpoint URL that events are sent to. Automatically selected by `ServerZone` and `UseBatch`. If this field is set with a string value instead of `nil`, then `ServerZone` and `UseBatch` are ignored and the string value is used. Defaults to the HTTP API V2 endpoint. |
| `Storage` | Storage interface. Used to create storage struct to hold events in the storage buffer. Events in storage buffer are waiting to be sent. Defaults to `InMemoryStorage`. |
| `OptOut`  | bool. Opt out option. If set to `true`, client doesn't process and send events. Defaults to `false`. |

### Track an event

Events represent how users interact with your application. For example, “Button Clicked” may be an action you want to note.

```Go
	// Track a basic event
	// EventOne of UserID and DeviceID is required as well as EventType
	client.Track(amplitude.Event{
		EventType:    "Button Clicked",
		EventOptions: amplitude.EventOptions{UserID: "user-id"},
	})

	// Track events with optional properties
	client.Track(amplitude.Event{
		EventType: "Button Clicked",
		EventOptions: amplitude.EventOptions{
			UserID:   "user-id",
			DeviceID: "device-id",
		},
		EventProperties: map[string]interface{}{"source": "notification"},
	})
```

### User Properties

User properties help you understand your users at the time they perform some action within your app such as their device details, their preferences, or language.

Identify is for setting the user properties of a particular user without sending any event. The SDK supports the operations `Set`, `SetOnce`, `Unset`, `Add`, `Append`, `Prepend`, `PreInsert`, `PostInsert`,`Remove`, and `ClearAll` on individual user properties. The operations are declared as Identify struct methods. Multiple operations can be chained together in a single Identify struct. The Identify struct is then passed to the Amplitude client to send to the server.

!!!info "Important Note"
    If the Identify call is sent after the event, the results of operations will be visible immediately in the dashboard user’s profile area, but it will not appear in chart result until another event is sent after the Identify call. So the identify call only affects events going forward. More details [here](https://amplitude.zendesk.com/hc/en-us/articles/115002380567-User-Properties-Event-Properties#applying-user-properties-to-events).

#### Setting a User Property

The Identify struct provides controls over setting user properties. An Identify struct must first be instantiated, then Identify methods can be called on it, and finally the client will make a call with the Identify struct.

```Go
identifyObj := amplitude.Identify{}
client.Identify(identifyObj, amplitude.EventOptions{UserID: "user-id"})
```

#### Identify.Set

This method sets the value of a user property. For example, you can set a role property of a user.

```Go
identifyObj := amplitude.Identify{}
identifyObj.Set("location", "LAX")
client.Identify(identifyObj, amplitude.EventOptions{UserID: "user-id"})

```

#### Identify.SetOnce

This method sets the value of a user property only once. Subsequent calls using `SetOnce()` will be ignored. For example, you can set an initial login method for a user and since only the initial value is tracked, `SetOnce()` ignores subsequent calls.

```Go
identifyObj := amplitude.Identify{}
identifyObj.SetOnce("initial-location", "SFO")
client.Identify(identifyObj, amplitude.EventOptions{UserID: "user-id"})
```

#### Identify.Add

This method increments a user property by some numerical value. If the user property does not have a value set yet, it will be initialized to 0 before being incremented.  For example, you can track a user's travel count.

```Go
identifyObj := amplitude.Identify{}
identifyObj.Add("travel-count", 1)
client.Identify(identifyObj, amplitude.EventOptions{UserID: "user-id"})
```

#### Arrays in User Properties

Arrays can be used as user properties. You can directly set arrays or use `Prepend()`, `Append()`, `PreInsert()` and `PostInsert()` to generate an array.

#### Identify.Prepend

This method prepends a value or values to a user property array. If the user property does not have a value set yet, it will be initialized to an empty list before the new values are prepended.

```Go
identifyObj := amplitude.Identify{}
identifyObj.Prepend("visited-locations", "LAX")
client.Identify(identifyObj, amplitude.EventOptions{UserID: "user-id"})
```

#### Identify.Append

This method appends a value or values to a user property array. If the user property does not have a value set yet, it will be initialized to an empty list before the new values are appended.

```Go
identifyObj := amplitude.Identify{}
identifyObj.Append("visited-locations", "SFO")
client.Identify(identifyObj, amplitude.EventOptions{UserID: "user-id"})
```

#### Identify.PreInsert

This method pre-inserts a value or values to a user property, if it does not exist in the user property yet. Pre-insert means inserting the value(s) at the beginning of a given list. If the user property does not have a value set yet, it will be initialized to an empty list before the new values are pre-inserted. If the user property has an existing value, it will be no operation.

```Go
identifyObj := amplitude.Identify{}
identifyObj.PreInsert("unique-locations", "LAX")
client.Identify(identifyObj, amplitude.EventOptions{UserID: "user-id"})
```

#### Identify.PostInsert

This method post-inserts a value or values to a user property, if it does not exist in the user property yet. Post-insert means inserting the value(s) at the end of a given list. If the user property does not have a value set yet, it will be initialized to an empty list before the new values are post-inserted. If the user property has an existing value, it will be no operation.

```Go
identifyObj := amplitude.Identify{}
identifyObj.PostInsert("unique-locations", "SFO")
client.Identify(identifyObj, amplitude.EventOptions{UserID: "user-id"})
```

#### Identify.Remove

This method removes a value or values to a user property, if it exists in the user property. Remove means remove the existing value(s) from the given list. If the item does not exist in the user property, it will be no operation.

```Go
identifyObj := amplitude.Identify{}
identifyObj.Remove("unique-locations", "JFK")
client.Identify(identifyObj, amplitude.EventOptions{UserID: "user-id"})
```

### User Groups

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

Amplitude supports assigning users to groups and performing queries such as Count by Distinct on those groups. An example would be if you want to group your users based on what organization they are in by using an 'orgId'. You can designate Joe to be in 'orgId' '10' while Sue is in 'orgId' '15'. When performing a query in our Event Segmentation chart, you can then select "..performed by" 'orgId' to query the number of different organizations that have performed a specific event. As long as at least one member of that group has performed the specific event, that group will be included in the count.

When setting groups, you will need to define a groupType and groupName(s). In the above example, 'orgId' is the groupType and the values '10' and '15' are groupName(s). Another example of a groupType could be 'sport' with groupName(s) like 'tennis' and 'baseball'. You can use `SetGroup()` to designate which groups a user belongs to. Note: This will also set the 'groupType:groupName' as a user property. This will overwrite any existing groupName value set for that user's groupType, as well as the corresponding user property value. `groupType` is a string and `groupName` is an array of strings to indicate a user being in one group or in multiple groups (for example, if Joe is in 'orgId' '10' and '16', then the groupName would be '[10, 16]'). Here is what your code might look like.

```Go
// set group with single group name
client.SetGroup("org-id", []string{"15"}, amplitude.EventOptions{UserID: "user-d"})

// set group with multiple group names
client.SetGroup("org-id", []string{"15", "21"}, amplitude.EventOptions{UserID: "user-d"})
```

Event level groups are set by `Groups` attribute of events

```Go
// set groups when initial an Event struct
event := amplitude.Event{
		EventType:       "event-type",
		EventOptions:    amplitude.EventOptions{UserID: "user-id"},
		Groups: map[string][]string{"org-id": []string{"15", "21"}},
	}

// set groups for an existing Event struct
event.Groups["Sport"] = []string{"soccer"}

client.Track(event)
```

### Group Properties

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

Use the Group Identify API to set or update properties of particular groups. However, these updates will only affect events going forward.

The `GroupIdentify()` method accepts a group type and group name string parameter, as well as an Identify struct that will be applied to the group.

```Go
identifyObj := amplitude.Identify{}
identifyObj.Set("local", "en-us")
client.GroupIdentify("org-id", []string{"15"}, identifyObj, amplitude.EventOptions{})
```

### Revenue Tracking

The preferred method of tracking revenue for a user is to use `Revenue()` in conjunction with the provided Revenue interface. Revenue struct will store each revenue transaction and allow you to define several special revenue properties (such as 'RevenueType', 'ProductID', etc.) that are used in Amplitude's Event Segmentation and Revenue LTV charts. These Revenue struct are then passed into `Revenue` to send as revenue events to Amplitude. This allows us to automatically display data relevant to revenue in the platform. You can use this to track both in-app and non-in-app purchases.

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
ProductID (optional) | string | An identifier for the product. We recommend something like the Google Play Store product ID. | ""
Quantity (optional) | int| The quantity of products purchased. Note: Revenue = Quantity * Price | 0
Price (optional *required for revenue data if the revenue field isn't set) | float64 | The price of the products purchased. You can use negative values to indicate refunds. Note: Revenue = Quantity * Price | 0
RevenueType (optional) | string| The type of revenue (e.g. tax, refund, income). | ""
Receipt (optional) | string| The receipt identifier of the revenue. | ""
ReceiptSig (optional) | string| The receipt signature of the revenue. | ""
Properties (optional) | map[string]interface{}| An map of event properties to include in the revenue event.| nil
Revenue (optional) | float64 | Use negative values to indicate refunds. Note: Revenue = Quantity * Price | 0

### Flush

The `Flush` method triggers the client to send buffered events.

```Go
client.Flush()
```

### Shutdown

`Shutdown` method closes the client struct. Closed client struct will not accepting new events and will try to flush events left in buffer. Then the client struct will shutdown running threads.

```Go
client.Shutdown()
```

## Amplitude SDK Plugin

Plugins allow you to extend Amplitude SDK's behavior by, for example, modifying event properties (enrichment type) or sending to a third-party APIs (destination type). A plugin is struct with methods `Setup()` and `Execute()`.

### Client.Add

The `Add` method adds a plugin to Amplitude client struct. Plugins can help processing and sending events. [Learn more about plugins](#amplitude-sdk-plugin).

```Go
client.Add(pluginObj)
```

### Client.Remove

The `Remove` method removes the given plugin from the client struct if exists.

```Go
client.Remove(pluginObj)
```

### Plugin.Setup

This method contains logic for preparing the plugin for use and has `Config` struct as a parameter. The expected return value is `nil`. A typical use for this method, is to copy configuration from `Config` or instantiate plugin dependencies. This method is called when the plugin is registered to the client via `client.Add()`.

### Plugin.Execute

This method contains the logic for processing events and has `*Event` as parameter. If used as enrichment type plugin, the expected return value is the modified/enriched event; while if used as a destination type plugin, the expected return value is `nil`. This method is called for each event, including Identify, GroupIdentify and Revenue events, that is instrumented using the client interface.

### Plugin Examples

#### Enrichment Type Plugin

Here's an example of a plugin that modifies each event that is instrumented by adding an increment integer to `EventID` property of an event.

```Go
package main

import "github.com/amplitude/analytics-go/amplitude"

type addEventIDPlugin struct {
	currentID int
	config    amplitude.Config
}

func (plugin *addEventIDPlugin) Setup(config amplitude.Config) {
	plugin.config = config
}

func (plugin *addEventIDPlugin) Type() amplitude.PluginType {
	return amplitude.ENRICHMENT
}

func (plugin *addEventIDPlugin) Execute(event *amplitude.Event) *amplitude.Event {
	event.EventID = plugin.currentID
	plugin.currentID += 1
	return event
}

func main() {
	config := amplitude.NewConfig("your-api-key")
	client := amplitude.NewClient(config)
	client.Add(&addEventIDPlugin{})
}

```

#### Destination Type Plugin

```Go
type myDestinationPlugin struct{
	url string
	config amplitude.Config
}

func (plugin *myDestinationPlugin) Setup(config amplitude.Config) {
	plugin.config = config
}

func (plugin *myDestinationPlugin) Execute(event *amplitude.Event) {
	payload := map[string]interface{}{"key": "secret", "events":event}
	payloadBytes, err := json.Marshal(payload)
	
	if err != nil{
		plugin.config.Logger.Error("Event encoding failed: ", err)
	}

	request, err := http.NewRequest("POST", plugin.config.ServerURL, bytes.NewReader(payloadBytes))
	if err != nil {
		plugin.config.Logger.Error("Building new request failed", err)
	}
	
	httpClient := http.Client{}

	response, err := httpClient.Do(request)
	if err != nil {
		plugin.config.Logger.Error("HTTP request failed", err)
	}

	plugin.config.Logger.Info("HTTP request response", response)

	defer response.Body.Close()
}

config := amplitude.NewConfig("your-api-key")
client := amplitude.NewClient(config)
client.Add(&myDestinationPlugin{})
```
