---
title: Import Adapty Events
description: With the Adapty ingestion integration, you can send events to Amplitude to understand user behavior.
status: new
---

[Adapty](https://adapty.io/)is an all-in-one for launching subscription monetization and optimizing the mobile app economy.

!!!tip "This integration is maintained by Adapty"

    Contact the [Adapty support team](https://adapty.io/integrations/amplitude/) with any questions about this integration.

## Considerations

- You must enable this integration in each Amplitude project you want to use it in.

## Setup

This guide is complementary to Adapty’s instructions. Visit the [Adapty documentation](https://docs.adapty.io/docs/amplitude) for more.

### Amplitude setup

Copy your project's API key. There are no other setup steps in Amplitude. [Find your project API key](../../analytics/find-api-credentials.md).

### Adapty setup

1. Log into your Adapty dashboard.
2. Navigate to Integrations then click on Amplitude and set the API credentials copied over from Amplitude.
3. SDK configuration - Use Adapty.updateProfile() method to set amplitudeDeviceId or amplitudeUserId. If not set, Adapty uses your user ID (customerUserId) or if it's null Adapty ID. Make sure that the user id you use to send data to Amplitude from your app is the same you send to Adapty.

## Use case

Adapty is a mobile app analytics and marketing automation platform, while Amplitude is a product analytics platform. Sending events from Adapty into Amplitude can provide several use cases, such as:

- **User behavior analysis:** With Adapty, you can track user behavior within your mobile app, such as their actions, preferences, and engagement levels. By sending these events into Amplitude, you can perform advanced analysis on this data to gain insights into user behavior, identify trends, and optimize your app for better engagement and retention.
- **Personalization and targeting:** Adapty allows you to create targeted marketing campaigns based on user behavior and preferences. By sending these events into Amplitude, you can further refine your targeting by combining Adapty data with other data sources, such as demographic data or user feedback, to create more personalized and effective campaigns.
- **Product development:** By sending Adapty events into Amplitude, you can gain insights into how users are interacting with your app and identify areas for improvement. This data can help inform your product development roadmap, allowing you to prioritize features and updates based on user needs and behaviors.
Overall, sending events from Adapty into Amplitude can provide a more comprehensive view of user behavior and app performance, allowing you to make data-driven decisions to improve engagement, retention, and overall user experience.

Overall, sending events from Adapty into Amplitude can provide a more comprehensive view of user behavior and app performance, allowing you to make data-driven decisions to improve engagement, retention, and overall user experience.

