---
title: Send Cohorts to Snapchat Ads
description: Use the Snapchat Ads Amplitude integration to send audiences to Snapchat Ads to create personalized campaigns.
status: new
---

!!! beta

    This integration is currently in closed beta and is in active development. If you have any feedback, contact integrations@amplitude.com. 

--8<-- "includes/editions-scholarship-growth-enterprise.md"

[Snapchat](https://www.snapchat.com/) is a social media platform for sending multimedia and text messages. You can create Snap Ads or campaigns and measure results. Users can set audiences and reach for campaigns based on various demographics or data.

The Snapchat Ads integration lets you send audiences from Amplitude to Snapchat Ads to create more personalized campaigns. 

## Considerations

- You need a [Snapchat Ads Manager account](https://ads.snapchat.com/) with permission to create audiences.
- A Snapchat Ads Account has limit of 1000 Customer List segments (unique cohorts).
- To use this integration, you must have an Amplitude user property that maps to a Snapchat Ads Key. Snapchat Ads supports these keys:
    - Email
    - Phone Number
    - Mobile Ad ID
- This integration must be enabled on a per-project basis within Amplitude.
- Snapchat Ads requires SHA256 encryption. If your Amplitude key isn't encrypted, Amplitude applies SHA256 when syncing cohort data. 
- Snapchat Ads requires the users to have the associated keys (Email, Phone Number or Mobile Ad ID) beforehand. In cases where users don't have the associated keys, they aren't synced to Snapchat Ads. This can cause a discrepancy between the number of users in Snapchat Ads and Amplitude.
- After you have chosen a target key to sync to Snapchat Ads, there is no way to change it unless you disconnect and reconnect to Snapchat Ads. This is because Snapchat Ads uses OAuth and can't support updating a cohort (audience) with two different keys.

## Setup 

### Amplitude setup

1. In Amplitude, navigate to **Data Destinations**, then find **Snapchat Ads - Cohort**.
2. Click **Connect to Snapchat Ads**. You are redirected to Snapchat Ads to authenticate.
3. Log in, and click **Confirm** to grant Amplitude access to the following information: UserID, Name on Ads Manager, and Email Address on Ads Manager. After, you are redirected back to Amplitude. 
4. Back in Amplitude, specify the properties you want to pass to Snapchat Ads to match users between Snapchat Ads and Amplitude. Snapchat Ads supports three keys:
      1. Email: Matches on user email address
      2. Phone Number: Matches on user phone number
      3. Mobile Ad ID: Matches on user Mobile Ad ID
5. When finished, save your work.

!!!tip
    
    Please note that once you have chosen a target key to sync to Snapchat Ads, there is no way to change it unless you disconnect and reconnect to Snapchat Ads.This is because Snapchat Ads cannot support updating a cohort (audience) with two different keys.

### Snapchat setup

There are no other setup steps in Snapchat. 

## Send a cohort

To sync your first cohort, follow these steps:

1. In Amplitude, open the cohort you want to sync.
2. Click Sync and choose Snapchat Ads.
3. Choose the account you want to sync to.
4. If you have added a new Snapchat Ads accounts after connecting Amplitude, you need to reconnect to Snapchat Ads in destinations to see them here.
5. Choose the sync cadence. [^1]
6. When finished, save your work.

[^1]: If you're not sure which selection is best, try setting up automated recurring syncs for any essential cohorts. Use one-time syncs for work on individual projects.

In Snapchat Ads Manager, the cohort appears under **Assets > Audiences**. It can take up to a few hours to fully process the upload before the audience is ready for targeting.