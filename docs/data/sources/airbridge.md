---
title: Import Airbridge Events
description: Import attribution information, events, and event and user properties from Airbridge in just a few clicks.
---

[Airbridge](https://www.airbridge.io) is a mobile measurement (MMP) solution that provides best-in-class measurement services including web and app universal attribution and multi-touch attribution (MTA) and incrementality to measure true marketing effectiveness.

You can send attribution data, events, event properties and user properties from Airbridge to Amplitude to further analyze the user behaviors down the funnel. 

See the [Airbridge documentation](https://help.airbridge.io/hc/en-us/articles/900005331643#amplitude-v2-integration-http-api) for more details on sending events to Amplitude. See the [Airbridge documentation](https://help.airbridge.io/hc/en-us/articles/900005331643#amplitude-v1-integration-attribution-api) for more details on sending attribution data to Amplitude. 

!!!tip "Contact Airbridge for help"

    Contact the Airbridge team at support@airbridge.io for help with this integration.

## Setup

!!!note "Using Amplitude JavaScript or React Native SDKs?"

    If you are using Amplitude JS SDK or React Native SDK, contact support@airbridge.io to enhance your user matching probability before setting up this integration.

### Amplitude setup 

Before you begin, you need your Amplitude project API key. 

There are no other setup steps in Amplitude.

### Airbridge setup

1. In the Airbridge dashboard, navigate to the Integration section and select Third-party Integrations, followed by the Amplitude V2 tile.
2. Select **Add Connection**. Enter a name and enter your Amplitude project's API key into the input box. 
3. Click **Next**.
4. Select all the events you want to send to Amplitude and click **Next**.
5. Select all the properties you want to send to Amplitude and click **Next**.
6. Click **Add rule** and customize your data delivery rule by adding conditions. You can apply multiple conditions by selecting **+ Add Condition**. Select **Add** to proceed with next steps.
7. Click **Add connection**.
8. Click **Activate** to complete the setup process.