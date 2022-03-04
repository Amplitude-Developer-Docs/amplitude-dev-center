---
title: Chart Annotations API
description: The Chart Annotations API lets you programmatically annotate important dates like feature releases and marketing campaigns on your organization's charts with a horizontal axis of calendar dates.
---

The Chart Annotations API lets you programmatically annotate important dates like feature releases and marketing campaigns on your organization's charts with a horizontal axis of calendar dates.

--8<-- "includes/postman.md"

--8<-- "includes/auth-basic.md"

## Endpoints

| Region | Endpoint |
| --- | --- |
| Standard Server | [https://amplitude.com/api/2/annotations](https://amplitude.com/api/2/annotations) |
| EU Residency Server | [https://analytics.eu.amplitude.com/api/2/annotations](https://analytics.eu.amplitude.com/api/2/annotations) |

## Create annotation

Creates an annotation with the specified parameters.

```bash
POST /api/2/annotations?app_id=yourAppID&date=YYYY-MM-DD&label=yourLabel&chart_id=yourChartID&details=yourDetails HTTP/1.1
Host: amplitude.com
Authorization: Basic {{api_key}}:{{secret:key}}
```

### Create annotation query parameters

|Parameter|Description|
|----|----|
|`app_id`| Required. The Project ID of the project your chart belongs to.|
|`date`| Required. Date (YYYY-MM-DD) of the annotation.|
|`label`| Required. The title of your annotation.|
|`chart_id`| Optional. The ID of the chart (found in URL) to annotate. If you don't include a chart_id, the annotation is global.|
|`details`|Optional. Details for the annotation.|

### Create annotation response

```json
{
        "annotation": 
    {
        "date": "2023-09-16", 
        "details": "Added new user properties.", 
        "id": 50079, 
        "label": "Version 2.4 Release"
        } 
        "success": true
}
```

## Get all chart annotations

Retrieves all chart annotations in your project.

```bash
GET /api/2/annotations HTTP/1.1
Host: amplitude.com
Authorization: Basic {{api_key}}:{{secret:key}}
```

### Get all chart annotations response

A successful response returns a list of chart annotations in the project.

```json
{
    "data": [
        {
            "id": 160419,
            "date": "2021-09-01",
            "label": "First September",
            "details": "My annotation"
        },
        {
            "id": 160427,
            "date": "2021-09-01",
            "label": "",
            "details": "Another annotation"
        },
        {
            "id": 160507,
            "date": "2021-09-25",
            "label": "",
            "details": "Chart annotation"
        },
        {
            "id": 160508,
            "date": "2021-09-30",
            "label": "",
            "details": "Made another annotation"
        }
    ]
}
```

## Get chart annotation

Retrieve a single chart annotation, by ID.

```bash
GET /api/2/annotations?id=160427 HTTP/1.1
Host: amplitude.com
Authorization: Basic {{api_key}}:{{secret:key}}
```

### Get chart annotation query parameters

|Name|Description|
|----|-----------|
|`id`|Required. Annotation ID.|

### Get chart annotation response

A successful response returns the chart annotation's data.

```bash
{
    "data": [

        {
            "id": 160427,
            "date": 2022-01-31,
            "label": "",
            "details": "This is a chart annotation"
        }
    ]
}
```
