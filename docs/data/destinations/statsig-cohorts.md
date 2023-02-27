---
title: Send Cohorts to Statsig
description: Amplitude Data's Statsig integration lets you target Amplitude cohorts with Statsig experiments.
---

--8<-- "includes/open-beta.md"

Statsig is a modern feature-management and product experimentation platform that helps you to ship faster by providing actionable causal analysis, meaningful data insights, and automatically running 10x more experiments.

This integration allows you to target experiments at specific cohorts you’ve already created in Amplitude.

!!!note

    For any issues with Statsig, contact support@statsig.com.

## Setup

### Statsig setup

1. Navigate to the [Statsig Console](https://console.statsig.com/login), click **Project Settings**, and select **API Keys**.
2. Generate a new key and add a description. Copy the key. 

### Amplitude setup 

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Statsig**.
3. Click **Add another destination**.
4. Enter _Name_ and _Statsig API Key_.
5. Save the destination.

## Send a cohort

1. In Amplitude, open the cohort you want to export. 
2. Click **Sync**, and choose Statsig.
3. Select the destination.
4. Select the sync cadence.
5. Save when finished.

After your cohort is synced into Statsig, you can find it under **Segments** in the Statsig console. Expect updates to reflect within 15 minutes. See Statsig's [Segments documentation](https://docs.statsig.com/segments) for more information on how you can use the data.
