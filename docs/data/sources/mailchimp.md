---
title: Import Mailchimp Data
description: Import Mailchimp subscribe and unsubscribe events. 
---

Mailchimp is an all-in-one Marketing Platform for small business. Mailchimp empowers millions of customers around the world to start and grow their businesses with smart marketing technology, award-winning support, and inspiring content.

Use this integration to import Mailchimp subscribe and unsubscribe events.

!!!note "Other Amplitude + Mailchimp integrations"

    This integration imports Mailchimp events into Amplitude. Amplitude offers other integrations with Mailchimp: 

    - [Send Cohorts to Mailchimp](/data/destinations/mailchimp-cohort)

## Considerations

- This integration is only available for customers who have paid plans with Amplitude.
- Mailchimp events are sent to Amplitude from a specific [Mailchimp audience](https://mailchimp.com/help/getting-started-audience/ "https://mailchimp.com/help/getting-started-audience/"). If you don't have an existing audience, you need to [create one](https://mailchimp.com/help/create-audience/ "https://mailchimp.com/help/create-audience/").
- Events received from Mailchimp all have the `[Mailchimp]` prefix. 
- Only `[Mailchimp] subscribe` and `[Mailchimp] unsubscribe` are supported.

## Setup 

### Mailchimp setup

[Find your Mailchimp audience ID](https://mailchimp.com/help/find-audience-id/) for the audience you would like to use for sending events to Amplitude. If you have multiple audiences, you must set sup this integration for each one.

### Amplitude setup

1. In Amplitude, navigate to **Data Sources**, click **I want to import data into Amplitude,**, and then select **Mailchimp**. This opens the Mailchimp integration modal.
2. Click **Connect to Mailchimp.** This redirects you to a Mailchimp login page.
3. Enter your username and password on the Mailchimp login page. Then click **Log In**.
4. Authorize Amplitude to access to your account. Click **Allow.** You are then automatically redirected back to Amplitude, to the Connect Mailchimp page.
5. Enter your [Mailchimp audience ID](https://mailchimp.com/help/find-audience-id), then click **Next**. This automatically creates a webhook on your Mailchimp audience to send events to Amplitude.

    !!!note
        You are limited to **one** webhook for a specific Mailchimp audience and Amplitude project. If a webhook for this Mailchimp audience and Amplitude project already exists, it;s reset to the default configurations supported by Amplitude. Amplitude supports only Mailchimp `subscribe` and `unsubscribe` events, from Mailchimp user sources only.

After Amplitude starts receiving events from your Mailchimp audience, Mailchimp appears on the Data Sources page, under *Sources,* with a status of *Connected*.