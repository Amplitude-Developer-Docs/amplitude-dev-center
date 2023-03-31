---
title: Webhook Event Streaming
description: Use this integration to stream Amplitude event data to your custom webhooks.
---

Amplitude CDP's Webhook integration enables you to forward your Amplitude events and users to custom webhooks. This is a light-weight way to set a stream of event and user data out of Amplitude, to a URL of your choosing to enable any of your usecases.

## Setup

### Prerequisites

To configure streaming from Amplitude to your webhook, you need the following information.

- **Webhook URL** The destination URL Amplitude should use to send events and users.
- **Header Information** You can set up to five extra headers for the webhook request.

### Create a new sync

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Event Streaming section, click **Webhook**.
3. Enter a sync name, then click **Create Sync**.

### Enter webhook URL

Enter the URL endpoint for the webhook. For example, `https://mycompany.com/webhook`.
Note that Amplitude doesn't have a single IP address for forwarding events and users, so ensure that your URL can receive payloads from any Amplitude hosts.

See details on [Amplitude's retry mechanism](#amplitudes-retry-mechanism) in case a webhook call fails.

### Select headers

There are two preset headers for every webhook sync:

- `Content-Type`: `application/json`
- `User-Agent`: `Amplitude/Webhook/1.0`

After these preset headers, you can define five more headers. To create a new header:

1. Enter the header name on the left side text box
2. Enter the header value on the right side text box
3. A new header row appears if limit isn't reached

### Configure event forwarding

Under **Send Events**, make sure the toggle is enabled ("Events are sent to Webhook") if you want to stream events to the webhook. When enabled, events are automatically forwarded to the webhook when they're ingested in Amplitude. Events aren't sent on a schedule or on-demand using this integration.

1. Define the event payload you want to receive in the webhook. You can choose to:
    1. Send the default Amplitude payload which follows the Amplitude [event format](../../analytics/apis/export-api.md).
    2. Customize the payload using an [Apache FreeMarker](https://freemarker.apache.org/) template. [See more details below](#freemarker-templating-language).

2. In **Select and filter events** choose which events you want to send. Choose only the events you need in the webhook. _Transformed events aren't supported._

### Configure user forwarding

Under **Send Users**, make sure the toggle is enabled ("Users are sent to Webhook") if you want to stream users and their properties to the webhook. When enabled, users are sent to the webhook when an event is sent to Amplitude. [Amplitude Identify API](../../analytics/apis/identify-api.md) calls are also forwarded to the webhook. Users aren't sent on a schedule or on-demand using this integration.

- Define the user payload you want to receive in the webhook. You can choose to:
    1. Send the default Amplitude payload which follows the Amplitude [user format](../../analytics/apis/identify-api.md).
    2. Customize the payload using an [Apache FreeMarker](https://freemarker.apache.org/) template. [See more details below](#freemarker-templating-language).

### Enable sync

When satisfied with your configuration, at the top of the page toggle the **Status** to "Enabled" and click **Save**.

### Amplitude's retry mechanism

Amplitude makes a delivery attempt first on each event or user, and then on failures, Amplitude make nine more attempts over 4 hours, regardless of the error. Amplitude also has a retry mechanism within each attempt: on 5xx errors and 429 throttling. Amplitude does attempt an immediate retry with these policies

1. Max attempts: 3.
2. Exponential retry with initial wait duration of 100 ms, doubling each time, and with a 50% jitter.
3. Amplitude won’t make another attempt after 4 seconds.

## FreeMarker Templating Language

Amplitude uses [Apache FreeMarker](https://freemarker.apache.org/) templates to customize your event payloads that you send to webhook.

- You can use the FreeMarker Templating Language (FTL) to transform Amplitude's events and user payloads into any other JSON schema expected by the Webhook destination.
- Amplitude's [event format](../../analytics/apis/export-api.md).
- Amplitude's [user format](../../analytics/apis/identify-api.md). Keep in mind that based on how you use the Identify API some fields might be different (for example, if you use `device_id` instead of `user_id` in your identify calls, you will not see `user_id` in the payload).

!!!tip "More FreeMarker help"

    See the FreeMarker [guide to creating templates](https://freemarker.apache.org/docs/dgui.html) for more help.

### Example template for sending events

```text
{
      <#if input.user_id??>
      "external_id" : "${input.user_id}",
      </#if>
      "name" : "${input.event_type}",
      "time" : "${input.event_time}",
      "properties" : {
            "email" : "${input.user_properties.email!}"
      }
}
```

Using this template results in sending this JSON payload to the Webhook endpoint:

```json
{
    "external_id" : "some user id", // if `input.user_id` exists
    "name" : "click event",
    "time" : "2022-10-24T20:07:32.123",
    "properties" : {
        "email" : "some@email.com"
    }
}
```

### Example template for sending users

```text
{
      <#if input.user_id??>
      "external_id" : "${input.user_id}",
      </#if>
      <#if input.device_id??>
      "device_id" : "${input.device_id}",
      </#if>
      "time" : "${input.event_time}",
      "properties" : {
            "email" : "${input.user_properties.email!}"
      }
}
```

Using this template results in sending this JSON payload to the Webhook endpoint:

```json
{
    "external_id" : "some user id", // if `input.user_id` exists
    "device_id" : "some user id", // if `input.user_id` exists
    "time" : "2022-10-24T20:07:32.123",
    "properties" : {
        "email" : "some@email.com"
    }
}
```

### Handling event time formats

Amplitude by default sends the time as a UTC ISO-8601 formatted string such as `"2022-02-28 20:07:01.795"`.

To modify this in different formats:

1. first set a datetime format setting: `<#setting datetime_format="yyyy-MM-dd HH:mm:ss.S">`
2. Use the following examples for conversion to different time formats:
    - Custom string format: `"${input.event_time?datetime?string["dd.MM.yyyy, HH:mm"]}"`

        - results in: `"28.02.2022, 20:07"`

    - Millisecond timestamp: `"${input.event_time?datetime?long}"`

        - results in: `"1646107621000"`

### Other useful information for templates

- FreeMarker replaces the `${ ... }` constructs with the actual value of the expression inside the curly braces.
- `input` is a reserved variable that refers to the event as an object, as defined [in the Export API docs](../../analytics/apis/export-api.md).
- `input.event_type` refers to the `event_type` field of event.
- `input.user_properties` refers to the user properties dictionary.
- `input.user_properties.email` refers to the `email` field in user properties.
- the `if` directive is used to check wether the field exists. if it doesn't, the field is omitted from the output.
- the `!` mark in the expression after `input.user_properties.email` can be used to include a default value if there is no such field in the `input`. If you don't add a default value, the output contains an empty string instead.
