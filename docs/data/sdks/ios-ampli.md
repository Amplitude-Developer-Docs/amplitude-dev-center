---
title: iOS Ampli Wrapper
description: Learn how to install and use the Ampli Wrapper for the iOS Swift and Objective-C runtimes. 
---

!!! note
    This page covers the iOS Swift and Objective-C runtimes. All (Itly) runtimes are deprecated. If you are still using an (Itly) runtime, see the **[migration guide](#migrating-from-an-itly-ios-runtime)** to upgrade to the newest runtime. Docs for the Itly version are available **[here](/data/deprecated-sdks/ios)**.

Iteratively supports tracking analytics events from iOS apps written in Swift and Objective-C.

In Swift and Objective-C, the tracking library exposes a type-safe function for every event in your team’s tracking plan. The function’s arguments correspond to the event’s properties and are strongly typed to allow for code completion and compile-time checks.

!!! tip
    See example apps that use the iOS Swift and Objective-C runtimes on [GitHub](https://github.com/amplitude/ampli-examples/tree/main/ios).

## Installation

These instructions are also available from the **Implementation** page of your Iteratively workspace.

### Install the Ampli CLI

If you haven't installed the Ampli CLI, [install it now](/data/using-the-ampli-cli).

### Install dependencies

If you haven't already, install the core Amplitude SDK dependencies.

To install these dependencies with CocoaPods:

1. Close Xcode
2. Install CocoaPods with `sudo gem install cocoapods`.
3. Create a file called `Podfile` in the project root folder (the one with your .xcodeproj) and edit it to contain this code:

    === "Swift"

        ```swift
        platform :ios, '10.0'

        target '{Project-Name}' do
          use_frameworks!

          pod 'Amplitude', "~> 8.6.0"
        end
        ```
    === "Objective-C"

        ```objectivec
        platform :ios, '10.0'

        target '{Project-Name}' do
          use_frameworks!

          pod 'Amplitude', "~> 8.6.0"
        end
        ```

4. Run `pod install`
5. Open Xcode. Don't open the .xcodeproj file, instead open the .xcodeworkspace file.

### Pull the SDK into your project

At the project root, run `pull` command.

```bash
ampli pull
```

This prompts you to log in to your workspace and select a source.

=== "Swift"
    ```bash
    ➜ ampli pull sourcename
    Ampli project is not initialized. No existing `ampli.json` configuration found.
    ? Create a new Ampli project here? Yes
    Organization: Amplitude
    Workspace: My Workspace
    Source: sourcename
    Runtime: iOS - Swift
    Branch: main
    Pulling latest version (1.0.0)...
    Tracking library generated successfully.
    Path: ./src/itly
    ```

=== "Objective-C"

    ```bash
    ➜ ampli pull sourcename
    Ampli project is not initialized. No existing `ampli.json` configuration found.
    ? Create a new Ampli project here? Yes
    Organization: Amplitude
    Workspace: My Workspace
    Source: sourcename
    Runtime: iOS - Obj-C
    Branch: main
    Pulling latest version (1.0.0)...
    Tracking library generated successfully.
    Path: ./src/itly
    ```

## API

### Load

Initialize Ampli in your code. The `load()` method accepts configuration option arguments:

=== "Swift"

    ```swift
    Ampli.instance.load(LoadOptions(
      environment: AmpliEnvironment.Production
    ));
    ```
=== "Objective-C"

    ```objectivec
    #import "Ampli.h"
    [Ampli.instance load:[LoadOptions builderBlock:^(LoadOptionsBuilder *b) {
        b.environment = development;
    }]];
    ```

| Arg | Description |
|-|-|
| `LoadOptions` | Optional. Defaults to `false`. Specifies configuration options for the Ampli Wrapper.|
|`disabled`|Optional. Specifies whether the Ampli Wrapper does any work. When true, all calls to the Ampli Wrapper are no-ops. Useful in local or development environments.|
|`environment`|Optional. Defaults to `development`. Specifies the environment the Ampli Wrapper runs in: either `production` or `development`. Environment determines which Access Token is used to load the underlying analytics provider libraries. The option also determines safe defaults for handling event validation errors. In production, when the SDK detects an invalid event, it logs an error but stills let the event through. In development, the SDK throws an exception to alert you that something is wrong.|
|`instance`|Optional. Specifies an Amplitude instance. By default Ampli creates an instance for you.|
|`apiKey`|Optional. Specifies an API Key. This option overrides the default, which is the API Key configured in your tracking plan.|

### Identify

Call `identify()` to identify a user in your app and associate all future events with their identity, or to set their properties.

Just as the Ampli Wrapper creates types for events and their properties, it creates types for user properties.

The `identify()` function accepts an optional `userId`, optional user properties, and optional `options`.

For example your tracking plan contains a user property called `userProp`. The property's type is a string.

=== "Swift"

    ```swift
    Ampli.instance.identify("userID", Identify(
      userProp: "A trait associated with this user"
    ));
    ```

=== "Objective-C"

    ```objectivec
    [Ampli.instance identify:@"userID" event:[Identify userProp:@"A trait associated with this user"]];
    ```

The options argument allows you to pass [Amplitude fields](https://developers.amplitude.com/docs/http-api-v2#keys-for-the-event-argument) for this call, such as `deviceId`.

=== "Swift"

    ```swift
    Ampli.instance.identify("userID", Identify(deviceID: "my_device_id")
    ```

=== "Objective-C"

    ```objectivec
    [Ampli.instance identify:@"userID" event:[Identify deviceID: "my_device_id"];
    ```

### Group

!!! note
    This feature is available for Growth customers who have purchased the [Accounts add-on](https://help.amplitude.com/hc/en-us/articles/115001765532).

Call `setGroup()` to associate a user with their group (for example, their department or company). The `setGroup()` function accepts a required `groupType`, and `groupName`.

=== "Swift"

    ```swift
    Ampli.instance.setGroup("groupType", "groupName")
    ```

=== "Objective-C"

    ```objectivec
    [Ampli.instance setGroup:"groupType" value:"groupName"]
    ```

Amplitude supports assigning users to groups and performing queries, such as Count by Distinct, on those groups. If at least one member of the group has performed the specific event, then the count includes the group.

For example, you want to group your users based on what organization they're in by using an 'orgId'. Joe is in 'orgId' '10', and Sue is in 'orgId' '15'. Sue and Joe both perform a certain event. You can query their organizations in the Event Segmentation Chart.

When setting groups, define a `groupType` and `groupName`. In the previous example, 'orgId' is the `groupType` and '10' and '15' are the values for `groupName`. Another example of a `groupType` could be 'sport' with `groupName` values like 'tennis' and 'baseball'.

 Setting a group also sets the 'groupType:groupName' as a user property, and overwrites any existing groupName value set for that user's groupType, and the corresponding user property value. groupType is a string, and groupName can be either a string or an array of strings to indicate that a user is in multiple groups. For example, if Joe is in 'orgId' '10' and '20', then the `groupName` is '[10, 20]').

 Your code might look like this:

=== "Swift"

    ```swift
    Ampli.instance.setGroup("orgID", ["10", "20"])
    ```

=== "Objective-C"

    ```objc
    [Ampli.instance setGroup:"orgID" value:["10", "20"]]
    ```

### Track

To track an event, call the event's corresponding function. Every event in your tracking plan gets its own function in the Ampli Wrapper. The call is structured like this:

=== "Swift"

    ```swift
    Ampli.instance.track(_ event: Event, options: EventOptions, extra: MiddlewareExtra)
    ```

=== "Objective-C"

    ```objectivec
    [Ampli.instance track:(Event *)event
                    options:(EventOptions *_Nullable)options
                    extra:(MiddlewareExtra *_Nullable)extra
    ];
    ``

The `options` argument allows you to pass [Amplitude fields](https://developers.amplitude.com/docs/http-api-v2#properties-1), like `deviceID`. The `extra` argument lets you pass data to middleware.

!!! note
    EventOptions are set via generic track and aren't exposed on the strongly typed event methods such as `Ampli.instance.songPlayed(songId: 'id', songFavorited: true)`.

For example, in the code snippet below, your tracking plan contains an event called `songPlayed`. The event is defined with two required properties: `songId` and `songFavorited.` The property type for `songId` is string, and `songFavorited` is a boolean.

The event has two Amplitude fields defined: `price`, and `quantity`. Learn more about Amplitude fields [here](https://developers.amplitude.com/docs/http-api-v2#properties-1). The event has one MiddlewareExtra defined: `myMiddleware`. Learn more about [middleware](#middleware-overview.md).

=== "Swift"

    ```swift
    Ampli.instance.track(SongPlayed(songId: 'songId', songFavorited: true), options: EventOptions(deviceId: 'deviceId'))
    );
    ```

=== "Objective-C"

    ```objectivec
    SongPlayed* event = [SongPlayed
        songId:'songId', // NSString *
        songFavorited:true, // NSNumber *
    ]];

    EventOptions* options = [EventOptions builderBlock:^(EventOptionsBuilder *builder) {
        builder.deviceId = deviceId;
        builder.userId = userId;
    }];

    [Ampli.instance track:event options:options]
    ```

Ampli also generates a class for each event.

=== "Swift"

    ```swift
    let myEventObject = SongPlayed(
      songId: 'songId', // String,
      songFavorited: true, // Bool
    );
    ```

=== "Objective-C"

    ```objectivec
    SongPlayed *songPlayed = [SongPlayed
        songId:'songId', // NSString *
        songFavorited:true, // NSNumber *
    ];
    ```

All event objects can be sent using the generic track method.

=== "Swift"

    ```swift
    Ampli.instance.track(SongPlayed(
      songId: 'songId', // String,
      songFavorited: true, // Bool
    );
    ```

=== "Objective-C"

    ```objectivec
    [Ampli.instance track:[SongPlayed
        songId:'songId', // NSString *
        songFavorited:true, // NSNumber *
    ]];
    ```

## Verify implementation status

Verify events are implemented in your code with the status command:

```bash
ampli status
```

To update the implementation status in your tracking plan use the `--update` flag or `-u`:

```bash
ampli status -u
```

The output displays status and indicates which events are missing.

```bash
➜ ampli status
✘ Verifying event tracking implementation in source code
 ✔ Song Played (1 location)
 ✘ Song Stopped Called when a user stops playing a song.
Events Tracked: 2 missed, 3 total
```

Learn more about [`ampli status`](/data/using-the-ampli-cli.md#ampli-status).

## Migrating from an Itly iOS runtime

Migrate from an Itly iOS runtime to Ampli by following these steps.

1. Remove legacy Itly dependencies from your project. This includes anything with a `ly.iterative.itly`.

    ```bash
    pod "ItlySdk", '~> 1.X'
    pod "ItlyAmplitudePlugin", '~> 1.X'
    pod "ItlyIterativelyPlugin", '~> 1.X'
    pod "ItlySchemaValidatorPlugin", '~> 1.X'
    pod "ItlyMixpanelPlugin", '~> 1.X'
    pod "ItlySegmentPlugin", '~> 1.X'
    ```

2. Add Amplitude dependencies.

    ```bash
    platform :ios, '10.0'

    target '{Project-Name}' do
      use_frameworks!

      pod 'Amplitude', "~> 8.6"
    end
    ```

3. Install pods.

    ```bash
    pod install
    ```

4. Pull the latest Ampli Wrapper.

    ```bash
    ampli pull
    ```

5. Check your Ampli Wrapper path.

    `ampli pull` prints the download location of the SDK. If the path contains `itly`, you can update the `Path` by hand in the `ampli.json` file, or pull again using the `--path` parameter: `ampli pull -p ./path/to/ampli`.

6. Find and replace:

    **Swift and Objective-C:**
      - `Itly => Ampli`

    **Swift only:**

      - `Itly.instance.load() => Ampli.instance.load()`
      - `Itly.instance.group(groupId) => Ampli.instance.setGroup(groupType, groupValue)`
      - `Itly. => Ampli.`

    **Objective-C only:**

      - `[Itly.instance load] => [Ampli.instance load]`
      - `[Itly.group:groupId] => [Ampli.setGroup:groupType groupValue:groupValue)`
      - `[Itly instance] => [Ampli instance]`

7. See updated Event tracking details on your Implementation page in the web app.
