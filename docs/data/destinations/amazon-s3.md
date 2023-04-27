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

## Updating Bucket Policy for S3 Exports to Use KMS Encryption

### Overview

The following outlines a procedure to be taken to utilize KMS encryption in AWS S3 buckets for existing export connections. We have made these changes to help customers improve security standards.

### Migration Steps

Before starting the migration, users must have access to the following:

- Credentials to access their existing Amplitude exports
- Appropriate permissions to update S3 bucket configuration and create KMS keys.

How to update existing export to utilize KMS encryption:

1. Create a KMS key in your AWS account by following the [AWS KMS Developer Guide](https://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html).
2. Log in to your Amplitude account and navigate to the existing S3 export that you want to migrate.
3. In the manage settings model change the toggle to **disable** in order to turn off the export momentary. Wait for all in-progress export jobs to complete to avoid unexpected results when a new S3 export connection is created.
4. Create a new S3 export by following the [Amplitude S3 Export Setup Guide](#set-up-the-integration). 
5. In the export connection setup flow, generate the updated bucket policy and the KMS policy. *The updated policy will now contain a new AWS IAM Role principal to trust.*
6. Backup the current bucket policy in your S3 bucket in AWS for rollback procedure if needed.
7. Update the S3 bucket policy and KMS key policy that was generated in Step 5 in your AWS account.
8. Ensure that the S3 bucket is updated to use KMS encryption as mentioned in the [AWS S3 Developer Guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingKMSEncryption.html).
9. Click `Next` to verify Bucket Access and create a new connection in the export setup flow. 
10. Wait for the new export to complete. Once it's finished, you can verify that your data is being exported to the provided S3 bucket with the new policy.
11. Once you have verified your data is being exported successfully, you may delete the old S3 export connection, which was disabled in Step 2.

### Rollback Procedure

!!!note

    Once you delete the old S3 export connection, the rollback process mentioned below is not applicable.

In case something goes wrong in the middle of the migration procedure mentioned above, do the following:

1. Ensure that the newly created S3 Export connection is removed.
2. Revert the bucket policy to trust the AWS account root principal (the policy, which was backed up in Step 6 above).
3. Revert the bucket encryption to the previous configuration, which was changed in Step 8.
4. Re-enable the current S3 export connection, which was disabled in Step 3.
5. (Optional) Delete the KMS key created in Step 1.

### FAQ

#### Will there be any export data loss after the migration?

After disabling and removing the S3 export connection, the data already exported to the S3 destination bucket won’t be removed.

**However, the metadata, like export jobs history, will be lost.**

#### Will there be any gaps in data export during the migration?

As long as the new S3 export connection is created within 24 hours after the old S3 export connection is disabled, there won’t be any gaps in data export.

#### What should I do if the new export connection is created 24 hours after the old connection is disabled?

In case the new export connection was created 24 hours after the old connection is disabled and there is a gap in data export, use <ins>manual backfill functionality</ins> to fill data for missing date range. Backfill export will ensure no duplication in exported data even if the backfill date range overlaps with the previously exported date range.

#### What are the consequences of not migrating?

Less restricting access scope for your destination S3 bucket through (current state) trusting an AWS account root principal instead of (future state) AWS IAM Role principal. That AWS IAM Role is specific to Amplitude Project ID, in which the new S3 export connection is created.

#### Will it be possible to roll back to the previous bucket policy?

No. Once the old S3 export connection is removed, it will no longer be possible to set up S3 export with the AWS account root principal as a trustee in the bucket policy.

> If you have any questions or concerns about the migration process, please reach out to Amplitude support for additional assistance.