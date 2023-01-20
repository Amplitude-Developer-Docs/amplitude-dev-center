---
title: Intercom Event Streaming
description: The Intercom integration lets you stream your Amplitude event and user data to Intercom with just a few clicks.
---

--8<-- "includes/open-beta.md"

Amplitude Data's Intercom integration lets you stream your Amplitude event and user data straight to Intercom with just a few clicks.

!!!note "Other Amplitude + Intercom integrations"

    This integration streams Amplitude events and users to Intercom. Amplitude offers other integrations with Intercom:

    - [Send Amplitude Cohorts to Intercom](/data/destinations/intercom-cohort)
    - [Import Intercom Data](/data/sources/intercom)

## Considerations

Keep these considerations in mind when streaming events to Intercom.

- Amplitude sends the `created_at` and `event_name` properties to Intercom.
- A user must exist in Intercom to send events for them. Event forwarding doesn't automatically create users in Intercom.
- Intercom has a limit of 120 Event Types and 20 metadata (which are event properties) per Event Types. Be sure to select the events you want to forward to Intercom using the Event Filter while creating or editing the Event Streaming connection in Amplitude.
- If you have Intercom configured as a Data Source in Amplitude, "[Intercom] event.created" is triggered whenever an event is created in Intercom, including through Amplitude's Event Streaming integration. If you don't want these stored in Amplitude, use [Block & Drop filters](https://help.amplitude.com/hc/en-us/articles/5078869299099-Filter-events-with-block-filters-and-drop-filters) to remove this event data from Amplitude.

## Setup

This integration requires configuration in Intercom and Amplitude.

### Intercom setup

!!!tip "More documentation"

    See [Intercom's documentation](https://developers.intercom.com/building-apps/docs/get-started-developing-on-intercom#create-an-app) for more detailed instructions on creating an app.

1. From the [Intercom Developer Hub](https://developers.intercom.com/), click on **Your Apps**.
2. Click **New App**.
3. Enter a name and workspace, then choose _Internal integration_.
4. After you've created the app, click it and go to the Authentication page. Copy the Access Token.

### Amplitude setup

1. In Amplitude, navigate to **Data**.
2. On the sidebar, under **Connections**, select **Catalog**.
3. Select the **Destinations** tab.
4. Select **Event Streaming**.
5. Click **Intercom - Event Streaming**.
6. Enter a sync name, then click **Create Sync**.

After you create the destination, you must configure the settings.

### Configure settings

1. On the **Settings** tab, click **Edit**.
2. Enter your **API Key**.
3. **Create & Update Users** creates users in Intercom and update the properties of existing users when an Amplitude Identify API call is made.
      1. To create and update users, toggle Create & Update Users to Enabled.
      2. To select user properties to send, expand the Specify user properties to send panel, and select properties to forward. If you don't select any properties here, Amplitude doesn't include any.
4. **Send Events** sends events ingested by Amplitude to Intercom.
      1. To send an event, toggle **Send Events** to **Enabled**.
      2. Expand the **Select and filter events** panel, and select which events to send.
      3. To select event properties to send, expand the **Specify event properties to send** panel, and select properties you want to include. Keep in mind Intercom's limit of 20 metadata types. If you don't select any properties here, Amplitude doesn't send any.
5. Save when finished.

After you configure your settings, configure your mappings.

#### Configure mappings (recommended)

For newer versions of the Intercom destination, you can map Amplitude properties to fields in Intercom. If you don't configure mappings, or are using an older version that doesn't support mapping, the default values described below are used instead.

1. Click the **Mappings** tab, then click **Edit**.
2. Select an **Intercom User ID** field for your users in Intercom. Keep in mind that event forwarding doesn't automatically create users so make sure the field selected matches your users' IDs within Intercom. Your choice for an Intercom identifier are:
    1. **External ID** (A unique identifier within Intercom specified by you)
    2. **Email**
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

| Parameter Name  | Required                                            | Recommended |Default Amplitude Property |
|-----------------|:---------------------------------------------------:|-------------|----------------------------|
| **External ID** | :octicons-check-16: (one of External ID or Email)   |             | **User ID**                |
| **Email**       | :octicons-check-16: (one of External ID or Email)   |             | **User ID**                |
