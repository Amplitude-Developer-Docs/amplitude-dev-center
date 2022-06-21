---
title: Lookup Table API
description: The Lookup Table API lets you create, get, update, and delete lookup tables to augment your data.
---

!!!beta "This feature is in beta"
    This requires that you have the `lookup_table` feature enabled in Amplitude. Ask your rep to help you with this.

### Introduction

Lookup Tables is a way to augment properties. Instead of using formulas, you can upload a CSV file that contains property mappings to derive new properties.

To create a Lookup property, you need to create a Lookup Table to reference. You can retrieve and update each of the tables using the API. Lookup Tables are identified by the name and are scoped per project.

### Create a Lookup Table

To create a Lookup Table, you create a Lookup Table object by uploading a CSV mapping from a property to the new properties to create. You'll need to send a request of type multipart/form-data.

#### Parameters

|<div class="big-column">Name</div>| Description|
|-----|------|
|`table_name` | Required. String. Name of the table.|
|`file` | Required. File. A CSV representation of the mappings.|

#### Example request

=== "cURL"
    ```curl
    curl -L -X POST 'https://amplitude.com/api/2/lookup_table/:table_name' \
         -u API_KEY:SECRET_KEY \
         -F 'file=@"/path/to/file.csv"' \
    ```
=== "HTTP"
    ```bash
    POST '/api/2/lookup_table/:table_name' HTTP/1.1
    Host: api2.amplitude.com
    Authorization: Basic {{api-key}}:{{secret-key}}
    Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

    ----WebKitFormBoundary7MA4YWxkTrZu0gW
    Content-Disposition: form-data; name="file"; filename=":path-to-file.csv"
    Content-Type: text/csv

    (data)
    ----WebKitFormBoundary7MA4YWxkTrZu0gW
    ```

#### Response

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

### Retrieve a Lookup Table

Retrieve the Lookup Table by its name

#### Parameters

|<div class="big-column">Name</div>| Description|
|-----|------|
|`table_name` | Required. String. Name of the table.|

#### Example request

=== "cURL"
    ```curl
    curl -L -X GET 'https://amplitude.com/api/2/lookup_table/:table_name' \
         -u API_KEY:SECRET_KEY
    ```
=== "HTTP"
    ```bash
    GET /api/2/lookup_table/:table_name HTTP/1.1
    Host: amplitude.com
    Authorization: Basic {{api-key}}:{{secret-key}}
    ```

#### Response

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

### Update a Lookup Table

Update the Lookup Table's columns and data.

#### Parameters

|<div class="big-column">Name</div>| Description|
|-----|------|
|`table_name` | Required. String. Name of the table.|
|`file` | Required. File. A CSV representation of the mappings.|

#### Example request

=== "cURL"
    ```curl
    curl -L -X PATCH 'https://amplitude.com/api/2/lookup_table/:table_name' \
         -u API_KEY:SECRET_KEY
         -F 'file=@"/path/to/file.csv"' \
    ```
=== "HTTP"
    ```bash
    PATCH /api/2/lookup_table/:table_name HTTP/1.1
    Host: amplitude.com
    Authorization: Basic {{api-key}}:{{secret-key}}
    Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

    ----WebKitFormBoundary7MA4YWxkTrZu0gW
    Content-Disposition: form-data; name="file"; filename="skuProductReference-updated.csv"
    Content-Type: text/csv

    (data)
    ----WebKitFormBoundary7MA4YWxkTrZu0gW
    ```

#### Response

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

### Delete a Lookup Table

Delete the Lookup Table

#### Parameters

|<div class="big-column">Name</div>| Description|
|-----|------|
|`table_name` | Required. String. Name of the table.|
|`force` | Optional. Boolean. Delete the associated properties. Defaults to `false`.|

#### Example request

=== "cURL"
    ```curl
    curl -L -X DELETE 'https://amplitude.com/api/2/lookup_table/:table_name' \
         -u API_KEY:SECRET_KEY
    ```
=== "HTTP"
    ```bash
    DELETE /api/2/lookup_table/:lookup_table_name?force=True HTTP/1.1
    Host: amplitude.com
    Authorization: Basic {{api-key}}:{{secret-key}}
    ```

#### Response

```json
{
     "name": "skuToMetadata",
     "success": true
}
```

### List all the Lookup Tables

List all the Lookup Tables for the project

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
