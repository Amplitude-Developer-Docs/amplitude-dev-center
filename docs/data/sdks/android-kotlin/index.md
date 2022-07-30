---
title: Android Kotlin SDK
description: The Amplitude Android Kotlin SDK installation and quick start guide.
icon: material/android
---

![Maven Central](https://img.shields.io/maven-central/v/com.amplitude/analytics-android.svg?label=Maven%20Central)

!!!info "SDK Resources"
    - [Android Kotlin SDK Reference :material-book:](https://amplitude.github.io/Amplitude-Kotlin/)
    - [Android Kotlin SDK Repository :material-github:](https://github.com/amplitude/Amplitude-Kotlin)
    - [Android Kotlin SDK Releases :material-code-tags-check:](https://github.com/amplitude/Amplitude-Kotlin/releases)

--8<-- "includes/ampli-vs-amplitude.md"

The Kotlin Android SDK lets you send events to Amplitude. This library is open-source, check it out on [GitHub](https://github.com/amplitude/Amplitude-Kotlin).

## Getting started

### 1. Add dependencies

- We recommend using Android Studio as an IDE and Gradle to manage dependencies.
- In `build.gradle` file, add the following dependencies. OkHttp is needed for the SDK.

```txt
dependencies {
  implementation 'com.amplitude:analytics-android:1.0.0'
}
```

- Sync project with Gradle files.

### 2. Add permissions

To report events to Amplitude, add the INTERNET permission to your `AndroidManifest.xml` file.
`<uses-permission android:name="android.permission.INTERNET" />`

For Android 6.0 (Marshmallow) and above, explicitly add the `READ_PHONE_STATE` permission to fetch phone related information.
`<uses-permission android:name="android.permission.READ_PHONE_STATE" />`

The SDK internally uses a number of Java 8 language APIs through desugaring. Make sure your project either [enables desugaring](https://developer.android.com/studio/write/java8-support#library-desugaring)) or requires a minimum API level of 26.

### 3. Initialization

Before you can instrument, you must initialize the SDK using the API key for your Amplitude project. The Android SDK can be used anywhere after it's initialized in an Android application.

```java
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
    val amplitude = Amplitude(
      Configuration(
        apiKey = AMPLITUDE_API_KEY,
        context = applicationContext,
        serverZone = ServerZone.US
      )
    )
    ```


## Usage

### `track`

Events represent how users interact with your application. For example, "Button Clicked" may be an action you want to note.

```java
amplitude.track("test event properties", JSONObject().put("test", "test event property value"))
```

### `identify`

Identify is for setting the user properties of a particular user without sending any event. The SDK supports the operations `set`, `setOnce`, `unset`, `add`, `append`, `prepend`, `preInsert`, `postInsert`, and `remove` on individual user properties. The operations are declared via a provided Identify interface. Multiple operations can be chained together in a single Identify object. The Identify object is then passed to the Amplitude client to send to the server.

!!!note

    If the Identify call is sent after the event, the results of operations will be visible immediately in the dashboard user's profile area, but it will not appear in chart result until another event is sent after the Identify call. So the identify call only affects events going forward. More details [here](https://amplitude.zendesk.com/hc/en-us/articles/115002380567-User-Properties-Event-Properties#applying-user-properties-to-events).

You can handle the identity of a user using the identify methods. Proper use of these methods can connect events to the correct user as they move across devices, browsers, and other platforms. Send an identify call containing those user property operations to Amplitude server to tie a user's events with specific user properties.

```java
val identify = Identify()
identify.set("color", "green")
amplitude.identify(identify)

```

### User groups

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

--8<-- "includes/groups-intro-paragraph.md"

For example, if Joe is in 'orgId' '10' and '16', then the groupName would be '[10, 16]'). Here is what your code might look like:

```java
amplitude.setGroup("orgId", "15");
amplitude.setGroup("sport", arrayOf("tennis", "soccer")) // list values
```

### Group identify

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

--8<-- "includes/group-identify-considerations.md"

```java
val groupType = "plan"
val groupName = "enterprise"

val identify = Identify().set("key", "value")
amplitude.groupIdentify(groupType, groupName, identify)
```

### Track revenue

Amplitude can track revenue generated by a user. Revenue is tracked through distinct revenue objects, which have special fields that are used in Amplitude's Event Segmentation and Revenue LTV charts. This allows Amplitude to automatically display data relevant to revenue in the platform. Revenue objects support the following special properties, as well as user-defined properties through the eventProperties field.

```java
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
| `eventProperties`| Optional. JSONObject. An object of event properties to include in the revenue event. Defaults to `null`. |
