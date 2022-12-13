---
title: Iterable Event Streaming
description: Amplitude Data's Iterable integration lets you stream your Amplitude event data straight to Iterable with just a few clicks.
---

--8<-- "includes/open-beta.md"

Amplitude Data's Iterable integration lets you stream your Amplitude event data straight to Iterable with just a few clicks.

!!!note "Other Amplitude + Iterable integrations"

    This integration streams Amplitude events to Iterable. Amplitude offers other integrations with Iterable:

    - [Send Amplitude Cohorts to Iterable](/data/destinations/iterable-cohort)
    - [Import Iterable Data](/data/sources/iterable)

## Considerations

- The user must exist within Iterable to send events.
- Amplitude sends the `event_name` and `created_at` properties.

## Setup

### Prerequisites

To configure an Event Streaming integration from Amplitude to Iterable, you need an Iterable API key with server-side access. Learn more in [Iterable's documentation](https://support.iterable.com/hc/en-us/articles/360043464871-API-Keys-#creating-api-keys).

### Amplitude setup

1. In Amplitude, navigate to **Data**.
2. On the sidebar, under **Connections**, select **Catalog**.
3. Select the **Destinations** tab.
4. Select **Event Streaming**.
5. Click **Iterable - Event Streaming**.
6. Enter a sync name, then click **Create Sync**.

After you create the destination, you must configure the settings.

### Configure settings

1. On the **Settings** tab, click **Edit**.
2. Enter your **API Key**.
3. **Create & Update Users** creates users in Iterable and update the properties of existing users when an Amplitude Identify API call is made.
      1. To create and update users, toggle Create & Update Users to Enabled.
      2. To select user properties to send, expand the Specify user properties to send panel, and select properties to forward. If you don't select any properties here, Amplitude doesn't include any.
4. **Send Events** sends events ingested by Amplitude to Iterable.
      1. To send an event, toggle **Send Events** to **Enabled**.
      2. Expand the **Select and filter events** panel, and select which events to send.
      3. To select event properties to send, expand the **Specify event properties to send** panel, and select properties you want to include. If you don't select any properties here, Amplitude doesn't send any.
5. Save when finished.

After you configure your settings, configure your mappings.

#### Configure mappings (recommended)

For newer versions of the Iterable destination, you can map Amplitude properties to fields in Iterable. If you don't configure mappings, or are using an older version that doesn't support mapping, the default values described below are used instead.

1. Click the **Mappings** tab, then click **Edit**.
2. Select an **Email**. This is a unique identifier for users in Iterable. It defaults to Amplitude **Email user property** (`email`).
3. Select a **User ID**. This is a different unique identifier for users in Iterable that you can configure. It defaults to Amplitude **User ID** (`user_id`) and is recommended to be set up.
4. Configure other optional mappings if needed.
5. Save when finished.

After you configure mappings, enable the destination.

#### Enable integration

The final step is enabling the destination. You must enable the destination to start streaming events.

1. Navigate back to the **Settings** tab.
2. Click **Edit**.
3. Toggle **Status** from **Disabled** to **Enabled**.
4. Click **Save**.

## List of available mappings

| Parameter Name        | Required/Recommended/Optional | Default/Recommended Amplitude Property |
| --------------------- | ----------------------------- | -------------------------------------- |
| **Email**             | **Required**                  | **Email**                              |
| **User ID**           | *Recommended*                 | **User ID**                            |
| Campaign ID           | Optional                      |                                        |
| Template ID           | Optional                      |                                        |
