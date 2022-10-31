---
title: Lantern Event Streaming
description: Stream Amplitude events to Lantern to help predict when your customers are ready to expand or need help.
status: new
---

--8<-- "includes/open-beta.md"

[Lantern](https://www.withlantern.com/) is a customer success platform designed to predict when customers are ready to expand or in need of help and run workflows to engage them. Lantern helps B2B companies connect with the right customer at the right time and increase Net Dollar Retention.

!!!info "This integration is managed by Lantern"

    Contact the [Lantern support team](https://www.withlantern.com/pricing) for support with this integration.

## Considerations

Keep these things in mind when sending events to Lantern.

- You must enable this integration in each Amplitude project you want to use it in.
- You must have a paid Lantern plan.
- Amplitude matches the `user_id` to the Lantern `analytics_id`  to associate events.s
- Relevant limits for Lantern events are:
    - Maximum event size of data: 64 bytes
    - Maximum size of event data: 4250K bytes (4.25MB)
- To forward event properties, you need to specify the event properties in the UI during the setup stage.

## Setup

### Lantern setup

Get your webhook ID from Lantern. See the [Lantern documentation](https://www.withlantern.com/integration) for more help. There are no other setup steps in Lantern.

### Amplitude setup

1. In Amplitude, navigate to **Data Destinations**, then find **Lantern - Event Stream**.
2. Enter a sync name, then click **Create Sync**.
3. Toggle Status to **Enabled**.
4. Enter your Lantern Webhook ID.
5. Toggle the Send events filter to select the events to send. You can send all events, but Amplitude recommends choosing the most important ones.
6. Use the Event Properties filter to select which event properties you want to send.
7. When finished, save the destination.