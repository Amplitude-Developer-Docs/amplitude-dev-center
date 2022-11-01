---
title: Behavioral Cohorts API
description: Use the Behavioral Cohorts API to list all your cohorts in Amplitude, export a cohort in Amplitude, or upload a cohort.
---

Use the Behavioral Cohorts API to list all your cohorts in Amplitude, export a cohort in Amplitude, or upload a cohort.

--8<-- "includes/postman.md"

--8<-- "includes/auth-basic.md"

## Endpoints

| Region | Endpoint |
| --- | --- |
| Standard Server | [https://amplitude.com/api/3/cohorts](https://amplitude.com/api/3/cohorts) |
| EU Residency Server | [https://analytics.eu.amplitude.com/api/3/cohorts](https://analytics.eu.amplitude.com/api/3/cohorts) |

## Considerations

- For Growth and Enterprise plans, the Behavioral Cohorts Download API has a limit of 500 requests per month.
- The limit for cohort export size is 10 million users.
- There's a concurrency limit of 5 requests across cohort downloads and the Dashboard REST API.
- Cohort Download uses an asynchronous API. Getting a cohort happens in three steps:
  1. Request a single cohort.
  2. Poll the cohort status.
  3. Download the file.

## Get all cohorts

Get all discoverable cohorts for an app. Use the `id` for each cohort returned in the response to get a single cohort.

```http
GET /api/3/cohorts HTTP/1.1
Host: amplitude.com
Authorization: Basic {{api-key}}:{{secret-key}}
```

### Get all cohorts response

The response is a JSON object with this schema:

```json
{
    "cohorts": [
        { COHORT_OBJECT },
        ...
        { COHORT_OBJECT },
    ]
}
```

Each COHORT_OBJECT returned has this schema:

```json
{
    "lastComputed": timestamp,
    "owners": string[],
    "description": string,
    "definition": { COHORT_DEFINITION },
    "published": boolean,
    "archived": boolean,
    "name": string,
    "appId": string,
    "lastMod": timestamp,
    "type": string,
    "id": string,
    "size": integer
}
```

## Get one cohort

Get a discoverable cohort using its `cohort_id`.

This is step one in the download a cohort operation. Use the `request_id` returned in the response to poll export status.

```http
GET /api/5/cohorts/request/id HTTP/1.1
Host: amplitude.com
Authorization: Basic {{api-key}}:{{secret-key}}
```

### Get one cohort path parameters

|Name|Description|
|----|-----------|
|`id`|Required. Cohort ID.|

### Get one cohort query parameters

| Name|Description|
|----|-----|
|`props`|Optional. Integer. Set to 1 to include user properties in the response object.|
|`propKeys`|Optional. string[]. One or more user properties to include in the response. If left undefined and props=1, response object returns all available user properties.|

### Get one cohort response

Requesting a single cohort returns 202 response code with the following JSON object:

```json
{
    'request_id': <request_id>,
    'cohort_id': <cohort_id>
}
```

If your authorization or the `cohort_id` is invalid, the request returns an error.

## Get request status

Poll the request status using the `request_id` retrieved for the cohort. This is the second phase in a cohort download operation.

```bash
GET /api/5/cohorts/request-status/:request_id HTTP/1.1
Host: amplitude.com
Authorization: Basic {{api-key}}:{{secret-key}}
```

### Get request status path parameters

|Name|Description|
|----|-----------|
|`request_id`|Required. The request ID retrieved with the [get one cohort](#get-one-cohort) request.|

### Get request status responses

If the job is still running, polling the request status returns a 202 code and the `async_status` 'JOB INPROGRESS'.

```json
{
    'request_id': <request_id>,
    'cohort_id': <cohort_id>,
    'async_status': 'JOB INPROGRESS'
}
```

If the job has finished running, polling the request status returns a 200 code and the `async_status` 'JOB COMPLETED'.

```json
{
    'request_id': <request_id>,
    'cohort_id': <cohort_id>,
    'async_status': 'JOB COMPLETED'
}
```

## Download cohort

When the job has finished running, download the cohort.

```bash

GET /api/5/cohorts/request/requestId/file HTTP/1.1
Host: amplitude.com
Authorization: Basic {{api-key}}:{{secret-key}}

```

### Download cohort path parameters

|Name|Description|
|----|-----------|
|`request_id`|Required. The request ID retrieved with the [get one cohort](#get-one-cohort) request.|

- For small cohorts, the response body contains the cohort data.
- For large cohorts, you must download the data. If the cohort is large, the response redirects with a 302 response code to a pre-signed Amazon S3 download URL. The download URL is valid for one minute, access it immediately.
- The API request link (`https://amplitude.com/api/5/cohorts/request/:requestId/file`) is valid for seven days. During the seven days, you can make the same request to get a new S3 download link. Each S3 link is valid for one minute.
- Most clients used to send API requests automatically download the data from the S3 link. If your API client doesn't automatically download the cohort from the S3 link, you have one minute access it manually.

## Upload cohort

Generate a new cohort or update an existing cohort by uploading a set of User IDs or Amplitude IDs.

```bash
POST /api/3/cohorts/upload HTTP/1.1
Host: amplitude.com
Authorization: Basic {{api-key}}:{{secret-key}}
Content-Type: application/json
Content-Length: 280

{
    "name": "New Cohort",
    "app_id": 153957,
    "id_type": "BY_AMP_ID",
    "ids": [
        "10101010101010ID1", 
        "00000010101010ID2"
    ],
    "owner": "datamonster@amplitude.com",
    "published": true
}

```

### Upload cohort body parameters

| <div class="big-column">Parameter</div> | Description |
| --- | --- |
| `name` | Required. String. A name for the cohort. |
| `app_id` | Required. Integer. An identifier for the Amplitude project containing the cohort. |
| `id_type` | Required. String. The kind of ID sent in the ids field. Valid options are `BY_AMP_ID` or `BY_USER_ID`. |
| `ids` | Required. String\[\]. One or more user or Amplitude IDs to include in the cohort. Specify the ID type in the `id_type` field. |
| `owner` | Required. String. The login email of the cohort's owner in Amplitude. |
| `published` | Required. Boolean. Whether the cohort is discoverable or hidden. |
| `existing_cohort_id` | Optional. String. The ID of an existing cohort. This replaces the contents for the specified cohort with the IDs uploaded in the request. For example, '1a2bc3d' is your cohort's ID, found in the cohort's URL. `https//analytics.amplitude.com/accountname/cohort/**1a2bc3d**`|

### Upload cohort response

The response is a JSON object with this schema:

```json
{
    "cohort_id": "COHORT_ID"
}
```

## Update cohort membership

Add and remove IDs to incrementally update existing cohort membership.

```bash

POST /api/3/cohorts/membership HTTP/1.1
Host: amplitude.com
Content-Type: application/json
Authorization: Basic {{api-key}}:{{secret-key}}
Content-Length: 362

{
 "cohort_id":"1a2bc3d",
 "memberships": [
   {
      "ids" : ["111",”222”],
      "id_type" : "BY_ID",
      "operation" : "ADD"
    },
    {
      "ids" : ["333",”444”],
      "id_type" : "BY_ID",
      "operation" : "REMOVE"
    },
    {
      "ids" : ["asd",”qwe”],
      "id_type" : "BY_NAME",
      "operation" : "ADD"
    }
  ],
 "skip_invalid_ids":true,
}
```

Perform incremental update (add / remove) to existing cohort membership.

### Update cohort membership request body

| Parameter | Description |
| --- | --- |
| `cohort_id` | Required. String. The ID of an existing cohort. This updates the membership for the specified cohort with the IDs being uploaded in this request. |
| `count_group` | Optional. String. The count group of the given IDs. This must be the same as the cohort’s existing count group. `Count_group` defaults to User. |
| `memberships` | Required. List of [membership json](https://developers.amplitude.com/docs/behavioral-cohorts-api#membershipjson) An array of JSON objects identifying IDs to add or remove. |
| `skip_invalid_ids` | Optional. Boolean. Setting this parameter to `false` ends the request without updating cohort membership if the request has invalid IDs. Setting `skip_invalid_ids` to `true` skips invalid IDs while applying the remaining valid ids. Default is `true`. |

## Update cohort membership request membership JSON

| Parameter | Description |
| --- | --- |
| `ids` | Required. String\[\]. List of IDs to add or remove. |
| `id_type` | Required. String. The kind of ID sent in the `ids` field. Valid options are: *\- BY_ID* *\- BY_NAME* For User `count_group`, BY_ID is amplitude ID and BY_NAME is user ID. For any other `count_group`, `BY_ID` is group ID and `BY_NAME` is group name. |
| `operation` | Required. String. The operation to apply on `ids` field. Valid options are: `ADD` and `REMOVE` |

### Update cohort success response fields

| Parameter | Description |
| --- | --- |
| `cohort_id` | String. The ID of an existing cohort for which the membership information was updated. |
| `memberships_result` | List of `[memberships_result` json](https://developers.amplitude.com/docs/behavioral-cohorts-api#membershipresultjson). An array of JSON objects identifying result of membership update (add or remove) operation. |

### Response `memberships_result` JSON

| Parameter | Description |
| --- | --- |
| `skipped_ids` | List of strings. List of skipped IDs in the membership operation entry.|
| `id_type` | String. The kind of ID sent for the `ids` field in this membership operation entry. |
| `operation` | String. The operation applied on `ids` field in this membership operation entry |

## Update cohort error response body

| Parameter | Type | Description |
| --- | --- | --- |
| error | [error json](#update-cohort-error-response-json) | Error details.  |

### Update cohort error response JSON

| Parameter | Description |
| --- | --- |
| `message` | String. Describes the error. |
| `code` | Integer. Internal error code. |
| `metadata` | JSON object. For bad request error (400) with invalid ID while `skip_invalid_ids=false`, this field has the `cohort_id` and `memberships_result` (list of membership JSON). The `memberships_result’`s `skipped_ids` can help identify which IDs were invalid in which operation. For other errors, this field isn't present. |
