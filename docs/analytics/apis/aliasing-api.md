---
title: User Mapping (Aliasing) API
description: If you have the Portfolio add-on, use the user mapping API to create a global user ID for a user across projects.
---

--8<-- "includes/editions-portfolio-add-on.md"

With Amplitude's [Portfolio add-on](https://help.amplitude.com/hc/en-us/articles/360002750712), you can generate a holistic view of how your users interact with your entire product portfolio. If you've instrumented multiple platforms or product lines, Portfolio can give you unparalleled insight into your users’ complete journey.

It's not uncommon for user IDs for the same user to differ across projects within the same organization. The user mapping (aliasing) API lets you merge users with different user IDs in Amplitude.

In this example, three user records, each with a different user ID, are all merged into the user ID `mike@hooli.com`. This new user ID is that user's "global" user ID in the cross-project view. This way, you can get an accurate count of the number of unique users across your entire product portfolio.

![diagram showing three different user profiles as aliased with a single user ID](/assets/images/analytics-aliasing-api.png)

## Considerations

Keep these considerations in mind when using this API. 

- When you map User 1 to User 2 (the global user ID) the event stream on User 2 contains all the events associated with User 1 *and* User 2. However, User 1 only contains the events associated with User 1. 
- When you map users, user properties **aren't merged**. This means the user properties attached to each event are from the original user who triggered the event. User properties persist only on the original `user_id` and aren't transferred between User 1 and User 2.
- Users are merged in aggregated counts, however when applying a group, the user IDs are listed.
- When you use the User Lookup feature in Amplitude, the UI indicates a mapped user with "Remapped User IDs" or "Remapping Into User ID..."
- Contact Support if you need a list of merged user IDs. 

## Limits

The aliasing API has the following limits:

- Batch limits: 
    - Max of 2000 requests/events in a batch.
    - Max size of 1MB.
    - You can't increase batch limits.
- Rate limits: 
    - By default, Amplitude supports up to 50 events per second over a 30-second window, equalling 1500 alias calls (not batches) total in a 30-second window.
    - If you go over the limit, Amplitude throttles all requests until calls in the 30-second window fall below the limit.
    - If you need this limit increased, contact Amplitude Support.

## Endpoints

| Region | Endpoint |
| --- | --- |
| Standard Server | https://api.amplitude.com/usermap|

## Usage

You can access the aliasing API endpoint by sending a POST or GET request to <https://api.amplitude.com/usermap>, with two query parameters.

--8<-- "includes/postman-interactive.md"

### Query parameters

|<div class="big-column">Name</div>|Description|
|----|-----------|
|`api_key`| Required. String. an API Key for any project in your organization.|
|`mapping`| Required. Either a single JSON mapping object or an array of JSON objects, each of which represents a single mapping.|

### `mapping` format

Notes about the `mapping` parameter's format: 

- A mapping object must have a `user_id` key. 
- If `unmap` is set to `True`, then there can't be a `global_user_id`. Otherwise, there must be a `global_user_id`:

|<div class="big-column">Name</div>|Description|
|----|-----------|
|`user_id`| Required. String. A UUID (unique user ID) specified by you, for the user you want to map. Each JSON mapping object can contain one `user_id` to map.|
|`global_user_id`| Required unless `unmap` is true. String. A UUID (unique user ID) specified by you. The unified identity you want to map the other `user_id` to.|
|`unmap`|Optional. Boolean. When true, the current mapping for `user_id` is removed.|

### User mapping

Map a user ID to a global user ID. Remember that you can map a single user ID per JSON mapping object.

This is a basic request with only the required parameters. See the examples below for more detailed requests.

=== "cURL"

    ```bash
    curl --location -g --request POST 'https://api.amplitude.com/usermap?mapping=[{"user_id":"<USER_ID", "global_user_id": "<GLOBAL_USER_ID"}]&api_key=API_KEY'
    ```
=== "HTTP"

    ```bash
    POST /usermap?mapping=[{"user_id":"<USER_ID", "global_user_id": "<GLOBAL_USER_ID"}]&api_key=API_KEY
    HTTP/1.1
    Host: api.amplitude.com
    ```

