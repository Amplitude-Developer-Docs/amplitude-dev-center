---
title: Android Ampli Wrapper
description: Learn how to install and use the Amplitude Data Ampli Wrapper for the Android Java and Kotlin runtimes.
---

--8<-- "includes/ampli/ampli-overview-section.md"

Amplitude Data supports tracking analytics events from Android apps written in Kotlin and Java.

<!--vale off-->
!!!info "Ampli Android Resources (Legacy)"
    [:material-language-kotlin: Kotlin Example](https://github.com/amplitude/ampli-examples/tree/main/android/kotlin/v1/AmpliApp) · [:material-language-java: Java Example](https://github.com/amplitude/ampli-examples/tree/main/android/java/v1/AmpliApp) · [:material-code-tags-check: Releases](https://www.npmjs.com/package/@amplitude/ampli?activeTab=versions)

--8<-- "includes/ampli-vs-amplitude-link-to-core-sdk.md"
    Visit the [Amplitude Android SDK](./index.md) documentation.

## Quick Start

0. [(Prerequisite) Create a Tracking Plan in Amplitude Data](https://help.amplitude.com/hc/en-us/articles/5078731378203)

    Plan your events and properties in [Amplitude Data](https://data.amplitude.com/). See detailed instructions [here](https://help.amplitude.com/hc/en-us/articles/5078731378203)

1. [Install the Amplitude SDK](#install-the-amplitude-sdk)

    ```java
    implementation 'com.amplitude:android-sdk:[2.37.0,3.0)'
    implementation 'com.squareup.okhttp3:okhttp:4.9.3'
    ```

2. [Install the Ampli CLI](#install-the-ampli-cli)

    ```shell
    npm install -g @amplitude/ampli
    ```

3. [Pull the Ampli Wrapper into your project](#pull)

    ```shell
    ampli pull [--path ./app/src/main/java/com/amplitude/ampli]
    ```

4. [Initialize the Ampli Wrapper](#load)

    ```kotlin
    import com.amplitude.ampli.*
    
    ampli.load(appContext, LoadOptions(
      client = LoadClientOptions(apiKey = AMPLITUDE_API_KEY)
    ))
    ```

5. [Identify users and set user properties](#identify)

    ```kotlin
    ampli.identify(userId, Identify(
        userProp = "A trait associated with this user"
    ))
    ```

6. [Track events with strongly typed methods and classes](#track)

    ```kotlin
    ampli.songPlayed(songId = "song-1")
    ampli.track(SongFavorited(songId = "song-2"))
    ```

7. [Flush events before application exit](#flush)

    ```kotlin
    ampli.flush()
    ```

8. [Verify implementation status with CLI](#status)

    ```shell
    ampli status [--update]
    ```

## Installation

### Install the Amplitude SDK

If you haven't already, install the core Amplitude SDK dependencies.

=== "Java"

    ```shell
    implementation 'com.amplitude:android-sdk:[2.37.0,3.0)'
    implementation 'com.squareup.okhttp3:okhttp:4.9.3'
    ```

=== "Kotlin"

    ```shell
    implementation 'com.amplitude:android-sdk:[2.37.0,3.0)'
    implementation 'com.squareup.okhttp3:okhttp:4.9.3'
    ```

!!!note
  
    If you're not already requesting the [INTERNET permission](https://developer.android.com/reference/android/Manifest.permission#INTERNET), add `<uses-permission android:name="android.permission.INTERNET" />` to your AndroidManifest.xml.

--8<-- "includes/ampli/cli-install-simple.md"

## API

### Load

Initialize Ampli in your code. The `load()` method accepts configuration option arguments:

=== "Java"

    ```java
    import com.amplitude.ampli.*;

    Ampli.getInstance().load(this, new LoadOptions()
      .setClient(new LoadClientOptions().setApiKey(AMPLITUDE_API_KEY))
    );
    ```

=== "Kotlin"

    ```kotlin
    import com.amplitude.ampli.*

    ampli.load(appContext, LoadOptions(
      client = LoadClientOptions(apiKey = AMPLITUDE_API_KEY)
    ))
    ```

| <div class ="big-column">Arg</div> | Description |
|-|-|
| `appContext`| An object with a set of properties to add to every event sent by the Ampli Wrapper.<br /><br /> This option is available when there is at least one source template associated with your team's tracking plan.|
|`LoadOptions`| Required. Specifies configuration options for the Ampli Wrapper.|
|`environment`| Required. String. Specifies the environment the Ampli Wrapper is running in e.g. `production` or `development`. Environments can be created, renamed, and managed in Amplitude Data.<br /><br />Environment determines which API token is used when sending events.<br /><br />If an `client.apiKey` or `client.instance` is provided, `environment` will be ignored, and can be omitted.|
|`disabled`|Optional. Specifies whether the Ampli Wrapper does any work. When true, all calls to the Ampli Wrapper are no-ops. Useful in local or development environments.|
|`client.instance`| Optional. Specifies an Amplitude instance. By default Ampli creates an instance for you.|
|`client.apiKey`|Optional. Specifies an API Key. This option overrides the default, which is the API Key configured in your tracking plan.|

### Identify

Call `identify()` to identify a user in your app and associate all future events with their identity, or to set their properties.

Just as Ampli creates types for events and their properties, it creates types for user properties.

The `identify()` function accepts an optional `userId`, optional user properties, and optional `options`.

For example your tracking plan contains a user property called `userProp`. The property's type is a string.

=== "Java"

    ```java
    Ampli.getInstance().identify(userId, Identify.builder()
      .userProp("A trait associated with this user")
      .build()
    );
    ```

=== "Kotlin"

    ```kotlin
    ampli.identify(userId, Identify(
        userProp = "A trait associated with this user"
    ))
    ```

The options argument allows you to pass [Amplitude fields](https://developers.amplitude.com/docs/http-api-v2#keys-for-the-event-argument) for this call, such as `deviceId`.

=== "Java"

    ```java
    Ampli.getInstance().identify(
      userId,
      Identify.builder() .userProp("A trait associated with this user").build(),
      new EventOptions().setDeviceId(deviceId),
      extra
    );
    ```

=== "Kotlin"

    ```kotlin
    ampli.identify(
      userId,
      Identify(
          userProp = "A trait associated with this user",
      )
      EventOptions(deviceId = "device-id"),
      extra
    )
    ```

### Group

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

Call `setGroup()` to associate a user with their group (for example, their department or company). The `setGroup()` function accepts a required `groupType`, and `groupName`.

=== "Java"

    ```java
    Ampli.getInstance().setGroup("groupType", "groupName");
    ```

=== "Kotlin"

    ```kotlin
    ampli.setGroup("groupType", "groupName");
    ```

--8<-- "includes/groups-intro-paragraph.md"
<!--vale off-->
 Setting a group also sets the 'groupType:groupName' as a user property, and overwrites any existing `groupName` value set for that user's groupType, and the corresponding user property value. `groupType` is a string, and `groupName` can be either a string or an array of strings to show that a user is in multiple groups. For example, if Joe is in 'orgId' '10' and '20', then the `groupName` is '[10, 20]').
 <!--vale on-->

 Your code might look like this:

=== "Java"

    ```java
    Ampli.getInstance().setGroup("orgID", ["10", "20"]);
    ```

=== "Kotlin"

    ```kotlin
    ampli.setGroup("orgId", ["10", "20"]);
    ```

### Track

To track an event, call the event's corresponding function. Every event in your tracking plan gets its own function in the Ampli Wrapper. The call is structured like this:

=== "Java"

    ```java
    Ampli.getInstance().eventName(EventName event, EventOptions options, MiddlewareExtra extra)
    ```

=== "Kotlin"

    ```kotlin
    ampli.eventName(...eventNameProperties)
    ```

The `options` argument allows you to pass [Amplitude fields](https://developers.amplitude.com/docs/http-api-v2#properties-1), like `deviceID`. The `extra` argument lets you pass data to middleware.

For example, in the following code snippets, your tracking plan contains an event called `songPlayed`. The event is defined with two required properties: `songId` and `songFavorited.` The property type for `songId` is string, and `songFavorited` is a boolean.

 The event has one MiddlewareExtra defined: `extra`. Learn more about [Middleware](../../../sdk-middleware).

=== "Java"

    ```java
    Ampli.getInstance().songPlayed(SongPlayed.builder()
      .songId('songId') // String
      .songFavorited(true) // Boolean
      .build()
    );
    ```

=== "Kotlin"

    ```kotlin
    ampli.songPlayed(
      songId = 'songId', // String,
      songFavorited = true, // Boolean
    )
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

Send event objects using the generic track method.

=== "Java"

    ```java
    Ampli.getInstance().track(SongPlayed.builder()
        .songId('songId') // String
        .songFavorited(true) // Boolean
        .build())
    ```

=== "Kotlin"

    ```kotlin
    ampli.track(SongPlayed(
      songId = 'songId', // String,
      songFavorited = true, // Boolean
    );
    ```

--8<-- "includes/ampli/flush/ampli-flush-section.md"

--8<-- "includes/ampli/flush/ampli-flush-snippet-java.md"

--8<-- "includes/ampli/cli-pull-and-status-section.md"
