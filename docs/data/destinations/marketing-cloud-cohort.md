---
title: Send Cohorts to Salesforce Marketing Cloud V1
description: Send Amplitude cohorts to Salesforce Marketing Cloud V1. 
---
<!-- vale off-->

!!!tip "Improved v2 integration is now in beta"

    Amplitude has released an improved version of this integration. Learn more in [Send Cohorts to Salesforce Marketing Cloud (v2)](../marketing-cloud-cohort-v2)

This integration combines Amplitude's analytics with Salesforce Marketing Cloud. You can export [Behavioral Cohorts](https://help.amplitude.com/hc/en-us/articles/231881448-Amplitude-2-0-Behavioral-Cohorts) from Amplitude to Salesforce Marketing Cloud so that you can better engage your users. 

Salesforce Marketing Cloud provides marketing engagement automation that allows you to engage your users. Using this integration enables your marketing and growth teams to use behavioral data to better target campaigns and increase user engagement. 

## Considerations

- You must create a data extension in Marketing Cloud called "Amplitude Engage". It can't be named anything else. Amplitude uses this specific name in the request to identify users during a sync.
- We recommend you create a new attribute group and link the "Amplitude Engage" data extension to it. The name of the attribute group doesn't have to be "Amplitude Engage."
- You have to create the attribute for each cohort you want to sync. This dedicated attribute is what Amplitude updates in Marketing Cloud to keep track of the users' cohort status. Different cohorts should use different attributes. Without a predefined attribute in Marketing Cloud, the cohort sync will fail. Syncing to the same attribute across multiple cohorts will lead to inaccuracies.
- After an attribute has been synced to, you can't to change it for that particular cohort. You can copy the cohort and create a new attribute instead.
- "Contact Key" is the attribute that Amplitude passes over to Marketing Cloud as the user identifier. You can choose any property within Amplitude to act as this user identifier. However, this attribute must be named "Contact Key" in your "Amplitude Engage" data extension in Marketing Cloud. It also has to be mapped to *Contact Key* in the Marketing Cloud contact for syncs to succeed.
- Cohort information can be synced to existing Salesforce contacts, as long as they share the same value for the "Contact Key" attribute as the Amplitude contact key.
- Amplitude can't sync other user properties to Marketing Cloud. Let us know if you have a use case that requires this functionality.

## Setup 

### Prerequisites

- The Salesforce Marketing Cloud / Amplitude integration is only available for Growth and Enterprise customers (allows on-demand sync only). 
- Scheduled syncs are available to customers who have purchased [Amplitude Audiences](https://help.amplitude.com/hc/en-us/articles/360028552471#syncs). 
- Anonymized UUID as identifiers in both Amplitude and Salesforce Marketing Cloud work for this integration so you don't have to send email / PII to Amplitude.

### Marketing Cloud setup

You need a subdomain, client ID, and client secret from Marketing Cloud.

1. In Marketing Cloud, navigate to **Setup**.
2. In the *Quick Find* box, search for **Installed packages**.
3. Create a new package. 
4. Click **Add Component** on the page, and select **API Integration**. This tells Salesforce to generate API integration information that Amplitude can use. S
5. For the integration type, select **Server-to-Server**.
6. Grant the package these permissions:
    - Contacts
      - Audiences: Read and Write
      - Lists and subscribers: Read and Write
    - Data
      - Data Extensions: Read and Write
7. Save the package. 
8. Copy the client ID, client secret, and subdomain from the app you are interested in.

### Amplitude setup

In Amplitude: 

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Salesforce Marketing Cloud**.
3. Enter a name and the client ID, client secret, and subdomain you found in Salesforce.
4. Map an Amplitude user property to the Marketing Cloud contact key. 

!!!note

    When entering the subdomain, be sure you paste the subdomain **only**, and not the entire URL. For example, if the URL is [https://subdomain.domain.com,](https://subdomain.domain.com%2C/) you should only type or paste "subdomain".

## Send a cohort

To sync your first cohort, follow these steps:

1. In Amplitude, open the cohort you want to sync, then click **Sync**.
2. Select Salesforce Marketing Cloud, then click **Next**.
3. Choose the account you want to sync to.
4. Choose the sync cadence.
5. When finished, save your work.

It may take a few minutes depending on the size of your cohort to see the correct number of cohort users on Salesforce Marketing Cloud’s side.
