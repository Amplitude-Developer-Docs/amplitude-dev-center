---
title: Meta Pixel Event Streaming
description: Amplitude Data's Meta Pixel integration lets you stream your Amplitude event data straight to Meta Pixel with just a few clicks.
---

Amplitude Data's Meta Pixel integration lets you stream your Amplitude event data straight to Meta Pixel with just a few clicks.

--8<-- "includes/open-beta.md"

## Considerations

Keep these things in mind when sending Amplitude data to Meta. 

- Amplitude uses the `user_id` to match the `external_id` user property field in Meta Pixel. Make sure that this field is present in your Amplitude events.
- All event properties that Amplitude sends are stored as 'custom data'. Because of this, normal Meta conversion can't be applied to those events. You must create a custom conversion using this [Meta guide](https://www.facebook.com/business/help/2375212726097833?id=1205376682832142 "https://www.facebook.com/business/help/2375212726097833?id=1205376682832142").
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

1. In Amplitude, navigate to **Data Destinations**, then find **Meta Pixel - Event Stream**.
2. Enter a sync name, then click **Create Sync**.
3. Click **Edit**, then paste your Pixel ID and Conversions API Access Token.
4. Use the _Send events_ filter to select the events you want to send. You can send all events, but Amplitude recommends choosing the most important ones.
5. When finished, enable the destination and save.
