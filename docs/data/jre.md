---
id: jre
title: JRE
icon: material/language-java
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Iteratively supports tracking analytics events from JRE programs written in Java (6 and above).

In Java, the tracking library exposes a type-safe function for every event in your team’s tracking plan. The function’s arguments correspond to the event’s properties and are strongly typed to allow for code completion and compile-time checks.

## Installation

### Generate the SDK

If you have not yet installed the Ampli CLI, [install it now](/using-the-ampli-cli).

To generate the Itly SDK, run `ampli pull {source}` in the top-most folder of your project. By default, the SDK will be generated in `./src/main/java/io/itly/`.

:::note Tip
`{source}` is the name of the source you created in your tracking plan (e.g. `java`).
:::

### Install dependencies

To validate your analytics events, the Java SDK depends on [everit-org/json-schema](https://github.com/everit-org/json-schema) (Apache License 2.0). To install this dependency with Maven:

- Edit the project's `pom.xml` file and add the following inside `<project>` (the JSON Schema validation package from Everit is published to JitPack):

```xml
<repositories>
    <repository>
    <id>jitpack.io</id>
    <url>https://jitpack.io</url>
    </repository>
</repositories>
```

- Inside `<dependencies>`, add:

```xml
<dependency>
    <groupId>org.json</groupId>
    <artifactId>json</artifactId>
    <version>LATEST</version>
</dependency>
<dependency>
    <groupId>com.github.everit-org.json-schema</groupId>
    <artifactId>org.everit.json.schema</artifactId>
    <version>LATEST</version>
</dependency>
```

If you've configured Itly with Segment, you'll also need to add Segment's SDK as a dependency. Add the following inside `<dependencies>`:

```xml
<dependency>
    <groupId>com.segment.analytics.java</groupId>
    <artifactId>analytics</artifactId>
    <version>LATEST</version>
</dependency>
```

### Import into your app

To use the library, you'll need to import it first:

<Tabs
  groupId="jre-source"
  defaultValue="java"
  values={[
    { label: 'Java', value: 'java', },
  ]
}>
<TabItem value="java">

```java
import io.itly.*;
```

</TabItem>
</Tabs>

## API

### Load

Load the Itly SDK once when your application starts. The `init()` method accepts an options object that lets you configure how the Itly SDK works:

| Options | Description |
|-|-|
| `context`| An object with a set of properties to add to every event sent by the Itly SDK.<br /><br />Only available if there is at least one [source template](/working-with-templates#adding-a-template-to-a-source) associated with your your team's tracking plan.|
| `disabled`| Specifies whether the Itly SDK does any work. When true, all calls to the Itly SDK will be no-ops. Useful in local or development environments.<br /><br />Optional. Defaults to `false`.|
| `environment` | Specifies the environment the Itly SDK is running in: either `production` or `development`. Environment determines which Access Token is used to load the underlying analytics provider libraries.<br /><br />The option also determines safe defaults for handling event validation errors. In production, when the SDK detects an invalid event, it will log an error but still let the event through. In development, the SDK will throw an exception to alert you that something is wrong.<br /><br />Optional. Defaults to `development`.|
| `destinations` | Specifies any analytics provider-specific configuration. The Itly SDK passes these objects in when loading the underlying analytics provider libraries.<br /><br />Optional.|
| `logger` | To log Itly's logs to a custom logger, implement the `ItlyLogger` protocol and set `logger` to an instance of your class. The Itly SDK will call into your class with all debug, info, warn, and error-level messages.<br /><br />[Click here](https://bitbucket.org/seasyd/examples/src/master/jre-java/src/main/java/io/itly/Itly.java) to see an example written in Java.<br /><br />Optional. Defaults to standard out. |

For example:

<Tabs
  groupId="jre-source"
  defaultValue="java"
  values={[
    { label: 'Java', value: 'java', },
  ]
}>
<TabItem value="java">

```java
Itly.getInstance().init(ItlyOptions.builder()
    .destinations(ItlyDestinations.builder()
        .custom(new ItlyCustomOptions(new CustomAdapter()))
        .segment(new ItlySegmentOptions())
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

For example, in the code snippet below, our tracking plan contains an event called `Process Started`. The event was defined with one required property called `userId` and one optional property called `availableProcessors`. The `userId` property's type is a string. The `availableProcessors` property's type an integer.

<Tabs
  groupId="jre-source"
  defaultValue="java"
  values={[
    { label: 'Java', value: 'java', },
  ]
}>
<TabItem value="java">

```java
Itly.getInstance().trackProcessStarted("some-user-id", ProcessStarted.builder()
    .availableProcessors(Runtime.getRuntime().availableProcessors())
    .build()
);
```

</TabItem>
</Tabs>

<!-- Itly includes code docs in the auto-generated library so your IDE can display relevant documentation for every function and property as you type.

![Code documentation](/img/jre-java.png) -->

<!-- ### Alias



### Plugins & Custom Destinations



### Logging -->


