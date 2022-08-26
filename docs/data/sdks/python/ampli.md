---
title: Python Ampli Wrapper
description:  Learn how to install and use the Amplitude Data Ampli Wrapper for the Python runtimes.
---


Amplitude Data supports tracking analytics events from Python apps (Python 3.6 or above). The generated tracking library is packaged as a python package.

The tracking library exposes a type-safe function for every event in your team’s tracking plan. The function’s arguments correspond to the event’s properties and are strongly typed to allow for auto code completion.

!!!info "Ampli Resources"
    - [Python Ampli Examples](https://github.com/amplitude/ampli-examples/tree/main/python/simple/v1)
    - [Django Ampli Examples](https://github.com/amplitude/ampli-examples/tree/main/python/django/v1)

!!!deprecated "Deprecated Itly runtime"
    This page covers the Python Ampli runtimes. All Python Itly runtimes are deprecated. If you are still using an Python Itly runtime, see the **[migration guide](#migrating-from-an-itly-python-runtime)** to upgrade to the newest runtime. Docs for the Itly version are available **[here](/data/deprecated-sdks/python)**.

## Install

These instructions are also available from the **Implementation** page of your Amplitude Data workspace.

### Install the Ampli CLI

If you haven't installed the Ampli CLI, [install it now](../../ampli).

### Install dependencies

If you haven't already, install the core Amplitude SDK dependencies.

```bash
pip install amplitude-analytics
```

### Pull the SDK into your project

At the project root, run `pull` command.

```bash
ampli pull
```

This prompts you to log in to your workspace and select a source.

```bash
➜ ampli pull sourcename
Ampli project is not initialized. No existing `ampli.json` configuration found.
? Create a new Ampli project here? Yes
Organization: Amplitude
Workspace: My Workspace
Source: sourcename
Runtime: Python/Python
Branch: main
Pulling latest version (1.0.0)...
Tracking library generated successfully.
Path: ./ampli
```

## API

### Load

Initialize Ampli in your code. The `load()` method accepts configuration option arguments:

```python
from .ampli import *


ampli.load(LoadOptions(
  environment=Environment.PRODUCTION
))
```

| <div class ="big-column">Arg of load()</div> | Description |
|-|-|
| `options` | Optional. Defaults to None. A instance of LoadOptions. Specifies configuration options for the Ampli Wrapper.|

| <div class ="big-column">Arg of LoadOptions</div> | Description |
|-|-|
|`disabled`|Optional. Defaults to False. Specifies whether the Ampli Wrapper does any work. When true, all calls to the Ampli Wrapper are no-ops. Useful in local or development environments.|
|`environment`|Optional. Defaults to None. Specifies the environment the Ampli Wrapper runs in: either `production` or `development`. Environment determines which Access Token is used to load the underlying analytics provider libraries.|
|`client`|Optional. Defaults to None. A instance of LoadClientOptions specifies configuration options for the Amplitude core SDK client.|

| <div class ="big-column">Arg of LoadClientOptions</div> | Description |
|-|-|
|`instance`| Optional. Defaults to None. Specifies an Amplitude instance. By default Ampli creates an instance for you.|
|`api_key`|Optional. Defaults to None. Specifies an API Key. This option overrides the default, which is the API Key configured in your tracking plan.|
|`configuration`|Optional. Defaults to None. Specifies the Amplitude configuration. This option overrides the default configuration.|

### Identify

Call `identify()` to identify a user in your app and associate all future events with their identity, or to set their properties.

Just as Ampli creates types for events and their properties, it creates types for user properties.

The `identify()` function accepts a string user_id, an Identify event instance, and an optional EventOptions.

For example your tracking plan contains a user property called `role`. The property's type is a string.

```python
ampli.identify("user_id", Identify(role="admin"))
```

The options argument allows you to pass [Amplitude fields](https://developers.amplitude.com/docs/http-api-v2#keys-for-the-event-argument) for this call, such as `device_id`.

```python
ampli.identify("user_id", Identify(role="admin"), EventOptions(device_id="device_id"))
```

### Group Identify

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

Call `group_identify()` to identify a group in your app and set/update group properties.

Just as Ampli creates types for events and their properties, it creates types for group properties.

The `group_identify()` function accepts a string group_type, a string group_name, an Group event instance, and an optional EventOptions.

For example your tracking plan contains a group `sport:football` has a property called `total_member`. The property's type is a int.

```python
ampli.group_identify("sport", "football", Group(total_member=23))
```

### Set Group

Call `set_group()` to associate a user with their group (for example, their department or company). The `set_group()` function accept `user_id` `group_type`, `group_name` and an optional EventOptions.

```python
ampli.set_group("user_id", "sport", "football")
```

`group_name` can be one group name string or multiple group names list.

```python
ampli.set_group("user_id", "sport", ["football", "basketball"])
```

### Track

To track an event, call the event's corresponding function. Every event in your tracking plan gets its own function in the Ampli Wrapper. The call is structured like this:

```python
ampli.event_name("user_id", EventName(...), EventOptions(...))
```

The optional `EventOptions` argument allows you to pass [Amplitude fields](https://developers.amplitude.com/docs/http-api-v2#keys-for-the-event-argument), like `device_id`.

For example, in the code snippet below, your tracking plan contains an event called `songPlayed`. The event is defined with two required properties: `songId` and `songFavorited.` The property type for `songId` is string, and `songFavorited` is a boolean.

```python
ampli.song_played('user_id', SongPlayed(
  song_id = 'songId', # str,
  song_favorited = True, # bool
))
```

Ampli also generates a class for each event.

```python
my_event = SongPlayed(
  song_id = 'songId', # str,
  song_favorited = True, # bool
)
```

Send event objects using the generic track method.

```python
ampli.track('user_id', SongPlayed(
  song_id = 'songId', # str,
  song_favorited = True, # bool
), EventOptions(device_id="device_id"))
```

### Plugin

Plugins allow you to extend the Amplitude behavior, for example, modifying event properties (enrichment type) or sending to a third-party APIs (destination type).

First you need to define your plugin. Destination Plugin example:

```python
from amplitude import DestinationPlugin, PluginType, BaseEvent, IdentifyEvent
from analytics import Client as SegmentClient


class SegmentPlugin(DestinationPlugin):

    def __init__(self, write_key):
        self.plugin_type = PluginType.DESTINATION
        self.configuration = None
        self.segment = SegmentClient(write_key)

    def setup(self, client):
        self.configuration = client.configuration

    def execute(self, event: BaseEvent) -> None:
        if isinstance(event, IdentifyEvent):
            self.segment.identify(event.user_id, event.user_properties)
        elif isinstance(event, BaseEvent):
            self.segment.track(event.user_id, event.event_type, event.event_properties)
```

Add your plugin after init Ampli:

```python
ampli.client.add(SegmentPlugin("write_key"))
```

## Verify implementation status

Verify events are implemented in your code with the status command:

```bash
ampli status
```

To update the implementation status in your tracking plan use the `--update` flag or `-u`:

```bash
ampli status -u
```

The output displays status and indicates what events are missing.

```bash
➜ ampli status
✘ Verifying event tracking implementation in source code
 ✔ Song Played (1 location)
 ✘ Song Stopped Called when a user stops playing a song.
Events Tracked: 1 missed, 2 total
```

Learn more about [`ampli status`](https://developers.data.amplitude.com/using-the-ampli-cli/#ampli-status).

## Migrating from an Itly Python runtime

Migrate from an Itly Python runtime to Ampli by following these steps.

1. Update Source runtime. In the web app open the **Connections > Source** modal. From the dropdown, update the source to a non-`(Itly)` runtime.

2. Go to the **Implementation** page, then select the new Source for detailed setup and usage instructions.

3. Remove legacy Itly dependencies from your project.

    ```bash
    pip uninstall -r itly/requirements.txt
    rm -rf ./itly
    ```

4. Add Amplitude dependencies.

    ```bash
    pip install amplitude-analytics
    ```

5. Pull the latest Ampli Wrapper.

    ```bash
    ampli pull
    ```

6. Check your Ampli Wrapper path.
    `ampli pull` prints the location of where the new SDK was downloaded. If this still contains `itly` you can update the `Path` by hand in the `ampli.json` file, or pull again using the `--path` parameter: `ampli pull -p ./path/to/ampli`.

7. Find and replace:

    - `import itly` => `from ampli import *`
    - `itly.` => `ampli.`

8. See updated Event tracking details on your Implementation page in the web app.
