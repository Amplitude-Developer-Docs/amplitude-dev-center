---
title: Experiment Ruby SDK (Beta)
description: Official documentation for Amplitude Experiment's server-side Ruby SDK implementation.
icon: material/language-ruby
---

Official documentation for Amplitude Experiment's server-side Ruby SDK implementation.

[![Gem Version](https://badge.fury.io/rb/amplitude-experiment.svg)](https://badge.fury.io/rb/amplitude-experiment)

!!!info "SDK Resources"
     [:material-github: Github](https://github.com/amplitude/experiment-ruby-server) · [:material-code-tags-check: Releases](https://github.com/amplitude/experiment-ruby-server/releases) · [:material-book: API Reference](https://amplitude.github.io/experiment-ruby-server/)

Ruby SDK supports [remote evaluation](../general/evaluation/remote-evaluation.md) now.

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
    experiment = Experiment.init('<DEPLOYMENT_KEY>', Experiment::Config.new(
      fetch_timeout_millis: 500,
      fetch_retries: 1,
      fetch_retry_backoff_min_millis: 0,
      fetch_retry_timeout_millis: 500
    ))

    # (2) Fetch variants for a user
    user = Experiment::User.new(
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
init(apiKey, config = nil) : Client
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `apiKey` | required | The [deployment key](../general/data-model.md#deployments) which authorizes fetch requests and determines which flags should be evaluated for the user. |
| `config` | optional | The client [configuration](#configuration) used to customize SDK client behavior. |

!!!info "Timeout & Retry Configuration"
     Please configure the timeout and retry options to best fit your performance requirements.

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
fetch(user: Experiment::User) : Variants
```

| Parameter  | Requirement | Description |
| --- | --- | --- |
| `user` | required | The user [user](../general/data-model.md#users) to remote fetch variants for. |

```ruby
user = Experiment::User.new(
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
fetch_async(user: Experiment::User, &callback)
```

| Parameter  | Requirement | Description                                                                   |
|------------|-------------|-------------------------------------------------------------------------------|
| `user`     | required    | The user [user](../general/data-model.md#users) to remote fetch variants for. |
| `callback` | optional    | The callback to handle the variants.                                          |

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

## Accessing Amplitude cookies

If you're using the Amplitude Analytics SDK on the client-side, the Ruby server SDK provides an `AmplitudeCookie` class with convenience functions for parsing and interacting with the Amplitude identity cookie. This is useful for ensuring that the Device ID on the server matches the Device ID set on the client, especially if the client has not yet generated a Device ID.

```ruby
require 'amplitude-experiment'

# grab amp device id if present
amp_cookie_name = Experiment::AmplitudeCookie.cookie_name('amplitude-api-key')
device_id = nil
unless cookies[amp_cookie_name].nil?
  device_id = Experiment::AmplitudeCookie.parse(cookies[amp_cookie_name]).device_id
end

if device_id.nil?
  # deviceId doesn't exist, set the Amplitude Cookie
  device_id = SecureRandom.uuid
  amp_cookie_value = Experiment::AmplitudeCookie.generate(device_id)
  cookies[amp_cookie_name] = {
    value: amp_cookie_value,
    domain: '.yourdomain.com', # this should be the same domain used by the Amplitude JS SDK
    httponly: false,
    secure: false
  }
end
```
