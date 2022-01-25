---
title: "JavaScript SDK"
tags:
  - javascript
  - sdk
icon: material/language-javascript
---
# JavaScript SDK

[![npm version](https://badge.fury.io/js/amplitude-js.svg)](https://badge.fury.io/js/amplitude-js) 

???info "SDK Resources"
    [JavaScript SDK Reference :material-book:](https://amplitude.github.io/Amplitude-JavaScript/){ .md-button}

    [JavaScript SDK Repo :material-github:](https://github.com/amplitude/Amplitude-JavaScript){ .md-button}
    
    [JavaScript SDK Reference :material-code-tags-check:](https://github.com/amplitude/Amplitude-Javascript/releases){ .md-button}


## SDK Installation

### Installing Via the Snippet

You can install the JavaScript SDK using a small snippet of code which you paste on your site to asynchronously load the SDK. On every page that you want to install Amplitude analytics, paste the code snippet just before the `</head>` tag, replacing API_KEY with the API Key given to you. You can find your project's API Key in your project's [Settings page](https://help.amplitude.com/hc/en-us/articles/360058073772).

```javascript
<script type="text/javascript">
(function(e,t){var r=e.amplitude||{_q:[],_iq:{}};var n=t.createElement("script")
;n.type="text/javascript"
;n.integrity="sha384-4rr7CTymHc64YjTTL6O3ktfsHYI1yJnQdmKv4zFoe+frjXb05MfzzuLLIAgJ/XHs"
;n.crossOrigin="anonymous";n.async=true
;n.src="https://cdn.amplitude.com/libs/amplitude-8.11.0-min.gz.js"
;n.onload=function(){if(!e.amplitude.runQueuedFunctions){
console.log("[Amplitude] Error: could not load SDK")}}
;var s=t.getElementsByTagName("script")[0];s.parentNode.insertBefore(n,s)
;function i(e,t){e.prototype[t]=function(){
this._q.push([t].concat(Array.prototype.slice.call(arguments,0)));return this}}
var o=function(){this._q=[];return this}
;var a=["add","append","clearAll","prepend","set","setOnce","unset","preInsert","postInsert","remove"]
;for(var c=0;c<a.length;c++){i(o,a[c])}r.Identify=o;var u=function(){this._q=[]
;return this}
;var p=["setProductId","setQuantity","setPrice","setRevenueType","setEventProperties"]
;for(var l=0;l<p.length;l++){i(u,p[l])}r.Revenue=u
;var d=["init","logEvent","logRevenue","setUserId","setUserProperties","setOptOut","setVersionName","setDomain","setDeviceId","enableTracking","setGlobalUserProperties","identify","clearUserProperties","setGroup","logRevenueV2","regenerateDeviceId","groupIdentify","onInit","logEventWithTimestamp","logEventWithGroups","setSessionId","resetSessionId","setLibrary","setTransport"]
;function v(e){function t(t){e[t]=function(){
e._q.push([t].concat(Array.prototype.slice.call(arguments,0)))}}
for(var r=0;r<d.length;r++){t(d[r])}}v(r);r.getInstance=function(e){
e=(!e||e.length===0?"$default_instance":e).toLowerCase()
;if(!Object.prototype.hasOwnProperty.call(r._iq,e)){r._iq[e]={_q:[]};v(r._iq[e])
}return r._iq[e]};e.amplitude=r})(window,document);

amplitude.getInstance().init("API_KEY");
</script>
```

### Installing with npm or yarn

 Alternatively, you can install the [npm module](https://www.npmjs.com/package/amplitude-js) and embed the SDK directly into your product.
If you are using npm, use the following command:

```javascript
npm install amplitude-js
```

If you are using yarn, use the following command:

```javascript
yarn add amplitude-js
```

You will now be able to import amplitude in your project:

```javascript
import amplitude from 'amplitude-js';
```

## Usage & Examples

### Initialization

Initialization is necessary before any instrumentation is done. The API key for your Amplitude project is required. The default instance will be created by default, but several instances can be maintained if created through `getInstance` with a string name.

```javascript
var instance1 = amplitude.getInstance().init("API_KEY"); // initializes default instance of Amplitude client
var instance2 = amplitude.getInstance("instance").init("API_KEY"); // initializes named instance of Amplitude client
```

#### Initialization with Options

Custom options can be passed into the init method. A list of all possible options for the client can be found [here](https://github.com/amplitude/Amplitude-JavaScript/blob/main/src/options.js).

```javascript
var options = {};
var instance = amplitude.getInstance("instance").init("API_KEY", null, options); // initializes with the given options
```

### Setting User Id

The User ID can be set either upon initializing the client, or after initialization with the `setUserId` method.

```javascript
var userId = "12345";
amplitude.getInstance().init("API_KEY", userId); // initializes client with the given userId
```

```javascript
var userId = "12345";
amplitude.getInstance().setUserId(userId);
```

### EU Data Residency

Starting from version 8.9.0, you can configure the server zone when initializing the client for sending data to Amplitude's EU servers. SDK will switch and send data based on the server zone if it is set. The server zone config supports dynamic configuration as well.

For previous versions,  you need to configure the apiEndpoint property when initializing the client.

Warning: For EU data residency, project need to be set up inside Amplitude EU and SDK initialized with api key from Amplitude EU first. This method won't work without proper set up first.
[block:code]
{
  "codes": [
    {
      "code": "// For versions starting from 8.9.0\n// No need to call setServerUrl for sending data to Amplitude's EU servers\namplitude.getInstance().init(euApiKey, null, {\n  serverZone: 'EU',\n  serverZoneBasedApi: true,\n});\n\n// For earlier versions\namplitude.getInstance().init(euApiKey, null, {\n   apiEndpoint: 'https://api.eu.amplitude.com'\n});",
      "language": "javascript"
    }
  ]
}
[/block]

### Sending Events

#### Basic Events

Events represent how users interact with your application. For example, “Button Clicked” may be an action you want to note.

```javascript
var event = “Button Clicked”;
amplitude.getInstance().logEvent(event);
```

#### Events with Properties

Events can also contain properties. They provide context about the event taken. For example, “hover time” may be a relevant event property to “Button Clicked”.

```javascript
var event = “Button Clicked”;
var eventProperties = {
    "hover time": "100ms"
};
amplitude.getInstance().logEvent(event, eventProperties);
```

#### Arrays in Event Properties

Arrays can be used as event property values. Array event properties can be queried by any subset of the individual properties in the array.

```javascript
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

### User Properties

User properties help you understand your users at the time they performed some action within your app such as their device details, their preferences, or language.

#### Setting a User Property

The amplitude Identify object provides controls over setting user properties. An Identify object must first be instantiated, then Identify methods can be called on it, and finally the client will make a call with the Identify object

```javascript
new amplitude.Identify(); // does nothing, must call one of the following methods and pass to client

var identify = new amplitude.Identify();
amplitude.getInstance().identify(identify); // makes identify call to amplitude with the properties of the identify object
```

#### set

`set`  sets the value of a user property. You can also chain together multiple set calls.

```javascript
var identify1 = new amplitude.Identify().set('key1', 'value1');
var identify2 = new amplitude.Identify().set('key2', 'value2').set('key3', 'value3');
amplitude.getInstance().identify(identify1);
amplitude.getInstance().identify(identify2);
```

#### setOnce

`setOnce` sets the value of a user property only once. Subsequent calls using `setOnce` will be ignored.

```javascript
var identify = new amplitude.Identify().setOnce('key1', 'value1');
amplitude.getInstance().identify(identify);
```

#### add

`add`  increments a user property by some numerical value. If the user property does not have a value set yet, it will be initialized to `0` before being incremented.

```javascript
var identify = new amplitude.Identify().add('value1', 10);
amplitude.getInstance().identify(identify);

```

#### Setting Multiple User Properties

You can use `setUserProperties` as a shorthand to set multiple user properties at once. This method is simply a wrapper around `Identify.set` and `identify`. For example, a user's city can be set with the following code.

```javascript
var userProperties = {
    city: "San Francisco"
};
amplitude.getInstance().setUserProperties(userProperties);
```

#### Arrays in User Properties

Arrays can be used as user properties. You can directly set arrays or use `append` to generate an array.

```javascript
var values = ['value1', 'value2'];
var identify = new amplitude.Identify().set('key1', values);
amplitude.getInstance().identify(identify);
```

#### prepend/append

- `append` will append a value or values to a user property array.
- `prepend` will prepend a value or values to a user property.

If the user property does not have a value set yet, it will be initialized to an empty list before the new values are added. If the user property has an existing value and it is not a list, it will be converted into a list with the new value added.

### User Groups

[block:callout]
{
  "type": "info",
  "body": "Note: This feature is only available for Growth customers who have purchased the [Accounts add-on](https://amplitude.zendesk.com/hc/en-us/articles/115001765532)."
}
[/block]

Amplitude supports assigning users to groups and performing queries such as Count by Distinct on those groups. An example would be if you want to group your users based on what organization they are in by using an 'orgId'. You can designate Joe to be in 'orgId' '10' while Sue is in 'orgId' '15'. When performing a query in our Event Segmentation chart, you can then select "..performed by" 'orgId' to query the number of different organizations that have performed a specific event. As long as at least one member of that group has performed the specific event, that group will be included in the count.

When setting groups, you will need to define a groupType and groupName(s). In the above example, 'orgId' is the groupType and the values '10' and '15' are groupName(s). Another example of a groupType could be 'sport' with groupName(s) like 'tennis' and 'baseball'. You can use setGroup(groupType, groupName) to designate which groups a user belongs to. Note: This will also set the 'groupType:groupName' as a user property. This will overwrite any existing groupName value set for that user's groupType, as well as the corresponding user property value. groupType is a string and groupName can be either a string or an array of strings to indicate a user being in multiple groups (for example, if Joe is in 'orgId' '10' and '16', then the groupName would be '[10, 16]'). Here is what your code might look like.
[block:code]
{
  "codes": [
    {
      "code": "amplitude.getInstance().setGroup('orgId', '15');\namplitude.getInstance().setGroup('sport', ['soccer', 'tennis']);",
      "language": "javascript"
    }
  ]
}
[/block]
You can also use logEventWithGroups to set event-level groups, meaning the group designation only applies for the specific event being logged and does not persist on the user unless you explicitly set it with setGroup.
[block:code]
{
  "codes": [
    {
      "code": "var eventProperties = {\n  'key': 'value'\n}\n\namplitude.getInstance().logEventWithGroups('initialize_game', eventProperties, {'sport': 'soccer'});",
      "language": "javascript"
    }
  ]
}
[/block]

### Group Identify

!!!note
    (Enterprise only) This feature is only available to Growth and Enterprise customers who have purchased the [Accounts add-on](https://amplitude.zendesk.com/hc/en-us/articles/115001765532).

Use the Group Identify API to set or update properties of particular groups. However, these updates will only affect events going forward.

The `groupIdentify` method accepts a group type and group name string parameter, as well as an Identify object that will be applied to the group.

```javascript
var groupType = 'plan';
var groupName = 'enterprise';
var identify = new amplitude.Identify().set('key1', 'value1');

amplitude.getInstance().groupIdentify(groupType, groupName, identify);
```

An optional callback function can be supplied as a fourth argument to `groupIdentify`.

### Track Revenue

The preferred method of tracking revenue for a user is to use `logRevenueV2()` in conjunction with the provided Revenue interface. Revenue instances will store each revenue transaction and allow you to define several special revenue properties (such as 'revenueType', 'productIdentifier', etc.) that are used in Amplitude's Event Segmentation and Revenue LTV charts. You can also add event properties to revenue events via the eventProperties field. These Revenue instance objects are then passed into `logRevenueV2` to send as revenue events to Amplitude. This allows us to automatically display data relevant to revenue in the platform. You can use this to track both in-app and non-in-app purchases.

To track revenue from a user, call logRevenueV2() each time a user generates revenue. Here is an example:
[block:code]
{
  "codes": [
    {
      "code": "var revenue = new amplitude.Revenue().setProductId('com.company.productId').setPrice(3.99).setQuantity(3);\namplitude.getInstance().logRevenueV2(revenue);",
      "language": "javascript"
    }
  ]
}
[/block]
Calling logRevenueV2 will generate a revenue event type:

- **'[Amplitude] Revenue':** This event is logged for all revenue events, regardless of whether or not verification is turned on.

You cannot change the default names given to these client-side revenue events in the raw data but you do have the option to modify the [display name](https://amplitude.zendesk.com/hc/en-us/articles/235649848#events). To learn more about tracking revenue, see our documentation [here](https://amplitude.zendesk.com/hc/en-us/articles/115003116888).

**IMPORTANT NOTE: Amplitude currently does not support currency conversion. All revenue data should be normalized to your currency of choice, before being sent to Amplitude.**

Name | Type | Description | Default
-----|-------|--------------|--------
productId (optional) | string  | An identifier for the product. We recommend something like the Google Play Store product ID. | null
quantity (required) | integer | The quantity of products purchased. Note: revenue = quantity * price | 1
price (required) | double | The price of the products purchased, and this can be negative. Note: revenue = quantity * price | null
revenueType (optional) | string | The type of revenue (e.g. tax, refund, income). | null
eventProperties (optional) | object | An object of event properties to include in the revenue event. | null

### Opt Out of Tracking

You can turn off logging for a given user by calling setOptOut:
[block:code]
{
  "codes": [
    {
      "code": "amplitude.getInstance().setOptOut(true);",
      "language": "javascript"
    }
  ]
}
[/block]
No events will be saved or sent to the server while this is enabled. The opt out setting will persist across page loads. You can reenable logging by calling:
[block:code]
{
  "codes": [
    {
      "code": "amplitude.getInstance().setOptOut(false);",
      "language": "text"
    }
  ]
}
[/block]

### Disable Tracking

By default, the JS SDK will track a number of properties automatically. You can override this behavior by passing an object called `trackingOptions` when initializing the SDK, setting the appropriate options to `false`. These options are listed below:

Parameter | Default Value
-------|------------
city | true
country | true
carrier | true
device_manufacturer | true
device_model | true
dma | true
ip_address | true
language | true
os_name | true
os_version | true
platform | true
region | true
version_name | true
[block:callout]
{
  "type": "warning",
  "body": "The *trackingOptions* configurations will only prevent default properties from being tracked on **newly created** projects, where data has not yet been sent. If you have a project with existing data that you would like to stop collecting the default properties for, please contact our Support team at support.amplitude.com. Note that the existing data will not be deleted.",
  "title": "Important Note"
}
[/block]

### Setting Custom User ID

If your app has its own login system that you want to track users with, you can call setUserId at any time:
[block:code]
{
  "codes": [
    {
      "code": "amplitude.getInstance().setUserId('USER_ID');",
      "language": "javascript"
    }
  ]
}
[/block]
You can also add the User ID as an **argument** to the init call。
[block:code]
{
  "codes": [
    {
      "code": "[[Amplitude] instance] initializeApiKey:@\"API_KEY\" userId:@\"USER_ID\"];",
      "language": "javascript"
    }
  ]
}
[/block]
You should not assign users a User ID that could change as each unique User ID is interpreted as a unique user in Amplitude. Please see our article on how we identify and count unique users for further information.

### Log Out and Anonymous Users

A user's data will be [merged](https://help.amplitude.com/hc/en-us/articles/115003135607) on the backend so that any events up to that point from the same browser will be tracked under the same user. If a user logs out or you want to log the events under an anonymous user, you will need to:

1. Set the userId to null.
2. Regenerate a new deviceId.

After doing that, events coming from the current user/device will appear as a brand new user in Amplitude. Note: If you choose to do this, you will not be able to see that the two users were using the same device.
[block:code]
{
  "codes": [
    {
      "code": "amplitude.getInstance().setUserId(null); // not string 'null'\namplitude.getInstance().regenerateDeviceId();",
      "language": "javascript"
    }
  ]
}
[/block]

### Session Tracking

Events triggered within 30 minutes of each other are counted towards the current session. The time of the first event marks the start time of a session and the last event triggered marks the end time of a session. You can change the session timeout window via the SDK configuration option field sessionTimeout.

#### Getting the Session ID

In the JavaScript SDK, you can use the helper method _sessionId to get the value of the current sessionId:
[block:code]
{
  "codes": [
    {
      "code": "var sessionId = amplitude.getInstance()._sessionId;",
      "language": "javascript"
    }
  ]
}
[/block]

### Configuring HTTP Headers

HTTP request headers that are attached to sent events can be set using the `options.headers` configuration when initializing. This should only be relevant if a [domain proxy](https://developers.amplitude.com/docs/domain-proxies) is used that requires custom header options.

[block:code]
{
  "codes": [
    {
      "code": "amplitude.getInstance().init(APIKEY, null, {\n  headers: {\n     'x-session-id': appToken,\n    \t'Content-Type': 'application/json;charset=utf-8'\n  }\n});\n",
      "language": "javascript"
    }
  ]
}
[/block]

### Logging Events to Multiple Projects

If you want to log events to multiple Amplitude projects, then you will need to have separate instances for each Amplitude project. As mentioned earlier, each instance will allow for completely independent apiKeys, userIds, deviceIds, and settings.

You will need to assign a name to each Amplitude project/instance and use that name consistently when fetching that instance to call functions.

!!!important 
    Once you have chosen a name for that instance you cannot change it.

Choose your instance names wisely because every instance's data and settings are tied to its name, and you will need to continue using that instance name for all future versions of your project to maintain data continuity. These names do not need to be the names of your projects in the Amplitude platform, but they will need to remain consistent throughout your code. You also need to be sure that each instance is initialized with the correct apiKey.

Instance names must be non-null and non-empty strings. Names are case insensitive, and you can fetch each instance name by calling.

Each new instance created will have its own apiKey, userId, deviceId, and settings.

The following is an example of how to set up and log events to two separate projects:
[block:code]
{
  "codes": [
    {
      "code": "// existing project, existing settings, and existing API key\namplitude.getInstance().init('12345', null, {batchEvents: true});\n// new project, new API key\namplitude.getInstance('new_project').init('67890', null, {includeReferrer: true});\n\n// need to reconfigure new project\namplitude.getInstance('new_project').setUserId('joe@gmail.com');\namplitude.getInstance('new_project').setUserProperties({'gender':'male'});\namplitude.getInstance('new_project').logEvent('Clicked');\n\nvar identify = new amplitude.Identify().add('karma', 1);\namplitude.getInstance().identify(identify);\namplitude.getInstance().logEvent('Viewed Home Page');",
      "language": "javascript"
    }
  ]
}
[/block]

### Web Attribution

While Amplitude’s Javascript SDK does not collect web attribution data by default, setting it up is simple. The SDK can automatically collect this information if certain attribution configuration options are enabled.

Amplitude supports automatically tracking the following through the SDK configuration options:

- The 5 standard UTM parameters from the user's browser cookie or URL parameters by using `includeUtm`.
- The referring URL and domain from includeReferrer.
- Google Click Identifier from URL parameters through `includeGclid`.
- Facebook Click Identifier from URL parameters through `includeFbclid`.  

#### Track UTM Parameters

UTM parameters stand for Urchin Traffic Monitor parameters and are useful for analyzing the effectiveness of different ad campaigns and referring sites. Note that UTM parameters are case sensitive so they will turn out to be different values if the capitalization varies.

There are five different standard UTM parameters:

- **utm_source:** This identifies which website sent the traffic (e.g. Google, Facebook).
- **utm_medium:** This identifies what type of link was used (e.g. banner, button, email).
- **utm_campaign:** This identifies a specific campaign used (e.g. summer_sale).
- **utm_term:** This identifies paid search terms used (e.g. product+analytics).
- **utm_content:** This identifies what brought the user to the site and is commonly used for A/B testing (e.g. bannerlink, textlink).

Here is an example URL:

```bash
https://www.amplitude.com/?utm_source=newsletter&utm_campaign=product_analytics_playbook&utm_medium=email&utm_term=product%20analytics&utm_content=bannerlink
```

#### Enabling via SDK

In Amplitude, once you set the `includeUtm` option to true, the JavaScript SDK will automatically pull UTM parameters from the referring URL and include them as user properties on all of the relevant events:

- **includeGclid:** Gclid (Google Click Identifier) is a globally unique tracking parameter used by Google. If utilized, Google will append a unique parameter (e.g. "?gclid=734fsdf3") to URLs at runtime. By setting this to true, the SDK will capture `initial_glid` and `gclid` as user properties.
- **includeFbclid:** Fbclid (Facebook Click Identifier) is a globally unique tracking parameter used by Facebook. If utilized, Facebook will append a unique parameter (e.g. "?fbclid=392foih3") to URLs at runtime. By setting this to true, the SDK will capture `initial_fblid` and `fbclid` as user properties.
- **includeUtm:** If true, finds the standard UTM parameters from either the URL or the browser cookie and sets them as user properties. This will set `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, and `utm_content` as well as `initial_utm_source`, `initial_utm_medium`, `initial_utm_campaign`, `initial_utm_term`, and `initial_utm_content` as user properties for the user.
UTM parameters are captured once per session by default and occurs when the user loads your site and the Amplitude SDK for the first time. You can disable the once per session restriction through the saveParamsReferrerOncePerSession configuration option. When the SDK detects that it should start a new session, it will pull the UTM parameters that are available at the time. Those UTM parameters will be set as user properties which will persist for all of the user's events going forward. However, initial UTM parameters are captured only once for each user via a setOnce operation. See the Javascript SDK Configuration Options for reference.

#### Track Referrers

If you want to track how users are getting to your website, then all you need to do is track the referrer (the referring site).

Here are the fields Amplitude supports tracking automatically:

- **referrer:** The last page the user was on (e.g. <https://amplitude.com/behavioral-analytics-platform?ref=nav>).
- **referring_domain:** The domain that the user was last on (e.g. amplitude.com).

#### Enabling via SDK

Once you set the `includeReferrer` option to `true`, Amplitude will capture the referrer and referring_domain for each session and set them as user properties on all of the relevant events:

- **includeReferrer:** If true, captures the `referrer` and `referring_domain` for each session as user properties as well as the 'initial_referrer' and 'initial_referring_domain' user properties once for each user. The referrer is the entire URL while the referring_domain is only the domain name from where the user came from.

Initial referring information is captured only once for each user via a setOnce operation. See the Javascript SDK Configuration Options for reference.

#### First-Touch Attribution

Amplitude can capture the initial UTM parameters and referrer information for each user. The first-touch attribution values are set when a user's non-null UTM parameters are seen for the first time. The following user properties are set once:

- initial_utm_source
- initial_utm_medium
- initial_utm_campaign
- initial_utm_term
- initial_utm_content
- initial_referrer
- initial_referring_domain
- initial_gclid
- initial_fbclid

This is done by setting the JavaScript SDK configuration options `includeReferrer`, `includeUtm`, and `includeGclid` to `true`.

*Note: Initial attribution information for users can change if there are merged users.*

#### Last-Touch Attribution

In addition to first-touch attribution, Amplitude will capture where a user came from for each of their sessions. This is accomplished by setting the following user properties:

- utm_source
- utm_medium
- utm_campaign
- utm_term
- utm_content
- referrer
- referring_domain
- gclid
- fbclid

This is done by setting the JavaScript SDK configuration options `includeReferrer`, `includeUtm`, and `includeGclid` to `true`. By default, the SDK will only save values at the start of the session so if a user triggers some flow that causes them to land on the site again with a different set of UTM parameters within the same session, that second set will not be saved.

#### Multi-Touch Attribution

If you set `saveParamsReferrerOncePerSession` to `false` in your JavaScript SDK configuration, the SDK will always capture any new values from the user. This will update the following user properties throughout a session if they change:

- utm_source
- utm_medium
- utm_campaign
- utm_term
- utm_content
- referrer
- referring_domain
- gclid
- fbclid

Some customers also instrument these user properties as arrays in order to keep track of all the attribution parameters seen within the same session for a single user.

#### Logging Captured Attribution Values via Amplitude (Advanced Use Case)

**These events will count towards your event quota**.

If you set `logAttributionCapturedEvent` to `true` in your JavaScript SDK configuration, the SDK will log an Amplitude event anytime new attribution values are captured from the user.

**Event Name:** [Amplitude] Attribution Captured

**Event Properties:**

- utm_source
- utm_medium
- utm_campaign
- utm_term
- utm_content
- referrer
- referring_domain
- gclid
- fbclid

### Google Tag Manager

Amplitude's JavaScript SDK supports integration with Google Tag Manager. Take a look at our demo application for instructions on how to set it up.

### Dynamic Configuration

Starting from version 8.9.0, Javascript SDK allows users to configure their apps to use [dynamic configuration](https://developers.amplitude.com/docs/dynamic-configuration). This feature will find the best server url automatically based on app users' geo location.

- If you have your own proxy server and use custom apiEndPoint, please leave this OFF.
- If you have users in China Mainland, we suggest you turn this on.
- By default, this feature is OFF. So you need to explicitly set it to ON to use it.
- By default, this feature returns server url for Amplitude's US servers, if you need to send data to Amplitude's EU servers, please use setServerZone to set it to EU zone.
[block:code]
{
  "codes": [
    {
      "code": "amplitude.getInstance().init(euApiKey, null, {\n  useDynamicConfig: true,\n});",
      "language": "javascript"
    }
  ]
}
[/block]

[block:embed]
{
  "html": false,
  "url": "https://github.com/amplitude/GTM-Web-Demo",
  "title": "amplitude/GTM-Web-Demo",
  "favicon": "https://github.com/favicon.ico",
  "image": "https://opengraph.githubassets.com/fd3fddb5a205dca6eec9425063d94b46b10bcb092917ffa9f3e16bff2befc94e/amplitude/GTM-Web-Demo"
}
[/block]
