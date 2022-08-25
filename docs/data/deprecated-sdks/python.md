---
title: Python (Itly)
description: The documentation for the deprecated Amplitude Data Python SDK (Itly).
icon: material/language-python
search:
  exclude: true
---

<!-- markdownlint-disable -->
<!-- markdown-link-check-disable -->

!!!warning "Deprecated SDK"
    This SDK is deprecated and these docs are no longer maintained.

Amplitude Data supports tracking analytics events from Python 3 applications.

## Installation

### Generate the SDK

If you have not yet installed the Ampli CLI, [install it now](/data/using-the-ampli-cli).

To generate the Itly SDK, run `ampli pull {source}` in the top-most folder of your project. By default, the SDK will be generated in `./itly/`.

!!!tip

        `{source}` is the name of the source you created in your tracking plan (e.g. `python`).

### Install dependencies

The generated Itly SDK will automatically reference its dependencies based on the destinations you've configured in your tracking plan. By default, the SDK depends on [itly-sdk](https://github.com/iterativelyhq/itly-sdk-python/tree/master/packages/sdk) (the base Itly library) and the [itly-plugin-schema-validator](https://github.com/iterativelyhq/itly-sdk-python/tree/master/packages/plugin-schema-validator) (the event validation plugin). Optionally, it also depends on provider-specific plugins like [itly-plugin-amplitude](https://github.com/iterativelyhq/itly-sdk-python/tree/master/packages/plugin-amplitude).

To install these dependencies into your project:

- Add `-r itly/requirements.txt` to your requirements.txt
- Run `pip` as usual

You can also run `pip install -r itly/requirements.txt` to install the dependencies yourself.

### Import into your app

First, import the Itly package in files you'll be interacting with the Itly SDK:

```python
import itly
```

## API

### Load

Then, initialize the Itly SDK once your application starts up. For example:

```python
itly.load(
    context=itly.Context(
        version="1.0"
    ),
    options=itly.Options(
        plugins=[
            CustomDestination()
        ]
    )
)
```

To initialize the Itly SDK, call its `load()` function. In our example above, we defined a tracking plan in the Itly web application to:

- Include a property called *version* on every event
- Send events to a custom destination

As a result, our SDK will be initialized to:

- Set the required *version* property to 1.0
- Send events to a custom destination implemented in the `CustomDestination` class

Note: if your tracking plan doesn't take advantage of [source templates](/working-with-templates#adding-a-template-to-a-source) and you haven't configured a [custom destination](#custom-destination), you can simply call `itly.load()`.

<br/>

| <div class="big-column">Options</div> | Description |
|-|-|
| `context`| An object with a set of properties to add to every event sent by the Itly SDK.<br /><br />Only available if there is at least one [source template](/working-with-templates#adding-a-template-to-a-source) associated with your your team's tracking plan.|
| `destinations` | Specifies any analytics provider-specific configuration. The Itly SDK passes these objects in when loading the underlying analytics provider libraries.<br /><br />Optional.|
| `options` | Specifies additional configuration options for the Itly SDK. Optional.<br /><br />`disabled`<br />Specifies whether the Itly SDK does any work. When true, all calls to the Itly SDK will be no-ops. Useful in local or development environments.<br /><br />Optional. Defaults to `false`.<br /><br />`environment`<br />Specifies the environment the Itly SDK is running in: either `itly.Environment.PRODUCTION` or `itly.Environment.DEVELOPMENT`. Environment determines which Access Token is used to load the underlying analytics provider libraries.<br /><br />The option also determines safe defaults for handling event validation errors. In production, when the SDK detects an invalid event, it will log an error but still let the event through. In development, the SDK will throw an exception to alert you that something is wrong.<br /><br />Optional. Defaults to `itly.Environment.DEVELOPMENT`.<br /><br />`plugins`<br />An array of additional plugins to load into the Itly SDK. Plugins allow you to extend the Itly SDK's event validation and event tracking functionality with your own. For example, a plugin can be used to implement a custom destination or a custom event validator.<br /><br />[Click here](https://bitbucket.org/seasyd/examples/src/master/python-v2/custom.py) to see a sample custom destination plugin.<br /><br />Optional.<br /><br />`logger`<br />To log Itly's logs to a custom logger, implement the `ItlyLogger` protocol and set `logger` to an instance of your class. The Itly SDK will call into your class with all debug, info, warn, and error-level messages.<br /><br />[Click here](https://bitbucket.org/seasyd/examples/src/master/python-v2/logger.py) to see a a sample custom logger.<br /><br />Optional. |

### Track

And finally, to track an event:

```python
itly.process_started("some-user-id",
    available_processors=multiprocessing.cpu_count()
)
```

Every event defined in your team's Itly tracking plan turns into a function in the Itly SDK. To track the event, call the function, provide a unique ID to track the user by, and specify the event's properties, if any.

For example, in the code snippet above, our tracking plan contains an event called *Process Started*. The event was defined with one required property called *availableProcessors*. The property's type is an integer.

Note: if your Python application or service isn't intended to run forever, you'll need to shut down the Itly SDK when your application or service shuts down. To do this, call `itly.flush()` followed by `itly.shutdown()`.

## Example

Browse over to <https://bitbucket.org/seasyd/examples/src/master/python-v2/> to see an example of an instrumented Python app, along with a sample implementation of the `CustomDestination` adapter and `SampleLogger` logger.

<!-- Itly includes code docs in the auto-generated library so your IDE can display relevant documentation for every function and property as you type.

![Code documentation](/img/python.png) -->

<!-- ### Alias

### Plugins & Custom Destinations

### Logging -->
