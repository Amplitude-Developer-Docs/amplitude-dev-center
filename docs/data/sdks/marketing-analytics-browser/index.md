---
title: Marketing Analytics Browser
description: The Amplitude Marketing Analytics Browser SDK Installation & Quick Start guide.
icon: simple/typescript
---


![npm version](https://badge.fury.io/js/@amplitude%2Fmarketing-analytics-browser.svg)

The Marketing Analytics Browser SDK extends the Browser SDK to identify users and events based on marketing channels. This library is open-source, check it out on [GitHub](https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/marketing-analytics-browser).

!!!info "Marketing Analytics Browser SDK Resources"
    [:material-github: Github](https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/marketing-analytics-browser) · [:material-code-tags-check: Releases](https://github.com/amplitude/Amplitude-TypeScript/releases?q=marketing-analytics-browser&expanded=true) · [:material-book: API Reference](https://amplitude.github.io/Amplitude-TypeScript/modules/_amplitude_marketing_analytics_browser.html)

!!!note "Marketing Analytics Browser versus the Typescript Broswer SDK"
    The Marketing Analytics Browser SDK extends the Typescript Browser SDK with automatically web attribution and page view tracking. This doc only includes the configuration related with web attribution and page view tracking. For other functionalities please check the [Typescript Browser](../typescript-browser).

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
!function(){"use strict";!function(e,t){var n=e.amplitude||{_q:[],_iq:[]};if(n.invoked)e.console&&console.error&&console.error("Amplitude snippet has been loaded.");else{n.invoked=!0;var r=t.createElement("script");r.type="text/javascript",r.integrity="sha384-QhZkEQJe2NFJ4yDkn/RFnD+NP0FINrep4tUh958v8McXRqszeRUQWbwBCfFqZvnF",r.crossOrigin="anonymous",r.async=!0,r.src="https://cdn.amplitude.com/libs/marketing-analytics-browser-0.2.0-min.js.gz",r.onload=function(){e.amplitude.runQueuedFunctions||console.log("[Amplitude] Error: could not load SDK")};var s=t.getElementsByTagName("script")[0];function v(e,t){e.prototype[t]=function(){return this._q.push({name:t,args:Array.prototype.slice.call(arguments,0)}),this}}s.parentNode.insertBefore(r,s);for(var o=function(){return this._q=[],this},i=["add","append","clearAll","prepend","set","setOnce","unset","preInsert","postInsert","remove","getUserProperties"],a=0;a<i.length;a++)v(o,i[a]);n.Identify=o;for(var u=function(){return this._q=[],this},c=["getEventProperties","setProductId","setQuantity","setPrice","setRevenue","setRevenueType","setEventProperties"],p=0;p<c.length;p++)v(u,c[p]);n.Revenue=u;var l=["getDeviceId","setDeviceId","getSessionId","setSessionId","getUserId","setUserId","setOptOut","setTransport","reset"],d=["init","add","remove","track","logEvent","identify","groupIdentify","setGroup","revenue","flush"];function f(e){function t(t,n){e[t]=function(){var r={promise:new Promise((n=>{e._q.push({name:t,args:Array.prototype.slice.call(arguments,0),resolve:n})}))};if(n)return r}}for(var n=0;n<l.length;n++)t(l[n],!1);for(var r=0;r<d.length;r++)t(d[r],!0)}f(n),n.createInstance=function(){var e=n._iq.push({_q:[]})-1;return f(n._iq[e]),n._iq[e]},e.amplitude=n}}(window,document)}();

amplitude.init("YOUR_API_KEY_HERE");
</script>
```

## Usage

The marketing analytics browser has the same functionalities as the typescript browser SDK. For the basic usage, please check [here](../typescript-browser/).

### Configuration

Beside the [basic configuration options](../typescript-browser/#configuration), the Marketing Analytics Browser SDK also provide options to configure web attribution and page view tracking.

|<div class="big-column">Name  </div>    | Value|Description|
|----|----|----|
|`attribution.disabled`| Optional. `boolean` | Disable the attribution tracking, attribution is enabled by default |
|`attribution.excludeReferrers`|  Optional. `string[]` | Exclude the attribution tracking for the provided referrers string |
|`attribution.initialEmptyValue`| Optional. `string` | Reset the `sessionId` on a new campaign, Default value is `EMPTY` |
|`attribution.resetSessionOnNewCampaign`| Optional. `boolean` | Reset the `sessionId` on a new campaign, won't create a new session for new campaign by default |
|`pageViewTracking.trackOn`| Optional. `attribution` or `() => boolean` | `attribution` - Fire a page view event attribution information changes. `undefined` - Fire a page view event on page load or on history changes for single page application, default behavior. `() => boolean` - Fire a page view events based on a `trackOn` functions|
|`attribution.pageViewTracking.trackHistoryChanges`  | Optional. `pathOnly` or `all` | Track the page view only on the path changes, track `all` URL changes by default|

--8<-- "includes/sdk-ts-browser/marketing-analytics.md"