---
title: BigQuery Export
description: Set up a recurring or one-time export of Amplitude event data to BigQuery.
---

--8<-- "includes/editions-all-editions.md"

You can set up recurring syncs of your Amplitude event data to BigQuery through the Amplitude UI,  or manually start a sync of your historical data. This article outlines the process for connecting your Amplitude and BigQuery accounts, and then syncing your data.

!!!note "Other Amplitude + BigQuery Integrations"

    This integration sends Amplitude event data to BigQuery. Amplitude offers another integrations with BigQuery: 

    - [Import data from BigQuery](/data/sources/bigquery)

## Considerations 

- To help save usage costs for your queries, Amplitude partitions the events table by the date of `event_time`. See the [BigQuery docs](https://cloud.google.com/bigquery/docs/partitioned-tables) for more information about table partitioning. 
- Amplitude runs a daily integrity check for your exports. Each day, in the background, it checks the number of events exported over the last few days. If the number of events exported doesn't match the number of events that should have been exported, Amplitude automatically runs a backfill for that date. 
- It's possible to export duplicate events, especially if there is a backfill for a set of already-exported data. To help with this, Amplitude creates a table function within the provided dataset named `deduplicated_<appid>`. This table function provides a deduplicated view of the data.
  
    !!!example "Deduplicate table function example"

        ```sql
        SELECT * FROM `testProject.testDataset.deduplicated_EVENTS_12345`('2022-01-01', '2022-02-10');
        ```

## Prerequisites

To get started with exporting to BigQuery, you need the following:

- A [BigQuery project with the BigQuery Transfer service enabled](https://cloud.google.com/bigquery-transfer/docs/enable-transfer-service).
- A [service account](https://cloud.google.com/iam/docs/creating-managing-service-account-keys) for Amplitude. This lets Amplitude to export your data to your Google Cloud project. Your service account needs these roles enabled:
   - BigQuery User
   - BigQuery Data Editor
   - A [custom role](https://cloud.google.com/iam/docs/creating-custom-roles#creating_a_custom_role) that has the following permissions enabled:
     - `bigquery.transfers.get`
     - `bigquery.transfers.update`
     - `bigquery.datasets.update`

After you've created a service account, generate and download the service account key file and upload it to Amplitude. **Make sure you export Amplitude's account key in JSON format**.

## Set up a recurring data export to BigQuery

Creating a recurring data export is a simple, three-step process. Each sync completes within ten minutes, and all jobs are visible in Amplitude.

To set up a recurring export of your Amplitude data to BigQuery, follow these steps:

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Warehouse Destination section, click **Big Query**.
3. On the **Getting Started** tab, select the data you'd like to export and the export's cadence. You can *Export events ingested today and moving forward*, *Export all merged Amplitude IDs*, or both.
4. Review the schemas for the *Event* table and the *Merge IDs* table and click **Next**.
5. Specify the BigQuery dataset to receive your Amplitude data, and upload the service account key file. This file must be in JSON format.
6. Click **Next**. Amplitude attempts a test upload to test the credentials. If the upload is successful, click **Finish** to complete the BigQuery destination configuration and activation.

All future events or merged users are automatically sent to BigQuery. Amplitude exports files to your BigQuery account every hour.

### Event table schema

The **Event** table schema includes the following columns:
<!-- vale off-->
| <div class="big-column">Column</div>| Type | Description |
|---|---|---|
| `Adid` | String | (Android) Google Play Services advertising ID (ADID). Example: AEBE52E7-03EE-455A-B3C4-E57283966239 |
| `amplitude_event_type` | VARCHAR(1677721) | Amplitude specific identifiers based on events Amplitude generates. This is a legacy field so event_type should suffice for all queries  |
| `amplitude_id` | BIGNUMERIC | The original Amplitude ID for the user. Use this field to automatically handle merged users. Example: 2234540891 |
| `app` | INT64 | Project ID found in your project's Settings page. Example: 123456 |
| `city` | STRING | City. Example: “San Francisco” |
| `client_event_time` | TIMESTAMP | Local timestamp (UTC) of when the device logged the event. Example: `2015-08-10T12:00:00.000000` |
| `client_upload_time` | TIMESTAMP | The local timestamp (UTC) of when the device uploaded the event. Example: `2015-08-10T12:00:00.000000` |
| `country` | STRING | Country. Example: "United States" |
| `data` | STRING | Dictionary where certain fields such as `first_event` and `merged_amplitude_id` are stored |   |
| `device_brand` | STRING | Device brand. Example: Apple |
| `device_carrier` | STRING | Device Carrier. Example: Verizon |
| `device_family` | STRING | Device family. Example: Apple iPhone |
| `device_id` | STRING | The device specific identifier. Example: C8F9E604-F01A-4BD9-95C6-8E5357DF265D |
| `device_manufacturer` | STRING | Device manufacturer. Example: Apple |
| `device_model` | STRING | Device model. Example: iPad Mini |
| `device_type` | STRING | Device type. Example: Apple iPhone 5s |
| `dma` | STRING | Designated marketing area (DMA). Example; San Francisco-Oakland-San Jose, CA |
| `event_id` | INT64 | A counter that distinguishes events. Example: 1 |
| `event_properties` | STRING |    |
| `event_time` | TIMESTAMP | Amplitude timestamp (UTC) which is the `client_event_time` adjusted by the difference between `server_received_time` and `client_upload_time`, specifically: `event_time` = `client_event_time` + (`server_received_time` - `client_upload_time`)   Amplitude uses this timestamp is used to organize events on Amplitude charts. NOTE: If the difference between server_received_time and client_upload_time is less than 60 seconds, the `event_time` isn't adjusted and equals the `client_event_time`. Example: `2015-08-10T12:00:00.000000` |
| `followed_an_identify` | BOOL | True if there was an identify event between this current SDK event and the last SDK event seen. Example: `True` |
| `group_properties` | STRING |    |
| `groups` | STRING | Group types. See the Accounts documentation for more information.   |
| `idfa` | STRING | (iOS) Identifier for Advertiser. Example: AEBE52E7-03EE-455A-B3C4-E57283966239 |
| `ip_address` | STRING | IP address. Example: "123.11.111.11" |
| `is_attribution_event` | BOOL |     |
| `language` | STRING |     |
| `library` | STRING |     |
| `location_lat` | FLOAT64 | Latitude. Example: 12.3456789 |
| `location_lng` | FLOAT64 | Longitude. Example: -123.4567890 |
| `os_name` | STRING | OS name. Example: `ios` |
| `os_version` | STRING | OS version. | 1.0 |
| `paying` | STRING | True if the user has ever logged any revenue, otherwise (none).   Note: The property value can be modified via the Identify API. Example: true |
| `platform` | STRING |    |
| `processed_time` | TIMESTAMP |    |
| `region` | STRING | Region. Example: California |
| `sample_rate` | BIGNUMERIC |    |
| `server_received_time` | TIMESTAMP |    |
| `server_upload_time` | TIMESTAMP | Amplitude timestamp (UTC) of when Amplitude servers received the event. Example:  `2015-08-10T12:00:00.000000` |
| `session_id` | BIGNUMERIC | The session start time in milliseconds since epoch. Example: 1396381378123 |
| `start_version` | STRING | App version the user was first tracked on. Example: 1.0.0 |
| `user_creation_time` | TIMESTAMP | Event_time (UTC) of the user's first event. Example: `2015-08-10T12:00:00.000000` |
| `user_id` | STRING | A readable ID specified by you. Should be something that doesn't change; for that reason, using the user's email address isn't recommended.  |
| `user_properties` | STRING |    |
| `uuid` | STRING | A unique identifier per row (event sent). Example: bf0b9b2a-304d-11e6-934f-22000b56058f |
| `version_name` | STRING | The app version. Example: 1.0.0 |
<!-- vale on-->
### Merged User table schema

The Merged User table schema contains the following:  

| <div class="big-column">Column</div> |Type| Description  |
|---|---|---|
| `amplitude_id`| NUMBER(38,0) | The Amplitude ID being merged into a user's original Amplitude ID.  |
| `merge_event_time` |TIMESTAMP | The time of the event a user's new Amplitude ID was associated with their original Amplitude ID.  |
| `merge_server_time` | TIMESTAMP | The server time of the event when a user's new Amplitude ID was associated with their original Amplitude ID. |
| `merged_amplitude_id` | NUMBER(38,0) | The originally assigned Amplitude ID when the user is first created.  |
