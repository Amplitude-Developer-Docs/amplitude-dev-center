---
title: Send Events to Webhooks
description: words
status: Use this integration to stream Amplitude event data to your custom webhooks.
---

Amplitude Data's Webhook integration lets you stream your Amplitude event data to custom webhooks.

## Setup

### Webhook setup

Create a webhook endpoint that can receive HTTP requests. 

### Amplitude setup

1. In Amplitude, navigate to **Data Destinations** then find **Webhook - Event Stream**.
2. Enter a sync name, then click **Create Sync**.
3. Click **Edit**, then:
    1. Enter the URL of the webhook endpoint.
    2. Customize the HTTP headers that are sent with the event.
    3. Customize the payload using the Freemarker Templating Language. There is also the option to forward the original JSON export event format as-is without any transformation.
4. Use the *Send events* filter to select the events you want to send. You can send all events, but Amplitude recommends choosing the most important ones.
5. When finished, enable the destination and save.

## FreeMarker Templating Language

Amplitude uses [Apache FreeMarker](https://freemarker.apache.org/ "https://freemarker.apache.org/") templates to customize your event payloads that you send to webhook.

- Customers can use the FreeMarker Templating Language (FTL) to transform [Amplitude's JSON export event format](https://www.docs.developers.amplitude.com/analytics/apis/export-api/ "https://www.docs.developers.amplitude.com/analytics/apis/export-api/") into any other JSON schema expected by the Webhook destination.
- FreeMarker is a free, open source templating engine with a large community.

!!!tip "More FreeMarker help"

    See the FreeMarker [guide to creating templates](https://freemarker.apache.org/docs/dgui.html) for more help. 

### Example template

```text
{
      <#if input.user_id??>
      "external_id" : "${input.user_id}",
      </#if>
      "name" : "${input.event_type}",
      "time" : "${input.event_time}",
      "properties" : {
            "email" : "${input.user_properties.email!}
      }
}
```

Using this template results in sending this JSON payload to the Webhook endpoint:

```json
{
    "external_id" : "some user id",
    "name" : "click event",
    "time" : "2022-10-24 20:07:32.123",
    "properties" : {
            "email" : "some@email.com"
    }
}
```

- if the `input.user_id` exists, otherwise that field will be omitted.
- if there is an `email` field specified under the `user_properties` , otherwise it's an empty string.
- `input` is a reserved keyword that refers to the event as an object, as defined [here](https://www.docs.developers.amplitude.com/analytics/apis/export-api/ "https://www.docs.developers.amplitude.com/analytics/apis/export-api/").
    - `input.event_type` refers to the `event_type` field of the event.
    - `input.user_properties` refers to the user properties dictionary.
    - `input.user_properties.email` refers to the `email` field in user properties.