---
title: Amazon S3 Export
description: Export your Amplitude data to an Amazon S3 bucket, enabling you to analyze your Amplitude data sets side-by-side with data sourced elsewhere.
---
--8<-- "includes/editions-all-editions.md"

Often, business needs dictate that you analyze behavioral data alongside other organizational sources of data that aren't captured within Amplitude. 
By integrating Amplitude with Amazon S3, you can export your Amplitude data to an Amazon S3 bucket. This enables you to analyze your Amplitude data sets side-by-side with the rest of your data.

Because the export works on a per-project basis, you have the flexibility to set up data from one project for delivery to multiple buckets. Or, you can use multiple projects in the same organization to export event data into a single Amazon S3 bucket. However, each bucket can only be accessed by a single organization.

!!!note "Other Amplitude + Amazon S3 Integrations"

    This integration sends Amplitude data to Amazon S3. Amplitude offers two other integrations with Amazon S3: 

    - [Import data from Amazon S3](/data/sources/amazon-s3)
    - [Send cohorts to Amazon S3 ](/data/destinations/amazon-s3-cohort)

## Considerations

- You can't use portfolio projects as data sources for the Amazon S3 export.
- The export finishes within one hour after the currently exported hour. The export time is typically between one and 10 minutes.
- The only potential error is an accessibility error. This can happen if you have changed any configurations on the receiving end and Amplitude is unable to access to your bucket. 
In this case, the export fails after several tries, and the admin and the user who created the S3 export are notified via email.
- The error email includes troubleshooting information. This information isn't available within the Amplitude UI. Because accessibility is the only error possible, the email includes information on which permission is missing.
- There isn't a size or date range limit when [backfilling historical event data](https://help.amplitude.com/hc/en-us/articles/360044561111-Integrate-Amplitude-with-Amazon-S3#h_01EEXY9TJHVAYEVPXXSAA4ZAZY) via manual exports. If you can't export a certain date range, first confirm that you have event data for that date range. Then [submit a ticket](https://help.amplitude.com/hc/en-us/requests/new) to the support team.

## Set up the integration

To set up the Amazon S3 integration, follow these steps:

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Warehouse Destination section, click **Amazon S3**.
3. Choose which data you'd like to include in this export: *Export events ingested today and moving forward*, *Export all merged Amplitude IDs*, or export both.
4. Click **Next**.
5. In the **Set Up Bucket Policy** tab, go through the steps listed in the *Create a Bucket* and *Add a Bucket Policy* sections. Then fill out the required information in the *S3 Bucket Information* section.

    ![Screenshot of the Set Up Bucket Policy tab in Amplitude](../../assets/images/integrations-amazon-s3-export-bucket-policy.png)

6. Click **Generate Bucket Policy**, then click **Next**.

Amplitude verifies your bucket access. After access is verified, Amplitude immediately starts hourly exports.

## Run a manual export

You can backfill historical data to S3 by manually exporting data.

1. Manage the Amazon S3 destination.
2. Click **Export Data**.
3. Select the desired date range. 
4. Click **Start Export**. 

**![screenshot of the export data modal](../../assets/images/integrations-amazon-s3-export-manual-export.png)**

After setup is complete, check the status of your exports from the integration. 

![screen shot of the export status screen](../../assets/images/integrations-amazon-s3-export-screen.png)

## Disable automatic exports

To disable automatic exports, open the integration and click **Manage**. You can toggle exports from the *Manage Export Settings* modal.

![Screenshot of the manage export settings modal](../../assets/images/integrations-amazon-s3-export-manage-modal.png)

## Exported data format

### Raw event file and data format

Data is exported hourly as zipped archive JSON files, and partitioned by the hour with one or multiple files per hour. Each file contains one event JSON object per line.

File names have the following syntax, where the time represents when the data was uploaded to Amplitude servers in UTC (for example, `server_upload_time`):

`projectID_yyyy-MM-dd_H#partitionInteger.json.gz`

For example, the first partition of data uploaded to this project, on Jan 25, 2020, between 5 AM and 6 PM UTC, is in the file:

`187520_2020-01-25_17#1.json.gz`

Here is the exported data JSON object schema:

```json
{
  "server_received_time": UTC ISO-8601 timestamp,
  "app": int,
  "device_carrier": string,
  "$schema":int,
  "city": string,
  "user_id": string,
  "uuid": UUID,
  "event_time": UTC ISO-8601 timestamp,
  "platform": string,
  "os_version": string,
  "amplitude_id": long,
  "processed_time": UTC ISO-8601 timestamp,
  "user_creation_time": UTC ISO-8601 timestamp,
  "version_name": string,
  "ip_address": string,
  "paying": boolean,
  "dma": string,
  "group_properties": dict,
  "user_properties": dict,
  "client_upload_time": UTC ISO-8601 timestamp,
  "$insert_id": string,
  "event_type": string,
  "library":string,
  "amplitude_attribution_ids": string,
  "device_type": string,
  "device_manufacturer": string,
  "start_version": string,
  "location_lng": float,
  "server_upload_time": UTC ISO-8601 timestamp,
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
  "client_event_time": UTC ISO-8601 timestamp,
 }
```

### Merged Amplitude IDs file and data format

Data is exported hourly as zipped archive JSON files. Each file contains one merged Amplitude ID JSON object per line.

File names have the following syntax, where the time represents when the data was uploaded to Amplitude servers in UTC (for example `server_upload_time`):

`-OrgID_yyyy-MM-dd_H.json.gz`

For example, data uploaded to this project, on Jan 25, 2020, between 5 PM and 6 PM UTC, is found in the file:

`-189524_2020-01-25_17.json.gz`

Merged ID JSON objects have the following schema:

```json
{
 "scope": int,
 "merge_time": long,
 "merge_server_time": long,
 "amplitude_id": long,
 "merged_amplitude_id": long
}
```
