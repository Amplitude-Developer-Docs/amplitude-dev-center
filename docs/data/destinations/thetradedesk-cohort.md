---
title: Send Cohorts to TheTradeDesk
description: Sync cohorts from Amplitude to TheTradeDesk
---

!!!beta

    This integration is in Closed Beta and is in active development. Contact your Amplitude Client Success Manager for support with this integration. 

[TheTradeDesk](https://www.thetradedesk.com/us) allows advertisers to access a wide range of digital advertising inventory, including display ads, video ads, mobile ads, native ads, and more. Advertisers can use the platform to target specific audiences based on various parameters such as demographics, interests, browsing behavior, and location. The platform also offers real-time bidding capabilities, allowing advertisers to bid on ad placements in real-time auctions.

## Considerations

- This integration is only available for customers who have paid plans with Amplitude.
- You must enable this integration in each Amplitude project you want to use it in.
- You will also need to have a paid The Trade Desk plan to enable this integration.
- This integration with The Trade Desk only allows you to map identifiers to The Trade Desk 36-character GUID, Raw device ID in 36-character GUID or Email (SHA256).

## Setup

### TheTradeDesk setup

1. In The Trade Desk, navigate to Settings > Integrations.
2. Click **Add integration**, then find and add Amplitude.
3. Copy the **Advertiser ID** and **Advertiser Secret Key to your clipboard.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **TheTradeDesk**.
3. Click **Add another destination**.
4. Enter **Name**, **Advertiser ID** and **Advertiser Secret Key**.
5. Choose your Data Center Region.
6. Map the Amplitude User ID field to TheTradeDesk User ID field. You can only map identifiers to The Trade Desk 36-character GUID, Raw device ID in 36-character GUID or Email (SHA256).
7. Save when finished.

## Send a cohort

To sync your first cohort, follow these steps:

1. In Amplitude, open the cohort you want to sync, then click **Sync**.
2. Select **TheTradeDesk**, then click **Next**.
3. Choose the account you want to sync to.
4. Choose the sync cadence.
5. When finished, save your work.

### Use Cases

1. **Improved Audience Targeting:** By sending cohorts or segments of users from Amplitude to The Trade Desk, advertisers can refine their audience targeting. For instance, if Amplitude identifies a group of users who have exhibited certain behaviors or engagement patterns (e.g., frequent app usage, specific in-app actions), this cohort can be sent to The Trade Desk for more precise ad targeting. This approach helps advertisers reach users who are more likely to convert based on their past behavior.
2. **Personalized Ad Creative:** Amplitude's behavioral insights can help inform the creation of personalized ad creatives. When cohorts are sent to The Trade Desk, advertisers can tailor their ad content to match the interests and preferences of specific user groups, increasing the likelihood of capturing their attention and driving conversions.
3. **Campaign Optimization:** The behavioral data collected by Amplitude can be used to optimize ongoing advertising campaigns on The Trade Desk. By understanding how different user cohorts respond to various ad creatives, placements, and messaging, advertisers can adjust their campaigns in real-time to maximize performance and ROI.
4. **Retargeting Strategies:** Amplitude can identify users who have shown interest but haven't completed desired actions, such as making a purchase or signing up. By sending these non-converting cohorts to The Trade Desk, advertisers can design retargeting campaigns that re-engage these users with tailored messaging and incentives.
5. **Lookalike Audience Expansion:** Amplitude's cohorts can serve as the basis for creating lookalike audiences on The Trade Desk. These are audiences that share similar characteristics with existing high-value user groups. By utilizing Amplitude's insights, advertisers can identify valuable traits and behaviors to build larger audiences that are likely to be receptive to their ads.
