---
title: Exposure Tracking
description: An overview of exposure tracking, the exposure event, and how to best track exposures within your system.
---

An exposure event is an analytics event sent to Amplitude in order to inform Amplitude Experiment that a user has been exposed to a certain variant of an [experiment or feature flag](./data-model.md#flags-and-experiments). Exposure events contain the **flag key** and the **variant** of the flag or experiment that the user has been exposed to in the event's event properties.

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

### Examples

=== "cURL"

    ```bash
    curl --request POST \
        --url https://api2.amplitude.com/2/httpapi \
        --data '{"api_key": "<ANALYTICS_API_KEY>","events":[{"event_type":"$exposure","user_id":"<USER_ID>","event_properties":{"flag_key":"<FLAG_KEY>","variant":"<VARIANT>"}}]}'
    ```

| <div class='big-column'>Variable</div> | Description |
| --- | --- |
| `<ANALYTICS_API_KEY>` | The analytics api key from project which you created your flag and deployment in. |
| `<USER_ID>`| The user ID used to identify the user. This should be the same user whose variants were previously fetched. |
| `<FLAG_KEY>` | The key used to identify which [flag or experiment](./data-model.md#flags-and-experiments) the user is being exposed to. |
| `<VARIANT>` | The [variant](#variant) value that the user is exposed to for the flag or experiment. |
