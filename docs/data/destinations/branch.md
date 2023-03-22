---
title: Branch Event Streaming
description: Amplitude CDP's Branch streaming integration enables you to forward your Amplitude events straight to Branch with just a few clicks.
---

--8<-- "includes/open-beta.md"

Amplitude CDP's Branch streaming integration enables you to forward your Amplitude events straight to [Branch](https://branch.io/) with just a few clicks.

## Setup

### Prerequisites

To configure streaming from Amplitude to Branch, you need the following information from Branch.

**Branch Key**: The Branch Key used for authentication. See the [Branch documentation](https://help.branch.io/using-branch/docs/profile-settings#branch-key-and-secret) for help locating your Branch Key.

### Create a new sync

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Event Streaming section, click **Branch**.
3. Enter a sync name, then click **Create Sync**.

### Enter credentials

Enter your **Branch Key**.

### Configure event forwarding

Under **Send Events**, make sure the toggle is enabled ("Events are sent to Branch") if you want to stream events to Branch. When enabled, events are automatically forwarded to Branch when they're ingested in Amplitude. Events aren't sent on a schedule or on-demand using this integration. Events are sent to Branch as [Branch custom events](https://help.branch.io/developers-hub/docs/tracking-commerce-content-lifecycle-and-custom-events#track-custom-events) and can have a maximum event name length of 40 characters.

1. In **Select and filter events** choose which events you want to send. Choose only the events you need in Branch.

    !!!warning "Events for anonymous users cannot be streamed"

        Branch requires that all events have a user ID present. If you have selected any events to send to Branch that may not have a user ID, add a filter to send only events where the user ID is present. Otherwise, your delivery metrics may be affected.

        ![Setting up a filter for anonymous users on events](/../assets/images/streaming-anonymous-users-filter.png)

2. In **Map properties to destination**:    
    1. Choose one of the following ways to identify your users in Branch.
        - **Developer ID**: Any unique identifier for each user in Branch.
            1. Select an Amplitude user property that corresponds to your Branch **Developer ID**, from the left dropdown.
            2. Select **Developer ID**, from the corresponding right dropdown.
        - **Browser Fingerprint ID**: A Branch internal-only field for tracking browsers.
            1. Select an Amplitude user property that corresponds to your Branch **Browser Fingerprint ID**, from the left dropdown.
            2. Select **Developer ID**, from the corresponding right dropdown.
        - **IDFA** or **IDFV**: A Branch iOS advertising ID or iOS vendor ID.
            1. Select an Amplitude user property with the value `iOS`, from the left dropdown.
            2. Select **OS**, from the corresponding right dropdown.
            3. Select an Amplitude user property that corresponds to your Branch **IDFA** or **IDFV**, from the left dropdown.
            4. Select **IDFA** or **IDFV**, from the corresponding right dropdown.
        - **Android ID** or **AAID**: A Branch Android hardware ID or Android/Google advertising ID.
            1. Select an Amplitude user property with the value `Android`, from the left dropdown.
            2. Select **OS**, from the corresponding right dropdown.
            3. Select an Amplitude user property that corresponds to your Branch **Android ID** or **AAID**, from the left dropdown.
            4. Select **Android ID** or **AAID**, from the corresponding right dropdown.

    2. (optional) Map other Amplitude user properties to Branch properties.
        1. Select an Amplitude user property that corresponds to a Branch property, from the left dropdown.
        2. Select the Branch property, from the corresponding right dropdown.

    See the full list of [Branch properties that are supported by Amplitude](#supported-branch-properties).

3. (optional) In **Select additional properties**, select any more event and user properties you want to send to Branch. If you don't select any properties here, Amplitude doesn't send any. These properties are sent to Branch as Branch custom data.

### Enable sync

When satisfied with your configuration, at the top of the page toggle the **Status** to "Enabled" and click **Save**.

### Supported Branch properties

- **Developer Identity**    
- **Browser Fingerprint ID**
- **IDFA**              
- **IDFV**              
- **OS**                
- **Android ID**        
- **AAID**              
- OS Version            
- Environment           
- User Agent            
- HTTP Origin           
- HTTP Referrer         
- Country               
- IP Address            
- Language              
- Device Brand          
- Branch Device Token   
- Downloaded App Version
- Device Model          
- Screen DPI            
- Screen Height         
- Screen Width          
