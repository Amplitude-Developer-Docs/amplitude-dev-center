---
title: Import Split Data
description: Use this integration to send traffic impression data from Split to Amplitude. Impressions are sent as events and mapped according to the configuration settings.
---

Use this integration to import traffic impression data from Split. Impressions are sent as events and mapped according to the configuration settings.

See more detailed instructions in the [Split documentation](https://help.split.io/hc/en-us/articles/360046658932-Amplitude).


!!!note "Send Amplitude cohorts to Split"

    See [Send Cohorts to Split](/../data/destinations/split-cohort) for more information.

### Amplitude setup

Copy your Amplitude project's API Key and secret. There are no other setup steps in Amplitude.

### Split setup

1. Go to Admin settings, click **Integrations**, select your workspace, and navigate to the marketplace. 
2. Find Amplitude and click **Add**.
3. Select the environment(s) from where you would like data sent and then select how you want to map Split traffic types to Amplitude identities. You can select either `user_id` or `device_id`.
4. Split impressions are shown as `get_treatment` in Amplitude by default. You can customize this event name, with a limit of 1,024 characters.
5. Paste your Amplitude API key and secret.
6. Save your work. 

After you save the configuration, you can send a test event from Split into Amplitude.

Repeat this process for every environment and traffic type you want to configure.