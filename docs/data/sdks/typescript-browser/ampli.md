---
title: Browser Ampli Wrapper
description: The Amplitude Typescript SDK Installation & Quick Start guide.
---

--8<-- "includes/ampli/ampli-overview-section.md"

Amplitude Data supports tracking analytics events from browser apps written in JavaScript (ES6 and higher) and TypeScript (2.1 and higher). The generated tracking library is packaged as a CJS module.

<!--vale off-->
!!!info "Ampli Browser Resources"
    [:material-language-typescript: TypeScript Example](https://github.com/amplitude/ampli-examples/tree/main/browser/typescript/v2/react-app) · [:material-language-javascript: JavaScript Example](https://github.com/amplitude/ampli-examples/tree/main/browser/javascript/v2/react-app) · [:material-code-tags-check: Releases](https://www.npmjs.com/package/@amplitude/ampli?activeTab=versions)
<!--vale on-->

--8<-- "includes/ampli-vs-amplitude-link-to-core-sdk.md"
    Click here for more documentation on the [Amplitude Browser SDK](./index.md).

--8<-- "includes/ampli/javascript-enable-real-time-type-checking.md"

--8<-- "includes/ampli-linting-with-prettier.md"

## Quick Start

0. [(Prerequisite) Create a Tracking Plan in Amplitude Data](https://help.amplitude.com/hc/en-us/articles/5078731378203)

    Plan your events and properties in [Amplitude Data](https://data.amplitude.com/). See detailed instructions [here](https://help.amplitude.com/hc/en-us/articles/5078731378203)

1. [Install the Amplitude SDK](#install-the-amplitude-sdk)

    ```shell
    npm install @amplitude/analytics-browser
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
    npm install @amplitude/analytics-browser
    ```

=== "yarn"

    ```bash
    yarn add @amplitude/analytics-browser
    ```

!!!note
    Note: when using Ampli in the browser, Amplitude recommends loading `@amplitude/analytics-browser` as a module rather than as a JavaScript snippet.

--8<-- "includes/ampli/cli-install-simple.md"

## API

### Load

Initialize Ampli in your code.
The `load()` function accepts an options object to configure the SDK's behavior:

| <div class ="big-column">Option</div> | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|---------------------------------------| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `disabled`                            | Optional. Boolean. Specifies whether the Ampli Wrapper does any work. When `true`, all calls to the Ampli Wrapper are no-ops. Useful in local or development environments.<br /><br />Defaults to `false`.                                                                                                                                                   |
| `environment`                         | Optional. String. Specifies the environment the Ampli Wrapper is running in: `production` or `development`.<br /><br />Environment determines which Access Token is used to load the underlying analytics provider libraries.<br /><br />Defaults to `development`.                                                                                                                                                                                                                    |
| `client.apiKey`                       | Optional. String. Specifies an API Key. This option overrides the default, which is the API Key configured in your tracking plan.|
| `client.instance`                     | Optional. `AmplitudeClient`. Specifies an Amplitude instance. By default Ampli creates an instance for you.|
| `client.configuration`                | Optional. `Amplitude.Config`. Overrides the default configuration for the AmplitudeClient.|

Example of initialization with `load` to override the default configuration:

=== "TypeScript"

    ```ts
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

    ```js
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

    ```ts
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

    ```ts
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

    ```ts
    ampli.setGroup('groupType', 'groupName');
    ```

=== "JavaScript"

    ```js
    ampli.setGroup('groupType', 'groupName');
    ```

--8<-- "includes/groups-intro-paragraph.md"

 Setting a group also sets the `groupType:groupName` as a user property, and overwrites any existing `groupName` value set for that user's `groupType`, and the corresponding user property value. `groupType` is a string, and `groupName` can be either a string or an array of strings to show that a user is in multiple groups. For example, if Joe is in 'orgId' '10' and '20', then the `groupName` is '[10, 20]').

 Your code might look like this:

=== "TypeScript"

    ```ts
    ampli.setGroup('orgId', ['10', '20']);
    ```

=== "JavaScript"

    ```js
    ampli.setGroup('orgId', ['10', '20']);
    ```

### Track

To track an event, call the event's corresponding function. Every event in your tracking plan gets its own function in the Ampli Wrapper. The call structure is like this:

=== "TypeScript"

    ```ts
    ampli.eventName(properties: EventNameProperties, options: EventOptions)
    ```

=== "JavaScript"

    ```js
    ampli.eventName(properties: EventNameProperties, options: EventOptions)
    ```

The `properties` argument passes event properties.

The `options` argument allows you to pass to pass [Amplitude fields](https://developers.amplitude.com/docs/http-api-v2#properties-1), like `price`, `quanity` and `revenue`.

For example, in the following code, your tracking plan contains an event called `songPlayed`. The event is defined with two required properties: `songId` and `songFavorited`.
 The property type for `songId` is string, and `songFavorited` is a boolean.

The event has an Amplitude field defined: `deviceId`. Learn more about Amplitude fields [here](https://www.docs.developers.amplitude.com/analytics/apis/http-v2-api/#keys-for-the-event-argument).

=== "TypeScript"

    ```ts
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

    ```ts
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

    ```ts
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

--8<-- "includes/ampli/flush/ampli-flush-section.md"

--8<-- "includes/ampli/flush/ampli-flush-snippet-typescript.md"

### Plugin

Plugins allow you to extend the Amplitude behavior, for example, modifying event properties (enrichment type) or sending to a third-party APIs (destination type).

First you need to define your plugin. Enrichment Plugin example:

=== "TypeScript"

    ```ts
    import { BrowserConfig, EnrichmentPlugin, Event, PluginType } from '@amplitude/analytics-types';

    export class AddEventIdPlugin implements EnrichmentPlugin {
      name = 'add-event-id';
      type = PluginType.ENRICHMENT as const;
      currentId = 100;

      /**
       * setup() is called on plugin installation
       * example: client.add(new AddEventIdPlugin());
       */
      setup(config: BrowserConfig): Promise<undefined> {
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

    ```js
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

    ```ts
    ampli.client.add(new AddEventIdPlugin())
    ```

=== "JavaScript"

    ```js
    ampli.client.add(new AddEventIdPlugin())
    ```

--8<-- "includes/ampli/cli-pull-and-status-section.md"

## Migrate from an Itly runtime

Migrate from an Itly Browser runtime to Ampli by following these steps.

1. Update Source runtime. In the web app open the **Connections > Source** modal. From the dropdown, update the source to a non-`(Itly)` runtime.
2. Follow steps on this page for detailed setup and usage instructions.
3. Remove legacy Itly dependencies from your project. This includes anything that contains `@itly`:

    `yarn remove @itly/sdk @itly/plugin-schema-validator @itly/plugin-amplitude ...`

4. Add Amplitude dependencies:
  
      `yarn add @amplitude/analytics-browser`

5. Pull the latest Ampli Wrapper:

    `ampli pull`

6. Check your Ampli Wrapper path.

    `ampli pull` prints the download location of the SDK. If the path contains `itly`,
     you can update the `Path` by hand in the `ampli.json` file, or pull again using the `--path` parameter: `ampli pull -p ./path/to/ampli`.

7. Find and replace:
    - `import { itly } from '../itly'` => `import { ampli } from '../ampli'`
    - `itly.group(userId, groupId) => ampli.setGroup(userId, groupType, groupName)`
    - `itly.load()` => `ampli.load()`
    - All `itly.` with `ampli.`

8. See updated Event tracking details on your Implementation page in the web app.

--8<-- "includes/abbreviations.md"
