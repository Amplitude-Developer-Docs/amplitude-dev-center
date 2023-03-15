---
title: Event Streaming Overview
description: Send Amplitude data to other tools in your stack with just a few clicks, using no-code event streaming integrations. 
---

Event streaming lets you send the data in Amplitude across your stack. With event streaming, you can use the rich behavioral data in Amplitude to enrich customer profiles and stream data to marketing, sales, and infrastructure tools.

Event streaming includes powerful, no-code, configuration-based tools that give fine-grained control over the data you send. Filter by user, group, and event properties to control what you forward to your other tools. You can also see important metrics like event volume, end-to-end latency, and detailed Delivery Issue information to understand the performance and health of your integration. 

## Considerations

- Amplitude event streaming currently only supports raw (untransformed) events, event properties, and user properties. Transformed events and properties (such as merged properties) can't be sent.
- The following keywords can't be used as event names when streaming events from Amplitude:
    - _all
    - _identify
- Amplitude tracks event volume as distinct events streamed out. The same event going to multiple event streaming destinations is only counted once for billing purposes.
- For latency, Amplitude is targeting an end-to-end p95 latency of 60s. This means 95% of Events streamed must be delivered within 60s or less. We have internal processes, monitors, and alerts in place to monitor and maintain this target.

## Event streaming destinations

--8<-- "includes/data-destinations-event-streaming.md"
