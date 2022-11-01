---
title: Send Cohorts to OneSignal
description: Send Amplitude cohorts to OneSignal to use in segments and send targeted messaging. 
---

OneSignal offers a powerful multi-channel platform that includes mobile and web push notifications, in-app messaging, SMS, and email. When you integrate OneSignal with Amplitude, you can develop sound messaging strategies that drive user engagement and optimize conversions. 

OneSignal and Amplitude work together to enable you to sync cohorts from Amplitude to OneSignal to send targeted messaging.

For more information on how to set up and use this integration, see [OneSignal's documentation.](https://documentation.onesignal.com/docs/amplitude)

!!!note "Other Amplitude + OneSignal integrations"

    This integration sends Amplitude cohorts to OneSignal. Amplitude offers other integrations with OneSignal: 

    - [Import OneSignal Data](/data/sources/onesignal)

## Considerations

- This integration is only available for customers who have paid plans with both OneSignal and Amplitude.
- You must enable this integration for each Amplitude project you want to use it in.
- This integration doesn't support anonymous users. You have to set a user ID for each user to identify them between Amplitude and OneSignal. From OneSignal, you can use the [external id](https://documentation.onesignal.com/docs/external-user-ids) to do this. 
- The Amplitude Integration is available with OneSignal Growth package and higher tiers. Contact <a href="mailto:support@onesignal.com">OneSignal Support</a> with any questions.

## Setup

### OneSignal setup

1. In OneSignal, navigate to **Settings → Keys & IDs**. 
2. Copy the App ID and the API key.

### Amplitude setup

1. In Amplitude, navigate to **Data Destinations**, then find **OneSignal - Cohort**.
2. Enter a name, your OneSignal App ID, and API key.
3. Map an Amplitude user ID to the OneSignal external ID.
4. Save when finished. 

## Send a cohort

1. In Amplitude, open the cohort you want to export. Click **Sync**, and choose OneSignal.
2. Choose the destination.
3. Select the sync cadence.
4. Save your work.

After you export the cohort, you can create a segment in OneSignal that includes the cohort. See the [OneSignal documentation](https://documentation.onesignal.com/docs/amplitude#step-6-how-to-use-an-amplitude-cohort-within-your-segment) for more information.
