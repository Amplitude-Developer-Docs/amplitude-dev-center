--- 
title: BigQuery Import
description: With Amplitude's BigQuery integration, you can ingest BigQuery data directly into your Amplitude project. 
---

--8<-- "includes/alpha-release.md"

--8<-- "includes/editions-all-paid-editions.md"

With Amplitude's BigQuery integration, you can ingest BigQuery data directly into your Amplitude project.

!!!note "Other Amplitude + BigQuery Integrations"

    This integration imports BigQuery data into Amplitude. Amplitude offers another integration with BigQuery: 

    - [Export data to BigQuery](/data/destinations/bigquery)

## Prerequisites

To get started with importing from BigQuery, you need to take care of a few prerequisites.

- You need a table (or tables) in BigQuery. This is where you want to import data from.
- Create a GCS bucket. We recommend one dedicated to this purpose. The ingestion process must offload data to a GCS bucket before ingesting it into Amplitude. This is due to BigQuery's limited export options.
- Create a Service Account with permissions granted for the bucket and tables you want to ingest, then get the service account key. The Service Account must have the following roles granted to it:
    - **BigQuery**:
        - BigQuery Job User at the project level.
        - BigQuery Data Viewer at the resource level necessary to access your data to be ingested. If your data is in a single table, just grant the service account BigQuery Data Viewer for that table resource. If the query requires multiple tables or datasets, grant BigQuery Data Viewer on all tables or datasets in the query.
    - **Cloud Storage**:
        - Storage Admin on the GCS bucket you're using for ingestion.
- Depending on your company's network policy, you may need to add the following IP addresses to your allowlist to allow Amplitude's servers to access your BigQuery instance:
      - 52.33.3.219
      - 35.162.216.242
      - 52.27.10.221

## Add BigQuery as a source

To add BigQuery as a data source in your Amplitude project, follow these steps.

1. In Amplitude, navigate to the Sources section and make sure you've selected the correct project from the project list dropdown.
2. Click **I want to import data into Amplitude**, then click **BigQuery**.
3. Add the service account key and specify a GCS bucket name.
4. Click **Next** to test the connection to make sure it's working.
5. After you confirm your credentials, click **Next** to select data. You have several configuration options to choose from here:
    - Type of data: This tells Amplitude whether you're ingesting event data or user property data.
    - Type of import:
          - Full Sync: Amplitude periodically imports the entire dataset, regardless of whether the data has already been imported. This is good for data sets where the row data changes over time, but there is no easy way to tell which rows have changed. Otherwise, the more efficient option would be a time-based import. This option isn't supported for ingesting event data.
          - Time-based: Amplitude periodically ingests the most recent rows in the data, as determined by the provided Timestamp column. The first import ingests all available data, and later imports ingest any data with timestamps after the time of the most recent import. To use this option, include the timestamp column in the output of your SQL statement.
    - Frequency: Choose from several scheduling options ranging from five minutes to one month (when this is selected, ingestion happens on the first of the month).
    - SQL query: This is the code for the query Amplitude uses to ingest the right data.
6. After you've set your configuration options, click **Test SQL** to see how the data is coming through from your BigQuery instance. If there are any errors, they'll appear under the Test SQL button.
7. If there are no errors, click **Finish**. You'll see a notification indicating you've successfully enabled the new BigQuery source. You'll also be redirected to the Sources listing page, where you'll see the newly created BigQuery source.

If you have any issues or questions while following this flow, contact the Amplitude team.

## Mandatory Data fields

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

## BigQuery SQL Helper

### Properties fields

Many Amplitude features are powered by "properties" fields, which are composed of property keys and property values. The most common of these properties fields are event_properties and user_properties.

In order for these sets of keys and values to be properly ingested into Amplitude, they must be exported from BigQuery as raw JSON, not as JSON strings. BigQuery doesn't have great support for JSON, but the following describes how to make sure your data is exported from BigQuery and imported to Amplitude without errors.

The properties fields must be sourced from columns with a [STRUCT](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-types#struct_type) type. The struct type is the type of field that represents a key-value structure and is exported from BigQuery in raw JSON format.

If your source table doesn't have the event or user properties organized in a struct type column, you can create it in your select SQL. For example, if your event properties are all flattened into their own columns, you can compose your event_properties into a struct like so:

```sql
SELECT STRUCT(

    event_property_column_1 AS event_property_name_1,

    event_property_column_2 AS event_property_name_2

) as event_properties

FROM your_table;
```

!!!warning

    You can't have spaces in struct field names even if they are enclosed in back ticks or single quotes.

### Properties from a JSON string field

If you have your event or user properties formatted as JSON as a string field, you still must reconstruct the properties field in the select SQL as a STRUCT. BigQuery exports String fields as String even if the contents are JSON. These are rejected by Amplitude's event validation.

You can extract values from your JSON String field, though, to use in your properties STRUCT. Use the [JSON_EXTRACT_SCALAR](https://cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#json_extract_scalar) function to access the values in your string as follows. If your EVENT_PROPERTIES column in the table contains a JSON String like:

`"{\"record count\":\"50\",\"region\":\"eu-central-1\"}"` which is displayed in BigQuery UI like `{"record count":"50","region":"eu-central-1"})`, then you can extract the values from the JSON String like this:

```sql
SELECT STRUCT(

    JSON_EXTRACT_SCALAR(EVENT_PROPERTIES, "$.record count") AS record_count,

   JSON_EXTRACT_SCALAR(EVENT_PROPERTIES, "$.region") AS region

) as event_properties

FROM your_table;
```

### String literals

Be aware that, unlike other data warehouse products, BigQuery treats "double-quoted strings" as string literals. 
This means that you can't use them to quote identifiers like column names or table names, or the SQL fails to execute in BigQuery.
