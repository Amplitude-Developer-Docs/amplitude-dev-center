---
title: Import CleverTap Retention Events
description: Use this integration to import CleverTap retention data into Amplitude for holistic analysis.
---

[CleverTap](https://clevertap.com/) is a modern, integrated retention cloud that empowers digital consumer brands to increase customer retention and lifetime value. With this integration, you can ingest event data from CleverTap into Amplitude for further analysis.

!!!note "Other Amplitude + CleverTap integrations"

    Amplitude offers other integrations with CleverTap: 

    - [Send Amplitude Cohorts to CleverTap](/data/destinations/clevertap-cohort)

## Considerations

- CleverTap Integration lets you select the region where you have implemented Amplitude: Standard or EU. Contact the [Amplitude support team](https://help.amplitude.com/hc/en-us/requests/new) if you don't know which data center you are on.
- This feature is available to users on the CleverTap Enterprise plan.

## Setup

### Amplitude setup

Copy the Amplitude API key for your project.

There are no other setup steps in Amplitude. 

### CleverTap setup

1. In your CleverTap dashboard, navigate to **Settings > Engage > Partners**.
2. Hover over **Amplitude**, and click **Integrate**.
3. Enter your Amplitude API key.
4. Select the Data Center Region (Standard, EU) corresponding to the region where you have implemented Amplitude.
5. Specify Amplitude User ID Mapping (Identity, Phone, or Email).
6. Select Amplitude Device ID Mapping (None or CleverTap).
7. Save your work.

See [CleverTap's documentation](https://docs.clevertap.com/docs/amplitude-export) for full instructions and references.

After you've finished creating the integration, set up an [export](https://docs.clevertap.com/docs/amplitude-export#create-new-export).
