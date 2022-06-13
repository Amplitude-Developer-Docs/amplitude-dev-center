---
title: Import Taplytics Experiment Data into Amplitude
description: Integrate Amplitude with Taplytics's mobile A/B testing tools to let non-technical product and marketing team members to do full-circle tracking, analysis, and engagement across mobile apps
---

By integrating [Taplytics](https://taplytics.com/)' mobile A/B testing and experiment tools with Amplitude, you can:

- Share all user data between the platforms in real-time.
- Let non-technical product and marketing team members to do full-circle tracking, analysis, and engagement across mobile apps.
- Share experiment data from Taplytics to Amplitude upon startup.

The integration exports Taplytics experiment data to Amplitude.

When the Taplytics SDK is installed alongside Amplitude, your existing and future analytics events are sent to both Amplitude and Taplytics. Measure the impact of your Taplytics experiments by segmenting your Amplitude funnels, retention, and so on, by variations your users were exposed to.

## Set up and use the integration

!!!tip

     For any questions, reach out to Taplytics Support at [support@taplytics.com](mailto:support@kochava.com).

For detailed instructions, see the [Taplytics documentation](https://docs.taplytics.com/docs/integrations-amplitude). The integration uses Amplitude's [Attribution API endpoint](../../analytics/apis/attribution-api).

Taplytics sends experiment data as a single event to Amplitude. The event is named `TL_experiments` and includes the experiment data as properties.

The properties for all sources are formatted like this:

```json
{
"Experiment One":"Variation One",
"Experiment Two":"baseline"
}
```

For [Android integrations](https://docs.taplytics.com/docs/guides-integrations-for-android#section-amplitude), Taplytics logs experiment and variation events to the Amplitude Android SDK as follows:

```java
HashMap<String, String> experimentsAndVariations = new HashMap<>();\
experimentsAndVariations.put("Experiment 1", "Variation 1");\
experimentsAndVariations.put("Experiment 2", "Variation 3");

Amplitude.getInstance().logEvent("TL_Experiments", experimentsAndVariations)
```

For [iOS integrations](https://docs.taplytics.com/docs/guides-integrations-for-ios#section-amplitude), Taplytics logs experiment and variation events to the Amplitude iOS SDK as follows:

```obj-c
NSDictionary* experimentsAndVariations = @{
    @"Experiment 1": @"Variation 1",
    @"Experiment 2": @"baseline"
};

[[Amplitude instance] logEvent:@"TL_Experiments" withEventProperties:experimentsAndVariations];

```
