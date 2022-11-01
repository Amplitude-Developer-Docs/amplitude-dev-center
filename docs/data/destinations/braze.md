---
title: Braze Event Streaming
description: Amplitude Data's Braze integration lets you stream your Amplitude event data straight to Braze with just a few clicks.
---

--8<-- "includes/open-beta.md"

Amplitude Data's Braze integration lets you stream your Amplitude event data straight to Braze with just a few clicks.

!!!note "Other Amplitude + Braze Integrations"

    This integration streams Amplitude events to Braze. Amplitude offers other integrations with Braze: 

    - [Send Cohorts to Braze](/data/destinations/braze-cohort)
    - [Braze Event Import](/data/sources/braze)

## Considerations

- You must have a Braze account. 
- Amplitude uses the `user_id` to match event data to a user within Braze. If a user with that `user_id` doesn't exist within Braze, Braze creates a user with that ID.
- Amplitude sends the `user_id`, `event_name`, and `created_at` to Braze. 
- Amplitude sends all user, group, and event properties as Braze custom event properties.

## Setup

### Prerequisites

To configure an Event Streaming integration from Amplitude to Braze, you need the following information from Braze:

- Endpoint: the endpoint for the REST operations. It looks like : `https://rest.iad-##.braze.com`, See the [Braze documentation](https://www.braze.com/docs/api/basics/#endpoints) to find your endpoint.
- `app_id`: ID for the Braze app that should receive Amplitude events. Find this in your Braze Developer Console under **Settings**. See the [Braze documentation](https://www.braze.com/docs/api/identifier_types/#the-app-identifier-api-key) for more help.
- `api_key`: The REST API Key used for authentication. Find this in your Braze Developer Console under **Settings**. See the [Braze documentation](https://www.braze.com/docs/api/basics/#rest-api-key) for more help.

### Amplitude setup 

1. In Amplitude, navigate to **Data Destinations**, then find **Braze - Event Stream**.
2. Enter a sync name, then click **Create Sync**.
3. Click **Edit**, then paste your Braze REST API Endpoint, REST API Key, and Braze App Identifier API Key.
4. Use the _Send events_ filter to select the events to send. You can send all events, but Amplitude recommends choosing the most important ones.
5. When finished, enable the destination and save.
