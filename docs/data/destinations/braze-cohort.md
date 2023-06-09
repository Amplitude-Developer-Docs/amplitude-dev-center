---
title: Send Cohorts to Braze
description: Amplitude Data's Braze integration lets you send your Amplitude cohorts straight to Braze with just a few clicks.
---

Amplitude Data's Braze integration lets you send your Amplitude cohorts straight to Braze with just a few clicks.

!!!note "Other Amplitude + Braze Integrations"

    This integration sends cohorts to Braze. Amplitude offers other integrations with Braze: 

    - [Import Braze Events](/data/sources/braze)
    - [Braze Event Streaming](/data/destinations/braze)

## Considerations
- You must enable this integration in each Amplitude project you want to use it in.
- You need a paid Amplitude plan to enable this integration.
- You must have a Braze account. 
- For more details on using this integration in Braze, see the [Braze documentation](https://www.braze.com/docs/partners/data_and_infrastructure_agility/analytics/amplitude/amplitude_audiences/).

## Setup

### Prerequisites

To configure an cohort integration from Amplitude to Braze, you need the following information from Braze:

- Endpoint: the endpoint for the REST operations. It looks like : `https://rest.iad-##.braze.com`, See the [Braze documentation](https://www.braze.com/docs/api/basics/#endpoints) to find your endpoint.
- Data Import Key. Use the [Braze documentation](https://www.braze.com/docs/partners/data_and_infrastructure_agility/analytics/amplitude/amplitude_audiences/#step-1-get-the-braze-data-import-key) for help finding this. 
- App Group REST API Key: Find this in your Braze Developer Console. See the [Braze documentation](https://www.braze.com/docs/api/basics/#rest-api-key) for more help. 

### Amplitude setup 

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Braze**.
3. Enter your App Group REST API key, select your endpoint, and paste your Data Import Key.
4. Select an Amplitude User Property and a Braze target object. 
5. When finished, save.

## Send a cohort

1. In Amplitude, open the cohort to export. 
2. Click **Sync**, and choose Braze.
3. Select the destination.
4. Select the sync frequency you need.
5. Save when finished.

## Using the Cohort in Braze
In Braze, to create a segment of these users, navigate to **Segments** under **Engagement**, name your segment, and select **Amplitude Cohorts** as the filter. Next, use the “includes” option and choose the cohort you created in Amplitude.
Once saved, you can reference this segment during Canvas or campaign creation in the targeting users step.

