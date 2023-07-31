---
title: Import Bento Events
description: With the Bento ingestion integration, you can send events to Amplitude to understand the impact of engagement with guides on user activation.
status: new
---

[Bento](https://www.trybento.co/) enables product-led customer everboarding through embedded onboarding checklists, contextual guides, and empty states. Our powerful data model allows guides to be customized per customer via attributes or even human tailoring. Customers are able to get set up at their own speed, track progress, and collaborate across their team. 
With the Bento ingestion integration, you can send events to Amplitude to understand the impact of engagement with guides on user activation.

!!!tip "This integration is maintained by Bento"

    Contact the [Bento support team](https://help.trybento.co/en/articles/6978743-send-events-to-amplitude) with any questions about this integration.

## Considerations

- You have to identify users on both platforms in the same way. The Bento Identity ID must be the same as the Amplitude user_id.

## Setup

This guide is complementary to Bento’s instructions. Visit the [Bento documentation](https://help.trybento.co/en/articles/6978743-send-events-to-amplitude) for more.

### Amplitude setup

Copy your project's API key. There are no other setup steps in Amplitude. [Find your project API key](../../analytics/find-api-credentials.md).

### Bento setup

1. Log into your Bento dashboard.
2. Visit the Integrations page and click on Amplitude.
3. Paste your Amplitude API key and click Connect.

## Use case

Receive events on when a user has completed a specific onboarding step and map it to usage of a particular feature to understand direct correlation.
