---
title: Browser SDK
description: The Amplitude Browser SDK Installation & Quick Start guide.
icon: simple/typescript
---


![npm version](https://badge.fury.io/js/@amplitude%2Fanalytics-browser.svg)

The Browser SDK lets you send events to Amplitude. This library is open-source, check it out on [GitHub](https://github.com/amplitude/Amplitude-TypeScript).

!!!info "Browser SDK Resources"
    [:material-github: GitHub](https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/analytics-browser) · [:material-code-tags-check: Releases](https://github.com/amplitude/Amplitude-TypeScript/releases) · [:material-book: API Reference](https://amplitude.github.io/Amplitude-TypeScript/)

!!!note "Browser SDK versus the Marketing Analytics Browser"
    Amplitude recommends the Browser SDK for most users. You can extend its functionality using plugins.
    However, if you want web attribution and page view tracking without extra setup, use the Marketing Analytics Browser SDK instead. It extends the Browser SDK with built-in web attribution and page view tracking. Learn more about [Marketing Analytics Browser SDK](../marketing-analytics-browser/).

--8<-- "includes/ampli-vs-amplitude.md"
    Click here for more documentation on [Ampli for Browser](./ampli.md).

## Getting started

### Installation

To get started with using Browser SDK, install the package in your project via NPM or script loader.

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
!function(){"use strict";!function(e,t){var r=e.amplitude||{_q:[],_iq:[]};if(r.invoked)e.console&&console.error&&console.error("Amplitude snippet has been loaded.");else{r.invoked=!0;var n=t.createElement("script");n.type="text/javascript",n.integrity="sha384-14E1NARC/ZeiSAkGuFWKLbA+q7t/JmdHjr++ov3zi72E3EWa/+JhYfGjpKQFT1OT",n.crossOrigin="anonymous",n.async=!0,n.src="https://cdn.amplitude.com/libs/analytics-browser-1.6.3-min.js.gz",n.onload=function(){e.amplitude.runQueuedFunctions||console.log("[Amplitude] Error: could not load SDK")};var s=t.getElementsByTagName("script")[0];function f(e,t){e.prototype[t]=function(){return this._q.push({name:t,args:Array.prototype.slice.call(arguments,0)}),this}}s.parentNode.insertBefore(n,s);for(var o=function(){return this._q=[],this},i=["add","append","clearAll","prepend","set","setOnce","unset","preInsert","postInsert","remove","getUserProperties"],a=0;a<i.length;a++)f(o,i[a]);r.Identify=o;for(var u=function(){return this._q=[],this},c=["getEventProperties","setProductId","setQuantity","setPrice","setRevenue","setRevenueType","setEventProperties"],p=0;p<c.length;p++)f(u,c[p]);r.Revenue=u;var l=["getDeviceId","setDeviceId","getSessionId","setSessionId","getUserId","setUserId","setOptOut","setTransport","reset"],d=["init","add","remove","track","logEvent","identify","groupIdentify","setGroup","revenue","flush"];function v(e,t,r){return function(n){e._q.push({name:t,args:Array.prototype.slice.call(r,0),resolve:n})}}function m(e,t,r){e[t]=function(){if(r)return{promise:new Promise(v(e,t,Array.prototype.slice.call(arguments)))}}}function g(e){for(var t=0;t<l.length;t++)m(e,l[t],!1);for(var r=0;r<d.length;r++)m(e,d[r],!0)}g(r),r.createInstance=function(){var e=r._iq.push({_q:[]})-1;return g(r._iq[e]),r._iq[e]},e.amplitude=r}}(window,document)}();

amplitude.init("YOUR_API_KEY_HERE");
</script>
```

## Usage

### Initialize the SDK

--8<-- "includes/sdk-httpv2-notice.md"

--8<-- "includes/sdk-ts-browser/init.md"

### Logging

--8<-- "includes/sdk-ts/client-logging.md"

### Configuration

--8<-- "includes/sdk-ts-browser/shared-configurations.md"

### EU data residency

You can configure the server zone when initializing the client for sending data to Amplitude's EU servers. The SDK sends data based on the server zone if it's set.

!!!note
    For EU data residency, the project must be set up inside Amplitude EU. You must initialize the SDK with the API key from Amplitude EU.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  serverZone: amplitude.Types.ServerZone.EU,
});
```

### Track an event

--8<-- "includes/sdk-httpv2-notice.md"

Events represent how users interact with your application. For example, "Button Clicked" may be an action you want to note.

```ts
import { track } from '@amplitude/analytics-browser';

// Track a basic event
track('Button Clicked');

// Track events with optional properties
const eventProperties = {
  buttonColor: 'primary',
};
track('Button Clicked', eventProperties);
```

### User properties

User properties are details like device details, user preferences, or language to help you understand your users at the time they performed an action in your app.

Identify is for setting the user properties of a particular user without sending any event. The SDK supports the operations `set`, `setOnce`, `unset`, `add`, `append`, `prepend`, `preInsert`, `postInsert`, and `remove` on individual user properties. Declare the operations via a provided Identify interface. You can chain together multiple operations in a single Identify object. The Identify object is then passed to the Amplitude client to send to the server.

!!!note
    If the Identify call is sent after the event, the results of operations are visible immediately in the dashboard user’s profile area. However, they won't appear in chart results until another event is sent after the Identify call. The identify call only affects events going forward. More details [here](https://amplitude.zendesk.com/hc/en-us/articles/115002380567-User-Properties-Event-Properties#applying-user-properties-to-events).

#### Set a user property

The Identify object provides controls over setting user properties. It works like this: first, instantiate an Identify object, then call Identify methods on it, and finally, the client can make a call with the Identify object.

```ts
import { identify, Identify } from '@amplitude/analytics-browser';

const identifyObj = new Identify();
identify(identifyObj);
```

#### Identify.set

This method sets the value of a user property. For example, you can set a role property of a user.

```ts
import { identify, Identify } from '@amplitude/analytics-browser';

const identifyObj = new Identify();
identifyObj.set('location', 'LAX');

identify(identifyObj);
```

#### Identify.setOnce

This method sets the value of a user property only one time. Subsequent calls using `setOnce()` are ignored. For example, you can set an initial login method for a user and because only the initial value is tracked, `setOnce()` ignores later calls.

```ts
import { identify, Identify } from '@amplitude/analytics-browser';

const identifyObj = new Identify();
identifyObj.setOnce('initial-location', 'SFO');

identify(identifyObj);
```

#### Identify.add

This method increments a user property by some numerical value. If the user property doesn't have a value set yet, it's initialized to 0 before it's incremented. For example, you can track a user's travel count.

```ts
import { identify, Identify } from '@amplitude/analytics-browser';

const identifyObj = new Identify();
identifyObj.add('travel-count', 1);

identify(identifyObj);
```

#### Arrays in user properties

You can use arrays as user properties. Directly set arrays or use `prepend`, `append`, `preInsert` and `postInsert` to generate an array.

#### Identify.prepend

This method prepends a value or values to a user property array. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are prepended.

```ts
import { identify, Identify } from '@amplitude/analytics-browser';

const identifyObj = new Identify();
identifyObj.prepend('visited-locations', 'LAX');

identify(identifyObj);
```

#### Identify.append

This method appends a value or values to a user property array. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are prepended.

```ts
import { identify, Identify } from '@amplitude/analytics-browser';

const identifyObj = new Identify();
identifyObj.append('visited-locations', 'SFO');

identify(identifyObj);
```

#### Identify.preInsert

This method pre-inserts a value or values to a user property, if it doesn't exist in the user property yet. Pre-insert means inserting the values at the beginning of a given list. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are pre-inserted. If the user property has an existing value, this method is a no-op.

```ts
import { identify, Identify } from '@amplitude/analytics-browser';

const identifyObj = new Identify();
identifyObj.preInsert('unique-locations', 'LAX');

identify(identifyObj);
```

#### Identify.postInsert

This method post-inserts a value or values to a user property, if it doesn't exist in the user property yet. Post-insert means inserting the values at the end of a given list. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are post-inserted. If the user property has an existing value, this method is a no-op..

```ts
import { identify, Identify } from '@amplitude/analytics-browser';

const identifyObj = new Identify();
identifyObj.postInsert('unique-locations', 'SFO');

identify(identifyObj);
```

#### Identify.remove

This method removes a value or values to a user property, if it exists in the user property. Remove means remove the existing values from the given list. If the user property has an existing value, this method is a no-op.

```ts
import { identify, Identify } from '@amplitude/analytics-browser';

const identifyObj = new Identify();
identifyObj.remove('unique-locations', 'JFK')

identify(identifyObj);
```

### User groups

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

--8<-- "includes/groups-intro-paragraph.md"

```ts
import { setGroup } from '@amplitude/analytics-browser';

// set group with single group name
setGroup('orgId', '15');

// set group with multiple group names
setGroup('sport', ['soccer', 'tennis']);
```

### Group properties

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

Use the Group Identify API to set or update properties of particular groups. These updates only affect events going forward.

The `groupIdentify()` method accepts a group type and group name string parameter, as well as an Identify object that's applied to the group.

```ts
import { groupIdentify, Identify } from '@amplitude/analytics-browser';

const groupType = 'plan';
const groupName = 'enterprise';
const groupIdentifyObj = new Identify()
groupIdentifyObj.set('key1', 'value1');

groupIdentify(groupType, groupName, groupIdentifyObj);
```

### Revenue tracking
<!-- vale off-->

The preferred method of tracking revenue for a user is to use `revenue()` in conjunction with the provided Revenue interface. Revenue instances store each revenue transaction and allow you to define several special revenue properties (such as 'revenueType' and 'productIdentifier') that are used in Amplitude's Event Segmentation and Revenue LTV charts. These Revenue instance objects are then passed into `revenue()` to send as revenue events to Amplitude. This lets automatically display data relevant to revenue in the platform. You can use this to track both in-app and non-in-app purchases.

<!--vale on-->

To track revenue from a user, call revenue each time a user generates revenue. For example, 3 units of a product was purchased at $3.99.

```ts
import { revenue, Revenue } from '@amplitude/analytics-browser';

const event = new Revenue()
  .setProductId('com.company.productId')
  .setPrice(3.99)
  .setQuantity(3);

revenue(event);
```

#### Revenue interface

|Name | Description |
|-----|-------|
|`product_id` | Optional. String. An identifier for the product. Amplitude recommend something like the Google Play Store product ID. Defaults to null. |
|`quantity` | Required. Int. The quantity of products purchased. Note: revenue = quantity * price. Defaults to 1|
|`price` | Required. Double. The price of the products purchased, and this can be negative. Note: revenue = quantity * price. Defaults to null. |
|`revenue_type` | Optional, but required for revenue verification. String. The revenue type (for example, tax, refund, income).  Defaults to null.|
|`receipt`| Optional. String. The receipt identifier of the revenue. Defaults to null|
|`receipt_sig`| Optional, but required for revenue verification. String. The receipt signature of the revenue. Defaults to null.|
|`properties`| Optional. JSONObject. An object of event properties to include in the revenue event. Defaults to null.

### Flush the event buffer

The `flush` method triggers the client to send buffered events immediately.

```typescript
import { flush } from '@amplitude/analytics-browser';

flush();
```

By default, `flush` is called automatically in an interval, if you want to flush the events all together, you can control the async flow with the optional Promise interface, example:

```typescript
import { flush, init, track } from '@amplitude/analytics-browser';

await init(AMPLITUDE_API_KEY).promise;
track('Button Clicked');
await flush().promise;
```

### Custom user ID

If your app has its own login system that you want to track users with, you can call `setUserId` at any time.

TypeScript

```ts
import { setUserId } from '@amplitude/analytics-browser';

setUserId('user@amplitude.com');
```

You can also assign the User ID as an argument to the init call.

```ts
import { init } from '@amplitude/analytics-browser';

init(API_KEY, 'user@amplitude.com');
```

### Custom session ID

You can assign a new Session ID using `setSessionId`. When setting a custom session ID, make sure the value is in milliseconds since epoch (Unix Timestamp).

TypeScript

```ts
import { setSessionId } from '@amplitude/analytics-browser';

setSessionId(Date.now());
```

### Custom device ID

If your app has its own login system that you want to track users with, you can call `setUserId` at any time.

You can assign a new device ID using `deviceId`. When setting a custom device ID, make sure the value is sufficiently unique. Amplitude recommends using a UUID.

```ts
import { setDeviceId } from '@amplitude/analytics-browser';
const { uuid } = require('uuidv4');

setDeviceId(uuid());
```

### Reset when user logs out

`reset` is a shortcut to anonymize users after they log out, by:

- setting `userId` to `undefined`
- setting `deviceId` to a new UUID value

With an undefined `userId` and a completely new `deviceId`, the current user would appear as a brand new user in dashboard.

```ts
import { reset } from '@amplitude/analytics-browser';

reset();
```

### Opt users out of tracking

You can turn off logging for a given user by setting `setOptOut` to `true`.

```ts
import { setOptOut } from '@amplitude/analytics-browser';

setOptOut(true);
```

Events aren't saved or sent to the server while `setOptOut` is enabled, and the setting persists across page loads. 

Re-enable logging by setting `setOptOut` to `false`.

```ts
import { setOptOut } from '@amplitude/analytics-browser';

setOptOut(false);
```

### Optional tracking

By default, the SDK tracks these properties automatically. You can override this behavior by passing a configuration called `trackingOptions` when initializing the SDK, setting the appropriate options to false.

| Tracking Options | Default |
| --- | --- |
| `deviceManufacturer` | `true` |
| `deviceModel` | `true` |
| `ipAddress` | `true` |
| `language` | `true` |
| `osName` | `true` |
| `osVersion` | `true` |
| `platform` | `true` |

```ts
import { init } from '@amplitude/analytics-browser';

init(API_KEY, OPTIONAL_USER_ID, {
  trackingOptions: {
    deviceManufacturer: false,
    deviceModel: false,
    ipAddress: false,
    language: false,
    osName: false,
    osVersion: false,
    platform: false,
  },
});
```

### Callback

All asynchronous API are optionally awaitable through a Promise interface. This also serves as callback interface.

```ts
import { track } from '@amplitude/analytics-browser';

// Using async/await
const results = await track('Button Clicked').promise;
result.event; // {...} (The final event object sent to Amplitude)
result.code; // 200 (The HTTP response status code of the request.
result.message; // "Event tracked successfully" (The response message)

// Using promises
track('Button Clicked').promise.then((result) => {
  result.event; // {...} (The final event object sent to Amplitude)
  result.code; // 200 (The HTTP response status code of the request.
  result.message; // "Event tracked successfully" (The response message)
});
```

### Plugins

Plugins allow you to extend Amplitude SDK's behavior by, for example, modifying event properties (enrichment type) or sending to a third-party APIs (destination type). A plugin is an object with methods `setup()` and `execute()`.

#### `add`

The `add` method adds a plugin to Amplitude. Plugins can help processing and sending events.

```typescript
import { add } from '@amplitude/analytics-browser';

add(new Plugin());
```

#### `remove`

The `remove` method removes the given plugin name from the client instance if it exists.

```typescript
import { remove } from '@amplitude/analytics-browser';

remove(plugin.name);
```

#### Create your custom plugin

##### Plugin.setup

This method contains logic for preparing the plugin for use and has config as a parameter. The expected return value is undefined. A typical use for this method, is to copy configuration from config or instantiate plugin dependencies. This method is called when the plugin is registered to the client via `client.add()`.

##### Plugin.execute

This method contains the logic for processing events and has event as parameter. If used as enrichment type plugin, the expected return value is the modified/enriched event. If used as a destination type plugin, the expected return value is undefined. This method is called for each event that's instrumented using the client interface, including Identify, GroupIdentify and Revenue events.

#### Plugin examples

##### Destination type plugin

Here's an example of a plugin that sends each event that's instrumented to a target server URL using your preferred HTTP client.

```ts
import { add, BrowserConfig, DestinationPlugin, Event, init, PluginType, Result } from '@amplitude/analytics-types';

export class MyDestinationPlugin implements DestinationPlugin {
  name = 'my-destination-plugin';
  type = PluginType.DESTINATION as const;
  serverUrl: string;
  config?: BrowserConfig;

  constructor(serverUrl: string) {
    this.serverUrl = serverUrl;
  }

  /**
   * setup() is called on plugin installation
   * example: client.add(new MyDestinationPlugin());
   */
  async setup(config: BrowserConfig): Promise<undefined> {
    this.config = config;
    return;
  }

  /**
   * execute() is called on each event instrumented
   * example: client.track('New Event');
   */
  async execute(event: Event): Promise<Result> {
    const payload = { key: 'secret', data: event };
    const response = await fetch(this.serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
      body: JSON.stringify(payload),
    });
    return {
      code: response.status,
      event: event,
      message: response.statusText,
    };
  }
}

init('API_KEY');
add(new MyDestinationPlugin('https://custom.domain.com'));
```

##### Enrichment type plugin

Here's an example of a plugin that modifies each event that's instrumented by adding an increment integer to `event_id` property of an event starting from 100.

```ts
import { add, BrowserConfig, EnrichmentPlugin, Event, init, PluginType } from '@amplitude/analytics-types';

export class AddEventIdPlugin implements EnrichmentPlugin {
  name = 'add-event-id';
  type = PluginType.ENRICHMENT as const;
  currentId = 100;
  config?: BrowserConfig;

  /**
   * setup() is called on plugin installation
   * example: client.add(new AddEventIdPlugin());
   */
  async setup(config: BrowserConfig): Promise<undefined> {
     this.config = config;
     return;
  }

  /**
   * execute() is called on each event instrumented
   * example: client.track('New Event');
   */
  async execute(event: Event): Promise<Event> {
    event.event_id = this.currentId++;
    return event;
  }
}

init('API_KEY');
add(new AddEventIdPlugin());
```

##### Web Attribution Enrichment Plugin

You need to download `plugin-web-attribution-browser` package and add the `webAttributionPlugin` before call init method. 

=== "npm"

    ```bash
    npm install @amplitude/plugin-web-attribution-browser
    ```

=== "yarn"

    ```bash
    yarn add @amplitude/plugin-web-attribution-browser
    ```

```ts
import * as client from '@amplitude/analytics-browser';
import { add, init } from '@amplitude/analytics-browser';
import { webAttributionPlugin } from '@amplitude/plugin-web-attribution-browser';

add(webAttributionPlugin(client, attributionOptions));

init('API_KEY', configurationObj);
```

See the [configuration options](../marketing-analytics-browser/#configuration).
Learn more about what the [Web Attribution Plugin](../marketing-analytics-browser/#web-attribution) supports.

###### Differences from base SDK

Enabling the Attribution plugin overwrites the default attribution tracking behavior of the SDK.

The SDK’s built in attribution tracking only tracks attribution at the start of sessions. This mean if a user re-enters the site through a new campaign channel (such as direct or an ad) in the middle of a session, this new channel isn't recorded.

If the `trackNewCampaigns` option is set to `true`, the campaigns are tracked, and the user’s session is reset when a new campaign is detected.

The Attribution plugin tracks all campaigns, regardless of whether the user is at the start of a session.

Set the `resetSessionOnNewCampaign` option to `true` to cause the user’s session to be reset when a new campaign is detected. The session isn't reset in the case where the referrer is just a different subdomain of your site.

##### Page View Enrichment Plugin

You need to download `plugin-page-view-tracking-browser` and add the `pageViewTrackingPlugin` before calling the init method.

=== "npm"

    ```bash
    npm install @amplitude/plugin-page-view-tracking-browser
    ```
=== "yarn"

    ```bash
    yarn add @amplitude/plugin-page-view-tracking-browser
    ```

```ts
import * as client from '@amplitude/analytics-browser';
import { pageViewTrackingPlugin } from '@amplitude/plugin-page-view-tracking-browser';

const { add, init } = client;

add(pageViewTrackingPlugin(client, pageViewTrackingOptions));

init('API_KEY', configurationObj);
```

See the [configuration options](../marketing-analytics-browser/#configuration).
Learn more about what the [Page View Plugin](../marketing-analytics-browser/#page-view) supports.

###### Differences from base SDK

The base SDK sends Page View events when a user’s campaign is tracked if the `attribution.trackPageViews` option is set to `true`.

The page view plugin sends a Page View event on each page a user visits by default. It also offers options to customize this behavior.

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

### Custom HTTP Client

You can provide an implementation of `Transport` interface to the `transportProvider` configuration option for customization purpose, for example, sending requests to your proxy server with customized HTTP request headers.

```ts
import { init } from '@amplitude/analytics-browser';
import { Transport } from '@amplitude/analytics-types';

class MyTransport implements Transport {
  async send(serverUrl: string, payload: Payload): Promise<Response | null> {
    // check example: https://github.com/amplitude/Amplitude-TypeScript/blob/main/packages/analytics-client-common/src/transports/fetch.ts
  }
}

init(API_KEY, OPTIONAL_USER_ID, {
  transportProvider: new MyTransport(),
});
```

--8<-- "includes/abbreviations.md"
