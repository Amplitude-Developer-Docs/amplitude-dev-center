---
title: Amazon S3 Import
description: Use Amplitude's Amazon S3 Import to import event, group properties, and user properties into Amplitude from an Amazon AWS S3 bucket.
---

With Amplitude’s Amazon S3 Import, you can import event, group properties, or user properties into your Amplitude projects from an AWS S3 bucket.
 Use Amazon S3 Import to backfill large amounts of existing data, connect existing data pipelines to Amplitude, and ingest large volumes of data where you need high throughput and latency is less sensitive.

--8<-- "includes/editions-all-paid-editions.md"

During setup, you configure conversion rules to control how events are instrumented.
 After Amazon S3 Import is set up and enabled, Amplitude's ingestion service continuously discovers data files in S3 buckets and then converts and ingest events.

Amazon S3 Import setup is broken into four main phases:

1. Examine your existing dataset.
2. Add a new Amazon S3 Import source in Amplitude.
3. Set up converter configuration.
4. Test.

## Getting started

### Prerequisites

Before you start, make sure you’ve taken care of some prerequisites.

- Make sure you have admin permissions for your Amplitude org.
- Make sure that a project exists to receive the data. If not, create a new project.
- Make sure your S3 bucket has data files ready to be ingested. They must conform to the mappings that you outline in your converter file.

Before you can ingest data, review your dataset and consider best practices. Make sure your dataset contains the data you want to ingest, and any required fields.

### File requirements

The files you want to send to Amplitude must follow some basic requirements.

- Files contain events, with one event per line.
- Files are uploaded approximately in the events’ chronological order.
- Filenames are unique.
- The file hasn’t been ingested by the S3 import already. After a file has been ingested, an S3 import source won’t process the same file again, even if it’s updated.
- Files are compressed or uncompressed JSON, CSV, or parquet files.

### Limits

For each Amplitude project, AWS S3 import can ingest:

- Up to 50 files per second.
- Up to 30k events per second.

## Set up Amazon S3 Import in Amplitude

When your dataset is ready to be ingested, you can set up Amazon S3 Import in Amplitude.

### Give Amplitude access to your S3 bucket

Follow these steps to give Amplitude read access to your AWS S3 bucket.

1. Create a new IAM role, for example: “AmplitudeReadRole”.
2. Go to **Trust Relationships** for the role and add Amplitude’s account to the trust relationship policy, using the following example. Update **{{}}** in highlighted text. 

    * **{{amplitude_account}}**: `358203115967` for Amplitude US data center. `202493300829` for Amplitude EU data center. 
    * **{{external_id}}**: unique identifiers used when assuming roles. Example can be `vzup2dfp-5gj9-8gxh-5294-sd9wsncks7dc`.

    ``` json hl_lines="7 12"
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Principal": {
            "AWS": "arn:aws:iam::{{amplitude_account}}:root"
          },
          "Action": "sts:AssumeRole",
          "Condition": {
            "StringEquals": {
              "sts:ExternalId": "{{external_id}}"
            }
          }
        }
      ]
    }
    ```

3. Attach the following policy (for example, `AmplitudeS3ReadOnlyAccess`) with the appropriate bucket to the Role created in Step 1. Update **{{}}** in highlighted text.

    * **{{bucket_name}}**: the s3 bucket name where your data will be imported from.
    * **{{prefix}}**: the location in s3 bucket above where your data lives.

    ```json hl_lines="16 30 41"
    {
      "Version":"2012-10-17",
      "Statement":[
        {
          "Sid":"AllowListingOfDataFolder",
          "Action":[
            "s3:ListBucket"
          ],
          "Effect":"Allow",
          "Resource":[
            "arn:aws:s3:::{{bucket_name}}"
          ],
          "Condition":{
            "StringLike":{
              "s3:prefix":[
                "{{prefix}}/*"
              ]
            }
          }
        },
        {
          "Sid":"AllowAllS3ReadActionsInDataFolder",
          "Effect":"Allow",
          "Action":[
            "s3:Get*",
            "s3:List*",
            "s3:Head*"
          ],
          "Resource":[
            "arn:aws:s3:::{{bucket_name}}/{{prefix}}/*"
          ]
        },
        {
          "Sid":"AllowUpdateS3EventNotification",
          "Effect":"Allow",
          "Action":[
            "s3:PutBucketNotification",
            "s3:GetBucketNotification"
          ],
          "Resource":[
            "arn:aws:s3:::{{bucket_name}}"
          ]
        }
      ]
    }
    ```

### Create Amazon S3 Import source

In Amplitude, create the S3 Import source.

!!!tip "Use a test project"

    We recommend first loading your data into an Amplitude test project, so you can make adjustments before loading data into your production project.

