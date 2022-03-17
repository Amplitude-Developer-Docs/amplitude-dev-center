--- 
title: Experiment JavaScript Client SDK
description: Official documentation for Amplitude Experiment's Client-side JavaScript SDK implementation.
icon: material/language-javascript
---

![npm version](https://badge.fury.io/js/%40amplitude%2Fexperiment-js-client.svg)

Official documentation for Amplitude Experiment's Client-side JavaScript SDK implementation.

???info "SDK Resources"
    - [JavaScript Client SDK Reference :material-book:](https://amplitude.github.io/experiment-js-client/)
    - [JavaScript Client Repository :material-github:](https://github.com/amplitude/experiment-js-client)
    - [JavaScript Client Releases :material-code-tags-check:](https://github.com/amplitude/experiment-js-client/releases)

## Installation

Install the Experiment JavaScript Client SDK with npm or yarn.

=== "npm"

    ```bash
    npm install --save @amplitude/experiment-js-client
    ```

=== "yarn"

    ```bash
    yarn add @amplitude/experiment-js-client
    ```

!!!info "Browser compatibility"

    The JavaScript Client SDK works with all major browsers and IE10+. The SDK does make use of Promises, so if you are targeting a browser that does not have native support for Promise (for example, IE), you should include a polyfill for Promise, (for example, [es6-promise](https://github.com/stefanpenner/es6-promise)).

## Quick Start

1. [Get your deployment's API key](../create-deployment.md)
2. [Initialize the experiment client](#initialization)
3. [Fetch variants for a user](#fetch-variants-for-a-user)
4. [Lookup a flag's variant](#look-up-a-variant)

```js
import { Experiment } from '@amplitude/experiment-js-client';

// (1) Get your deployment's API key
const apiKey = 'YOUR-API-KEY';

// (2) Initialize the experiment client
const experiment = Experiment.initialize(apiKey);

// (3) Fetch variants for a user
const user = {
  user_id: 'user@company.com',
  device_id: 'abcezas123',
  user_properties: {
    'premium': true,
  },
};
await experiment.fetch(user);

// (4) Lookup a flag's variant
const variant = experiment.variant('YOUR-FLAG-KEY');
if (variant.value === 'on') {
  // Flag is on
} else {
    // Flag is off
}
```

## Initialization

Initialize the client in your application startup. You will need the API Key for your deployment. You can find the API Key in the Deployments section of your Experiment instance. To learn more about how to setup your Project and deployments, please refer to [Deployments](https://developers.experiment.amplitude.com/docs/deployments).

!!!info  "Singleton instance"

    Initialization returns a singleton instance based on the `instanceName` configuration backed by local storage. It is recommended that you either (a) inject the initialized instance throughout your application or (b) wrap the initialized `ExperimentClient` in your own API. Subsequent calls to `initialize` will return the first initialized instance for the instance name.

  ```js title="index.js"
  import { Experiment } from '@amplitude/experiment-js-client';

  const apiKey = 'YOUR-API-KEY';
  const experiment = Experiment.initialize(apiKey);
  ```

### Amplitude Analytics Integration

If you use the Amplitude Analytics SDK alongside Experiment, then you can initialize your Experiment SDK to seamlessly integrate with analytics. This initializer sets up the `userProvider` and `exposureTrackingProvider` for you, which enables exposure tracking and real-time user properties

```js
amplitude.getInstance().initialize('your-project-api-key');
Experiment.intializeWithAmplitudeAnalytics('your-project-deployment-key');
```

### Configuration

The `ExperimentClient` can be configured on initialization. Once initialized, the client's configuration cannot be changed. Initialize an empty object for the default configuration, or use the `ExperimentConfig.Builder` to build a [custom configuration](https://developers.experiment.amplitude.com/docs/configuration#server-side).

```js
const defaultConfig = {};
const customConfig = {
  debug: true,
  fetchTimeoutMillis: 500,
};
```

## Fetch Variants for a User

After initializing an `ExperimentClient`, you will need to fetch variants for your user. First, create your `ExperimentUser` then call your client's `fetch` method with the user. This will make a request for all variants that the user is assigned, and return a promise that resolves when the request completes. The result is a dictionary from `key` to assigned `Variant`. Variants contain a `value` field containing the value of the variant assigned to the user.

```js
// Create experiment user
const user = {
  user_id: 'user@company.com',
  device_id: 'abcezas123',
  user_properties: {
    'premium': true,
  },
};

// Fetch variants assigned to the user
const all = await experiment.fetch(user);
```

!!!note "User identity"

    The user must contain a Device ID and/or User ID, and those values must be the same as the values you pass to Amplitude Analytics. You can choose to [connect to the Amplitude Analytics SDK](https://developers.experiment.amplitude.com/docs/javascript-client-sdk#connecting-to-the-amplitude-analytics-sdk), which provides a convenient way of providing the Device ID and User ID without having to explicitly set them on the `ExperimentUser`

## Look up a Variant

To implement an experiment or flag, you will need to first [create a flag or experiment](https://developers.experiment.amplitude.com/docs/create-a-flag) in the Experiment user interface, and copy the key from the top of the Experiment interface.

When you need an assignment for a flag or experiment, you can call `variant`. This will retrieve the variation assignment from the local cache, and return the `Variant` value and payload for which the `ExperimentUser` context is assigned.

```js title="feature.js"
// Get the variant for the flag, returning the variant value
const variant = experiment.variant(key);

// Change the experience based on the variant
if (variant.value === 'on') {
  // Flag is on
} else {
    // Flag is off
```

### Accessing the Payload

A [`Variant`](https://developers.experiment.amplitude.com/docs/variants) contains an optional `payload` which may be set when configuring your feature flag or experiment.

For example, if you have a flag `my-feature-flag` with a variant `on` which contains a payload `{"key":"value"}`, you can access the payload via the variant `payload` member.

<!-- note for brian, is there a reason why this example was in typescript?-->

```typescript
// Get the variant for the flag, returning the variant value
const variant = experiment.variant('my-feature-flag');

// Change the experience based on the variant
if (variant.value === 'on') {
  const value = variant.payload?.key;
}
```

### Local Storage

Client-side Experiment SDKs persist the most recently `fetch`ed variants for your user (uses local storage for persistence). If variants have not been fetched, or the variant to look up has not been assigned to the user, then the client will fall back to various defaults.

### Fallbacks

The experiment client uses three types of fallbacks: explicit, initial variants, and the default fallback variant. Explicit fallbacks are passed into the client's `variant(string, Variant)` function, whereas initial variants and the default fallback variant fallbacks are configured in the client's `ExperimentConfig`.

### Fallback Priority

The initial source of variants is determined by the configuration's `Source`. If the look up cannot find a variant from the `source` for the given key the order of fallbacks is as follows:

1. Explicit fallback (must be non-null)
2. `initialVariants` (or the local storage if `source` is set to initial variants)
3. `fallbackVariant` (defaults to an [empty variant](https://developers.experiment.amplitude.com/docs/variants))

## Track Exposures

!!! note "Configuration Required"

    You must configure the experiment SDK in order to enable exposure tracking; either through an [integration with the Amplitude Analytics SDK](https://developers.experiment.amplitude.com/docs/javascript-client-sdk#amplitude-analytics-sdk-integration) or by implementing a custom `ExposureTrackingProvider`. For more information about setting up exposure tracking, please read our [detailed documentation on exposure tracking](https://developers.experiment.amplitude.com/docs/exposure-tracking).

### Automatic Exposure Tracking

Automatic exposure tracking, which is enabled by default, tracks an exposure event when a variant is access from the experiment SDK via the `variant()` method. Subsequent variant accesses do not trigger an exposure event unless the flag's variant has changed since the last exposure was tracked within the same session.

```js
const experiment = Experiment.initializeWithAmplitudeAnalytics(apiKey);
await experiment.fetch(); // receives {"my-experiment":{"value":"treatment"}}
experiment.variant('my-experiment'); // Exposure event tracked
experiment.variant('my-experiment'); // Exposure event not tracked
```

### Explicit Exposure Tracking

Automatic exposure tracking may be turned off via the `automaticExposureTracking` configuration option if you wish to be explicit about when exposure events are tracked. Setting this configuration option to false works best in tandem with the new `exposure()` function on the experiment client. The `exposure()` function will track an exposure event through the exposure tracking provider using the available variant in the SDK's variant cache for the provided flag/experiment key.

```js
const experiment = Experiment.initializeWithAmplitudeAnalytics(apiKey, {
  automaticExposureTracking: false
});

// Exposure event not tracked
const variant = experiment.variant('my-experiment');

// Exposure event tracked
experiment.exposure('my-experiment');
```

## Amplitude Analytics SDK Integration

Integrating Amplitude Analytics and Experiment SDKs in your app is as easy and provides you with a number of benefits to ensure a correct implementation of Amplitude Experiment:

- User Identity Management
  - Changes to User ID, Device ID, and User Properties in the Analytics SDK are shared with the Experiment SDK and automatically used when `fetch()`ing variants.
  - Optionally configure the Experiment SDK to automatically `fetch()` updated variants whenever the User's identity changes.
- Built-in Exposure Tracking
  - Automatically track exposure events when `variant()` is called to access a variant the Experiment SDK.
  - Explicitly track a user's exposure to a flag's variant through Analytics by calling `exposure()`

### Upgrading

Integrated analytics and experiment SDKs are supported in the following platforms and SDK versions:

| Analytics SDK Version | Experiment SDK Version |
| --- | --- |
| `8.17.0+` | `1.4.0+` |

### Initialization

SDK initialization can happen in any order, without needing to directly inject the analytics SDK into the experiment configuration. That said, you still need to initialize Amplitude Analytics in order for the integration to work. Simply call the `initializeWithAmplitudeExperiment(...)` function in the experiment SDK and your analytics instance will be used automatically when it completes initialization.

```js
amplitude.getInstance().initialize('your-project-api-key');
const experiment = Experiment.intializeWithAmplitudeAnalytics('your-project-deployment-key');
```

By using this initialization function, the `userProvider` and `exposureTrackingProvider` are automatically set up to enable automatic identity management and exposure tracking.

#### Configuration

Any standard Experiment SDK configuration may be used when initializing an integrated Experiment client. That said, we recommend not setting any custom `userProvider` or `exposureTrackingProvider` , as those are set up by default to integrate with the analytics SDK. Finally, if you use a custom instance name for your Analytics SDK, you must configure experiment with the same instance name in the `instanceName` configuration option.

##### Integration Specific Configuration

| <div class="big-column">Name</div> | Description | Default Value |
| --- | --- | --- |
| `automaticFetchOnAmplitudeIdentityChange` | If `true` automatically fetch updated variants for the user whenever the user's identity state changes. | `false` |

### Fetch Variants

An explicit user object should not be passed to `fetch()` when using an integrated SDK since all the user information is accessed from the Analytics SDK. In fact, passing explicit user info will actually overwrite the user information provided by analytics which may cause issues with exposures and analysis.

```js
await experiment.fetch();
```
