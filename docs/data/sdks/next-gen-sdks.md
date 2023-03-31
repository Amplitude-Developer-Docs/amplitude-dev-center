---
title: Next Generation SDKs
description: Introduction to Next Generation SDK, common methods and benefits
---

This article helps you remove confusion around various Amplitude Analytics SDKs and introduces the Next Generation SDKs.

The **Next Generation (next-gen) SDKs** are a group of Amplitude Analytics SDKs that share the same architecture and interfaces. 

Amplitude also has "**Maintenance SDKs**". These are the time tested, stable SDKs of old. Once a next-gen SDK is available for a given platform, older SDKs are moved to maintenance status and under the **Maintenance SDKs** section in the site navigation. For example, Browser, Android, React Native, and Node.js. Maintenance SDKs only receives bug fixes until deprecation. It's strongly recommended to adopt next-gen SDKs to take advantage of their benefits. To migrate from a maintenance SDK, refer to the migration guide under each next-gen SDK documentation. 

!!!note 
    There are still some SDKs that aren't nex-gen while also not in maintenance, for example Flutter, Java, and iOS. 

Refer to the [SDK status table](./#sdk-status-table) to check whether a SDK is next-gen or in maintenance. 

## Next-gen benefits 

- Next-gen SDKs uses **modern languages** for each platform and with **modern tools/frameworks**
    - It's easier for develpers to onboard Amplitude and also gain more confidence on data quality
    - Next-gen Browser, Node.js, React Native SDK use TypeScript. Next-gen Android uses Kotlin. Next-gen iOS uses Swift
    - Improved the code readability can speed up your the developement cycle
    - Browser SDK implements tree-shaking technique to reduce the bundle size

- Next-gen SDKs are designed with a solid and **extensible architecture**
    - Next generation SDKs allow more customization based on your needs. You can implement [a custom logger](./#logger-provider) and [a custom storage](./#storage-provider), [enrich your data](./#enrichment-plugin), and [send your data to other destination](./#destination-plugin) by using Plugins

- Next-gen SDKs has **cleaner and aligned interfaces**
    - Aligned interfaces benefit using Amplitude SDKs on multiple platforms without memorizing different function names. For example, before next-gen SDKs, to track an event with different properties, you need to use different functions, for example `logEvent()`, `logEventWithTimestamp()`, `logEventWithGroup()`, etc. Right now with next-gen SDKs, you can just use by `track()` with all properties in `EventOptions`
    
- Next-gen SDKs are **more reliable and robust**
    - Next-gen SDKs don't require any external dependencies, which enhances performance, mitigate potential issues caused by dependencies, and makes them more lightweight
    - Next-gen SDKs use file storage instead of database to improve performance
    - Next-gen Android SDK removes OkHttp which addresses dependency compatibility issues

## Architecture

The next-gen SDKs share the same architecture and interfaces across platform. This page covers the high-level functionality across all next-gen SDKs. Refer to the individual SDK documentation for more detailed examples.

![Next-gen Architecture](/../assets/images/data-next-gen-sdk-architecture.drawio.svg)

### Client

Amplitude Client stores configurations and is also the entry point for developers to track events. 

Before instrumenting events, you must initialize a SDK client instance using the API key for your Amplitude project. 

```python 
# Next-gen Python SDK example: initialize a Client

from amplitude import Amplitude

amplitude = Amplitude('API_KEY')
```

### Configuration

Configuration includes the options to configure Client behavior. 

You can pass a Configuration on Client initialization.

```python
# Next-gen Python SDK example: initialize a Client with a Configuration

from amplitude import Amplitude
from amplitude import Config

amplitude = Amplitude("API_KEY", 
                      configuration=Config(
                            flush_queue_size=100, # flush queued events when there are 100 or more
                            flush_interval_millis=20000 # flush queued events every 20 seconds
                    )) 
```

You can also get access to the Configuration of your Client after initialization.

```python
# Next-gen Python SDK example: get access to the Configuration of your Client

from amplitude import Amplitude

client = Amplitude('API_KEY')
# flush queued events when there are 100 or more
client.configuration.flush_queue_size = 100
# flush queued events every 20 seconds
client.configuration.flush_interval_millis = 20000
```

### Storage provider

A storage provider holds events in a designated storage buffer. The default storage provider only queues events in memory. To prevent data loss, you can customize your own storage provider to persist events, for example to a disk, in case of unexpected shutdown. This way, you can ensure that you can recover un-sent events even in the event of a system failure. 

You can configure the storage provider in the Client Configuration. Refer to the "Configuration Options" section of a specific next-gen SDK documentation for more details.

### Logger provider

A logger provider configures the logger instance used by the Amplitude Client. It helps to collect debugging and error messages from the SDK in both development and production environments.

You can configure the logger provider in the Client Configuration. Refer to the "Configuration Options" section of a specific next-gen SDK documentation for more details.

### Event 

Events represent how users interact with your application. 

`BaseEvent` represents a basic event with optional properties. You can also track other event properties in the field of `EventProperties`

```python
# Next-gen Python SDK example: Event

from amplitude import Amplitude, BaseEvent

client = Amplitude('API_KEY')

# Track a basic event
# One of user_id and device_id is required
event = BaseEvent(event_type="Button Clicked", user_id="USER_ID")
client.track(event)

# Track events with optional properties
client.track(
    BaseEvent(
        event_type="Button Clicked",
        user_id="USER_ID",
        app_version="1.2.1" # optional, the current version of your application
        event_properties={ # other event properties you want to track 
            "color": "red"
        }
))
```

### Plugin

Plugins allow you to extend Amplitude SDK's behavior by, for example:

- Use an Enrichment Plugin to modify event properties
- Use a Destination Plugin to send events to a third-party APIs

A plugin is an object with methods `setup()` and `execute()`:

- `setup()` method contains logic for preparing the plugin for use and has Client instance as a parameter. The expected return value is None. A typical use for this method is to copy configuration from `client.configuration` or instantiate plugin dependencies. This method is called when you register the plugin to the client via `client.add()`.

- `execute()` method the logic for processing events and has event instance as parameter. The expected return value for an Enrichment Plugin is the modified/enriched event, while the expected return value for a Destination Plugin is a map with keys: event (BaseEvent), code (HTTP response status code), and message (string). This method is called for each event that's instrumented using the client interface.

#### Enrichment Plugin

#### Destination Plugin

## Common methods

Next-gen SDKs share the same architecture as well as the same interfaces. Aligned interfaces benefit using Amplitude SDKs on multiple platforms without memorizing different function names.

This a list of shared interfaces of next-gen SDKs. 

!!!note 
    Different SDKs follow different naming conventions. Here use camel case for methods and parameters and use pascal case for classes. 

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

If you are migrating from maintenance SDKs, you may notice that next-gen SDKs differ from maintenance SDKs not only in terms of interfaces but also in their Middleware vs Plugin architecture . You can think of Middleware as being equal to Enrichment Plugin and Destination Plugin.

## SDK status table

|Platform|Next-gen|Maintenance|Which SDK (repo name)|SDK Package|
|--------|---|---|---------------------|-----------|
|[Browser](./javascript/index.md)|:material-close:|:material-check:|[Amplitude-JavaScript](https://github.com/amplitude/Amplitude-JavaScript)|`@amplitude/amplitude-js`|
|[Browser](./typescript-browser/index.md)|:material-check:|:material-close:|[Amplitude-TypeScript](https://github.com/amplitude/Amplitude-TypeScript)|`@amplitude/analytics-browser`|
|[Android](./android/index.md)|:material-close:|:material-check:|[Amplitude-Android](https://github.com/amplitude/Amplitude-Android)|`com.amplitude:android-sdk`|
|[Android](./android-kotlin/index.md)|:material-check:|:material-close:|[Amplitude-Kotlin](https://github.com/amplitude/Amplitude-Kotlin)|`com.amplitude:analytics-android`|
|[Node.js](./node/index.md)|:material-close:|:material-check:|[Amplitude-Node](https://github.com/amplitude/Amplitude-Node)|`@amplitude/node`|
|[Node.js](./typescript-node/index.md)|:material-check:|:material-close:|[Amplitude-Typescript](https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/analytics-node)|`@amplitude/analytics-node`|
|[React Native](./react-native/index.md)|:material-close:|:material-check:|[Amplitude-ReactNative](https://github.com/amplitude/Amplitude-ReactNative)|`@amplitude/react-native`|
|[React Native](./typescript-react-native/index.md)|:material-check:|:material-close:|[Amplitude-TypeScript](https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/analytics-react-native)|`@amplitude/analytics-react-native`|
|[iOS](./ios/index.md)|:material-close:|:material-check:|[Amplitude-iOS](https://github.com/amplitude/Amplitude-iOS)|`Amplitude`|
|[iOS](./ios-swift/index.md)|:material-check:|:material-close:|[Amplitude-Swift](https://github.com/amplitude/Amplitude-Swift)|`AmplitudeSwift`|
|[Python](./python/index.md)|:material-check:|:material-close:|[Amplitude-Python](https://github.com/amplitude/Amplitude-Python)|`amplitude-analytics`|
|[Go](./go/index.md)|:material-check:|:material-close:|[analytics-go](https://github.com/amplitude/analytics-go)|`github.com/amplitude/analytics-go`|
|[Flutter](./flutter/index.md)|:material-close:|:material-close:|[Amplitude-Flutter](https://github.com/amplitude/Amplitude-Flutter)|`amplitude_flutter`|
|[Java](./java/index.md)|:material-close:|:material-close:|[Amplitude-Java](https://github.com/amplitude/Amplitude-Java)|`com.amplitude.Amplitude`|
|[Unity](./unity/index.md)|:material-check:|:material-close:|[unity-plugin](https://github.com/amplitude/unity-plugin)|`amplitude-unity.unitypackage`|
|[Unreal](./unreal/index.md)|:material-check:|:material-close:|[Amplitude-Unreal](https://www.docs.developers.amplitude.com/data/sdks/unreal/)|`AmplitudeUnreal`|