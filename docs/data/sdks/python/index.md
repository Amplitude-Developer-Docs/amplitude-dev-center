---
title: Python SDK
description: The Amplitude Python SDK installation and quick start guide.
icon: simple/python
---


![PyPI version](https://badge.fury.io/py/amplitude-analytics.svg)

The Python SDK lets you send events to Amplitude. This library is open-source, check it out on [GitHub](https://github.com/amplitude/Amplitude-Python).

!!!info "Python SDK Resources"
    [:material-github: GitHub](https://github.com/amplitude/Amplitude-Python) · [:material-code-tags-check: Releases](https://github.com/amplitude/Amplitude-Python/releases) · [:material-book: API Reference](https://github.com/amplitude/Amplitude-Python)

!!!info "Supported Python Versions"
    The Python SDK supports Python version 3.6+. The Python SDK repository runs tests on all supported versions.

--8<-- "includes/ampli-vs-amplitude.md"

## Getting started

Use [this quickstart guide](../../sdks/sdk-quickstart#python) to get started with Amplitude Python SDK.

## Usage

### Initialize the SDK

You must initialize the SDK before any events are instrumented. The API key for your Amplitude project is required. You can also pass a config object in this call. You can use the SDK client instance across requests after it's initialized.

```Python
from amplitude import Amplitude


client = Amplitude('API_KEY')
```

### Configuration

???config "Configuration Options"
    | <div class="big-column">Name</div>  | Description | Default Value |
    | --- | --- | --- |
    | `api_key` | Required. `String`. The API key of the Amplitude project. Events sent by the client instance are in this project. Set when you initialize the client instance. | `None`|
    | `flush_queue_size` | `Integer`. Events wait in the buffer and are sent in a batch. The buffer is flushed when the number of events reaches `flush_queue_size`. | `200` |
    | `flush_interval_millis` | `Integer`. Events wait in the buffer and are sent in a batch. The buffer is flushed every `flush_interval_millis` milliseconds. | `10 seconds` |
    | `flush_max_retries` | `Integer`. The number of times the client retries an event when the request returns an error. | `12` |
    | `logger` | Logger. The logger instance used by Amplitude client. | `[python built-in logging](https://docs.python.org/3/library/logging.html#logger-objects): logging.getLogger(name)`. |
    | `min_id_length` | `Integer`. The minimum length of `user_id` and `device_id`. | `5` |
    | `callback`  | `Function`. Client level callback function. Takes three parameters:<br> 1. event: a Event instance<br> 2. code: a integer of HTTP response code <br> 3. message: a string message. | `None` |
    | `server_zone` |`String`. The server zone of the projects. Supports `EU` and `US`. For EU data residency, Change to `EU`. | `US` |
    | `server_url` | `String`. The API endpoint URL that events are sent to. Automatically selected by `server_zone` and `use_batch`. If this field is set with a string value instead of `None`, then `server_zone` and `use_batch` are ignored and the string value is used. | `https://api2.amplitude.com/2/httpapi` |
    | `use_batch` | `Boolean`.  Whether to use [batch API](../../../analytics/apis/batch-event-upload-api/#batch-event-upload). By default, the SDK will use the default `serverUrl`. | `False` |
    | `storage_provider` | `StorageProvider`. Used to create storage instance to hold events in the storage buffer. Events in storage buffer are waiting to be sent. | `InMemoryStorageProvider` |
    | `opt_out`  | `Boolean`. Opt out option. If set to `True`, client doesn't process and send events. | `False` |

The SDK accepts an object to configure the SDK's behavior.

```Python
def callback_func(event, code, message=None):
  # callback function that takes three input parameters
  # event: the event that triggered this callback
  # code: status code of request response
  # message: a optional string message for more detailed information

client.configuration.api_key = "new api key"
client.configuration.flush_max_retries = 5
client.configuration.logger = logging.getLogger(__name__)
client.configuration.min_id_length = 7
client.configuration.callback = callback_func
client.configuration.server_zone = "EU"
client.configuration.use_batch = True
client.configuration.server_url = "proxy url that forwarding the requests"
client.configuration.opt_out = False
```

#### Configure batching behavior

To support high performance environments, the SDK sends events in batches. Every event logged by `track` method is queued in memory. Events are flushed in batch in background. You can customize batch behavior with `flush_queue_size` and `flush_interval_millis`. By default, the SDK is in regular mode with `serverUrl` to `https://api2.amplitude.com/2/httpapi`. For customers who want to send large batches of data at a time, switch to batch mode by setting `use_batch` to `true`. Both the regular mode and the batch mode use the same flush queue size and flush intervals.

```Python
from amplitude import Amplitude


client = Amplitude('API_KEY')

# Events queued in memory will flush when number of events exceed upload threshold
# Default value is 200
client.configuration.flush_queue_size = 100
# Events queue will flush every certain milliseconds based on setting
# Default value is 10 milliseconds
client.configuration.flush_interval_millis = 20000 # 20 seconds
```

### Track an event

Events represent how users interact with your application. For example, “Button Clicked” may be an action you want to note.

```python
from amplitude import Amplitude, BaseEvent


client = Amplitude('API_KEY')

# Track a basic event
# One of user_id and device_id is required
event = BaseEvent(event_type="Button Clicked", user_id="User Id")
client.track(event)

# Track events with optional properties
client.track(
    BaseEvent(
        event_type="type of event",
        user_id="USER_ID",
        device_id="DEVICE_ID",
        event_properties={
            "source": "notification"
        }
))
```

### User properties

User properties help you understand your users at the time they performed some action within your app such as their device details, their preferences, or language.

Identify is for setting the user properties of a particular user without sending any event. The SDK supports the operations `set`, `set_once`, `unset`, `add`, `append`, `prepend`, `pre_insert`, `post_insert`, and `remove` on individual user properties. Declare the operations via a provided Identify interface. You can chain multiple operations together in a single Identify object. The Identify object is then passed to the Amplitude client to send to the server.

!!!info "Important Note"

    If the Identify call is sent after the event, the results of operations are visible immediately in the dashboard user’s profile area, but it won't appear in chart result until another event is sent after the Identify call. The identify call only affects events going forward. More details [here](https://amplitude.zendesk.com/hc/en-us/articles/115002380567-User-Properties-Event-Properties#applying-user-properties-to-events).

#### Set a user property

The Identify object provides controls over setting user properties. An Identify object must first be instantiated, then Identify methods can be called on it, and finally the client makes a call with the Identify object.

```Python
from amplitude import Identify, EventOptions


identify_obj=Identify()
client.identify(identify_obj, EventOptions(user_id="USER_ID"))
```

#### `Identify.set`

This method sets the value of a user property. For example, you can set a role property of a user.

```Python
from amplitude import Identify, EventOptions


identify_obj=Identify()
identify_obj.set("location", "LAX")
client.identify(identify_obj, EventOptions(user_id="USER_ID"))
```

#### `Identify.set_once`

This method sets the value of a user property only once. Subsequent calls using `set_once()` will be ignored. For example, you can set an initial login method for a user and since only the initial value is tracked, `set_once()` ignores subsequent calls.

```Python
from amplitude import Identify, EventOptions


identify_obj=Identify()
identify_obj.set_once("initial-location", "SFO")
client.identify(identify_obj, EventOptions(user_id="USER_ID"))
```

#### `Identify.add`

This method increments a user property by some numerical value. If the user property doesn't have a value set yet, it will be initialized to 0 before being incremented. For example, you can track a user's travel count.

```Python
from amplitude import Identify, EventOptions


identify_obj=Identify()
identify_obj.add("travel-count", 1)
client.identify(identify_obj, EventOptions(user_id="USER_ID"))
```

#### Arrays in user properties

You can use arrays as user properties. You can directly set arrays or use `prepend`, `append`, `pre_insert` and `post_insert` to generate an array.

#### `Identify.prepend`

This method prepends a value or values to a user property array. If the user property doesn't have a value set yet, it will be initialized to an empty list before the new values are prepended.

```Python
from amplitude import Identify, EventOptions


identify_obj=Identify()
identify_obj.prepend("visited-locations", "LAX")
client.identify(identify_obj, EventOptions(user_id="USER_ID"))
```

#### `Identify.append`

This method appends a value or values to a user property array. If the user property doesn't have a value set yet, it will be initialized to an empty list before the new values are appended.

```Python
from amplitude import Identify, EventOptions


identify_obj=Identify()
identify_obj.append("visited-locations", "SFO")
client.identify(identify_obj, EventOptions(user_id="USER_ID"))
```

#### `Identify.pre_insert`

This method pre-inserts a value or values to a user property, if it doesn't exist in the user property yet. Pre-insert means inserting the values at the beginning of a given list. If the user property doesn't have a value set yet, it will be initialized to an empty list before the new values are pre-inserted. If the user property has an existing value, it will be no operation.

```Python
from amplitude import Identify, EventOptions


identify_obj=Identify()
identify_obj.pre_insert("unique-locations", "LAX")
client.identify(identify_obj, EventOptions(user_id="USER_ID"))
```

#### `Identify.post_insert`

This method post-inserts a value or values to a user property, if it doesn't exist in the user property yet. Post-insert means inserting the values at the end of a given list. If the user property doesn't have a value set yet, it will be initialized to an empty list before the new values are post-inserted. If the user property has an existing value, it will be no operation.

```Python
from amplitude import Identify, EventOptions


identify_obj=Identify()
identify_obj.post_insert("unique-locations", "SFO")
client.identify(identify_obj, EventOptions(user_id="USER_ID"))
```

#### `Identify.remove`

This method removes a value or values to a user property, if it exists in the user property. Remove means remove the existing value from the given list. If the item doesn't exist in the user property, it will be no operation.

```Python
from amplitude import Identify, EventOptions


identify_obj=Identify()
identify_obj.remove("unique-locations", "JFK")
client.identify(identify_obj, EventOptions(user_id="USER_ID"))
```

### User groups

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

Amplitude supports assigning users to groups and performing queries such as Count by Distinct on those groups. An example would be if you want to group your users based on what organization they're in by using an 'orgId'. You can designate Joe to be in 'orgId' '10' while Sue is in 'orgId' '15'. When performing a query in the Event Segmentation chart, you can then select "..performed by" 'orgId' to query the number of different organizations that have performed a specific event. As long as at least one member of that group has performed the specific event, that group is included in the count.

When setting groups, you need to define a `group_type` and `group_name`. In the previous example, 'orgId' is the `group_type` and each of the values '10' and '15' are a `group_name`. Another example of a `group_type` could be 'sport' with `group_name` values like 'tennis' and 'baseball'. You can use `set_group()` to designate which groups a user belongs to. Note: This also sets the 'group_type:group_name' as a user property. This overwrites any existing `group_name` value set for that user's `group_type`, as well as the corresponding user property value. `group_type` is a string and `group_name` can be either a string or an array of strings to indicate a user being in multiple groups (for example, if Joe is in 'orgId' '10' and '16', then the `group_name` would be '[10, 16]'). Here is what your code might look like.

```Python
# set group with single group name
client.set_group(group_type="org_id", group_name="15", 
                 event_options=EventOptions(user_id="USER_ID")) 

# set group with multiple group names
client.set_group(group_type="org_id", group_name=["15", "21"], 
                 event_options=EventOptions(user_id="USER_ID")) 
```

Event level groups are set by `groups` attribute of events

```Python
# set groups when initial a event instance
event = BaseEvent("event_type", "user_id", groups={"org_id": ["15", "21"]})

# set groups for an existing instance
event["groups"] = {"sport": "soccer"}

client.track(event)
```

### Group properties

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

Use the Group Identify API to set or update properties of particular groups. However, these updates will only affect events going forward.

The `group_identify()` method accepts a group type and group name string parameter, as well as an Identify object that's applied to the group.

```Python
identify_obj=Identify()
identify_obj.set("locale", "en-us")
client.group_identify(group_type="org-id", group_name="15", identify_obj=identify_obj)
```

### Revenue tracking

The preferred method of tracking revenue for a user is to use `revenue()` in conjunction with the provided Revenue interface. Revenue instances store each revenue transaction and allow you to define several special revenue properties, such as `revenue_type` and `product_id`, that are used in Amplitude's Event Segmentation and Revenue LTV charts. These Revenue instance objects are then passed into `revenue` to send as revenue events to Amplitude. This allows Amplitude to automatically display data relevant to revenue in the platform. You can use this to track both in-app and non-in-app purchases.

To track revenue from a user, call revenue each time a user generates revenue. For example, 3 units of a product was purchased at $3.99.

```Python
from amplitude import Revenue


revenue_obj = Revenue(price=3.99,
                      quantity=3,
                      product_id="com.company.productId",
client.revenue(revenue_obj, EventOptions(user_id="USER_ID"))
```

#### Revenue interface

Name |  Type  |Description | Default
-----|-------|--------------|--------
`product_id` (optional) | string | An identifier for the product. Amplitude recommends something like the Google Play Store product ID. | null
quantity *(required)* | int| The quantity of products purchased. Note: revenue = quantity * price | 1
price *(required)* | Double | The price of the products purchased, and this can be negative. Note: revenue = quantity * price | null
`revenue_type` (optional, *required for revenue verification*) | String| The revenue type (for example, tax, refund, income). | null
receipt (optional) | String| The receipt identifier of the revenue. | null
`receipt_sig` (optional, *required for revenue verification*) | String| The receipt signature of the revenue. | null
properties (optional) | JSONObject| An object of event properties to include in the revenue event.| null

### `flush`

The `flush` method triggers the client to send buffered events.

```py
client.flush()
```

### `add`

The `add` method adds a plugin to Amplitude client instance. Plugins can help processing and sending events. [Learn more about plugins.](#amplitude-sdk-plugin).

```py
client.add(plugin_obj)
```

### `remove`

The `remove` method removes the given plugin from the client instance if exists.

```py
client.remove(plugin_obj)
```

### `shutdown`

Use the `shutdown` method to close the instance. A closed instance doesn't accept new events and tries to flush events left in the buffer. Then the client instance shuts down running threads.
In version v1.1.1 and higher, the `shutdown` method is automatically registered to be called when the main thread exits.

```py
client.shutdown()
```

## Amplitude SDK plugin

Plugins allow you to extend Amplitude SDK's behavior by, for example, modifying event properties (enrichment type) or sending to a third-party APIs (destination type). A plugin is an object with methods `setup()` and `execute()`.

### `Plugin.setup`

This method contains logic for preparing the plugin for use and has `client` instance as a parameter. The expected return value is `None`. A typical use for this method, is to copy configuration from `client.configuration` or instantiate plugin dependencies. This method is called when you register the plugin to the client via `client.add()`.

### `Plugin.execute`

This method contains the logic for processing events and has `event` instance as parameter. If used as enrichment type plugin, the expected return value is the modified/enriched event. If used as a destination type plugin, the expected return value is a map with keys: `event` (BaseEvent), `code` (number), and `message` (string). This method is called for each event that's instrumented using the client interface, including Identify, GroupIdentify and Revenue events.

### Plugin examples

#### Enrichment type plugin

Here's an example of a plugin that modifies each event that's instrumented by adding an increment integer to `event_id` property of an event.

```py
from threading import Lock
from amplitude import Amplitude, EventPlugin, PluginType


class AddEventIdPlugin(EventPlugin):
    
    def __init__(self, start=0):
        super().__init__(PluginType.ENRICHMENT)
        self.current_id = start
        self.configuration = None
        self.lock = Lock()
        
    def setup(self, client):
        self.configuration = client.configuration
      
    def execute(self, event):
        with self.lock:
            event.event_id = self.current_id
            self.current_id += 1
        return event
  
client = Amplitude("API_KEY")
client.add(AddInsertIdPlugin())
```

#### Destination type plugin

```Python
from amplitude import Amplitude, EventPlugin, DestinationPlugin, PluginType
import requests


class MyDestinationPlugin(DestinationPlugin):

    def __init__(self):
        super().__init__()
        # other init operations
        self.url = "api endpoint url"
        self.configuration = None
        
    def setup(self, client):
        # setup plugin using client instance
        # triggered by client.add() method
        super().setup(client)
        self.configuration = client.configuration
      
    def execute(self, event):
        # process event using plugins in this destination plugin instance
        event = self.timeline.process(event) 
        # send event to customized destination
        payload = '{"key":"secret", "event": ' + str(event) + '}'
        requests.post(self.url, data=payload)
        self.configuration.logger.info("Event sent")
        
    
client = Amplitude("API_KEY")
client.add(MyDestinationPlugin())
```
