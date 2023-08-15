---
title: Marketing Analytics Browser
description: The Amplitude Marketing Analytics Browser SDK Installation & Quick Start guide.
icon: simple/javascript
---

![npm version](https://img.shields.io/npm/v/@amplitude/marketing-analytics-browser)

The Marketing Analytics Browser SDK extends the Browser SDK to identify users and events based on marketing channels. This library is open-source, check it out on [GitHub](https://github.com/amplitude/Amplitude-TypeScript/tree/v1.x/packages/marketing-analytics-browser).

!!!info "Marketing Analytics Browser SDK Resources"

    [:material-github: GitHub](https://github.com/amplitude/Amplitude-TypeScript/tree/v1.x/packages/marketing-analytics-browser) · [:material-code-tags-check: Releases](https://github.com/amplitude/Amplitude-TypeScript/releases?q=marketing-analytics-browser&expanded=true) · [:material-book: API Reference](https://amplitude.github.io/Amplitude-TypeScript/modules/_amplitude_marketing_analytics_browser.html)

!!!info "Browser SDK 2.0 is now available"

    An improved version of Amplitude Browser SDK is now available. Amplitude Browser SDK 2.0 features default event tracking, improved marketing attribution tracking, simplified interface and a lighter weight package. Amplitude recommends the Browser SDK 2.0 for both product analytics and marketing analytics use cases. Upgrade to the latest [Browser SDK 2.0](../browser-2/index.md).

!!!note "Marketing Analytics Browser SDK versus the Browser SDK 1.0"

    The Marketing Analytics Browser SDK extends the Browser SDK 1.0 with automatic web attribution and page view tracking. This doc only includes the configuration related with web attribution and page view tracking. For other functionality check the [Browser SDK](../typescript-browser).

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

Basic configuration options are the same as the standard Browser SDK.

--8<-- "includes/sdk-ts-browser/shared-configurations.md"
    |`storageProvider`| `Storage<Event[]>`. Implements a custom `storageProvider` class from Storage. | `LocalStorage` |

In addition to the basic configuration options, the Marketing Analytics Browser SDK has options to configure web attribution and page view tracking.

|<div class="big-column">Name</div>| Description| Default Value|
|---|----|---|
|`attribution.disabled`| `boolean`. Whether disable the attribution tracking.| `false` |
|`attribution.excludeReferrers`| `string[]`. Exclude the attribution tracking for the provided referrers string | Including all referrers by default. | 
|`attribution.initialEmptyValue`| `string`. Customize the initial empty value for attribution related user properties to any string value. | `EMPTY` |
|`attribution.resetSessionOnNewCampaign`| `boolean`. Whether reset the `sessionId` on a new campaign. | SDK won't create a new session for new campaign by default. | 
|`pageViewTracking.trackOn`| `attribution` or `() => boolean`. `attribution` - Fire a page view event attribution information changes. `undefined` - Fire a page view event on page load or on history changes for single page application, default behavior. `() => boolean` - Fire a page view events based on a `trackOn` functions| `undefined` |
|`pageViewTracking.trackHistoryChanges`  | `pathOnly` or `all` or `undefined`. Use this option to subscribe to page view changes in a single page application like React.js. `pathOnly` - Compare the path only changes for page view tracking. `all`- Compare the full url changes for page view tracking. `undefined` - Default behavior. Page view changes in single page applications does not trigger a page view event. | `undefined` |

--8<-- "includes/sdk-ts/shared-batch-configuration.md"

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  // Events queued in memory will flush when number of events exceed upload threshold
  // Default value is 30
  flushQueueSize: 50, 
  // Events queue will flush every certain milliseconds based on setting
  // Default value is 10000 milliseconds
  flushIntervalMillis: 20000,
  // Using batch mode with batch API endpoint, `https://api2.amplitude.com/batch`
  useBatch: true
});
```

--8<-- "includes/sdk-ts/client-eu-residency.md"

--8<-- "includes/sdk-ts-browser/marketing-analytics.md"

The following information is tracked in the page view events.

|<div class="big-column">Name</div>| Description| Default Value|
|---|----|---|
|`event_type`| `string`. The event type for page view event. Configurable through enrichment plugin. | `Page View`. |
|`event_properties.page_domain`| `string`. The page domain. | `location.hostname` or ''. |
|`event_properties.page_location`| `string`. The page location. | `location.href` or ''. |
|`event_properties.page_path`| `string`. The page path. | `location.path` or ''.|
|`event_properties.page_title`| `string`. The page title. | `document.title` or ''.|
|`event_properties.page_url`| `string`. The value of page url. | `location.href.split('?')[0]` or ``.|
|`event_properties.[CampaignParam]`| `string`. The value of `UTMParameters` `ReferrerParameters` `ClickIdParameters` if has any. Check [here](./#web-attribution) for the possible keys. | Any undefined campaignParam or `undefined`. |

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
