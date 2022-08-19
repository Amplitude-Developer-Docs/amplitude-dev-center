---
title: Experiment Ruby SDK (Beta)
description: Official documentation for Amplitude Experiment's server-side Ruby SDK implementation.
icon: material/language-ruby
---

Official documentation for Amplitude Experiment's server-side Ruby SDK implementation.

[![Gem Version](https://badge.fury.io/rb/amplitude-experiment.svg)](https://badge.fury.io/rb/amplitude-experiment)

!!!info "SDK Resources"
     [:material-github: Github](https://github.com/amplitude/experiment-ruby-server) · [:material-code-tags-check: Releases](https://github.com/amplitude/experiment-ruby-server/releases) · [:material-book: API Reference](https://amplitude.github.io/experiment-ruby-server/)

This documentation is split into two sections for [remote](../general/evaluation/remote-evaluation.md) and [local](../general/evaluation/local-evaluation.md) evaluation:

* [Remote evaluation](#remote-evaluation)
* [Local evaluation](#local-evaluation)

## Remote evaluation

Implements fetching variants for a user via [remote evaluation](../general/evaluation/remote-evaluation.md).

### Install

!!!info "Ruby version compatibility"

    The Ruby Server SDK works with Ruby 2.0+.

Install the Ruby Server SDK with bundler or gem directly.

=== "bundler"

    ```bash
    gem 'amplitude-experiment'
    ```

=== "gem"

    ```bash
    gem install amplitude-experiment --pre
    ```

!!!tip "Quick Start"

    1. [Initialize the experiment client](#initialize)
    2. [Fetch variants for the user](#fetch)
    3. [Access a flag's variant](#fetch)

    ```ruby
    require 'amplitude-experiment'

    # (1) Initialize the experiment client
    experiment = AmplitudeExperiment.init_remote('<DEPLOYMENT_KEY>', AmplitudeExperiment::RemoteEvaluationConfig.new)

    # (2) Fetch variants for a user
    user = AmplitudeExperiment::User.new(
      user_id: 'user@company.com',
      device_id: 'abcdefg',
      user_properties: {
        'premium' => true
      }
    )
    variants = experiment.fetch(user)

    # (3) Access a flag's variant
    variant = variants['YOUR-FLAG-KEY']
    unless variant.nil?
        if variant.value == 'on'
            # Flag is on
        else
            # Flag is off
        end
    end
    ```

### Initialize

The SDK client should be initialized in your server on startup. The [deployment key](../general/data-model.md#deployments) argument passed into the `apiKey` parameter must live within the same project that you are sending analytics events to.

```ruby
init_remote(apiKey, config = nil) : Client
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `apiKey` | required | The [deployment key](../general/data-model.md#deployments) which authorizes fetch requests and determines which flags should be evaluated for the user. |
| `config` | optional | The client [configuration](#configuration) used to customize SDK client behavior. |

!!!info "Timeout & Retry Configuration"
     Please configure the timeout and retry options to best fit your performance requirements.
    ```ruby
    experiment = AmplitudeExperiment.init_remote('<DEPLOYMENT_KEY>', AmplitudeExperiment::RemoteEvaluationConfig.new)
    ```

#### Configuration

The SDK client can be configured on initialization.

???config "Configuration Options"
    | <div class="big-column">Name</div>  | Description | Default Value |
    | --- | --- | --- |
    | `debug` | Enable additional debug logging. | `false` |
    | `server_url` | The host to fetch variants from. | `https://api.lab.amplitude.com` |
    | `fetch_timeout_millis` | The timeout for fetching variants in milliseconds. This timeout only applies to the initial request, not subsequent retries | `10000` |
    | `fetch_retries` | The number of retries to attempt if a request to fetch variants fails. | `0` |
    | `fetch_retry_backoff_min_millis` | The minimum (initial) backoff after a request to fetch variants fails. This delay is scaled by the `fetchRetryBackoffScalar` | `500` |
    | `fetch_retry_backoff_max_millis` | The maximum backoff between retries. If the scaled backoff becomes greater than the max, the max is used for all subsequent requests | `10000` |
    | `fetch_retry_backoff_scalar` | Scales the minimum backoff exponentially. | `1.5` |
    | `fetch_retry_timeout_millis` | The request timeout for retrying variant fetches. | `10000` |



### Fetch

Fetches variants for a [user](../general/data-model.md#users) and returns the results. This function [remote evaluates](../general/evaluation/remote-evaluation.md) the user for flags associated with the deployment used to initialize the SDK client.

```ruby
fetch(user: AmplitudeExperiment::User) : Variants
```

| Parameter  | Requirement | Description |
| --- | --- | --- |
| `user` | required | The user [user](../general/data-model.md#users) to remote fetch variants for. |

```ruby
user = AmplitudeExperiment::User.new(
    user_id: 'user@company.com',
    device_id: 'abcdefg',
    user_properties: {
        'premium' => true
    }
)
variants = experiment.fetch(user)
```

After fetching variants for a user, you may to access the variant for a specific flag.

```ruby
variant = variants['YOUR-FLAG-KEY']
unless variant.nil?
  if variant.value == 'on'
    # Flag is on
  else
    # Flag is off
  end
end
```

### Fetch Async

The fetch method is synchronous. To fetch asynchronously, you can use `fetch_async` method
```ruby
fetch_async(user: AmplitudeExperiment::User, &callback)
```

| Parameter  | Requirement | Description                                                                                           |
|------------|-------------|-------------------------------------------------------------------------------------------------------|
| `user`     | required    | The user [user](../general/data-model.md#users) to remote fetch variants for.                         |
| `callback` | optional    | The callback to handle the variants. Callback takes two arguments: User object and returned Variants. |

```ruby
experiment.fetch_async(user) do |_, variants|
  variant = variants['sdk-ci-test']
  unless variant.nil?
    if variant.value == 'on'
      # Flag is on
    else
      # Flag is off
    end
  end
end
```

## Local evaluation

Implements evaluating variants for a user via [local evaluation](../general/evaluation/local-evaluation.md). If you plan on using local evaluation, you should [understand the tradeoffs](../general/evaluation/local-evaluation.md#targeting-capabilities).

!!!warning "Local Evaluation Mode"
    The local evaluation client can only evaluation flags which are [set to local evaluation mode](../guides/create-local-evaluation-flag.md).

### Install

Install the Ruby Server SDK's local evaluation.

!!!architecture support"

    **Supported**

    * darwin/amd64
    * darwin/arm64
    * linux/amd64
    * linux/arm64

    **Alpine linux is not supported** at this time.

    If you need another OS/Arch supported, please [submit an issue on github](https://github.com/amplitude/experiment-ruby-server/issues/new) or email [experiment@amplitude.com](mailto:experiment@amplitude.com).

Install the Ruby Server SDK with bundler or gem directly.

!!!info "Ruby version compatibility"

    The Ruby Server SDK works with Ruby 2.0+.

=== "bundler"

    ```bash
    gem 'amplitude-experiment'
    ```

=== "gem"

    ```bash
    gem install amplitude-experiment --pre
    ```

!!!tip "Quick Start"

    1. [Initialize the experiment client](#initialize)
    2. [Start the local evaluation client](#start)
    3. [Evaluate a user](#evaluate)

    ```ruby
    require 'amplitude-experiment'

    # (1) Initialize the local evaluation client with a server deployment key.
    experiment = AmplitudeExperiment.init_local('<DEPLOYMENT_KEY>', AmplitudeExperiment::LocalEvaluationConfig.new)

    # (2) Start the local evaluation
    experiment.start

    # (3) Evaluate a user
    user = AmplitudeExperiment::User.new(
      user_id: 'user@company.com',
      device_id: 'abcdefg',
      user_properties: {
        'premium' => true
      }
    )
    variants = expriment.evaluate(user)
    variant = variants['YOUR-FLAG-KEY']
    unless variant.nil?
        if variant.value == 'on'
            # Flag is on
        else
            # Flag is off
        end
    end
    ```

### Initialize

Initializes a [local evaluation](../general/evaluation/local-evaluation.md) client.

!!!warning "Server Deployment Key"
    You must [initialize](#initialize_1) the local evaluation client with a server [deployment](../general/data-model.md#deployments) key in order to get access to local evaluation flag configs.

```ruby
AmplitudeExperiment.init_local(api_key)
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `apiKey` | required | The server [deployment key](../general/data-model.md#deployments) which authorizes fetch requests and determines which flags should be evaluated for the user. |
| `config` | optional | The client [configuration](#configuration) used to customize SDK client behavior. |

!!!tip "Flag Polling Interval"
    Use the `flag_config_polling_interval_millis` [configuration](#configuration_1) to determine the time flag configs take to update once modified (default 30s).

#### Configuration

The SDK client can be configured on initialization.

???config "Configuration Options"
    | <div class="big-column">Name</div> | Description | Default Value |
    | --- | --- | --- |
    | `server_url` | The host to fetch flag configurations from. | `https://api.lab.amplitude.com` |
    | `bootstrap` |	Bootstrap the client with a map of flag key to flag configuration | `{}` |
    | `flag_config_polling_interval_millis` | The interval to poll for updated flag configs after calling [`start`](#start) | `30000` |
    | `debug` | Set to `true` to enable debug logging. | `false` |

### Start

Start the local evaluation client, pre-fetching local evaluation mode flag configs for [evaluation](#evaluate) and starting the flag config poller at the [configured](#configuration_1) interval.

```ruby
start
```

You should await the result of `start` to ensure that flag configs are ready to be used before calling [`evaluate()`](#evaluate)

```ruby
experiment.start
```

### Evaluate

Executes the [evaluation logic](../general/evaluation/implementation.md) using the flags pre-fetched on [`start()`](#start). Evaluate must be given a user object argument and can optionally be passed an array of flag keys if only a specific subset of required flag variants are required.

```ruby
evaluate(user, flag_keys)
```

| Parameter   | Requirement | Description |
|-------------| --- | --- |
| `user`      | required | The [user](../general/data-model.md#users) to evaluate. |
| `flag_keys` | optional | Specific flags or experiments to evaluate. If nil, or empty, all flags and experiments are evaluated. |

```ruby
# The user to evaluate
user = AmplitudeExperiment::User.new(user_id: 'test-user')
# Evaluate all flag variants
all_variants = experiment.evaluate(user)
# Evaluate a specific subset of flag variants
specific_variants = experiment.evaluate(user, ["<FLAG_KEY_1>", "<FLAG_KEY_2>"])
# Access a variant
variant = all_variants["<FLAG_KEY>"]
if variant.value == 'on':
    # Flag is on
else:
    # Flag is off
end
```

## Accessing Amplitude cookies

If you're using the Amplitude Analytics SDK on the client-side, the Ruby server SDK provides an `AmplitudeCookie` class with convenience functions for parsing and interacting with the Amplitude identity cookie. This is useful for ensuring that the Device ID on the server matches the Device ID set on the client, especially if the client has not yet generated a Device ID.

```ruby
require 'amplitude-experiment'

# grab amp device id if present
amp_cookie_name = AmplitudeExperiment::AmplitudeCookie.cookie_name('amplitude-api-key')
device_id = nil
unless cookies[amp_cookie_name].nil?
  device_id = AmplitudeExperiment::AmplitudeCookie.parse(cookies[amp_cookie_name]).device_id
end

if device_id.nil?
  # deviceId doesn't exist, set the Amplitude Cookie
  device_id = SecureRandom.uuid
  amp_cookie_value = AmplitudeExperiment::AmplitudeCookie.generate(device_id)
  cookies[amp_cookie_name] = {
    value: amp_cookie_value,
    domain: '.yourdomain.com', # this should be the same domain used by the Amplitude JS SDK
    httponly: false,
    secure: false
  }
end
```
