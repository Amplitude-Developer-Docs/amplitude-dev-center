---
title: Android SDK Migration Guide
description: Use this guide to easily migrate from Amplitude's maintenance Android SDK (com.amplitude:android-sdk) to the latest SDK (com.amplitude:analytics-android).
---

Amplitude's latest Android SDK (`com.amplitude:analytics-android`) features a plugin architecture, built-in type definitions, is written in Kotlin. The latest Android SDK isn't backwards compatible with the maintenance Android SDK `com.amplitude:android-sdk`. 

To migrate to `com.amplitude:analytics-android`, update your dependencies and instrumentation.

## Terminology

* `com.amplitude:android-sdk`: Maintenance Android SDK
* `com.amplitude:analytics-android`: Latest Android SDK

## Dependency

Update build.gradle to remove the maintennace Android SDK and add the latest Android SDK. Then sync project with Gradle files.

```diff
dependencies {
-  implementation 'com.amplitude:android-sdk:2.+'
-  implementation 'com.squareup.okhttp3:okhttp:4.2.2'
+  implementation 'com.amplitude:analytics-android:1.+'
}
```

## Instrumentation

The latest Android SDK offers an new API to instrument events. To migrate to it, you need to update a few calls. The following sections detail which calls have changed.

### Initialization

You must initialize the SDK with a valid Amplitude API Key and Android application context.

=== "Kotlin"

    ```diff
    - import com.amplitude.api.Amplitude
    - import com.amplitude.api.AmplitudeClient
    + import com.amplitude.android.Amplitude

    - val client = Amplitude.getInstance()
    -   .initialize(getApplicationContext(), "YOUR_API_KEY")
    + val client = Amplitude(
    +     Configuration(
    +         apiKey = "YOUR_API_KEY",
    +         context = getApplicationContext()
    +     )
    + )
    ```

=== "Java"

    ```diff
    - import com.amplitude.api.Amplitude;
    - import com.amplitude.api.AmplitudeClient;
    + import com.amplitude.android.Amplitude;

    - AmplitudeClient client = Amplitude.getInstance()
    -   .initialize(getApplicationContext(), "YOUR_API_KEY");
    + Amplitude client =  new Amplitude(new Configuration(
    +     apiKey = "YOUR_API_KEY",
    +     context = getApplicationContext()
    + ));
    ```

### Configuration

The latest Android SDK configuration comes in a different shape. Some configurations are no longer supported.

|com.amplitude:android-sdk|com.amplitude:analytics-android|
|-|-|
| `eventUploadPeriodMillis` | `flushIntervalMillis` |
| `eventUploadThreshold` | `flushQueueSize` |
| `eventUploadMaxBatchSize` | Not supported |
| `eventMaxCount` | Not supported |
| `identifyBatchIntervalMillis` | `identifyBatchIntervalMillis` |
| `flushEventsOnClose` | `flushEventsOnClose` |
| `optOut` | `optOut` |
| `trackingSessionEvents` | `trackingSessionEvents` |
| `sessionTimeoutMillis` | Not supported |
| `minTimeBetweenSessionsMillis` | `minTimeBetweenSessionsMillis` |
| `serverUrl` | `serverUrl` defaults to `https://api2.amplitude.com/2/httpapi` while the maintenance SDK defaults to `https://api2.amplitude.com/` |
| `useDynamicConfig` |  Not supported |

### Send events

#### `logEvent()`

The `logEvent()` API maps to `track()`. The `eventProperties` is `JSONObject` type in the maintenance SDK while it's `Map<String, Any?>` type in the latest SDK. 

=== "Kotlin"

    ```diff
    - import org.json.JSONException
    - import org.json.JSONObject

    - val eventProperties = JSONObject() 
    - try {
    -   eventProperties.put("buttonColor", "primary")
    - } catch (e: JSONException) {
    -   System.err.println("Invalid JSON")
    -   e.printStackTrace()
    - }
    - client.logEvent("Button Clicked", eventProperties)

    + client.track(
    +     "Button Clicked",
    +     mutableMapOf<String, Any?>("buttonColor" to "primary")
    + )
    ```

=== "Java"

    ```diff
    - import org.json.JSONException;
    - import org.json.JSONObject;

    - JSONObject eventProperties = new JSONObject();
    - try {
    -   eventProperties.put("buttoncolor", "primary");
    - } catch (JSONException e) {
    -   System.err.println("Invalid JSON");
    -   e.printStackTrace();
    - }
    - client.logEvent("Button Clicked", eventProperties);

    + client.track("Button Clicked", new HashMap() {{
    +     put("buttoncolor", "primary");
    + }});
    ```

### Flush events

