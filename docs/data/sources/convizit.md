---
title: Import Convizit Event Data
description: Import detailed event data from Convizit.
---

[Convizit](https://convizit.com/) captures every click on every on-page element and sends this data directly into Amplitude, with the events already named, structured, and enriched with relevant properties. Convizit's direct integration with Amplitude allows you realize the full potential of the platform within days of deployment, with zero manual effort required.
<!-- vale off-->
For any issues with the Convizit event source, contact Convizit's support team at <support@convizit.com>
<!-- vale on-->

## Considerations

- Convizit sends data into Amplitude about one time every 30 minutes.
- To pause data delivery into Amplitude, inform your Convizit account manager.
- This integration is available for customers who have trial or paid plans with both Convizit and Amplitude.

## Setup

1. Give your Convizit account manager your Amplitude Org ID, Project name and API key.
2. Convizit delivers your user behavior data into Amplitude.

## Check for Convizit events

You can see the events arriving from Convizit in Amplitude in the User Look-Up page. If you also have other sources of event data in Amplitude, follow these steps to confirm that events from Convizit's are arriving in Amplitude:

1. Navigate to the User Look-Up page and click a recent User ID.
2. Scroll down into the Event Stream area and click the Raw button.
3. Convizit events have `"source": "Convizit"` in the JSON code. 

## Amplitude fields populated by Convizit

For more technical users familiar with Amplitude, here are the specific fields that Convizit populates in Amplitude for each delivered event: 

|<div class="big-column">Field</div>| Description|
|-------|------|
|`insert_id`| Convizit's unique identifier of the event|
|`user_id`|Convizit's unique identifier of the website visitor|
|`time`|Timestamp of the event|
|`event_type`|The name of the event. For example, "Add to cart", "Size chart click".|
|`event_properties`|An array of customizable event-specific properties as key:value pairs. For example "Add to cart" event properties might include "Product name", "Product price", "Selected color" and "Quantity"|
|`user_properties`|An array of key:value pairs when available: `customerId`, `GoogleId`, `FacebookId`|
|`plan.source`| Equal to "Convizit" (allows identifying and segmenting Convizit-delivered data in Amplitude reports and analyses)|

These fields are available by default. They can be removed upon request: 

|Field| Description|
|---|------|
|`platform`|Platform of the user's device|
|`os_name`|The name of the mobile operating system or browser|
|`os_version`|The version of the mobile operating system or browser|
|`device_brand`|The brand of the user's device|
|`ip`|The user's IP address|
|`country`|Automatically populated by Amplitude if IP address is available.|
|`region`|City.|
