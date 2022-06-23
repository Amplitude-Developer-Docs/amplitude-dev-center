---
title: Lookup Table API
description: The Lookup Table API lets you create, get, update, and delete lookup tables to augment your data.
---

!!!beta "This feature is in beta"
        This requires that you have the `lookup_table` feature enabled in Amplitude. Contact your Amplitude account manager if you need help.

### Introduction

Lookup Tables let you augment user and event properties. Instead of using formulas, you can upload a CSV file that contains property mappings to derive new properties.

To create a Lookup property, create a Lookup Table to reference. You can retrieve and update each of the tables using the API. Lookup Tables are identified by the name and are scoped per project.

--8<-- "includes/postman.md"

## Endpoints

| Region | Endpoint |
| --- | --- |
| Standard Server | https://amplitude.com/api/2/lookup_table |
| EU Residency Server | https://analytics.eu.amplitude.com/api/2/lookup_table |

--8<-- "includes/auth-basic.md"

## Considerations

The max file size is 100 MB and the file can not have more than 1,000,000 rows.

### Create a Lookup Table

To create a Lookup Table, you create a Lookup Table object by uploading a CSV mapping from a property to the new properties to create. You'll need to send a request of type multipart/form-data.

#### Parameters

|<div class="big-column">Name</div>| Description|
|-----|------|
|`name` | Required. String. Name of the table.|
|`file` | Required. File. A CSV representation of the mappings.|

#### Example request

=== "cURL"
    ```curl
    curl -L -X POST 'https://amplitude.com/api/2/lookup_table/:name' \
         -u API_KEY:SECRET_KEY \
         -F 'file=@"/path/to/file.csv"' \
    ```
=== "HTTP"
    ```bash
    POST '/api/2/lookup_table/:name' HTTP/1.1
    Host: api2.amplitude.com
    Authorization: Basic {{api-key}}:{{secret-key}}
    Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

    ----WebKitFormBoundary7MA4YWxkTrZu0gW
    Content-Disposition: form-data; name=":name"; filename="file.csv"
    Content-Type: text/csv

    (data)
    ----WebKitFormBoundary7MA4YWxkTrZu0gW
    ```

#### Responses

=== "Success"
    ```json
    {
        "name": "skuToMetadata",
        "column_headers": [
            "Product Category",
            "Product Name"
        ],
        "created_at": "2021-07-15T21:04:23.000593",
        "created_by": "rest",
        "last_modified_at": "2021-07-16T19:14:11.627477",
        "last_modified_by": "rest"
    }
    ```
=== "HTTP 400: Bad Request"
    ```bash
    HTTP 400: Bad Request
    ```

    + Invalid file

    + File type is invalid. Accepted file types are `text/csv`, `text/plain`, and `text/tab-separated-values`.

    + File is empty

    + Found duplicate column header. There's a duplicate column, please remove the column so the file can be processed.
=== "HTTP 409: Conflict"
    ```bash
    HTTP 409: Conflict (Conflict, name already exists)
    ```

    The table already exists
=== "HTTP 413: Payload Too Large"
    ```bash
    HTTP 413: Payload Too Large
    ```

    The file exceeds the max size.

### Retrieve a Lookup Table

Retrieve a Lookup Table by its name.

#### Parameters

|<div class="big-column">Name</div>| Description|
|-----|------|
|`name` | Required. String. Name of the table.|

#### Example request

=== "cURL"
    ```curl
    curl -L -X GET 'https://amplitude.com/api/2/lookup_table/:name' \
         -u API_KEY:SECRET_KEY
    ```
=== "HTTP"
    ```bash
    GET /api/2/lookup_table/:name HTTP/1.1
    Host: amplitude.com
    Authorization: Basic {{api-key}}:{{secret-key}}
    ```

#### Response

=== "Success"
    ```json
    {
        "name": "skuToMetadata",
        "column_headers": [
            "Product Category",
            "Product Name"
        ],
        "created_at": "2021-07-15T21:04:23.000593",
        "created_by": "rest",
        "last_modified_at": "2021-07-16T19:14:11.627477",
        "last_modified_by": "rest"
    }
    ```
