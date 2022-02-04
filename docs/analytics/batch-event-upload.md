---
title: Batch Event Upload
---

`POST /batch`
*Bulk upload events*

Bulk upload events to Amplitude via the batch event upload endpoint.

If you have used our HTTP API before, note that there are two minor but important differences in your POST request to /batch. First, your Content-type must be `application/json`. Second, your key for the `events` payload is `events` plural, NOT `event` singular. Take a look at the code sample to the right for more details.

## Body parameter

```json
{
  "api_key": "my_amplitude_api_key",
  "events": [
    {
      "user_id": "datamonster@gmail.com",
      "device_id": "C8F9E604-F01A-4BD9-95C6-8E5357DF265D",
      "event_type": "watch_tutorial",
      "time": 1396381378123,
      "event_properties": {
        "load_time": 0.8371,
        "source": "notification",
        "dates": [
          "monday",
          "tuesday"
        ]
      },
      "user_properties": {
        "age": 25,
        "gender": "female",
        "interests": [
          "chess",
          "football",
          "music"
        ]
      },
      "groups": {
        "team_id": "1",
        "company_name": [
          "Amplitude",
          "DataMonster"
        ]
      },
      "app_version": "2.1.3",
      "platform": "iOS",
      "os_name": "Android",
      "os_version": "4.2.2",
      "device_brand": "Verizon",
      "device_manufacturer": "Apple",
      "device_model": "iPhone 9,1",
      "carrier": "Verizon",
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "dma": "San Francisco-Oakland-San Jose, CA",
      "language": "English",
      "price": 4.99,
      "quantity": 3,
      "revenue": -1.99,
      "productId": "Google Pay Store Product Id",
      "revenueType": "Refund",
      "location_lat": 37.77,
      "location_lng": -122.39,
      "ip": "127.0.0.1",
      "idfa": "AEBE52E7-03EE-455A-B3C4-E57283966239",
      "idfv": "BCCE52E7-03EE-321A-B3D4-E57123966239",
      "adid": "AEBE52E7-03EE-455A-B3C4-E57283966239",
      "android_id": "BCCE52E7-03EE-321A-B3D4-E57123966239",
      "event_id": 23,
      "session_id": 1396381378123,
      "insert_id": "5f0adeff-6668-4427-8d02-57d803a2b841"
    }
  ]
}
```

