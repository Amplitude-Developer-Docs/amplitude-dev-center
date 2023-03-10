---
title: Userlist Event Streaming
description: Stream Amplitude events to Userlist.
status: new
---

!!!beta "This feature is in open beta"

    This feature is in open beta and is in active development. Contact the [Userlist support team](https://userlist.com/) for support with this integration.

[Userlist](https://userlist.com/) is an email automation platform for SaaS companies. Unlike other email providers, it meets the complexity of your SaaS business. You can track company-level data, and trigger campaigns based on company-level events. It's the best way to onboard, engage, and nurture customers and marketing leads.

!!!info "Other Amplitude + Userlist integrations"

    This integration streams Amplitude events to Userlist. There is another integration for [sending cohorts to Userlist](https://www.docs.developers.amplitude.com/data/destinations/userlist-cohort/).

## Considerations

Keep these things in mind when sending events to [Userlist](https://userlist.com/):

- You must enable this integration in each Amplitude project you want to use it in.
- You need a paid Userlist plan to enable this integration.
- Amplitude matches the `user_id` to the ID field within Userlist to associated events. If user with that ID doesn't exist in Userlist, a user is created. Make sure that the Amplitude `user_id` field matches the Userlist identifier field to avoid user duplication.
- Amplitude sends all user, event, and group properties along with the event.

## Setup

### Userlist setup

To start sending data into Userlist, you first have to get your Push API Key from Userlist. It's used to authenticate your requests to the Push API and connect the data with your account. Find this in your Userlist Settings. See the [Userlist documentation](https://userlist.com/docs/getting-started/integration-guide/) for more help. There are no other setup steps in Userlist.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Event Streaming section, click **Userlist**.
3. Enter a sync name, then click **Create Sync**.
4. Click **Edit**, then paste your Userlist Push Key.
5. Toggle the Send events filter to select the events to send. You can send all events, but Amplitude recommends choosing the most important ones.
6. Use the Event Properties filter to select event properties.
7. When finished, enable the destination and save.