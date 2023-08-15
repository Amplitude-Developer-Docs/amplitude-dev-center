---
title: Management API
description: REST API for managing feature flags and experiment configurations.
toplevel: true
---

The Experiment management API can be used to programmatically create and control flags and experiments.

## Endpoints

| <div class="big-column">API</div> | Description |
| --- | --- |
|[Flag APIs](flags.md)| Flag APIs to create, edit, and display flags, and their properties.  |
|[Experiment APIs](experiments.md)| Experiment APIs to create, edit, and display experiments, and their properties.  |
|[Deployment APIs](deployments.md)| Deployment APIs to create, edit, and display deployments that flags or experiments can be assigned to. |

!!!info "Beta API Migration"
    
    If you're currently using the [Beta API](api-beta.md), please update to use the new API URL domain (`experiment.amplitude.com` and path prefix` /api/1`).

## Management API Key

You can create and revoke management API keys by clicking on "Management API" in the bottom left of the sidebar. Read more about the Management API Key in our [comprehensive guide to all amplitude keys](../../../guides/amplitude-keys-guide/?h=keys#management-api-key).

## Authorization

The management API uses the HTTP Authorization header for authentication.

The header must be: `Authorization: Bearer <management-api-key>`.

!!!warning "Management API Keys"
    Management API keys are different from the deployment keys used to fetch flag variants. They're created and managed via the Management API link in the Experiment sidebar.

## Rate limiting

Current API limits are per project, and impose the following restrictions:

| Limit (requests) | Duration |
| --- | --- |
| 100 | 1 second |
| 100000 | Daily. Daily limits is reset at the end of the day UTC time. |

## Regions

| Region | Endpoint |
| --- | --- |
| Standard Server | [https://experiment.amplitude.com](https://experiment.amplitude.com) |
| EU Residency Server | [https://experiment.eu.amplitude.com](https://experiment.eu.amplitude.com) |

## Conventions

### Status codes

The API uses meaningful status codes to communicate the result of requests.

| Code | Meaning |
| --- | --- |
| 200 | Success! |
| 400 | Input is missing or invalid |
| 401 | Invalid or revoked API key |
| 403 | API key doesn't have access to the specified environment |
| 429 |Too many requests |

### Cursors

Endpoints that list resources such as `/experiments` will only return a limited number of items per request. To fetch the next page of items, the `nextCursor` value returned from the first request must be passed as the `cursor` parameter of the next request. In this way multiple requests can be chained together to fetch the total set of items.
