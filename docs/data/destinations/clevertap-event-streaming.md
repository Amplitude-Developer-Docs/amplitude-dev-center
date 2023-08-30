---
title: CleverTap Event Streaming
description: Stream Amplitude events to CleverTap
---

!!!beta "This feature is in open beta"

    This feature is in open beta and is in active development. Contact the [CleverTap Support team]((https://www.CleverTap.so/) for support with this integration.

## About CleverTap
                                                                                                                                                                                                                                             
[CleverTap](https://www.CleverTap.com) is a modern, integrated retention cloud that empowers digital consumer brands to increase customer retention and lifetime value. With this integration, you can ingest event data from Amplitude into CleverTap for further engagement.

!!!note "Other Amplitude + CleverTap integrations"

    Amplitude offers other integrations with CleverTap:

    - [Import CleverTap Data](/data/sources/clevertap)
    - [Send Amplitude Cohorts to CleverTap](/data/destinations/clevertap-cohort)

## Considerations

- You must enable this integration in each Amplitude project you want to use it in.
- You need a CleverTap account to enable this integration.
- Relevant limits for CleverTap events are:
    - CleverTap does not impose any hard limits on quantity or velocity; however, requests sent too quickly will return 429 responses. Amplitude will handle these automatically. 
    - The requests must be smaller than 2MB.
- Amplitude sends selected user and event properties along with the event.

## Setup

### Prerequisites

To configure an Event Streaming integration from Amplitude to CleverTap, you must fulfill the following prerequisites from CleverTap:

- CleverTap Account ID
- CleverTap Passcode
- CleverTap Region

### CleverTap setup

1. Log into your CleverTap dashboard and copy your **Account ID** and **Account Passcode**.

See the CleverTap [documentation](https://www.google.com/url?q=https://docs.clevertap.com/docs/amplitude-cohort-import%23find-clevertap-project-details&sa=D&source=docs&ust=1692357152443535&usg=AOvVaw06TN-OkFNB19149ulkPqjM) for more help.

### Amplitude setup

1. In Amplitude, navigate to **Data Destinations**, then find **CleverTap - Event Stream**.
2. Enter a sync name, then click **Create Sync**.
3. Toggle Status from **Disabled** to **Enabled**.
4. Paste your CleverTap Account ID (Access from the CleverTap platform).
5. Paste your CleverTap Passcode (Taken from the CleverTap platform).
6. Enter your CleverTap Region (aps3, eu1, in1, sg1, mec1, us1). Click [here](https://developer.clevertap.com/docs/idc#api) to identify your region.
7. Select an Amplitude user property that corresponds to your CleverTap identity, from the left dropdown.
8. (Optional) Under **Create & Update users**, make sure the toggle is enabled if you want to send over users and their properties in real time whenever a user is created or user property is updated in Amplitude.
9. Under **Send Events**, make sure the toggle is enabled ("Events are sent to CleverTap") if you want to stream events to CleverTap. When enabled, events are automatically forwarded to CleverTap when they're ingested in Amplitude. Events aren't sent on a schedule or on-demand using this integration.
10. In **Select and Filter** events choose which events you want to send. Choose only the events you need in CleverTap. [Transformed events](https://www.google.com/url?q=https://help.amplitude.com/hc/en-us/articles/5913315221915-Transformations-Retroactively-modify-your-event-data-structure%23:~:text%3DAmplitude%2520Data%27s%2520transformations%2520feature%2520allows,them%2520to%2520all%2520historical%2520data.&sa=D&source=docs&ust=1692357097348525&usg=AOvVaw227AdCLFf9uo9MvuP2FKqY) aren't supported.
11. When finished, enable the destination and Save.

### Use Cases

Streaming events from Amplitude to CleverTap can enable various use cases that leverage the strengths of both platforms. Here are some potential use cases for streaming events from Amplitude to CleverTap:

1. **Advanced Analytics and Visualization:** By combining the event data from Amplitude with CleverTap's analytics capabilities, you can gain deeper insights into user behavior and engagement. CleverTap provides powerful visualization tools that can help you analyze user journeys, funnel drop-offs, and other key metrics, allowing you to make data-driven decisions to optimize your product or marketing strategies.
2. **Personalized Engagement Campaigns:** With the combined data, you can create highly targeted and personalized engagement campaigns using CleverTap's automation and segmentation features. For example, you can identify users who abandoned a specific step in your product and then use CleverTap to send personalized messages or offers to encourage them to complete the desired action.
3. **Customer Retention and Churn Prevention:** Analyzing event data from Amplitude within CleverTap can help you identify patterns that indicate users at risk of churning. CleverTap's machine learning capabilities can help you predict churn likelihood and trigger retention campaigns to re-engage users before they leave.
