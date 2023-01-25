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
- Enabling TTL affects your existing Amplitude reports. After TTL is set up, charts that query data outside the retention period that you have set are zeroed out. They appear as if the data for that period never existed within Amplitude.
- Amplitude Support can help you retrieve deleted data within **5 days** following the first time that you enable TTL. After the 5 days, your data is permanently deleted and irretrievable. To retrieve deleted data within the first 5 days after you enable TTL for the first time, [contact Amplitude Support](https://help.amplitude.com/hc/en-us/requests/new).

## Enable TTL 

To have TTL controls enabled for your organization, please reach out to your Account Manager at Amplitude or fill out a support request [here](https://help.amplitude.com/hc/en-us/requests/new).

## Configuring TTL for your Organization

The TTL feature is only accessible by Admins of your organization. You can find the controls in the Analytics Settings page in the “Time-to-Live” tab.

Admins can configure the retention period for the organization by number of months. By default, Amplitude sets a month to 30 days. For example, if you set your organization’s retention period to 4 months, it will retain all event data within the last 120 days. Once you have selected the retention period, you will see a modal which specifies details of how TTL works along with a second stage confirmation for setting up TTL at the organization. 

Once you confirm, deletion of your event data will start in 24 hours. In the case where you want to cancel TTL, Admins have the ability to rescind this request within this 24 hour period. After the 24 hour period passes, the deletion of events outside the retention window will begin. 

Note: The initial deletion process, in most cases, will take longer than daily deletions. Depending on an organization’s historical event volume, it may take up to 30 days.
