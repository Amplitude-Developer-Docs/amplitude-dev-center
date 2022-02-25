---
title: Behavioral Cohorts API
description: Use the Behavioral Cohorts API to list all your cohorts in Amplitude, export a cohort in Amplitude, or upload a cohort.
---

Use the Behavioral Cohorts API to list all your cohorts in Amplitude, export a cohort in Amplitude, or upload a cohort. 


--8<-- "includes/postman.md"

--8<-- "includes/basic-auth-section.md"

## Endpoints

| Region | Endpoint |
| --- | --- |
| Standard Server | [https://amplitude.com/api/3/cohorts](https://amplitude.com/api/3/cohorts) |
| EU Residency Server | [https://analytics.eu.amplitude.com/api/3/cohorts](https://analytics.eu.amplitude.com/api/3/cohorts) |

## Considerations

- The Behavioral Cohorts Download API is capped at 500 requests per month on Growth and Enterprise Plans.
- Export size for cohorts is limited to 10 million users.
- There's a concurrency limit of 5 requests across cohort downloads and our Dashboard REST API.
- Cohort Download uses an asynchronous API. Getting a cohort happens in three steps:
  1. Request a single cohort.
  2. Poll the cohort status.
  3. Download the file.

## Get all cohorts

Get all discoverable cohorts for an app. Use the `id` for each cohort returned in the response to get a single cohort.

```http
GET /api/3/cohorts HTTP/1.1
Host: amplitude.com
Authorization: Basic {{api_key}}:{{secret:key}}
```

### Response

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

This is step one in the download a cohort operation. The `request_id` returned in the response is used to poll export status.

```http
GET /api/5/cohorts/request/id HTTP/1.1
Host: amplitude.com
Authorization: Basic {{api_key}}:{{secret:key}}
```

### Path variables

|Name|Description|
|----|-----------|
|`id`|Required. Cohort ID.|


### Query parameters
| Name|Description|
|----|-----|
|`props`|Optional. Integer. Set to 1 to include user properties in the response object in addition to Amplitude IDs and user IDs.|
|`propKeys`|Optional. string[]. One or more user properties to include in the response. If left undefined and props=1, response object returns ALL available user properties.|

