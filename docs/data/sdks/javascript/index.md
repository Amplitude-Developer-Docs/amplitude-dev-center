---
title: JavaScript SDK (Maintenance)
description: The Amplitude JavaScript SDK installation and quick start guide.
icon: simple/javascript
---

<!-- vale off-->
[![npm version](https://img.shields.io/npm/v/amplitude-js)](https://www.npmjs.com/package/amplitude-js)

This is the official documentation for the Amplitude Analytics JavaScript SDK.

!!!deprecated "Maintenance SDK"
    This is a maintenance SDK and will only receive bug fixes until deprecation. Upgrade to the latest [Browser SDK](../typescript-browser/) which supports plugins and more. See the [Migration Guide](../../sdks/typescript-browser/migration) for more help.

!!!info "Browser SDK Resources (Maintenance)"
    [:material-github: GitHub](https://github.com/amplitude/Amplitude-JavaScript) · [:material-code-tags-check: Releases](https://github.com/amplitude/Amplitude-Javascript/releases) · [:material-book: API Reference](https://amplitude.github.io/Amplitude-JavaScript/)

--8<-- "includes/ampli-vs-amplitude.md"
    Click here for more documentation on [Ampli for Browser](./ampli.md).

## Install

Install the Amplitude Analytics JavaScript SDK in your project.

=== "Snippet"

    You can install the JavaScript SDK using a small snippet of code that you paste on your site to asynchronously load the SDK.
    On every page that you want to install Amplitude analytics, paste the code snippet just before the `</head>` tag, replacing `API_KEY` with your project's API key.
    You can find your project's API Key in your project's [Settings page](https://help.amplitude.com/hc/en-us/articles/360058073772).

    ```html
    <script type="text/javascript">
    (function(e,t){var n=e.amplitude||{_q:[],_iq:{}};var r=t.createElement("script")
    r.type="text/javascript";
    r.integrity="sha384-5fhzC8Xw3m+x5cBag4AMKRdf900vw3AoaLty2vYfcKIX1iEsYRHZF4RLXIsu2o+F"
    r.crossOrigin="anonymous";r.async=true;
    r.src="https://cdn.amplitude.com/libs/amplitude-8.21.4-min.gz.js";
    r.onload=function(){if(!e.amplitude.runQueuedFunctions){console.log(
    "[Amplitude] Error: could not load SDK")}};var s=t.getElementsByTagName("script"
    )[0];s.parentNode.insertBefore(r,s);function i(e,t){e.prototype[t]=function(){
    this._q.push([t].concat(Array.prototype.slice.call(arguments,0)));return this}}
    var o=function(){this._q=[];return this};var a=["add","append","clearAll",
    "prepend","set","setOnce","unset","preInsert","postInsert","remove"];for(
    var c=0;c<a.length;c++){i(o,a[c])}n.Identify=o;var l=function(){this._q=[];
    return this};var u=["setProductId","setQuantity","setPrice","setRevenueType",
    "setEventProperties"];for(var p=0;p<u.length;p++){i(l,u[p])}n.Revenue=l;var d=[
    "init","logEvent","logRevenue","setUserId","setUserProperties","setOptOut",
    "setVersionName","setDomain","setDeviceId","enableTracking",
    "setGlobalUserProperties","identify","clearUserProperties","setGroup",
    "logRevenueV2","regenerateDeviceId","groupIdentify","onInit","onNewSessionStart"
    ,"logEventWithTimestamp","logEventWithGroups","setSessionId","resetSessionId",
    "getDeviceId","getUserId","setMinTimeBetweenSessionsMillis",
    "setEventUploadThreshold","setUseDynamicConfig","setServerZone","setServerUrl",
    "sendEvents","setLibrary","setTransport"];function v(t){function e(e){t[e
    ]=function(){t._q.push([e].concat(Array.prototype.slice.call(arguments,0)))}}
    for(var n=0;n<d.length;n++){e(d[n])}}v(n);n.getInstance=function(e){e=(
    !e||e.length===0?"$default_instance":e).toLowerCase();if(
    !Object.prototype.hasOwnProperty.call(n._iq,e)){n._iq[e]={_q:[]};v(n._iq[e])}
    return n._iq[e]};e.amplitude=n})(window,document);

    amplitude.getInstance().init("API_KEY");
    </script>
    ```

=== "npm"

    ```bash
    npm install amplitude-js
    ```
    You can also install the [npm module](https://www.npmjs.com/package/amplitude-js) and embed the SDK directly into your product.

=== "yarn"

    ```bash
    yarn add amplitude-js
    ```

After you've installed the SDK, import `amplitude` into your project.

```js
import amplitude from 'amplitude-js';
```

!!!tip "Quickstart"
    1. [Initialize](#initialize)
    2. [Send an event](#send-events)

    ```js 
    // initialize the client
    var instance1 = amplitude.getInstance().init("API_KEY");
    ```
    ```js
    // send an event
    const event = “Button Clicked”;
    amplitude.getInstance().logEvent(event);
    ```

## Core functions

The following functions make up the core of the Amplitude Analytics JavaScript SDK.

---

### Initialize

Before you can instrument, you must initialize the SDK using the API key for your Amplitude project.
 Initialization creates a default instance, but you can create more instances using `getInstance` with a string name.

```js
var instance1 = amplitude.getInstance().init("API_KEY"); // initializes default instance of Amplitude client
var instance2 = amplitude.getInstance("instance-name").init("API_KEY"); // initializes named instance of Amplitude client
```

#### Initialization with options

Pass custom options in the `init` method. See a [list of options](https://github.com/amplitude/Amplitude-JavaScript/blob/main/src/options.js) on GitHub.

```js
var options = {};
var instance = amplitude.getInstance("instance").init("API_KEY", null, options); // initializes with the given options
```

### Configuration

???config "Configuration Options"
    | <div class="big-column">Name</div>  | Description | Default Value |
    | --- | --- | --- |
    | `apiEndpoint` | `string`. Endpoint to send amplitude event requests to. | `https://api.amplitude.com` |
    | `batchEvents` | `boolean`. Whether batch send events. If `true`, then events are batched together and uploaded only when the number of unsent events is greater than or equal to eventUploadThreshold or after eventUploadPeriodMillis milliseconds have passed since the first unsent event was logged. | `false` |
    | `cookieExpiration` | `number`. The number of days after which the Amplitude cookie will expire. 12 months is for GDPR compliance. | `365` |
    | `sameSiteCookie` | `string`. Sets the SameSite flag on the amplitude cookie. Decides cookie privacy policy. | `Lax` |
    | `cookieForceUpgrade` | `boolean`. Forces pre-v6.0.0 instances to adopt post-v6.0.0 compat cookie formats. | `false` |
    | `disableCookies` |  `boolean`. Whether disable Ampllitude cookies altogether. | `false` |
    | `deferInitialization` | `boolean`.  Whether defer initialization. If `true`, disables the core functionality of the sdk, including saving a cookie and all logging, until explicitly enabled. | `false` |
    | `deviceIdFromUrlParam` | `boolean`. If `true`, then the SDK will parse Device ID values from the URL parameter amp_device_id if available. Device IDs defined in the configuration options during init will take priority over Device IDs from URL parameters. | `false` |
    | `domain` | `string`. Set a custom domain for the Amplitude cookie. To include subdomains, add a preceding period, eg: `.amplitude.com`. | `null` |
    | `eventUploadPeriodMillis` | `number`. Amount of time in milliseconds that the SDK waits before uploading events if batchEvents is true. | 30 seconds |
    | `eventUploadThreshold` | `number`. Minimum number of events to batch together per request if batchEvents is true. | `30` |
    | `forceHttps` | `boolean`. Whether force to upload toHTTPS endpoint. If `true`, the events will always be uploaded to HTTPS endpoint. Otherwise, it will use the embedding site's protocol. | `true` |
    | `includeFbclid` | `boolean`.  If `true`, captures the fbclid URL parameter as well as the user's initial_fbclid via a setOnce operation. | `false` |
    | `includeGclid` | `boolean`. If `true`, captures the gclid URL parameter as well as the user's initial_gclid via a setOnce operation. | `false` |
    | `includeReferrer` | `boolean`. If `true`, captures the referrer and referring_domain for each session, as well as the user's initial_referrer and initial_referring_domain via a setOnce operation. | `false` |
    | `includeUtm` | `boolean`. If `true`, finds UTM parameters in the query string or the _utmz cookie, parses, and includes them as user properties on all events uploaded. This also captures initial UTM parameters for each session via a setOnce operation.| `false` |
    | `language` | `string`. Custom language to set. | The language determined by the browser. |
    | `library` | `Object`. Values for the library version | `{ name: 'amplitude-js', version: packageJsonVersion }` |
    | `logLevel` | `string`. 'DISABLE', 'ERROR', 'WARN', 'INFO'. Level of logs to be printed in the developer console.| `WARN` |
    | `logAttributionCapturedEvent` | `boolean`. If `true`, the SDK will log an Amplitude event anytime new attribution values are captured from the user. **Note: These events count towards your event volume.** Event name being logged: [Amplitude] Attribution Captured. Event Properties that can be logged: `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `referrer`, `referring_domain`, `gclid`, `fbclid`. | `false`|
    | `optOut` | `boolean`. Whether or not to disable tracking for the current user. | `false` | 
    | `onError` | `function`. Function to call on error. | `() => {}` |
    | `onExitPage` | `function`. Function called when the user exits the browser. Useful logging on page exit. | `() => {}` |
    | `platform` | `string`.  Platform device is running on.| `Web` (browser, including mobile browsers). |
    | `savedMaxCount` | `number`. Maximum number of events to save in localStorage. If more events are logged while offline, then old events are removed. | `1000` |
    | `saveEvents` | `boolean`. If `true`, saves events to localStorage and removes them upon successful upload. Without saving events, events may be lost if the user navigates to another page before the events are uploaded.  | `true` |
    | `saveParamsReferrerOncePerSession` | `boolean`. If `true`, then includeGclid, includeFbclid, includeReferrer, and includeUtm will only track their respective properties once per session. New values that come in during the middle of the user's session will be ignored. Set to false to always capture new values. | `true` |
    | `secureCookie` | `boolean`. If `true`, the amplitude cookie will be set with the Secure flag. | `false` |
    | `sessionTimeout` | `number`. The time between logged events before a new session starts in milliseconds. | `30 minutes` |
    | `storage` | `string`. Options are `cookies`, `localStorage`, `sessionStorage`, or `none`. Sets storage strategy. Will override `disableCookies` option. | `Empty String` |
    | `trackingOptions` | `Object`. Type of data associated with a user. | Enable all tracking options by default. Please check [here](/#disable-tracking-specific-fields) for more details. |
    | `transport` | `string`. `http` or `beacon`.  Network transport mechanism used to send events. | `http` |
    | `unsetParamsReferrerOnNewSession` | `boolean`. If `false`, the existing `referrer` and `utm_parameter` values will be carried through each new session. If set to `true`, the `referrer` and `utm_parameter` user properties, which include `referrer`, `referring_domain`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, and `utm_content`, will be set to `null` upon instantiating a new session. Note: This only works if `includeReferrer` or `includeUtm` is set to `true`. | `false` |
    | `unsentKey` | `string`. localStorage key that stores unsent events. | `amplitude_unsent` |
    | `unsentIdentifyKey` | `string`. localStorage key that stores unsent identifies. | `amplitude_unsent_identify` |
    | `uploadBatchSize` | `number`. The maximum number of events to send to the server per request. | `100` |
    | `headers` | `Object`. Headers attached to an event(s) upload network request. Custom header properties are merged with this object. | `{ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }` |
    | `serverZone` | `string`. `US` or `EU`. The server zone to send to, will adjust server url based on this config.| `US` |
    | `useDynamicConfig` | `boolean`. To update api endpoint with serverZone change or not. For data residency, recommend to enable it unless using own proxy server. | `false` |
    | `serverZoneBasedApi` | `boolean`. localStorage key that stores unsent events. | `false` |
    | `sessionId` | `number`. The custom Session ID for the current session. *Note: This is not recommended unless you know what you are doing because the Session ID of a session is utilized for all session metrics in Amplitude. | `null` |
    | `partnerId` | `number`. The partner id value. | `null` |

#### Configure batching behavior

To support high performance environments, the SDK sends events in batches. Every event logged by `logEvent` method is queued in memory. Events are flushed in batch in background. You can customize batch behavior with `eventUploadThreshold` and `eventUploadPeriodMillis`. By default, the serverUrl will be `https://api.amplitude.com`. This SDK doesn't support batch mode, the [batch API](../../../analytics/apis/batch-event-upload-api.md) endpoint.

```js
amplitude.getInstance().init(apiKey, null, {
    // Events queued in memory will flush when number of events exceed upload threshold
    // Default value is 30
    eventUploadThreshold: 50,
    // Events queue will flush every certain milliseconds based on setting
    // Default value is 30000 milliseconds
    eventUploadPeriodMillis: 100000,
});
```

#### EU data residency

Beginning with version 8.9.0, you can configure the server zone to send data to Amplitude's EU server after initializing the client.
 The server zone configuration supports dynamic configuration as well.

For earlier versions, you need to configure the `apiEndpoint` property after initializing the client.

!!!note
    For EU data residency, you must initialize the SDK with the API key from Amplitude EU. Your project must be set up from inside Amplitude EU. 

=== "Version 8.9.0 and higher"

    ```js
    // No need to call setServerUrl for sending data to Amplitude's EU servers
    amplitude.getInstance().init(euApiKey, null, {
        serverZone: 'EU',
        serverZoneBasedApi: true,
    });
    ```
=== "Earlier versions"

    ```js
    amplitude.getInstance().init(euApiKey, null, {
    apiEndpoint: 'https://api.eu.amplitude.com'
    });
    ```

#### Set `userID`

Set `userID` when initializing the client, or after initialization with the `setUserId` method.

=== "Set `userID` on initialization"

    ```js
    var userId = "12345";
    amplitude.getInstance().init("API_KEY", userId); // initializes client with the given userId
    ```

=== "Set `userID` with `setUserId`"

    ```js
    var userId = "12345";
    amplitude.getInstance().setUserId(userId);
    ```
    There is an optional `startNewSession` parameter for `setUserId`. Set it to `true` to start a new user session.

### Send events

#### Basic events

Events represent user interactions with your app. For example, “Button Clicked” may be an action you want to track.

```js
const event = “Button Clicked”;
amplitude.getInstance().logEvent(event);
```

#### Event properties

Events can have properties that give context about the event. For example, “hover time” is a relevant property for the “Button Clicked” event.

```js
var event = "Button Clicked";
var eventProperties = {
    "hover time": "100ms"
};
amplitude.getInstance().logEvent(event, eventProperties);
```

!!!note "Valid types and limits"

    Valid data types for event properties are string, array, object, boolean, and number. Object keys have a 1000 character limit.

#### Arrays in event properties

Event property values can be arrays. You can query array event properties by any subset of the individual properties in the array.

```js
var event = “Button Clicked”;
var eventProperties1 = {
    "selectedColors": ['red', 'blue']
};
amplitude.getInstance().logEvent(event, eventProperties1);

var eventProperties2 = {
    "selectedColors": ['red', 'green']
};
amplitude.getInstance().logEvent(event, eventProperties2);
```

### User properties

User properties help you understand your users at the time they performed some action within your app. For example, you can learn about their device details, their preferences, or language.

#### Set a user property

The Amplitude Identify object provides controls over setting user properties.
 First, create an Identify object instance, then call Identify methods on it, and then the client makes a call with the Identify object.

```js
new amplitude.Identify(); // does nothing, must call one of the following methods and pass to client

var identify = new amplitude.Identify();
amplitude.getInstance().identify(identify); // makes identify call to amplitude with the properties of the identify object
```

##### `set`

Set the value of a user property. You can also chain together several `set` calls.

```js
var identify1 = new amplitude.Identify().set('key1', 'value1');
var identify2 = new amplitude.Identify().set('key2', 'value2').set('key3', 'value3');
amplitude.getInstance().identify(identify1);
amplitude.getInstance().identify(identify2);
```

##### `setOnce`

`setOnce` sets the value of a user property one time. Subsequent calls using `setOnce` are ignored.

```js
var identify = new amplitude.Identify().setOnce('key1', 'value1');
amplitude.getInstance().identify(identify);
```

##### `add`

Increment a user property by a number with `add`. If the user property doesn't have a value set yet, it's initialized to `0`.

```js
var identify = new amplitude.Identify().add('value1', 10);
amplitude.getInstance().identify(identify);
```

#### Set multiple user properties

You can use `setUserProperties` as a shorthand to set multiple user properties at one time. 
 For example, set a user's city with this code:

```js
var userProperties = {
    city: "San Francisco"
};
amplitude.getInstance().setUserProperties(userProperties);
```

!!!note 

    This method is a wrapper around `Identify.set` and `identify`.

#### Arrays in user properties

User properties can be arrays. Directly set arrays or use `append` to generate an array.

```js
var values = ['value1', 'value2'];
var identify = new amplitude.Identify().set('key1', values);
amplitude.getInstance().identify(identify);
```

##### `prepend` and `append`

- `append` appends a value or values to a user property array.
- `prepend` prepends a value or values to a user property array.

If the user property doesn't have a value set yet, it's initialized to an empty list before adding the new values.
 If the user property has an existing value and it's not a list, it's converted into a list with the new value added.

### User groups

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

--8<-- "includes/groups-intro-paragraph.md"

!!! example

    If Joe is in 'orgId' '10' and '16', then the `groupName` would be '[10, 16]'. Your code might look like this:

    ```js
    amplitude.getInstance().setGroup('orgId', '[10,16]');
    ```

You can also use `logEventWithGroups` to set event-level groups. With event-level groups, the group designation applies only to the specific event being logged, and doesn't persist on the user unless explicitly
 set with `setGroup`.

```js
var eventProperties = {
  'key': 'value'
}

amplitude.getInstance().logEventWithGroups('initialize_game', eventProperties, {'sport': 'soccer'});
```

### Group identify

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

--8<-- "includes/group-identify-considerations.md"

```js
var groupType = 'plan';
var groupName = 'enterprise';
var identify = new amplitude.Identify().set('key1', 'value1');

amplitude.getInstance().groupIdentify(groupType, groupName, identify);
```

You can supply an optional callback function as a fourth argument to `groupIdentify`.

### Track revenue

The best method of tracking revenue for a user is to use `logRevenueV2()` in conjunction with the provided Revenue interface.
 Revenue instances store each revenue transaction and let you define several special revenue properties used in Amplitude's Event Segmentation and Revenue LTV charts, such as `revenueType` and `productIdentifier`.
  You can also add event properties to revenue events via the `eventProperties` field. These Revenue instance objects are then passed into `logRevenueV2` to send as revenue events to Amplitude.
   This lets Amplitude to automatically display data relevant to revenue in the platform. You can use this to track both in-app and non-in-app purchases.

To track revenue from a user, call `logRevenueV2()` each time a user generates revenue. Here is an example:

```js
var revenue = new amplitude.Revenue().setProductId('com.company.productId').setPrice(3.99).setQuantity(3);
amplitude.getInstance().logRevenueV2(revenue);
```

Calling `logRevenueV2` generates a revenue event type:

- [Amplitude] Revenue: This event is logged for all revenue events, regardless of whether verification is enabled.

You can't change the default names given to these client-side revenue events in the raw data but you do have the option to change the [display name](https://help.amplitude.com/hc/en-us/articles/235649848#events).
 To learn more about tracking revenue, see the documentation [here](https://help.amplitude.com/hc/en-us/articles/115003116888).

!!!note
    Amplitude doesn't support currency conversion. Normalize all revenue data to your currency of choice before sending it to Amplitude.

| <div class="big-column">Name</div>  | Description  |
| --- | --- |
| `productId` | Optional. String. An identifier for the product. Amplitude recommends something like the "Google Play Store product ID". Defaults to `null`. |
| `quantity`| Required. Integer. The quantity of products purchased. Note: revenue = quantity * price. Defaults to 1. |
| `price` | Required. Double. The price of the products purchased, and this can be negative. Note: revenue = quantity * price. Defaults to `null`.|
| `revenueType` | Optional, but required for revenue verification. String. The revenue type. For example, tax, refund, income. Defaults to `null`. |
| `eventProperties`| Optional. Object. An object of event properties to include in the revenue event. Defaults to `null`. |

## Opt users out of tracking 

Call `setOptOut` to turn off logging for a given user:

```js
amplitude.getInstance().setOptOut(true);
```

While `setOptOut` is enabled, events aren't saved or sent to the server. The opt out setting persists across page loads. You can re-enable logging by calling:

```js
amplitude.getInstance().setOptOut(false);
```

## Disable tracking specific fields  

By default, the JavaScript SDK tracks some properties automatically. You can override this behavior by passing an object called `trackingOptions` when initializing the SDK,
 setting the appropriate options to `false`.

|<div class="big-column">Parameter</div> | Default Value|
|-------|------------|
|`city` | `true`|
|`country` | `true`|
|`carrier` | `true`|
|`device_manufacturer` | `true`|
|`device_model` | `true`|
|`dma` | `true`|
|`ip_address` | `true`|
|`language` | `true`|
|`os_name` | `true`|
|`os_version` | `true`|
|`platform` | `true`|
|`region` | `true`|
|`version_name` | `true`|

!!!warning
    The `trackingOptions` configurations prevent default properties from being tracked on new projects that have no existing data, not existing data.
     If you have a project with existing data that you would like to stop collecting the default properties for, contact the Support team at support.amplitude.com.
      Note that the existing data isn't deleted.

## Set custom user ID

If your app has its own login system that you want to track users with, you can call `setUserId` at any time:

```js
amplitude.getInstance().setUserId('USER_ID');
```

You can also add the User ID as an argument to the init call.

```js
amplitude.getInstance().init('API_KEY', 'USER_ID');
```

Don't assign users a user ID that could change, because each unique user ID represents a unique user in Amplitude. For more information see
 [Track unique users in Amplitude](https://help.amplitude.com/hc/en-us/articles/115003135607-Track-unique-users-in-Amplitude) in the Help Center.

## Logged out and anonymous users

--8<-- "includes/logged-out-and-anonymous-users.md"

```js
amplitude.getInstance().setUserId(null); // not string 'null'
amplitude.getInstance().regenerateDeviceId();
```

## Session tracking

Events triggered within 30 minutes of each other count towards the current session.
 The time of the first event marks the start time of a session and the last event triggered marks the end time of a session.
  You can change the session timeout window via the SDK configuration option field `sessionTimeout`.

### Get the session ID

In the JavaScript SDK, you can use the helper method `getSessionId` to get the value of the current `sessionId`:

```js
const sessionId = amplitude.getInstance().getSessionId();
```

## Configure HTTP headers

If you are using a [domain proxy](https://developers.amplitude.com/docs/domain-proxies) that requires custom HTTP request headers, configure them with `options.headers` during initialization.

```js
amplitude.getInstance().init(APIKEY, null, {
  headers: {
     'x-session-id': appToken,
        'Content-Type': 'application/json;charset=utf-8'
  }
});
```

## Log events to multiple projects

If you want to log events to multiple Amplitude projects, then must have separate instances for each Amplitude project.
 Each instance allows for independent `apiKeys`, `userIds`, `deviceIds`, and settings.

You must assign a name to each Amplitude project and instance and use that name consistently when fetching that instance to call functions.

!!!important
    After you have chosen a name for that instance you can't change it. 
    An instance's data and settings are associated with its name, and you must use that instance name for all future versions of your project to maintain data continuity.
    Instance names don't need be the names of your projects in the Amplitude platform, but they need to remain consistent throughout your code. Each instance must also be initialized with the correct `apiKey`.

Instance names must be non-null and non-empty strings. Names are case insensitive, and you can fetch each instance name by calling.

Each new instance has its own `apiKey`, `userId`, `deviceId`, and settings.

The following is an example of how to set up and log events to two separate projects:

```js
// existing project, existing settings, and existing API key
amplitude.getInstance().init('12345', null, {batchEvents: true});
// new project, new API key
amplitude.getInstance('new_project').init('67890', null, {includeReferrer: true});

// need to reconfigure new project
amplitude.getInstance('new_project').setUserId('joe@gmail.com');
amplitude.getInstance('new_project').setUserProperties({'gender':'male'});
amplitude.getInstance('new_project').logEvent('Clicked');

var identify = new amplitude.Identify().add('karma', 1);
amplitude.getInstance().identify(identify);
amplitude.getInstance().logEvent('Viewed Home Page');
```

## Web attribution

While Amplitude’s JavaScript SDK doesn't collect web attribution data by default, setting it up is simple.
 The SDK can automatically collect this information if you enable attribution configuration options.

Amplitude supports automatically tracking the following through the SDK configuration options:

- The 5 standard UTM parameters from the user's browser cookie or URL parameters by using `includeUtm`.
- The referring URL and domain from `includeReferrer`.
- Google Click Identifier from URL parameters through `includeGclid`.
- Facebook Click Identifier from URL parameters through `includeFbclid`.  

### Track UTM parameters

UTM parameters stand for Urchin Traffic Monitor parameters and are useful for analyzing the effectiveness of different ad campaigns and referring sites.
 UTM parameters are case sensitive so they're considered different values if the capitalization varies.

There are five different standard UTM parameters:

- `utm_source`: This identifies which website sent the traffic (for example: Google, Facebook).
- `utm_medium`: This identifies the link type that was used (for example: banner, button, email).
- `utm_campaign`: This identifies a specific campaign used (for example: "summer_sale").
- `utm_term`: This identifies paid search terms used (for example:  product+analytics).
- `utm_content`: This identifies what brought the user to the site and is commonly used for A/B testing (for example: "bannerlink", "textlink").

Here is an example URL:

`https://www.amplitude.com/?utm_source=newsletter&utm_campaign=product_analytics_playbook&utm_medium=email&utm_term=product%20analytics&utm_content=bannerlink`

#### Enable via SDK

In Amplitude, after you set the `includeUtm` option to true, the JavaScript SDK automatically pulls UTM parameters from the referring URL and include them as user properties on all relevant events:

- `includeGclid`: Gclid (Google Click Identifier) is a globally unique tracking parameter used by Google. If used, Google appends a unique parameter (for example: `"?gclid=734fsdf3"`) to URLs at runtime. By setting this to true, the SDK captures `initial_glid` and `gclid` as user properties.
- `includeFbclid`: Fbclid (Facebook Click Identifier) is a globally unique tracking parameter used by Facebook. If used, Facebook appends a unique parameter (for example: `"?fbclid=392foih3"`) to URLs at runtime. By setting this to `true`, the SDK captures `initial_fblid` and `fbclid` as user properties.
- `includeUtm`: If `true`, finds the standard UTM parameters from either the URL or the browser cookie and sets them as user properties. This sets `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, and `utm_content` as well as `initial_utm_source`, `initial_utm_medium`, `initial_utm_campaign`, `initial_utm_term`, and `initial_utm_content` as user properties for the user.
UTM parameters are captured once per session by default and occurs when the user loads your site and the Amplitude SDK for the first time.
 You can disable the once per session restriction through the `saveParamsReferrerOncePerSession` configuration option. When the SDK detects that it should start a new session,
  it pulls the UTM parameters that are available at the time. Those UTM parameters are set as user properties which persists for all the user's events going forward.
   However, initial UTM parameters are captured one time for each user via a `setOnce` operation.

### Track referrers

If you want to track how users are getting to your website, then track the referrer (the referring site).

Amplitude supports tracking these fields automatically:

- `referrer`: The last page the user was on (for example, `<https://amplitude.com/behavioral-analytics-platform?ref=nav>`).
- `referring_domain`: The domain that the user was last on (for example, `amplitude.com`).

#### Enable via SDK

After you set the `includeReferrer` option to `true`, Amplitude captures the `referrer` and `referring_domain` for each session and set them as user properties on relevant events:

- `includeReferrer`: When `true`, captures the `referrer` and `referring_domain` for each session as user properties as well as the `initial_referrer` and `initial_referring_domain` user properties one time for each user.
 The referrer is the entire URL while the `referring_domain` is the domain name from where the user came from.

Initial referring information is captured one time for each user via a `setOnce` operation.

### First-touch attribution

Amplitude can capture the initial UTM parameters and referrer information for each user. The first-touch attribution values are set when a user's non-null UTM parameters are seen for the first time.
 These user properties are set one time:

- `initial_utm_source`
- `initial_utm_medium`
- `initial_utm_campaign`
- `initial_utm_term`
- `initial_utm_content`
- `initial_referrer`
- `initial_referring_domain`
- `initial_gclid`
- `initial_fbclid`

Capture these parameters by setting the JavaScript SDK configuration options `includeReferrer`, `includeUtm`, `includeFbclid`, and `includeGclid` to `true`.

!!!note
    Initial attribution information for users can change if they're merged with another user.

### Last-touch attribution

Amplitude captures where a user came from for each of their sessions by setting these user properties:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`
- `referrer`
- `referring_domain`
- `gclid`
- `fbclid`

TO use this, set the JavaScript SDK configuration options `includeReferrer`, `includeUtm`, `includeFbclid`, and `includeGclid` to `true`.
 By default, the SDK saves values only at the start of the session, so if a user triggers some flow that causes them to land on the site again with a different set of UTM parameters within the same session,
  the second set isn't saved.

### Multi-touch attribution

If you set `saveParamsReferrerOncePerSession` to `false` in your JavaScript SDK configuration, the SDK always captures new values from the user. This updates these user properties throughout a session if they change:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`
- `referrer`
- `referring_domain`
- `gclid`
- `fbclid`

Some customers also instrument these user properties as arrays to keep track of all the attribution parameters seen within the same session for a single user.

### Log captured attribution values via Amplitude

This is an advanced use case. 

!!!important

    These events count towards your event quota.

If you set `logAttributionCapturedEvent` to `true` in your JavaScript SDK configuration, the SDK logs an Amplitude event anytime new attribution values are captured from the user.

**Event Name:** [Amplitude] Attribution Captured

**Event Properties:**

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`
- `referrer`
- `referring_domain`
- `gclid`
- `fbclid`

## Google Tag Manager

Amplitude's JavaScript SDK supports integration with Google Tag Manager. See the [demo app](https://github.com/amplitude/GTM-Web-Demo) on GitHub for instructions on how to set it up.

Refer to [Introducing the Amplitude Google Tag Manager (GTM) Template](https://amplitude.com/blog/google-tag-manager-template/) for more guidance.

!!!tip

    It's best practice to use a custom instance name to avoid a naming collision.

## Advanced topics

### Dynamic configuration

Beginning with version 8.9.0, you can configure your apps to use [dynamic configuration](../../dynamic-configuration.md).
 This feature finds the best server URL automatically based on app users' location.

 To use, set `useDynamicConfig` to `true`.

- If you have your own proxy server and use `apiEndPoint` API, leave dynamic configuration off.
- If you have users in China Mainland, then Amplitude recommends using dynamic configuration.
- By default, this feature returns server URL of Amplitude's US servers, if you need to send data to Amplitude's EU servers, use `setServerZone` to set it to EU zone.

```js
amplitude.getInstance().init(euApiKey, null, {
  useDynamicConfig: true,
});
```

### COPPA Control

COPPA control in Amplitude's other SDKs disables tracking for IDFA, IDFV, city, location data (`location_lat` and `location_lng`), and IP address.
 There's no interface for COPPA control in the JavaScript SDK because it doesn't track `location_lat`, `location_lng`, IDFA or IDFV. Instead, you can disable tracking for `city` and `ip_address` with `trackingOptions`.

```js
 var trackingOptions = {
        city: false,
        ip_address: false,
      };
```

### Get the device ID

Get a user's current device ID with the following code:

```js
var deviceId = amplitude.getInstance().getDeviceId() // existing device ID
```

### Set configuration options

Configure Amplitude by passing an object as the third argument to the init:

```js
amplitude.getInstance().init("API_KEY", null, {
    // optional configuration options
    saveEvents: true,
    includeUtm: true,
    includeReferrer: true
})
```

### Cookie management

#### Cookies created by the SDK

On initialization, the SDK creates a cookie that begins with the prefix `amp_` and ends with this first six digits of your API key.
 For example, `amplitude.getInstance().init("a2dbce0e18dfe5f8e74493843ff5c053")` would create a cookie with the key `amp_a2dbce`.

The cookie tracks this metadata for the SDK:

- A randomly generated device ID
- The current session ID
- The current user ID if a user ID is set
- The last event time
- Sequence IDs to put events and identify operations in the correct order

#### Disable cookies

Disable cookies created by the SDK with the `disableCookies` option. When you disable cookies, the JavaScript SDK defaults to using `localStorage` to store its data.
 LocalStorage is a great alternative, but can't track cookies across domains.
 Because access to `localStorage` is restricted by subdomain, you can't track anonymous users across subdomains of your product (for example: `www.amplitude.com` vs `analytics.amplitude.com`).

#### SameSite

The JavaScript SDK defaults to setting the SameSite option on its cookies to `None`. This can be overridden with the `sameSiteCookie` option.
 Amplitude recommends using `Lax` unless there are instances where you have third party sites that `POST` forms to your site.

#### HttpOnly cookies

An HttpOnly option isn't technologically possible for cookies created by the SDK. The cookie is set on the client side and is used as a client-side data store. An SDK cookie can't set the HttpOnly flag.

#### Upgrade legacy cookies

Legacy cookies created by the SDK were larger than the newer, more compact cookies.
 For users that have older cookies, the SDK only removes old cookies and starts using the new cookie format if the `cookieForceUpgrade` option is set to `true`.
 If you use the SDK in multiple products, and track anonymous users across those products, you be sure to set this option on all those products.

!!!note
    Upgrading cookies is only recommended if you are running into problems with oversized cookies.

### RequireJS

If you are using RequireJS to load your JavaScript files, then you can use it to load the Amplitude JavaScript SDK script directly instead of using the loading snippet.
 If you take this approach you lose one of the key advantages of the snippet that lets your app to start and use the Amplitude SDK without having to wait for Amplitude to fully download.

```js
<script src='scripts/require.js'></script> <!-- loading RequireJS -->
<script>
 require(['https://cdn.amplitude.com/libs/amplitude-6.2.0-min.umd.gz.js'], function(amplitude) {
 amplitude.getInstance().init('API_KEY'); // replace API_KEY with your Amplitude API key.
 window.amplitude = amplitude; // You can bind the amplitude object to window if you want to use it directly.
 amplitude.getInstance().logEvent('Clicked Link A');
 });
 </script>
```

You can also define the path in your RequireJS configuration like this:

```js
<script src='scripts/require.js'></script> <!-- loading RequireJS -->
<script>
 requirejs.config({
  paths: {
   'amplitude': 'https://cdn.amplitude.com/libs/amplitude-6.2.0-min.umd.gz.js'
  }
 });

 require(['amplitude'], function(amplitude) {
  amplitude.getInstance().init('API_KEY'); // replace API_KEY with your Amplitude API key.
  window.amplitude = amplitude; // You can bind the amplitude object to window if you want to use it directly.
  amplitude.getInstance().logEvent('Clicked Link A');
 });
</script>
<script>
 require(['amplitude'], function(amplitude) {
  amplitude.getInstance().logEvent('Page loaded');
 });
</script>
```

### Cross domain tracking (JavaScript)

You can track anonymous behavior across two different domains. Amplitude identifies anonymous users by their device IDs which must be passed between the domains. For example:

- Site 1: `www.example.com`
- Site 2: `www.example.org`

Users who start on Site 1 and then navigate to Site 2 must have the device ID generated from Site 1 passed as a parameter to Site 2. Site 2 then needs to initialize the SDK with the device ID.
 The SDK can parse the URL parameter automatically if `deviceIdFromUrlParam` is enabled.

1. From Site 1, grab the device ID from `amplitude.getInstance().options.deviceId`.
2. Pass the device ID to Site 2 via a URL parameter when the user navigates. (for example: `www.example.com?amp_device_id=device_id_from_site_1`)
3. Initialize the Amplitude SDK on Site 2 with `amplitude.init('API_KEY', null, {deviceIdFromUrlParam: true})`.

### Tracking UTM parameters, referrer, and gclid (JavaScript)

Amplitude supports automatically tracking:

- Standard UTM parameters from the user's cookie or URL parameters when the configuration option `includeUtm` is set to true during initialization.
- The referring URL when the configuration option `includeReferrer` is set to true during initialization.
- `gclid` (Google Click ID) from URL parameters when the configuration option includeGclid is set to true during initialization.

If tracking is enabled, then the SDK sets the values as user properties (for example,  `referrer` or `utm_source`) one time per session. This called last touch attribution.
 The SDK also saves the initial values like `initial_referrer` and `initial_utm_source` using a `setOnce` operation.
 After these values are set, they never change. This is called first touch attribution.

!!!note "`saveParamsReferrerOncePerSession`"
    By default, the SDK saves the values only at the start of the session. For example, if a user lands on your site with an initial set of UTM parameters and triggers some flow that causes them
     to land on your site again with a different set of UTM parameters within the same Amplitude session, the second set isn't saved.
      You can set the configuration option `saveParamsReferrerOncePerSession` to `false` to remove that restriction so that the SDK always captures new values from the user.

!!!note "`unsetParamsReferrerOnNewSession`"
    By default, the SDK carries over existing UTM Parameters and Referrer values at the start of a new session. For example,
     if a users session expires, the SDK maps the user's Referrer and UTM Parameters to existing values.
    To reset those values to null upon instantiating a new session, set `unsetParamsReferrerOnNewSession` to `true`.

### Callbacks for `logEvent`, `identify`, and `redirect`

You can pass a callback function to `logEvent` and `identify`, which gets called after receiving a response from the server.
This is useful if timing may cause an event to not be captured before the browser navigates away from a webpage.
 Putting the navigation in a callback to the `logEvent` method guarantees the event is captured before the navigation occurs. Here is a logEvent example:

```js
amplitude.getInstance().logEvent("EVENT_TYPE", null, callback_function);
```

Here is an identify example:

```js
var identify = new amplitude.Identify().set('key', 'value');
amplitude.getInstance().identify(identify, callback_function);
```

The status and response body from the server are passed to the callback function, which you might find useful. Here is an example of a callback function which redirects the browser to another site after a response:

```js
var callback_function = function(status, response) {
    if (status === 200 && response === 'success') {
        // do something here
    }
    window.location.replace('URL_OF_OTHER_SITE');
};
```

You can also use this to track outbound links to your website. For example, you would have a link like this:

```js
<a href="javascript:trackClickLinkA();">Link A</a>
```

Then, you would define a function that's called when the link is clicked like this:

```js
var trackClickLinkA = function() {
    amplitude.getInstance().logEvent('Clicked Link A', null, function() {
        window.location='LINK_A_URL';
    });
};
```

In the case that `optOut` is `true`, then no event is logged but the callback is called.
 In the case that `batchEvents` is `true`, if the batch requirements `eventUploadThreshold` and `eventUploadPeriodMillis` aren't met when `logEvent` is called, then no request is sent but the callback is still called.
 In these cases, the callback is called with an input status of 0 and a response of 'No request sent'.

### Error callbacks

You can pass a second callback to `logEvent` and identify that are called if the network request for the event fails.
 This is useful to detect if a user is using an ad blocker, or if there's an error from the Amplitude server due to an issue with the event format.
 You can use the error callback together with the success callback like this:

```js
var successCallback = function() {
    console.log('the event was logged successfully');
}

var errorCallback = function() {
    console.log('there was an error logging the event')
};

amplitude.getInstance().logEvent('event', null, successCallback, errorCallback);
```

### `init` callbacks

You can also pass a callback function to init, which is called after the SDK finishes its asynchronous loading. The instance is passed as an argument to the callback:

```js
amplitude.getInstance().init('API_KEY', 'USER_ID', null, function(instance) {
  console.log(instance.options.deviceId);  // access Amplitude's deviceId after initialization
});
```

### Use sendBeacon

In SDK version 8.5.0 and higher, the SDK can send events using the browser's built-in navigator.sendBeacon API.
 Unlike standard network requests, sendBeacon sends events in the background, even if the user closes the browser or leaves the page.

!!!warning

    Because sendBeacon sends events in the background, Amplitude has no way of knowing if a send has failed, and can't try to resend the event.  

To send an event using sendBeacon, set the transport SDK option to 'beacon' in one of two ways

```js
// set transport to 'beacon' when initializing an event
amplitude.getInstance().init('API_KEY', 'USER_ID', {transport: 'beacon'});

// set transport to 'beacon' after initialization
amplitude.getInstance().setTransport('beacon');

// this event will be sent using navigator.sendBeacon
amplitude.getInstance().logEvent('send event with beacon');

// set transport back to the default 'http' value
amplitude.getInstance().setTransport('http');

// this event will be sent using the standard xhr mechanism
amplitude.getInstance().logEvent('send event with http');

```

#### Use sendBeacon only when exiting page

The JavaScript SDK provides a convenient callback function that's called only when the user exits the page. It automatically switches the transport to 'beacon' for any logs sent in the callback. This callback is called `onExitPage` and is passed into the SDK on initialization, like so:

```js
var exitCallback = function {
  amplitude.getInstance().logEvent('Logging a final event as user exits via sendBeacon');
};

amplitude.getInstance().init('API_KEY', 'USER_ID', { onExitPage: exitCallback });
```

### Custom device IDs

By default, device IDs are randomly generated UUIDs. You can define a custom device ID by setting it as a configuration option or by calling `setDeviceId`.

```js
amplitude.getInstance().setDeviceId('DEVICE_ID');
```

You can retrieve the device ID that Amplitude uses with `Amplitude.getInstance().getDeviceId().` This method can return `null` if a `deviceId` hasn't been generated yet.

!!!note
    Amplitude doesn't recommend defining your own device IDs unless you have your own system for tracking user devices. Make sure the `deviceId` you set is unique to prevent conflicts with other devices in your Amplitude data.
     It's best practice to use something like a UUID.

    [See an example](https://github.com/amplitude/Amplitude-Javascript/blob/master/src/uuid.js) of how to generate UUIDs with JavaScript.

--8<-- "includes/abbreviations.md"

### Content Security Policy (CSP)

If your web app configures the strict Content Security Policy (CSP) for security concerns, adjust the policy to whitelist the Amplitude domains:

- When using ["Snippet"](#install), add `https://*.amplitude.com` to `script-src`.
- Add `https://*.amplitude.com` to `connect-src`.
