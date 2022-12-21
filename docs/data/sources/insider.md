---
title: Import Insider Events
description: Send Insider event data to Amplitude when a response is received.
status: new
--- 

[Insider](https://useinsider.com/) Growth Management Platform (GMP) helps digital marketers drive growth across the funnel. Use it to deliver personalized journeys across the web, mobile web, mobile apps, messaging, email, and ad channels using unified data.

!!!info "This integration is maintained by Insider"

    Contact the [Insider Support team](mailto:pst@userinsider.com) with any questions about this integration.

With the Insider event ingestion integration, you can send event data to Amplitude to enable data-driven charts and cohorts in Amplitude.

Use this integration to:

- Collect all messaging channel events such as Email Open or SMS Click so that you can perform advanced analytics use cases and analyze your user data better by creating charts.
- Create cohorts on Amplitude by using channel interaction events such as Journey Entered or In-App events.

## Considerations

- You must identify users on both platforms in the same way. Amplitude recommends using `unique_user_id` (UUID), email, or phone number.

## Setup

This guide is complementary to [Insider's documentation](https://academy.useinsider.com/docs/sending-insider-events-to-amplitude).

### Amplitude setup

Copy the Amplitude API key for the project you want to send Insider data to. There are no other setup steps in Amplitude.

### Insider setup

Make sure you have your Amplitude API key, then contact your Insider Customer Success Manager to finish configuring the integration.