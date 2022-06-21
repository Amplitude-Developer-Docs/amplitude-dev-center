---
title: Export API
description: Use the Export API to export your event data.
---

The Export API lets you export your project's event data.

--8<-- "includes/postman.md"

--8<-- "includes/auth-basic.md"

## Endpoints

| Region | Endpoint |
| --- | --- |
| Standard Server | [https://amplitude.com/api/2/export](https://amplitude.com/api/2/export) |
| EU Residency Server | [https://analytics.eu.amplitude.com/api/2/export](https://analytics.eu.amplitude.com/api/2/export) |

## Considerations

- The specified date range refers to the time the event data was uploaded to Amplitude servers (see server_upload_time). The Export API returns events timestamped in UTC. Data is available to export at a minimum within 2 hours of when the servers received it. For example, data sent between 8 and 9 PM begins loading at 9 PM and is available via the Export API at 11 PM. Note that there is no delay in platform reporting. Only exports are delayed.
- Export API isn't supported for a cross-project view because the view doesn’t own any data. To export all the data in the view, you would need to call the Export API on the underlying projects that actually ingested the data.
- Size limit is 4GB. If the size exceeds 4GB, the request returns a 400 response. In this case, choose a smaller time range to export the data. In cases where an hour's worth of data exceeds 4GB, use the [Amazon S3 export](https://help.amplitude.com/hc/en-us/articles/360044561111-Amazon-S3-Amplitude-Integration).
- To export a whole day, Use T00 to T23. The max time range you can query at once is 365 days.

## Example request

`GET https://amplitude.com/api/2/export`

```bash
GET /api/2/export?start=20220101T00&end=20220127T00 HTTP/1.1
Host: amplitude.com
Authorization: Basic {{api-key}}:{{secret-key}}
```

## Query parameters

|Name|Description|
|-----|------------|
|`start`| Required. First hour included in data series, formatted YYYYMMDDTHH. For example, '20220201T05'.|
|`end` |Required. Last hour included in data series, formatted YYYYMMDDTHH For example, '20220201T05'.|

## Response

The response is a zipped archive of JSON files. Depending on data volume, there can be several files per hour. The API returns a 404 response is there is no data for the time range you requested.

!!! note
    Events prior to November 12, 2014 are grouped by day, instead of by the hour.

### Response schema

The response includes one event JSON object per line in each file, with the following schema:

``` json
{
 "server_received_time": UTC ISO-8601 formatted timestamp,
 "app": int,
 "device_carrier": string,
 "$schema":int,
 "city": string,
 "user_id": string,
 "uuid": UUID,
 "event_time": UTC ISO-8601 formatted timestamp,
 "platform": string,
 "os_version": string,
 "amplitude_id": long,
 "processed_time": UTC ISO-8601 formatted timestamp,
 "user_creation_time": UTC ISO-8601 formatted timestamp,
 "version_name": string,
 "ip_address": string,
 "paying": boolean,
 "dma": string,
 "group_properties": dict,
 "user_properties": dict,
 "client_upload_time": UTC ISO-8601 formatted timestamp,
 "$insert_id": string,
 "event_type": string,
 "library":string,
 "amplitude_attribution_ids": string,
 "device_type": string,
 "device_manufacturer": string,
 "start_version": string,
 "location_lng": float,
 "server_upload_time": UTC ISO-8601 formatted timestamp,
 "event_id": int,
 "location_lat": float,
 "os_name": string,
 "amplitude_event_type": string,
 "device_brand": string,
 "groups": dict,
 "event_properties": dict,
 "data": dict,
 "device_id": string,
 "language": string,
 "device_model": string,
 "country": string,
 "region": string,
 "is_attribution_event": bool,
 "adid": string,
 "session_id": long,
 "device_family": string,
 "sample_rate": null,
 "idfa": string,
 "client_event_time": UTC ISO-8601 formatted timestamp,
}

```

## Status codes

|Code|Message|
|----|---------|
|200|Success|
|400|The file size of the exported data is too large. Shorten the time ranges and try again. The limit size is 4GB.|
|404|No data available for the time range requested.|
|504|The amount of data is large causing a timeout. For large amounts of data, use the [Amazon S3 destination](https://help.amplitude.com/hc/en-us/articles/360044561111-Amazon-S3-Amplitude-Integration).|
