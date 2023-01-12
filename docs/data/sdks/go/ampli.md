---
title: Go Ampli Wrapper (Beta)
description:  Learn how to install and use the Amplitude Data Ampli Wrapper for the Go runtimes.
---

Amplitude Data supports tracking analytics events from Go apps. The generated tracking library is packaged as a Go package.

The tracking library exposes a type-safe function for every event in your team’s tracking plan. The function’s arguments correspond to the event’s properties and are strongly typed to allow for auto code completion.

!!!alpha "Go Ampli Resources (Beta)"
    [:material-github: Examples](https://github.com/amplitude/ampli-examples/tree/main/go/simple/v2) · [:material-code-tags-check: Releases](https://www.npmjs.com/package/@amplitude/ampli?activeTab=versions)

## Install

These instructions are also available from the **Implementation** page of your Amplitude Data workspace.

### Install the Ampli CLI

If you haven't installed the Ampli CLI, [install it now](../../ampli/cli.md).

### Install dependencies

If you haven't already, install the core Amplitude SDK dependencies `analytics-go` using `go get`:

```bash
go get https://github.com/amplitude/analytics-go
```

### Pull the SDK into your project

At the project root, run `pull` command.

```bash
ampli pull
```

This prompts you to log in to your workspace and select a source.

```bash
➜ ampli pull sourcename
Ampli project is not initialized. No existing `ampli.json` configuration found.
? Create a new Ampli project here? Yes
? Organization: Amplitude
? Workspace: My Workspace
? Source: sourcename
? Runtime: go:go-ampli
? Branch: main
✔ Pulling version 1 (latest)
✔ Tracking library generated successfully.
  ↳ Path: ./ampli
```

## API

### Load

Initialize Ampli in your code. The `Load()` method accepts configuration option arguments:

```Go
import (
    "<your-module-name>/ampli"
)

ampli.Instance.Load(ampli.LoadOptions{
    Environment: ampli.EnvironmentProduction,
})
```

| <div class ="big-column">Arg of load()</div> | Description |
|-|-|
| `options` | A instance of LoadOptions. Specifies configuration options for the Ampli Wrapper.|

| <div class ="big-column">Arg of LoadOptions</div> | Description |
|-|-|
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

All required properties are passed in as parameters of `NewIdentify()`. For example your tracking plan only contains a required user property called `role`. The property's type is a string.

```Go
ampli.Instance.Identify(
    "user_id",
    ampli.NewIdentify("admin"),
    amplitude.EventOptions{},
)
```

Optional properties can be set by `SetOptional()`. For example your tracking plan only contains a optional user property called `role`. 

```Go
ampli.Instance.Identify(
    "user_id",
    ampli.NewIdentify().SetOptionalRole("admin"),
    amplitude.EventOptions{},
)
```

The options argument allows you to pass [Amplitude fields](https://developers.amplitude.com/docs/http-api-v2#keys-for-the-event-argument) for this call, such as `DeviceID`.

```Go
ampli.Instance.Identify(
    "user_id",
    ampli.NewIdentify("admin"),
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
ampli.Instance.EventName("user_id", NewEventName(...), EventOptions(...))
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

## Verify implementation status

Verify events are implemented in your code with the status command:

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
Events Tracked: 1 missed, 2 total
```

Learn more about [`ampli status`](https://developers.data.amplitude.com/using-the-ampli-cli/#ampli-status).
