---
title: Send Cohorts to Pushwoosh
description: Sync cohorts from Amplitude to Pushwoosh
---

!!!beta

    This integration is currently in beta and is in active development. If you have any feedback to improve the Pushwoosh destination or have suggestions for their documentation, please contact [Pushwoosh support team](https://Pushwoosh.com/). 

[Pushwoosh](https://Pushwoosh.com/) is a user engagement and retention platform which enables you to send personalized marketing communications across 12+ channels, including email, push notification, WhatsApp, and more. This integration lets you sync cohorts from Amplitude to Pushwoosh. Now you can track user behavior in Amplitude, and then send them relevant email campaigns in Pushwoosh.

## Considerations

- This integration is only available for customers who have paid plans with Amplitude.
- You must enable this integration in each Amplitude project you want to use it in.
- You must have a paid Pushwoosh plan to enable this integration.
- Pushwoosh only accepts email addresses as the identifier. This means the User_ID or user property you select in Amplitude must contain an email address.

## Setup

### Pushwoosh setup

1. In Pushwoosh, navigate to Settings > Integrations.
2. Click “Add integration”, then find and add Amplitude.
3. Copy the API Key and AppCode to your clipboard.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Pushwoosh**.
3. Click **Add another destination**.
4. Enter **Name** and paste in the **API** key you copied from **Pushwoosh**.
5. Map the Amplitude User ID field to the Pushwoosh User ID field
6. Save when finished.

## Send a cohort

To sync your first cohort, follow these steps:

1. In Amplitude, open the cohort you want to sync, then click **Sync**.
2. Select **Pushwoosh**, then click **Next**
3. Choose the account you want to sync to
4. Choose the sync cadence.
5. When finished, save your work.

### Use cases

1. **Personalized Push Notifications:** By sending cohorts from Amplitude to Pushwoosh, you can create personalized push notification campaigns based on specific user behaviors or characteristics. For example, you could target users who have recently completed a certain action in your app, such as making a purchase, with a personalized thank-you message or exclusive offer.
2. **User Retention Campaigns:** Identify cohorts of users who are at risk of churning based on their behavior patterns in Amplitude. You can then use Pushwoosh to send targeted re-engagement campaigns to these users, offering them incentives or reminding them of the value your app provides.
3. **A/B Testing of Push Messages:** You can use cohorts to split your audience and perform A/B tests on different push notification messages to understand what resonates better with specific segments of your user base. This can help optimize the content and timing of your push notifications for maximum impact.
