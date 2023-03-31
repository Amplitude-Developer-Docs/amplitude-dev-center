---
title: Intercom Event Streaming
description: Amplitude CDP's Intercom streaming integration enables you to forward your Amplitude events and users straight to Intercom with just a few clicks.
---

Amplitude CDP's Intercom streaming integration enables you to forward your Amplitude events and users straight to [Intercom](https://www.intercom.com/) with just a few clicks.

!!!note "Other Amplitude CDP + Intercom integrations"

    This integration streams Amplitude events and users to Intercom. Amplitude CDP offers other integrations with Intercom:

    - [Export Amplitude cohorts to Intercom](/data/destinations/intercom-cohort)
    - [Import Intercom events into Amplitude](/data/sources/intercom)

## Setup

### Prerequisites

#### Create a new Intercom app

1. From the [Intercom Developer Hub](https://developers.intercom.com/), click on **Your Apps**.
2. Click **New App**.
3. Enter a name and select a workspace.
4. Click **Create App**.

See [Intercom's documentation](https://developers.intercom.com/building-apps/docs/get-started-developing-on-intercom#create-an-app) for more detailed instructions on creating an app.

#### Required information

To configure streaming from Amplitude to Intercom, you need the following information from Intercom.

**Intercom Access Token**: The Intercom Access Token for your Intercom app.

1. From the [Intercom Developer Hub](https://developers.intercom.com/), click on **Your Apps**.
2. Click on your app.
3. Navigate to the **Authentication** page.
4. The **Intercom Access Token** is listed immediately below the workspace name under **Access Token**.

### Create a new sync

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Event Streaming section, click **Intercom**.
3. Enter a sync name, then click **Create Sync**.

### Enter credentials

1. Select your **Intercom API Endpoint**.
2. Enter your **Intercom Access Token**.

### Configure mappings

_This applies to both event and user forwarding. Transformed user properties aren't supported._

1. Select an Amplitude user property that corresponds to your Intercom user ID, from the left dropdown.
2. Select the type of your Intercom user ID, from the right dropdown.
    - **User ID**: Any unique identifier for each user in Intercom.
    - **Email**

### Configure event forwarding

Under **Send Events**, make sure the toggle is enabled ("Events are sent to Intercom") if you want to stream events to Intercom. When enabled, events are automatically forwarded to Intercom when they're ingested in Amplitude. Events aren't sent on a schedule or on-demand using this integration. Events are sent to Intercom as [Intercom data events](https://developers.intercom.com/intercom-api-reference/reference/the-data-event-model). Intercom has a limit of 120 event types.

1. In **Select and filter events** choose which events you want to send. Choose only the events you need in Intercom. _Transformed events aren't supported._

    !!!warning "Events for anonymous users cannot be streamed"

        Intercom requires that all events have a user ID present. If you have selected any events to send to Intercom that may not have a user ID, add a filter to send only events where the user ID is present. Otherwise, your delivery metrics may be affected.

        ![Setting up a filter for anonymous users on events](/../assets/images/streaming-anonymous-users-filter.png)

2. (optional) In **Select additional properties**, select any more event and user properties you want to send to Intercom. If you don't select any properties here, Amplitude doesn't send any. These properties are sent to Intercom as [Intercom event metadata](https://developers.intercom.com/intercom-api-reference/reference/the-data-event-model#metadata-object). Intercom has a limit of 20 metadata values per event. _Transformed event properties and transformed user properties aren't supported._

### Configure user forwarding

Under **Send Users**, make sure the toggle is enabled ("Users are sent to Intercom") if you want to stream users and their properties to Intercom. When enabled, users are automatically created or updated in Intercom when an event is sent to Amplitude. [Amplitude Identify API](https://www.docs.developers.amplitude.com/analytics/apis/identify-api/) calls are also forwarded to Intercom. Users aren't sent on a schedule or on-demand using this integration. Each user is created as an [Intercom contact](https://developers.intercom.com/intercom-api-reference/reference/the-contact-model).

(optional) In **Select additional properties**, select any more user properties you want to send to Intercom. If you don't select any properties here, Amplitude doesn't send any. These properties are sent to Intercom as [Intercom custom attributes](https://www.intercom.com/help/en/articles/179-send-custom-user-attributes-to-intercom/). Custom attributes must exist in Intercom. _Transformed user properties aren't supported._

### Enable sync

When satisfied with your configuration, at the top of the page toggle the **Status** to "Enabled" and click **Save**.
