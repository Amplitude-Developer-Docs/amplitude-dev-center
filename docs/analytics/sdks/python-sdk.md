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

Track the first event

```python
from amplitude import Amplitude, BaseEvent

client = Amplitude("api key")
event = BaseEvent(event_type="Song Played", user_id="AppUser1")
client.track(event)
```

## Amplitude client configuration

### Initialize a client with default configuration

```py
from amplitude import Amplitude

# initialize a client with api key and default configuration
client = Amplitude("api key here")
```

### Update configuration of a client

```py
def callback_func(event, code, message=None):
  # callback function that takes three input parameters
  # event: the event that triggered this callback
  # code: status code of request response
  # message: a optional string message for more detailed information

client.configuration.api_key = "new api key"
client.flush_queue_size = 100
client.flush_interval_millis = 10000 # 10 seconds
client.flush_max_retries = 5
client.logger = logging.getLogger(__name__)
client.min_id_length = 7
client.callback = callback_func
client.server_zone = "EU"
client.use_batch = True
client.server_url = "proxy url that's forwarding the requests"
client.opt_out = False
```

### Configuration fields

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

## Amplitude Client Interface

### `track`

The `track` method sends an event to Amplitude. Learn more about supported [event attributes](https://developers.amplitude.com/docs/http-api-v2#keys-for-the-event-argument).

```py
client.track(
  BaseEvent(
    event_type = "type of event", # e.g. Song played, button clicked, page landed
    user_id = "id of user who triggered the event",
    device_id = "", # used to identify user if user_id not present
    event_properties = {
      "source": "notification"
    },
    user_properties = {
      "email": "123@abc.com"
    }
))
```

### `identify`

The `identify` method sends an identify event that update user properties without an actual event.

```py
from amplitude import Identify, EventOptions

identify_obj=Identify()
identify_obj.set("user_name", "amp")
identify_obj.add("age", 1)
identify_obj.unset("user proerty to remove")
client.identify(identify_obj, EventOptions(user_id="user id"))
```

### `group_identify`

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

The `group_identify` method sends a group identify event that update group properties.

Python

```py
identify_obj=Identify()
identify_obj.append("group member", "John")
identify_obj.add("group size", 1)
client.group_identify(group_type="Team", group_name="Security", identify_obj=identify_obj)
```

### `set_group`

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

The `set_group` method sends an identify event that update user's group information in user properties.

```py
client.set_group(group_type="Sports", group_name=["Swimming", "Basketball"],
                 event_options=EventOptions(user_id="user id"))
```

### `revenue`

The `revenue` method sends a revenue event that contains information of transactions and revenue.

```py
from amplitude import Revenue

revenue_obj = Revenue(price=40.5,
                      quantity=2,
                      product_id="ABC123",
                      receipt = "RC12789",
                      properties = {
                        # other event properties includes in the revenue event
                      })
client.revenue(revenue_obj, EventOptions(user_id="user id"))
```

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

## Amplitude SDK Plugin

Use plugins to extend SDK functionality.

```py
from amplitude import Amplitude, EventPlugin, DestinationPlugin, PluginType

class MyEnrichmentPlugin(EventPlugin):

    def __init__(self):
        super().__init__(PluginType.ENRICHMENT)
        # other init operations

    def setup(self, client):
        # setup plugin using client instance
        # triggered by client.add() method

    def execute(self, event):
        # process and modify event
        return event

class MyDestinationPlugin(DestinationPlugin):

    def __init__(self):
        super().__init__()
        # other init operations

    def setup(self, client):
        # setup plugin using client instance
        # triggered by client.add() method

    def execute(self, event):
        # process event using plugins in this destination plugin instance
        event = self.timeline.process(event)
        # send event to customized destination

client = Amplitude("API_KEY")
client.add(MyEnrichmentPlugin())
destination = MyDestinationPlugin()
# Destination plugin can have other plugins to process events
destination.add(other_plugin)
client.add(destination)
```
