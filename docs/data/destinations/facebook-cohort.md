---
title: Send Cohorts to Facebook Ads
description: Send Amplitude cohorts to the Facebook ad network to use them in custom audiences. 
---

This integration enables you to create [custom audiences](https://www.facebook.com/business/help/381385302004628) from your first-party behavioral data to drive new user acquisition and conversions. With this integration, you can upload and sync [behavioral cohorts](https://help.amplitude.com/hc/en-us/articles/231881448) directly to Facebook for campaign targeting throughout the Facebook ad network.  

## Considerations

- If your audience has fewer than 100 users, [Facebook is unlikely to use it](https://www.facebook.com/business/a/custom-to-lookalike-audiences#:~:text=Note%3A%20The%20minimum%20source%20audience,find%20who%20look%20like%20them.). For audiences between 100 and 1000 users, Facebook displays the user count as "<1000 users."
- You must add this integration in each individual project. The person who establishes the integration is also the person who needs to agree with the custom audience Terms of Service.
- Matching for added users from uploaded custom audiences can take up to one hour, and removing users can take up to a day. As a result, there can be a delay before you see the Audience you synced from Amplitude.

## Setup

### Prerequisites

You need a [Facebook Business Manager account](https://business.facebook.com/).

### Amplitude setup

1. In Amplitude, navigate to **Data Destinations**, then find **Facebook - Cohort**.
2. Click **Continue with Facebook** and log in to Facebook to accept the terms and conditions. You **must** accept Facebook's terms to set up the integration.
3. Map your Facebook users to your Amplitude users. You can choose to map a wide range of Facebook keys, such as email or phone number, and the Amplitude Identifier can be a user ID, device ID, or a custom user property. You can use Facebook keys that aren't specific to an individual user, such as "country," but you must send at least one uniquely identifiable key (like email or device ID). The more key mappings you add, the better your match rate is.
4. When finished, save your work. 

## Send a cohort

1. In Amplitude, open the cohort you want to export. Click **Sync**, and choose Facebook.
2. Choose the destination.
3. Select the sync cadence.
4. Save your work.

The exported cohort is now available as a custom audience on the Audience page of Facebook Business Manager.

## Common errors

There are three common errors users can run into while setting up the Facebook integration.

**The Facebook Custom Audience Terms of Service were not accepted**. Amplitude must be authorized by the Facebook ad account to use custom audiences. Authorization is granted by accepting the Terms of Service.

- *Solution*: Accept the terms of service. You need to have Admin/Manager permissions on Amplitude and have the appropriate permissions on Facebook to accept the terms and services in the pop-up module.

**Facebook did not connect to Business Manager.** For security reasons, Facebook requires ad accounts to be associated with Business Manager. This integration doesn't work unless you've enabled Business Manager for your ad account.

- *Solution*: Create a [Business Manager](https://www.facebook.com/business/help/1710077379203657) for your account and associate your ad account with that Business Manager.

**Facebook user lacks audience permissions.** The user who sets up the integration on Amplitude must have the appropriate permissions to access the Facebook APIs. Amplitude sends custom audiences to Facebook on behalf of that user; if they don't have the proper permissions, Amplitude won't either.

- *Solution*: Grant the setup user access to use APIs. If the original setup user lost permissions, disconnect the integration and reconnect it with another user who has permissions.
To disconnect the integration, navigate to *Sources & Destinations* --> *{Project Name}* --> *Destinations* --> *Cohort Destinations* --> *Facebook*.
