---
title: Send Cohorts to Airship
description: Send Amplitude cohorts to Airship to interact with any user segment or cohort via push notifications, in-app messages, and more. 
---
!!!tip

    For any issues with this integration, reach out to [Airship support](https://support.airship.com/hc/en-us). 

This integration combines Amplitude's analytics with Airship's customer engagement tools into one unified system. Use this integration to interact with any user segment or cohort via push notifications, in-app messages, and more to advance your app engagement or conversion goals.

You can also send events from Airship to Amplitude if your Airship plan includes real-time data streaming. For more information, visit the [Airship documentation center](https://docs.airship.com/partners/amplitude/).

## Considerations

- To schedule daily and hourly syncs, you need Amplitude Audiences.

## Setup

### Prerequisites 

If you're using Amplitude's SDKs, you need to integrate both the Airship and [Amplitude SDKs](https://help.amplitude.com/hc/en-us/sections/115000961027-SDK-Installation) in your app. Then follow the instructions in these articles link key identifiers: 

- Amplitude: [SDKs and APIs](https://developers.amplitude.com/docs)
- Airship: [Getting Started Guide](http://docs.urbanairship.com/dev-resources.html#getting-started) 

If you are using Amplitude's HTTP API to send server-side events, you can send these key identifiers as user properties via Identify API.

In the app code, link identifiers between the two services.

!!!tip

    We recommend you store your Airship Channel ID as a custom user property in Amplitude, named `UAChannelID`.

=== "iOS"

    Use this code snippet for iOS:

    `AMPIdentify *identify = [[AMPIdentify identify] set:@"UAChannelID" value:[UAirship push].channelID]; [[Amplitude instance] identify:identify];`

=== "Android"

    Use this code snippet for Android:

    `Identify identify = new Identify().set("UAChannelID", UAirship.shared().getPushManager().getChannelId()); Amplitude.getInstance().identify(identify);`

=== "Identify API"

    Example call for Identify API:

    `curl --data 'api_key=040062a5d38552315b98302ba4f2f' --data 'identification=[{"user_id":"datamonster@gmail.com", "user_properties":{"UAChannelID":"12345-6789-01234"}}]' https://api.amplitude.com/identify`

To confirm you've configured it correctly, [look up your test user or device in Amplitude](https://help.amplitude.com/hc/en-us/articles/229313067-User-Activity). See the `UAChannelID `property stored as a user property at the top of your user profile.

### Amplitude setup 

1. In Amplitude, navigate to **Data Destinations**, then find **Airship - Cohort**.
2. Enter your Airship API keys.
3. Map your Airship ID to an Amplitude ID. Amplitude recommends mapping `UAChannelID` in Amplitude to `Auto Channel ID` in Airship; however, you can map user ID, device ID, or any user property in Amplitude to any Airship ID.
4. Save your work.

!!!note
    Auto Channel maps to the channel ID of the correct platform (Android or iOS) in Airship automatically.

### Airship setup

Create a tag group in Airship called "Amplitude".

1. In Airship, navigate to **Settings -> APIs and Integrations** and click **Tag Groups**. 
2. Fill in the tag name, description, and group key. Be sure to set the group key as "amplitude".

When your app update is deployed, you are ready to sync cohorts.

## Send a cohort

To sync cohorts between Amplitude and Airship, follow these steps:

1. Create a [behavioral cohort](https://help.amplitude.com/hc/en-us/articles/231881448-Behavioral-Cohorts) in Amplitude. Make sure your cohort contains at least one user.
2. In the behavioral cohort, click **Sync** in the menu, and select **Airship**. Your Airship dashboard begins processing this cohort as a new tag under the "Amplitude" tag group.

After the tag finishes processing, compose your message in Airship's Message Composer. The Amplitude-defined tags are in the search bar, under the Amplitude tag group. The tags created in Airship have **[Amplitude]** as a prefix.
