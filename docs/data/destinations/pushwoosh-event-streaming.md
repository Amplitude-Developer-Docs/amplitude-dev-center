---
title: Pushwoosh Event Streaming
description: Stream Amplitude events to Pushwoosh
---

!!!beta "This feature is in open beta"

    This feature is in open beta and is in active development. Contact the [Pushwoosh Support team](https://www.pushwoosh.com) for support with this integration.

[Pushwoosh](https://www.Pushwoosh.so/) helps marketers build effective communication strategies with the use of push notifications, in-app messages, emails, and cross-channel-triggered campaigns. As a result, businesses get to drive higher-value conversions.

## Considerations

- You must enable this integration in each Amplitude project you want to use it in.
- You need a Pushwoosh account to enable this integration.
- Pushwoosh doesn't impose hard limits on quantity or velocity. If you send request too fast, Pushwoosh returns a 429 error, which Amplitude handles by default.
- Requests must be smaller than 2MB.
- Amplitude sends selected user and event properties along with the event.

## Setup

### Prerequisites

To configure an Event Streaming integration from Amplitude to Pushwoosh, you must fulfill the following prerequisites from Pushwoosh:

- **Pushwoosh Account:** You must have a Pushwoosh account to leverage this integration. Contact Pushwoosh to learn more.
- **Pushwoosh API Key:** Before you can send data to Pushwoosh, generate an API Access token.
- **Pushwoosh App Code:** Before you can send data to Pushwoosh, locate your API Code.

### Pushwoosh setup

1. Log in to your Pushwoosh account.
2. Navigate to the Settings page to get your **Pushwoosh API Key** and **App Code**.

### Amplitude setup

1. In Amplitude, navigate to **Data Destinations**, then find **Pushwoosh - Event Stream**.
2. Enter a sync name, then click **Create Sync**.
3. Toggle Status from **Disabled** to **Enabled**.
4. Paste your **API Key** (Access Token from the Pushwoosh platform).
5. Paste your **App Code** (Taken from the Pushwoosh platform).
6. Select an Amplitude user property that corresponds to your Pushwoosh User_ID, from the left dropdown.
7. (Optional) Under **Create & Update users**, make sure the toggle is enabled if you want to send over users and their properties in real-time whenever Amplitude creates a user or updates the user property.
8. Under **Send Events**, make sure the toggle is enabled ("Events are sent to Pushwoosh") if you want to stream events to Pushwoosh. When enabled, events are automatically forwarded to Pushwoosh when they're ingested in Amplitude. Events aren't sent on a schedule or on demand using this integration.
9. In **Select and filter events** choose which events you want to send. Choose only the events you need in Pushwoosh. [Transformed events](https://www.google.com/url?q=https://help.amplitude.com/hc/en-us/articles/5913315221915-Transformations-Retroactively-modify-your-event-data-structure%23:~:text%3DAmplitude%2520Data%27s%2520transformations%2520feature%2520allows,them%2520to%2520all%2520historical%2520data.&sa=D&source=docs&ust=1692341974637179&usg=AOvVaw1BdAYfjzWTy1y9u94STUaQ) aren't supported.
10. When finished, enable the destination and **Save**.

### Use cases

Sending events from Amplitude to Pushwoosh can enhance the effectiveness of your communication strategies and help drive higher-value conversions through targeted and personalized messaging. Here are some specific use cases for integrating Amplitude with Pushwoosh:

- **Personalized Push Notifications:** By sending user behavior data from Amplitude to Pushwoosh, you can create personalized push notification campaigns based on specific user actions or preferences. For example, you can send a personalized push notification to users who have abandoned their shopping carts, encouraging them to complete their purchase with a special offer.
- **Behavioral Triggered Messages:** With the integration, you can set up behavioral triggers in Pushwoosh based on the events tracked in Amplitude. For instance, when a user reaches a certain milestone or completes a specific action within your app, Pushwoosh can automatically send them a congratulatory message or offer a reward.
- **In-App Messaging:** Pushwoosh allows you to deliver in-app messages to users while they use your app. By combining data from Amplitude, you can create highly targeted in-app messages based on user behavior and preferences. This can help improve user engagement and retention.
