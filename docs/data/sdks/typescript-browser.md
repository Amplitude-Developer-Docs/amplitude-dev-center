---
title: Typescript Browser
description: The Amplitude Typescript SDK Installation & Quick Start guide.
icon: material/language-typescript
---


![npm version](https://badge.fury.io/js/@amplitude%2Fanalytics-browser.svg)

!!!beta "This SDK is in Beta"

!!!info "SDK Resources"
    - [TypeScript Browser SDK Reference :material-book:](https://amplitude.github.io/Amplitude-TypeScript/)
    - [TypeScript Browser SDK Repository :material-github:](https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/analytics-browser)
    - [TypeScript Browser SDK Releases :material-code-tags-check:](https://github.com/amplitude/Amplitude-TypeScript/releases)

The TypeScript Browser SDK lets you send events to Amplitude. This library is open-source, check it out on [GitHub](https://github.com/amplitude/Amplitude-TypeScript).

## Getting Started

### Installation

To get started with using TypeScript Browser SDK, install the package to your project via NPM or script loader.

#### Installing as Node package

This package is published on NPM registry and can be installed using npm and yarn.

=== "npm"

    ```bash
    npm install @amplitude/analytics-browser
    ```

=== "yarn"

    ```bash
    yarn add @amplitude/analytics-browser
    ```

#### Using script loader

Alternatively, the package is also distributed through a CDN. Copy and paste this script in your HTML file.

```html
<script type="text/javascript">
  !function(e,t){var r=e.amplitude||{_q:[]}
  ;if(r.invoked)e.console&&console.error&&console.error("Amplitude snippet has been loaded.");else{r.invoked=!0
  ;var n=t.createElement("script")
  ;n.type="text/javascript",n.integrity="sha384-j7jlsM/oDXvvtXrgYcb78r39XZqUuAd5xGeZSVTubG6yiGgaHphmLrLif0fXZGdN",
  n.crossOrigin="anonymous",n.async=!0,n.src="https://cdn.amplitude.com/libs/analytics-browser-0.2.1-min.js.gz",
  n.onload=function(){e.amplitude.runQueuedFunctions||console.log("[Amplitude] Error: could not load SDK")}
  ;var s=t.getElementsByTagName("script")[0];function o(e,t){e.prototype[t]=function(){return this._q.push({name:t,
  args:Array.prototype.slice.call(arguments,0)}),this}}s.parentNode.insertBefore(n,s);for(var i=function(){
  return this._q=[],this
  },a=["add","append","clearAll","prepend","set","setOnce","unset","preInsert","postInsert","remove","getUserProperties"],u=0;u<a.length;u++)o(i,a[u])
  ;r.Identify=i;for(var c=function(){return this._q=[],this
  },p=["getEventProperties","setProductId","setQuantity","setPrice","setRevenue","setRevenueType","setEventProperties"],d=0;d<p.length;d++)o(c,p[d])
  ;r.Revenue=c
  ;var l=["getDeviceId","setDeviceId","getSessionId","setSessionId","getUserId","setUserId","setOptOut","setTransport"],v=["init","add","remove","track","logEvent","identify","groupIdentify","setGroup","revenue"]
  ;!function(e){function t(t,r){e[t]=function(){var n={promise:new Promise((r=>{e._q.push({name:t,
  args:Array.prototype.slice.call(arguments,0),resolve:r})}))};if(r)return n}}for(var r=0;r<l.length;r++)t(l[r],!1)
  ;for(var n=0;n<v.length;n++)t(v[n],!0)}(r),e.amplitude=r}}(window,document);

  amplitude.init('YOUR_API_KEY_HERE')
</script>
```

## Usage

### Initialization

Initialization is necessary before any instrumentation is done. The API key for your Amplitude project is required.

```ts
import { init } from '@amplitude/analytics-browser';

init(API_KEY)
```

### Track an event

Events represent how users interact with your application. For example, "Button Clicked" may be an action you want to note.

```ts
import { track } from '@amplitude/analytics-browser';

// Track a basic event
track('Button Clicked');

// Track events with additional properties
const eventProperties = {
  selectedColors: ['red', 'blue'],
};
track('Button Clicked', eventProperties);
```

### User properties

User properties help you understand your users at the time they performed some action within your app such as their device details, their preferences, or language.

```ts
import { Identify, identify } from '@amplitude/analytics-browser';

const event = new Identify();

// sets the value of a user property
event.set('key1', 'value1');

// sets the value of a user property only once
event.setOnce('key1', 'value1');

// increments a user property by some numerical value.
event.add('value1', 10);

// pre inserts a value or values to a user property
event.preInsert('ab-tests', 'new-user-test');

// post inserts a value or values to a user property
event.postInsert('ab-tests', 'new-user-test');

// removes a value or values to a user property
event.remove('ab-tests', 'new-user-test')

// sends identify event
identify(event);
```

#### prepend/append

- `append` appends a value or values to a user property array.
- `prepend` prepends a value or values to a user property.

### User groups

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

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

```ts
import { Identify, groupIdentify } from '@amplitude/analytics-browser';

const groupType = 'plan';
const groupName = 'enterprise';
const event = new Identify()
event.set('key1', 'value1');

groupIdentify(groupType, groupName, identify);
```

### Revenue tracking

Revenue instances store each revenue transaction and allow you to define several special revenue properties (such as 'revenueType', 'productIdentifier', etc.)
 that are used in Amplitude's Event Segmentation and Revenue LTV charts.
  These Revenue instance objects are then passed into `revenue` to send as revenue events to Amplitude. This lets Amplitude automatically display data relevant to revenue in the platform.
   You can use this to track both in-app and non-in-app purchases.

```ts
import { Revenue, revenue } from '@amplitude/analytics-browser';

const event = new Revenue()
  .setProductId('com.company.productId')
  .setPrice(3.99)
  .setQuantity(3);

revenue(event);
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

### Custom Session ID

You can assign a new Session ID using `setSessionId`. When setting a custom session ID, make sure the value is in milliseconds since epoch (Unix Timestamp).

TypeScript

```ts
import { setSessionId } from '@amplitude/analytics-browser';

setSessionId(Date.now());
```

### Custom Device ID

If your app has its own login system that you want to track users with, you can call `setUserId` at any time.

You can assign a new device ID using `deviceId`. When setting a custom device ID, make sure the value is sufficiently unique. A UUID is recommended.

```ts
import { setDeviceId } from '@amplitude/analytics-browser';
const { uuid } = require('uuidv4');

setDeviceId(uuid());
```

### Opt users out of tracking

You can turn off logging for a given user by setting `setOptOut` to `true`.

```ts
import { setOptOut } from '@amplitude/analytics-browser';

setOptOut(true);
```

No events are saved or sent to the server while `setOptOut` is enabled, and the setting persists across page loads. 

Reenable logging by setting `setOptOut` to `false`.

```ts
import { setOptOut } from '@amplitude/analytics-browser';

setOptOut(false);
```

### Optional tracking

By default, the SDK tracks some properties automatically. You can override this behavior by passing an object called `trackingOptions` when initializing the SDK, setting the appropriate options to false.

| Tracking Options | Default |
| --- | --- |
| `city` | `true` |
| `country` | `true` |
| `carrier` | `true` |
| `deviceManufacturer` | `true` |
| `deviceModel` | `true` |
| `dma` | `true` |
| `ipAddress` | `true` |
| `language` | `true` |
| `osName` | `true` |
| `osVersion` | `true` |
| `platform` | `true` |
| `region` | `true` |
| `versionName` | `true` |

!!!note

    The optional tracking configurations only prevent default properties from being tracked on newly-created projects, where data has not yet been sent. If you have a project with existing data that you would like to stop collecting the default properties for, please get help in the [Amplitude Community](https://community.amplitude.com/). Note that the existing data is not deleted.

### Web attribution tracking

While Amplitude's TypeScript SDK doesn't collect web attribution data by default, setting it up is simple. The SDK can collect this information if you enable certain attribution configuration options.

Amplitude supports automatically tracking the following through the SDK configuration options:

- The 5 standard UTM parameters from the user's browser cookie or URL parameters by using `includeUtm`.
- The referring URL and domain from `includeReferrer`.
- Google Click Identifier from URL parameters through `includeGclid`.
- Facebook Click Identifier from URL parameters through `includeFbclid`.

#### Track UTM parameters

UTM (Urchin Traffic Monitor) parameters are useful for analyzing the effectiveness of different ad campaigns and referring sites. 
UTM parameters are case-sensitive, so different capitalization creates different values.

There are five different standard UTM parameters:

- `utm_source`: This identifies which website sent the traffic (for example, Google, Facebook).
- `utm_medium`: This identifies what type of link was used (for example, banner, button, email).
- `utm_campaign`: This identifies a specific campaign used (for example, summer_sale).
- `utm_term`: This identifies paid search terms used (for example, product+analytics).
- `utm_content`: This identifies what brought the user to the site and is commonly used for A/B testing (for example, bannerlink, textlink).

Here is an example URL: `https://www.amplitude.com/?utm_source=newsletter&utm_campaign=product_analytics_playbook&utm_medium=email&utm_term=product%20analytics&utm_content=bannerlink`

#### Enabling UTM parameters tracking

In Amplitude, after you set the `includeUtm` option to true, the SDK automatically pulls UTM parameters from the referring URL and include them as user properties on all the relevant events:

- `includeGclid`: Gclid (Google Click Identifier) is a globally unique tracking parameter used by Google. When used, Google appends a unique parameter (for example `"?gclid=734fsdf3"`) to URLs at runtime. 
By setting this to true, the SDK captures `initial_glid` and `gclid` as user properties.

- `includeFbclid`: Fbclid (Facebook Click Identifier) is a globally unique tracking parameter used by Facebook. When used, Facebook appends a unique parameter (for example, `"?fbclid=392foih3"`) to URLs at runtime. 
By setting this to `true`, the SDK captures `initial_fblid` and `fbclid` as user properties.

- `includeUtm`: If `true`, finds the standard UTM parameters from either the URL or the browser cookie and sets them as user properties. 
This sets `utm_source`, `utm_medium`, 
`utm_campaign`, `utm_term`, 
and `utm_content` as well as `initial_utm_source`,
 `initial_utm_medium`, `initial_utm_campaign`, `initial_utm_term`, and `initial_utm_content` as user properties for the user.

Those UTM parameters are set as user properties which persist for all the user's events going forward. However, initial UTM parameters are captured only once for each user via a `setOnce` operation.

#### Track referrers

If you want to track how users are getting to your website, then all you need to do is track the referrer (the referring site).

Here are the fields Amplitude supports tracking automatically:

- referrer: The last page the user was on (for example, `https://amplitude.com/behavioral-analytics-platform?ref=nav`).
- referring_domain: The domain that the user was last on (for example, amplitude.com).

##### Enable referrers tracking

After you set the `includeReferrer` option to `true`, Amplitude captures the referrer and `referring_domain` for each session and set them as user properties on all the relevant events:

- includeReferrer: When `true`, captures the `referrer` and `referring_domain` for each session as user properties as well as the `initial_referrer` and `initial_referring_domain` user properties once for each user. The referrer is the entire URL while the `referring_domain` is only the domain name from where the user came from.

Initial referring information is captured only once for each user via a setOnce operation.

#### First-touch attribution

Amplitude can capture the initial UTM parameters and referrer information for each user. The first-touch attribution values are set when a user's non-null UTM parameters are seen for the first time. The following user properties are set once:

- `initial_utm_source`
- `initial_utm_medium`
- `initial_utm_campaign`
- `initial_utm_term`
- `initial_utm_content`
- `initial_referrer`
- `initial_referring_domain`
- `initial_gclid`
- `initial_fbclid`

This is done by setting the JavaScript SDK configuration options `includeReferrer`, `includeUtm`, `includeGclid` and `includeFbclid` to `true`.

Note: Initial attribution information for users can change if there are merged users.

#### Last-touch attribution

In addition to first-touch attribution, Amplitude captures where a user came from for each of their sessions. This is accomplished by setting the following user properties:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`
- `referrer`
- `referring_domain`
- `gclid`
- `fbclid`

This is done by setting the SDK configuration options `includeReferrer`, `includeUtm`, `includeGclid` and `includeFbclid` to true.

### Callback

All asynchronous API are optionally awaitable through a specific Promise interface. This also serves as callback interface.

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

--8<-- "includes/abbreviations.md"
