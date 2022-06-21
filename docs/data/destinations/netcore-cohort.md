---
title: Send Cohorts to Netcore Cloud
description: Sync cohorts (audiences) from Amplitude to Netcore Cloud's Customer Engagement (CE) & Experience Platform.
---

!!!beta

    The Netcore Cloud destination is in open beta, and is still in active development. If you have any feedback to help improve Netcore Cloud destination or have suggestions for their documentation, [contact the Netcore Cloud support team](mailto:helpdesk@netcorecloud.com).

[Netcore Cloud](https://netcorecloud.com/) offers full-stack of marketing technology solutions that help product and growth marketers deliver AI-powered intelligent customer experiences across all touchpoints of the user's journey.

This integration lets sync cohorts (audiences) from Amplitude to Netcore Cloud's Customer Engagement (CE) & Experience Platform.

## Setup

### Netcore Cloud setup

1. Log in to the [Netcore Cloud CE panel](https://login.netcoresmartech.com/).
2. Navigate to **Profile section > User profile (admin)** and copy the API key.

### Amplitude setup

1. In Amplitude, navigate to **Data Destinations**, then find **Netcore Cloud - Cohort**.
2. Enter a name and paste your Netcore Cloud.
3. Map Amplitude User_ID with the primary key from [Netcore Cloud CE panel](https://login.netcoresmartech.com/).
4. When finished, save the destination.

After syncing a cohort from Amplitude platform, you can find it in Netcore as a list with the format "Amplitude_[Cohort name]".
