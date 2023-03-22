---
title: Customer.io Event Streaming
description: Amplitude CDP's Customer.io streaming integration enables you to forward your Amplitude events and users straight to Customer.io with just a few clicks.
---

--8<-- "includes/open-beta.md"

Amplitude CDP's Customer.io streaming integration enables you to forward your Amplitude events and users straight to [Customer.io](https://customer.io/) with just a few clicks.

!!!note "Other Amplitude CDP + Customer.io integrations"

    This integration streams Amplitude events and users to Customer.io. Amplitude CDP offers other integrations with Customer.io:

    - [Export Amplitude cohorts to Customer.io](/data/destinations/customerio-cohort)

## Setup

### Prerequisites

To configure streaming from Amplitude to Customer.io, you need the following information from Customer.io.

- **Customer.io Tracking Site ID**: The Customer.io Site ID used for authenticating with the track API.
- **Customer.io Tracking API Key**: The Customer.io API Key used for authenticating with the track API.

See the [Customer.io documentation](https://www.customer.io/docs/api/track/#section/Authentication/Basic-Auth-(Tracking-API-Key)) for help locating your track API credentials.

### Create a new sync

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Event Streaming section, click **Customer.io**.
3. Enter a sync name, then click **Create Sync**.

### Enter credentials

1. Enter your **Customer.io Tracking Site ID**.
2. Enter your **Customer.io Tracking API Key**.

### Configure mappings

_This applies to both event and user forwarding. Transformed user properties aren't supported._

Select an Amplitude user property that corresponds to your **Customer.io User Identifier**, from the left dropdown.

- If the selected Amplitude user property values contains email addresses, Customer.io will match users on the [Customer.io email](https://customer.io/docs/identifying-people/#identifiers) (case-insensitive).
- If the selected Amplitude user property values are prefixed with `cio_`, Customer.io will match users on the [Customer.io canonical identifier](https://customer.io/docs/identifying-people/#cio_id), a unique identifier provided by Customer.io for each user.
- Customer.io limits the **Customer.io User Identifier** values to be no more than 150 bytes in size.

### Configure event forwarding

Under **Send Events**, make sure the toggle is enabled ("Events are sent to Customer.io") if you want to stream events to Customer.io. When enabled, events are automatically forwarded to Customer.io when they're ingested in Amplitude. Events aren't sent on a schedule or on-demand using this integration. Events are sent to Customer.io as [Customer.io events](https://www.customer.io/docs/api/track/#tag/Track-Events), including web page views and mobile screen views. Customer.io automatically creates a new user in Customer.io if the provided **Customer.io User Identifier** doesn't exist in Customer.io.

1. In **Select and filter events** choose which events you want to send. Choose only the events you need in Customer.io. _Transformed events aren't supported._

    !!!warning "Events for anonymous users cannot be streamed"

        Customer.io requires that all events have a user ID present. If you have selected any events to send to Customer.io that may not have a user ID, add a filter to send only events where the user ID is present. Otherwise, your delivery metrics may be affected.

        ![Setting up a filter for anonymous users on events](/../assets/images/streaming-anonymous-users-filter.png)

2. (optional) In **Select additional properties**, select any more event and user properties you want to send to Customer.io. If you don't select any properties here, Amplitude doesn't send any. These properties are sent to Customer.io as [Customer.io event data](https://www.customer.io/docs/events/#event-name-and-data). _Transformed event properties and transformed user properties aren't supported._

### Configure user forwarding

Under **Send Users**, make sure the toggle is enabled ("Users are sent to Customer.io") if you want to stream users and their properties to Customer.io. When enabled, users are automatically created or updated in Customer.io when an event is sent to Amplitude. [Amplitude Identify API](https://www.docs.developers.amplitude.com/analytics/apis/identify-api/) calls are also forwarded to Customer.io. Users aren't sent on a schedule or on-demand using this integration.

(optional) In **Select additional properties**, select any more user properties you want to send to Customer.io. If you don't select any properties here, Amplitude doesn't send any. These properties are sent to Customer.io as [Customer.io user attributes](https://www.customer.io/docs/attributes/). _Transformed user properties aren't supported._

### Enable sync

When satisfied with your configuration, at the top of the page toggle the **Status** to "Enabled" and click **Save**.
