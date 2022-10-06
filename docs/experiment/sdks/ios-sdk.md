---
title: Experiment iOS SDK
description: Official documentation for Amplitude Experiment's Client-side iOS SDK.
icon: simple/ios
---

Official documentation for Amplitude Experiment's Client-side iOS SDK implementation.

!!!info "SDK Resources"
    [:material-github: Github](https://github.com/amplitude/experiment-ios-client) · [:material-code-tags-check: Releases](https://github.com/amplitude/experiment-ios-client/releases) · [:material-book: API Reference](https://amplitude.github.io/experiment-ios-client/)

## Install

!!!bug "Import Statement"
    CocoaPods and Swift Package Manager/Carthage have different import statements.

    * CocoaPods: `import AmplitudeExperiment`
    * SPM/Carthage: `import Experiment`

![CocoaPods](https://img.shields.io/cocoapods/v/AmplitudeExperiment)

=== "CocoaPods"

    ```ruby
    pod 'AmplitudeExperiment', '~> <VERSION>'
    ```

=== "Swift package manager"

    * Package URL: `https://github.com/amplitude/experiment-ios-client`

!!!tip "Quick Start"

    1. [Initialize the experiment client](#initialize)
    2. [Fetch variants for the user](#fetch)
    3. [Access a flag's variant](#variant)

    ```swift
    // (1) Initialize the experiment client
    let experiment = Experiment.initialize(
        apiKey: "<DEPLOYMENT_KEY>",
        config: ExperimentConfig()
    )

    let user = ExperimentUserBuilder()
        .userId("user@company.com")
        .deviceId("abcdefg")
        .userProperty("premium", value: true)
        .build()

    // (2) Fetch variants for a user
    experiment.fetch(user: user) { experiment, error in

        // (3) Lookup a flag's variant
        let variant = experiment.variant("<FLAG_KEY>")
        if variant.value == "on" {
            // Flag is on
        } else {
            // Flag is off
        }
    }
    ```

## Core functions

The following functions make up the core of the Experiment client-side SDK.

---

### Initialize

The SDK client should be initialized in your application on startup. The [deployment key](../general/data-model.md#deployments) argument passed into the `apiKey` parameter must live within the same project that you are sending analytics events to.

```swift
func initialize(apiKey: String, config: ExperimentConfig) -> ExperimentClient
```

| <div class='med-column'>Parameter</div> | Requirement | Description |
| --- | --- | --- |
| `apiKey` | required | The [deployment key](../general/data-model.md#deployments) which authorizes fetch requests and determines which flags should be evaluated for the user. |
| `config` | optional | The client [configuration](#configuration) used to customize SDK client behavior. |

The initializer returns a singleton instance, so subsequent initializations for the same instance name will always return the initial instance. To create multiple instances, use the `instanceName` [configuration](#configuration).

```swift
let experiment = Experiment.initialize(
    apiKey: "<DEPLOYMENT_KEY>",
    config: ExperimentConfig()
)
```

#### Integrations

If you use either Amplitude or Segment Analytics SDKs to track events into Amplitude, you'll want to set up an integration on initialization. Integrations automatically implement [provider](#providers) interfaces to enable a more streamlined developer experience by making it easier to **manage user identity** and **track exposures events**.

???amplitude "Amplitude Integration"

    The Amplitude Experiment SDK is set up to integrate seamlessly with the Amplitude Analytics SDK. All you need to do is update your SDK versions to the latest, and use the special integration initialization function.


    ```swift hl_lines="2"
    Amplitude.instance().initializeApiKey("<API_KEY>")
    let experiment = Experiment.initializeWithAmplitudeAnalytics(
        apiKey: "<DEPLOYMENT_KEY>",
        config: ExperimentConfig()
    )
    ```

    Note that, if you are using a custom instance name for analytics, you will need to set the same value in the `instanceName` [configuration option](#configuration) in the experiment SDK.

    Using the integration initializer will automatically configure implementations of the [user provider](#user-provider) and [exposure tracking provider](#exposure-tracking-provider) interfaces to pull user data from the Amplitude Analytics SDK and track exposure events.

    **Supported Versions**

    | Analytics SDK Version | Experiment SDK Version |
    | --- | --- |
    | `8.8.0+` | `1.6.0+` |

???segment "Segment Integration"

    Experiment's integration with Segment Analytics is still a manual implementation at this point. Copy the exposure tracking provider implementation into your app code base and initialize the Experiment SDK with the provider instances in the configuration.

    ```swift title="SegmentExposureTrackingProvider"
    class SegmentExposureTrackingProvider : ExposureTrackingProvider {
        private let analytics: Analytics
        init(analytics: Analytics) {
            self.analytics = analytics
        }
        func track(exposure: Exposure) {
            analytics.track("$exposure", properties: [
                "flag_key": exposure.flagKey,
                "variant": exposure.variant
            ])
        }
    }
    ```

    The Experiment SDK must then be configured on initialization with an instance of the the exposure tracking provider.

    ```swift
    let analytics = // Initialize segment analytics
    ExperimentConfig config = ExperimentConfigBuilder()
        .exposureTrackingProvider(SegmentExposureTrackingProvider(analytics))
        .build()
    let experiment = Experiment.initialize(apiKey: "<DEPLOYMENT_KEY>", config: config)
    ```

    When [fetching variants](#fetch), pass the segment anonymous ID and user ID for the device ID and user ID, respectively.

    ```swift
    let userId = SEGState.sharedInstance().userInfo.userId
    let deviceId = SEGState.sharedInstance().userInfo.anonymousId

    let user = ExperimentUserBuilder()
        .userId(userId)
        .deviceId(deviceId)
        .build()
    experiment.fetch(user: user, completion: nil)
    ```

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
    | `instanceName` | Custom instance name for experiment SDK instance. **The value of this field is case-sensitive.** | `null` |

---

### Fetch

Fetches variants for a [user](../general/data-model.md#users) and store the results in the client for fast access. This function [remote evaluates](../general/evaluation/remote-evaluation.md) the user for flags associated with the deployment used to initialize the SDK client.

```swift
func fetch(user: ExperimentUser?, completion: ((ExperimentClient, Error?) -> Void)?)
```

| Parameter  | Requirement | Description |
| --- | --- | --- |
| `user` | optional | Explicit [user](../general/data-model.md#users) information to pass with the request to evaluate. This user information is merged with user information provided from [integrations](#integrations) via the [user provider](#user-provider), preferring properties passed explicitly to `fetch()` over provided properties. |
| `completion` | optional | Callback when the variant fetch (success or failure). If the fetch request fails, the error is returned in the second parameter of this callback. |

We recommend calling `fetch()` during application start up so that the user gets the most up-to-date variants for the application session. Furthermore, you'll need to wait for the fetch request to return a result before rendering the user experience in order to avoid the interface "flickering".

```swift
let user = ExperimentUserBuilder()
    .userId("user@company.com")
    .userProperty("premium", value: true)
    .build()
experiment.fetch(user: user) { experiment, error in
    // Do something...
}
```

If you're using an [integration](#integrations) or a custom [user provider](#user-provider) then you can fetch without inputting the user.

```swift
experiment.fetch(user: nil, completion: nil)
```

???tip "Fetch When User Identity Changes"
    If you want the most up-to-date variants for the user, it is recommended that you call `fetch()` whenever the user state changes in a meaningful way. For example, if the user logs in and receives a user ID, or has a user property set which may effect flag or experiment targeting rules.

    In the case of **user properties**, Amplitude recommends passing new user properties explicitly to `fetch()` instead of relying on user enrichment prior to [remote evaluation](../general/evaluation/remote-evaluation.md). This is because user properties that are synced remotely through a separate system have no timing guarantees with respect to `fetch()`--i.e. a race.

!!!info "Timeout & Retries"
    If `fetch()` times out (default 10 seconds) or fails for any reason, the SDK client will return and retry in the background with back-off. You may configure the timeout or disable retries in the [configuration options](#configuration) when the SDK client is initialized.

---

### Variant

Access a [variant](../general/data-model.md#variants) for a [flag or experiment](../general/data-model.md#flags-and-experiments) from the SDK client's local store.

!!!info "Automatic Exposure Tracking"
    When an [integration](#integrations) is used or a custom [exposure tracking provider](#exposure-tracking-provider) is set, `variant()` will automatically track an exposure event through the tracking provider. To disable this functionality, [configure](#configuration) `automaticExposureTracking` to be `false`, and track exposures manually using [`exposure()`](#exposure).

```swift
func variant(_ key: String, fallback: Variant? = nil) -> Variant
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `key` | required | The **flag key** to identify the [flag or experiment](../general/data-model.md#flags-and-experiments) to access the variant for. |
| `fallback` | optional | The value to return if no variant was found for the given `flagKey`. |

When determining which variant a user has been bucketed into, you'll want to compare the variant `value` to a well-known string.

```swift
let variant = experiment.variant("<FLAG_KEY>")
if variant.value == "on" {
    // Flag is on
} else {
    // Flag is off
}
```

???info "Accessing the variant's payload"
    A variant may also be configured with a dynamic [payload](../general/data-model.md#variants) of arbitrary data. Access the `payload` field from the variant object after checking the variant's `value`.

    The `payload` in iOS is of type `Any?`, so cast the payload to the expected type to retrieve the value. For example, if the payload is `{"key":"value"}`:

    ```swift
    let variant = client.variant("<FLAG_KEY>")
    if variant.value == "on" {
        if let payload = variant.payload as? [String:String] {
            let value = payload["key"]
        }
    }
    ```

A `null` variant `value` means that the user has not been bucketed into a variant. You may use the built in **fallback** parameter to provide a variant to return if the store does not contain a variant for the given flag key.

```swift
let variant = experiment.variant("<FLAG_KEY>", fallback: Variant("control"))
if variant.value == "control" {
    // Control
} else if variant.value == "treatment" {
    // Treatment
}
```

---

### All

Access all [variants](../general/data-model.md#variants) stored by the SDK client.

```swift
func all() -> [String:Variant]
```

---

### Exposure

Manually track an [exposure event](../general/exposure-tracking.md#exposure-event) for the current variant of the given flag key through configured [integration](#integrations) or custom [exposure tracking provider](#exposure-tracking-provider). Generally used in conjunction with setting the `automaticExposureTracking` [configuration](#configuration) optional to `false`.

```swift
func exposure(key: String)
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `key` | required | The **flag key** to identify the [flag or experiment](../general/data-model.md#flags-and-experiments) variant to track an [exposure event](../general/exposure-tracking.md#exposure-event) for. |

```swift
let variant = experiment.variant("<FLAG_KEY>")

// Do other things...

experiment.exposure("<FLAG_KEY>")
if variant.value == "control" {
    // Control
} else if variant.value == "treatment" {
    // Treatment
}
```

---

## Providers

!!!tip "Integrations"
    If you use Amplitude or Segment analytics SDKs along side the Experiment Client SDK, Amplitude recommends you use an [integration](#integrations) instead of implementing custom providers.

Provider implementations enable a more streamlined developer experience by making it easier to manage user identity and track exposures events.

### User provider

The user provider is used by the SDK client to access the most up-to-date user information only when it's needed (i.e. when [`fetch()`](#fetch) is called). This provider is optional, but helps if you have a user information store already set up in your application. This way, you don't need to manage two separate user info stores in parallel, which may result in a divergent user state if the application user store is updated and experiment is not (or via versa).

```swift title="ExperimentUserProvider"
protocol ExperimentUserProvider {
    func getUser() -> ExperimentUser
}
```

To utilize your custom user provider, set the `userProvider` [configuration](#configuration) option with an instance of your custom implementation on SDK initialization.

```swift
let config = ExperimentConfigBuilder()
    .userProvider(CustomUserProvider())
    .build()
let experiment = Experiment.initialize(apiKey: "<DEPLOYMENT_KEY>", config: config)
```

### Exposure tracking provider

Implementing an exposure tracking provider is highly recommended. [Exposure tracking](../general/exposure-tracking.md) increases the accuracy and reliability of experiment results and improves visibility into which flags and experiments a user is exposed to.

```swift title="ExposureTrackingProvider"
protocol ExposureTrackingProvider {
    func track(exposure: Exposure)
}
```

The implementation of `track()` should track an event of type `$exposure` (a.k.a name) with two event properties, `flag_key` and `variant`, corresponding to the two fields on the `Exposure` object argument. Finally, the event tracked must eventually end up in Amplitude Analytics for the same project that the [deployment] used to [initialize](#initialize) the SDK client lives within, and for the same user that variants were [fetched](#fetch) for.

To utilize your custom user provider, set the `exposureTrackingProvider` [configuration](#configuration) option with an instance of your custom implementation on SDK initialization.

```swift
ExperimentConfig config = ExperimentConfigBuilder()
    .exposureTrackingProvider(CustomExposureTrackingProvider(analytics))
    .build()
let experiment = Experiment.initialize(apiKey: "<DEPLOYMENT_KEY>", config: config)
```
