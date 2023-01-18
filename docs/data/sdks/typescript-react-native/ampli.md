---
title: React Native Ampli Wrapper
description: The Ampli Wrapper - React Native Installation & Quick Start guide.
---

Amplitude Data supports tracking analytics events from React Native apps written in JavaScript (ES6 and higher) and TypeScript (2.1 and higher). The generated tracking library is packaged as a CJS module.

The tracking library exposes a function for every event in your team’s tracking plan. The function’s arguments correspond to the event’s properties and are strongly typed to allow for code completion and compile-time checks.

!!!beta "Ampli React Native Resources"
    [:material-language-typescript: Ampli TypeScript Example](https://github.com/amplitude/ampli-examples/tree/main/react-native/typescript/v2/AmpliApp) · [:material-nodejs: Ampli JavaScript Example](https://github.com/amplitude/ampli-examples/tree/main/react-native/javascript/v2/AmpliApp) · [:material-code-tags-check: Releases](https://www.npmjs.com/package/@amplitude/ampli?activeTab=versions)

--8<-- "includes/ampli-linting-with-prettier.md"

## Quick Start

0. [(Prerequisite) Create a Tracking Plan in Amplitude Data](https://help.amplitude.com/hc/en-us/articles/5078731378203)

    Plan your events and properties in [Amplitude Data](https://data.amplitude.com/). See detailed instructions [here](https://help.amplitude.com/hc/en-us/articles/5078731378203)

1. [Install the Amplitude SDK](#install-the-amplitude-sdk)

    ```shell
    npm install @amplitude/analytics-react-native
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
    ampli.songPlayed({ songId: 'song-1' });
    ampli.track(new SongPlayed({ songId: 'song-2' });
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

=== "npm"

    ```bash
    npm install @amplitude/analytics-react-native
    ```

=== "yarn"

    ```bash
    yarn add @amplitude/analytics-react-native
    ```

--8<-- "includes/ampli/cli-install-simple.md"

## API

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
    ampli.setGroup('groupType', 'groupName');
    ```

=== "JavaScript"

    ```javascript
    ampli.setGroup('groupType', 'groupName');
    ```

--8<-- "includes/groups-intro-paragraph.md"
<!-- vale off-->
 Setting a group also sets the 'groupType:groupName' as a user property, and overwrites any existing `groupName` value set for that user's `groupType`, and the corresponding user property value. `groupType` is a string, and groupName can be either a string or an array of strings to indicate that a user is in multiple groups. For example, if Joe is in 'orgId' '10' and '20', then the `groupName` is '[10, 20]').
 <!--vale on-->

 Your code might look like this:

=== "TypeScript"

    ```typescript
    ampli.setGroup('orgId', ['10', '20']);
    ```

=== "JavaScript"

    ```javascript
    ampli.setGroup('orgId', ['10', '20']);
    ```

### Track

To track an event, call the event's corresponding function. Every event in your tracking plan gets its own function in the Ampli Wrapper. The call is structured like this:

=== "TypeScript"

    ```typescript
    ampli.eventName(
      properties: EventNameProperties,
      options: EventOptions
    )
    ```

=== "JavaScript"

    ```javascript
    ampli.eventName(
      properties: EventNameProperties,
      options: EventOptions
    )
    ```

The `properties` argument passes event properties.

The `options` argument allows you to pass to pass [Amplitude fields](https://developers.amplitude.com/docs/http-api-v2#properties-1), like `price`, `quanity` and `revenue`.

For example, in the code snippet below, your tracking plan contains an event called `songPlayed`. The event is defined with two required properties: `songId` and `songFavorited`.
 The property type for `songId` is string, and `songFavorited` is a boolean.

The event has an Amplitude field defined: `deviceId`. Learn more about Amplitude fields [here](https://www.docs.developers.amplitude.com/analytics/apis/http-v2-api/#keys-for-the-event-argument).

=== "TypeScript"

    ```typescript
    ampli.songPlayed({
      songId: 'songId', // string,
      songFavorited: true, // boolean
    }, {
      deviceId: 'a-device-id',
    });
    ```

=== "JavaScript"

    ```javascript
    ampli.songPlayed({
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
    import { Config, EnrichmentPlugin, Event, PluginType } from '"@amplitude/analytics-react-native"';

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

--8<-- "includes/ampli/cli-pull-and-status-section.md"

## Migrating from Ampli (Legacy) for the `@amplitude/react-native` runtime

Migrate from Ampli for `@amplitude/react-native` to Ampli for `@amplitude/analytics-react-native` by following these steps.

1. Update Source runtime.

    In the web app open the **Sources** page and select the React Native Source you want to update. In the modal, change the runtime from `TypeScript (Legacy)` to `TypeScript` or `JavaScript (Legacy)` to `JavaScript`.

2. Go to the **Implementation** page, then select the updated Source for detailed setup and usage instructions.

3. Remove legacy dependencies from your project.

    `yarn remove @amplitude/react-native`

4. Add new dependencies.
  
    `yarn add @amplitude/analytics-react-native`

5. Pull the latest Ampli Wrapper.

    `ampli pull`

6. Find and replace.

    Middleware is no longer support. It has been replaced by a new Plugin architecture. Migrating from Middleware to a Plugin is easy.

7. See more details on your **Implementation** page in the web app.
