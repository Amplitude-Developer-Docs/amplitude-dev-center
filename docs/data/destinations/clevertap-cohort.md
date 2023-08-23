---
title: Send Cohorts to CleverTap
description: Use this integration to send Amplitude cohorts to CleverTap
---

[CleverTap](https://clevertap.com/index/) is a modern, integrated retention cloud that empowers digital consumer brands to increase customer retention and lifetime value. With this integration, you can ingest event data from CleverTap into Amplitude for further analysis.

This CleverTap integration allows you to send audiences from Amplitude to CleverTap to create more personalized campaigns.

!!!note "Other Amplitude + CleverTap integrations"

    Amplitude offers other integrations with CleverTap: 

    - [Import CleverTap Data](/data/sources/clevertap)
    - [Stream Amplitude Events to CleverTap](/data/destinations/clevertap-event-streaming)

## Considerations

- This integration is only available for customers who have paid plans with Amplitude.
- You must enable this integration in each Amplitude project you want to use it in.

## Setup

### CleverTap setup

1. Log into your CleverTap dashboard and copy your **Account ID** and **Account Pass code**.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **CleverTap**.
3. Add a new destination.
4. Enter a name for this integration.
5. Select your **CleverTap Region**.
6. Paste in your **Account ID** and **Account Pass code**.
7. Map your Amplitude properties to CleverTap’s User ID, Anonymous ID and CleverTap User ID.
8. Save when finished.

## Send a cohort

To sync your first cohort, follow these steps:

1. In Amplitude, open the cohort you want to sync, then click **Sync**.
2. Select CleverTap, then click **Next**.
3. Choose the account you want to sync to.
4. Choose the sync cadence.
5. When finished, save your work.

It may take a few minutes depending on the size of your cohort to see the correct number of cohort users on CleverTap’s side.

## Use cases

1. **Improved retention analysis:** Cohort analysis allows you to track user behavior and retention over time, based on the time they joined or took a specific action. By sending Amplitude cohort data to CleverTap, you can better understand which cohorts are more likely to churn or retain and create targeted campaigns to re-engage them.
2. **Personalized messaging:** By using cohort data, CleverTap can create personalized messages and campaigns for users based on their behavior and actions. For example, you could create a targeted campaign for users who joined during a specific time or who performed a specific action, such as making a purchase.
3. **Improved A/B testing:** By comparing the behavior of different cohorts, you can gain insights into the effectiveness of different features, campaigns, or user experiences. CleverTap's A/B testing capabilities allow you to test and optimize different campaigns based on cohort data.
4. **Better insights into user behavior:** By combining Amplitude's cohort data with CleverTap's engagement analytics, you can gain a more complete picture of your users' behavior and engagement with your product or service. This can lead to valuable insights and opportunities for optimization.
