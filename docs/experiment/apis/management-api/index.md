---
title: Management API Endpoints
description: REST API for managing feature flags and experiment configurations.
toplevel: true
---

The Experiment management API can be used to programmatically create and control flags and experiments.

## Management API Key

You can create and revoke management API keys by clicking on "Management API" in the bottom left of the sidebar. Read more about the Management API Key in our [comprehensive guide to all amplitude keys](../../../guides/amplitude-keys-guide/?h=keys#management-api-key).

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

Endpoints that list resources such as `/experiments` will only return a limited number of items per request. To fetch the next page of items, the `nextCursor` value returned from the first request must be passed as the `cursor` parameter of the next request. In this way multiple requests can be chained together to fetch the total set of items.

------

[Endpoints Version 1](api-v1.md)

[Endpoints Beta](api-beta.md)
!!!warning "Using Beta version is not recommended. Use versioned APIs instead."

!!!tip "Our versioned API is fully backwards compatible and does not introduce any breaking changes; simply update the request url."