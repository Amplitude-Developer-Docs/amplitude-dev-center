---
title: Python SDK (Beta)
description: Official documentation for the Amplitude Analytics Python SDK.
icon: fontawesome/brands/python
---

![PyPI version](https://badge.fury.io/py/amplitude-analytics.svg)

!!!note "This SDK is in Beta"

    The Amplitude Analytics Python SDK is in beta.

!!!info "SDK Resources"
    - [Python SDK Repository :material-github:](https://github.com/amplitude/Amplitude-Python)
    - [Python SDK Releases :material-code-tags-check:](https://github.com/amplitude/Amplitude-Python/releases)

The Python SDK lets you send events to Amplitude Analytics. This library is open-source, check it out on [GitHub](https://github.com/amplitude/Amplitude-Python).

## Getting Started

### Installation

Install `amplitude-analytics` using pip:

```bash
pip install amplitude-analytics
```

## Usage

### Initializing SDK

Initialization is necessary before any instrumentation is done. The API key for your Amplitude project is required. Optionally, a config object can be passed in this call. The SDK client instance can be used across requests after it is initialized.

```Python
from amplitude import Amplitude


client = Amplitude('API_KEY')
```

### Configuration

The SDK accepts an object to configure the SDK's behavior.

```Python
def callback_func(event, code, message=None):
  # callback function that takes three input parameters
  # event: the event that triggered this callback
  # code: status code of request response
  # message: a optional string message for more detailed information


client.configuration.api_key = "new api key"
client.configuration.flush_queue_size = 100
client.configuration.flush_interval_millis = 10000 # 10 seconds
client.configuration.flush_max_retries = 5
client.configuration.logger = logging.getLogger(__name__)
client.configuration.min_id_length = 7
client.configuration.callback = callback_func
client.configuration.server_zone = "EU"
client.configuration.use_batch = True
client.configuration.server_url = "proxy url that forwarding the requests"
client.configuration.opt_out = False
```

| <div class="big-column">Name</div> | Description  |
| --- | --- |
| `api_key` | Required. String. The API key of the Amplitude project. Events sent by the client instance can be found under this project. Set when you initialize the client instance. |
| `flush_queue_size` | Integer. Events wait in the buffer and are sent in a batch. The buffer is flushed when the number of events reaches `flush_queue_size`. Defaults to 200.|
| `flush_interval_millis` | Integer. Events wait in the buffer and are sent in a batch. The buffer is flushed every `flush_interval_millis` milliseconds. Defaults to 10,000 (10 seconds).|
| `flush_max_retries` | Integer. The number of times the client retries an event when the request returns an error. Defaults to 12 |
| `logger` | Logger. The logger instance used by Amplitude client. Defaults to using [python built-in logging](https://docs.python.org/3/library/logging.html#logger-objects): `logging.getLogger(name)`. |
| `min_id_length` | Integer. The minimum length of `user_id` and `device_id`. Defaults to 5.|
| `callback`  | Callable. Optional. Client level callback function. Takes three parameters:<br> 1. event: a Event instance<br> 2. code: a integer of HTTP response code <br> 3. message: a string message. Defaults to `None`. |
| `server_zone` |String. The server zone of the projects. Supports `EU` and `US`. For EU data residency, Change to `EU`. Defaults to `US`. |
| `use_batch` | Boolean. Uses HTTP v2 API endpoint if set to `False`, otherwise use batch API endpoint. More about difference between HTTP v2 and batch can be found [here](https://developers.amplitude.com/docs/batch-event-upload-api). Defaults to `False` |
| `server_url` | String. The API endpoint URL that events are sent to. Automatically selected by `server_zone` and `use_batch`. If this field is set with a string value instead of `None`, then `server_zone` and `use_batch` are ignored and the string value is used. Defaults to the HTTP API V2 endpoint. |
| `storage_provider` | StorageProvider. Used to create storage instance to hold events in the storage buffer. Events in storage buffer are waiting to be sent. Defaults to `InMemoryStorageProvider`. |
| `opt_out`  | Boolean. Opt out option. If set to `True`, client doesn't process and send events. Defaults to `False`. |

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

### User Properties

User properties help you understand your users at the time they performed some action within your app such as their device details, their preferences, or language.

Identify is for setting the user properties of a particular user without sending any event. The SDK supports the operations `set`, `set_once`, `unset`, `add`, `append`, `prepend`, `pre_insert`, `post_insert`, and `remove` on individual user properties. The operations are declared via a provided Identify interface. Multiple operations can be chained together in a single Identify object. The Identify object is then passed to the Amplitude client to send to the server.

!!!info "Important Note"
    If the Identify call is sent after the event, the results of operations will be visible immediately in the dashboard user’s profile area, but it will not appear in chart result until another event is sent after the Identify call. So the identify call only affects events going forward. More details [here](https://amplitude.zendesk.com/hc/en-us/articles/115002380567-User-Properties-Event-Properties#applying-user-properties-to-events).

#### Setting a User Property

The Identify object provides controls over setting user properties. An Identify object must first be instantiated, then Identify methods can be called on it, and finally the client will make a call with the Identify object.

```Python
from amplitude import Identify, EventOptions


identify_obj=Identify()
client.identify(identify_obj, EventOptions(user_id="USER_ID"))
```

#### Identify.set

This method sets the value of a user property. For example, you can set a role property of a user.

```Python
from amplitude import Identify, EventOptions


identify_obj=Identify()
identify_obj.set("location", "LAX")
client.identify(identify_obj, EventOptions(user_id="USER_ID"))
```

#### Identify.set_once

This method sets the value of a user property only once. Subsequent calls using `set_once()` will be ignored. For example, you can set an initial login method for a user and since only the initial value is tracked, `set_once()` ignores subsequent calls.

```Python
from amplitude import Identify, EventOptions


identify_obj=Identify()
identify_obj.set_once("initial-location", "SFO")
client.identify(identify_obj, EventOptions(user_id="USER_ID"))
```

#### Identify.add

This method increments a user property by some numerical value. If the user property does not have a value set yet, it will be initialized to 0 before being incremented.  For example, you can track a user's travel count.

```Python
from amplitude import Identify, EventOptions


identify_obj=Identify()
identify_obj.add("travel-count", 1)
client.identify(identify_obj, EventOptions(user_id="USER_ID"))
```

#### Arrays in User Properties

Arrays can be used as user properties. You can directly set arrays or use prepend, append, pre_insert and post_insert to generate an array.

#### Identify.prepend

This method prepends a value or values to a user property array. If the user property does not have a value set yet, it will be initialized to an empty list before the new values are prepended.

```Python
from amplitude import Identify, EventOptions


identify_obj=Identify()
identify_obj.prepend("visited-locations", "LAX")
client.identify(identify_obj, EventOptions(user_id="USER_ID"))
```

#### Identify.append

This method appends a value or values to a user property array. If the user property does not have a value set yet, it will be initialized to an empty list before the new values are appended.

```Python
from amplitude import Identify, EventOptions


identify_obj=Identify()
identify_obj.append("visited-locations", "SFO")
client.identify(identify_obj, EventOptions(user_id="USER_ID"))
```

#### Identify.pre_insert

This method pre-inserts a value or values to a user property, if it does not exist in the user property yet. Pre-insert means inserting the value(s) at the beginning of a given list. If the user property does not have a value set yet, it will be initialized to an empty list before the new values are pre-inserted. If the user property has an existing value, it will be no operation.

```Python
from amplitude import Identify, EventOptions


identify_obj=Identify()
identify_obj.pre_insert("unique-locations", "LAX")
client.identify(identify_obj, EventOptions(user_id="USER_ID"))
```

#### Identify.post_insert

This method post-inserts a value or values to a user property, if it does not exist in the user property yet. Post-insert means inserting the value(s) at the end of a given list. If the user property does not have a value set yet, it will be initialized to an empty list before the new values are post-inserted. If the user property has an existing value, it will be no operation.

```Python
from amplitude import Identify, EventOptions


identify_obj=Identify()
identify_obj.post_insert("unique-locations", "SFO")
client.identify(identify_obj, EventOptions(user_id="USER_ID"))
```

#### Identify.remove

This method removes a value or values to a user property, if it exists in the user property. Remove means remove the existing value(s) from the given list. If the item does not exist in the user property, it will be no operation.

```Python
from amplitude import Identify, EventOptions


identify_obj=Identify()
identify_obj.remove("unique-locations", "JFK")
client.identify(identify_obj, EventOptions(user_id="USER_ID"))
```

### User Groups

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

Amplitude supports assigning users to groups and performing queries such as Count by Distinct on those groups. An example would be if you want to group your users based on what organization they are in by using an 'orgId'. You can designate Joe to be in 'orgId' '10' while Sue is in 'orgId' '15'. When performing a query in our Event Segmentation chart, you can then select "..performed by" 'orgId' to query the number of different organizations that have performed a specific event. As long as at least one member of that group has performed the specific event, that group will be included in the count.

When setting groups, you will need to define a group_type and group_name(s). In the above example, 'orgId' is the group_type and the values '10' and '15' are group_name(s). Another example of a group_type could be 'sport' with group_name(s) like 'tennis' and 'baseball'. You can use `set_group()` to designate which groups a user belongs to. Note: This will also set the 'group_type:group_name' as a user property. This will overwrite any existing group_name value set for that user's group_type, as well as the corresponding user property value. `group_type` is a string and `group_name` can be either a string or an array of strings to indicate a user being in multiple groups (for example, if Joe is in 'orgId' '10' and '16', then the group_name would be '[10, 16]'). Here is what your code might look like.

```Python
# set group with single group name
client.set_group(group_type="org_id", group_name="15", 
                 event_options=EventOptions(user_id="USER_ID")) 

# set group with multiple group names
client.set_group(group_type="org_id", group_name=["15", "21"], 
                 event_options=EventOptions(user_id="USER_ID")) 
```

### Group Properties

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

Use the Group Identify API to set or update properties of particular groups. However, these updates will only affect events going forward.

The `group_identify()` method accepts a group type and group name string parameter, as well as an Identify object that will be applied to the group.

```Python
identify_obj=Identify()
identify_obj.set("locale", "en-us")
client.group_identify(group_type="org-id", group_name="15", identify_obj=identify_obj)
```

### Revenue Tracking

The preferred method of tracking revenue for a user is to use `revenue()` in conjunction with the provided Revenue interface. Revenue instances will store each revenue transaction and allow you to define several special revenue properties (such as 'revenue_type', 'product_id', etc.) that are used in Amplitude's Event Segmentation and Revenue LTV charts. These Revenue instance objects are then passed into `revenue` to send as revenue events to Amplitude. This allows us to automatically display data relevant to revenue in the platform. You can use this to track both in-app and non-in-app purchases.

To track revenue from a user, call revenue each time a user generates revenue. For example, 3 units of a product was purchased at $3.99.

```Python
from amplitude import Revenue


revenue_obj = Revenue(price=3.99,
                      quantity=3,
                      product_id="com.company.productId",
client.revenue(revenue_obj, EventOptions(user_id="USER_ID"))
```

#### Revenue Interface

Name |  Type  |Description | Default
-----|-------|--------------|--------
product_id (optional) | string | An identifier for the product. We recommend something like the Google Play Store product ID. | null
quantity *(required)* | int| The quantity of products purchased. Note: revenue = quantity * price | 1
price *(required)* | Double | The price of the products purchased, and this can be negative. Note: revenue = quantity * price | null
revenue_type (optional, *required for revenue verification*) | String| The type of revenue (e.g. tax, refund, income). | null
receipt (optional) | String| The receipt identifier of the revenue. | null
receipt_sig (optional, *required for revenue verification*) | String| The receipt signature of the revenue. | null
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

### shutdown

`shutdown` method close the instance. Closed instance will not accepting new events and will try to flush events left in buffer. Then the client instance will shutdown running threads.

```py
client.shutdown()
```

## Amplitude SDK Plugin

Plugins allow you to extend Amplitude SDK's behavior by, for example, modifying event properties (enrichment type) or sending to a third-party APIs (destination type). A plugin is an object with methods `setup()` and `execute()`.

### Plugin.setup

This method contains logic for preparing the plugin for use and has `client` instance as a parameter. The expected return value is `None`. A typical use for this method, is to copy configuration from `client.configuration` or instantiate plugin dependencies. This method is called when the plugin is registered to the client via `client.add()`.

### Plugin.execute

This method contains the logic for processing events and has `event` instance as parameter. If used as enrichment type plugin, the expected return value is the modified/enriched event; while if used as a destination type plugin, the expected return value is `None`. This method is called for each event, including Identify, GroupIdentify and Revenue events, that is instrumented using the client interface.

### Plugin Examples

#### Enrichment Type Plugin

Here's an example of a plugin that modifies each event that is instrumented by adding an increment integer to `event_id` property of an event.

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

#### Destination Type Plugin

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
