---
title: Event Streaming Metrics Summary API
description: Get delivery metrics summary for a configured event stream using the the Event Streaming Metrics API.
---

Use the Event Streaming Metrics API to monitor delivery metrics for your event streams.

--8<-- "includes/auth-basic.md"

## Endpoints

|Region|Endpoint|
|------|-------|
|Standard Server|<https://amplitude.com/api/2/event-streaming/delivery-metrics-summary>|
|EU Server|<https://analytics.eu.amplitude.com/api/2/event-streaming/delivery-metrics-summary>|

## Considerations

- The latest 4 hours of data is accurate to the minute. Beyond that, the data is aggregated internally for every hour. Consider this when requesting metric data older than 4 hours.
- Amplitude retains event streaming metrics for the last 90 days. Sending `start` or `end` time beyond this threshold returns a `500` status. 

## Limits

The API has a limit of 4 concurrent requests per project, and 12 requests per minute per project. Amplitude rejects anything above this threshold with a `429` status code.

## Example request

Send a `GET` request with required and optional parameters to `https://analytics.amplitude.com/api/2/event-streaming/delivery-metrics-summary`. 

Here is a basic request with only the required parameters. 

=== "cURL"

    ```bash
    curl --location --request GET 'https://analytics.amplitude.com/api/2/event-streaming/delivery-metrics-summary?sync_id=SYNC_ID&time_period=TIME_PERIOD' \
    -u '{api_key}:{secret_key}'
    ```

=== "HTTP"

    ```bash
    GET /api/2/event-streaming/delivery-metrics-summary?sync_id=SYNC_ID&time_period=TIME_PERIOD HTTP/1.1
    Host: analytics.amplitude.com
    Authorization: Basic {{api-key}}:{{secret-key}} #credentials must be base64-encoded
    ```

???example "More example requests (click to expand)"

    ???code-example "Get last four hours"

        Gets the last four hours of data for the decoded sync ID `30001625`.

        === "cURL"

            ```bash
            curl --location --request GET 'https://analytics.amplitude.com/api/2/event-streaming/delivery-metrics-summary?sync_id=30001625&time_period=FOUR_HOURS' \
            --header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
            ```

        === "HTTP"

            ```bash
            GET /api/2/event-streaming/delivery-metrics-summary?sync_id=30001625&time_period=FOUR_HOURS HTTP/1.1
            Host: analytics.amplitude.com
            Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
            ```

    ???code-example "Get last hour"

        Gets the last hour of data for the decoded sync ID `30001625`.

        === "cURL"

            ```bash
            curl --location --request GET 'https://analytics.amplitude.com/api/2/event-streaming/delivery-metrics-summary?sync_id=30001625&time_period=ONE_HOUR' \
            --header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
            ```

        === "HTTP"

            ```bash
            GET /api/2/event-streaming/delivery-metrics-summary?sync_id=30001625&time_period=ONE_HOUR HTTP/1.1
            Host: analytics.amplitude.com
            Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
            ```

    ???code-example "Get data for a custom period"

        Gets the data between October 1, 2022 at 7:00 AM UTC +1 and October 31, 2022 at 7:00 AM UTC +1 for the decoded sync ID `30001625`.

        === "cURL"

            ```bash
            curl --location --request GET 'https://analytics.amplitude.com/api/2/event-streaming/delivery-metrics-summary?sync_id=30001625&time_period=CUSTOM&start=2022-10-01T07:00:00+01:00&end=end=2022-10-31T07:00:00+01:00' \
            --header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
            ```

        === "HTTP"

            ```bash
            GET /api/2/event-streaming/delivery-metrics-summary?sync_id=30001625&time_period=CUSTOM&start=2022-10-01T07:00:00+01:00&end=2022-10-31T07:00:00+01:00 HTTP/1.1
            Host: analytics.amplitude.com
            Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA=
            ```

## Query parameters

|<div class ="big-column">Name</div>|Description|
|-----|----------|
|`sync_id`|  <span class="required">Required</span>. The ID for a specific streaming destination. You can find this ID under the title of the sync on the destination's setting page.|
|`time_period`|  <span class="required">Required</span>. Retrieves the data for a specified period. Can be one of the following values:<br>`TEN_MINUTES`<br>`ONE_HOUR`<br> `FOUR_HOURS`<br> `ONE_DAY`<br> `ONE_WEEK`<br> `TWO_WEEKS`<br> `CUSTOM`[^1]|
|`start`| <span class="optional">Optional</span>, but <span class="required">required if `time_period` is `CUSTOM`</span>. The inclusive starting time of the custom interval in the format `YYYY-MM-DDThh:mmTZD` (ISO-8601). For example, `2022-10-01T07:00:00+01:00`|
|`end`|<span class="optional">Optional</span>, <span class="required">required if `time_period` is `CUSTOM`</span>. The exclusive end time of the custom interval in the format `YYYY-MM-DDThh:mmTZD` (ISO-8601). For example, `2022-10-31T07:00:00+01:00`|

[^1]:
    - Use the `CUSTOM` period to retrieve the metrics data for a custom rage.
    - For the `CUSTOM` period, you can use any timezone in the timestamp, but the response from the API is always in UTC.
    -  When using `CUSTOM` period, the minimum granularity for the range supported by the API is 10 minutes.

## Response

The response is a JSON blob with the retrieved delivery metrics for the specific sync.

### Response schema

```json
{
  "timePeriod": string    // The time_period sent in the request
  "eventsDelivered": int    // Total number of events delivered
  "eventsNotDelivered": int     // Total number of events not delivered
  "deliveryRate": double       // The delivery success rate
  "latencyInSeconds": double     // The p95 latency in seconds 
  "timePeriodStart": string     // The UTC (ISO-8601) timestamp for the request start time
  "timePeriodEnd": string     // The UTC (ISO-8601) timestamp for the request end time
  "successOnFirstAttempt": int   // Events delivered successfully in the first attempt
  "successAfterRetry": int     // Events delivered successfully after one or more retries
  "eventsExpired": int       // Events that were not sent after all retry attempts
  "eventsDiscarded": int       // Events that were not sent due to data incomplete/invalid
}
```

### Example response

```json
{
  "timePeriod": "CUSTOM",
  "eventsDelivered": 19,
  "eventsNotDelivered": 0,
  "deliveryRate": 1.0,
  "latencyInSeconds": 5.098051910578275,
  "timePeriodStart": "2022-10-01 06:00:00.000000",
  "timePeriodEnd": "2022-10-31 06:00:00.000000",
  "successOnFirstAttempt": 19,
  "successAfterRetry": 0,
  "eventsExpired": 0,
  "eventsDiscarded": 0
}
```

## Status codes

|Code|Message|
|----|-------|
|200|Success|
|400|Bad request|
|401|Unauthorized|
|403|Forbidden: attempt to access sync outside of organization and app.|
|429|Rate limit exceeded|
|500|Internal server error|