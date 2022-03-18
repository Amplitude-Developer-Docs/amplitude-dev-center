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