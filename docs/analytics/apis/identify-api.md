---
title: Identify API
description: Use the Identify API to set the User ID for a particular Device ID or update user properties of a particular user without sending an event.
---

Use the Identify API to set the User ID for a particular Device ID or update user properties of a particular user without sending an event. You can change Amplitude default user properties and custom user properties that you have defined.

--8<-- "includes/postman.md"

--8<-- "includes/auth-api-key-query-or-body-param.md"

## Endpoints

| Region | Endpoint |
| --- | --- |
| Standard Server | [https://api2.amplitude.com/identify](https://api2.amplitude.com/identify) |
| EU Residency Server | [https://api.eu.amplitude.com/identify](https://api.eu.amplitude.com/identify) |

## Considerations

- You can update user properties that you haven't tracked yet. However, property values don't apply or appear in the platform until the user's next event. Learn more about [applying user properties](https://help.amplitude.com/hc/en-us/articles/115002380567-User-Properties-Event-Properties#applying-user-properties-to-events).
- Updates aren't retroactive, and only apply to future events.
- Amplitude throttles requests for `device_ids` or `user_ids` that exceed a certain threshold of events per second. When Amplitude throttles a request, the request returns a HTTP status code 429. Pause sending events for any devices in that request for 15 seconds before retrying. Continue retrying until you no longer receive status code 429. If the same `user_id` is sending events from multiple devices simultaneously, then all the devices would be throttled. 
All throttling and status code guidance from Amplitude's [HTTP V2 API](../apis/http-v2-api.md) applies to the Identify API.
- Amplitude compares dates as strings, so Amplitude recommends that you use the ISO 8601 format (`YYYY-MM-DDTHH:mm:ss`). This lets you perform date comparisons in the web app. For example,  '2016-01-31' > '2016-01-01'). This also applies to datetime values like '2017-08-07T10:09:08' > '2017-08-07T01:07:00'.
- Updates don't appear Redshift because they don't count as events.
- Because these calls aren't counted as events, this API has no effect on "active user" or "new user" definitions.
- Because these calls aren't counted as events, Identify API calls don't add to your monthly event count in Amplitude.
- If you change the `user_id` field from an existing value, then Amplitude creates a new user. Amplitude doesn't create a new Amplitude user if the current value of `user_id` is null.

## Example request

```bash
curl --location --request POST 'https://api2.amplitude.com/identify' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'api_key=<API-KEY>' \
--data-urlencode 'identification=[{"user_id":"value", "user_properties":{"propertyNameToUpdate":"newValue"}}]'
```

### Required parameters

You can send these parameters as query parameter in a GET request. In a POST request, send them as body parameters. The body must be `form-data` or `x-www-form-urlencoded`.

|<div class="big-column">Name</div>|Description|
|---|----|
|`api_key`|Your project API key.|
|`identification`|Either a single JSON identification object or an array of JSON objects, each of which represents one identification. |

#### Identification parameter keys

| <div class="big-column">Name</div> | Type | Description |
| --- | --- | --- |
| `user_id` | <span class="required">Required unless `device_id` is present</span>. String. A UUID (unique user ID) specified by you. If you send a request with a `user_id` that's not in the Amplitude system yet, then the user tied to the `user_id` isn't marked new until their first event. |
| `device_id` | <span class="required">Required unless `user_id` is present</span>. String. A device specific identifier, such as the Identifier for Vendor (IDFV) on iOS. |
| `user_properties` |  Dictionary. A dictionary of key-value pairs that represent data tied to the user. Each distinct value appears as a user segment on the Amplitude dashboard. Object depth may not exceed 40 layers. You can store property values in an array and date values are transformed into string values. |
| `groups` | Dictionary. This feature is only available to Enterprise customers who have purchased the [Accounts add-on](https://help.amplitude.com/hc/en-us/articles/115001765532). A dictionary of key-value pairs that represent groups of users. Setting groups allows you to use [account-level reporting](https://help.amplitude.com/hc/en-us/articles/115001765532). You can track up to 5 unique group types and 10 total groups. |
| `app_version` |String. The version of the app the user is on. |
| `platform`[^1] |String. The platform that's sending the data. |
| `os_name`[^1] |String. The mobile operating system or browser the user is on. |
| `os_version`[^1] |String. The version of the mobile operating system or browser the user is on. |
| `device_brand`[^1] |String. The device brand the user is on. |
| `device_manufacturer`[^1] |String. The device manufacturer of the device that the user is on. |
| `device_model`[^1] |String. The device model the user is on. |
| `carrier`[^1] |String. The carrier the user has. |
| `country`[^2] |String. The country that the user is in. |
| `region`[^2] | String. The geographical region the user is in. |
| `city`[^2]|String. The city the user is in. |
| `dma`[^2] |String. The Designated Market Area of the user. |
| `language` |String. The language the user has set. |
| `paying` |String. Whether the user is paying. |
| `start_version`  | String. The version of the app the user was on first. |

#### `user_properties` supported operations

The `user_properties` field supports these operations:

|<div class="big-column">Name</div>|Description|
|----|------|
|`$set` |Sets the value of a property.|
|`$setOnce`| Sets the value of a property, prevent overriding the property value.|
|`$add`| Adds a numeric value to a numeric property.|
|`$append` and `$prepend` | Appends and prepends the value to a user property array.|
|`$unset`| Removes a property|
|`$preInsert`| Adds the specified values to the beginning of the list of properties for the user property if the values don't already exist in the list. Can give a single value or an array of values. If a list is sent, the order of the list is maintained.|
|`$postInsert`| Adds the specified values to the end of the list of properties for the user property if the values don't already exist in the list. Can give a single value or an array of values. If a list is sent, the order of the list is maintained.|
|`$remove`| Removes all instances of the values specified from the list. Can give a single value or an array of values. These should be keys in the dictionary where the values are the corresponding properties that you want to operate on.|

!!!example
    You can't mix user property operations with actual top-level user properties. Instead, include them inside the `$set` operation. If you are using one of these operators then this dictionary can contain only user property operations and you can't combine it with the above format. For example. you can't do `{"$append":{"interests":"Music"}, "subscription type":"paid"}` in the same request.

    Instead, do this:
    `{"$set": {"cohort": "Test A"}, "$setOnce": {"startDate": "2015-10-01"}, "$add": {"friendCount": 3}, "$append": {"interests": "Music"}, "$prepend":{"sports": "Tennis"}, "$unset": {"oldProperty": "-"}}`

[^1]:
    You must update the fields (`platform`, `os_name`, `os_version`, `device_brand`, `device_manufacturer`, `device_model`, and `carrier`) together. Setting any of these fields resets all the other property values to null if aren't explicitly set on the same identify call. All property values otherwise persist to later events if the values aren't changed to a different string or if all values are passed as null. Amplitude tries to use `device_brand`, `device_manufacturer`, and `device_model` to map the corresponding device type.

[^2]:
    You must update the fields (`country`, `region`, `city`, `DMA`) together. Setting any of these fields automatically resets the others if they aren't also explicitly set on the same identify call.

## Status codes

|Code|Message|
|----|------|
|200|Success|
|400| Bad Request. If you get a `missing_event` message, it means the identification parameter is missing or incorrectly formatted.|
|414|You might be using GET, which has a URL character limit. Use POST instead of GET so the data isn't passed in the URL.|
|429|Amplitude throttles requests for `device_ids` or `user_ids` that exceed a certain threshold of events per second, and returns a 429 code.|
