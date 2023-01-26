---
title: Send Cohorts to Productboard
description: Send Amplitude cohorts to Productboard to filter customer feedback and categorize insights based on cohorts.
---

By integrating Productboard with Amplitude, you can filter customer feedback based on cohorts created within Amplitude, and categorize the insights into themes that can inform the product roadmap. Product managers can then make better decisions about what to build and who might be most affected when you ship new features .

## Considerations

- This integration is available for Growth and Enterprise customers.
- With this integration, you can choose whether to use Amplitude User_ID, Email or both as the user identifier for matching users across Amplitude and Productboard.

## Setup

For more details on using this integration, see [Productboard's documentation](https://support.productboard.com/hc/en-us/articles/4415882801299-Integrate-Productboard-with-Amplitude-to-combine-behavioral-data-with-customer-feedback?utm_medium=referral&utm_source=partner&utm_campaign=pt_aw_all_support_all_product-release_fy22q1&utm_content=product-release-amplitude-helpcenter).

### Productboard setup

1. In Productboard, navigate to **Settings > Integrations** and scroll down to *Public API*.
2. Click **+** to generate a new Productboard access token. Name the token something easy to understand, like "Amplitude Cohort Sync".
3. Save the token.

### Amplitude setup

1. In Amplitude, navigate to **Data Destinations**, then find **Productboard - Cohort**.
2. Enter a name and paste the token you copied from Productboard.
3. Select the Amplitude properties that map onto the Productboard user ID, email and external ID properties.

!!!note

    - user ID: required field. Productboard will attempt to use user ID to uniquelly identify users, thus this ID should be unique and unchangeable. In case 1 user somehow ends up with 2 user IDs, 2 unique users will show up on Productboard side -- in such case refer to **external ID** below on how to merge users on Productboard side.
    - email: optional field. If you select no value, we will not send email to Productboard.
    - external ID: optional field. If this is not set up, we will not send external ID to Productboard. In case 1 user has multiple user IDs, you can configure external ID so the sync will send this field to Productboard. Then Porductboard can merge users with the same external ID.

4. Save when finished.

## Send a cohort

To sync your first cohort, follow these steps:

1. In Amplitude, open the cohort you want to export. Click **Sync**, and choose Productboard.
2. Choose the API target. This is the name you gave the integration in Amplitude.
3. Select the sync cadence. If you're not sure which selection is best, try setting up automated, recurring syncs for any strategically essential cohorts, whereas one-time syncs are more appropriate for project work.
4. Save your work.

You should be able to use the cohort on Productboard within 30 minutes.
