---
title: Node.JS SDK Migration Guide
description: Use this guide to easily migrate from Amplitude's maintenance Node.JS SDK (@amplitude/node) to the latest SDK (@amplitude/analytics-node).
---

Amplitude's latest Node.js SDK (`@amplitude/analytics-node`) features a plugin architecture and built-in type definitions. The latest Node.js SDK isn't backwards compatible with the maintenance Node.js SDK `@amplitude/node`. 

To migrate to `@amplitude/analytics-node`, update your dependencies and instrumentation.

## Terminology

* `@amplitude/node`: Maintenance Node.js SDK
* `@amplitude/analytics-node`: Latest Node.js SDK

## Dependency

Update package.json to uninstall the maintennace Node.js SDK and install the latest Node.js SDK.

```diff
{
    "dependencies": {
-    "@amplitude/node": "*",
+    "@amplitude/analytics-node": "^1",
    }
}
```

Install `@amplitude/analytics-node` by `npm install @amplitude/analytics-node`.

## Instrumentation

The latest Node.js SDK offers an new API to instrument events. To migrate to it, you need to update a few calls. The following sections detail which calls have changed.

### Initialization

The maintenance Node.js SDK only supports namespace import. The latest Node.js SDK supports namespace import (`import * as amplitude from '@amplitude/analytics-node'`) and named import (`import { init } from '@amplitude/analytics-node'`) as well. We are using named import in the examples of latest Node.js SDK in this documentation.

To initialize the SDK, call `init()`, with a valid Amplitude API Key and configuration parameters.

```diff
- import * as Amplitude from '@amplitude/node'
+ import { init } from '@amplitude/analytics-node';

var options = {};
- const client = Amplitude.init(AMPLITUDE_API_KEY, options);
+ init(API_KEY, options);
```

### Configuration

The latest Node.js SDK configuration comes in a different shape. Some configurations are no longer supported.

|@amplitude/node|@amplitude/analytics-node|
|-|-|
| `debug` | `logLevel` set to WARN level|
| `logLevel` | `logLevel` |
| `maxCachedEvents` | `flushQueueSize` |
| `retryTimeouts` | `flushMaxRetries` can only be set to a number instead of an array of number as in `retryTimeouts`
| `optOut` | `optOut` |
| `retryClass` | CUSTOMIZATION NOT SUPPORT. Retry logic is handled by latest Node.js SDK|
| `transportClass` | `transportProvider` |
| `serverUrl` | `serverUrl` |
| `uploadIntervalInSec` | `flushIntervalMillis` is in milliseconds while `uploadIntervalInSec` is in seconds|
| `minIdLength` | `minIdLength` |
| `requestTimeoutMillis` | NOT SUPPORT |
| `onRetry` | CUSTOMIZATION NOT SUPPORT. Retry logic is handled by the latest Node.js SDK |

### Tracking events

#### `logEvent()`

The `logEvent()` API maps to `track()`.

```diff
+ import { track } from '@amplitude/analytics-node';

const eventProperties = {
    buttonColor: 'primary',
};

- client.logEvent({
+ track({
  event_type: 'Button Clicked',
  user_id: 'user@amplitude.com',
  event_properties: eventProperties
});
```

#### `flush()`

The `flush()` API remains the same.

```diff
+ import { flush } from '@amplitude/analytics-node';

- client.flush();
+ flush();
```

### Set user properties

#### `identify()`

The `identify()` API is very similar but has a different signature. The [maintenance Node.js SDK](https://github.com/amplitude/Amplitude-Node/blob/2ef295e1fb698286d606ea4a2ccbbfdc4ba3fdc8/packages/node/src/nodeClient.ts#L142) has a signature `(userId: string | null, deviceId: string | null, identify: Identify)` while the [latest Node.js SDK](https://github.com/amplitude/Amplitude-TypeScript/blob/8f4ea010279fb21190a2c0595d4ae8a7d9e987ce/packages/analytics-core/src/core-client.ts#L62) has a signature `(identify: Identify, eventOptions?: EventOptions)`. Learn more about what `EventOptions` include [here](https://amplitude.github.io/Amplitude-TypeScript/interfaces/_amplitude_analytics_node.Types.EventOptions.html).

```diff
+ import { identify, Identify } from '@amplitude/analytics-node';

const identifyObj = new Identify();
identifyObj.set('location', 'LAX');

- client.identify('user@amplitude.com',null,identifyObj);
+ identify(identifyObj, {
+   user_id: 'user@amplitude.com',
+ });
```

### Middleware

Middlewares map to plugins in the latest Node.js SDK. Here are two types of plugins, enrichment plugins and destination plugins. To [learn more](../#plugins) about it. Here is an example of logging event information.

```diff
+ import { add } from '@amplitude/analytics-node';
+ import { NodeConfig, EnrichmentPlugin, Event, PluginType } from '@amplitude/analytics-types';

- const loggingMiddleware: Middleware = (payload, next) => {
-   console.log(`[amplitude] event=${payload.event} extra=${payload.extra}`);
-   next(payload);
}

+ export class AddLogEventPlugin implements EnrichmentPlugin {
+   name = 'log-event';
+   type = PluginType.ENRICHMENT as const;
+   config?: NodeConfig;

+   async setup(config: NodeConfig): Promise<undefined> {
+      this.config = config;
+      return;
+   }

+   async execute(event: Event): Promise<Event> {
+     console.log(`[amplitude] event=${event}`);
+     return event;
+   }
+ }
```

The `addEventMiddleware()` API maps to `add()`.

```diff
+ import { add } from '@amplitude/analytics-node';

- client.addEventMiddleware(new Middleware())
+ add(new Plugin());
```

## Comparison 

--8<-- "includes/sdk-migration/sdk-migration-note.md"

| <div class="big-column">Feature</div> | [Latest Node SDK](./) | [Maintenance Node SDK](../../node/) |
| --- | --- | --- |
| Package | [@amplitude/analytics-node](https://www.npmjs.com/package/@amplitude/analytics-node) | [@amplitude/node](https://www.npmjs.com/package/@amplitude/node)|
| Configuration | Configuration is implemented by Configuration object during initialize amplitude. [More configurations](./#configuration). | Support explicity setter methods. [More configurations](../../node/#configuration).|
| Logger Provider | Amplitude Logger. Fully customizable. | Amplitude Logger.  Not customizable. |
| Storage Provider | LocalStorage by default. Fully customizable. | Local Storage. |
| Customization | Plugins | Middleware |
| Retry | Regular retry. | Regular retry by default. Also provide offline retry. You are able to customize your retry logic. Fully customizible. |
| Server Endpoint | HTTP V2 API |  HTTP V2 API |
| Batch API | Supported, with configuration. | Not supported. |