---
title: Send Cohorts to Leanplum
description: Send Amplitude cohorts to Leanplum to use them as saved audiences in your marketing automation efforts. 
---

Leanplum helps mobile teams orchestrate multi-channel campaigns from messaging to the in-app experience, all from a single mobile marketing platform.

Use this integration to match Amplitude's analytics capabilities with Leanplum's marketing automation tools to drive better audience engagement. Sync cohorts created in Amplitude to Leanplum where they're available as saved audiences. 

!!!note "Other Amplitude + Leanplum integrations"

    This integration sends Amplitude cohorts to Leanplum. Amplitude offers other integrations with Leanplum: 

    - [Import Leanplum Data](/data/sources/leanplum)

## Considerations

- You need a Leanplum account. Reach out to Leanplum's Customer Success Manager or Account Manager to enable this integration.
- You need a paid Amplitude plan to use this integration. 
- The integration doesn't sync [anonymous users](https://amplitude.zendesk.com/hc/en-us/articles/115003135607-Tracking-Unique-Users#anonymous-users), so make sure all users you send to Leanplum have unique User IDs set in Amplitude.

## Setup

For more information on setting up this integration, see [Leanplum's documentation.](https://docs.leanplum.com/docs/amplitude-integration)

### Leanplum setup 

1. From your Leanplum dashboard, go to **Partner Integrations → Amplitude**.
2. Click **+** to create an Amplitude Secret.
3. Copy the Amplitude Secret and your App ID.

### Amplitude setup

1. In Amplitude, navigate to **Data Destinations**, then find **Intercom - Leanplum**.
2. Enter a Leanplum App ID, API key, and name. Map an Amplitude user property to the Leanplum user ID. 
3. Save when finished.

## Send a cohort

1. In Amplitude, open the cohort you want to export. Click **Sync**, and choose Leanplum.
2. Choose the destination.
3. Select the sync cadence.
4. Save your work.
   
Allow up to 30 minutes for the audience and the users in it to populate in your Audiences dashboard in Leanplum. Audiences synced from Amplitude will have a "Amplitude:" prefix. 
