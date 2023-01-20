---
title: Meta Pixel Event Streaming
description: Amplitude Data's Meta Pixel integration lets you stream your Amplitude event data straight to Meta Pixel with just a few clicks.
---

--8<-- "includes/open-beta.md"

Amplitude Data's Meta Pixel integration lets you stream your Amplitude event data straight to Meta Pixel with just a few clicks.

## Considerations

Keep these things in mind when sending Amplitude data to Meta.

- Amplitude allows you to customize mappings that to include in the `user_data` array of Meta Pixel for conversion.
- User data that's sent to Meta Pixel that requires hashing will be hashed. Ensure that the data isn't already hashed. See a full list of accepted parameters and whether they're hashed [in the Meta Pixel documentation](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters/).
- Other event properties selected in the **Specify event properties to send** that Amplitude sends are stored as `custom_data`, which can be used to define audiences within Meta Pixel. Because of this, normal Meta conversion can't be applied to those events. You must create a custom conversion using this [Meta guide](https://www.facebook.com/business/help/2375212726097833?id=1205376682832142 "https://www.facebook.com/business/help/2375212726097833?id=1205376682832142").
- The rate limits for Pixel are determined on a per-account basis. If you have rate limiting issues, report them to your Meta CSM.
- You must have a Meta developer account to access the events forwarded to Pixel.

## Setup

### Prerequisites

To configure an Event Streaming integration from Amplitude to Meta Pixel, you need the following information from Meta Pixel:

- Pixel ID
- Conversions API Access Token.

### Meta setup

1. In Meta, go to Events Manager and click Settings on the top navigation bar.
2. Scroll down to Conversions API and click Generate access token in Set up manually.
3. Copy the Pixel ID at the top of the page and the newly generated access token.

### Amplitude setup

1. In Amplitude, navigate to **Data**.
2. On the sidebar, under **Connections**, select **Catalog**.
3. Select the **Destinations** tab.
4. Select **Event Streaming**.
5. Click **Meta Pixel - Event Streaming**.
6. Enter a sync name, then click **Create Sync**.

After you create the destination, you must configure the settings.

#### Configure settings

1. On the **Settings** tab, click **Edit**.
2. Enter your **Pixel ID**.
3. Enter your **Conversions API Access Token**.
4. **Send Events** sends events ingested by Amplitude to Meta.
      1. To send an event, toggle **Send Events** to **Enabled**.
      2. Expand the **Select and filter events** panel, and select which events to send.
      3. To select event properties to send, expand the **Specify event properties to send** panel, and select properties you want to include. If you don't select any properties here, Amplitude doesn't send any.
5. Save when finished.

After you configure your settings, configure your mappings.

#### Configure mappings (recommended)

For newer versions of the Meta Pixel destination, you can map Amplitude properties to fields in Meta Pixel to use for better conversions. If you don't configure mappings, or are using an older version that doesn't support mapping, the default values described below are used instead.

1. Click the **Mappings** tab, then click **Edit**.
2. Select a **External ID**. This is a unique identifier for users in Meta Pixel.
3. Select as many other mappings as possible for best possible conversion results.
4. Save when finished.

After you configure mappings, enable the destination.

#### Enable integration

The final step is enabling the destination. You must enable the destination to start streaming events.

1. Navigate back to the **Settings** tab.
2. Click **Edit**.
3. Toggle **Status** from **Disabled** to **Enabled**.
4. Click **Save**.

## List of available mappings

| Parameter Name    | Required              | Recommended | Default Amplitude Property | Hashed                |
|-------------------|:---------------------:|-------------|----------------------------|:---------------------:|
| **External ID**   | :octicons-check-16:   |             | **User ID**                | :octicons-check-16:   |
| Email             |                       |             |                            | :octicons-check-16:   |
| Phone Number      |                       |             |                            | :octicons-check-16:   |
| First Name        |                       |             |                            | :octicons-check-16:   |
| Last Name         |                       |             |                            | :octicons-check-16:   |
| Date of Birth     |                       |             |                            | :octicons-check-16:   |
| Gender            |                       |             |                            | :octicons-check-16:   |
| City              |                       |             |                            | :octicons-check-16:   |
| State             |                       |             |                            | :octicons-check-16:   |
| Zip Code          |                       |             |                            | :octicons-check-16:   |
| Country           |                       |             |                            | :octicons-check-16:   |
| Client IP Address |                       |             |                            |                       |
| Client User Agent |                       |             |                            |                       |
| Click ID          |                       |             |                            |                       |
| Browser ID        |                       |             |                            |                       |
| Subscription ID   |                       |             |                            |                       |
| Facebook Login ID |                       |             |                            |                       |
| Lead ID           |                       |             |                            |                       |
