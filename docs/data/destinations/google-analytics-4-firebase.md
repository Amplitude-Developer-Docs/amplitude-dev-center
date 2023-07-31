---
title: Google Analytics 4 (iOS/Android) Event Streaming
description: Amplitude CDP's Google Analytics 4 (iOS/Android) streaming integration enables you to forward your Amplitude events and users straight to Google Analytics 4 (iOS/Android) with just a few clicks.
status: new
---

Amplitude CDP's Google Analytics 4 (iOS/Android) streaming integration enables you to forward your Amplitude events and users straight to Google Analytics 4 (iOS/Android) with just a few clicks.

!!!note "Choose the correct Google Analytics 4 destination"

    The Google Analytics 4 (iOS/Android) destination works with an iOS or Android mobile application using Firebase. If you are working with a web application instrumented with Google Tag (gtag.js), set up a [Google Analytics 4 (Web)](../google-analytics-4-gtag) destination instead.

## Setup

### Prerequisites

To configure streaming from Amplitude to Google Analytics 4 (Web), you need the following information from Google Analytics 4 (Web).

- **Google Analytics 4 Firebase App ID**: The identifier for your Google Analytics 4 Firebase app. See the [Google documentation](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=firebase#required_parameters) for help locating your Firebase app ID.
- **Google Analytics 4 Measurement Protocol API Secret**: The measurement protocol API secret used for authentication. See the [Google documentation](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=firebase#required_parameters) for help generating an API secret.

### Create a new sync

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Event Streaming section, click **Google Analytics 4 (iOS/Android)**.
3. Enter a sync name, then click **Create Sync**.

### Enter credentials

1. Enter your **Google Analytics 4 Firebase App ID**.
2. Enter your **Google Analytics 4 Measurement Protocol API Secret**.

### Configure mappings

_This applies to both event and user forwarding. Transformed user properties aren't supported._

1. Select an Amplitude user property that corresponds to your [Google Analytics 4 **App Instance ID**](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=firebase#required_parameters), from the left dropdown.
2. (optional) Map an Amplitude user property to [Google Analytics 4 **User ID**](https://support.google.com/analytics/answer/9213390).
      1. Select an Amplitude user property that corresponds to your Google Analytics 4 **User ID**, from the left dropdown.
      2. Select **User ID**, from the corresponding right dropdown.

### Configure event forwarding

Under **Send Events**, make sure the toggle is enabled ("Events are sent to Google Analytics 4") if you want to stream events to Google Analytics 4. When enabled, events are automatically forwarded to Google Analytics 4 when they're ingested in Amplitude. Events aren't sent on a schedule or on-demand using this integration.

1. In **Select and filter events** choose which events you want to send. Choose only the events you need in Google Analytics 4. _Amplitude sets `non_personalized_ads` to `true` for all events events. Transformed events aren't supported._

    !!!warning "Events for non-Google Analytics 4 users cannot be streamed"

        Google Analytics 4 requires that all events have a Google Analytics 4 **App Instance ID** present. If you have selected any events to send to Google Analytics 4 that may not have a **App Instance ID**, add a filter to send only events where the **App Instance ID** is present. Otherwise, your delivery metrics may be affected.

        ![Setting up a filter for anonymous users on events](/../assets/images/streaming-anonymous-users-filter.png)

2. (optional) In **Select additional properties**, select any more event and user properties you want to send to Google Analytics 4. If you don't select any properties here, Amplitude doesn't send any. These properties are sent to Google Analytics 4 as [Google Analytics 4 parameters](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference?client_type=firebase#payload_post_body). _Transformed event properties and transformed user properties aren't supported._

### Configure user forwarding

Under **Send Users**, make sure the toggle is enabled ("Users are sent to Google Analytics 4") if you want to stream users and their properties to Google Analytics 4. When enabled, users are automatically created or updated in Google Analytics 4 when an event is sent to Amplitude. [Amplitude Identify API](https://www.docs.developers.amplitude.com/analytics/apis/identify-api/) calls are also forwarded to Google Analytics 4. Users aren't sent on a schedule or on-demand using this integration.

(optional) In **Select additional properties**, select any more user properties you want to send to Google Analytics 4. If you don't select any properties here, Amplitude doesn't send any. These properties are sent to Google Analytics 4 as [Google Analytics 4 User Properties](https://developers.google.com/analytics/devguides/collection/protocol/ga4/user-properties?client_type=firebase). _Transformed user properties aren't supported._

!!!note "User Forwarding Volumes"
    When Send Users is enabled, all [Amplitude Identify calls](https://www.docs.developers.amplitude.com/analytics/apis/identify-api/) and event calls that update user properties will trigger a call to be sent to Google Analytics 4, even if the updated property
    isn't selected in **Select additional properties**.

### Enable sync

When satisfied with your configuration, at the top of the page toggle the **Status** to "Enabled" and click **Save**.

--8<-- "includes/debug-delivery-metrics.md"
