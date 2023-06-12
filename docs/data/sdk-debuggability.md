---
title: SDK Debuggability 
description: The SDK Debuggability document is a concise guide that provides solutions for common problems, debugging techniques, best practices, and troubleshooting guides to help developers efficiently resolve issues during SDK use.
---

Data validation is a critical step in the instrumentation process. To streamline this process and enhance your debugging efforts, Amplitude provides some tool for convience your debug process.  You can explore these in detail by following this [link](../data/debugger). These resources will facilitate the smooth implementation and operation of your projects.

The following sections will outline common issues that you may encounter, along with their respective solutions or explanations to aid in resolving these problems. Please go to each SDK to check the specific debugbility docs. 

## Event Dropping

If you are not able to ingest any event, there following might be the possible reasons:

- if you are using the right API key. If you have enabled data residency in the EU, you'll need to retrieve your API key from `https://analytics.eu.amplitude.com/`. This is where your specific API details are located due to data locality regulations.

- If you use the instance with right instance name. If there are multiple version of SDKs exist, it might have conflict issue. Please give different instance to avoid this issue. Fot the latest SDKs you might need to create different variable in order to create different instance. 

- If you have project in Data, please make sure if that's has been blocked

- Please check if your deviceId or userId are valid. [More details](../apis/http-v2-api/#device-ids-and-user-ids-minimum-length).

## Privacy 

Already disabled ip but there still have ip issue. We are send the data to http v2 for the latest SDK. If you disable the IP address in the middle, it's possible that the previous ip related that user has been saved in our backend. Our backend will pick up the ip from the database if there has any. If it's a test user, that's probabily fine. I won't effect other in comming new users after you disable the IP. If that's effect all users, you might need to create a new workspace. 

## Client upload times in the future

client_upload_times is determined by the customers's device. It might possible to show a time in the future if the customers' clock is 
You can remove the time in Event payload via (Enrichment Plugin]() which would stop using the customers device clock and instead rely on server_upload_time. This approach has the downside that if events are not uploaded immediately the recorded event time can be way off from the original time the event was fired.

## Device family is not inappropriate

We are using a [third party libray](https://github.com/faisalman/ua-parser-js) for parse the info for all Browser SDKs excepet Browser^2.0. For other SDKs we are using the server device mapping. We are using [this](http://storage.googleapis.com/play_public/supported_devices.html), [this](https://en.wikipedia.org/wiki/List_of_Android_smartphones) and [this](https://en.wikipedia.org/wiki/Comparison_of_tablet_computers) file for [Android] and [this](https://www.theiphonewiki.com/wiki/Models) file for iOS as source of truth. If you find there has an inproperate device type and it's not exist in any of those file. Please file a ticket [here](https://help.amplitude.com/hc/en-us/requests/new). Notice that the device mapping update on our side will only effect the in coming events. 

## user properties through identify call showing up late

A race condition might happends if there is no deviceId in the request or not been sent though batch API. We have partition logic in our backend, not having same deviceId or not sent through batch API might lead 2 different calls fall into different bucket. The processing time in different bucket in different queue cannot been ensure. So, to ensure the order of `identify` calls and other `track` calls, please make sure the calls has the same device Id and been sent to our batch API. 