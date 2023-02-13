---
title: Send Cohorts to MoEngage
description: Send Amplitude cohorts to MoEngage to tailor your email, SMS, push, and in-product messaging.
---

Amplitude's MoEngage integration allows you to send hyper-targeted behavioral audiences from Amplitude to MoEngage. With MoEngage, you can use Amplitude cohorts to drive precisely tailored email, SMS, push, and in-product messaging.

## Considerations

- This integration is available for Growth and Enterprise customers.
- To use this integration, you  need a MoEngage account, an understanding of Amplitude behavioral cohorts, and an Amplitude user property that matches what you're using for your User ID field in MoEngage.

## Setup

### MoEngage setup

1. Login to your MoEngage dashboard and navigate to **Settings -> API Settings**. 
2. Copy the App ID and Secret Key.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **MoEngage**.
2. Enter a name and app ID.
3. Map your user ID and device ID. Make sure the unique user ID is the same in both Amplitude and MoEngage. This integration uses the device ID to map anonymous users, so make sure that device ID is the same in Amplitude and MoEngage.

## Send a cohort

1. In Amplitude, open the cohort you want to export. Click **Sync**, and choose MoEngage.
2. Choose the destination.
3. Select the sync cadence.
4. Save your work.
  
In MoEngage, the cohort appears as a custom segment with the name `[Amplitude][Cohort Name]`.
