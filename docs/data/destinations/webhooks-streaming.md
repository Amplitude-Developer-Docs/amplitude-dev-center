---
title: Send Events to Webhooks
description: Use this integration to stream Amplitude event data to your custom webhooks.
---

Amplitude Data's Webhook integration lets you stream your Amplitude event data to custom webhooks. This is a light-weight way to set a stream of event data out of Amplitude, which you can then pick up from the Webhook destination, and transform/configure to how you like.

--8<-- "includes/closed-beta.md"

## Setup

### Webhook setup

Create a webhook endpoint that can receive HTTP requests. 

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Event Streaming section, click **Webhook**.
3. Enter a sync name, then click **Create Sync**.
4. Click **Edit**, then:
     - Enter the URL endpoint for the webhook. For example, `https://mycompany.com/webhook`.
     - Customize the HTTP headers to send with the event. There are two preset headers that are always sent, and you can specify up to 5 more. For example, specifying `Authorization` → `Bearer XXXXXX` for one of the headers sets the `Authorization: Bearer XXXXX` header on the outgoing HTTP requests.
     - Customize the event payload using FreeMarker Templating Language. You also have the option to forward the original JSON export event format as-is without any transformation. See [the FreeMarker Templating Language](#freemarker-templating-language) section for more help and examples.
5. Use the *Send events* filter to select the events you want to send. You can send all events, but Amplitude recommends choosing the most important ones.
6. When finished, enable the destination and save.

## FreeMarker Templating Language

Amplitude uses [Apache FreeMarker](https://freemarker.apache.org/) templates to customize your event payloads that you send to webhook.

- Customers can use the FreeMarker Templating Language (FTL) to transform [Amplitude's JSON export event format](../analytics/apis/export-api/) into any other JSON schema expected by the Webhook destination.
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
            "email" : "${input.user_properties.email!}"
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

- FreeMarker replaces the `${ ... }` constructs with the actual value of the expression inside the curly braces.
- `input` is a reserved variable that refers to the event as an object, as defined [in the Export API docs](../analytics/apis/export-api/).
- `input.event_type` refers to the `event_type` field of the event.
- `input.user_properties` refers to the user properties dictionary.
- `input.user_properties.email` refers to the `email` field in user properties.
- the `if` directive is used to check wether the `input.user_id` exists. if it doesn't, the `external_id` field is omitted from the output.
- the `!` mark in the expression after `input.user_properties.email` can be used to include a default value if there is no such field in the `input`. If you don't add a default value, the output contains an empty string instead.

## FAQs

### How long does it take for events to be streamed? 

We have a target for a minute latency from receiving the event and then sending this event. Please note that results may vary based on their load, their endpoints error rate / capacity, if they have batch processing or not, etc.

### Do the forwarded events come from a single IP address?

We don’t have a single ip address for the events, we have multiple hosts streaming them out.

### Should the Ampli generated code and the ampli.json file be checked into git?

We have a roboust retry approach. we make a delivery attempt first at the time we see the event, and then on failures we make 9 more attempts over 4 hours, regardless what the error is. We do have a retry mechanism within each attempt too: on 5xx errors and 429 throttling. We do attempt an immediate retry with these policies:
- Max attempts 3
- Exponential retry with initial wait duration of 100 ms, doubling each time, and with a 50% jitter
- We won’t make another attempt after 4 seconds

So in summary
- On failures that look to be retryable ( 5xx errors and 429) we can make up to 27 attempts in batches of 3 over 4 hours.
- Other failures will still be attempted 9 separate times over 4 hours