## Parameters

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[UploadRequestBody](#schemauploadrequestbody)|true|A JSON object containing your api_key and an array of events|

## Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful batch event upload|[SuccessSummary](#schemasuccesssummary)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|A 400 indicates invalid upload request. Possible reasons for invalid request: <br/>The request body isn't valid JSON. The `error` will say "Invalid JSON request body".<br/>The request body is missing at least one of: required api_key and events array of at least one event. The `error` will say "Request missing required field". The `missing_field` will indicate which is missing.<br/>At least one of the events in the request is missing a required field. The `error` will say "Request missing required field". The `events_missing_required_fields` will be a map from field names to an array of indexes indicating the events missing those required fields.<br/>At least one of the events in the request has an invalid value for one of the fields (for example setting a string for the `time` field). The `error` will say "Invalid field values on some events". The `events_with_invalid_fields` will be a map from field names to an array of indexes indicating the events with invalid values for those fields.|[InvalidRequestError](#schemainvalidrequesterror)|
|413|[Payload Too Large](https://tools.ietf.org/html/rfc7231#section-6.5.11)|Payload size is too big (request size exceeds 20MB). You should split your events array payload in half and try again.|[PayloadTooLargeError](#schemapayloadtoolargeerror)|
|429|[Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4)|Too many requests for a user / device. Amplitude will throttle requests for users and devices that exceed 1000 events per second (measured as an average over a recent time window) or 500,000 events per 24 hours rolling period (measured as a rolling window of 1-hour interval). If you encountered the "per seconds" throttling, you should pause sending events for that user / device for a period of 30 seconds before retrying and continue retrying until you no longer receive a 429 response. If you encountered the "daily limit" throttling, you should try again in the next hour and contact us for further support. Note: the daily limit (24-hours rolling limit) only applies if we've determined that your user/device is spammy.|[TooManyRequestsForDeviceError](#schematoomanyrequestsfordeviceerror)|
*This operation does not require authentication*

# UploadRequestBody
<a id="schemauploadrequestbody"></a>

```json
{
  "api_key": "my_amplitude_api_key",
  "events": [
    {
      "user_id": "datamonster@gmail.com",
      "device_id": "C8F9E604-F01A-4BD9-95C6-8E5357DF265D",
      "event_type": "watch_tutorial",
      "time": 1396381378123,
      "event_properties": {
        "load_time": 0.8371,
        "source": "notification",
        "dates": [
          "monday",
          "tuesday"
        ]
      },
      "user_properties": {
        "age": 25,
        "gender": "female",
        "interests": [
          "chess",
          "football",
          "music"
        ]
      },
      "groups": {
        "team_id": "1",
        "company_name": [
          "Amplitude",
          "DataMonster"
        ]
      },
      "app_version": "2.1.3",
      "platform": "iOS",
      "os_name": "Android",
      "os_version": "4.2.2",
      "device_brand": "Verizon",
      "device_manufacturer": "Apple",
      "device_model": "iPhone 9,1",
      "carrier": "Verizon",
      "country": "United States",
      "region": "California",
      "city": "San Francisco",
      "dma": "San Francisco-Oakland-San Jose, CA",
      "language": "English",
      "price": 4.99,
      "quantity": 3,
      "revenue": -1.99,
      "productId": "Google Pay Store Product Id",
      "revenueType": "Refund",
      "location_lat": 37.77,
      "location_lng": -122.39,
      "ip": "127.0.0.1",
      "idfa": "AEBE52E7-03EE-455A-B3C4-E57283966239",
      "idfv": "BCCE52E7-03EE-321A-B3D4-E57123966239",
      "adid": "AEBE52E7-03EE-455A-B3C4-E57283966239",
      "android_id": "BCCE52E7-03EE-321A-B3D4-E57123966239",
      "event_id": 23,
      "session_id": 1396381378123,
      "insert_id": "5f0adeff-6668-4427-8d02-57d803a2b841"
    }
  ]
}

```

## Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|api_key|string|true|none|Amplitude project API key|
|events|[[Event](#schemaevent)]|true|none|Array of [Events](#definition-Event) to upload|
|options|[[options](#schemaRequestOptions)]|false|none|Object|

# Event
<a id="schemaevent"></a>

```json
{
  "user_id": "datamonster@gmail.com",
  "device_id": "C8F9E604-F01A-4BD9-95C6-8E5357DF265D",
  "event_type": "watch_tutorial",
  "time": 1396381378123,
  "event_properties": {
    "load_time": 0.8371,
    "source": "notification",
    "dates": [
      "monday",
      "tuesday"
    ]
  },
  "user_properties": {
    "age": 25,
    "gender": "female",
    "interests": [
      "chess",
      "football",
      "music"
    ]
  },
  "groups": {
    "team_id": "1",
    "company_name": [
      "Amplitude",
      "DataMonster"
    ]
  },
  "app_version": "2.1.3",
  "platform": "iOS",
  "os_name": "Android",
  "os_version": "4.2.2",
  "device_brand": "Verizon",
  "device_manufacturer": "Apple",
  "device_model": "iPhone 9,1",
  "carrier": "Verizon",
  "country": "United States",
  "region": "California",
  "city": "San Francisco",
  "dma": "San Francisco-Oakland-San Jose, CA",
  "language": "English",
  "price": 4.99,
  "quantity": 3,
  "revenue": -1.99,
  "productId": "Google Pay Store Product Id",
  "revenueType": "Refund",
  "location_lat": 37.77,
  "location_lng": -122.39,
  "ip": "127.0.0.1",
  "idfa": "AEBE52E7-03EE-455A-B3C4-E57283966239",
  "idfv": "BCCE52E7-03EE-321A-B3D4-E57123966239",
  "adid": "AEBE52E7-03EE-455A-B3C4-E57283966239",
  "android_id": "BCCE52E7-03EE-321A-B3D4-E57123966239",
  "event_id": 23,
  "session_id": 1396381378123,
  "insert_id": "5f0adeff-6668-4427-8d02-57d803a2b841"
}
```
```json
{
  "user_id": "datamonster@gmail.com",
  "device_id": "C8F9E604-F01A-4BD9-95C6-8E5357DF265D",
  "event_type": "$identify",
  "time": 1396381378123,
  "user_properties": {
    "$set": {
      "age": 25,
      "gender": "female",
      "interests": [
      "chess",
      "football",
      "music"
    ]}
  },
  "event_id": 23,
  "session_id": 1396381378123,
  "insert_id": "5f0adeff-6668-4427-8d02-57d803a2b841"
}
```
```json
{
  "user_id": "datamonster@gmail.com",
  "device_id": "C8F9E604-F01A-4BD9-95C6-8E5357DF265D",
  "event_type": "$groupidentify",
  "time": 1396381378123,
  "groups": {
    "team_id": "1",
    "company_name": [
      "Amplitude",
      "DataMonster"
    ]
  },
  "group_properties": {
    "$set": {
      "start_date": "01/01/2017"
    }
  },
  "event_id": 23,
  "session_id": 1396381378123,
  "insert_id": "5f0adeff-6668-4427-8d02-57d803a2b841"
}
```

## Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|user_id|string|true|none|A readable ID specified by you. Must have a minimum length of 5 characters. Required unless device_id is present.|
|device_id|string|true|none|A device-specific identifier, such as the Identifier for Vendor on iOS. Required unless user_id is present. If a device_id is not sent with the event, it will be set to a hashed version of the user_id.|
|event_type|string|true|none|A unique identifier for your event. Note: "$identify" and "$groupidentify" are predefined for identification and group identification. More information about the two operations can be found in the descriptions of "user_properties" and "group_properties".|
|time|long|false|none|The timestamp of the event in milliseconds since epoch. If time is not sent with the event, it will be set to the request upload time.|
|event_properties|object|false|none|A dictionary of key-value pairs that represent additional data to be sent along with the event. You can store property values in an array. Date values are transformed into string values. Object depth may not exceed 40 layers.|
|user_properties|object|false|none|A dictionary of key-value pairs that represent additional data tied to the user. You can store property values in an array. Date values are transformed into string values. In addition, user property operations ($set, $setOnce, $add, $append, $unset) are supported when "event_type" is "$identify". Object depth may not exceed 40 layers.|
|groups|object|false|none|This feature is only available to Enterprise customers who have purchased the [Accounts add-on](https://amplitude.zendesk.com/hc/en-us/articles/115001765532). This field adds a dictionary of key-value pairs that represent groups of users to the event as an event-level group. *Note: You can only track up to 5 unique group types and 10 total groups. Any groups past that threshold will <strong>not</strong> be tracked.</em>*|
|group_properties|object|false|none|This feature is only available to Enterprise customers who have purchased the [Accounts add-on](https://amplitude.zendesk.com/hc/en-us/articles/115001765532). When "event_type" is "$groupidentify", the field is a dictionary of key-value pairs that represent properties tied to the groups listed in the "groups" field. The field is ignored for other event types. Group property operations ($set, $setOnce, $add, $append, $unset) are also supported.|
|app_version|string|false|none|The current version of your application.|
|platform|string|false|none|Platform of the device.|
|os_name|string|false|none|The name of the mobile operating system or browser that the user is using.|
|os_version|string|false|none|The version of the mobile operating system or browser the user is using.|
|device_brand|string|false|none|The device brand that the user is using.|
|device_manufacturer|string|false|none|The device manufacturer that the user is using.|
|device_model|string|false|none|The device model that the user is using.|
|carrier|string|false|none|The carrier that the user is using.|
|country|string|false|none|The current country of the user.|
|region|string|false|none|The current region of the user.|
|city|string|false|none|The current city of the user.|
|dma|string|false|none|The current Designated Market Area of the user.|
|language|string|false|none|The language set by the user.|
|price|float|false|none|The price of the item purchased. Required for revenue data if the revenue field is not sent. You can use negative values to indicate refunds.|
|quantity|integer|false|none|The quantity of the item purchased. Defaults to 1 if not specified.|
|revenue|float|false|none|revneue = price * quantity. If you send all 3 fields of price, quantity, and revenue, then (price * quantity) will be used as the revenue value. You can use negative values to indicate refunds.|
|productId|string|false|none|An identifier for the item purchased. You must send a price and quantity or revenue with this field.|
|revenueType|string|false|none|The type of revenue for the item purchased. You must send a price and quantity or revenue with this field.|
|location_lat|float|false|none|The current Latitude of the user.|
|location_lng|float|false|none|The current Longitude of the user.|
|ip|string|false|none|The IP address of the user. Use "$remote" to use the IP address on the upload request. We will use the IP address to reverse lookup a user's location (city, country, region, and DMA). Amplitude has the ability to drop the location and IP address from events once it reaches our servers. You can submit a request to our platform specialist team [here](https://amplitude.zendesk.com/hc/en-us/requests/new) to configure this for you.|
|idfa|string|false|none|(iOS) Identifier for Advertiser.|
|idfv|string|false|none|(iOS) Identifier for Vendor.|
|adid|string|false|none|(Android) Google Play Services advertising ID|
|android_id|string|false|none|(Android) Android ID (not the advertising ID)|
|event_id|int|false|none|(Optional) An incrementing counter to distinguish events with the same user_id and timestamp from each other. We recommend you send an event_id, increasing over time, especially if you expect events to occur simultanenously.|
|session_id|long|false|none|(Optional) The start time of the session in milliseconds since epoch (Unix Timestamp), necessary if you want to associate events with a particular system. A session_id of -1 is the same as no session_id specified.|
|insert_id|string|false|none|(Optional) A unique identifier for the event. We will deduplicate subsequent events sent with an insert_id we have already seen before within the past 7 days. We recommend generation a UUID or using some combination of device_id, user_id, event_type, event_id, and time.|
|plan|object|false|Only branch, source, version properties are accepted|(Optional) Tracking plan properties.|
|plan.branch|string|false|none|(Optional) The tracking plan branch name e.g. "main"|
|plan.source|string|false|none|(Optional) The tracking plan source e.g. "web"|
|plan.version|string|false|none|(Optional) The tracking plan version e.g. "1", "15"|

# Options
<a id="schemaRequestOptions"></a>

## Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|min_id_length|integer|false|none|Minimum permitted length for user_id & device_id fields|

```json
"options": {
  "min_id_length": 5,
}
```

# SuccessSummary
<a id="schemasuccesssummary"></a>

```json
{
  "code": 200,
  "events_ingested": 50,
  "payload_size_bytes": 50,
  "server_upload_time": 1396381378123
}

```

## Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|code|integer|false|none|200 success code|
|events_ingested|integer|false|none|The number of events ingested from the upload request.|
|payload_size_bytes|integer|false|none|The size of the upload request payload in bytes.|
|server_upload_time|long|false|none|The time in milliseconds since epoch (Unix Timestamp) that our event servers accepted the upload request.|

# InvalidRequestError
<a id="schemainvalidrequesterror"></a>

```json
{
  "code": 400,
  "error": "Request missing required field",
  "missing_field": "api_key",
  "events_with_invalid_fields": {
    "time": [
      3,
      4,
      7
    ]
  },
  "events_with_missing_fields": {
    "event_type": [
      3,
      4,
      7
    ]
  }
}

```

## Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|code|integer|false|none|400 error code|
|error|string|false|none|Error description|
|missing_field|string|false|none|Indicates which request-level required field is missing.|
|events_with_invalid_fields|object|false|none|A map from field names to an array of indexes into the events array indicating which events have invalid values for those fields|
|events_with_missing_fields|object|false|none|A map from field names to an array of indexes into the events array indicating which events are missing those required fields|

# SilencedDeviceID
<a id="schemasilenceddeviceiderror"></a>

```json
{
    "code": 400,
    "eps_threshold": 100,
    "error": "Events silenced for device_id",
    "exceeded_daily_quota_devices":
    {},
    "silenced_devices":
    [
        "silenced_device_id_1",
        "silenced_device_id_2"
    ],
    "silenced_events":
    [
        5,
        6
    ],
    "throttled_devices":
    {
        "throttled_device_id_1": 0,
        "throttled_device_id_2": 100
    },
    "throttled_events":
    [
        3,
        4
    ]
}
```

## Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|code|integer|false|none|400 error code|
|error|string|false|none|Error description.|
|eps_threshold|integer|false|none|Your app's current events per second threshold. If you exceed this rate your requests will be throttled.|
|exceeded_daily_quota_devices|object|false|none|A map from device_id to its current number of daily events, for all devices that exceed the app's daily event quota.|
|silenced_devices|[string]|false|none|Array of device_ids that have been silenced by Amplitude.|
|silenced_events|[integer]|false|none|Array of indexes in the events array indicating events whose device_id got silenced.|
|throttled_devices|object|false|none|A map from device_id to its current events per second rate, for all devices that exceed the app's current threshold.|
|throttled_events|[integer]|false|none|Array of indexes in the events array indicating events whose user_id and/or device_id got throttled|

# PayloadTooLargeError
<a id="schemapayloadtoolargeerror"></a>

```json
{
  "code": 413,
  "error": "Payload too large"
}

```

## Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|code|integer|false|none|413 error code|
|error|string|false|none|Error description.|

# TooManyRequestsForDeviceError

<a id="schematoomanyrequestsfordeviceerror"></a>

```json
{
  "code": 429,
  "error": "Too many requests for some devices and users",
  "eps_threshold": 1000,
  "throttled_devices": {
    "C8F9E604-F01A-4BD9-95C6-8E5357DF265D": 4000
  },
  "throttled_users": {
    "datamonster@amplitude.com": 4000
  },
  "exceeded_daily_quota_users": {
    "datanom@amplitude.com": 500200
  },
  "exceeded_daily_quota_devices": {
    "A1A1A000-F01A-4BD9-95C6-8E5357DF265D": 500900
  },
  "throttled_events": [
    3,
    4,
    7
  ]
}

```

## Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|code|integer|false|none|429 error code|
|error|string|false|none|Error description.|
|eps_threshold|integer|false|none|Your app's current events per second threshold. If you exceed this rate your requests will be throttled.|
|throttled_devices|object|false|none|A map from device_id to its current events per second rate, for all devices that exceed the app's current threshold.|
|throttled_users|object|false|none|A map from user_id to their current events per second rate, for all users that exceed the app's current threshold|
|throttled_events|[integer]|false|none|Array of indexes in the events array indicating events whose user_id and/or device_id got throttled|

#Status Codes