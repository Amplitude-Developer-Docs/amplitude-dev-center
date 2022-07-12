---
title: Send Cohorts to HubSpot
description: Use this integration to send Amplitude cohorts to HubSpot contacts lists.
---

The HubSpot destination allows you to sync your Amplitude-built cohort to your HubSpot contacts lists for targeting purposes.

!!!note

    Contact your CSM if you want to use this integration.

## Setup

1. In Amplitude, navigate to **Data Destinations**, then find **HubSpot - Cohort**.
2. Log into your HubSpot account (via OAuth) to authenticate. Then select the account that contains the cohort you want to sync.
3. After you're redirected to the Amplitude dashboard, select the identifiers you want to use for the cohort sync. When you're done, save your work.

## Send a cohort

1. In Amplitude, open the cohort you want to sync. 
2. Click **Sync** and choose HubSpot.
3. Specify the HubSpot account you want to send the cohort to.
4. Set the sync cadence. 
5. Save your work.

!!!note

    For scheduled cohort syncs, only the initial sync will include the full cohort. All subsequent syncs will include all additions and removals since the last sync.

## Cohorts in HubSpot

After you send your Amplitude cohort to HubSpot, you can see it in the *Contacts* section of the HubSpot dashboard. Cohorts sent by Amplitude include a "amplitude_" prefix in the name. 

HubSpot only ingests users for whom they have identifiers. For example, if User A, User B, and User C are in the Amplitude cohort (Cohort 1), and HubSpot only has identifiers for User A and User C, then HubSpot creates a list that includes User A and User C, and drops User B.
