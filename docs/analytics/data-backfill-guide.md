---
title: Data Backfill Guide
description: Understand how backfilling historical data in Amplitude works. 
---

You can import historical data to Amplitude yourself using the [Batch Event Upload API](/analytics/apis/batch-event-upload-api). 

## Considerations

- Consider keeping historical data in a separate Amplitude project without backfilling it into a live production project. 
Keeping historical data separate makes the upload easier, and it keeps your live Amplitude data clean and focused on current and future data. 
Typically you don't need to check historical data often, but still want it to be accessible. Another consideration is that historical user property values overwrite current live values during a backfill.
 Amplitude syncs the out-of-date property values onto new live events coming in. You can skip user property sync by adding the following in your event payload: `"$skip_user_properties_sync": true`.
- If you want to connect historical data with current data, combine the historical data and live data in the same project. To connect users from each dataset,
 the users need to have matching Amplitude user IDs in each set.
- The new user count may change. Amplitude defines a new user based on the *earliest* event timestamp that Amplitude sees for a given user.
 As a result, if a user is recorded as new on June 1 2021 and data is backfilled for the user from February 1 2021, the user is reflected as new on February 1 2021.
- Backfilling can compromise your app data. If there is a mismatch between the current user ID and the backfilled user ID, then Amplitude interprets the two distinct User IDs as two distinct users. 
As a result, users are double counted. Because Amplitude can't delete data after it's recorded, you may have to create a new project to prevent data issues. 
- Amplitude uses the Device ID and User ID fields to compute the Amplitude ID. Learn more in the [Help Center](https://help.amplitude.com/hc/en-us/articles/115003135607).
- Events in the backfill count toward your monthly event volume.
- There is a ingestion daily limit of 500K events per device id (and per user id) for a project, to protect Amplitude from event spam. This limit has a 24 hours rolling window of 1 hour intervals. 
This means that at any given time, a particular user or device can only send 500K events in the last 24 hours. If this limit is hit, you get a exceeded_daily_quota_users / exceeded_daily_quota_devices in the response.

## Backfill best practices

- Review the documentation for the [Batch API](/analytics/apis/batch-event-upload-api.md). If you exported historical data using the Export API and want use the data to backfill, 
note that the fields exported aren't in the same format as the fields needed for import. For example, the Export API uses `$insert_id` while HTTP and Batch APIs use the format `insert_id` without the `$`).
- Understand which fields you want to send and map your historical data to Amplitude fields. We highly recommend that you use the `insert_id` field to deduplicate events.
- Because there is no way to undo an import, create a test project in Amplitude to send sample data from your backfill. Do several tests with a few days worth of data in an Amplitude test project
 before the final upload to the production project.
- Limit your upload to 100 batches per second and 1000 events per second. You can batch events into an upload but we recommend not sending more than 10 events per batch. Your upload is throttled
 if you send more than 10 events per second for a single device ID. See [Batch Event Upload](/docs/analytics/apis/batch-event-upload-api#code-429-explained) for more information about throttling. 

This is Amplitude's recommendation for backfilling large amounts of data:

1. Break up the set of events into mini non-overlapping sets (for example, partition by `device_id`).
2. Have one worker per set of events executing these steps:
    1. Read a large number of events from your system.
    2.  Partition those events into requests based on `device_id` or `user_id`.
    3. Send your requests concurrently/in parallel to Amplitude.

To optimize this process further, add aggressive retry logic with high timeouts. Continue to retry until you receive a 200 response. If you send an `insert_id`, 
then Amplitude deduplicates data that has the same `insert_id` sent within 7 days of each other. 

### Skip user properties sync

When Amplitude captures an event, it includes the current values for each user property, which can change over time. When Amplitude receives an event with user properties, it updates the existing user properties, but also adds any new user properties. You can change this behavior by adding `"$skip_user_properties_sync": true` to the event payload. 

When `"$skip_user_properties_sync": true` is included, Amplitude ignores the user properties table completely. The event has only the user properties sent with the event, does not update the user properties table, and doesn't display any pre-existing user properties.

!!!example

    For example, you send the following event to Amplitue. The user property table already has the user property `"city": "New York"`

    ```json
    {
        "api_key": "API_KEY",
          "events": [
        {
          "user_id": "b4ee5d78-e1b6-11ec-8fea-0242ac120002",
          "insert_id": "97b74bc6-a8c8-48f3-bbc7-de9f95aea636",
          "device_id": "",
          "event_type": "Button Clicked",
          "user_properties":{
              "subscriptionStatus":"active"
          }
        }
      ]
    }
    ```

    The event appears in Amplitude as:

    ```json
          "events": [
        {
          "user_id": "b4ee5d78-e1b6-11ec-8fea-0242ac120002",
          "insert_id": "97b74bc6-a8c8-48f3-bbc7-de9f95aea636",
          "device_id": "",
          "event_type": "Button Clicked",
          "user_properties":{
              "city":"New York"
              "subscriptionStatus":"active"
          }
        }
      ]
    ```

    You include `"$skip_user_properties_sync": true` and send the same event. The event appears in Amplitude like this: 

    ```json
          "events": [
        {
          "user_id": "b4ee5d78-e1b6-11ec-8fea-0242ac120002",
          "insert_id": "97b74bc6-a8c8-48f3-bbc7-de9f95aea636",
          "device_id": "",
          "event_type": "Button Clicked",
          "$skip_user_properties_sync": true,
          "user_properties":{
              "subscriptionStatus":"active"
          }
        }
      ]
    ```
    Notice that it doesn't include the city property.

    Next, you include `"$skip_user_properties_sync": true` and send this event:

    ```json
    {
        "api_key": "API_KEY",
          "events": [
        {
          "user_id": "b4ee5d78-e1b6-11ec-8fea-0242ac120002",
          "insert_id": "97b74bc6-a8c8-48f3-bbc7-de9f95aea636",
          "device_id": "",
          "event_type": "Button Clicked",
          "$skip_user_properties_sync": true,
          "user_properties":{
              "city":"San Francisco"
          }
        }
      ]
    }
    ```

    Amplitude doesn't update the user properties table, and the event appears in Amplitude like this:  

    ```json
          "events": [
        {
          "user_id": "b4ee5d78-e1b6-11ec-8fea-0242ac120002",
          "insert_id": "97b74bc6-a8c8-48f3-bbc7-de9f95aea636",
          "device_id": "",
          "event_type": "Button Clicked",
          "user_properties":{
              "city":"San Francisco"
          }
        }
      ]
    ```
    Any new event still has `"city":"New York"`, but this event displays `"city":"San Francisco"`.


### Timing

If you send data that has a timestamp of 30 days or older, then it can take up to 48 hours to appear in some parts of Amplitude system. Use the [User Activity tab](https://amplitude.zendesk.com/hc/en-us/articles/229313067#real-time-activity)
 to check the events that you are sending as that updates in real-time regardless of the time of the event.

### Resources

- Example scripts for data import: <https://gist.github.com/djih/2a7e7fb2c1d45c8277f7aef64b682ed6>
- Example data: <https://d24n15hnbwhuhn.cloudfront.net/sample_data.zip>[
](https://d24n15hnbwhuhn.cloudfront.net/sample_data.zip)

## Data ingestion system

In Amplitude's ingestion system, each user's current user properties are always tracked and synced to a user's incoming events.

![a diagram that shows that the Identify API and event data are added to the user properties database and then shown in the Amplitude UI](/assets/images/data-user-property-sync-diagram.drawio.svg)

When sending data to Amplitude, you either send event data or send `identify` calls to update a user's user properties. These `identify` calls update a user's current user property values and affect
 the properties that are synced to events received after the `identify` call. 

!!!example

    The Datamonster user currently has one user property, 'color', and it is set to 'red'. Then, Datamonster logs 'View Page A' event and triggers an `identify` that sets 'color' to 'blue'. Afterwards, they log a 'View Page B' event:

    1. `logEvent` -> 'View Page A'
    2. `identify` -> 'color':'blue'
    3. `logEvent` -> 'View Page B'

    If Amplitude receives events from Datamonster in that exact order, then you would expect 'View Page A' to have 'color' = 'red' and 'View Page B' to have 'color' = 'blue'. This is because Amplitude maintains the value of user properties at the time of the event. For this reason, the order in which events are uploaded is very important. If the `identify` was received after 'View Page B', then 'View Page B' would have 'color' = 'red' instead of 'blue'. 

Amplitude guarantees that events are processed in the order in which they're received because all of a user's events are processed using the same ingestion worker. 
In essence, all Datamonster's events queue up in order on a single ingestion worker. If these events were instead processed in parallel across two separate workers, then it's harder to guarantee the order.
 For example, one worker might be faster than another. 

Because each user's events are processed by the same worker, if that user sends an abnormally high number of events in a short amount of time, then they would overload their assigned worker.
 For this reason, the event upload limit is 300 events per second per device ID. It's possible for backfills to exceed 300 events per second if you iterates through historical data
  and send data as fast as possible in parallel. Amplitude keeps track of each device ID's event rate and reject events and returns a 429 throttling HTTP response code
   if a device ID is sending too many events. If you receive a 429 in response to an event upload, the process should sleep for a few seconds and then keep retrying the upload until it succeeds. 
   This ensures that events aren't lost in the backfill process. If you don't retry after a 429 response code, then that batch of events isn't ingested. 

## Backfill preexisting users

If you have preexisting users, then you should backfill them users to accurately mark when they were new users. Amplitude marks users new based on the timestamp of their earliest event.

To backfill your preexisting users, use the [Batch API](https://developers.amplitude.com/docs/batch-event-upload-api) to send a "dummy event" or a signup event where the event timestamp is
 the actual time the user was originally created. For instance, if a user signed up on Aug 1st, 2013, the timestamp of the event you send should be Aug 1st, 2013.
