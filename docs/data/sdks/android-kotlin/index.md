---
title: Android Kotlin SDK
description: The Amplitude Android Kotlin SDK installation and quick start guide.
icon: simple/android
---

![Maven Central](https://img.shields.io/maven-central/v/com.amplitude/analytics-android.svg?label=Maven%20Central)

The Kotlin Android SDK lets you send events to Amplitude. This library is open-source, check it out on [GitHub](https://github.com/amplitude/Amplitude-Kotlin).

!!!info "Android SDK Resources"
    [:material-github: Github](https://github.com/amplitude/Amplitude-Kotlin) · [:material-code-tags-check: Releases](https://github.com/amplitude/Amplitude-Kotlin/releases) · [:material-book: API Reference](https://amplitude.github.io/Amplitude-Kotlin)

--8<-- "includes/ampli-vs-amplitude.md"
    Click here for more documentation on [Ampli for Android](./ampli.md).

## Getting started

### 1. Add dependencies

- We recommend using Android Studio as an IDE and Gradle to manage dependencies.
- In `build.gradle` file, add the following dependencies with the [latest version](https://search.maven.org/artifact/com.amplitude/analytics-android) of the SDK.

```txt
dependencies {
  implementation 'com.amplitude:analytics-android:1.0+'
}
```

- Sync project with Gradle files.

### 2. Add permissions

To report events to Amplitude, add the INTERNET permission to your `AndroidManifest.xml` file.
`<uses-permission android:name="android.permission.INTERNET" />`

For Android 6.0 (Marshmallow) and above, explicitly add the `READ_PHONE_STATE` permission to fetch phone carrier information. If you don't add this permission, the SDK still works, but doesn't track phone carrier information.
`<uses-permission android:name="android.permission.READ_PHONE_STATE" />`

The SDK internally uses a number of Java 8 language APIs through desugaring. Make sure your project either [enables desugaring](https://developer.android.com/studio/write/java8-support#library-desugaring) or requires a minimum API level of 16.

### 3. Initialization

Before you can instrument, you must initialize the SDK using the API key for your Amplitude project. The Android SDK can be used anywhere after it's initialized in an Android application.

```kotlin
import com.amplitude.android.Amplitude;

val amplitude = Amplitude(
  Configuration(
    apiKey = AMPLITUDE_API_KEY,
    context = applicationContext
  )
)
```

#### EU data residency

You can configure the server zone when initializing the client for sending data to Amplitude's EU servers. The SDK sends data based on the server zone if it's set.

!!!note
    For EU data residency, the project must be set up inside Amplitude EU. You must initialize the SDK with the API key from Amplitude EU.

=== "Kotlin"

    ```kotlin
    import com.amplitude.android.Amplitude;
    
    val amplitude = Amplitude(
      Configuration(
        apiKey = AMPLITUDE_API_KEY,
        context = applicationContext,
        serverZone = ServerZone.EU
      )
    )
    ```

## Usage

### `track`

Events represent how users interact with your application. For example, "Button Clicked" may be an action you want to note.

```kotlin
amplitude.track("test event properties", mutableMapOf<String, Any?>("test" to "test event property value"))
```

### `identify`

Identify is for setting the user properties of a particular user without sending any event. The SDK supports the operations `set`, `setOnce`, `unset`, `add`, `append`, `prepend`, `preInsert`, `postInsert`, and `remove` on individual user properties. The operations are declared via a provided Identify interface. Multiple operations can be chained together in a single Identify object. The Identify object is then passed to the Amplitude client to send to the server.

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

For example, if Joe is in 'orgId' '10' and '16', then the groupName would be '[10, 16]'). Here is what your code might look like:

```kotlin
amplitude.setGroup("orgId", "15");
amplitude.setGroup("sport", arrayOf("tennis", "soccer")) // list values
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

Amplitude can track revenue generated by a user. Revenue is tracked through distinct revenue objects, which have special fields that are used in Amplitude's Event Segmentation and Revenue LTV charts. This allows Amplitude to automatically display data relevant to revenue in the platform. Revenue objects support the following special properties, as well as user-defined properties through the eventProperties field.

```kotlin
val revenue = Revenue()
revenue.productId = "com.company.productId"
revenue.price = 3.99
revenue.quantity = 3
amplitude.revenue(revenue)
```

| <div class="big-column">Name</div>   | Description  |
| --- | --- |
| `productId` | Optional. String. An identifier for the product. We recommend something like the Google Play Store product ID. Defaults to `null`.|
| `quantity `| Required. Integer. The quantity of products purchased. Note: revenue = quantity * price. Defaults to 1 |
| `price `| Required. Double. The price of the products purchased, and this can be negative. Note: revenue = quantity * price. Defaults to `null`.|
| `revenueType`| Optional, but required for revenue verification. String. The type of revenue (e.g. tax, refund, income). Defaults to `null`.|
| `receipt`| Optional. String. The type of revenue (for example, tax, refund, income). Defaults to `null`. |
| `receiptSignature`| Optional, but required for revenue verification. String. The type of revenue (for example, tax, refund, income). Defaults to `null`. |

### Custom user ID

If your app has its own login system that you want to track users with, you can call `setUserId` at any time.

```kotlin
amplitude.setUserId("user@amplitude.com")
```

### Custom device ID

If your app has its own login system that you want to track users with, you can call `setUserId` at any time.

You can assign a new device ID using `deviceId`. When setting a custom device ID, make sure the value is sufficiently unique. A UUID is recommended.

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

## Amplitude SDK Plugin

Plugins allow you to extend Amplitude SDK's behavior by, for example, modifying event properties (enrichment type) or sending to a third-party APIs (destination type). A plugin is an object with methods `setup()` and `execute()`.

### Plugin.setup

This method contains logic for preparing the plugin for use and has `amplitude` instance as a parameter. The expected return value is `null`. A typical use for this method, is to instantiate plugin dependencies. This method is called when the plugin is registered to the client via `amplitude.add()`.

### Plugin.execute

This method contains the logic for processing events and has `event` instance as parameter. If used as enrichment type plugin, the expected return value is the modified/enriched event; while if used as a destination type plugin, the expected return value is `null`. This method is called for each event, including Identify, GroupIdentify and Revenue events, that is instrumented using the client interface.

### Plugin Examples

#### Enrichment Type Plugin

Here's an example of a plugin that modifies each event that is instrumented by adding extra event property.

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

#### Destination Type Plugin

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
