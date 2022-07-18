---
title: Import Leanplum Events
description: Import Leanplum marketing activity to Amplitude. 
---

[Leanplum](https://www.leanplum.com/about-us/) helps mobile teams orchestrate multi-channel campaigns from messaging to the in-app experience, all from a single mobile marketing platform.

By using this integration, teams can leverage Amplitude's analytics capabilities with Leanplum's marketing automation tools to drive better audience engagement. 

!!!note "Send Amplitude cohorts to Leanplum"

    See [Send Cohorts to Leanplum](/../data/destinations/leanplum-cohort) for information on how to import events from Leanplum into Amplitude.

## Setup

### Amplitude setup

1. In Amplitude, navigate to **Settings > Projects** and select the relevant project.
2. On the **General** tab, locate the API key and copy it.

### Leanplum setup

1. In the Leanplum dashboard, navigate to the **Data Control tab** and select **Integrations**.
2. Search for Amplitude from the list, and click **Configure Integration**.
3. In the Output section, paste your Amplitude project's API key into the **Token box**.
4. From the dropdown menu, specify if you would like to send events from Leanplum into Amplitude's US data center or EU data center.
5. Click **Save**.

See to [Leanplum's documentation](https://radar.com/documentation/integrations/amplitude) for more information around sending events from Leanplum into Amplitude.
