---
title: Android Kotlin SDK
description: The Amplitude Android Kotlin SDK installation and quick start guide.
icon: simple/android
search:
  boost: 2
---

![Maven Central](https://img.shields.io/maven-central/v/com.amplitude/analytics-android.svg?label=Maven%20Central)

The Kotlin Android SDK lets you send events to Amplitude. This library is open-source, check it out on [GitHub](https://github.com/amplitude/Amplitude-Kotlin).

!!!info "Android SDK Resources"
    [:material-github: GitHub](https://github.com/amplitude/Amplitude-Kotlin) · [:material-code-tags-check: Releases](https://github.com/amplitude/Amplitude-Kotlin/releases) · [:material-book: API Reference](https://amplitude.github.io/Amplitude-Kotlin)

--8<-- "includes/ampli-vs-amplitude.md"
    Click here for more documentation on [Ampli for Android](./ampli.md).

## Getting started

Use [this quickstart guide](../../sdks/sdk-quickstart#android) to get started with Amplitude Android Kotlin SDK.

## Usage

### Configuration

???config "Configuration Options"
    | <div class="big-column">Name</div>  | Description | Default Value |
    | --- | --- | --- |
    | `flushIntervalMillis` | `Int`. The amount of time SDK will attempt to upload the unsent events to the server or reach `flushQueueSize` threshold. The value is in milliseconds. | `30000` |
    | `flushQueueSize` | `Int`. SDK will attempt to upload once unsent event count exceeds the event upload threshold or reach `flushIntervalMillis` interval.  | `30` |
    | `flushMaxRetries` | `Int`. Maximum retry times.  | `5` |
    | `minIdLength` | `Int`. The minimum length for user id or device id. | `5` |
    | `partnerId` | `Int`. The partner id for partner integration. | `null` |
    | `identifyBatchIntervalMillis` | `Long`. The amount of time SDK will attempt to batch intercepted identify events. The value is in milliseconds| `30000` |
    | `flushEventsOnClose` | `Boolean`. Flushing of unsent events on app close. | `true` |
    | `callback` | `EventCallBack`. Callback function after event sent. | `null` |
    | `optOut` | `Boolean`. Opt the user out of tracking. | `false` |
    | `trackingSessionEvents` | `Boolean`. Automatic tracking of "Start Session" and "End Session" events that count toward event volume. | `false` |
    | `minTimeBetweenSessionsMillis` | `Long`. The amount of time for session timeout. The value is in milliseconds. | `300000` |
    | `serverUrl` | `String`. The server url events upload to. | `https://api2.amplitude.com/2/httpapi` |
    | `serverZone` | `ServerZone.US` or `ServerZone.EU`. The server zone to send to, will adjust server url based on this config. | `ServerZone.US` |
    | `useBatch` | `Boolean` Whether to use batch api. | `false` |
    | `useAdvertisingIdForDeviceId` | `Boolean`. Whether to use advertising id as device id. Please check [here](../android-kotlin/#advertiser-id) for required module and permission. | `false` |
    | `useAppSetIdForDeviceId` | `Boolean`.  Whether to use app set id as device id. Please check [here](../android-kotlin/#app-set-id) for required module and permission. | `false` |
    | `trackingOptions` | `TrackingOptions`. Options to control the values tracked in SDK. | `enable` |
    | `enableCoppaControl` | `Boolean`. Whether to enable COPPA control for tracking options. | `false` |
    | `instanceName` | `String`. The name of the instance. Instances with the same name will share storage and identity. For isolated storage and identity use a unique `instanceName` for each instance.  | `$default_instance`|
    | `migrateLegacyData` | `Boolean`. Available in `1.9.0`+. Whether to migrate [maintenance Android SDK](../android) data (events, user/device ID). Learn more [here](https://github.com/amplitude/Amplitude-Kotlin/blob/main/android/src/main/java/com/amplitude/android/migration/RemnantDataMigration.kt#L9-L16). | `false`|

--8<-- "includes/sdk-ts/shared-batch-configuration.md"

=== "Kotlin"

    ```kotlin
    import com.amplitude.android.Amplitude

    val amplitude = Amplitude(
        Configuration(
            apiKey = AMPLITUDE_API_KEY,
            context = applicationContext,
            flushIntervalMillis = 50000,
            flushQueueSize = 20,
        )
    )
    ```

=== "Java"

    ```java 
    import com.amplitude.android.Amplitude;

    Configuration configuration = new Configuration(API_KEY, getApplicationContext());
    configuration.setFlushIntervalMillis(1000);
    configuration.setFlushQueueSize(10);

    Amplitude amplitude = new Amplitude(configuration);
    ```

--8<-- "includes/sdk-quickstart/quickstart-eu-data-residency.md"

=== "Kotlin"

    ```kotlin
    import com.amplitude.android.Amplitude

    val amplitude = Amplitude(
        Configuration(
            apiKey = API_KEY,
            context = applicationContext,
            serverZone = ServerZone.EU
        )
    )
    ```

=== "Java"

    ```java
    import com.amplitude.android.Amplitude;

    Configuration configuration = new Configuration("API_KEY", getApplicationContext());
    configuration.setServerZone(ServerZone.EU);

    Amplitude amplitude = new Amplitude(configuration);
    ```

### track

Events represent how users interact with your application. For example, "Song Played" may be an action you want to note.

```kotlin
amplitude.track("Song Played")
```

You can also optionally include event properties.

```kotlin
amplitude.track(
    "Song Played",
    mutableMapOf<String, Any?>("title" to "Happy Birthday")
)
```

For more complex events you can [create and track a `BaseEvent` object](https://github.com/amplitude/Amplitude-Kotlin/blob/8c3c39ce1f79485a0ce716bbf01de464a9afe9a8/core/src/main/java/com/amplitude/core/Amplitude.kt#L112).

```kotlin
var event = BaseEvent()
event.eventType = "Song Played"
event.eventProperties = mutableMapOf<String, Any?>("title" to "Happy Birthday")
event.groups = mutableMapOf<String, Any?>("test-group-type" to "test-group-value")
event.insertId = 1234
amplitude.track(event)
```

### identify

Identify is for setting the user properties of a particular user without sending any event. The SDK supports the operations `set`, `setOnce`, `unset`, `add`, `append`, `prepend`, `preInsert`, `postInsert`, and `remove` on individual user properties. Declare the operations via a provided Identify interface. You can chain together multiple operations in a single Identify object. The Identify object is then passed to the Amplitude client to send to the server.
Starting from release v1.7.0, identify events with only set operations will be batched and sent with fewer events. This change won't affect running the set operations. There is a config `identifyBatchIntervalMillis` managing the interval to flush the batched identify intercepts.

!!!note

    If the Identify call is sent after the event, the results of operations will be visible immediately in the dashboard user's profile area, but it will not appear in chart result until another event is sent after the Identify call. So the identify call only affects events going forward. More details [here](https://amplitude.zendesk.com/hc/en-us/articles/115002380567-User-Properties-Event-Properties#applying-user-properties-to-events).

You can handle the identity of a user using the identify methods. Proper use of these methods can connect events to the correct user as they move across devices, browsers, and other platforms. Send an identify call containing those user property operations to Amplitude server to tie a user's events with specific user properties.

```kotlin
val identify = Identify()
identify.set("color", "green")
amplitude.identify(identify)

```

### User groups

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

--8<-- "includes/groups-intro-paragraph.md"

!!! example
    If Joe is in 'orgId' '15', then the `groupName` would be '15'.

    ```kotlin
    // set group with a single group name
    amplitude.setGroup("orgId", "15");
    ```

    If Joe is in 'sport' 'tennis' and 'soccer', then the `groupName` would be '["tennis", "soccer"]'.

    ```kotlin
    // set group with multiple group names
    amplitude.setGroup("sport", arrayOf("tennis", "soccer"))
    ```

--8<-- "includes/event-level-groups-intro.md"

```kotlin
val event = BaseEvent()
event.eventType = "event type"
event.eventProperties = mutableMapOf("event property" to "event property value")
event.groups = mutableMapOf("orgId" to "15")
amplitude.track(event)
```

### Group identify

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

--8<-- "includes/group-identify-considerations.md"

```kotlin
val groupType = "plan"
val groupName = "enterprise"

val identify = Identify().set("key", "value")
amplitude.groupIdentify(groupType, groupName, identify)
```

### Track revenue

Amplitude can track revenue generated by a user. Revenue is tracked through distinct revenue objects, which have special fields that are used in Amplitude's Event Segmentation and Revenue LTV charts. This allows Amplitude to automatically display data relevant to revenue in the platform. Revenue objects support the following special properties, as well as user-defined properties through the `eventProperties` field.

```kotlin
val revenue = Revenue()
revenue.productId = "com.company.productId"
revenue.price = 3.99
revenue.quantity = 3
amplitude.revenue(revenue)
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

```kotlin
amplitude.setUserId("user@amplitude.com")
```

### Custom device ID

You can assign a new device ID using `deviceId`. When setting a custom device ID, make sure the value is sufficiently unique. Amplitude recommends using a UUID.

```kotlin
import java.util.UUID

amplitude.setDeviceId(UUID.randomUUID().toString())
```

### Reset when user logs out

`reset` is a shortcut to anonymize users after they log out, by:

- setting `userId` to `null`
- setting `deviceId` to a new value based on current configuration

With an empty `userId` and a completely new `deviceId`, the current user would appear as a brand new user in dashboard.

```kotlin
amplitude.reset()
```

## Amplitude SDK plugin

Plugins allow you to extend Amplitude SDK's behavior by, for example, modifying event properties (enrichment type) or sending to a third-party APIs (destination type). A plugin is an object with methods `setup()` and `execute()`.

### Plugin.setup

This method contains logic for preparing the plugin for use and has `amplitude` instance as a parameter. The expected return value is `null`. A typical use for this method, is to instantiate plugin dependencies. This method is called when the plugin is registered to the client via `amplitude.add()`.

### Plugin.execute

This method contains the logic for processing events and has `event` instance as parameter. If used as enrichment type plugin, the expected return value is the modified/enriched event. If used as a destination type plugin, the expected return value is a map with keys: `event` (BaseEvent), `code` (number), and `message` (string). This method is called for each event, including Identify, GroupIdentify and Revenue events, that's instrumented using the client interface.

### Plugin examples

#### Enrichment type plugin

Here's an example of a plugin that modifies each event that's instrumented by adding extra event property.

```java

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.amplitude.core.Amplitude;
import com.amplitude.core.events.BaseEvent;
import com.amplitude.core.platform.Plugin;

import java.util.HashMap;

public class EnrichmentPlugin implements Plugin {
    public Amplitude amplitude;
    @NonNull
    @Override
    public Amplitude getAmplitude() {
        return this.amplitude;
    }

    @Override
    public void setAmplitude(@NonNull Amplitude amplitude) {
        this.amplitude = amplitude;
    }

    @NonNull
    @Override
    public Type getType() {
        return Type.Enrichment;
    }

    @Nullable
    @Override
    public BaseEvent execute(@NonNull BaseEvent baseEvent) {
        if (baseEvent.getEventProperties() == null) {
            baseEvent.setEventProperties(new HashMap<String, Object>());
        }
        baseEvent.getEventProperties().put("custom android event property", "test");
        return baseEvent;
    }

    @Override
    public void setup(@NonNull Amplitude amplitude) {
        this.amplitude = amplitude;
    }
}

amplitude.add(new EnrichmentPlugin());
```

#### Destination type plugin

In destination plugin, you are able to overwrite the track(), identify(), groupIdentify(), revenue(), flush() functions.

```java
import com.amplitude.core.Amplitude;
import com.amplitude.core.events.BaseEvent;
import com.amplitude.core.platform.DestinationPlugin;
import com.segment.analytics.Analytics;
import com.segment.analytics.Properties;

public class SegmentDestinationPlugin extends DestinationPlugin {
    android.content.Context context;
    Analytics analytics;
    String writeKey;
    public SegmentDestinationPlugin(android.content.Context appContext, String writeKey) {
        this.context = appContext;
        this.writeKey = writeKey;
    }
    @Override
     public void setup(Amplitude amplitude) {
        super.setup(amplitude);
        analytics = new Analytics.Builder(this.context, this.writeKey)
                .build();

        Analytics.setSingletonInstance(analytics);
    }

    @Override
    public BaseEvent track(BaseEvent event) {
        Properties properties = new Properties();
        for (Map.Entry<String,Object> entry : event.getEventProperties().entrySet()) {
            properties.putValue(entry.getKey(),entry.getValue());
        }
        analytics.track(event.eventType, properties);
        return event;
    }
}

amplitude.add(
    new SegmentDestinationPlugin(this, SEGMENT_WRITE_KEY)
)
```

## Troubleshooting and Debugging

### Common Issues

Please refer to [this document](../../sdk-troubleshooting-and-debugging/) for additional common issues in general.

## Advanced topics

### User sessions

A session on Android is a period of time that a user has the app in the foreground.

Amplitude groups events together by session. Events that are logged within the same session have the same `session_id`. Sessions are handled automatically so you don't have to manually call `startSession()` or `endSession()`.

You can adjust the time window for which sessions are extended. The default session expiration time is 30 minutes.

=== "Kotlin"

    ```kotlin
    amplitude = Amplitude(
        Configuration(
            apiKey = API_KEY,
            context = applicationContext,
            minTimeBetweenSessionsMillis = 10000
        )
    )
    ```

=== "Java"

    ```java
    Configuration configuration = new Configuration(API_KEY, getApplicationContext());
    configuration.setMinTimeBetweenSessionsMillis(1000);

    Amplitude amplitude = new Amplitude(configuration);
    ```

By default, Amplitude automatically sends the '[Amplitude] Start Session' and '[Amplitude] End Session' events. Even though these events aren't sent, sessions are still tracked by using `session_id`.
You can also disable those session events.

=== "Kotlin"

    ```kotlin
    amplitude = Amplitude(
        Configuration(
            apiKey = API_KEY,
            context = applicationContext,
            trackingSessionEvents = false
        )
    )
    ```

=== "Java"

    ```
    amplitude = AmplitudeKt.Amplitude(API_KEY, getApplicationContext(), configuration -> {
        configuration.setTrackingSessionEvents(false);
        return Unit.INSTANCE;
    });
    ```

You can use the helper method `getSessionId` to get the value of the current `sessionId`.

=== "Kotlin"

    ```kotlin
    val sessionId = amplitude.sessionId;
    ```

=== "Java"

    ```java
    long sessionId = amplitude.getSessionId();
    ```

You can define your own session expiration time. The default session expiration time is 30 minutes.

=== "Kotlin"

    ```kotlin
    amplitude = Amplitude(
        Configuration(
            apiKey = API_KEY,
            context = applicationContext,
            minTimeBetweenSessionsMillis = 10000
        )
    )
    ```

=== "Java"

    ```java
    Configuration configuration = new Configuration(API_KEY, getApplicationContext());
    configuration.setMinTimeBetweenSessionsMillis(10000);

    Amplitude amplitude = new Amplitude(configuration);
    ```

### Set custom user ID

If your app has its own login system that you want to track users with, you can call `setUserId` at any time.

=== "Kotlin"

    ```kotlin
    amplitude.setUserId("USER_ID");
    ```

=== "Java"

    ```java
    amplitude.setUserId("USER_ID");
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

=== "Kotlin"

    ```kotlin
    amplitude.logger.logMode = Logger.LogMode.DEBUG
    ```

=== "Java"

    ```java
    amplitude.getLogger().setLogMode(Logger.LogMode.DEBUG);
    ```

### Logged out and anonymous users

--8<-- "includes/logged-out-and-anonymous-users.md"

=== "Kotlin"

    ```kotlin
    amplitude.reset()
    ```

=== "Java"

    ```java
    amplitude.reset();
    ```

### Disable tracking

By default the Android SDK tracks several user properties such as `carrier`, `city`, `country`, `ip_address`, `language`, and `platform`.
Use the provided `TrackingOptions` interface to customize and toggle individual fields.

To use the `TrackingOptions` interface, import the class.

=== "Kotlin"

    ```kotlin
    import com.amplitude.android.TrackingOptions
    ```

=== "Java"

    ```java
    import com.amplitude.android.TrackingOptions
    ```

Before initializing the SDK with your apiKey, create a `TrackingOptions` instance with your configuration and set it on the SDK instance.

=== "Kotlin"

    ```kotlin
    val trackingOptions = TrackingOptions()
    trackingOptions.disableCity().disableIpAddress().disableLatLng()
    amplitude = Amplitude(
        Configuration(
            apiKey = API_KEY,
            context = applicationContext,
            trackingOptions = trackingOptions
        )
    )
    ```

=== "Java"

    ```java
    TrackingOptions trackingOptions = new TrackingOptions();
    trackingOptions.disableCity().disableIpAddress().disableLatLng();

    // init instance
    amplitude = AmplitudeKt.Amplitude(API_KEY, getApplicationContext(), configuration -> {
        configuration.setTrackingOptions(trackingOptions);
        return Unit.INSTANCE;
    });
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

Amplitude determines the user's mobile carrier using [Android's TelephonyManager](https://developer.android.com/reference/kotlin/android/telephony/TelephonyManager#getnetworkoperatorname) `networkOperatorName`, which returns the current registered operator of the `tower`.  

### COPPA control

COPPA (Children's Online Privacy Protection Act) restrictions on IDFA, IDFV, city, IP address and location tracking can all be enabled or disabled at one time. Apps that ask for information from children under 13 years of age must comply with COPPA.

=== "Kotlin"

    ```kotlin
    amplitude = Amplitude(
        Configuration(
            apiKey = API_KEY,
            context = applicationContext,
            enableCoppaControl = true //Disables ADID, city, IP, and location tracking
        )
    )
    ```

=== "Java"

    ```java
    Configuration configuration = new Configuration(API_KEY, getApplicationContext());
    //Disables ADID, city, IP, and location tracking
    configuration.setEnableCoppaControl(true);

    Amplitude amplitude = new Amplitude(configuration);
    ```

### Advertiser ID

--8<-- "includes/sdk-android/android-sdk-advertiser-id.md"

#### Set advertising ID as device ID

After you set up the logic to fetch the advertising ID, you can enable `useAdvertisingIdForDeviceId` to use advertising id as the device ID.

=== "Kotlin"

    ```kotlin
    amplitude = Amplitude(
        Configuration(
            apiKey = API_KEY,
            context = applicationContext,
            useAdvertisingIdForDeviceId = true
        )
    )
    ```

=== "Java"

    ```java
    Configuration configuration = new Configuration(API_KEY, getApplicationContext());
    configuration.setUseAdvertisingIdForDeviceId(true);

    Amplitude amplitude = new Amplitude(configuration);
    ```

### App set ID

App set ID is a unique identifier for each app install on a device. App set ID is reset by the user manually when they uninstall the app, or after 13 months of not opening the app.
 Google designed this as a privacy-friendly alternative to Ad ID for users who want to opt out of stronger analytics.

 To use App Set ID, follow these steps.

1. Add `play-services-appset` as a dependency. For versions earlier than 2.35.3, use `'com.google.android.gms:play-services-appset:16.0.0-alpha1'`

    ```bash
    dependencies {
        implementation 'com.google.android.gms:play-services-appset:16.0.2'
    }
    ```

2. Enable to use app set ID as Device ID.

=== "Kotlin"

    ```kotlin
    amplitude = Amplitude(
        Configuration(
            apiKey = API_KEY,
            context = applicationContext,
            useAppSetIdForDeviceId = true
        )
    )
    ```

=== "Java"

    ```java
    Configuration configuration = new Configuration(API_KEY, getApplicationContext());
    configuration.setUseAppSetIdForDeviceId(true);

    Amplitude amplitude = new Amplitude(configuration);
    ```

--8<-- "includes/sdk-device-id/lifecycle-header.md"

1. Device ID of the instance
--8<-- "includes/sdk-device-id/android.md"

--8<-- "includes/sdk-device-id/transfer-to-a-new-device.md"

--8<-- "includes/sdk-device-id/get-device-id.md"

=== "Kotlin"

    ```kotlin
    val deviceId = amplitude.getDeviceId();
    ```

=== "Java"

    ```java
    String deviceId = amplitude.getDeviceId();
    ```

To set the device, refer to [custom device ID](./#custom-device-id).

### Location tracking

Amplitude converts the IP of a user event into a location (GeoIP lookup) by default. This information may be overridden by an app's own tracking solution or user data.

By default, Amplitude can use Android location service (if available) to add the specific coordinates (longitude and latitude) for the location from which an event is logged. Control this behavior by enable / disable location listening during the initialization.

=== "Kotlin"

    ```kotlin
    amplitude = Amplitude(
        Configuration(
            apiKey = API_KEY,
            context = applicationContext,
            locationListening = true
        )
    )
    ```

=== "Java"

    ```java
    Configuration configuration = new Configuration("API_KEY", getApplicationContext());
    configuration.setLocationListening(true);

    Amplitude amplitude = new Amplitude(configuration);
    ```

!!!note "ProGuard obfuscation"
    If you use ProGuard obfuscation, add the following exception to the file:
    `-keep class com.google.android.gms.common.** { *; }`

### Opt users out of tracking

Users may wish to opt out of tracking entirely, which means Amplitude doesn't track any of their events or browsing history. `OptOut` provides a way to fulfill a user's requests for privacy.

=== "Kotlin"

    ```kotlin
    amplitude = Amplitude(
        Configuration(
            apiKey = API_KEY,
            context = applicationContext,
            optOut = true
        )
    )
    ```

=== "Java"

    ```java
    Configuration configuration = new Configuration(API_KEY, getApplicationContext());
    configuration.setOptOut(true);

    Amplitude amplitude = new Amplitude(configuration);
    ```

### Push notification events

Don't send push notification events client-side via the Android SDK. Because a user must open the app to initialize the Amplitude SDK in order for the SDK to send the event, events aren't sent to the Amplitude servers until the next time the user opens the app. This can cause data delays.

You can use [mobile marketing automation partners](https://amplitude.com/integrations?category=mobile-marketing-automation) or the [HTTP API V2](../../../analytics/apis/http-v2-api) to send push notification events to Amplitude.

### Set log callback

Implements a customized `loggerProvider` class from the LoggerProvider, and pass it in the configuration during the initialization to help with collecting any error messages from the SDK in a production environment.

=== "Kotlin"

    ```kotlin
    import com.amplitude.common.Logger
    import com.amplitude.core.LoggerProvider

    class sampleLogger : Logger {
    override var logMode: Logger.LogMode
        get() = Logger.LogMode.DEBUG
        set(value) {}

        override fun debug(message: String) {
            TODO("Handle debug message here")
        }

        override fun error(message: String) {
            TODO("Handle error message here")
        }

        override fun info(message: String) {
            TODO("Handle info message here")
        }

        override fun warn(message: String) {
            TODO("Handle warn message here")
        }
    }

    class sampleLoggerProvider : LoggerProvider {
        override fun getLogger(amplitude: com.amplitude.core.Amplitude): Logger {
            return sampleLogger()
        }
    }

    amplitude = Amplitude(
        Configuration(
            apiKey = AMPLITUDE_API_KEY,
            context = applicationContext,
            loggerProvider = sampleLoggerProvider()
        )
    )
    ```

=== "Java"

    ```java
    import com.amplitude.common.Logger;
    import com.amplitude.core.LoggerProvider;

    class sampleLogger implements Logger {
        @NonNull
        @Override
        public LogMode getLogMode() {
            return LogMode.DEBUG;
        }

        @Override
        public void setLogMode(@NonNull LogMode logMode) {
            // TODO("Handle debug message here")
        }

        @Override
        public void debug(@NonNull String message) {
            // TODO("Handle debug message here")
        }

        @Override
        public void error(@NonNull String message) {
            // TODO("Handle error message here")
        }

        @Override
        public void info(@NonNull String message) {
            // TODO("Handle info message here")
        }

        @Override
        public void warn(@NonNull String message) {
            // TODO("Handle warn message here")
        }
    }

    class sampleLoggerProvider implements LoggerProvider {
        @NonNull
        @Override
        public Logger getLogger(@NonNull com.amplitude.core.Amplitude amplitude) {
            return new sampleLogger();
        }
    }
    ```

### Multiple Instances

It is possible to create multiple instances of Amplitude. Instances with the same `instanceName` will share storage and identity. For isolated storage and identity use a unique `instanceName` for each instance. For more details see [Configuration](#configuration).

```kotlin
val amplitude1 = Amplitude(Configuration(
    instanceName = "one",
    apiKey = "api-key-1",
    context = applicationContext,
))
val amplitude2 = Amplitude(Configuration(
    instanceName = "two",
    apiKey = "api-key-2",
    context = applicationContext,
))
```
