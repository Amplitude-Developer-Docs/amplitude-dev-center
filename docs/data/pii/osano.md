---
title: Manage Personal Data with Osano
description: Connect Osano and Amplitude to automatically classify personal data stored in Amplitude.
---

[Osano](https://www.osano.com/) is an easy-to-use data privacy platform that helps you keep your website compliant with laws such as GDPR and CCPA. Osano monitors all the vendors you share data with so you don't have to.

Osano connects to Amplitude via a one-click integration. Osano then discovers and automatically classifies the personal data stored in Amplitude. After discovery and classification are finished, you can include Amplitude in searches related to subject rights requests.

!!!info

    If you have any feedback to improve or suggestions around this documentation or integration, please contact [Osano's support team](https://www.osano.com/company/contact). 

## Considerations

- You need an Osano Enterprise plan to use this integration.

## Setup

### Amplitude setup

Copy the Amplitude API key and Secret Key for your project. There are no other setup steps in Amplitude.

### Osano setup

See the [Osano documentation](https://docs.osano.com/data-field-classificaiton-categories) for details and instructions.

1. Log in to the Osano Portal.
2. From the **Data Discovery** menu, open the **Data Stores** page.
3. Click **+** to add a new data store.
4. Click **Connect to third-party vendors to enable automated data discovery**.
5. Select **Amplitude** from the dropdown menu.
6. Paste the Amplitude API Key into the **API Key field**.
7. Paste the Amplitude Secret Key into the **Secret Key field**.
8. Select a **Data Store Owner** from the dropdown menu.
9. Save when finished.

When you save, Amplitude and Osano immediately begin syncing to detect PII. Manage this information from Osano.

--8<-- "includes/abbreviations.md"