---
title: iOS SDK Migration Guide
description: Use this guide to easily migrate from Amplitude's maintenance iOS SDK (Amplitude-iOS) to the new SDK (Amplitude-Swift).
---

The new version of Amplitude's iOS SDK (`Amplitude-Swift`) features a plugin architecture, built-in type definition and broader support for front-end frameworks. The new version isn't backwards compatible with `Amplitude-iOS`. 

To migrate to `Amplitude-Swift`, update your dependencies and instrumentation.

## Terminology

* `Amplitude-iOS`: Maintenance iOS SDK
* `Amplitude-Swift`: New iOS SDK

## Dependency

For CocoaPods installation:
=== "Amplitude-iOS"
    Add dependency to Podfile.
    ```
    pod 'Amplitude', '~> 8.14'
    ```

=== "Amplitude-Swift"
    Add dependency to Podfile.
    ```
    pod 'AmplitudeSwift', '~> 0.3'
    ```

For Swift Package Manager installation:

=== "Amplitude-iOS"
    Enter `https://github.com/amplitude/Amplitude-iOS` into the search bar.

=== "Amplitude-Swift"
    Enter `https://github.com/amplitude/Amplitude-Swift` into the search bar.

For Carthage installation:

=== "Amplitude-iOS"
    Add the following line to your Cartfile.

    ```
    github "amplitude/Amplitude-iOS" ~> 8.14
    ```

=== "Amplitude-Swift"
    Add the following line to your Cartfile.

    ```
    github "amplitude/Amplitude-Swift" ~> 0.3
    ```

## Instrumentation

This SDK offers an API to instrument events. To migrate to the new SDK, you need to update a few calls. The following sections detail which calls have changed.

### Initialization

