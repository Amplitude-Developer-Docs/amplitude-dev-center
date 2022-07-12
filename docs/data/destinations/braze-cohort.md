---
title: Send Cohorts to Braze
description: Amplitude Data's Braze integration lets you send your Amplitude cohorts straight to Braze with just a few clicks.
---

Amplitude Data's Braze integration lets you send your Amplitude cohorts straight to Braze with just a few clicks.

## Considerations

- You must have a Braze account. 
- For more details on using this integration in Braze, see the [Braze documentation](https://www.braze.com/docs/partners/data_and_infrastructure_agility/analytics/amplitude/amplitude_for_currents/).


## Setup

### Prerequisites

To configure an cohort integration from Amplitude to Braze, you need the following information from Braze:

- Endpoint: the endpoint for the REST operations. It looks like : `https://rest.iad-01.braze.com`, See [Braze's documentation](https://www.braze.com/docs/api/basics/#endpoints) to find your endpoint.
- Data Import Key. Use the [Braze documentation](https://www.braze.com/docs/partners/data_and_infrastructure_agility/analytics/amplitude/amplitude_for_currents/#step-1-get-the-braze-data-import-key) for help finding this. 
- App Group REST API Key: Find this in your Braze Developer Console. See the [Braze documentation](https://www.braze.com/docs/api/api_key/#what-is-a-rest-api-keyapp-group-api-key) for more help. 

### Amplitude setup 

1. In Amplitude, navigate to **Data Destinations**, then find **Braze - Cohort**.
2. Enter your App Group REST API key, select your endpoint, and paste your Data Import Key.
3. Select an Amplitude User Property and a Braze target object. 
4. When finished, save.

## Send a cohort

1. In Amplitude, open the cohort you want to export. 
2. Click **Sync**, and choose Braze.
3. Select the destination.
4. Select the sync frequency you need.
5. Save when finished.