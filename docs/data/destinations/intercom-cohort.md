---
title: Send Cohorts to Intercom
description: Send behavioral cohorts from Amplitude to Intercom so that you can better engage your users based on how they’ve interacted with your product and their lifecycle timing.
---

Send behavioral cohorts from Amplitude to Intercom so that you can better engage your users based on how they’ve interacted with your product and their lifecycle timing. 

!!!note "Other Amplitude + Intercom integrations"

    This integration sends Amplitude cohorts to Intercom. Amplitude offers other integrations with Intercom: 

    - [Stream Amplitude Events to Intercom](/data/destinations/intercom)
    - [Import Intercom Data](/data/sources/intercom)

## Setup

1. In Amplitude, navigate to **Data Destinations**, then find **Intercom - Cohort**.
2. Log into your Intercom account (via OAuth) to authenticate and select the account you want to sync the cohort to.
3. Intercom redirects you to the Amplitude dashboard. Select the identifiers you want to use for the cohort sync.
4. Save your work when finished.

## Send a cohort

1. In Amplitude, open the cohort you want to export. Click **Sync**, and choose Intercom.
2. Choose the destination.
3. Select the sync cadence.
4. Save your work.

!!!note
    
    Users are exported based on their **User Id**. Users must already exist on Intercom with corresponding User Ids in order to be properly synced

!!!note
    
    For scheduled cohort syncs, the initial sync includes the full cohort. All subsequent syncs update the original cohort via additions and removals.
