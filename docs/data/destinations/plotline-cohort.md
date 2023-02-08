---
title: Send Cohorts to Plotline
description: Send Amplitude cohorts to Plotline for use in in-app nudges with just a few clicks.
---

!!!beta 

    This feature is in open beta and is in active development. Contact the [Plotline support team](https://www.plotline.so/) for support with this integration.

[Plotline](https://www.plotline.so/) enables Product and marketing teams to configure in-app nudges to improve feature adoption and drive conversions. Fully no-code.

## Considerations

Keep these things in mind when sending events to Plotline:

- You must enable this integration in each Amplitude project you want to use it in.
- You need a paid Plotline plan to enable this integration.
- Amplitude matches the `user_id` to the ID within Plotline to associated events. If a user with that id doesn't exist within Plotline, a user is created. Make sure that the Amplitude `user_id` field matches the Plotline ID field to avoid user duplication.

## Setup

For more information on setting up this integration, see the [Plotline documentation](https://docs.plotline.so), under the "Integrations" section.

### Prerequisites

To configure your Cohort integration from Amplitude to Plotline, you need the following information from Plotline:

- API Key: To start sending data into Plotline, you first have to get your API Key. See the [Plotline documentation](https://docs.plotline.so) for more help.

### Amplitude setup

1. In Amplitude Data, navigate to **Destinations**, then find **Plotline - Cohort**.
2. Add your Plotline API key.
3. Enter a name.
4. Map the Amplitude User ID.
5. Save your work.

## Use cases

1. Improve feature adoption by using slideouts, hotspots, tooltips and more to drive adoption of new features.
2. Activate more users and personalize onboarding flows to guide new users to their "aha moment" faster.
3. Launch in-app surveys targeted to specific user cohorts based on their activity.