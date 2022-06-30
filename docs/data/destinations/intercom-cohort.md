---
title: Send Cohorts to Intercom
description: Send behavioral cohorts from Amplitude to Intercom so that you can better engage your users based on how they’ve interacted with your product and their lifecycle timing.
---

Send behavioral cohorts from Amplitude to Intercom so that you can better engage your users based on how they’ve interacted with your product and their lifecycle timing. 

## Setup

1. In Amplitude, navigate to **Data Destinations**, then find **Intercom - Cohort**.
2. Log into your Intercom account (via OAuth) to authenticate and select the account you want to sync the cohort to.
3. Intercom redirects you to the Amplitude dashboard. Select the identifiers you want to use for the cohort sync.
4. Save your work when finished.
5. Next, navigate to the *Cohort* section in the Amplitude dashboard.
6. After finding or building the cohort you want to send to Intercom, click the *Sync To* dropdown and select the Intercom account you want to send your cohort to.
7. Select a one-time or a scheduled sync. Scheduled syncs can occur hourly or daily.

!!!note
    
    For scheduled cohort syncs, the initial sync includes the full cohort. All subsequent syncs update the original cohort via additions and removals.