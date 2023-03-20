---
title: Node.js Ampli Wrapper
description: Learn how to install and use the Amplitude Data Ampli Wrapper for the Node.js JavaScript and Typescript runtimes.
---

--8<-- "includes/ampli/ampli-overview-section.md"

Amplitude Data supports tracking analytics events from Node.js apps written in JavaScript (ES6 and higher) and TypeScript (2.1 and higher). The generated tracking library is packaged as a CJS module.

!!!info "Ampli Node Resources (Legacy)"
    [:material-language-typescript: TypeScript Example](https://github.com/amplitude/ampli-examples/tree/main/node/typescript/v1/AmpliApp) · [:material-nodejs: JavaScript Example](https://github.com/amplitude/ampli-examples/tree/main/node/javascript/v1/AmpliApp) · [:material-page-next: NextJS Example](https://github.com/amplitude/ampli-examples/tree/main/node/nextjs/ampli-app) · [:material-code-tags-check: Releases](https://www.npmjs.com/package/@amplitude/ampli?activeTab=versions)

--8<-- "includes/ampli-vs-amplitude-link-to-core-sdk.md"
    Click here for more documentation on the [Amplitude Node SDK](./index.md).

--8<-- "includes/beta-not-supported.md"

???tip "Enable type checking"

    Because JavaScript is not a type-safe language, static type checking isn't built in like TypeScript. Some common IDEs allow for real-time type checks in JavaScript based on JSDoc. For a better development experience Ampli generates JSDocs for all methods and classes.

    To enable real-time type checking in VSCode for JavaScript:

    1. Go to **Preferences > Settings** then search for **checkJs**.
    2. Select **JS/TS > Implicit Project Config: Check JS**.

    After it's activated, type errors appear directly in the IDE.

    Jetbrains provides similar support:

    3. Go to **Preferences > Editor > Inspections > JavaScript and TypeScript > General**.
    4. In **Signature mismatch** and **Type mismatch**, set the **Severity** to Warning or Error based on your desired level of strictness.

--8<-- "includes/ampli-linting-with-prettier.md"

## Quick Start

0. [(Prerequisite) Create a Tracking Plan in Amplitude Data](https://help.amplitude.com/hc/en-us/articles/5078731378203)

    Plan your events and properties in [Amplitude Data](https://data.amplitude.com/). See detailed instructions [here](https://help.amplitude.com/hc/en-us/articles/5078731378203)

1. [Install the Amplitude SDK](#install-the-amplitude-sdk)

    ```shell
    npm install @amplitude/node@^1.10.2 @amplitude/identify@^1.10.2 @amplitude/types@^1.10.2
    ```

2. [Install the Ampli CLI](#install-the-ampli-cli)

    ```shell
    npm install -g @amplitude/ampli
    ```

3. [Pull the Ampli Wrapper into your project](#pull)

    ```shell
    ampli pull [--path ./src/ampli]
    ```

4. [Initialize the Ampli Wrapper](#load)

    ```js
    import { ampli } from './src/ampli';
    
    ampli.load({ environment: 'production' });
    ```

5. [Identify users and set user properties](#identify)

    ```js
    ampli.identify('user-id', {
        userProp: 'A trait associated with this user'
    });
    ```

6. [Track events with strongly typed methods and classes](#track)

    ```js
    ampli.songPlayed('ampli-user-id', { songId: 'song-1' });
    ampli.track('ampli-user-id', new SongPlayed({ songId: 'song-2' });
    ```

7. [Flush events before application exit](#flush)

    ```js
    ampli.flush();
    ```

8. [Verify implementation status with CLI](#status)

    ```shell
    ampli status [--update]
    ```

## Installation

### Install the Amplitude SDK

If you haven't already, install the core Amplitude SDK dependencies.

```bash
npm install @amplitude/node@^1.10.2 @amplitude/identify@^1.10.2 @amplitude/types@^1.10.2
```

--8<-- "includes/ampli/cli-install-simple.md"

## API

### Load

Initialize Ampli in your code.

=== "JavaScript"

    ```js
    const { ampli } = require('./ampli');
    ampli.load({ environment: 'production' });
    ```

=== "TypeScript"

    ```js
    import { ampli } from './ampli';
    ampli.load({ environment: 'production' });
    ```

The `load()` function requires an options object to configure the SDK's behavior:

| <div class="big-column">Option</div> |Type|Required|Description|
|---------------------------------|------------------| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|`environment`| Required. String. Specifies the environment the Ampli Wrapper is running in e.g. `production` or `development`. Environments can be created, renamed, and managed in Amplitude Data.<br /><br />Environment determines which API token is used when sending events.<br /><br />If an `client.apiKey` or `client.instance` is provided, `environment` will be ignored, and can be omitted.|
|`disabled`| `Boolean`| optional | Specifies whether the Ampli Wrapper does any work. When `true`, all calls to the Ampli Wrapper are no-ops. Useful in local or development environments.<br /><br />Defaults to `false`.                                                                                                                                                 |
|`client.apiKey`| `String`| optional |Specifies an API Key. This option overrides the default, which is the API Key configured in your tracking plan.|
|`client.instance`| `AmplitudeClient` | optional | Specifies an Amplitude instance. By default Ampli creates an instance for you.|
|`client.options`| `Amplitude.Options` | optional | Overrides the default configuration for the AmplitudeClient.|

### Identify

Call `identify()` to set user properties.

Just as Ampli creates types for events and their properties, it creates types for user properties.

The `identify()` function accepts an optional `userId`, optional user `properties`, and optional `options`.

For example, your tracking plan contains a user property called `role`. The property's type is a string.

=== "TypeScript"

    ```js
    ampli.identify('user-id', {
      role: 'Admin'
    });
    ```

=== "JavaScript"

    ```js
    ampli.identify('user-id', {
      role: 'Admin'
    });
    ```

The options argument allows you to pass [Amplitude fields](../../../analytics/apis/http-v2-api.md#keys-for-the-event-argument) for this call, such as `deviceId`.

=== "TypeScript"

    ```js
    ampli.identify('user-id', {
      role: 'admin'
    }, {
      deviceId: 'my-device-id'
    });
    ```

=== "JavaScript"

    ```js
    ampli.identify('user-id', {
      role: 'admin'
    }, {
      deviceId: 'my-device-id'
    });
    ```

### Group

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

Call `setGroup()` to associate a user with their group (for example, their department or company). The `setGroup()` function accepts a required `groupType`, and `groupName`.

=== "TypeScript"

    ```js
    ampli.setGroup('user-id', 'Group name', 'Group Value');
    ```

=== "JavaScript"

    ```js
    ampli.setGroup('user-id', 'Group name', 'Group Value');
    ```

--8<-- "includes/groups-intro-paragraph.md"

!!!example

    For example, if Joe is in 'orgId' '10' and '20', then the `groupName` is '[10, 20]').

    Your code might look like this:

    === "TypeScript"

        ```js
        ampli.setGroup('user-id', 'orgId', ['10', '20']);
        ```

    === "JavaScript"

        ```js
        ampli.setGroup('user-id', 'orgId', ['10', '20']);
        ```

### Track

To track an event, call the event's corresponding function. Every event in your tracking plan gets its own function in the Ampli Wrapper. The call is structured like this:

=== "TypeScript"

    ```js
    ampli.eventName(
        userId: string | undefined,
        properties: EventProperties,
        options: EventOptions,
        extra: MiddlewareExtra
    )
    ```

=== "JavaScript"

    ```js
    ampli.eventName(
        userId: string | undefined,
        properties: EventNameProperties,
        options: EventOptions,
        extra: MiddlewareExtra
    )
    ```

`userId` in multi-tenant, server environments a `userId` must be provided for each tracking call to associate it to a

`properties` passes in event properties specific to this event in the tracking plan.

The `options` argument allows you to pass [Amplitude fields](https://developers.amplitude.com/docs/http-api-v2#properties-1), like `price`, `quanity` and `revenue`.

The `extra` argument lets you pass data to middleware.

For example, your tracking plan contains an event called Song Played. The SDK generates the `songPlayed` function for the event, using camel case to make it valid JavaScript. The event is defined with two required properties: `songId` and `songFavorited.` The property type for `songId` is string, and `songFavorited` is a boolean.

The event has two Amplitude fields defined: `price`, and `quantity`. Learn more about Amplitude fields [here](https://developers.amplitude.com/docs/http-api-v2#properties-1). The event has one MiddlewareExtra defined: `myMiddleware`. Learn more about [middleware](../../ampli/middleware.md).

=== "TypeScript"

    ```js
    ampli.songPlayed('ampli-user-id', {
      songId: 'songId', // string,
      songFavorited: true, // boolean
    }, {
      price: 1.23,
      quantity: 2
    }, {
      myMiddleware: { myMiddlewareProp: "value to send to middleware" }
    });
    ```

=== "JavaScript"

    ```js
    ampli.songPlayed('ampli-user-id', {
      songId: 'songId', // string,
      songFavorited: true, // boolean
    }, {
      price: 1.23,
      quantity: 2
    }, {
      myMiddleware: { myMiddlewareProp: "value to send to middleware" }
    });
    ```

Ampli also generates a class for each event.

=== "TypeScript"

    ```js
    const myEventObject = new SongPlayed({
      songId: 'songId', // string,
      songFavorited: true, // boolean
    });
    ```

=== "JavaScript"

    ```js
    const myEventObject = new SongPlayed({
      songId: 'songId', // string,
      songFavorited: true, // boolean
    });
    ```

Track Event objects using Ampli `track`:

=== "TypeScript"

    ```js
    ampli.track('ampli-user-id', new SongPlayed({
      songId: 'songId', // string,
      songFavorited: true, // boolean
    }));
    ```

=== "JavaScript"

    ```js
    ampli.track('ampli-user-id', new SongPlayed({
      songId: 'songId', // string,
      songFavorited: true, // boolean
    }));

    ```

--8<-- "includes/ampli/flush/ampli-flush-section.md"

--8<-- "includes/ampli/flush/ampli-flush-snippet-typescript.md"

--8<-- "includes/ampli/cli-pull-and-status-section.md"
