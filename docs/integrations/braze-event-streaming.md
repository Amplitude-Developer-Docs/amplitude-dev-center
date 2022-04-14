---
title: Braze Event Streaming (Beta)
description: Amplitude Data's Braze integration lets you stream your Amplitude event data straight to Braze with just a few clicks.
---

--8<-- "includes/closed-beta.md"

Amplitude Data's Braze integration lets you stream your Amplitude event data straight to Braze with just a few clicks.

## Considerations

David - what do people need to know?

## Setup

### Prerequisites

To configure an Event Streaming integration from Amplitude to Braze, you need the following information from Braze:

- Endpoint: the endpoint for the REST operations. It looks like : `https://rest.iad-01.braze.com`, See [Braze's documentation](https://www.braze.com/docs/api/basics/#endpoints) to find your endpoint.
- `app_id`: ID for the Braze app that should receive Amplitude events. Find this in your Braze Developer Console under **Settings**. See the [Braze documentation](https://www.braze.com/docs/api/api_key/#where-can-i-find-it-1) for more help.
- `api_key`: The API Key that is used for authentication. Find this in your Braze Developer Console under **Settings**. See the [Braze documentation](https://www.braze.com/docs/api/api_key/#where-can-i-find-it) for more help.

### Amplitude setup 

1. In Amplitude, navigate to **Data Destinations** then click **View all Destinations**.
2. Click **Braze - Event Stream**.
3. Enter a sync name, then click **Create Sync**.
4. Click **Edit**, then paste your Braze REST API Endpoint, REST API Key. and Braze application API Key.
5. Use the _Send events_ filter to select the events you want to send. You can send all events, but we recommend choosing the most important ones. 
6. When finished, enable the destination and save.
