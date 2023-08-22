---
title: Export Group Properties from Amplitude into Salesforce fields
description: Export group-level properties from Amplitude into SFDC
---

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

!!!This feature is in Alpha

    This feature is in Alpha and is in active development. Contact your Amplitude Success Manager for support with this integration.

## About SFDC

Salesforce provides solutions that help unify marketing, sales, commerce, IT, and service. This Salesforce group property export integration lets you export group-level properties from Amplitude back into specific [Salesforce fields](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_concepts.htm). This enables you to access account usage metrics from Amplitude directly within Salesforce.

## Considerations

- Verify that you have [account-level reporting](https://help.amplitude.com/hc/en-us/articles/5332668738331) set up in Amplitude.
- The integration is enabled on a per-project basis.
- You will need to create the SFDC field and Amplitude would just pull available SFDC fields to be able to map to.
- You cannot export user properties from Amplitude to SFDC via this integration.

### Part 1: Get Started

1. In Amplitude, navigate to **Data Destinations**, then find **Salesforce**.
2. Click on **Connect to** initiate the authentication process. Once authenticated, you should see a valid email address associated with your Salesforce account.
3. Click on **Next** located at the top right corner to continue with the mapping setup.

### Part 2: Setup group property config

1. Review your mapping setup option
    - **Sync Cadence:** This control the cadence of the sync job.
    - **Copy config:** This allows you to copy the existing mapping config to the clipboard
    - **Export config:** This downloads the current mapping config to your local machine (as a JSON file). This is useful when you want to recover a connection from the previous mapping config.
    - **Export config:** This loads in the config file from the local machine and populates the UI.
2. To create a new mapping, click Set up new group mapping. This should populate a new mapping section. Inside the section, fill in the following parts:
    - **Relation:** Amplitude Group Type to SFDC object 
    - **External ID Field:** Unique identifier
3. Once you finish the above settings, click **Group Property Mapping** to define a list of Salesforce fields that you want to export from Amplitude as Group Properties.
4. After you finish defining the mapping and all validations pass, click on the **Next** button to move forward with the final verification process.

!!!note "Note"

     To ensure the data quality, Amplitude performs various validation on the fly, this includes: 
     - Ensuring all required fields are filled in 
     - Ensuring a one-to-one relationship between the SFDC field and Amplitude Group Property to avoid values being overwritten by each other per connection basis.

### Part 3: Verify Access

## Use Cases

- **Product Performance Analysis:** The integration between Amplitude and Salesforce allows organizations to delve into in-depth product performance analysis. By correlating usage data from Amplitude with sales and customer engagement metrics in Salesforce, customers gain valuable insights. This enables them to understand which product features are most contributing to customer engagement and sales growth. Moreover, customers can optimize their marketing strategies and product development efforts based on these usage insights. This use case empowers customers to make informed decisions about feature improvements and resource allocation.
- **Subscription Management:** With the Amplitude-Salesforce integration, organizations can enhance their subscription management strategies. By merging subscription data stored in Salesforce with Amplitude's usage insights, customers gain a comprehensive view of user engagement and subscription patterns. This enables customers to predict subscription renewals, identify potential churn risks, and tailor renewal offers based on user behavior and engagement levels. Additionally, customers can optimize subscription pricing structures and tier offerings by leveraging usage metrics. This use case assists customers in creating more effective subscription strategies that align with customer needs.
- **Data-Driven Upselling:** Through the integration of Amplitude and Salesforce, customers can leverage data-driven insights for more effective upselling strategies. By merging usage data with customer profiles in Salesforce, organizations can identify customers who might benefit from upselling based on their usage behavior. This enables customers to target upsell opportunities for premium features that align with each customer's usage patterns. Additionally, the integration provides insights that help craft persuasive upsell pitches tailored to individual customer needs. This use case empowers customers to increase revenue through strategic upselling efforts.
