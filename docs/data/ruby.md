---
id: ruby
title: Ruby (Itly)
---



Iteratively supports tracking analytics events from Ruby apps.

In Ruby, the tracking library exposes a type-safe function for every event in your team’s tracking plan. The function’s arguments correspond to the event’s properties and are strongly typed to allow for code completion and compile-time checks.

## Installation

### Generate the SDK

If you have not yet installed the Ampli CLI, [install it now](/using-the-ampli-cli).

To generate the Itly SDK, run `ampli pull {source}` in the top-most folder of your project. By default, the SDK will be generated in `./itly/lib/`.

:::note Tip
`{source}` is the name of the source you created in your tracking plan (e.g. `ruby`).
:::

### Install dependencies

To validate your analytics events, the Ruby SDK depends on [JSONSchemer](https://github.com/davishmcclurg/json_schemer) (MIT). To install this dependency into your project:

- Add `gem "itly", path: "./itly"` to your `Gemfile`
- Run `bundle install` as usual

If you've configured Itly with Segment, the steps above will also install those vendor's SDKs:

- [SimpleSegment](https://github.com/whatthewhat/simple_segment) (MIT) for Segment
- [amplitude-api](https://github.com/toothrot/amplitude-api) (MIT) for Amplitude


### Import into your app

To use the library, you'll need to import it first:

```python
require 'itly'
```

## API

### Load

Load the Itly SDK once when your application starts. The `load` method accepts an options object that lets you configure how the Itly SDK works:

| Options | Description |
|-|-|
| `context`| An object with a set of properties to add to every event sent by the Itly SDK.<br /><br />Only available if there is at least one [source template](/working-with-templates#adding-a-template-to-a-source) associated with your your team's tracking plan.|
| `disabled`| Specifies whether the Itly SDK does any work. When true, all calls to the Itly SDK will be no-ops. Useful in local or development environments.<br /><br />Optional. Defaults to `false`.|
| `environment` | Specifies the environment the Itly SDK is running in: either `production` or `development`. Environment determines which Access Token is used to load the underlying analytics provider libraries.<br /><br />The option also determines safe defaults for handling event validation errors. In production, when the SDK detects an invalid event, it will log an error but still let the event through. In development, the SDK will throw an exception to alert you that something is wrong.<br /><br />Optional. Defaults to `development`.|
| `destinations` | Specifies any analytics provider-specific configuration. The Itly SDK passes these objects in when loading the underlying analytics provider libraries.<br /><br />Optional.|
| `logger` | To log Itly's logs to a custom logger, implement the `ItlyLogger` protocol and set `logger` to an instance of your class. The Itly SDK will call into your class with all debug, info, warn, and error-level messages.<br /><br />[Click here](https://bitbucket.org/seasyd/examples/src/master/ruby/itly/lib/itly/itly_base.rb) to see an example written in Ruby.<br /><br />Optional. Defaults to standard out. |

For example:

```python
# With no context properties or custom destinations
Itly.load()

# With context properties (e.g. a string property called version)
Itly.load do |options|
  options.context = Itly::Context.new(
    version: '1.0'
  )
end

# With all options
Itly.load do |options|
  options.environment = ENV['APP_ENV'] || :development
  options.destinations.segment = {
    max_queue_size: 1000
  }
  options.destinations.custom = CustomDestinationAdapter.new('custom', {})
  options.logger = Logger.new(STDOUT),
  options.context = Itly::Context.new(
    version: '1.0'
  )
end
```

### Track

To track an event, call the event’s corresponding function. Every event in your tracking plan gets its own function in the Itly SDK.

For example, in the code snippet below, our tracking plan contains an event called `Process Started`. The event was defined with one required property called `user_id` and one optional property called `available_processors`. The `user_id` property's type is a string. The `available_processors` property's type an integer.

```python
Itly.process_started('some-user-id',
  available_processors: Etc.nprocessors
)
```

<!-- Itly includes code docs in the auto-generated library so your IDE can display relevant documentation for every function and property as you type.

![Code documentation](/img/ruby.png) -->

<!-- ### Alias



### Plugins & Custom Destinations



### Logging -->


