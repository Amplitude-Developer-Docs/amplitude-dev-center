---
title: Google Tag Manager Server Template - Amplitude Analytics
description: Collect data with ease using Amplitude Analytics GTM template - the official server-side Google Tag Manager template for seamless data collection
---

This is the server-side Google Tag Manager Template for Amplitude Analytics. The tag uses the [Amplitude HTTP V2 API](../../analytics/apis/http-v2-api.md) for data collection.

!!!info Resources
    [:simple-googletagmanager: GTM Template Gallery](https://tagmanager.google.com/gallery/#/owners/amplitude/templates/amplitude-server-gtm-template) · [:material-github: GitHub](https://github.com/amplitude/amplitude-server-gtm-template)

!!!note
    Ensure to consistently update your Amplitude GTM template to the latest version for an enhanced feature set, crucial bug fixes, and a significantly improved user experience.

## Workflow

### Container Setup

If you start from zero, you need to setup your conatiner first. This Amplitude Analytics tag template can be found in **Server** target platform which for the uses on desktop and mobile web pages.

![Server Container Setup](../../assets/images/gtm/gtm-server-conatiner-setup.png)

### Add Template

Create a new tag template by searching the gallery. Choose Amplitude Analytics and click `add` button.
![Amplitude Analytics Browser SDK ](../../assets/images/gtm/gtm-amplitude-analytics.png)

### Create Tags

Create tags for your amplitude browser SDK tracking. Click the `New` button to create your new tags.

#### Tag Configuration
 
##### API Key

Copy your amplitude API Key in the API Key field. For EU recidency, please make your API Key is under analytics.eu.amplitude.com.

##### Hide User IP Address

Check this box to make sure that the user's IP address is not forwarded to Amplitude servers.

Check `Hide User IP Address` - We will use the IP collected from the HTTP request header, the IP from server-side.
Uncheck `Hide User IP Address` - We will get the IP address where the request originated, using [getRemoteAddress] (https://developers.google.com/tag-platform/tag-manager/server-side/api#getremoteaddress) 

##### EU Data Residency

For EU data residency, you must set up your project inside Amplitude EU and use the API key from Amplitude EU. You can configure the server zone by and checking the checkbox Use **EU Data Residency** under **Tag Configuration**.

#### Event Configuration

Map keys in the Event Data object to event properties you want to send to Amplitude. If you don't specify an Event Property name, the event data key will be used instead. Only Event Data keys included in this table will be sent with the Amplitude request, otherwise the event is going to be aborted.

##### Map Event Type

In the table below, add rows for each event name you want to map to an Amplitude Event Type. Check `Block events that are not mapped` below only Event Data keys included in this table will be sent with the Amplitude request, otherwise the event is going to be aborted.

| <div class="big-column">Name</div>  | Description |
| --- | --- |
|`Event Name` | Required. `string`.  The event name this tag received. |
| `Send As Event Type` | Required. `string`. The event type you want to map the event name to. This will be the name showed in Amplitude dashboard. |

##### Map Event Properties

Map keys in the Event Data object to event properties you want to send to Amplitude. If you don't specify an Event Property name, the event data key will be used instead.

| <div class="big-column">Name</div>  | Description |
| --- | --- |
|`Event Data Key` | Required. `string`.  They key in the Event Data object you want to map to a event property to send to Amplitude. |
| `Send As Event Property` | Optional. `string`.  This event property name, will be showed in Amplitude dashboard. If it's empty, `Event Data Key` will be used as event type instead. |

##### Add Event Properties

Use this table to add completely new event properties to the hit sent to Amplitude servers. Each property needs a key and a value.

| <div class="big-column">Name</div>  | Description |
| --- | --- |
| `Event Property Key` | Required. `string`.  The event name in the Event Data object. |
| `Event Property Value` | Optional. `string`. The event type you want to map the event name to. This will be the name showed in Amplitude dashboard. If it's empty, `Event Data Key` will be used as event type instead. |

#### User Property Configuration

##### Automatically Track UTM Parameters

We parse the `search_parameter` using [getEventData('page_location')](https://developers.google.com/tag-platform/tag-manager/server-side/api#geteventdata). 

Check this box to collect all UTM parameters, including `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` will be sent with other user properties along with the event tracking.

##### Map User Properties

Map keys in the Event Data object to user properties you want to send to Amplitude. If you don't specify a User Property name, the event data key will be used instead. Only Event Data keys included in this table will be sent with the Amplitude request.

| <div class="big-column">Name</div>  | Description |
| --- | --- |
| `Event Data Key` | Required. `string`. They key in the Event Data object you want to map to a user property to send to Amplitude. |
| `Send As User Property` | Optional. `string`. The user property name you want to. This will be the name showed in Amplitude dashboard. If it's empty, `Event Data Key` will be used as event type instead. |

##### Add User Properties

Use this table to add completely new event properties to the hit sent to Amplitude servers. Each property needs a key and a value.

| <div class="big-column">Name</div>  | Description |
| --- | --- |
| `User Property Key` | Required. `string`. They key in the Event Data object you want to map to a user property to send to Amplitude. |
| `User Property Value` | Required. `string`. The user property name you want to. This will be the name showed in Amplitude dashboard. If it's empty, `Event Data Key` will be used as event type instead. |

#### Additional Properties

Use this feature to add extra event properties; in case of any overlap, the new addition will replace the previous value. Each property needs a key and a value.

| <div class="big-column">Name</div>  | Description |
| --- | --- |
| `Additional Property Key` | Required. `string`. They key of the user property. |
| `Additional Property Value` | Required. `string`. The user property value of the property key. |

### Other info  come along with tracking an event

| <div class="big-column">Name</div>  | Description | Default Value |
| --- | --- | --- |
| `user_id` |  The user Id.  | The value of `user_id` or `x-ga-mp2-user_properties.user_id` from the Event Object or `undefined`. |
| `device_id` | The device Id. | The value of `client_id` from the Event Object. |
| `time` | The a number that represents the current time in milliseconds. | [More details](https://developers.google.com/tag-platform/tag-manager/server-side/api#gettimestampmillis). |
| `session_id` | The session Id. |  The integer value of ga_session_id in Event Object + `000` |
| `insert_id` | The insert Id for deduplication in Amplitude Server. | `device_id` + the eventName in Event Object + `time`. |
| `library` | The library for identifying the source of an event in Amplitude. | `S-GTM` | 

### Define your trigger - Triggering

All tags fire based on events. Anytime Google Tag Manager registers an event, event triggers are evaluated and tags are fired accordingly. The triggers in Server Tag is limited compared with Web container. There are triggers provided by GTM currently. Please check the GTM docs for more updates.
Custom Trigger - When a Server Container Client accepts the incoming request, processes it, and makes its data available in the container for other tags, you can use a Custom trigger to fire a tag. You can choose if you want to fire the tag on all events or on a specific event.
Page View Trigger - The trigger will be activated if the incoming request was processed by a client and generated a page_view event. That event should be visible in the preview mode of server GTM.
Custom Event Trigger - Custom event trigger works in the exact same way as the Page View trigger. The only difference is that you can pick the name of the event on which you want to fire.

## Common Issues

### Why I cannot find Amplitude Analytics in the GTM Gallary

Please make sure you have selected a server container. Server-side tempalte will only exist in server container gallary. 

## Video Tutorial

This video tutorial walks through the implementation basics. 

<script src="https://fast.wistia.com/embed/medias/n337njhoot.jsonp" async></script><script src="https://fast.wistia.com/assets/external/E-v1.js" async></script><div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div class="wistia_embed wistia_async_n337njhoot videoFoam=true" style="height:100%;position:relative;width:100%"><div class="wistia_swatch" style="height:100%;left:0;opacity:0;overflow:hidden;position:absolute;top:0;transition:opacity 200ms;width:100%;"><img src="https://fast.wistia.com/embed/medias/n337njhoot/swatch" style="filter:blur(5px);height:100%;object-fit:contain;width:100%;" alt="" aria-hidden="true" onload="this.parentNode.style.opacity=1;" /></div></div></div></div>

Please check [here](https://developers.google.com/tag-platform/tag-manager/server-side/api) for more details realted with server-gtm API. 