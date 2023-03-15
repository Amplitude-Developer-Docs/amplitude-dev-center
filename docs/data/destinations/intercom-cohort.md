---
title: Send Cohorts to Intercom
description: Send behavioral cohorts from Amplitude to Intercom so that you can better engage your users based on how they’ve interacted with your product and their lifecycle timing.
---

Send behavioral cohorts from Amplitude to Intercom so that you can better engage your users based on how they’ve interacted with your product and their lifecycle timing. 

!!!note "Other Amplitude + Intercom integrations"

    This integration sends Amplitude cohorts to Intercom. Amplitude offers other integrations with Intercom: 

    - [Import Intercom Data](/data/sources/intercom)
    - [Event streaming to Intercom](/data/destinations/event-streaming/intercom)

## Setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Intercom**.
3. Log into your Intercom account (via OAuth) to authenticate and select the account you want to sync the cohort to.
4. Intercom redirects you to the Amplitude dashboard. Select the identifiers you want to use for the cohort sync.
5. Save your work when finished.

## Send a cohort

1. In Amplitude, open the cohort you want to export. Click **Sync**, and choose Intercom.
2. Choose the destination.
3. Select the sync cadence.
4. Save your work.

!!!note
    
    Users are exported based on their **user ID**. Users must already exist in Intercom with corresponding user IDs in order to be properly synced

!!!note
    
    For scheduled cohort syncs, the initial sync includes the full cohort. All subsequent syncs update the original cohort via additions and removals.
