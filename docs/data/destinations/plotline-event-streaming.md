---
title: Plotline Event Streaming
description: Stream Amplitude events to Plotline
---

!!!beta "This feature is in open beta"

    This feature is in open beta and is in active development. Contact the [Plotline Support team](https://www.plotline.so/) for support with this integration.

[Plotline](https://www.plotline.so/) enables Product and marketing teams to configure in-app nudges to improve feature adoption and drive conversions. Fully no-code.

## Considerations

- You must enable this integration in each Amplitude project you want to use it in.
- You need a Plotline account to enable this integration.
- Relevant limits for Plotline events are:
    - Plotline doesn't impose any hard limits on quantity or velocity. If you send too many requests in a short period of time, the integration returns a 429 response, which Amplitude handles. 
    - Requests must be smaller than 2MB.
- Amplitude sends selected user and event properties along with the event.

## Setup

### Prerequisites

To configure an Event Streaming integration from Amplitude to Plotline, you must fulfill the following prerequisites from Plotline:

- **A Plotline Account:** You must have a Plotline account to use this integration. Contact Plotline to learn more.
- **Plotline API Key:** Plotline requires an API key to send data to Plotline.

### Plotline setup

1. Log in to your My Plotline account.
2. Navigate to the **Credentials** tab to find and copy your account's API Key.

### Amplitude setup

1. In Amplitude, navigate to **Data Destinations**, then find **Plotline - Event Stream**.
2. Enter a sync name, then click **Create Sync**.
3. Toggle Status from **Disabled** to **Enabled**.
4. Paste your **API Key (Access Token from the Plotline platform)**.
5. (Optional) In the **Create & Update users** section, enable the toggle if you want to send users and their properties in real-time whenever Amplitude creates a user or updates the user property.
6. In the **Send Events** section, enable the **Events are sent to Plotline** toggle to stream events to Plotline. When enabled, Amplitude forwards events to Plotline when they're ingested. Events aren't sent on a schedule or on demand using this integration.
7. In the **Select and filter events** section choose which events you want to send. Choose only the events you need in Plotline. This integration doesn't support[Transformed events](https://www.google.com/url?q=https://help.amplitude.com/hc/en-us/articles/5913315221915-Transformations-Retroactively-modify-your-event-data-structure%23:~:text%3DAmplitude%2520Data%27s%2520transformations%2520feature%2520allows,them%2520to%2520all%2520historical%2520data.&sa=D&source=docs&ust=1692341974637179&usg=AOvVaw1BdAYfjzWTy1y9u94STUaQ).
8. Enable the destination and **Save** to finish.

When the integration is active, find the data in **Data Center** under **Events and Data Center** in the **Live Stream** section. 

### Use cases

Sending events from Amplitude to Plotline can enhance the effectiveness of your communication strategies and help drive higher-value conversions through targeted and personalized messaging. Here are some specific use cases for integrating Amplitude with Plotline:

- **Generate personalized content:** Generate personalized content relevant to each user using event data from Amplitude.
- **Behavioral Triggered Campaigns:** With the integration, you can set up behavioral triggers in Plotline based on the events tracked in Amplitude. For instance, when a user reaches a certain milestone or completes a specific action within your app, Plotline can show specific campaigns to users.
- **Personalized Campaigns:** By sending user behavior data from Amplitude to Plotline, you can create personalized in-app campaigns based on specific user actions or preferences. For example, you can include their name and offer details in the in-app campaigns that users see.
