---
title: Planhat Event Streaming
description: Stream Amplitude events to Planhat.
status: new
---

!!!beta "This feature is in open beta"

    This feature is in open beta and is in active development. Contact the [Planhat support team]([https://userlist.com/](https://www.google.com/url?q=https://support.planhat.com/en/&sa=D&source=docs&ust=1681362728518389&usg=AOvVaw0HZBKn1FHVmfkZ7_tigFKN)) for support with this integration.

[Planhat](https://www.planhat.com/) is a customer platform built to give insights, manage workflow and drive customer experience. Planhat is helping hundreds of modern technology companies worldwide center their business around their customers in order to maximize customer success and customer lifetime value. 


## Considerations

Amplitude Data’s Planhat integration allows you to send a continuous, real-time stream of events as User Activities on the End User, Asset or Project level.

Keep these things in mind when sending events to [Planhat](https://support.planhat.com/en/articles/7181975-setting-up-the-amplitude-integration#h_87f475e94b):
- You must enable this integration in each Amplitude project you want to use it in.
- You need to be an admin of a paid Planhat plan to enable this integration.
- Amplitude matches the **user_id** to the End User **externalId** within Planhat for associated events. If a user with that **externalId** doesn't exist within Planhat, a user with that **externalId** is created. Make sure that the Amplitude **user_id** field matches the Planhat user **externalId** field to avoid user duplication.
- Relevant limits for Planhat events are:
  - Maximum size of event data: 1 MB
- Amplitude sends all user, event, and group properties along with the event.
- Note that because the Planhat Analytics endpoint is a “data sink”, it will always return status 200 (OK) even when there is an error in the payload. See Planhat’s [API documentation](https://docs.planhat.com/#response_codes) for details.

## Setup
See the [Planhat documentation](https://www.google.com/url?q=http://support.planhat.com/en/articles/7181975-setting-up-the-amplitude-integration%23h_87f475e94b&sa=D&source=docs&ust=1681362614710965&usg=AOvVaw2y7G6XhmQHzvEoK8v9w8fU) for more details.

### Prerequisites
To configure an Event Streaming integration from Amplitude to Planhat, you need the following information from Planhat:
- **Tenant Token:** To start sending data into Planhat, you first have to get your API Key. See the Planhat documentation for more help.

### Planhat setup

Please ensure that:
- Planhat End User, Company and/or Asset/Project **externalIds** match the corresponding ids in Amplitude
- You have your Tenant Token, so you can set up your integration from Amplitude

There are no other setup steps in Planhat.

### Amplitude setup

1. In Amplitude, navigate to **Data Destinations**, then find **Planhat - Event Stream**.
2. Enter a sync name, then click Create Sync.
3. Toggle Status from **Disabled** to **Enabled**.
4. Paste your **Tenant Token**.
5. Toggle the **Send events** filter to select the events to send. You can send all events, but Amplitude recommends choosing the most important ones.
6. Use the **Event Properties** filter to select which Event Properties you would like to send.
7. When finished, click Save.
8. Click on the **Mappings** tab.
9. Choose your user identifier and map other properties from Amplitude to Planhat. 
    1. **Note:** Once you have finished choosing the identifier, click Save.
    2. **Additionally:** you may specify "companyExternalId", which is advisable for example in the event that you have an End User associated with multiple companies, or if End User email domains do not always match Company Related Domains, necessitating creation of End Users from events
10. Once you have finished choosing the identifier, click **Save**.


### Use Cases

Bringing Amplitude data into Planhat enables you to act on product usage in the context of all the rest of your customer data. Is your Onboarding process leading to high adoption? Do EBRs lead to improved product usage? Is your training effective? Further, you can use Amplitude data proactively to drive your customer lifecycle forward, for example if a user disengages with the product, automatically drop them in an email sequence to educate them about recent product releases. 

- Creates balanced customer **health scores** and holistic **customer segments** by consolidating event data with other data types such as invoices, tickets, meetings, revenue, forecasts, CSM sentiment and more
- Creates and updates **sales opportunities** based on event signals such as elevated product usage
- **Triggers workflows** and actions in response to event data like user “logged In”, driving proactive & timely customer management
- Automates end user **email campaigns** based on event data like “last seen more than a week ago” and embedded analytics on email opens and clicks
- Visualises event data in **custom dashboards** directly shareable with customers via portals