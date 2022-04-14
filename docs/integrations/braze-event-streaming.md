---
title: Braze Event Streaming (Beta)
description: Words
---

To configure an Event Streaming integration from Amplitude to Braze, we need the following information.

-   **endpoint** - the endpoint for the REST operations, looks like : [https://rest.iad-01.braze.com](https://rest.iad-01.braze.com/ "https://rest.iad-01.braze.com/"), more info on [![](https://www.braze.com/docs/assets/favicon.ico)API Overview](https://www.braze.com/docs/api/basics/#endpoints) . the main thing it should start with "rest.

-   "**brazeAppId** - id for their App in Braze that they want to receive the events. Can be viewed in the "Developer Console", "API Settings" tab, "Identification" section.

-   **apiKey** -  API Key that is used for authentiation. Can be viewed in the "Developer Console", "API Settings" tab, "Rest API Keys" section.

In addition, please indicate which events by Event Name that you wish to send from Amplitude. Note that you can send all Events if you so wish, but generally sending a targeted list is better.