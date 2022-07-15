---
title: Batch Event Upload API
description: The Batch Event Upload API lets you upload large amounts of event data.
---

The Batch Event Upload API lets you upload large amounts of event data.

The event JSON format follows our [HTTP API format](https://developers.amplitude.com/docs/http-api-v2), and has the same requirements (each event must have an event type, and so on).

--8<-- "includes/postman.md"

--8<-- "includes/auth-api-key.md"

## Endpoints

| Region | Endpoint |
| --- | --- |
| Standard Server | [https://api2.amplitude.com/batch](https://api2.amplitude.com/batch) |
| EU Residency Server | [https://api.eu.amplitude.com/batch](https://api.eu.amplitude.com/batch) |

## Considerations

- After a request is accepted, the events in the batch are queryable within 15 minutes.
- The JSON serialized payload must not exceed 20MB in size.
- To prevent instrumentation issues, device IDs and user IDs must be strings with a length of 5 characters or more. If an event has a device or user ID that's too short, the ID value is dropped from the event. If an event doesn't have a user or device ID, it may cause the API to reject the upload with a 400 error. You can change the minimum ID length using the `options` property.
- Each API key can send up to 1000 events per second for any individual device ID or user ID. If you exceed that rate, the API rejects the upload, and gives a 429 response. Check the response summary for more information.

## Batch event upload

Use this request to bulk upload events to Amplitude.

If you have used the HTTP API before, note that there are two minor but important differences in your POST request to `/batch`.

- Content-type must be `application/json`.
- The key for the `events` payload is `events` plural, not `event` singular.

=== "cURL"
    ```curl
    # You can also use wget
    curl -X POST https://api2.amplitude.com/batch \
     -H 'Content-Type: application/json' \
      -H 'Accept: */*'
    ```

=== "HTTP"
    ```bash
    POST https//api2.amplitude.com/batch HTTP/1.1
    Host: api2.amplitude.com
    Content-Type: application/json
    Accept: */*
    ```

=== "JavaScript"
    ```js
    var headers = {
        'Content-Type':'application/json',
        'Accept':'*/*'

    };

    $.ajax({
      url: 'https://api2.amplitude.com/batch',
      method: 'post',
    ```

=== "Node"
    ```js
    const request = require('node-fetch');
    const inputBody = '{
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
        "company_id": "1",
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
    }';
    const headers = {
    'Content-Type':'application/json',
    'Accept':'*/*'

    };

    fetch('https://api2.amplitude.com/batch',
    {
    method: 'POST',
    body: inputBody,
    headers: headers
    })
    .then(function(res) {
      return res.json();
    }).then(function(body) {
      console.log(body);
    });
    ```

=== "Ruby"
    ```ruby
    require 'rest-client'
    require 'json'

    headers = {
    'Content-Type' => 'application/json',
    'Accept' => '*/*'
    }

    result = RestClient.post 'https://api2.amplitude.com/batch',
    params: {
    }, headers: headers

    p JSON.parse(result)
    ```

=== "Python"
    ```python
    import requests
    headers = {
    'Content-Type': 'application/json',
    'Accept': '*/*'
    }

    r = requests.post('https://api2.amplitude.com/batch', params={

    }, headers = headers)

    print r.json()
    ```

=== "Java"
    ```java
    URL obj = new URL("https://api2.amplitude.com/batch");
    HttpURLConnection con = (HttpURLConnection) obj.openConnection();
    con.setRequestMethod("POST");
    int responseCode = con.getResponseCode();
    BufferedReader in = new BufferedReader(
      new InputStreamReader(con.getInputStream()));
    String inputLine;
    StringBuffer response = new StringBuffer();
    while ((inputLine = in.readLine()) != null) {
      response.append(inputLine);
    }
    in.close();
    System.out.println(response.toString());
    ```

=== "Go"
    ```go
    package main

    import (
      "bytes"
      "net/http"
    )

    func main() {

      headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"*/*"},

      }

      data := bytes.NewBuffer([]byte{jsonReq})
      req.Header = headers

      client := &http.Client{}
      resp, err := client.Do(req)
      // ...
    }
    ```

### Parameters

#### Body

|Parameter|Description|
|-------|-------|
|`body`| Required. UploadRequestBody. A JSON object that contains your API key and an array of events.|

##### Example body

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

##### Body properties

These properties belong to the request's body.

| Name  | Description |
| --- |--- |
| `api_key`  | Required. String. Amplitude project API key |
| `events` | Required. [[Event](https://developers.amplitude.com/docs/batch-event-upload-api#schemaevent)\]. Array of [Events](https://developers.amplitude.com/docs/batch-event-upload-api#definition-Event) to upload |
| `options`  | Optional. [[options](https://developers.amplitude.com/docs/batch-event-upload-api#schemaRequestOptions)\]. Options for the request. |

#### Event properties

These properties belong to the `events` object.

|<div class='big-column'>    Name   </div>|                                                                                                                                                                                         Description                                                                                                                                                                                                    |
|:-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|       `user_id`       |                                                                                                                                        Required. String. A readable ID specified by you. Must have a minimum length of 5 characters. <br>Required unless device_id is present.                                                                                                                                        |
|      `device_id`      |                                                                                            Required. String. A device-specific identifier, such as the Identifier for Vendor on iOS. Required unless user_id is present. If a device_id is not sent with the event, it will be set to a hashed version of the user_id.                                                                                            |
|     `event_type`      |                                                                 Required. String. A unique identifier for your event.  <br>Note: `$identify` and `$groupidentify` are predefined for identification and group identification. More information about the two operations can be found in the descriptions of "user_properties" and "group_properties".                                                                  |
|        `time`         |                                                                                                                              Optional. Long. The timestamp of the event in milliseconds since epoch. If time is not sent with the event, it will be set to the request upload time.                                                                                                                               |
|  `event_properties`   |                                                                                Optional. Object. A dictionary of key-value pairs that represent additional data to be sent along with the event. You can store property values in an array. Date values are transformed into string values. Object depth may not exceed 40 layers.                                                                                |
|   `user_properties`   |                        Optional. Object. A dictionary of key-value pairs that represent additional data tied to the user. You can store property values in an array. Date values are transformed into string values. In addition, user property operations (`$set`,` $setOnce`, `$add`, `$append`, `$unset`) are supported when `event_type` is `$identify`. Object depth may not exceed 40 layers.                         |
|       `groups`        |                        Optional. Object. This feature is available only to customers who have purchased the Accounts add-on. This field adds a dictionary of key-value pairs that represent groups of users to the event as an event-level group. Note: You can only track up to 5 unique group types and 10 total groups. Any groups past that threshold will not be tracked.                         |
|  `group_properties`   | Optional. Object. This feature is available only to customers who have purchased the Accounts add-on. When "event_type" is `$groupidentify`, the field is a dictionary of key-value pairs that represent properties tied to the groups listed in the "groups" field. The field is ignored for other event types. Group property operations (`$set`, `$setOnce`, `$add`, `$append`, `$unset`) are also supported. |
|`$skip_user_properties_sync`|Optional. Boolean. When `true` user properties are not synced. Defaults to `false`. See [Skip user properties sync](../data-backfill-guide.md#skip-user-properties-sync) for more information.|
|     `app_version`     |                                                                                                                                                                            Optional. String. The current version of your application.                                                                                                                                                                             |
|      `platform`       |                                                                                                                                                                                     Optional. String. Platform of the device.                                                                                                                                                                                     |
|       `os_name`       |                                                                                                                                                           Optional. String. The name of the mobile operating system or browser that the user is using.                                                                                                                                                            |
|     `os_version`      |                                                                                                                                                            Optional. String. The version of the mobile operating system or browser the user is using.                                                                                                                                                             |
|    `device_brand`     |                                                                                                                                                                            Optional. String. The device brand that the user is using.                                                                                                                                                                             |
| `device_manufacturer` |                                                                                                                                                                         Optional. String. The device manufacturer that the user is using.                                                                                                                                                                         |
|    `device_model`     |                                                                                                                                                                            Optional. String. The device model that the user is using.                                                                                                                                                                             |
|       `carrier`       |                                                                                                                                                                               Optional. String. The carrier that the user is using.                                                                                                                                                                               |
|       `country`       |                                                                                                                                                                                Optional. String. The current country of the user.                                                                                                                                                                                 |
|       `region`        |                                                                                                                                                                                 Optional. String. The current region of the user.                                                                                                                                                                                 |
|        `city`        |                                                                                                                                                                                  Optional. String. The current city of the user.                                                                                                                                                                                  |
|         `dma`         |                                                                                                                                                                         Optional. String. The current Designated Market Area of the user.                                                                                                                                                                         |
|      `language`       |                                                                                                                                                                                  Optional. String. The language set by the user.                                                                                                                                                                                  |
|        `price`        |                                                                                                                          Optional. Float. The price of the item purchased. Required for revenue data if the revenue field is not sent. You can use negative values to indicate refunds.                                                                                                                           |
|      `quantity`       |                                                                                                                                                              Optional. Integer. The quantity of the item purchased. Defaults to 1 if not specified.                                                                                                                                                               |
|       `revenue`       |                                                                                                  Optional. Float. Revenue = price quantity. If you send all 3 fields of price, quantity, and revenue, then (price quantity) will be used as the revenue value. You can use negative values to indicate refunds.                                                                                                   |
|      `productId`      |                                                                                                                                              Optional. String. An identifier for the item purchased. You must send a price and quantity or revenue with this field.                                                                                                                                               |
|     `revenueType`     |                                                                                                                                           Optional. String. The type of revenue for the item purchased. You must send a price and quantity or revenue with this field.                                                                                                                                            |
|    `location_lat`     |                                                                                                                                                                                Optional. Float. The current Latitude of the user.                                                                                                                                                                                 |
|    `location_lng`     |                                                                                                                                                                                Optional. Float. The current Longitude of the user.                                                                                                                                                                                |
|         `ip`          |     Optional. String. The IP address of the user. Use "$remote" to use the IP address on the upload request. We will use the IP address to reverse lookup a user's location (city, country, region, and DMA). Amplitude has the ability to drop the location and IP address from events once it reaches our servers. You can submit a request to our platform specialist team here to configure this for you.     |
|        `idfa`         |                                                                                                                                                                                Optional. String. (iOS) Identifier for Advertiser.                                                                                                                                                                                 |
|        `idfv`         |                                                                                                                                                                                  Optional. String. (iOS) Identifier for Vendor.                                                                                                                                                                                   |
|        `adid`         |                                                                                                                                                                          Optional. String. (Android) Google Play Services advertising ID                                                                                                                                                                          |
|     `android_id`      |                                                                                                                                                                          Optional. String. (Android) Android ID (not the advertising ID)                                                                                                                                                                          |
|      `event_id`       |                                                                                      Optional. Integer. An incrementing counter to distinguish events with the same user_id and timestamp from each other. We recommend you send an event_id, increasing over time, especially if you expect events to occur simultanenously.                                                                                      |
|     `session_id`      |                                                                                            Optional. Long. The start time of the session in milliseconds since epoch (Unix Timestamp), necessary if you want to associate events with a particular system. A session_id of -1 is the same as no session_id specified.                                                                                             |
|      `insert_id`      |                                                               Optional. String. A unique identifier for the event. We will deduplicate subsequent events sent with an `insert_id` we have already seen before within the past 7 days. We recommend generation a UUID or using some combination of device_id, user_id, event_type, event_id, and time.                                                               |
|        `plan`         |                                                                                                                                                         Optional. Object. Tracking plan properties. Only branch, source, version properties are accepted                                                                                                                                                          |
|     `plan.branch`     |                                                                                                                                                                            Optional. String. The tracking plan branch name e.g. "main"                                                                                                                                                                            |
|     `plan.source`     |                                                                                                                                                                               Optional. String. The tracking plan source e.g. "web"                                                                                                                                                                               |
|    `plan.version`     |                                                                                                                                                                            Optional. String. The tracking plan version e.g. "1", "15"                                                                                                                                                                             |

#### Option properties

These properties belong to the `options` object.

|<div class="big-column">Name</div>| Description|
|----|------------|
|`min_id_length`|Optional. Integer. Sets the minimum permitted length for user_id & device_id fields. Default is five. |

## Responses

| Status | Meaning | Description |
| --- | --- | --- |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successful batch upload. |
| 400 | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | Invalid upload request. Read the error message to fix the request. |
| 413 | [Payload Too Large](https://tools.ietf.org/html/rfc7231#section-6.5.11) | Payload size is too big (request size exceeds 20MB). Split your events array payload in half and try again. |
| 429 | [Too Many Requests](https://tools.ietf.org/html/rfc6585#section-4) | Too many requests for a user or device. Amplitude throttles requests for users and devices that exceed 1000 events per second or 500,000 events per day. |

### SuccessSummary

```json
{
  "code": 200,
  "events_ingested": 50,
  "payload_size_bytes": 50,
  "server_upload_time": 1396381378123
}

```

#### Success Summary Properties

| Name |  Description |
| --- |--- |
| code | Integer. 200 success code |
| events_ingested |  Integer. The number of events ingested from the upload request. |
| payload_size_bytes |  Integer. The size of the upload request payload in bytes. |
| server_upload_time | Integer. The time in milliseconds since epoch (Unix Timestamp) that our event servers accepted the upload request. |

### InvalidRequestError

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

#### InvalidRequestError Properties

| Name |  Description |
| --- | --- |
| code  | 400 error code. |
| error |  String. Error description |
| missing_field | String. Indicates which request-level required field is missing. |
| events_with_invalid_fields | Object. A map from field names to an array of indexes into the events array indicating which events have invalid values for those fields |
| events_with_missing_fields | Object. A map from field names to an array of indexes into the events array indicating which events are missing those required fields |

### SilencedDeviceID

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

#### SilencedDeviceID properties

| Name | Description |
| ---| --- |
| code |  400 error code |
| error | String. Error description. |
| eps_threshold | Integer. Your app's current events per second threshold. If you exceed this rate your requests will be throttled. |
| exceeded_daily_quota_devices | Integer. A map from device_id to its current number of daily events, for all devices that exceed the app's daily event quota. |
| silenced_devices | [string]. Array of device_ids that have been silenced by Amplitude. |
| silenced_events | [integer]. Array of indexes in the events array indicating events whose device_id got silenced. |
| throttled_devices | Object. A map from device_id to its current events per second rate, for all devices that exceed the app's current threshold. |
| throttled_events | [integer]. Array of indexes in the events array indicating events whose user_id and/or device_id got throttled |

### PayloadTooLargeError

```json
{
  "code": 413,
  "error": "Payload too large"
}

```

#### PayloadTooLargeError properties

| Name | Description |
| --- | --- |
| code | Integer. 413 error code |
| error | String. Error description. |

### TooManyRequestsForDeviceError

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

#### TooManyRequestsForDeviceError properties

| Name |  Description |
| --- |-- |
| `code` | Integer. 429 error code |
| `error` | String. Error description. |
| `eps_threshold` | Integer. Your app's current events per second threshold. If you exceed this rate your requests will be throttled. |
| `throttled_devices` | Object. A map from device_id to its current events per second rate, for all devices that exceed the app's current threshold. |
| `throttled_users` | Object. A map from user_id to their current events per second rate, for all users that exceed the app's current threshold |
| `throttled_events` | [integer]. Array of indexes in the events array indicating events whose user_id and/or device_id got throttled |

#### Code 429 explained

When a request is rejected with a 429 status, it means that a device or user in that request was throttled. Details about which can be found in the error response data. Logging the response lets you investigate which users or devices were the cause of throttling.

Because `device_id` and `user_id` are the attributes that determine throttling, partitioning work on one of these attributes will help isolate throttling to a specific partition of work. This way partitions which are not being throttled can still make progress while the throttled partitions are blocked by throttling.

##### EPDS and EPUS

Amplitude measures the rate of events for each deviceid and each userid for a project, and refer to those rates as *events per device second* (**EPDS**) and *events per user second* (**EPUS**) respectively. These values are both averaged over a period of 30 seconds.

For example, to reach an EPDS limit of 1000 requires that a device sends 30,000 events in a 30-second period for the device to be throttled and receive HTTP status 429.

In general, your app shouldn't measure EPDS or EPUS itself. Send requests to Amplitude as fast as possible. When you receive a 429, wait for a short period (for example, 15 seconds) before trying to send that request again.

##### Daily limit

In addition to the per-second limit, there is daily limit to prevent against spam and abuse. This limit is rarely exceeded. Events starts counting toward the daily limit after Amplitude determines that a user/device is spamming the system. After the threshold is reached, a daily limit of 500,000 events uploaded per rolling 24 hours is enforced. The 24 hour rolling period applies in one-hour intervals. The daily limit applies for each deviceid and each user_id for a project.

The daily limit is independent of the EPDS/EPUS. Once a user or device has hit the 500,000 event daily limit for a particular project, any batches uploaded containing the user or device is rejected. In those cases, the request returns a 429 response with a body indicating “exceeded_daily_quota_users” or “exceeded_daily_quota_devices” with list of deviceIds and userIds. Retry the batch when there are less than 500,000 events uploaded for a user or device in the previous 24 hour period.
