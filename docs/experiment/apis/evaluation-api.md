---
title: Evaluation API
description: Retrieve variation assignment data for users with the Amplitude Experiment REST API. 
---

The Amplitude Experiment REST API lets you retrieve variation assignment data for users. 

## Authorization

The REST API supports API Key authentication by setting an Authorization header. Use a Server API Key from your **Experiment Environments** page. Add the API key in the Authorization header with a prefix `Api-Key`, like this: `Authorization: Api-Key YourApiKeyHere`

## Get assignment data for a user

`GET https://api.lab.amplitude.com/v1/vardata`

Fetches variation assignment data for a particular user. The `user_id` and `device_id` values passed to Experiment should be the same as the values passed to Amplitude.

### Example request

<!-- Brian: Can we please get an example request here? It would be best for it to look like a real request a customer might make and includes all parameters.  -->

### Query parameters

|<div class="big-column">Name</div>|Description|
|---|----|
|`user_id`| String. The user's ID.|
|`device_id`| String. The user's device ID.|
|`flag_key`| String. The flag's key. Found on the **Flags** page. If you don't include `flag_key`, then the request returns all available flags. |
|`context`| String. JSON string consisting of the user context. Set user properties in the `user_properties` field.|

### Response

#### 200 OK

A successful request returns a `200` response and a map of flag key to variants. If `flag_key` isn't provided, it returns all available flags.

<!-- Brian: we need an example response body-->

#### 400 Bad Request

If the request has invalid JSON in the context parameter, it returns a `400` status.

#### 401 Unauthorized

If the request doesn't include a valid API key, it returns a `401` response.