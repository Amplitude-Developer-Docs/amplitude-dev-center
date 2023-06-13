---
title: Google Tag Manager Web Template - Amplitude Analytics Legacy
description: Collect data with ease using Amplitude Analytics Legacy GTM template - the official client-side Google Tag Manager template for seamless data collection.
---

This is the client-side Google Tag Manager Template for Amplitude Analytics. The tag uses the [Maintenance Amplitude JavaScript SDK](../sdks/javascript/index.md) for data collection.

!!!deprecated "This is a legacy template"
    This is a legacy GTM template. Use the [latest template](./google-tag-manager-client.md) for the most up-to-date implementation.

!!!info Resources
    [:simple-googletagmanager: GTM Template Gallery](https://tagmanager.google.com/gallery/#/owners/amplitude/templates/amplitude-gtm-template) · [:material-github: GitHub](https://github.com/amplitude/amplitude-gtm-template)

## Migration

<<<<<<< HEAD
The Amplitude Analytics Legacy template, currently utilizing the [Maintenance Amplitude JavaScript SDK](../sdks/javascript/index.md) for data collection, is only slated for bug fixes until its eventual deprecation. Instead, we recommend using the [latest GTM template](../google-tag-manager-client/) that uses Amplitude's Marketing Analytics SDK for data collection. This not only ensures better support but also offers access to a host of new features.

- It's important to note that the latest template is not backwards compatible with this legacy template due to the non-backwards compatibility of the internal SDK. Nonetheless, we have integrated a cookie migration logic to facilitate the transition of legacy cookies information to the latest cookie storage system.
- For a comprehensive migration guide, please refer to the [details](../../sdks/typescript-browser/migration/).
- To understand the behavioral differences between the old and new templates, consult the [comparison section](../../sdks/typescript-browser/migration/#comparison) in our documentation.

Here are the breaking changes:

| <div class="big-column">Change Area</div>  | Amplitude Analytics Browser SDK (GTM Client Template Latest) | Amplitude Analytics Legacy (GTM Client Template Maintenance)|
| --- | --- | --- |
| Core SDK | [Marketing Analytics Browser SDK](../../sdks/marketing-analytics-browser/). | [Maintenance Amplitude JavaScript SDK](../sdks/javascript/index.md). |
| Amplitude initialization | The `init` function is a separate tag type that requires a dedicated tag. This accommodates deferred initialization, which allows the `init` tag to be called even after an event track call. However, it's critical to note that events won't be dispatched to Amplitude until the `init` tag is explicitly activated.  | The `init` is called by default. As there's no separate init tag, the initialization process runs as soon as the template is loaded. |
| Web Attribution | Collects more click IDs and is much easier to configure. Simply enable attribution tracking in the `init` type tag for default behavior. Further details are [available](../google-tag-manager-client/#select-a-tag-types). | Set the `initialization Options` for each tag type is required unless you are using default configuration. Refer to [this comparison](../../sdks/typescript-browser/migration/#comparison) for the differences in web attribution behavior between the core SDKs. For configuration mapping between the core SDKs, please check [here](../../sdks/typescript-browser/migration/#configuration). |
| Page View Tracking | Includes built-in `Page View` Tracking which can be configured in the `init` type tag. You can set up the page view tracking trigger and decide whether to track history events automatically. | No built-in Page View Tracking. You can implement your page view tracking using the `track` type tag. For Single Page Applications (SPAs), the All Pages trigger is not sufficient for tracking history changes. `All Pages` and `History Changes` triggers should be added as trigger for the page view tracking accuracy. If you wish to add some automatic variables provided by the `History Change` trigger, navigate to the variable section, configure, and activate all checkboxes under History. Once enabled, you'll see these history variables in the Variables tab in the GTM preview pane. |

## Video Tutorial

This video tutorial walks through the implementation basics. 

<script src="https://fast.wistia.com/embed/medias/ks4mh1i79u.jsonp" async></script><script src="https://fast.wistia.com/assets/external/E-v1.js" async></script><div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div class="wistia_embed wistia_async_ks4mh1i79u videoFoam=true" style="height:100%;position:relative;width:100%"><div class="wistia_swatch" style="height:100%;left:0;opacity:0;overflow:hidden;position:absolute;top:0;transition:opacity 200ms;width:100%;"><img src="https://fast.wistia.com/embed/medias/ks4mh1i79u/swatch" style="filter:blur(5px);height:100%;object-fit:contain;width:100%;" alt="" aria-hidden="true" onload="this.parentNode.style.opacity=1;" /></div></div></div></div>

## EU data residency 

For EU data residency, you must set up your project inside Amplitude EU and use the API key from Amplitude EU. You can configure the server zone by checking the checkbox **EU Data Residency** under **Tag Configuration** -> **Initialization**.