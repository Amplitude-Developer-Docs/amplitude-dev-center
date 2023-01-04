---
title: Customer.io Event Streaming
description: Amplitude Data's Customer.io integration lets you stream your Amplitude event and user data straight to Customer.io with just a few clicks.
---

--8<-- "includes/open-beta.md"

Amplitude Data's Customer.io integration lets you stream your Amplitude event and user data straight to Customer.io with just a few clicks.

!!!note "Other Amplitude + Customer.io integrations"

    This integration streams Amplitude events and users to Customer.io. Amplitude offers one other integration with Customer.io:

    - [Send cohorts to Customer.io](/data/destinations/customerio-cohort)

## Considerations

Keep these things in mind when sending events to [Customer.io:](http://customer.io/)

- If a user with the provided `Customer.io User Identifier` doesn't exist within Customer.io, the user will be created.
- Relevant limits for Customer.io events are:
  - Maximum length of Customer ID: 150 bytes
  - Maximum number of Unique Identify attributes: 300
  - Maximum size of event data: 100K bytes
- Amplitude sends events to Customer.io as an `event` event type, including mobile and webpage views. See the [Customer.io API reference](https://www.customer.io/docs/api/#tag/Track-Events) for more details.

## Setup

### Prerequisites

To configure an Event Streaming integration from Amplitude to Customer.io, you need the following information from Customer.io:

- Site ID
- Tracking API key

### Customer.io setup

1. In your Customer.io dashboard, click on **Settings**, then click **Workspace Settings**.
2. In Advanced Settings, click **API Credentials - Settings**.
3. If you don't already have a set of credentials, create a Tracking API key. In Tracking API Keys, click on **Create Tracking API Key**, fill in relevant information for your workspace.
4. Copy your Site ID and API Key.

### Amplitude setup

1. In Amplitude, navigate to **Data**.
2. On the sidebar, under **Connections**, select **Catalog**.
3. Select the **Destinations** tab.
4. Select **Event Streaming**.
5. Click **Customer.io - Event Streaming**.
6. Enter a sync name, then click **Create Sync**.

After you create the destination, you must configure the settings.

### Configure settings

1. On the **Settings** tab, click **Edit**.
2. Enter your **Customer.io Site ID**.
3. Enter your **Tracking API Key**.
4. **Create & Update Users** creates users in Customer.io and update the properties of existing users when an Amplitude Identify API call is made.
      1. To create and update users, toggle Create & Update Users to Enabled.
      2. To select user properties to send, expand the Specify user properties to send panel, and select properties to forward. If you don't select any properties here, Amplitude doesn't include any.
5. **Send Events** sends events ingested by Amplitude to Customer.io.
      1. To send an event, toggle **Send Events** to **Enabled**.
      2. Expand the **Select and filter events** panel, and select which events to send.
      3. To select event properties to send, expand the **Specify event properties to send** panel, and select properties you want to include. If you don't select any properties here, Amplitude doesn't send any.
6. Save when finished.

See the [full list of available mappings](#list-of-available-mappings).

After you configure your settings, configure your mappings.

#### Configure mappings (recommended)

For newer versions of the Customer.io destination, you can map Amplitude properties to fields in Customer.io. If you don't configure mappings, or are using an older version that doesn't support mapping, the default values described below are used instead.

1. Click the **Mappings** tab, then click **Edit**.
2. Select a **Customer.io User Identifier**. This is a unique identifier for users in Customer.io.
      - If the Amplitude field you select for your `Customer.io User Identifier` is in an email format, users will be created and updated by their email fields.
      - Depending on your workspace settings, if you want to update users with the Customer.io `cio_id`, the `Customer.io User Identifier` field will need to be prefixed with `cio_`. Amplitude doesn't set this prefix, so your workspace will need to be set up accordingly.
3. Save when finished.

After you configure mappings, enable the destination.

#### Enable integration

The final step is enabling the destination. You must enable the destination to start streaming events.

1. Navigate back to the **Settings** tab.
2. Click **Edit**.
3. Toggle **Status** from **Disabled** to **Enabled**.
4. Click **Save**.

## List of available mappings

| Parameter Name                  | Required              | Recommended | Default Amplitude Property |
|---------------------------------|:---------------------:|-------------|----------------------------|
| **Customer.io User Identifier** | :octicons-check-16:   |             | **User ID**                |