Like all other calls, `instance()` has been removed. Configuration is handled differently between the maintenance iOS and new iOS SDK. The new iOS SDKs use the Configuration object to set the configuration. See [Configuration](#configuration).

=== "Amplitude-iOS"

    ```swift
    import Amplitude

    Amplitude.instance().trackingSessionEvents = true
    Amplitude.instance().initializeApiKey("YOUR-API-KEY")
    ```

=== "Amplitude-Swift"

    ```swift
    import Amplitude_Swift

    Amplitude(
      configuration: Configuration(
        apiKey: "YOUR-API-KEY",
        trackingSessionEvents: true,
      )
    )
    ```

### Configuration

The configurations for the new SDK are simpler and more consistent across runtimes.

|Amplitude-iOS|Amplitude-Swift|
|-|-|
|`amplitude.instanceWithName("YOUR-INSTANCE-NAME")`|`config.instanceName`|
|`amplitude.useDynamicConfig`|NOT SUPPORTED.|
|`amplitude.setServerUrl("YOUR-SERVER-URL")`|`config.serverUrl`|
|`amplitude.setServerZone("AMPServerZone.EU or AMPServerZone.US")`|`config.serverZone`|
|`amplitude.trackingOptions`|`config.trackingOptions`|
|`amplitude.trackingSessionEvents`|`config.trackingSessionEvents`|
|`amplitude.minTimeBetweenSessionsMillis`|`config.minTimeBetweenSessionsMillis`|
|`amplitude.eventUploadMaxBatchSize`|`config.flushQueueSize`|
|`amplitude.eventUploadThreshold`|`config.flushQueueSize`|
|`amplitude.eventUploadPeriodSeconds`|`config.flushIntervalMillis`|
|Set max retries count. NOT SUPPORTED.|`config.flushMaxRetries`|
|`amplitude.eventMaxCount`|NOT SUPPORTED.|
|`amplitude.optOut`|`config.optOut`|
|`amplitude.enableCoppaControl() or amplitude.disableCoppaControl()`|`config.enableCoppaControl`|
|Customize storage provider. NOT SUPPORTED.|`config.storageProvider`|
|Set up log level. NOT SUPPORTED.|`config.logLevel`|
|Customize logger provider. NOT SUPPORTED.|`config.loggerProvider`|
|Overwrite the minimum length deviceId and userId. NOT SUPPORTED.|`config.minIdLength`|
|Partner Id for partner integrations. NOT SUPPORTED.|`config.partnerId`|
|The event callback. NOT SUPPORTED. See middleware. |`config.callback`|
|`amplitude.libraryName`|NOT SUPPORTED.|
|`amplitude.libraryVersion`|NOT SUPPORTED.|
|`amplitude.adSupportBlock`|NOT SUPPORTED. See [Plugins](#plugins).|
|`amplitude.useAdvertisingIdForDeviceId`|NOT SUPPORTED. See [Plugins](#plugins).|
|`amplitude.locationInfoBlock`|`amplitude.locationInfoBlock`|
|`amplitude.deferCheckInForeground`|NOT SUPPORTED.|
|`amplitude.setOffline(Yes)`|NOT SUPPORTED.|
|`amplitude.setContentTypeHeader("YOUR-CONTENT-TYPE-HEADER")`|NOT SUPPORTED.| 
|`amplitude.setPlan(plan)`|`config.plan`|
|`plan.setBranch("YOUR-BRANCH")`|`config.plan.branch`|
|`plan.setSource("YOUR-SOURCE")`|`config.plan.source`|
|`plan.setVersion("YOUR-VERSION")`|`config.plan.version`|
|`plan.setVersionId("YOUR-VERSION-ID")`|`config.plan.versionId`|
|`amplitude.setTrackingOptions(options)`|`config.trackingOptions`|

### Tracking events

The maintenance iOS SDK offered a variety of `logEvent` APIs with `withEventProperties`, `withApiProperties`, `withUserProperties`, `withGroup`, `withGroupProperties`, `withTimestamp`, `outOfSession`, to override specific properties in the event payload. Amplitude has simplified all these variations into a unified `track` API.

#### `logEvent()`

The `logEvent()` API maps to `track()`.

=== "Amplitude-iOS"

    ```swift
    let eventType = "Button Clicked"
    let eventProperties: [String: Any] = ["key": "value"]

    Amplitude.instance().logEvent(
      eventType, 
      withEventProperties: eventProperties)
    ```

=== "Amplitude-Swift"

    ```swift
    let eventType = "Button Clicked"
    let event = BaseEvent(
      eventType: eventType, 
      eventProperties:[
        "integer": 1,
        "string": "stringValue",
        "array": [1, 2, 3],
    ])
    amplitude.track(event)
    ```

#### `logEvent withTimestamp`

The `logEvent()` API maps to `track()`.

=== "Amplitude-iOS"

    ```swift
    let eventType = "Button Clicked"
    let timestamp = Int64(NSDate().timeIntervalSince1970 * 1000)
    Amplitude.instance().logEvent(
      eventType,
      withTimestamp: timestamp)
    ```

=== "Amplitude-Swift"

    ```swift
    let eventType = "Button Clicked"
    let timestamp = Int64(NSDate().timeIntervalSince1970 * 1000)
    let event = BaseEvent(
      eventType: eventType,
      timestamp: timestamp)
    amplitude.track(event: event)
      
    amplitude.track(event)
    ```

#### `logEvent withGroup`

The `logEvent()` API maps to `track()`.

=== "Amplitude-iOS"

    ```swift
    let eventType = "Button Clicked"
    let eventProperties: [String: Any] = ["key": "value"]
    let groups: [String: Any] = ["orgId": 10]

    Amplitude.instance().logEvent(
        eventType,
        withEventProperties: eventProperties,
        withGroups: groups)
    ```

=== "Amplitude-Swift"

    ```swift
    let eventType = "Button Clicked"
    let groups: [String: Any] = ["orgId": 10]
    let event = BaseEvent(
      eventType: eventType, 
      eventProperties:[
        "integer": 1,
        "string": "stringValue",
        "array": [1, 2, 3],
      ], 
      groups: groups)
      
    amplitude.track(event)
    ```

#### `uploadEvents()`

The `uploadEvents()` API maps to `flush()`.

=== "Amplitude-iOS"

    ```swift
    Amplitude.instance().uploadEvents()
    ```

=== "Amplitude-Swift"

    ```swift
    amplitude.flush()
    ```

### Set user properties

The APIs for setting user properties are the same, except for the removal of `instance()`. Here are code snippets to migrate APIs for user properties.

#### `setUserId()`

Setting a user ID can be invoked on `amplitude` without calling `getInstance()`.

=== "Amplitude-iOS"

    ```swift
    let userId = "TEST-USER-ID"
    Amplitude.instance().setUserId(userId)
    ```

=== "Amplitude-Swift"

    ```swift
    let userId = "TEST-USER-NAME"
    amplitude.setUserId(userId: userId)
    ```

#### `setDeviceId()`

Set a device ID on `amplitude` without calling `instance()`.

=== "Amplitude-iOS"

    ```swift
    let deviceId = "TEST-DEVICE-ID"
    Amplitude.instance().setDeviceId(deviceId)
    ```

=== "Amplitude-Swift"

    ```swift
    let deviceId = "TEST-DEVICE-ID"
    amplitude.setDeviceId(deviceId: deviceId)
    ```

#### `setSessionId()`

Set a session ID on `amplitude` without calling `instance()`.

=== "Amplitude-iOS"

    ```swift
    let timestamp = Int64(NSDate().timeIntervalSince1970 * 1000)
    Amplitude.instance().setSessionId(timestamp)
    ```

=== "Amplitude-Swift"

    ```swift
    let timestamp = Int64(NSDate().timeIntervalSince1970 * 1000)
    amplitude.setSessionId(sessionId: timestamp)
    ```

#### `clearUserProperties()`

The `clearUserProperties` API has been removed, but you can now use the unified `identify` API to remove user properties. 

=== "Amplitude-iOS"

    ```swift
    Amplitude.instance().clearUserProperties()
    ```

=== "Amplitude-Swift"

    ```swift
    let identify = Identify()
    identify.clearAll()
    amplitude.identify(
      identify: identify
    )
    ```

#### `setUserProperties()`

The `setUserProperties` API has been removed, but you can now use the unified `identify` API to add user properties. 

=== "Amplitude-iOS"

    ```swift
    Amplitude.instance().setUserProperties([
      "membership": "paid",
      "payment": "bank",
    ])
    ```

=== "Amplitude-Swift"

    ```swift
    let identify = Identify()
    identify
      .set(property: "membership", value: "paid")
      .set(property: "payment", value: "bank")
    amplitude.identify(identify: identify)
    ```

#### `identify()`

You can now make an identify call on `amplitude` without calling `instance()`.

=== "Amplitude-iOS"

    ```swift
    let identify = AMPIdentify()
    identify.set("membership", value: "paid")
    Amplitude.instance().identify(identify)
    ```

=== "Amplitude-Swift"

    ```swift
    let identify = Identify()
    identify.set(property: "membership", value: "paid")
    amplitude.identify(identify: identify)
    ```

### Set group properties

### `groupIdentify()`

You can now make an identify call on `amplitude` without calling `instance()`.

=== "Amplitude-iOS"

    ```swift
    let identify = AMPIdentify()
    identify.set("membership", value: "paid")
    Amplitude.instance().groupIdentify(
      withGroupType: "TEST-GROUP-TYPE", 
      groupName: "TEST-GROUP-NAME", 
      groupIdentify: identify
    )
    ```

=== "Amplitude-Swift"

    ```swift
    let identify = Identify()
    identify.set(property: "membership", value: "paid")
    amplitude.groupIdentify(
      groupType: "TEST-GROUP-TYPE", 
      groupName: "TEST-GROUP-NAME", 
      identify: identify
    )
    ```

### Tracking revenue

#### `logRevenueV2()`

Track revenue using `revenue()` API on `amplitude` without calling `instance()`.

=== "Amplitude-iOS"

    ```swift
      let revenue = AMPRevenue()
      revenue.setProductIdentifier("productIdentifier")
      revenue.setQuantity(3)
      revenue.setPrice(NSNumber(value: 3.99))

      Amplitude.instance().logRevenueV2(revenue)
    ```

=== "Amplitude-Swift"

    ```swift
    let revenue = Revenue()
    revenue.productId = "123"
    revenue1.price = 12
            
    amplitude.revenue(revenue: revenue)
    ```

### Patterns

#### Plugins

The configs `amplitude.adSupportBlock` or `amplitude.useAdvertisingIdForDeviceId` were available in `Amplitude-iOS` to allow you to use IDFV or IDFA as the deviceID. Although `Amplitude-Swift` doesn't support these configurations, you can add plugins to the new iOS SDK to enrich event payloads.

=== "Amplitude-Swift"

    ```swift
    import AdSupport
    import Amplitude_Swift
    import AppTrackingTransparency
    import Foundation
    import SwiftUI

    /// Plugin to collect IDFA values.  Users will be prompted if authorization status is undetermined.
    /// Upon completion of user entry a track event is issued showing the choice user made.
    ///
    /// Don't forget to add "NSUserTrackingUsageDescription" with a description to your Info.plist.
    class IDFACollectionPlugin: Plugin {
        let type = PluginType.enrichment
        weak var amplitude: Amplitude? = nil

        func execute(event: BaseEvent?) -> BaseEvent? {
            let status = ATTrackingManager.trackingAuthorizationStatus
            var idfa = fallbackValue
            if status == .authorized {
                idfa = ASIdentifierManager.shared().advertisingIdentifier.uuidString
            }

            let workingEvent = event
            // The idfa on simulator is always 00000000-0000-0000-0000-000000000000
            event?.idfa = idfa
            // If you want to use idfa for the device_id
            event?.deviceId = idfa
            return workingEvent
        }
    }

    extension IDFACollectionPlugin {
        var fallbackValue: String? {
            // fallback to the IDFV value.
            // this is also sent in event.context.device.id,
            // feel free to use a value that is more useful to you.
            return UIDevice.current.identifierForVendor?.uuidString
        }
    }
    ```

To install your custom plugin, use `add()` with your custom plugin as parameter.

=== "Amplitude-Swift"

    ```swift
    amplitude.add(plugin: IDFACollectionPlugin())
    ```

#### Callback

`Amplitude-Swft` supports configuration-level and event-level callback functions which are called for success and error upload. Configuration-level callback applies for every success and error event upload. Event-level callback is specific for one Event. Notice that the event-level callbacks are stored in cache, those callbacks are lost if the app crashes.

=== "Amplitude-Swift"

    Configuration-level callbacks:

    ```swift
    let amplitude = Amplitude(
        configuration: Configuration(
            apiKey: "TEST-API-KEY",
            callback: { (event: BaseEvent, code: Int, message: String) -> Void in
                print("eventcallback: \(event), code: \(code), message: \(message)")
            },
        )
    )
    ```

    Event-level callbacks:

    ```swift
    let event = BaseEvent(
      callback: { (event: BaseEvent, code: Int, message: String) -> Void in
          print("eventcallback: \(event), code: \(code), message: \(message)")
      }, 
      eventType: "TEST-EVENT-TYPE")
      
    amplitude.track(event: event)
    ```

    or 

    ```swift
    let event2 = BaseEvent(eventType:"test")
    
    amplitude.track(
      event: event2, 
      callback: { (event: BaseEvent, code: Int, message: String) -> Void in
          print("eventcallback: \(event), code: \(code), message: \(message)")
    })
    ```

--8<-- "includes/abbreviations.md"
