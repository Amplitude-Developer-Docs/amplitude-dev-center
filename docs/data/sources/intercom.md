---
title: Import Intercom Data
description: Sync Intercom event data to Amplitude so that you can better engage your users based on how they've interacted with your product and their lifecycle timing. 
---

Intercom makes it easy for you to communicate with your users through targeted content, behavior-driven email, in-app, and web messages. Learn more [here](https://www.intercom.com/help/en/articles/294-what-is-intercom).

Sync Intercom event data to Amplitude so that you can better engage your users based on how they've interacted with your product and their lifecycle timing. 

!!!note "Send Amplitude cohorts to Intercom"

    See [Send Cohorts to Intercom](/../data/destinations/intercom-cohort) for information on how to send cohorts from Amplitude to Intercom.

## Considerations

- You need both an Amplitude and an Intercom account.
- The user IDs in Intercom and Amplitude must be the same for each user in order for this integration to work. If the Intercom user ID doesn't match Amplitude's user ID for the same user, Amplitude interprets the user as new. If there is no Intercom user ID at all, the events are dropped.
- This integration must be enabled on a per-project basis.

## Setup

To set up the integration to send event data from Intercom to Amplitude, follow these steps:

1. In Amplitude, navigate to **Data Sources.**
2. Click **I want to import data into Amplitude.** and find Intercom.
3. In the modal that appears, click **Connect to Intercom**.
4. Log into your Intercom account via OAuth. Select the dedicated workspace and click **Authorize access**.
5. Intercom automatically redirects you back to Amplitude, where you see the *Connect Intercom* page.
6. You are now ready to send Intercom events to Amplitude. After Amplitude receives events from Intercom, there is a notification on the *Listen to Event* tab. Click **Finish**. Intercom appears on the Data Sources page, with a status of "Connected."

After you finish setup, events are automatically streamed into Amplitude. Event names are prefixed with "[Intercom]."

Amplitude supports the following Intercom events, also known as **topics**:

- All conversation topics
- Contact topics
- Contact tag topics
- User topics
- User tag topics
- All visitor topics
- Event topics

## Disconnect the integration

To disconnect the Intercom integration, navigate to this URL, replacing `**your_Intercom_app_id**` with your Intercom app ID.

`https://app.intercom.com/a/apps/**your_Intercom_app_id**/appstore?app_package_code=amplitude&installed=true`

This is the only way to stop the flow of events from Intercom to Amplitude, and it's controlled from the Intercom side of the integration.
