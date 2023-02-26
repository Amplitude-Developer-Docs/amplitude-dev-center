---
title: Import Intercom Data
description: Sync Intercom event data to Amplitude so that you can better engage your users based on how they've interacted with your product and their lifecycle timing. 
---

Intercom makes it easy for you to communicate with your users through targeted content, behavior-driven email, in-app, and web messages. Learn more [here](https://www.intercom.com/help/en/articles/294-what-is-intercom).

Sync Intercom event data to Amplitude so that you can better engage your users based on how they've interacted with your product and their lifecycle timing. 

!!!note "Other Amplitude + Intercom integrations"

    This integration imports Intercom data into Amplitude. Amplitude offers other integrations with Intercom: 

    - [Send Amplitude Cohorts to Intercom](/data/destinations/intercom-cohort)
    - [Send Amplitude Event Data to Intercom](/data/destinations/intercom)

## Considerations

- You need both an Amplitude and an Intercom account.
- You may select either Intercom users' User ID property or their email property to map to Amplitude users' User ID.
    - If email property is selected but no email can be found from Intercom events, Amplitude uses User ID as the fallback approach to look up the user. 
- Users in Amplitude and Intercom must either have the same user ID or email for this integration to work. You can choose which property to match on. If the property doesn't match for the same user between Amplitude and Intercom, Amplitude interprets the user as new. 
    - If there is no email or user ID for the user at all, Amplitude drops the events. 
- This integration must be enabled on a per-project basis.
- This integration requires OAuth during the setup phase, available on Amplitude paid plans only.

## Setup

To set up the integration to send event data from Intercom to Amplitude, follow these steps:

1. In Amplitude Data, click **Catalog** and select the **Sources** tab.
2. In the Other Sources section, click **Intercom**.
3. In the modal that appears, click **Connect to Intercom**.
4. Log into your Intercom account via OAuth. Select the dedicated workspace and click **Authorize access**.
5. Intercom automatically redirects you back to Amplitude, where you see the *Connect Intercom* page.
6. Select the Intercom user property you would like to map as Amplitude's User ID, and click **Next**.
7. You are now ready to send Intercom events to Amplitude. After Amplitude receives events from Intercom, there is a notification on the *Listen to Event* tab. Click **Finish**. Intercom appears on the Data Sources page, with a status of "Connected."

After you finish setup, events are automatically streamed into Amplitude. Event names have the prefix "[Intercom]".

You can see the user property mapping preference you selected from the data source detail page for Intercom.

Amplitude supports the following Intercom events, also known as **topics**:

- All conversation topics
- Contact topics
- Contact tag topics
- User topics
- User tag topics
- All visitor topics
- Event topics

See a full list of topics in the [Intercom documentation](https://developers.intercom.com/intercom-api-reference/reference/webhook-models-1).

## Disconnect the integration

To disconnect the Intercom integration, navigate to this URL, replacing `**your_Intercom_app_id**` with your Intercom app ID.

`https://app.intercom.com/a/apps/**your_Intercom_app_id**/appstore?app_package_code=amplitude&installed=true`

This is the only way to stop the flow of events from Intercom to Amplitude, and it's controlled from the Intercom side of the integration.
