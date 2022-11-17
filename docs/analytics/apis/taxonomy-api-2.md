---
search:
  exclude: true 
title: Taxonomy API 2.0
description: The Taxonomy API lets you create, get, update, and delete categories, event types, event properties, and user properties.
---

The Taxonomy API 2.0 grants clients the ability to programmatically plan their event schema in Amplitude Data.

It's a GraphQL API, if you're not familiar with GraphQL query & manipulation language check for example [GitHub GraphQL API introduction](https://docs.github.com/en/graphql/guides/introduction-to-graphql).

TODO: **Note**: This document is currently in draft state. We're seeking feedback from the community as we develop this new API.

## Authorization

There are two ways to authorize your application to the Taxonomy API: using personal access tokens or OAuth access tokens.

### Personal access tokens

Personal access token are an alternative to using passwords for authentication to Amplitude Data when using the Taxonomy API or Ampli CLI. Personal access tokens are intended to access Amplitude Data resources on behalf of yourself. Each token can only access specific Data projects. You can have many of them and you can revoke access to each one at any time. To access resources on behalf of an organization, or for long-lived integrations, you should use an OAuth2 client application.

#### Retrieve personal access token

Navigate to Amplitude Data's Settings page and then check API Tokens section. Click "Create Token" button in the right upper corner to generate new token. Any token issued earlier can be revoked on this page as well.

#### Personal access token usage in Taxonomy API
Personal access token should be provided along with GraphQL request in `Authorization` header with `Bearer` schema, for example:

```bash
POST https://data-api.amplitude.com/graphql HTTP/1.1
Host: amplitude.com
Authorization: Bearer {personal-access-token}

query OrgQuery {
  orgs {
    id
  }
}
```

### OAuth access tokens
OAuth2 is a protocol that lets external applications request authorization to private details in a user's Amplitude Data account without accessing their password. This is preferred over Basic Authentication because tokens can be limited to specific types of data and can be revoked by users at any time.

An OAuth client application uses Amplitude as an identity provider to authenticate as the user who grants access to the app. This means when a user grants an OAuth client app access, they grant permissions to all Data projects they have access to in their account, and also to any organizations they belong to. Building an OAuth client app is a good option if you are creating more complex processes than a simple script can handle. Note that OAuth Apps are applications that need to be hosted somewhere.

#### Authorization endpoints

| Region              | Endpoint                                                       |
|---------------------|----------------------------------------------------------------|
| Standard Server     | [https://auth.amplitude.com](https://auth.amplitude.com)       |
| EU Residency Server | [https://auth.eu.amplitude.com](https://auth.eu.amplitude.com) |


#### Register new OAuth client application
Amplitude Data supports [OAuth 2.0 Dynamic Client Registration Protocol](https://datatracker.ietf.org/doc/html/rfc7591), it allows to create new application with POST request:

`POST https://auth.amplitude.com/oauth2/register`

##### Example request

```bash
POST https://auth.amplitude.com/oauth2/register
Content-Type: application/json

{
  "allowed_cors_origins": [
    "https://amp-test-org.com"
  ],
  "client_name": "amp-test-client",
  "contacts": [
    "support@amplitude.com"
  ],
  "grant_types": [
    "authorization_code",
    "refresh_token"
  ],
  "owner": "Data Monster",
  "redirect_uris": [
    "https://amp-test-org.com/oauth/callback"
  ],
  "response_types": [
    "code"
  ],
  "scope": "charts:read version:read version:write openid offline",
  "token_endpoint_auth_method": "client_secret_post",
  "token_endpoint_auth_signing_alg": "none"
}
```

##### Response

A successful request returns a `200 OK` status and a JSON body.

```json
{
  "client_id": "{client-id}",
  "client_name": "amp-test-client",
  "client_secret": "{client-secret}",
  "redirect_uris": [
    "https://amp-test-org.com/oauth/callback"
  ],
  "grant_types": [
    "authorization_code",
    "refresh_token"
  ],
  "response_types": [
    "code"
  ],
  "scope": "charts:read version:read version:write openid offline",
  "audience": [],
  "owner": "Data Monster",
  "policy_uri": "",
  "allowed_cors_origins": [
    "https://amp-test-org.com"
  ],
  "contacts": [
    "support@amplitude.com"
  ],
  "subject_type": "public",
  "token_endpoint_auth_method": "client_secret_post",
  "token_endpoint_auth_signing_alg": "none",
  "userinfo_signed_response_alg": "none",
  "created_at": "2022-11-16T01:15:54Z",
  "updated_at": "2022-11-16T01:15:53.584746Z",
  "metadata": {},
  "registration_access_token": "{registration-access-token-1}"
}
```

#### Update OAuth client application
Registration request returns `registration_access_token`, use it to modify application metadata when required.

##### Example request

```bash
PUT https://auth.amplitude.com/oauth2/register/{client_id}
Authorization: Bearer <registration_access_token>
Content-Type: application/json

{
  "redirect_uris": [
    "https://amp-test-org.com/oauth/callback2"
  ],
}
```

##### Response

A successful request returns a `200 OK` status and a JSON body.

```json
{
  "client_id": "{client-id}",
  "redirect_uris": [
    "https://amp-test-org.com/oauth/callback2"
  ],
  "registration_access_token": "{registration-access-token-2}"
}
```

The response includes the updated OAuth2 Client. When updating the OAuth2 Client, the server responds with a new registration access token. The old one becomes invalid.

#### Delete OAuth client application
Registration request returns `registration_access_token`, use it to delete application when it's not in use.

##### Example request

```bash
DELETE https://auth.amplitude.com/oauth2/register/{client_id}
Authorization: Bearer <registration_access_token>
```

#### Retrieve OAuth access tokens

To retrieve an OAuth access token, you'll first need to create your application as described in the previous step.

You can then use any OAuth2 client library to implement the OAuth2 Authorize Code Flow with Refresh Token. One sample application for your reference is available at [https://www.ory.sh/docs/hydra/5min-tutorial](https://www.ory.sh/docs/hydra/5min-tutorial).

#### OAuth2 access token usage in Taxonomy API
OAuth2 access tokens should be provided along with GraphQL requests as part of the `Authorization` header with no schema, for example:

```bash
POST https://data-api.amplitude.com/graphql HTTP/1.1
Host: amplitude.com
Authorization: {oauth2-access-token}

query OrgQuery {
  orgs {
    id
  }
}
```


## Endpoints

| Region              | Endpoint                                                                               |
|---------------------|----------------------------------------------------------------------------------------|
| Standard Server     | [https://data-api.amplitude.com/graphql](https://data-api.amplitude.com/graphql)       |
| EU Residency Server | [https://data-api.eu.amplitude.com/graphql](https://data-api.eu.amplitude.com/graphql) |

## Limits

There is a concurrent limit and a rate limit for the endpoint.
The concurrent limit restricts the amount of requests you can run at the same time, while the rate limit restricts the total number of queries you can run per hour.
The limits are per Data Project, and exceeding any of these limits returns a 429 error.

The endpoints use a cost per query model. Here are the max costs per API Key:

- **Concurrent Cost Limit:** You can run queries that collectively add up to 4 cost at the same time.
- **Period Cost Limit:** You can run up to 7200 cost per hour.

Cost structure of each endpoint:

- Query: 1 cost
- Mutation: 2 cost

## Tracking plan

Every tracking plan consists of one or more branches and each branch consists of multiple versions. A branch called `main` is created by default and you can always create more branches if required. All versions in each branch are _published_ and immutable except for the _staging_ version which can be modified. To make changes to a tracking plan, you'll need the ID of the branch you're making changes to and the ID of staging version on that branch. Then, to save your changes and make them available in Amplitude Analytics, you'll need to publish the staging version. Examples below show how to do this.

### Get branch and its staging version IDs

Retrieve the `main` branch's ID and its staging version's ID.

#### Example query

``` json
query VersionQuery {
  orgs {
    id
    workspaces (name: "Nimbus 2000") {
      id
      branches (default: true) {
        id
        name
        stagingVersionId
      }
    }
  }
}
```

#### Response

A successful request returns a `200 OK` status with a JSON body:

``` json
{
  "data": {
    "orgs": [
      {
        "id": "36958",
        "workspaces": [
          {
            "id": "24c45193-1e67-4f73-b7bd-165033061b24",
            "branches": [
              {
                "id": "574c4710-d85d-4a6f-bc41-8d55ca9445ec",
                "name": "main",
                "stagingVersionId": "a5e59bdd-1b6d-4e07-9201-f9315f67d86d",
              }
            ]
          }
        ]
      }
    ]
  }
}
```

### Publish staging version changes

Publish staging version in the main branch to make it available in Amplitude Analytics. 

#### Example mutation

``` graphql
mutation PublishVersion($input: PublishVersionInput!) {
  publishVersion(input: $input) {
    id
    name
    currentVersionId
    stagingVersionId
  }
}
variables {
  "input": {
    "branchId": "574c4710-d85d-4a6f-bc41-8d55ca9445ec",
    "versionId": "f030d1a5-ca67-4bac-8322-334c0231422a",
    "description": "Added new event \"Sell Nimbus\" and now it's ready for instrumentation"
  }
}
```

#### Response

A successful request returns a `200 OK` status and a JSON body. The response contains new staging version id available for the next set of changes.

```json
{
  "data": {
    "publishVersion": {
      "id": "574c4710-d85d-4a6f-bc41-8d55ca9445ec",
      "name": "main",
      "currentVersionId": "f030d1a5-ca67-4bac-8322-334c0231422a",
      "stagingVersionId": "f90c0ee9-80a4-443c-b1d5-25f2af9b7a2e"
    }
  }
}
```

## Event category

Event categories are a way to organize your event types into broad groups.

!!!example
    You want to track how users register for your app, checkout, and how they interact with the onboarding experience. You can bucket your events using these event categories:

    - Registration
    - Checkout
    - Onboarding

### Create event category

Not currently supported. You can however assign a category directly to an event type, see correspondent [Create event type](#create-event-type) and [Update event type](#update-event-type).

### Get all event categories

Not currently supported. You can however retrieve event types with assigned categories, see [Get an Event Type](#get-an-event-type).

### Get event category

Not currently supported.

### Update event category

Not currently supported. You can however update the category on all associated event types, see [update event type](#update-event-type).

### Delete an event category

Not currently supported. You can however remove the category from all event types in the latest tracking plan version, see [update event type](#update-event-type).

## Event type

An event is any action a user can take, like *start game* or *add to cart,* or any activity associated with a user, like in-app notifications or push notifications.

You can use the API to manipulate event types.

### Create event type

Creates one or more event types.

#### Example mutation

``` graphql
mutation CreateEvents($input: [CreateEventInput!]!) {
  createEvents(input: $input) {
    name
    description
    properties {
      name
      description
    }
  }
}
variables {
  "input": [
    {
      "versionId": "a5e59bdd-1b6d-4e07-9201-f9315f67d86d",
      "name": "Sell Nimbus",
      "description": "Fires every time when someone sell Nimbus 2000 broomstick",
      "properties": [
        {
          "versionId": "a5e59bdd-1b6d-4e07-9201-f9315f67d86d",
          "kind": "event",
          "name": "store",
          "type": "1",
          "required": false,
        }
      ]
    }
  ]
}
```

#### Response

A successful request returns a `200 OK` response with a JSON body:

```json
{
  "data": {
    "createEvents": [
      {
        "name": "Sell Nimbus",
        "description": "Fires every time when someone sell Nimbus 2000 broomstick",
        "properties": [
          {
            "name": "store",
            "description": ""
          }
        ]
      }
    ]
  }
}
```

### Get all event types

Retrieve all event types in a project.

#### Example query

``` json
query EventQuery {
  orgs {
    id
    workspaces (name: "Nimbus 2000") {
      id
      branches (default: true) {
        id
        name
        stagingVersionId
        versions (id: "a5e59bdd-1b6d-4e07-9201-f9315f67d86d") {
          events {
            id
            name
            description
            category
          }
        }
      }
    }
  }
}
```

#### Response

A successful request returns a `200 OK` status with a JSON body:

``` json
{
  "data": {
    "orgs": [
      {
        "id": "36958",
        "workspaces": [
          {
            "id": "24c45193-1e67-4f73-b7bd-165033061b24",
            "branches": [
              {
                "id": "574c4710-d85d-4a6f-bc41-8d55ca9445ec",
                "name": "main",
                "stagingVersionId": "a5e59bdd-1b6d-4e07-9201-f9315f67d86d",
                "versions": [
                  {
                    "events": [
                      {
                        "id": "06b24333-b093-4abf-86a3-7300e72b0efc",
                        "name": "Use Nimbus",
                        "description": "Fires every time when someone use Nimbus 2000 broomstick",
                        "category": "Marketing",
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
```

### Get event type

Get a single event type by name.

#### Example query

``` graphql
query EventQuery {
  orgs {
    id
    workspaces (name: "Nimbus 2000") {
      id
      branches (default: true) {
        id
        name
        stagingVersionId
        versions (id: "a5e59bdd-1b6d-4e07-9201-f9315f67d86d") {
          events {
            id
            name
            description
            category
          }
        }
      }
    }
  }
}
```

#### Response

A successful request returns a `200 OK` status with a JSON body:

```json
{
  "data": {
    "orgs": [
      {
        "id": "36958",
        "workspaces": [
          {
            "id": "24c45193-1e67-4f73-b7bd-165033061b24",
            "branches": [
              {
                "id": "574c4710-d85d-4a6f-bc41-8d55ca9445ec",
                "name": "main",
                "stagingVersionId": "a5e59bdd-1b6d-4e07-9201-f9315f67d86d",
                "versions": [
                  {
                    "events": [
                      {
                        "id": "06b24333-b093-4abf-86a3-7300e72b0efc",
                        "name": "Use Nimbus",
                        "description": "Fires every time when someone use Nimbus 2000 broomstick",
                        "category": "Marketing",
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
```

### Update event type

Update one or more event types.

#### Example mutation

``` graphql
mutation EditEvents($input: [EditEventInput!]!) {
  editEvents(input: $input) {
    name
    description
    category
  }
}
variables {
  "input": [
    {
      "id": "06b24333-b093-4abf-86a3-7300e72b0efc",
      "versionId": "f030d1a5-ca67-4bac-8322-334c0231422a",
      "category": "Sales"
    }]
}
```

#### Response

A successful request returns a `200 OK` status and a JSON body.

```json
{
  "data": {
    "editEvents": [
      {
        "name": "Use Nimbus",
        "description": "Fires every time when someone use Nimbus 2000 broomstick",
        "category": "Sales"
      }
    ]
  }
}
```

### Delete an event type

Delete an event type.

#### Example mutation

``` graphql
mutation DeleteEvents($input: [DeleteEventInput!]!) {
  deleteEvents(input: $input)
}
variables {
  "input": [
    {
      "id": "06b24333-b093-4abf-86a3-7300e72b0efc",
      "versionId": "f030d1a5-ca67-4bac-8322-334c0231422a"
    }
  ]
}
```

#### Response

A successful request returns a `200 OK` status and a JSON body.

```json
{
  "data": {
    "deleteEvents": [
      "06b24333-b093-4abf-86a3-7300e72b0efc"
    ]
  }
}
```

## Event property

Event properties describe the attributes of an event. For example, if 'Swipe' is an event that you are tracking, then the event property ‘Direction’ could have the values ‘Left’ or ‘Right’.

### Create event property

Create an event property.

#### Example mutation

``` graphql
mutation CreateEventProperties($input: [CreateEventPropertyInput!]!) {
  createEventProperties(input: $input) {
    id
    versionId
    name
    description
  }
}
variables {
  "input": [
    {
      "versionId": "f030d1a5-ca67-4bac-8322-334c0231422a",
      "eventId": "19c43e43-a905-4f8e-8718-8a299d24a291",
      "input":
        {
          "versionId": "f030d1a5-ca67-4bac-8322-334c0231422a",
          "kind": "event",
          "name": "customer",
          "description": "customer name",
          "type": "1",
          "required": false,
        }
    }]
}
```

#### Response

A successful request returns a `200 OK` response with a JSON body:

```json
{
  "data": {
    "createEventProperties": [
      {
        "id": "3b942b21-9382-4579-ad13-ca1d4e4c86df",
        "versionId": "f030d1a5-ca67-4bac-8322-334c0231422a",
        "name": "customer",
        "description": "customer name"
      }
    ]
  }
}
```

### Get event properties

Get all properties on an event.

#### Example query

``` graphql
query EventQuery {
  orgs {
    id
    workspaces (name: "Nimbus 2000") {
      id
      branches (default: true) {
        id
        name
        stagingVersionId
        versions (id: "f030d1a5-ca67-4bac-8322-334c0231422a") {
          events (eventTypes: "Sell Nimbus") {
            id
            name
            description
            category
            properties {
              name
              type
              description
              required
              schema
            }
          }
        }
      }
    }
  }
}
```

#### Response

A successful request returns a `200 OK` status with a JSON body:

```json
{
  "data": {
    "orgs": [
      {
        "id": "36958",
        "workspaces": [
          {
            "id": "24c45193-1e67-4f73-b7bd-165033061b24",
            "branches": [
              {
                "id": "574c4710-d85d-4a6f-bc41-8d55ca9445ec",
                "name": "main",
                "stagingVersionId": "f030d1a5-ca67-4bac-8322-334c0231422a",
                "versions": [
                  {
                    "events": [
                      {
                        "id": "19c43e43-a905-4f8e-8718-8a299d24a291",
                        "name": "Sell Nimbus",
                        "description": "Fires every time when someone sell Nimbus 2000 broomstick",
                        "category": "",
                        "properties": [
                          {
                            "name": "customer",
                            "type": "1",
                            "displayName": "customer",
                            "description": "customer name",
                            "required": false,
                            "schema": {}
                          },
                          {
                            "name": "store",
                            "type": "1",
                            "description": "",
                            "required": false,
                            "schema": {}
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
```

### Get event property

Get a single event property.

#### Example query

``` graphql
query EventQuery {
  orgs {
    id
    workspaces (name: "Nimbus 2000") {
      id
      branches (default: true) {
        id
        name
        stagingVersionId
        versions (id: "f030d1a5-ca67-4bac-8322-334c0231422a") {
          events (eventTypes: "Sell Nimbus") {
            id
            name
            description
            category
            displayName
            isBlocked
            isDeleted
            isPlanned
            isQueryable
            properties(propertyId: "5811688c-8d89-41b4-b369-6142c097bd84") {
              name
              type
              description
              required
              schema
            }
          }
        }
      }
    }
  }
}
```

#### Response

A successful request returns a `200 OK` status with a JSON body:

```json
{
  "data": {
    "orgs": [
      {
        "id": "36958",
        "workspaces": [
          {
            "id": "24c45193-1e67-4f73-b7bd-165033061b24",
            "branches": [
              {
                "id": "574c4710-d85d-4a6f-bc41-8d55ca9445ec",
                "name": "main",
                "stagingVersionId": "f030d1a5-ca67-4bac-8322-334c0231422a",
                "versions": [
                  {
                    "events": [
                      {
                        "id": "19c43e43-a905-4f8e-8718-8a299d24a291",
                        "name": "Sell Nimbus",
                        "description": "Fires every time when someone sell Nimbus 2000 broomstick",
                        "category": "",
                        "properties": [
                          {
                            "id": "5811688c-8d89-41b4-b369-6142c097bd84",
                            "name": "store",
                            "type": "1",
                            "description": "",
                            "required": false,
                            "schema": {}
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
```

### Update event property

Update an event property. Note that if the property is shared by multiple event types, the change affects them all.

#### Example mutation

``` graphql
mutation EditProperties($input: [EditPropertyInput!]!) {
  editProperties(input: $input) {
    id
    versionId
    name
    description
  }
}
variables {
  "input": [
    {
      "versionId": "f030d1a5-ca67-4bac-8322-334c0231422a",
      "id": "3b942b21-9382-4579-ad13-ca1d4e4c86df",
      "description": "customer name or email"
    }
  ]
}
```

#### Response

A successful request returns a `200 OK` response with a JSON body:

```json
{
  "data": {
    "editProperties": [
      {
        "id": "3b942b21-9382-4579-ad13-ca1d4e4c86df",
        "versionId": "f030d1a5-ca67-4bac-8322-334c0231422a",
        "name": "customer",
        "description": "customer name or email"
      }
    ]
  }
}
```

### Delete event property

Delete an event property.

#### Example mutation

``` graphql
mutation RemoveProperties($input: [RemovePropertyInput!]!) {
  removeProperties(input: $input)
}
variables {
  "input": [
    {
      "versionId": "f030d1a5-ca67-4bac-8322-334c0231422a",
       "id": "3b942b21-9382-4579-ad13-ca1d4e4c86df"
    }
  ]
}
```

#### Response

A successful request returns a `200 OK` response with a JSON body:

```json
{
  "data": {
    "removeProperties": [
      "3b942b21-9382-4579-ad13-ca1d4e4c86df"
    ]
  }
}
```

## User property

User properties reflect traits about the individuals using your product.

### Create user property

Create a user property.

#### Example mutation

``` graphql
mutation CreateUserProperties($input: [CreatePropertyInput!]!) {
  createProperties(input: $input) {
    id
    versionId
    name
    description
  }
}
variables {
  "input": [
    {
      "versionId": "f030d1a5-ca67-4bac-8322-334c0231422a",
        "kind": "identify",
        "name": "orgId",
        "description": "organization id",
        "type": "1",
        "required": false,
    }]
}
```

#### Response

A successful request returns a `200 OK` response with a JSON body:

```json
{
  "data": {
    "createProperties": [
      {
        "id": "4ae6fdb4-d8cb-4bb4-8de2-af67213de85c",
        "versionId": "f030d1a5-ca67-4bac-8322-334c0231422a",
        "name": "orgId",
        "description": "organization id"
      }
    ]
  }
}
```

### Get all user properties

Retrieves all user properties in your account.

#### Example query

``` graphql
query EventQuery {
  orgs {
    id
    workspaces (name: "Nimbus 2000") {
      id
      branches (default: true) {
        id
        name
        stagingVersionId
        versions (id: "f030d1a5-ca67-4bac-8322-334c0231422a") {
          properties (kinds: identify) {
            id
            type
            name
            description
            required
            schema
          }
        }
      }
    }
  }
}
```

#### Response

A successful request returns a `200 OK` status with a JSON body:

```json
{
  "data": {
    "orgs": [
      {
        "id": "36958",
        "workspaces": [
          {
            "id": "24c45193-1e67-4f73-b7bd-165033061b24",
            "branches": [
              {
                "id": "574c4710-d85d-4a6f-bc41-8d55ca9445ec",
                "name": "main",
                "stagingVersionId": "f030d1a5-ca67-4bac-8322-334c0231422a",
                "versions": [
                  {
                    "properties": [
                      {
                        "id": "41130c27-31aa-45e4-a76d-018d45c96656",
                        "name": "Cohort",
                        "type": "4",
                        "description": "cohort description added in SG",
                        "required": false,
                        "schema": {}
                      },
                      {
                        "id": "4ae6fdb4-d8cb-4bb4-8de2-af67213de85c",
                        "name": "orgId",
                        "type": "1",
                        "description": "organization id",
                        "required": false,
                        "schema": {}
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
```

### Get user property

Retrieves a single user property by name.

#### Example query

``` graphql
query EventQuery {
  orgs {
    id
    workspaces (name: "Nimbus 2000") {
      id
      branches (default: true) {
        id
        name
        stagingVersionId
        versions (id: "f030d1a5-ca67-4bac-8322-334c0231422a") {
          properties (kinds: identify, name: "orgId") {
              id
              name
              type
              description
              required
              schema
          }
        }
      }
    }
  }
}
```

#### Response

A successful request returns a `200 OK` status with a JSON body:

```json
{
  "data": {
    "orgs": [
      {
        "id": "36958",
        "workspaces": [
          {
            "id": "24c45193-1e67-4f73-b7bd-165033061b24",
            "branches": [
              {
                "id": "574c4710-d85d-4a6f-bc41-8d55ca9445ec",
                "name": "main",
                "stagingVersionId": "f030d1a5-ca67-4bac-8322-334c0231422a",
                "versions": [
                  {
                    "properties": [
                      {
                        "id": "4ae6fdb4-d8cb-4bb4-8de2-af67213de85c",
                        "name": "orgId",
                        "type": "1",
                        "description": "organization id",
                        "required": false,
                        "schema": {}
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}

```

### Update user property

Update a user property.

#### Example mutation

``` graphql
mutation EditProperties($input: [EditPropertyInput!]!) {
  editProperties(input: $input) {
    id
    versionId
    name
    description
  }
}
variables {
  "input": [
    {
      "versionId": "f030d1a5-ca67-4bac-8322-334c0231422a",
      "id": "4ae6fdb4-d8cb-4bb4-8de2-af67213de85c",
      "description": "internal organization id"
    }
  ]
}
```

#### Response

A successful request returns a `200 OK` response with a JSON body:

```json
{
  "data": {
    "editProperties": [
      {
        "id": "4ae6fdb4-d8cb-4bb4-8de2-af67213de85c",
        "versionId": "f030d1a5-ca67-4bac-8322-334c0231422a",
        "name": "orgId",
        "description": "internal organization id"
      }
    ]
  }
}
```

### Delete user property

Delete a single user property by ID.

#### Example mutation

``` graphql
mutation RemoveProperties($input: [RemovePropertyInput!]!) {
  removeProperties(input: $input)
}
variables {
  "input": [
    {
      "versionId": "f030d1a5-ca67-4bac-8322-334c0231422a",
       "id": "4ae6fdb4-d8cb-4bb4-8de2-af67213de85c"
    }
  ]
}
```

#### Response

A successful request returns a `200 OK` response with a JSON body:

```json
{
  "data": {
    "removeProperties": [
      "4ae6fdb4-d8cb-4bb4-8de2-af67213de85c"
    ]
  }
}
```
