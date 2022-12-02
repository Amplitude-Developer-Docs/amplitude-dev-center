---
title: Google Analytics 4 (Web) Event Streaming
description: Amplitude Data's Google Analytics 4 (Web) integration enables you to stream your Amplitude event data straight to Google Analytics with just a few clicks.
---

Amplitude Data's Google Analytics 4 (Web) integration enables you to stream your Amplitude event data straight to Google Analytics with just a few clicks.

## Considerations

The Google Analytics 4 (Web) destination works with a web application instrumented with Google Tag (gtag.js). If you are working with an iOS or Android mobile application using Firebase, set up a [Google Analytics 4 (iOS/Android)](../google-analytics-4-firebase) destination instead.

- Amplitude sets `non_personalized_ads` to `true` for all sent events.
- Google Analytics 4 property names are composed of alphanumeric characters and underscores. Amplitude replaces white spaces in property names with a single underscore and strips all other non-alphanumeric characters from the names.
- Amplitude sends custom events using Amplitude `event_type` as event name.

## Setup

### Prerequisites

To set up event streaming to GA4, you need the following: 

- A `Measurement ID` 
- A `Measurement Protocol API secret`

To find these values:

1. Open the [Google Analytics home page](https://analytics.google.com/analytics/web). 
2. Click the **gear icon** to open Admin, then select **Data Streams**. 
3. Pick the data stream to stream the Amplitude events to.
   - `Measurement ID` is available on the top right corner.
   - `Measurement Protocol API secret` is available under the `Additional Settings` section, by opening `Measurement Protocol API secrets`. You can create a new API secret that's specific to this use case, that you can manage and remove independently the others. Copy the value in the `Secret value` column of the appropriate row.

### Amplitude setup 

1. In Amplitude, navigate to **Data**.
2. On the sidebar, under **Connections**, select **Catalog**.
3. Select the **Destinations** tab.
4. Select **Event Streaming**.
5. Click **Google Analytics 4 (Web)**.
2. Enter a sync name, then click **Create Sync**.

#### Configure settings

1. On the **Settings** tab, click **Edit**.
2. Enter your **Measurement Protocol API secret**.
3. Enter your **Measurement ID**.

**Create & Update Users** creates users in Google Analytics 4 and update the properties of existing users when an Amplitude Identify API call is made. You can select up to 25 user properties to send. Google Analytics 4 doesn't accept more than 25 user properties.

4. To create and update users, toggle the button under **Create & Update Users** to **Enabled**.
5. To select user properties to send, expand the **Specify user properties to send** panel, and select up to 25 properties. If you don't select any properties here, none are included.

**Send Events** sends events ingested by Amplitude to Google Analytics 4. You can select up to 25 event properties to send. Google Analytics 4 doesn't accept more than 25 event properties.

6. To send event, toggle the button under **Send Events** to **Enabled**.
7. Expand the **Select and filter events** panel, and select which events to send. Amplitude recommends that you only send the events you need in Google Analytics 4, rather than selecting **All Events**.
8. To select event properties to send, expand the **Specify event properties to send** panel, and select up to 25 properties. If you don't select any properties here, none are included.

9. Click **Save**.

#### Configure mappings

For newer versions of the Google Analytics 4 (Web) destination, you can customize which Amplitude properties are mapped to fields in Google Analytics 4. If you choose not to do this, or are using an older version that doesn't support **Mappings**, the default values described below are used instead.'

1. Click **Edit**.
1. Select a **User ID**. This is a unique identifier for users in Google Analytics 4. Defaults to Amplitude **User ID** (user_id).
2. Select a **Client ID**. This is a unique identifier for a web client, a user's instance of your web application. Defaults to Amplitude **Device ID** (device_id).
4. Click **Save**.

#### Enable integration

1. Navigate back to the **Settings** tab.
2. Click **Edit**.
3. Toggle **Status** from **Disabled** to **Enabled**.
4. Click **Save**.
