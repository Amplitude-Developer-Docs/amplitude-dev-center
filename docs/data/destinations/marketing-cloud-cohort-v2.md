---
title: Send Cohorts to Salesforce Marketing Cloud V2
description: Easily send Amplitude cohorts to Salesforce Marketing Cloud for targeting with the improved V2 integration.
---

--8<-- "includes/editions-growth-and-enterprise.md"

Salesforce Marketing Cloud provides marketing engagement automation that allows you to engage your users. Using this integration enables your marketing and growth teams to use behavioral data to better target campaigns and increase user engagement.

This integration combines Amplitude's analytics with Salesforce Marketing Cloud. You can export [Behavioral Cohorts](https://help.amplitude.com/hc/en-us/articles/231881448-Amplitude-2-0-Behavioral-Cohorts) from Amplitude to Salesforce Marketing Cloud so that you can better engage your users.

!!!info "Key differences between v1 and v2"

    There are several key improvements to the Salesforce Marketing Cloud v2 integration.

    In the Salesforce Marketing Cloud v1 integration, you first had to manually create a data extension within Salesforce Marketing Cloud called "Amplitude Engage" and add a dedicated field to this data extension before performing a cohort sync.

    In the Salesforce Marketing Cloud v2 integration, all you have to do is follow the standard cohort sync process in Amplitude. Salesforce Marketing Cloud automatically creates a new data extension with a standardized cohort name in the specified folder (if not, default folder 'Data Extensions').

## Considerations

- The Salesforce Marketing Cloud v2 integration is only available on paid Amplitude plans.
- You must enable this integration in each Amplitude project you want to use it in.
- Anonymized UUID as identifiers in both Amplitude and Salesforce Marketing Cloud work for this integration so you don't have to send email addresses or PII to Amplitude.
- Amplitude will automatically create new contacts for users within the cohort who do not already exist within Salesforce Marketing Cloud.

## Setup

### Marketing Cloud setup

You need a subdomain, client ID, and client secret from Salesforce Marketing Cloud.

1. In Salesforce Marketing Cloud, navigate to **Setup** under Settings.
2. In the Quick Find box, search for **Installed Packages**.
3. Click **New** to create a new package.
4. Click **Add Component**.
5. For the Component Type, select **API Integration**. This tells Salesforce to generate API integration information that Amplitude can use.
6. For the integration type, select **Server-to-Server**.
7. Grant the package these permissions:
    - Contacts
        - Audiences: Read and Write
        - Lists and subscribers: Read and Write
    - Data
        - Data Extensions: Read and Write
8. **Save** the package.
9. Copy the **Client ID**, **Client Secret**, and **Subdomain** from the app you want to integrate.
    - For the Subdomain, see the Authentication Base URI and only copy the subdomain. e.g. If the Authentication Base URL is  "https://mc1n78yx33kxv5mv1q7fh81flfjq.auth.marketingcloudapis.com/", then only copy "mc1n78yx33kxv5mv1q7fh81flfjq".
10. Click on **Access** and click on **Enable All Business Units".
11. (Optional) Create a new Data Extension folder by navigating to **Audience Builder** and clicking on **Data Extensions**. Click on "+" to create a new folder. Make sure the folder name is unique for the cohort sync.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Salesforce Marketing Cloud V2**.
3. Enter a name and paste in the **Client ID**, **Client Secret**, and **Subdomain** you generated in Salesforce Marketing Cloud.
4. (Optional) Enter a folder name you created in the Data Extension page.
5. Enter a **Name**. This name will be used as the API Target when you are syncing a cohort from Amplitude. 
6. Map an **Amplitude User Property** to the Marketing Cloud contact key.

## Send a cohort

To sync your first cohort, follow these steps:

1. In Amplitude, open the cohort you want to sync, then click **Sync**.
2. Select Salesforce Marketing Cloud v2, then click **Next**.
3. Choose the account you want to sync to.
4. Choose the sync cadence.
5. When finished, save your work.

## Locating your Amplitude Cohort in Salesforce Marketing Cloud
1. Log into [Salesforce Marketing Cloud](https://mc.s11.exacttarget.com/cloud/#app/Setup/Users)
2. Click on **Audience Builder** on the top navigation bar and navigate to **Contact Builder** 
3. Click on **Data Extensions** at the top navigation bar
4. Find the relevant **Data Extensions** folder that you specified during the setup process.
5. Click on a specific cohort and click on **Records** to view the list of users.

--8<-- "includes/abbreviations.md"
