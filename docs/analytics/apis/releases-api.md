---
title: Releases API
description: Programmatically create releases in Amplitude using the Releases API.
---

Use the Releases API to programmatically create releases. Integrate this API into your deployment workflows so you can document the product changes your team introduces.

--8<-- "includes/postman.md"

--8<-- "includes/auth-basic.md"

## Endpoints

| Region | Endpoint |
| --- | --- |
| Standard Server | [https://amplitude.com/api/2/release](https://amplitude.com/api/2/release) |
| EU Residency Server | [https://analytics.eu.amplitude.com/api/2/release](https://analytics.eu.amplitude.com/api/2/release) |

## Create a release

`https://amplitude.com/api/2/release`

You can send the release's parameters as a JSON payload, or query parameters.

=== "Query parameter example"

    ```bash
    POST /api/2/release?version=2.2&release_start=2022-01-01 00:00:00&release_end=2022-01-01 00:00:00&title=New Feature&description=Releasing the new paid feature. &platforms=iOS&created_by=&chart_visibility=true HTTP/1.1
    Host: amplitude.com
    Authorization: Basic {{api-key}}:{{secret-key}}
    ```
=== "JSON payload example"

    ```bash
    POST /api/2/release HTTP/1.1
    Host: amplitude.com
    Authorization: Basic {{api-key}}:{{secret-key}}
    Content-Type: application/json
    Content-Length: 260


    {
      "chart_visibility": "true",
      "created_by": "User",
      "description": "Releasing the new paid feature. ",
      "platforms": "iOS",
      "release_end": "2022-01-01 00:00:00",
      "release_start": "2022-01-01 00:00:00",
      "title": "Big new feature",
      "version": "3.5"
    }
    ```

### Release parameters

|<div class="big-column">Name</div>|Description|
|----|-------|
|`version`|<span class="required">Required</span>. The version of your product corresponding to this release.|
|`release_start`| <span class="required">Required</span>. Timestamp corresponding to the start of this release in UTC. Must be in this format: `yyyy-MM-dd HH:mm:ss`.|
|`release_end`| <span class="optional">Optional</span>. Timestamp corresponding to the end of this release in UTC. Must be in this format: `yyyy-MM-dd HH:mm:ss`.|
|`title`|<span class="required">Required</span>. A name for the release.|
|`description`|<span class="optional">Optional</span>. A description for the release.|
|`platforms`|<span class="optional">Optional</span>. A list of platforms for this release.|
|`created_by`| <span class="optional">Optional</span>. Name of the user creating the release, as a string.|
|`chart_visibility`| <span class="optional">Optional</span>. Defaults to true. When true, indicates that this release should show up on charts as an annotation.|

## Response

A successful request returns a JSON response with the release's information.

```json
{
    "success": true,
    "release": {
        "id": "xbcehyc",
        "app_id": 50000,
        "org_id": 10001,
        "version": "3.5",
        "release_start": "2022-01-01 00:00:00",
        "release_end": "2022-01-01 00:00:00",
        "type": "integration",
        "title": "Big new feature for iOS",
        "description": "Releasing the new paid feature. ",
        "platforms": [
            "iOS"
        ],
        "chart_visibility": true,
        "params": {
            "created": 1646324226364,
            "created_by": "A User",
            "last_modified": 1646324226364,
            "last_modified_by": "A User"
        }
    }
}
```

## Status codes

|Code|Message|
|----|------|
|200|Success|
|400|Bad Request. Check the message for details.|
