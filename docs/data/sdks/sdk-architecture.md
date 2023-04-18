---
title: Analytics SDK Architecture
description: Overview to Amplitude Analytics SDK architecture and common usage
---

This article provides a high level overview of the Amplitude Analytics SDKs. Our latest SDKs share a common architecture that works similarly across all platforms making it easy to understand how the Analytics works regardless of the exact environment and runtime.

There are still some SDKs that haven't updated to the latest architecture, while also not in maintenance (1), for example Flutter, Java, and iOS. 
{ .annotate }

1.  Maintenance SDKs are time-tested, stable versions of older SDKs. Once a new SDK is available for a given platform, the older SDK is moved to maintenance status and under the Maintenance SDKs section in the site navigation. Maintenance SDKs only receives bug fixes until deprecation. It's strongly recommended to new SDKs to take advantage of their benefits. To migrate from a maintenance SDK, refer to the migration guide under each maintenance SDK documentation.

Refer to the [SDK status table](./#sdk-status-table) to check whether a SDK follows the architecture.

## Benefits of the latest architecture

- Uses **modern languages** for each platform and with **modern tools/frameworks**
    - It's easier for develpers to onboard Amplitude and also gain more confidence on data quality
    - Latest Browser, Node.js, React Native SDK use TypeScript. Latest Android uses Kotlin. Latest iOS uses Swift
    - Improved the code readability can speed up your the developement cycle
    - Browser SDK implements tree-shaking technique to reduce the bundle size

- Designed with a solid and **extensible architecture**
    - Next generation SDKs allow more customization based on your needs. You can implement [a custom logger](./#logger-provider) and [a custom storage](./#storage-provider), [enrich your data](./#enrichment-plugin), and [send your data to other destination](./#destination-plugin) by using Plugins

- Has **cleaner and aligned interfaces**
    - Aligned interfaces benefit using Amplitude SDKs on multiple platforms without memorizing different function names. For example, before latest SDKs, to track an event with different properties, you need to use different functions, for example `logEvent()`, `logEventWithTimestamp()`, `logEventWithGroup()`, etc. Right now with latest SDKs, you can just use by `track()` with all properties in `EventOptions`
    
- Is **more reliable and robust**
    - Latest SDKs don't require any external dependencies, which enhances performance, mitigate potential issues caused by dependencies, and makes them more lightweight
    - Latest SDKs use file storage instead of database to improve performance
    - Latest Android SDK removes OkHttp which addresses dependency compatibility issues

## Latest Architecture

The latest SDKs share the same architecture and interfaces across platform. This page covers the high-level functionality across all latest SDKs. Refer to the individual SDK documentation for more detailed examples.

![Latest Architecture Architecture](/../assets/images/data-latest-sdk-architecture.drawio.svg)

### Client

Amplitude Client stores configurations and is the entry point for developers to interact with Amplitude. All major functionally is exposed on the Client including `init`, `track`, and `flush`. 

Before instrumenting events, you must initialize a SDK client instance using the API key for your Amplitude project. 

Some SDKs exposes a default Client instance that can be used across the entire application.

```typescript
// Latest Browser SDK example: initialize a Client

import * as amplitude from '@amplitude/analytics-browser';

amplitude.init('API_KEY');
```

But you can also create one Amplitude Client on your own . Refer to each SDK document for more details.

### Configuration

Configuration includes the options to configure Client behavior.

???config "Configuration Options"
    | <div class="big-column">Name</div>  | Description | Default Value |
    | --- | --- | --- |
    |`apiKey`| Required. `string`. The apiKey of your project. | `null` | 
    |`flushIntervalMillis`| `number`. The amount of time waiting to upload the event to the server in millionseconds. | 1 second.|
    |`flushQueueSize`| `number`. The maximum number of events that can be stored locally before forcing an upload.  | 30 events. |
    |`flushMaxRetries`| `number`. The max retry limits. | 5 times.|
    |`loggerProvider`| `Logger`. Implements a custom `loggerProvider` class from the Logger, and pass it in the configuration during the initialization to help with collecting any error messages from the SDK in a production environment.| `Amplitude Logger` |
    |`minIdLength`| `number` | Overrides the minimum length of `user_id` & `device_id` fields. | `5` |
    |`optOut`| `boolean`. If `optOut` is `true`, the event isn't sent to Amplitude's servers. | `false` |
    |`serverUrl`| `string`. The server url events upload to. | `https://api2.amplitude.com/2/httpapi` | 
    |`serverZone`| `EU` or  `US`. Set Amplitude Server Zone, switch to zone related configuration. To send data to Amplitude's EU servers should configure to `EU` | `US` |
    |`storageProvider`| `Storage<Event[]>`. Implements a custom `storageProvider` class from Storage. | `MemoryStorage` |
    |`useBatch`| `boolean`. When `true`, uses the Batch API instead of the HTTP V2 API.| `false` |

You can pass a Configuration on Client initialization.

```typescript
// Latest Browser SDK example: initialize a Client with a Configuration

import * as amplitude from '@amplitude/analytics-browser';
 
amplitude.init('API_KEY', 'OPTIONAL_USER_ID', {
  flushQueueSize: 30, // flush queued events when there are 30 or more
  flushIntervalMillis: 10000, // flush queued events every 1 seconds
  useBatch: true //use batch mode with batch API endpoint, `https://api2.amplitude.com/batch`
});
```

### Storage provider

A storage provider holds events in a designated storage buffer. The default storage provider only queues events in memory. To prevent data loss, you can customize your own storage provider to persist events, for example to a disk, in case of unexpected shutdown. This way, you can ensure that you can recover un-sent events even in the event of a system failure. 

You can configure the storage provider in the Client Configuration. Storage providers in different SDKs follows slightly different interfaces. Refer to the "Configuration Options" section of a specific latest SDK documentation for more details.

```typescript
// Latest Browser SDK example: Customize the storage

