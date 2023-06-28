---
title: Bento Event Streaming
description: Stream Amplitude events to Bento.
---

[Bento](https://www.trybento.co/) allows you to build powerful and native-looking activation experiences in your product. From onboarding checklists presented in your app dashboard, to upsell and cross-sell cards, to new feature announcements, Bento empowers designers and PMs to build and test without being blocked by engineering. 

In order to show the right users the right experience, you can send cohort information to Bento for guide targeting. We support this at the user and group level. To automatically complete steps in a Bento guide when a user takes actions, you can pass in events from Amplitude. 

This integration lets you stream events and event properties from Amplitude to Bento.

## Considerations

Keep these things in mind when sending events to Bento:

- You must enable this integration in each Amplitude project you want to use it in.
- You need a paid Bento plan to enable this integration.
- Amplitude matches the **User_id** to the ID field within Bento to associated events. If a user with that id doesn't exist within Bento, a user is created. Make sure that the Amplitude **User_id** field matches the Bento **Identity ID** to avoid user duplication.
- Amplitude sends all user properties along with the event.

## Setup

### Prerequisites

To configure an Event Streaming integration from Amplitude to Bento, you need the following information from Bento:

- **API Key:** To start sending data into Bento, you first have to get your API Key. It is used to authenticate your requests to the API and connect the data with your account. Find this in your Bento Integrations > Amplitude >  Modify Configuration. See the [Bento documentation](https://help.trybento.co/en/articles/6978743-amplitude-integration) for more help.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Event Streaming section, click **Bento**.
3. Enter a sync name, then click **Create Sync**.
4. Toggle Status from **Disabled** to **Enabled**.
5. Paste your **API Key**.
6. Toggle the **Send events**.
7. In **Select and filter events** choose which events you want to send. Choose only the events you need in Bento. *Transformed events aren't supported.*
8. Under **Map properties to destination**, choose your user identifier and map specific Amplitude properties from Amplitude to Bento.
9. (optional) In **Select additional properties**, select any more user properties you want to send to Bento. If you don't select any properties here, Amplitude doesn't send any.
10. When satisfied with your configuration, click **Save**.

