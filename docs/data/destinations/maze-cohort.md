---
title: Send Cohorts to Maze
description: words
status: Send Amplitude audineces to Maze to create more personalized campaigns.
---

[Maze](https://maze.co/) empowers product and marketing teams to test anything from prototypes to copy, or round up user feedback, all in one place. Collect user insights across teams and create better user experiences, together.

The Maze integration allows you to send audiences from Amplitude to Maze to create more personalized campaigns.

!!!info "This integration is maintained by Maze"
    
    Contact the [Maze team](https://maze.co/) with any questions about this integration.

## Considerations

- This integration must be enabled on a per-project basis within Amplitude.
- The Maze integration is only available for Scholarship, Growth and Enterprise customers.
- To use this integration, you must have an Amplitude user property that maps to a Maze key. Maze only supports Amplitude `user_ID`. 

## Setup

### Maze setup

1. Log into your Maze account and [switch to the relevant team](https://help.maze.co/hc/en-us/articles/4651328987155-Switching-between-teams).
2. Open your team settings and navigate to the **Integrations** tab.
3. Under *Amplitude*, click **Connect**. Copy the API key. You need that for Amplitude setup.

### Amplitude setup

1. In Amplitude, navigate to **Data Destinations**, then find **Maze - Cohort**.
2. Click **Add another destination**.
3. Enter a name and Maze API key.
4. Map an Amplitude field to the Maze User ID field.
5. When finished, save your work.

## Send a cohort

To sync your first cohort, follow these steps:

1. In Amplitude, open the cohort you want to sync, then click **Sync**.
2. Select **Maze**, then click **Next**.
3. Choose the account you want to sync to.
4. Choose the sync cadence.
5. When finished, save your work.