class MyStorage<T> {
  isEnabled(): Promise<boolean> {
    // Whether the storage is enabled
  }

  get(key: string): Promise<T | undefined> {
    // get the value associated with the given key in the storage
  }

  getRaw(key: string): Promise<string | undefined> {
    // get the string associated with the given key in the storage
  }

  set(key: string, value: T): Promise<void> {
    // set an item in the storage by key
  }

  remove(key: string): Promise<void> {
    // remove an item in the storage by key
  }

  reset(): Promise<void> {
    // clear the storage
  }
}

amplitude.init('API_KEY', 'OPTIONAL_USER_ID', {
  storageProvider: new MyStorage(),
});
```

### Logger provider

A logger provider configures the logger instance used by the Amplitude Client. It helps to collect debugging and error messages from the SDK in both development and production environments. Logger providers in different SDKs follows slightly different interfaces. Refer to the "Configuration Options" section of a specific latest SDK documentation for more details.

```typescript
// Latest Browser SDK example: Customize the logger 

import * as amplitude from '@amplitude/analytics-browser';

// Log levels defined:
// None = 0,
// Error = 1,
// Warn = 2,
// Verbose = 3,
// Debug = 4,

class MyLogger{
  disable(): void {
    console.log('Logger has been disabled');
  }

  enable(logLevel: amplitude.Types.LogLevel): void {
    console.log('Logger has been enabled with level:', logLevel);
  }

  log(...args: any[]): void {
    // Implementation for the log method
    console.log(...args);
  }

  warn(...args: any[]): void {
    // Implementation for the warn method
    console.log(...args);
  }

  error(...args: any[]): void {
    // Implementation for the error method
    console.log(...args);
  }

  debug(...args: any[]): void {
    // Implementation for the debug method
    console.log(...args);
  }
}

amplitude.init('API_KEY', 'OPTIONAL_USER_ID', {
  loggerProvider: new MyLogger(),
});
```

### Event 

Events represent how users interact with your application. 

`BaseEvent` represents a basic event with optional properties. You can also track other event properties in the field of `event_properties`.

```typescript
// Latest Browser SDK example: track an event

import * as amplitude from '@amplitude/analytics-browser';
import {BaseEvent} from '@amplitude/analytics-types';

const buttonClickedEvent: BaseEvent = {
  event_type: 'Button Clicked',
  event_properties: {
    buttonColor: 'primary',
  }
}

amplitude.track(buttonClickedEvent);
```

Some SDKs also allow you to track an event without creating one but just pass the event type as a string.

```typescript
// Latest Browser SDK example: track an event without creating one 

import * as amplitude from '@amplitude/analytics-browser';

// Track a basic event
amplitude.track('Button Clicked');

