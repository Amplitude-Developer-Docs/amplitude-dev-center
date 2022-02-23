---
id: python-legacy
title: Python (Legacy)
---



Iteratively supports tracking analytics events from Python 3 apps.

Since Python is not a type-safe language, the library won't expose type-safe functions for the events in your team’s tracking plan. Instead, the auto-generated library performs those checks at runtime.

## Installation

### Generate the SDK

If you have not yet installed the Ampli CLI, [install it now](/using-the-ampli-cli).

To generate the Itly SDK, run `ampli pull {source}` in the top-most folder of your project. By default, the SDK will be generated in `./itly/`.

:::note Tip
`{source}` is the name of the source you created in your tracking plan (e.g. `python`).
:::

### Install dependencies

To validate your analytics events, the Python SDK depends on [jsonschema](https://github.com/Julian/jsonschema) (MIT). And to work well on both Python 2 and Python 3, it depends on [six](https://pypi.org/project/six/) (MIT), [future](https://pypi.org/project/future/) (MIT), [enum34](https://pypi.org/project/enum34/) (BSD License), and [typing](https://pypi.org/project/typing/) (PSF License). To install these dependencies into your project:

- Add `-r itly/requirements.txt` to your requirements.txt
- Run `pip` as usual

You can also run `pip install -r ./itly/requirements.txt` to install the dependencies yourself.

If you've configured Itly with Segment, the steps above will also install those vendor's SDKs:

- [analytics-python](https://pypi.org/project/analytics-python/) (MIT) for Segment

Because Amplitude does not offer a Python SDK, support for Amplitude is built into the Itly SDK itself.

### Import into your app

To use the library, you'll need to import it first:

```python
import itly
```

## API

### Load

Load the Itly SDK once when your application starts. The `load()` method accepts an options object that lets you configure how the Itly SDK works:

| Options | Description |
|-|-|
| `context`| An object with a set of properties to add to every event sent by the Itly SDK.<br /><br />Only available if there is at least one [source template](/working-with-templates#adding-a-template-to-a-source) associated with your your team's tracking plan.|
| `disabled`| Specifies whether the Itly SDK does any work. When true, all calls to the Itly SDK will be no-ops. Useful in local or development environments.<br /><br />Optional. Defaults to `false`.|
| `environment` | Specifies the environment the Itly SDK is running in: either `production` or `development`. Environment determines which Access Token is used to load the underlying analytics provider libraries.<br /><br />The option also determines safe defaults for handling event validation errors. In production, when the SDK detects an invalid event, it will log an error but still let the event through. In development, the SDK will throw an exception to alert you that something is wrong.<br /><br />Optional. Defaults to `development`.|
| `destinations` | Specifies any analytics provider-specific configuration. The Itly SDK passes these objects in when loading the underlying analytics provider libraries.<br /><br />Optional.|
| `logger` | To log Itly's logs to a custom logger, implement the `ItlyLogger` protocol and set `logger` to an instance of your class. The Itly SDK will call into your class with all debug, info, warn, and error-level messages.<br /><br />[Click here](https://bitbucket.org/seasyd/examples/src/master/python/itly/_itly.py) to see an example written in Python.<br /><br />Optional. Defaults to standard out. |
| `validation` | Configures the Itly SDK's behavior when events or traits fail validation against your tracking plan. Supports the following properties:<br /><br />`disabled`<br /> Disables validation altogether. Defaults to `false`.<br /><br />`fail_on_error`<br />Specifies whether the SDK should throw an exception when validation fails. Defaults to `true` in development, `false` in production.|

For example:

```python
itly.load(itly.Options(
    context=itly.Context(
        version="1.0"
    ),
    logger=SampleLogger(),
    destinations=itly.DestinationsOptions(
        custom=itly.CustomOptions(
            adapter=CustomDestination()
        )
    )
))
```

### Track

To track an event, call the event’s corresponding function. Every event in your tracking plan gets its own function in the Itly SDK.

For example, in the code snippet below, our tracking plan contains an event called `Process Started`. The event was defined with one required property called `user_id` and one optional property called `available_processors`. The `user_id` property's type is a string. The `available_processors` property's type an integer.

```python
itly.process_started("some-user-id",
    available_processors=multiprocessing.cpu_count()
)
```

<!-- Itly includes code docs in the auto-generated library so your IDE can display relevant documentation for every function and property as you type.

![Code documentation](/img/python.png) -->

<!-- ### Alias



### Plugins & Custom Destinations



### Logging -->


