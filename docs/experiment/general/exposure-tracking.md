---
title: Exposure Tracking
description: An overview of exposure tracking, the exposure event, and how to best track exposures within your system.
---

An exposure event is a [strictly defined](#exposure-event) analytics event sent to Amplitude to inform Amplitude Experiment that a user was exposed to a variant of an [experiment or feature flag](./data-model.md#flags-and-experiments). Exposure events contain the **flag key** and the **variant** of the flag or experiment that the user has been exposed to in the event's event properties.

When Amplitude ingests an [exposure event](#exposure-event), it uses the flag key and variant to **set or unset user properties** on the user associated with the event. Setting user properties is essential for experiment analysis queries on primary and secondary success metrics.

!!!info "Event Volume Billing"
    If you've purchased Amplitude Experiment's *End-to-end* feature flagging and experimentation solution, Amplitude defined [exposure events](#exposure-event) **don't count** toward your organization's event volume billing. If you have purchased *Experiment Results* or have not purchased Experiment then all events will be billed in full.

## Automatic exposure tracking

Client-side Experiment SDKs support automatic exposure tracking through an exposure tracking provider implementation. Without an integration or custom implementation, exposure events aren't tracked automatically.

!!!tip "Integrations"
    Client-side SDKs currently support two integrations, Amplitude and Segment. You can also implement your own custom integration.

<!--vale off-->
| <div class='big-column'>SDK Integrations</div> | Minimum Version |
| --- | --- |
| [:material-language-javascript: JavaScript SDK](../sdks/javascript-sdk.md#integrations) | `1.4.1+` |
| [:material-android: Android SDK](../sdks/android-sdk.md#integrations) | `1.5.1+` |
| [:material-apple-ios: iOS SDK](../sdks/ios-sdk.md#integrations) | `1.6.0+` |
| [:material-react: React Native](../sdks/react-native-sdk.md#integrations) | `0.6.0+` |
<!-- vale on-->

## Exposure event

The exposure event is simple enough to send through any analytics implementation or customer data platform without needing to manipulate user properties directly. When Amplitude ingests an **`$exposure`** event, the requisite user properties are automatically set or unset for 100% accuracy and confidence.

### Definition

| Event Type | <div class='big-column'>Event Property</div> | Requirement | Description |
| --- | --- | --- | --- |
| **`$exposure`** | `flag_key` | Required | The flag or experiment key which the user is being exposed to. |
| | `variant` | Optional | The variant for the flag or experiment that the user has been exposed to. If `null` or missing, the user property for the flag/experiment is unset, and the users is no longer a part of the experiment. |

### Example

--8<-- "includes/experiment-interactive-exposure-tracking-table.md"
