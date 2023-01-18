---
title: JRE Ampli Wrapper
description: Documentation for Amplitude Data's JRE Ampli Wrapper. 
---

--8<-- "includes/ampli/ampli-overview-section.md"

Amplitude Data supports tracking analytics events from JRE programs written in Java (6 and higher).

!!!info "Ampli JRE Resources"
    [:material-language-kotlin: JRE Kotlin Example](https://github.com/amplitude/ampli-examples/tree/main/jre/kotlin/AmpliApp) · [:material-language-java: JRE Java Example](https://github.com/amplitude/ampli-examples/tree/main/jre/java/AmpliApp) · [:material-code-tags-check: Releases](https://www.npmjs.com/package/@amplitude/ampli?activeTab=versions)

--8<-- "includes/ampli-vs-amplitude-link-to-core-sdk.md"
    Click here for more documentation on the [Amplitude Java SDK](./index.md).

!!!note "Deprecated Itly runtime"
    This page covers the JRE Java and Kotlin runtimes. All (Itly) runtimes have been deprecated.
     If you are still using an (Itly) runtime, see the **[migration guide](#migrate-from-an-itly-jre-runtime)** to upgrade to the newest runtime. Docs for the Itly version are available **[here](../../deprecated-sdks/jre.md)**.

## Quick Start

0. [(Prerequisite) Create a Tracking Plan in Amplitude Data](https://help.amplitude.com/hc/en-us/articles/5078731378203)

    Plan your events and properties in [Amplitude Data](https://data.amplitude.com/). See detailed instructions [here](https://help.amplitude.com/hc/en-us/articles/5078731378203)

1. [Install the Amplitude SDK](#install-the-amplitude-sdk)

    ```java
    implementation 'com.amplitude:java-sdk:1.10.0'
    implementation 'org.json:json:20201115'
    ```

2. [Install the Ampli CLI](#install-the-ampli-cli)

    ```shell
    npm install -g @amplitude/ampli
    ```

3. [Pull the Ampli Wrapper into your project](#pull)

    ```shell
    ampli pull [--path ./src/main/java/com/amplitude/ampli]
    ```

4. [Initialize the Ampli Wrapper](#load)

    ```java
    import com.amplitude.ampli.*;
    
    Ampli.getInstance().load(
      new LoadOptions().setEnvironment(Ampli.Environment.PRODUCTION)
    );
    ```

5. [Identify users and set user properties](#identify)

    ```java
    Ampli.getInstance().identify("user-id",
       Identify.builder().userProp("A user property").build()
    );
    ```

6. [Track events with strongly typed methods and classes](#track)

    ```java
    Ampli.getInstance().songPlayed("user_id",
      SongPlayed.builder().songId("song-1").build()
    );
    Ampli.getInstance().track("user_id",
      SongFavorited.builder().songId("song-2").build()
    );
    ```

7. [Flush events before application exit](#flush)

    ```java
    Ampli.getInstance().flush()
    ```

8. [Verify implementation status with CLI](#status)

    ```shell
    ampli status [--update]
    ```

## Installation

### Install the Amplitude SDK

If you haven't already, install the core Amplitude SDK dependencies.

=== "Java"

    - Inside `<dependencies>`, add:

    ```xml
    <dependency>
        <groupId>com.amplitude</groupId>
        <artifactId>java-sdk</artifactId>
        <version>1.6.0</version>
    </dependency>
    <dependency>
        <groupId>org.json</groupId>
        <artifactId>json</artifactId>
        <version>20201115</version>
    </dependency>
    ```

=== "Kotlin"

    ```bash
    implementation 'com.amplitude:java-sdk:1.6.0'
    implementation 'org.json:json:20201115'
    ```

--8<-- "includes/ampli/cli-install-simple.md"

## API

### Load

Initialize Ampli in your code. The `load()` method accepts configuration option arguments:

=== "Java"

    ```java
    import com.amplitude.ampli.*;

    Ampli.getInstance().load(new LoadOptions()
      .setEnvironment(Ampli.Environment.PRODUCTION)
    );
    ```

=== "Kotlin"

    ```java
    import com.amplitude.ampli.*

    ampli.load(LoadOptions(
      environment = Ampli.Environment.PRODUCTION
    ));
    ```

| <div class="big-column">Arg</div> | Description |
|-|-|
| `LoadOptions` | Optional. Defaults to `false`. Specifies configuration options for the Ampli Wrapper.|
|`disabled`|Optional. Specifies whether the Ampli Wrapper does any work. When true, all calls to the Ampli Wrapper are no-ops. Useful in local or development environments.|
|`environment`|Optional. Defaults to `development`. Specifies the environment the Ampli Wrapper runs in: either `production` or `development`. Environment determines which Access Token is used to load the underlying analytics provider libraries. The option also determines safe defaults for handling event validation errors. In production, when the SDK detects an invalid event, it logs an error but stills let the event through. In development, the SDK throws an exception to alert you that something is wrong.|
|`client`|Optional. Specifies an Amplitude instance. By default Ampli creates an instance for you.|
|`apiKey`|Optional. Specifies an API Key. This option overrides the default, which is the API Key configured in your tracking plan.|

### Identify

Call `identify()` to set user properties.

Just as Ampli creates types for events and their properties, it creates types for user properties.

The `identify()` function accepts an optional `userId`, optional user properties, and optional `options`.

For example your tracking plan contains a user property called `userProp`. The property's type is a string.

=== "Java"

    ```java
    Ampli.getInstance().identify("user-id", Identify.builder()
      .userProp("A user property")
      .build()
    );
    ```

=== "Kotlin"

    ```kotlin
    ampli.identify("user-id", Identify(
        userProp = "A trait associated with this user"
    ))
    ```

The options argument allows you to pass [Amplitude fields](https://developers.amplitude.com/docs/http-api-v2#keys-for-the-event-argument) for this call, such as `deviceId`.

=== "Java"

    ```java
    Ampli.getInstance().identify(
      userId,
      Identify.builder().userProp("A trait associated with this user"),.build(),
      new EventOptions().setDeviceId(deviceId).setUserId("some-user"),
    );
    ```

=== "Kotlin"

    ```java
    ampli.identify(userId, Identify(
        userProp = "A trait associated with this user",
      )
      EventOptions(deviceId = "device-id"),
    )
    ```

### Group

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

Call `setGroup()` to associate a user with their group (for example, their department or company). The `setGroup()` function accepts a required `groupType`, and `groupName`.

=== "Java"

    ```java
    Ampli.getInstance().setGroup("user-id", "GroupType", "GroupName");
    ```

=== "Kotlin"

    ```kotlin
    ampli.setGroup("user-id", "GroupType", "GroupName");
    ```

--8<-- "includes/groups-intro-paragraph.md"

 For example, if Joe is in 'orgId' '10' and '20', then the `groupName` is '[10, 20]').

 Your code might look like this:

=== "Java"

    ```java
    Ampli.getInstance().setGroup("user-id", "orgID", ["10", "20"]);
    ```

=== "Kotlin"

    ```kotlin
    ampli.setGroup("user-id", "orgId", ["10", "20"]);
    ```

### Track

To track an event, call the event's corresponding function. Every event in your tracking plan gets its own function in the Ampli Wrapper. The call is structured like this:

=== "Java"

    ```java
    Ampli.getInstance().track(String userId, Event event, EventOptions options, MiddlewareExtra extra)
    ```

=== "Kotlin"

    ```kotlin
    ampli.track(userId: String, event: Event, options: EventOptions, extra: MiddlewareExtra)
    ```

The `options` argument allows you to pass [Amplitude fields](https://developers.amplitude.com/docs/http-api-v2#properties-1),
 like `price`, `quantity` and `revenue`. The `extra` argument lets you pass data to middleware.

For example, in the following code snippet, your tracking plan contains an event called `songPlayed`. The event is defined with two required properties: `songId` and `songFavorited.`
 The property type for `songId` is string, and `songFavorited` is a boolean.

The event has an Amplitude field defined: `deviceId`. Learn more about Amplitude fields
 [here](https://developers.amplitude.com/docs/http-api-v2#properties-1). The event has one MiddlewareExtra defined: `extra`. Learn more about [Middleware](../../ampli/middleware.md).

=== "Java"

    ```java
    MiddlewareExtra extra = new MiddlewareExtra();
    extra.put("extra-key", "extra-value");

    Ampli.getInstance().songPlayed("user-id",
      SongPlayed.builder()
        .songId('songId') // String
        .songFavorited(true) // Boolean
        .build(),
      new EventOptions().setDeviceId(deviceId),
      extra
    );
    ```

=== "Kotlin"

    ```java
    ampli.songPlayed("user-id",
      SongPlayed(
        songId = 'songId', // String,
        songFavorited = true, // Boolean
      ),
      options = EventOptions(deviceId = "device-id"),
      extra = MiddlewareExtra(mapOf("extra-key" to "extra-value")
    );
    ```

Ampli also generates a class for each event.

=== "Java"

    ```java
    SongPlayed event = SongPlayed.builder()
      .songId('songId') // String
      .songFavorited(true) // Boolean
      .build()
    ```

=== "Kotlin"

    ```kotlin
    val myEventObject = SongPlayed(
      songId = 'songId', // String,
      songFavorited = true, // Boolean
    );
    ```

Send Event objects using the generic track method.

=== "Java"

    ```java
    Ampli.getInstance().track("user-id", SongPlayed.builder()
      .songId('songId') // String
      .songFavorited(true) // Boolean
      .build()
    );
    ```

=== "Kotlin"

    ```kotlin
    ampli.track("user-id", SongPlayed(
      songId = 'songId', // String,
      songFavorited = true, // Boolean
    );
    ```

--8<-- "includes/ampli/flush/ampli-flush-section.md"

--8<-- "includes/ampli/flush/ampli-flush-snippet-java.md"

--8<-- "includes/ampli/cli-pull-and-status-section.md"

## Migrate from an Itly JRE Runtime

Migrate from an Itly JRE runtime to Ampli by following these steps.

1. Remove legacy Itly dependencies from your project. This includes anything with a `ly.iterative.itly`.

    ```bash
    implementation "ly.iterative.itly:sdk-jvm:$itlySdkVersion"
    implementation "ly.iterative.itly:plugin-iteratively:$itlySdkVersion"
    implementation "ly.iterative.itly:plugin-schema-validator:$itlySdkVersion"
    implementation "ly.iterative.itly:plugin-segment-jvm:$itlySdkVersion"
    ```

2. Add Amplitude dependencies.

    ```bash
    implementation 'com.amplitude:java-sdk:1.6.0'
    implementation 'org.json:json:20201115'
    ```

3. Pull the latest Ampli Wrapper.

    ```bash
    ampli pull
    ```

4. Check your Ampli Wrapper path.

    `ampli pull` prints the download location of the SDK. If the path contains `itly`, you can update the `Path` by hand in the `ampli.json` file, or pull again using the `--path`
     parameter: `ampli pull -p ./path/to/ampli`.

5. Find and replace:

      **Kotlin and Java:**

    - `import ly.iterative.itly.* => import com.amplitude.ampli.*`
    - `itly.` => `ampli.`
    - `itly.group(groupId)` => `ampli.setGroup(groupType, groupValue)`

      **Kotlin only:**

    - `Itly.load()` => `ampli.load()`
    - `Itly.` => `ampli.`

      **Java only:**

    - `Itly.getInstance().load()` => `Ampli.getInstance().load()`
    - `Itly.` => `Ampli.`

6. See updated Event tracking details on your Implementation page in the web app.
