---
title: Experiment Node.js SDK
description: Official documentation for Amplitude Experiment's server-side Node.js SDK implementation.
icon: fontawesome/brands/node-js
---

Official documentation for Amplitude Experiment's server-side Node.js SDK implementation.

!!!info "SDK Resources"
    [:material-github: Github](https://github.com/amplitude/experiment-node-server) · [:material-code-tags-check: Releases](https://github.com/amplitude/experiment-node-server/releases) · [:material-book: API Reference](https://amplitude.github.io/experiment-node-server/)

This documentation is split into two sections for [remote](../general/evaluation/remote-evaluation.md) and [local](../general/evaluation/local-evaluation.md) evaluation:

* [Remote evaluation](#remote-evaluation)
* [Local evaluation](#local-evaluation)

## Remote evaluation

Implements fetching variants for a user via [remote evaluation](../general/evaluation/remote-evaluation.md).

### Install

!!!info "Node version compatibility"

    The Node Server SDK works with Node 10+.

Install the Node.js Server SDK with npm or yarn.

=== "npm"

    ```bash
    npm install --save @amplitude/experiment-node-server
    ```

=== "yarn"

    ```bash
    yarn add @amplitude/experiment-node-server
    ```

!!!tip "Quick Start"

    1. [Initialize the experiment client](#initialize)
    2. [Fetch variants for the user](#fetch)
    3. [Access a flag's variant](#fetch)

    ```js
    // (1) Initialize the experiment client
    const experiment = Experiment.initializeRemote('<DEPLOYMENT_KEY>', config: {
        fetchTimeoutMillis: 500,
        fetchRetries: 1,
        fetchRetryBackoffMinMillis: 0,
        fetchRetryTimeoutMillis: 500,
    });

    // (2) Fetch variants for a user
    const user = {
        user_id: 'user@company.com',
        device_id: 'abcdefg',
        user_properties: {
            'premium': true,
        },
    };
    const variants = await experiment.fetch(user);

    // (3) Access a flag's variant
    const variant = variants['YOUR-FLAG-KEY'];
    if (variant?.value === 'on') {
        // Flag is on
    } else {
        // Flag is off
    }
    ```

### Initialize remote

The SDK client should be initialized in your server on startup. The [deployment key](../general/data-model.md#deployments) argument passed into the `apiKey` parameter must live within the same project that you are sending analytics events to.

```js
initializeRemote(apiKey: string, config?: RemoteEvaluationConfig): RemoteEvaluationClient
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `apiKey` | required | The [deployment key](../general/data-model.md#deployments) which authorizes fetch requests and determines which flags should be evaluated for the user. |
| `config` | optional | The client [configuration](#configuration) used to customize SDK client behavior. |

!!!warning "Timeout & Retry Configuration"
    **The default timeout and retry configuration options are too high for most server environments**. Please configure the timeout and retry options to best fit your performance requirements. If [remote evaluation performance](../general/performance-and-caching.md#remote-evaluation) is too slow, consider using [local evaluation](#local-evaluation).

```js
const experiment = Experiment.initializeRemote('<DEPLOYMENT_KEY>', config: {
    fetchTimeoutMillis: 500,
    fetchRetries: 1,
    fetchRetryBackoffMinMillis: 0,
    fetchRetryTimeoutMillis: 500,
});
```

#### Configuration

The SDK client can be configured on initialization.

???config "Configuration Options"
    | <div class="big-column">Name</div>  | Description | Default Value |
    | --- | --- | --- |
    | `debug` | Enable additional debug logging. | `false` |
    | `serverUrl` | The host to fetch variants from. | `https://api.lab.amplitude.com` |
    | `fetchTimeoutMillis` | The timeout for fetching variants in milliseconds. This timeout only applies to the initial request, not subsequent retries | `10000` |
    | `fetchRetries` | The number of retries to attempt if a request to fetch variants fails. | `8` |
    | `fetchRetryBackoffMinMillis` | The minimum (initial) backoff after a request to fetch variants fails. This delay is scaled by the `fetchRetryBackoffScalar` | `500` |
    | `fetchRetryBackoffMaxMillis` | The maximum backoff between retries. If the scaled backoff becomes greater than the max, the max is used for all subsequent requests | `10000` |
    | `fetchRetryBackoffScalar` | Scales the minimum backoff exponentially. | `1.5` |
    | `fetchRetryTimeoutMillis` | The request timeout for retrying variant fetches. | `10000` |

### Fetch

Fetches variants for a [user](../general/data-model.md#users) and returns the results. This function [remote evaluates](../general/evaluation/remote-evaluation.md) the user for flags associated with the deployment used to initialize the SDK client.

```js
fetch(user: ExperimentUser): Promise<Variants>
```

| Parameter  | Requirement | Description |
| --- | --- | --- |
| `user` | required | The user [user](../general/data-model.md#users) to remote fetch variants for. |

```js
const user = {
    user_id: 'user@company.com',
    device_id: 'abcdefg',
    user_properties: {
        'premium': true,
    },
};
const variants = await experiment.fetch(user);
```

After fetching variants for a user, you may to access the variant for a specific flag.

```js
const variant = variants['YOUR-FLAG-KEY'];
if (variant?.value === 'on') {
    // Flag is on
} else {
    // Flag is off
}
```

## Local evaluation

Implements evaluating variants for a user via [local evaluation](../general/evaluation/local-evaluation.md). If you plan on using local evaluation, you should [understand the tradeoffs](../general/evaluation/local-evaluation.md#targeting-capabilities).

!!!note "Local Evaluation Mode"
    The local evaluation client can only evaluation flags which are [set to local evaluation mode](../guides/create-local-evaluation-flag.md).

### Install

Install the Node.js Server SDK with `npm` or `yarn`.

=== "npm"

    ```npm
    $ npm install --save @amplitude/experiment-node-server
    ```

=== "yarn"

    ```yarn
    $ yarn add @amplitude/experiment-node-server
    ```

!!!tip "Quick Start"

    1. [Initialize the local evaluation client.](#initialize-local)
    2. [Start the local evaluation client.](#start)
    3. [Evaluate a user.](#evaluate)

    ```js
    // (1) Initialize the local evaluation client with a server deployment key.
    const experiment = Experiment.initializeLocal('<DEPLOYMENT_KEY>');

    // (2) Start the local evaluation client.
    await experiment.start();

    // (2) Evaluate a user.
    const user = { device_id: 'abcdefg' };
    const variants = await experiment.evaluate(user);
    ```

### Initialize Local

Initializes a [local evaluation](../general/evaluation/local-evaluation.md) client.

!!!warning "Server Deployment Key"
    You must [initialize](#initialize-local) the local evaluation client with a server [deployment](../general/data-model.md#deployments) key in order to get access to local evaluation flag configs.

```js
initializeLocal(apiKey: string, config?: LocalEvaluationConfig): LocalEvaluationClient
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `apiKey` | required | The server [deployment key](../general/data-model.md#deployments) which authorizes fetch requests and determines which flags should be evaluated for the user. |
| `config` | optional | The client [configuration](#configuration) used to customize SDK client behavior. |

!!!tip "Flag Polling Interval"
    Use the `flagConfigPollingIntervalMillis` [configuration](#configuration-1) to determine the time flag configs take to update once modified (default 30s).

#### Configuration

The SDK client can be configured on initialization.

???config "Configuration Options"

    | <div class="big-column">Name</div> | Description | Default Value |
    | --- | --- | --- |
    | `debug` | Set to `true` to enable debug logging. | `false` |
    | `serverUrl` | The host to fetch flag configurations from. | `https://api.lab.amplitude.com` |
    | `bootstrap` | Bootstrap the client with a map of flag key to flag configuration | `{}` |
    | `flagConfigPollingIntervalMillis` | The interval (in milliseconds) to poll for updated flag configs after calling `start()` | `30000` |

### Start

Start the local evaluation client, pre-fetching local local evaluation mode flag configs for [evaluation](#evaluate) and starting the flag config poller at the [configured](#configuration) interval.

```js
start(): Promise<void>
```

You should await the result of `start()` to ensure that flag configs are ready to be used before calling [`evaluate()`](#evaluate)

```js
await experiment.start();
```

### Evaluate

Executes the [evaluation logic](../general/evaluation/implementation.md) using the flags pre-fetched on [`start()`](#start). Evaluate must be given a user object argument and can optionally be passed an array of flag keys if only a specific subset of required flag variants are required.

```js
evaluate(user: ExperimentUser, flagKeys?: string[]): Promise<Variants>
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `user` | required | The [user](../general/data-model.md#users) to evaluate. |
| `flagKeys` | optional | Specific flags or experiments to evaluate. If undefined, null, or empty, all flags and experiments are evaluated. |

```js
// The user to evaluate
const user = { device_id: 'abcdefg' };

// Evaluate all flag variants
const allVariants = await experiment.evaluate(user);

// Evaluate a specific subset of flag variants
const specificVariants = await experiment.evaluate(user, [
  'my-local-flag-1',
  'my-local-flag-2',
]);
```

## Accessing Amplitude cookies

If you're using the Amplitude Analytics SDK on the client-side, the Node.js server SDK provides an `AmplitudeCookie` class with convenience functions for parsing and interacting with the Amplitude identity cookie. This is useful for ensuring that the Device ID on the server matches the Device ID set on the client, especially if the client has not yet generated a Device ID.

```js
import { AmplitudeCookie } from '@amplitude/experiment-node-server';

app.use((req, res, next) => {
  const { query, cookies, url, path, ip, host } = req

  // grab amp device id if present
  const ampCookieName = AmplitudeCookie.cookieName('amplitude-api-key');
  let deviceId = null;
  if (cookies[ampCookieName]) {
    deviceId = AmplitudeCookie.parse(cookies[ampCookieName]).device_id;
  }
  if (!deviceId) {
    // deviceId doesn't exist, set the Amplitude Cookie
    deviceId = random22CharBase64String();
    const ampCookieValue = AmplitudeCookie.generate(deviceId);
    res.cookie(ampCookieName, ampCookieValue, {
      domain: '.yourdomain.com', // this should be the same domain used by the Amplitude JS SDK
      maxAge: 365 * 24 * 60 * 60 * 1000, // this is currently the same as the default in the Amplitude JS SDK, can be modified
      sameSite: 'Lax'
    });
  }

  next()
});
```
