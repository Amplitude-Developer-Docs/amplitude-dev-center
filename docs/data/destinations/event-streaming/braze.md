---
title: Braze Event Streaming
description: Amplitude Data's Braze integration lets you stream your Amplitude event and user data straight to Braze with just a few clicks.
---

--8<-- "includes/open-beta.md"

Amplitude Data's Braze integration lets you stream your Amplitude event and user data straight to Braze with just a few clicks.

!!!note "Other Amplitude + Braze Integrations"

    This integration streams Amplitude events and users to Braze. Amplitude offers other integrations with Braze:

    - [Send Cohorts to Braze](/data/destinations/braze-cohort)
    - [Braze Event Import](/data/sources/braze)

## Considerations

- If a user with the provided Braze identifier doesn't exist within Braze, Braze creates a user with that ID. If this isn't the desired behaviour, check the **Update Users Only** option.

## Setup

### Prerequisites

To configure an Event Streaming integration from Amplitude to Braze, you need the following information from Braze:

- Endpoint: the endpoint for the REST operations. It looks like : `https://rest.iad-##.braze.com`, See the [Braze documentation](https://www.braze.com/docs/api/basics/#endpoints) to find your endpoint.
- `app_id`: ID for the Braze app that should receive Amplitude events. Find this in your Braze Developer Console under **Settings**. See the [Braze documentation](https://www.braze.com/docs/api/identifier_types/#the-app-identifier-api-key) for more help.
- `api_key`: The REST API Key used for authentication. Find this in your Braze Developer Console under **Settings**. See the [Braze documentation](https://www.braze.com/docs/api/basics/#rest-api-key) for more help.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Event Streaming section, click **Braze**.
3. Enter a sync name, then click **Create Sync**.

After you create the destination, you must configure the settings.

#### Configure settings

1. On the **Settings** tab, click **Edit**.
2. Select your **Braze REST API Endpoint**.
3. Enter your **REST API Key**.
4. Enter your **Braze App Identifier API Key**.
5. **Create & Update Users** creates users in Braze and update the properties of existing users when a user is created or user properties are updated in Amplitude.
      1. To create and update users, toggle **Create & Update Users** to **Enabled**.
      2. To select user properties to send, expand the **Specify user properties to send** panel, and select properties to forward. If you don't select any properties here, Amplitude doesn't include any.
      3. Check the **Update Users Only** box to not create users if they don't exist in Braze. If you're sending alias-only user profiles, this field shouldn't be checked. If **Update Users Only** is checked, your alias-only user profiles won't be created in Braze. More information available in the [Braze API documentation](https://www.braze.com/docs/api/objects_filters/user_attributes_object).
6. Configure **Send Events** to send events ingested by Amplitude to Braze.
      1. To send an event, toggle **Send Events** to **Enabled**.
      2. Expand the **Select and filter events** panel, and select which events to send.
      3. To select event properties to send, expand the **Specify event properties to send** panel, and select properties you want to include. If you don't select any properties here, Amplitude doesn't send any.
7. Save when finished.

After you configure your settings, configure your mappings.

#### Configure mappings (recommended)

For newer versions of the Braze destination, you can map Amplitude properties to fields in Braze. If you don't configure mappings, or are using an older version that doesn't support mapping, the default values described below are used instead.

1. Click the **Mappings** tab, then click **Edit**.
2. Select a **Braze User ID** field for your users in Braze. Your choice for a Braze identifier are:
    1. **External ID** (a unique identifier that's assigned by you to a user in Braze)
    2. **Braze ID** (a unique identifier that's automatically set by Braze)
    3. **User Alias** (an identifier that's assigned by you to a user in Braze)
3. Save when finished.

See the [full list of available mappings](#list-of-available-mappings).

After you configure mappings, enable the destination.

#### Enable integration

The final step is enabling the destination. You must enable the destination to start streaming events.

1. Navigate back to the **Settings** tab.
2. Click **Edit**.
3. Toggle **Status** from **Disabled** to **Enabled**.
4. Click **Save**.

## List of available mappings

| Parameter Name  | Required                                                          | Recommended | Default Amplitude Property |
|-----------------|:-----------------------------------------------------------------:|:-----------:|----------------------------|
| **External ID** | :octicons-check-16: (one of External ID, Braze ID, or User Alias) |             | **User ID**                |
| **Braze ID**    | :octicons-check-16: (one of External ID, Braze ID, or User Alias) |             | **User ID**                |
| **User Alias**  | :octicons-check-16: (one of External ID, Braze ID, or User Alias) |             | **User ID**                |
