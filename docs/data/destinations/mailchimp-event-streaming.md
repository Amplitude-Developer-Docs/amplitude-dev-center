---
title: Mailchimp Event Streaming
description: Amplitude CDP's Mailchimp streaming integration enables you to forward your Amplitude events and users straight to Mailchimp with just a few clicks.
---

Amplitude CDP's Mailchimp streaming integration enables you to forward your Amplitude events and users straight to [Mailchimp](https://www.mailchimp.com/) with just a few clicks.

!!!note "Other Amplitude CDP + Mailchimp integrations"

    This integration streams Amplitude events and users to Mailchimp. Amplitude CDP offers other integrations with Mailchimp:

    - [Export Amplitude cohorts to Mailchimp](/data/destinations/mailchimp-cohort)
    - Import Mailchimp events into Amplitude

## Setup

### Create a new sync

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Event Streaming section, click **Mailchimp**.
3. Enter a sync name, then click **Create Sync**.

### Enter credentials

1. Select your **Mailchimp Account Name** or select "Authenticate with Mailchimp" to connect a new Mailchimp account.
2. Enter your **Mailchimp Audience ID**. See the [Mailchimp documentation](https://mailchimp.com/help/find-audience-id/) for instructions on finding your audience ID.
3. Select an option for **Status if New**. This is the status to assign to new users created in Mailchimp. This only applies for **Send Users**. If you only have **Send Events** enabled, you can ignore this item.

### Configure mappings

_This applies to both event and user forwarding. Transformed user properties aren't supported._

Select an Amplitude user property that corresponds to your Mailchimp emails, from the left dropdown.

### Configure event forwarding

Under **Send Events**, make sure the toggle is enabled ("Events are sent to Mailchimp") if you want to stream events to Mailchimp. When enabled, events are automatically forwarded to Mailchimp when they're ingested in Amplitude. Events aren't sent on a schedule or on-demand using this integration. The occurred_at field on the Mailchimp event is the date and time at which the event is ingested in Mailchimp, not Amplitude.

1. In **Select and filter events** choose which events you want to send. Choose only the events you need in Mailchimp. _Transformed events aren't supported._

    !!!warning "Events for anonymous users cannot be streamed"

        Mailchimp requires that all events have a user ID (email) present. If you have selected any events to send to Mailchimp that may not have a user ID, add a filter to send only events where the user ID is present. Additionally, events can only be streamed for users that already exist in Mailchimp. Otherwise, your delivery metrics may be affected.

        ![Setting up a filter for anonymous users on events](/../assets/images/streaming-anonymous-users-filter.png)

2. (optional) In **Select additional properties**, select any more event and user properties you want to send to Mailchimp. If you don't select any properties here, Amplitude doesn't send any. These properties are sent to Mailchimp as [Mailchimp event properties](https://mailchimp.com/developer/marketing/api/list-member-events/add-event/). _Transformed event properties and transformed user properties aren't supported._

### Configure user forwarding

Under **Send Users**, make sure the toggle is enabled ("Users are sent to Mailchimp") if you want to stream users and their properties to Mailchimp. When enabled, users are automatically created or updated in Mailchimp when an event is sent to Amplitude. [Amplitude Identify API](../../../analytics/apis/identify-api/) calls are also forwarded to Mailchimp. Users aren't sent on a schedule or on-demand using this integration.

(optional) In **Select additional properties**, select any more user properties you want to send to Mailchimp. If you don't select any properties here, Amplitude doesn't send any. These properties are sent to Mailchimp as [Mailchimp merge fields](https://mailchimp.com/developer/marketing/docs/merge-fields/). _Transformed user properties aren't supported._

!!!warning "Create your user properties"

    All additional user properties must be manually created in Mailchimp. [Create a merge field in Mailchimp](https://mailchimp.com/developer/marketing/docs/merge-fields/#create-a-merge-field) for each user property, with the exact same ID (not the display name). Any properties not created in this way in Mailchimp will be skipped.

### Enable sync

When satisfied with your configuration, at the top of the page toggle the **Status** to "Enabled" and click **Save**.
