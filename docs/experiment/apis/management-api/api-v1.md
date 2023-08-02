---
title: Management API Endpoints Version 1
description: REST API for managing feature flags and experiment configurations.
---

## Regions

| Region | Endpoint |
| --- | --- |
| Standard Server | [https://experiment.amplitude.com](https://experiment.amplitude.com) |
| EU Residency Server | [https://experiment.eu.amplitude.com](https://experiment.eu.amplitude.com) |

For version 1, apis are prefixed with `/api/1`. Experiment endpoints are appended with `/experiments`, and flag endpoints are appended with `/flags`. 

## Endpoints

[Flags and Experiments](#flags-and-experiments)

| <div class="big-column">Name</div> | Description |
| --- | --- |
| [List](#list) | List of flags or experiments including their configuration details. |
| [Get details](#get-details) | Get the configuration details of an experiment or a flag. |
| [List versions](#list-versions) | List all versions for an experiment or a flag. |
| [Get version details](#get-version-details) | Get a specific version for an experiment or a flag. |
| [List variants](#list-variants) | List all variants for an experiment or a flag. |
| [Get variant details](#get-variant-details) | Get a specific variant for an experiment or a flag. |
| [Get variant inclusions](#get-variant-inclusions) | Get all inclusions (users) for a variant. |
| [Create variant](#create-variant) | Create a new variant for an experiment or a flag. |
| [Edit variant](#edit-variant) | Edit a variant for an experiment or a flag. |
| [Remove variant](#remove-variant) | Remove a variant from an experiment or a flag. |
| [Add users to variant](#add-users-to-variant) | Add users to experiment or flag's variant. |
| [Remove users from variant](#remove-users-from-variant) | Remove users from experiment or flag's variant. |
| [Remove all users from variant](#remove-all-users-from-variant) | Remove all users from experiment or flag's variant. |
| [List flag or experiment deployments](#list-flag-or-experiment-deployments) | List all deployments for an experiment or a flag. |
| [Create flag or experiment deployment](#create-flag-or-experiment-deployment) | Add a deployment for an experiment or a flag. |
| [Remove deployment](#remove-deployment) | Remove a deployment from an experiment or a flag. |
| [Edit](#edit) | Edit experiment or flag. |
| [Create](#create) | Create a new experiment or flag. |

[Other endpoints](#other-endpoints)

| <div class="big-column">Name</div> | Description |
| --- | --- |
| [List deployments](#list-deployments) | List deployments that experiments or flags can be assigned to. |
| [Create deployment](#create-deployment) | Create a deployment. |
| [Edit deployment](#edit-deployment) | Edit a deployment. |

------

## Flags and Experiments

## List

Fetch a list of experiments or flags including their configuration details. Results are ordered with the most recently created items first.

### Query parameters

| Name| Description |
| --- | --- |
| `limit` | The max number of experiments or flags to be returned. Capped at 1000. |
| `cursor` | The offset to start the "page" of results from. |

### Response

A successful request returns a `200 OK` response and a list of experiments or flags encoded as JSON in the response body.

#### Flag example request

```bash
GET https://experiment.amplitude.com/api/1/flags
```

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

#### Experiment example request

```bash
GET https://experiment.amplitude.com/api/1/experiments
```

!!!example "Example cURL"
    ```bash
    curl --request GET \
    --url 'https://experiment.amplitude.com/api/1/experiments?limit=1000' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer <management-api-key>'
    ```

???example "Experiment examples"
    === "Response example"
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

Fetch the configuration details of an experiment or a flag.

### Path variables

| Name | Description |
|---|----|
|`id`| Required. String. The object's ID.|

### Response

A successful request returns a `200 OK` response and a JSON object with the experiment's details.

#### Flag example request

```bash
GET https://experiment.amplitude.com/api/1/flags/<id>
```

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

#### Experiment example request

```bash
GET https://experiment.amplitude.com/api/1/experiments/<id>
```

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://experiment.amplitude.com/api/1/experiments/<id>' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

???example "Experiment examples"
    === "Response example"
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

Fetch a list of all versions for an experiment or a flag.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The object's ID.|

### Response

A successful request returns a `200 OK` response and a list of experiment's or flag's versions encoded as an array of JSON objects in the response body. Versions are sorted in a descending order.

#### Flag example request

```bash
GET https://experiment.amplitude.com/api/1/flags/{id}/versions
```

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

#### Experiment example request

```bash
GET https://experiment.amplitude.com/api/1/experiments/{id}/versions
```

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://experiment.amplitude.com/api/1/experiments/<id>/versions' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

???example "Experiment examples"
    === "Response example"
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

Fetch details of a specific version of an experiment or a flag.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The object's ID.|
|`versionId`| Required. String. The version's ID.|

### Response

A successful request returns a `200 OK` response and a JSON object with details of the version.

#### Flag example request

```bash
GET https://experiment.amplitude.com/api/1/flags/{id}/versions/{versionId}
```

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

#### Experiment example request

```bash
GET https://experiment.amplitude.com/api/1/experiments/{id}/versions/{versionId}
```

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://experiment.amplitude.com/api/1/experiments/<id>/versions/<versionId>' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

???example "Experiment examples"
    === "Response example"
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

Fetch a list of all variants for an experiment or a flag.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The object's ID.|

### Response

A successful request returns a `200 OK` response and a list of variants encoded as an array of JSON objects in the response body.

#### Flag example request

```bash
GET https://experiment.amplitude.com/api/1/flags/{id}/variants
```

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

#### Experiment example request

```bash
GET https://experiment.amplitude.com/api/1/experiments/{id}/variants
```

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://experiment.amplitude.com/api/1/experiments/<id>/variants' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```
???example "Experiment examples"
    === "Response example"
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

Fetch details of a specific variant of an experiment or a flag.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The object's ID.|
|`variantKey`| Required. String. The variant's key.|

### Response

A successful request returns a `200 OK` response and a JSON object with details of experiment or flag variant.

#### Flag example request

```bash
GET https://experiment.amplitude.com/api/1/flags/{id}/variants/{variantKey}
```

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

#### Experiment example request

```bash
GET https://experiment.amplitude.com/api/1/experiments/{id}/variants/{variantKey}
```

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://experiment.amplitude.com/api/1/experiments/<id>/variants/<variantKey>' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

???example "Experiment examples"
    === "Response example"
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

Fetch a list of inclusions for a specific variant of an experiment or a flag.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The object's ID.|
|`variantKey`| Required. String. The variant's key.|

### Response

A successful request returns a `200 OK` response and a list of inclusions of experiment or flag's variant as an array of JSON objects.

#### Flag example request

```bash
GET https://experiment.amplitude.com/api/1/flags/{id}/variants/{variantKey}/users
```

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

#### Experiment example request

```bash
GET https://experiment.amplitude.com/api/1/experiments/{id}/variants/{variantKey}/users
```

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://experiment.amplitude.com/api/1/experiments/<id>/variants/<variantKey>/users' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

???example "Experiment examples"
    === "Response example"
        ```bash
        [
            <user>@<your-company-email>,
            <userId>
        ]
        ```

------

## Create variant

Create a new variant for an experiment or a flag

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The experiment's ID.|

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

#### Flag example request

```bash
POST https://experiment.amplitude.com/api/1/flags/{id}/variants
```

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

#### Experiment example request

```bash
POST https://experiment.amplitude.com/api/1/experiments/{id}/variants
```

!!!example "Example cURL"
    ```bash
    curl --request POST \
      --url 'https://experiment.amplitude.com/api/1/experiments/<id>/variants' \
      --header 'Content-Type: application/json' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>' \
      --data '{"key":"<key>","name":"<name>","description":"<description>","payload":"<payload>","rolloutWeight":<rolloutWeight>}'
    ```
???example "Experiment examples"
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

Edit a variant for an experiment or a flag.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The object's ID.|
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

#### Experiment example request

!!!example "Example cURL"
    ```bash
    curl --request PATCH \
      --url 'https://experiment.amplitude.com/api/1/experiments/<id>/variants/<variantKey>' \
      --header 'Content-Type: application/json' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>' \
      --data '{"key":"<key>","name":"<name>","description":"<description>","payload":"<payload>","rolloutWeight":<rolloutWeight>}'
    ```
???example "Experiment examples"
    === "Request example"
        ```bash
        {
            "key": "updated-variant-key",
            "description": "updated-optional description for variant",
            "name": "optional name for variant",
            "payload": {"variant-payload": "example payload"},
            "rolloutWeight": 10
        }
        ```
    === "Response example"
        ```bash
        OK
        ```

#### Flag example request

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

Remove a variant from an experiment or a flag.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The object's ID.|
|`variantKey`| Required. String. The variant's key.|

### Response

A successful request returns a `200 OK` response and `OK` text.

#### Flag example request

```bash
DELETE https://experiment.amplitude.com/flags/{id}/variants/{variantKey}
```

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

#### Experiment example request

```bash
DELETE https://experiment.amplitude.com/experiments/{id}/variants/{variantKey}
```

!!!example "Example cURL"
    ```bash
    curl --request DELETE \
      --url 'https://experiment.amplitude.com/api/1/experiments/<id>/variants/<variantKey>' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

???example "Experiment examples"
    === "Response example"
        ```bash
        OK
        ```

------

## Add users to variant

Add inclusions (users or devices) to experiment or flag's variant.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The object's ID.|
|`variantKey`| Required. String. The variant's key.|

### Request body

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`inclusions`| Required | object | Contains an string array of user or device ids. |

### Response

A successful request returns a `200 OK` response and `OK` text.

#### Flag example request

```bash
POST https://experiment.amplitude.com/api/1/flags/{id}/variants/{variantKey}/users
```

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
        ```
    === "Response example"
        ```bash
        OK
        ```

#### Experiment example request

```bash
POST https://experiment.amplitude.com/api/1/experiments/{id}/variants/{variantKey}/users
```

!!!example "Example cURL"
    ```bash
    curl --request POST \
      --url 'https://experiment.amplitude.com/api/1/experiments/<id>/variants/<variantKey>/users' \
      --header 'Content-Type: application/json' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>' \
      --data '{"inclusions":<["id1", "id2", "id3"]>}'
    ```

???example "Experiment examples"
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

Remove inclusions (users or devices) from flag or experiment's variant.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The object's ID.|
|`variantKey`| Required. String. The variant's key.|
|`userIndex`| Required. String. The user's index. Zero-indexed. Index-based array of users can be obtained via [Get variant inclusions](#get-variant-inclusions)

### Response

A successful request returns a `200 OK` response and `OK` text.

#### Flag example request

```bash
DELETE https://experiment.amplitude.com/api/1/flags/{id}/variants/{variantKey}/users/{userIndex}
```

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

#### Experiment example request

```bash
DELETE https://experiment.amplitude.com/api/1/experiments/{id}/variants/{variantKey}/users/{userIndex}
```

!!!example "Example cURL"
    ```bash
    curl --request DELETE \
      --url 'https://experiment.amplitude.com/api/1/experiments/<id>/variants/<variantKey>/users/<userIndex>' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

???example "Experiment examples"
    === "Response example"
        ```bash
        OK
        ```

------

## Remove all users from variant

```bash
DELETE https://experiment.amplitude.com/api/1/experiments/{id}/variants/{variantKey}/users
```

Remove all inclusions (users or devices) from experiment or flag's variant.

### Path variables

|<div class="big-column">Name</div>|Description|
|---|----|
|`id`| Required. String. The object's ID.|
|`variantKey`| Required. String. The variant's key.|

### Response

A successful request returns a `200 OK` response and `OK` text.

#### Flag example request

```bash
DELETE https://experiment.amplitude.com/api/1/flags/{id}/variants/{variantKey}/users
```

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

#### Experiment example request

```bash
DELETE https://experiment.amplitude.com/api/1/experiments/{id}/variants/{variantKey}/users
```

!!!example "Example cURL"
    ```bash
    curl --request DELETE \
      --url 'https://experiment.amplitude.com/api/1/experiments/<id>/variants/<variantKey>/users' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

???example "Experiment examples"
    === "Response example"
        ```bash
        OK
        ```

------

## List flag or experiment deployments

List all deployments for a flag or experiment.

### Path variables

|<div class="big-column">Name</div>|Description|
|---|----|
|`id`| Required. String. The object's ID.|

### Response

A successful request returns a `200 OK` response and an array of JSON objects with flag or experiment's deployment details.

#### Flag example request

```bash
GET https://experiment.amplitude.com/api/1/flags/{id}/deployments
```

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

#### Experiment example request

```bash
GET https://experiment.amplitude.com/api/1/experiments/{id}/deployments
```

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://experiment.amplitude.com/api/1/experiments/<id>/deployments' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

???example "Experiment examples"
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

## Create flag or experiment deployment

Add a deployment for an experiment or a flag.

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

#### Flag example request

```bash
POST https://experiment.amplitude.com/api/1/flags/{id}/deployments
```

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

#### Experiment example request

```bash
POST https://experiment.amplitude.com/api/1/experiments/{id}/deployments
```

!!!example "Example cURL"
    ```bash
    curl --request POST \
      --url 'https://experiment.amplitude.com/api/1/experiments/<id>/deployments' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
      --data '{"deployments":[<deploymentId>]}'
    ```
???example "Experiment examples"
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

Remove a deployment from a flag or experiment.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The object's ID.|
|`deploymentId`| Required. String. The deployment's ID.|

### Response

A successful request returns a `200 OK` response and `OK` text.

#### Flag example request

```bash
DELETE https://experiment.amplitude.com/api/1/flags/{id}/deployments/{deploymentId}
```

!!!example "Example cURL"
    ```bash
    curl --request DELETE \
      --url 'https://experiment.amplitude.com/api/1/flags/<id>/deployments/<deploymentId>' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

#### Experiment example request

```bash
DELETE https://experiment.amplitude.com/api/1/experiments/{id}/deployments/{deploymentId}
```

!!!example "Example cURL"
    ```bash
    curl --request DELETE \
      --url 'https://experiment.amplitude.com/api/1/experiments/<id>/deployments/<deploymentId>' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

------

## Edit

Edit a flag or an experiment.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The object's ID.|

### Request body

|<div class="med-big-column">Name</div>|Requirement|Type|Description|<div class="required">Parameter type</div>|
|---|---|---|---|---|
|`name`| Optional | string | Name. | <div class="required">Flag & experiment</div> |
|`description`| Optional | string | Description. | <div class="required">Flag & experiment</div> |
|`bucketingKey`| Optional | string | The user property to bucket the user by. | <div class="required">Flag & experiment</div> |
|`bucketingSalt`| Optional | string | Bucketing salt. | <div class="required">Flag & experiment</div> |
|`bucketingUnit`| Optional | string | Bucketing unit represented by a group type from the accounts add-on. Used for group level bucketing and analysis. | <div class="required">Flag & experiment</div> |
|`evaluationMode`| Optional | string | Evaluation mode for the experiment, either `local` or `remote`. | <div class="required">Flag & experiment</div> |
|`rolloutPercentage`| Optional | number | Rollout percentage for non-targeted users. Range 0 - 100. | <div class="required">Flag & experiment</div> |
|`enabled`| Optional | boolean | Property to activate or deactivate flag or experiment. | <div class="required">Flag & experiment</div> |
|`archive`| Optional | boolean | Property to archive or restore flag or experiment. | <div class="required">Flag & experiment</div> |
|`experimentType`| Optional | string | Experiment type, options include `no-harm` or `hypothesis-testing`. | <div class="required">Experiment only</div> |
|`stickyBucketing`| Optional | boolean | If true, the experiment uses [sticky bucketing](../../general/evaluation/implementation.md#sticky-bucketing). | <div class="required">Experiment only</div> 
|`startDate`| Optional | string | Start date of the experiment in ISO 8601 format. | <div class="required">Experiment only</div> 
|`endDate`| Optional | string | End date of the experiment in ISO 8601 format. End date can be null. | <div class="required">Experiment only</div> 
|`exposureEvent`| Optional | object | See the [`exposureEvent`](#exposureevent) table for more information. If set to null, the Amplitude Exposure Event will be used. | <div class="required">Experiment only</div> 

#### `exposureEvent` 

<span class="required">Parameter specific to experiments only. </span> The `exposureEvent` field contains these objects.

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`event_type`| Required | string | Event type. |
|`filters`| Required | object array | A list of property filters. See the [`filters`](#filters) table for more information. |

#### `filters`

<span class="required">Parameter specific to experiments only. </span> The `filters` field contains these objects.

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`group_type`| Optional | string | Group type of the filter; can be null. Can be `User` value or one of the group values, eg `org _id`, `org name` |
|`subprop_key`| Required | string | Filter's key; can be null. |
|`subprop_op`| Required | string | The [operation](#subprop_op) to use in this filter. |
|`subprop_type`| Required | string | Either `event`, `user` or `group` indicating that the property is either an event, user or group property, respectively. |
|`subprop_value`| Required | string array | A list of values to filter the event property by. |

#### `subprop_op`

<span class="required">Parameter specific to experiments only. </span> A string value representing operations on a property value. Possible values are:

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

A successful request returns a `200 OK` response.

#### Flag example request

```bash
PATCH https://experiment.amplitude.com/api/1/flags/{id}
```

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

#### Experiment example request

```bash
PATCH https://experiment.amplitude.com/api/1/experiments/{id}
```

!!!example "Example cURL"
    ```bash
    curl --request PATCH \
      --url 'https://experiment.amplitude.com/experiments/<id>' \
      --header 'Content-Type: application/json' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>' \
      --data '{"enabled":<enabled>,"rolloutPercentage":<rolloutPercentage>}'
    ```

???example "Experiment examples"
    === "Request example"
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

------

## Create

Create a new experiment or flag.

### Request body

|<div class="med-big-column">Name</div>|Requirement|Type|Description|<div class="required">Parameter type</div> |
|---|---|---|---|---|
|`projectId`| Required | string | The project's ID. | <div class="required">Flag & experiment</div> |
|`key`| Required | string | The experiment key. | <div class="required">Flag & experiment</div> |
|`name`| Optional | string | The experiment name. | <div class="required">Flag & experiment</div> |
|`description`| Optional | string | Description for the experiment.| <div class="required">Flag & experiment</div> |
|`variants`| Optional | object array | Array of [`variants`](#variants). | <div class="required">Flag & experiment</div> |
|`bucketingKey`| Optional | string | The user property to bucket the user by. | <div class="required">Flag & experiment</div> |
|`rolloutWeights`| Optional | object | Rollout weights for non-targeted users. The object should be a mapping from variant key to rollout weight as an integer. For example: `{ "control": 1, "treatment": 1 }`. | <div class="required">Flag & experiment</div> |
|`targetSegments`| Optional | object | See the [`targetSegments`](#targetsegments) table for more information. | <div class="required">Flag & experiment</div> |
|`deployments`| Optional | string array | Array of deployments that the experiment should be assigned to. | <div class="required">Flag & experiment</div> |
|`evaluationMode`| Optional | string | Experiment evaluation mode; options include `remote` or `local`. | <div class="required">Flag & experiment</div> |
|`experimentType`| Optional | string | Experiment type; options include `hypothesis-testing` or `no-harm`. | <div class="required">Experiment only</div> |

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

A successful request returns a `200 OK` response and a JSON object with the flag or experiment's id and url.

#### Flag example request

```bash
POST https://experiment.amplitude.com/flags
```

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

#### Experiment example request

```bash
POST https://experiment.amplitude.com/experiments
```

!!!example "Example cURL"
    ```bash
    curl --request POST \
      --url 'https://experiment.amplitude.com/experiments/new' \
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
    === "Response example"
        ```bash
        {
            "id": <id>,
            "url": "http://experiment.amplitude.com/amplitude/<projectId>/config/<id>"
        }
        ```

------

## Other endpoints

## List deployments

```bash
GET https://experiment.amplitude.com/deployments
```

Fetch a list of deployments that experiments or flags can be assigned to.

### Query parameters

|Name|Description|
|---|----|
|`limit`| The max number of deployments to be returned. Capped at 1000.|
|`cursor`| The offset to start the "page" of results from.|

### Response

A successful request returns a `200 OK` response and a list of deployments encoded as JSON in the response body.

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://experiment.amplitude.com/api/1/deployments?limit=1000' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```
???example "Deployments example"
    === "Response example"
    ```bash
        {
            "deployments": [
                {
                    "id": <id>,
                    "projectId": <projectId>,
                    "label": "deployment-1",
                    "key": <key>,
                    "deleted": true
                },
                {
                    "id": <id>,
                    "projectId": <projectId>,
                    "label": "deployment-2",
                    "key": <key>,
                    "deleted": false
                }
            ]
        }
    ```
    
## Create deployment

```bash
POST https://experiment.amplitude.com/api/1/deployments
```

Create a deployment that experiments or flags can be assigned to.

### Query parameters

|Name|Description|
|---|----|
|`projectId`| Required | string | The project's ID. |
|`label`| Required | Deployment's label. Must contain alphanumeric and/or `_`, `-` characters. |
|`type`| Required | string | Deployment's type.  Must be either `client` or `server`. |

### Response

A successful request returns a `200 OK` response and a deployment's id.

!!!example "Example cURL"
    ```bash
    curl --request POST \
      --url 'https://experiment.amplitude.com/api/1/deployments' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```
???example "Deployments example"
    === "Request example"
        ```bash
        {
            "projectId":"<projectId>",
            "label": "hello-world",
            "type": "client"
        }
        ```
    === "Response example"
    ```bash
        {
            "id": <id>
        }
    ```
    
## Edit deployment

```bash
PATCH https://experiment.amplitude.com/api/1/deployments/<id>
```

Edit a deployment that experiments or flags can be assigned to.

### Query parameters

|Name|Description|
|---|----|
|`label`| Optional | Deployment's label. Must contain alphanumeric and/or `_`, `-` characters. |
|`archive`| Optional | string | Soft delete or restore deployment. |

### Response

A successful request returns a `200 OK` response and `OK` text.

!!!example "Example cURL"
    ```bash
    curl --request PATCH \
      --url 'https://experiment.amplitude.com/api/1/deployments/<id>' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```
???example "Deployments example"
    === "Request example"
        ```bash
        {
            "label": "updated-label"
        }
        ```
    === "Response example"
    ```bash
        OK
    ```
    