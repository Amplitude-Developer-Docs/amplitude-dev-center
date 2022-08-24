---
title: Import Adobe Analytics Data
description: Import Adobe Analytics data directly into Amplitude without any complicated engineering work. 
---

With Amplitude's Adobe Analytics integration, you can import your Adobe Analytics data directly into Amplitude, without any engineering work. Dive deeper into your Adobe-generated customer and product data, give your data governors more self-service control, and connect customer behavior across devices and channels. Your teams can go beyond single-device pageview data and see a detailed, cross-platform view of all customer behavior.

This integration also gives your team better visibility into how raw data comes into your analytics system from various sources. This visibility comes in handy for not only planning and analyzing data, but also maintaining control, compliance, and privacy.

This article helps guide you through the process of ingesting Adobe data into Amplitude.

## Considerations

- This feature is available to customers on the [Enterprise, Growth, and Scholarship](https://amplitude.com/pricing) plans.
- We suggest reading this [blog post on how Adobe and Amplitude work together](https://amplitude.com/blog/adobe-customers-can-see-user-behavior-with-amplitude). You may also want to go over our [Data Taxonomy Playbook](https://help.amplitude.com/hc/en-us/articles/115000465251-Data-Taxonomy-Playbook) before getting started.
- Amplitude maps Adobe data like this: 
    - For `event_type,` Amplitude looks up the events in the Adobe event list and compares it to a lookup table where the event names are defined.
    - `user_id:` Amplitude uses `postvisidhigh` or, if that's not available, `postvisidlow`.
    - `device_id`: Amplitude uses `custvisid`.
    - User properties aren't synced in this integration. 
    - Amplitude receives data with the Adobe field names (for example, event1, event2, event3...). For that reason, we advise customers to add display names for events in [Project Advanced settings.](https://help.amplitude.com/hc/en-us/articles/360035522372-Manage-Data#h_853f3eb1-af85-48ca-980d-2268c0674fa7)

## Set up and use the integration

!!!tip "Use a test project"

     We highly recommend creating a test project or a dev environment for each production project in order to test your instrumentation.

To integrate Amplitude with Adobe Analytics, follow these steps:

1. Open or create the project where you'd like to use your Adobe Analytics data. Then click **Data Sources**.
2. Click **I want to import data into Amplitude**, then click **Adobe Analytcs**.
3. Follow the on-screen instructions. 
4. On the *Enable Data Source* tab, enter a name and description for this data source, and confirm your event mapping preferences.
5. When you're done, click *Save Source*. Then click *Finish*.

You should now see Adobe Analytics in your list of data sources.

To view the daily events uploaded chart, click on the Adobe Analytics data source.
