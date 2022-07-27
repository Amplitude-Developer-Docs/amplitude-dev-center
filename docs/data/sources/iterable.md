---
title: Import Iterable Data
description: Import Iterable campaign metrics to better understand how your users engage across all your channels. 
---

Iterable is the growth marketing platform that enables brands to create, execute and optimize campaigns to power world-class customer engagement across email, push, SMS, in-app and more, with unparalleled data flexibility.

Amplitude's integration with Iterable enables you to automatically ingest Iterable's campaign metrics into your Amplitude projects. Use them to better understand how users engage across all channels, and how this engagement affects usage down-funnel in your product. 


## Considerations

- If you are in the European Union, be sure you are working within the eu.amplitude.com domain, instead of amplitude.com.
- In this integration, Amplitude's `user_id` value maps to Iterable's `userId`. If these values don't match, events aren't be sent to the correct user profile on Amplitude. Null `userId` values are also ignored, which means that anonymous user events aren't sent.

## Setup

This guide is complementary to Iterable's instructions, which can be found [here](https://support.iterable.com/hc/en-us/articles/360018679032-Integrating-Amplitude-with-Iterable).

### Amplitude setup

Find and copy your Amplitude project's API key by navigating to **Settings > Projects > [project name]**.

### Iterable setup

1. Reach out to your Iterable CSM for your Iterable authentication token. Also ask them to turn on the feature flag that enables user IDs in system webhooks.
2. In your Iterable instance, navigate to **Integrations > Webhooks > +CREATE WEBHOOK**.
3. In the +CREATE WEBHOOK modal, enter `https://api.amplitude.com/iterable` as the endpoint URL, select **Basic** for Auth Type, and enter both your Amplitude's project API key and Iterable authentication key in the following format: `<amplitude_api_key>:<iterable_authentication_key>`.
4. Within the webhook you just created, scroll all the way to the right and click **EDIT**.
5. Check all the engagement events that you want Iterable to send to Amplitude automatically. Then check **Enabled** to begin sending events.

After this setup has been completed, your Iterable instance sends new engagement events to your Amplitude project.
