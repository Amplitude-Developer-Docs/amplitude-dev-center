---
title: Debugging Analytics
description: Troubleshoot and debug any data errors that may occur in the instrumentation process.
---

Data validation is a critical step in the instrumentation process. Amplitude allows you to easily validate your event data via Amplitude's [User Lookup](#user-lookup) or using the [Instrumentation Explore](#instrumentation-explorer) Chrome extension.

### Before you begin: Instrument your events

If you have not instrumented any events, no data will be sent to Amplitude's servers, and thus no data will be visible in Amplitude itself. We strongly recommend that you create a test app to test and validate your first event data. See our [Quick Start Guide](https://help.amplitude.com/hc/sections/201146908) for more instructions and advice on getting started with Amplitude.

## User Lookup

### Step 1: Find yourself via User Look-Up

Once you have instrumented your events, the first step is to manually fire some of those events on your own device. After you have done so, follow these steps:

1. Navigate to the User & Account Look-Up tab in Amplitude.
2. Ensure you're looking at user-level details, and not account-level details.
3. Search by user ID, device ID, Amplitude ID, or user property values.

![Amplitude User Lookup](/../assets/images/user-lookup.png)

### Step 2: Analyze the event stream

After you find your user profile, scroll down to the [Event Stream](https://help.amplitude.com/hc/en-us/articles/229313067#individual-event-stream) section. The event stream displays a user's entire event history, grouped by session. The most recent activity appears at the top of the list, and events populate the stream in ten seconds to one minute.

Clicking on an event will give you detailed information about it, including the user property and event property values **at the time of that event**.

Because the event stream is essentially updated in real-time (when you switch the Live event updates toggle to On), it can be used to assure new features are being logged correctly and to troubleshoot or debug instrumentation errors. For example, if you trigger an event only once but the event stream consistently displays two instances of the event, then there could be an instrumentation error.

You can view additional information and the raw data of an event by clicking Raw.
![Amplitude User Lookup Events](/../assets/images/user-lookup-events.png)

## Instrumentation Explorer

The Amplitude Instrumentation Explorer is an extension in the Google Chrome Web Store that helps you examine and debug your Amplitude Browser SDK instrumentation just by interacting with your product. It will capture each Amplitude event you trigger and display it in the extension popup. [Download it here.](https://chrome.google.com/webstore/detail/amplitude-event-explorer/acehfjhnmhbmgkedjmjlobpgdicnhkbp)

### View your triggered events

In the Instrumentation Explorer, the *Events* tab is where you'll find detailed insights into the parameters of each event **you** trigger on your website. This includes `user_id`, `device_id`, `event_properties`, and `user_properties`.

![Amplitude Instrumentation Explorer](/../assets/images/instrumentation-explorer.png)

To switch between the different Amplitude projects that are receiving your events, select it from the Project dropdown. Each Amplitude project is distinguished by an abbreviated API key:

![Amplitude Instrumentation Explorer View Projects](/../assets/images/instrumentation-explorer-projects.png){: style="max-width:70%;display:block;margin:auto"}

To clear all the events from your popup, click the "Forbidden" icon: 

![Amplitude Instrumentation Explorer Clear Data](/../assets/images/instrumentation-explorer-clear.png){: style="max-width:70%;display:block;margin:auto"}

To copy your events' event and user property parameters, click the "Copy" icons:

![Amplitude Instrumentation Explorer Copy Data](/../assets/images/instrumentation-explorer-copy.png){: style="max-width:70%;display:block;margin:auto"}

### View your configuration options

To view the configuration options you've set for each project's SDK, click the API Options tab:

![Amplitude Instrumentation Explorer Configuration](/../assets/images/instrumentation-explorer-configuration.png){: style="max-width:70%;display:block;margin:auto"}

### View your hidden events

To see a list of your hidden events or to display events on the webpage as they are triggered, click the *Settings* tab.

![Amplitude Instrumentation Explorer Settings](/../assets/images/instrumentation-explorer-settings.png){: style="max-width:70%;display:block;margin:auto"}