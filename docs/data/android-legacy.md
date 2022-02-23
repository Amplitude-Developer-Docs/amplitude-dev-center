---
id: android-legacy
title: Android (Legacy)
---



Iteratively supports tracking analytics events from Android apps (API 22 and above) written in Kotlin and Java.

In Kotlin and Java, the tracking library exposes a type-safe function for every event in your team’s tracking plan. The function’s arguments correspond to the event’s properties and are strongly typed to allow for code completion and compile-time checks.

## Installation

### Generate the SDK

If you have not yet installed the Ampli CLI, [install it now](/using-the-ampli-cli).

To generate the Itly SDK, run `ampli pull {source}` in the top-most folder of your project. By default, the SDK will be generated in `./app/src/main/java/io/itly/`.

:::note Tip
`{source}` is the name of the source you created in your tracking plan (e.g. `android`).
:::

### Install dependencies

To validate your analytics events, the Android SDK depends on [everit-org/json-schema](https://github.com/everit-org/json-schema) (Apache License 2.0). To install this dependency with Gradle:

- Edit the project-level `build.gradle` file and add the following to `allprojects.repositories` (the JSON Schema validation package from Everit is published to JitPack):

```bash
maven { url 'https://jitpack.io/' }
```

- Edit the app-level `build.gradle` file and add the following to `dependencies`:

```bash
implementation 'com.github.everit-org.json-schema:org.everit.json.schema:1.12.0'
```

If you've configured Itly with Amplitude or Segment, you'll also install each configured provider's SDK. Edit the app-level `build.gradle` file and add the following to `dependencies`:

```bash
implementation 'com.amplitude:android-sdk:2.14.1'
implementation 'com.segment.analytics.android:analytics:4.+'
```

### Import into your app

To use the library, you'll need to import it first:

<Tabs
  groupId="android-source"
  defaultValue="kotlin"
  values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Java', value: 'java', },
  ]
}>
<TabItem value="kotlin">

```java
import io.itly.*;
```

</TabItem>
<TabItem value="java">

```java
import io.itly.*;
```

</TabItem>
</Tabs>

## API

### Load

Load the Itly SDK once when your application starts. The `load()` (`init()` in Java) method accepts an options object that lets you configure how the Itly SDK works:

| Options | Description |
|-|-|
| `context`| An object with a set of properties to add to every event sent by the Itly SDK.<br /><br />Only available if there is at least one [source template](/working-with-templates#adding-a-template-to-a-source) associated with your your team's tracking plan.|
| `disabled`| Specifies whether the Itly SDK does any work. When true, all calls to the Itly SDK will be no-ops. Useful in local or development environments.<br /><br />Optional. Defaults to `false`.|
| `environment` | Specifies the environment the Itly SDK is running in: either `production` or `development`. Environment determines which Access Token is used to load the underlying analytics provider libraries.<br /><br />The option also determines safe defaults for handling event validation errors. In production, when the SDK detects an invalid event, it will log an error but still let the event through. In development, the SDK will throw an exception to alert you that something is wrong.<br /><br />Optional. Defaults to `development`.|
| `destinations` | Specifies any analytics provider-specific configuration. The Itly SDK passes these objects in when loading the underlying analytics provider libraries.<br /><br />Optional.|
| `logger` | To log Itly's logs to a custom logger, implement the `ItlyLogger` protocol and set `logger` to an instance of your class. The Itly SDK will call into your class with all debug, info, warn, and error-level messages.<br /><br />[Click here](https://bitbucket.org/seasyd/examples/src/master/android-kotlin/app/src/main/java/io/itly/ItlyBase.kt) to see an example written in Kotlin.<br /><br />[Click here](https://bitbucket.org/seasyd/examples/src/master/android-java/app/src/main/java/io/itly/Itly.java) to see an example written in Java.<br /><br />Optional. Defaults to standard out. |

For example:

<Tabs
  groupId="android-source"
  defaultValue="kotlin"
  values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Java', value: 'java', },
  ]
}>
<TabItem value="kotlin">

```java
Itly.load(
    Options(
        Context(version = "1.0"),
        DestinationsOptions(
            CustomOptions(MyCustomDestination())
        )
    )
);
```

</TabItem>
<TabItem value="java">

```java
Itly.getInstance().init(ItlyOptions.builder()
  .destinations(ItlyDestinations.builder()
          .amplitude(new ItlyAmplitudeOptions(getApplicationContext()))
          .build())
  .context(Context.builder()
          .version("1.0")
          .build())
  .logger(new Logger())
  .disabled(false)
  .environment(ItlyOptions.Environment.DEVELOPMENT)
  .build());
```

</TabItem>
</Tabs>

### Track

To track an event, call the event’s corresponding function. Every event in your tracking plan gets its own function in the Itly SDK.

For example, in the code snippet below, our tracking plan contains an event called `Activity Created`. The event was defined with one required property called `title`. The property's type is an enum.

<Tabs
  groupId="android-source"
  defaultValue="kotlin"
  values={[
    { label: 'Kotlin', value: 'kotlin', },
    { label: 'Java', value: 'java', },
  ]
}>
<TabItem value="kotlin">

```java
Itly.activityCreated(
    title = ActivityCreated.Title.MAINACTIVITY
)
```

</TabItem>
<TabItem value="java">

```java
Itly.getInstance().trackActivityCreated(ActivityCreated.builder()
  .title(ActivityCreated.Title.MAINACTIVITY)
  .build());
```

</TabItem>
</Tabs>

<!-- Itly includes code docs in the auto-generated library so your IDE can display relevant documentation for every function and property as you type.

![Code documentation](/img/android-kotlin.png) -->

<!-- ### Alias



### Plugins & Custom Destinations



### Logging -->


