---
title: Taxonomy API
description: The Taxonomy API lets you create, get, update, and delete categories, event types, event properties, and user properties.
---

The Taxonomy API grants Scholarship, Growth, and Enterprise clients the ability to programmatically plan their event schema in the Taxonomy tab.

The Taxonomy API lets you create, get, update, and delete categories, event types, event properties, and user properties.
You can edit planned events and properties, and not events and properties that already have data in the project.

--8<-- "includes/postman.md"

--8<-- "includes/auth-basic.md"

## Endpoints

| Region | Endpoint |
| --- | --- |
| Standard Server | [https://amplitude.com/api/2/](https://amplitude.com/api/2/) |
| EU Residency Server | [https://analytics.eu.amplitude.com/api/2/](https://analytics.eu.amplitude.com/api/2/) |

## Considerations

- You may have to URL encode special characters in the names of event types, event properties, and user properties.
 For example, encode `Play Song` as `Play%20Song`. Use the [W3Schools](http://www.w3schools.com/tags/ref_urlencode.asp) encoding reference.
- Events or properties must be planned in the schema before you can delete them via this API.


## Limits

For each endpoint, there is a concurrent and a rate limit.
 The concurrent limit restricts the amount of requests you can run at the same time, while the rate limit restricts the total number of queries you can run per hour.
 The limits are per project, and exceeding any of these limits returns a 429 error.

The endpoints use a  cost per query model. Here are the max costs per API Key:

- **Concurrent Cost Limit:** You can run queries that collectively add up to 4 cost at the same time.
- **Period Cost Limit:** You can run up to 7200 cost per hour.

Cost structure of each endpoint:

- GET: 1 cost
- PUT: 2 cost
- POST: 2 cost
- DELETE: 2 cost

## Event category

Event categories are a way to organize your event types into broad groups.

!!!example
    You want to track how users register for your app, checkout, and how they interact with the onboarding experience. You can bucket your events using these event categories:

    - Registration
    - Checkout
    - Onboarding

### Create event category

Create an event category in your project.

`POST /api/2/taxonomy/category`

#### Example request

```bash
POST /api/2/taxonomy/category HTTP/1.1
Host: amplitude.com
Authorization: Basic {{api-key}:{{secret-key}}}
Content-Type: application/x-www-form-urlencoded
category_name=Marketing
```

##### Body parameters

|<div class="big-column">Name</div>| Description|
|-----|------|
|`category_name` |Required. Name of the category.|

#### Response

A successful request returns a `200 OK` response with a JSON body:

```json
{
    "success" : true 
}
```

A failed request sends an error message with more information:

```json
{
   "success" : false,
   "errors" : [
      {
         "message" : "error info"
      }
   ]
}
```

### Get all event categories

Get all event categories in your project.

`GET https://amplitude.com/api/2/taxonomy/category`

#### Example request

```bash
GET /api/2/taxonomy/category HTTP/1.1
Host: amplitude.com
Authorization: Basic {{api-key}:{{secret-key}}}
```

#### Response

A successful request returns a `200 OK` status with a JSON body:

```json
{
    "success": true,
    "data": [
        {
            "id": 412931,
            "name": "Attribution"
        },
        {
            "id": 412941,
            "name": "Conversion"
        }
    ]
}
```

A failed request returns a `400 Bad Request` response with more information.

```json
{
    "success": false,
    "errors": [
        {
            "message": "Not found"
        }
    ]
}
```

### Get an event category

Get the ID of an event category in your project.

`GET https://amplitude.com/api/2/taxonomy/category/:category_name`

#### Example request

```bash
GET /api/2/taxonomy/category/:category_name HTTP/1.1
Host: amplitude.com
Authorization: Basic {{api-key}}:{{secret-key}}
```

##### Path variables

|<div class="big-column">Name</div>| Description|
|----|-----|
|`category_name`| Required. The name of the category|

#### Response

A successful request returns a `200 OK` status and a JSON body with the category's data:

```json
{
    "success": true,
    "data": {
        "id": 412941,
        "name": "Conversion"
    }
}
```

A failed request returns a `400 Bad Request` status with more information about the error.

```json
{
    "success": false,
    "errors": [
        {
            "message": "Not found"
        }
    ]
}
```

### Update event category

Update the name of an event category.

`PUT https://amplitude.com/api/2/taxonomy/category/:category_id`

#### Example request

```bash hl_lines="7"
PUT /api/2/taxonomy/category/412941 HTTP/1.1
Host: amplitude.com
Authorization: Basic {{api-key}}:{{secret-key}}
Content-Type: application/x-www-form-urlencoded
Content-Length: 23

category_name=Converted
```

##### Path variables

|<div class="big-column">Name</div>| Description|
|----|-----|
|`category_id`| Required. The ID of the category|

##### Body parameters

|<div class="big-column">Name</div>| Description|
|----|-----|
|`category_name`| Required. The new name of the category|

#### Response

##### 200 OK

A successful request returns a `200 OK` status and a JSON body.

```json
{
    "success": true
}
```

##### 409 Conflict

If there is a problem with your request, the request returns a `409 Conflict` status, and a JSON body with more information.

```json
{
    "success": false,
    "errors": [
        {
            "message": "Attempted to operate on entity event_category, id \"4129\", that does not exist."
        }
    ]
}
```

### Delete an event category

Delete an event category.

`DELETE https://amplitude.com/api/2/taxonomy/category/:category_id`

#### Example request

```bash
DELETE /api/2/taxonomy/category/12345 HTTP/1.1
Host: amplitude.com
Authorization: Basic {{api-key}}:{{secret-key}}
```

##### Path variables

|<div class="big-column">Name</div>| Description|
|----|-----|
|`category_id`| Required. The ID of the category|

#### Response

##### 200 OK

A successful request returns a `200 OK` status and a JSON body.

```json
{
    "success": true
}
```

##### 409 Conflict

If there is a problem with your request, the request returns a `409 Conflict` status, and a JSON body with more information.

```json
{
    "success": false,
    "errors": [
        {
            "message": "Attempted to operate on entity event_category, id \"4129\", that does not exist."
        }
    ]
}
```

## Event type

An event is any action a user can take, like *start game* or *add to cart,* or any activity associated with a user, like in-app notifications or push notifications.

You can use the API to manipulate event types.

### Create event type

Creates an event type.

!!!note
    You must [initialize the schema](https://help.amplitude.com/hc/en-us/articles/360047579451) before you can add event types via the API.

#### Example request

```bash
POST /api/2/taxonomy/event?=null HTTP/1.1
Host: amplitude.com
Authorization: Basic {{api-key}}:{{secret-key}}
Content-Type: application/x-www-form-urlencoded
Content-Length: 80

event_type=My%20event&category=Conversion&description=Event%20type%20description
```

##### Body parameters

|<div class="big-column">Name</div>| Description|
|-----|------|
|`event_type` |Required. String. The event type name.|
|`category`|Optional. String. The event type's category.|
|`description`| Optional. String. Details about the event type.|

#### Response

##### 200 OK

A successful request returns a `200 OK` response with a JSON body:

```json
{
    "success" : true 
}
```

##### 409 Conflict

A failed request returns a `409 Conflict` status with an error message.

```json
{
   "success" : false,
   "errors" : [
      {
         "message" : "error info"
      }
   ]
}
```

### Get all event types

Retrieves all event types in a project. This request has no required parameters.

`GET https://amplitude.com/api/2/taxonomy/event`

#### Example request

```bash
GET /api/2/taxonomy/event HTTP/1.1
Host: amplitude.com
Authorization: Basic {{api-key}:{{secret-key}}}
```

#### Response

##### 200 OK

A successful request returns a `200 OK` status with a JSON body:

```json
{
    "success": true,
    "data": [
        {
            "id": 412931,
            "name": "Attribution"
        },
        {
            "id": 412941,
            "name": "Conversion"
        }
    ]
}
```

### Get an event type

Get a single event type, by name.

`GET https://amplitude.com/api/2/taxonomy/event/:event_type`

#### Example request

```bash
GET /api/2/taxonomy/category/:category_name HTTP/1.1
Host: amplitude.com
Authorization: Basic {{api-key}}:{{secret-key}}
```

##### Path variables

|<div class="big-column">Name</div>| Description|
|----|-----|
|`event_type`| Required. String. The event type name. |

#### Response

##### 200 OK

A successful request returns a `200 OK` status and a JSON body with the event type's data:

```json
{
    "success": true,
    "data": {
        "event_type": "ce:Event 2",
        "category": {
            "name": "Attribution"
        },
        "description": null
    }
}
```

##### 400 Bad Request

A failed request returns a `400 Bad Request` status with more information about the error.

```json
{
    "success": false,
    "errors": [
        {
            "message": "Not found"
        }
    ]
}
```

### Update event type

Update an event type.

`PUT https://amplitude.com/api/2/taxonomy/event/:event_type`

#### Example request

```bash
PUT /api/2/taxonomy/event/ce:Event1 HTTP/1.1
Host: amplitude.com
Authorization: Basic {{api-key}}:{{secret-key}}
Content-Length: 41

category=&display_name=Event%20Number%203
```

##### Path variables

|<div class="big-column">Name</div>| Description|
|----|-----|
|`event_type`| Required. String. The event name. |

##### Body parameters

|<div class="big-column">Name</div>| Description|
|----|-----|
|`new_event_type`| Optional. String. The event type's new name.|
|`category`|Optional. Current category name of the event type.|
|`description`| Optional. String. Details to add to the event type.|
|`display_name`| Optional. String. Display name of an event type. You can update the display name for an event type after it's ingested into Amplitude.|

#### Response

##### 200 OK

A successful request returns a `200 OK` status and a JSON body.

```json
{
    "success": true
}
```

##### 409 Conflict

If there is a problem with your request, the request returns a `409 Conflict` status, and a JSON body with more information.

```json
{
    "success": false,
    "errors": [
        {
            "message": "Attempted to change the event display name for event \"ce:Event\", but the event is not in schema."
        }
    ]
}
```

### Delete an event type

Delete an event type.

`DELETE https://amplitude.com/api/2/taxonomy/event/:event_type`

#### Example request

```bash
DELETE /api/2/taxonomy/event/ce:Event1 HTTP/1.1
Host: amplitude.com
Authorization: Basic {{api-key}}:{{secret-key}}
```

##### Path variables

|<div class="big-column">Name</div>| Description|
|----|-----|
|`event_type`| Required. The name of the event type|

#### Response

##### 200 OK

A successful request returns a `200 OK` status and a JSON body.

```json
{
    "success": true
}
```

##### 409 Conflict

If there is a problem with your request, the request returns a `409 Conflict` status, and a JSON body with more information.

```json
{
    "success": false,
    "errors": [
        {
            "message": "Attempted to remove an event, \"ce:Event1\", that is not a planned event."
        }
    ]
}
```

## Event property

Event properties describe the attributes of an event. For example, if 'Swipe' is an event that you are tracking, then the event property ‘Direction’ could have the values ‘Left’ or ‘Right’.

### Create event property

Create an event property.

`POST https://amplitude.com/api/2/taxonomy/event-property`

#### Example request

```bash
POST /api/2/taxonomy/event-property HTTP/1.1
Host: amplitude.com
Authorization: Basic {{api-key}}:{{secret:key}}
event_type=Onboard%20Start&event_property=Completed%20Task&type=boolean&is_array_type=false&is_required=false
```

##### Body parameter

|<div class="big-column">Name</div>|Description|
|-----|---------|
|`event_type`|Required. String. Name of the event type to which the event properties belong to.|
|`event_property`| Required. String. Name of the event property.|
|`description`|Optional. String. The event property's description.|
|`type`| Optional. String. Available with Govern Add-on. The event property's data type. Acceptable values are `string`, `number`, `boolean`, `enum`, and `any`|
|`regex`| Optional. String. Available with Govern Add-on. Regular expression, custom regex used for pattern matching or more complex values. For example, property zip code must have pattern `[0-9]{5}`|
|`enum_values`|Optional. String. Available with Govern Add-on. List of allowed values.|
|`is_array_type`|Optional. Boolean. Available with Govern Add-on.|
|`is_required`|Optional. Boolean. Available with Govern Add-on. Marks the property as required. When `true`, events that are missing this property are flagged on the Taxonomy page in the web app.|

#### Response

##### 200 OK

A successful request returns a `200 OK` status and a JSON body.

```json
{
    "success": true
}
```

##### 409 Conflict

If there is a problem with your request, the request returns a `409 Conflict` status, and a JSON body with more information.

```json
{
    "success": false,
    "errors": [
        {
            "message": "Attempted to add an event property, \"Completed Task\" for event \"Onboard Start\", that already exists."
        }
    ]
}
```

### Get event properties

Get all an event's properties.

`GET https://amplitude.com/api/2/taxonomy/event-property`

#### Example request

```bash
GET /api/2/taxonomy/event-property HTTP/1.1
Host: amplitude.com
Authorization: Basic {{api-key}}:{{secret:key}}

event_type=Onboard%20Start
```

##### Body parameter

|<div class="big-column">Name</div>|Description|
|-----|---------|
|`event_type`|Required. Name of the event type to which the event properties belong to.|

#### Response

##### 200 OK

A successful request returns a `200 OK` status and a JSON body with a list of event properties and their data.

```json
{
    "success": true,
    "data": [
        {
            "event_property": "Completed Task",
            "event_type": "Onboard Start",
            "description": "User completed a task during onboarding.",
            "type": "boolean",
            "regex": null,
            "enum_values": null,
            "is_array_type": false,
            "is_required": false
        },
        {
            "event_property": "Completed Tutorial",
            "event_type": "Onboard Start",
            "description": "",
            "type": "any",
            "regex": null,
            "enum_values": null,
            "is_array_type": false,
            "is_required": false
        }
    ]
}
```

### Get event property

Get a single event property.

`GET https://amplitude.com/api/2/taxonomy/event-property`

#### Example request

```bash
GET /api/2/taxonomy/event-property/Shared HTTP/1.1
Host: amplitude.com
Authorization: Basic {{api-key}}:{{secret:key}}

event_type=Onboard%20Finish
```

#### Path parameters

|<div class="big-column">Name</div>|Description|
|-----|---------|
|`event_property`|Required. The event property name.|

#### Body parameter

|<div class="big-column">Name</div>|Description|
|-----|---------|
|`event_type`|Required. Name of the event type to which the event properties belong to.|

#### Response

##### 200 OK

A successful request returns a  `200 OK` status and a JSON body containing information about the event property.

```json
{
    "success": true,
    "data": {
        "event_property": "Shared",
        "event_type": "Onboard Finish",
        "description": "Whether user shared content.",
        "type": "boolean",
        "regex": null,
        "enum_values": null,
        "is_array_type": false,
        "is_required": false
    }
}
```

##### 400 Bad Request

If Amplitude can't find the event property, or the request is configured incorrectly, it returns a `400 Bad Request` response and an error message.

```json
{
    "success": false,
    "errors": [
        {
            "message": "Not found"
        }
    ]
}
```

### Update event property

Update an event property.

`https://amplitude.com/api/2/taxonomy/event-property/:event-property`

#### Example request

```bash
PUT /api/2/taxonomy/event-property/Completed Task HTTP/1.1
Host: amplitude.com
Authorization: Basic {{api-key}}:{{secret:key}}

event_type=Onboard%20Start&description=User%20completed%20a%20task%20during%20onboarding.%20
```

##### Path variables

|<div class="big-column">Name</div>|Description|
|-----|---------|
|`event-property`|Required. Name of the event property.|

##### Body parameter

|<div class="big-column">Name</div>|Description|
|-----|---------|
|`event_type`|Required. Name of the event type to which the event properties belong to.|
|`description`|Optional. String. The event property's description.|
|`new_event_property_value`|Optional. String. Available with Govern Add-on. The new name of the event property.|
|`type`| Optional. String. Available with Govern Add-on. The event property's data type. Acceptable values are `string`, `number`, `boolean`, `enum`, and `any`|
|`regex`|Optional. String. Available with Govern Add-on. Regular expression, custom regex used for pattern matching or more complex values. For example, property zip code must have pattern `[0-9]{5}` |
|`enum_values`| Optional. String. Available with Govern Add-on. List of allowed values.|
|`is_array_type`| Optional. Boolean. Available with Govern Add-on.|
|`is_required`| Optional. Boolean. Available with Govern Add-on. Marks the property as required.|

#### Response

##### 200 OK

A successful request returns a `200 OK` status and a JSON body.

```json
{
    "success": true
}
```

##### 409 Conflict

Some failed requests return a `409 Conflict` and an error message with more details.

```json
{
    "success": false,
    "errors": [
        {
            "message": "Attempted to change the event property description for property \"Completed Task\" for event \"\", but the property is not in schema."
        }
    ]
}
```

### Delete event property

Delete an event property.

`DELETE https://amplitude.com/api/2/taxonomy/event-property/:event-property`

#### Example request

```bash
DELETE /api/2/taxonomy/event-property/Shared HTTP/1.1
Host: amplitude.com
Authorization: Basic {{api-key}}:{{secret:key}}

event_type=Onboard%20Finish
```

##### Path variables

|<div class="big-column">Name</div>|Description|
|-----|---------|
|`event_property`|Required. The event property name.|

##### Body parameter

|<div class="big-column">Name</div>|Description|
|-----|---------|
|`event_type`|Required. Name of the event type to which the event properties belong to.|

#### Response

##### 200 OK

A successful request returns a `200 OK` status and a JSON body.

```json
{
    "success": true
}
```

## User property

User properties reflect traits about the individuals using your product.

### Create user property

Create a user property.

`POST https://amplitude.com/api/2/taxonomy/user-property/`

#### Example request

```bash
POST /api/2/taxonomy/user-property HTTP/1.1
Host: amplitude.com
Authorization: Basic {{api-key}}:{{secret:key}}

user_property=User%20Type&description=Describes%20whether%20the%20user%20is%20a%20Free%2C%20Standard%2C%20or%20Premium%20user.%20&enum_values=Free%2C%20Standard%2C%20Premium
```

##### Body parameter

|<div class="big-column">Name</div>|Description|
|-----|---------|
|`user_property`|Required. String. Name of the user property type.|
|`description`|Optional. String. Details to add to the user property type.|
|`type`|Optional. String. The user property's data type. Acceptable values are `string`, `number`, `boolean`, `enum`, and `any`.|
|`regex`| Optional. String. Regular expression or custom regex used for pattern matching and more complex values. For example, 'zip code' property must have pattern `[0-9]{5}`.|
|`enum_values`|Optional. String. List of allowed values, separated by comma. For example: `red, yellow, blue`.|
|`is_array_type`|Optional. Boolean. Specifies whether the property value is an array.|

#### Response

This request returns either a true or false response.

```json
{
    "success" : true 
}
```

```json
{
    "success" : false 
}
```

### Get all user properties

Retrieves all user properties in your account. This call doesn't have any required parameters.

`https://amplitude.com/api/2/taxonomy/user-property`

#### Example request

```bash
GET /api/2/taxonomy/user-property HTTP/1.1
Host: amplitude.com
Authorization: Basic {{api-key}}:{{secret:key}}
```

#### Response

A successful request returns a `200 OK` response and a JSON body with user property details.

```json
{
    "success": true,
    "data": [
        {
            "user_property": "device_id",
            "description": null,
            "type": null,
            "enum_values": null,
            "regex": null,
            "is_array_type": false
        },
        {
            "user_property": "event_id",
            "description": null,
            "type": null,
            "enum_values": null,
            "regex": null,
            "is_array_type": false
        },
        {
            "user_property": "amplitude_id",
            "description": null,
            "type": null,
            "enum_values": null,
            "regex": null,
            "is_array_type": false
        },
        {
            "user_property": "location_lat",
            "description": null,
            "type": null,
            "enum_values": null,
            "regex": null,
            "is_array_type": false
        },
        {
            "user_property": "location_lng",
            "description": null,
            "type": null,
            "enum_values": null,
            "regex": null,
            "is_array_type": false
        },
        {
            "user_property": "server_upload_time",
            "description": null,
            "type": null,
            "enum_values": null,
            "regex": null,
            "is_array_type": false
        },
        {
            "user_property": "session_id",
            "description": null,
            "type": null,
            "enum_values": null,
            "regex": null,
            "is_array_type": false
        },
        {
            "user_property": "user_id",
            "description": null,
            "type": null,
            "enum_values": null,
            "regex": null,
            "is_array_type": false
        }
    ]
}
```

### Get user property

Retrieves a single user property, by name.

`GET https://amplitude.com/api/2/taxonomy/user-property/:user_property`

#### Example request

```bash
GET /api/2/taxonomy/user-property/device_id HTTP/1.1
Host: amplitude.com
Authorization: Basic {{api-key}}:{{secret:key}}
```

##### Path variables

|<div class="big-column">Name</div>|Description|
|-----|---------|
|`user_property`|Required. The user property name.|

### Response

#### 200 OK

A successful request returns a `200 OK` response and a JSON body with user property details.

```json
{
    "success": true,
    "data": {
        "user_property": "device_id",
        "description": null,
        "type": null,
        "enum_values": null,
        "regex": null,
        "is_array_type": false
    }
}
```

#### 404 Bad Request

A failed request returns a `404 Bad Request` status and an error message.

```json
{
    "success": false,
    "errors": [
        {
            "message": "Not found"
        }
    ]
}
```

### Update user property

Update a user property.

`https://amplitude.com/api/2/taxonomy/user-property/:user_property`

### Example request

```bash
PUT /api/2/taxonomy/user-property/user_id HTTP/1.1
Host: amplitude.com
Authorization: Basic {{api-key}}:{{secret:key}}

description=The%20user%20id&type=string
```

#### Path variables

|<div class="big-column">Name</div>|Description|
|-----|---------|
|`user_property`|Required. The user property name.|

#### Body parameter

|<div class="big-column">Name</div>|Description|
|-----|---------|
|`new_user_property_value`| Optional. String. New name of the user property type.|
|`description`| Optional. String. Details to add to the user property type.|
|`type`|Optional. String. The user property's data type. Acceptable values are `string`, `number`, `boolean`, `enum`, and `any`.|
|`regex`| Optional. String. Regular expression or custom regex used for pattern matching and more complex values. For example, 'zip code' property must have pattern `[0-9]{5}`.|
|`enum_values`| Optional. String. List of allowed values, separated by comma. For example: `red, yellow, blue`.|
|`is_array_type`|Optional. Boolean. Specifies whether the property value is an array.|

#### Response

This request returns either a true or false response.

```json
{
    "success" : true 
}
```

```json
{
    "success" : false 
}
```

### Delete user property

Deletes a single user property, by name.

`https://amplitude.com/api/2/taxonomy/user-property/:user_property`

#### Example request

```bash
DELETE /api/2/taxonomy/user-property/gp:user_id HTTP/1.1
Host: amplitude.com
Authorization: Basic {{api-key}}:{{secret:key}}

```

##### Path variables

|<div class="big-column">Name</div>|Description|
|-----|---------|
|`user_property`|Required. The user property name.|

#### Response

##### 200 OK

A successful request returns a `200 OK` response and a JSON message.

```json
{
    "success": true
}
```

##### 409 Conflict

A failed request returns a `409 Bad Request` status and an error message.

```json
{
    "success": false,
    "errors": [
        {
            "message": "Attempted to remove a user property, \"sdf\", that is not a planned user property."
        }
    ]
}
```
