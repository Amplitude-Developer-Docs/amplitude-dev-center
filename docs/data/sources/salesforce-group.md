---
title: Import Group Properties from Salesforce Fields
description: Create group-level properties from Salesforce fields.
---

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

This integration allows you to create group-level properties from [Salesforce](https://www.salesforce.com/) data by setting specific Salesforce fields as group-level properties. This can be useful when analyzing information about accounts that exist in Salesforce and are being tracked in Amplitude.

## About Salesforce

Salesforce provides solutions that help unify marketing, sales, commerce, IT, and service. 

## Set up and use the integration

Every morning, Amplitude runs a daily job to update all group properties whose pickup dates fall on the current date. You can change the interval to whatever frequency you'd like: daily, weekly, monthly or a specific number of days.  When the Salesforce integration is activated, the first synchronization task will be executed the very next day in the morning (UTC).

!!!note
    An event does not need to occur after the property update since the group property (Salesforce property) is not identified by the event. To add other custom (non-Salesforce) group properties to your groups, you will need to call the [**Group Identify API**](https://help.amplitude.com/hc/en-us/articles/115001765532#group-identify-api).

To match the group object in Amplitude with the data in the Salesforce, follow these steps:

1. **Grant access:** Grant Amplitude access to your Salesforce data. In Amplitude, navigate to **Data Sources**, then select **I want to import data into Amplitude** at the bottom of the list of sources. Find and select Salesforce. Follow the on-screen prompts.
2. **Set up account-level reporting:** Verify that you have [account-level reporting set up](https://help.amplitude.com/hc/en-us/articles/5332668738331) in Amplitude.
3. **Match the group type:** In the *Synced Salesforce Objects* tab, use the **group** matching functionality to map the Salesforce field to an **existing** Amplitude group type. Amplitude uses the values of the field you select to match the field to the corresponding groups. For example, let's say you have a field called "Account Sub-Type" for all accounts in Salesforce. You can use that field to map data to the Amplitude group type "Group Sub-Type".

    ![Object_Mapping.png](/assets/images/integrations-salesforce-groups-mapping.png){: style="max-width:70%;display:block;margin:auto"}

    !!!note
        If Amplitude detects an account in Salesforce with a unique mapped field value that doesn't exist in Amplitude, then it's created for you. However, because this new account doesn't have product usage data attached to it (as Amplitude has never seen the account before), it might not be useful to you.

4. **Match group properties:** In the *Synced Group Properties* tab, use the group property matching functionality to map the Salesforce fields to the Amplitude group property. Amplitude periodically fetches those fields and append them to the corresponding groups as group properties. If you name a new group property during this step (for example, one that doesn't already exist in Amplitude) you **don't** also need to instrument it later. Adding it here is enough.

    !!!example
        Mapping the field `Active` to the group property `Active Status` and the field `Account Score` to the group property `Account Score` **create** group properties `Active Status` and `Account Score` for all tracked accounts, with the values pulled from Salesforce. 

        ![Field_Mapping example](/assets/images/integrations-salesforce-groups-field-mapping.png){: style="max-width:70%;margin:auto"}
