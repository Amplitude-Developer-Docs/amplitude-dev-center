---
title: Google Tag Manager Template - Amplitude Analytics Browser SDK
description: Collect data with ease using Amplitude Analytics Browser SDK GTM template - the official client-side Google Tag Manager template for seamless data collection.
---

This is the client-side Google Tag Manager Template for Amplitude Analytics. The tag uses the [Amplitude Marketing Analytics SDK](../../sdks/marketing-analytics-browser/) for data collection.

!!!info Resources
    [:simple-googletagmanager: GTM Template Gallery](https://tagmanager.google.com/gallery/#/owners/amplitude/templates/amplitude-browser-sdk-gtm-template) · [:material-github: GitHub](https://github.com/amplitude/amplitude-browser-sdk-gtm-template)

With this template, you can defer the `init` tag until you receive a signal, like a consent grant. It's also common to fire the `init` tag using `All Pages` or `Initialization - All Pages` triggers. But make sure to fire the `init` tag **before** any other tags. The legacy template automatically calls init, so there's no need to do it yourself.

This video tutorial walks through the implementation basics. 

<script src="https://fast.wistia.com/embed/medias/n337njhoot.jsonp" async></script><script src="https://fast.wistia.com/assets/external/E-v1.js" async></script><div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div class="wistia_embed wistia_async_n337njhoot videoFoam=true" style="height:100%;position:relative;width:100%"><div class="wistia_swatch" style="height:100%;left:0;opacity:0;overflow:hidden;position:absolute;top:0;transition:opacity 200ms;width:100%;"><img src="https://fast.wistia.com/embed/medias/n337njhoot/swatch" style="filter:blur(5px);height:100%;object-fit:contain;width:100%;" alt="" aria-hidden="true" onload="this.parentNode.style.opacity=1;" /></div></div></div></div>