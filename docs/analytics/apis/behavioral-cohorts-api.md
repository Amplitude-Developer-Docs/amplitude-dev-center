---
title: Behavioral Cohorts API
description: Use the Behavioral Cohorts API to list all your cohorts in Amplitude, export a cohort in Amplitude, or upload a cohort.
---

Use the Behavioral Cohorts API to list all your cohorts in Amplitude, export a cohort in Amplitude, or upload a cohort.

--8<-- "includes/postman-interactive.md"

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
- There is limit on Cohort Download to request a single cohort: 60 requests per 10 minutes per app, and 4 parallel request per minute per app.

## Get all cohorts

Get all discoverable cohorts for an app. Use the `id` for each cohort returned in the response to get a single cohort.

=== "cURL"

    ```bash

    curl --location --request GET 'https://amplitude.com/api/3/cohorts' \
    -u '{api_key}:{secret_key}'
    ```

=== "HTTP"

    ```bash
    GET /api/3/cohorts HTTP/1.1
    Host: amplitude.com
    Authorization: Basic {{api-key}}:{{secret-key}} #credentials must be base64 encoded
    ```

### Get all cohorts query parameters

| Name|Description|
|----|-----|
|`includeSyncInfo`|<span class="optional">Optional</span>. Boolean. Set to true to include cohort sync metadata in response (one-time + disabled sync will be excluded) .|

!!!note "Notes about query parameters"

    - This feature is currently in Beta and require whitelist, please contact Amplitude Support, or your Amplitude account manager if you need this


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
    "appId": integer,
    "archived": boolean, // whether cohort is archived
    "definition": { COHORT_DEFINITION }, // Amplitude internal representation of Cohort Definintion
    "description": string,
    "finished": boolean, // Amplitude internal use to decide whether a training cohort has finished ML training
    "id": string,
    "name": string,
    "owners": string[],
    "viewers": string[],
    "published": boolean, // whether cohort is discoverable by other users
    "size": integer,
    "type": string, // Amplitude internal representation on different cohort types
    "lastMod": timestamp, // last modified date
    "createdAt": timestamp,
    "lastComputed": timestamp,
    "hidden": boolean, // Amplitude internal use case to hide a cohort
    "metadata": string[], // cohort created from funnel/microscope might have this
    "view_count": integer,
    "popularity": integer, // cohort created from chart might have this
    "last_viewed": timestamp,
    "chart_id": string, // cohort created from chart will have this
    "edit_id": string, // cohort created from chart will have this
    "is_predictive": boolean,
    "is_official_content": boolean,
    "location_id": string, // cohort created from chart might have this
    "shortcut_ids": string[],
    "syncMetadata": COHORT_SYNC_METADATA[]
}
```

Each COHORT_SYNC_METADATA has this schema:

```json
{

    "target": string,
    "frequency": string, // support minute (real-time), hourly, daily
    "last_successful": timestamp,
    "last_failure": timestamp,
    "params": { COHORT_SYNC_LEVEL_PARAM }
}
```

## Get one cohort

Get a discoverable cohort using its `cohort_id`.

This is step one in the download a cohort operation. Use the `request_id` returned in the response to poll export status.

=== "cURL"

    ```bash

    curl --location --request GET 'https://amplitude.com/api/5/cohorts/request/id'
    -u '{api_key}:{secret_key}'

    ```

=== "HTTP"

    ```bash
    GET /api/5/cohorts/request/id HTTP/1.1
    Host: amplitude.com
    Authorization: Basic {{api-key}}:{{secret-key}} #credentials must be base64 encoded
    ```

???example "More Examples (click to expand)"

    ???code-example "Example: Simple request (click to expand)"

        This example gets the cohort with ID `26umsb5`.

        === "cURL"
            ```bash
            curl --location --request GET 'https://amplitude.com/api/5/cohorts/request/26umsb5'
            --header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
            ```

        === "HTTP"

            ```bash
            GET /api/5/cohorts/request/26umsb5 HTTP/1.1
            Host: amplitude.com
            Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
            ```

    ???code-example "Example: Get cohort with specific properties (click to expand)"

        This example gets the cohort with ID `26umsb5` and includes the properties `Property1` and `Property2`.

        === "cURL"

            ```bash

            curl --location --request GET 'https://amplitude.com/api/5/cohorts/request/26umsb5?props=1&propKeys=Property1&propKeys=Property2'
            --header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
            ```

        === "HTTP"

            ```bash

            GET /api/5/cohorts/request/26umsb5?props=1&propKeyss=Property1&propKeys=Property2 HTTP/1.1
            Host: amplitude.com
            Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
            ```

    ???code-example "Example: Get cohort with all properties (click to expand)"

        This example gets the cohort with ID `26umsb5` and includes all of the cohort properties.

        === "cURL"

            ```bash

            curl --location --request GET 'https://amplitude.com/api/5/cohorts/request/26umsb5?props=1'
            --header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
            ```

        === "HTTP"

            ```bash

            GET /api/5/cohorts/request/26umsb5?props=1 HTTP/1.1
            Host: amplitude.com
            Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
            ```

### Get one cohort path parameters

|Name|Description|
|----|-----------|
|`id`|<span class="required">Required</span>. Cohort ID.|

### Get one cohort query parameters

| Name|Description|
|----|-----|
|`props`|<span class="optional">Optional</span>. Integer. Set to 1 to include user properties in the response object.|
|`propKeys`|<span class="optional">Optional</span>. string[]. One or more user properties to include in the response. Add as many `propKeys` parameters as needed. If left undefined and props=1, response object returns all available user properties.|

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

=== "cURL"

    ```bash
    curl --location --request GET 'https://amplitude.com/api/5/cohorts/request-status/:request_id' \
    -u '{api_key}:{secret_key}''
    ```

=== "HTTP"

    ```bash
    GET /api/5/cohorts/request-status/:request_id HTTP/1.1
    Host: amplitude.com
    Authorization: Basic {{api-key}}:{{secret-key}} #credentials must be base64 encoded
    ```

???code-example "Example: Get a request status (click to expand)"

    This example gets the status of request with the ID `qfaZya`.

    === "cURL"

        ```bash
        curl --location --request GET 'https://amplitude.com/api/5/cohorts/request-status/qfaZya' \
        --header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
        ```
    === "HTTP"

        ```bash
        GET /api/5/cohorts/request-status/qfaZya HTTP/1.1
        Host: amplitude.com
        Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
        ```

### Get request status path parameters

|Name|Description|
|----|-----------|
|`request_id`|<span class="required">Required</span>. The request ID retrieved with the [get one cohort](#get-one-cohort) request.|

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

This is a basic request.

=== "cURL"

    ```bash
    curl --location --request GET 'https://amplitude.com/api/5/cohorts/request/:requestId/file' \
    -u '{api_key}:{secret_key}'
    ```

=== "HTTP"

    ```bash

    GET /api/5/cohorts/request/requestId/file HTTP/1.1
    Host: amplitude.com
    Authorization: Basic {{api-key}}:{{secret-key}} #credentials must be base64 encoded

    ```

???code-example "Example: Download a file for a request (click to expand)"

    This request downloads the file for request ID `Sf7M9j`.

    === "cURL"

        ```bash
        curl --location --request GET 'https://amplitude.com/api/5/cohorts/request/Sf7M9j/file'
        --header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
        ```

    === "HTTP"

        ```bash

        GET /api/5/cohorts/request/Sf7M9j/file HTTP/1.1
        Host: amplitude.com
        Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
        ```

### Download cohort path parameters

|Name|Description|
|----|-----------|
|`request_id`|<span class="required">Required</span>. The request ID retrieved with the [get one cohort](#get-one-cohort) request.|

- For small cohorts, the response body contains the cohort data.
- For large cohorts, you must download the data. If the cohort is large, the response redirects with a 302 response code to a pre-signed Amazon S3 download URL. The download URL is valid for one minute, access it immediately.
- The API request link (`https://amplitude.com/api/5/cohorts/request/:requestId/file`) is valid for seven days. During the seven days, you can make the same request to get a new S3 download link. Each S3 link is valid for one minute.
- Most clients used to send API requests automatically download the data from the S3 link. If your API client doesn't automatically download the cohort from the S3 link, you have one minute access it manually.

