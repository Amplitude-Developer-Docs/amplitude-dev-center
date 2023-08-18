---
title: Plotline Event Streaming
description: Stream Amplitude events to Plotline
---

!!!beta "This feature is in open beta"

    This feature is in open beta and is in active development. Contact the [Plotline Support team]((https://www.plotline.so/) for support with this integration.

[Plotline](https://www.plotline.so/) enables Product and marketing teams to configure in-app nudges to improve feature adoption and drive conversions. Fully no-code.

## Considerations

- You must enable this integration in each Amplitude project you want to use it in.
- You need a Plotline account to enable this integration.
- Relevant limits for Plotline events are:
  - Plotline does not impose any hard limits on quantity or velocity; however, requests sent too quickly will return 429 responses. Amplitude will handle these automatically. 
  - The requests must be smaller than 2MB.
- Amplitude sends selected user and event properties along with the event.

## Setup

### Prerequisites

To configure an Event Streaming integration from Amplitude to Plotline, you must fulfill the following prerequisites from Plotline:

- **A Plotline Account:** You must have a Plotline account to leverage this integration. Contact Plotline if you are interested in learning more.
- **Plotline API Key:** To start sending data into Plotline, you first have to generate your API Access Token.

### Plotline setup

1. Log in to your My Plotline account
2. Navigate to the **Credentials tab** to find the API Key
3. Copy the **API Key** while setting up Plotline Event Streaming integration on Amplitude

### Amplitude setup

1. In Amplitude, navigate to **Data Destinations**, then find **Plotline - Event Stream**.
2. Enter a sync name, then click **Create Sync**.
3. Toggle Status from **Disabled** to **Enabled**.
4. Paste your **API Key (Access Token from the Plotline platform)**.
5. (Optional) Under **Create & Update users**, make sure the toggle is enabled if you want to send over users and their properties in real-time whenever a user is created or the user property is updated in Amplitude.
6. Under **Send Events**, make sure the toggle is enabled ("Events are sent to Plotline") if you want to stream events to Plotline. When enabled, events are automatically forwarded to Plotline when they're ingested in Amplitude. Events aren't sent on a schedule or on demand using this integration.
7. . In **Select and filter events** choose which events you want to send. Choose only the events you need in Plotline. [Transformed events](https://www.google.com/url?q=https://help.amplitude.com/hc/en-us/articles/5913315221915-Transformations-Retroactively-modify-your-event-data-structure%23:~:text%3DAmplitude%2520Data%27s%2520transformations%2520feature%2520allows,them%2520to%2520all%2520historical%2520data.&sa=D&source=docs&ust=1692341974637179&usg=AOvVaw1BdAYfjzWTy1y9u94STUaQ) aren't supported.
8. When finished, enable the destination and **Save**.

Once the integration is complete, you’ll find the data in **Data Center** under **Events and Data Center** in the **Live Stream** section.

### Use Cases

Sending events from Amplitude to Plotline can enhance the effectiveness of your communication strategies and help drive higher-value conversions through targeted and personalized messaging. Here are some specific use cases for integrating Amplitude with Plotline:

- **Generate personalized content:** Generate personalized content relevant to each user using event data from Amplitude.
- **Behavioral Triggered Campaigns:** With the integration, you can set up behavioral triggers in Plotline based on the events tracked in Amplitude. For instance, when a user reaches a certain milestone or completes a specific action within your app, Plotline can show specific campaigns to users.
- **Personalized Campaigns:** By sending user behavior data from Amplitude to Plotline, you can create personalized in-app campaigns based on specific user actions or preferences. For example, you can include their name, offer details, etc in the in-app campaigns that are seen by the users.
