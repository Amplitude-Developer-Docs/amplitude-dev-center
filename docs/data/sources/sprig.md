---
title: Import Sprig Events
description: Words
status: Use the Sprig integration to send survey data to Amplitude when a response is received, and use these responses when creating charts and cohorts in Amplitude.
---

[Sprig](https://sprig.com/) is the product development lifecycle research platform and is on a mission to make experiences that matter. Companies use Sprig's Concept and Usability Testing and In-Product Surveys to get research insights from users about new ideas, designs, and current product experiences.

With the Sprig ingestion integration, you can automatically send survey data to Amplitude when you get a response, and use these responses when creating charts and cohorts in Amplitude.

!!!tip "This integration is maintained by Sprig"

    Contact the [Sprig support team](https://sprig.com/company) with any questions about this integration.

## Considerations

- You must identify users the same way on both platforms. The Sprig Identity ID must have the same value as the Amplitude `user_id`.

## Setup

This guide is complementary to Sprig's instructions. Visit the [Sprig documentation](https://docs.sprig.com/docs/amplitude) for more.

### Amplitude setup

Copy your project's API key. There are no other setup steps in Amplitude. [Find your project API key](../analytics/find-api-credentials).

### Sprig setup

1. From your Sprig dashboard, visit the **Integrations** page and click **Amplitude**.
2. Paste your Amplitude API key and save.

## Use case

When a user submits a response to a Sprig survey, their response data can contain important information that can be used in conjunction with product analytics to produce insights. For example, if you run a CSAT or NPS survey via Sprig, you can push that data to Amplitude. You can then use Amplitude's tools to better understand correlations between satisfaction and user behavior and product usage.