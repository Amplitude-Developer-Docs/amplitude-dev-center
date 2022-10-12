---
title: Typescript Browser
description: The Amplitude Typescript SDK Installation & Quick Start guide.
icon: simple/typescript
---


![npm version](https://badge.fury.io/js/@amplitude%2Fanalytics-browser.svg)

The TypeScript Browser SDK lets you send events to Amplitude. This library is open-source, check it out on [GitHub](https://github.com/amplitude/Amplitude-TypeScript).

!!!info "Browser SDK Resources"
    [:material-github: GitHub](https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/analytics-browser) · [:material-code-tags-check: Releases](https://github.com/amplitude/Amplitude-TypeScript/releases) · [:material-book: API Reference](https://amplitude.github.io/Amplitude-TypeScript/)

--8<-- "includes/ampli-vs-amplitude.md"
    Click here for more documentation on [Ampli for Browser](./ampli.md).

## Getting started

### Installation

To get started with using TypeScript Browser SDK, install the package in your project via NPM or script loader.

#### Install as Node package

This package is available on NPM registry and you can install it using npm or yarn.

=== "npm"

    ```bash
    npm install @amplitude/analytics-browser
    ```

=== "yarn"

    ```bash
    yarn add @amplitude/analytics-browser
    ```

#### Use script loader

This package is also distributed through a CDN. Copy and paste this script in your HTML file.

```html
<script type="text/javascript">
!function(){"use strict";!function(e,t){var r=e.amplitude||{_q:[],_iq:[]};if(r.invoked)e.console&&console.error&&console.error("Amplitude snippet has been loaded.");else{r.invoked=!0;var n=t.createElement("script");n.type="text/javascript",n.integrity="sha384-KhsNZzlMl/yE+u/MowsLKm9jvghmBxiXW8aKvciqaaMaeHrm5uGeQluaVkpD9C7I",n.crossOrigin="anonymous",n.async=!0,n.src="https://cdn.amplitude.com/libs/analytics-browser-1.5.1-min.js.gz",n.onload=function(){e.amplitude.runQueuedFunctions||console.log("[Amplitude] Error: could not load SDK")};var s=t.getElementsByTagName("script")[0];function v(e,t){e.prototype[t]=function(){return this._q.push({name:t,args:Array.prototype.slice.call(arguments,0)}),this}}s.parentNode.insertBefore(n,s);for(var o=function(){return this._q=[],this},i=["add","append","clearAll","prepend","set","setOnce","unset","preInsert","postInsert","remove","getUserProperties"],a=0;a<i.length;a++)v(o,i[a]);r.Identify=o;for(var u=function(){return this._q=[],this},c=["getEventProperties","setProductId","setQuantity","setPrice","setRevenue","setRevenueType","setEventProperties"],l=0;l<c.length;l++)v(u,c[l]);r.Revenue=u;var p=["getDeviceId","setDeviceId","getSessionId","setSessionId","getUserId","setUserId","setOptOut","setTransport","reset"],d=["init","add","remove","track","logEvent","identify","groupIdentify","setGroup","revenue","flush"];function f(e){function t(t,r){e[t]=function(){var n={promise:new Promise((r=>{e._q.push({name:t,args:Array.prototype.slice.call(arguments,0),resolve:r})}))};if(r)return n}}for(var r=0;r<p.length;r++)t(p[r],!1);for(var n=0;n<d.length;n++)t(d[n],!0)}f(r),r.createInstance=function(){var e=r._iq.push({_q:[]})-1;return f(r._iq[e]),r._iq[e]},e.amplitude=r}}(window,document)}();

amplitude.init("YOUR_API_KEY_HERE");
</script>
```

## Usage

### Initialize the SDK

--8<-- "includes/sdk-httpv2-notice.md"

--8<-- "includes/sdk-ts-browser/init.md"

### Configuration

--8<-- "includes/sdk-ts-browser/shared-configurations.md"
|`config.trackingOptions`| Optional. `TrackingOptions` | [Learn more about tracking options](https://www.docs.developers.amplitude.com/data/sdks/typescript-browser/). |

--8<-- "includes/sdk-ts-browser/basic-ts-functions.md"

--8<-- "includes/sdk-ts-browser/marketing-analytics.md"

##### Web Attribution Enrichment Plugin

You need to download `plugin-web-attribution-browser` package and add the `webAttributionPlugin` before call init method. Learn More about [Web Attribution Plugin](../marketing-analytics-browser/#web-attribution)

=== "npm"

    ```bash
    npm install @amplitude/plugin-web-attribution-browser
    ```

=== "yarn"

    ```bash
    yarn add @amplitude/plugin-web-attribution-browser
    ```

```ts
add(webAttributionPlugin(client, attribution));

init('API_KEY', configuration);
```

##### Page View Enrichment Plugin

You need to download `plugin-page-view-tracking-browser` and add the `pageViewTrackingPlugin` before call init method. Learn More about [Page View Plugin](../marketing-analytics-browser/#page-view).

=== "npm"

    ```bash
    npm install @amplitude/plugin-page-view-tracking-browser
    ```
=== "yarn"

    ```bash
    yarn add @amplitude/plugin-page-view-tracking-browser
    ```

```ts
add(pageViewTrackingPlugin(client, pageViewTrackingOptions));

init('API_KEY', configuration);
```

!!!note
    If you need both web attribution plugin and page view plugin, please use the Marketing Analytics Browser instead. Learn more about [Marketing Analytics Browser SDK](../marketing-analytics-browser/).

## Advanced topics

### Cross domain tracking

You can track anonymous behavior across two different domains. Amplitude identifies anonymous users by their device IDs which must be passed between the domains. For example:

- Site 1: `www.example.com`
- Site 2: `www.example.org`

Users who start on Site 1 and then navigate to Site 2 must have the device ID generated from Site 1 passed as a parameter to Site 2. Site 2 then needs to initialize the SDK with the device ID.
 The SDK can parse the URL parameter automatically if `deviceId` is in the URL query parameters.

1. From Site 1, grab the device ID from `getDeviceId()`.
2. Pass the device ID to Site 2 via a URL parameter when the user navigates. (for example: `www.example.com?deviceId=device_id_from_site_1`)
3. Initialize the Amplitude SDK on Site 2 with `init('API_KEY', null)`.

If the `deviceId` isn't provided with the `init` like `init('API_KEY', null, { deviceId: 'custom-device-id' })`, then it automatically fallbacks to use URL parameter.

--8<-- "includes/abbreviations.md"
