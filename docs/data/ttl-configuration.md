---
title: Time to Live 
description: Amplitude Data's Time-to-Live (TTL) feature lets you have control over how long event data stays in your Amplitude instance.
---

Amplitude Data's Time-to-Live (TTL) feature allows you to have control over how long event data lives in your Amplitude instance by letting you set the retention period for your Amplitude event data at the Amplitude Organization level. When TTL is enabled, a job runs daily to make sure that the event data that you send to Amplitude is retained according to the TTL policy set up by your organization.

!!!note "How Amplitude calculates retention period"

    Amplitude uses the date the event data reaches the Amplitude server when determining the retention period for event data and therefore any backfill or migration of event data may affect the retention period for that event data.

## Considerations

!!!warning "Irreversible data loss"

    After TTL is enabled, data outside of the retention period is deleted. Read these considerations before you get started with TTL. 

- The retention period can't be set for a subset of event data or a single project. The retention period is set at the **Amplitude Organization** level and impacts *all* event data. Using the TTL feature doesn't impact user data that you have sent to Amplitude.
- When you enabled TTL and set a retention period, Amplitude deletes all event data sent to Amplitude prior to your retention period.
- Enabling TTL affects your existing Amplitude reports. After TTL is set up, charts that query data outside the retention period that you have set are zeroed out. They appear as if the data for that period never existed within Amplitude.
- Amplitude Support can help you retrieve deleted data within **5 days** following the first time that you enable TTL. After the 5 days, your data is permanently deleted and irretrievable. To retrieve deleted data within the first 5 days after you enable TTL for the first time, [contact Amplitude Support](https://help.amplitude.com/hc/en-us/requests/new).

## Enable TTL 

To enable or disable TTL, reach out to your Account Manager at Amplitude or fill out a support request [here](https://help.amplitude.com/hc/en-us/requests/new).