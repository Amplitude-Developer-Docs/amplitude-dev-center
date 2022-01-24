---
id: observe
title: Event Validation with Observe
---

Observe is a feature from Iteratively that helps teams inspect, analyze and monitor their event tracking continuously, no code changes required.

A big challenge for data, product and growth teams is a lack of visibility into the state of their data collection. Teams rely on manual testing, broken charts, and gut feel to continually validate their product analytics.

With no way to enforce or verify their event tracking, missing properties, wrong data types, incorrect naming conventions and more, pollute their downstream systems like Amplitude with poor quality data. This leaves teams with a lack of confidence in their analytics, accumulated technical debt and tons of hours wasted on cleaning and preparing data for analysis. 

### Getting started with Observe
Iteratively Observe listens in on your existing event stream and turns your tracking code into a living document, so you can get a holistic view of the state of your data collection across all of your platforms. 

You and your teams will get instant insight into what’s broken or can be improved. With an intuitive and collaborative workflow, you and your teams can work together to instrument fixes and get your tracking plan in perfect shape.

As you improve your event tracking, Observe continues to monitor your event stream and surfaces any inconsistencies – that way your code is always in sync with your tracking plan. 

The first time you access your tracking plan in Iteratively, you’ll see all the events and properties received and processed by Amplitude. All of the events and properties will show up as Unexpected and you’re able to add your events and properties to your tracking plan by clicking Add to plan. 

![Observe Add To Plan](/img/observe_add.png)

Once you add an event to your tracking plan (make sure you also hit Publish to make it official), that event is now officially part of your tracking plan, and Observe will alert you on any changes it sees on that event or associated properties going forward. If you want to add multiple events to your tracking plan at once you can leverage our bulk add functionality by ticking the boxes on the left side of the grid. 

Remember, Observe will only surface the data it sees and so you might have legacy tracking or events that fire very infrequently that you don’t immediately see in your tracking plan. If you know of any events that aren’t surfaced by Observe, you can add them manually to your plan or trigger the events yourself.

We recommend working with your team on building your tracking plan from your event stream and take the opportunity to fix any issues Observe is flagging (more on that below). 

#### Using the Ampli CLI
If you’re an existing Iteratively customer and have instrumented all of your event tracking using [our SDKs](/using-the-tracking-library), you already benefit from our type-safe analytics libraries, client-side validation and integration with CI for clean and accurate data you can trust.

Observe will still add value by surfacing and alerting you on any runtime validation errors in the web app. For JavaScript specifically, this is relevant as it’s not a type-safe language, and checks are only performed at runtime.

If you haven’t migrated all of your event tracking to Iteratively – maybe you still have legacy events tracked without the Iteratively SDKs – Observe will give you visibility into that immediately and surface it in the web app so you can easily add it to your tracking plan, find and fix priority issues and migrate fully at your own pace.

### Observe event statuses 
Events can have different statuses in Observe and it’s important to understand the differences:

- **Unexpected** – Any event or property that has not yet been added to your tracking plan will show up as Unexpected (until you add it to your tracking plan).
- **Valid** (and Current) — Any event or property that matches (in name and schema) the latest version of an existing event (if Observe doesn’t know the version of the event, it only checks that the event shape matches your current tracking plan).
- **Invalid** — Any event or property that doesn’t match your current tracking plan.
- **Out of Date** — Any event or property that matches a previous version of an existing event or property (only applicable when using Amplitude or Iteratively SDKs, see below).

:::note
Observe will only consume and surface the data that’s being processed by Amplitude. For example, if you’re blocking, filtering or transforming your data upstream of Amplitude, Observe will naturally not see this data. We recommend sending all your data to Amplitude to ensure you get the complete picture of your tracking plan. 
:::

### Selecting environments and timeframes

![Selct Environment](/img/select_environment.png)

You can overlay your tracking plan with your event stream from your Production and Development environments. You should already have configured your Environments (if you haven’t, go to Settings → Environments and choose what Amplitude Project you want to associate with Prod and Dev respectively). In the Environments dropdown you have three options:

- **Production** – Will overlay your tracking plan with your event stream from your Production environment.
- **Development** – Will overlay your tracking plan with your event stream from your Development environment.
- **Development (this branch only)** – Will overlay your tracking plan with your event stream from your Development environment, but only data sent to that specific branch you’re currently on (only applicable for Amplitude and Itly SDK users). This is helpful for debugging when you have multiple teams sending data to Development. 

You can also choose the timeframe for which you want to see your event stream overlayed with your tracking plan. Currently, you can choose between:
- 5 minutes
- 1 hour
- 12 hours 
- 7 days
- 14 days

Bear in mind that changing the timeframe can also change whether an event was seen as invalid or valid. Imagine you had a bug 7 days ago that you changed less than 12 hours ago, if you choose the timeframe Last 7 days, the event will show as invalid, but if you choose Last 12 hours, it will show only as valid. 

![Observe Invalid](/img/observe_invalid.png)

### Acting on Observe Insights
Observe will surface missing and invalid properties on an event. The property rows show this information in a few different ways:

- **Status tooltip** – Indicates if an event was invalid at the point it was received (if Observe receives the version it compares it to the version, if not, it compares it to your current tracking plan).
- **% Seen indicator** – Will be red if the property is currently (published or unpublished) required and the event was received without the property within the selected timeframe. The indicator could be red while the status is green if you have unpublished changes or the event was recently modified.
- **Type indicator** – Will be red if the property was received with a type other than what is currently selected (published or unpublished) within the selected timeframe. The indicator could be red while the status is green if you have unpublished changes or the event was recently modified.

### Observe scope and limitations
Observe will work out of the box if you’re sending data to Amplitude today. Observe is limited by how you’re sending data to Amplitude today:

- If you’re leveraging Amplitude’s SDKs (current source support: JavaScript, Node.js, Android and iOS) or using Iteratively’s SDKs to send data to Amplitude, Observe is able to attribute your event stream to its respective source (web, iOS, backend, etc.). 

- If you’re sending data to Amplitude through a third-party data source like Segment or mParticle or ingesting or importing data directly, Observe will not be able to differentiate the source of your data. You’ll notice the data source is labeled as `unknown`.  

:::note
If Observe knows the version of your event, it will validate against that version’s schema (version is being sent when you’re using Amplitude or Iteratively SDKs). When Observe doesn’t know the version, it will validate against the schema of the latest version in your tracking plan.
:::
