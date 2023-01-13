---
title: Node.js Ampli Wrapper
description: Learn how to install and use the Amplitude Data Ampli Wrapper for the Node.js JavaScript and Typescript runtimes.
---


Amplitude Data supports tracking analytics events from Node.js apps written in JavaScript (ES6 and higher) and TypeScript (2.1 and higher). The generated tracking library is packaged as a CJS module.

The tracking library exposes a function for every event in your team’s tracking plan. The function’s arguments correspond to the event’s properties and are strongly typed to allow for code completion and compile-time checks.

!!!info "Ampli Node Resources (Legacy)"
    [:material-language-typescript: Ampli Node TypeScript Example](https://github.com/amplitude/ampli-examples/tree/main/node/typescript/v1/AmpliApp) · [:material-nodejs: Ampli Node JavaScript Example](https://github.com/amplitude/ampli-examples/tree/main/node/javascript/v1/AmpliApp) · [:material-page-next: Ampli NextJS Example](https://github.com/amplitude/ampli-examples/tree/main/node/nextjs/ampli-app) · [:material-code-tags-check: Releases](https://www.npmjs.com/package/@amplitude/ampli?activeTab=versions)

!!!note "Deprecated Itly runtime"
    This page covers Node.js JavaScript and TypeScript runtimes. All (Itly) runtimes are deprecated. If you are still using an (Itly) runtime, see the **[migration guide](#migrate-from-an-itly-runtime)** to upgrade to the newest runtime. Docs for the Itly version are available **[here](data/../../deprecated-sdks/nodejs)**.

--8<-- "includes/beta-not-supported.md"

???tip "Enable type checking"

    Because JavaScript is not a type-safe language, static type checking isn't built in like TypeScript. Some common IDEs allow for real-time type checks in JavaScript based on JSDoc. For a better development experience Ampli generates JSDocs for all methods and classes.

    To enable real-time type checking in VSCode for JavaScript:

    1. Go to **Preferences > Settings** then search for **checkJs**.
    2. Select **JS/TS > Implicit Project Config: Check JS**.

    After it's activated, type errors appear directly in the IDE.

    Jetbrains provides similar support:

    1. Go to **Preferences > Editor > Inspections > JavaScript and TypeScript > General**.
    2. In **Signature mismatch** and **Type mismatch**, set the **Severity** to Warning or Error based on your desired level of strictness.

???tip "Linting with Prettier"

    To prevent linting errors for eslint and tslint, the SDK-generated files have the following to diasable the linters: 

    `/* tslint:disable */`

    `/* eslint-disable */`
    
    There's no corresponding “in-code” functionality with Prettier. Instead, add the generated `path/to/ampli` to your `.prettierignore` file. You can get the path with `ampli pull`. See the [Prettier documentation](https://prettier.io/docs/en/ignore.html) for more information. 

## Installation

### Install the Ampli CLI

If you haven't installed the Ampli CLI, [install it now](../../ampli/cli.md).

### Install dependencies

If you haven't already, install the core Amplitude SDK dependencies.

```bash
npm install @amplitude/node @amplitude/identify @amplitude/types
```

### Pull the SDK into your project

At the project root, run `pull` command.

```bash
ampli pull
```

This prompts you to log in to your workspace and select a source.

=== "JavaScript"

    ```bash
    ➜ ampli pull sourcename
    Ampli project is not initialized. No existing `ampli.json` configuration found.
    ? Create a new Ampli project here? Yes
    Organization: Amplitude
    Workspace: My Workspace
    Source: sourcename
    Runtime: Node.js - JavaScript
    Branch: main
    Pulling latest version (1.0.0)...
    Tracking library generated successfully.
    Path: ./src/itly
    ```

=== "TypeScript"

    ```bash
    ➜ ampli pull sourcename
    Ampli project is not initialized. No existing `ampli.json` configuration found.
    ? Create a new Ampli project here? Yes
    Organization: Amplitude
    Workspace: My Workspace
    Source: sourcename
    Runtime: Node.js - TypeScript
    Branch: main
    Pulling latest version (1.0.0)...
    Tracking library generated successfully.
    Path: ./src/itly
    ```

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

The `load()` function accepts an options object to configure the SDK's behavior:

| <div class="big-column">Option</div> | Type              | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|--------------------------------------|-------------------| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `disabled`                           | `Boolean`           | optional | Specifies whether the Ampli Wrapper does any work. When `true`, all calls to the Ampli Wrapper are no-ops. Useful in local or development environments.<br /><br />Defaults to `false`.                                                                                                                                                   |
| `environment`                        | `String`            | optional | Specifies the environment the Ampli Wrapper is running in: `production` or `development`.<br /><br />Environment determines which Access Token is used to load the underlying analytics provider libraries.<br /><br />Defaults to `development`.                                                                                                                                                                                                                    |
| `client.apiKey`                      | `String`            | optional |Specifies an API Key. This option overrides the default, which is the API Key configured in your tracking plan.|
| `client.instance`                    | `AmplitudeClient`   | optional | Specifies an Amplitude instance. By default Ampli creates an instance for you.|
| `client.options`                     | `Amplitude.Options` | optional | Overrides the default configuration for the AmplitudeClient.|

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

The options argument allows you to pass [Amplitude fields](../analytics/apis/http-v2-api#keys-for-the-event-argument) for this call, such as `deviceId`.

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
Events Tracked: 2 missed, 3 total
```

Learn more about [`ampli status`](../../ampli/cli.md#ampli-status).

## Migrate from an Itly runtime

Migrate from an Itly Node.js runtime to Ampli by following these steps.

1. Update Source runtime. In the web app open the **Connections > Source** modal. From the dropdown, update the source to a non-`(Itly)` runtime.
2. Follow steps on this page for detailed setup and usage instructions.
3. Remove legacy Itly dependencies from your project. This includes anything that contains `@itly`:

      `yarn remove @itly/sdk @itly/plugin-schema-validator @itly/plugin-amplitude-node ...`
4. Add Amplitude dependencies:

    `yarn add @amplitude/node`

5. Pull the latest Ampli Wrapper:

    `ampli pull`

6. Check your Ampli Wrapper path.

    `ampli pull` prints the download location of the SDK. If the path contains `itly`, you can update the `Path` by hand in the `ampli.json` file, or pull again using the `--path` parameter: `ampli pull -p ./path/to/ampli`.

7. Find and replace:
    - `import { itly } from '../itly'` => `import { ampli } from '../ampli'`
    - `itly.group(userId, groupId) => ampli.setGroup(userId, groupType, groupName)`
    - `itly.load()` => `ampli.load()`
    - All `itly.` with `ampli.`
8. See updated Event tracking details on your Implementation page in the web app.
