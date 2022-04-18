---
title: BigQuery Export
description: Set up a recurring or one-time export of Amplitude event data to BigQuery.
---

--8<-- "includes/editions-all-paid-editions.md"

You can set up recurring syncs of your Amplitude event data to BigQuery through the Amplitude UI,  or manually initiate a sync of your historical data. This article outlines the process for connecting your Amplitude and BigQuery accounts, and then syncing your data.

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

Creating a recurring data export is a simple, three-step process. Each sync completes within ten minutes, and all jobs will be visible to you.

To set up a recurring export of your Amplitude data to BigQuery, follow these steps:

1. Navigate to *Data Destinations*.
2. Under *Add More Destinations ...*, click the BigQuery panel.

![image3.png](https://help.amplitude.com/hc/article_attachments/4416451511579/image3.png)

The *Export Data to BigQuery* page will open to the *Getting Started* tab.

1. Under *Export Data to BigQuery*, select the data you'd like to export.

![image2.png](https://help.amplitude.com/hc/article_attachments/4416443987995/image2.png)

1. Review the schemas for the *Event* table and the *Merge IDs* table and click *Next >*. The *Set Up Export* tab will open.
2. In the *Google Cloud Credentials For Amplitude* section, specify the BigQuery dataset to receive your Amplitude data, and upload the service account key file. This file must be in JSON format.

![image1.png](https://help.amplitude.com/hc/article_attachments/4416436180379/image1.png)

1. When you're finished, click *Next >*. Amplitude will attempt a test upload to ensure the entered credentials work. If the upload is successful, click *Finish* to complete the BigQuery destination configuration and activation.

All future events/merged users will automatically be sent to BigQuery. Amplitude will export files to your BigQuery account every hour. Additionally, you can set up backfills to export data that was sent to Amplitude before BigQuery export was set up.
