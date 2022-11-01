---
title: Send Cohorts to Google Ads
description: Send Amplitude cohorts to Google Ads to create audiences for more personalized campaigns. 
---

Send Amplitude cohorts to Google Ads to create audiences for more personalized campaigns. 

!!!note "Other Amplitude + Google Ads Integrations"

    This integration sends cohorts to Google Ads. Amplitude offers other integrations with Google Ads: 

    - [Import Google Ads Data](/data/sources/google-ads)

## Considerations

- This integration is available for Growth and Enterprise customers
- You should have an understanding of [Amplitude Audiences](https://help.amplitude.com/hc/en-us/articles/360028552471-Amplitude-Engage) and [Behavioral Cohorts](https://help.amplitude.com/hc/en-us/articles/231881448) before setting up this integration.
- You need a Google Ads Manager account.
- You should already have identified an Amplitude user property that matches what you're using for your user ID field in Google Ads.
- The integration is enabled on a per-project basis. 

## Setup

### Prerequisites

Before you begin, log in to your [Google Ads Manager account](https://ads.google.com/home/).

### Amplitude setup

1. In Amplitude, navigate to **Data Destinations**, then find **Google Ads - Cohort**.
2. Log into Google and grant Amplitude permission to manage your AdWords campaigns.
3. Set up the fields necessary for Amplitude to begin syncing to Google Ads. There are three possible match types in Google Ads, referred to as the **upload key type**:

    - **Contact Info**: This key type matches on a user's email address (phone number, first name, last name, country, and zip code are also supported, not recommended).

        !!!note 
            To avoid sending PII to Amplitude, hash any email addresses with SHA-256 before passing them. Google has some guidelines on the accepted format for emails before they're hashed. In Google, this value should match the *Email* field.

    - **Mobile Advertising ID**: This key type matches on IDFA and AAID mobile device IDs. Amplitude doesn't recommend using Amplitude's Device ID column because you may experience low matching rates due to Amplitude populating IDFV if it isn't able to get AAID and IDFA, which you can read more about [here](https://help.amplitude.com/hc/en-us/articles/115003135607-Tracking-Unique-Users#h_7cf7c47f-ec71-4e15-8c47-a2bda5d84186).\
    You also need to define an App ID if you choose this upload key type. App ID is a string that uniquely identifies a mobile application from which the data was collected. For iOS, the ID string is the 9 digit string that appears at the end of an App Store URL. For Android, the ID string is the application's package name. You can define multiple for the same project so you can sync under different apps if needed, and you can select which one you would like to at the time of making the sync.
    In Google, this value should match on the *App ID* or *Device ID* fields.

    - **CRM ID**: This key type matches on advertiser generated and assigned User IDs to send into Amplitude. In Google, this value should match the [*User ID* field](https://developers.google.com/adwords/api/docs/guides/remarketing#customer_match_with_email_address_address_or_user_id).

!!!note

    You must send **at least one uniquely identifiable key** (like email or device ID) to Amplitude in order for this integration to work.

## Send a cohort

!!!note

    Make sure your browser ad blocker is off before you attempt these steps. 

1. In Amplitude, open the cohort you want to export. 
2. Click **Sync**, and choose Google Ads.
3. Select the destination.
4. Select the sync frequency you need.
5. If you specified Mobile Advertising ID as the upload key type for your integration in this project, you also have to select an app ID from the drop-down, from the list that you created at integration setup time. If you would like to add another app ID, head back to the integration setup page and add more.
6. Save when finished.

In Google Ads you should see the cohort in the audience manager. It may take Google between six and twelve hours to populate the sync. For privacy purposes, the user list size shows as zero until the list has at least 1000 members. After that, the size is rounded to the two most significant digits.

--8<-- "includes/abbreviations.md"