---
title: Android (Itly)
description: This SDK is deprecated. Learn how to install and use the Ampli SDK for the Android Java and Kotlin runtimes. 
icon: material/android
---

!!!note "Previous Version"

    Still using the **Android (Legacy)** runtime? Docs for the previous version are available [here](android-legacy).

!!! note "Migrating"

    Migrating from **Android (Legacy)** to the new **Android** runtime? A migration guide is available [here](#migrating-from-previous-version).


Amplitude Data supports tracking analytics events from Android apps (API 22 and above) written in Kotlin and Java.

In Kotlin and Java, the tracking library exposes a type-safe function for every event in your team’s tracking plan. The function’s arguments correspond to the event’s properties and are strongly typed to allow for code completion and compile-time checks.

## Installation

### Generate the SDK

If you have not yet installed the Ampli CLI, [install it now](/using-the-ampli-cli).

To generate the Itly SDK, run `ampli pull {source}` in the top-most folder of your project. By default, the SDK will be generated in `./app/src/main/java/ly/iterative/itly/`.

!!!note Tip

    `{source}` is the name of the source you created in your tracking plan (e.g. `android`).

### Install dependencies

Edit the app-level build.gradle and add the following to `dependencies`:
- `implementation 'ly.iterative.itly:sdk-android:1.2+'`
- `implementation 'ly.iterative.itly:plugin-schema-validator:1.2+'`

For Amplitude:
- `implementation 'ly.iterative.itly:plugin-amplitude-android:1.2+'`

For Segment:
- `implementation 'ly.iterative.itly:plugin-segment-android:1.2+'`

Note: if you're not already requesting the [INTERNET permission](https://developer.android.com/reference/android/Manifest.permission#INTERNET), add `<uses-permission android:name="android.permission.INTERNET" />` to your AndroidManifest.xml.

### Import into your app

To use the library, you'll need to import it first:

=== "Kotlin"

    ```java
    import ly.iterative.itly.*
    ```

=== "Java"

    ```java
    import ly.iterative.itly.*
    ```

## API

### Load

Load the Itly SDK once when your application starts. The `load()` method accepts a few configuration option arguments:


=== "Kotlin"

    ```java
    Itly.load(
        Context(version = "1.0"),
        DestinationsOptions(
            AmplitudeOptions(applicationContext),
            SegmentOptions(applicationContext)
        ),
        Options(
            plugins = listOf(MyCustomDestination())
        )
    );
    ```

=== "Java"

    ```java
    Itly.getInstance().load(Options.builder()
        .destinations(Destinations.builder()
            .custom(new CustomOptions(new MyCustomDestination()))
            .build())
        .context(Context.builder()
                .version("1.0")
                .build())
        .logger(new Logger())
        .disabled(false)
        .environment(ItlyOptions.Environment.DEVELOPMENT)
        .build()
    );
    ```

In our example above, we defined a tracking plan in the Itly web application to:
 - Include a property called *version* on every event
 - Send events to Amplitude, Segment, and a custom destination

As a result, our SDK will be initialized to:
 - Set the required *version* property to 1.0
 - Send events to a custom destination implemented in the `MyCustomDestination` class

| <div class="big-column">Arg</div> | Description |
|-|-|
| `context`| An object with a set of properties to add to every event sent by the Itly SDK.<br /><br />Only available if there is at least one [source template](/working-with-templates#adding-a-template-to-a-source) associated with your your team's tracking plan.|
| `destinations` | Specifies any analytics provider-specific configuration. The Itly SDK passes these objects in when loading the underlying analytics provider libraries.<br /><br />Optional.|
| `options` | Specifies additional configuration options for the Itly SDK. Optional.<br /><br />`disabled`<br />Specifies whether the Itly SDK does any work. When true, all calls to the Itly SDK will be no-ops. Useful in local or development environments.<br /><br />Optional. Defaults to `false`.<br /><br />`environment`<br />Specifies the environment the Itly SDK is running in: either `production` or `development`. Environment determines which Access Token is used to load the underlying analytics provider libraries.<br /><br />The option also determines safe defaults for handling event validation errors. In production, when the SDK detects an invalid event, it will log an error but still let the event through. In development, the SDK will throw an exception to alert you that something is wrong.<br /><br />Optional. Defaults to `development`.<br /><br />`plugins`<br />An array of additional plugins to load into the Itly SDK. Plugins allow you to extend the Itly SDK's event validation and event tracking functionality with your own. For example, a plugin can be used to implement a custom destination or a custom event validator.<br /><br />[Click here](#custom-destination) to learn about writing a custom destination plugin.<br /><br />[Click here](https://bitbucket.org/seasyd/examples/src/master/android-kotlin-v3/app/src/main/java/ly/iterative/examples/kotlin/MyCustomDestination.kt) to see a sample custom destination plugin.<br /><br />`logger`<br />To log Itly's logs to a custom logger, implement the `ItlyLogger` protocol and set `logger` to an instance of your class. The Itly SDK will call into your class with all debug, info, warn, and error-level messages.<br /><br />[Click here](https://bitbucket.org/seasyd/examples/src/master/android-kotlin/app/src/main/java/io/itly/ItlyBase.kt) to see an example written in Kotlin.<br /><br />[Click here](https://bitbucket.org/seasyd/examples/src/master/android-java/app/src/main/java/io/itly/Itly.java) to see an example written in Java.<br /><br />Optional. Defaults to standard out. |

!!!note
    The Itly SDK will automatically load and initialize your analytics providers' libraries using your each library's official installation instructions.

### Track

To track an event, call the event’s corresponding function. Every event in your tracking plan gets its own function in the Itly SDK.

For example, in the code snippet below, our tracking plan contains an event called `Activity Created`. The event was defined with one required property called `title`. The property's type is an enum.


=== "Kotlin"

    ```java
    Itly.activityCreated(
        title = ActivityCreated.Title.MAIN_ACTIVITY
    )
    ```

=== "Java"

    ```java
    Itly.getInstance().activityCreated(ActivityCreated.builder()
    .title(ActivityCreated.Title.MAIN_ACTIVITY)
    .build());
    ```

## Example

Browse over to https://bitbucket.org/seasyd/examples/src/master/android-kotlin-v3/ to see an example of an instrumented Kotlin app, along with a sample implementation of the `MyCustomDestination` plugin.

## Migrating from Previous Version

The new Android SDK enjoys a simpler deployment model and introduces several new features to help developers implement product analytics:

- Previously, the entire SDK was codegen'd into your source tree. In the new SDK, the SDK is split into two, allowing developers to call `ampli pull` freely without worrying about pulling down changes that may affect their application's behavior:
    - The static, core SDK — open source and hosted on GitHub, and usable standalone, it contains all the logic needed to validate, track, and test analytics events. It is now semantically versioned and published to popular package repos, incl. Maven Central.
    - The dynamic, codegen'd API — generated by `ampli pull` and placed into your source tree, the codegen'd API contains event classes and a corresponding strongly-typed API only. It delegates all work to the core SDK and contains no logic.
- The core SDK is now extensible via plugins. 5 plugins are currently available out of the box: a JSON Schema validation plugin, and 4 destination plugins: Segment, Amplitude, and Iteratively.
- When environment is set to `development`, the SDK will stream events to Amplitude's [User Lookup](https://help.amplitude.com/hc/en-us/articles/229313067-User-Look-Up) dashboard. The live debugger allows developers to watch tracked events, inspect their payloads, and detect validation problems.

### Tracking Plan Changes

- Update your source's runtime from **Android — Kotlin (Legacy)** to **Android — Kotlin**

### Android Studio Changes

- Open existing project
- Remove from app module's build.gradle (if applicable):

```java
implementation 'com.networknt:json-schema-validator:1.0.29'
// If using Amplitude
implementation 'com.amplitude:android-sdk:2.14.1'
// If using Segment
implementation 'com.segment.analytics.android:analytics:4.+'
```

- Add to app module's build.gradle:

```java
implementation 'ly.iterative.itly:sdk-android:1.2+'
implementation 'ly.iterative.itly:plugin-schema-validator:1.2+'
// If using Amplitude
implementation 'ly.iterative.itly:plugin-amplitude-android:1.2+'
// If using Segment
implementation 'ly.iterative.itly:plugin-segment-android:1.2+'
```
- Pull down the new SDK inside your Android project's root folder

```bash
ampli pull
```

- **Note**: the new SDK's package name is **ly.iterative.itly** instead of **io.itly**. The `ampli` CLI will display a one-time warning that the location of the SDK on the file system has changed.
- Delete the old SDK:

```bash
rm -rf ./app/src/main/java/io/itly
rmdir ./app/src/main/java/io # in case it is now empty
```

- Global search and replace `import io.itly.*` with `import ly.iterative.itly.*`
- Custom destination adapters are now passed in as plugins rather than as part of `DestinationOptions`. If you are using a custom destination:
    - Remove e.g. `CustomOptions(MyCustomDestination())` from `DestinationOptions`
    - Add `arrayListOf(MyCustomDestination())` to `Options`:

    ```java
    Itly.load(
        DestinationsOptions(
            AmplitudeOptions(applicationContext),
            SegmentOptions(applicationContext)
        ),
        Options(
            plugins = listOf(MyCustomDestination())
        )
    );
    ```

- Enum names are now properly snake cased. E.g. an enum value of "MainActivity" or "Main Activity" will be codegen'd as `MAIN_ACTIVITY` rather than `MAINACTIVITY`. If you've instrumented any events with multi-word enum properties, please update them.

### Custom Destination Changes

In the new SDK, custom destinations no longer implement an `IDestination` interface. They are now considered plugins and extend the `PluginBase` class.

For example, the following custom destination:

```java
package ly.iterative.examples.kotlin

import io.itly.*

class MyCustomDestination : IDestination {
    override fun init() {}
    override fun alias(userId: String, previousId: String?) {}
    override fun identify(userId: String?, properties: ConvertibleProperties?) {}
    override fun group(groupId: String, properties: ConvertibleProperties?) {}
    override fun reset() {}
    override fun track(userId: String?, eventName: String, properties: ConvertibleProperties?) {}
}
```

Now looks like this:

```java
package ly.iterative.examples.kotlin

import ly.iterative.itly.*
import ly.iterative.itly.core.Options

class MyCustomDestination : Plugin("my-custom-destination") {
    override fun load(options: Options) {}
    override fun alias(userId: String, previousId: String?) {}
    override fun identify(userId: String?, properties: Properties?) {}
    override fun group(userId: String?, groupId: String, properties: Properties?) {}
    override fun reset() {}
    override fun track(userId: String?, event: Event) {}
}
```

`Properties` is a simple `Map<String, Any?>`. `Event` exposes the event's `id`, `name`, and `properties`.