// Track events with optional properties
const eventProperties = {
  buttonColor: 'primary',
};
amplitude.track('Button Clicked', eventProperties);
```

### Plugin

Plugins allow you to extend Amplitude SDK's behavior. For example, you can:

- Use an Enrichment Plugin to modify event properties
!!!example "Enrichment plugin examples"

    ???code-example "Drop-event plugin example(click to expand)"

        ```typescript
        import * as amplitude from '@amplitude/analytics-browser';

        import { EnrichmentPlugin, BrowserConfig, PluginType, Event } from '@amplitude/analytics-types';

        class FilterEventsPlugin implements EnrichmentPlugin {
          name = 'filter-events-plugin';
          type = PluginType.ENRICHMENT as any;

          async setup(config: BrowserConfig): Promise<void> {
            return undefined;
          }

          async execute(event: Event): Promise<Event | null> {
            // ignore events with a certain property
            if (event.event_properties['ignore'] === true){
            // returning null will prevent this event from being processed by subsequent plugins
            return null;
          }

          // Allow other events to be processed and sent to destination plugins
          return event;
          }
        }

        amplitude.init('API_KEY');
        amplitude.add(new FilterEventsPlugin());
        ```

    ???code-example "Remove PII (Personally Identifiable Information) (click to expand)"

        ```typescript
        import * as amplitude from '@amplitude/analytics-browser';

        import { EnrichmentPlugin, BrowserConfig, PluginType, Event } from '@amplitude/analytics-types';

        class FilterEventsPlugin implements EnrichmentPlugin {
          name = 'remove-PII-plugin';
          type = PluginType.ENRICHMENT as any;

          async setup(config: BrowserConfig): Promise<void> {
            return undefined;
          }

          async execute(event: Event): Promise<Event> {
              // remove PII on the event
              if(event.user_properties['phone']) {
                delete event.user_properties['phone'];
                
                // set a new prop to mark this event as modified
                event.event_properties['pii-removed'] = true;
              }
  
              // return modified event with PII removed
              return event
          }
        }

        amplitude.init('API_KEY');
        amplitude.add(new FilterEventsPlugin());
        ```
  
- Use a Destination Plugin to send events to a third-party APIs
!!!example "Destination plugin examples"
    Follow Segment's guide to install [Segment Analytics.js 2.0 Web SDK](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/quickstart/) first.

    ???code-example "Send to Segment (click to expand)"

        ```typescript
        import * as amplitude from '@amplitude/analytics-browser';
        import { AnalyticsBrowser } from '@segment/analytics-next';
        import { DestinationPlugin, BrowserConfig, PluginType, Event, Result } from '@amplitude/analytics-types';

        class SegmentDestinationPlugin implements DestinationPlugin {
            name = 'segment-destination-plugin';
            type = PluginType.DESTINATION as any;

            segment: AnalyticsBrowser;

            constructor(writeKey: string) {
                // Create Segment tracker
                this.segment = AnalyticsBrowser.load({ writeKey: writeKey });
            }

            async setup(config: BrowserConfig): Promise<void> {
                return undefined;
            }

            execute(context: Event): Promise<Result> {
              return new Promise<Result>((resolve) => {
                const { event_type, event_properties, user_id, user_properties } = context;
                const callback = (err: Error) => {
                    resolve({ event: context, code: err ? 0 : 200, message: err ? err.message : '' });
                };

                switch (event_type) {
                    case amplitude.Types.SpecialEventType.IDENTIFY:
                    this.segment.identify({
                        userId: user_id,
                        traits: user_properties?.[amplitude.Types.IdentifyOperation.SET],
                    }, callback);
                    break;

                    case amplitude.Types.SpecialEventType.GROUP_IDENTIFY:
                    // not implemented
                    break;

                    default:
                      this.segment.track(event_type,{
                        userId: user_id,
                        event: event_type,
                        properties: event_properties,
                      }, callback);
                    break;
                }
              });
            }
        }

        amplitude.init('AMPLITUDE-API-KEY');
        const segmentDestination = new SegmentDestinationPlugin('YOUR-SEGMENT-WRITE-KEY');
        amplitude.add(segmentDestination);
        ```

Enrichment Plugins are executed before Destination Plugins. All Enrichment Plugins are executed in the same order in which they were added, and then all Destination Plugins are executed in the order they were added. This ensures that all data is enriched before being sent to its final destination. 

A plugin is an object with methods `setup()` and `execute()`:

- `setup()` method contains logic for preparing the plugin for use and has Client instance as a parameter. The expected return value is None. A typical use for this method is to copy configuration from `client.configuration` or instantiate plugin dependencies. This method is called when you register the plugin to the client via `client.add()`.

- `execute()` method contains the logic for processing events and has event instance as parameter. The expected return value for an Enrichment Plugin is the modified/enriched event, while the expected return value for a Destination Plugin is a map with keys: `event` (BaseEvent), `code` (HTTP response status code), and `message` (string). This method is called for each event that's instrumented using the client interface, including Identify, GroupIdentify and Revenue events.

!!!note
    if `execute()` doesn't returns an event, the event will **NOT** propagate through the remaining plugins

## Common methods

Latest SDKs share the same architecture as well as the same interfaces. Aligned interfaces benefit using Amplitude SDKs on multiple platforms without memorizing different function names.

This a list of shared interfaces of latest SDKs. 

!!!note 
    Different SDKs follow different naming conventions. Here use camel case for methods and parameters and use pascal case for classes. 

- `init(apiKey)`
- `track(BaseEvent)`
- `identify(IdentifyEvent)`
- `setGroup(groupType, groupName)`
- `groupIdentify(groupType, groupName, IdentifyEvent)`
- `revenue(RevenueEvent)`
- `flush()`
- `add(Plugin)`
- `remove(Plugin)`
- `shutdown()`

## Comparison with maintenance SDK

If you are migrating from maintenance SDKs, you may notice that latest SDKs differ from maintenance SDKs not only in terms of interfaces but also in their Middleware vs Plugin architecture . You can think of Middleware as being equal to Enrichment Plugin and Destination Plugin.

## SDK status table

|Platform|Follow the latest architecture|Not follow the latest architecture|
|--------|--------|-----------|
|Browser|:octicons-package-16: `@amplitude/analytics-browser`<br/>[:material-github: Amplitude-TypeScript](https://github.com/amplitude/Amplitude-TypeScript)<br/>[:material-file-document: Document](./typescript-browser/index.md)|:material-hammer-screwdriver:{.red} Maintenance SDK<br/>:octicons-package-16: `@amplitude/amplitude-js`<br/>[:material-github: Amplitude-JavaScript](https://github.com/amplitude/Amplitude-JavaScript)<br/>[:material-file-document: Document](./javascript/index.md)|
|Android|:octicons-package-16: `com.amplitude:analytics-android`<br/>[:material-github: Amplitude-Kotlin](https://github.com/amplitude/Amplitude-Kotlin)<br/>[:material-file-document: Document](./android-kotlin/index.md)|:material-hammer-screwdriver:{.red} Maintenance SDK<br/>:octicons-package-16: `com.amplitude:android-sdk`<br/>[:material-github: Amplitude-Android](https://github.com/amplitude/Amplitude-Android)<br/>[:material-file-document: Document](./android/index.md)
|Node.js|:octicons-package-16: `@amplitude/analytics-node`<br/>[:material-github: Amplitude-Typescript](https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/analytics-node)<br/>[:material-file-document: Document](./typescript-node/index.md)|:material-hammer-screwdriver:{.red} Maintenance SDK<br/>:octicons-package-16: `@amplitude/node`<br/>[:material-github: Amplitude-Node](https://github.com/amplitude/Amplitude-Node)<br/>[:material-file-document: Document](./node/index.md)
|React Native|:octicons-package-16: `@amplitude/analytics-react-native`<br/>[:material-github: Amplitude-TypeScript](https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/analytics-react-native)<br/>[:material-file-document: Document](./typescript-react-native/index.md)|:material-hammer-screwdriver:{.red} Maintenance SDK<br/>:octicons-package-16: `@amplitude/react-native`<br/>[:material-github: Amplitude-ReactNative](https://github.com/amplitude/Amplitude-ReactNative)<br/>[:material-file-document: Document](./react-native/index.md)
|iOS|:octicons-package-16: `AmplitudeSwift`<br/>[:material-github: Amplitude-Swift](https://github.com/amplitude/Amplitude-Swift)<br/>[:material-file-document: Document](./ios-swift/index.md)|:octicons-package-16: `Amplitude`<br/>[:material-github: Amplitude-iOS](https://github.com/amplitude/Amplitude-iOS)<br/>[:material-file-document: Document](./ios/index.md)
|Python|:octicons-package-16: `amplitude-analytics`<br/>[:material-github: Amplitude-Python](https://github.com/amplitude/Amplitude-Python)<br/>[:material-file-document: Document](./python/index.md)||
|Go|:octicons-package-16: `github.com/amplitude/analytics-go`<br/>[:material-github: analytics-go](https://github.com/amplitude/analytics-go)<br/>[:material-file-document: Document](./go/index.md)||
|Unity||:octicons-package-16: `amplitude-unity.unitypackage`<br/>[:material-github: unity-plugin](https://github.com/amplitude/unity-plugin)<br/>[:material-file-document: Document](./unity/index.md)|
|Unreal||:octicons-package-16: `AmplitudeUnreal`<br/>[:material-github: Amplitude-Unreal](https://github.com/amplitude/Amplitude-Unreal)<br/>[:material-file-document: Document](./unreal/index.md)|
|Flutter||:octicons-package-16: `amplitude_flutter`<br/>[:material-github: Amplitude-Flutter](https://github.com/amplitude/Amplitude-Flutter)<br/>[:material-file-document: Document](./flutter/index.md)|
|Java||:octicons-package-16: `com.amplitude.Amplitude`<br/>[:material-github: Amplitude-Java](https://github.com/amplitude/Amplitude-Java)<br/>[:material-file-document: Document](./java/index.md)|