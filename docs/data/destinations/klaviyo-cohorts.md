---
title: Send Cohorts to Klaviyo
description: Send Amplitude cohorts to Klaviyo to use in targeted messaging. 
---

Send Amplitude cohorts to Klaviyo to use in targeted messaging. 

## Setup

### Klaviyo setup

Create a private API key in Klaviyo. Open Klaviyo and navigate to **Account > Settings > API Keys**. 

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Klaviyo**.
3. Enter a name and API key. 
4. Map an Amplitude field to Klaviyo email. Klaviyo requires the user ID to be valid email format.
5. Save when finished.

## Send a cohort

1. In Amplitude, open the cohort you want to export. Click **Sync**, and choose Klaviyo.
2. Choose the destination.
3. Select the sync cadence.
4. Save your work.

After you have exported the cohort, you can see the cohort in the [List](https://www.klaviyo.com/lists "https://www.klaviyo.com/lists") section of the Klaviyo platform. You can then create [segments](https://www.klaviyo.com/lists/create "https://www.klaviyo.com/lists/create") with two conditions:

- "Properties about someone" → `isActive `sets to be `is true `with type `Boolean`.
- "If someone is in or not in a list" → Person `is `in `Choose a list `→ chooses a list from the dropdown list.

After that, you create a segment with active users in the cohort to use for events that follow.
