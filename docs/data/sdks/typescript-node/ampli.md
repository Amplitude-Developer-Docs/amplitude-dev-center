---
title: Node Ampli Wrapper
description: The Ampli Wrapper - Node Typescript Installation & Quick Start guide.
---

## Overview

The Ampli Wrapper is a generated, strongly typed API for tracking Analytics events based on your Tracking Plan in Amplitude Data. The tracking library exposes a function for every event in your team’s tracking plan. The function’s arguments correspond to the event’s properties.

Ampli can benefit your app by providing autocompletion for events & properties defined in Data and enforce your event schemas in code to prevent bad instrumentation. 

Ampli supports Node.js apps written in JavaScript (ES6 and higher) and TypeScript (2.1 and higher). The generated tracking library is packaged as a CJS module.

!!!info "Ampli Node Resources"
    [:material-language-typescript: TypeScript Example](https://github.com/amplitude/ampli-examples/tree/main/node/typescript/v2/AmpliApp) · [:material-nodejs: JavaScript Example](https://github.com/amplitude/ampli-examples/tree/main/node/javascript/v2/AmpliApp) · [:material-page-next: NextJS Example](https://github.com/amplitude/ampli-examples/tree/main/node/nextjs/ampli-app) · [:material-code-tags-check: Releases](https://www.npmjs.com/package/@amplitude/ampli?activeTab=versions)

--8<-- "includes/ampli-vs-amplitude-link-to-core-sdk.md"
    Click here for more documentation on the [Amplitude Node SDK](./index.md).

--8<-- "includes/ampli-linting-with-prettier.md"

## Quick Start

0. [(Prerequisite) Create a Tracking Plan in Amplitude Data](https://help.amplitude.com/hc/en-us/articles/5078731378203)

    Plan your events and properties in [Amplitude Data](https://data.amplitude.com/). See detailed instructions [here](https://help.amplitude.com/hc/en-us/articles/5078731378203)

1. [Install the Amplitude SDK](#install-the-amplitude-sdk)

    ```bash
    npm install @amplitude/analytics-node
    ```

2. [Install the Ampli CLI](#install-the-ampli-cli)

    ```bash
    npm install -g @amplitude/ampli
    ```

3. [Pull the Ampli Wrapper into your project](#pull)

    ```bash
    ampli pull [--path ./ampli]
    ```

4. [Initialize the Ampli Wrapper](#load)

    ```js
    import { ampli } from './ampli';
    
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

7. [Verify implementation status with CLI](#status)

    ```bash
    ampli status [--update]
    ```

## Installation

### Install the Amplitude SDK

The Ampli Wrapper depends on the Amplitude SDK. If you haven't already, install the latest version.

=== "npm"

    ```bash
    npm install @amplitude/analytics-node
    ```

=== "yarn"

    ```bash
    yarn add @amplitude/analytics-node
    ```

### Install the Ampli CLI

--8<-- "includes/ampli/cli-install-simple.md"

### Pull the Ampli Wrapper into your project

Run the Ampli CLI `pull` command to log in to Amplitude Data and download the strongly typed Ampli Wrapper for your tracking plan. Ampli CLI commands are usually run from the project root directory.

```bash
ampli pull
```

## Ampli Wrapper API

### Load

Initialize Ampli in your code.
The `load()` function accepts an options object to configure the SDK's behavior:

| <div class ="big-column">Option</div> | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|---------------------------------------| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `disabled`                            | Optional. `Boolean`. Specifies whether the Ampli Wrapper does any work. When `true`, all calls to the Ampli Wrapper are no-ops. Useful in local or development environments.<br /><br />Defaults to `false`.                                                                                                                                                   |
| `environment`                         | Optional. `String`. Specifies the environment the Ampli Wrapper is running in: `production` or `development`.<br /><br />Environment determines which Access Token is used to load the underlying analytics provider libraries.<br /><br />Defaults to `development`.                                                                                                                                                                                                                    |
| `client.apiKey`                       | Optional. `String`. Specifies an API Key. This option overrides the default, which is the API Key configured in your tracking plan.|
| `client.instance`                     | Optional. `AmpltitudeClient`. Specifies an Amplitude instance. By default Ampli creates an instance for you.|
| `client.configuration`                | Optional. `Amplitude.Config`. Overrides the default configuration for the AmplitudeClient.|

Example of initialization with `load` to override the default configuration:

=== "TypeScript"

    ```typescript
    ampli.load({
      environment: 'development',
      client: {
        configuration: {
          minIdLength: 10,
        }
      }
    });
    ```

=== "JavaScript"

    ```javascript
    ampli.load({
      environment: 'development',
      client: {
        configuration: {
          minIdLength: 10,
        }
      }
    });
    ```

### Identify

Call `identify()` to identify a user in your app and associate all future events with their identity, or to set their properties.

Just as the Ampli Wrapper creates types for events and their properties, it creates types for user properties.

The `identify()` function accepts an optional `userId`, optional user properties, and optional `options`.

For example, your tracking plan contains a user property called `role`. The property's type is a string.

=== "TypeScript"

    ```typescript
    ampli.identify('user-id', {
      role: 'admin'
    });
    ```

=== "JavaScript"

    ```javascript
    ampli.identify('user-id', {
      role: 'admin'
    });
    ```

The options argument allows you to pass [Amplitude fields](https://developers.amplitude.com/docs/http-api-v2#keys-for-the-event-argument) for this call, such as `deviceId`.

=== "TypeScript"

    ```typescript
    ampli.identify('user-id', {
      role: 'admin'
    }, {
      deviceId: 'my-device-id'
    });
    ```

=== "JavaScript"

    ```javascript
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

    ```typescript
    ampli.setGroup('userId', groupType', 'groupName');
    ```

=== "JavaScript"

    ```javascript
    ampli.setGroup('userId', 'groupType', 'groupName');
    ```

--8<-- "includes/groups-intro-paragraph.md"
<!-- vale off-->
 Setting a group also sets the 'groupType:groupName' as a user property, and overwrites any existing `groupName` value set for that user's `groupType`, and the corresponding user property value. `groupType` is a string, and `groupName` can be either a string or an array of strings to indicate that a user is in multiple groups. For example, if Joe is in 'orgId' '10' and '20', then the `groupName` is '[10, 20]').
<!--vale on-->

 Your code might look like this:

=== "TypeScript"

    ```typescript
    ampli.setGroup('userId', 'orgId', ['10', '20']);
    ```

=== "JavaScript"

    ```javascript
    ampli.setGroup('userId', 'orgId', ['10', '20']);
    ```

### Track

To track an event, call the event's corresponding function. Every event in your tracking plan gets its own function in the Ampli Wrapper. The call is structured like this:

=== "TypeScript"

    ```typescript
    ampli.eventName(
      userId: string : undefined,
      properties: EventNameProperties,
      options: EventOptions
    )
    ```

=== "JavaScript"

    ```javascript
    ampli.eventName(
      userId: string : undefined,
      properties: EventNameProperties,
      options: EventOptions
    )
    ```

The `properties` argument passes event properties.

The `options` argument allows you to pass to pass [Amplitude fields](https://developers.amplitude.com/docs/http-api-v2#properties-1), like `price`, `quanity` and `revenue`.

For example, in the following code snippet, your tracking plan contains an event called `songPlayed`. The event is defined with two required properties: `songId` and `songFavorited`.
 The property type for `songId` is string, and `songFavorited` is a boolean.

The event has an Amplitude field defined: `deviceId`. Learn more about Amplitude fields [here](https://www.docs.developers.amplitude.com/analytics/apis/http-v2-api/#keys-for-the-event-argument).

=== "TypeScript"

    ```typescript
    ampli.songPlayed('userId', {
      songId: 'songId', // string,
      songFavorited: true, // boolean
    }, {
      deviceId: 'a-device-id',
    });
    ```

=== "JavaScript"

    ```javascript
    ampli.songPlayed('userId', {
      songId: 'songId', // string,
      songFavorited: true, // boolean
    }, {
      deviceId: 'a-device-id',
    });
    ```

Ampli also generates a class for each event.

=== "TypeScript"

    ```typescript
    const myEventObject = new SongPlayed({
      songId: 'songId', // string,
      songFavorited: true, // boolean
    });
    ```

=== "JavaScript"

    ```javascript
    const myEventObject = new SongPlayed({
      songId: 'songId', // string,
      songFavorited: true, // boolean
    });
    ```

Track Event objects using Ampli `track`:

=== "TypeScript"

    ```typescript
    ampli.track(new SongPlayed({
      songId: 'songId', // string,
      songFavorited: true, // boolean
    }));
    ```

=== "JavaScript"

    ```javascript
    ampli.track(new SongPlayed({
      songId: 'songId', // string,
      songFavorited: true, // boolean
    }));
    ```

--8<-- "includes/ampli/flush/ampli-flush-section.md"

--8<-- "includes/ampli/flush/ampli-flush-snippet-typescript.md"

### Plugin

Plugins allow you to extend the Amplitude behavior, for example, modifying event properties (enrichment type) or sending to a third-party APIs (destination type).

First you need to define your plugin. Enrichment Plugin example:

=== "TypeScript"

    ```typescript
    import { Config, EnrichmentPlugin, Event, PluginType } from '"@amplitude/analytics-node"';

    export class AddEventIdPlugin implements EnrichmentPlugin {
      name = 'add-event-id';
      type = PluginType.ENRICHMENT as const;
      currentId = 100;

      /**
       * setup() is called on plugin installation
       * example: client.add(new AddEventIdPlugin());
       */
      setup(config: Config): Promise<undefined> {
         this.config = config;
      }

      /**
       * execute() is called on each event instrumented
       * example: client.track('New Event');
       */
      execute(event: Event): Promise<Event> {
        event.event_id = this.currentId++;
        return event;
      }
    }
    ```

=== "JavaScript"

    ```javascript
    export class AddEventIdPlugin {
      name = 'add-event-id';
      currentId = 100;

      /**
       * setup() is called on plugin installation
       * example: client.add(new AddEventIdPlugin());
       */
      setup(config) {
         this.config = config;
      }

      /**
       * execute() is called on each event instrumented
       * example: client.track('New Event');
       */
      execute(event) {
        event.event_id = this.currentId++;
        return event;
      }
    }
    ```

Add your plugin after init Ampli.

=== "TypeScript"

    ```typescript
    ampli.client.add(new AddEventIdPlugin())
    ```

=== "JavaScript"

    ```javascript
    ampli.client.add(new AddEventIdPlugin())
    ```

## Ampli CLI

### Pull

The `pull` command downloads the Ampli Wrapper code to your project.

Run the `pull` command from the project root.

```bash
ampli pull
```

You will be prompted to log in to your workspace and select a source.

=== "TypeScript"

    ```text
    ➜ ampli pull
    Ampli project is not initialized. No existing `ampli.json` configuration found.
    ? Create a new Ampli project here? Yes
    ? Organization: Amplitude
    ? Workspace: My Workspace
    ? Source: My Node Source
    ? Platform: Node.js
    ? Language: TypeScript
    ? Branch: main
    ✔ Pulling latest version (1.0.0)...
    ✔ Tracking library generated successfully.
      ↳ Path: ./src/ampli
    ```

=== "JavaScript"

    ```text
    ➜ ampli pull
    Ampli project is not initialized. No existing `ampli.json` configuration found.
    ? Create a new Ampli project here? Yes
    ? Organization: Amplitude
    ? Workspace: My Workspace
    ? Source: My Node Source
    ? Platform: Node.js
    ? Language: JavaScript
    ? Branch: main
    ✔ Pulling latest version (1.0.0)...
    ✔ Tracking library generated successfully.
      ↳ Path: ./src/ampli
    ```

### Status

Verify that events are implemented in your code with the status command:

```bash
ampli status
```

To update the implementation status in your tracking plan use the `--update` flag or `-u`:

```bash
ampli status -u
```

The output displays status and indicates what events are missing.

```text
➜ ampli status
✘ Verifying event tracking implementation in source code
 ✔ Song Played (1 location)
 ✘ Song Stopped Called when a user stops playing a song.
Events Tracked: 1 missed, 2 total
```

Learn more about [`ampli status`](../../ampli/cli.md#ampli-status).

## Migration

### Migrate from Ampli (Legacy) for the `@amplitude/node` runtime

Migrate from Ampli for `@amplitude/node` to Ampli for `@amplitude/analytics-node` by following these steps.

1. Update Source runtime.

    In the web app open the **Sources** page and select the NodeJS Source you want to update. In the modal, change the runtime from `TypeScript (Legacy)` to `TypeScript` or `JavaScript (Legacy)` to `JavaScript`.

2. Follow steps on this page for detailed setup and usage instructions.

3. Remove legacy dependencies from your project.

    `yarn remove @amplitude/node`

4. Add new dependencies.
  
    `yarn add @amplitude/analytics-node`

5. Pull the latest Ampli Wrapper.

    `ampli pull`

6. Find and replace.

    Middleware is no longer support. It has been replaced by a new Plugin architecture. Migrating from Middleware to a Plugin is easy.
