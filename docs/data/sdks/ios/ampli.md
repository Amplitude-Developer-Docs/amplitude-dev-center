---
title: iOS Ampli Wrapper
description: Learn how to install and use the Ampli Wrapper for the iOS Swift and Objective-C runtimes. 
---

--8<-- "includes/ampli/ampli-overview-section.md"

Amplitude Data supports tracking analytics events from iOS apps written in Swift and Objective-C.

!!!info "Ampli iOS Resources"
    [:material-language-swift: Swift Example](https://github.com/amplitude/ampli-examples/tree/main/ios/swift/v1/AmpliSwiftSampleApp) · [:material-language-c: Objective-C Example](https://github.com/amplitude/ampli-examples/tree/main/ios/objective-c/v1/AmpliObjectiveCSampleApp) · [:material-code-tags-check: Releases](https://www.npmjs.com/package/@amplitude/ampli?activeTab=versions)

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

--8<-- "includes/sdk-swift/swift-install-dependencies.md"

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

You can send all Event objects using the generic track method.

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

## Migration

To migrate to the latest version of Ampli for iOS based on the `Amplitude-Swift` SDK. You will need to make some changes to your code.

### Change your Ampli configuration using the Ampli CLI

1. Run `ampli configure` to configure Ampli to use the new runtime.
```shell
ampli configure
? Select a platform: iOS
? Select a language: Swift
? Select a SDK: AmplitudeSwift ~> 1.0 (recommended)
```
2. Run `ampli pull` to pull the latest version of your tracking plan.

### Update dependencies

See our [migration guide for updating from the maintenance iOS SDK to the latest iOS Swift SDK](/data/sdks/ios-swift/migration). This will help you remove the old SDK and add the new SDK to your project.

### Ampli updates

For the most part Ampli for the latest iOS SDK is backwards compatible with the maintenance iOS SDK. However, there are some changes you will need to make to your code.

#### All Amplitude fields are accessible via EventOptions

All Amplitude fields are now accessible via `EventOptions`. For example, `Ampli.instance.track(event, options: EventOptions(price: 0.99, quanity: 1))`. In the maintenance SDK only a subset of Amplitude fields were accessible.

#### Middleware is replaced by Plugins

Ampli for the latest iOS SDK uses [Plugins](/data/sdk-plugins) instead of [Middleware](/data/sdk-middleware/). Plugins are more flexible and allow you to do more with your data. Any middleware can be converted to an enrichment plugin.

#### Middleware extra is now on EventOptions

The latest version of Ampli removes the `extra` argument from `track()`and `identify()` and replaces it with `EventOptions.extra`.

