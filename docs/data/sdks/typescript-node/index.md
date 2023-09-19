---
title: Node.js SDK
description: The Amplitude Typescript SDK Installation & Quick Start guide.
icon: simple/nodedotjs
search:
  boost: 2
---

![npm version](https://img.shields.io/npm/v/@amplitude/analytics-node)

The Node.js SDK lets you send events to Amplitude. This library is open-source, check it out on [GitHub](https://github.com/amplitude/Amplitude-TypeScript/tree/v1.x/packages/analytics-node).

!!!info "Node SDK Resources"
    [:material-github: GitHub](https://github.com/amplitude/Amplitude-TypeScript/tree/v1.x/packages/analytics-node) · [:material-code-tags-check: Releases](https://github.com/amplitude/Amplitude-TypeScript/releases?q=analytics-node&expanded=true) · [:material-book: API Reference](https://amplitude.github.io/Amplitude-TypeScript/)

--8<-- "includes/ampli-vs-amplitude.md"
    Click here for more documentation on [Ampli for Node](../typescript-node/ampli.md).

--8<-- "includes/sdk-migration/admonition-link-to-migration-docs.md"
    [Node.JS SDK Migration Guide](/data/sdks/typescript-node/migration/).

--8<-- "includes/size/browser.md"
    For example you can search `@amplitude/analytics-node@0.6.0`.

## Getting started

Use [this quickstart guide](../sdk-quickstart#node) to get started with Amplitude Node SDK.

## Usage

### Initialize the SDK

Initialization is necessary before any instrumentation is done. The API key for your Amplitude project is required. The SDK can be used anywhere after it's initialized anywhere in an application.

```ts
import { init } from '@amplitude/analytics-node';

// Option 1, initialize with API_KEY only
init(API_KEY);

// Option 2, initialize including configuration
init(API_KEY, {
  flushIntervalMillis: 30 * 1000, // Sets request interval to 30s
});
```

### Configuration

???config "Configuration Options"
    | <div class="big-column">Name</div>  | Description | Default Value |
    | --- | --- | --- |
    |`instanceName`| `string`. The instance name. | `$default_instance` |
    |`flushIntervalMillis`| `number`. Sets the interval of uploading events to Amplitude in milliseconds. | 10,000 (10 seconds) |
    |`flushQueueSize`| `number`. Sets the maximum number of events that are batched in a single upload attempt. | 300 events |
    |`flushMaxRetries`| `number`. Sets the maximum number of reties for failed upload attempts. This is only applicable to retryable errors. | 12 times.|
    |`logLevel` | `LogLevel.None` or `LogLevel.Error` or `LogLevel.Warn` or `LogLevel.Verbose` or `LogLevel.Debug`. Sets the log level. | `LogLevel.Warn` |
    |`loggerProvider `| `Logger`. Sets a custom `loggerProvider` class from the Logger to emit log messages to desired destination. | `Amplitude Logger` |
    |`minIdLength`|  `number`. Sets the minimum length for the value of `user_id` and `device_id` properties. | `5` |
    |`optOut` | `boolean`. Sets permission to track events. Setting a value of `true` prevents Amplitude from tracking and uploading events. | `false` |
    |`serverUrl`| `string`. Sets the URL where events are upload to. | `https://api2.amplitude.com/2/httpapi` | 
    |`serverZone`| `EU` or  `US`. Sets the Amplitude server zone. Set this to `EU` for Amplitude projects created in `EU` data center. | `US` |
    |`storageProvider`| `Storage<Event[]>`. Sets a custom implementation of `Storage<Event[]>` to persist unsent events. | `MemoryStorage` |
    |`transportProvider`| `Transport`. Sets a custom implementation of `Transport` to use different request API. | `HTTPTransport` |
    |`useBatch`| `boolean`. Sets whether to upload events to Batch API instead of the default HTTP V2 API or not. | `false` |

--8<-- "includes/sdk-ts/shared-batch-configuration.md"

```ts
import * as amplitude from '@amplitude/analytics-node';

amplitude.init(API_KEY, {
  // Events queued in memory will flush when number of events exceed upload threshold
  // Default value is 30
  flushQueueSize: 50, 
  // Events queue will flush every certain milliseconds based on setting
  // Default value is 10000 milliseconds
  flushIntervalMillis: 20000,
});
```

--8<-- "includes/sdk-quickstart/quickstart-eu-data-residency.md"

```ts
import * as amplitude from '@amplitude/analytics-node';

amplitude.init(API_KEY, {
  serverZone: amplitude.Types.ServerZone.EU,
});
```

#### Debugging

--8<-- "includes/sdk-ts/server-debugging.md"

### Tracking an event

--8<-- "includes/sdk-httpv2-notice.md"

Events represent how users interact with your application. For example, "Button Clicked" may be an action you want to note.

```ts
import { track } from '@amplitude/analytics-node';

// Track a basic event
track('Button Clicked', undefined, {
  user_id: 'user@amplitude.com',
});

// Track events with optional properties
const eventProperties = {
  buttonColor: 'primary',
};
track('Button Clicked', eventProperties, {
  user_id: 'user@amplitude.com',
});
```

### Tracking events to multiple projects

--8<-- "includes/sdk-tracking-events-to-multiple-projects.md"

```ts
import * as amplitude from '@amplitude/analytics-node';

const defaultInstance = amplitude.createInstance();
defaultInstance.init(API_KEY_DEFAULT);

const envInstance = amplitude.createInstance();
envInstance.init(API_KEY_ENV, {
  instanceName: 'env',
});
```

### User properties

User properties help you understand your users at the time they performed some action within your app such as their device details, their preferences, or language.

Identify is for setting the user properties of a particular user without sending any event. The SDK supports the operations `set`, `setOnce`, `unset`, `add`, `append`, `prepend`, `preInsert`, `postInsert`, and `remove` on individual user properties. The operations are declared via a provided Identify interface. Chain together multiple operations together in a single Identify object. The Identify object is then passed to the Amplitude client to send to the server.

!!!note 
    If the Identify call is sent after the event, the results of operations are visible immediately in the dashboard user’s profile area, but it don't appear in chart result until another event is sent after the Identify call. The identify call only affects events going forward. More details [here](https://amplitude.zendesk.com/hc/en-us/articles/115002380567-User-Properties-Event-Properties#applying-user-properties-to-events).

#### Set a user property

The Identify object provides controls over setting user properties. An Identify object must first be instantiated, then Identify methods can be called on it, and finally the client makes a call with the Identify object.

```ts
import { identify, Identify } from '@amplitude/analytics-node';

const identifyObj = new Identify();
identify(identifyObj, {
  user_id: 'user@amplitude.com',
});
```

### Identify.set

This method sets the value of a user property. For example, you can set a role property of a user.

```ts
import { Identify, identify } from '@amplitude/analytics-node';

const identifyObj = new Identify();
identifyObj.set('location', 'LAX');

identify(identifyObj, {
  user_id: 'user@amplitude.com',
});
```

#### Identify.setOnce

This method sets the value of a user property only once. Subsequent calls using `setOnce()` are ignored. For example, you can set an initial login method for a user and since only the initial value is tracked, setOnce() ignores subsequent calls.

```ts
import { Identify, identify } from '@amplitude/analytics-node';

const identifyObj = new Identify();
identifyObj.setOnce('initial-location', 'SFO');

identify(identifyObj, {
  user_id: 'user@amplitude.com',
});
```

#### Identify.add

This method increments a user property by some numerical value. If the user property doesn't have a value set yet, it's initialized to 0 before being incremented. For example, you can track a user's travel count.

```ts
import { Identify, identify } from '@amplitude/analytics-node';

const identifyObj = new Identify();
identifyObj.add('travel-count', 1);

identify(identifyObj, {
  user_id: 'user@amplitude.com',
});
```

#### Arrays in user properties

Arrays can be used as user properties. You can directly set arrays or use `prepend`, `append`, `preInsert` and `postInsert` to generate an array.

#### Identify.prepend

This method prepends a value or values to a user property array. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are prepended.

```ts
import { Identify, identify } from '@amplitude/analytics-node';

const identifyObj = new Identify();
identifyObj.prepend('visited-locations', 'LAX');

identify(identifyObj, {
  user_id: 'user@amplitude.com',
});
```

#### Identify.append

This method appends a value or values to a user property array. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are prepended.

```ts
import { Identify, identify } from '@amplitude/analytics-node';

const identifyObj = new Identify();
identifyObj.append('visited-locations', 'SFO');

identify(identifyObj, {
  user_id: 'user@amplitude.com',
});
```

#### Identify.preInsert

This method pre-inserts a value or values to a user property if it doesn't exist in the user property yet. Pre-insert means inserting the value at the beginning of a given list. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are pre-inserted. If the user property has an existing value, it's a no operation.

```ts
import { Identify, identify } from '@amplitude/analytics-node';

const identifyObj = new Identify();
identifyObj.preInsert('unique-locations', 'LAX');

identify(identifyObj, {
  user_id: 'user@amplitude.com',
});
```

#### Identify.postInsert

This method post-inserts a value or values to a user property if it doesn't exist in the user property yet. Post-insert means inserting the value at the end of a given list. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are post-inserted. If the user property has an existing value, it's a no operation.

```ts
import { Identify, identify } from '@amplitude/analytics-node';

const identifyObj = new Identify();
identifyObj.postInsert('unique-locations', 'SFO');

identify(identifyObj, {
  user_id: 'user@amplitude.com',
});
```

#### Identify.remove

This method removes a value or values to a user property if it exists in the user property. Remove means remove the existing value from the given list. If the item doesn't exist in the user property, it's a no operation.

```ts
import { Identify, identify } from '@amplitude/analytics-node';

const identifyObj = new Identify();
identifyObj.remove('unique-locations', 'JFK')

identify(identifyObj, {
  user_id: 'user@amplitude.com',
});
```

### User groups

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

--8<-- "includes/groups-intro-paragraph.md"

!!! example
    If Joe is in 'orgId' '15', then the `groupName` would be '15'.

    ```ts
    import { setGroup } from '@amplitude/analytics-node';

    // set group with a single group name
    setGroup('orgId', '15', {
      user_id: 'user@amplitude.com',
    });
    ```

    If Joe is in 'sport' 'tennis' and 'soccer', then the `groupName` would be '["tennis", "soccer"]'.

    ```ts
    import { setGroup } from '@amplitude/analytics-node';

    // set group with multiple group names
    setGroup('sport', ['soccer', 'tennis'], {
      user_id: 'user@amplitude.com',
    });
    ```

--8<-- "includes/event-level-groups-intro.md"

```ts
import { track } from '@amplitude/analytics-node';

track({
  event_type: 'event type',
  event_properties: { eventPropertyKey: 'event property value' },
  groups: { 'orgId': '15' }
}, undefined, {
  user_id: 'user@amplitude.com',
});
```

### Group properties

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

Use the Group Identify API to set or update the properties of particular groups. These updates only affect events going forward.

The `groupIdentify()` method accepts a group type and group name string parameter, as well as an Identify object that's applied to the group.

```ts
import { Identify, groupIdentify } from '@amplitude/analytics-node';

const groupType = 'plan';
const groupName = 'enterprise';
const event = new Identify()
event.set('key1', 'value1');

groupIdentify(groupType, groupName, identify, {
  user_id: 'user@amplitude.com',
});
```

### Revenue tracking

The preferred method of tracking revenue for a user is to use `revenue()` in conjunction with the provided Revenue interface. Revenue instances store each revenue transaction and allow you to define several special revenue properties (such as "revenueType", "productIdentifier", etc.) that are used in Amplitude's Event Segmentation and Revenue LTV charts. These Revenue instance objects are then passed into `revenue()` to send as revenue events to Amplitude. This lets automatically display data relevant to revenue in the platform. You can use this to track both in-app and non-in-app purchases.

To track revenue from a user, call revenue each time a user generates revenue. For example, a customer purchased 3 units of a product at $3.99.

```ts
import { Revenue, revenue } from '@amplitude/analytics-node';

const event = new Revenue()
  .setProductId('com.company.productId')
  .setPrice(3.99)
  .setQuantity(3);

revenue(event, {
  user_id: 'user@amplitude.com',
});
```

#### Revenue interface

|Name | Description |
|-----|-------|
|`product_id` | Optional. String. An identifier for the product. Amplitude recommends something like the Google Play Store product ID. Defaults to null. |
|`quantity` | Required. Int. The quantity of products purchased. Note: revenue = quantity * price. Defaults to 1|
|`price` | Required. Double. The price of the products purchased, and this can be negative. Note: revenue = quantity * price. Defaults to null. |
|`revenue_type` | Optional, but required for revenue verification. String. The revenue type (for example, tax, refund, income).  Defaults to null.|
|`receipt`| Optional. String. The receipt identifier of the revenue. Defaults to null|
|`receipt_sig`| Optional, but required for revenue verification. String. The receipt signature of the revenue. Defaults to null.|
|`properties`| Optional. JSONObject. An object of event properties to include in the revenue event. Defaults to null.

### Flush the event buffer

The `flush` method triggers the client to send buffered events.

```typescript
import { flush } from '@amplitude/analytics-node';

flush();
```

By default, `flush` is called automatically in an interval, if you want to flush the events altogether, you can control the async flow with the optional Promise interface, for example:

```typescript
await init(AMPLITUDE_API_KEY).promise;
track('Button Clicked', undefined, {
  user_id: 'user@amplitude.com',
});
await flush().promise;
```

### Opt users out of tracking

You can turn off logging for a given user by setting `setOptOut` to `true`.

```ts
import { setOptOut } from '@amplitude/analytics-node';

setOptOut(true);
```

No events are saved or sent to the server while `setOptOut` is enabled, and the setting persists across page loads. 

Re-enable logging by setting `setOptOut` to `false`.

```ts
import { setOptOut } from '@amplitude/analytics-node';

setOptOut(false);
```

### Callback

All asynchronous APIs are optionally awaitable through a Promise interface. This also serves as a callback interface.

```ts
import { track } from '@amplitude/analytics-node';

// Using async/await
const results = await track('Button Clicked', undefined, {
  user_id: 'user@amplitude.com',
}).promise;
result.event; // {...} (The final event object sent to Amplitude)
result.code; // 200 (The HTTP response status code of the request.
result.message; // "Event tracked successfully" (The response message)

// Using promises
track('Button Clicked', undefined, {
  user_id: 'user@amplitude.com',
}).promise.then((result) => {
  result.event; // {...} (The final event object sent to Amplitude)
  result.code; // 200 (The HTTP response status code of the request.
  result.message; // "Event tracked successfully" (The response message)
});
```

### Plugins

Plugins allow you to extend Amplitude SDK's behavior by, for example, modifying event properties (enrichment type) or sending to third-party APIs (destination type). A plugin is an object with methods `setup()` and `execute()`.

#### `add`

The `add` method adds a plugin to Amplitude client instance. Plugins can help processing and sending events.

```typescript
import { add } from '@amplitude/analytics-node';

add(new Plugin());
```

#### `remove`

The `remove` method removes the given plugin name from the client instance if it exists.

```typescript
import { remove } from '@amplitude/analytics-node';

remove(plugin.name);
```

#### Create your custom plugin

#### Plugin.setup

This method contains logic for preparing the plugin for use and has config as a parameter. The expected return value is undefined. A typical use for this method, is to copy configuration from config or instantiate plugin dependencies. This method is called when the plugin is registered to the client via `client.add()`.

#### Plugin.execute

This method contains the logic for processing events and has event as parameter. If used as enrichment type plugin, the expected return value is the modified/enriched event. If used as a destination type plugin, the expected return value is a map with keys: `event` (BaseEvent), `code` (number), and `message` (string). This method is called for each event instrumented using the client interface, including Identify, GroupIdentify and Revenue events.

#### Plugin examples

##### Enrichment type plugin

Here's an example of a plugin that modifies each instrumented event by adding an increment integer to `event_id` property of an event starting from 100.

```ts
import { init, add } from '@amplitude/analytics-node';
import { NodeConfig, EnrichmentPlugin, Event, PluginType } from '@amplitude/analytics-types';

export class AddEventIdPlugin implements EnrichmentPlugin {
  name = 'add-event-id';
  type = PluginType.ENRICHMENT as const;
  currentId = 100;
  config?: NodeConfig;

  /**
   * setup() is called on plugin installation
   * example: client.add(new AddEventIdPlugin());
   */
  async setup(config: NodeConfig): Promise<undefined> {
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

Here's an example of a plugin that sends each instrumented event to a target server URL using your preferred HTTP client.

```ts
import { init, add } from '@amplitude/analytics-node';
import { NodeConfig, DestinationPlugin, Event, PluginType, Result } from '@amplitude/analytics-types';
import fetch from 'node-fetch';

export class MyDestinationPlugin implements DestinationPlugin {
  name = 'my-destination-plugin';
  type = PluginType.DESTINATION as const;
  serverUrl: string;
  config?: NodeConfig;

  constructor(serverUrl: string) {
    this.serverUrl = serverUrl;
  }

  /**
   * setup() is called on plugin installation
   * example: client.add(new MyDestinationPlugin());
   */
  async setup(config: NodeConfig): Promise<undefined> {
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

### Custom HTTP Client

You can provide an implementation of `Transport` interface to the `transportProvider` configuration option for customization purpose, for example, sending requests to your proxy server with customized HTTP request headers.

```ts
import { Transport } from '@amplitude/analytics-types';

class MyTransport implements Transport {
  async send(serverUrl: string, payload: Payload): Promise<Response | null> {
    // check example: https://github.com/amplitude/Amplitude-TypeScript/blob/main/packages/analytics-client-common/src/transports/fetch.ts
  }
}

amplitude.init(API_KEY, {
  transportProvider: new MyTransport(),
});
```

--8<-- "includes/abbreviations.md"
