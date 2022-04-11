---
title: Ruby
search:
  exclude: true
---

!!!note "Previous Version"
    Still using the **Ruby (Legacy)** runtime? Docs for the previous version are available [here](ruby).

!!!note Migrating
    Migrating from **Ruby (Legacy)** to the new **Ruby** runtime? A migration guide is available [here](#migrating-from-previous-version).

Amplitude Data Ruby SDK supports Ruby >= 2.6.0

The tracking library exposes a type-safe function for every event in your team’s tracking plan. The function’s arguments correspond to the event’s properties and are strongly typed to allow for code completion and compile-time checks.

## Installation

### Generate the SDK

If you have not yet installed the Ampli CLI, [install it now](/using-the-ampli-cli).

To generate the Itly SDK, run `ampli pull {source}` in the top-most folder of your project. By default, the SDK will be generated in `./itly`.

!!!tip

    `{source}` is the name of the source you created in your tracking plan (e.g. `ruby`).


### Install dependencies

When you first run `ampli pull {source}` it will output a list of gems to install to support your tracking plan.

Install the required dependencies by adding them to your `Gemfile`, running `gem install`, or `bundle install`.

```bash
Install dependencies:
  gem install itly-sdk \
      itly-plugin-schema-validator \
      itly-plugin-amplitude \
      itly-plugin-segment
```

### Import into your app

To use the library, you'll need to import it first:

```ruby
require_relative 'itly/itly'
```

## API

### Load

Load the Itly SDK once when your application starts. The `load` method accepts an options object that lets you configure how the Itly SDK works:

| Options | Description |
|-|-|
| `context`| An object with a set of properties to add to every event sent by the Itly SDK.<br /><br />Only available if there is at least one [source template](/working-with-templates#adding-a-template-to-a-source) associated with your your team's tracking plan.|
| `disabled`| Specifies whether the Itly SDK does any work. When true, all calls to the Itly SDK will be no-ops. Useful in local or development environments.<br /><br />Optional. Defaults to `false`.|
| `environment` | Specifies the environment the Itly SDK is running in: either `Itly::Options::Environment::PRODUCTION` or `Itly::Options::Environment::DEVELOPMENT`. Environment determines which Access Token is used to load the underlying analytics provider libraries.<br /><br />The option also determines safe defaults for handling event validation errors. In production, when the SDK detects an invalid event, it will log an error but still let the event through. In development, the SDK will throw an exception to alert you that something is wrong.<br /><br />Optional. Defaults to `Itly::Options::Environment::DEVELOPMENT`.|
| `destinations` | Specifies any analytics provider-specific configuration. The Itly SDK passes these objects in when loading the underlying analytics provider libraries.<br /><br />Optional.|
| `logger` | To log Itly's logs to a custom logger, implement the `Itly::Logger` protocol and set `logger` to an instance of your class. The Itly SDK will call into your class with all debug, info, warn, and error-level messages.<br /><br />[Click here](https://bitbucket.org/seasyd/examples/src/master/ruby-v2) to see an example written in Ruby.<br /><br />Optional. Defaults to no logging. |

For example:

```ruby
# With no context properties or custom destinations
Itly.load

# With context properties (e.g. a string property called version)
Itly.load(context: Itly::Context.new(
    version: '1.0'
))

# With all options
Itly.load(
  context: Itly::Context.new(version: '1.0'),
  destinations: Itly::DestinationOptions.new(
    snowplow: Itly::Plugin::Snowplow::Options.new(
      endpoint: 'my.tracker.url'
    ),
  ),
  options: Itly::Options.new(
    environment: ENV['APP_ENV'] || Itly::Options::Environment::DEVELOPMENT,
    plugins: [CustomPlugin.new(api_key: 'abc123')],
    validation: Itly::Options::Validation::ERROR_ON_INVALID,
    logger: Itly::Loggers.std_out
  )
)
```

### Track

To track an event, call the event’s corresponding function. Every event in your tracking plan gets its own function in the Itly SDK.

For example, in the code snippet below, our tracking plan contains an event called `User Signed In`. The event was defined with one required property called `user_id` and one optional property called `method`. The `user_id` property's type is a string. The `method` property's type an enum.

```ruby
Itly.user_signed_in('some-user-id',
  method: Itly::UserSignedIn::Method::SSO
)
```

### Example Application

To see the full usage of the Itly Ruby SDK see this example application.

[Amplitude Data Ruby Sample Application](https://bitbucket.org/seasyd/examples/src/master/ruby-v2/README.md)


## Migrating from Previous Version

### Introduction

The new Ruby SDK introduces several new features to help developers implement product analytics, including:

- The Ruby SDK is now open source on [GitHub](https://github.com/amplitude/itly-sdk-ruby) and we're excited for your contributions and [issues](https://github.com/amplitude/itly-sdk-ruby/issues)!
- We've modularized the Ruby SDK and adopted a plugin-based architecture to make working with the SDK more flexible and extensible
- The SDK is now made up of a set of "static" packages deployed to RubyGems and a thin "dynamic" wrapper created by `ampli pull`. This significantly reduces the SDK's footprint in your codebase
- The SDK supports Amplitude's [User Lookup](https://help.amplitude.com/hc/en-us/articles/229313067-User-Look-Up) for debugging and troubleshooting during development
- We've added native support for Snowplow using the official Snowplow Ruby [tracker](https://github.com/snowplow/snowplow-ruby-tracker)
- The SDK's APIs were cleaned up and match the latest API conventions and patterns adopted throughout Iteratively

### Tracking Plan Changes

- Update your source's runtime to ** * — Ruby ** from ** * - Ruby (Legacy) **
- Pull down the new SDK inside your project's folder (the one with the .itlyrc file):

```bash
ampli pull
```

### Code Changes

The main changes have been:
1. `Itly.load` method signature as [detailed above](#Load).

2. [Required dependencies](#install-dependencies)

    Replace references to old gems:
    ```ruby
    # Schema Validator (legacy)
    # gem 'json_schemer'
    # Replace with:
    gem 'itly-schema-validator'

    # Amplitude (legacy)
    # gem 'amplitude-api'
    # Replace with:
    gem 'itly-plugin-amplitude'

    # Segment (legacy)
    # gem 'simple_segment'
    # Replace with:
    gem 'itly-plugin-segment'
    ```

3. [Import path of the Itly SDK](#import-into-your-app)

    The Itly SDK is now imported via `require_relative`:
    ```ruby
    # Ruby (Legacy)
    # require 'itly'
    # Replace with:
    require_relative 'itly/itly'
    ```

For full usage of the new Itly Ruby SDK see this detailed example application.

[Amplitude Data Ruby Sample Application](https://bitbucket.org/seasyd/examples/src/master/ruby-v2/README.md)

<!-- Itly includes code docs in the auto-generated library so your IDE can display relevant documentation for every function and property as you type.

![Code documentation](/img/ruby.png) -->

<!-- ### Alias



### Plugins & Custom Destinations



### Logging -->


