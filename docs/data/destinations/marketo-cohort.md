---
title: Send Cohorts to Marketo
description: Send behavioral cohorts from Amplitude to Marketo and better engage your users based on their patterns of interaction with your product and their lifecycle timing.
---

This integration combines Amplitude with Marketo's tools for in-app messaging, push notifications, and email. Use it to sync behavioral cohorts from Amplitude to Marketo, and better engage your users based on their patterns of interaction with your product and their lifecycle timing. Amplitude's powerful segmentation capabilities let you personalize your campaigns by targeting the right users with the right messages at the right stages of their journey.

## Considerations

- Amplitude uses email addresses to map users to Marketo. Email address must be tracked as a user property. Values are also case-sensitive, and there must be consistency between email formatting in Amplitude and Marketo.
- Amplitude's cohort sync feature doesn't create new user profiles in Marketo. Instead, it flags whether an existing user on Marketo belongs to your Amplitude cohort.

## Setup

### Marketo setup

1. Copy your Marketo `Client Id`, `Client Secret`, and `REST API Endpoint`. See [Marketo's documentation](https://developers.marketo.com/blog/quick-start-guide-for-marketo-rest-api/) for help with this.

    !!!example "Example Keys"

          - `Client Id:` 97890c99-9999-46e4-bccc-351071cd5c3b
          - `Client Secret:` xzy3XYZxyZqIroHtliA7mDKTx7NUXyZZ
          - `REST API Endpoint:` `https://133-CDN-660.mktorest.com/rest`

2. Create a new custom Boolean field in Marketo to identify your cohorts. This field flags whether a user in Marketo belongs to your Amplitude cohort. See the [Marketo documentation](https://developers.marketo.com/blog/create-a-custom-field-in-marketo-and-update-this-field-via-api/) for help creating the field. You must a custom field for **each** cohort you want to sync. 
3. Copy the API name of your field. You need this to configure the integration. 

### Amplitude setup

1. In Amplitude, navigate to **Data Destinations**, then find **Marketo - Cohort**.
2. Enter the API key, API secret, and base URL. The base URL is the same as the REST API endpoint.
3. Enter the rest of the information requested by the modal:
    - For *Name*, enter the name for the API key, so you can select the API target when syncing cohorts.
    - For *Amplitude User Property,* select the Amplitude field you want Marketo to match with.
    - For *Target,* enter the Marketo field to match to the Amplitude user property.

## Send a cohort

1. In Amplitude, open the cohort you want to export. Click **Sync**, and choose Marketo.
2. Choose the destination.
3. Enter the name of the Marketo custom field. This is the API name you copied during Marketo setup.
4. Select the sync cadence.
5. Save your work.

Users who belong have a checkmark next to the custom field you've created, and you can filter for these lists of users.
