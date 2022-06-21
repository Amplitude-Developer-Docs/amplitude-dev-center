---
title: Exposure Tracking
description: An overview of exposure tracking, the exposure event, and how to best track exposures within your system.
---

An exposure event is a [strictly defined](#exposure-event) analytics event sent to Amplitude in order to inform Amplitude Experiment that a user has been exposed to a certain variant of an [experiment or feature flag](./data-model.md#flags-and-experiments). Exposure events contain the **flag key** and the **variant** of the flag or experiment that the user has been exposed to in the event's event properties.

When an [exposure event](#exposure-event) is ingested by Amplitude, the flag key and variant are used to **set or unset user properties** on the user associated with the event. Setting user properties is essential for experiment analysis queries on primary and secondary success metrics.

!!!info "Event Volume"
    Amplitude defined [exposure events](#exposure-event) **do not count** toward your organization's event volume billing.

## Automatic exposure tracking

Client-side Experiment SDKs above a certain version support automatic exposure tracking through an exposure tracking provider, often implemented through an analytics SDK integration.

!!!tip "Integrations"
    Client-side sdks currently support two integrations, Amplitude and Segment (you may also implement your own custom integration).

| <div class='big-column'>SDK</div> | Version |
| --- | --- |
| [:material-language-javascript: JavaScript SDK](../sdks/javascript-sdk.md#integrations) | `1.4.1+` |
| [:material-android: Android SDK](../sdks/android-sdk.md#integrations) | `1.5.1+` |
| [:material-apple-ios: iOS SDK](../sdks/ios-sdk.md#integrations) | `1.6.0+` |
| [:material-react: React Native](../sdks/react-native-sdk.md#integrations) | `0.6.0+` |


## Exposure event

The exposure event has been designed to be simple and ergonomic enough to be sent through any analytics implementation or customer data platform without needing to manipulate user properties directly. When an **`$exposure`** event is ingested, the requisite user properties are automatically set or unset for 100% accuracy and confidence.

### Definition

| Event Type | <div class='big-column'>Event Property</div> | Requirement | Description |
| --- | --- | --- | --- |
| **`$exposure`** | `flag_key` | Required | The flag or experiment key which the user is being exposed to. |
| | `variant` | Optional | The variant for the flag or experiment that the user has been exposed to. If `null` or missing, the user property for the flag/experiment is unset, meaning that the user no longer is considered to be a part of the experiment. |

### Example

--8<-- "includes/experiment-interactive-exposure-tracking-table.md"