=== "HTTP 404: Not found"
    ```bash
    HTTP 404: Not found
    ```

    The table wasn't found because it wasn't created

### Update a Lookup Table

Update a Lookup Table's columns and data.

#### Parameters

|<div class="big-column">Name</div>| Description|
|-----|------|
|`name` | Required. String. Name of the table.|
|`file` | Required. File. A CSV representation of the mappings.|

#### Example request

=== "cURL"
    ```curl
    curl -L -X PATCH 'https://amplitude.com/api/2/lookup_table/:name' \
         -u API_KEY:SECRET_KEY
         -F 'file=@"/path/to/file.csv"' \
    ```
=== "HTTP"
    ```bash
    PATCH /api/2/lookup_table/:name HTTP/1.1
    Host: amplitude.com
    Authorization: Basic {{api-key}}:{{secret-key}}
    Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

    ----WebKitFormBoundary7MA4YWxkTrZu0gW
    Content-Disposition: form-data; name=":name"; filename="file.csv"
    Content-Type: text/csv

    (data)
    ----WebKitFormBoundary7MA4YWxkTrZu0gW
    ```

#### Response

=== "Success"
    ```json
    {
        "name": "skuToMetadata",
        "column_headers": [
            "Product Category",
            "Product Name"
        ],
        "created_at": "2021-07-15T21:04:23.000593",
        "created_by": "rest",
        "last_modified_at": "2021-07-16T19:14:11.627477",
        "last_modified_by": "rest"
    }
    ```
=== "HTTP 400: Bad Request"
    ```bash
    HTTP 400: Bad Request
    ```

    + Requires at least one modification. There should be a file attached.
    + File type is invalid. Accepted file types are `text/csv`, `text/plain`, and `text/tab-separated-values`.
    + File is empty.
    + Found duplicate column header. There's a duplicate column, please remove the column so the file can be processed.
=== "HTTP 404: Not found"
    ```bash
    HTTP 404: Not found
    ```

    The table wasn't found because it wasn't created
=== "HTTP 413: Payload Too Large"
    ```bash
    HTTP 413: Payload Too Large
    ```

    The file exceeds the max size.

### Delete a Lookup Table

Delete a Lookup Table.

#### Parameters

|<div class="big-column">Name</div>| Description|
|-----|------|
|`name` | Required. String. Name of the table.|
|`force` | Optional. Boolean. Delete the associated properties. Defaults to `false`.|

#### Example request

=== "cURL"
    ```curl
    curl -L -X DELETE 'https://amplitude.com/api/2/lookup_table/:name' \
         -u API_KEY:SECRET_KEY
    ```
=== "HTTP"
    ```bash
    DELETE /api/2/lookup_table/:lookup_table_name?force=True HTTP/1.1
    Host: amplitude.com
    Authorization: Basic {{api-key}}:{{secret-key}}
    ```

#### Response

=== "Success"
    ```json
    {
        "name": "skuToMetadata",
        "success": true
    }
    ```
=== "HTTP 404: Not found"
    ```bash
    HTTP 404: Not found
    ```

    The table wasn't found.

### List all Lookup Tables

List all the Lookup Tables for the project.

#### Example request

=== "cURL"
    ```curl
    curl -L -X GET 'https://amplitude.com/api/2/lookup_table' \
         -u API_KEY:SECRET_KEY
    ```
=== "HTTP"
    ```bash
    GET /api/2/lookup_table HTTP/1.1
    Host: amplitude.com
    Authorization: Basic {{api-key}}:{{secret:key}}
    ```

#### Response

```json
{
    "data": [
        {
            "name": "isbnToMetadata",
            "column_headers": [
                "Genres",
                "Authors"
            ],
            "created_at": "2021-07-15T21:04:23.000593",
            "created_by": "rest",
            "last_modified_at": "2021-07-16T19:14:11.627477",
            "last_modified_by": "rest"
        },
        {
            "name": "skuToMetadata",
            "column_headers": [
                "Product Category",
                "Product Name"
            ],
            "created_at": "2021-07-16T19:28:18.070073",
            "created_by": "rest",
            "last_modified_at": "2021-07-16T19:28:18.070073",
            "last_modified_by": "rest"
        }
    ]
}
```
