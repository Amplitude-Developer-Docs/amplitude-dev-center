---
title: SCIM API
description: The User Management API in Amplitude provides a programmatic solution to provisioning and group management through a public API. This API uses the System for Cross-domain Identity Management (SCIM) 2.0 Standard.
---

The User Management API in Amplitude provides a programmatic solution to provisioning and
 group management through a public API. This enables administrators to manage their organizations at scale and integrate the provisioning process with other tools, including Identity Providers.

This guide provides detailed documentation on the specific routes supported by Amplitude's
 implementation of the
  [System for Cross-domain Identity Management (SCIM) 2.0 Standard](http://www.simplecloud.info/#Specification), with specific attention to any details useful for debugging issues with a SCIM integration.

For a guide detailing how to **integrate** the SCIM API with an Identity Provider like Okta or JumpCloud, or how to enable the SCIM API for an organization, see the [Help Center Guide](https://help.amplitude.com/hc/en-us/articles/360058399851).

--8<-- "includes/postman.md"

## Authorization

Authorize by sending a Bearer Token in the Authorization Header.
 The token should equal the key that's generated on the Access and SSO page in
  the Settings Tab of Amplitude (see the [Help Center Guide](https://help.amplitude.com/hc/en-us/articles/360058399851) for a detailed guide on how to find and save this key).

Example request header:

```bash
GET /scim/1/Users HTTP/1.1
Host: core.amplitude.com
Authorization: Bearer {{scim-token}}
```

## Considerations

### Base URL

The Base URL of the SCIM API is `https://core.amplitude.com/scim/1/`, and all routes can be
 formed according to the SCIM Standard. This URL doesn't change between organizations, as the SCIM key used in authentication is used to determine which organization the requests are directed toward.

Although the route includes "1", this doesn't mean that Amplitude implements the SCIM 1.1 Standard. This is to denote the Amplitude version of this implementation, future-proofing for new iterations of the API that introduce breaking changes without disrupting service for current consumers.

### API Usage Limits

The SCIM API supports 100 requests per minute per organization. This restriction can be lifted for burst requests on a per-request basis. Contact the support team or a customer success manager for more information.

## User Routes

This section details routes and information that deal with user management.

!!!note "Important notes about users"
    - Users are defined as active within Amplitude regardless of whether they have accepted the invitation and
     have logged in once to the organization within Amplitude. This prevents Identity Providers from resending invitations to invited and pending users.
    - The SCIM API sends users who are created through the POST route an email invitation to complete sign up.

### Supported user fields

Amplitude supports the following fields in the core User Schema:

| SCIM User Attribute |  Notes |
| --- | --- |
| `userName` | Primary user email address. |
| `id` | Primary user email address. |
| `emails` | Amplitude supports one email address per user currently. |
| `name.givenName` | Prepended to `familyName` to create the display name. |
| `name.familyName` | appended to `givenName` to create display name within Amplitude. |
| `active` | True for pending and joined users. |

### `GET /Users`

Gets a list of users within Amplitude for that organization. This includes both pending and joined users, and supports pagination and filtering.

```bash
GET /scim/1/Users HTTP/1.1
Host: core.amplitude.com
Authorization: Bearer {{scim-token}}
```

#### Query parameters

|<div class="big-column">Name</div>| Description|
|---|---|
|`startIndex`| Optional. Integer. Defaults to 1. 1-indexed.|
|`itemsPerPage`| Optional. Integer. Defaults to 100. Can be overridden to be higher.|
|`filter`|String. Must follow the [SCIM filter syntax](https://datatracker.ietf.org/doc/html/rfc7644#section-3.4.2.2)|

#### Response

A successful request returns a JSON response with user data.

```json
{
    "schemas": [
        "urn:ietf:params:scim:api:messages:2.0:ListResponse"
    ],
    "startIndex": 1,
    "itemsPerPage": 100,
    "totalResults": 1,
    "Resources": [
        {
            "schemas": [
                "urn:ietf:params:scim:schemas:core:2.0:User"
            ],
            "id": "datamonster@amplitude.com",
            "userName": "datamonster@amplitude.com",
            "name": {
                "givenName": "data",
                "familyName": "monster"
            },
            "active": true,
            "emails": [
                {
                    "value": "datamonster@amplitude.com",
                    "primary": true
                }
            ],
            "meta": {
                "resourceType": "User"
            }
        }
    ]
}
```

### `GET /Users/:id`

Gets a user by ID.

```bash
GET /scim/1/Users/datamonster@amplitude.com HTTP/1.1
Host: core.amplitude.com
Authorization: Bearer {{scim-token}}
```

#### Path variables

|<div class="big-column">Name</div>| Description|
|---|---|
|`id`| Required. Must be a valid email address. Not case sensitive.|

#### Response

A successful request returns a JSON response with the user's data.

```json
{
    "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:User"
    ],
    "id": "datamonster@amplitude.com",
    "userName": "datamonster@amplitude.com",
    "name": {
        "givenName": "Data",
        "familyName": "Monster"
    },
    "active": true,
    "emails": [
        {
            "primary": true,
            "value": "datamonster@amplitude.com"
        }
    ],
    "groups": [],
    "meta": {
        "resourceType": "User"
    }
}
```

### `POST /Users`

A `POST` request creates a new user in Amplitude. This operation sends an invitation link to the email address.
 To succeed, `id` and `userName` must be valid emails, and the user can't already exist or have a pending invite to your Amplitude organization.

The request body for the `POST` route should be a valid SCIM User Resource.

!!!note
     The API ignores the `Groups` field on user routes. To add a user to a group, make a request to the group API routes.

#### Example request

```bash
POST /scim/1/Users/ HTTP/1.1
Host: core.amplitude.com
Authorization: Bearer {{scim-token}}
Content-Type: application/json
Content-Length: 364

{
   "schemas":[
      "urn:ietf:params:scim:schemas:core:2.0:User"
   ],
   "id":"<USER EMAIL>",
   "userName":"<USER EMAIL>",
   "name":{
      "givenName":"<USER GIVEN NAME>",
      "familyName":"<USER FAMILY NAME>"
   },
   "emails":[
      {
         "value":"<USER EMAIL>",
         "primary":true
      }
   ],
   "meta":{
      "resourceType":"User"
   }
}
```

#### Request body

See [supported user fields](#supported-user-fields) for this request's body parameters.

#### Response

A successful request returns `201 Created` and the original request body.

### `PUT /Users/:id` and `PATCH /Users/:id`

Updates the Amplitude user with the given ID. `id` must be a valid email address, and the user must have already been invited to Amplitude. You can't change the email address.

Setting the `active` schema field to `false` in the request body removes the user from the organization,
 and the user loses all access. If the user is pending (an invited user that hasn't accepted the invitation), the invitation is revoked.

#### Example requests

=== "Update `givenName`"

    In this example, update the user's given name. 

    ```bash hl_lines="11"
    PUT /scim/1/Users/datamonster@amplitude.com HTTP/1.1
    Host: core.amplitude.com
    Authorization: Bearer {{scim-token}}
    Content-Length: 423

    {
        "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
        "id": "datamonster@amplitude.com",
        "userName": "datamonster@amplitude.com",
        "name": {
            "givenName": "Datamonster",
            "familyName": "Monster"
        },
        "emails": [{
            "primary": true,
            "value": "datamonster@amplitude.com"
        }],
        "active": true,
        "groups": [],
        "meta": {
            "resourceType": "User"
        }
    }
    ```
=== "Deactivate user"

    In this example, you update `active` to `false` and deactivate the user. 

    ```bash hl_lines="18"
    PUT /scim/1/Users/datamonster@amplitude.com HTTP/1.1
    Host: core.amplitude.com
    Authorization: Bearer {{scim-token}}
    Content-Length: 424

    {
        "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
        "id": "datamonster@amplitude.com",
        "userName": "datamonster@amplitude.com",
        "name": {
            "givenName": "Datamonster",
            "familyName": "Monster"
        },
        "emails": [{
            "primary": true,
            "value": "datamonster@amplitude.com"
        }],
        "active": false,
        "groups": [],
        "meta": {
            "resourceType": "User"
        }
    }
    ```

#### Response

A successful request returns a `200 OK` status and the original request body.

### `DELETE /Users/:id`

Deletes the Amplitude user with the given ID. The ID must be a valid email, and the user must have been invited to Amplitude already.

If a pending user (an invited user that hasn't accepted the invitation) is deleted, the invitation is revoked.

#### Path variables

|<div class="big-column">Name</div>| Description|
|---|---|
|`id`| Required. Must be a valid email address. Not case sensitive.|

#### Example request

```bash
DELETE /scim/1/Users/datamonster@amplitude.com HTTP/1.1
Host: core.amplitude.com
Authorization: Bearer {{scim-token}}
```

#### User response

A successful delete request returns a `204 No Content` response.

## Group routes

!!!info
    Permission groups are available in Enterprise accounts.

This section details the requests available for Permission Group related APIs. Amplitude supports all core fields of the Group Schema, with users within groups returned with the fields listed in [supported user fields](#supported-user-fields).

### Group route methods

--8<-- "includes/postman.md"

### `GET /Groups`

Returns all active groups.

#### Example request

```bash

GET /scim/1/Groups HTTP/1.1
Host: core.amplitude.com
Authorization: Bearer {{scim-token}}
```

#### Example response

A successful request returns a JSON response with group data.

```json
{
    "schemas": [
        "urn:ietf:params:scim:api:messages:2.0:ListResponse"
    ],
    "startIndex": 1,
    "itemsPerPage": 100,
    "totalResults": 1,
    "Resources": [
        {
            "schemas": [
                "urn:ietf:params:scim:schemas:core:2.0:Group"
            ],
            "id": 632,
            "displayName": "Datamonster Party",
            "members": [
                {
                    "value": "data.engineer@amplitude.com",
                    "display": "data nommer"
                },
                {
                    "value": "datamonster@amplitude.com",
                    "display": "data monster"
                }
            ],
            "meta": {
                "resourceType": "Group",
                "created": "2022-02-03T20:40:22.000+00:00",
                "lastModified": "2022-02-03T20:40:22.000+00:00"
            }
        }
    ]
}
```

### `GET /Groups/:id`

Returns the Amplitude group with the given numeric ID.

#### Example request

```bash
GET /scim/1/Groups/632 HTTP/1.1
Host: core.amplitude.com
Authorization: Bearer {{scim-token}}
```

#### Path variables

|Name| Description|
|---|---|
|`id`| Required. Integer. The group ID|

#### Example response

A successful request returns a `200 OK` status and a JSON response with data about the group.

```json
{
    "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:Group"
    ],
    "id": "632",
    "displayName": "Datamonster Party",
    "members": [
        {
            "value": "data.engineer@amplitude.com",
            "display": "Data Engineer"
        },
        {
            "value": "datamonster@amplitude.com",
            "display": "data monster"
        }
    ],
    "meta": {
        "resourceType": "Group",
        "created": "2022-02-03T20:40:22.000+00:00",
        "lastModified": "2022-02-03T20:40:22.000+00:00"
    }
}
```

### `POST /Groups/`

Creates a group in Amplitude. It adds existing users to the group and invites new users to Amplitude.

!!! warning

    When a user is added to a group without first being invited to the Amplitude organization, they are immediately provisioned with the minimum permissions and added to the group. The user is invited via email. [Learn more about permission groups](https://help.amplitude.com/hc/en-us/articles/360044588191) in the Help Center.

#### Example request

Send a request that includes the group name and members.

```bash
POST /scim/1/Groups HTTP/1.1
Host: core.amplitude.com
Authorization: Bearer {{scim-token}}
Content-Type: application/json
Content-Length: 265

{
   "schemas":[
      "urn:ietf:params:scim:schemas:core:2.0:Group"
   ],
   "displayName":"Group Name",
   "members":[
      {
         "value":"datamonster@amplitude.com"
      },
      {
         "value":"developerdocs@amplitude.com"
      }
   ]
}
```

#### Response

A successful request returns a `200 OK` status and JSON body with the group's data.

```json
{
    "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:Group"
    ],
    "id": 671,
    "displayName": "Group Name",
    "members": [
        {
            "value": "datamonster@amplitude.com",
            "display": "data monster"
        },
        {
            "value": "developerdocs@amplitude.com",
            "display": "undefined undefined"
        }
    ],
    "meta": {
        "resourceType": "Group",
        "created": "2022-03-03T20:38:36.000+00:00",
        "lastModified": "2022-03-03T20:38:36.000+00:00"
    }
}
```

### `PATCH /Groups/:id`

Updates an Amplitude group by specifying field on a Group to update.

#### Example request

```bash
PATCH /scim/1/Groups/632 HTTP/1.1
Host: core.amplitude.com
Authorization: Bearer {{scim-token}}
Content-Length: 241

{
    "schemas": ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
    "Operations": [
        {
          "op": "add",
          "path": "members",
          "value": [{
              "value": "new.member@amplitude.com"
        }]
    }]
}
```

#### Path variables

|Name| Description|
|---|---|
|`id`| Required. Integer. The group ID|

#### Example response

A successful request returns a `200 OK` status with a JSON response with the
 updated group's new data.

```json
{
    "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:Group"
    ],
    "id": "632",
    "displayName": "New Name",
    "members": [
        {
            "value": "data.engineer@amplitude.com",
            "display": "data engineer"
        },
        {
            "value": "datamonster@amplitude.com",
            "display": "data monster"
        },
        {
            "value": "new.member@amplitude.com",
            "display": "New Member"
        }
    ],
    "meta": {
        "resourceType": "Group",
        "created": "2022-02-03T20:40:22.000+00:00",
        "lastModified": "2022-02-03T21:25:25.000+00:00"
    }
}
```

### `DELETE /Groups/:id`

Deletes an Amplitude group.

#### Example request

```bash
DELETE /scim/1/Groups/632 HTTP/1.1
Host: core.amplitude.com
Authorization: Bearer {{scim-token}}
```

#### Path variables

|Name| Description|
|---|---|
|`id`| Required. Integer. The group ID|

#### Response

A successful deletions returns a `204 No Content` status.
