---
title: Experiment Python SDK (Beta)
description: Official documentation for Amplitude Experiment's server-side Python SDK implementation.
icon: material/language-python
---

Official documentation for Amplitude Experiment's server-side Python SDK implementation.

[![PyPI version](https://badge.fury.io/py/amplitude-experiment.svg)](https://badge.fury.io/py/amplitude-experiment)

!!!info "SDK Resources"
     [:material-github: Github](https://github.com/amplitude/experiment-python-server) · [:material-code-tags-check: Releases](https://github.com/amplitude/experiment-python-server/releases) · [:material-book: API Reference](https://amplitude.github.io/experiment-python-server/)

Python SDK supports [remote evaluation](../general/evaluation/remote-evaluation.md) now.

## Remote evaluation

Implements fetching variants for a user via [remote evaluation](../general/evaluation/remote-evaluation.md).

### Install

!!!info "Python version compatibility"

    The Python Server SDK works with Python 3.6+.

Install the Python Server SDK with pip.

=== "pip"

    ```bash
    pip install amplitude-experiment
    ```


!!!tip "Quick Start"

    1. [Initialize the experiment client](#initialize)
    2. [Fetch variants for the user](#fetch)
    3. [Access a flag's variant](#fetch)

    ```python
    from amplitude_experiment import Experiment, Config, Client, User

    # (1) Initialize the experiment client
    experiment = Experiment.initialize('<DEPLOYMENT_KEY>')

    # (2) Fetch variants for a user
    user = User(
        device_id="abcdefg",
        user_id="user@company.com",
        user_properties={
            'premium': True
        }
    )
    variants = experiment.fetch(user)

    # (3) Access a flag's variant
    variant = variants['YOUR-FLAG-KEY']
    if variant:
        if variant.value == 'on':
            # Flag is on
        else:
            # Flag is off
    ```

### Initialize

The SDK client should be initialized in your server on startup. The [deployment key](../general/data-model.md#deployments) argument passed into the `api_key` parameter must live within the same project that you are sending analytics events to.

```python
Experiment.initialize(api_key, config = None) : Client
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `api_key` | required | The [deployment key](../general/data-model.md#deployments) which authorizes fetch requests and determines which flags should be evaluated for the user. |
| `config` | optional | The client [configuration](#configuration) used to customize SDK client behavior. |

!!!info "Timeout & Retry Configuration"
    Please configure the timeout and retry options to best fit your performance requirements.
    ```python
    experiment = Experiment.initialize('<DEPLOYMENT_KEY>', Config())
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

```python
fetch(user: User) : Variants
```

| Parameter  | Requirement | Description |
| --- | --- | --- |
| `user` | required | The user [user](../general/data-model.md#users) to remote fetch variants for. |

```python
user = User(
    device_id="abcdefg",
    user_id="user@company.com",
    user_properties={
        'premium': True
    }
)
variants = experiment.fetch(user)
```

After fetching variants for a user, you may to access the variant for a specific flag.

```python
variant = variants['YOUR-FLAG-KEY']
if variant:
    if variant.value == 'on':
        # Flag is on
    else:
        # Flag is off
```

### Fetch Async

The fetch method is synchronous. To fetch asynchronously, you can use `fetch_async` method
```python
fetch_async(user: User, callback)
```

| Parameter  | Requirement | Description                                                                   |
|------------|-------------|-------------------------------------------------------------------------------|
| `user`     | required    | The user [user](../general/data-model.md#users) to remote fetch variants for. |
| `callback` | optional    | The callback to handle the variants.                                          |

```python
def fetch_callback(user, variants):
  variant = variants['YOUR-FLAG-KEY']
  if variant:
    if variant.value == 'on':
      # Flag is on
    else:
      # Flag is off

experiment.fetch_async(user, fetch_callback)
```

## Accessing Amplitude cookies

If you're using the Amplitude Analytics SDK on the client-side, the Python server SDK provides an `AmplitudeCookie` class with convenience functions for parsing and interacting with the Amplitude identity cookie. This is useful for ensuring that the Device ID on the server matches the Device ID set on the client, especially if the client has not yet generated a Device ID.

```python
import uuid
from amplitude_experiment import AmplitudeCookie

# grab amp device id if present
amp_cookie_name = AmplitudeCookie.cookie_name('amplitude-api-key')
device_id = nil
if request.cookies.get(amp_cookie_name):
  device_id = AmplitudeCookie.parse(request.cookies.get(amp_cookie_name)).device_id

if device_id is None:
  # deviceId doesn't exist, set the Amplitude Cookie
  device_id = str(uuid.uuid4())
  amp_cookie_value = AmplitudeCookie.generate(device_id)
  resp.set_cookie(amp_cookie_name, {
    "value": amp_cookie_value,
    "domain": ".yourdomain.com",  # this should be the same domain used by the Amplitude JS SDK
    "httponly": False,
    "secure": False
  })
```
