---
title: Android SDK
description: Official documentation for implementing and using Amplitude Experiment's Android SDK.
icon: material/android
---

![Maven Central](https://img.shields.io/maven-central/v/com.amplitude/experiment-android-client.svg?label=Maven%20Central)

Implement Amplitude Experiment's client-side Android SDK.

!!!info "SDK Resources"

    - [Android SDK Reference :material-book:](https://amplitude.github.io/experiment-android-client/)
    - [Android SDK Repository :material-github:](https://github.com/amplitude/experiment-android-client)
    - [Android SDK Releases :material-code-tags-check:](https://github.com/amplitude/experiment-android-client/releases)

## Installation

Add to the dependencies in your Android project's `build.gradle` file.

```groovy
dependencies {
  // add the following
  implementation 'com.amplitude:experiment-android-client:1.3.0'
}
```

## Quick Start

1. [Get your deployment's API key](../create-deployment.md)
2. [Configure and initialize the experiment client](#initialization)
3. [Fetch variants for a user](#fetch-variants-for-a-user)
4. [Look up a flag's variant](#look-up-a-variant)


```java
public class MyApplication extends Application {

  @Override
  public void onCreate() {
    super.onCreate();

    // (1) Get your deployment's API key
    String apiKey = "YOUR-API-KEY";

    // (2) Configure and initialize the experiment client
    ExperimentConfig config = new ExperimentConfig();
    ExperimentClient client = Experiment.initialize(this, apiKey, config);

    // (3) Fetch variants for a user
    ExperimentUser user = ExperimentUser.builder()
      .userId("user@company.com")
      .deviceId("abcezas123")
      .userProperty("premium", true)
      .build();
    try {
        client.fetch(user).get();
    } catch (Exception e) {
      e.printStackTrace();
    }

    // (4) Lookup a flag's variant
        Variant variant = client.variant("YOUR-FLAG-KEY");
    if (variant.is("on")) {
      // Flag is on
    } else {
      // Flag is off
    }
  }
}
```

## Initialization

In the entry point to your application (e.g. `Application.onCreate`), initialize the Experiment client with your API Key and a configuration. You can find the API Key in the [Deployments](https://developers.experiment.amplitude.com/docs/deployments) section of your Experiment project.

MyApplication.java

```java title="MyApplication.java"
// Intialize client with apiKey, config, and application
String apiKey = "YOUR-API-KEY";
ExperimentConfig config = new ExperimentConfig();
ExperimentClient client = Experiment.initialize(this, apiKey, config);
```

!!!info "Singleton instance"

    `Experiment.initialize` returns a default singleton instance backed by shared preferences. It is recommended that you either (a) inject the initialized instance throughout your application or (b) wrap the initialized `ExperimentClient` in your own API. Ultimately, subsequent calls to `initialize` will return the initial instance regardless of input.

### Configuration

The `ExperimentClient` can be configured on initialization. Once initialized, the client's configuration cannot be changed. Initialize an empty `ExperimentConfig` for the default configuration, or use the `ExperimentConfig.Builder` to build a [custom configuration](https://developers.experiment.amplitude.com/docs/configuration#client-side).

```java
ExperimentConfig defaultConfig = new ExperimentConfig();
ExperimentConfig customConfig = ExperimentConfig.builder()
  .debug(true)
  .fallbackVariant(new Variant("off", null))
  .fetchTimeoutMillis(500)
  .build();
```

## Fetch Variants for a User

After initializing an `ExperimentClient`, you will need to fetch variants for your user. First, build your `ExperimentUser` object using the `Builder`, then call your client's `fetch` method with the user.\
Because `fetch` is asynchronous, flags may not be available immediately. You may use the `Future` returned by fetch to wait for the client to complete fetching variants before looking up the variants.

Calling fetch sets the user within the client such that subsequent calls to `fetch` will reuse the current user if none is set. On success, fetch stores the variants in the client's `SharedPreferences` for persistent local lookup.

```java
ExperimentUser user = ExperimentUser.builder()
  .userId("user@company.com")
  .userProperty("premium", true)
  .build();
Future<ExperimentClient> future = client.fetch(user);

```

!!!info "User identity"

    The user must contain a Device ID and/or User ID, and those values must be the same as the values you pass to Amplitude Analytics. You can choose to [connect to the Amplitude Analytics SDK](https://developers.experiment.amplitude.com/docs/android-sdk#connecting-to-the-amplitude-analytics-sdk), which provides a convenient way of providing the Device ID and User ID without having to explicitly set them on the `ExperimentUser`

## Look up a Variant

Once variants have been fetched and stored within the `ExperimentClient`', you may look up the variant using the client's `variant()` method.

```java
// Lookup variant for key
Variant variant = client.variant("YOUR-FLAG-KEY");
if (variant.is("on")) {
  // Flag is on
} else {
  // Flag is off
}
```

### Accessing the Payload

A [`Variant`](https://developers.experiment.amplitude.com/docs/variants) contains an optional `payload` which may be set when configuring your feature flag or experiment. The `payload` on Android is of type `Object` (`Any?`) meaning you will need to cast the payload to the expected type. JSON object and array types need to be cast as `org.json.JSONObject` and `org.json.JSONArray` respectively.

For example, if you have a flag `my-feature-flag` with a variant `on` which contains a payload `{"key":"value"}`, you can access the payload and cast to a dictionary, then access the object fields:

```java
Variant variant = client.variant("my-feature-flag");
if (variant.is("on") && variant.payload != null) {
  try {
    String value = ((JSONObject) variant.payload).getString("key");
  } catch (Exception e) {
    e.printStackTrace();
  }
}
```

### Local Storage

Client-side Experiment SDKs persist the most recently `fetch`ed variants for your user (uses `SharedPreferences` for persistence). If variants have not been fetched, or the variant to look up has not been assigned to the user, then the client will fall back to various defaults.

### Fallbacks

The experiment client uses three types of fallbacks: explicit, initial variants, and the default fallback variant. Explicit fallbacks are passed into the client's `variant(String, Variant)` function, whereas initial variants and the default fallback variant fallbacks are configured in the client's `ExperimentConfig`.

### Fallback Priority

The initial source of variants is determined by the configuration's `Source`. If the lookup cannot find a variant from the `source` for the given key the order of fallbacks is as follows:

1. Explicit fallback (must be non-null)
2. `initialVariants` (or the local storage if `source` is set to initial variants)
3. `fallbackVariant` (defaults to an [empty variant](https://developers.experiment.amplitude.com/docs/variants))

## Track Exposures


!!!info "Configuration required"

    You must configure the experiment SDK in order to enable exposure tracking; either through an [integration with the Amplitude Analytics SDK](https://developers.experiment.amplitude.com/docs/android-sdk#amplitude-analytics-sdk-integration) or by implementing a custom `ExposureTrackingProvider`. For more information about setting up exposure tracking, please read our [detailed documentation on exposure tracking](https://developers.experiment.amplitude.com/docs/exposure-tracking).

#### Automatic Exposure Tracking

Automatic exposure tracking, which is enabled by default, tracks an exposure event when a variant is access from the experiment SDK via the `variant()` method. Subsequent variant accesses do not trigger an exposure event unless the flag's variant has changed since the last exposure was tracked within the same session.

```java
ExperimentClient experiment = Experiment.initializeWithAmplitudeAnalytics(context, apiKey, new ExperimentConfig());
experiment.fetch().get(); // receives {"my-experiment":{"value":"treatment"}}
experiment.variant("my-experiment"); // Exposure event tracked
experiment.variant("my-experiment"); // Exposure event not tracked
```

#### Explicit Exposure Tracking

Automatic exposure tracking may be turned off via the `automaticExposureTracking` configuration option if you wish to be explicit about when exposure events are tracked. Setting this configuration option to false works best in tandem with the new `exposure()` function on the experiment client. The `exposure()` function will track an exposure event through the exposure tracking provider using the available variant in the SDK's variant cache for the provided flag/experiment key.

```java
ExperimentConfig config = ExperimentConfig.builder()
  .automaticExposureTracking(false)
  .build();
ExperimentClient experiment = Experiment.initializeWithAmplitudeAnalytics(context, apiKey, config);

// Exposure event not tracked
Variant variant = experiment.variant('my-experiment');

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
| `2.36.0+` | `1.5.1+` |

### Initialization

SDK initialization can happen in any order, without needing to directly inject the analytics SDK into the experiment configuration. That said, you still need to initialize Amplitude Analytics in order for the integration to work. Simply call the `initializeWithAmplitudeExperiment(...)` function in the experiment SDK and your analytics instance will be used automatically when it completes initialization.

```java
Amplitude.getInstance().initialize(context, "your-analytics-key");
Experiment.initializeWithAmplitudeAnalytics(context, "your-experiment-key", new ExperimentConfig());
```

By using this initialization function, the `userProvider` and `exposureTrackingProvider` are automatically set up to enable automatic identity management and exposure tracking.

#### Configuration

Any standard Experiment SDK configuration may be used when initializing an integrated Experiment client. That said, we recommend not setting any custom `userProvider` or `exposureTrackingProvider` , as those are set up by default to integrate with the analytics SDK. Finally, if you use a custom instance name for your Analytics SDK, you must configure experiment with the same instance name in the `instanceName` configuration option.

##### Integration Specific Configuration

|<div class="big-column">Name</div> | Description | Default Value |
| --- | --- | --- |
| `automaticFetchOnAmplitudeIdentityChange` | If `true` automatically fetch updated variants for the user whenever the user's identity state changes. | `false` |

### Fetch Variants

An explicit user object should not be passed to `fetch()` when using an integrated SDK since all the user information is accessed from the Analytics SDK. In fact, passing explicit user info will actually overwrite the user information provided by analytics which may cause issues with exposures and analysis.

```java
experiment.fetch(null);
```
