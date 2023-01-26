---
title: Time to Live 
description: Amplitude Data's Time-to-Live (TTL) feature lets you have control over how long event data stays in your Amplitude instance.
---

Amplitude Data's Time-to-Live (TTL) feature lets you have control over how long event data lives in your Amplitude instance. You set the retention period for event data in Amplitude at the Amplitude organization level. When TTL is enabled, a job runs daily to make sure that Amplitude retains your event data according to your organization's TTL policy.

!!!note "How Amplitude calculates retention period"

    Amplitude uses the date the event data reaches the Amplitude server when determining the retention period for event data and therefore any backfill or migration of event data may affect the retention period for that event data.

## Considerations

!!!warning "Irreversible data loss"

    After TTL is enabled, data outside of the retention period is deleted. Read these considerations before you get started with TTL. 

- The retention period can't be set for a subset of event data or a single project. The retention period is set at the **Amplitude Organization** level and impacts *all* event data. Using the TTL feature doesn't impact user data that you have sent to Amplitude.
- When you enabled TTL and set a retention period, Amplitude deletes all event data sent to Amplitude prior to your retention period.
- You can configure the retention period by number of months. Amplitude's default month is 30 days. For example, if you set your organization’s retention period to 4 months, all event data for the last 120 days is retained. 
- Enabling TTL affects your existing Amplitude reports. After TTL is set up, charts that query data outside the retention period that you have set are zeroed out. They appear as if the data for that period never existed within Amplitude.
- The initial deletion may take longer than daily deletions. Depending on an organization’s historical event volume, it may take up to 30 days.
- Amplitude Support can help you retrieve deleted data within **5 days** following the first time that you enable TTL. After the 5 days, your data is permanently deleted and irretrievable. To retrieve deleted data within the first 5 days after you enable TTL for the first time, [contact Amplitude Support](https://help.amplitude.com/hc/en-us/requests/new).

## Enable TTL 

To have TTL controls enabled for your organization, reach out to your Account Manager at Amplitude or fill out a [support request](https://help.amplitude.com/hc/en-us/requests/new).

## Configure TTL for your organization

Amplitude admins can configure TTL. 

1. Navigate to **Analytics Settings** and select the **Time-to-Live** tab.
2. Choose the retention period.
3. Confirm your changes.

After you confirm, deletion of your event data starts in 24 hours. It may take up to 30 days for the initial deletion. 

!!!warning "Canceling TTL"

    If you want to cancel TTL, an admin can rescind the request in the 24 hour period before data deletion begins. After 24 hours, the deletion begins and is irreversible.
