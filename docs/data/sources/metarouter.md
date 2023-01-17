---
title: Import MetaRouter Events
descriptions: Send Amplitude the highest-quality data possible with MetaRouter's server-side, first-party data streaming platform. 
---

!!!beta

    This integration is currently in beta and is still in active development. To join their beta program, or if you have any feedback to help improve the MetaRouter Source and its documentation, [contact the MetaRouter team](mailto:questions@metarouter.io).

[MetaRouter](https://www.metarouter.io/) provides customer data integration while placing data governance entirely in the hands of your organization. Send Amplitude the highest-quality data possible with MetaRouter's server-side, first-party data streaming platform. Map and transform data for clean, structured data into Amplitude, and keep a high degree of control over each parameter sent.

!!!tip "This integration is maintained by MetaRouter"

    This integration is maintained by MetaRouter. Contact the [MetaRouter team](mailto:support@metarouter.io) with any questions about this integration.

## Setup

### Amplitude setup

Copy the Amplitude API key for your project. There are no other setup steps in Amplitude. 

### MetaRouter setup

For more information on how to set up and use this integration, see MetaRouter's documentation.

1. Log into your MetaRouter dashboard. 
2. Follow the [Quick Start Guide](https://docs.metarouter.io/docs/quick-start-guide) through step 3.
3. Navigate to the **Integrations** tab and select Amplitude as your desired events schema.
4. On the next screen in the **Global Configs section**, paste your Amplitude API Key and give your new connection a unique name.
5. Complete all required Global Parameter fields. 
6. Complete the Event and Default parameter sections. MetaRouter doesn't pass page or screen calls by default, enable those using parameters.

    ???info "Parameters (click to expand)"

        **Event parameters**

         1. **Page**: Page calls are the only event types that are recorded by default when you install MetaRouter sources on your website/app. Map the standard input keys to output keys for [pages](https://docs.metarouter.io/docs/analyticsjs-event-specs#section-page). 
         2. **Identify**: Anonymous IDs are automatically appended to your page event payload for anonymous tracking, and User IDs are appended if a user has been identified before a screen call occurs. [Identify documentation](https://metarouter.readme.io/docs/analyticsjs-event-specs#identify). Define the identification for the integrations and re-add the API key
         3. Standard [E-Commerce Event](https://docs.metarouter.io/docs/analyticsjs-ecommerce-spec)
               - These events will need to be mapped to the correct output key.
               - If an event is not required, it can be deleted.
               - New Events can also be added to track custom events.

        **Default parameters**

         1. Review Default parameters and ensure mapping for input and output key are correct
         2. Additional parameters can be added at this level

         After the Global, Event, and Default Parameters are set, you can save and deploy the integration.

7. Click **Save** to activate your pipeline.

After you've completed setup, your data streams directly into Amplitude. Reach out to `support@metarouter.io` with any questions.