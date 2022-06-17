---
title: Send Amplitude Cohorts to TikTok Ads
description: Use Amplitude's TikTok Ads integration to send audiences to TikTok Ads to create more peronalized campaigns.
---

!!!alpha "This feature is in alpha release"

    This feature is in Alpha and is in active development. Contact <integrations@amplitude.com> if you are interested in using this integration.

[TikTok](https://www.tiktok.com/) is the world's leading destination for short-form mobile videos. Our mission is to capture and present the world's creativity, knowledge, and moments that matter in everyday life.

The TikTok Ads integration allows you to send audiences from Amplitude to TikTok Ads to create more personalized campaigns. 

## Considerations

- The TikTok Ads / Amplitude integration is only available for Scholarship, Growth and Enterprise customers.
- You need a [TikTok for Business account](https://getstarted.tiktok.com/). 
- To use this integration, you must have an Amplitude user property that maps to a TikTok Key. TikTok supports these keys:
    - IDFA - Apple Ads ID
    - GAID - Google Ads ID
    - Email[^1]
    - Phone Number[^1]
- This integration must be enabled on a per-project basis.
- TikTok Ads requires SHA256 encryption. If your amplitude key isn't encrypted, Amplitude applies SHA256 when syncing cohort data. 
- You can't change the Tiktok Key after the integration setup is saved. If you need to use a different key, disconnect the integration in Amplitude and set it up again.

[^1]: Currently in testing. See [TikTok's documentation](https://ads.tiktok.com/marketing_api/docs?id=1701890985340929) for more information.

## Setup

### Amplitude setup

1. In Amplitude, navigate to **Data Destinations**, then find **TikTok Ads - Cohort**.
2. Click **Connect to TikTok Ads**. You are redirected to TikTok Ads to authenticate.
3. In the TikTok modal, grant Amplitude permissions to manage your audience by selecting **Audience Management**.
4. Back in Amplitude, configure the fields necessary for Amplitude to begin syncing to TikTok Ads. There are four possible match types in TikTok Ads, referred to as the TikTok Key:
   - Email: Matches on a users' email address.[^1]
   - Phone Number: Matches on a users' phone number.[^1]
   - IDFA - Apple Ads ID: Matches on a users' IDFA (Apple Ads ID).
   - GAID - Google Ads ID: Matches on a users' GAID (Google Ads ID).

### Sync a cohort

To sync your first cohort, follow these steps:

1. In Amplitude, navigate to **Cohorts**.
2. In the Cohorts panel, click the cohort you wish to export. Then click **View Cohort Details**.
3. From the **Sync To...** drop-down, select **TikTok Ad Account**.
4. In the *Define Destination and Cadence* modal, select the API target from the drop-down. (The appropriate choice has the same name you gave the integration in the previous section.) 
5. Choose the appropriate sync frequency: either a one-time sync, scheduled sync, or real-time sync.[^2]
[^2]: If you're not sure which selection is best, we recommend setting up automated, recurring syncs for any strategically essential cohorts. Use one-time syncs for work on individual projects.

In [TikTok Ads Manager](https://ads.tiktok.com/i18n/dashboard) the cohort appears under **Assets → Audiences**. It can take TikTok Ads up to 12 hours to populate the sync. If the cohort is less than 1000 users, it's marked as *unavailable* on TikTok Ads. In this case, disconnect the TikTok Ads integration in Amplitude, change the mapping and cohort definition to restart the cohort sync.