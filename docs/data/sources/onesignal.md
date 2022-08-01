---
title: Import OneSignal Engagement Events
description: Import OneSignal engagement events into Amplitude, initiating a cohesive data loop from one platform to the other. 
---

OneSignal can send events to Amplitude for mobile push, web push, email, SMS, and in-app message channels. Event options include:

- Sent: The message has been sent to the provider.
- Clicked: The user has clicked and interacted with the message.
- Viewed: The user has viewed the message.
- Confirmed Delivery: The message has been delivered by the provider to the user.

!!!note "Send Amplitude cohorts to OneSignal"

    See [Send Cohorts to OneSignal](/../data/destinations/onesignal-cohort) for information.

## Setup

For more information on how to set up and use this integration, see [OneSignal's documentation.](https://documentation.onesignal.com/docs/amplitude)

!!!note "Event volume limits"

    Any events you send from OneSignal to Amplitude count towards your Amplitude event volume quota.