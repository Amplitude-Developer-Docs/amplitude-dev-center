---
title: Experiment React Native SDK
description: Official documentation for Amplitude Experiment's Client-side React Native SDK.
icon: material/react
---

!!!warning
    This SDK is legacy and will only continue to receive bug fixes until it is eventually deprecated. We recommend upgrading to `v1.0.0+` which supports SDK integrations, React Native Web, Expo, and more.

Official documentation for Amplitude Experiment's Client-side React Native SDK.

!!!info "SDK Resources"
    [:material-github: Github](https://github.com/amplitude/experiment-react-native-client) · [:material-code-tags-check: Releases](https://github.com/amplitude/experiment-react-native-client/releases) · [:material-book: API Reference](https://amplitude.github.io/experiment-react-native-client/)

## Install

!!!warning "Web Compatibility"
    Experiment React Native SDK is only compatible with iOS and Android React Native projects. Use the [JavaScript SDK](./javascript-sdk.md) to support all three platforms.

[![npm version](https://badge.fury.io/js/@amplitude%2Fexperiment-react-native-client.svg)](https://badge.fury.io/js/@amplitude%2Fexperiment-react-native-client)

Install the Experiment JavaScript Client SDK.

=== "npm"

    ```bash
    npm install --save @amplitude/experiment-react-native-client
    ```

=== "yarn"

    ```bash
    yarn add @amplitude/experiment-react-native-client
    ```

!!!tip "Quick Start"

    1. [Initialize the experiment client](#initialize)
    2. [Fetch variants for the user](#fetch)
    3. [Access a flag's variant](#variant)

    ```js
    // (1) Initialize the experiment client
    await Experiment.initialize('<DEPLOYMENT_KEY>');

    // (2) Fetch variants for a user
    const user = {
        user_id: 'user@company.com',
        device_id: 'abcdefg',
        user_properties: {
            'premium': true,
        },
    };
    await Experiment.fetch(user);

    // (3) Lookup a flag's variant
    const variant = await Experiment.variant('<FLAG_KEY>');
    if (variant.value === 'on') {
        // Flag is on
    } else {
        // Flag is off
    }
    ```

## Core functions

The following functions make up the core of the Experiment client-side SDK.

!!!info "Async Functions"
    Native SDKs are used under-the-hood, so you need to `await` the result of all functions.

---
### Initialize

The SDK client should be initialized in your application on startup. The [deployment key](../general/data-model.md#deployments) argument passed into the `apiKey` parameter must live within the same project that you are sending analytics events to.

```js
initialize(apiKey: string, config?: ExperimentConfig): Promise<boolean>
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `apiKey` | required | The [deployment key](../general/data-model.md#deployments) which authorizes fetch requests and determines which flags should be evaluated for the user. |
| `config` | optional | The client [configuration](#configuration) used to customize SDK client behavior. |

The initializer returns a singleton instance, so subsequent initializations for the same instance name will always return the initial instance. To create multiple instances, use the `instanceName` [configuration](#configuration).

```js
const experiment = await Experiment.initialize('<DEPLOYMENT_KEY>');
```

#### Integrations

If you use either Amplitude or Segment Analytics SDKs to track events into Amplitude, you'll want to set up an integration on initialization. Integrations automatically implement [provider](#providers) interfaces to enable a more streamlined developer experience by making it easier to **manage user identity** and **track exposures events**.

???amplitude "Amplitude Integration"

    The Amplitude Experiment SDK is set up to integrate seamlessly with the Amplitude Analytics SDK. All you need to do is update your SDK versions to the latest, and use the special integration initialization function.

    ```js hl_lines="2"
    await Amplitude.getInstance().init('<API_KEY>');
    await Experiment.initializeWithAmplitudeAnalytics('<DEPLOYMENT_KEY>');
    ```

    Note that, if you are using a custom instance name for analytics, you will need to set the same value in the `instanceName` [configuration option](#configuration) in the experiment SDK.

    Using the integration initializer will automatically configure implementations of the [user provider](#user-provider) and [exposure tracking provider](#exposure-tracking-provider) interfaces to pull user data from the Amplitude Analytics SDK and track exposure events.

    **Supported Versions**

    | Analytics SDK Version | Experiment SDK Version |
    | --- | --- |
    | `2.8.0+` | `0.6.0+` |

#### Configuration

The SDK client can be configured once on initialization.

???config "Configuration Options"
    | <div class="big-column">Name</div> | Description | Default Value |
    | --- | --- | --- |
    | `debug` | Enable additional debug logging within the SDK. Should be set to false in production builds. | `false` |
    | `fallbackVariant` | The default variant to fall back if a variant for the provided key does not exist. | `{}` |
    | `initialVariants` | An initial set of variants to access. This field is valuable for bootstrapping the client SDK with values rendered by the server using server-side rendering (SSR). | `{}` |
    | `serverUrl` | The host to fetch variants from. | `https://api.lab.amplitude.com` |
    | `fetchTimeoutMillis` | The timeout for fetching variants in milliseconds. | `10000` |
    | `retryFetchOnFailure` | Whether or not to retry variant fetches in the background if the request does not succeed. | `true` |
    | `automaticExposureTracking` | If true, calling [`variant()`](#variant) will track an exposure event through the configured `exposureTrackingProvider`. If no exposure tracking provider is set, this configuration option does nothing.  | `true` |
    | `automaticFetchOnAmplitudeIdentityChange` | Only matters if you use the `initializeWithAmplitudeAnalytics` initialization function to seamlessly integrate with the Amplitude Analytics SDK. If `true` any change to the user ID, device ID or user properties from analytics will trigger the experiment SDK to fetch variants and update it's cache. | `false` |
    | `userProvider` | An interface used to provide the user object to `fetch()` when called. See [Experiment User](https://developers.experiment.amplitude.com/docs/experiment-user#user-providers) for more information. | `null` |
    | `exposureTrackingProvider` | Implement and configure this interface to track exposure events through the experiment SDK, either automatically or explicitly. | `null` |
    | `instanceName` | Custom instance name for experiment SDK instance. The value of this field is case-insensitive. | `null` |

---
### Fetch

Fetches variants for a [user](../general/data-model.md#users) and store the results in the client for fast access. This function [remote evaluates](../general/evaluation/remote-evaluation.md) the user for flags associated with the deployment used to initialize the SDK client.

```js
fetch(user?: ExperimentUser): Promise<boolean>
```

| Parameter  | Requirement | Description |
| --- | --- | --- |
| `user` | optional | Explicit [user](../general/data-model.md#users) information to pass with the request to evaluate. This user information is merged with user information provided from [integrations](#integrations) via the [user provider](#user-provider), preferring properties passed explicitly to `fetch()` over provided properties. |

We recommend calling `fetch()` during application start up so that the user gets the most up-to-date variants for the application session. Furthermore, you'll need to wait for the fetch request to return a result before rendering the user experience in order to avoid the interface "flickering".

```js
const user = {
    user_id: 'user@company.com',
    device_id: 'abcdefg',
    user_properties: {
        'premium': true,
    },
};
await Experiment.fetch(user);
```

If you're using an [integration](#integrations) or a custom [user provider](#user-provider) then you can fetch without inputting the user.

```js
await Experiment.fetch();
```

???tip "Fetch When User Identity Changes"
    If you want the most up-to-date variants for the user, it is recommended that you call `fetch()` whenever the user state changes in a meaningful way. For example, if the user logs in and receives a user ID, or has a user property set which may effect flag or experiment targeting rules.

    In the case of **user properties**, we recommend passing new user properties explicitly to `fetch()` instead of relying on user enrichment prior to [remote evaluation](../general/evaluation/remote-evaluation.md). This is because user properties that are synced remotely through a separate system have no timing guarantees with respect to `fetch()`--i.e. a race.


!!!info "Timeout & Retries"
    If `fetch()` times out (default 10 seconds) or fails for any reason, the SDK client will return and retry in the background with back-off. You may configure the timeout or disable retries in the [configuration options](#configuration) when the SDK client is initialized.

---
### Variant

Access a [variant](../general/data-model.md#variants) for a [flag or experiment](../general/data-model.md#flags-and-experiments) from the SDK client's local store.

!!!info "Automatic Exposure Tracking"
    When an [integration](#integrations) is used or a custom [exposure tracking provider](#exposure-tracking-provider) is set, `variant()` will automatically track an exposure event through the tracking provider. To disable this functionality, [configure](#configuration) `automaticExposureTracking` to be `false`, and track exposures manually using [`exposure()`](#exposure).

```js
variant(key: string): Promise<Variant>
```

```js
variantWithFallback(key: string, fallback: Variant): Promise<Variant>
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `key` | required | The **flag key** to identify the [flag or experiment](../general/data-model.md#flags-and-experiments) to access the variant for. |
| `fallback` | optional | The value to return if no variant was found for the given `flagKey`. |

When determining which variant a user has been bucketed into, you'll want to compare the variant `value` to a well-known string.

```js
const variant = await Experiment.variant('<FLAG_KEY>');
if (variant.value === 'on') {
    // Flag is on
} else {
    // Flag is off
}
```

???info "Accessing the variant's payload"
    A variant may also be configured with a dynamic [payload](../general/data-model.md#variants) of arbitrary data. Access the `payload` field from the variant object after checking the variant's `value`.

    ```js
    const variant = await Experiment.variant('<FLAG_KEY>');
    if (variant.value === 'on') {
        const payload = variant.payload;
    }
    ```

A `null` variant `value` means that the user has not been bucketed into a variant. You may use the built in **fallback** parameter to provide a variant to return if the store does not contain a variant for the given flag key.

```js
const variant = await Experiment.variantWithFallback('<FLAG_KEY>', { value: 'control' });
if (variant === 'control') {
    // Control
} else if (variant === 'treatment') {
    // Treatment
}
```

---
### All

Access all [variants](../general/data-model.md#variants) stored by the SDK client.

```js
all(): Promise<Variants>
```

---
### Exposure

Manually track an [exposure event](../general/exposure-tracking.md#exposure-event) for the current variant of the given flag key through configured [integration](#integrations) or custom [exposure tracking provider](#exposure-tracking-provider). Generally used in conjunction with setting the `automaticExposureTracking` [configuration](#configuration) optional to `false`.

```js
exposure(key: string): Promise<boolean>
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `key` | required | The **flag key** to identify the [flag or experiment](../general/data-model.md#flags-and-experiments) variant to track an [exposure event](../general/exposure-tracking.md#exposure-event) for. |

```js
const variant = await Experiment.variant('<FLAG_KEY>');

// Do other things...

await Experiment.exposure('<FLAG_KEY>');
if (variant === 'control') {
    // Control
} else if (variant === 'treatment') {
    // Treatment
}
```