## Upload cohort

Generate a new cohort or update an existing cohort by uploading a set of User IDs or Amplitude IDs. This is a basic request example with placeholder values.

=== "cURL"

    ```bash
    curl --location --request POST 'https://amplitude.com/api/3/cohorts/upload' \
    --header 'Content-Type: application/json' \
    -u '{api_key}:{secret_key}''
    --data-raw '{
      "name": "Cohort Name",
      "app_id": amplitude_project,
      "id_type": "BY_AMP_ID",
      "ids": [
                amplitude_id,
                amplitude_id
      ],
      "owner": "cohort_owner",
      "published": true
    }'
    ```

=== "HTTP"

    ```bash
    POST /api/3/cohorts/upload HTTP/1.1
    Host: amplitude.com
    Authorization: Basic {{api-key}}:{{secret-key}} #credentials must be base64 encoded
    Content-Type: application/json
    Content-Length: 201

    {
      "name": "Cohort Name",
      "app_id": amplitude_project,
      "id_type": "BY_AMP_ID",
      "ids": [
                amplitude_id,
                amplitude_id
      ],
      "owner": "cohort_owner",
      "published": true
    }
    ```

???code-example "Example: Create a new cohort (click to expand)"

    This example creates a new cohort named "New Cohort" and includes the Amplitude IDs  `10101010101010ID1`, and `00000010101010ID2`.

    === "cURL"

        ```bash

        curl --location --request POST 'https://amplitude.com/api/3/cohorts/upload' \
        --header 'Content-Type: application/json' \
        --header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=' \
        -u '{api_key}:{secret_key}' \
        --data-raw '{
          "name": "New Cohort",
          "app_id": 153957,
          "id_type": "BY_AMP_ID",
          "ids": [
                    10101010101010ID1,
                    00000010101010ID2
          ],
          "owner": "datamonster@amplitude.com",
          "published": true
        }'

        ```

    === "HTTP"

        ```bash
        POST /api/3/cohorts/upload HTTP/1.1
        Host: amplitude.com
        Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
        Authorization: Basic {{api-key}}:{{secret-key}} #credentials must be base64 encoded
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
| `name` | <span class="required">Required</span>. String. A name for the cohort. |
| `app_id` | <span class="required">Required</span>. Integer. An identifier for the Amplitude project containing the cohort. |
| `id_type` | <span class="required">Required</span>. String. The kind of ID sent in the ids field. Valid options are `BY_AMP_ID` or `BY_USER_ID`. |
| `ids` | <span class="required">Required</span>. String\[\]. One or more user or Amplitude IDs to include in the cohort. Specify the ID type in the `id_type` field. |
| `owner` | <span class="required">Required</span>. String. The login email of the cohort's owner in Amplitude. |
| `published` | <span class="required">Required</span>. Boolean. Whether the cohort is discoverable or hidden. |
| `existing_cohort_id` | <span class="optional">Optional</span>. String. The ID of an existing cohort. This replaces the contents for the specified cohort with the IDs uploaded in the request. For example, '1a2bc3d' is your cohort's ID, found in the cohort's URL. `https//analytics.amplitude.com/accountname/cohort/**1a2bc3d**`|

