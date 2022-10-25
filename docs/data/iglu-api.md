---
title: Iglu API
description: Use Iglu schema service APIs with Amplitude Data. 
---

Amplitude Data fully supports the Iglu schema service APIs as defined in [Iglu server](https://github.com/snowplow/iglu/wiki/Iglu-server#1-the-schema-service-apischemas). This means that an Iglu client can retrieve schemas referenced by all incoming self-describing JSON objects and use them to validate and shred incoming events.

To get started:

1. Generate an API Token in your Amplitude Data account. This is the `apikey` that the Iglu client uses to authenticate itself to the Amplitude Data Iglu-compatible schema repository.
    1. Browse to Settings, select the API Tokens page, and create a new token
2. Add another repository to your Iglu configuration file:

```json
{
  "name": "Amplitude",
  "priority": 0,
  "vendorPrefixes": [ "ly.iterative" ],
  "connection": {
    "http": {
      "uri": "https://data-api.amplitude.com/iglu",
      "apikey": "{your-api-key}"
    }
  }
}
```

To retrieve all schemas ever created in your tracking plan:

```bash
curl 'https://data-api.amplitude.com/iglu/schemas/{vendor-name}' --header 'apikey: {your-api-key}'
```

Filter them by event name if required:
```bash
curl 'https://data-api.amplitude.com/iglu/schemas/{vendor-name}/{event-name}' --header 'apikey: {your-api-key}'
```
