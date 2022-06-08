---
title: Google Analytics 4 Event Streaming
description: Amplitude Data's Google Analytics 4 integration lets you stream your Amplitude event data straight to Google Analytics with just a few clicks.
---

Amplitude Data's Google Analytics 4 (GA4) integration lets you stream your Amplitude event data straight to Google Analytics with just a few clicks.

--8<-- "includes/closed-beta.md"

## Considerations

Keep these things in mind when sending Amplitude data to GA4. 

- Amplitude sends the `device_id` as the GA4's `client_id`.
- Amplitude sends the `user_id` as GA4's `user_id`.
- Amplitude sends the `event_time` converted to epoch microseconds as GA4's `timestamp_micros`.
- Amplitude sets `non_personalized_ads` to `true` in the sent event.
- GA4 has a limit of 25 user properties and 25 parameters per sent event. Amplitude sends the Amplitude event's user properties and group properties as `user_properties`, and the Amplitude event's event properties as event parameters.
- GA4 property names must be alphanumeric characters or underscores. Amplitude replaces white spaces with a single underscore and strips all other non-alphanumeric characters from the property names in the sent events.
- Amplitude sends custom events using the Amplitude event's `event_type` as event name.

## Setup

### Prerequisites

To set up event streaming to GA4, you need the following: 

- A `Measurement Id` 
- A `Measurement Protocol API secret`

To find these values:

1. Open the [Google Analytics home page](https://analytics.google.com/analytics/web). 
2. Click the **gear icon** to open Admin, then select **Data Streams**. 
3. Pick the data stream to stream the Amplitude events to.
   - `Measurement ID` can be found on the top right corner.
   - `Measurement Protocol API secret` can be found under the `Additional Settings` section, by opening `Measurement Protocol API secrets` . Here a new API secret can be created that should be specific to this use case, and can be managed and removed independently the others. Copy the value in the `Secret value` column of the appropriate row.

There are no setup steps in G4A.

### Amplitude setup 

1. In Amplitude, navigate to **Data Destinations**, then find **Google Analytics 4 - Event Stream**.
2. Enter a sync name, then click **Create Sync**.
3. Click **Edit**, then paste your Measurement ID and Measurement Protocol API secret.
4. Use the _Send events_ filter to select the events you want to send. You can send all events, but we recommend choosing the most important ones.
5. When finished, enable the destination and save.
