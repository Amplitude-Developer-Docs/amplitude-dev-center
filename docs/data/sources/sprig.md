---
title: Import Sprig Events
description: Words
status: new
---

[Sprig](https://sprig.com/) is the product development lifecycle research platform and is on a mission to make experiences that matter. Companies use Sprig's Concept and Usability Testing and In-Product Surveys to get research insights from users about new ideas, designs and prototypes, as well as currently available product experiences.

With the Sprig ingestion integration, you can send survey data to Amplitude when a response is received, and use these responses when creating charts and cohorts in Amplitude.

!!!tip "This integration is maintained by Sprig"

    Contact the [Sprig support team](https://sprig.com/company) with any questions about this integration.

## Considerations

- You have to identify users on both platforms in the same way. The Sprig Identity ID must be the same as the Amplitude user_id.

## Setup

This guide is complementary to Sprig's instructions, which can be found [here](https://docs.sprig.com/docs/amplitude).

### Amplitude setup

- Copy the Amplitude API key for your project. There are no other setup steps in Amplitude. [Find your project API key](../analytics/find-api-credentials).

### Sprig setup

1. Log into your Sprig dashboard.
2. Visit the Integrations page and click on Amplitude.
3. Paste your Amplitude API key and click Save.

## Use case

When a user submits a response to a Sprig survey, their response data can contain important information that can be used in conjunction with product analytics to produce insights. For example, if you run a CSAT or NPS survey via Sprig, customer satisfaction data can be pushed to Amplitude, allowing you to use Amplitude's tools to better understand correlations between satisfaction and user behavior and product usage.