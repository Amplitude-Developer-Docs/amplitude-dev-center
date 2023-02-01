---
title: Management API (Beta)
description: REST API for managing feature flags and experiment configurations.
---

The Experiment management API can be used to programmatically create and control flags and experiments.

!!!beta "Experiment Management API in Beta"

    This API is in Beta. If you would like to try out an early version of the API please reach out to us.

## Endpoints

[Experiment endpoints](#experiment-endpoints)

| <div class="big-column">Name</div> | Description |
| --- | --- |
| [List experiments](#list-experiments) | List of experiments including their configuration details. |
| [Get experiment details](#get-experiment-details) | Get the configuration details of an experiment. |
| [List experiment versions](#list-experiment-versions) | List all versions for an experiment. |
| [Get experiment version details](#get-experiment-version-details) | Get a specific version for an experiment. |
| [List experiment variants](#list-experiment-variants) | List all variants for an experiment. |
| [Get experiment variant details](#get-experiment-variant-details) | Get a specific variant for an experiment. |
| [Get experiment variant inclusions](#get-experiment-variant-inclusions) | Get all inclusions (users) for an experiment's variant. |
| [Create experiment variant](#create-experiment-variant) | Create a new variant for an experiment. |
| [Edit experiment variant](#edit-experiment-variant) | Edit a variant for an experiment. |
| [Remove experiment variant](#remove-experiment-variant) | Remove a variant from an experiment. |
| [Add users to experiment's variant](#add-users-to-experiments-variant) | Add users to experiment's variant. |
| [Remove users from experiment's variant](#remove-users-from-experiments-variant) | Remove users from experiment's variant. |
| [Remove all users from experiment's variant](#remove-all-users-from-experiments-variant) | Remove all users from experiment's variant. |
| [Edit experiment](#edit-experiment) | Edit experiment. |
| [Create experiment](#create-experiment) | Create a new experiment. |
| [Activate experiment](#activate-experiment) | Activate an inactive experiment. |
| [Deactivate experiment](#deactivate-experiment) | Deactivate an active experiment. |
| [Rollout weights](#rollout-weights) | Update the rollout weights for an experiment. |

[Flag endpoints](#flag-endpoints)

| <div class="big-column">Name</div> | Description |
| --- | --- |
| [List flags](#list-flags) | List of flags including their configuration details. |
| [Get flag details](#get-flag-details) | Get the configuration details of a flag. |
| [List flag versions](#list-flag-versions) | List all versions for a flag. |
| [Get flag version details](#get-flag-version-details) | Get a specific version for a flag. |
| [List flag variants](#list-flag-variants) | List all variants for a flag. |
| [Get flag variant details](#get-flag-variant-details) | Get a specific variant for a flag. |
| [Get flag variant inclusions](#get-flag-variant-inclusions) | Get all inclusions (users) for a flag's variant. |
| [Create flag variant](#create-flag-variant) | Create a new variant for a flag. |
| [Edit flag variant](#edit-flag-variant) | Edit a variant for a flag. |
| [Remove flag variant](#remove-flag-variant) | Remove a variant from a flag. |
| [Add users to flag's variant](#add-users-to-flags-variant) | Add users to flag's variant. |
| [Remove users from flag's variant](#remove-users-from-flags-variant) | Remove users from flag's variant. |
| [Remove all users from flag's variant](#remove-all-users-from-flags-variant) | Remove all users from flag's variant. |
| [Edit flag](#edit-flag) | Edit flag. |
| [Create flag](#create-flag) | Create a new flag. |

[Other endpoints](#other-endpoints)

| <div class="big-column">Name</div> | Description |
| --- | --- |
| [List deployments](#list-deployments) | List deployments that experiments or flags can be assigned to. |

## Regions

| Region | Endpoint |
| --- | --- |
| Standard Server | [https://management-api.experiment.amplitude.com](https://management-api.experiment.amplitude.com) |
| EU Residency Server | [https://management-api.experiment.eu.amplitude.com](https://management-api.experiment.eu.amplitude.com) |

## Authorization

The management API uses the HTTP Authorization header for authentication.

The header must be: `Authorization: Bearer <management-api-key>`.

!!!warning "Management API Keys"
    Management API keys are different from the deployment keys used to fetch flag variants. They're created and managed via the Management API link in the Experiment sidebar.

## Conventions

### Status codes

The API uses meaningful status codes to communicate the result of requests.

| Code | Meaning |
| --- | --- |
| 200 | Success! |
| 400 | Input is missing or invalid |
| 401 | Invalid or revoked API key |
| 403 | API key doesn't have access to the specified environment |

### Cursors

Endpoints that list resources such as `/experiments/list` will only return a limited number of items per request. To fetch the next page of items, the `nextCursor` value returned from the first request must be passed as the `cursor` parameter of the next request. In this way multiple requests can be chained together to fetch the total set of items.

------

## Experiment endpoints

## List experiments

```bash
GET https://management-api.experiment.amplitude.com/experiments/list
```

Fetch a list of experiments including their configuration details. Results are ordered with the most recently created experiments first.

### Query parameters

| Name| Description |
| --- | --- |
| `limit` | The max number of experiments to be returned. Capped at 1000. |
| `cursor` | The offset to start the "page" of results from. |

### Response

A successful request returns a `200 OK` response and a list of experiments encoded as JSON in the response body.

<!-- TODO example response body -->

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://management-api.experiment.amplitude.com/experiments/list?limit=1000' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

------

## Get experiment details

```bash
GET https://management-api.experiment.amplitude.com/experiments/{id}
```

Fetch the configuration details of an experiment.

### Path variables

| Name | Description |
|---|----|
|`id`| Required. String. The experiment's ID.|

### Response

A successful request returns a `200 OK` response and a JSON object with the experiment's details.

<!-- TODO example response body -->

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://management-api.experiment.amplitude.com/experiments/<id>' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

------

## List experiment versions

```bash
GET https://management-api.experiment.amplitude.com/experiments/{id}/versions
```

Fetch a list of all versions for an experiment.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The experiment's ID.|

### Response

A successful request returns a `200 OK` response and a list of experiment's versions encoded as JSON in the response body.

<!-- TODO example response body -->

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://management-api.experiment.amplitude.com/experiments/<id>/versions' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

------

## Get experiment version details

```bash
GET https://management-api.experiment.amplitude.com/experiments/{id}/versions/{versionId}
```

Fetch details of a specific version of an experiment.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The experiment's ID.|
|`versionId`| Required. String. The version's ID.|

### Response

A successful request returns a `200 OK` response and a JSON object with details of experiment's version.

<!-- TODO example response body -->

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://management-api.experiment.amplitude.com/experiments/<id>/versions/<versionId>' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

------

## List experiment variants

```bash
GET https://management-api.experiment.amplitude.com/experiments/{id}/variants
```

Fetch a list of all variants for an experiment.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The experiment's ID.|

### Response

A successful request returns a `200 OK` response and a list of experiment's variants encoded as JSON in the response body.

<!-- TODO example response body -->

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://management-api.experiment.amplitude.com/experiments/<id>/variants' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

------

## Get experiment variant details

```bash
GET https://management-api.experiment.amplitude.com/experiments/{id}/variants/{variantKey}
```

Fetch details of a specific variant of an experiment.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The experiment's ID.|
|`variantKey`| Required. String. The variant's key.|

### Response

A successful request returns a `200 OK` response and a JSON object with details of experiment's variant.

<!-- TODO example response body -->

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://management-api.experiment.amplitude.com/experiments/<id>/variants/<variantKey>' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

------

## Get experiment variant inclusions

```bash
GET https://management-api.experiment.amplitude.com/experiments/{id}/variants/{variantKey}/users
```

Fetch a list of inclusions for a specific variant of an experiment.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The experiment's ID.|
|`variantKey`| Required. String. The variant's key.|

### Response

A successful request returns a `200 OK` response and a JSON object with a list of inclusions of experiment's variant.

<!-- TODO example response body -->

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://management-api.experiment.amplitude.com/experiments/<id>/variants/<variantKey>/users' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

------

## Create experiment variant

```bash
POST https://management-api.experiment.amplitude.com/experiments/{id}/variants
```

Create a new variant for an experiment.

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

A successful request returns a `200 OK` response.

<!-- TODO example response body -->

!!!example "Example cURL"
    ```bash
    curl --request POST \
      --url 'https://management-api.experiment.amplitude.com/experiments/<id>/variants' \
      --header 'Content-Type: application/json' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>' \
      --data '{"key":"<key>","name":"<name>","description":"<description>","payload":"<payload>","rolloutWeight":<rolloutWeight>}'
    ```

------

## Edit experiment variant

```bash
PATCH https://management-api.experiment.amplitude.com/experiments/{id}/variants/{variantKey}
```

Edit a variant for an experiment.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The experiment's ID.|
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

A successful request returns a `200 OK` response.

<!-- TODO example response body -->

!!!example "Example cURL"
    ```bash
    curl --request PATCH \
      --url 'https://management-api.experiment.amplitude.com/experiments/<id>/variants/<variantKey>' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>' \
      --data '{"key":"<key>","name":"<name>","description":"<description>","payload":"<payload>","rolloutWeight":<rolloutWeight>}'
    ```

------

## Remove experiment variant

```bash
DELETE https://management-api.experiment.amplitude.com/experiments/{id}/variants/{variantKey}
```

Remove a variant from an experiment.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The experiment's ID.|
|`variantKey`| Required. String. The variant's key.|

### Response

A successful request returns a `200 OK` response.

<!-- TODO example response body -->

!!!example "Example cURL"
    ```bash
    curl --request DELETE \
      --url 'https://management-api.experiment.amplitude.com/experiments/<id>/variants/<variantKey>' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

------

## Add users to experiment's variant

```bash
POST https://management-api.experiment.amplitude.com/experiments/{id}/variants/{variantKey}/users
```

Add inclusions (users or devices) to experiment's variant.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The experiment's ID.|
|`variantKey`| Required. String. The variant's key.|

### Request body

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`inclusions`| Required | object | Contains an string array of user or device ids. |

### Response

A successful request returns a `200 OK` response.

<!-- TODO example response body -->

!!!example "Example cURL"
    ```bash
    curl --request POST \
      --url 'https://management-api.experiment.amplitude.com/experiments/<id>/variants/<variantKey>/users' \
      --header 'Content-Type: application/json' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>' \
      --data '{"inclusions":<["id1", "id2", "id3"]>}'
    ```

------

## Remove users from experiment's variant

```bash
DELETE https://management-api.experiment.amplitude.com/experiments/{id}/variants/{variantKey}/users/{userIndex}
```

Remove inclusions (users or devices) from experiment's variant.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The experiment's ID.|
|`variantKey`| Required. String. The variant's key.|
|`userIndex`| Required. String. The user's index. Zero-indexed.|

### Response

A successful request returns a `200 OK` response.

<!-- TODO example response body -->

!!!example "Example cURL"
    ```bash
    curl --request DELETE \
      --url 'https://management-api.experiment.amplitude.com/experiments/<id>/variants/<variantKey>/users/{<userIndex>}' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

------

## Remove all users from experiment's variant

```bash
DELETE https://management-api.experiment.amplitude.com/experiments/{id}/variants/{variantKey}/users
```

Remove all inclusions (users or devices) from experiment's variant.

### Path variables

|<div class="big-column">Name</div>|Description|
|---|----|
|`id`| Required. String. The experiment's ID.|
|`variantKey`| Required. String. The variant's key.|

### Response

A successful request returns a `200 OK` response.

<!-- TODO example response body -->

!!!example "Example cURL"
    ```bash
    curl --request DELETE \
      --url 'https://management-api.experiment.amplitude.com/experiments/<id>/variants/<variantKey>/users' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

------

## Edit experiment

```bash
PATCH https://management-api.experiment.amplitude.com/experiments/{id}
```

Edit an experiment.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The experiment's ID.|

### Request body

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`bucketingKey`| Optional | string | The user property to bucket the user by. |
|`bucketingSalt`| Optional | string | Experiment's bucketing salt. |
|`bucketingUnit`| Optional | string | Experiment's bucketing unit represented by a group type from the accounts add-on. Used for group level bucketing and analysis. |
|`description`| Optional | string | Description of the experiment. |
|`enabled`| Optional | boolean | Property to activate or deactivate the experiment. |
|`evaluationMode`| Optional | string | Evaluation mode for the experiment, either `local` or `remote`. |
|`name`| Optional | string | Name of the experiment. |
|`rolloutPercentage`| Optional | number | Rollout percentage for non-targeted users. Range 0 - 100. |
|`experimentType`| Optional | string | Experiment type, options include `no-harm` or `hypothesis-testing`. |
|`stickyBucketing`| Optional | boolean | If true, the experiment uses [sticky bucketing](../general/evaluation/implementation.md#sticky-bucketing). |
|`startDate`| Optional | string | Start date of the experiment in ISO 8601 format. |
|`endDate`| Optional | string | End date of the experiment in ISO 8601 format. End date can be null. |
|`exposureEvent`| Optional | object | See the [`exposureEvent`](#exposureevent) table for more information. If set to null, the Amplitude Exposure Event will be used. |

#### `exposureEvent`

The `exposureEvent` field contains these objects.

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`event_type`| Required | string | Event type. |
|`filters`| Required | object array | See the [`filters`](#filters) table for more information. |

#### `filters`

The `filters` field contains these objects.

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`group_type`| Optional | string | Group type of the filter; can be null. Currently we only use `USER` value. |
|`subprop_key`| Required | string | Filter's key; can be null. |
|`subprop_op`| Required | string | The [operation](#subprop_op) to use in this filter. |
|`subprop_type`| Required | string | Type of filter; can be null. One of `USER`, `GROUP`, `EVENT`. |
|`subprop_value`| Required | string array | Array of values. |

#### `subprop_op`

An string value representing operations on a property value. Possible values are: `is`, `is not`, `contains`, `does not contain`, `less`, `less or equal`, `greater`, `greater or equal`, `glob match`, `glob does not match`

### Response

A successful request returns a `200 OK` response.

<!-- TODO example response body -->

!!!example "Example cURL"
    ```bash
    curl --request PATCH \
      --url 'https://management-api.experiment.amplitude.com/experiments/<id>' \
      --header 'Content-Type: application/json' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>' \
      --data '{"enabled":<enabled>,"rolloutPercentage":<rolloutPercentage>}'
    ```

------

## Create experiment

```bash
POST https://management-api.experiment.amplitude.com/experiments/new
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
|`experimentType`| Optional | string | Experiment type; options include `hypothesis-testing` or `no-harm`. |
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

An string value representing operations on a property value. Possible values are: `is`, `is not`, `contains`, `does not contain`, `less`, `less or equal`, `greater`, `greater or equal`, `glob match`, `glob does not match`

### Response

A successful request returns a `200 OK` response and a JSON object with the experiment's details.

<!-- TODO example response body -->

!!!example "Example cURL"
    ```bash
    curl --request POST \
      --url 'https://management-api.experiment.amplitude.com/experiments/new' \
      --header 'Content-Type: application/json' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>' \
      --data '{"projectId":"<projectId>","key":"<key>"}'
    ```

------

## Activate experiment

!!!warning "Not recommended. Use [`edit experiment`](#edit-experiment) instead."

```bash
POST https://management-api.experiment.amplitude.com/experiments/{id}/activate
```

<!-- Brian what does activating an experiment do?-->

Activate an inactive experiment.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The experiment's ID.|

!!!example "Example cURL"
    ```bash
    curl --request POST \
      --url 'https://management-api.experiment.amplitude.com/experiments/<id>/activate' \
      --header 'Content-Type: application/json' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

------

## Deactivate experiment

!!!warning "Not recommended. Use [`edit experiment`](#edit-experiment) instead."

```bash
POST https://management-api.experiment.amplitude.com/experiments/{id}/deactivate
```

<!-- Brian what does deactivating an experiment do? -->

Deactivate an active experiment.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The experiment's ID.|

!!!example "Example cURL"
    ```bash
    curl --request POST \
      --url 'https://management-api.experiment.amplitude.com/experiments/<id>/deactivate' \
      --header 'Content-Type: application/json' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

------

## Rollout weights

!!!warning "Not recommended. Use [`edit experiment variant`](#edit-experiment-variant) instead."

```bash
POST https://management-api.experiment.amplitude.com/experiments/{id}/rollout-weights
```

<!-- Brian what does this call do?-->

Update the rollout weights for an experiment.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The experiment's ID.|

### Request body

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`rolloutWeights`| Required | object |A map from variant key to rollout weight. For example:  `{"control": 1,"treatment":1}`. |

!!!example "Example cURL"
    ```bash
    curl --request POST \
      --url 'https://management-api.experiment.amplitude.com/experiments/<id>/rollout-weights' \
      --header 'Content-Type: application/json' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>' \
      --data '{"rolloutWeights":{"control": 1,"treatment":1}}'
    ```

------

## Flag endpoints

## List flags

```bash
GET https://management-api.experiment.amplitude.com/flags/list
```

Fetch a list of flags including their configuration details. Results are ordered with the most recently created flags first.

### Query parameters

|Name|Description|
| --- | --- |
| `limit` | The max number of flags to be returned. Capped at 1000. |
| `cursor` | The offset to start the "page" of results from. |

### Response

A successful request returns a `200 OK` response and a list of flags encoded as JSON in the response body.

<!-- TODO example response body -->

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://management-api.experiment.amplitude.com/flags/list?limit=1000' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

## Get flag details

```bash
GET https://management-api.experiment.amplitude.com/flags/{id}
```

Fetch the configuration details of a flag.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The flag's ID.|

### Response

A successful request returns a `200 OK` response and a JSON object with the flag's details.

<!-- TODO example response body -->

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://management-api.experiment.amplitude.com/flags/<id>' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

------

## List flag versions

```bash
GET https://management-api.experiment.amplitude.com/flags/{id}/versions
```

Fetch a list of all versions for a flag.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The flag's ID.|

### Response

A successful request returns a `200 OK` response and a list of flag's versions encoded as JSON in the response body.

<!-- TODO example response body -->

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://management-api.experiment.amplitude.com/flags/<id>/versions' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

------

## Get flag version details

```bash
GET https://management-api.experiment.amplitude.com/flags/{id}/versions/{versionId}
```

Fetch details of a specific version of a flag.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The flags's ID.|
|`versionId`| Required. String. The version's ID.|

### Response

A successful request returns a `200 OK` response and a JSON object with details of flag's version.

<!-- TODO example response body -->

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://management-api.experiment.amplitude.com/flags/<id>/versions/<versionId>' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

------

## List flag variants

```bash
GET https://management-api.experiment.amplitude.com/flags/{id}/variants
```

Fetch a list of all variants for a flag.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The flag's ID.|

### Response

A successful request returns a `200 OK` response and a list of flag's variants encoded as JSON in the response body.

<!-- TODO example response body -->

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://management-api.experiment.amplitude.com/flags/<id>/variants' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

------

## Get flag variant details

```bash
GET https://management-api.experiment.amplitude.com/flags/{id}/variants/{variantKey}
```

Fetch details of a specific variant of a flag.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The flag's ID.|
|`variantKey`| Required. String. The variant's key.|

### Response

A successful request returns a `200 OK` response and a JSON object with details of flag's variant.

<!-- TODO example response body -->

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://management-api.experiment.amplitude.com/flags/<id>/variants/<variantKey>' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

------

## Get flag variant inclusions

```bash
GET https://management-api.experiment.amplitude.com/flags/{id}/variants/{variantKey}/users
```

Fetch a list of inclusions for a specific variant of a flag.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The flag's ID.|
|`variantKey`| Required. String. The variant's key.|

### Response

A successful request returns a `200 OK` response and a JSON object with a list of inclusions of flag's variant.

<!-- TODO example response body -->

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://management-api.experiment.amplitude.com/flags/<id>/variants/<variantKey>/users' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

------

## Create flag variant

```bash
POST https://management-api.experiment.amplitude.com/flags/{id}/variants
```

Create a new variant for a flag.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The flag's ID.|

### Request body

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`key`| Required | string | The variant key. |
|`description`| Optional | string | Description for the variant.|
|`name`| Optional | string | Name for the variant.|
|`payload`| Optional | string | Optional payload. Value must be a valid JSON element.|
|`rolloutWeight`| Optional | number | Rollout weight for non-targeted users.|

### Response

A successful request returns a `200 OK` response.

<!-- TODO example response body -->

!!!example "Example cURL"
    ```bash
    curl --request POST \
      --url 'https://management-api.experiment.amplitude.com/flags/<id>/variants' \
      --header 'Content-Type: application/json' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>' \
      --data '{"key":"<key>","name":"<name>","description":"<description>","payload":"<payload>","rolloutWeight":<rolloutWeight>}'
    ```

------

## Edit flag variant

```bash
PATCH https://management-api.experiment.amplitude.com/flags/{id}/variants/{variantKey}
```

Edit a variant for a flag.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The flag's ID.|
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

A successful request returns a `200 OK` response.

<!-- TODO example response body -->

!!!example "Example cURL"
    ```bash
    curl --request PATCH \
      --url 'https://management-api.experiment.amplitude.com/flags/<id>/variants/<variantKey>' \
      --header 'Content-Type: application/json' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>' \
      --data '{"key":"<key>","name":"<name>","description":"<description>","payload":"<payload>","rolloutWeight":<rolloutWeight>}'
    ```

------

## Remove flag variant

```bash
DELETE https://management-api.experiment.amplitude.com/flags/{id}/variants/{variantKey}
```

Remove a variant from an experiment.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The flag's ID.|
|`variantKey`| Required. String. The variant's key.|

### Response

A successful request returns a `200 OK` response.

<!-- TODO example response body -->

!!!example "Example cURL"
    ```bash
    curl --request DELETE \
      --url 'https://management-api.experiment.amplitude.com/flags/<id>/variants/<variantKey>' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

------

## Add users to flag's variant

```bash
POST https://management-api.experiment.amplitude.com/flags/{id}/variants/{variantKey}/users
```

Add inclusions (users or devices) to flag's variant.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The flag's ID.|
|`variantKey`| Required. String. The variant's key.|

### Request body

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`inclusions`| Required | object | Contains an string array of user or device ids. |

### Response

A successful request returns a `200 OK` response.

<!-- TODO example response body -->

!!!example "Example cURL"
    ```bash
    curl --request POST \
      --url 'https://management-api.experiment.amplitude.com/flags/<id>/variants/<variantKey>/users' \
      --header 'Content-Type: application/json' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>' \
      --data '{"inclusions":<["id1", "id2", "id3"]>}'
    ```

------

## Remove users from flag's variant

```bash
DELETE https://management-api.experiment.amplitude.com/flags/{id}/variants/{variantKey}/users/{userIndex}
```

Remove users (inclusions) from flag's variant.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The flag's ID.|
|`variantKey`| Required. String. The flag's key.|
|`userIndex`| Required. String. The user's index. Zero-indexed.|

### Response

A successful request returns a `200 OK` response.

<!-- TODO example response body -->

!!!example "Example cURL"
    ```bash
    curl --request DELETE \
      --url 'https://management-api.experiment.amplitude.com/flags/<id>/variants/<variantKey>/users/{<userIndex>}' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

------

## Remove all users from flag's variant

```bash
DELETE https://management-api.experiment.amplitude.com/flags/{id}/variants/{variantKey}/users
```

Remove all inclusion (users or devices) from flag's variant.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The flag's ID.|
|`variantKey`| Required. String. The flag's key.|

### Response

A successful request returns a `200 OK` response.

<!-- TODO example response body -->

!!!example "Example cURL"
    ```bash
    curl --request DELETE \
      --url 'https://management-api.experiment.amplitude.com/flags/<id>/variants/<variantKey>/users' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

------

## Edit flag

```bash
PATCH https://management-api.experiment.amplitude.com/flags/{id}
```

Edit a flag.

### Path variables

|Name|Description|
|---|----|
|`id`| Required. String. The flag's ID.|

### Request body

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`bucketingKey`| Optional | string | The user property to bucket the user by. |
|`bucketingSalt`| Optional | string | Flag's bucketing salt. |
|`bucketingUnit`| Optional | string | Flag's bucketing unit represented by a group type from the accounts add-on. Used for group level bucketing. |
|`description`| Optional | string | Description of the flag. |
|`enabled`| Optional | boolean | Property to activate or deactivate the flag. |
|`evaluationMode`| Optional | string | Evaluation mode for the flag, either `local` or `remote`. |
|`name`| Optional | string | Name of the flag. |
|`rolloutPercentage`| Optional | number | Rollout percentage for non-targeted users. Range 0 - 100. |

### Response

A successful request returns a `200 OK` response.

<!-- TODO example response body -->

!!!example "Example cURL"
    ```bash
    curl --request PATCH \
      --url 'https://management-api.experiment.amplitude.com/flags/<id>' \
      --header 'Content-Type: application/json' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>' \
      --data '{"enabled":<enabled>,"rolloutPercentage":<rolloutPercentage>}'
    ```

------

## Create flag

```bash
POST https://management-api.experiment.amplitude.com/flags/new
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
|`deployments`| Optional | string array | Array of deployments that the experiment should be assigned to. |
|`evaluationMode`| Optional | string | Experiment evaluation mode; options include `remote` or `local`. |

### Response

A successful request returns a `200 OK` response and a JSON object with the flag's details.

<!-- TODO example response body -->

!!!example "Example cURL"
    ```bash
    curl --request POST \
      --url 'https://management-api.experiment.amplitude.com/flags/new' \
      --header 'Content-Type: application/json' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>' \
      --data '{"projectId":"<projectId>","key":"<key>"}'
    ```

------

## Other endpoints

## List deployments

```bash
GET https://management-api.experiment.amplitude.com/deployments/list
```

Fetch a list of deployments that experiments or flags can be assigned to.

### Query parameters

|Name|Description|
|---|----|
|`limit`| The max number of deployments to be returned. Capped at 1000.|
|`cursor`| The offset to start the "page" of results from.|

### Response

A successful request returns a `200 OK` response and a list of deployments encoded as JSON in the response body.

<!-- TODO example response body -->

!!!example "Example cURL"
    ```bash
    curl --request GET \
      --url 'https://management-api.experiment.amplitude.com/deployments/list?limit=1000' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```