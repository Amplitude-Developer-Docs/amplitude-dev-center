---
title: AppsFlyer Event Streaming
description: Amplitude Data's AppsFlyer integration lets you stream your Amplitude event data straight to AppsFlyer with just a few clicks.
---

Amplitude Data's AppsFlyer integration lets you stream your Amplitude event data straight to AppsFlyer with just a few clicks.

## Considerations

Keep a few things in mind when sending events to AppsFlyer:

- A user must exist in AppsFlyer to send events for them. Amplitude sends the event data with the `user_id`, which must match the `customer_user_id` within AppsFlyer. Make sure that the AppsFlyer `customer_user_id` and the Amplitude `user_id` match.
- Amplitude forwards all event, user, and group properties as key value pairs within `eventValue`.
- We will include the `os` property. While not strictly mandatory, Appsflyer highly recommends passing it. This is their warning: "Starting July 1, 2021, for iOS apps, if you don't send this parameter we regard the data as having come from a device running iOS 14.5"
- We will send device identifiers if available. This is the warning on AppsFlyer:
  - "Not sending an advertising ID/device identifier can cause:
    - **Postback issues**: The media source will receive the postback but without a device identifier; consequently the media source can't associate it with a user.
    - **Audiences segmentation and rule failure**. Audiences rulesets require identifiers. Send a device ID or customer user ID according to the ID type your ruleset uses."
- These are the possible device identifiers we will attempt to send [NEED LIST]
- This warning is on the API page: "The advertising ID/device identifier is mandatory to assure postbacks to SRNs like Facebook and Google Ads. If you are unable to send the ID, take into consideration that postbacks can't be sent."

## Setup

### Prerequisites

To complete setup, you need the following information from AppsFlyer:

- REST API Key: Find this in **App Settings > Dev Key**.
- AppsFlyer App ID: The app identifier used in your AppsFlyer dashboard. It also appears in the URL when you are on the dashboard.

There are no other setup steps in AppsFlyer. 

### Amplitude setup 

1. In Amplitude, navigate to **Data Destinations**, then find **AppsFlyer - Event Stream**.
2. Enter a sync name, then click **Create Sync**.
3. Click **Edit**, then paste your AppsFlyer APP ID and REST API key.
4. Use the _Send events_ filter to select the events you want to send. You can send all events, but we recommend choosing the most important ones.
5. When finished, enable the destination and save.
