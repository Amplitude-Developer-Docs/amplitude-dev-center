---
title: Management API Deployment Endpoints
---

| <div class="big-column">Name</div> | Description |
| --- | --- |
| [List deployments](#list-deployments) | List deployments that experiments or flags can be assigned to. |
| [Create deployment](#create-deployment) | Create a deployment. |
| [Edit deployment](#edit-deployment) | Edit a deployment. |

------

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
???example "Example response (click to open)"
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

???example "Example request (click to open)"
    ```bash
    {
        "projectId":"<projectId>",
        "label": "hello-world",
        "type": "client"
    }
    ```

### Response

A successful request returns a `200 OK` response and a deployment's id.

!!!example "Example cURL"
    ```bash
    curl --request POST \
      --url 'https://experiment.amplitude.com/api/1/deployments' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```

???example "Example response (click to open)"
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

???example "Example request (click to open)"
    ```bash
    {
        "label": "updated-label"
    }
    ```
    
### Response

A successful request returns a `200 OK` response and `OK` text.

!!!example "Example cURL"
    ```bash
    curl --request PATCH \
      --url 'https://experiment.amplitude.com/api/1/deployments/<id>' \
      --header 'Accept: application/json' \
      --header 'Authorization: Bearer <management-api-key>'
    ```
