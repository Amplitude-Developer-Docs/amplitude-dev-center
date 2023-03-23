---
title: Iterable Event Streaming
description: Amplitude CDP's Iterable streaming integration enables you to forward your Amplitude events and users straight to Iterable with just a few clicks.
---

--8<-- "includes/open-beta.md"

Amplitude CDP's Iterable streaming integration enables you to forward your Amplitude events and users straight to [Iterable](https://iterable.com/) with just a few clicks.

!!!note "Other Amplitude CDP + Iterable integrations"

    This integration streams Amplitude events and users to Iterable. Amplitude CDP offers other integrations with Iterable:

    - [Export Amplitude cohorts to Iterable](/data/destinations/iterable-cohort)
    - [Import Iterable events into Amplitude](/data/sources/iterable)

## Setup

### Prerequisites

To configure streaming from Amplitude to Iterable, you need the following information from Iterable.

**Iterable API Key**: The Iterable API Key used for authentication. See the [Iterable documentation](https://support.iterable.com/hc/en-us/articles/360043464871-API-Keys-#creating-api-keys) for help locating your API Key.

### Create a new sync

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Event Streaming section, click **Iterable**.
3. Enter a sync name, then click **Create Sync**.

### Enter credentials

Enter your **Iterable API Key**.

### Configure mappings

_This applies to both event and user forwarding. Transformed user properties aren't supported._

1. Select an Amplitude user property that corresponds to your Iterable user ID, from the left dropdown.
2. Select the type of your Iterable user ID, from the right dropdown.
      - [**User ID**](https://support.iterable.com/hc/en-us/articles/360035402531-Identifying-the-User-#identifying-the-user-by-user-id): Any unique identifier for each user in Iterable.
      - [**Email**](https://support.iterable.com/hc/en-us/articles/360035402531-Identifying-the-User-#identifying-the-user-by-email)
3. (optional) Map other Amplitude user properties to Iterable properties.
      1. Select an Amplitude user property that corresponds to a Iterable property, from the left dropdown.
      2. Select the Iterable property, from the corresponding right dropdown.

See the full list of [Iterable properties that are supported by Amplitude](#supported-iterable-properties).

### Configure event forwarding

Under **Send Events**, make sure the toggle is enabled ("Events are sent to Iterable") if you want to stream events to Iterable. When enabled, events are automatically forwarded to Iterable when they're ingested in Amplitude. Events aren't sent on a schedule or on-demand using this integration.

1. In **Select and filter events** choose which events you want to send. Choose only the events you need in Iterable. _Transformed events aren't supported._

    !!!warning "Events for non-Iterable users cannot be streamed"

        Iterable requires that all events have an **Iterable ID** present. If you have selected any events to send to Iterable that may not have an **Iterable ID**, add a filter to send only events where the **Iterable ID** is present. Otherwise, your delivery metrics may be affected.

        ![Setting up a filter for anonymous users on events](/../assets/images/streaming-anonymous-users-filter.png)

2. (optional) In **Select additional properties**, select any more event and user properties you want to send to Iterable. If you don't select any properties here, Amplitude doesn't send any. These properties are sent to Iterable as [Iterable data fields](https://support.iterable.com/hc/en-us/articles/208183076-Field-Data-Types). _Transformed event properties and transformed user properties aren't supported._

### Configure user forwarding

Under **Send Users**, make sure the toggle is enabled ("Users are sent to Iterable") if you want to stream users and their properties to Iterable. When enabled, users are automatically created or updated in Iterable when an event is sent to Amplitude. [Amplitude Identify API](https://www.docs.developers.amplitude.com/analytics/apis/identify-api/) calls are also forwarded to Iterable. Users aren't sent on a schedule or on-demand using this integration.

(optional) In **Select additional properties**, select any more user properties you want to send to Iterable. If you don't select any properties here, Amplitude doesn't send any. These properties are sent to Iterable as [Iterable data fields](https://support.iterable.com/hc/en-us/articles/208183076-Field-Data-Types). _Transformed user properties aren't supported._

### Enable sync

When satisfied with your configuration, at the top of the page toggle the **Status** to "Enabled" and click **Save**.

## Supported Iterable properties

- **User ID**
- **Email**
- Campaign ID
- Template ID
