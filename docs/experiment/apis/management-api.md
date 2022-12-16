---
title: Management API (Beta)
description: REST API for managing feature flags and experiment configurations.
---

The Experiment management API can be used to programmatically create and control flags and experiments.

!!!beta "Experiment Management API in Beta"

    This API is in Beta. If you would like to try out an early version of the API please reach out to us.

## Endpoints

| <div class="big-column">Name</div> | Description |
| --- | --- |
| [List experiments](#list-experiments) | List of experiments including their configuration details. |
| [List flags](#list-flags) | List of flags including their configuration details. |
| [List deployments](#list-deployments) | List deployments that experiments can be assigned to. |
| [Get experiment details](#get-experiment-details) | Get the configuration details of an experiment. |
| [List experiment versions](#list-experiment-versions) | List all versions for an experiment. |
| [Get experiment version details](#get-experiment-version-details) | Get a specific version for an experiment. |
| [Get flag details](#get-flag-details) | Get the configuration details of a flag. |
| [List flag versions](#list-flag-versions) | List all versions for a flag. |
| [Get flag version details](#get-flag-version-details) | Get a specific version for a flag. |
| [Create experiment](#create-experiment) | Create a new experiment. |
| [Activate experiment](#activate-experiment) | Activate a inactive experiment. |
| [Deactivate experiment](#deactivate-experiment) | Deactivate an active experiment. |
| [Rollout weights](#rollout-weights) | Update the rollout weights for an experiment. |

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

## List experiments

```bash
GET https://management-api.experiment.amplitude.com/experiments/list
```

Fetch a list of experiments including their configuration details. Results are ordered with the most recently created experiments first.

### Query parameters

| <div class="big-column">Name</div> | Description |
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
## List flags

```bash
GET https://management-api.experiment.amplitude.com/flags/list
```

Fetch a list of flags including their configuration details. Results are ordered with the most recently created flags first.

### Query parameters

| <div class="big-column">Name</div> | Description |
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

------

## List deployments

```bash
GET https://management-api.experiment.amplitude.com/deployments/list
```

Fetch a list of deployments that experiments can be assigned to.

### Query parameters

|<div class="big-column">Name</div>|Description|
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

------

## Get experiment details

```bash
GET https://management-api.experiment.amplitude.com/experiments/{id}
```

Fetch the configuration details of an experiment.

### Path variables

|<div class="big-column">Name</div>|Description|
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

|<div class="big-column">Name</div>|Description|
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

|<div class="big-column">Name</div>|Description|
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
## Get flag details

```bash
GET https://management-api.experiment.amplitude.com/flags/{id}
```

Fetch the configuration details of a flag.

### Path variables

|<div class="big-column">Name</div>|Description|
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

|<div class="big-column">Name</div>|Description|
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

|<div class="big-column">Name</div>|Description|
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

## Create experiment

```bash
POST https://management-api.experiment.amplitude.com/experiments/new
```

Create a new experiment.

### Request body

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`projectId`| Required | string | The project's ID. |
|`key`| Required | string | The flag or experiment key. |
|`description`| Optional | string | Description for the experiment.|
|`variants`| Optional | object array | Array of [`variants`](#variants). |
|`bucketingKey`| Optional | string | The user property to bucket the user by. |
|`rolloutWeights`| Optional | object | Rollout weights for non-targeted users. The object should be a mapping from variant key to rollout weight as an integer. For example: `{ "control": 1, "treatment": 1 }`. |
|`targetSegments`| Optional | object | See the [`targetSegments`](#targetsegments) table for more information. |
|`stickyBucketing`| Optional | boolean | If true, the experiment uses [sticky bucketing](../general/evaluation/implementation.md#sticky-bucketing). |
|`deployments`| Optional | string array | Array of deployments that the experiment should be assigned to. |

#### `variants`

The `variants` field contains these objects.

|<div class="med-big-column">Name</div>|Requirement|Type|Description|
|---|---|---|---|
|`key`| Required | string | The key (a.k.a value) of the variant |
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
|`prop`| Required | string | The property to use in the condition |
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
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
      --data '{"projectId":"<projectId>","key":"<key>"}'
    ```

------

## Activate experiment

```bash
POST https://management-api.experiment.amplitude.com/experiments/{id}/activate
```

<!-- Brian what does activating an experiment do?-->

Activate a inactive experiment.

### Path variables

|<div class="big-column">Name</div>|Description|
|---|----|
|`id`| Required. String. The experiment's ID.|

!!!example "Example cURL"
    ```bash
    curl --request POST \
      --url 'https://management-api.experiment.amplitude.com/experiments/<id>/activate' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

------

## Deactivate experiment

```bash
POST https://management-api.experiment.amplitude.com/experiments/{id}/deactivate
```

<!-- Brian what does deactivating an experiment do? -->

Deactivate an active experiment.

### Path variables

|<div class="big-column">Name</div>|Description|
|---|----|
|`id`| Required. String. The experiment's ID.|

!!!example "Example cURL"
    ```bash
    curl --request POST \
      --url 'https://management-api.experiment.amplitude.com/experiments/<id>/deactivate' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

------

## Rollout weights

```bash
POST https://management-api.experiment.amplitude.com/experiments/{id}/rollout-weights
```

<!-- Brian what does this call do?-->

Update the rollout weights for an experiment.

### Path variables

|<div class="big-column">Name</div>|Description|
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
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
      --data '{"rolloutWeights":{"control": 1,"treatment":1}}'
    ```