Unset events are stored in a buffer and flushed (sent) on app close by default. Events are flushed based on which criteria is met first: `flushIntervalMillis` or `flushQueueSize`.

You can disable flushing by setting `flushEventsOnClose` to `false`.

#### `flush()`

You can also force the SDK to upload unsent events. The `uploadEvents()` API maps to `flush()`.

=== "Kotlin"

    ```diff
    - client.uploadEvents()
    + client.flush()
    ```

=== "Java"

    ```diff
    - client.uploadEvents();
    + client.flush();
    ```

### Set user properties

#### `identify()`

The `identify()` API remains the same

=== "Kotlin"

    ```diff
    val identify = Identify()
    identify.set("location", "LAX")
    client.identify(identify)
    ```

=== "Java"

    ```diff
    Identify identify = new Identify();
    identify.set("location", "LAX");
    client.identify(identify);
    ```

### Set group properties

### `groupIdentify()`

The `groupIdentify()` API remains the same.

=== "Kotlin"

    ```diff
    val groupType = "plan"
    val groupName = "enterprise"

    val identify = Identify().set("key", "value")
    client.groupIdentify(groupType, groupName, identify)
    ```

=== "Java"

    ```diff
    String groupType = "plan";
    Object groupName = "enterprise";

    Identify identify = new Identify().set("key", "value");
    client.groupIdentify(groupType, groupName, identify);
    ```

### Track revenue

#### `logRevenueV2()`

The `logRevenueV2()` API maps to `revenue()`.

=== "Kotlin"
    ```diff
    val revenue = Revenue()
    revenue.productId = "com.company.productId"
    revenue.price = 3
    revenue.quantity = 2
    - client.logRevenueV2(revenue)
    + client.revenue(revenue)
    ```

=== "Java"

    ```diff
    Revenue revenue = new Revenue()
    revenue.setProductId("com.company.productId");
    revenue.setPrice(3);
    revenue.setQuantity(2);
    - client.logRevenueV2(revenue);
    + client.revenue(revenue);
    ```

#### Revenue verification

The revenue verification logic is on Amplitude's backend. So revenue verification still works after migrating to the latest Android SDK.

## Advanced topics

Most of the behaviours of the latest SDK remain the same with the maintenance SDK. Refer to the advanced topics sections of the [maintenance SDK](/data/sdks/android/#advanced-topics) and the [latest SDK](/data/sdks/android-kotlin/#advanced-topics) to learn more about a specific advanced topic.

## Comparison 

--8<-- "includes/sdk-migration/sdk-migration-note.md"

| <div class="big-column">Feature</div> | [Latest Android SDK](../) | [Maintenance Android SDK](../../android/) |
| --- | --- | --- |
| Package | [com.amplitude:analytics-android](https://mvnrepository.com/artifact/com.amplitude/analytics-android) | [com.amplitude:android-sdk](https://mvnrepository.com/artifact/com.amplitude/android-sdk) |
| SSL Pinning | TBD | Supported. Check [here](../../android/#ssl-pinning) for the setup. |
| Configuration | Configuration is implemented by the configuration object. Configurations need to be passed into Amplitude Object during initialization. [More configurations](../#configuration). | Support explicity setter methods. [More configurations](../../android/#configuration). |
| Logger Provider | ConsoleLoggerProvider() by default. Fully customizable. | Amplitude Logger. Not customizable. |
| Storage Provider | InMemoryStorageProvider() by default. File storage. Fully customizable. | SQLite Database. |
| Customization | Plugins | Middelware |
| Server Endpoint | HTTP V2 API | HTTP V1 API |
| Batch API| Supported, with configuration. | Not supported.|
| Default Event Tracking| Support sessions, app lifecycles, screen views, and deep links trackings. [More details](../../android-kotlin/#tracking-default-events). | Support sessions tracking only, disabled by default.|

## Data migration

Existing [maintenance SDK](../../android) data (events, user/device ID) are moved to the latest SDK by default. It can be disabled by setting `migrateLegacyData` to `false` in the [Configuration](../#configuration). Learn more in [Github](https://github.com/amplitude/Amplitude-Kotlin/blob/main/android/src/main/java/com/amplitude/android/migration/RemnantDataMigration.kt#L9-L16).

=== "Kotlin"

    ```kotlin
    amplitude = Amplitude(
        Configuration(
            ...
            migrateLegacyData = false,
        )
    )
    ```

=== "Java"

    ```java
    Configuration configuration = new Configuration("AMPLITUDE_API_KEY", getApplicationContext());
    configuration.setMigrateLegacyData(false);
    
    Amplitude amplitude = new Amplitude(configuration);
    ```
