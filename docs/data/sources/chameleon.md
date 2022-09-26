---
title: Import Chameleon Events
description: Import Chameleon events into Amplitude to analyze tour performance alongside your data in Amplitude.
status: new
---

[Chameleon](https://www.chameleon.io/) is a product adoption platform which allows you to create beautiful product guidance that helps, guides, and delights your users throughout their journey. Build, manage and optimize your product tours without writing code. This Chameleon integration allows you to analyze Chameleon tour performance alongside other product data within Amplitude.

!!!tip

    This integration is maintained by Chameleon. [Contact the Chameleon support team](mailto:help@trychameleon.com) with any questions about this integration.

## Considerations

- You must enable this integration in each Amplitude project.
- For this integration to work, you must use the [Amplitude's client-side browser SDK](../sdks/typescript-browser) in your web app. This SDK must be available at the root property of `window.amplitude`. Events then go to whichever Amplitude project loaded on the page where the event took place.
- Use this [Google Sheet](https://docs.google.com/spreadsheets/d/1qBiAojhSoUSEGLlwvzAhO5CxFLTNeutA_h2iV9gsvRk/copy) schema to understand the full details of all Chameleon data sent to Amplitude.

## Setup

This guide is complementary to [Chameleon's docs](https://help.chameleon.io/en/articles/1349762-amplitude-integration-user-guide#sending-chameleon-events-to-amplitude).

### Amplitude setup

Copy the Amplitude API key for your project. There are no other setup steps in Amplitude. 

### Chameleon setup

1. Log in to your Chameleon dashboard.
2. Navigate to **Integrations** > **Amplitude**, and then click **Configure**.
3. Click **Edit project** under the Connect to your Amplitude account tile.
4. Click **Connect Amplitude** on the [Amplitude Dashboard](https://app.chameleon.io/integrations/amplitude) to open the connection modal.
5. Enter the API Key and Secret Key.
6. Click **Connect**.
7. Turn on the **Send Chameleon data to Amplitude** toggle to send events to Amplitude.
