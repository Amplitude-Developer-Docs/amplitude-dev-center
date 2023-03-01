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

Use [this quickstart guide](../sdk-quickstart#browser) to get started with Amplitude Browser SDK.

## Usage

### Initialize the SDK

--8<-- "includes/sdk-httpv2-notice.md"

--8<-- "includes/sdk-ts-browser/init.md"

### Debugging

--8<-- "includes/sdk-ts/client-debugging.md"

### Configuration

--8<-- "includes/sdk-ts-browser/shared-configurations.md"

### EU data residency

You can configure the server zone when initializing the client for sending data to Amplitude's EU servers. The SDK sends data based on the server zone if it's set.

!!!note
    For EU data residency, the project must be set up inside Amplitude EU. You must initialize the SDK with the API key from Amplitude EU.

=== "Classic script"

    ```ts
    amplitude.init(API_KEY, OPTIONAL_USER_ID, {
      serverZone: amplitude.Types.ServerZone.EU,
    });
    ```

=== "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';

    amplitude.init(API_KEY, OPTIONAL_USER_ID, {
      serverZone: amplitude.Types.ServerZone.EU,
    });
    ```

### Tracking an event

--8<-- "includes/sdk-httpv2-notice.md"

Events represent how users interact with your application. For example, "Button Clicked" may be an action you want to note.

=== "Classic script"

    ```ts
    // Track a basic event
    amplitude.track('Button Clicked');

    // Track events with optional properties
    const eventProperties = {
      buttonColor: 'primary',
    };
    amplitude.track('Button Clicked', eventProperties);
    ```

=== "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';

    // Track a basic event
    amplitude.track('Button Clicked');

    // Track events with optional properties
    const eventProperties = {
      buttonColor: 'primary',
    };
    amplitude.track('Button Clicked', eventProperties);
    ```

### Tracking default events

Starting on version 1.9.0, Browser SDK now tracks default events. Browser SDK can be configured to track the following events automatically:

* Page views
* Sessions
* Form interactions
* File downloads

|<div class="big-column">Name</div>|Value|Description|
|-|-|-|
`config.defaultTracking.pageViews` | Optional. `boolean` | Enables default page view tracking. If value is `true`, Amplitude tracks page view events on initialization. Default value is `false`.<br /><br />Event properties tracked includes: page_domain, page_location, page_path, page_title, page_url<br /><br />See [Tracking page views](#tracking-page-views) for more information.|
`config.defaultTracking.sessions` | Optional. `boolean` | Enables session tracking. If value is `true`, Amplitude tracks session start and session end events. Default value is `false`.<br /><br />See [Tracking sessions](#tracking-sessions) for more information.|
`config.defaultTracking.formInteractions` | Optional. `boolean` | Enables form interaction tracking. If value is `true`, Amplitude tracks form start and form submit events. Default value is `false`.<br /><br />Event properties tracked includes: form_id, form_name, form_destination<br /><br />See [Tracking form interactions](#tracking-form-interactions) for more information.|
`config.defaultTracking.fileDownloads` | Optional. `boolean` | Enables file download tracking. If value is `true`, Amplitude tracks file download events. Default value is `false`.<br /><br />Event properties tracked includes: file_extension, file_name, link_id, link_text, link_url<br /><br />See [Tracking file downloads](#tracking-file-downloads) for more information.|

You can enable Amplitude to start tracking all events mentioned above, use the code sample below. Otherwise, you can omit the configuration to keep them disabled.

=== "Classic script"

    ```ts
    amplitude.init(API_KEY, OPTIONAL_USER_ID, {
      defaultEvents: {
        pageViews: true,
        sessions: true,
        formInteractions: true,
        fileDownloads: true,
      },
    });
    ```

=== "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';

    amplitude.init(API_KEY, OPTIONAL_USER_ID, {
      defaultEvents: {
        pageViews: true,
        sessions: true,
        formInteractions: true,
        fileDownloads: true,
      },
    });
    ```

Alternatively, you can enable Amplitude to track all events mentioned above by setting `config.defaultEvents` to `true`.

!!!note
    Amplitude may add more events in a future version, and this configuration enables tracking for those events as well.

===  "Classic script"

    ```ts
    amplitude.init(API_KEY, OPTIONAL_USER_ID, {
      defaultEvents: true,
    });
    ```

===  "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';

    amplitude.init(API_KEY, OPTIONAL_USER_ID, {
      defaultEvents: true,
    });
    ```


#### Tracking page views

You can enable Amplitude to start tracking page view events by setting `config.defaultEvents.pageViews` to `true`. Refer to the code sample below.

===  "Classic script"

    ```ts
    amplitude.init(API_KEY, OPTIONAL_USER_ID, {
      defaultEvents: {
        pageViews: true,
      },
    });
    ```

===  "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';

    amplitude.init(API_KEY, OPTIONAL_USER_ID, {
      defaultEvents: {
        pageViews: true,
      },
    });
    ```

By setting `config.defaultEvents.pageViews` to `true`, you enable Amplitude to use default page view tracking behavior. The default behavior sends a page view event on initialization. The event type for this event is "[Amplitude] Page View".

##### Advanced configuration for tracking page views

You can also use advanced configuration for better control of when page views event are sent.


|<div class="big-column">Name</div>|Value|Description|
|-|-|-|
`defaultTracking.pageViews.trackOn` | Optional. `"attribution"` or `() => boolean` | Provides advanced control on when page view events are tracked.<br /><br />You can omit or set the value to `undefined`,  and configure page view events to be tracked on initialization.<br /><br />You can set the value to `"attribution"` and configure page view events to be tracked only when web attribution are tracked.<br /><br />You can set the value to a function that returns a boolean (`true` or `false`) and configure page view events to be tracked based on your criteria.|
`defaultTracking.pageViews.trackHistoryChanges` | Optional. `"pathOnly"` or `"all"` | Track the page view only on the path changes, track all URL changes by defaultProvides advanced control for single page application on when page views are tracked.<br /><br />You can omit or set the value to `"all"`,  and configure page view events to be tracked on any navigation change to the URL within your single page application. For example: navigating from `https://amplitude.com/#company` to `https://amplitude.com/#blog`.<br /><br />You can omit or set the value to "pathOnly",  and configure page view events to be tracked on navigation change to the URL path only within your single page application. For example: navigating from `https://amplitude.com/company` to `https://amplitude.com/blog`.|

For example, you can configure Amplitude to track page views only when the URL path contains a certain substring, let’s say “home”. Refer to the code sample for how to achieve this.

===  "Classic script"

    ```ts
    amplitude.init(API_KEY, OPTIONAL_USER_ID, {
      defaultEvents: {
        pageViews: {
          trackOn: () => {
            return window.location.pathname.includes('home');
          },
        },
      },
    });
    ```

===  "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';

    amplitude.init(API_KEY, OPTIONAL_USER_ID, {
      defaultEvents: {
        pageViews: {
          trackOn: () => {
            return window.location.pathname.includes('home');
          },
        },
      },
    });
    ```

#### Tracking sessions

You can enable Amplitude to start tracking session events by setting `config.defaultEvents.sessions` to `true`. Refer to the code sample below.

===  "Classic script"

    ```ts
    amplitude.init(API_KEY, OPTIONAL_USER_ID, {
      defaultEvents: {
        sessions: true,
      },
    });
    ```

===  "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';

    amplitude.init(API_KEY, OPTIONAL_USER_ID, {
      defaultEvents: {
        sessions: true,
      },
    });
    ```

By setting `config.defaultEvents.sessions` to `true`, you enable Amplitude to track session start and session end events. A session is the period of time a user has your website open. See [How Amplitude defines sessions](https://help.amplitude.com/hc/en-us/articles/115002323627-Track-sessions-in-Amplitude#how-amplitude-defines-sessions) for more information. When a new session starts, Amplitude tracks a session start event is and is the first event of the session. The event type for session start is "[Amplitude] Start Session". When an existing session ends, a session start end is tracked and is the last event of the session. The event type for session end is "[Amplitude] End Session".

#### Tracking form interactions

You can enable Amplitude to start tracking form interaction events by setting config.defaultEvents.formInteractions to true. Refer to the code sample below.

===  "Classic script"

    ```ts
    amplitude.init(API_KEY, OPTIONAL_USER_ID, {
      defaultEvents: {
        formInteractions: true,
      },
    });
    ```

===  "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';

    amplitude.init(API_KEY, OPTIONAL_USER_ID, {
      defaultEvents: {
        formInteractions: true,
      },
    });
    ```

By setting `config.defaultEvents.formInteractions` to `true`, you enable Amplitude to track form start and form submit events. A form start event is tracked when the user initially interacts with the form. An initial interaction can be the first change to an text input, or radio button, or dropdown. The event type for session start is "[Amplitude] Form Start". A form submit event is tracked when the user submits the form. The event type for session start is "[Amplitude] Form Submit". If a form is submitted with no initial change to any form fields, both [Amplitude] Form Start and [Amplitude] Form Submit are tracked.

Amplitude can track forms that are constructed with `<form>` tags and `<input>` tags nested. For example:

```html
<form id="subscriber-form" name="subscriber-form" action="/subscribe">
  <input type="text" />
  <input type="submit" />
</form>
```

#### Tracking file downloads

You can enable Amplitude to start tracking file download events by setting `config.defaultEvents.fileDownloads` to `true`. Refer to the code sample below.

===  "Classic script"

    ```ts
    amplitude.init(API_KEY, OPTIONAL_USER_ID, {
      defaultEvents: {
        fileDownloads: true,
      },
    });
    ```

===  "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';

    amplitude.init(API_KEY, OPTIONAL_USER_ID, {
      defaultEvents: {
        fileDownloads: true,
      },
    });
    ```

By setting `config.defaultEvents.fileDownloads` to `true`, you enable Amplitude to track file download events. A file download event is tracked when an anchor or `<a>` tag linked to a file is clicked. The event type for file download is "[Amplitude] File Download". Amplitude determines that the anchor or `<a>` tag linked to a file if the file extension matches the following regex:

`pdf|xlsx?|docx?|txt|rtf|csv|exe|key|pp(s|t|tx)|7z|pkg|rar|gz|zip|avi|mov|mp4|mpe?g|wmv|midi?|mp3|wav|wma`

### User properties

User properties are details like device details, user preferences, or language to help you understand your users at the time they performed an action in your app.

Identify is for setting the user properties of a particular user without sending any event. The SDK supports the operations `set`, `setOnce`, `unset`, `add`, `append`, `prepend`, `preInsert`, `postInsert`, and `remove` on individual user properties. Declare the operations via a provided Identify interface. You can chain together multiple operations in a single Identify object. The Identify object is then passed to the Amplitude client to send to the server.

!!!note
    If the Identify call is sent after the event, the results of operations are visible immediately in the dashboard user’s profile area. However, they don't appear in chart results until another event is sent after the Identify call. The identify call only affects events going forward. More details [here](https://amplitude.zendesk.com/hc/en-us/articles/115002380567-User-Properties-Event-Properties#applying-user-properties-to-events).

#### Set a user property

The Identify object provides controls over setting user properties. It works like this: first, instantiate an Identify object, then call Identify methods on it, and finally, the client can make a call with the Identify object.

===  "Classic script"

    ```ts
    const identifyEvent = new amplitude.Identify();
    amplitude.identify(identifyEvent);
    ```

===  "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';

    const identifyEvent = new amplitude.Identify();
    amplitude.identify(identifyEvent);
    ```

#### Identify.set

This method sets the value of a user property. For example, you can set a role property of a user.

===  "Classic script"

    ```ts
    const identifyEvent = new amplitude.Identify();
    identifyEvent.set('location', 'LAX');

    amplitude.identify(identifyEvent);
    ```

===  "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';

    const identifyEvent = new amplitude.Identify();
    identifyEvent.set('location', 'LAX');

    amplitude.identify(identifyEvent);
    ```

#### Identify.setOnce

This method sets the value of a user property only one time. Subsequent calls using `setOnce()` are ignored. For example, you can set an initial login method for a user and because only the initial value is tracked, `setOnce()` ignores later calls.

===  "Classic script"

    ```ts
    const identifyEvent = new amplitude.Identify();
    identifyEvent.setOnce('initial-location', 'SFO');

    identify(identifyEvent);
    ```

===  "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';

    const identifyEvent = new amplitude.Identify();
    identifyEvent.setOnce('initial-location', 'SFO');

    amplitude.identify(identifyEvent);
    ```

#### Identify.add

This method increments a user property by some numerical value. If the user property doesn't have a value set yet, it's initialized to 0 before it's incremented. For example, you can track a user's travel count.

===  "Classic script"

    ```ts
    const identifyEvent = new amplitude.Identify();
    identifyEvent.add('travel-count', 1);

    amplitude.identify(identifyEvent);
    ```

===  "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';

    const identifyEvent = new amplitude.Identify();
    identifyEvent.add('travel-count', 1);

    amplitude.identify(identifyEvent);
    ```

#### Arrays in user properties

You can use arrays as user properties. Directly set arrays or use `prepend`, `append`, `preInsert` and `postInsert` to generate an array.

#### Identify.prepend

This method prepends a value or values to a user property array. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are prepended.

===  "Classic script"

    ```ts
    const identifyEvent = new Identify();
    identifyEvent.prepend('visited-locations', 'LAX');

    identify(identifyEvent);
    ```

===  "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';

    const identifyEvent = new amplitude.Identify();
    identifyEvent.prepend('visited-locations', 'LAX');

    amplitude.identify(identifyEvent);
    ```

#### Identify.append

This method appends a value or values to a user property array. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are prepended.

===  "Classic script"

    ```ts
    const identifyEvent = new amplitude.Identify();
    identifyEvent.append('visited-locations', 'SFO');

    amplitude.identify(identifyEvent);
    ```

===  "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';

    const identifyEvent = new amplitude.Identify();
    identifyEvent.append('visited-locations', 'SFO');

    amplitude.identify(identifyEvent);
    ```

#### Identify.preInsert

This method pre-inserts a value or values to a user property, if it doesn't exist in the user property yet. Pre-insert means inserting the values at the beginning of a given list. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are pre-inserted. If the user property has an existing value, this method is a no-op.

===  "Classic script"

    ```ts
    const identifyEvent = new amplitude.Identify();
    identifyEvent.preInsert('unique-locations', 'LAX');

    identify(identifyEvent);
    ```

===  "Module script"

    ```ts
    const identifyEvent = new amplitude.Identify();
    identifyEvent.preInsert('unique-locations', 'LAX');

    amplitude.identify(identifyEvent);
    ```

#### Identify.postInsert

This method post-inserts a value or values to a user property, if it doesn't exist in the user property yet. Post-insert means inserting the values at the end of a given list. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are post-inserted. If the user property has an existing value, this method is a no-op..

===  "Classic script"

    ```ts
    const identifyEvent = new amplitude.Identify();
    identifyEvent.postInsert('unique-locations', 'SFO');

    amplitude.identify(identifyEvent);
    ```

===  "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';

    const identifyEvent = new amplitude.Identify();
    identifyEvent.postInsert('unique-locations', 'SFO');

    amplitude.identify(identifyEvent);
    ```

#### Identify.remove

This method removes a value or values to a user property, if it exists in the user property. Remove means remove the existing values from the given list. If the user property has an existing value, this method is a no-op.

===  "Classic script"

    ```ts
    const identifyEvent = new amplitude.Identify();
    identifyEvent.remove('unique-locations', 'JFK')

    amplitude.identify(identifyEvent);
    ```

===  "Module script"

    ```ts
    import * as Amplitude from '@amplitude/analytics-browser';

    const identifyEvent = new amplitude.Identify();
    identifyEvent.remove('unique-locations', 'JFK')

    amplitude.identify(identifyEvent);
    ```

### User groups

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

--8<-- "includes/groups-intro-paragraph.md"

===  "Classic script"

    ```ts
    // set group with single group name
    amplitude.setGroup('orgId', '15');

    // set group with multiple group names
    amplitude.setGroup('sport', ['soccer', 'tennis']);
    ```

===  "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';

    // set group with single group name
    amplitude.setGroup('orgId', '15');

    // set group with multiple group names
    amplitude.setGroup('sport', ['soccer', 'tennis']);
    ```

### Group properties

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

Use the Group Identify API to set or update properties of particular groups. These updates only affect events going forward.

The `groupIdentify()` method accepts a group type and group name string parameter, as well as an Identify object that's applied to the group.

===  "Classic script"

    ```ts
    const groupType = 'plan';
    const groupName = 'enterprise';
    const groupIdentifyEvent = new amplitude.Identify()
    groupIdentifyEvent.set('key1', 'value1');

    amplitude.groupIdentify(groupType, groupName, groupIdentifyEvent);
    ```

===  "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';

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

===  "Classic script"

    ```ts
    const event = new amplitude.Revenue()
      .setProductId('com.company.productId')
      .setPrice(3.99)
      .setQuantity(3);

    amplitude.revenue(event);
    ```

===  "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';

    const event = new amplitude.Revenue()
      .setProductId('com.company.productId')
      .setPrice(3.99)
      .setQuantity(3);

    amplitude.revenue(event);
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

===  "Classic script"

    ```ts
    amplitude.flush();
    ```

===  "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';

    amplitude.flush();
    ```

By default, `flush` is called automatically in an interval, if you want to flush the events all together, you can control the async flow with the optional Promise interface, example:

===  "Classic script"

    ```ts
    amplitude.init(API_KEY).promise.then(function() {
      amplitude.track('Button Clicked');
      amplitude.flush();
    });
    ```

===  "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';

    await amplitude.init(API_KEY).promise;
    amplitude.track('Button Clicked');
    await amplitude.flush().promise;
    ```

### Custom user ID

If your app has its own login system that you want to track users with, you can call `setUserId` at any time.

===  "Classic script"

    ```ts
    amplitude.setUserId('user@amplitude.com');
    ```

===  "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';

    amplitude.setUserId('user@amplitude.com');
    ```

You can also assign the User ID as an argument to the init call.

===  "Classic script"

    ```ts
    amplitude.init(API_KEY, 'user@amplitude.com');
    ```

===  "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';

    amplitude.init(API_KEY, 'user@amplitude.com');
    ```

### Custom session ID

You can assign a new Session ID using `setSessionId`. When setting a custom session ID, make sure the value is in milliseconds since epoch (Unix Timestamp).

===  "Classic script"

    ```ts
    amplitude.setSessionId(Date.now());
    ```

===  "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';

    amplitude.setSessionId(Date.now());
    ```

### Custom device ID

If your app has its own login system that you want to track users with, you can call `setUserId` at any time.

You can assign a new device ID using `deviceId`. When setting a custom device ID, make sure the value is sufficiently unique. Amplitude recommends using a UUID.

===  "Classic script"

    ```ts
    amplitude.setDeviceId(uuid());
    ```

===  "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';
    import { v4 as uuid } from 'uuid';
    
    amplitude.setDeviceId(uuid());
    ```

### Reset when user logs out

`reset` is a shortcut to anonymize users after they log out, by:

- setting `userId` to `undefined`
- setting `deviceId` to a new UUID value

With an undefined `userId` and a completely new `deviceId`, the current user would appear as a brand new user in dashboard.

===  "Classic script"

    ```ts
    amplitude.reset();
    ```

===  "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';

    amplitude.reset();
    ```

### Opt users out of tracking

You can turn off logging for a given user by setting `setOptOut` to `true`.

===  "Classic script"

    ```ts
    amplitude.setOptOut(true);
    ```

===  "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';

    amplitude.setOptOut(true);
    ```

Events aren't saved or sent to the server while `setOptOut` is enabled, and the setting persists across page loads. 

Re-enable logging by setting `setOptOut` to `false`.

===  "Classic script"

    ```ts
    amplitude.setOptOut(false);
    ```

===  "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';

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

===  "Classic script"

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

===  "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';

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

===  "Classic script (Promise)"

    ```ts
    amplitude.track('Button Clicked').promise.then(function(result) {
      result.event; // {...} (The final event object sent to Amplitude)
      result.code; // 200 (The HTTP response status code of the request.
      result.message; // "Event tracked successfully" (The response message)
    });
    ```

===  "Module script (async/await)"

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

===  "Classic script"

    ```ts
    amplitude.add(new Plugin());
    ```

===  "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';

    amplitude.add(new Plugin());
    ```

#### `remove`

The `remove` method removes the given plugin name from the client instance if it exists.

===  "Classic script"

    ```ts
    amplitude.remove(plugin.name);
    ```

===  "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';

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

===  "Classic script"

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

===  "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';
    import { BrowserConfig, DestinationPlugin, Event, PluginType, Result } from '@amplitude/analytics-types';

    const myDestinationPlugin = (serverUrl: string): DestinationPlugin => {
      const name = 'my-destination-plugin';
      const type = PluginType.DESTINATION as const;
      let amplitudeConfig: BrowserConfig | undefined;

      /**
       * setup() is called on plugin installation
       * example: amplitude.add(new MyDestinationPlugin());
       */
      const setup = async (config: BrowserConfig): Promise<undefined> => {
        amplitudeConfig = config;
        return;
      };

      /**
       * execute() is called on each event instrumented
       * example: amplitude.track('New Event');
       */
      const execute = async (event: Event): Promise<Result> => {
        const payload = {
          key: 'secret',
          data: event,
        };
        const response = await fetch(serverUrl, {
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
      };

      return {
        name,
        type,
        setup,
        execute,
      };
    };

    amplitude.init(API_KEY);
    amplitude.add(myDestinationPlugin('https://custom.domain.com'));
    ```

##### Enrichment type plugin

Here's an example of a plugin that modifies each event that's instrumented by adding an increment integer to `event_id` property of an event starting from 100.

===  "Classic script"

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

    amplitude.init('API_KEY');
    amplitude.add(addEventIdPlugin());
    ```

===  "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';
    import { BrowserConfig, EnrichmentPlugin, Event, PluginType } from '@amplitude/analytics-types';

    const addEventIdPlugin = (): EnrichmentPlugin => {
      const name = 'add-event-id';
      const type = PluginType.ENRICHMENT as const;
      let currentId = 100;
      let amplitudeConfig: BrowserConfig | undefined;

      /**
       * setup() is called on plugin installation
       * example: amplitude.add(new AddEventIdPlugin());
       */
      const setup = async (config: BrowserConfig): Promise<void> => {
        amplitudeConfig = config;
      }

      /**
       * execute() is called on each event instrumented
       * example: client.track('New Event');
       */
      const execute = async (event: Event): Promise<Event> => {
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

    amplitude.init('API_KEY');
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

Add plugin to Ampltude instance.

=== "Classic script"

    ```ts
    amplitude.add(webAttributionPlugin());
    amplitude.init(API_KEY);
    ```

=== "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';
    import { webAttributionPlugin } from '@amplitude/plugin-web-attribution-browser';

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

Add plugin to Ampltude instance.

=== "Classic script"

    ```ts
    amplitude.add(pageViewTrackingPlugin());
    amplitude.init(API_KEY);
    ```

=== "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';
    import { pageViewTrackingPlugin } from '@amplitude/plugin-page-view-tracking-browser';

    amplitude.add(pageViewTrackingPlugin(client));
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

- Site 1: `www.example.com`
- Site 2: `www.example.org`

Users who start on Site 1 and then navigate to Site 2 must have the device ID generated from Site 1 passed as a parameter to Site 2. Site 2 then needs to initialize the SDK with the device ID.
 The SDK can parse the URL parameter automatically if `deviceId` is in the URL query parameters.

1. From Site 1, grab the device ID from `getDeviceId()`.
2. Pass the device ID to Site 2 via a URL parameter when the user navigates. (for example: `www.example.com?deviceId=device_id_from_site_1`)
3. Initialize the Amplitude SDK on Site 2 with `init('API_KEY', null)`.

If the `deviceId` isn't provided with the `init` like `init('API_KEY', null, { deviceId: 'custom-device-id' })`, then it automatically fallbacks to use URL parameter.

### Custom HTTP client

You can provide an implementation of `Transport` interface to the `transportProvider` configuration option for customization purpose, for example, sending requests to your proxy server with customized HTTP request headers.

=== "Classic script"

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

=== "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';
    import { Transport } from '@amplitude/analytics-types';

    class MyTransport implements Transport {
      async send(serverUrl: string, payload: Payload): Promise<Response | null> {
        // check example: https://github.com/amplitude/Amplitude-TypeScript/blob/main/packages/analytics-client-common/src/transports/fetch.ts
      }
    }

    amplitude.init(API_KEY, OPTIONAL_USER_ID, {
      transportProvider: new MyTransport(),
    });
    ```

### Content Security Policy (CSP)

If your web app configures the strict Content Security Policy (CSP) for security concerns, adjust the policy to whitelist the Amplitude domains:

- When using ["Script Loader"](../sdk-quickstart/#install-the-dependency), add `https://*.amplitude.com` to `script-src`.
- Add `https://*.amplitude.com` to `connect-src`.

--8<-- "includes/abbreviations.md"
