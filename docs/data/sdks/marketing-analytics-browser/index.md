---
title: Marketing Analytics Browser
description: The Amplitude Marketing Analytics Browser SDK Installation & Quick Start guide.
icon: simple/typescript
---


![npm version](https://badge.fury.io/js/@amplitude%2Fmarketing-analytics-browser.svg)

The Marketing Analytics Browser SDK extends the Browser SDK to identify users and events based on marketing channels. This library is open-source, check it out on [GitHub](https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/marketing-analytics-browser).

!!!info "Marketing Analytics Browser SDK Resources"

    [:material-github: GitHub](https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/marketing-analytics-browser) · [:material-code-tags-check: Releases](https://github.com/amplitude/Amplitude-TypeScript/releases?q=marketing-analytics-browser&expanded=true) · [:material-book: API Reference](https://amplitude.github.io/Amplitude-TypeScript/modules/_amplitude_marketing_analytics_browser.html)

!!!note "Marketing Analytics Browser SDK versus the Browser SDK"

    The Marketing Analytics Browser SDK extends the Browser SDK with automatic web attribution and page view tracking. This doc only includes the configuration related with web attribution and page view tracking. For other functionality check the [Browser SDK](../typescript-browser).

## Getting started

### Installation

To get started with using Marketing Analytics Browser SDK, install the package in your project via NPM or script loader.

#### Install as Node package

This package is available on NPM registry and you can install it using npm or yarn.

=== "npm"

    ```bash
    npm install @amplitude/marketing-analytics-browser
    ```

=== "yarn"

    ```bash
    yarn add @amplitude/marketing-analytics-browser
    ```

#### Use script loader

This package is also distributed through a CDN. Copy and paste this script in your HTML file.

```html
<script type="text/javascript">
!function(){"use strict";!function(e,t){var r=e.amplitude||{_q:[],_iq:[]};if(r.invoked)e.console&&console.error&&console.error("Amplitude snippet has been loaded.");else{var n=function(e,t){e.prototype[t]=function(){return this._q.push({name:t,args:Array.prototype.slice.call(arguments,0)}),this}},s=function(e,t,r){return function(n){e._q.push({name:t,args:Array.prototype.slice.call(r,0),resolve:n})}},o=function(e,t,r){e[t]=function(){if(r)return{promise:new Promise(s(e,t,Array.prototype.slice.call(arguments)))}}},i=function(e){for(var t=0;t<m.length;t++)o(e,m[t],!1);for(var r=0;r<y.length;r++)o(e,y[r],!0)};r.invoked=!0;var a=t.createElement("script");a.type="text/javascript",a.integrity="sha384-PPfHw98myKtJkA9OdPBMQ6n8yvUaYk0EyUQccFSIQGmB05K6aAMZwvv8z50a5hT2",a.crossOrigin="anonymous",a.async=!0,a.src="https://cdn.amplitude.com/libs/marketing-analytics-browser-0.3.2-min.js.gz",a.onload=function(){e.amplitude.runQueuedFunctions||console.log("[Amplitude] Error: could not load SDK")};var c=t.getElementsByTagName("script")[0];c.parentNode.insertBefore(a,c);for(var u=function(){return this._q=[],this},p=["add","append","clearAll","prepend","set","setOnce","unset","preInsert","postInsert","remove","getUserProperties"],l=0;l<p.length;l++)n(u,p[l]);r.Identify=u;for(var d=function(){return this._q=[],this},v=["getEventProperties","setProductId","setQuantity","setPrice","setRevenue","setRevenueType","setEventProperties"],f=0;f<v.length;f++)n(d,v[f]);r.Revenue=d;var m=["getDeviceId","setDeviceId","getSessionId","setSessionId","getUserId","setUserId","setOptOut","setTransport","reset"],y=["init","add","remove","track","logEvent","identify","groupIdentify","setGroup","revenue","flush"];i(r),r.createInstance=function(){var e=r._iq.push({_q:[]})-1;return i(r._iq[e]),r._iq[e]},e.amplitude=r}}(window,document)}();

amplitude.init("YOUR_API_KEY_HERE");
</script>
```

## Usage

The Marketing Analytics Browser SDK has the same functionalities as the Browser SDK. For the basic usage, check out the [Browser SDK docs](../typescript-browser/).

### Configuration

In addition to the [basic configuration options](../typescript-browser/#configuration), the Marketing Analytics Browser SDK has options to configure web attribution and page view tracking.

|<div class="big-column">Name</div>| Description|
|---|----|
|`attribution.disabled`| Optional. `boolean`. Disable the attribution tracking, attribution is enabled by default |
|`attribution.excludeReferrers`|  Optional. `string[]`. Exclude the attribution tracking for the provided referrers string |
|`attribution.initialEmptyValue`| Optional. `string`. Reset the `sessionId` on a new campaign, Default value is `EMPTY` |
|`attribution.resetSessionOnNewCampaign`| Optional. `boolean`. Reset the `sessionId` on a new campaign, won't create a new session for new campaign by default. |
|`pageViewTracking.trackOn`| Optional. `attribution` or `() => boolean`. `attribution` - Fire a page view event attribution information changes. `undefined` - Fire a page view event on page load or on history changes for single page application, default behavior. `() => boolean` - Fire a page view events based on a `trackOn` functions|
|`pageViewTracking.trackHistoryChanges`  | Optional. `pathOnly` or `all`. Track the page view only on the path changes, track `all` URL changes by default|

--8<-- "includes/sdk-ts-browser/marketing-analytics.md"

### Use the Marketing Analytics SDK with Ampli

You can use Ampli with this SDK by passing an instance of the Marketing Analytics SDK to `ampli.load()`. See the [Ampli documentation](../typescript-browser/ampli.md#load) for the Browser SDK for more details on configuration. 

1. Add the Marketing Analytics Browser SDK to your project.
2. Create an instance of the SDK.
3. Pass the instance into `ampli.load()`

This example passes the "amplitude" instance to `ampli.load`.

```ts
amplitude.init(REACT_APP_AMPLITUDE_API_KEY, undefined, { ...DefaultConfiguration, logLevel: 3 });
ampli.load({ 
  client: { 
    instance: amplitude 
  } 
});
```
