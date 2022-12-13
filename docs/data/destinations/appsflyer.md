---
title: AppsFlyer Event Streaming
description: Amplitude Data's AppsFlyer integration lets you stream your Amplitude event data straight to AppsFlyer with just a few clicks.
---

--8<-- "includes/open-beta.md"

Amplitude Data's AppsFlyer integration lets you stream your Amplitude event data straight to AppsFlyer with just a few clicks.

!!!note "Other Amplitude + AppsFlyer integrations"

    This integration sends Amplitude data into AppsFlyer. Amplitude offers two other integrations with AppsFlyer:

    - [Import AppsFlyer data](/data/sources/appsflyer)
    - [Send cohorts to AppsFlyer](/data/destinations/appsflyer-cohort)

## Considerations

Keep these things in mind when sending events to AppsFlyer:

- A user must exist in AppsFlyer to send events for them. Appsflyer requires the `appsflyer_id` corresponding to each user to be sent. Use the `Mappings` tab in the sync setup to specify which Amplitude property to map to `appsflyer_id`. We recommend also specifying a mapping for the `customer_user_id` AppsFlyer property for best accuracy.
- Amplitude forwards all properties selected to be sent as key value pairs within `eventValue`.
- Appsflyer recommends sending the `OS` field, as well as other device identifiers such as various ad identifiers and device ID. See the [AppFlyer documentation](https://support.appsflyer.com/hc/en-us/articles/207034486#payload-parameters) for their recommendations on which properties to send. Use the `Mappings` tab in the sync setup to choose which properties to forward.

## Setup

### Prerequisites

To complete setup, you need the following information from AppsFlyer:

- REST API Key: Find this in **App Settings > Dev Key**.
- AppsFlyer App ID: The app identifier used in your AppsFlyer dashboard. It also appears in the URL when you are on the dashboard.

### Amplitude setup

1. In Amplitude, navigate to **Data**.
2. On the sidebar, under **Connections**, select **Catalog**.
3. Select the **Destinations** tab.
4. Select **Event Streaming**.
5. Click **Appsflyer - Event Streaming**.
6. Enter a sync name, then click **Create Sync**.

After you create the destination, you must configure the settings.

#### Configure settings

1. On the **Settings** tab, click **Edit**.
2. Enter your **Appsflyer App ID**.
3. Enter your **REST API Key**.
4. **Send Events** sends events ingested by Amplitude to Appsflyer.
      1. To send an event, toggle **Send Events** to **Enabled**.
      2. Expand the **Select and filter events** panel, and select which events to send.
      3. To select event properties to send, expand the **Specify event properties to send** panel, and select properties you want to include. If you don't select any properties here, Amplitude doesn't send any.
5. Save when finished.

After you configure your settings, configure your mappings.

#### Configure mappings (recommended)

For newer versions of the Appsflyer destination, you can map Amplitude properties to fields in Appsflyer. If you don't configure mappings, or are using an older version that doesn't support mapping, the default values described below are used instead.

1. Click the **Mappings** tab, then click **Edit**.
2. Select a **Appsflyer ID**. This is a unique identifier for users in Appsflyer. It defaults to Amplitude **User ID** (`user_id`).
3. Select a **Customer User ID**. This is a different unique identifier for users in Appsflyer that you can configure. It also defaults to Amplitude **User ID** (`user_id`) in older syncs.
4. Select a device identifier such as **Device ID**, **IDFV**, or other similar identifier. You can find the list below. In older syncs, any found device identifiers are included.
5. Select a mapping for **OS**. The recommended mapping here is the Amplitude **OS Version** (`os_version`).
6. Save when finished.

After you configure mappings, enable the destination.

#### Enable integration

The final step is enabling the destination. You must enable the destination to start streaming events.

1. Navigate back to the **Settings** tab.
2. Click **Edit**.
3. Toggle **Status** from **Disabled** to **Enabled**.
4. Click **Save**.

## List of optional mappings

| Parameter Name        | Required/Recommended/Optional | Default/Recommended Amplitude Property |
| --------------------- | ----------------------------- | -------------------------------------- |
| **Appsflyer ID**      | **Required**                  | **User ID**                            |
| Customer User ID      | *Recommended*                 | **User ID**                            |
| OS                    | *Recommended*                 | **OS Version**                         |
| Advertising ID        | *Recommended*                 |                                        |
| Amazon AID            | *Recommended*                 |                                        |
| IDFA                  | *Recommended*                 |                                        |
| IDFV                  | *Recommended*                 |                                        |
| IMEI                  | *Recommended*                 |                                        |
| OAID                  | *Recommended*                 |                                        |
| AF Content ID         | Optional                      |                                        |
| AF Content Type       | Optional                      |                                        |
| AF Currency           | Optional                      |                                        |
| AF Revenue            | Optional                      |                                        |
| Event Currency        | Optional                      |                                        |
| iOS ATTrackingManager | Optional                      |                                        |
| IP Address            | Optional                      |                                        |
