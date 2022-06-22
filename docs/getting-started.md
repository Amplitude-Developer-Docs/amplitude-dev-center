---
title: Getting Started with Amplitude
description: Read this guide to understand the basics of getting started with Amplitude instrumentation.
---

This article is meant for developers, and complements the [Amplitude Quick Start Guide](https://help.amplitude.com/hc/en-us/sections/201146908-Amplitude-Quick-Start-Guide), which walks through the Amplitude data structure and explains which data you should send to Amplitude.

In this article, you'll find technical best practices for getting up and running with Amplitude.

## Instrumentation best practices

Before getting into the details, let's go over some recommended best practices for instrumenting Amplitude:

- **Always test your instrumentation:** We highly recommend having a testing project for every production project in your organization. This gives you a reliable way to test your instrumentation before sending production data to Amplitude
- **Amplitude can't retroactively modify historical data**, so if your instrumentation is wrong, the data you collect can't be cleaned up later on. See [this video](https://help.amplitude.com/hc/en-us/articles/115001574688-How-to-Validate-Your-Event-Data-in-Amplitude) on QA-ing your event data in Amplitude to learn more. 
- **Set up at least two Amplitude projects:** One for your development or staging environment, one for your production environment. This keeps testing data separate from production data. 
- **Send the right keys:** If you are sending data server-side via the HTTP API, be sure to send a `session_id `and `insert_id `with each event. See [this article on ingesting data](https://help.amplitude.com/hc/en-us/articles/204771828#optional-keys) for more information on these important keys.

## How Amplitude receives data

Data can be sent to Amplitude client-side, server-side, or through a third party:

- Amplitude has native **client-side** SDKs for [JavaScript](https://help.amplitude.com/hc/en-us/articles/115001361248), [Android](https://help.amplitude.com/hc/en-us/articles/115002935588-Android-SDK-Installation), and [iOS](https://help.amplitude.com/hc/en-us/articles/115002278527-iOS-SDK-Installation). These native SDKs track the user properties listed [here](https://help.amplitude.com/hc/en-us/articles/215562387-Appendix-Amplitude-User-Property-Definitions) and the [session ID](https://help.amplitude.com/hc/en-us/articles/115002323627#session-id) for each event for you automatically. The SDKs are open source and can be found in Amplitude's [GitHub repository](https://github.com/amplitude).
    There is also a [Unity](https://help.amplitude.com/hc/en-us/articles/115002991968-Unity-Plugin-Installation) plugin, for use with Unity apps.
- If you'd rather go **server-side**, the [HTTP API](../analytics/apis/http-v2-api) enables you to send data directly from your server to the Amplitude endpoint.
- You can also choose to send data via a **third party** like [Segment](https://segment.com/), [mParticle](https://www.mparticle.com/), or [Tealium](https://tealium.com/). 

## Amplitude APIs

Amplitude has many APIs you can use in conjunction with the platform:

- [HTTP API](../analytics/apis/http-v2-api): Send event data to Amplitude
- [Identify API](../analytics/apis/identify-api): Update user properties without having to send an event
- [Dashboard REST API](../analytics/apis/dashboard-rest-api): Export the data used in Amplitude charts
- [Export API](../analytics/apis/export-api): Export all raw event data
- [Behavioral Cohorts API](../analytics/apis/behavioral-cohorts-api): Export [behavioral cohorts](https://help.amplitude.com/hc/en-us/articles/231881448-Amplitude-2-0-Behavioral-Cohorts). 

See all of the [API references](../analytics/#api-references). 

## Amplitude schema

Amplitude's data structure includes [events, event properties, user properties](https://help.amplitude.com/hc/en-us/articles/360047138392), and group types. 

!!!tip "Data Taxonomy Playbook"

    Our [Data Taxonomy Playbook](https://help.amplitude.com/hc/en-us/articles/115000465251-Data-Taxonomy-Playbook) can help you understand more about the Amplitude schema, and we recommend reading it before continuing. 

### Naming conventions for events

After you instrument an event, the name of that event type can never be changed in the raw data. For example, in v1.0 of your app, a developer instruments the following event type:

`Amplitude.getInstance().logEvent('Play song');`

Later on, in v2.0 of your app, a developer instruments this event type:

`Amplitude.getInstance().logEvent('play song');`

Strings passed to Amplitude are case-sensitive, and so Amplitude interprets these two event types as completely separate events. **Make sure** your event names follow a consistent syntax during instrumentation. For more information, see this [section](https://help.amplitude.com/hc/en-us/articles/115000465251#how-should-i-name-my-events) in the Data Taxonomy Playbook.

This also applies to [event properties](https://help.amplitude.com/hc/en-us/articles/115000465251#event-properties).

### Instrumenting user properties

[User properties](https://help.amplitude.com/hc/en-us/articles/115002380567) are attributes specific to individual users. Examples of user properties include location, language, account type, money spent, or player type.

!!!tip "Data Taxonomy Playbook"

    For recommendations around which user properties to track, see [the Amplitude Data Taxonomy Playbook](https://help.amplitude.com/hc/en-us/articles/115000465251#user-properties). 

Amplitude SDKs include several user property operations you can use to update user property values:

- **`set`:** Set or overwrite the property value
- **`setOnce`:** Set the value only if the value hasn't already been set
- **`unset`:** Unset the value to `null`
- **`add`:** Increment the numerical value by a specified number
- **`append`:** Append the value to the property array
- **`prepend`:** Prepend the value to the property array

You can also use the [Identify API](../analytics/apis/identify-api) to update the values of a user's user properties without having to send another event. The new values are applied to the next event sent organically by that user. 

### Instrumenting group types

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

To use Amplitude's [account-level reporting](https://help.amplitude.com/hc/en-us/articles/115001765532#account-level-reporting) feature, you have to instrument group types. Account-level reporting lets you count by a distinct user property group, which in turn enables you to process data at the groups level, instead of the individual users level. Amplitude allows a maximum of five group types. If you're using a third party tool to instrument Amplitude (mParticle, Segment, Tealium), this maximum threshold may be lower based on the partner's limitations. 

## How Amplitude tracks unique users and sessions

Amplitude tracks unique users through a system of user IDs, device IDs, and Amplitude IDs. To learn more, check out this article on [tracking unique users](https://help.amplitude.com/hc/en-us/articles/115003135607-Tracking-Unique-Users).

In Amplitude, a session is a single continuous period of time a user is active within your product. Session IDs are sent with every event, enabling Amplitude to track them. To find out more about how this works, see our Help Center article on [tracking sessions in Amplitude](https://help.amplitude.com/hc/en-us/articles/115002323627-Tracking-Sessions).

## Popular SDK configuration options

This section details some Amplitude SDK configuration options that are popularly modified.

- **`minTimeBetweenSessions` (iOS/Android):** The minimum time your app must be backgrounded before a new session begins.
- **`sessionTimeout` (Web):** The minimum time between events that must elapse before a new session begins.
- **`batchEvents`:** This is enabled by default for our mobile SDKs and is optional for Web.
- **`eventUploadPeriodMillis`:** If batchEvents is enabled, this denotes the time between event batch uploads.
- **`eventUploadThreshold`:** If batchEvents is enabled, this sets the minimum number of events per batch.
- **`optOut`:** When enabled, opts the current user out of tracking.
- **`offline`:** Prevents the sending of events.
- **`saveEvents`:** This is enabled by default for all the SDKs, and allows the SDK to save unsent events onto the device.
- **`savedMaxCount`:** The maximum number of unsent events to be saved on a device. The default is 1000. 

## Backfilling data

You may want to consider backfilling data if:

1. **You wish to analyze historic data in Amplitude.** See the [Data Backfill Guide](../analytics/data-backfill-guide) for detailed instructions on backfilling your data into Amplitude.
2. **Your product already has existing users**. You want to accurately reflect when these [users were new](https://help.amplitude.com/hc/en-us/articles/360052734691#h_01EQFSJ5YFEGM5TKTY4XS5J2DY) in Amplitude.

## Resources

Here are resources you might find helpful during your instrumentation:

- [Amplitude Quick Start Guide](https://help.amplitude.com/hc/en-us/sections/201146908-Amplitude-Quick-Start-Guide): This walks through the setup process to get your first project up and running. It also provides helpful tips to get started on building an event taxonomy.
- [Data Taxonomy Playbook](https://help.amplitude.com/hc/en-us/articles/115000465251-Data-Taxonomy-Playbook): This provides best practices on creating a good event taxonomy for your product. 
- [Data Backfill Guide](../analytics/data-backfill-guide): See this guide for detailed instructions on how to backfill historical data into Amplitude.
- [Validating Event Data](../data/debugger): This article walks through best practices on validating your instrumentation in Amplitude.
- [HTTP API](../analytics/apis/http-v2-api): Use Amplitude's HTTP API to send data server-side. 
- [SDKs](../data/sources/#sdks): Use Amplitude's native SDKs to send data client-side.
- [Integrations](https://help.amplitude.com/hc/en-us/sections/201147128-Integrations): Find documentation around Amplitude's integrations. See all Amplitdue's [official integrations](https://amplitude.com/integrations). 

## Instrumentation seminar video

This video is an instrumentation seminar aimed at developers. 

<script src="https://fast.wistia.com/embed/medias/2gktk4s3o8.jsonp" async=""></script>
<script src="https://fast.wistia.com/assets/external/E-v1.js" async=""></script>
</p>
<div class="wistia_responsive_padding" style="padding: 56.25% 0 0 0; position: relative;">
<div class="wistia_responsive_wrapper" style="height: 100%; left: 0; position: absolute; top: 0; width: 100%;">
<div class="wistia_embed wistia_async_2gktk4s3o8 videoFoam=true wysiwyg-text-align-left" style="height: 100%; width: 100%;">&nbsp;</div>
</div>
</div>
