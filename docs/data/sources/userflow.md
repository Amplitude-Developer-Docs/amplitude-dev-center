---
title: Import Userflow Onboarding Event Data
description: The Userflow integration streams Userflow-generated onboarding events (such as Flow Started and Checklist Task Completed) to Amplitude. You can then analyze your users' onboarding behavior together with the rest of your product events.
---

!!!beta

    The Userflow integration is in beta, and is still in active development. To join their beta program, or if you have any feedback to help improve the Userflow Destination and its documentation, [contact the Userflow support team](mailto:support@userflow.com).

[Userflow](https://userflow.com) enables your whole team to build in-app product tours, checklists, surveys, resource center and more. No coding skills required.

This integration streams Userflow-generated events (such as Flow Started and Checklist Task Completed) to Amplitude. You can then analyze your users' onboarding behavior together with the rest of your product events.

!!!note "Other Amplitude + Userflow integrations"

    This integration imports Userflow data into Amplitude. Amplitude offers other integrations with Userflow: 

    - [Send Cohorts to Userflow](/data/destinations/userflow-cohort)

## Considerations

- This integration connects a single Userflow environment and a single Amplitude project. You should use separate testing and production environments to prevent test data from skewing production data. 
- If you have both a staging and a production environment, follow the setup steps for both staging and production. Start with your staging environment, and verify that it works as you expect before connecting your production environment.

## Setup

### Amplitude setup

Copy the API key for the Amplitude project you want to connect.

There are no other setup steps in Amplitude. 

### Userflow setup

!!!tip
    Contact the [Userflow Support team](mailto:support@userflow.com) if you have any questions about this integration.

For complete setup instructions, see the [Userflow](https://userflow.com/docs/integrations/amplitude) documentation.