???example "Examples (click to expand)"

    ???code-example "Map user ID to a global user ID"

        Maps the user ID "63629@hmail.com" to the global user ID "mike@hooli.com".

        **Request**

        === "cURL"

            ```bash
            curl --location -g --request POST 'https://api.amplitude.com/usermap?mapping=[{"user_id":"63629@hmail.com", "global_user_id": "mike@hooli.com"}]&api_key=123456789'
            ```

        === "HTTP"

            ```bash
            POST /usermap?mapping=[{"user_id":"63629@hmail.com", "global_user_id": "mike@hooli.com"}]]&api_key=123456789 HTTP/1.1
            Host: api.amplitude.com
            ```

        **Result**

        The user "63629@hmail.com" is mapped to "mike@hooli.com".

    ???code-example "Map multiple users in one request"

        Maps the user ID "63629@hmail.com" to the global user ID "mike@hooli.com", and maps the user ID "12345@hmail.com" to the global user ID "mike@hooli.com".

        **Request**

        === "cURL"

            ```bash
            curl --location -g --request POST 'curl --location -g --request POST 'https://api.amplitude.com/usermap?mapping=[{"user_id":"63629@hmail.com", "global_user_id": "mike@hooli.com"}, {"user_id":"12345@hmail.com", "global_user_id": "mike@hooli.com"}]&api_key=123456789'
            ```
        === "HTTP"

            ```bash
            POST /usermap?mapping=[{"user_id":"63629@hmail.com", "global_user_id": "mike@hooli.com"}, {"user_id":"12345@hmail.com", "global_user_id": "mike@hooli.com"}]&api_key=123456789 HTTP/1.1
            Host: api.amplitude.com
            ```

        **Result**

        The users "63629@hmail.com" and "12345@hmail.com" are mapped to "mike@hooli.com".

### User unmapping

This is a basic request with only the required parameters. Remember that you can unmap a single user ID per JSON mapping object. See the examples below for more detailed requests.

=== "cURL"

    ```bash
    curl --location -g --request POST 'https://api.amplitude.com/usermap?mapping=[{"user_id":"<USER_ID", "unmap": true}]&api_key=API_KEY'
    ```
=== "HTTP"

    ```bash
    POST /usermap?mapping=[{"user_id":"<USER_ID>", "unmap": true}]&api_key=API_KEY
    HTTP/1.1
    Host: api.amplitude.com
    ```

???example "Examples (click to expand)"

    ???code-example "Unmap a user ID"

        Unmaps the user ID "63629@hmail.com".

        **Request**

        === "cURL"
            ```bash
            curl --location -g --request POST 'https://api.amplitude.com/usermap?mapping=[{"user_id":"63629@hmail.com", "unmap":true }]&api_key=123456789'
            ```
        === "HTTP"
            ```bash
            POST /usermap?mapping=[{"user_id":"63629@hmail.com", "unmap": true}]&api_key=123456789 HTTP/1.1
            Host: api.amplitude.com
            ```

        **Result**

        The user "63629@hmail.com" is unmapped from the global user ID it's mapped to.

    ???code-example "Unmap multiple users in one request"

        Unmaps the user ID "63629@hmail.com" and user ID "12345@hmail.com".

        **Request**

        === "cURL"

            ```bash
            curl --location -g --request POST 'curl --location -g --request POST 'https://api.amplitude.com/usermap?mapping=[{"user_id":"63629@hmail.com", "unmap":true}, {"user_id":"12345@hmail.com", "unmap":true}]&api_key=123456789'
            ```
        === "HTTP"

            ```bash
            POST /usermap?mapping=[{"user_id":"63629@hmail.com", "unmap":true}, {"user_id":"12345@hmail.com", "unmap":true}]&api_key=123456789 HTTP/1.1
            Host: api.amplitude.com
            ```

        **Result**

        The users "63629@hmail.com" and "12345@hmail.com" are unmapped from any global user IDs they're mapped to. 