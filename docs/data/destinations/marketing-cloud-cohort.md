---
title: Send Cohorts to Marketing Cloud
description: Send Amplitude cohorts to Salesforce Marketing Cloud. 
---

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

1. In Amplitude, navigate to **Data Destinations**, then find **Salesforce Marketing Cloud - Cohort**.
2. Enter a name and the client ID, client secret, and subdomain you found in Salesforce.
3. Map an Amplitude user property to the Marketing Cloud contact key. 

!!!note

    When entering the subdomain, be sure you paste the subdomain **only**, and not the entire URL. For example, if the URL is [https://subdomain.domain.com,](https://subdomain.domain.com%2C/) you should only type or paste "subdomain".

## Send a cohort

### Marketing Cloud setup

1. Create a new data extension and name it "Amplitude Engage". See the [Marketing Cloud documentation](https://help.salesforce.com/s/articleView?id=sf.mc_es_create_data_extension_classic.htm&type=5) for instructions.
2. In this new data extension, create an field named "Contact Key" and configure it as the primary key. This primary key is used to link the data extension to the attribute groups. This is also how Amplitude identifies users. The value of the attribute should be a unique identifier like `email` or `user_id` that is present within Amplitude.
3. Link "Amplitude Engage" to an existing attribute group or a newly created attribute group by linking the data extension to the contact through "Contact Key."
4. For each cohort in Amplitude you want to sync to Marketing Cloud, create a dedicated field in the "Amplitude Engage" data extension. Give it any name you want, as long as Marketing Cloud allows it. This field name is the value you should enter in Amplitude's *Cohort Attribute Name* field when you set up a sync.
    - Example: `cohort_campaign_march` is an attribute created in Marketing Cloud and should be used in both Amplitude and Marketing Cloud to keep track of user's cohort status.

### Amplitude setup

1. Go to the cohort in Amplitude you would like to sync over to Salesforce
2. Click on **Sync to** (select Salesforce Marketing Cloud)
3. Select the API target to sync to from the dropdown and input the name of the field that you set up for the cohort in Marketing Cloud. 