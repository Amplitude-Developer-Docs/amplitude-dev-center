---
title: Import Segment Data
description: By tracking events and users via Segment's API and libraries, you can send your product's data to all of your analytics and marketing platforms, with minimal instrumentation code.
---

With Segment, you can manage data and integrations with services across your Growth, Product, and Marketing stack. By tracking events and users via Segment's API and libraries, you can send your product's data to all of your analytics and marketing platforms, with minimal instrumentation. They offer support for most platforms, including iOS, Android, JavaScript, Node.js, PHP, and more.

This guide complements [Segment's integration documentation](https://segment.com/docs/integrations/amplitude/). It provides additional details on the different types of Segment integrations you can use, how they affect your data in Amplitude, and instructions for setting up the integrations.

!!!note "Other Amplitude + Segment integrations"

    This integration imports Segment data into Amplitude. Amplitude offers other integrations with Segment: 

    - [Send Cohorts to Segment](/data/destinations/segment-cohort)

## Setup overview

To set up this integration between Segment and Amplitude, follow these steps:

1. In your Segment workspace, create a project for your application and enable Amplitude as one of your integrations.
2. Next, create a project for your data in Amplitude. This generates an API key for you.
3. Enter the Amplitude API key into Segment's Amplitude integration settings panel.
4. Decide how you would like to integrate Amplitude and Segment and install the correct Segment library. See the setup guide at the end of this article for more detailed steps.
5. Start tracking events. Call Segment's `identify` and `track` methods in your application to assign user IDs and track events.
6. Build a chart in Amplitude and start exploring your data.

### Client-side bundled integration

In addition to [Segment's libraries](https://segment.com/docs/sources/), you can install [Amplitude's SDKs](/data/sources/#sdks). If you do, Segment's library delegates the data collection to Amplitude's SDK, which then sends the data to Amplitude's servers. 

There are advantages and disadvantages to taking the client-side bundled approach. One advantage is that adding Amplitude native SDKs adds session tracking capability and automatic user property tracking:

- Events logged during the same user session are grouped together when viewing that user's stream on Amplitude Dashboard. This also allows for [session length calculations](https://help.amplitude.com/hc/en-us/articles/115002323627#how-sessions-are-tracked).
- The SDKs automatically record several user properties such as device type, operating system, and user agent. Here is a list of the [user properties](https://help.amplitude.com/hc/en-us/articles/215562387-Appendix-Amplitude-User-Property-Definitions) tracked automatically by Amplitude's SDKs.
- By enabling Track Session Events, you can ensure the SDKs automatically send `Start Session` and `End Session` events to mark the start and end of a user's mobile session.
- When Amplitude's SDKs are installed, you can directly interact with them. See the docs for [iOS SDK](/../data/sdks/ios) and [Android SDK](/../data/sdks/android-kotlin) to learn more.

On the other hand, adding more SDKs increases the size of your application (each one is <200kb), which you may have to account for if you are already using several libraries in your app. These SDKs are entirely optional, and you can still conduct almost the same analysis in Amplitude by using only Segment's libraries. 

Without session tracking:

- Events have a session ID of -1, so events triggered by a user during the same session aren't grouped together when viewing that [user's timeline](https://help.amplitude.com/hc/en-us/articles/229313067-Amplitude-2-0-User-Activity-Tab#individual-event-streams) in Amplitude. 
- Session length calculations won't be available in Amplitude, so the [User Sessions](https://help.amplitude.com/hc/en-us/articles/231275508-User-Sessions) chart doesn't display any data.
- Amplitude's Pathfinder and [Pathfinder Users](https://help.amplitude.com/hc/en-us/articles/235777567-Pathfinder-Users) charts aren't able to display out-of-session events alongside events within a session. 
- You can't perform [session-based Funnel Analysis](https://help.amplitude.com/hc/en-us/articles/360054203872) effectively.

Without Amplitude's SDKs, you have to map user properties such as device type and operating system manually to track them, as described in [Segment's docs](https://segment.com/docs/integrations/amplitude/#special-properties).

### Set up integrations (sources) in Amplitude

#### JavaScript (client-side)

Follow [Segment's Analytics.js quickstart guide](https://segment.com/docs/sources/website/analytics.js/quickstart/#step-1-copy-the-snippet) and paste the snippet onto your website. Don't forget to put your Segment write key in the snippet.

You are now ready to use `track` and `identify` to track users. Analytics.js also automatically installs Amplitude's JS SDK onto your website, so you can access our JS SDK directly.

!!!tip
    See the [JavaScript SDK documentation](/../data/sdks/javascript) for all capabilities provided directly by the JavaScript SDK.

There are settings for the JavaScript integration you can configure in the Advanced Settings of your Segment Amplitude integration panel, without needing to change your instrumentation:

- **Batch Events** (default false): When true, you can send events in batches of 30, or every 30 seconds. You can adjust these two thresholds by changing the values of *Event Upload Threshold* and *Event Upload Period Millis*.
- **Track All Pages to Amplitude, Track Categorized Pages to Amplitude, and Tracking Named Pages to Amplitude** (default false): When true, then calling `page` will generate `Viewed ___ Page `events. If more than one of these three options are selected at a time, a single `page` call will generate multiple events.
- **Track Referrer to Amplitude** (default false): When true, Amplitude captures the user's referrer, initial referrer, and referring domain as user properties.
- **Track UTM properties** (default false): When true, Amplitude captures UTM properties from URL parameters or the cookie as user properties.

#### iOS (client-side)

!!!note

    If you are sending screen calls to Amplitude, make sure to review these destination settings.

Follow [Segment's iOS quickstart guide.](https://segment.com/docs/sources/mobile/ios/quickstart/#step-1-install-the-sdk) Install the Analytics pod using CocoaPods, import the `SEGAnalytics.h` header file, and initialize Segment's library in your iOS app.

At this point, you can start calling `track` and `identify` to track users in your app, but you also have the option to [install Amplitude's iOS SDK](https://segment.com/docs/sources/mobile/ios/#packaging-destinations-with-device-based-connection-modes) alongside Segment's library to supplement with additional tracking capabilities. The pros and cons of adding Amplitude's SDK are explained [Client-side bundled integration](#client-side-bundled-integration). If you choose to add the Amplitude SDK, follow these steps:

1. Install a second pod 'Segment-Amplitude' in CocoaPods:
    `pod 'Segment-Amplitude'` 
2. If you are using Objective-C, then add this second header in the file where you initialized the Segment SDK:
    `#import <Segment-Amplitude/SEGAmplitudeIntegrationFactory.h>`
3. If you are using Swift and have `use_frameworks!` set, then add this second header in the file where you initialized the Segment SDK:
    `#import <Segment\_Amplitude/SEGAmplitudeIntegrationFactory.h>`
4. Register Amplitude's SDK with Segment's SDK (do this before you initialize Segment's SDK):
  
    ```obj-c
    [configuration use:[SEGAmplitudeIntegrationFactory instance]];
    [SEGAnalytics setupWithConfiguration:configuration];
    ```

For examples of how your code should look, see the [Segment iOS demo code](https://github.com/amplitude/Segment-iOS-Demo/blob/master/m2048/M2AppDelegate.m#L17-L20). 

#### Android (Client-Side)

!!!note
    If you are sending screen calls to Amplitude, make sure to review [these destination settings](https://segment.com/docs/destinations/amplitude/#android).

Follow [Segment's Android quickstart guide.](https://segment.com/docs/sources/mobile/android/quickstart/#step-1-install-the-library) Install Segment's library using Gradle and initialize the Analytics client in your Android app. You may also need to update your app's permissions in the Android manifest file.

At this point, you can start calling `track` and `identify` to track users in your app, but you also have the option to [install Amplitude's Android SDK](https://segment.com/docs/sources/mobile/android/#packaging-device-based-destination-sdks) alongside Segment's library to supplement with additional tracking functionality. The pros and cons of adding Amplitude's SDK are explained [Client-side bundled integration](#client-side-bundled-integration). If you choose to add the Amplitude SDK, follow these steps: 

1. Add the following to your `build.gradle` file:
    `compile 'com.segment.analytics.android.integrations:amplitude:+'`
2. In the file where you initialize the Segment SDK add:
    `import com.segment.analytics.android.integrations.amplitude.AmplitudeIntegration;`
3. Register the Amplitude integration with Segment's SDK. When building the Analytics object, append `.use(AmplitudeIntegration.FACTORY)` before the `.build()`. It would look something like this:
    ```java
    Analytics analytics = new Analytics.Builder(this,"KEY").use
    (AmplitudeIntegration.FACTORY).build();
    Analytics.setSingletonInstance(analytics);
    ```

For examples of how your code should look, see the [Android demo code](https://github.com/amplitude/Segment-Android-Demo/blob/fe33fe91856c6f410d357efaf7ab39342c782ef6/app/src/main/java/com/lecz/android/tiltmazes/TiltMazesActivity.java#L88). 

#### Server-side and other libraries

Follow the appropriate instructions in Segment's [documentation](https://segment.com/docs/sources/).

## Mappings between Segment and Amplitude APIs

Segment and Amplitude use slightly different terms to describe the same concepts. The following table shows the mapping between the two APIs:

| Segment's API | Amplitude's API | Description |
| --- | --- | --- |
| `track` (with properties) | `logEvent` (with properties) | Logs an event with the specified event properties. |
| track with property "revenue" | `logRevenueV2` | Logs a revenue event to record a revenue amount. |
| `identify` with traits | `setUserId`, `setUserProperties` | Assigns a userId and set any traits as user properties. |
| `screen` / page with name | `logEvent "Viewed" + name` | Logs an event "Viewed [page]" where [page] is the name provided. |
| `alias` | `usermap` | UserId aliasing lets you merge two users together that would otherwise have different User IDs tracked in Amplitude. |
| `group` | `setGroup` (with GroupName) | Lets you designate user groups. |

For more information, see the [Segment documentation.](https://segment.com/docs/integrations/amplitude/)

## Export cohorts to Segment

Amplitude Recommend lets you automatically send behavioral audiences to ad networks, marketing automation tools, and personalization engines so you can better tailor campaigns and product experiences.

See [Send Cohorts to Segment](/data/destinations/segment-cohort) for more information.

## More help

Contact Segment support (friends@segment.com) or Amplitude support.
