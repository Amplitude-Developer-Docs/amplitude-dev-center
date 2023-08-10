---
title: Management API Flag Endpoints
---

| <div class="big-column">Name</div> | Description |
| --- | --- |
| [List](#list) | List of flags including their configuration details. |
| [Get details](#get-details) | Get the configuration details of a flag. |
| [List versions](#list-versions) | List all versions for a flag. |
| [Get version details](#get-version-details) | Get a specific version for a flag. |
| [List variants](#list-variants) | List all variants for a flag. |
| [Get variant details](#get-variant-details) | Get a specific variant for a flag. |
| [Get variant inclusions](#get-variant-inclusions) | Get all inclusions (users) for a variant. |
| [Create variant](#create-variant) | Create a new variant for a flag. |
| [Edit variant](#edit-variant) | Edit a variant for a flag. |
| [Remove variant](#remove-variant) | Remove a variant from a flag. |
| [Add users to variant](#add-users-to-variant) | Add users to flag's variant. |
| [Remove users from variant](#remove-users-from-variant) | Remove users from flag's variant. |
| [Remove all users from variant](#remove-all-users-from-variant) | Remove all users from flag's variant. |
| [List deployments](#list-deployments) | List all deployments for a flag. |
| [Create deployment](#create-deployment) | Add a deployment for a flag. |
| [Remove deployment](#remove-deployment) | Remove a deployment from a flag. |
| [Edit](#edit) | Edit flag. |
| [Create](#create) | Create a new flag. |

------

## List

```bash
GET https://experiment.amplitude.com/api/1/flags
```

Fetch a list of flags including their configuration details. Results are ordered with the most recently created items first.

### Query parameters

| Name| Description |
| --- | --- |
| `limit` | The max number of flags to be returned. Capped at 1000. |
| `cursor` | The offset to start the "page" of results from. |

### Response

A successful request returns a `200 OK` response and a list of flags encoded as JSON in the response body.

!!!example "Example cURL"
    ```bash
    curl --request GET \
    --url 'https://experiment.amplitude.com/api/1/flags?limit=1000' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer <management-api-key>'
    ```

???example "Flag examples"
    === "Response example"
        ```bash
        {
            "flags": [
                {
                    "id": <id>,
                    "projectId": <projectId>,
                    "deployments": [<deploymentId>],
                    "key": "flag-key",
                    "name": "flag-name",
                    "description": "description",
                    "enabled": false,
                    "evaluationMode": "remote",
                    "bucketingKey": "amplitude_id",
                    "bucketingSalt": <bucketingSalt>,
                    "bucketingUnit": "User",
                    "variants": [
                        {
                            "key": "on"
                        }
                    ],
                    "rolloutPercentage": 0,
                    "rolloutWeights": {
                        "on": 1
                    },
                    "targetSegments": [
                        {
                            "name": "Segment 1",
                            "conditions": [
                                {
                                    "prop": "city",
                                    "op": "is",
                                    "type": "property",
                                    "values": []
                                }
                            ],
                            "percentage": 0,
                            "bucketingKey": "amplitude_id",
                            "rolloutWeights": {
                                "on": 1
                            }
                        }
                    ]
                }
            ],
            "nextCursor": <cursorId>
        }
        ```

------

## Get details

```bash
GET https://experiment.amplitude.com/api/1/flags/<id>
```

Fetch the configuration details of a flag.

### Path variables

| Name | Description |
|---|----|
|`id`| Required. String. Flag's ID.|

### Response

A successful request returns a `200 OK` response and a JSON object with the flag's details.

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://experiment.amplitude.com/api/1/flags/<id>' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

???example "Flag examples"
    === "Response example"
        ```bash
        {
            "id": <id>,
            "projectId": <projectId>,
            "deployments": [<deploymentId>],
            "key": "flag-key",
            "name": "flag-key",
            "description": "feature flag access",
            "enabled": true,
            "evaluationMode": "remote",
            "bucketingKey": "amplitude_id",
            "bucketingSalt": "mHdQDzeE",
            "bucketingUnit": "User",
            "variants": [
                {
                    "key": "on"
                }
            ],
            "rolloutPercentage": 0,
            "rolloutWeights": {
                "on": 1
            },
            "targetSegments": [
                {
                    "name": "Segment 1",
                    "conditions": [
                        {
                            "prop": "country",
                            "op": "is",
                            "type": "property",
                            "values": [
                                "United States"
                            ]
                        }
                    ],
                    "percentage": 0,
                    "bucketingKey": "amplitude_id",
                    "rolloutWeights": {
                        "on": 1
                    }
                }
            ],
            "deleted": false
        }
        ```

------

## List versions

```bash
GET https://experiment.amplitude.com/api/1/flags/{id}/versions
```

Fetch a list of all versions for a flag.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Flag's ID.|

### Response

A successful request returns a `200 OK` response and a list of flag's versions encoded as an array of JSON objects in the response body. Versions are sorted in a descending order.

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://experiment.amplitude.com/api/1/flags/<id>/versions' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

???example "Flag examples"
    === "Response example"
    ```bash
    [
        {
            "createdAt": "2023-07-29T03:32:49.594Z",
            "createdBy": <userId>,
            "version": 3,
            "flagConfig": {
                "id": <id>,
                "projectId": <projectId>,
                "deployments": [<deploymentId>],
                "key": "flag-key",
                "name": "flag-key",
                "description": "feature flag access",
                "enabled": true,
                "evaluationMode": "remote",
                "bucketingKey": "amplitude_id",
                "bucketingSalt": "mHdQDzeE",
                "bucketingUnit": "User",
                "variants": [
                    {
                        "key": "on"
                    }
                ],
                "rolloutPercentage": 0,
                "rolloutWeights": {
                    "on": 1
                },
                "targetSegments": [
                    {
                        "name": "Segment 1",
                        "conditions": [
                            {
                                "prop": "country",
                                "op": "is",
                                "type": "property",
                                "values": [
                                    "United States"
                                ]
                            }
                        ],
                        "percentage": 0,
                        "bucketingKey": "amplitude_id",
                        "rolloutWeights": {
                            "on": 1
                        }
                    }
                ]
            }
        },
        {
            "createdAt": "2023-07-29T03:32:39.494Z",
            "createdBy": <userId>,
            "version": 2,
            "flagConfig": {
                "id": <id>,
                "projectId": <projectId>,
                "deployments": [<deploymentId>],
                "key": "flag-key",
                "name": "flag-key",
                "description": "feature flag access",
                "enabled": false,
                "evaluationMode": "remote",
                "bucketingKey": "amplitude_id",
                "bucketingSalt": "mHdQDzeE",
                "bucketingUnit": "User",
                "variants": [
                    {
                        "key": "on"
                    }
                ],
                "rolloutPercentage": 0,
                "rolloutWeights": {
                    "on": 1
                },
                "targetSegments": [
                    {
                        "name": "Segment 1",
                        "conditions": [
                            {
                                "prop": "country",
                                "op": "is",
                                "type": "property",
                                "values": [
                                    "United States"
                                ]
                            }
                        ],
                        "percentage": 0,
                        "bucketingKey": "amplitude_id",
                        "rolloutWeights": {
                            "on": 1
                        }
                    }
                ]
            }
        },
        {
            "createdAt": "2023-07-29T03:30:45.703Z",
            "createdBy": <userId>,
            "version": 1,
            "flagConfig": {
                "id": <id>,
                "projectId": <projectId>,
                "deployments": [],
                "key": "flag-key",
                "name": "flag-key",
                "description": "",
                "enabled": false,
                "evaluationMode": "remote",
                "bucketingKey": "amplitude_id",
                "bucketingSalt": "mHdQDzeE",
                "bucketingUnit": "User",
                "variants": [
                    {
                        "key": "on"
                    }
                ],
                "rolloutPercentage": 0,
                "rolloutWeights": {
                    "on": 1
                },
                "targetSegments": []
            }
        }
    ]
    ```

------

## Get version details

```bash
GET https://experiment.amplitude.com/api/1/flags/{id}/versions/{versionId}
```

Fetch details of a specific version of a flag.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Flag's ID.|
|`versionId`| Required. String. The version's ID.|

### Response

A successful request returns a `200 OK` response and a JSON object with details of the version.

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://experiment.amplitude.com/api/1/flags/<id>/versions/<versionId>' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

???example "Flag examples"
    === "Response example"
        ```bash
        {
            "createdAt": "2023-07-29T03:32:49.594Z",
            "createdBy": <userId>,
            "version": 3,
            "flagConfig": {
                "id": <id>,
                "projectId": <projectId>,
                "deployments": [<deploymentId>],
                "key": "flag-key",
                "name": "flag-key",
                "description": "feature flag access",
                "enabled": true,
                "evaluationMode": "remote",
                "bucketingKey": "amplitude_id",
                "bucketingSalt": "mHdQDzeE",
                "bucketingUnit": "User",
                "variants": [
                    {
                        "key": "on"
                    }
                ],
                "rolloutPercentage": 0,
                "rolloutWeights": {
                    "on": 1
                },
                "targetSegments": [
                    {
                        "name": "Segment 1",
                        "conditions": [
                            {
                                "prop": "country",
                                "op": "is",
                                "type": "property",
                                "values": [
                                    "United States"
                                ]
                            }
                        ],
                        "percentage": 0,
                        "bucketingKey": "amplitude_id",
                        "rolloutWeights": {
                            "on": 1
                        }
                    }
                ]
            }
        }
        ```

------

## List variants

```bash
GET https://experiment.amplitude.com/api/1/flags/{id}/variants
```

Fetch a list of all variants for a flag.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Flag's ID.|

### Response

A successful request returns a `200 OK` response and a list of variants encoded as an array of JSON objects in the response body.

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://experiment.amplitude.com/api/1/flags/<id>/variants' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

???example "Flag examples"
    === "Response example"
        ```bash
        [
            {
                "key": "on",
                "name": "",
                "payload": {},
                "description": "",
                "rolloutWeight": 1
            }
        ]
      
        ```
------

## Get variant details

```bash
GET https://experiment.amplitude.com/api/1/flags/{id}/variants/{variantKey}
```

Fetch details of a specific variant of a flag.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Flag's ID.|
|`variantKey`| Required. String. The variant's key.|

### Response

A successful request returns a `200 OK` response and a JSON object with details of a flag variant.

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://experiment.amplitude.com/api/1/flags/<id>/variants/<variantKey>' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

???example "Flag examples"
    === "Response example"
        ```bash
        {
            "key": "on",
            "name": "",
            "payload": {},
            "description": "",
            "rolloutWeight": 1
        }
        ```

------

## Get variant inclusions

```bash
GET https://experiment.amplitude.com/api/1/flags/{id}/variants/{variantKey}/users
```

Fetch a list of inclusions for a specific variant of a flag.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Flag's ID.|
|`variantKey`| Required. String. The variant's key.|

### Response

A successful request returns a `200 OK` response and a list of inclusions of flag's variant as an array of JSON objects.

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://experiment.amplitude.com/api/1/flags/<id>/variants/<variantKey>/users' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

???example "Flag examples"
    === "Response example"
        ```bash
        [
            <user>@<your-company-email>,
            <userId>
        ]
        ```

------

## Create variant

```bash
POST https://experiment.amplitude.com/api/1/flags/{id}/variants
```

Create a new variant for a flag

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Flag's ID.|

### Request body

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`key`| Required | string | The variant key. |
|`description`| Optional | string | Description for the variant.|
|`name`| Optional | string | Name for the variant.|
|`payload`| Optional | string | Optional payload. Value must be a valid JSON element.|
|`rolloutWeight`| Optional | number | Rollout weight for non-targeted users.|

### Response

A successful request returns a `200 OK` response and `OK` text.

!!!example "Example cURL"
    ```bash
    curl --request POST \
      --url 'https://experiment.amplitude.com/api/1/flags/<id>/variants' \
      --header 'Content-Type: application/json' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>' \
      --data '{"key":"<key>","name":"<name>","description":"<description>","payload":"<payload>","rolloutWeight":<rolloutWeight>}'
    ```

???example "Flag examples"
    === "Request example"
        ```bash
        {
            "key": "new-variant-key",
            "description": "optional description for variant",
            "name": "optional name for variant",
            "payload": {"variant-payload": "example payload"},
            "rolloutWeight": 0
        }
        ```
    === "Response example"
        ```bash
        OK
        ```

------

## Edit variant

```bash
POST https://experiment.amplitude.com/api/1/flags/<id>/variants/<variantKey>
```

Edit a variant for a flag.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Flag's ID.|
|`variantKey`| Required. String. The variant's key.|

### Request body

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`key`| Optional | string | The variant key. |
|`description`| Optional | string | Description for the variant.|
|`name`| Optional | string | Name for the variant.|
|`payload`| Optional | string | Optional payload. Value must be a valid JSON element.|
|`rolloutWeight`| Optional | number | Rollout weight for non-targeted users.|

### Response

A successful request returns a `200 OK` response and `OK` text.

!!!example "Example cURL"
    ```bash
    curl --request PATCH \
      --url 'https://experiment.amplitude.com/api/1/flags/<id>/variants/<variantKey>' \
      --header 'Content-Type: application/json' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>' \
      --data '{"key":"<key>","name":"<name>","description":"<description>","payload":"<payload>","rolloutWeight":<rolloutWeight>}'
    ```

???example "Flag examples"
    === "Request example"
        ```bash
        {
            "key": "updated-variant-key",
            "description": "updated optional description for variant",
            "name": "optional name for variant",
            "payload": {"variant-payload": "example payload"},
            "rolloutWeight": 0
        }
        ```
    === "Response example"
        ```bash
        OK
        ```

------

## Remove variant

```bash
DELETE https://experiment.amplitude.com/flags/{id}/variants/{variantKey}
```

Remove a variant from a flag.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Flag's ID.|
|`variantKey`| Required. String. The variant's key.|

### Response

A successful request returns a `200 OK` response and `OK` text.

!!!example "Example cURL"
    ```bash
    curl --request DELETE \
      --url 'https://experiment.amplitude.com/api/1/flags/<id>/variants/<variantKey>' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

???example "Flag examples"
    === "Response example"
        ```bash
        OK
        ```

------

## Add users to variant

```bash
POST https://experiment.amplitude.com/api/1/flags/{id}/variants/{variantKey}/users
```

Add inclusions (users or devices) to flag's variant.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Flag's ID.|
|`variantKey`| Required. String. The variant's key.|

### Request body

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`inclusions`| Required | object | Contains an string array of user or device ids. |

### Response

A successful request returns a `200 OK` response and `OK` text.

!!!example "Example cURL"
    ```bash
    curl --request POST \
      --url 'https://experiment.amplitude.com/api/1/flags/<id>/variants/<variantKey>/users' \
      --header 'Content-Type: application/json' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>' \
      --data '{"inclusions":<["id1", "id2", "id3"]>}'
    ```

???example "Flag examples"
    === "Request example"
        ```bash
        {
            "inclusions": [<user1>@<your-company-email>", <user2>@<your-company-email>m <userId>]
        }
        ```
    === "Response example"
        ```bash
        OK
        ```

------

## Remove users from variant

```bash
DELETE https://experiment.amplitude.com/api/1/flags/{id}/variants/{variantKey}/users/{userIndex}
```

Remove inclusions (users or devices) from flag's variant.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Flag's ID.|
|`variantKey`| Required. String. The variant's key.|
|`userIndex`| Required. String. The user's index. Zero-indexed. Index-based array of users can be obtained via [Get variant inclusions](#get-variant-inclusions)

### Response

A successful request returns a `200 OK` response and `OK` text.

#### Flag example request

!!!example "Example cURL"
    ```bash
    curl --request DELETE \
      --url 'https://experiment.amplitude.com/api/1/flags/<id>/variants/<variantKey>/users/<userIndex>' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

???example "Flag examples"
    === "Response example"
        ```bash
        OK
        ```

------

## Remove all users from variant

```bash
DELETE https://experiment.amplitude.com/api/1/flags/{id}/variants/{variantKey}/users
```

Remove all inclusions (users or devices) from flag's variant.

### Path variables

|<div class="big-column">Name</div>|Description|
|---|----|
|`id`| Required. String. Flag's ID.|
|`variantKey`| Required. String. The variant's key.|

### Response

A successful request returns a `200 OK` response and `OK` text.

!!!example "Example cURL"
    ```bash
    curl --request DELETE \
      --url 'https://experiment.amplitude.com/api/1/flags/<id>/variants/<variantKey>/users' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

???example "Flag examples"
    === "Response example"
        ```bash
        OK
        ```

------

## List deployments

```bash
GET https://experiment.amplitude.com/api/1/flags/{id}/deployments
```

List all deployments for a flag.

### Path variables

|<div class="big-column">Name</div>|Description|
|---|----|
|`id`| Required. String. Flag's ID.|

### Response

A successful request returns a `200 OK` response and an array of JSON objects with flag's deployment details.

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://experiment.amplitude.com/api/1/flags/<id>/deployments' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

???example "Flag examples"
    === "Response example"
        ```bash
        [
            {
                "id": <id>,
                "projectId": <projectId>,
                "label": "rest-api",
                "key": <key>,
                "deleted": false
            }
        ]
        ```

------

## Create deployment

```bash
POST https://experiment.amplitude.com/api/1/flags/{id}/deployments
```

Add a deployment for a flag.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The object's ID.|

### Request body

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`deployments`| Required | object | Contains an string array of deployment ids. |

### Response

A successful request returns a `200 OK` response and `OK` text.

!!!example "Example cURL"
    ```bash
    curl --request POST \
      --url 'https://experiment.amplitude.com/api/1/flags/<id>/deployments' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
      --data '{"deployments":[<deploymentId>]}'
    ```

???example "Flag examples"
    === "Request example"
        ```bash
        {
            "deployments": [<deploymentId>]
        }
        ```
    === "Response example"
        ```bash
        OK
        ```

------

## Remove deployment

```bash
DELETE https://experiment.amplitude.com/api/1/flags/{id}/deployments/{deploymentId}
```

Remove a deployment from a flag.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Flag's ID.|
|`deploymentId`| Required. String. The deployment's ID.|

### Response

A successful request returns a `200 OK` response and `OK` text.

!!!example "Example cURL"
    ```bash
    curl --request DELETE \
      --url 'https://experiment.amplitude.com/api/1/flags/<id>/deployments/<deploymentId>' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

------

## Edit

```bash
PATCH https://experiment.amplitude.com/api/1/flags/{id}
```

Edit a flag.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Flag's ID.|

### Request body

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`name`| Optional | string | Name. |
|`description`| Optional | string | Description. |
|`bucketingKey`| Optional | string | The user property to bucket the user by. |
|`bucketingSalt`| Optional | string | Bucketing salt. |
|`bucketingUnit`| Optional | string | Bucketing unit represented by a group type from the accounts add-on. Used for group level bucketing and analysis. |
|`evaluationMode`| Optional | string | Evaluation mode for the flag, either `local` or `remote`. |
|`rolloutPercentage`| Optional | number | Rollout percentage for non-targeted users. Range 0 - 100. |
|`enabled`| Optional | boolean | Property to activate or deactivate flag. |
|`archive`| Optional | boolean | Property to archive or restore flag. |

### Response

A successful request returns a `200 OK` response.

!!!example "Example cURL"
    ```bash
    curl --request PATCH \
      --url 'https://experiment.amplitude.com/api/1/flags/<id>' \
      --header 'Content-Type: application/json' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>' \
      --data '{"enabled":<enabled>,"rolloutPercentage":<rolloutPercentage>}'
    ```

???example "Flag examples"
    === "Request example"
        ```bash
        {
            "name": "updated name",
            "description": "updated description",
            "bucketingKey": "amplitude_id",
            "bucketingSalt": <bucketingSalt>,
            "bucketingUnit": "org id",
            "evaluationMode": "remote",
            "rolloutPercentage": 0,
            "enabled": false
        }
        ```

------

## Create

```bash
POST https://experiment.amplitude.com/flags
```

Create a new flag.

### Request body

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`projectId`| Required | string | The project's ID. |
|`key`| Required | string | The flag key. |
|`name`| Optional | string | The flag name. |
|`description`| Optional | string | Description for the flag.|
|`variants`| Optional | object array | Array of [`variants`](#variants). |
|`bucketingKey`| Optional | string | The user property to bucket the user by. |
|`rolloutWeights`| Optional | object | Rollout weights for non-targeted users. The object should be a mapping from variant key to rollout weight as an integer. For example: `{ "control": 1, "treatment": 1 }`. |
|`targetSegments`| Optional | object | See the [`targetSegments`](#targetsegments) table for more information. |
|`deployments`| Optional | string array | Array of deployments that the flag should be assigned to. |
|`evaluationMode`| Optional | string | Experiment evaluation mode; options include `remote` or `local`. |

#### `variants`

The `variants` field contains these objects.

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`key`| Required | string | The key (a.k.a value) of the variant. |
|`payload`| Optional | string | Optional payload. Value must be a valid JSON element. |
|`name`| Optional | string | The variant name. |
|`description`| Optional | string | The variant description. |

#### `targetSegments`

The `targetSegments` field contains these objects.

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`name`|Optional | string | The segment name. |
|`conditions`| Required | object array | Array of [`conditions`](#conditions). |
|`percentage`| Optional | number | The allocation percentage for users who match a condition. |
|`rolloutWeights`| Optional | object | A map from variant key to rollout weight. For example: `{ "control": 1, "treatment": 1 }`. |

#### `conditions`

The `conditions` field contains these objects.

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`type`| Required | string | **Must have value: `property`** |
|`prop`| Required | string | The property to use in the condition. |
|`op`| Required | string | The [operation](#op) to use in this condition. |
|`values`| Required | string array | The values to use in the operation. |

#### `op`

A string value representing operations on a property value. Possible values are:

- `is`
- `is not`
- `contains`
- `does not contain`
- `less`
- `less or equal`
- `greater`
- `greater or equal`
- `glob match`
- `glob does not match`

### Response

A successful request returns a `200 OK` response and a JSON object with the flag's id and url.

!!!example "Example cURL"
    ```bash
    curl --request POST \
      --url 'https://experiment.amplitude.com/flags' \
      --header 'Content-Type: application/json' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>' \
      --data '{"projectId":"<projectId>","key":"<key>"}'
    ```

???example "Flag examples"
    === "Request example"
        ```bash
        {
            "projectId":"<projectId>",
            "name": "Analyze button clicks",
            "key": "analyze-button-clicks",
            "description": "analyze button clicks on the main page",
            "variants": [
                {
                    "key": "on"
                }
            ],
            "rolloutWeights": {"on": 1},
            "targetSegments": [
                {
                    "name": "Segment 1",
                    "conditions": [
                        {
                            "prop": "country",
                            "op": "is",
                            "type": "property",
                            "values": [
                                "United States"
                            ]
                        }
                    ],
                    "percentage": 0,
                    "bucketingKey": "amplitude_id",
                    "rolloutWeights": {
                        "on": 1
                    }
                }
            ],
            "deployments": [<deploymentId>],
            "evaluationMode": "remote"
        }
        ```
    === "Response example"
        ```bash
        {
            "id": <id>,
            "url": "http://experiment.amplitude.com/amplitude/<projectId>/config/<id>"
        }
        ```
