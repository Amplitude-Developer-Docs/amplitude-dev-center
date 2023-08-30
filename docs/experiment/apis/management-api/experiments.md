---
title: Management API Experiment Endpoints
---

| <div class="big-column">Name</div> | Description |
| --- | --- |
| [List](#list) | List of experiments including their configuration details. |
| [Get details](#get-details) | Get the configuration details of an experiment. |
| [List versions](#list-versions) | List all versions for an experiment. |
| [Get version details](#get-version-details) | Get a specific version for an experiment. |
| [List variants](#list-variants) | List all variants for an experiment. |
| [Get variant details](#get-variant-details) | Get a specific variant for an experiment. |
| [Get variant inclusions](#get-variant-inclusions) | Get all inclusions (users) for a variant. |
| [Create variant](#create-variant) | Create a new variant for an experiment. |
| [Edit variant](#edit-variant) | Edit a variant for an experiment. |
| [Remove variant](#remove-variant) | Remove a variant from an experiment. |
| [Add users to variant](#add-users-to-variant) | Add users to experiment's variant. |
| [Remove users from variant](#remove-users-from-variant) | Remove users from experiment's variant. |
| [Remove all users from variant](#remove-all-users-from-variant) | Remove all users from experiment's variant. |
| [List deployments](#list-deployments) | List all deployments for an experiment. |
| [Create deployment](#create-deployment) | Add a deployment for an experiment. |
| [Remove deployment](#remove-deployment) | Remove a deployment from an experiment. |
| [Edit](#edit) | Edit experiment. |
| [Create](#create) | Create a new experiment. |

------

## List

```bash
GET https://experiment.amplitude.com/api/1/experiments
```

Fetch a list of experiments including their configuration details. Results are ordered with the most recently created items first.

### Query parameters

| Name| Description |
| --- | --- |
| `limit` | The max number of experiments to be returned. Capped at 1000. |
| `cursor` | The offset to start the "page" of results from. |

### Response

A successful request returns a `200 OK` response and a list of experiments encoded as JSON in the response body.

!!!example "Example cURL"
    ```bash
    curl --request GET \
    --url 'https://experiment.amplitude.com/api/1/experiments?limit=1000' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer <management-api-key>'
    ```

???example "Example response (click to open)"
    ```bash
    {
        "experiments": [
            {
                "id": <id>,
                "projectId": <projectId>,
                "deployments": [<deploymentId>],
                "key": "experiment-key",
                "name": "experiment-name",
                "decision": null,
                "decisionReason": null,
                "description": "description",
                "enabled": false,
                "evaluationMode": "remote",
                "bucketingKey": "amplitude_id",
                "bucketingSalt": <bucketingSalt>,
                "bucketingUnit": "User",
                "variants": [
                    {
                        "key": "control"
                    },
                    {
                        "key": "treatment"
                    }
                ],
                "rolledOutVariant": null,
                "rolloutPercentage": 10,
                "rolloutWeights": {
                    "control": 1,
                    "treatment": 1
                },
                "targetSegments": [
                    {
                        "name": "Segment 1",
                        "conditions": [
                            {
                                "prop": "device_id",
                                "op": "is",
                                "type": "property",
                                "values": [
                                    "(none)"
                                ]
                            }
                        ],
                        "percentage": 50,
                        "bucketingKey": "amplitude_id",
                        "rolloutWeights": {
                            "control": 1,
                            "treatment": 1
                        }
                    }
                ],
                "stickyBucketing": false,
                "state": "planning",
                "startDate": null,
                "endDate": null,
                "experimentType": "hypothesis-testing"
            },
            "nextCursor": <cursorId>
        ]
    }
    ```

------

## Get details

```bash
GET https://experiment.amplitude.com/api/1/experiments/<id>
```

Fetch the configuration details of an experiment.

### Path variables

| Name | Description |
|---|----|
|`id`| Required. String. Experiment's ID.|

### Response

A successful request returns a `200 OK` response and a JSON object with the experiment's details.

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://experiment.amplitude.com/api/1/experiments/<id>' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

???example "Example response (click to open)"
    ```bash
    {
        "id": <id>,
        "projectId": <projectId>,
        "deployments": [<deploymentId>],
        "key": "experiment-key",
        "name": "experiment-key",
        "decision": null,
        "decisionReason": null,
        "description": "save button color",
        "enabled": true,
        "evaluationMode": "remote",
        "bucketingKey": "amplitude_id",
        "bucketingSalt": <bucketingSalt>,
        "bucketingUnit": "User",
        "variants": [
            {
                "key": "control"
            },
            {
                "key": "treatment"
            }
        ],
        "rolledOutVariant": null,
        "rolloutPercentage": 0,
        "rolloutWeights": {
            "control": 1,
            "treatment": 1
        },
        "targetSegments": [
            {
                "name": "Segment 1",
                "conditions": [
                    {
                        "prop": "city",
                        "op": "is",
                        "type": "property",
                        "values": [
                            "San Francisco"
                        ]
                    }
                ],
                "percentage": 0,
                "bucketingKey": "amplitude_id",
                "rolloutWeights": {
                    "control": 1,
                    "treatment": 1
                }
            }
        ],
        "stickyBucketing": false,
        "state": "running",
        "startDate": "2023-07-29",
        "endDate": null,
        "experimentType": "hypothesis-testing",
        "deleted": false
    }
    ```

------

## List versions

```bash
GET https://experiment.amplitude.com/api/1/experiments/{id}/versions
```

Fetch a list of all versions for an experiment.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Experiment's ID.|

### Response

A successful request returns a `200 OK` response and a list of experiment's versions encoded as an array of JSON objects in the response body. Versions are sorted in a descending order.

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://experiment.amplitude.com/api/1/experiments/<id>/versions' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

???example "Example response (click to open)"
    ```bash
    [
        {
            "createdAt": "2023-07-29T03:30:18.427Z",
            "createdBy": <userId>,
            "version": 3,
            "flagConfig": {
                "id": <id>,
                "projectId": <projectId>,
                "deployments": [<deploymentId>],
                "key": "experiment-key",
                "name": "experiment-key",
                "description": "save button color",
                "enabled": true,
                "bucketingKey": "amplitude_id",
                "variants": [
                    {
                        "key": "control"
                    },
                    {
                        "key": "treatment"
                    }
                ],
                "rolloutWeights": {
                    "control": 1,
                    "treatment": 1
                },
                "targetSegments": [
                    {
                        "name": "Segment 1",
                        "conditions": [
                            {
                                "prop": "city",
                                "op": "is",
                                "type": "property",
                                "values": [
                                    "San Francisco"
                                ]
                            }
                        ],
                        "percentage": 0,
                        "bucketingKey": "amplitude_id",
                        "rolloutWeights": {
                            "control": 1,
                            "treatment": 1
                        }
                    }
                ],
                "stickyBucketing": false,
                "state": "decision-made",
                "startDate": "2023-07-29",
                "endDate": "2023-07-29",
                "experimentType": "hypothesis-testing"
            }
        },
        {
            "createdAt": "2023-07-29T03:26:23.603Z",
            "createdBy": <userId>,
            "version": 2,
            "flagConfig": {
                "id": <id>,
                "projectId": <projectId>,
                "deployments": [],
                "key": "experiment-key",
                "name": "experiment-key",
                "description": "save button color",
                "enabled": false,
                "bucketingKey": "amplitude_id",
                "variants": [
                    {
                        "key": "control"
                    },
                    {
                        "key": "treatment"
                    }
                ],
                "rolloutWeights": {
                    "control": 1,
                    "treatment": 1
                },
                "targetSegments": [],
                "stickyBucketing": false,
                "state": "planning",
                "startDate": null,
                "endDate": null,
                "experimentType": "hypothesis-testing"
            }
        },
        {
            "createdAt": "2023-07-29T03:25:42.236Z",
            "createdBy": <userId>,
            "version": 1,
            "flagConfig": {
                "id": <id>,
                "projectId": <projectId>,
                "deployments": [],
                "key": "experiment-key",
                "name": "experiment-key",
                "description": "",
                "enabled": false,
                "bucketingKey": "amplitude_id",
                "variants": [
                    {
                        "key": "control"
                    },
                    {
                        "key": "treatment"
                    }
                ],
                "rolloutWeights": {
                    "control": 1,
                    "treatment": 1
                },
                "targetSegments": [],
                "stickyBucketing": false,
                "state": "planning",
                "startDate": null,
                "endDate": null,
                "experimentType": "hypothesis-testing"
            }
        }
    ]
    ```

------

## Get version details

```bash
GET https://experiment.amplitude.com/api/1/experiments/{id}/versions/{versionId}
```

Fetch details of a specific version of an experiment.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Experiment's ID.|
|`versionId`| Required. String. The version's ID.|

### Response

A successful request returns a `200 OK` response and a JSON object with details of the version.

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://experiment.amplitude.com/api/1/experiments/<id>/versions/<versionId>' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

???example "Example response (click to open)"
    ```bash
    {
        "createdAt": "2023-07-29T03:30:18.427Z",
        "createdBy": <userId>,
        "version": 3,
        "flagConfig": {
            "id": <id>,
            "projectId": <projectId>,
            "deployments": [<deploymentId>],
            "key": "experiment-key",
            "name": "experiment-key",
            "description": "save button color",
            "enabled": true,
            "bucketingKey": "amplitude_id",
            "variants": [
                {
                    "key": "control"
                },
                {
                    "key": "treatment"
                }
            ],
            "rolloutWeights": {
                "control": 1,
                "treatment": 1
            },
            "targetSegments": [
                {
                    "name": "Segment 1",
                    "conditions": [
                        {
                            "prop": "city",
                            "op": "is",
                            "type": "property",
                            "values": [
                                "San Francisco"
                            ]
                        }
                    ],
                    "percentage": 0,
                    "bucketingKey": "amplitude_id",
                    "rolloutWeights": {
                        "control": 1,
                        "treatment": 1
                    }
                }
            ],
            "stickyBucketing": false,
            "state": "decision-made",
            "startDate": "2023-07-29",
            "endDate": "2023-07-29",
            "experimentType": "hypothesis-testing"
        }
    }
    ```

------

## List variants

```bash
GET https://experiment.amplitude.com/api/1/experiments/{id}/variants
```

Fetch a list of all variants for an experiment.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Experiment's ID.|

### Response

A successful request returns a `200 OK` response and a list of variants encoded as an array of JSON objects in the response body.

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://experiment.amplitude.com/api/1/experiments/<id>/variants' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```
???example "Example response (click to open)"
    ```bash
    [
        {
            "key": "control",
            "name": "",
            "payload": {},
            "description": "",
            "rolloutWeight": 1
        },
        {
            "key": "treatment",
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
GET https://experiment.amplitude.com/api/1/experiments/{id}/variants/{variantKey}
```

Fetch details of a specific variant of an experiment.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Experiment's ID.|
|`variantKey`| Required. String. The variant's key.|

### Response

A successful request returns a `200 OK` response and a JSON object with details of experiment variant.

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://experiment.amplitude.com/api/1/experiments/<id>/variants/<variantKey>' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

???example "Example response (click to open)"
    ```bash
    {
        "key": "control",
        "name": "",
        "payload": {},
        "description": "",
        "rolloutWeight": 1
    }
    ```

------

## Get variant inclusions

```bash
GET https://experiment.amplitude.com/api/1/experiments/{id}/variants/{variantKey}/users
```

Fetch a list of inclusions for a specific variant of an experiment.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Experiment's ID.|
|`variantKey`| Required. String. The variant's key.|

### Response

A successful request returns a `200 OK` response and a list of inclusions of experiment's variant as an array of JSON objects.

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://experiment.amplitude.com/api/1/experiments/<id>/variants/<variantKey>/users' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

???example "Example response (click to open)"
    ```bash
    [
        <user>@<your-company-email>,
        <userId>
    ]
    ```

------

## Create variant

```bash
POST https://experiment.amplitude.com/api/1/experiments/{id}/variants
```

Create a new variant for an experiment.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Experiment's ID.|

### Request body

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`key`| Required | string | The variant key. |
|`description`| Optional | string | Description for the variant.|
|`name`| Optional | string | Name for the variant.|
|`payload`| Optional | string | Optional payload. Value must be a valid JSON element.|
|`rolloutWeight`| Optional | number | Rollout weight for non-targeted users.|

???example "Example request (click to open)"
    ```bash
    {
        "key": "new-variant-key",
        "description": "optional description for variant",
        "name": "optional name for variant",
        "payload": {"variant-payload": "example payload"},
        "rolloutWeight": 0
    }
    ```

### Response

A successful request returns a `200 OK` response and `OK` text.

!!!example "Example cURL"
    ```bash
    curl --request POST \
      --url 'https://experiment.amplitude.com/api/1/experiments/<id>/variants' \
      --header 'Content-Type: application/json' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>' \
      --data '{"key":"<key>","name":"<name>","description":"<description>","payload":"<payload>","rolloutWeight":<rolloutWeight>}'
    ```

------

## Edit variant

```bash
PATCH https://experiment.amplitude.com/api/1/experiments/<id>/variants/
```

Edit a variant for an experiment.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Experiment's ID.|
|`variantKey`| Required. String. The variant's key.|

### Request body

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`key`| Optional | string | The variant key. |
|`description`| Optional | string | Description for the variant.|
|`name`| Optional | string | Name for the variant.|
|`payload`| Optional | string | Optional payload. Value must be a valid JSON element.|
|`rolloutWeight`| Optional | number | Rollout weight for non-targeted users.|

???example "Example request (click to open)"
    ```bash
    {
        "key": "updated-variant-key",
        "description": "updated-optional description for variant",
        "name": "optional name for variant",
        "payload": {"variant-payload": "example payload"},
        "rolloutWeight": 10
    }
    ```

### Response

A successful request returns a `200 OK` response and `OK` text.

!!!example "Example cURL"
    ```bash
    curl --request PATCH \
      --url 'https://experiment.amplitude.com/api/1/experiments/<id>/variants/<variantKey>' \
      --header 'Content-Type: application/json' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>' \
      --data '{"key":"<key>","name":"<name>","description":"<description>","payload":"<payload>","rolloutWeight":<rolloutWeight>}'
    ```

------

## Remove variant

```bash
DELETE https://experiment.amplitude.com/experiments/{id}/variants/{variantKey}
```

Remove a variant from an experiment.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Experiment's ID.|
|`variantKey`| Required. String. The variant's key.|

### Response

A successful request returns a `200 OK` response and `OK` text.

!!!example "Example cURL"
    ```bash
    curl --request DELETE \
      --url 'https://experiment.amplitude.com/api/1/experiments/<id>/variants/<variantKey>' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

------

## Add users to variant

```bash
POST https://experiment.amplitude.com/api/1/experiments/{id}/variants/{variantKey}/users
```

Add inclusions (users or devices) to experiment's variant.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Experiment's ID.|
|`variantKey`| Required. String. The variant's key.|

???example "Example request (click to open)"
    ```bash
    {
        "inclusions": [<user1>@<your-company-email>", <user2>@<your-company-email>m <userId>]
    }
    ```

### Request body

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`inclusions`| Required | object | Contains an string array of user or device ids. |

### Response

A successful request returns a `200 OK` response and `OK` text.

!!!example "Example cURL"
    ```bash
    curl --request POST \
      --url 'https://experiment.amplitude.com/api/1/experiments/<id>/variants/<variantKey>/users' \
      --header 'Content-Type: application/json' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>' \
      --data '{"inclusions":<["id1", "id2", "id3"]>}'
    ```

------

## Remove users from variant

```bash
DELETE https://experiment.amplitude.com/api/1/experiments/{id}/variants/{variantKey}/users/{userIndex}
```

Remove inclusions (users or devices) from experiment's variant.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Experiment's ID.|
|`variantKey`| Required. String. The variant's key.|
|`userIndex`| Required. String. The user's index. Zero-indexed. Index-based array of users can be obtained via [Get variant inclusions](#get-variant-inclusions)

### Response

A successful request returns a `200 OK` response and `OK` text.

!!!example "Example cURL"
    ```bash
    curl --request DELETE \
      --url 'https://experiment.amplitude.com/api/1/experiments/<id>/variants/<variantKey>/users/<userIndex>' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

------

## Remove all users from variant

```bash
DELETE https://experiment.amplitude.com/api/1/experiments/{id}/variants/{variantKey}/users
```

Remove all inclusions (users or devices) from experiment's variant.

### Path variables

|<div class="big-column">Name</div>|Description|
|---|----|
|`id`| Required. String. The object's ID.|
|`variantKey`| Required. String. The variant's key.|

### Response

A successful request returns a `200 OK` response and `OK` text.

!!!example "Example cURL"
    ```bash
    curl --request DELETE \
      --url 'https://experiment.amplitude.com/api/1/experiments/<id>/variants/<variantKey>/users' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

------

## List deployments

```bash
GET https://experiment.amplitude.com/api/1/experiments/{id}/deployments
```

List all deployments for an experiment.

### Path variables

|<div class="big-column">Name</div>|Description|
|---|----|
|`id`| Required. String. Experiment's ID.|

### Response

A successful request returns a `200 OK` response and an array of JSON objects with experiment's deployment details.

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://experiment.amplitude.com/api/1/experiments/<id>/deployments' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

???example "Example response (click to open)"
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
POST https://experiment.amplitude.com/api/1/experiments/{id}/deployments
```

Add a deployment for an experiment.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Experiment's ID.|

### Request body

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`deployments`| Required | object | Contains an string array of deployment ids. |

???example "Example request (click to open)"
    ```bash
    {
        "deployments": [<deploymentId>]
    }
    ```

### Response

A successful request returns a `200 OK` response and `OK` text.

!!!example "Example cURL"
    ```bash
    curl --request POST \
      --url 'https://experiment.amplitude.com/api/1/experiments/<id>/deployments' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
      --data '{"deployments":[<deploymentId>]}'
    ```

------

## Remove deployment

```bash
DELETE https://experiment.amplitude.com/api/1/experiments/{id}/deployments/{deploymentId}
```

Remove a deployment from an experiment.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Experiment's ID.|
|`deploymentId`| Required. String. The deployment's ID.|

### Response

A successful request returns a `200 OK` response and `OK` text.

!!!example "Example cURL"
    ```bash
    curl --request DELETE \
      --url 'https://experiment.amplitude.com/api/1/experiments/<id>/deployments/<deploymentId>' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

------

## Edit

```bash
PATCH https://experiment.amplitude.com/api/1/experiments/{id}
```

Edit an experiment.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. Experiment's ID.|

### Request body

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`name`| Optional | string | Name. |
|`description`| Optional | string | Description. |
|`bucketingKey`| Optional | string | The user property to bucket the user by. |
|`bucketingSalt`| Optional | string | Bucketing salt. |
|`bucketingUnit`| Optional | string | Bucketing unit represented by a group type from the accounts add-on. Used for group level bucketing and analysis. |
|`evaluationMode`| Optional | string | Evaluation mode for the experiment, either `local` or `remote`. |
|`rolloutPercentage`| Optional | number | Rollout percentage for non-targeted users. Range 0 - 100. |
|`enabled`| Optional | boolean | Property to activate or deactivate experiment. |
|`archive`| Optional | boolean | Property to archive or unarchive experiment. |
|`experimentType`| Optional | string | Experiment type, options include `no-harm` or `hypothesis-testing`. |
|`stickyBucketing`| Optional | boolean | If true, the experiment uses [sticky bucketing](../../general/evaluation/implementation.md#sticky-bucketing). |
|`startDate`| Optional | string | Start date of the experiment in ISO 8601 format. |
|`endDate`| Optional | string | End date of the experiment in ISO 8601 format. End date can be null. |
|`exposureEvent`| Optional | object | See the [`exposureEvent`](#exposureevent) table for more information. If set to null, the Amplitude Exposure Event will be used. |
|`tags` | Optional | string array | A list of tags for the experiment. Tags are added and deleted by the same operation. If you would like to add new tags to the existing ones, you should fetch a list of all experiment tags first.

#### `exposureEvent` 

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`event_type`| Required | string | Event type. |
|`filters`| Required | object array | A list of property filters. See the [`filters`](#filters) table for more information. |

#### `filters`

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`group_type`| Optional | string | Group type of the filter; can be null. Can be `User` value or one of the group values, eg `org _id`, `org name` |
|`subprop_key`| Required | string | Filter's key; can be null. |
|`subprop_op`| Required | string | The [operation](#subprop_op) to use in this filter. |
|`subprop_type`| Required | string | Either `event`, `user` or `group` indicating that the property is either an event, user or group property, respectively. |
|`subprop_value`| Required | string array | A list of values to filter the event property by. |

#### `subprop_op`

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

???example "Example request (click to open)"
    ```bash
    {
        "name": "updated name",
        "description": "updated description",
        "bucketingKey": "amplitude_id",
        "bucketingSalt": <bucketingSalt>,
        "evaluationMode": "remote",
        "rolloutPercentage": 0,
        "enabled": true,
        "experimentType": "no-harm",
        "stickyBucketing": false,
        "startDate": "2023-07-31T10:26:00.996Z",
        "endDate": "2023-09-23T10:26:00.996Z",
        "tags": ["prod", "staging"],
        "exposureEvent": {
            "event_type": "_active",
            "filters": [
                {
                    "group_type": "User",
                    "subprop_key": "amplitude_day_of_week",
                    "subprop_op": "is",
                    "subprop_type": "day_time_prop",
                    "subprop_value": [
                        "Tuesday"
                    ]
                }
            ]
        }
    }
    ```

### Response

A successful request returns a `200 OK` response.

!!!example "Example cURL"
    ```bash
    curl --request PATCH \
      --url 'https://experiment.amplitude.com/experiments/<id>' \
      --header 'Content-Type: application/json' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>' \
      --data '{"enabled":<enabled>,"rolloutPercentage":<rolloutPercentage>}'
    ```

------

## Create

```bash
POST https://experiment.amplitude.com/experiments
```

Create a new experiment.

### Request body

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`projectId`| Required | string | The project's ID. |
|`key`| Required | string | The experiment key. |
|`name`| Optional | string | The experiment name. |
|`description`| Optional | string | Description for the experiment.|
|`variants`| Optional | object array | Array of [`variants`](#variants). |
|`bucketingKey`| Optional | string | The user property to bucket the user by. |
|`rolloutWeights`| Optional | object | Rollout weights for non-targeted users. The object should be a mapping from variant key to rollout weight as an integer. For example: `{ "control": 1, "treatment": 1 }`. |
|`targetSegments`| Optional | object | See the [`targetSegments`](#targetsegments) table for more information. |
|`deployments`| Optional | string array | Array of deployments that the experiment should be assigned to. |
|`evaluationMode`| Optional | string | Experiment evaluation mode; options include `remote` or `local`. |
|`experimentType`| Optional | string | Experiment type; options include `hypothesis-testing` or `no-harm`. |

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

???example "Example request (click to open)"
    ```bash
    {
        "projectId":"<projectId>",
        "name": "Analyze button clicks experiment",
        "key": "analyze-button-clicks-experiment",
        "description": "analyze button clicks on the main page",
        "variants": [
            {
                "key": "control"
            },
            {
                "key": "treatment"
            }
        ],
        "rolloutWeights": {"control": 1, "treatment": 1},
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
                    "control": 1,
                    "treatment": 1
                }
            }
        ],
        "deployments": [<deploymentId>],
        "evaluationMode": "remote",
        "experimentType": "no-harm"
    }
    ```

### Response

A successful request returns a `200 OK` response and a JSON object with the experiment's id and url.

!!!example "Example cURL"
    ```bash
    curl --request POST \
      --url 'https://experiment.amplitude.com/experiments/new' \
      --header 'Content-Type: application/json' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>' \
      --data '{"projectId":"<projectId>","key":"<key>"}'
    ```

???example "Example response (click to open)"    
    ```bash
    {
        "id": <id>,
        "url": "http://experiment.amplitude.com/amplitude/<projectId>/config/<id>"
    }
    ```
