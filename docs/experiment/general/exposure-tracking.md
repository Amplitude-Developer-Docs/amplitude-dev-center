---
title: Exposure Tracking
description: An introduction to the exposure event, and why exposure tracking is so important to accurate and reliable experiment results.
---

TODO Rewrite and move SDK specific stuff to SDKs, segment stuff to segment integration docs

Automatically track exposure to a variant using an analytics provider.

!!!note
    You may need to [make implementation changes](https://developers.experiment.amplitude.com/docs/exposure-tracking#implementing-improved-exposure-tracking) to your application to utilize improved exposure tracking


Put simply, exposure tracking means sending an analytics event to Amplitude in order to inform experiment that a user has been exposed to a certain variant of an experiment or feature flag. Exposure events contain the flag key and the variant of the experiment that the user has been exposed to. When an exposure event is ingested by amplitude, the flag key and variant are used to set or unset user properties on the user which are essential to performing experiment analysis queries.

!!!info "Event Volume"

    Amplitude-defined exposure events do not count toward your organization's event volume.

## Quick Start: Amplitude SDK

If you already use Amplitude's client-side Experiment and Analytics SDKs you should [upgrade your SDKs to the latest version](https://developers.experiment.amplitude.com/docs/exposure-tracking#supported-sdks) and change the [experiment SDK's initialization](https://developers.experiment.amplitude.com/docs/exposure-tracking#initialization) to enable improved exposure tracking by default.


=== "Web"

    ```js
    amplitude.getInstance().init('your-analytics-key');
    Experiment.initializeWithAmplitudeAnalytics('your-experiment-key');
    ```

=== "Android"

    ```java
    Amplitude.getInstance().initialize(context, "your-analytics-key");
    Experiment.initializeWithAmplitudeAnalytics(context, "your-experiment-key", new ExperimentConfig());
    ```

=== "iOS"

    ```swift
    Amplitude.instance().initializeWithApiKey("your-analytics-key");
    Experiment.initializeWithAmplitudeAnalytics(apiKey: "your-experiment-key")
    ```

!!!success

    Your experiment client is now set-up to automatically track exposures whenever `variant()` is called to access a variant to serve to a user.

## Quick Start: Segment SDK

If you're using Segment (or another 3rd party or custom analytics implementation) on the client-side in tandem with the Experiment SDK, then we recommend implementing a custom `ExposureTrackingProvider` which is configured at initialization.

To use the `ExposureTrackingProvider` interface, [upgrade your experiment SDKs to the latest version](https://developers.experiment.amplitude.com/docs/exposure-tracking#upgrading) and implement the interface to send the exposure event through the SDK.


=== "Web"

    ```js
    class SegmentExposureTrackingProvider implements ExposureTrackingProvider {
      private analytics: Analytics;
      constructor(analytics: Analytics) {
        this.analytics = analytics;
      }
      track(exposure: Exposure) {
        this.analytics.track('$exposure', exposure);
      }
    }
    ```

=== "Android"

    ```java
    class SegmentExposureTrackingProvider implements ExposureTrackingProvider {
      private Analytics analytics;
        public SegmentExposureTrackingProvider(Analytics analytics) {
        this.analytics = analytics;
      }
      @Override
      public void track(Exposure exposure) {
        analytics.track(
                "$exposure",
                new Properties()
                .putValue("flag_key", exposureEvent.flagKey)
                .putValue("variant", exposureEvent.variant)
            );
      }
    }
    ```

=== "iOS"

    ```swift
    class SegmentExposureTrackingProvider : ExposureTrackingProvider {
      private let analytics: Analytics
      init(analytics: Analytics) {
        self.analytics = analytics
      }
      override func track(exposure: Exposure) {
        analytics.track(name: "$exposure", properties: [
          "flag_key": exposure.flagKey,
          "variant": exposure.variant
        ])
      }
    }
    ```

Once your `ExposureTrackingProvider` has been defined, initialize you client with the tracking provider in the configuration.

=== "Web"

    ```js
    const experiment = Experiment.initialize('your-deployment-key', {
      exposureTrackingProvider: new SegmentExposureTrackingProvider(analytics)
    }
    ```

=== "Android"

    ```java
    ExperimentConfig config = ExperimentConfig.builder()
      .exposureTrackingProvider(new SegmentExposureTrackingProvider(Analytics.with(context))
        .build();
    Experiment experiment = Experiment.initialize(context, "your-deployment-key", config);
    ```

=== "iOS"

    ```swift
    let config = ExperimentConfigBuilder()
      .exposureTrackingProvider(SementExposureTrackingProvider(analytics))
      .build()
    self.experiment = Experiment.initialize(apiKey: "your-deployment-key", config: config)
    ```

!!!success
    Your experiment client is now set-up to automatically track exposures whenever `variant()` is called to access a variant to serve to a user.

## Exposure Event Definition

The exposure event has been designed to be simple and ergonomic enough to be sent through any analytics implementation or customer data platform without needing to manipulate user properties directly. When an `$exposure` event is ingested, the requisite user properties are automatically set or unset for 100% accuracy and confidence.

```json
{
  "event_type": "$exposure",
  "event_properties": {
    "flag_key": "<flag_key>",
    "variant": "<variant>"
  }
}
```

### Event Properties

| Event Property | Requirement | Description |
| --- | --- | --- |
| `flag_key` | Required | The flag/experiment key which the user is being exposed to. |
| `variant` | Optional | The variant for the flag/experiment that the user has been exposed to. If null or missing, the user property for the flag/experiment is unset, meaning that the user no longer is considered to be a part of the experiment. |

## Supported SDKs

| SDK | Version |
| --- | --- |
| JavaScript SDK | `1.4.0+` |
| Android SDK | `1.5.1+` |
| iOS SDK | `1.6.0+` |