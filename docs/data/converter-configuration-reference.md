---
title: Converter Configuration Reference
description: This reference covers examples and operators for the Amazon S3 abd GCS Import converter configuration. 
---

This reference covers examples and operators for the Amazon S3 Import and GCS converter configuration. Read the [S3 guide](./sources/amazon-s3.md) or the [GCS guide](./sources/google-cloud-storage.md) for more information.

## Considerations

### `$skip_user_properties_sync`

Because many cloud storage source imports are batch uploads of historical data, it may not make sense to sync the latest user properties for historical events. Because of this, `$skip_user_properties_sync` is set to `true` by default. If you want to include user properties with your events, you must set it to `false` in the converter. 

For more information about `$skip_user_properties_sync`, see [the Data Backfill Guide](../analytics/data-backfill-guide.md#skip-user-properties-sync)

## convertToAmplitudeFunc

Conversion rules in `convertToAmplitudeFunc` instructs the how the ingestion service on how to construct events in Amplitude.

### Example converter with `convertToAmplitudeFunc`

```json 
{
    "config_name": ["Event sample converter"],
    "converterConfig": {
        "fileType": "parquet",
        "compressionType": "none",
        "convertToAmplitudeFunc": {
          "event_type": "action",
          "user_id": "user",
          "device_id": "device",
          "event_properties": {
              "business_id_encid": "business_id"
          },
          "user_properties": {
              "utm_channel_category": "utm_channel_c",
              "utm_channel_source": "utm_channel_s"
          },
          "time": "epoch",
          "session_id": "session_id",
          "app_version": "app_version"
        }
    },

    "keyValidatorConfig": {
        "filterPattern": "folder1/folder2/ds=202011[1-2][0-9]/.*\\.parquet"
    }
}
```

### Example constructed event

```json 
{
  "event_type": "watch tv",
  "user_id": "john",
  "device_id": "host1",
  "event_properties": {
    "business_id_encid": "123"
      },
      "user_properties": {
        "utm_channel_category": "discovery",
        "utm_channel_source": "network"
      },
      "time": "1645066434189",
      "session_id": "1",
      "app_version": "1"
}
```

Values in the event come from the fields specified by `convertToAmplitudeFunc`. For example, the value "watch tv" in field "event_type" comes from field "action" in ingested data files. Because `event_type` value isn’t `["value":"$identify"]` or `["value":"$groupidentify"]`, Amplitude ingests events in a way like it ingests events via the HTTP V2 API.

## Operators

### List operators

#### Use list operators

If the source description is a list, then the first item in the list must be a string specifying the function. The rest of the list are the parameters to the function. The "|" character separates non-repeating and repeating arguments. Any arguments after "|" are repeatable arguments and you can specify them any number of times. However, the entire list of arguments **must** be present in any multiple argument operator (meaning, you can't specify just one of three arguments, you must include all three).

<!-- vale off--> 
<!-- this table has a lot of complicated examples that throw many vale errors, so linting is off-->
| <div class="big-column">Operator</div> | Description                                                                                                                                                                                                                                                                                                                                                 | Syntax                                                              |                                                                                    |                                        |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|------------------------------------------------------------------------------------|----------------------------------------|
| `path`                                 | Evaluates each SourceDescription sequentially on the returned JsonElement. Equivalent to evaluating a specific path when chaining BasicPaths. This also works with indexing into an array, for example \["path", "foo", "1"] chooses the element at index 1 (second element) in the array at "foo".**The index must be provided as a string.**                 | \["path", \                                                         | SOURCE_DESCRIPTION...]**Example**: \["path", "foo", "bar"] => obj\['foo']\['bar']. |                                        |
| `any`                                  | Returns the first value returned by SOURCE_DESCRIPTION in the list.                                                                                                                                                                                                                                                                                         | \["any", SOURCE_DESCRIPTION, \                                      | SOURCE_DESCRIPTION...]                                                             |                                        |
| `value`                                | Escapes a single JSON value so you can create a static value.                                                                                                                                                                                                                                                                                               | **Example**: \["value", "amplitude-vacuum"...                       |                                                                                    |                                        |
| `dict`                                 | Creates a dictionary (object) where the raw_strings are keys and values are the evaluated SOURCE_DESCRIPTIONS.                                                                                                                                                                                                                                              | \["dict", "raw_string", SOURCE_DESCRIPTION, \                       | "raw_string", SOURCE_DESCRIPTION...]                                               |                                        |
| `array`                                | Returns an array, where elements are the values returned by evaluating SOURCE_DESCRIPTIONS. If a SOURCE_DESCRIPTION fails to evaluate, it will be skipped                                                                                                                                                                                                   | \["array", SOURCE_DESCRIPTION, \                                    | SOURCE_DESCRIPTION...]                                                             |                                        |
| `condition`                            | Determines the first true BooleanCondition and returns the result of the following SOURCE_DESCRIPTION. Throws a NoValueFoundAtSource exception if nothing evaluates to true.                                                                                                                                                                                | \["condition"\                                                      | "cond", BOOLEAN_SOURCE, SOURCE_DESCRIPTION, \                                      | BOOLEAN_SOURCE, SOURCE_DESCRIPTION...] |
| `ifelse`                               | If the BOOLEAN_SOURCE evaluates to true, returns the first SOURCE_DESCRIPTION. Otherwise returns the second SOURCE_DESCRIPTION.                                                                                                                                                                                                                             | \["ifelse", BOOLEAN_SOURCE, SOURCE_DESCRIPTION, SOURCE_DESCRIPTION] |                                                                                    |                                        |
| `sample_md5`                           | Evaluates the given sampleKey (second arg) with the samplePercent (first arg) to determine whether it should be in the sample. Returns boolean                                                                                                                                                                                                              | \["sample_md5", SOURCE_DESCRIPTION, SOURCE_DESCRIPTION]             |                                                                                    |                                        |
| `iso_time_to_ms`                       | Assumes the string returned by SOURCE_DESCRIPTION is an ISO datetime string, for example, `YYYY-MM-DDTHH:MM:SS`, and converts to milliseconds since epoch                                                                                                                                                                                                           | \["iso_time_to_ms", SOURCE_DESCRIPTION]                             |                                                                                    |                                        |
| `ms_to_iso_time`                       | Assumes the string returned by SOURCE_DESCRIPTION is milliseconds since epoch and converts to ISO datetime string, for example, `YYYY-MM-DDTHH:MM:SS  `                                                                                                                                                                                                             | \["ms_to_iso_time", SOURCE_DESCRIPTION]                             |                                                                                    |                                        |
| `iso_time_now`                         | Generates an ISO datetime string for right now                                                                                                                                                                                                                                                                                                              | \["iso_time_now"]                                                   |                                                                                    |                                        |
| `ms_time_now`                          | Generates the milliseconds since epoch for right now                                                                                                                                                                                                                                                                                                        | \["ms_time_now"]                                                    |                                                                                    |                                        |
| `int96_time_to_ms`                     | Assumes the string returned by SOURCE_DESCRIPTION is a base64-encoded INT96, for example, `AP6qCz41AAAwhCUA`, and converts to milliseconds since epoch                                                                                                                                                                                                                | \["int96_time_to_ms", SOURCE_DESCRIPTION]                           |                                                                                    |                                        |
| `parse_time_to_ms`                     | Takes in a RAW_STRING time format, for example, `M/d/yyyy H:mm:ss`, and a `SOURCE_DESCRIPTION` that returns a string in that format, for example, '1/1/2021 5:06:07', and converts to milliseconds since epoch                                                                                                                                                                | \["parse_time_to_ms", RAW_STRING, SOURCE_DESCRIPTION]               |                                                                                    |                                        |
| `parse_json_element`                   | Assumes the value returned by SOURCE_DESCRIPTION is a string json blob and returns the parsed json value                                                                                                                                                                                                                                                    | \["parse_json_element"\                                             | "parse_json_object", SOURCE_DESCRIPTION]                                           |                                        |
| `merge_dicts`                          | Merges the json objects that each SOURCE_DESCRIPTION evaluates to                                                                                                                                                                                                                                                                                           | \["merge_dicts", SOURCE_DESCRIPTION, \                              | SOURCE_DESCRIPTION...]                                                             |                                        |
| `flatten_dict`                         | Flattens a nested json object into a single layer json object                                                                                                                                                                                                                                                                                               | \["flatten_dict", "raw_string", INTEGER_SOURCE, SOURCE_DESCRIPTION] |                                                                                    |                                        |
| `exclude_keys`                         | Evaluates the specified SourceDescription the returned JsonElement without the requested fields                                                                                                                                                                                                                                                             | \["exclude_keys", SOURCE_DESCRIPTION, \                             | "raw_string"...]                                                                   |                                        |
| `concat`                               | Treats the results of each SOURCE_DESCRIPTION as a string and returns the concatenated string                                                                                                                                                                                                                                                               | \["concat", SOURCE_DESCRIPTION, \                                   | SOURCE_DESCRIPTION...]                                                             |                                        |
| `replace_with`                         | Replace all old_string within the value returned by SOURCE_DESCRIPTION with new_string. Returns a string or raises a NoValueException if SOURCE_DESCRIPTION can't be evaluated to a string. The old_string supports Java's regex syntax for matching patterns, more details at https&#x3A;//docs.oracle.com/javase/7/docs/api/java/util/regex/Pattern.html | \["replace_with", "old_string", "new_string", SOURCE_DESCRIPTION]    |                                                                                    |                                        |
| `split`                                | Splits the value returned by SOURCE_DESCRIPTION by the specified character sequence. Returns a jsonArray or raises a NoValueException if SOURCE_DESCRIPTION can't be evaluated to a string                                                                                                                                                                 | \["split", "raw_string", SOURCE_DESCRIPTION]                        |                                                                                    |                                        |
| `lowercase`                            | Returns the lowercase string                                                                                                                                                                                                                                                                                                                                | \["lowercase"\                                                      | "lower", SOURCE_DESCRIPTION]                                                       |                                        |
| `typeof`                               | Returns type of the source description as a string: 'string', 'list', 'dict', 'bool', 'number', 'null'                                                                                                                                                                                                                                                      | \["typeof", SOURCE_DESCRIPTION]                                     |                                                                                    |                                        |

<!-- vale on-->

### Boolean operators

These operators return a JsonPrimitive of type Boolean, so they're valid to use with `cond` and `ifelse`.

<!-- vale off--> 
<!-- this table has a lot of complicated examples that throw many vale errors, so linting is off-->

| **Operator** | **Description**                                                                                                                           | **Source**                                                      |
|--------------|-------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------|
| `bool`       | Evaluates as a static boolean value. Throws an exception during initialization if RAW_JSON isn't a boolean value.                        | \["bool", any_json]                                             |
| `not`        | Return whether both arguments are true. Null values are treated as false, string 'true' or 'false' is cast to a boolean.                  | \["not"\|"!", SOURCE_DESCRIPTION]                               |
| `and`        | Return whether all arguments are true. Null values are treated as false, string 'true' or 'false' is cast to a boolean.                   | \["and"\|"&&", SOURCE_DESCRIPTION, \| SOURCE_DESCRIPTION...]    |
| `or`         | Return whether at least one argument is true. Null values are treated as false, string 'true' or 'false' is cast to a boolean.            | \["or"\|"\|\|", SOURCE_DESCRIPTION, \| SOURCE_DESCRIPTION...]   |
| `equals`     | Evaluates to `true` if and only if the two args are equal.                                                                                | \["equals"\|"eq"\|"=", SOURCE_DESCRIPTION, SOURCE_DESCRIPTION]  |
| `contains`   | True if the evaluated SourceDescription (second arg) contains the given raw string. If the SourceDescription is null, evaluates to false. | \["contains"\|"is_substring", "raw_string", SOURCE_DESCRIPTION] |
<!-- vale on-->

### Integer and float operators

The following Operators return a JsonPrimitive of type Integer, barring the `addf` Operator which returns JsonPrimitive of type Float.

<!-- vale off--> 
<!-- this table has a lot of complicated examples that throw many vale errors, so linting is off-->

| **Operator** | **Description**                                                                                                                            | **Syntax**                                                        |
|--------------|--------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------|
| `int`        | Evaluates as a static int value. Throws an exception during initialization if RAW_JSON is not an int value.                                | \["int", RAW_JSON]                                                |
| `round`      | Round the argument to the nearest integer. Amplitude attempts to convert strings to integers and treats null values as zero.      | \["round", SOURCE_DESCRIPTION]                                    |
| `add`        | Return the sum of the arguments as an integer. Amplitude attempts to convert strings to integers and treats null values as zero.     | \["add"\|"+", SOURCE_DESCRIPTION, \| SOURCE_DESCRIPTION...]       |
| `subtract`   | Subtracts the second argument from the first one. Amplitude attempts to convert strings to integers and treats null values as zero.  | \["subtract"\|"-", SOURCE_DESCRIPTION, SOURCE_DESCRIPTION]        |
| `multiply`   | Return the product of the arguments as an integer. Amplitude attempts to convert strings to integers and treats null values as zero. | \["multiply"\|"\*", SOURCE_DESCRIPTION, \| SOURCE_DESCRIPTION...] |
| `divide`     | Divides the first argument by the second one. Amplitude attempts to convert strings to integers and treats null values as zero.     | \["divide"\|"/", SOURCE_DESCRIPTION, SOURCE_DESCRIPTION]          |

### JSON operator

| **Operator** | **Description**                                                    | **Syntax**                                                                                                                                                                                 |
|--------------|--------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| N/A          | As syntactic sugar, Amplitude converts an object to a "dict" LIST_OPERATOR | **Note**: the following two descriptions are equivalent:   {"key1": SOURCE_DESCRIPTION,"key2", SOURCE_DESCRIPTION,…}   \["dict","key1", SOURCE_DESCRIPTION,"key2", SOURCE_DESCRIPTION,...] |

### User property operations

The converter supports the same user property operators as the Identify API. See [the Identify documentation](../../analytics/apis/identify-api#user_properties-supported-operations) for details.
<!-- vale on-->

<!-- ## Converter configuration examples

See a collection of [example converters on GitHub](https://github.com/Amplitude-Developer-Docs/flexible-ingestion-examples/blob/main/README.md). -->
