---
title: Send Cohorts to Talon.One
description: The Talon.One integration lets you send audiences from Amplitude to Talon.One to create more personalized promotional campaigns.
---
<!-- vale Amplitude.Spacing = NO -->

--8<-- "includes/talonone-cohort.md"

[Talon.One](https://hubs.li/Q01k6xNt0) is a powerful promotion engine that enables you to create targeted and customized marketing promotions built around your customer and session data. Create, manage and track discounts, coupon codes, referral, loyalty and product bundles all in one holistic platform.

The Talon.One integration lets you send audiences from Amplitude to Talon.One to create more personalized promotional campaigns.

!!!info

    This integration is maintained by Talon.One. Contact the [Talon.One support team](https://hubs.ly/Q01kd4tR0) with any questions about this integration.

## Considerations

- User update rate is 1000 users per minute. For example, if cohort size is 100,000 users, it takes 100 minutes to send all the user data to Talon.One.
- To use this integration, you must have an Amplitude User ID that maps to a Talon.One [Customer Profile ID](https://hubs.li/Q01kd4vg0). Talon.One supports any Customer Profile ID, for example:
    - Email
    - Phone Number
    - IDFA - Apple Ads ID
    - GAID - Google Ads ID

## Setup

For more information on setting up this integration, see the [Talon.One](https://docs.talon.one/docs/dev/technology-partners/amplitude/amplitude-cohort-sync-tutorial#prerequisites) documentation.

### Talon.One setup

1. Open your Talon.One Application in the Campaign Manager and click **Settings > Developer settings**.
2. Click [Create API Key](https://hubs.li/Q01kd4vw0).
3. For *Do you want to use this API Key with a 3rd party service?*, select **Yes**. 
4. From the dropdown, select **Customer Data Platform**.
5. Enter an expiry date and click **Create API Key**. 
6. Copy the API Key to paste it later in Amplitude.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Talon.One**.
3. Click **Add another destination**.
4. Enter a name and Talon.One API key.
5. Map an Amplitude field to the Talon.One User ID field.
6. When finished, save your work.

## Send a cohort

To sync your first cohort, follow these steps:

1. In Amplitude, open the cohort you want to sync, then click **Sync**.
2. Select **Talon.One**, then click **Next**.
3. Choose the account you want to sync to.
4. Choose the sync cadence.
5. When finished, save your work.