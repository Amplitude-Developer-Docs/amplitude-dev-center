---
title: Typescript Browser
description: The Amplitude Typescript SDK Installation & Quick Start guide.
icon: material/language-typescript
---


![npm version](https://badge.fury.io/js/@amplitude%2Fanalytics-browser.svg)

The TypeScript Browser SDK lets you send events to Amplitude. This library is open-source, check it out on [GitHub](https://github.com/amplitude/Amplitude-TypeScript).

!!!info "SDK Resources"
    - [TypeScript Browser SDK Reference :material-book:](https://amplitude.github.io/Amplitude-TypeScript/)
    - [TypeScript Browser SDK Repository :material-github:](https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/analytics-browser)
    - [TypeScript Browser SDK Releases :material-code-tags-check:](https://github.com/amplitude/Amplitude-TypeScript/releases)

--8<-- "includes/ampli-vs-amplitude.md"

## Getting Started

### Installation

To get started with using TypeScript Browser SDK, install the package to your project via NPM or script loader.

#### Installing as Node package

This package is available on NPM registry and can be installed using npm and yarn.

=== "npm"

    ```bash
    npm install @amplitude/analytics-browser
    ```

=== "yarn"

    ```bash
    yarn add @amplitude/analytics-browser
    ```

#### Using script loader

This package is also distributed through a CDN. Copy and paste this script in your HTML file.

```html
<script type="text/javascript">
!function(){"use strict";!function(e,t){var r=e.amplitude||{_q:[]};if(r.invoked)e.console&&console.error&&console.error("Amplitude snippet has been loaded.");else{r.invoked=!0;var n=t.createElement("script");n.type="text/javascript",n.integrity="sha384-XNX6U2ua04l5JNPk8racSkagg14UYkjWQjQmbRhYhLh0rtnEFZ1QTynnf4EUTukV",n.crossOrigin="anonymous",n.async=!0,n.src="https://cdn.amplitude.com/libs/analytics-browser-1.1.1-min.js.gz",n.onload=function(){e.amplitude.runQueuedFunctions||console.log("[Amplitude] Error: could not load SDK")};var s=t.getElementsByTagName("script")[0];function v(e,t){e.prototype[t]=function(){return this._q.push({name:t,args:Array.prototype.slice.call(arguments,0)}),this}}s.parentNode.insertBefore(n,s);for(var o=function(){return this._q=[],this},i=["add","append","clearAll","prepend","set","setOnce","unset","preInsert","postInsert","remove","getUserProperties"],a=0;a<i.length;a++)v(o,i[a]);r.Identify=o;for(var u=function(){return this._q=[],this},c=["getEventProperties","setProductId","setQuantity","setPrice","setRevenue","setRevenueType","setEventProperties"],l=0;l<c.length;l++)v(u,c[l]);r.Revenue=u;var p=["getDeviceId","setDeviceId","getSessionId","setSessionId","getUserId","setUserId","setOptOut","setTransport","reset"],d=["init","add","remove","track","logEvent","identify","groupIdentify","setGroup","revenue","flush"];function f(e){function t(t,r){e[t]=function(){var n={promise:new Promise((r=>{e._q.push({name:t,args:Array.prototype.slice.call(arguments,0),resolve:r})}))};if(r)return n}}for(var r=0;r<p.length;r++)t(p[r],!1);for(var n=0;n<d.length;n++)t(d[n],!0)}f(r),e.amplitude=r}}(window,document)}();

amplitude.init("YOUR_API_KEY_HERE");
</script>
```

## Usage

### Initializing SDK

You must initialize the SDK before you can instrument any events. Your Amplitude project's API key is required. You can pass an optional user ID and config object in this call. You can use the SDK anywhere after it's initialized anywhere in an application.

```ts
import { init } from '@amplitude/analytics-browser';

// Option 1, initialize with API_KEY only
init(API_KEY);

// Option 2, initialize including user ID if it's already known
init(API_KEY, 'user@amplitude.com');

// Option 3, initialize including configuration
init(API_KEY, 'user@amplitude.com', {
  disableCookies: true, // Disables the use of browser cookies
});
```

#### EU data residency

You can configure the server zone when initializing the client for sending data to Amplitude's EU servers. The SDK sends data based on the server zone if it's set.

!!!note
    For EU data residency, the project must be set up inside Amplitude EU. You must initialize the SDK with the API key from Amplitude EU.

```ts
import * as amplitude from '@amplitude/analytics-browser';

amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  serverZone: 'EU',
});
```

### Tracking an event

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

User properties help you understand your users at the time they performed some action within your app such as their device details, their preferences, or language.

Identify is for setting the user properties of a particular user without sending any event. The SDK supports the operations `set`, `setOnce`, `unset`, `add`, `append`, `prepend`, `preInsert`, `postInsert`, and `remove` on individual user properties. The operations are declared via a provided Identify interface. You can chain together multiple operations in a single Identify object. The Identify object is then passed to the Amplitude client to send to the server.

!!!note 
    If the Identify call is sent after the event, the results of operations are visible immediately in the dashboard user’s profile area, but it doesn't appear in chart result until another event is sent after the Identify call. The identify call only affects events going forward. More details [here](https://amplitude.zendesk.com/hc/en-us/articles/115002380567-User-Properties-Event-Properties#applying-user-properties-to-events).

#### Setting a user property

The Identify object provides controls over setting user properties. An Identify object must first be instantiated, then Identify methods can be called on it, and finally the client makes a call with the Identify object.

```ts
import { identify, Identify } from '@amplitude/analytics-browser';

const identifyObj = new Identify();
identify(identifyObj);
```

### Identify.set

This method sets the value of a user property. For example, you can set a role property of a user.

```ts
import { Identify, identify } from '@amplitude/analytics-browser';

const identifyObj = new Identify();
identifyObj.set('location', 'LAX');

identify(identifyObj);
```

#### Identify.setOnce

This method sets the value of a user property only one time. Subsequent calls using `setOnce()` are ignored. For example, you can set an initial login method for a user and because only the initial value is tracked, `setOnce()` ignores later calls.

```ts
import { Identify, identify } from '@amplitude/analytics-browser';

const identifyObj = new Identify();
identifyObj.setOnce('initial-location', 'SFO');

identify(identifyObj);
```

#### Identify.add

This method increments a user property by some numerical value. If the user property doesn't have a value set yet, it's initialized to 0 before being incremented. For example, you can track a user's travel count.

```ts
import { Identify, identify } from '@amplitude/analytics-browser';

const identifyObj = new Identify();
identifyObj.add('travel-count', 1);

identify(identifyObj);
```

#### Arrays in user properties

Arrays can be used as user properties. You can directly set arrays or use `prepend`, `append`, `preInsert` and `postInsert` to generate an array.

#### Identify.prepend

This method prepends a value or values to a user property array. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are prepended.

```ts
import { Identify, identify } from '@amplitude/analytics-browser';

const identifyObj = new Identify();
identifyObj.prepend('visited-locations', 'LAX');

identify(identifyObj);
```

#### Identify.append

This method appends a value or values to a user property array. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are prepended.

```ts
import { Identify, identify } from '@amplitude/analytics-browser';

const identifyObj = new Identify();
identifyObj.append('visited-locations', 'SFO');

identify(identifyObj);
```

#### Identify.preInsert

This method pre-inserts a value or values to a user property, if it doesn't exist in the user property yet. Pre-insert means inserting the value(s) at the beginning of a given list. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are pre-inserted. If the user property has an existing value, this method is a no-op.

```ts
import { Identify, identify } from '@amplitude/analytics-browser';

const identifyObj = new Identify();
identifyObj.preInsert('unique-locations', 'LAX');

identify(identifyObj);
```

#### Identify.postInsert

This method post-inserts a value or values to a user property, if it doesn't exist in the user property yet. Post-insert means inserting the value(s) at the end of a given list. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are post-inserted. If the user property has an existing value, this method is a no-op..

```ts
import { Identify, identify } from '@amplitude/analytics-browser';

const identifyObj = new Identify();
identifyObj.postInsert('unique-locations', 'SFO');

identify(identifyObj);
```

#### Identify.remove

This method removes a value or values to a user property, if it exists in the user property. Remove means remove the existing value(s) from the given list. If the user property has an existing value, this method is a no-op.

```ts
import { Identify, identify } from '@amplitude/analytics-browser';

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
import { Identify, groupIdentify } from '@amplitude/analytics-browser';

const groupType = 'plan';
const groupName = 'enterprise';
const event = new Identify()
event.set('key1', 'value1');

groupIdentify(groupType, groupName, identify);
```

### Revenue tracking

The preferred method of tracking revenue for a user is to use `revenue()` in conjunction with the provided Revenue interface. Revenue instances store each revenue transaction and allow you to define several special revenue properties (such as 'revenueType' and 'productIdentifier') that are used in Amplitude's Event Segmentation and Revenue LTV charts. These Revenue instance objects are then passed into `revenue()` to send as revenue events to Amplitude. This lets automatically display data relevant to revenue in the platform. You can use this to track both in-app and non-in-app purchases.

To track revenue from a user, call revenue each time a user generates revenue. For example, 3 units of a product was purchased at $3.99.

```ts
import { Revenue, revenue } from '@amplitude/analytics-browser';

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

### Flushing event buffer

The `flush` method triggers the client to send buffered events immediately.

```typescript
import { flush } from '@amplitude/analytics-browser';

flush();
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

You can assign a new Session ID using `setSessionId`. When setting a custom session ID, make sure the value is in milliseconds since epoch (Unix Timestamp).

TypeScript

```ts
import { setSessionId } from '@amplitude/analytics-browser';

setSessionId(Date.now());
```

### Custom device ID

If your app has its own login system that you want to track users with, you can call `setUserId` at any time.

You can assign a new device ID using `deviceId`. When setting a custom device ID, make sure the value is sufficiently unique. A UUID is recommended.

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
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
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

The `add` method adds a plugin to Amplitude. Plugins can help processing and sending events.

```typescript
import { add } from '@amplitude/analytics-browser';

add(new Plugin());
```

#### `remove`

The `remove` method removes the given plugin name from the client instance if it exists.

```typescript
import { remove } from '@amplitude/analytics-browser';

remove(plugin.name);
```

#### Creating your custom plugin

#### Plugin.setup

This method contains logic for preparing the plugin for use and has config as a parameter. The expected return value is undefined. A typical use for this method, is to copy configuration from config or instantiate plugin dependencies. This method is called when the plugin is registered to the client via `client.add()`.

#### Plugin.execute

This method contains the logic for processing events and has event as parameter. If used as enrichment type plugin, the expected return value is the modified/enriched event. If used as a destination type plugin, the expected return value is undefined. This method is called for each event that's instrumented using the client interface, including Identify, GroupIdentify and Revenue events.

#### Plugin examples

##### Enrichment type plugin

Here's an example of a plugin that modifies each event that's instrumented by adding an increment integer to `event_id` property of an event starting from 100.

```ts
import { init, add } from '@amplitude/analytics-browser';
import { BrowserConfig, EnrichmentPlugin, Event, PluginType } from '@amplitude/analytics-types';

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

#### Destination type plugin

Here's an example of a plugin that sends each event that's instrumented to a target server URL using your preferred HTTP client.

```ts
import { init, add } from '@amplitude/analytics-browser';
import { BrowserConfig, DestinationPlugin, Event, PluginType, Result } from '@amplitude/analytics-types';

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

## Advanced topics

### Web attribution

Amplitude SDK collects attribution data by default. Amplitude supports automatically tracking the following attribution parameters:

- The 5 standard UTM parameters from the user's browser cookie or URL parameters
- The referring URL and domain
- Google Click Identifier from URL parameters
- Facebook Click Identifier from URL parameters

#### UTM parameters

UTM (Urchin Traffic Monitor) parameters are useful for analyzing the effectiveness of different ad campaigns and referring sites. UTM parameters are case-sensitive, so they're treated as different values when the capitalization varies.

There are five different standard UTM parameters:

- `utm_source`: This identifies which website sent the traffic (for example, Google, Facebook)
- `utm_medium`: This identifies the link type used (for example, banner, button, email)
- `utm_campaign`: This identifies a specific campaign used (for example, "summer_sale")
- `utm_term`: This identifies paid search terms used (for example, product+analytics)
- `utm_content`: This identifies what brought the user to the site and is commonly used for A/B testing (for example, bannerlink, textlink)

Here is an example URL with UTM parameters:

```html
https://www.amplitude.com/?utm_source=newsletter&utm_campaign=product_analytics_playbook&utm_medium=email&utm_term=product%20analytics&utm_content=bannerlink
```

#### Referrer parameters

Referrer is the URL of the page that linked to the destination page. Referrer is an empty string '' if the user navigated to the destination page directly. Amplitude tracks the following parameters:

- `referrer`: The last page the user was on (for example, `https://amplitude.com/behavioral-analytics-platform?ref=nav`)
- `referring_domain`: The domain that the user was last on (for example, `https://amplitude.com`)

#### Click ID parameters

Click IDs are campaign identifiers included as URL parameters. These IDs are used by Ad platforms to identify the campaign and other attributes. While Amplitude doesn't have access to further campaign attributes associated to Click IDs, Amplitude can track Click ID values specified below.

- `gclid`: Google Click Identifier
- `fbclid`: Facebook Click Identifier

#### First-touch attribution

Amplitude captures the initial attribution data at the start of the first session. The first-touch attribution values are set when a user's attribution data are seen for the first time. The following user properties are set one time:

- `initial_utm_source`
- `initial_utm_medium`
- `initial_utm_campaign`
- `initial_utm_term`
- `initial_utm_content`
- `initial_referrer`
- `initial_referring_domain`
- `initial_gclid`
- `initial_fbclid`

For users who initially visits a page directly or organically, by default, the initial value is set to `"EMPTY"`. If a different initial value is preferred, this can be done by setting `attriubtion.initialEmptyValue` to any string value.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  attribution: {
    initialEmptyValue: "none",
  }
});
```

#### Multi-touch attribution

In addition to first-touch attribution, Amplitude captures the attribution data at the start of each session. The following data are tracked as user properties. For campaign related traffic where these values are found either in the URL or browser cookies, these properties are set as user identity. On the other hand, for organic or direct traffic, these properties may not be found therefore these user properties are unset from user identity.

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`
- `referrer`
- `referring_domain`
- `gclid`
- `fbclid`

Using the default configuration, these are tracked at the start of each session. This means when a user navigates back to the page through a campaign while the previous session is still valid, the newer campaign is not tracked. 

If one prefers to track new campaigns mid-session, Amplitude can be configured to capture new campaigns, regardless of the state of the user session. This effectively expires the previous session and creates a new session, but only if new attribution data is found. If the same attribution data is found, then no attribution data is tracked and default session expiration policy is applied. This can be done by setting `attribution.trackNewCampaigns` to `true`. By default this is set to `false`.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  attribution: {
    trackNewCampaigns: true,
  }
});
```

#### Page view tracking

Together with tracking attribution data, Amplitude can optionally track page views, specifically where the user lands after clicking a hyperlink that contains campaign parameters. Page views can only be tracked if attribution tracking is enabled and new attribution data is tracked. Page view tracking is not a standalone feature. This can be done by setting `attribution.trackPageView` to `true`. By default this is set to `false`.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  attribution: {
    trackPageViews: true,
  }
});
```

#### Disabling Attribution Tracking

Amplitude can be configured to opt out of automatic collection of attribution data. This can be done by setting `attribution.disabled` to `true`. By default this is set to `false`.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  attribution: {
    disabled: true,
  }
});
```

--8<-- "includes/abbreviations.md"
