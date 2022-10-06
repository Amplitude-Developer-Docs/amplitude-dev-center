---
title: Customer.io Event Streaming
description: Amplitude Data's Customer.io integration lets you stream your Amplitude event data straight to Customer.io with just a few clicks.
---

Amplitude Data's Customer.io integration lets you stream your Amplitude event data straight to Customer.io with just a few clicks.

--8<-- "includes/open-beta.md"

!!!note "Send Amplitude cohorts to Customer.io"

    This integration sends Amplitude events to Customer.io. There is a separate integration to send cohorts. See [Send cohorts to Customer.io](customerio-cohort.md) for information.

## Considerations

Keep these things in mind when sending events to [Customer.io:](http://customer.io/)

- Amplitude matches the `user_id`to the `id` within Customer.io to associated events. If user with that `id` doesn't exist within Customer.io, a user is created. Make sure that the Amplitude `user_id` field matches the Customer.io `id` field to avoid user duplication.
- Relevant limits for Customer.io events are:
  - Maximum length of Customer ID: 150 bytes
  - Maximum number of Unique Identify attributes: 300
  - Maximum size of event data: 100K bytes
- Amplitude sends events to Customer.io as an `event` event type, including mobile and webpage views. See the [Customer.io API reference](https://www.customer.io/docs/api/#tag/Track-Events) for more details.
- Amplitude sends all user, event, and group properties along with the event.

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

1. In Amplitude, navigate to **Data Destinations**, then find **Customer.io - Event Stream**.
2. Enter a sync name, then click **Create Sync**.
3. Click **Edit**, then paste your Customer.io Site ID and API keys.
4. Use the _Send events_ filter to select the events you want to send. You can send all events, but Amplitude recommends choosing the most important ones.
5. When finished, enable the destination and save.
