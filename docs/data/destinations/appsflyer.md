---
title: AppsFlyer Event Streaming
description: Amplitude Data's AppsFlyer integration lets you stream your Amplitude event data straight to AppsFlyer with just a few clicks.
---

Amplitude Data's AppsFlyer integration lets you stream your Amplitude event data straight to AppsFlyer with just a few clicks.

--8<-- "includes/closed-beta.md"

## Considerations

Keep a few things in mind when sending events to AppsFlyer:

- A user must exist in AppsFlyer to send events for them. Amplitude sends the event data with the `user_id`, which must match the `customer_user_id` within AppsFlyer. Make sure that the AppsFlyer `customer_user_id` and the Amplitude `user_id` match.
- Amplitude forwards all event, user, and group properties as key value pairs within `eventValue`.
- Amplitude sends the `os` property. AppsFlyer recommends including it because for iOS apps, if the `os` property isn't included for iOS apps, AppFlyer records the data as coming from a device running iOS 14.5.
- Amplitude sends device identifiers if available. See the [AppFlyer documentation](https://support.appsflyer.com/hc/en-us/articles/207034486#payload-parameters) for more information about what happens if you don't send a device identifier.
- Amplitude attempts to send the device identifiers listed in the [AppFlyer documentation](https://support.appsflyer.com/hc/en-us/articles/207034486#payload-parameters).

## Setup

### Prerequisites

To complete setup, you need the following information from AppsFlyer:

- REST API Key: Find this in **App Settings > Dev Key**.
- AppsFlyer App ID: The app identifier used in your AppsFlyer dashboard. It also appears in the URL when you are on the dashboard.

There are no other setup steps in AppsFlyer. 

### Amplitude setup 

1. In Amplitude, navigate to **Data Destinations**, then find **AppsFlyer - Event Stream**.
2. Enter a sync name, then click **Create Sync**.
3. Click **Edit**, then paste your AppsFlyer App ID and REST API key.
4. Use the _Send events_ filter to select the events you want to send. You can send all events, but we recommend choosing the most important ones.
5. When finished, enable the destination and save.
