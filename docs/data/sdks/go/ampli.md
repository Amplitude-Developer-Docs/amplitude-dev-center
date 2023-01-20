---
title: Go Ampli Wrapper (Beta)
description:  Learn how to install and use the Amplitude Data Ampli Wrapper for the Go runtimes.
---

--8<-- "includes/ampli/ampli-overview-section.md"

Amplitude Data supports tracking analytics events from Go apps. The generated tracking library is packaged as a Go package.

!!!alpha "Go Ampli Resources (Beta)"
    [:material-github: Examples](https://github.com/amplitude/ampli-examples/tree/main/go/simple/v2) · [:material-code-tags-check: Releases](https://www.npmjs.com/package/@amplitude/ampli?activeTab=versions)

--8<-- "includes/ampli-vs-amplitude-link-to-core-sdk.md"
    Click here for more documentation on the [Amplitude Go SDK](./index.md).

## Quick Start

0. [(Prerequisite) Create a Tracking Plan in Amplitude Data](https://help.amplitude.com/hc/en-us/articles/5078731378203)

    Plan your events and properties in [Amplitude Data](https://data.amplitude.com/). See detailed instructions [here](https://help.amplitude.com/hc/en-us/articles/5078731378203)

1. [Install the Amplitude SDK](#install-the-amplitude-sdk)

    ```shell
    go get https://github.com/amplitude/analytics-go
    ```

2. [Install the Ampli CLI](#install-the-ampli-cli)

    ```shell
    npm install -g @amplitude/ampli
    ```

3. [Pull the Ampli Wrapper into your project](#pull)

    ```shell
    ampli pull [--path ./ampli]
    ```

4. [Initialize the Ampli Wrapper](#load)

    ```golang
    import "<your-module-name>/ampli"

    ampli.Instance.Load(ampli.LoadOptions{
        Environment: ampli.EnvironmentProduction,
    })
    ```

5. [Identify users and set user properties](#identify)

    ```golang
    ampli.Instance.Identify(userID, ampli.Identify.Builder().
        UserProp("A trait associated with this user").Build()
    )
    ```

6. [Track events with strongly typed methods and classes](#track)

    ```golang
    ampli.Instance.SongPlayed("user_id", SongPlayed().Builder().SongId("song-1").Build())
    ampli.Instance.Track("user_id", SongFavorited().Builder().SongId("song-2").Build())
    ```

7. [Flush events before application exit](#flush)

    ```golang
    ampli.Instance.Flush()
    ```

8. [Verify implementation status with CLI](#status)

    ```shell
    ampli status [--update]
    ```

## Installation

### Install the Amplitude SDK

If you haven't already, install the core Amplitude SDK dependencies `analytics-go` using `go get`:

```shell
go get https://github.com/amplitude/analytics-go
```

--8<-- "includes/ampli/cli-install-simple.md"

## API

### Load

Initialize Ampli in your code. The `Load()` method requires a configuration options parameter:

```Go
import  "<your-module-name>/ampli"

ampli.Instance.Load(ampli.LoadOptions{
    Environment: ampli.EnvironmentProduction,
})
```

| <div class ="big-column">Arg of load()</div> | Description |
|-|-|
|`options`| Required. A instance of LoadOptions. Specifies configuration options for the Ampli Wrapper.|

| <div class ="big-column">Arg of LoadOptions</div> | Description |
|-|-|
|`Environment`| Required. String. Specifies the environment the Ampli Wrapper is running in. For example,  `EnvironmentProduction` or `EnvironmentDevelopment`. Create, rename, and manage environments in Amplitude Data.<br /><br />Environment determines which API token is used when sending events.<br /><br />If a `Client.ApiKey` or `Client.Instance` is provided, `Environment` is ignored, and can be omitted.|
|`Disabled`|Specifies whether the Ampli Wrapper does any work. When true, all calls to the Ampli Wrapper are no-ops. Useful in local or development environments.|
|`Environment`|Specifies the environment the Ampli Wrapper runs in: either `EnvironmentDevelopment` or `EnvironmentProduction`. Environment determines which Access Token is used to load the underlying analytics provider libraries.|
|`Client`| A instance of LoadClientOptions specifies configuration options for the Amplitude core SDK client.|

| <div class ="big-column">Arg of LoadClientOptions</div> | Description |
|-|-|
|`Instance`| Specifies an Amplitude instance. By default Ampli creates an instance for you.|
|`APIKey`| Specifies an API Key. This option overrides the default, which is the API Key configured in your tracking plan.|
|`Configuration`| Specifies the Amplitude configuration. This option overrides the default configuration.|

### Identify

Call `Identify()` to identify a user in your app and associate all future events with their identity, or to set their properties.

Just as Ampli creates types for events and their properties, it creates types for user properties.

The `Identify()` function accepts a string `userID`, an Identify event instance, and `amplitude.EventOptions`.

All properties are passed in as parameters of methods to `ampli.Identify.Builder()`. For example your tracking plan only contains a required user property called `role`. The property's type is a string.

```Go
ampli.Instance.Identify(
    "user_id",
    ampli.Identify.Builder().Role("admin").Build(),
)
```

The options argument allows you to pass [Amplitude fields](https://developers.amplitude.com/docs/http-api-v2#keys-for-the-event-argument) for this call, such as `DeviceID`.

```Go
ampli.Instance.Identify(
    "user_id",
    ampli.Identify.Builder().Role("admin").Build(),
    amplitude.EventOptions{
        DeviceID: "divice_id",
    },
)
```

### Group Identify

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

Call `GroupIdentify()` to identify a group in your app and set/update group properties.

Just as Ampli creates types for events and their properties, it creates types for group properties.

The `GroupIdentify()` function accepts a string `groupType`, a string `groupName`, an Group event instance, and `EventOptions`.

For example your tracking plan contains a group `sport:football` has a required property called `totalMember`. The property's type is a int.

```Go
ampli.Instance.GroupIdentify(
    "sport",
    "football",
    ampli.NewGroup(23),
    amplitude.EventOptions{},
)
```

The same with `NewIdentify()`, if your tracking plan contains an optional property called `totalMember`.

```Go
ampli.Instance.GroupIdentify(
    "sport",
    "football",
    ampli.NewGroup().OptionalTotalMember(23),
    amplitude.EventOptions{},
)
```

### Set group

Call `SetGroup()` to associate a user with their group (for example, their department or company). The `SetGroup()` function accept `userID` `groupType`, `groupName` and EventOptions.

```Go
ampli.Instance.SetGroup("user-id", "sport", []string{"football"}, amplitude.EventOptions{})
```

Multiple group names can be set at once.

```Go
ampli.Instance.SetGroup("user-id", "sport", []string{"football", "basketball"}, amplitude.EventOptions{})
```

### Track

To track an event, call the event's corresponding function. Every event in your tracking plan gets its own function in the Ampli Wrapper. The call is structured like this:

```Go
ampli.Instance.EventName(userID, ampli.EventName.Builder().eventProp(true).Build(), amplitude.EventOptions{})
```

`EventOptions` argument allows you to pass [Amplitude fields](https://developers.amplitude.com/docs/http-api-v2#keys-for-the-event-argument), like `DeviceID`.

For example, in the following code snippet, your tracking plan contains an event called `songPlayed`. The event is defined with two required properties: `songId` and `songFavorited.` The property type for `songId` is string, and `songFavorited` is a boolean.

```Go
ampli.Instance.SongPlayed("user_id", SongPlayed().Builder()
    .SongId("songId")
    .SongPlayed(true)
    .Build(),
    amplitude.EventOptions{}
)
```

Ampli also generates a class for each event. Use `NewEventName()` to get the corresponding class for each event.

```Go
SongPlayed().Builder()
    .SongId("songId")
    .SongPlayed(true)
    .Build()
```

Send event objects using the generic track method.

```Go
ampli.Instance.Track("user-id", SongPlayed().Builder()
    .SongId("songId")
    .SongPlayed(true)
    .Build(),
    amplitude.EventOptions{},
)
```

--8<-- "includes/ampli/flush/ampli-flush-snippet-go.md"

### Plugin

Plugins allow you to extend the Amplitude behavior, for example, modifying event properties (enrichment type) or sending to a third-party APIs (destination type).

First you need to define your plugin: [plugin examples](https://www.docs.developers.amplitude.com/data/sdks/go/#plugin-examples).

Add your plugin after init Ampli:

```Go
ampli.Instance.Client.Add(myDestinationPlugin)
```

--8<-- "includes/ampli/cli-pull-and-status-section.md"
