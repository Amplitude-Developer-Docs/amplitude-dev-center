---
title: Send Cohorts to WebEngage
description: Sync cohorts from Amplitude to WebEngage
---

!!!beta

    This integration is currently in beta and is in active development. If you have any feedback to improve the WebEngage destination or have suggestions for their documentation, please contact [WebEngage support team](https://webengage.com/). 

[Webengage](https://webengage.com/) is a user engagement and retention platform which enables you to send personalized marketing communications across 12+ channels, including email, push notification, WhatsApp, and more.

!!!tip

    This integration is maintained by WebEngage. Contact the WebEngage support team for support with this integration.

## Considerations

- This integration is only available for customers who have paid plans with Amplitude.
- You must enable this integration in each Amplitude project you want to use it in.
- Amplitude matches the user_id to the id within WebEngage to associated events. If a user with that id doesn't exist within WebEngage, a user is created. Make sure that the Amplitude user_id field matches the WebEngage id field to avoid user duplication.

## Setup

### WebEngage setup

1. In WebEngage, navigate to Settings > Integrations > Amplitude.
2. Copy the API key to your clipboard.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **WebEngage**.
3. Enter **Name** and paste in the **API** key you copied from **WebEngage**.
4. Select the Amplitude properties that map to WebEngage's email.
5. Save when finished.


## Send a cohort

To sync your first cohort, follow these steps:

1. In Amplitude, open the cohort you want to sync, then click **Sync**.
2. Select **WebEngage**, then click **Next**
3. Choose the account you want to sync to
4. Choose the sync cadence.
5. When finished, save your work.

### Use Cases

With WebEngage and Amplitude Integration, product teams can:
1) **Personalized Messaging:** You can create segments or cohorts in Amplitude based on specific user behaviors or attributes. For example, you can create a cohort of users who have abandoned their shopping carts. By sending this cohort to WebEngage, you can trigger personalized cart abandonment emails or push notification campaigns to encourage them to complete their purchase.
2) **Behavior-Based Campaigns:** Use Amplitude's behavioral data to identify users who have taken specific actions, such as signing up, making a purchase, or achieving a certain engagement level. Sending these cohorts to WebEngage allows you to tailor campaigns that acknowledge their actions and encourage further engagement. For instance, you could send a congratulatory email to users who have reached a milestone within your app.
3)** Cross-Channel Consistency:** With WebEngage's support for multiple communication channels, you can use Amplitude's cohorts to ensure consistent messaging across various touchpoints. For instance, if a user has shown interest in a specific product category through their behavior, you can send them relevant product recommendations through email, push notifications, and other channels simultaneously.



