---
title: BigQuery Export
description: Set up a recurring or one-time export of Amplitude event data to BigQuery.
---


--8<-- "includes/alpha-release.md"

--8<-- "includes/editions-all-paid-editions.md"

You can set up recurring syncs of your Amplitude event data to BigQuery through the Amplitude UI,  or manually start a sync of your historical data. This article outlines the process for connecting your Amplitude and BigQuery accounts, and then syncing your data.

## Prerequisites

To get started with exporting to BigQuery, you need the following:

- A [BigQuery project with the BigQuery Transfer service enabled](https://cloud.google.com/bigquery-transfer/docs/enable-transfer-service).
- A [service account](https://cloud.google.com/iam/docs/creating-managing-service-account-keys) for Amplitude. This lets Amplitude to export your data to your Google Cloud project. Your service account needs these roles enabled:
   - BigQuery User
   - BigQuery Data Editor
   - A [custom role](https://cloud.google.com/iam/docs/creating-custom-roles#creating_a_custom_role) that has the following permissions enabled:
     - `bigquery.transfers.get`
     - `bigquery.transfers.update`

After you've created a service account, generate and download the service account key file and upload it to Amplitude. **Make sure you export Amplitude's account key in JSON format**.

## Set up a recurring data export to BigQuery

Creating a recurring data export is a simple, three-step process. Each sync completes within ten minutes, and all jobs are visible in Amplitude.

To set up a recurring export of your Amplitude data to BigQuery, follow these steps:

1. In Amplitude, navigate to **Data Destinations**, then click **View more destinations**.
2. Click **Big Query - Raw Events**.
3. On the **Getting Started** tab, select the data you'd like to export. You can *Export events ingested today and moving forward*, *Export all merged Amplitude IDs*, or both.
4. Review the schemas for the *Event* table and the *Merge IDs* table and click **Next**.
5. Specify the BigQuery dataset to receive your Amplitude data, and upload the service account key file. This file must be in JSON format.
6. Click **Next**. Amplitude attempts a test upload to test the credentials. If the upload is successful, click **Finish** to complete the BigQuery destination configuration and activation.

All future events or merged users are automatically sent to BigQuery. Amplitude exports files to your BigQuery account every hour.
