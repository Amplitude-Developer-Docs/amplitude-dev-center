---
title: Snowflake Import
description: Use Amplitude's Snowflake integration to ingest Snowflake data directly into your Amplitude project. 
---

With Amplitude's Snowflake integration, you can ingest Snowflake data directly into your Amplitude project. This article walks you through the steps needed to make that happen.

--8<-- "includes/editions-all-paid-editions.md"

!!!note "Add Amplitude IP addresses"

    Depending on your company's network policy, you may need add these IP addresses to your allowlist in order for Amplitude's servers to access your Snowflake instance:

    - 52.33.3.219
    - 35.162.216.242
    - 52.27.10.221

## Add Snowflake as a source

!!!note "Time-based Import"

      When using the Time Based Import option, it's important the dataset includes a separate column that indicates *when* the data was loaded into the table Amplitude points to when importing. This is often "server upload time", which would be separate from the "event time" (when the actual event occured).

To add Snowflake as a data source in your Amplitude project, follow these steps:

1. In Amplitude, navigate to **Data Sources**, and make sure you've selected the correct project from the project list dropdown.
2. Click **I want to import data into Amplitude**, then click **Snowflake**.
3. Enter the required credentials for the Snowflake instance you want to connect:
      - **Account**: Snowflake account (case sensitive)
      - **Database**: Name of the database where Amplitude can find the data
      - **Warehouse**: Used by Amplitude to execute SQL
      - **Username**: Used by Amplitude for authentication
      - **Password**: Used by Amplitude for authentication
4. Copy the auto-generated SQL query and run it in Snowflake to give Amplitude the proper permissions. 
5. After running the query, click **Next** to test the connection.
6. After the test is successful, click **Next** again to move on to the data selection stage.
7. Choose your configuration options: 
      - **Type of data**: This tells Amplitude whether you're ingesting event data or user property data.
      - **Type of import:**
        - **Full Sync**: Amplitude periodically ingests the entire dataset, regardless of whether that data has already been imported. This is good for data sets where the row data changes over time, but there is no easy way to tell which rows have changed. Otherwise, the more efficient option would be a time-based import. This option is not supported for ingesting event data.
        - **Time-based**: Amplitude periodically ingests the most recent rows in the data, as determined by the provided *Timestamp* column. The first import brings in all available data, and later imports ingest any data with timestamps **after the time of the most recent import**. In order for this to work, you must include the timestamp of when the data was loaded into Snowflake.
      - **Frequency**: Choose from several scheduling options ranging from five minutes to one month (when this is selected, ingestion happens on the first of the month).
      - **SQL query**: This is the code for the query Amplitude uses to determine which data is ingested.

8. After you've set your configuration options, click **Test SQL** to see how the data is coming through from your Snowflake instance. Errors appear on this screen.
9. If there are no errors, click **Finish**. 

You'll see a notification indicating you've successfully enabled the new Snowflake source. You'll also be redirected to the Sources listing page, where you'll see the newly created Snowflake source.

If you have any issues or questions while following this flow, please contact the Amplitude team.

## Data fields

You must include the mandatory fields for the data type when creating the SQL query. These tables outline the mandatory and optional fields for each data type. You can include other columns beyond those listed here.

### Events

| Column name (must be lowercase) | Mandatory | Column data type |
|---|---|---|
| `user_id` | Yes, unless `device_id` is used | VARCHAR |
| `device_id` | Yes, unless `user_id` is used | VARCHAR |
| `event_type` | Yes | VARCHAR |
| `time` | Yes | Milliseconds since epoch (Timestamp) |
| `event_properties` | Yes | VARIANT (JSON Object) |
| `user_properties` | No | VARIANT (JSON Object) |
| `update_time_column` | No (Yes if using time based import) | TIMESTAMP |

### User properties

| Column name (must be lowercase) | Mandatory | Column data type |
|---|---|---|
| `user_id` | Yes | VARCHAR |
| `user_properties` | Yes | VARIANT (JSON Object) |
| `update_time_column` | No (Yes if using time based import) | TIMESTAMP |

## SQL query examples

To make the data selection step a bit easier, here are few example SQL snippets to get you started.

### Event data example

```sql
SELECT
    EVENT_TYPE_COLUMN AS "event_type",
    EVENT_PROPERTIES_VARIANT_COLUMN AS "event_properties",
    TIME_EPOCH_MS_COLUMN AS "time",
    USER_ID_COLUMN AS "user_id",
    USER_PROPERTIES_VARIANT_COLUMN AS "user_properties"
FROM DATABASE_NAME.SCHEMA_NAME.TABLE_OR_VIEW_NAME
```

### User Property example

```sql
SELECT
    USER_ID_COLUMN AS "user_id",
    USER_PROPERTIES_VARIANT_COLUMN AS "user_properties"
FROM DATABASE_NAME.SCHEMA_NAME.TABLE_OR_VIEW_NAME
```

### Group Property example

```sql
SELECT
    GROUPS_OBJ AS "groups",
    GROUP_PROPS_OBJ AS "group_properties"
FROM DATABASE_NAME.SCHEMA_NAME.TABLE_OR_VIEW_NAME
```

### Common snippets

Creating a JSON Object:

`OBJECT_CONSTRUCT('city', CITY, 'state', STATE) as "user_properties"`

Converting timestamp column to milliseconds:

`DATE_PART('EPOCH_MILLISECOND', TIMESTAMP_COLUMN) as "time"`

Converting milliseconds to timestamp needed for time based import:

`TO_TIMESTAMP_NTZ(TIME_COLUMN_IN_MILLIS) as "timestamp_column"`
