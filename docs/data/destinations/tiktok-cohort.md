---
title: Send Amplitude Cohorts to TikTok Ads
description: Use Amplitude's TikTok Ads integration to send audiences to TikTok Ads to create more peronalized campaigns.
---

!!!Beta "This feature is in Beta release"

    This feature is in Closed Beta and is in active development. Contact <integrations@amplitude.com> if you are interested in using this integration.

[TikTok](https://www.tiktok.com/) is the world's leading destination for short-form mobile videos. Their mission is to capture and present the world's creativity, knowledge, and moments that matter in everyday life.

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
- You can't change the TikTok Key after you save the integration. If you need to use a different key, disconnect the integration in Amplitude and set it up again.

[^1]: Currently in testing. See [TikTok's documentation](https://ads.tiktok.com/marketing_api/docs?id=1701890985340929) for more information.

## Setup

### Amplitude setup

1. In Amplitude, navigate to **Data Destinations**, then find **TikTok Ads - Cohort**.
2. Click **Connect to TikTok Ads**. You're redirected to TikTok Ads to authenticate.
3. In the TikTok permissions modal, select **Audience Management**, then click **Confirm**. You're redirected back to Amplitude.
4. Back in Amplitude, map your TikTok and Amplitude users. TikTok Ads supports four keys:
   - Email: Matches on user email address.[^1]
   - Phone Number: Matches on user phone number.[^1]
   - IDFA - Apple Ads ID: Matches on user IDFA (Apple Ads ID).
   - GAID - Google Ads ID: Matches on user GAID (Google Ads ID).
5. When finished, save your work.

## Send a cohort

To sync your first cohort, follow these steps:

1. In Amplitude, open the cohort you want to sync, then click **Sync**.
2. Select **TikTok Ad Account**, then click **Next**.
3. Choose the account you want to sync to.
4. Choose the sync cadence..[^2]
5. When finished, save your work.
[^2]: If you're not sure which selection is best, Amplitude recommends setting up automated recurring syncs for any essential cohorts. Use one-time syncs for work on individual projects.

In [TikTok Ads Manager](https://ads.tiktok.com/i18n/dashboard) the cohort appears under **Assets → Audiences**. It can take TikTok Ads up to 12 hours to populate the sync. If the cohort is less than 1000 users, it's marked as *unavailable* on TikTok Ads. In this case, disconnect the TikTok Ads integration in Amplitude, change the mapping and cohort definition to restart the cohort sync.
