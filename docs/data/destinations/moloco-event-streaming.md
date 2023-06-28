---
title: Moloco Event Streaming
description: Stream Amplitude events to Moloco.
---

[Moloco](https://www.linkedin.com/company/moloco/) is a machine learning company that provides performance solutions for digital advertising. Their products include the Moloco Cloud DSP for mobile advertising and the Moloco Retail Media Platform for online retailers. Both products are powered by Moloco's machine-learning engine, which optimizes campaigns and provides personalized recommendations to customers.

This integration lets you stream events and event properties from Amplitude to Moloco.

## Considerations

Keep these things in mind when sending events to Moloco:

- You must enable this integration in each Amplitude project you want to use it in.
- You need a Moloco account to enable this integration.
- Amplitude matches the **User_id** to the ID field within Moloco to associated events. If a user with that id doesn't exist within Moloco, a user is created. Make sure that the Amplitude **User_id** field matches the Moloco **Identity ID** to avoid user duplication.
- Amplitude sends all user properties along with the event.

## Setup

### Prerequisites

To configure an Event Streaming integration from Amplitude to Moloco, you need the following information from Moloco:

- **REST API Key:** To start sending data into Moloco, you first have to get your API Key. It is used to authenticate your requests to the API and connect the data with your account. Find this in your Moloco 

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Event Streaming section, click **Moloco**.
3. Enter a sync name, then click **Create Sync**.
4. Toggle Status from **Disabled** to **Enabled**.
5. Paste your **REST API Key** and **Platform ID**.
6. Toggle the **Send events**.
7. In **Select and filter events** choose which events you want to send. Choose only the events you need in Moloco. *Transformed events aren't supported.*
8. Under **Map properties to destination**, choose your user identifier and map specific Amplitude properties from Amplitude to Moloco.
9. When satisfied with your configuration, click **Save**.

## Use Cases

1. **Real-time User Segmentation:** By sending streaming data from Amplitude, which is a comprehensive analytics platform, to Moloco, you can create real-time user segments based on various attributes and behaviors. This enables you to target specific user groups with personalized advertisements and optimize campaign performance accordingly.
2. **Dynamic Ad Creative Optimization:** By integrating Amplitude's streaming data with Moloco's machine learning engine, you can leverage real-time user insights to dynamically optimize ad creative elements. This includes dynamically adjusting ad content, images, offers, and calls to action based on user preferences and behaviors, resulting in more engaging and effective advertisements.
3. **Behavioral Retargeting:** Amplitude captures user behavior data across various touchpoints, providing valuable insights into user engagement and conversion patterns. By streaming this data to Moloco, you can implement behavioral retargeting strategies, where users who have shown specific behaviors or indicated interest in certain products or services are retargeted with relevant ads across different channels and devices.