To create the data source in Amplitude, gather information about your S3 bucket:

- IAM role ARN: The IAM role that Amplitude uses to access your S3 bucket. This is the role created in [Give Amplitude access to your S3 bucket](#give-amplitude-access-to-your-s3-bucket).
- IAM role external id: The external id for the IAM role that Amplitude uses to access your S3 bucket.
- S3 bucket name: The name of the S3 bucket with your data.
- S3 bucket prefix: The S3 folder with your data.
- S3 bucket region: The region where S3 bucket was created.

When you have your bucket details, create the Amazon S3 Import source.

1. In Amplitude, navigate to **Data Sources**, then select **I want to import data into Amplitude**.

2. Select **Amazon S3**, then click **Next**. If this source doesn’t appear in the list, contact your Amplitude Solutions Architect.

3. Complete the **Configure S3 location** section on the Set up S3 Bucket page:

    * **Bucket Name**: Name of bucket you created to store the files. For example, `com-amplitude-vacuum-<customername>.` This tells Amplitude where to look for your files.
    * **Prefix**: Location of files to be imported. This must end with “/”. For example, `dev/event-data/`.
    * **AWS Role ARN**. Required.
    * **AWS External ID**. Required.

4. Optional: enable **S3 Event Notification**. See [Manage Event Notifications](#optional-manage-event-notifications) for more information.

5. Click **Test Credentials** after you’ve filled out all the values. You can’t edit these values from the UI after you create the source, so make sure that all the info is correct before clicking **Next**.

6. From the Enable Data Source page, enter a **Data Source Name** and a **Description** (optional) and save your source. You can edit these details from Settings.

A banner confirms you’ve created and enabled your source. Click **Finish** to go back to the list of data sources. Next, you must create your converter configuration.

Amplitude continuously scans buckets to discover new files as they're added. Data is available in charts within 30 seconds of ingestion.

### Optional: Manage event notifications

Event Notification lets the Amplitude ingestion service discover data in your S3 bucket faster.
 Compared to the current approach of scanning buckets, it discovers new data based on notifications published by S3. This feature reduces the time it takes to find new data.

Use this feature if you want to achieve near real-time import with Amplitude Amazon S3 import. Usually, new data files are discovered within 30 seconds.

#### Considerations

- The IAM role used must have required permission to configure S3 bucket event notifications.
- The bucket can’t already have existing event notifications This is a limitation on the Amazon S3 side.
- The notifications only apply to files uploaded after you enable event notifications.

To enable the feature, you can either enable it when you create the source, or manage the data source and toggle **S3 Event Notification**.

![image of the manage source modal with the event notifications toggle enabled](../../assets/images/integrations-amazon-s3-manage-notifications.png)

## Create the converter configuration

Your converter configuration gives the S3 vacuum this information:

- A pattern that tells Amplitude what a valid data file looks like. For example:**“\\w+\_\\d{4}-\\d{2}-\\d{2}.json.gz”**
- Whether the file is compressed, and if so, how.
- The file’s format. For example: CSV (with a particular delimiter), or lines of JSON objects.
- How to map each row from the file to an Amplitude event.

The converter file tells Amplitude how to process the ingested files. Create it in two steps: first, configure the compression type, file name, and escape characters for your files.
 Then use JSON to describe the rules your converter follows.

The converter language describes extraction of a value given a JSON element. This is specified by a SOURCE_DESCRIPTION, which includes:

- BASIC_PATH
- LIST_OPERATOR
- JSON_OBJECT

!!!example "Example converters"

    See the [Converter Configuration reference](/data/converter-configuration-reference) for more help.

<!--See a collection of[example converters on GitHub](https://github.com/Amplitude-Developer-Docs/flexible-ingestion-examples/blob/main/README.md) to get inspired. -->

### Configure converter in Amplitude

1. Click **Edit Import Config** to configure the compression type, file name, and escape characters for your files. The boilerplate of your converter file pre-populates based on the selections made during this step. You can also test whether the configuration works by clicking **Pull File**.
2. Click **Next**.
3. Enter your converter rules in the text editor.
4. Test your conversion. Click **Test Convert**. Examine the conversion preview. Make adjustments to your converter configuration as needed.
5. Click **Finish**.

!!!note

    If you add new fields or change the source data format, you need to update your converter configuration. Note that the updated converter only applies to files `discovered_after_converter` updates are saved.

## Enable the Source

After you’ve created the S3 Import source and the converter configuration, you must enable the source to begin importing data.

To enable the source:

1. Navigate to the source’s page, and click the **gear** icon to manage the data source.
2. Toggle **Status** to active.
3. Confirm your changes.
