---
title: Experiment Management API (BETA)
description: 
--- 

The Experiment management API can be used to programmatically create and control flags and experiments.

!!!info "Experiment Management API in Beta"

    This API is in Beta. If you would like to try out an early version of the API please reach out to us.

## Authorization

The management API uses the HTTP Authorization header for authentication.

The header must be: `Authorization: Bearer <your-api-key>`.

## Considerations

### Keys

Management API keys are separate from the deployment keys used to fetch flag variants.

Keys can be created and managed via the Management API link in the Experiment sidebar.

### HTTP Conventions

#### Methods

The API only uses GET and POST methods for fetching and mutating respectively.

#### Inputs

For POST endpoints all input data should be provided via an application/json encoded request body.

For GET endpoints provide query parameters as needed.

#### Responses

All API responses will be application/json encoded.

#### Status Codes

The API uses meaningful status codes to communicate the result of requests.

For example:

| Code | Meaning |
| --- | --- |
| 200 | Success! |
| 400 | Input is missing or invalid |
| 401 | Invalid or revoked API key |
| 403 | API key does not have access to the specified environment |

### List Endpoints - Cursors

Endpoints that list resources such as /experiments/list will only return a limited number of items per request. In order to fetch the next page of items the `nextCursor` value returned from the first request must be passed as the `cursor` parameter of the next request. In this way multiple requests can be chained together to fetch the total set of items.

## List Experiments

`GET https://management-api.experiment.amplitude.com/experiments/list`

Fetch a list of experiments including their configuration details. Results are ordered with the most recently created experiments first.

### Example request

```bash
http GET 'https://management-api.experiment.amplitude.com/experiments/list?limit=1000' \
  Accept:application/json \
  Authorization:'Bearer {{api-key}}'
```

<!-- Brian can you add a cursor to that example request? -->

#### Query parameters

|<div class="big-column">Name</div>|Description|
|---|----|
|`limit`| Integer. The max number of experiments to be returned. Capped at 1000.|
|`cursor`| String. The offset to start the "page" of results from.|

### Response

#### 200 OK

A successful request returns a `200 OK` response and a list of experiments.

<!-- Brian need an example response body please-->

#### 400 Bad Request

An unsucessful request returns a `400 Bad Request` response and an error message.

<!-- Brian does it actually return errors with more info? Can you add a response body example?-->

## Get Experiment details

`GET https://management-api.experiment.amplitude.com/experiments/{id}`

Fetch the configuration details of an experiment.

### Example request

```bash
http GET 'https://management-api.experiment.amplitude.com/experiments/123456' \
  Accept:application/json \
  Authorization:'Bearer {{api-key}}'
```

#### Path variables

|<div class="big-column">Name</div>|Description|
|---|----|
|`id`| Required. String. The experiment's ID.|

### Response

#### 200 OK

A successful request returns a `200 OK` response and a JSON object with the experiment's details.

<!-- Brian, we need an example response body here-->

#### 400 Bad Request

An unsuccessful request returns a `400 Bad Request` response and an error message.

<!-- Brian does it actually return errors with more info? Can you add a response body example?-->

## Create Experiment

`POST https://management-api.experiment.amplitude.com/experiments/new`

Create a new experiment.

### Example request

<!-- Brian can we get a real-looking example request here?-->

```bash 

```
#### Body parameters

