---
title: Converter Configuration Reference
description:
---


## convertToAmplitudeFunc

Conversion rules in `convertToAmplitudeFunc` determine how the ingestion service constructs events in Amplitude.

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
              "utm_channel_source": "utm_channel_s",
          },
          "time": "epoch",
          "session_id": "session_id",
          "app_version": "app_version",
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
        "utm_channel_source": "network",
      },
      "time": "1645066434189",
      "session_id": "1",
      "app_version": "1",
}
```

Values in the event come from the fields specified by `convertToAmplitudeFunc”`. For example, the value “watch tv” in field “event_type” comes from field “action” in ingested data files. Since `event_type` value isn’t `$identify` or `$groupIdentify`, Amplitude is ingesting events in a way similar to using the HTTP V2 API.

## Operators

### List Operators

**Using List Operators**

If the source description is a list, then the first item in the list must be a string specifying the function, the rest of the list are the parameters to the function. The "|" character separates non-repeating and repeating arguments. Any arguments after "|" are repeatable arguments and can be specified any number of times. However, the entire list of arguments**must**be present in any multiple argument operator (meaning, you can't specify just one of three arguments, you must include all three).

| <div class="med-column">Operator</div>       | Description                                                                                                                                                                                                                                                                                                                                             | Syntax                                                                                          |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `path`               | Evaluates each SourceDescription sequentially on the returned JsonElement. Equivalent to evaluating a specific path when chaining BasicPaths. This also works with indexing into an array, e.g. \["path", "foo", "1"] will choose the element at index 1 (second element) in the array at "foo".**The index must be provided as a string.**                 | \["path", \| SOURCE_DESCRIPTION...]**Example**: \["path", "foo", "bar"] => obj\['foo']\['bar'].      |
| `any`                | Returns the first value returned by SOURCE_DESCRIPTION in the list.                                                                                                                                                                                                                                                                                         | \["any", SOURCE_DESCRIPTION, \| SOURCE_DESCRIPTION...]                                               |
| `value`              | Escapes a single JSON value so you can create a static value.                                                                                                                                                                                                                                                                                               | **Example**: \["value", "amplitude-vacuum"...                                                        |
| `dict`               | Creates a dictionary (object) where the raw_strings are keys and values are the evaluated SOURCE_DESCRIPTIONS.                                                                                                                                                                                                                                              | \["dict", "raw_string", SOURCE_DESCRIPTION, \| "raw_string", SOURCE_DESCRIPTION...]                  |
| `array`              | Returns an array, where elements are the values returned by evaluating SOURCE_DESCRIPTIONS. If a SOURCE_DESCRIPTION fails to evaluate, it will be skipped                                                                                                                                                                                                   | \["array", SOURCE_DESCRIPTION, \| SOURCE_DESCRIPTION...]                                             |
| `condition`          | Determines the first true BooleanCondition and returns the result of the following SOURCE_DESCRIPTION. Throws a NoValueFoundAtSource exception if nothing evaluates to true.                                                                                                                                                                                | \["condition"\|"cond", BOOLEAN_SOURCE, SOURCE_DESCRIPTION, \| BOOLEAN_SOURCE, SOURCE_DESCRIPTION...] |
| `ifelse`             | If the BOOLEAN_SOURCE evaluates to true, returns the first SOURCE_DESCRIPTION. Otherwise returns the second SOURCE_DESCRIPTION.                                                                                                                                                                                                                             | \["ifelse", BOOLEAN_SOURCE, SOURCE_DESCRIPTION, SOURCE_DESCRIPTION]                                  |
| `sample_md5`         | Evaluates the given sampleKey (second arg) with the samplePercent (first arg) to determine whether it should be in the sample. Returns boolean                                                                                                                                                                                                              | \["sample_md5", SOURCE_DESCRIPTION, SOURCE_DESCRIPTION]                                              |
| `iso_time_to_ms`     | Assumes the string returned by SOURCE_DESCRIPTION is an ISO datetime string, e.g. `YYYY-MM-DDTHH:MM:SS`, and converts to milliseconds since epoch                                                                                                                                                                                                             | \["iso_time_to_ms", SOURCE_DESCRIPTION]                                                              |
| `ms_to_iso_time`     | Assumes the string returned by SOURCE_DESCRIPTION is milliseconds since epoch and converts to ISO datetime string, e.g. `YYYY-MM-DDTHH:MM:SS  `                                                                                                                                                                                                               | \["ms_to_iso_time", SOURCE_DESCRIPTION]                                                              |
| `iso_time_now`       | Generates an ISO datetime string for right now                                                                                                                                                                                                                                                                                                              | \["iso_time_now"]                                                                                    |
| `ms_time_now`        | Generates the milliseconds since epoch for right now                                                                                                                                                                                                                                                                                                        | \["ms_time_now"]                                                                                     |
| `int96_time_to_ms`   | Assumes the string returned by SOURCE_DESCRIPTION is a base64-encoded INT96, e.g. AP6qCz41AAAwhCUA, and converts to milliseconds since epoch                                                                                                                                                                                                                | \["int96_time_to_ms", SOURCE_DESCRIPTION]                                                            |
| `parse_time_to_ms`   | Takes in a RAW_STRING time format, e.g. 'M/d/yyyy H:mm:ss', and a SOURCE_DESCRIPTION that returns a string in that format, e.g. '1/1/2021 5:06:07', and converts to milliseconds since epoch                                                                                                                                                                | \["parse_time_to_ms", RAW_STRING, SOURCE_DESCRIPTION]                                                |
| `parse_json_element` | Assumes the value returned by SOURCE_DESCRIPTION is a string json blob and returns the parsed json value                                                                                                                                                                                                                                                    | \["parse_json_element"\|"parse_json_object", SOURCE_DESCRIPTION]                                     |
| `merge_dicts`        | Merges the json objects that each SOURCE_DESCRIPTION evaluates to                                                                                                                                                                                                                                                                                           | \["merge_dicts", SOURCE_DESCRIPTION, \| SOURCE_DESCRIPTION...]                                       |
| `flatten_dict`       | Flattens a nested json object into a single layer json object                                                                                                                                                                                                                                                                                               | \["flatten_dict", "raw_string", INTEGER_SOURCE, SOURCE_DESCRIPTION]                                  |
| `exclude_keys`       | Evaluates the specified SourceDescription the returned JsonElement without the requested fields                                                                                                                                                                                                                                                             | \["exclude_keys", SOURCE_DESCRIPTION, \| "raw_string"...]                                            |
| `concat`             | Treats the results of each SOURCE_DESCRIPTION as a string and returns the concatenated string                                                                                                                                                                                                                                                               | \["concat", SOURCE_DESCRIPTION, \| SOURCE_DESCRIPTION...]                                            |
| `replace_with`       | Replace all old_string within the value returned by SOURCE_DESCRIPTION with new_string. Returns a string or raises a NoValueException if SOURCE_DESCRIPTION cannot be evaluated to a string. The old_string supports Java's regex syntax for matching patterns, more details at https&#x3A;//docs.oracle.com/javase/7/docs/api/java/util/regex/Pattern.html | \["replce_with", "old_string", "new_string", SOURCE_DESCRIPTION]                                     |
| `split`              | Splits the value returned by SOURCE_DESCRIPTION by the specified character sequence. Returns a jsonArray or raises a NoValueException if SOURCE_DESCRIPTION cannot be evaluated to a string                                                                                                                                                                 | \["split", "raw_string", SOURCE_DESCRIPTION]                                                         |
| `lowercase`          | Returns the lowercase string                                                                                                                                                                                                                                                                                                                                | \["lowercase"\|"lower", SOURCE_DESCRIPTION]                                                          |
| `typeof`             | Returns type of the source description as a string: 'string', 'list', 'dict', 'bool', 'number', 'null'                                                                                                                                                                                                                                                      | \["typeof", SOURCE_DESCRIPTION]                                                                      |


### Boolean Operators

All of these operators return a JsonPrimitive of type Boolean, so they're valid to use with "cond" and "ifelse".

| **Operator** | **Description**                                                                                                                           | **Source**                                                      |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| bool         | Evaluates as a static boolean value. Throws an exception during initialization if RAW_JSON is not a boolean value.                        | \["bool", any_json]                                             |
| not          | Return whether both arguments are true. Null values are treated as false, string 'true' or 'false' is cast to a boolean.                  | \["not"\|"!", SOURCE_DESCRIPTION]                               |
| and          | Return whether all arguments are true. Null values are treated as false, string 'true' or 'false' is cast to a boolean.                   | \["and"\|"&&", SOURCE_DESCRIPTION, \| SOURCE_DESCRIPTION...]    |
| or           | Return whether at least one argument is true. Null values are treated as false, string 'true' or 'false' is cast to a boolean.            | \["or"\|"\|\|", SOURCE_DESCRIPTION, \| SOURCE_DESCRIPTION...]   |
| equals       | Evaluates to true iff the two args are equal.                                                                                             | \["equals"\|"eq"\|"=", SOURCE_DESCRIPTION, SOURCE_DESCRIPTION]  |
| contains     | True if the evaluated SourceDescription (second arg) contains the given raw string. If the SourceDescription is null, evaluates to false. | \["contains"\|"is_substring", "raw_string", SOURCE_DESCRIPTION] |


### Integer & Float Operators

The following Operators return a JsonPrimitive of type Integer, barring the “addf” Operator which returns JsonPrimitive of type Float.

| **Operator** | **Description**                                                                                                                            | **Syntax**                                                        |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| int          | Evaluates as a static int value. Throws an exception during initialization if RAW_JSON is not an int value.                                | \["int", RAW_JSON]                                                |
| round        | Round the argument to the nearest integer. Strings are attempted to be converted to integers, and null values are treated as zero.         | \["round", SOURCE_DESCRIPTION]                                    |
| add          | Return the sum of the arguments as an integer. Strings are attempted to be converted to integers, and null values are treated as zero.     | \["add"\|"+", SOURCE_DESCRIPTION, \| SOURCE_DESCRIPTION...]       |
| subtract     | Subtracts the second argument from the first one. Strings are attempted to be converted to integers, and null values are treated as zero.  | \["subtract"\|"-", SOURCE_DESCRIPTION, SOURCE_DESCRIPTION]        |
| multiply     | Return the product of the arguments as an integer. Strings are attempted to be converted to integers, and null values are treated as zero. | \["multiply"\|"\*", SOURCE_DESCRIPTION, \| SOURCE_DESCRIPTION...] |
| divide       | Divides the first argument by the second one. Strings are attempted to be converted to integers, and null values are treated as zero.      | \["divide"\|"/", SOURCE_DESCRIPTION, SOURCE_DESCRIPTION]          |


### JSON Operator

| **Operator** | **Description**                                                    | **Syntax**                                                                                                                                                                                    |
| ------------ | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| N/A          | As syntactic sugar, we convert an object to a "dict" LIST_OPERATOR | **Note**: the following two descriptions are equivalent:   {"key1": SOURCE_DESCRIPTION,"key2", SOURCE_DESCRIPTION,…}   \["dict","key1", SOURCE_DESCRIPTION,"key2", SOURCE_DESCRIPTION,...]    |


## Converter configuration examples

See a collection of[example converters on GitHub](https://github.com/Amplitude-Developer-Docs/flexible-ingestion-examples/blob/main/README.md).
