---
title: Send Cohorts to Appcues
description: Amplitude's Appcues integration allows you to send finely-targeted behavioral audiences from Amplitude to Appcues, where you can use them to power tailored in-product onboarding tutorials, tooltips, announcements, promotions, and surveys.
---

--8<-- "includes/editions-growth-and-enterprise.md"

Amplitude's Appcues integration allows you to send finely-targeted behavioral audiences from Amplitude to Appcues, where you can use them to power tailored in-product onboarding tutorials, tooltips, announcements, promotions, and surveys.

## Considerations

- You need an Appcues account.
- You must have a user property in Amplitude that matches the User ID field in Appcues.

## Setup

1. In Amplitude, navigate to **Data Destinations**, then find **Appcues - Cohort**.
2. Enter your Appcues account ID. You can find your account ID by following [these instructions](https://docs.appcues.com/article/254-http-api).
3. Select the Amplitude user property you want to map to the Appcues `User ID` field. This property should match the `User ID` field.
4. Save your work.

### Sync a cohort

To sync a cohort between Amplitude and Appcues, follow these steps:

1. Open your cohort and select the API target to sync to.
2. Specify the custom field that you want to sync to. Appcues automatically creates this field the first time your sync is run. **This should not contain any quote characters.**
3. Specify whether you want to run a one-time sync, or whether you want the sync to occur on a scheduled basis.

In Appcues, the cohort appears as a user property. Its name matches the one you provided for the custom field. It's set to `true` if a user is in the cohort at the time of sync, and `false` if they're not.
