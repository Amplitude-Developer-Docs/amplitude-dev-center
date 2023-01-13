---
title: Snowflake Data Share Export
description: Access your Amplitude event data via Snowflake Data Share.
---

Get access to your Amplitude events via Snowflake's Data Share product.

Amplitude supports [Snowflake’s Data Share](https://docs.snowflake.com/en/user-guide/data-sharing-intro.html) integration to give customers access to their event data that lives within Amplitude. Amplitude’s integration currently supports sharing a Raw Events table and a Merged ID table. 

!!!info "Add on feature"

    Amplitude's Snowflake Data Share Export is a paid add on to your Amplitude contract.

## Setup

To enable or disable Amplitude’s Snowflake Data Share Integration, reach out to your Account Manager at Amplitude or contact Amplitude Support.

### Backfill data

After the Share is set up between Amplitude and your Snowflake cluster, Amplitude only loads data from that point forward. To backfill historical data from a period before the connection, specify this in the request when setting up the share. 

!!!warning "Backfilling data has an additional cost"
    
    Contact your Amplitude Account Manager for pricing.

## Remove Data Share from Amplitude

To remove the Amplitude data set made available through the Data Share,  reach out to your Account Manager at Amplitude or fill out a support request [here](https://help.amplitude.com/hc/en-us/requests/new).

## Snowflake export format

| <div class="big-column">Schema Name</div>| Description |
|---|---|
| `DB_{ORG_ID}` | Database |
| `SCHEMA_{PROJECT_ID}` | Schema |
| `EVENTS_{PROJECT_ID}` | Events Table |
| `MERGE_IDS_{PROJECT_ID}` | Merge User Table |

### Event table schema

The **Event** table schema includes the following columns:

- `adid`
- `amplitude_event_type`
- `amplitude_id`
- `app`
- `city`
- `client_event_time`
- `client_upload_time`
- `country`
- `data`
- `device_brand`
- `device_carrier`
- `device_family`
- `device_id`
- `device_manufacturer`
- `device_model`
- `device_type`
- `dma`
- `event_id`
- `event_properties`
- `event_time`
- `event_type`
- `followed_an_identify`
- `group_properties`
- `groups`
- `idfa`
- `ip_address`
- `is_attribution_event`
- `language`
- `library`
- `location_lat`
- `location_lng`
- `os_name`
- `os_version`
- `paying`
- `platform`
- `processed_time`
- `region`
- `sample_rate`
- `server_upload_time`
- `session_id`
- `start_version`
- `user_creation_time`
- `user_id`
- `user_properties`
- `uuid`
- `version_name`
- `amplitude_attribution_ids`
- `server_received_time`
- `global_user_properties`
- `partner_id`
- `plan`
- `source_id`
- `data_type`

For more information, see the [Event Table Schema](../destinations/snowflake.md#event-table-schema) section of the Snowflake Export documentation.

### Merged User table schema

The Merged User table schema contains the following:  

- `amplitude_id`
- `merge_event_time`
- `merge_server_time`
- `merged_amplitude_id`

For more information,  see the [Merged User table schema](../destinations/snowflake.md#merged-user-table-schema) section of the Snowflake Export documentation.