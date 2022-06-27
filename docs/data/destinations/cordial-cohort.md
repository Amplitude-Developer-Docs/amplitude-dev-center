---
title: Send Cohorts to Cordial
description: Use this integration to send Amplitude cohorts to Cordial lists. 
---

!!!beta
    
    This integration is in open beta, and is still in active development. If you have any feedback to help improve this destination and or its documentation, [contact the Cordial support team](https://cordial.com/contact-us/).

[Cordial](https://cordial.com/) is a customer engagement and data platform that unifies real-time data from anywhere in your technology stack, so you can engage with your customers in more personalized ways across email, SMS, mobile app, and more.

This cohort integration allows you to sync users from Amplitude cohorts to Cordial lists. Using lists along with other contact data in Cordial, you can create dynamic segments of contacts for sending messages, searching contacts, and filtering analytics reports.

## Considerations

## Setup

### Cordial setup

1. Navigate to the [Cordial's Portal](https://admin.cordial.io/).
2. Create an API Key in Cordial following the [instructions](https://support.cordial.com/hc/en-us/articles/115005365087).

### Amplitude setup

1. In Amplitude, navigate to **Data Destinations**, then find **Cordial - Cohort**.
2. Enter Name and Cordial API Key.
3. Reach out to your Cordial CSM to get your Amplitude service URL and paste it into the Endpoint field.
4. Enter the name of your contact identifier in Cordial into the Contact identifier name field. Users are identified by this key in Cordial. For example, "email".
5. In the Contact identifier mapping dropdown, select a user property name. The value is passed as the value for the contact identifier.
6. Save the destination.

After a cohort is synced, the contacts are added to a list in Cordial. The list name is the cohort name in Amplitude with spaces removed. For example, when the "active users" cohort with 10 users is synced to Cordial, you see 10 contacts added to the `activeusers` list. When a user is removed from a cohort and the cohort is synced, the contact is removed from the list. Refer to [Cordial's lists](https://support.cordial.com/hc/en-us/articles/115005528428) article for details on using lists.
