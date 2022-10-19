---
title: Send Events to Statsig
description: Send Amplitude events to Statsig to help find more meaningful data insights.
---

!!!beta "This feature is in open beta"

    This feature is in open beta and is in active development. Contact the [Statsig support team](http://support@statsig.com.) for support with this integration.

[Statsig](https://statsig.com/) is a modern feature-management and product experimentation platform that helps you to ship faster by providing actionable causal analysis, meaningful data insights, and automatically running 10x more experiments.

!!!info "Other Amplitude + Statsig Integrations"

    This integration streams Amplitude events to Statsig. Amplitude offers other integrations with Statsig: [Send Cohorts to Statsig](../destinations/statsig-cohort/)
 
## Considerations

Keep these things in mind when sending events to Statsig:

- You must enable this integration in each Amplitude project you want to use it in.
- Amplitude matches the `user_id` to the id within Statsig to associated events. If user with that ID doesn't exist in Statsig, then Statsig creates one. Make sure that the Amplitude `user_id` field matches the Statsig id field to avoid user duplication.
- The limits for Statsig events are:
    - Maximum user identifier and event name: 64 bytes
    - Maximum size of metadata: 2048 bytes (stringified JSON)
    - Amplitude sends all user, event, and group properties along with the event.

## Setup

### Statsig setup

To configure an Event Streaming integration from Amplitude to Statsig, you need the Server Secret Key from Statsig.

See the [Statsig documentation](https://docs.statsig.com/feature-gates/implement/server#step-1-get-the-statsig-server-secret-key) instructions to retrieve it.

### Amplitude setup

1. In Amplitude, navigate to **Data Destinations**, then find **Statsig - Event Stream**.
2. Enter a sync name, then click **Create Sync**.
3. Click **Edit**, then paste your Statsig Push Key.
4. Use the Send events filter to select the events to send. You can send all events, but Amplitude recommends choosing the most important ones.
5. When finished, enable the destination and save.