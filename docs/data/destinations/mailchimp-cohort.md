---
title: Send Cohorts to Mailchimp
description: Send Amplitude cohorts to Mailchimp to create targeted audiences for your email marketing needs.
---

Send Amplitude cohorts to Mailchimp to create targeted audiences for your email marketing needs.

!!!note "Other Amplitude + Mailchimp integrations"

    This integration sends Amplitude cohorts to Mailchimp. Amplitude offers other integrations with Mailchimp: 

    - [Import Mailchimp Data](/data/sources/mailchimp)

## Considerations

- Cohort names must be fewer than 88 characters. 

## Setup

### Mailchimp setup

[Find your Mailchimp audience ID](https://mailchimp.com/help/find-audience-id/ "https://mailchimp.com/help/find-audience-id/") for the audience you would like to use for sending events to Amplitude. If you have multiple audiences, you need to set up this integration for each one. If you don't have an existing audience, [create one](https://mailchimp.com/help/create-audience/ "https://mailchimp.com/help/create-audience/").

### Amplitude setup 

1. In Amplitude, navigate to **Data Destinations**, then find **Mailchimp - Cohort**.
2. Click **Connect to Mailchimp** and log in to your Mailchimp account. 
3. Authorize Amplitude access to your account. Mailchimp redirects back to Amplitude. 
4. Enter the Mailchimp audience ID and select an Amplitude user property to export from the drop down. This user property **must** contain an email address; without one, the mapping to Mailchimp fails.
5. Save your work. 
6. Open or create the [cohort](https://help.amplitude.com/hc/en-us/articles/231881448-Behavioral-Cohorts) of users you wish to export from Amplitude to Mailchimp and click **Sync** . This opens the *Select Sync Type* modal.
7. From *Sync Type*, select **Messaging**, and then under *Select Destination*, select **Mailchimp**. Click **Next**.
8. Select your destination from the *API Target* dropdown. Under *Define Cadence,* select either a one-time or scheduled sync. Then click *Sync* and wait for Amplitude to sync your cohort to Mailchimp.

After the sync is complete, navigate to your audience on Mailchimp. Your cohort is identifiable on Mailchimp by a [Mailchimp tag](https://mailchimp.com/help/getting-started-tags/ "https://mailchimp.com/help/getting-started-tags/") named  `<Amplitude cohort name>`. You can filter by tags on Mailchimp to view the members of your audience belonging to the exported Amplitude cohort
