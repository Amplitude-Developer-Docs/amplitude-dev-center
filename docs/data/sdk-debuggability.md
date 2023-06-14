---
title: SDK Troubleshooting and Debugging 
description: This page is a concise guide that provides solutions for common problems, debugging techniques, best practices, and troubleshooting guides to help developers efficiently resolve the SDKs related issues.
---

Data validation is a critical step in the instrumentation process. To streamline this process and enhance your debugging efforts, Amplitude provides some tools to convenience your debugging process. You can explore these in detail by following this [link](../debugger). These resources will facilitate the smooth implementation and operation of your projects.

The following sections will outline common issues that you may encounter, along with their respective solutions or explanations to aid in resolving these problems. Please go to the individual SDK pages to check the platform specific trouble-shooting and debugging. 

## Event Dropping

If you are not able to ingest any event, there following might be the possible reasons:

- if you are using the right API key. If you have enabled data residency in the EU, you'll need to retrieve your API key from `https://analytics.eu.amplitude.com/`. This is where your specific API details are located due to data locality regulations.

- If you are using the right instance. Ensure that you're using the correct instance. If multiple versions of SDKs exist, they might cause conflict issues. To avoid this, please provide different instance names for each instance. For the latest SDKs, you might need to create separate variables in order to instantiate them differently.

- If you have a project in Data, please ensure that the event hasn't been blocked.

- Please check if your deviceId or userId are valid, the 400 error can be caused by this. [More details](../../analytics/apis/http-v2-api/#device-ids-and-user-ids-minimum-length).

## Privacy 

If you've already disabled IP, it's still possible to see the IP in your user lookup if you're using the [latest SDK](../sdks/sdk-architecture/). We send the data to the HTTP API (HTTP API V1 for maintenance SDK and HTTP API V2 for the latest SDK). If you disabled the IP address midway, it's possible that the user's previous IP address was saved in our backend. Our backend will retrieve the IP from the database, if there's any. If it's a test user, it's probably fine. It won't affect incoming new users after you disable the IP. If this affects all users, you might need to create a new workspace.

## `client_upload_time` shows a future time

Check this section if you're seeing `client_upload_time` appearing as a time in the future. The `client_upload_time` is determined by the customer's device. It's possible that it may show a time in the future if the customer's clock is incorrectly set. You can remove the time in the Event payload via the Enrichment Plugin if you are using latest SDK. This will stop using the customer's device clock and instead rely on server_upload_time. However, be aware that this approach has a downside. If events are not uploaded immediately, the recorded event time can differ significantly from the original time the event was fired.

Check [here](https://help.amplitude.com/hc/en-us/articles/229313067#Raw-Data-Fields) for different timestamps explanations at Amplitude.

## Device family is not appropriate

We are using a [third party libray](https://github.com/faisalman/ua-parser-js) library to parse the info for all Browser SDKs, except for @amplitude/analytics-browser@^2.0. For other SDKs, we rely on server device mapping. We refer to [this resource](http://storage.googleapis.com/play_public/supported_devices.html), [this resource](https://en.wikipedia.org/wiki/List_of_Android_smartphones) for Android, and [this resource](https://en.wikipedia.org/wiki/Comparison_of_tablet_computers) for iOS. If you find an inappropriate device family that doesn't exist in any of these files, please submit a ticket here. Please note that updates to device mapping on our side will only affect incoming events.

## `user_properties` through identify call showing up late

A race condition might occur if there's no deviceId in the request or if it has not been sent through the batch API. We have partition logic in our backend. Not having the same deviceId or not sending through the [batch API](../../analytics/apis/batch-event-upload-api/?h=batch+api) could cause two different calls to fall into separate buckets. The processing time in different buckets within different queues cannot be ensured. Therefore, to maintain the order of `identify` calls and other `track` calls, please make sure the calls have the same deviceId and have been sent to our batch API.