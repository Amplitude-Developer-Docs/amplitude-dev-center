---
title: React Native SDK (Beta)
description: The Amplitude React Native SDK Installation & Quick Start guide.
icon: material/react
---

![npm version](https://badge.fury.io/js/@amplitude%2Fanalytics-react-native.svg)

!!!beta "Beta SDK Resources"
    [:material-github: Github](https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/analytics-react-native) · [:material-code-tags-check: Releases](https://github.com/amplitude/Amplitude-TypeScript/releases) · [:material-book: API Reference](https://amplitude.github.io/Amplitude-TypeScript/)

--8<-- "includes/no-ampli.md"

The React Native SDK lets you send events to Amplitude. This library is open-source, check it out on [GitHub](https://github.com/amplitude/Amplitude-TypeScript).

## Getting Started

### Installation

To get started with using Amplitude React Native SDK, install the package to your project via NPM. You must also install `@react-native-async-storage/async-storage` for the SDK to work properly.

!!!tip "Web and Expo Support"
    This SDK can be used for react-native apps built for web or built using [Expo](https://expo.dev/) (Expo Go not yet supported).

=== "npm"

    ```bash
    npm install @amplitude/analytics-react-native
    npm install @react-native-async-storage/async-storage
    ```

=== "yarn"

    ```bash
    yarn add @amplitude/analytics-react-native
    yarn add @react-native-async-storage/async-storage
    ```

=== "expo"

    ```bash
    expo install @amplitude/analytics-react-native
    expo install @react-native-async-storage/async-storage
    ```

You'll need to install the native modules to run the SDK on iOS.

```bash
cd ios
pod install
```

## Usage

!!!info "Web vs Mobile"
    The configuration of the SDK is shared across web and mobile platforms, but many of these options simply don't apply when running the SDK on native platforms (e.g. iOS, Android). For example, the when the SDK is run on web, the identity is stored in the browser cookie by default, whereas on native platforms identity is stored in async storage.

### Initializing SDK

Initialization is necessary before any instrumentation is done. The API key for your Amplitude project is required. Optionally, a user ID and config object can be passed in this call. The SDK can be used anywhere after it is initialized anywhere in an application.

```ts
import { init } from '@amplitude/analytics-react-native';

// Option 1, initialize with API_KEY only
init(API_KEY);

// Option 2, initialize including user ID if it's already known
init(API_KEY, 'user@amplitude.com');

// Option 3, initialize including configuration
init(API_KEY, 'user@amplitude.com', {
  disableCookies: true, // Disables the use of browser cookies
});
```

### EU data residency

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
import { track } from '@amplitude/analytics-react-native';

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

Identify is for setting the user properties of a particular user without sending any event. The SDK supports the operations `set`, `setOnce`, `unset`, `add`, `append`, `prepend`, `preInsert`, `postInsert`, and `remove` on individual user properties. The operations are declared via a provided Identify interface. Multiple operations can be chained together in a single Identify object. The Identify object is then passed to the Amplitude client to send to the server.

!!!note 
    If the Identify call is sent after the event, the results of operations will be visible immediately in the dashboard user’s profile area, but it will not appear in chart result until another event is sent after the Identify call. So the identify call only affects events going forward. More details [here](https://amplitude.zendesk.com/hc/en-us/articles/115002380567-User-Properties-Event-Properties#applying-user-properties-to-events).

#### Setting a user property

The Identify object provides controls over setting user properties. An Identify object must first be instantiated, then Identify methods can be called on it, and finally the client will make a call with the Identify object.

```ts
import { identify, Identify } from '@amplitude/analytics-react-native';

const identifyObj = new Identify();
identify(identifyObj);
```

### Identify.set

This method sets the value of a user property. For example, you can set a role property of a user.

```ts
import { Identify, identify } from '@amplitude/analytics-react-native';

const identifyObj = new Identify();
identifyObj.set('location', 'LAX');

identify(identifyObj);
```

#### Identify.setOnce

This method sets the value of a user property only once. Subsequent calls using setOnce() will be ignored. For example, you can set an initial login method for a user and since only the initial value is tracked, setOnce() ignores subsequent calls.

```ts
import { Identify, identify } from '@amplitude/analytics-react-native';

const identifyObj = new Identify();
identifyObj.setOnce('initial-location', 'SFO');

identify(identifyObj);
```

#### Identify.add

This method increments a user property by some numerical value. If the user property does not have a value set yet, it will be initialized to 0 before being incremented. For example, you can track a user's travel count.

```ts
import { Identify, identify } from '@amplitude/analytics-react-native';

const identifyObj = new Identify();
identifyObj.add('travel-count', 1);

identify(identifyObj);
```

#### Arrays in user properties

Arrays can be used as user properties. You can directly set arrays or use prepend, append, preInsert and postInsert to generate an array.

#### Identify.prepend

This method prepends a value or values to a user property array. If the user property does not have a value set yet, it will be initialized to an empty list before the new values are prepended.

```ts
import { Identify, identify } from '@amplitude/analytics-react-native';

const identifyObj = new Identify();
identifyObj.prepend('visited-locations', 'LAX');

identify(identifyObj);
```

#### Identify.append

This method appends a value or values to a user property array. If the user property does not have a value set yet, it will be initialized to an empty list before the new values are prepended.

```ts
import { Identify, identify } from '@amplitude/analytics-react-native';

const identifyObj = new Identify();
identifyObj.append('visited-locations', 'SFO');

identify(identifyObj);
```

#### Identify.preInsert

This method pre-inserts a value or values to a user property, if it does not exist in the user property yet. Pre-insert means inserting the value(s) at the beginning of a given list. If the user property does not have a value set yet, it will be initialized to an empty list before the new values are pre-inserted. If the user property has an existing value, it will be no operation.

```ts
import { Identify, identify } from '@amplitude/analytics-react-native';

const identifyObj = new Identify();
identifyObj.preInsert('unique-locations', 'LAX');

identify(identifyObj);
```

#### Identify.postInsert

This method post-inserts a value or values to a user property, if it does not exist in the user property yet. Post-insert means inserting the value(s) at the end of a given list. If the user property does not have a value set yet, it will be initialized to an empty list before the new values are post-inserted. If the user property has an existing value, it will be no operation.

```ts
import { Identify, identify } from '@amplitude/analytics-react-native';

const identifyObj = new Identify();
identifyObj.postInsert('unique-locations', 'SFO');

identify(identifyObj);
```

#### Identify.remove

This method removes a value or values to a user property, if it exists in the user property. Remove means remove the existing value(s) from the given list. If the item does not exist in the user property, it will be no operation.

```ts
import { Identify, identify } from '@amplitude/analytics-react-native';

const identifyObj = new Identify();
identifyObj.remove('unique-locations', 'JFK')

identify(identifyObj);
```

### User groups

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

--8<-- "includes/groups-intro-paragraph.md"

```ts
import { setGroup } from '@amplitude/analytics-react-native';

// set group with single group name
setGroup('orgId', '15');

// set group with multiple group names
setGroup('sport', ['soccer', 'tennis']);
```

### Group properties

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

Use the Group Identify API to set or update properties of particular groups. These updates only affect events going forward.

The `groupIdentify()` method accepts a group type and group name string parameter, as well as an Identify object that will be applied to the group.

```ts
import { Identify, groupIdentify } from '@amplitude/analytics-react-native';

const groupType = 'plan';
const groupName = 'enterprise';
const event = new Identify()
event.set('key1', 'value1');

groupIdentify(groupType, groupName, identify);
```

### Revenue tracking

The preferred method of tracking revenue for a user is to use `revenue()` in conjunction with the provided Revenue interface. Revenue instances will store each revenue transaction and allow you to define several special revenue properties (such as 'revenueType', 'productIdentifier', etc.) that are used in Amplitude's Event Segmentation and Revenue LTV charts. These Revenue instance objects are then passed into `revenue()` to send as revenue events to Amplitude. This lets automatically display data relevant to revenue in the platform. You can use this to track both in-app and non-in-app purchases.

To track revenue from a user, call revenue each time a user generates revenue. For example, 3 units of a product was purchased at $3.99.

```ts
import { Revenue, revenue } from '@amplitude/analytics-react-native';

const event = new Revenue()
  .setProductId('com.company.productId')
  .setPrice(3.99)
  .setQuantity(3);

revenue(event);
```

#### Revenue interface

|Name | Description |
|-----|-------|
|`product_id` | Optional. String. An identifier for the product. We recommend something like the Google Play Store product ID. Defaults to null. |
|`quantity` | Required. Int. The quantity of products purchased. Note: revenue = quantity * price. Defaults to 1|
|`price` | Required. Double. The price of the products purchased, and this can be negative. Note: revenue = quantity * price. Defaults to null. |
|`revenue_type` | Optional, but required for revenue verification. String. The type of revenue (e.g. tax, refund, income).  Defaults to null.|
|`receipt`| Optional. String. The receipt identifier of the revenue. Defaults to null|
|`receipt_sig`| Optional, but required for revenue verification. String. The receipt signature of the revenue. Defaults to null.|
|`properties`| Optional. JSONObject. An object of event properties to include in the revenue event. Defaults to null.

### Custom user ID

If your app has its own login system that you want to track users with, you can call `setUserId` at any time.

TypeScript

```ts
import { setUserId } from '@amplitude/analytics-react-native';

setUserId('user@amplitude.com');
```

You can also assign the User ID as an argument to the init call.

```ts
import { init } from '@amplitude/analytics-react-native';

init(API_KEY, 'user@amplitude.com');
```

### Custom session ID

You can assign a new Session ID using `setSessionId`. When setting a custom session ID, make sure the value is in milliseconds since epoch (Unix Timestamp).

TypeScript

```ts
import { setSessionId } from '@amplitude/analytics-react-native';

setSessionId(Date.now());
```

### Custom device ID

If your app has its own login system that you want to track users with, you can call `setUserId` at any time.

You can assign a new device ID using `deviceId`. When setting a custom device ID, make sure the value is sufficiently unique. A UUID is recommended.

```ts
import { setDeviceId } from '@amplitude/analytics-react-native';
const { uuid } = require('uuidv4');

setDeviceId(uuid());
```

### Opt users out of tracking

You can turn off logging for a given user by setting `setOptOut` to `true`.

```ts
import { setOptOut } from '@amplitude/analytics-react-native';

setOptOut(true);
```

No events are saved or sent to the server while `setOptOut` is enabled, and the setting persists across page loads. 

Reenable logging by setting `setOptOut` to `false`.

```ts
import { setOptOut } from '@amplitude/analytics-react-native';

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

### Callback

All asynchronous API are optionally awaitable through a Promise interface. This also serves as callback interface.

```ts
import { track } from '@amplitude/analytics-react-native';

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

#### Plugin.setup

This method contains logic for preparing the plugin for use and has config as a parameter. The expected return value is undefined. A typical use for this method, is to copy configuration from config or instantiate plugin dependencies. This method is called when the plugin is registered to the client via `client.add()`.

#### Plugin.execute

This method contains the logic for processing events and has event as parameter. If used as enrichment type plugin, the expected return value is the modified/enriched event; while if used as a destination type plugin, the expected return value is undefined. This method is called for each event, including Identify, GroupIdentify and Revenue events, that is instrumented using the client interface.

#### Plugin examples

##### Enrichment type plugin

Here's an example of a plugin that modifies each event that is instrumented by adding an increment integer to event_id property of an event starting from 100.

```ts
import { ReactNativeConfig, EnrichmentPlugin, Event, PluginType } from '@amplitude/analytics-types';

export class AddEventIdPlugin implements EnrichmentPlugin {
  name = 'add-event-id';
  type = PluginType.ENRICHMENT as const;
  currentId = 100;
  
  /**
   * setup() is called on plugin installation
   * example: client.add(new AddEventIdPlugin());
   */
  setup(config: ReactNativeConfig): Promise<undefined> {
     this.config = config;
  }
   
  /**
   * execute() is called on each event instrumented
   * example: client.track('New Event');
   */
  execute(event: Event): Promise<Event> {
    event.event_id = this.currentId++;
    return event;
  }
}
```

--8<-- "includes/abbreviations.md"
