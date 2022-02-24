---
title: Attribution API
---

## Attribution API

--8<-- "includes/postman.md"

The Attribution API is for sending attribution campaign events (identified by `idfa`, `idfv`, or `adid`) that contain attribution information.

## Before you begin

-   This API doesn't use authorization, but uses your API key. If you're using Postman, set your API key in Amplitude API Environment variables.
-   Before you send a request, make sure you're using the correct endpoint.

| Region | Endpoint |
| --- | --- |
| Standard Server | <https://api2.amplitude.com/attribution> |
| EU Residency Server | <https://api.eu.amplitude.com/attribution> |

## Considerations


-   If attribution events can't be matched to an existing user, then they are held for up to 72 hours for potential user matching. If an event isn't logged for a matching user within 72 hours of receiving the attribution data, then the **attribution data is dropped**.
-   For most of our partners, attribution is matched to Amplitude users/events via the Advertising ID (IDFA/IDFV or ADID). Therefore, you must send the Advertising ID for attribution requests and you must set the idfa, idfv, and adid fields in Amplitude as the Advertising ID.
-   If you are using the iOS SDK or Android SDK, you can enable tracking of the Advertising ID by following the instructions [here](https://developers.amplitude.com/docs/ios#advertising-id). If you are using JS SDK or React Native, these do not have the functionality to collect Advertising ID automatically due to Google's and Apple's privacy rules around advertising ID and web tracking. You will have to send the Advertising ID through our HTTP API endpoint so that Amplitude can match attribution data/events. See keys in our [HTTP API V2](https://developers.amplitude.com/docs/http-api-v2) doc.



### POST 

https://api.amplitude.com/attribution

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



##### Required Event Argument Keys

You must include the following keys within the event argument:

| Required Key | Type | Description | Example |
| --- | --- | --- | --- |
| event_type | string | Prefix with brackets "[YOUR COMPANY]". | "[YOUR COMPANY] Install" |
| platform | string | Either "ios" or "android". | "ios" |
| idfa or idfv | string | (*required for iOS*) The Identifier for Advertiser or the Identifier for Vendor. | AEBE52E7-03EE-455A-B3C4-E57283966239 |
| adid | string | *(required for Android)* The Google AdID, or Amazon Advertising ID for Amazon devices. | AEBE52E7-03EE-455A-B3C4-E57283966239 |

*Note: For iOS devices, you can send either the IDFA or the IDFV but you must send at least one.*

##### Optional Event Argument Keys

These optional keys are available.

| Additional Key | Type | Description | Example |
| --- | --- | --- | --- |
| android_id | string | (Android) The Android ID | AEBE52E7-03EE-455A-B3C4-E57283966239 |
| user_properties | dictionary | A dictionary of attribution properties prefixed with brackets "[YOUR COMPANY]". | {"[YOUR COMPANY] media source": "Facebook"} |
| time | long | Timestamp of the event in milliseconds since epoch. | 1396381378123, will be set to the upload time by default |

### Body (urlencoded)

|Name|   | Description|
|---|---|---|
|api_key| INSERT API KEY| Required. Your API key.|
|event| {"event_type":"[YOUR COMPANY] Install", "idfa": "AEBE52E7-03EE-455A-B3C4-E57283966239", "user_properties": {"[YOUR COMPANY] media source": "facebook", "[YOUR COMPANY] campaign": "refer-a-friend"}, "platform": "ios"}|Required. A request parameter representing the event, in JSON format.|