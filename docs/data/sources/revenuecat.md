---
title: Import RevenueCat Subscription Events
description: Integrate RevenueCat with Amplitude to connect customer lifecycle events and revenue data from your app to find patterns in customer behavior and inform marketing strategies.
---

[RevenueCat](https://www.revenuecat.com/) provides subscription infrastructure for mobile apps. It allows developers to deploy cross-platform subscriptions, manage products and subscribers, and analyze customer data without managing servers or writing backend code.

Use this integration to create a behavioral cohort of customers based on specific actions, like performing an event after subscribing, or measure the path of a user from viewing marketing content to subscribing.

## Considerations

- For complete information on the kinds of events sent by RevenueCat, see the [RevenueCat documentation](https://docs.revenuecat.com/docs/amplitude).
- If you have any feedback about the RevenueCat source and its documentation, reach out to RevenueCat's[community forum](https://community.revenuecat.com/) or [RevenueCat Support team](mailto:support@revenuecat.com).

## Setup

### Amplitude setup

Before you begin, you need your Amplitude project API key. 

If you're using an Amplitude SDK, set user ID to match the RevenueCat user ID to match users. See [RevenueCat's documentation](https://docs.revenuecat.com/docs/amplitude#setup) for detailed instructions. 

### RevenueCat setup

1. In RevenueCat, navigate to your project in the dashboard and find the **Integrations** card in the left menu.
2. Choose Amplitude from the Integration Menu.
3. Enter your Amplitude API key.
4. Name the events that RevenueCat sends, or choose to use default event names.
5. Choose whether you want RevenueCat to report proceeds (after app store cut) or revenue (gross sales).
6. When finished, select **Add Integration**.

See detailed instructions for this integration in the [RevenueCat documentation](https://docs.revenuecat.com/docs/amplitude).
