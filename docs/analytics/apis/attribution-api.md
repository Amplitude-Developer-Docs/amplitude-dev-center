---
title: Attribution API
description: The Attribution API lets you send attribution campaign events to Amplitude. 
---

The Attribution API is for sending attribution campaign events (identified by `idfa`, `idfv`, or `adid`) that contain attribution information.

--8<-- "includes/postman.md"

--8<-- "includes/auth-api-key-query-param.md"

## Endpoints

| Region | Endpoint |
| --- | --- |
| Standard Server | <https://api2.amplitude.com/attribution> |
| EU Residency Server | <https://api.eu.amplitude.com/attribution> |

## Considerations

- When Amplitude can't match attribution events to an existing user, they're held for up to 72 hours for potential user matching. If an event isn't logged for a matching user within 72 hours of receiving the attribution data, then Amplitude **drops the attribution data**.
- For most of Amplitude's partners, attribution is matched to Amplitude users and events via the Advertising ID (IDFA, IDFV, or ADID). Therefore, you must send the Advertising ID for attribution requests and you must set the `idfa`, `idfv`, and `adid` fields in Amplitude as the Advertising ID. 
- If you are using the iOS SDK or Android SDK, you can enable tracking of the Advertising ID by following the instructions [here](/../data/sdks/ios/#advertiser-id). If you are using a JavaScript SDK or React Native, these don't have the functionality to collect Advertising ID automatically due to Google's and Apple's privacy rules around advertising ID and web tracking. You have to send the Advertising ID through the HTTP API endpoint so that Amplitude can match attribution data/events. See keys in the [HTTP API V2](https://developers.amplitude.com/docs/http-api-v2) doc.

## Differences between HTTP API and Attribution API

The HTTP API is for sending event data to Amplitude. These events must have a user ID or a device ID, and are ingested immediately.
The Attribution API is for sending attribution campaign events (identified by IDFA, IDFV, or ADID) that contain attribution information. The big difference between the APIs is that if Amplitude can't match the user when it receives an attribution event, the event is held for up to 72 hours. If Amplitude receives regular events with user information that matches the attribution events, the attribution events are ingested into Amplitude. Otherwise, they're discarded. This allows you to send attribution information without worrying about polluting Amplitude with events from people who never actually use the app.

## Send an attribution event

Send a POST request to https://api2.amplitude.com/attribution with two arguments: `api_key` and `event`.

### Required arguments
<!-- vale off-->
|Name| Description  | Example|
|---|---|---|
|`api_key`| <span class="required">Required</span>. The project's API key. | `{{api_key}}`|
|`event`| <span class="required">Required</span>. A request parameter representing the event, in JSON format.| `{"event_type":"[YOUR COMPANY] Install", "idfa": "AEBE52E7-03EE-455A-B3C4-E57283966239", "user_properties": {"[YOUR COMPANY] media source": "facebook", "[YOUR COMPANY] campaign": "refer-a-friend"}, "platform": "ios"}`|
<!-- vale on-->
!!! example "Attribution Examples"

    === "iOS Attribution"

        ``` bash
        POST /attribution HTTP/1.1
        Host: api.amplitude.com
        Content-Length: 365

        api_key={{api_key}}&event=%7B%22event_type%22%3A%22%5BYOUR%20COMPANY%5D%20Install%22%2C%20%22idfa%22%3A%20%22AEBE52E7-03EE-455A-B3C4-E57283966239%22%2C%20%22user_properties%22%3A%20%7B%22%5BYOUR%20COMPANY%5D%20media%20source%22%3A%20%22facebook%22%2C%20%22%5BYOUR%20COMPANY%5D%20campaign%22%3A%20%22refer-a-friend%22%7D%2C%20%22platform%22%3A%20%22ios%22%7D
        ```

    === "Android Attribution"

        ```bash

        POST /attribution?api_key={{api_key}}&event={"event_type":"[YOUR COMPANY] Install","adid": "AEBE52E7-03EE-455A-B3C4-E57283966239", "user_properties": {"[YOUR COMPANY] media source": "facebook", "[YOUR COMPANY] campaign": "refer-a-friend"}, "platform": "android"} HTTP/1.1
        Host: api2.amplitude.com
        ```

#### Event argument keys

These keys are available for the Event argument.

| <div class="big-column">Key</div>              | Description                                                                                                                          | Example                                                  |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------|
| `event_type`     | <span class="required">Required</span>. String. The event info. Prefix with brackets `[YOUR COMPANY]`.                                                             | `[YOUR COMPANY] Install`                                 |
| `platform`       | <span class="required">Required</span>. String. Either `ios` or `android`.                                                                                         | `ios`                                                    |
| `idfa` or `idfv` | <span class="required">Required for iOS</span>. String. The Identifier for Advertiser or the Identifier for Vendor. You must include *at least* one for iOS devices. | AEBE52E7-03EE-455A-B3C4-E57283966239                     |
| `adid`           | <span class="required">Required for Android</span>. String. The Google ADID, or Amazon Advertising ID for Amazon devices.                                          | AEBE52E7-03EE-455A-B3C4-E57283966239                     |
| `android_id`       | <span class="optional">Optional</span>. String. (Android) The Android ID                                                                                           | AEBE52E7-03EE-455A-B3C4-E57283966239                     |
| `user_properties`  | <span class="optional">Optional</span>. Dictionary. A dictionary of attribution properties prefixed with brackets `[YOUR COMPANY]`.                                | `{"[YOUR COMPANY] media source": "Facebook"}`            |
| `time`             | <span class="optional">Optional</span>. Long. Timestamp of the event in milliseconds since epoch.                                                                  | 1396381378123. It's set to the upload time by default |

## Responses

| Code | Message                                                                                                                     |
|------|-----------------------------------------------------------------------------------------------------------------------------|
| 200  | Success                                                                                                                     |
| 400  | The expected JSON is formatted incorrectly.  |

--8<-- "includes/abbreviations.md"