### Upload cohort response

The response is a JSON object with this schema:

```json
{
    "cohort_id": "COHORT_ID"
}
```

## Update cohort membership

Add and remove IDs to incrementally update existing cohort membership.

=== "cURL"

    ```bash
    curl --location --request POST 'https://amplitude.com/api/3/cohorts/membership' \
    --header 'Content-Type: application/json' \
    -u '{api_key}:{secret_key}' \
    --data-raw '{
    "cohort_id":"COHORT_ID",
    "memberships": [
      {
          "ids" : ["ID",”ID”],
          "id_type" : "BY_ID",
          "operation" : "ADD"
        },
        {
          "ids" : ["ID","ID"],
          "id_type" : "BY_ID",
          "operation" : "REMOVE"
        },
        {
          "ids" : ["name",name],
          "id_type" : "BY_NAME",
          "operation" : "ADD"
        }
      ],
    "skip_invalid_ids":true,'
    ```

=== "HTTP"

    ```bash

    POST /api/3/cohorts/membership HTTP/1.1
    Host: amplitude.com
    Content-Type: application/json
    Authorization: Basic {{api-key}}:{{secret-key}} #credentials must be base64 encoded
    Content-Length: 362

    {
    "cohort_id":"COHORT_ID",
    "memberships": [
      {
          "ids" : ["ID",ID],
          "id_type" : "BY_ID",
          "operation" : "ADD"
        },
        {
          "ids" : ["ID",ID],
          "id_type" : "BY_ID",
          "operation" : "REMOVE"
        },
        {
          "ids" : ["name","name"],
          "id_type" : "BY_NAME",
          "operation" : "ADD"
        }
      ],
    "skip_invalid_ids":true,
    }
    ```

???code-example "Example: Remove and add cohort members"

    This example adds IDs `111` and `222` by ID, removes IDs `333` and `444` by ID, and removes IDs `asd` and `qwe` by name from the the cohort with ID `1a2bc3d`. The operation is set to skip invalid IDs.

    === "cURL"

        ```bash
        curl --location --request POST 'https://amplitude.com/api/3/cohorts/membership' \
        --header 'Content-Type: application/json' \
        --header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=' \
        --data-raw '{
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
        "skip_invalid_ids":true,'
        ```

    === "HTTP"

        ```bash

        POST /api/3/cohorts/membership HTTP/1.1
        Host: amplitude.com
        Content-Type: application/json
        Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
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
| `cohort_id` | <span class="required">Required</span>. String. The ID of an existing cohort. This updates the membership for the specified cohort with the IDs being uploaded in this request. |
| `count_group` | <span class="optional">Optional</span>. String. The count group of the given IDs. This must be the same as the cohort’s existing count group. `Count_group` defaults to User. |
| `memberships` | <span class="required">Required</span>. List of [membership json](https://developers.amplitude.com/docs/behavioral-cohorts-api#membershipjson) An array of JSON objects identifying IDs to add or remove. |
| `skip_invalid_ids` | <span class="optional">Optional</span>. Boolean. Setting this parameter to `false` ends the request without updating cohort membership if the request has invalid IDs. Setting `skip_invalid_ids` to `true` skips invalid IDs while applying the remaining valid ids. Default is `true`. |

## Update cohort membership request membership JSON

| Parameter | Description |
| --- | --- |
| `ids` | <span class="required">Required</span>. String\[\]. List of IDs to add or remove. |
| `id_type` | <span class="required">Required</span>. String. The kind of ID sent in the `ids` field. Valid options are: *\- BY_ID* *\- BY_NAME* For User `count_group`, BY_ID is amplitude ID and BY_NAME is user ID. For any other `count_group`, `BY_ID` is group ID and `BY_NAME` is group name. |
| `operation` | <span class="required">Required</span>. String. The operation to apply on `ids` field. Valid options are: `ADD` and `REMOVE` |

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
