---
title: Branch Event Streaming
description: Amplitude Data's Branch integration lets you stream your Amplitude event and user data straight to Branch with just a few clicks.
---

--8<-- "includes/open-beta.md"

Amplitude Data's Branch integration lets you stream your Amplitude event and user data straight to Branch with just a few clicks.

## Considerations

Keep these things in mind when sending events to [Branch:](https://branch.io/)

- Events sent to Branch by Amplitude are "Custom Events". See the [Branch Custom Events documentation](https://help.branch.io/developers-hub/docs/tracking-commerce-content-lifecycle-and-custom-events#track-custom-events).
- Relevant limits for Branch events are:
  - Maximum length of event name: 40 characters

## Setup

### Prerequisites

To configure an Event Streaming integration from Amplitude to Branch, you need the following information from Branch:

- Branch Key

### Branch setup

1. In your Branch dashboard, click on **Account Settings**
2. Copy your Branch Key

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Event Streaming section, click **Branch**.
3. Enter a sync name, then click **Create Sync**.

After you create the destination, you must configure the settings.

### Configure settings

1. On the **Settings** tab, click **Edit**.
2. Enter your **Branch Key**.
3. Configure **Send Events** to send events ingested by Amplitude to Branch.
      1. To send an event, toggle **Send Events** to **Enabled**.
      2. Expand the **Select and filter events** panel, and select which events to send.
      3. Select a mapping for your Branch identifier. There are several options for a valid identifier in Branch. Include *one* of the following:
            - Developer Identity
            - Browser Fingerprint ID
            - OS (if iOS) *AND* (IDFA *OR* IDFV)
            - OS (if Android) *AND* (Android ID *OR* AAID)
      4. Select other optional mappings to increase attribution success rates
      5. Select custom data to forward with your events. Expand the **Specify event properties to send** panel, and select properties you want to include. If you don't select any properties here, Amplitude doesn't send any.
4. Save when finished.

#### Enable integration

The final step is enabling the destination. You must enable the destination to start streaming events.

1. Click **Edit**.
2. Toggle **Status** from **Disabled** to **Enabled**.
3. Click **Save**.

## List of available mappings

| Parameter Name                | Required                                                                    |
|-------------------------------|:---------------------------------------------------------------------------:|
| **OS**                        | :octicons-check-16: (One of OS, Developer Identity, Browser Fingerprint ID) |
| **Developer Identity**        | :octicons-check-16: (One of OS, Developer Identity, Browser Fingerprint ID) |
| **Browser Fingerprint ID**    | :octicons-check-16: (One of OS, Developer Identity, Browser Fingerprint ID) |
| **iOS advertising ID (IDFA)** | :octicons-check-16: (If using OS=iOS, one of IDFA or IDFV)                  |
| **iOS vendor ID (IDFV)**      | :octicons-check-16: (If using OS=iOS, one of IDFA or IDFV)                  |
| **Android ID**                | :octicons-check-16: (If using OS=Android, one of Android ID or AAID)        |
| **AAID**                      | :octicons-check-16: (If using OS=Android, one of Android ID or AAID)        |
| **OS Version**                |                                                                             |
| **Environment**               |                                                                             |
| **User Agent**                |                                                                             |
| **HTTP Origin**               |                                                                             |
| **HTTP Referrer**             |                                                                             |
| **Country**                   |                                                                             |
| **IP Address**                |                                                                             |
| **Language**                  |                                                                             |
| **Device Brand**              |                                                                             |
| **Branch Device Token**       |                                                                             |
| **Downloaded App Version**    |                                                                             |
| **Device Model**              |                                                                             |
| **Screen DPI**                |                                                                             |
| **Screen Height**             |                                                                             |
| **Screen Width**              |                                                                             |
