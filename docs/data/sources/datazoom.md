---
title: Import Datazoom Video Events
description: Use this integration to send raw, standardized Datazoom video events to Amplitude. 
---

!!!beta

    This integration is currently in open beta and is still in active development.

Datazoom enables video publishers to better operate distributed architectures through centralizing, standardizing, and integrating data in real-time to create a more powerful data pipeline and improve observability, adaptability, and optimization solutions.

Use this integration to send raw, standardized Datazoom video events into Amplitude.

!!!tip

    This integration is maintained by Datazoom. Contact the [Datazoom support team](mailto:support@datazoom.io) with any questions about this integration.

### Setup

### Amplitude setup

Copy the Amplitude API key for your project. There are no other setup steps in Amplitude.

### Datazoom setup

See the [Datazoom documentation](https://help.datazoom.io/hc/en-us/articles/360046468532-Amplitude) for more details and instructions.

1. In Datazoom, navigate to **Settings**.
2. Create an Amplitude Connector in your [Datazoom account](https://app.datazoom.io/signup). 
3. Enter your Amplitude API Key and name the Connector to save it.
4. Add the new Amplitude Connector to a [Data Pipe with an active Data Collector](https://help.datazoom.io/hc/en-us/articles/360015525691-How-to-configure-a-Data-Pipe).
5. Follow the prompts to configure your connector.
    - Sampling Rate - select the percentage of sessions that you would like to have delivered to your Connector destination.
    - Redirect Standard Fields - Select this if you would like Datazoom to redirect Amplitude's standard fields to custom user properties. For example, if checked the `City` data point is mapped to a user custom property named `dz_city` 
6. Click **Save Changes** to complete setup.
