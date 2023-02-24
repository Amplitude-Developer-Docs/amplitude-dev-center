---
title: Send Cohorts to 1Flow
description: 1Flow and Amplitude work together to enable you to sync cohorts from Amplitude to 1Flow to send targeted user surveys and in-app messaging.
status: new
---

!!!info "This integration is maintained by 1Flow"

    This integration is maintained by 1Flow. Contact the [1Flow support team](https://1flow.app/) with any questions about this integration.

[1Flow](https://1flow.app/) enables product-led customer everboarding through embedded onboarding checklists, contextual guides, and empty states. Our powerful data model allows guides to be customized per customer via attributes or even human tailoring. Customers are able to get set up at their own speed, track progress, and collaborate across their team. 
With the Bento ingestion integration, you can send events to Amplitude to understand the impact of engagement with guides on user activation.

## Considerations

- This integration is only available for customers who have paid plans with both 1Flow and Amplitude.
- You must enable this integration for each Amplitude project you want to use it in.
- To use this integration, you must have an Amplitude User ID that maps to a 1Flow user profile. 1Flow supports the User ID field, and you should make sure to use the same User IDs across 1Flow and Amplitude.

## Setup

This guide is complementary to 1Flow’s instructions. Visit [1Flow's documentation](https://docs.1flow.app/) for more detail.

### 1Flow setup

1. Log into your 1Flow Dashboard.
2. Navigate to the Integrations page and open Amplitude settings.
3. Enable **Sync Amplitude user cohorts to 1Flow** option under Cohort Sync.
4. Copy the API key (and use this to add 1Flow destination in Amplitude).
5. When finished, save your work.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **1Flow**.
3. Enter a name and 1Flow API key. 
4. Map the **Amplitude User ID field** to the **1Flow User ID field**.
5. Save when finished.

## Send a cohort

To sync your first cohort, follow these steps:

1. In Amplitude, open the cohort you want to sync, then click **Sync**.
2. Select **1Flow**, then click **Next**.
3. Choose the account you want to sync to.
4. Set the sync cadence.
5. When finished, save your work.



