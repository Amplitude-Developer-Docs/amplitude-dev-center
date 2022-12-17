---
title: iOS SDK
description: The Amplitude iOS SDK installation and quick start guide. 
icon: simple/ios
---


![CocoaPods](https://img.shields.io/cocoapods/v/Amplitude)

This is the official documentation for the Amplitude Analytics iOS SDK.

!!!info "iOS Swift SDK Resources (Beta)"
    [:material-github: GitHub](https://github.com/amplitude/Amplitude-iOS) · [:material-code-tags-check: Releases](https://github.com/amplitude/Amplitude-iOS/releases) · [:material-book: API Reference](http://amplitude.github.io/Amplitude-iOS)

--8<-- "includes/no-ampli.md"
    To use Ampli see the [non-Beta SDK](../../sdks/ios/) and [Ampli Wrapper](../../sdks/ios/ampli/) instead.

## Getting started

### Install

To get started with using Browser SDK, install the package in your project via CocoaPods, Swift Package Manager or Carthage.

=== "CocoaPods"

    1. Add dependency to `Podfile`.

        ```bash
        pod 'AmplitudeSwift', '~> 0.0.0'
        ```

    2. Run `pod install` in the project directory to download dependency.

=== "Swift Package Manager"

    1. Navigate to `File` > `Swift Package Manager` > `Add Package Dependency`.
    2. Enter `https://github.com/amplitude/Amplitude-Swift` into the search bar.
    3. It automatically resolves to the latest version.

    The Amplitude-Swift package appears as a dependency after it's added.

=== "Carthage"

    Add the following line to your `Cartfile`.
      
    ```bash
    github "amplitude/Amplitude-Swift" ~> 0.0.1
    ```


### Initialization

Before you can instrument, you must initialize the SDK using the API key for your Amplitude project. You can use the iOS SDK anywhere after it's initialized in an Android application.

```swift
import Amplitude_Swift

static let amplitude = Amplitude(configuration: Configuration(apiKey: "YOUR-API-KEY",
                                logLevel: LogLevelEnum.DEBUG,
                                trackingOptions: TrackingOptions().disableCarrier().disableTrackDMA(),
                                flushEventsOnClose: true,
                                minTimeBetweenSessionsMillis: 100000))
```

#### EU data residency

You can configure the server zone when initializing the client for sending data to Amplitude's EU servers. The SDK sends data based on the server zone if it's set.

!!!note
    For EU data residency, the project must be set up inside Amplitude EU. You must initialize the SDK with the API key from Amplitude EU.

```swift
import Amplitude_Swift
    
let amplitude = Amplitude(
    Configuration(
        apiKey: "YOUR-API-KEY",
        serverZone: ServerZone.EU
    )
)
```

## Usage

### `track`

Events represent how users interact with your application. For example, "Button Clicked" may be an action you want to note.

```swift
let event = BaseEvent(eventType: "Button Clicked", 
                      eventProperties: {"my event prop key": "my event prop value"})
amplitude.track(event: event)
```

### `identify`

Identify is for setting the user properties of a particular user without sending any event. The SDK supports the operations `set`, `setOnce`, `unset`, `add`, `append`, `prepend`, `preInsert`, `postInsert`, and `remove` on individual user properties. Declare the operations via a provided Identify interface. You can chain together multiple operations in a single Identify object. The Identify object is then passed to the Amplitude client to send to the server.

!!!note

    If the Identify call is sent after the event, the results of operations will be visible immediately in the dashboard user's profile area, but it will not appear in chart result until another event is sent after the Identify call. So the identify call only affects events going forward. More details [here](https://amplitude.zendesk.com/hc/en-us/articles/115002380567-User-Properties-Event-Properties#applying-user-properties-to-events).

You can handle the identity of a user using the identify methods. Proper use of these methods can connect events to the correct user as they move across devices, browsers, and other platforms. Send an identify call containing those user property operations to Amplitude server to tie a user's events with specific user properties.

```swift
let identify = Identify()
identify.set(property: "color", value: "green")
amplitude.identify(identify: identify)
```

### User groups

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

--8<-- "includes/groups-intro-paragraph.md"

For example, if Joe is in 'orgId' '10' and '16', then the `groupName` would be '[10, 16]'). Here is what your code might look like:

```swift
amplitude.setGroup(groupType: "orgId", groupName: "15")
amplitude.setGroup(groupType: "sport", groupName: ["tennis", "soccer"])
```

### Group identify

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

--8<-- "includes/group-identify-considerations.md"

```swift
let groupType = "plan"
let groupName = "enterprise"
let identify = Identify().set(property: "key", value: "value")
amplitude.groupIdentify(groupType: groupType, groupName: groupProperty, identify: groupIdentify)
```

### Track revenue

Amplitude can track revenue generated by a user. Revenue is tracked through distinct revenue objects, which have special fields that are used in Amplitude's Event Segmentation and Revenue LTV charts. This allows Amplitude to automatically display data relevant to revenue in the platform. Revenue objects support the following special properties, as well as user-defined properties through the `eventProperties` field.

```swift
let revenue = Revenue()
revenue.price = 3.99
revenue.quantity = 3
revenue.productId = "com.company.productId"
amplitude.revenue(revenue: revenue)
```

| <div class="big-column">Name</div>   | Description  |
| --- | --- |
| `productId` | Optional. String. An identifier for the product. Amplitude recommends something like the Google Play Store product ID. Defaults to `null`.|
| `quantity `| Required. Integer. The quantity of products purchased. Note: revenue = quantity * price. Defaults to 1 |
| `price `| Required. Double. The price of the products purchased, and this can be negative. Note: revenue = quantity * price. Defaults to `null`.|
| `revenueType`| Optional, but required for revenue verification. String. The revenue type (for example, tax, refund, income). Defaults to `null`.|
| `receipt`| Optional. String. The receipt identifier of the revenue. For example, "123456". Defaults to `null`. |
| `receiptSignature`| Optional, but required for revenue verification. String. Defaults to `null`. |

### Custom user ID

If your app has its own login system that you want to track users with, you can call `setUserId` at any time.

```swift
amplitude.setUserId(userId: "user@amplitude.com")
```

### Custom device ID

If your app has its own login system that you want to track users with, you can call `setUserId` at any time.

You can assign a new device ID using `deviceId`. When setting a custom device ID, make sure the value is sufficiently unique. Amplitude recommends using a UUID.

```swift
amplitude.setDeviceId(NSUUID().uuidString)
```

### Reset when user logs out

`reset` is a shortcut to anonymize users after they log out, by:

- setting `userId` to `null`
- setting `deviceId` to a new value based on current configuration

With an empty `userId` and a completely new `deviceId`, the current user would appear as a brand new user in dashboard.

```swift
amplitude.reset()
```

lasjdkflksdjflajdsfllasdjflksdjalfks

## Amplitude SDK plugin

Plugins allow you to extend Amplitude SDK's behavior by, for example, modifying event properties (enrichment type) or sending to a third-party APIs (destination type). A plugin is an object with methods `setup()` and `execute()`.

### Plugin.setup

This method contains logic for preparing the plugin for use and has `amplitude` instance as a parameter. The expected return value is `null`. A typical use for this method, is to instantiate plugin dependencies. This method is called when the plugin is registered to the client via `amplitude.add()`.

### Plugin.execute

This method contains the logic for processing events and has `event` instance as parameter. If used as enrichment type plugin, the expected return value is the modified/enriched event. If used as a destination type plugin, the expected return value is `null`. This method is called for each event, including Identify, GroupIdentify and Revenue events, that's instrumented using the client interface.

### Plugin examples

#### Enrichment type plugin

Here's an example of a plugin that modifies each event that's instrumented by adding extra event property.

```swift
class EnrichmentPlugin: Plugin {
    let type: PluginType
    var amplitude: Amplitude?

    init() {
        self.type = PluginType.enrichment
    }

    func setup(amplitude: Amplitude) {
        self.amplitude = amplitude
    }

    func execute(event: BaseEvent?) -> BaseEvent? {
        event?.sessionId = -1
        if event?.eventProperties == nil {
            event?.eventProperties = [:]
        }
        event?.eventProperties?["event prop key"] = "event prop value"
        return event
    }
}

amplitude.add(plugin: EnrichmentPlugin());
```

#### Destination type plugin

In destination plugin, you are able to overwrite the track(), identify(), groupIdentify(), revenue(), flush() functions.

```swift
public class TestDestinationPlugin: DestinationPlugin {
    public var amplitude: Amplitude?
    public let type: PluginType = .destination

    public func track(event: BaseEvent) -> BaseEvent? {
        return event
    }

    public func identify(event: IdentifyEvent) -> IdentifyEvent? {
        return event
    }

    public func groupIdentify(event: GroupIdentifyEvent) -> GroupIdentifyEvent? {
        return event
    }

    public func revenue(event: RevenueEvent) -> RevenueEvent? {
        return event
    }

    public func flush() {
    }

    public func setup(amplitude: Amplitude) {
        self.amplitude = amplitude
    }

    public func execute(event: BaseEvent?) -> BaseEvent? {
        return event
    }
}
```

## Advanced topics

### User sessions

A session on iOS is a period of time that a user has the app in the foreground.

Amplitude groups events together by session. Events that are logged within the same session have the same `session_id`. Sessions are handled automatically so you don't have to manually call `startSession()` or `endSession()`.

You can adjust the time window for which sessions are extended. The default session expiration time is 30 minutes.

    ```swift
    let amplitude = Amplitude(configuration: Configuration(apiKey: "YOUR-API-KEY",
                          minTimeBetweenSessionsMillis: 1000))
    ```

By default, Amplitude automatically sends the '[Amplitude] Start Session' and '[Amplitude] End Session' events. Even though these events aren't sent, sessions are still tracked by using `session_id`.
You can also disable those session events.

    ```swift
    let amplitude = Amplitude(configuration: Configuration(apiKey: "YOUR-API-KEY",
                         trackingSessionEvents: false))
    ```

You can use the helper method `getSessionId` to get the value of the current `sessionId`.

    ```swift
    let sessionId = amplitude.getSessionId();
    ```

You can define your own session expiration time. The default session expiration time is 30 minutes.

    ```swift
    let amplitude = Amplitude(configuration: Configuration(apiKey: "YOUR-API-KEY",
                            minTimeBetweenSessionsMillis: 100000))
    ```

### Set custom user ID

If your app has its own login system that you want to track users with, you can call `setUserId` at any time.

    ```swift
    amplitude.setUserId(userId: "USER_ID")
    ```

Don't assign users a user ID that could change, because each unique user ID is a unique user in Amplitude. Learn more about how Amplitude tracks unique users in the [Help Center](https://help.amplitude.com/hc/en-us/articles/115003135607-Track-unique-users-in-Amplitude).

### Log level

You can control the level of logs that print to the developer console.

- 'INFO': Shows informative messages about events.
- 'WARN': Shows error messages and warnings. This level logs issues that might be a problem and cause some oddities in the data. For example, this level would display a warning for properties with null values.
- 'ERROR': Shows error messages only.
- 'DISABLE': Suppresses all log messages.
- 'DEBUG': Shows error messages, warnings, and informative messages that may be useful for debugging.

Set the log level by calling `setLogLevel` with the level you want.

    ```swift
    ```

### Logged out and anonymous users

--8<-- "includes/logged-out-and-anonymous-users.md"

    ```swift
    amplitude.reset();
    ```

### Disable tracking

By default the Android SDK tracks several user properties such as `carrier`, `city`, `country`, `ip_address`, `language`, and `platform`.
Use the provided `TrackingOptions` interface to customize and toggle individual fields.
Before initializing the SDK with your apiKey, create a `TrackingOptions` instance with your configuration and set it on the SDK instance.

    ```swift
    let trackingOptions = TrackingOptions()
    trackingOptions.disableCity().disableIpAddress().disableLatLng()
    let amplitude = Amplitude(configuration: Configuration(apiKey: "YOUR-API-KEY",
                                trackingOptions: trackingOptions))
    ```

Tracking for each field can be individually controlled, and has a corresponding method (for example, `disableCountry`, `disableLanguage`).

| <div class="big-column">Method</div> | Description |
| --- | --- |
| `disableAdid()` | Disable tracking of Google ADID |
| `disableCarrier()` | Disable tracking of device's carrier |
| `disableCity()` | Disable tracking of user's city |
| `disableCountry()` | Disable tracking of user's country |
| `disableDeviceBrand()` | Disable tracking of device brand |
| `disableDeviceModel()` | Disable tracking of device model |
| `disableDma()` | Disable tracking of user's designated market area (DMA). |
| `disableIpAddress()` | Disable tracking of user's IP address |
| `disableLanguage()` | Disable tracking of device's language |
| `disableLatLng()` | Disable tracking of user's current latitude and longitude coordinates |
| `disableOsName()` | Disable tracking of device's OS Name |
| `disableOsVersion()` | Disable tracking of device's OS Version |
| `disablePlatform()` | Disable tracking of device's platform |
| `disableRegion()` | Disable tracking of user's region. |
| `disableVersionName()` | Disable tracking of your app's version name |

!!!note

    Using `TrackingOptions` only prevents default properties from being tracked on newly created projects, where data has not yet been sent. If you have a project with existing data that you want to stop collecting the default properties for, get help in the [Amplitude Community](https://community.amplitude.com/). Disabling tracking doesn't delete any existing data in your project.

### Carrier 


### COPPA control

COPPA (Children's Online Privacy Protection Act) restrictions on IDFA, IDFV, city, IP address and location tracking can all be enabled or disabled at one time. Apps that ask for information from children under 13 years of age must comply with COPPA.

    ```swift
    let amplitude = Amplitude(configuration: Configuration(apiKey: "YOUR-API-KEY",
                             enableCoppaControl: true))
    ```

### Advertiser ID

### Location tracking

Amplitude converts the IP of a user event into a location (GeoIP lookup) by default. This information may be overridden by an app's own tracking solution or user data.

By default, Amplitude can use Android location service (if available) to add the specific coordinates (longitude and latitude) for the location from which an event is logged. Control this behavior by enable / disable location listening during the initialization.


### Opt users out of tracking

Users may wish to opt out of tracking entirely, which means Amplitude doesn't track any of their events or browsing history. `OptOut` provides a way to fulfill a user's requests for privacy.

    ```swift
    let amplitude = Amplitude(configuration: Configuration(apiKey: "YOUR-API-KEY",
                             optOut: true))
    ```

### Set log callback

Implements a customized `loggerProvider` class from the LoggerProvider, and pass it in the configuration during the initialization to help with collecting any error messages from the SDK in a production environment.

    ```swift
    ```

### More resources

If you have any problems or issues with the SDK, [create a GitHub issue](https://github.com/amplitude/Amplitude-iOS/issues/new) or submit a request on [Amplitude Help](https://help.amplitude.com/hc/en-us/requests/new).

--8<-- "includes/abbreviations.md"
