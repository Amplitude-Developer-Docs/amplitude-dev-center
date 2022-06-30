---
title: Typescript Ampli SDK
description: The Amplitude Typescript SDK Installation & Quick Start guide.
icon: material/language-typescript
---


!!! note
    This page covers Browser JavaScript and TypeScript runtimes. All (Itly) runtimes are deprecated.
     If you are still using an (Itly) runtime, see the **[migration guide](#migrating-from-an-itly-runtime)** to ugrade to the newest runtime. Docs for the Itly version are available **[here](/data/deprecated-sdks/browser)**.

Amplitude Data supports tracking analytics events from Node.js apps written in JavaScript (ES6 and above) and TypeScript (2.1 and above). The generated tracking library is packaged as a CJS module.

The tracking library exposes a function for every event in your team’s tracking plan. The function’s arguments correspond to the event’s properties and are strongly typed to allow for
 code completion and compile-time checks.

???tip "Linting with Prettier"

    To prevent linting errors for eslint and tslint, the SDK-generated files have the following to diasable the linters: 

    `/* tslint:disable */`

    `/* eslint-disable */`
    

    There's no corresponding “in-code” functionality with Prettier. Instead, add the generated `path/to/ampli` to your `.prettierignore` file. You can get the path with `ampli pull`. See the [Prettier documentation](https://prettier.io/docs/en/ignore.html) for more information. 

## Installation

These instructions are also available from the **Implementation** page of your Amplitude Data workspace.

### Install the Ampli CLI

If you haven't installed the Ampli CLI, [install it now](/data/using-the-ampli-cli).

### Install dependencies

If you haven't already, install the core Amplitude SDK dependencies.

=== "npm"

    ```bash
    npm install @amplitude/analytics-browser
    ```

=== "yarn"

    ```bash
    yarn add @amplitude/analytics-browser
    ```

!!!note
    Note: when using Ampli in the browser, we recommend loading `@amplitude/analytics-browser` as a module rather than as a JS snippet.

### Pull the SDK into your project

At the project root, run `pull` command.

```bash
ampli pull
```

This prompts you to log in to your workspace and select a source.

=== "TypeScript"

    ```bash
    ➜ ampli pull sourcename
    Ampli project is not initialized. No existing `ampli.json` configuration found.
    ? Create a new Ampli project here? Yes
    Organization: Amplitude
    Workspace: My Workspace
    Source: sourcename
    Runtime: Browser/TypeScript
    Branch: main
    Pulling latest version (1.0.0)...
    Tracking library generated successfully.
    Path: ./src/ampli
    ```

=== "JavaScript"

    ```bash
    ➜ ampli pull sourcename
    Ampli project is not initialized. No existing `ampli.json` configuration found.
    ? Create a new Ampli project here? Yes
    Organization: Amplitude
    Workspace: My Workspace
    Source: sourcename
    Runtime: Browser/JavaScript
    Branch: main
    Pulling latest version (1.0.0)...
    Tracking library generated successfully.
    Path: ./src/ampli
    ```

## API

### Load

Initialize Ampli in your code.
The `load()` function accepts an options object to configure the SDK's behavior:

| <div class ="big-column">Option</div> | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|---------------------------------------| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `disabled`                            | Optional. Boolean. Specifies whether the Ampli SDK does any work. When `true`, all calls to the Ampli SDK are no-ops. Useful in local or development environments.<br /><br />Defaults to `false`.                                                                                                                                                   |
| `environment`                         | Optional. String. Specifies the environment the Ampli SDK is running in: `production` or `development`.<br /><br />Environment determines which Access Token is used to load the underlying analytics provider libraries.<br /><br />Defaults to `development`.                                                                                                                                                                                                                    |
| `client.apiKey`                       |Optional. String. Specifies an API Key. This option overrides the default, which is the API Key configured in your tracking plan.|
| `client.instance`                     | Optional. AmpltitudeClient. Specifies an Amplitude instance. By default Ampli creates an instance for you.|
| `client.options`                      | Optional. Amplitude.Config. Overrides the default configuration for the AmplitudeClient.|

### Identify

Call `identify()` to identify a user in your app and associate all future events with their identity, or to set their properties.

Just as the Ampli SDK creates types for events and their properties, it creates types for user properties.

The `identify()` function accepts an optional `userId`, optional user properties, and optional `options`.

For example, your tracking plan contains a user property called `role`. The property's type is a string.

=== "TypeScript"

    ```js
    ampli.identify('user-id', {
      role: 'admin'
    });
    ```

=== "JavaScript"

    ```js
    ampli.identify('user-id', {
      role: 'admin'
    });
    ```

The options argument allows you to pass [Amplitude fields](https://developers.amplitude.com/docs/http-api-v2#keys-for-the-event-argument) for this call, such as `deviceId`.

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

!!! note
    This feature is available for Growth customers who have purchased the [Accounts add-on](https://help.amplitude.com/hc/en-us/articles/115001765532).

Call `setGroup()` to associate a user with their group (for example, their department or company). The `setGroup()` function accepts a required `groupType`, and `groupName`.

=== "TypeScript"

    ```js
    ampli.setGroup('groupType', 'groupName');
    ```

=== "JavaScript"

    ```js
    ampli.setGroup('groupType', 'groupName');
    ```

--8<-- "includes/groups-intro-paragraph.md"

 Setting a group also sets the 'groupType:groupName' as a user property, and overwrites any existing groupName value set for that user's groupType, and the corresponding user property value. groupType is a string, and groupName can be either a string or an array of strings to indicate that a user is in multiple groups. For example, if Joe is in 'orgId' '10' and '20', then the `groupName` is '[10, 20]').

 Your code might look like this:

=== "TypeScript"

    ```js
    ampli.setGroup('orgId', ['10', '20']);
    ```

=== "JavaScript"

    ```js
    ampli.setGroup('orgId', ['10', '20']);
    ```

### Track

To track an event, call the event's corresponding function. Every event in your tracking plan gets its own function in the Ampli SDK. The call is structured like this:

=== "TypeScript"

    ```js
    ampli.eventName(properties: EventNameProperties, options: EventOptions)
    ```

=== "JavaScript"

    ```js
    ampli.eventName(properties: EventNameProperties, options: EventOptions)
    ```

The `properties` argument passes event properties.

The `options` argument allows you to pass to pass [Amplitude fields](https://developers.amplitude.com/docs/http-api-v2#properties-1), like `price`, `quanity` and `revenue`.

For example, in the code snippet below, your tracking plan contains an event called `songPlayed`. The event is defined with two required properties: `songId` and `songFavorited`.
 The property type for `songId` is string, and `songFavorited` is a boolean.

The event has an Amplitude field defined: `deviceId`. Learn more about Amplitude fields [here](https://developers.amplitude.com/docs/http-api-v2#properties-1).

=== "TypeScript"

    ```js
    ampli.songPlayed({
      songId: 'songId', // string,
      songFavorited: true, // boolean
    }, {
      deviceId: 'a-device-id',
    });
    ```

=== "JavaScript"

    ```js
    ampli.songPlayed({
      songId: 'songId', // string,
      songFavorited: true, // boolean
    }, {
      deviceId: 'a-device-id',
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
    ampli.track(new SongPlayed({
      songId: 'songId', // string,
      songFavorited: true, // boolean
    }));
    ```

=== "JavaScript"

    ```js
    ampli.track(new SongPlayed({
      songId: 'songId', // string,
      songFavorited: true, // boolean
    }));
    ```

## Verify implementation status

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
Events Tracked: 1 missed, 2 total
```

Learn more about [`ampli status`](/data/using-the-ampli-cli.md#ampli-status).

## Migrating from an Itly runtime

Migrate from an Itly Browser runtime to Ampli by following these steps.

1. Update Source runtime. In the web app open the **Connections > Source** modal. From the dropdown, update the source to a non-`(Itly)` runtime.
2. Go to the **Implementation** page, then select the new Source for detailed setup and usage instructions.
3. Remove legacy Itly dependencies from your project. This includes anything that contains `@itly`:

    `yarn remove @itly/sdk @itly/plugin-schema-validator @itly/plugin-amplitude ...`

4. Add Amplitude dependencies:
  
      `yarn add @amplitude/analytics-browser`

5. Pull the latest Ampli SDK:

    `ampli pull`

6. Check your Ampli SDK path.

    `ampli pull` prints the download location of the SDK. If the path contains `itly`,
     you can update the `Path` by hand in the `ampli.json` file, or pull again using the `--path` parameter: `ampli pull -p ./path/to/ampli`.

7. Find and replace:
    - `import { itly } from '../itly'` => `import { ampli } from '../ampli'`
    - `itly.group(userId, groupId) => ampli.setGroup(userId, groupType, groupName)`
    - `itly.load()` => `ampli.load()`
    - All `itly.` with `ampli.`

8. See updated Event tracking details on your Implementation page in the web app.
