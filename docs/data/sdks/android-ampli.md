---
title: Android Ampli Wrapper
description: Learn how to install and use the Amplitude Data Ampli Wrapper for the Android Java and Kotlin runtimes. 
icon: material/android
---

!!!note
    This page covers the Android Java and Kotlin runtimes. All (Itly) runtimes are deprecated. If you are still using an (Itly) runtime, see the **[migration guide](#migrating-from-previous-version)** to upgrade to the newest runtime. Docs for the Itly version are available **[here](browser)**.

Amplitude Data supports tracking analytics events from Android apps (API 22 and above) written in Kotlin and Java.

In Kotlin and Java, the tracking library exposes a type-safe function for every event in your team’s tracking plan. The function’s arguments correspond to the event’s properties and are strongly typed to allow for code completion and compile-time checks.

!!!tip

    See example apps that use the Android Java and Kotlin runtimes on [GitHub](https://github.com/amplitude/ampli-examples/tree/main/android).

## Installation

These instructions are also available from the **Implementation** page of your Amplitude Data workspace.

### Install the Ampli CLI

If you haven't installed the Ampli CLI, [install it now](/data/using-the-ampli-cli).

### Install dependencies

If you haven't already, install the core Amplitude SDK dependencies.

=== "Java"

    ```bash
    implementation 'com.amplitude:android-sdk:2.35.2'
    implementation 'com.squareup.okhttp3:okhttp:4.9.3'
    ```

=== "Kotlin"

    ```bash
    implementation 'com.amplitude:android-sdk:2.35.2'
    implementation 'com.squareup.okhttp3:okhttp:4.9.3'
    ```

!!!note
  
    If you're not already requesting the [INTERNET permission](https://developer.android.com/reference/android/Manifest.permission#INTERNET), add `<uses-permission android:name="android.permission.INTERNET" />` to your AndroidManifest.xml.

### Pull the SDK into your project

At the project root, run `pull` command.

```bash
ampli pull
```

This prompts you to log in to your workspace and select a source.

=== "Java"

    ```bash
    ➜ ampli pull sourcename
    Ampli project is not initialized. No existing `ampli.json` configuration found.
    ? Create a new Ampli project here? Yes
    Organization: Amplitude
    Workspace: My Workspace
    Source: sourcename
    Runtime: Android - Java
    Branch: main
    Pulling latest version (1.0.0)...
    Tracking library generated successfully.
    Path: ./src/itly
    ```

=== "Kotlin"

    ```bash
    ➜ ampli pull sourcename
    Ampli project is not initialized. No existing `ampli.json` configuration found.
    ? Create a new Ampli project here? Yes
    Organization: Amplitude
    Workspace: My Workspace
    Source: sourcename
    Runtime: Android - Kotlin
    Branch: main
    Pulling latest version (1.0.0)...
    Tracking library generated successfully.
    Path: ./src/itly
    ```

## API

### Load

Initialize Ampli in your code. The `load()` method accepts configuration option arguments:

=== "Java"

    ```java
    import com.amplitude.ampli.*;

    Ampli.getInstance().load(appContext, new LoadOptions()
      .setEnvironment(Ampli.Environment.PRODUCTION)
    );
    ```

=== "Kotlin"

    ```java
    import com.amplitude.ampli.*

    ampli.load(appContext, LoadOptions(
      environment = Ampli.Environment.PRODUCTION
    ));
    ```

| <div class ="big-column">Arg</div> | Description |
|-|-|
| `appContext`| An object with a set of properties to add to every event sent by the Ampli Wrapper.<br /><br /> This option is available when there is at least one [source template](/working-with-templates#adding-a-template-to-a-source) associated with your team's tracking plan.|
| `LoadOptions` | Optional. Specifies configuration options for the Ampli Wrapper.|
|`disabled`|Optional. Specifies whether the Ampli Wrapper does any work. When true, all calls to the Ampli Wrapper are no-ops. Useful in local or development environments.|
|`environment`|Optional. Defaults to `development`. Specifies the environment the Ampli Wrapper runs in: either `production` or `development`. Environment determines which Access Token is used to load the underlying analytics provider libraries. The option also determines safe defaults for handling event validation errors. In production, when the SDK detects an invalid event, it logs an error but stills let the event through. In development, the SDK throws an exception to alert you that something is wrong.|
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

 Setting a group also sets the 'groupType:groupName' as a user property, and overwrites any existing groupName value set for that user's groupType, and the corresponding user property value. groupType is a string, and groupName can be either a string or an array of strings to indicate that a user is in multiple groups. For example, if Joe is in 'orgId' '10' and '20', then the `groupName` is '[10, 20]').

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

For example, in the code snippet below, your tracking plan contains an event called `songPlayed`. The event is defined with two required properties: `songId` and `songFavorited.` The property type for `songId` is string, and `songFavorited` is a boolean.

 The event has one MiddlewareExtra defined: `extra`. Learn more about [Middleware](#middleware).


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

##  Verify implementation status

Verify that events are implemented in your code with the status command:

```bash
ampli status
```

To update the implementation status in your tracking plan use the `--update` flag or `-u`:

```bash
ampli status -u
```
The output displays status and indicates what events are missing.

```bash
➜ ampli status
✘ Verifying event tracking implementation in source code
 ✔ Song Played (1 location)
 ✘ Song Stopped Called when a user stops playing a song.
Events Tracked: 2 missed, 3 total
```

Learn more about [`ampli status`](https://developers.data.amplitude.com/using-the-ampli-cli/#ampli-status).


## Migrating from an Itly Android runtime

Migrate from an Itly Android runtime to Ampli by following these steps.

1. Remove legacy Itly dependencies from your project. This includes anything with a `ly.iterative.itly`.

    ```bash
    implementation "ly.iterative.itly:sdk-android:$itlySdkVersion"
    implementation "ly.iterative.itly:plugin-iteratively:$itlySdkVersion"
    implementation "ly.iterative.itly:plugin-schema-validator:$itlySdkVersion"
    implementation "ly.iterative.itly:plugin-amplitude-android:$itlySdkVersion"
    implementation "ly.iterative.itly:plugin-mixpanel-android:$itlySdkVersion"
    implementation "ly.iterative.itly:plugin-mparticle-android:$itlySdkVersion"
    implementation "ly.iterative.itly:plugin-segment-android:$itlySdkVersion"
    ```

2. Add Amplitude dependencies.

    ```bash
    implementation 'com.amplitude:android-sdk:2.35.2'
    // https://github.com/amplitude/Amplitude-Android/issues/309
    implementation 'com.squareup.okhttp3:okhttp:4.9.3'
    ```

3. Pull the latest Ampli Wrapper.

    ```bash
    ampli pull
    ```

4. Check your Ampli Wrapper path.
    `ampli pull` prints the location of where the new SDK was downloaded. If this still contains `itly` you can update the `Path` by hand in the `ampli.json` file, or pull again using the `--path` parameter: `ampli pull -p ./path/to/ampli`.

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
