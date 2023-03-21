---
title: Braze Event Streaming
description: The Amplitude Braze streaming integration enables you to stream your Amplitude event and user data straight to Braze with just a few clicks.
---

--8<-- "includes/open-beta.md"

Amplitude CDP's Braze streaming integration enables you to stream your Amplitude event and user data straight to Braze with just a few clicks.

!!!note "Other Amplitude CDP + Braze Integrations"

    This integration streams Amplitude events and users to Braze. Amplitude CDP offers other integrations with Braze:

    - [Export Amplitude cohorts to Braze](/data/destinations/braze-cohort)
    - [Import Braze events into Amplitude](/data/sources/braze)

## Setup

### Prerequisites

To configure streaming from Amplitude to Braze, you need the following information from Braze.

- **Braze REST API Endpoint**: The Braze endpoint for REST operations. See the [Braze documentation](https://www.braze.com/docs/api/basics/#endpoints) for help determining your endpoint.
- **REST API Key**: The Braze REST API key used for authentication. See the [Braze documentation](https://www.braze.com/docs/api/basics/#rest-api-key) for help locating your API key.
- **Braze Application API Key**: The Braze App Identifier for the app receiving Amplitude events. See the [Braze documentation](https://www.braze.com/docs/api/identifier_types/#the-app-identifier-api-key) for help locating your app ID.

### Create a new sync

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Event Streaming section, click **Braze**.
3. Enter a sync name, then click **Create Sync**.

### Enter credentials

1. Select your **Braze REST API Endpoint**.
2. Enter your **REST API Key**.
3. Enter your **Braze Application API Key**.
4. Check **Update Users Only** to only update users that exist in Braze, and not create new ones. If you're sending alias-only user profiles, don't check this field. If you check **Update Users Only**, your alias-only user profiles aren't created in Braze. More information available in the [Braze documentation](https://www.braze.com/docs/api/objects_filters/user_attributes_object).

### Configure mappings

_This applies to both event and user forwarding._

1. Select an Amplitude property that corresponds to your Braze user ID.
2. Select the type of your Braze user ID.
    - **External ID**: Any unique identifier for each user in Braze.
    - **Braze ID**: A unique identifier provided by Braze for each user.
    - **User Alias**: An alternative unique identifier for each user in Braze.

See the Braze documentation for more information on [External ID and Braze ID](https://www.braze.com/docs/api/basics/#user-ids) and [user aliases](https://www.braze.com/docs/api/objects_filters/user_alias_object).

### Configure event forwarding

Under **Send Events**, make sure the toggle is enabled ("Events are sent to Braze") if you want to stream events to Braze. When enabled, events are automatically forwarded to Braze when they're ingested in Amplitude. Events aren't sent on a schedule or on-demand using this integration.

1. In **Select and filter events** choose which events you want to send. Choose only the events you need in Braze.
2. (optional) In **Select additional properties**, select any more event and user properties you want to send to Braze. If you don't select any properties here, Amplitude doesn't send any. These properties are sent to Braze as [Braze custom event properties](https://www.braze.com/docs/user_guide/data_and_analytics/custom_data/custom_events/#custom-event-properties).

!!!warning "Events for anonymous users cannot be streamed"

    Braze requires that all events have a user ID present. If you have selected any events to send to Braze that may not have a user ID, add a filter on those events to keep only events where the user ID is present. Otherwise, your delivery metrics may be affected.

    ![Setting up a filter for anonymous users on events](/../assets/images/streaming-anonymous-users-filter.png)

### Configure user forwarding

Under **Send Users**, make sure the toggle is enabled ("Users are sent to Braze") if you want to stream users and their properties to Braze. When enabled, users are automatically created or updated in Braze when an event is sent to Amplitude. [Amplitude Identify API](https://www.docs.developers.amplitude.com/analytics/apis/identify-api/) calls are also forwarded to Braze. Users aren't sent on a schedule or on-demand using this integration.

(optional) In **Select additional properties**, select any more user properties you want to send to Braze. If you don't select any properties here, Amplitude doesn't send any. These properties are sent to Braze as [Braze custom attributes](https://www.braze.com/docs/user_guide/data_and_analytics/custom_data/custom_attributes/).

### Enable sync

When satisfied with your configuration, at the top of the page toggle the **Status** to "Enabled" and click **Save**.