---
title: Analytics SDK Architecture
description: Overview to Amplitude Analytics SDK architecture and common usage
---

This article provides a high level overview of the Amplitude Analytics SDKs. Our latest SDKs share a common architecture that works similarly across all platforms making it easy to understand how Analytics works regardless of the exact environment and runtime.

There are still some SDKs that haven't updated to the latest architecture, while also not in maintenance (1), for example Flutter, Java, and iOS. 
{ .annotate }

1. Maintenance SDKs are time-tested, stable versions of older SDKs. Once a new SDK is available for a given platform, the older SDK is moved to maintenance status and under the Maintenance SDKs section in the site navigation. Maintenance SDKs only receives bug fixes until deprecation. It's strongly recommended to new SDKs to take advantage of their benefits. To migrate from a maintenance SDK, refer to the migration guide under each maintenance SDK documentation.

Refer to the [SDK status table](./#sdk-status-table) to check whether a SDK follows the architecture.

## Benefits of the latest architecture

- Uses **modern languages** for each platform and with **modern tools/frameworks**
    - It's easier for developers to onboard Amplitude and also gain more confidence on data quality
    - Latest Browser, Node.js, React Native SDK use TypeScript. Latest Android uses Kotlin. Latest iOS uses Swift
    - Improved the code readability can speed up your the development cycle
    - Browser SDK implements tree-shaking technique to reduce the bundle size

- Designed with a solid and **extensible architecture**
    - Next generation SDKs allow more customization based on your needs. You can implement [a custom logger](./#logger-provider) and [a custom storage](./#storage-provider), [enrich your data](./#enrichment-plugin), and [send your data to other destination](./#destination-plugin) by using Plugins

- **Cleaner and aligned interfaces**
    - Aligned interfaces makes it easy to use the Amplitude SDKs on multiple platforms without memorizing different function names. For example, to track an event with different properties before the latest SDK, you needed to use different functions such as `logEvent()`, `logEventWithTimestamp()`, `logEventWithGroup()`, etc.  With the latest SDKs, you can use now use `track()` to set all available event properties.

- **More reliable and robust**
    - Latest SDKs don't require any external dependencies, which enhances performance, mitigates potential issues caused by dependencies, and makes them more lightweight
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

amplitude.init(AMPLITUDE_API_KEY);
```

But you can also create one Amplitude Client on your own . Refer to each SDK document for more details.

### Configuration

All the latest SDKs allow for configuration of Client behavior. Below is a short list of common configuration settings and how to use them. Individual platforms may include additional configuration settings. Refer to the platform specific SDK documentation for a full list.

???config "Configuration Options"
    | <div class="big-column">Name</div>  | Description | Default Value |
    | --- | --- | --- |
    |`apiKey`| Required. `string`. The apiKey of your project. | `null` | 
    |`flushIntervalMillis`| `number`. The amount of time waiting to upload the event to the server in milliseconds. | 1 second.|
    |`flushQueueSize`| `number`. The maximum number of events that can be stored locally before forcing an upload.  | 30 events. |
    |`flushMaxRetries`| `number`. The max retry limits. | 5 times.|
    |`loggerProvider`| `Logger`. Implements a custom `loggerProvider` class from the Logger, and pass it in the configuration during the initialization to help with collecting any error messages from the SDK in a production environment.| `Amplitude Logger` |
    |`minIdLength`| `number` | Overrides the minimum length of `user_id` & `device_id` fields. | `5` |
    |`optOut`| `boolean`. If `optOut` is `true`, the event isn't sent to Amplitude's servers. | `false` |
    |`serverUrl`| `string`. The server url events upload to. | `https://api2.amplitude.com/2/httpapi` | 
    |`serverZone`| `EU` or  `US`. Set Amplitude Server Zone, switch to zone related configuration. To send data to Amplitude's EU servers should configure to `EU` | `US` |
    |`storageProvider`| `Storage<Event[]>`. Implements a custom `storageProvider` class from Storage. | `LocalStorage` |
    |`useBatch`| `boolean`. When `true`, uses the Batch API instead of the HTTP V2 API.| `false` |

You can pass a Configuration on Client initialization.

```typescript
// Latest Browser SDK example: initialize a Client with a Configuration

import * as amplitude from '@amplitude/analytics-browser';
 
amplitude.init(AMPLITUDE_API_KEY, 'OPTIONAL_USER_ID', {
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

amplitude.init(AMPLITUDE_API_KEY, 'OPTIONAL_USER_ID', {
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

amplitude.init(AMPLITUDE_API_KEY, 'OPTIONAL_USER_ID', {
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

### Plugins

Plugins allow you to extend Amplitude SDK's behavior. You can create a custom Plugin to modify or filter events, or send events to a custom destination. Please check [here](../../sdk-plugins) for more details. 

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

## Identity

Amplitude uses a combination of three different methods to identify your users: **device ID**, **user ID**, and **Amplitude ID**. 

- Device ID is a unique ID for a given device. Amplitude client-side SDKs generate a device ID automatically for you on initialization and store them since they run on a single device. However server-side SDKs handle requests for many devices, so Amplitude server-side SDKs don't generate a device ID on initialization. You can set the device ID when you `track()` an event.

- User ID is an internal unique identifier configured by you. You can assign a unique user ID for individual users, for example email addresses.

- Amplitude ID is automatically creates by Amplitude once a unique user is identified. Amplitude ID can include multiple device IDs and user IDs that are all associated with a single user.

For mobile SDKs, Amplitude also tracks:

**Android**:

- App Set ID: a unique identifier that groups multiple apps together within an ecosystem or platform. It is often used in situations where multiple apps are owned or managed by the same entity, such as a developer or a company.
- ADID (Advertising ID): a unique identifier used for tracking and targeting users for personalized advertising campaigns. Due to privacy concerns this is not recommended. App Set ID should be considered instead.

**iOS**:

- IDFV (Identifier for Vendors): a unique identifier. Unlike IDFA, IDFV is not specific to advertising. It is designed to track and identify a specific device for multiple apps belonging to the same vendor or developer.
- IDFA (Identifier for Advertising): a unique identifier used for tracking and targeting users for personalized advertising campaigns. Due to privacy concerns this is not recommended. IDFV should be considered instead.

## Comparison with maintenance SDK

If you are migrating from maintenance SDKs, you may notice that latest SDKs differ from maintenance SDKs not only in terms of interfaces but also in their Middleware vs Plugin architecture . You can think of Middleware as being equal to Enrichment Plugin and Destination Plugin.
If you are migrating from maintenance SDKs, you may notice that latest SDKs differ in terms of interfaces.

- `logEvent()` has been renamed `track()`.
- Middleware has been replaced by [Plugins](../../sdk-plugins) . When migrating from Middleware, it be easily be converted to an Enrichment or Destination Plugin by overriding the `execute()` method.

## SDK status table

|Platform|Latest architecture|Not on latest architecture|
|--------|--------|-----------|
|Browser|:octicons-package-16: [`@amplitude/analytics-browser`](https://www.npmjs.com/package/@amplitude/analytics-browser)<br/>[:material-github: Amplitude-TypeScript](https://github.com/amplitude/Amplitude-TypeScript)<br/>[:material-file-document: Document](./typescript-browser/index.md)|:material-hammer-screwdriver:{.red} Maintenance SDK<br/>:octicons-package-16: [`@amplitude/amplitude-js`](https://www.npmjs.com/package/amplitude-js)<br/>[:material-github: Amplitude-JavaScript](https://github.com/amplitude/Amplitude-JavaScript)<br/>[:material-file-document: Document](./javascript/index.md)|
|Android|:octicons-package-16: [`com.amplitude:analytics-android`](https://mvnrepository.com/artifact/com.amplitude/analytics-android)<br/>[:material-github: Amplitude-Kotlin](https://github.com/amplitude/Amplitude-Kotlin)<br/>[:material-file-document: Document](./android-kotlin/index.md)|:material-hammer-screwdriver:{.red} Maintenance SDK<br/>:octicons-package-16: [`com.amplitude:android-sdk`](https://mvnrepository.com/artifact/com.amplitude/android-sdk)<br/>[:material-github: Amplitude-Android](https://github.com/amplitude/Amplitude-Android)<br/>[:material-file-document: Document](./android/index.md)
|Node.js|:octicons-package-16: [`@amplitude/analytics-node`](https://www.npmjs.com/package/@amplitude/analytics-node)<br/>[:material-github: Amplitude-Typescript](https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/analytics-node)<br/>[:material-file-document: Document](./typescript-node/index.md)|:material-hammer-screwdriver:{.red} Maintenance SDK<br/>:octicons-package-16: [`@amplitude/node`](https://www.npmjs.com/package/@amplitude/node)<br/>[:material-github: Amplitude-Node](https://github.com/amplitude/Amplitude-Node)<br/>[:material-file-document: Document](./node/index.md)
|React Native|:octicons-package-16: [`@amplitude/analytics-react-native`](https://www.npmjs.com/package/@amplitude/analytics-react-native)<br/>[:material-github: Amplitude-TypeScript](https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/analytics-react-native)<br/>[:material-file-document: Document](./typescript-react-native/index.md)|:material-hammer-screwdriver:{.red} Maintenance SDK<br/>:octicons-package-16: [`@amplitude/react-native`](https://www.npmjs.com/package/@amplitude/react-native)<br/>[:material-github: Amplitude-ReactNative](https://github.com/amplitude/Amplitude-ReactNative)<br/>[:material-file-document: Document](./react-native/index.md)
|iOS|:octicons-package-16: `AmplitudeSwift`<br/>[:material-github: Amplitude-Swift](https://github.com/amplitude/Amplitude-Swift)<br/>[:material-file-document: Document](./ios-swift/index.md)|:octicons-package-16: [`Amplitude`](https://cocoapods.org/pods/Amplitude-iOS)<br/>[:material-github: Amplitude-iOS](https://github.com/amplitude/Amplitude-iOS)<br/>[:material-file-document: Document](./ios/index.md)
|Python|:octicons-package-16: [`amplitude-analytics`](https://pypi.org/project/amplitude-analytics/)<br/>[:material-github: Amplitude-Python](https://github.com/amplitude/Amplitude-Python)<br/>[:material-file-document: Document](./python/index.md)||
|Go|:octicons-package-16: [`github.com/amplitude/analytics-go`](https://pkg.go.dev/github.com/amplitude/analytics-go)<br/>[:material-github: analytics-go](https://github.com/amplitude/analytics-go)<br/>[:material-file-document: Document](./go/index.md)||
|Unity||:octicons-package-16: [`amplitude-unity.unitypackage`](https://github.com/amplitude/unity-plugin/releases)<br/>[:material-github: unity-plugin](https://github.com/amplitude/unity-plugin)<br/>[:material-file-document: Document](./unity/index.md)|
|Unreal||:octicons-package-16: [`AmplitudeUnreal`](https://github.com/amplitude/Amplitude-Unreal/releases)<br/>[:material-github: Amplitude-Unreal](https://github.com/amplitude/Amplitude-Unreal)<br/>[:material-file-document: Document](./unreal/index.md)|
|Flutter||:octicons-package-16: [`amplitude_flutter`](https://pub.dev/packages/amplitude_flutter)<br/>[:material-github: Amplitude-Flutter](https://github.com/amplitude/Amplitude-Flutter)<br/>[:material-file-document: Document](./flutter/index.md)|
|Java||:octicons-package-16: [`com.amplitude.:java-sdk`](https://mvnrepository.com/artifact/com.amplitude/java-sdk)<br/>[:material-github: Amplitude-Java](https://github.com/amplitude/Amplitude-Java)<br/>[:material-file-document: Document](./java/index.md)|
