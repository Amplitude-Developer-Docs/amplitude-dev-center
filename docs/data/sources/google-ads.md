---
title: Import Google Ads Data (Beta)
description: Amplitude Data's Google Ads integration lets you import your Google Ad spend, click, and impression data in just a few steps.
---

Amplitude Data's Google Ads integration lets you import your Google Ad spend, click, and impression data in just a few steps.

--8<-- "includes/closed-beta.md"

!!!note "Other Amplitude + Google Ads Integrations"

    This integration imports Google Ads data into Amplitude. Amplitude offers other integrations with Google Ads: 

    - [Send Cohorts to Google Ads](/data/destinations/google-ads-cohort)
    - [Event streaming to Google Ads](/data/destinations/event-streaming/google-ads)

## Setup

### Prerequisites

To set up, you need the following: 

- [Google Ads Customer ID](https://support.google.com/google-ads/answer/1704344?hl=en) of the ad account you want to connect to.
- If you don't have direct access to the account, `Google Ads Manager ID` that you authorized access on which can view this ad account.

### Amplitude setup 

In Amplitude, navigate to **Data Sources**, then find **Google Ad** in the **I want to import data into Amplitude** tab.

![Google Add Source](../../assets/images/marketing-analytics/add-sources.png)

!!! note 
    This integration must be enabled on a per-project basis.

1. Log into Google and grant Amplitude permission in the consent form.
![Google Login Image](../../assets/images/marketing-analytics/google-login.png)
2. Enter the Google Ads Customer ID for the ad account you want to import data from.
![Google Enter Account ID](../../assets/images/marketing-analytics/google-enter-info.png)
3. If you don't have direct access to the account, enter the `Manager ID` that you authorized access on which can view this ad account. Otherwise, just leave the field as blank.
4. [Optional] Import past data for a given period.
![Google Historical Backfill](../../assets/images/marketing-analytics/google-past-data.png)

For more information on how you can use the data from this integration in Amplitude, see [this blog post](https://amplitude.com/blog/ad-network-integration).