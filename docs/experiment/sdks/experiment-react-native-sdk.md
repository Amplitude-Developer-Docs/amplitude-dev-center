--- 
title: Experiment React Native SDK
description: Official documentation for Amplitude Experiment's client-side React Native SDK.

icon: 
--- 

![npm version](https://badge.fury.io/js/%40amplitude%2Fexperiment-react-native-client.svg)

This is the official documentation for Amplitude Experiment's client-side React Native SDK.

???info "SDK Resources"

    - [iOS SDK Reference :material-book:](https://amplitude.github.io/experiment-react-native-client/)
    - [iOS SDK Repository :material-github:](https://github.com/amplitude/experiment-react-native-client)
    - [iOS SDK Releases :material-code-tags-check:](https://github.com/amplitude/experiment-react-native-client/releases)

## Installation

Install the React Native Client SDK with npm or yarn.

=== "npm"

    ```bash
    npm install --save @amplitude/experiment-react-native-client
    ```

=== "yarn"

    ```bash
    yarn add @amplitude/experiment-react-native-client
    ```

Then install the native CocoaPods for iOS:

```shell
cd ios
pod install
```

## Initialization

!!!info "Native Modules and Dependencies"

    The React Native SDK works via native modules, and thus depends on the Android v1.0.0+ and iOS SDK v1.0.0+ when building for the respective platforms.

    Because the SDK uses native modules, all methods should be called using `await`

Initialize the client in your application startup. You will need the API Key for your deployment. You can find the API Key in the Deployments section of your Experiment instance. To learn more about how to setup your Project and deployments, please refer to [Deployments](https://developers.experiment.amplitude.com/docs/deployments).

After initializing the Experiment instance, call the `fetch` method with an `ExperimentUser` object. This will trigger an asynchronous fetch for all variation assignments from the server and return a Promise which will complete when the fetch is complete. Because `fetch` is asynchronous, flags may not be available immediately. Use `await` or `then` to take action after the fetch completes.

```js title="index.js"
import { Experiment } from '@amplitude/experiment-react-native-client';

// API Key is provided in your Experiment product settings
await Experiment.initialize("your-api-key");

const user = {
  user_id: 'user@company.com',
  device_id: 'abcezas123',
  user_properties: {
    'premium': true
  }
};

await Experiment.fetch(user);
```

!!!note "User identity"

    The user must contain a Device ID and/or User ID, and those values must be the same as the values you pass to Amplitude Analytics. You can choose to [connect to the Amplitude Analytics SDK](https://developers.experiment.amplitude.com/docs/react-native-sdk#connecting-to-the-amplitude-analytics-sdk), which provides a convenient way of providing the Device ID and User ID without having to explicitly set them on the `ExperimentUser`

## Implement an Experiment or Flag

To implement an experiment or flag, you will need to first [Create a Flag or Experiment](https://developers.experiment.amplitude.com/docs/create-a-flag) in the Experiment user interface.

Next you will copy the key, which can be copied from the top of the Experiment interface.

When you need an assignment for a flag or experiment, you can call `variant`. This will retrieve the variation assignment from the local cache, and return the `Variant` value and payload for which the `ExperimentUser` context is assigned.

```js title="feature.js"
import { Experiment } from '@amplitude/experiment-react-native-client';

async showFeature() {
  // Get the variant for the flag, returning the variant value
  const variant = await Experiment.variant("key");

  // Change the experience based on the variant
  if (variant?.value == "on") { // "on" is a variant value
    return true;
  } else {
    return false;
  }
};
```

## Payloads

If you attach payloads to flags, you can instead fetch variant payloads with the `payload` field of the variant:

```js
const variant = await Experiment.variant(key);
const payload = variant?.payload;
```

## Fallbacks

You can pass in a fallback value to the `variant` method either as a string value or a `Variant` object with `value` and `payload` fields.

The `variant` method will fallback according to the following order:

1. Provided `fallback`
2. `initialVariants` in config
3. `fallbackVariant` in config
4. `Defaults.fallbackVariant` (null)

## Track Exposures

!!!note "Configuration required"

    You must configure the experiment SDK in order to enable exposure tracking through an [integration with the Amplitude Analytics SDK](https://developers.experiment.amplitude.com/docs/react-native-sdk#amplitude-analytics-sdk-integration). Exposure tracking through a 3rd party analytics SDK is not currently supported by the experiment SDK, and must be implemented explicitly within your application. See the [documentation on exposure tracking](https://developers.experiment.amplitude.com/docs/exposure-tracking) to learn more about how to send exposure events yourself.

#### Automatic Exposure Tracking

Automatic exposure tracking, which is enabled by default, tracks an exposure event when a variant is access from the experiment SDK via the `variant()` method. Subsequent variant accesses do not trigger an exposure event unless the flag's variant has changed since the last exposure was tracked within the same session.

```js
await Experiment.initializeWithAmplitudeAnalytics(apiKey);
await Experiment.fetch(); // receives {"my-experiment":{"value":"treatment"}}
Experiment.variant('my-experiment'); // Exposure event tracked
Experiment.variant('my-experiment'); // Exposure event not tracked
```

#### Explicit Exposure Tracking

Automatic exposure tracking may be turned off via the `automaticExposureTracking` configuration option if you wish to be explicit about when exposure events are tracked. Setting this configuration option to false works best in tandem with the new `exposure()` function on the experiment client. The `exposure()` function will track an exposure event through the exposure tracking provider using the available variant in the SDK's variant cache for the provided flag/experiment key.

```js
await Experiment.initializeWithAmplitudeAnalytics(apiKey, {
  automaticExposureTracking: false
});

// Exposure event not tracked
const variant = await Experiment.variant('my-experiment');

// Exposure event tracked
await Experiment.exposure('my-experiment');
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
| `2.8.0+` | `0.6.0+` |

### Initialization

SDK initialization can happen in any order, without needing to directly inject the analytics SDK into the experiment configuration. That said, you still need to initialize Amplitude Analytics in order for the integration to work. Simply call the `initializeWithAmplitudeExperiment(...)` function in the experiment SDK and your analytics instance will be used automatically when it completes initialization.

```js
await Amplitude.getInstance().init('you-analytics-key');
await Experiment.initializeWithAmplitudeAnalytics('your-experiment-key');
```

By using this initialization function, the `userProvider` and `exposureTrackingProvider` are automatically set up to enable automatic identity management and exposure tracking.

#### Configuration

Any standard Experiment SDK configuration may be used when initializing an integrated Experiment client. That said, we recommend not setting any custom `userProvider` or `exposureTrackingProvider` , as those are set up by default to integrate with the analytics SDK. Finally, if you use a custom instance name for your Analytics SDK, you must configure experiment with the same instance name in the `instanceName` configuration option.

##### Integration Specific Configuration

| Name | Description | Default Value |
| --- | --- | --- |
| `automaticFetchOnAmplitudeIdentityChange` | If `true` automatically fetch updated variants for the user whenever the user's identity state changes. | `false` |

### Fetch Variants

An explicit user object should not be passed to `fetch()` when using an integrated SDK since all the user information is accessed from the Analytics SDK. In fact, passing explicit user info will actually overwrite the user information provided by analytics which may cause issues with exposures and analysis.

```js
await Experiment.fetch();
```
