---
title: Extole Event Streaming
description: Send Amplitude events to Extole campaigns automatically with just a few clicks.
---

!!!beta

    This feature is in open beta and is in active development. Contact your Extole Client Success Manager or the [Extole support team](mailto:support@extole.com) for support with this integration.

[Extole](https://www.extole.com/) is the Customer-Led Growth platform. With Extole, marketers fight skyrocketing paid media costs by turning their customers into a primary vehicle for acquisition, awareness, and activation. With Extole's SaaS platform and experts, marketers launch programs such as refer-a-friend, friends & family, and challenges, personalized to behavioral segments. Customer-Led Growth drives revenue and generates an important and unique source of first-party data. 

This integration allows Amplitude events to automatically flow into your Extole campaigns. After you've configured your Extole campaigns and the Amplitude integration, you can view a live stream of events using Extole's [Event Live View](https://my.extole.com/events/live). Amplitude events can then be used to trigger emails, fulfill rewards, create audiences, and track user activity within the Extole platform.

## Considerations

Keep these things in mind when sending events to Extole:

- You must enable this integration in each Amplitude project you want to use it in.
- To create and unify user records in Extole, you must map the Amplitude `user_id` property to the users email address in Extole. Extole strongly recommends that you implement a secondary `user_id` mapping using the `unique_id` property, which is a typically a numeric string value for how you identify a unique user in your system. If a user has a `unique_id` or email that doesn't exist in Extole, a new user is created.
- Amplitude sends selected user, event, and group properties with the event.

## Limits

- Extole doesn't have hard limits on quantity or velocity. If you send requests too quickly, they may be throttled and return a 429 response. Amplitude retries to send throttled events automatically, which resolves the temporary throttling.
- Requests must be smaller than 2MB.

## Setup

For more information on setting up this integration, see the [Extole](https://docs.extole.com/docs) documentation.

### Prerequisites

You need the following to enable this integration:

- You must have an Extole account. Contact [Extole](mailto:hello@extole.com) to learn more.

### Extole setup

Create an access token in Extole. You need this to complete the Amplitude setup.

1. In your My Extole account, navigate to the  [Security Center](https://my.extole.com/security-center). 
2. Click **+ New Access Token** and verify your identity. 
3. Name the token and click **Create**.  
4. Copy your token before navigating away from the page.

See the [Extole documentation](https://dev.extole.com/reference/client-api-overview) for more help generating a token.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Event Streaming section, click **Extole**.
3. Toggle Status to **Enabled**.
4. In **REST API Key**, paste your Extole access token. 
5. Toggle the Send events filter to select the events to send. You can send all events, but Amplitude recommends choosing the most important ones.
6. Choose your user identifier to map to other properties from Amplitude to Extole.
6. Use the Event Properties filter to select which event properties you want to send.
7. When finished, save the destination.

## Use cases

**Turn Customers into a vehicle for growth and acquisition**: Automatically send Amplitude events and audiences to power personalized Refer-a-Friend programs that leverage your existing customers to help gain new ones on your behalf. 

**Activate and un-stick customers**: Automatically send Amplitude events and audiences to power Challenges, which use rewards to motivate your customers to take certain actions depending on where they are in their customer journey.

**Build loyalty with better customer experiences**: Automatically send Amplitude events and audiences to power programs such as Surprise-and-Delight and Friends-and-Family to thank and build brand loyalty with your VIPs and super-users.
