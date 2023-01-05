---
title: Experiment Python SDK
description: Official documentation for Amplitude Experiment's server-side Python SDK implementation.
icon: simple/python
---

Official documentation for Amplitude Experiment's server-side Python SDK implementation.

[![PyPI version](https://badge.fury.io/py/amplitude-experiment.svg)](https://badge.fury.io/py/amplitude-experiment)

!!!info "SDK Resources"
     [:material-github: GitHub](https://github.com/amplitude/experiment-python-server) · [:material-code-tags-check: Releases](https://github.com/amplitude/experiment-python-server/releases) · [:material-book: API Reference](https://amplitude.github.io/experiment-python-server/)

This documentation has separate sections for [remote](../general/evaluation/remote-evaluation.md) and [local](../general/evaluation/local-evaluation.md) evaluation:

* [Remote evaluation](#remote-evaluation)
* [Local evaluation](#local-evaluation)

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
    from amplitude_experiment import Experiment, RemoteEvaluationConfig, RemoteEvaluationClient, User

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

    **Not getting the expected variant result for your flag?** Make sure your flag [is activated](../guides/getting-started/create-a-flag.md#activate-the-flag), has a [deployment set](../guides/getting-started/create-a-flag.md#add-a-deployment), and has [users allocated](../guides/getting-started/create-a-flag.md#configure-targeting-rules).

### Initialize

The SDK client should be initialized in your server on startup. The [deployment key](../general/data-model.md#deployments) argument passed into the `api_key` parameter must live within the same project that you are sending analytics events to.

```python
Experiment.initialize_remote(api_key, config = None) : RemoteEvaluationClient
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `api_key` | required | The [deployment key](../general/data-model.md#deployments) which authorizes fetch requests and determines which flags should be evaluated for the user. |
| `config` | optional | The client [configuration](#configuration) used to customize SDK client behavior. |

!!!info "Timeout & Retry Configuration"
    Configure the timeout and retry options to best fit your performance requirements.
    ```python
    experiment = Experiment.initialize_remote('<DEPLOYMENT_KEY>', Config())
    ```

#### Configuration

You can configure the SDK client on initialization.

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

!!!info "EU Data Center"
    If you're using Amplitude's EU data center, configure the `serverUrl` option on initialization to `https://api.lab.eu.amplitude.com`

### Fetch

Fetches variants for a [user](../general/data-model.md#users) and returns the results. This function [remote evaluates](../general/evaluation/remote-evaluation.md) the user for flags associated with the deployment used to initialize the SDK client.

```python
fetch(user: User) : Variants
```

| Parameter  | Requirement | Description |
| --- | --- | --- |
| `user` | required | The [user](../general/data-model.md#users) to remote fetch variants for. |

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

### Fetch async

The fetch method is synchronous. To fetch asynchronously, you can use `fetch_async` method

```python
fetch_async(user: User, callback)
```

| Parameter  | Requirement | Description                                                                   |
|------------|-------------|-------------------------------------------------------------------------------|
| `user`     | required    | The [user](../general/data-model.md#users) to remote fetch variants for. |
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

## Local evaluation

Implements evaluating variants for a user via [local evaluation](../general/evaluation/local-evaluation.md). If you plan on using local evaluation, you should [understand the tradeoffs](../general/evaluation/local-evaluation.md#targeting-capabilities).

!!!warning "Local Evaluation Mode"
    The local evaluation client can only evaluation flags which are [set to local evaluation mode](../guides/create-local-evaluation-flag.md).

### Install

Install the Python Server SDK's local evaluation.

!!!warning "OS, and architecture support"
    The local evaluation package currently only supports the following OS' and architectures (`OS/ARCH`):

    **Supported**

    * darwin/amd64
    * darwin/arm64
    * linux/amd64
    * linux/arm64

    **Alpine linux is not supported** at this time.

    If you need another OS/Arch supported, please [submit an issue on github](https://github.com/amplitude/experiment-python-server/issues/new) or email [experiment@amplitude.com](mailto:experiment@amplitude.com).

Install the Python Server SDK with pip.

=== "pip"

    ```bash
    pip install amplitude-experiment
    ```

!!!tip "Quick Start"

    1. [Initialize the local evaluation client.](#initialize_1)
    2. [Start the local evaluation client.](#start)
    3. [Evaluate a user.](#evaluate)

    ```python
    # (1) Initialize the local evaluation client with a server deployment key.
    experiment = Experiment.initialize_local(api_key)

    # (2) Start the local evaluation client.
    experiment.start()

    # (3) Evaluate a user.
    user = User(
        device_id="abcdefg",
        user_id="user@company.com",
        user_properties={
            'premium': True
        }
    )
    variants = experiment.evaluate(user)
    ```

    **Not getting the expected variant result for your flag?** Make sure your flag [is activated](../guides/getting-started/create-a-flag.md#activate-the-flag), has a [deployment set](../guides/getting-started/create-a-flag.md#add-a-deployment), and has [users allocated](../guides/getting-started/create-a-flag.md#configure-targeting-rules).

### Initialize

Initializes a [local evaluation](../general/evaluation/local-evaluation.md) client.

!!!warning "Server Deployment Key"
    You must [initialize](#initialize_1) the local evaluation client with a server [deployment](../general/data-model.md#deployments) key in to get access to local evaluation flag configs.

```python
Experiment.initialize_local(api_key, config = None) : LocalEvaluationClient
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `apiKey` | required | The server [deployment key](../general/data-model.md#deployments) which authorizes fetch requests and determines which flags should be evaluated for the user. |
| `config` | optional | The client [configuration](#configuration) used to customize SDK client behavior. |

!!!tip "Flag Polling Interval"
    Use the `flag_config_polling_interval_millis` [configuration](#configuration_1) to determine the time flag configs take to update once modified (default 30s).

#### Configuration

You can configure the SDK client on initialization.

???config "Configuration Options"
    | <div class="big-column">Name</div> | Description | Default Value |
    | --- | --- | --- |
    | `debug` | Set to `true` to enable debug logging. | `false` |
    | `server_url` | The host to fetch flag configurations from. | `https://api.lab.amplitude.com` |
    | `flag_config_polling_interval_millis` | The interval to poll for updated flag configs after calling [`start()`](#start) | `30000` |
    | `flag_config_poller_request_timeout_millis` | The timeout for the request made by the flag config poller | `10000` |

!!!info "EU Data Center"
    If you're using Amplitude's EU data center, configure the `serverUrl` option on initialization to `https://api.lab.eu.amplitude.com`

### Start

Start the local evaluation client, pre-fetching local evaluation mode flag configs for [evaluation](#evaluate) and starting the flag config poller at the [configured](#configuration_1) interval.

```python
start()
```

You should await the result of `start()` to ensure that flag configs are ready to be used before calling [`evaluate()`](#evaluate)

```python
experiment.start()
```

### Evaluate

Executes the [evaluation logic](../general/evaluation/implementation.md) using the flags pre-fetched on [`start()`](#start). Evaluate must be given a user object argument and can optionally be passed an array of flag keys if only a specific subset of required flag variants are required.

```go
evaluate(self, user: User, flag_keys: List[str]) : Dict[str, Variant]
```

| Parameter   | Requirement | Description |
|-------------| --- | --- |
| `user`      | required | The [user](../general/data-model.md#users) to evaluate. |
| `flag_keys` | optional | Specific flags or experiments to evaluate. If nil, or empty, all flags and experiments are evaluated. |

```python
# The user to evaluate
user = User(user_id='test_user')

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
```

## Access Amplitude cookies

If you're using the Amplitude Analytics SDK on the client-side, the Python server SDK provides an `AmplitudeCookie` class with convenience functions for parsing and interacting with the Amplitude identity cookie. This is useful for ensuring that the Device ID on the server matches the Device ID set on the client, especially if the client hasn't yet generated a Device ID.

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
