---
title: Iterable Event Streaming
description: Amplitude Data's Iterable integration lets you stream your Amplitude event data straight to Iterable with just a few clicks.
---

--8<-- "includes/closed-beta.md"

Amplitude Data's Iterable integration lets you stream your Amplitude event data straight to Iterable with just a few clicks.

!!!note "Other Amplitude + Iterable integrations"

    This integration streams Amplitude events to Iterable. Amplitude offers other integrations with Iterable: 

    - [Send Amplitude Cohorts to Iterable](/data/destinations/iterable-cohort)
    - [Import Iterable Data](/data/sources/iterable)

## Considerations

- You must have an Iterable account.
- The user must exist within Iterable to send events. The Amplitude `user_id` must match an existing user in Iterable
- Amplitude sends `user_id`, `event_name`, and `created_at`.

## Setup

### Prerequisites

To configure an Event Streaming integration from Amplitude to Iterable, you need an Iterable API key with server-side access. Learn more in [Iterable's documentation](https://support.iterable.com/hc/en-us/articles/360043464871-API-Keys-#creating-api-keys).

### Amplitude setup 

1. In Amplitude, navigate to **Data Destinations**, then find **Iterable - Event Stream**.
2. Enter a sync name, then click **Create Sync**.
3. Click **Edit**, then paste your API Key.
4. Use the _Send events_ filter to select the events you want to send. You can send all events, but we recommend choosing the most important ones. 
5. When finished, enable the destination and save.
