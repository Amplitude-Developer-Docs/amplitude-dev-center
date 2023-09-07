---
title: Migrating to Amplitude from Google Analytics
description: A step-by-step guide to migrate to Amplitude from Google Analytics
---

If you're considering migrating from Google Analytics (GA4) to Amplitude for your analytics and user tracking needs, this guide will help you through the process. Both platforms offer powerful features, but transitioning to Amplitude might require some adjustments. This guide outlines the key steps to ensure a smooth migration.

Migrating from the Google Analytics (GA4) SDK to the Amplitude SDK involves adjusting your tracking implementation to align with Amplitude's event structure and capabilities.

!!!info "Looking to get started easily with low-code migration?"

    While completely replacing Google Analytics (GA4) tracking functions with Amplitude tracking functions is our preferred long-term solution for migrating, Amplitude recognizes that this process can be complex. Amplitude offers a [Google Analytics event forwarder](#using-google-analytics-events-forwarder) that can get you started with your migration quickly, with only one small code change.

!!!note "BigQuery Import for GA4 (Google Analytics 4) Beta"

    Amplitude is working on BigQuery Import for GA4 Beta. Contact [dwh+GA4beta@amplitude.com](mailto:dwh+GA4beta@amplitude.com) to learn more. For more information about importing BiqQuery data in to Amplitude, see the [BigQuery Source documentation](/data/sources/bigquery).

### Initializing Amplitude

Replace the Google Analytics (GA4) initialization calls with Amplitude initialization calls in your application code. If you are configuring Google Analytics (GA4) like this:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Then the corresponding Amplitude call is this:

```html
<script type="text/javascript">
  !function(){"use strict";!function(e,t){var n=e.amplitude||{_q:[],_iq:{}};if(n.invoked)e.console&&console.error&&console.error("Amplitude snippet has been loaded.");else{var r=function(e,t){e.prototype[t]=function(){return this._q.push({name:t,args:Array.prototype.slice.call(arguments,0)}),this}},s=function(e,t,n){return function(r){e._q.push({name:t,args:Array.prototype.slice.call(n,0),resolve:r})}},o=function(e,t,n){e[t]=function(){if(n)return{promise:new Promise(s(e,t,Array.prototype.slice.call(arguments)))}}},i=function(e){for(var t=0;t<m.length;t++)o(e,m[t],!1);for(var n=0;n<g.length;n++)o(e,g[n],!0)};n.invoked=!0;var a=t.createElement("script");a.type="text/javascript",a.integrity="sha384-HpnlFSsUOQTaqmMKb6/PqZKVOBEpRji3JNLr81x6XElQ4bkquzRyG/F8rY8IDMuw",a.crossOrigin="anonymous",a.async=!0,a.src="https://cdn.amplitude.com/libs/analytics-browser-2.2.1-min.js.gz",a.onload=function(){e.amplitude.runQueuedFunctions||console.log("[Amplitude] Error: could not load SDK")};var u=t.getElementsByTagName("script")[0];u.parentNode.insertBefore(a,u);for(var c=function(){return this._q=[],this},l=["add","append","clearAll","prepend","set","setOnce","unset","preInsert","postInsert","remove","getUserProperties"],p=0;p<l.length;p++)r(c,l[p]);n.Identify=c;for(var d=function(){return this._q=[],this},f=["getEventProperties","setProductId","setQuantity","setPrice","setRevenue","setRevenueType","setEventProperties"],v=0;v<f.length;v++)r(d,f[v]);n.Revenue=d;var m=["getDeviceId","setDeviceId","getSessionId","setSessionId","getUserId","setUserId","setOptOut","setTransport","reset","extendSession"],g=["init","add","remove","track","logEvent","identify","groupIdentify","setGroup","revenue","flush"];i(n),n.createInstance=function(e){return n._iq[e]={_q:[]},i(n._iq[e]),n._iq[e]},e.amplitude=n}}(window,document)}();

  amplitude.add('YOUR_API_KEY');
</script>
```

NOTE: For the latest version of the snippet loader, refer to this [documentation](https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/analytics-browser#installing-via-script-loader).

For NPM and other installation methods [click here](https://github.com/amplitude/Amplitude-TypeScript/tree/v1.x/packages/plugin-ga-events-forwarder-browser#1-import-amplitude-packages).

It's important to initialize the Amplitude SDK in order to start capturing events and user properties. By including this initialization snippet in your application, you are initializing Amplitude. You must replace `'YOUR_API_KEY'` with your actual Amplitude API key, which you can find in your Amplitude account.

### Tracking events

Amplitude's tracking function require different parameters than Google Analytics (GA4). Refer to the code snippets below for the equivalent tracking functions.

#### Google Analytics (GA4)

```js
gtag('event', 'event_name', {
  param1: 'value1',
  param2: 'value2',
});
```

#### Amplitude

See more details on [Tracking an event](../../sdks/browser-2/index.md#tracking-an-event).

```js
amplitude.track('event_name, {
  param1: 'value1',
  param2: 'value2',
})
```

### Setting user ID

#### Google Analytics (GA4)

```js
gtag('config', 'GA_MEASUREMENT_ID', {
    user_id: 'USER_ID',
});
```

#### Amplitude

See more details on [Custom user ID](../../sdks/browser-2/index.md#custom-user-id).

```js
amplitude.setUserId('USER_ID');
```

### Setting user properties

#### Google Analytics (GA4)

```js
gtag('set', 'user_properties', {
    property1: 'value1',
    property2: 'value2',
});
```

#### Amplitude

See more details on [User properties](../../sdks/browser-2/index.md#user-properties).

```js
amplitude.identify(
  new amplitude.Identify()
    .set('property1', 'value1')
    .set('property2', 'value2'),
);
```

Refer to [Amplitude Browser SDK documentation](../../sdks/browser-2/index.md) for the most up-to-date and accurate information regarding SDK usage.

### Looking for a low-code solution?

We understand that transitioning from your current analytics platform to a new one can sometimes feel complex, especially when following the migration guide provided. If you're unsure about how to proceed or encounter any challenges along the way, Amplitude offers an alternative and low-code migration process to get started easily.

#### Using Google Analytics events forwarder

Amplitude offers a Google Analytics events forwarder which is a low-code solution that works as a plugin to the Amplitude Browser SDK. Once this plugin is installed on your application, it listens for events that Google Analytics (GA4) tracks. For each event sent to Google Analytics (GA4), a corresponding event is sent to Amplitude.

##### Initializing Amplitude with Google Analytics events forwarder

Add Amplitude SDK with Google Analytics events forwarder snippet right before your Google Tag snippet. Adding it before ensures that all Google Analytics (GA4) events that you collected are forwarded to Amplitude.

```html
<script type="text/javascript">
  !function(){"use strict";!function(e,t){var r=e.amplitude||{_q:[],_iq:{}};if(r.invoked)e.console&&console.error&&console.error("Amplitude snippet has been loaded.");else{var n=function(e,t){e.prototype[t]=function(){return this._q.push({name:t,args:Array.prototype.slice.call(arguments,0)}),this}},s=function(e,t,r){return function(n){e._q.push({name:t,args:Array.prototype.slice.call(r,0),resolve:n})}},o=function(e,t,r){e[t]=function(){if(r)return{promise:new Promise(s(e,t,Array.prototype.slice.call(arguments)))}}},i=function(e){for(var t=0;t<m.length;t++)o(e,m[t],!1);for(var r=0;r<y.length;r++)o(e,y[r],!0)};r.invoked=!0;var a=t.createElement("script");a.type="text/javascript",a.crossOrigin="anonymous",a.src="https://cdn.amplitude.com/libs/plugin-ga-events-forwarder-browser-0.2.0-min.js.gz",a.onload=function(){e.gaEventsForwarder&&e.gaEventsForwarder.plugin&&e.amplitude.add(e.gaEventsForwarder.plugin())};var c=t.createElement("script");c.type="text/javascript",c.integrity="sha384-HpnlFSsUOQTaqmMKb6/PqZKVOBEpRji3JNLr81x6XElQ4bkquzRyG/F8rY8IDMuw",c.crossOrigin="anonymous",c.async=!0,c.src="https://cdn.amplitude.com/libs/analytics-browser-2.2.1-min.js.gz",c.onload=function(){e.amplitude.runQueuedFunctions||console.log("[Amplitude] Error: could not load SDK")};var u=t.getElementsByTagName("script")[0];u.parentNode.insertBefore(a,u),u.parentNode.insertBefore(c,u);for(var p=function(){return this._q=[],this},d=["add","append","clearAll","prepend","set","setOnce","unset","preInsert","postInsert","remove","getUserProperties"],l=0;l<d.length;l++)n(p,d[l]);r.Identify=p;for(var g=function(){return this._q=[],this},v=["getEventProperties","setProductId","setQuantity","setPrice","setRevenue","setRevenueType","setEventProperties"],f=0;f<v.length;f++)n(g,v[f]);r.Revenue=g;var m=["getDeviceId","setDeviceId","getSessionId","setSessionId","getUserId","setUserId","setOptOut","setTransport","reset","extendSession"],y=["init","add","remove","track","logEvent","identify","groupIdentify","setGroup","revenue","flush"];i(r),r.createInstance=function(e){return r._iq[e]={_q:[]},i(r._iq[e]),r._iq[e]},e.amplitude=r}}(window,document)}();

  amplitude.init('YOUR_API_KEY');
</script>
```

You must replace `'YOUR_API_KEY'` with your actual Amplitude API key, which you can find in your Amplitude account.

???code-example "How do I find my Google Tag?"
    Your Google Tag can be found in every page of your website, immediately after the <head> element. The Google Tag for your account should look like the snippet below.
    ```html
      <!-- Google tag (gtag.js) -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX');
      </script>
    ```

After adding both Google Tag and Amplitude snippets, you should start to see Google Analytics events in Amplitude without additional instrumentation.
