---
title: Integrate Iterable with Amplitude
description: Amplitude's integration with Iterable enables you to automatically ingest Iterable's campaign metrics into your Amplitude projects. Use them to better understand how users engage across all channels, and how this engagement affects usage down-funnel in your product. Then identify and sync behavioral cohorts back to Iterable to generate effective personalized messaging.

NOTE: If you are in the European Union, be sure you are working within the eu.amplitude.com domain, as opposed to amplitude.com .

---
# About Iterable
Iterable is the growth marketing platform that enables brands to create, execute and optimize campaigns to power world-class customer engagement across email, push, SMS, in-app and more, with unparalleled data flexibility.

# Setup and Use the Integration

## Send engagement events from Iterable to Amplitude
In this integration, Amplitude’s user_id value will map to Iterable’s userId. If these values don't match, events will not be sent to the correct user profile on Amplitude. Null userId values are also ignored, which means that anonymous user events will not be sent.

To link your Amplitude and Iteratively accounts and begin sending engagement events, follow these steps:

1. Find your Amplitude project's API key by navigating to Settings > Projects > [project name]. 
API_key.png
2. Reach out to your Iterable CSM for your Iterable authentication token. Also ask them to turn on the feature flag that enables user IDs in system webhooks.
3. In your Iterable instance, navigate to Integrations > Webhooks > +CREATE WEBHOOK.
Screen_Shot_2019-06-24_at_3.36.26_PM.png
4. In the +CREATE WEBHOOK modal, enter https://api.amplitude.com/iterable as the endpoint URL, click the Basic radio button under Auth Type, and enter both your Amplitude's project API key and Iterable authentication key in the following format: <amplitude_api_key>:<iterable_authentication_key>.
Screen_Shot_2019-06-24_at_3.56.08_PM.png
5. Within the webhook you just created, scroll all the way to the right and click EDIT.
Screen_Shot_2019-06-24_at_4.08.13_PM.png
6. Check all the engagement events (i.e. "Triggered Send", "Blast Send", etc.) you want Iterable to send to Amplitude automatically. Then check Enabled to begin sending events.
Screen_Shot_2019-06-24_at_4.08.00_PM.png

Once this setup has been completed, your Iterable instance will send new engagement events to your Amplitude project.

## Export and sync behavioral cohorts from Amplitude to Iterable
Amplitude’s user_id value will map to Iterable’s userId. If these values don't match, Iterable will generate a dummy placeholder email address.

To send your behavioral cohorts from Amplitude to Iterable, follow these steps:

1. Find your Iterable API key, under Integrations > API Keys.
Screen_Shot_2019-06-25_at_4.49.33_PM.png
2. In Amplitude, navigate to Sources & Destinations > Destinations > Add Destination and click Iterable to add the Iterable API key.
3. Create and save a behavioral cohort. You can then sync the cohort to Iterable. Any users who do not already exist on Iterable will receive a dummy placeholder email address. user_id is the only value sent to Iterable.

You can now find the synced behavioral cohort under Iterable's user list. The cohort's name will be prefixed with [Amplitude]. 