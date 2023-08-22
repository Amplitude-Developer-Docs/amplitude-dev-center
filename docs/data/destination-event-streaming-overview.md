---
title: Event Streaming Overview
description: Send Amplitude data to other tools in your stack with just a few clicks, using no-code event streaming integrations. 
---

Event streaming lets you send the data in Amplitude across your stack. With event streaming, you can use the rich behavioral data in Amplitude to enrich customer profiles and stream data to marketing, sales, and infrastructure tools.

Event streaming includes powerful, no-code, configuration-based tools that give fine-grained control over the data you send. Filter by user, group, and event properties to control what you forward to your other tools. You can also see important metrics like event volume, end-to-end latency, and detailed Delivery Issue information to understand the performance and health of your integration. 

## Considerations

- Amplitude event streaming currently only supports raw (untransformed) events, event properties, and user properties. [Transformed](https://help.amplitude.com/hc/en-us/articles/5913315221915-Transformations-Retroactively-modify-your-event-data-structure) events and properties (such as merged properties) can't be sent.
- The following keywords can't be used as event names when streaming events from Amplitude:
    - _all
    - _identify
- Amplitude tracks event volume as distinct events streamed out. The same event going to multiple event streaming destinations is only counted once for billing purposes.
- For latency, Amplitude is targeting an end-to-end p95 latency of 60s. This means 95% of Events streamed must be delivered within 60s or less. We have internal processes, monitors, and alerts in place to monitor and maintain this target.
- Amplitude's streaming integrations are designed to transmit data from the point of event streaming setup onwards. Historical data is not included in this process, meaning that only events captured after the event streaming configuration will be included in the transmission.

## FAQs

### What is the difference between Cohort syncing and Event Streaming?

- **Cohort Syncing** provides a valuable mechanism for syncing cohort membership data from Amplitude to third-party tools such as SFMC or Braze. This empowers you to delve into behavioral targeting and comprehensively analyze the effects of your targeting strategies. However, it's important to note that Cohort Syncing primarily focuses on data synchronization and behavioral analysis, without involving the creation or maintenance of users within the third-party tool.
- **Event Streaming**, on the other hand, goes beyond syncing cohorts. It facilitates user creation and management through the Amplitude UI. By setting up Event Streaming, you benefit from a single Amplitude instrumentation setup, allowing data and events to flow seamlessly to various supported platforms. This eliminates the need for ongoing engineering adjustments. Additionally, Event Streaming provides precise control, allowing you to cherry-pick specific events, users, or properties for retention within the destination platform. This tailored approach ensures only relevant data reaches its intended target. Finally, Event Streaming unlocks the real-time potential of conversion events. For instance, in a scenario like SFMC, these events can serve as triggers within workflows or journey orchestrations. This strategic integration empowers the optimization of look-alike targeting, thereby augmenting the effectiveness of your initiatives.

### What are some examples of how customers are using Event streaming?

1. **Marco Polo:** Used Event Streaming to power a real-time 'Welcome' email campaign by streaming sign-up events from Amplitude to Braze.
2. **RefaceAI:** Utilized Amplitude's Kinesis Data Stream integration for real-time event piping from mobile clients to back-end services. This avoided the complexity of building and maintaining a custom pipeline.
3. **Invoice Simple:** Leveraged Event Streaming for a robust engagement campaign, customizing messaging based on a series of events to enhance engagement effectiveness.

## Event streaming destinations

--8<-- "includes/data-destinations-event-streaming.md"
