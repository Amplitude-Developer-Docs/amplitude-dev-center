---
title: Send Cohorts to Netcore Cloud
description: Send Amplitude cohorts to Netcore Cloud to deliuver AI-powered customer experiences. 
---


!!!beta

    The Netcore Cloud integration is in open beta and is in active development. If you have any feedback to help improve Netcore Cloud destination or have suggestions for their documentation, please [contact the Netcore Cloud support team](mailto:helpdesk@netcorecloud.com).

[Netcore Cloud](https://netcorecloud.com/) offers a full-stack of marketing technology solutions that help product and growth marketers deliver AI-powered intelligent customer experiences across all touchpoints of the user's journey.

This integration lets you sync cohorts from Amplitude to Netcore Cloud's Customer Engagement (CE) & Experience Platform.

## Considerations

- The sync can take up to 5 hours to sync a cohort greater than 100k users.

## Setup

### Netcore Cloud setup

1. Log in to the [Netcore Cloud CE panel](https://login.netcoresmartech.com/) as an admin.
2. Navigate to your user profile and copy the API key.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Netcore**.
3. Enter Name and paste in the API key you copied from Netcore.
4. Map the same Amplitude `User_ID` with the primary key from Netcore Cloud CE panel.
5. Save when finished. 

## Send a cohort

1. In Amplitude, open the cohort you want to export. Click **Sync**, and choose Netcore Cloud.
2. Choose the destination.
3. Select the sync cadence.
4. Save your work.

After syncing a cohort from Amplitude platform, you can find it as a list with the format `AMPLITUDE_[Cohort name]`.