|<div class="big-column">Name</div>|Description|
|---|----|
|`projectId`| Required. String. The project's ID.|
|`key`| Required. String. <!-- Brian need more info-->|
|`description`| Optional. String. Description for the experiment.|
|`variants`| Optional. Array of objects. See the [variants](#variants) table for more information. |
|`bucketingKey`| Optional. String. <!-- Brian need more info-->|
|`rolloutWeights`|Optional. Object. Rollout weights for non-targeted users. The object should be a mapping from variant key to rollout weight as an integer e.g. { "control": 1, "treatment": 1 }|
|`targetSegments`| Optional. Object. <!-- Brian need more info-->. See the [targetSegments](#targetsegments) table for more information.|
|`stickyBucketing`|Optional. Boolean. <!-- Brian need a description of what happens when `true` and what the default is-->|
|`deployments`| Optional. Array of strings. List of deployment IDs that the experiment should be assigned to.|

#### Variants
The `variants` parameter can contain these objects. 

|<div class="big-column">Name</div>|Description|
|---|----|
|`key`| Optional. String. <!-- Brian need more info-->|
|`payload`| Optional. String. <!-- Brian need more info-->|
|`name`|Optional. String. The variant name. |
|`description`| Optional. String. The variant description.|

#### `targetSegments`

The `targetSegments` parameter can contain these objects.

|<div class="big-column">Name</div>|Description|
|---|----|
|`name`|Optional. String. The segment name. |
|`conditions`| Optional. Array. <!-- Brian need more info-->|
|`percentage`| Optional. Number. <!-- Brian need more info-->|
|`rolloutWeights`| Optional. Object. A map from variant key to rollout weight e.g. { "control": 1, "treatment": 1 }.|

### Response

#### 200 OK

A successful request returns a `200 OK` response and a JSON object with the experiment's details.

<!-- Brian, we need an example response body here-->

#### 400 Bad Request

An unsuccessful request returns a `400 Bad Request` response and an error message.

<!-- Brian does it actually return errors with more info? Can you add a response body example?-->

## Activate Experiment

`POST https://management-api.experiment.amplitude.com/experiments/{id}/activate`

<!-- Brian what does activating an experiment do?-->

### Example request

```bash
http POST https://management-api.experiment.amplitude.com/experiments/12345/activate \
  Accept:application/json \
  Authorization:'Bearer {{api-key}}'
```

#### Path variables

|<div class="big-column">Name</div>|Description|
|---|----|
|`id`| Required. String. The experiment's ID.|

### Response

#### 200 OK

A successful request returns a `200 OK` response.

<!-- Brian, we need an example response body here-->

#### 400 Bad Request

An unsuccessful request returns a `400 Bad Request` response and an error message.

<!-- Brian does it actually return errors with more info? Can you add a response body example?-->

## Deactivate Experiment

`POST https://management-api.experiment.amplitude.com/experiments/{id}/deactivate`

<!-- Brian what does deactivating an experiment do? -->

### Example request

```bash
http POST https://management-api.experiment.amplitude.com/experiments/12345/deactivate \
  Accept:application/json \
  Authorization:'Bearer {{api-key}}'
```

#### Path variables

|<div class="big-column">Name</div>|Description|
|---|----|
|`id`| Required. String. The experiment's ID.|

### Response

#### 200 OK

A successful request returns a `200 OK` response.

<!-- Brian, we need an example response body here-->

#### 400 Bad Request

An unsuccessful request returns a `400 Bad Request` response and an error message.

<!-- Brian does it actually return errors with more info? Can you add a response body example?-->

## Rollout weights

`POST https://management-api.experiment.amplitude.com/experiments/{id}/rollout-weights`

<!-- Brian what does this call do?-->

### Example request

<!-- Brian need a realistic request please-->

#### Path variables

#### Path variables

|<div class="big-column">Name</div>|Description|
|---|----|
|`id`| Required. String. The experiment's ID.|

#### Body parameters

|<div class="big-column">Name</div>|Description|
|---|----|
|`rolloutWeights`| Optional. Object. <!-- Brian need more info here-->|

### Response

#### 200 OK

A successful request returns a `200 OK` response.

<!-- Brian, we need an example response body here-->

#### 400 Bad Request

An unsuccessful request returns a `400 Bad Request` response and an error message.

<!-- Brian does it actually return errors with more info? Can you add a response body example?-->

## List deployments

`GET https://management-api.experiment.amplitude.com/deployments/list`

Fetch a list of deployments that experiments can be assigned to.

### Example request

```bash
http GET 'https://management-api.experiment.amplitude.com/deployments/list?limit=1000' \
  Accept:application/json \
  Authorization:'Bearer {{api-key}}'
```

#### Query parameters

|<div class="big-column">Name</div>|Description|
|---|----|
|`limit`| Integer. The max number of deployments to be returned. Capped at 1000.|
|`cursor`| String. The offset to start the "page" of results from.|

### Response

#### 200 OK

A successful request returns a `200 OK` response and a list of deployments.

<!-- Brian need an example response body please-->

#### 400 Bad Request

An unsucessful request returns a `400 Bad Request` response and an error message.

<!-- Brian does it actually return errors with more info? Can you add a response body example?-->