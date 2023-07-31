---
title: iOS Ampli Wrapper
description: Learn how to install and use the Ampli Wrapper for the iOS Swift and Objective-C runtimes. 
---

--8<-- "includes/ampli/ampli-overview-section.md"

Amplitude Data supports tracking analytics events from iOS apps written in Swift and Objective-C.

!!!info "Ampli iOS Resources"
    [:material-language-swift: Swift Example](https://github.com/amplitude/ampli-examples/tree/main/ios/swift/AmpliSwiftSampleApp) · [:material-language-c: Objective-C Example](https://github.com/amplitude/ampli-examples/tree/main/ios/objective-c/AmpliObjectiveCSampleApp) · [:material-code-tags-check: Releases](https://www.npmjs.com/package/@amplitude/ampli?activeTab=versions)

--8<-- "includes/ampli-vs-amplitude-link-to-core-sdk.md"
    Visit the [Amplitude iOS SDK](./index.md) documentation.

## Quick Start

0. [(Prerequisite) Create a Tracking Plan in Amplitude Data](https://help.amplitude.com/hc/en-us/articles/5078731378203)

    Plan your events and properties in [Amplitude Data](https://data.amplitude.com/). See detailed instructions [here](https://help.amplitude.com/hc/en-us/articles/5078731378203)

1. [Install the Amplitude SDK](#install-the-amplitude-sdk)

    ```shell
    pod 'Amplitude', '~> 8.14'
    ```

2. [Install the Ampli CLI](#install-the-ampli-cli)

    ```shell
    npm install -g @amplitude/ampli
    ```

3. [Pull the Ampli Wrapper into your project](#pull)

    ```shell
    ampli pull [--path ./Ampli]
    ```

4. [Initialize the Ampli Wrapper](#load)

    ```swift
    Ampli.instance.load(LoadOptions(
      environment: AmpliEnvironment.Production
    ))
    ```

5. [Identify users and set user properties](#identify)

    ```swift
    Ampli.instance.identify("userID", Identify(
        userProp: "A trait associated with this user"
    ))
    ```

6. [Track events with strongly typed methods and classes](#track)

    ```swift
    Ampli.instance.songPlayed(SongPlayed(songId: 'song-1');
    Ampli.instance.track(SongFavorited(songId: 'song-2');
    ```

7. [Flush events before application exit](#flush)

    ```swift
    Ampli.instance.flush()
    ```

8. [Verify implementation status with CLI](#status)

    ```shell
    ampli status [--update]
    ```

## Installation

### Install the Amplitude SDK

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

          pod 'Amplitude', "~> 8.14"
        end
        ```
    === "Objective-C"

        ```objectivec
        platform :ios, '10.0'

        target '{Project-Name}' do
          use_frameworks!

          pod 'Amplitude', "~> 8.14"
        end
        ```

4. Run `pod install`
5. Open Xcode. Don't open the .xcodeproj file, instead open the .xcodeworkspace file.

--8<-- "includes/ampli/cli-install-simple.md"

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
|`LoadOptions`| Required. Specifies configuration options for the Ampli Wrapper.|
|`environment`| Required. String. Specifies the environment the Ampli Wrapper is running in. For example,  `production` or `development`. Create, rename, and manage environments in Amplitude Data.<br /><br />Environment determines which API token is used when sending events.<br /><br />If a `client.apiKey` or `client.instance` is provided, `environment` is ignored, and can be omitted.|
|`disabled`|Optional. Specifies whether the Ampli Wrapper does any work. When true, all calls to the Ampli Wrapper are no-ops. Useful in local or development environments.|
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
<!-- vale off-->
 Setting a group also sets the groupType:groupName' as a user property, and overwrites any existing groupName value set for that user's groupType, and the corresponding user property value. groupType is a string, and groupName can be either a string or an array of strings to indicate that a user is in multiple groups. For example, if Joe is in 'orgId' '10' and '20', then the `groupName` is '[10, 20]').
<!--vale on-->
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

For example, in the following code snippet, your tracking plan contains an event called `songPlayed`. The event is defined with two required properties: `songId` and `songFavorited.` The property type for `songId` is string, and `songFavorited` is a boolean.

The event has two Amplitude fields defined: `price`, and `quantity`. Learn more about Amplitude fields [here](https://developers.amplitude.com/docs/http-api-v2#properties-1). The event has one MiddlewareExtra defined: `myMiddleware`. Learn more about [Middleware](../../../sdk-middleware).

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
    ];

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

You can send all Even objects using the generic track method.

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

--8<-- "includes/ampli/flush/ampli-flush-section.md"

--8<-- "includes/ampli/flush/ampli-flush-snippet-ios.md"

--8<-- "includes/ampli/cli-pull-and-status-section.md"
