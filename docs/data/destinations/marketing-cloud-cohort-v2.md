---
title: Send Cohorts to Salesforce Marketing Cloud (v2)
description: Easily send Amplitude cohorts to Salesforce Marketing Cloud for targeting with the improved v2 integration.
status: new
---

!!! beta

    This integration is currently in beta and is in active development. If you have any feedback to improve or have suggestions for their documentation, please contact <integrations@amplitude.com>. 

--8<-- "includes/editions-growth-and-enterprise.md"

Salesforce Marketing Cloud provides marketing engagement automation that allows you to engage your users. Using this integration enables your marketing and growth teams to use behavioral data to better target campaigns and increase user engagement.

This integration combines Amplitude's analytics with Salesforce Marketing Cloud. You can export [Behavioral Cohorts](https://help.amplitude.com/hc/en-us/articles/231881448-Amplitude-2-0-Behavioral-Cohorts) from Amplitude to Salesforce Marketing Cloud so that you can better engage your users.

!!!info "Key differences between v1 and v2"

    There are several key improvements to the Salesforce Marketing Cloud v2 integration.

    In the Salesforce Marketing Cloud v1 integration, you first had to manually create a data extension within Salesforce Marketing Cloud called "Amplitude Engage" and add a dedicated field to this data extension before performing a cohort sync.

    In the Salesforce Marketing Cloud v2 integration, all you have to do is follow the standard cohort sync process in Amplitude. Salesforce Marketing Cloud automatically creates a new data extension with a standardized cohort name in the specified folder (if not, default folder 'Data Extensions').

## Considerations

- The Salesforce Marketing Cloud v2 integration is only available for Growth and Enterprise customers (allows on-demand sync only). 
- Scheduled syncs are available to customers who have purchased [Amplitude Recommend](https://help.amplitude.com/hc/en-us/articles/360028552471#syncs). 
- Anonymized UUID as identifiers in both Amplitude and Salesforce Marketing Cloud work for this integration so you don't have to send email addresses or PII to Amplitude.

## Setup

### Marketing Cloud setup

You need a subdomain, client ID, and client secret from Marketing Cloud.

1. In Salesforce Marketing Cloud, navigate to **Setup**.
2. In the Quick Find box, search for **Installed packages**.
3. Create a new package.
4. Click **Add Component** on the page, and select API Integration. This tells Salesforce to generate API integration information that Amplitude can use.
5. For the integration type, select Server-to-Server.
6. Grant the package these permissions:
         - Contacts
         - Audiences: Read and Write
         - Lists and subscribers: Read and Write
         - Data
         - Data Extensions: Read and Write
7. Save the package.
8. Copy the client ID, client secret, and subdomain from the app you want to integrate.
9. (Optional) Go to the Data Extension page in Marketing Cloud, and create a new data folder. Make sure the folder name is unique.

### Amplitude setup

1. In Amplitude, navigate to **Data Destinations**, then find **Salesforce Marketing Cloud V2**.
2. Enter a name and the client ID, client secret, and subdomain you found in Salesforce.
3. (Optional) Enter a folder name you created in the Data Extension page.
4. Map an Amplitude user property to the Marketing Cloud contact key.

## Send a cohort

### Amplitude setup

To sync your first cohort, follow these steps:

1. In Amplitude, open the cohort you want to sync, then click **Sync**.
2. Select Salesforce Marketing Cloud v2, then click **Next**.
3. Choose the account you want to sync to.
4. Choose the sync cadence.
5. When finished, save your work.

--8<-- "includes/abbreviations.md"