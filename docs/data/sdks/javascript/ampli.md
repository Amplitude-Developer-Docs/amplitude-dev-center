---
title: Browser Ampli Wrapper
description: Learn how to install and use the Amplitude Data Ampli Wrapper for the browser JavaScript and Typescript runtimes.
---

--8<-- "includes/ampli/ampli-overview-section.md"

Amplitude Data supports tracking analytics events from Node.js apps written in JavaScript (ES6 and higher) and TypeScript (2.1 and higher). The generated tracking library is packaged as a CJS module.

!!!info "Ampli Resources"
    - [Browser JavaScript Ampli Examples](https://github.com/amplitude/ampli-examples/tree/main/browser/javascript/v1/react-app)
    - [Browser TypeScript Ampli Examples](https://github.com/amplitude/ampli-examples/tree/main/browser/typescript/v1/react-app)

--8<-- "includes/ampli-vs-amplitude-link-to-core-sdk.md"
    Click here for more documentation on the [Amplitude Browser SDK](./index.md).

--8<-- "includes/ampli/javascript-enable-real-time-type-checking.md"

--8<-- "includes/ampli-linting-with-prettier.md"

## Quick Start

0. [(Prerequisite) Create a Tracking Plan in Amplitude Data](https://help.amplitude.com/hc/en-us/articles/5078731378203)

    Plan your events and properties in [Amplitude Data](https://data.amplitude.com/). See detailed instructions [here](https://help.amplitude.com/hc/en-us/articles/5078731378203)

1. [Install the Amplitude SDK](#install-the-amplitude-sdk)

    ```shell
    npm install amplitude-js@^8.21.0
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
    npm install amplitude-js@^8.21.0
    ```

=== "Yarn"

    ```bash
    yarn add amplitude-js@^8.21.0
    ```

!!!note
    Note: when using Ampli in the browser, Amplitude recommends loading `amplitude-js` as a module rather than as a JavaScript snippet.

--8<-- "includes/ampli/cli-install-simple.md"

## API

### Load

Initialize Ampli in your code.
The `load()` function requires an options object to configure the SDK's behavior:

| <div class ="big-column">Option</div> |Description|
|---------------------------------------| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `environment`| Required. String. Specifies the environment the Ampli Wrapper is running in e.g. `production` or `development`. Environments can be created, renamed, and managed in Amplitude Data.<br /><br />Environment determines which API token is used when sending events.<br /><br />If an `client.apiKey` or `client.instance` is provided, `environment` will be ignored, and can be omitted.|
| `disabled`                            | Optional. `Boolean`. Specifies whether the Ampli Wrapper does any work. When `true`, all calls to the Ampli Wrapper are no-ops. Useful in local or development environments.<br /><br />Defaults to `false`.                                                                                                                                                  |
| `client.apiKey`                       |Optional. `String`. Specifies an API Key. This option overrides the default, which is the API Key configured in your tracking plan.|
| `client.instance`                     | Optional. `AmplitudeClient`. Specifies an Amplitude instance. By default Ampli creates an instance for you.|
| `client.options`                      | Optional. `Amplitude.Config`. Overrides the default configuration for the AmplitudeClient.|

### Identify

Call `identify()` to identify a user in your app and associate all future events with their identity, or to set their properties.

Just as the Ampli Wrapper creates types for events and their properties, it creates types for user properties.

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
<!-- vale off-->
 Setting a group also sets the 'groupType:groupName' as a user property, and overwrites any existing `groupName` value set for that user's `groupType`, and the corresponding user property value. `groupType` is a string, and `groupName` can be either a string or an array of strings to indicate that a user is in multiple groups. For example, if Joe is in 'orgId' '10' and '20', then the `groupName` is '[10, 20]').
<!-- vale on-->
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

To track an event, call the event's corresponding function. Every event in your tracking plan gets its own function in the Ampli Wrapper. The call is structured like this:

=== "TypeScript"

    ```js
    ampli.eventName(properties: EventNameProperties, options: EventOptions, extra: MiddlewareExtra)
    ```

=== "JavaScript"

    ```js
    ampli.eventName(properties: EventNameProperties, options: EventOptions, extra: MiddlewareExtra)
    ```

The `properties` argument passes event properties.

The `options` argument allows you to pass [Amplitude fields](https://developers.amplitude.com/docs/http-api-v2#properties-1), like `price`, `quantity` and `revenue`.

The `extra` argument lets you pass data to middleware.

For example, in the following code snippet, your tracking plan contains an event called `songPlayed`. The event is defined with two required properties: `songId` and `songFavorited`.
 The property type for `songId` is string, and `songFavorited` is a boolean.

The event has an Amplitude field defined: `deviceId`. Learn more about Amplitude fields [here](https://developers.amplitude.com/docs/http-api-v2#properties-1).
 The event has one MiddlewareExtra defined: `myMiddleware`. Learn more about [Middleware](../../../sdk-middleware).

=== "TypeScript"

    ```js
    ampli.songPlayed( {
      songId: 'songId', // string,
      songFavorited: true, // boolean
    }, {
      deviceId: 'a-device-id',
    }, {
      myMiddleware: { myMiddlewareProp: "value to send to middleware" }
    });
    ```

=== "JavaScript"

    ```js
    ampli.songPlayed( {
      songId: 'songId', // string,
      songFavorited: true, // boolean
    }, {
      deviceId: 'a-device-id',
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

--8<-- "includes/ampli/cli-pull-and-status-section.md"
