---
title: Browser SDK
description: The Amplitude Browser SDK Installation & Quick Start guide.
icon: simple/javascript
---


![npm version](https://img.shields.io/npm/v/@amplitude/analytics-browser.svg)

The Browser SDK lets you send events to Amplitude. This library is open-source, check it out on [GitHub](https://github.com/amplitude/Amplitude-TypeScript).

!!!info "Browser SDK Resources"
    [:material-github: GitHub](https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/analytics-browser) · [:material-code-tags-check: Releases](https://github.com/amplitude/Amplitude-TypeScript/releases) · [:material-book: API Reference](https://amplitude.github.io/Amplitude-TypeScript/)

!!!note "Browser SDK versus the Marketing Analytics Browser"
    Amplitude recommends the Browser SDK for most users. You can extend its functionality using plugins.
    However, if you want web attribution and page view tracking without extra setup, use the Marketing Analytics Browser SDK instead. It extends the Browser SDK with built-in web attribution and page view tracking. Learn more about [Marketing Analytics Browser SDK](../marketing-analytics-browser/).

--8<-- "includes/ampli-vs-amplitude.md"
    Click here for more documentation on [Ampli for Browser](./ampli.md).

## Getting started

Use [this quickstart guide](../sdk-quickstart#browser) to get started with Amplitude Browser SDK.

## Usage

### Initialize the SDK

--8<-- "includes/sdk-httpv2-notice.md"

--8<-- "includes/sdk-ts-browser/init.md"

### Configuration

--8<-- "includes/sdk-ts-browser/shared-configurations.md"
    |`storageProvider`| `Storage<Event[]>`. Implements a custom `storageProvider` class from Storage. | `LocalStorage` |
    |`attribution`| `AttributionOptions`. Configurations for web attribution plugin | Check "Attribution Options" config table below |
    |`defaultTracking`| `boolean | DefaultTrackingOptions`. Configurations for default event tracking | Check [tracking default events](./#tracking-default-events)|

In addition to the basic configuration options, there also has options to configure attribution.
    
???config "Attribution Options"
    |<div class="big-column">Name</div>| Description| Default Value|
    |---|----|---|
    |`config.attribution.disabled`| `boolean`. Whether disable the attribution tracking. | `false` |
    |`config.attribution.excludeReferrers`| `string[]`. Exclude the attribution tracking for the provided referrers string | Including all referrers by default. |
    |`config.attribution.initialEmptyValue`| `string`. Customize the initial empty value for attribution related user properties to any string value. | `EMPTY` |
    |`config.attribution.resetSessionOnNewCampaign`| `boolean`. Whether to reset user sessions when a new campaign is detected. Note a new| `false` |
    |`config.attribution.trackNewCampaigns`| `boolean`. Whether tracking new campaigns on the current session. | `false` | 
    |`config.attribution.trackPageViews`| `boolean`. Whether track page view on attribution. Note that `config.defaultTracking.pageViews` has higher priority over this configuration. Learn more about it [here](./#tracking-page-views). | `false` |

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

#### Debugging

--8<-- "includes/sdk-ts/client-debugging.md"

### Tracking an event

--8<-- "includes/sdk-httpv2-notice.md"

Events represent how users interact with your application. For example, "Button Clicked" may be an action you want to note.

```ts
// Track a basic event
amplitude.track('Button Clicked');

// Track events with optional properties
const eventProperties = {
  buttonColor: 'primary',
};
amplitude.track('Button Clicked', eventProperties);
```

### Tracking default events

Starting version 1.9.1, Browser SDK now tracks default events. Browser SDK can be configured to track the following events automatically:

* Page views [^1]
* Sessions
* Form interactions
* File downloads

[^1]:
    If you want to track page views before 1.9.0, you need to enable config.attribution.trackPageViews ([More details](./#configuration)) or add `page-view-tracking` plugin ([More details](../marketing-analytics-browser/#page-view)). The event type for page views will be different.

???config "Tracking default events options"
    |<div class="big-column">Name</div>|Value|Description|
    |-|-|-|
    `config.defaultTracking.pageViews` | Optional. `boolean` | Enables default page view tracking. If value is `true`, Amplitude tracks page view events on initialization. Default value is `false`.<br /><br />Event properties tracked includes: `[Amplitude] Page Domain`, `[Amplitude] Page Location`, `[Amplitude] Page Path`, `[Amplitude] Page Title`, `[Amplitude] Page URL`<br /><br />See [Tracking page views](#tracking-page-views) for more information.|
    `config.defaultTracking.sessions` | Optional. `boolean` | Enables session tracking. If value is `true`, Amplitude tracks session start and session end events. Default value is `false`.<br /><br />See [Tracking sessions](#tracking-sessions) for more information.|
    `config.defaultTracking.formInteractions` | Optional. `boolean` | Enables form interaction tracking. If value is `true`, Amplitude tracks form start and form submit events. Default value is `false`.<br /><br />Event properties tracked includes: `[Amplitude]  Form ID`, `[Amplitude] Form Name`, `[Amplitude] Form Destination`<br /><br />See [Tracking form interactions](#tracking-form-interactions) for more information.|
    `config.defaultTracking.fileDownloads` | Optional. `boolean` | Enables file download tracking. If value is `true`, Amplitude tracks file download events. Default value is `false`.<br /><br />Event properties tracked includes: `[Amplitude] File Extension`, `[Amplitude] File Name`, `[Amplitude] Link ID`, `[Amplitude] Link Text`, `[Amplitude] Link URL`<br /><br />See [Tracking file downloads](#tracking-file-downloads) for more information.|

You can enable Amplitude to start tracking all events mentioned above, use the code sample below. Otherwise, you can omit the configuration to keep them disabled.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  defaultTracking: {
    pageViews: true,
    sessions: true,
    formInteractions: true,
    fileDownloads: true,
  },
});
```

Alternatively, you can enable Amplitude to track all events mentioned above by setting `config.defaultTracking` to `true`.

!!!note
    Amplitude may add more events in a future version, and this configuration enables tracking for those events as well.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  defaultTracking: true,
});
```

#### Tracking page views

You can enable Amplitude to start tracking page view events by setting `config.defaultTracking.pageViews` to `true`. Refer to the code sample below.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  defaultTracking: {
    pageViews: true,
  },
});
```

By setting `config.defaultTracking.pageViews` to `true`, you enable Amplitude to use default page view tracking behavior. The default behavior sends a page view event on initialization. The event type for this event is "[Amplitude] Page Viewed".

!!!note Page view event configuration priority
    You may notice that both `config.defaultTracking.pageViews` and `config.attribution.trackPageViews` have configurations for whether to enable page view tracking especially when you are using the web attribution plugin. Notice that `config.defaultTracking.pageViews` has higher priority over `config.attribution.trackPageViews` which means that `config.defaultTracking.pageViews` will overwrite the setting of the attribution page view event. When `config.attribution.trackPageViews` is enabled, the SDK tracks page view events only when attribution changed. When `config.defaultTracking.pageViews` is enabled, the SDK tracks page view events when page changed.

##### Advanced configuration for tracking page views

You can also use advanced configuration for better control of when page views event are sent.

???config "Tracking page views options"
    |<div class="big-column">Name</div>|Value|Description|
    |-|-|-|
    `config.defaultTracking.pageViews.trackOn` | Optional. `"attribution"` or `() => boolean` | Provides advanced control on when page view events are tracked.<br /><br />You can omit or set the value to `undefined`,  and configure page view events to be tracked on initialization.<br /><br />You can set the value to `"attribution"` and configure page view events to be tracked only when web attribution are tracked.<br /><br />You can set the value to a function that returns a boolean (`true` or `false`) and configure page view events to be tracked based on your criteria.|
    `config.defaultTracking.pageViews.trackHistoryChanges` | Optional. `"pathOnly"` or `"all"` | Provides advanced control for single page application on when page views are tracked.<br /><br />You can omit or set the value to `"all"`,  and configure page view events to be tracked on any navigation change to the URL within your single page application. For example: navigating from `https://amplitude.com/#company` to `https://amplitude.com/#blog`.<br /><br />You can omit or set the value to "pathOnly",  and configure page view events to be tracked on navigation change to the URL path only within your single page application. For example: navigating from `https://amplitude.com/company` to `https://amplitude.com/blog`.|
    `config.defaultTracking.pageViews.eventType` | Optional. `String` | Customize the event_type for page view event. |

For example, you can configure Amplitude to track page views only when the URL path contains a certain substring, let’s say “home”. Refer to the code sample for how to achieve this.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  defaultTracking: {
    pageViews: {
      trackOn: () => {
        return window.location.pathname.includes('home');
      },
    },
  },
});
```

The following information is tracked in the page view events.

|<div class="big-column">Name</div>| Description| Default Value|
|---|----|---|
|`event_type`| `string`. The event type for page view event. Configurable through `defaultTracking.pageViews.eventType` or enrichment plugin. | `[Amplitude] Page Viewed` from version 1.9.1. |
|`event_properties.[Amplitude] Page Domain`| `string`. The page domain. | location.hostname or ''. |
|`event_properties.[Amplitude] Page Location`| `string`. The page location. | location.href or ''. |
|`event_properties.[Amplitude] Page Path`| `string`. The page path. | location.path or ''.|
|`event_properties.[Amplitude] Page Title`| `string`. The page title. | document.title or ''.|
|`event_properties.[Amplitude] Page Title`| `string`. The value of page url. | location.href.split('?')[0] or ``.|
|`event_properties.${CampaignParam}`| `string`. The value of `UTMParameters` `ReferrerParameters` `ClickIdParameters` if has any. Check [here](./#web-attribution) for the possilbe keys. | Any undefined campaignParam or `undefined`. |

#### Tracking sessions

You can enable Amplitude to start tracking session events by setting `config.defaultTracking.sessions` to `true`. Refer to the code sample below.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  defaultTracking: {
    sessions: true,
  },
});
```

By setting `config.defaultTracking.sessions` to `true`, you enable Amplitude to track session start and session end events. A session is the period of time a user has your website open. See [How Amplitude defines sessions](https://help.amplitude.com/hc/en-us/articles/115002323627-Track-sessions-in-Amplitude#how-amplitude-defines-sessions) for more information. When a new session starts, Amplitude tracks a session start event is and is the first event of the session. The event type for session start is "[Amplitude] Start Session". When an existing session ends, a session start end is tracked and is the last event of the session. The event type for session end is "[Amplitude] End Session".

#### Tracking form interactions

You can enable Amplitude to start tracking form interaction events by setting config.defaultTracking.formInteractions to true. Refer to the code sample below.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  defaultTracking: {
    formInteractions: true,
  },
});
```

By setting `config.defaultTracking.formInteractions` to `true`, you enable Amplitude to track form start and form submit events. A form start event is tracked when the user initially interacts with the form. An initial interaction can be the first change to an text input, or radio button, or dropdown. The event type for session start is "[Amplitude] Form Started". A form submit event is tracked when the user submits the form. The event type for session start is "[Amplitude] Form Submitted". If a form is submitted with no initial change to any form fields, both "[Amplitude] Form Started" and "[Amplitude] Form Submitted" are tracked.

Amplitude can track forms that are constructed with `<form>` tags and `<input>` tags nested. For example:

```html
<form id="subscriber-form" name="subscriber-form" action="/subscribe">
  <input type="text" />
  <input type="submit" />
</form>
```

#### Tracking file downloads

You can enable Amplitude to start tracking file download events by setting `config.defaultTracking.fileDownloads` to `true`. Refer to the code sample below.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  defaultTracking: {
    fileDownloads: true,
  },
});
```

By setting `config.defaultTracking.fileDownloads` to `true`, you enable Amplitude to track file download events. A file download event is tracked when an anchor or `<a>` tag linked to a file is clicked. The event type for file download is "[Amplitude] File Downloaded". Amplitude determines that the anchor or `<a>` tag linked to a file if the file extension matches the following regex:

`pdf|xlsx?|docx?|txt|rtf|csv|exe|key|pp(s|t|tx)|7z|pkg|rar|gz|zip|avi|mov|mp4|mpe?g|wmv|midi?|mp3|wav|wma`

### User properties

User properties are details like device details, user preferences, or language to help you understand your users at the time they performed an action in your app.

Identify is for setting the user properties of a particular user without sending any event. The SDK supports the operations `set`, `setOnce`, `unset`, `add`, `append`, `prepend`, `preInsert`, `postInsert`, and `remove` on individual user properties. Declare the operations via a provided Identify interface. You can chain together multiple operations in a single Identify object. The Identify object is then passed to the Amplitude client to send to the server.

!!!note
    If the Identify call is sent after the event, the results of operations are visible immediately in the dashboard user’s profile area. However, they don't appear in chart results until another event is sent after the Identify call. The identify call only affects events going forward. More details [here](https://amplitude.zendesk.com/hc/en-us/articles/115002380567-User-Properties-Event-Properties#applying-user-properties-to-events).

#### Set a user property

The Identify object provides controls over setting user properties. It works like this: first, instantiate an Identify object, then call Identify methods on it, and finally, the client can make a call with the Identify object.

```ts
const identifyEvent = new amplitude.Identify();
amplitude.identify(identifyEvent);
```

#### Identify.set

This method sets the value of a user property. For example, you can set a role property of a user.

```ts
const identifyEvent = new amplitude.Identify();
identifyEvent.set('location', 'LAX');

amplitude.identify(identifyEvent);
```

#### Identify.setOnce

This method sets the value of a user property only one time. Subsequent calls using `setOnce()` are ignored. For example, you can set an initial login method for a user and because only the initial value is tracked, `setOnce()` ignores later calls.

```ts
const identifyEvent = new amplitude.Identify();
identifyEvent.setOnce('initial-location', 'SFO');

identify(identifyEvent);
```

#### Identify.add

This method increments a user property by some numerical value. If the user property doesn't have a value set yet, it's initialized to 0 before it's incremented. For example, you can track a user's travel count.

```ts
const identifyEvent = new amplitude.Identify();
identifyEvent.add('travel-count', 1);

amplitude.identify(identifyEvent);
```

#### Arrays in user properties

You can use arrays as user properties. Directly set arrays or use `prepend`, `append`, `preInsert` and `postInsert` to generate an array.

#### Identify.prepend

This method prepends a value or values to a user property array. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are prepended.

```ts
const identifyEvent = new Identify();
identifyEvent.prepend('visited-locations', 'LAX');

identify(identifyEvent);
```

#### Identify.append

This method appends a value or values to a user property array. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are prepended.

```ts
const identifyEvent = new amplitude.Identify();
identifyEvent.append('visited-locations', 'SFO');

amplitude.identify(identifyEvent);
```

#### Identify.preInsert

This method pre-inserts a value or values to a user property, if it doesn't exist in the user property yet. Pre-insert means inserting the values at the beginning of a given list. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are pre-inserted. If the user property has an existing value, this method is a no-op.

```ts
const identifyEvent = new amplitude.Identify();
identifyEvent.preInsert('unique-locations', 'LAX');

identify(identifyEvent);
```

#### Identify.postInsert

This method post-inserts a value or values to a user property, if it doesn't exist in the user property yet. Post-insert means inserting the values at the end of a given list. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are post-inserted. If the user property has an existing value, this method is a no-op..

```ts
const identifyEvent = new amplitude.Identify();
identifyEvent.postInsert('unique-locations', 'SFO');

amplitude.identify(identifyEvent);
```

#### Identify.remove

This method removes a value or values to a user property, if it exists in the user property. Remove means remove the existing values from the given list. If the user property has an existing value, this method is a no-op.

```ts
const identifyEvent = new amplitude.Identify();
identifyEvent.remove('unique-locations', 'JFK')

amplitude.identify(identifyEvent);
```

### User groups

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

--8<-- "includes/groups-intro-paragraph.md"

!!! example
    If Joe is in 'orgId' '15', then the `groupName` would be '15'.

    ```ts
    // set group with a single group name
    amplitude.setGroup('orgId', '15');
    ```

    If Joe is in 'sport' 'scoccer' and 'tennis', then the `groupName` would be '["tennis", "soccer"]'.

    ```ts
    // set group with multiple group names
    amplitude.setGroup('sport', ['soccer', 'tennis']);
    ```

--8<-- "includes/event-level-groups-intro.md"

```ts
amplitude.track({
  event_type: 'event type',
  event_properties: { eventPropertyKey: 'event property value' },
  groups: { 'orgId': '15' }
})
```

### Group properties

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

Use the Group Identify API to set or update properties of particular groups. These updates only affect events going forward.

The `groupIdentify()` method accepts a group type and group name string parameter, as well as an Identify object that's applied to the group.

```ts
const groupType = 'plan';
const groupName = 'enterprise';
const groupIdentifyEvent = new amplitude.Identify()
groupIdentifyEvent.set('key1', 'value1');

amplitude.groupIdentify(groupType, groupName, groupIdentifyEvent);
```

### Revenue tracking
<!-- vale off-->

The preferred method of tracking revenue for a user is to use `revenue()` in conjunction with the provided Revenue interface. Revenue instances store each revenue transaction and allow you to define several special revenue properties (such as 'revenueType' and 'productIdentifier') that are used in Amplitude's Event Segmentation and Revenue LTV charts. These Revenue instance objects are then passed into `revenue()` to send as revenue events to Amplitude. This lets automatically display data relevant to revenue in the platform. You can use this to track both in-app and non-in-app purchases.

<!--vale on-->

To track revenue from a user, call revenue each time a user generates revenue. In this example, 3 units of a product was purchased at $3.99.

```ts
const event = new amplitude.Revenue()
  .setProductId('com.company.productId')
  .setPrice(3.99)
  .setQuantity(3);

amplitude.revenue(event);
```

#### Revenue interface

| <div class="big-column">Name</div>  | Description | Default Value |
| --- | --- | --- |
|`product_id` | Optional. `string`. An identifier for the product. Amplitude recommend something like the Google Play Store product ID. | Empty string. |
|`quantity` | Required. `number`. The quantity of products purchased. Note: revenue = quantity * price. | `1` |
|`price` | Required. `number`. The price of the products purchased, and this can be negative. Note: revenue = quantity * price. | `null` |
|`revenue_type` | Optional, but required for revenue verification. `string`. The revenue type (for example, tax, refund, income). | `null` |
|`receipt`| Optional. `string`. The receipt identifier of the revenue. | `null` |
|`receipt_sig`| Optional, but required for revenue verification. `string`. The receipt signature of the revenue. | `null` |
|`properties`| Optional. `{ [key: string]: any }`. An object of event properties to include in the revenue event. | `null` |

### Flush the event buffer

The `flush` method triggers the client to send buffered events immediately.

```ts
amplitude.flush();
```

By default, `flush` is called automatically in an interval, if you want to flush the events all together, you can control the async flow with the optional Promise interface, example:

```ts
amplitude.init(API_KEY).promise.then(function() {
  amplitude.track('Button Clicked');
  amplitude.flush();
});
```

### Custom user ID

If your app has its own login system that you want to track users with, you can call `setUserId` at any time.

```ts
amplitude.setUserId('user@amplitude.com');
```

You can also assign the User ID as an argument to the init call.

```ts
amplitude.init(API_KEY, 'user@amplitude.com');
```

### Custom session ID

You can assign a new Session ID using `setSessionId`. When setting a custom session ID, make sure the value is in milliseconds since epoch (Unix Timestamp).

```ts
amplitude.setSessionId(Date.now());
```

### Custom device ID

If your app has its own login system that you want to track users with, you can call `setUserId` at any time.

You can assign a new device ID using `setDeviceId()`. When setting a custom device ID, make sure the value is sufficiently unique. Amplitude recommends using a UUID.

```ts
amplitude.setDeviceId(uuid());
```

### Reset when user logs out

`reset` is a shortcut to anonymize users after they log out, by:

* setting `userId` to `undefined`
* setting `deviceId` to a new UUID value

With an undefined `userId` and a completely new `deviceId`, the current user would appear as a brand new user in dashboard.

```ts
amplitude.reset();
```

### Opt users out of tracking

You can turn off logging for a given user by setting `setOptOut` to `true`.

```ts
amplitude.setOptOut(true);
```

Events aren't saved or sent to the server while `setOptOut` is enabled, and the setting persists across page loads. 

Re-enable logging by setting `setOptOut` to `false`.

```ts
amplitude.setOptOut(false);
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

=== "Promise"

    ```ts
    amplitude.track('Button Clicked').promise.then(function(result) {
      result.event; // {...} (The final event object sent to Amplitude)
      result.code; // 200 (The HTTP response status code of the request.
      result.message; // "Event tracked successfully" (The response message)
    });
    ```

=== "async/await"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';

    // Using async/await
    const results = await amplitude.track('Button Clicked').promise;
    result.event; // {...} (The final event object sent to Amplitude)
    result.code; // 200 (The HTTP response status code of the request.
    result.message; // "Event tracked successfully" (The response message)
    ```

### Plugins

Plugins allow you to extend Amplitude SDK's behavior by, for example, modifying event properties (enrichment type) or sending to a third-party APIs (destination type). A plugin is an object with methods `setup()` and `execute()`.

#### `add`

The `add` method adds a plugin to Amplitude. Plugins can help processing and sending events.

```ts
amplitude.add(new Plugin());
```

#### `remove`

The `remove` method removes the given plugin name from the client instance if it exists.

```ts
amplitude.remove(plugin.name);
```

#### Create your custom plugin

##### Plugin.setup

This method contains logic for preparing the plugin for use and has config as a parameter. The expected return value is undefined. A typical use for this method, is to copy configuration from config or instantiate plugin dependencies. This method is called when the plugin is registered to the client via `amplitude.add()`.

##### Plugin.execute

This method contains the logic for processing events and has event as parameter. If used as enrichment type plugin, the expected return value is the modified/enriched event. If used as a destination type plugin, the expected return value is a map with keys: `event` (BaseEvent), `code` (number), and `message` (string). This method is called for each event that's instrumented using the client interface, including Identify, GroupIdentify and Revenue events.

#### Plugin examples

##### Destination type plugin

Here's an example of a plugin that sends each event that's instrumented to a target server URL using your preferred HTTP client.

```ts
function myDestinationPlugin (serverUrl) {
  const name = 'my-destination-plugin';
  const type = amplitude.Types.PluginType.DESTINATION;
  let amplitudeConfig;
  
  /**
   * setup() is called on plugin installation
   * example: amplitude.add(new myDestinationPlugin());
   */
  const setup = function (config) {
    amplitudeConfig = config;
  }

  /**
   * execute() is called on each event instrumented
   * example: amplitude.track('New Event');
   */
  const execute = function (event) {
    const payload = {
      key: 'secret',
      data: event,
    };
    return fetch(this.serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
      body: JSON.stringify(payload),
    }).then(function(response) {
      return {
        code: response.status,
        event: event,
        message: response.statusText,
      };
    });
  }

  return {
    name,
    type,
    setup,
    execute,
  },
}

amplitude.init(API_KEY);
amplitude.add(myDestinationPlugin('https://custom.domain.com'));
```

##### Enrichment type plugin

Here's an example of a plugin that modifies each event that's instrumented by adding an increment integer to `event_id` property of an event starting from 100.

```ts
const addEventIdPlugin = () => {
  const name = 'add-event-id';
  const type = amplitude.Types.PluginType.ENRICHMENT;
  let currentId = 100;
  let amplitudeConfig;

  /**
   * setup() is called on plugin installation
   * example: amplitude.add(new AddEventIdPlugin());
   */
  const setup = function (config) {
    amplitudeConfig = config;
  }

  /**
   * execute() is called on each event instrumented
   * example: client.track('New Event');
   */
  const execute = function (event: Event) {
    event.event_id = currentId++;
    return event;
  }

  return {
    name,
    type,
    setup,
    execute,
  }
}

amplitude.init(API_KEY);
amplitude.add(addEventIdPlugin());
```

##### Web attribution enrichment plugin

You need to download `plugin-web-attribution-browser` package and add the `webAttributionPlugin` before call init method. 

=== "npm"

    ```bash
    npm install @amplitude/plugin-web-attribution-browser
    ```

=== "yarn"

    ```bash
    yarn add @amplitude/plugin-web-attribution-browser
    ```

Add plugin to Amplitude instance.

```ts
amplitude.add(webAttributionPlugin());
amplitude.init(API_KEY);
```

See the [configuration options](../marketing-analytics-browser/#configuration).
Learn more about what the [Web Attribution Plugin](../marketing-analytics-browser/#web-attribution) supports.

###### Differences from base SDK

Enabling the Attribution plugin overwrites the default attribution tracking behavior of the SDK.

The SDK’s built in attribution tracking only tracks attribution at the start of sessions. This mean if a user re-enters the site through a new campaign channel (such as direct or an ad) in the middle of a session, this new channel isn't recorded.

If the `trackNewCampaigns` option is set to `true`, the campaigns are tracked, and the user’s session is reset when a new campaign is detected.

The Attribution plugin tracks all campaigns, regardless of whether the user is at the start of a session.

Set the `resetSessionOnNewCampaign` option to `true` to cause the user’s session to be reset when a new campaign is detected. The session isn't reset in the case where the referrer is just a different subdomain of your site.

##### Page view enrichment plugin

You need to download `plugin-page-view-tracking-browser` and add the `pageViewTrackingPlugin` before calling the init method.

=== "npm"

    ```bash
    npm install @amplitude/plugin-page-view-tracking-browser
    ```
=== "yarn"

    ```bash
    yarn add @amplitude/plugin-page-view-tracking-browser
    ```

Add plugin to Amplitude instance.

```ts
amplitude.add(pageViewTrackingPlugin());
amplitude.init(API_KEY);
```

See the [configuration options](../marketing-analytics-browser/#configuration).
Learn more about what the [Page View Plugin](../marketing-analytics-browser/#page-view) supports.

###### Differences from base SDK

The base SDK sends Page View events when a user’s campaign is tracked if the `attribution.trackPageViews` option is set to `true`.

The page view plugin sends a Page View event on each page a user visits by default. It also offers options to customize this behavior.

## Advanced topics

### Cross domain tracking

You can track anonymous behavior across two different domains. Amplitude identifies anonymous users by their device IDs which must be passed between the domains. For example:

* Site 1: `www.example.com`
* Site 2: `www.example.org`

Users who start on Site 1 and then navigate to Site 2 must have the device ID generated from Site 1 passed as a parameter to Site 2. Site 2 then needs to initialize the SDK with the device ID.
 The SDK can parse the URL parameter automatically if `deviceId` is in the URL query parameters.

1. From Site 1, grab the device ID from `getDeviceId()`.
2. Pass the device ID to Site 2 via a URL parameter when the user navigates. (for example: `www.example.com?deviceId=device_id_from_site_1`)
3. Initialize the Amplitude SDK on Site 2 with `init('API_KEY', null)`.

If the `deviceId` isn't provided with the `init` like `init('API_KEY', null, { deviceId: 'custom-device-id' })`, then it automatically fallbacks to use URL parameter.

### Custom HTTP client

You can provide an implementation of `Transport` interface to the `transportProvider` configuration option for customization purpose, for example, sending requests to your proxy server with customized HTTP request headers.

```ts
class MyTransport {
  send(serverUrl, payload) {
    // check example: https://github.com/amplitude/Amplitude-TypeScript/blob/main/packages/analytics-client-common/src/transports/fetch.ts
  }
}

amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  transportProvider: new MyTransport(),
});
```

### Content Security Policy (CSP)

If your web app configures the strict Content Security Policy (CSP) for security concerns, adjust the policy to whitelist the Amplitude domains:

* When using ["Script Loader"](../sdk-quickstart/#install-the-dependency), add `https://*.amplitude.com` to `script-src`.
* Add `https://*.amplitude.com` to `connect-src`.

--8<-- "includes/abbreviations.md"

### Cookie management

The Browser SDK uses cookie storage to persist information that multiple subdomains of the same domain may likely want to share. This includes information like user session and marketing campaigns, which are stored in separate cookie entries.

#### Cookie prefix

* **AMP**: The SDK creates user session cookies with `AMP` prefix and the first ten digits of the API key: `AMP_{first_ten_digits_API_KEY}`.
* **AMP_MKTG**: The SDK creates marketing campaign cookies with `AMP_MKTG` and the first ten digits of the API key: `AMP_MKTG_{first_ten_digits_API_KEY}`. 
* **AMP_TEST**: On initialization, the SDK creates a cookie with `AMP_TEST` prefix to check wether the cookie storage is working properly. Then the SDK sets the value as current time, retrieves the cookie by a key and checks if the retrieved value matches the original set time. You **can safely delete** the `AMP_TEST` prefix cookies if, for some reason, they're not successfully deleted.
* **AMP_TDLTEST**: On initialization, the SDK creates a cookie with `AMP_TDLTEST` prefix to find a subdomain that supports cookie storage. For example, when checking for cookie support on `https://analytics.amplitude.com/amplitude/home` the SDK first tries to find a subdomain that matches the root domain (`amplitude.com`) and then falls back to the full domain (`analytics.amplitude.com`). You **can safely delete** the `AMP_TDLTEST` prefix cookies if, for some reason, they're not successfully deleted.

#### Cookie domain

By default, the SDK assigns these cookies to the top level domain which supports cookie storage. Cookies can be shared on multiple subdomains which allows for a seamless user experience across all subdomains.

For example, if a user logs into the website on one subdomain (`data.amplitude.com`) where the SDK is initialized. On initialization, the SDK assigns cookies to `.amplitude.com`. If the user then navigates to another subdomain (`analytics.amplitude.com`), the login information can be seamlessly shared by shared cookies.

#### Cookie data

The SDK creates two types of cookies: user session cookies and marketing campaign cookies.

???config "User session cookies"
    |<div class="big-column">Name</div>| Description|
    |---|----|
    |`optOut`|<span class="required">Required</span>. A flag to opt this device out of Amplitude tracking. If this flag is set, no additional information will be stored for the user|
    |`userId`|Upon user log-in, if you send this value, it is stored in the cookie. Set this to uniquely identify their users (non-anonymous navigation). It is stored encoded using Base64|
    |`deviceId`|A randomly generated string. It will persist unless a user clears their browser cookies and/ or is browsing in private mode. Even if a user consistently uses the same the device and browser, the device ID can still vary|
    |`sessionId`|A randomly generated string for each session|
    |`lastEventTime`|Time of the last event, used to determine when to expire and create a new session Id|
    |`lastEventId`|Id of the last event|

???config "Marketing campaign cookies"
    |<div class="big-column">Name</div>| Description|
    | --- | --- |
    |`utm_campaign`| This identifies a specific campaign used (for example, "summer_sale") |
    |`utm_content` | This identifies what brought the user to the site and is commonly used for A/B testing (for example, "bannerlink", "textlink") |
    |`utm_id`|An optional parameter for tracking unique IDs or transaction IDs associated with the link.|
    |`utm_medium`| This identifies a specific campaign used (for example, "summer_sale") |
    |`utm_source`| This identifies which website sent the traffic (for example, Google, Facebook) |
    |`utm_term`| This identifies paid search terms used (for example, product+analytics) |
    |`referrer`|The last page the user was on (for example, `https://amplitude.com/behavioral-analytics-platform?ref=nav`)|
    |`referring_domain`|The domain that the user was last on (for example, `https://amplitude.com`)|
    |`dclid`|Google campaign manager Click Identifier|
    |`gbraid`|Google Click Identifier for iOS device from Web to App|
    |`gclid`|Google Click Identifier from URL parameters|
    |`fbclid`|Facebook Click Identifier from URL parameters|
    |`ko_click_id`|Kochava Click Identifier from URL parameters|
    |`msclkid`|Microsoft Click Identifier|
    |`ttclid`|TikTok Click Identifier|
    |`twclid`|Twitter Click Identifier from URL parameter|
    |`wbraid`|Google Click Identifier for iOS device from App to Web|
    |`li_fat_id`|LinkedIn member indirect identifier for Members for conversion tracking, retargeting, analytics|
    |`rtd_cid`|Reddit Click Identifier| 

#### Disable cookies

You can opt out using cookies by setting `disableCookies` to `true` so that the SDK will use `LocalStorage` instead. `LocalStorage` is a great alternative, but because access to `LocalStorage` is restricted by subdomain, you can't track anonymous users across subdomains of your product (for example: `www.amplitude.com` vs `analytics.amplitude.com`).

--8<-- "includes/sdk-device-id/lifecycle-header.md"

1. Device id in configuration on initialization
2. "deviceId" value from URL param, for example http://example.com/?deviceId=123456789. Refer to [cross domain tracking](./#cross-domain-tracking) for more details
3. Device id in cookie storage. Refer to [cookie management](./#cookie-management) for more details
4. Device iD in cookie storage of JavaScript SDK. Refer to [JavaScript's cookie management](../typescript-browser/#cookie-management) for more details
5. A randomly generated 36-character UUID

--8<-- "includes/sdk-device-id/change-scenarios.md"

- By default the SDK stores device IDs in cookies, so a device ID will change if a user clears cookies, uses another device, or uses privacy mode
- On initialization, a device ID is passed in from URL param `deviceId`
- `unset()` is called

--8<-- "includes/sdk-device-id/set-device-id.md"

```ts
amplitude.setDeviceId(uuid());
```

#### Get device ID

You can retrieve the device ID that Amplitude uses by `getDeviceId()`.

```ts
const deviceId = amplitude.getDeviceId();
```