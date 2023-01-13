---
title: Send Cohorts to Userlist
description: Send Amplitude cohorts to Userlist to send cohort members relevant email campaigns.
---

--8<-- "includes/editions-all-paid-editions.md"

[Userlist](https://userlist.com/) is an email automation platform for SaaS companies. Unlike other email providers, it meets the complexity of your SaaS business. You can track company-level data, and trigger campaigns based on company-level events. It's the best way to onboard, engage, and nurture customers and marketing leads.

This integration lets you sync cohorts from Amplitude to Userlist. Now you can track user behavior in Amplitude, and then send them relevant email campaigns in Userlist.

!!!info

    This integration is maintained by Userlist. Contact the [Userlist support team](https://userlist.com/) for support with this integration.

## Considerations

- You must enable this integration in each Amplitude project you want to use it in.
- You need a paid Userlist plan to enable this integration.

## Setup

For more information on setting up this integration, see [Userlist](https://userlist.com/docs/integrations/amplitude/)'s documentation.

### Userlist setup

1. In Userlist, navigate to **Settings > Integrations**.
2. Click **Add integration**, then find and add **Amplitude**.
3. Copy the **Push (API) key** to your clipboard.

### Amplitude setup

1. In Amplitude, navigate to **Data Destinations**, then find **Userlist - Cohort**.
2. Click **Add another destination**.
3. Enter a name and Userlist API Key.
4. Save the destination.

## Send a cohort

To sync your first cohort, follow these steps:

1. In Amplitude, open the cohort you want to sync, then click **Sync**.
2. Select **Userlist**, then click **Next**.
3. Choose the account you want to sync to.
4. Choose the sync cadence.