---
title: Local Evaluation Node.js SDK
description: Local evaluation in the nodejs alpha sdk.
---

The current SDK for local evaluation supports the Node.js server environment. Future SDKs are in the works.

## Install

Install the `experiment-node-server` SDK from the `alpha` tag.

=== "npm"

    ```npm
    $ npm install --save @amplitude/experiment-node-server@alpha
    ```

=== "yarn"

    ```yarn
    $ yarn add @amplitude/experiment-node-server@alpha
    ```

## Quick Start

```js
import { Experiment } from '@amplitude/experiment-node-server';

// (1) Initialize and start the LocalEvaluationClient
const apiKey = 'YOUR-API-KEY';
const localClient = Experiment.initializeLocal(apiKey);
await localClient.start();

// (2) Evaluate a user
const user = { device_id: 'abcd1234' };
const variants = localClient.evaluate(user);
```

1.  [Initialize and start the local evaluation client](https://developers.experiment.amplitude.com/docs/node-server-sdk#initialization)
2.  [Evaluate a user](https://developers.experiment.amplitude.com/docs/node-server-sdk#evaluation)

### Initialization

You may initialize a singleton instance of a `LocalEvaluationClient` via the `initializeLocal()` factory function or using the class constructor. The only required input for initializing a client is the environment api key.

Unless you are using the `bootstrap` config option to bootstrap the client with pre-fetched flag configurations, you will need to `start()` the client and await the initial fetch for flag configurations. Initializing and starting the client should occur on server startup, otherwise `evaluate()` may not have access to the required flag configurations. `start()` resolves when the initial flag configurations have been fetched, and throws if the request failed.

```js
const localClient = new Experiment.initializeLocal(apiKey);
await localClient.start();
```

The constructor allows for multiple instances and additional configuration of custom caching and transport implementations.

```js
const localClient = new LocalEvaluationClient(apiKey);
await localClient.start();
```

### Configuration

You may optionally configure the client via the `LocalEvaluationConfiguration`.

| <div class="big-column">Name</div> | Description | Default Value |
| --- | --- | --- |
| `debug` | Set to `true` to enable debug logging. | `false` |
| `serverUrl` | The host to fetch flag configurations from. | `https://api.lab.amplitude.com` |
| `bootstrap` | Bootstrap the client with a map of flag key to flag configuration | `{}` |
| `flagConfigPollingIntervalMillis` | The interval (in milliseconds) to poll for updated flag configs after calling `start()` | `30000` |

### Evaluation

The `evaluate()` function performs the local evaluation logic using the flags fetched and stored in the `FlagConfigCache` on `start()`. Evaluate must be given a user object argument and can optionally be passed an array of flag keys if only a specific subset of required flag variants are required.

```js
// The user to evaluate
const user = { device_id: 'abdc1234' };

// Evaluate all flag variants
const allVariants = localClient.evaluate(user);

// Evaluate a specific subset of flag variants
const specificVariants = localClient.evaluate(user, [
  'my-local-flag-1',
  'my-local-flag-2',
]);
```

## Exposure Tracking

In remote evaluation, the amplitude evaluation servers automatically set a user property when a user is assigned a variant. This user property is used during analysis to determine which variant a user was assigned.

In local evaluation, we cannot rely on the evaluation server to set this user property. In other words, for a locally evaluated user to be analyzed within an experiment, a specific user property with the assigned variant as the value must be set on the user.

###

You may choose to set the user property which has been assigned to the user from your server environment immediately after the evaluation completes. This would be very similar to the way evaluation works on the amplitude evaluation server.

```js
  // Evaluate all local flag variants for the user
  const variants = await localClient.evaluate(user);

  // Set the user properties for analysis
  for (const flagKey in Object.keys(variants)) {
    const variant = variants[flagKey];
    analytics.identify(
      user.user_id,
      user.device_id,
      new Identify().set(`[Experiment] ${flagKey}`, variant.value),
    );
  }
```

!!!note
    Implementation may vary depending on the analytics SDK being used. This code only sets user properties, and does not work for unsetting/ramping down allocation.

| Pros | Cons |
| --- | --- |
| - Only requires changes to the server-side.\
- Good for getting initially set up. | - Does not accurately track a users exposure.\
- Generates a lot of unnecessary identifications since keeping state per user does not scale. |

### Client-side

Exposures may be tracked on a bootstrapped client-side application by utilizing an analytics provider implementation for [automatic client-side exposure tracking](https://developers.experiment.amplitude.com/docs/exposure-tracking). The analytics provider automatically tracks exposure events and sets/unsets user properties when `variant(...)` is called.

| Pros | Cons |
| --- | --- |
| - More accurately track user's exposure to a variant | - Requires initial changes to both client and server (unless analytics provider is already being used). |