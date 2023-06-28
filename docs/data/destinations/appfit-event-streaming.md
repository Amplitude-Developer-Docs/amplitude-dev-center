---
title: Appfit Event Streaming
description: Stream Amplitude events to Appfit.
---

[Appfit](https://www.appfit.io/) integrates with Amplitude to help teams stay on top of their key business metrics. Successful teams look at their app metrics on a consistent basis and use that data to make decisions about their business.

Connect AppFit to your Amplitude account and get a top-level dashboard for your mobile phone. as well as weekly reminders to review your metrics. If you see a metric that doesn't look right, AppFit lets you flag it and add comments so everyone can discuss what's going on right from their phone.

This integration lets you stream events and event properties from Amplitude to Appfit.

## Considerations

Keep these things in mind when sending events to Appfit:
- You must enable this integration in each Amplitude project you want to use it in.
- You need an AppFit account to enable this integration.
- Amplitude sends selected user, event, and group properties along with the event.

## Setup

### Appfit Setup

- To configure an Event Streaming integration from Amplitude to Appfit, you need the **Server Secret Key** from Appfit.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Event Streaming section, click **Appfit**.
3. Enter a sync name, then click **Create Sync**.
4. Toggle Status from **Disabled** to **Enabled**.
5. Paste your **Server Secret Key**.
6. Toggle the **Send events**.
7. In **Select and filter events** choose which events you want to send. Choose only the events you need in Appfit. *Transformed events aren't supported.*
8. (optional) In **Select additional properties**, select any more user properties you want to send to Appfit. If you don't select any properties here, Amplitude doesn't send any.
9. When satisfied with your configuration, click **Save**.

## Use Cases

1. **Early Stage Teams:** AppFit helps early-stage teams by providing:
    - Weekly metrics reviews for quick progress assessment.
    - Team goal setting and progress tracking for alignment and focus.
    - Data automation from various sources to save time on data entry.
2. **Mature Development Teams:**  AppFit supports mature development teams by offering:
    - Focused metrics tracking to monitor specific product or business metrics.
    - Customized goal setting for tailored objectives.
    - Progress visualization for data-driven decision-making.
3. **High-Level Executives:** AppFit benefits high-level executives by:
    - Providing a weekly business overview with key metrics and trends.
    - Enabling goal tracking at a glance across departments or business units.
    - Offering timely reminders and notifications to make informed decisions.
