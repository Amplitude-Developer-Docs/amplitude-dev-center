---
title: Node.js (Itly)
description: Documentation for the deprecated Node.js SDK. 
icon: material/nodejs
search:
  exclude: true
---

<!-- markdownlint-disable -->

!!!warning "Deprecated SDK"
    This SDK is deprecated and these docs are no longer maintained. Migrate to the [Node.js SDK (Ampli)](data/sdks/node/ampli.md).

!!!note "Migrating"

    Migrating from **Node.js (Legacy)** to the new **Node.js** runtime? A migration guide is available [here](#migrating-from-previous-version).

Amplitude Data supports tracking analytics events from Node.js apps written in JavaScript (ES6 and above) and TypeScript (2.1 and above). The generated tracking library is packaged as a CJS module.

In TypeScript, the tracking library exposes a type-safe function for every event in your team’s tracking plan. The function’s arguments correspond to the event’s properties and are strongly typed to allow for code completion and compile-time checks.

Since JavaScript is not a type-safe language, the library won't expose type-safe functions for the events in your team’s tracking plan. Instead, the auto-generated library performs those checks at runtime.

## Installation

### Generate the SDK

If you have not yet installed the Ampli CLI, [install it now](/data/using-the-ampli-cli).

To generate the Itly SDK, run `ampli pull {source}` in the folder with your package.json file. By default, the SDK will be generated in `./src/itly/`.

!!!tip

    `{source}` is the name of the source you created in your tracking plan (e.g. `backend`).

### Install dependencies

!!!tip

    When you run `ampli pull {source}` for the first time, the Ampli CLI will provide an npm/yarn install command specific to your tracking plan that will include all required dependencies.

The generated Itly SDK has several dependencies. To install them, run:

=== "npm"

    ```bash
    npm install @itly/sdk \
                @itly/plugin-schema-validator
    ```

=== "yarn"

    ```bash
    yarn add @itly/sdk \
            @itly/plugin-schema-validator
    ```

If you're using Segment or Amplitude, the SDK will also depend on a few additional plugins that must be installed before your project will compile:

=== "npm"

    ```bash
    # if you're using Segment
    npm install @itly/plugin-segment-node
    # if you're using Amplitude
    npm install @itly/plugin-amplitude-node
    ```

=== "yarn"

    ```bash
    # if you're using Segment
    yarn add @itly/plugin-segment-node
    # if you're using Amplitude
    yarn add @itly/plugin-amplitude-node
    ```

!!!note

    - To validate your analytics events, the SDK depends on [ajv](https://github.com/ajv-validator/ajv) (MIT).
    - To send events to Segment, the SDK depends on [analytics-node](https://github.com/segmentio/analytics-node) (MIT).
    - To send events to Amplitude, the SDK depends on [amplitude](https://github.com/geoffdutton/amplitude) (ISC).


### Import into your app

To use the library, you'll need to import it first:

=== "TypeScript"

    ```js
    import itly from './itly';
    ```

=== "JavaScript"

    ```js
    const itly = require('./itly');
    ```

You can now call functions on `itly` directly.

!!!note

    Adjust the relative import path to the location where `ampli pull` generated your SDK. By default, this path is `./src/itly`.


## API

### Load

Load the Itly SDK once when your application starts. The `load()` function accepts an options object to configure the SDK's behavior:


=== "TypeScript"

    ```js
    itly.load({ environment: 'development' });
    ```

=== "JavaScript"

    ```js
    itly.load({ environment: 'development' });
    ```


| <div class="big-column">Option</div> ||||
|-|-|-|-|
| `context`| Object<br />`Context` | required | An object with a set of properties to add to every event sent by the Itly SDK.<br /><br />Only available if there is at least one [source template](working-with-templates#adding-a-template-to-a-source) associated with your your team's tracking plan.|
| `disabled`| Boolean | optional | Specifies whether the Itly SDK does any work. When `true`, all calls to the Itly SDK will be no-ops. Useful in local or development environments.<br /><br />Defaults to `false`.|
| `environment` | String | optional | Specifies the environment the Itly SDK is running in: `production` or `development`.<br /><br />Environment determines which Access Token is used to load the underlying analytics provider libraries.<br /><br />The option also determines safe defaults for handling event validation errors. In production, when the SDK detects an invalid event, it will log an error but still let the event through. In development, the SDK will throw an exception to alert you that something is wrong.<br /><br />Defaults to `development`.|
| `destinations` | Object<br />`DestinationsOptions` | optional | Specifies any analytics provider-specific configuration. The Itly SDK passes these objects in when loading the underlying analytics provider libraries.|
| `validation` | Enum<br />`Validation` | optional | Configures the Itly SDK's behavior when events or traits fail validation against your tracking plan. Supports the following options:<br /><br />`Disabled`<br /> Disables validation altogether.<br /><br />`TrackOnInvalid`<br />Specifies whether events that failed validation should still be tracked.<br /><br />`ErrorOnInvalid`<br />Specifies whether the SDK should throw an exception when validation fails.<br /><br /> Defaults to `ErrorOnInvalid` in development, `TrackOnInvalid` in production.|
| `plugins` | Array | optional | An array of additional plugins to load into the Itly SDK. Plugins allow you to extend the Itly SDK's event validation and event tracking functionality with your own. For example, a plugin can be used to implement a custom destination or a custom event validator.<br /><br />[Click here](#custom-destination) to learn about writing a custom destination plugin.<br /><br />[Click here](https://bitbucket.org/seasyd/examples/src/master/browser-javascript-v3/src/CustomDestination.js) to see a sample custom destination plugin written in JavaScript.<br /><br />[Click here](https://bitbucket.org/seasyd/examples/src/master/browser-typescript-v3/src/CustomDestination.ts) to see a sample custom destination plugin written in TypeScript.|

### Identify

Call `identify()` to set a particular user's traits.

Just as Amplitude Data creates types for events and their properties (and validates them at runtime), Amplitude Data creates types for user traits (and validates them at runtime).

The `identify()` function accepts a required `userId`, required `traits`, and optional `options`.

For example, in the code snippet below, our tracking plan contains a user trait called `role`. The trait's type is a string.


=== "TypeScript"

    ```js
    itly.identify('user-id', { role: 'admin' });
    ```

=== "JavaScript"

    ```js
    itly.identify('user-id', { role: 'admin' });
    ```

The `options` argument allows you to pass additional metadata about this call, such as a callback function or custom configuration, to the SDK's destinations. For example, to specify that Segment should only send data to Intercom and Google Analytics:

=== "TypeScript"

    ```js
    itly.identify(
      'user-id',
      {
        role: 'admin',
      },
      {
        segment: {
          options: {
            integrations: {
              'All': false,
              'Intercom': true,
              'Google Analytics': true
            }
          }
        }
      }
    );
    ```

=== "JavaScript"

    ```js
    itly.identify(
      'user-id',
      {
        role: 'admin',
      },
      {
        segment: {
          options: {
            integrations: {
              'All': false,
              'Intercom': true,
              'Google Analytics': true
            }
          }
        }
      }
    );
    ```

### Group

Call `group()` to associate a user with their group (for example, their department or company), or to set the group's traits.

Just as Amplitude Data creates types for events and their properties (and validates them at runtime), Amplitude Data creates types for group traits (and validates them at runtime).

The `group()` function accepts a required `userId`, `groupId`, optional `traits`, and optional `options`.

For example, in the code snippet below, our tracking plan contains a group trait called `name`. The trait's type is a string.

=== "TypeScript"

    ```js
    itly.group('user-id', 'group-id', { name: 'Iteratively, Inc.' });
    ```

=== "JavaScript"

    ```js
    itly.group('user-id', 'group-id', { name: 'Iteratively, Inc.' });
    ```


<br />

The `options` argument allows you to pass additional metadata about this call, such as a callback function or custom configuration, to the SDK's destinations. For example, to specify that Segment should invoke a callback function when it's done calling `group()`:


=== "TypeScript"

    ```js
    itly.group('user-id', 'group-id', { name: 'Iteratively, Inc.' }, {
      segment: {
        callback: () => console.log('Segment is done!'),
      }
    });
    ```

=== "JavaScript"

    ```js
    itly.group('user-id', 'group-id', { name: 'Iteratively, Inc.' }, {
      segment: {
        callback: () => console.log('Segment is done!'),
      }
    });
    ```


### Track

To track an event, call the event’s corresponding function. Every event in your tracking plan gets its own function in the Itly SDK.

For example, in the code snippet below, our tracking plan contains an event called `Process Started`. The event was defined with one required property called `availableProcessors`. The property's type is an integer.

=== "TypeScript"

    ```js
    itly.processStarted('user-id', { availableProcessors: os.cpus().length });
    ```

=== "JavaScript"

    ```js
    itly.processStarted('user-id', { availableProcessors: os.cpus().length });
    ```


<br />

The `options` argument allows you to pass additional metadata about this call, such as a callback function or custom configuration, to the SDK's destinations. For example, to specify that Segment should only track the event to Intercom and Google Analytics:

=== "TypeScript"

    ```js
    itly.processStarted('user-id', { availableProcessors: os.cpus().length },
      {
        segment: {
          options: {
            integrations: {
              'All': false,
              'Intercom': true,
              'Google Analytics': true
            }
          }
        }
      }
    );
    ```

=== "JavaScript"

    ```js
    itly.processStarted('user-id', { availableProcessors: os.cpus().length },
      {
        segment: {
          options: {
            integrations: {
              'All': false,
              'Intercom': true,
              'Google Analytics': true
            }
          }
        }
      }
    );
    ```

## Custom Destination

!!!note "Advanced"
    If you're using Amplitude Data with Amplitude or Segment, you can safely skip this section!

To send clean, valid events to custom analytics destinations, or those not yet supported by the Itly SDK natively, the SDK is extensible via plugins. Writing a plugin is easy! Extend the `Plugin` class, call the base constructors with your plugin's ID, override `track()`, and include your new plugin in the `plugins` array when calling `itly.load()`.

Plugins allow you to implement your own processing logic for analytics tracking. When you call a function on the Itly SDK, the SDK will first validate your event (or user, group, and page properties) against your tracking plan, then call into your plugin's implementation.

The following functions are available to override when developing your plugin. Only override those functions that matter to your custom destination.

!!!example 
    A sample custom destination plugin is available [here](https://bitbucket.org/seasyd/examples/src/master/browser-javascript-v3/src/CustomDestination.js) in JavaScript and [here](https://bitbucket.org/seasyd/examples/src/master/browser-typescript-v3/src/CustomDestination.ts) in TypeScript.


#### Constructor

Every plugin needs a unique ID. To provide one, add a constructor to your plugin and call the base constructor with your plugin's ID. This might look something like this:

```javascript
  constructor() {
    super('custom-destination');
  }
```

<br />

#### Load

Called when the Itly SDK is being loaded and is ready to load your plugin. The  function has the following signature:

```javascript
load(options: Options): void;
```

| Argument ||||
|-|-|-|-|
| `options` | Object<br />`Options` | required | The [same](#load) configuration object passed to `itly.load()` when the SDK was being initialized. |
<br />

#### Alias

Called when Itly SDK's `alias()` function is called to associate one user ID with another (typically a known user ID with an anonymous one). The `alias()` function has the following signature:

```javascript
alias(userId: string, previousId: string, options: AliasOptions | undefined): void;
```

| Argument | Type || Description |
|-|-|-|-|
| `userId` | String | required | The ID that the user will be identified by going forward. This is typically the user's database ID (as opposed to an anonymous ID), or their updated ID (for example, if the ID is an email address which the user just updated). |
| `previousId` | String | required | The ID the user has been identified by so far. |
| `options` | AliasOptions | optional | See [Call Options](#call-options). |
<br />

#### Identify

Called when Itly SDK's `identify()` function is called to identify a user with a specific ID or set the user's traits. The `identify()` function has the following signature:

```javascript
identify(userId: string, properties: Properties, options: IdentifyOptions | undefined): void;
```

| Argument | Type || Description |
|-|-|-|-|
| `userId` | String | required | The user's ID, if it was provided to `itly.identify()`. The ID may not be provided if `identify()` was called only to update the user's traits. |
| `properties` | Object<br />`Properties` | required | The user's traits. |
| `options` | IdentifyOptions | optional | See [Call Options](#call-options). |
<br />

#### Track

Called when an event is tracked. The function receives a validated event with its complete set of properties (a combination of the event's own properties and any other properties associated with the source.  The `track()` function has the following signature:

```javascript
track(userId: string, event: Event, options: TrackOptions | undefined): void;
```

| Argument | Type || Description |
|-|-|-|-|
| `userId` | String | required | Always undefined in the Browser SDK. |
| `event` | Object<br />`Event` | required | The event that was tracked by the Itly SDK. The event object contains the following properties:<br /><br />`name`<br />The event's name.<br /><br />`properties`<br />The event's properties.<br /><br />`id`<br />The event's unique ID in Iteratively.<br /><br />`version`<br />The event's version, e.g. 2.0.1.<br /><br /> |
| `options` | TrackOptions | optional | See [Call Options](#call-options). |
<br />

#### Group

Called when Itly SDK's `group()` function is called to associate the user with a specific account (for example, their department or company) or set the group's properties. The `group()` function has the following signature:

```javascript
group(userId: string, groupId: string, properties?: Properties | undefined, options: GroupOptions | undefined): void;
```

| Argument | Type || Description |
|-|-|-|-|
| `userId` | String | required | Always undefined in the Browser SDK. |
| `groupId` | String | required | The ID of the group (for example, the user's department or company) to associate the user with. |
| `properties` | Object<br />`Properties` | optional | The group's traits. |
| `options` | GroupOptions | optional | See [Call Options](#call-options). |
<br />

#### Page

Called when Itly SDK's `page()` function is called to track a page view in a web application. The `page()` function has the following signature:

```javascript
page(userId: string, category: string | undefined, name: string | undefined, properties: Properties | undefined, options: PageOptions | undefined): void;
```

| Argument | Type || Description |
|-|-|-|-|
| `userId` | String | required | Always undefined in the Browser SDK. |
| `category` | String | optional | The page's category. Useful when many pages might live under a single category. |
| `name` | String | optional | The page's name. |
| `properties` | Object<br />`Properties` | optional | The page's traits. |
| `options` | PageOptions | optional | See [Call Options](#call-options). |
<br />

#### Reset

Called when Itly SDK's `reset()` function is called to reset the SDK's (and all plugins') state. This method is usually called when a user logs out. The `reset()` function has the following signature:

```javascript
reset(): void;
```

#### Call Options

Call Options are a powerful feature that allows your plugin's users to pass additional per-call metadata, such as a callback function or custom  configuration, to your plugin. You can use this metadata to customize your plugin's behavior when processing individual alias, identify, group, page, and track calls. Your plugin's users will provide the metadata intended for your plugin under a field named after the plugin's ID, and your plugin will receive them via the `options` argument.

For example, let's assume you'd like your plugin's users to tell your plugin whether a particular event they're tracking is awesome. Your instrumention engineers would track the event like this:

=== "TypeScript"

    ```js
    itly.buttonClicked(
      /* event's properties */
      { label: 'Send Event' },
      /* event's metadata for the custom destination plugin */
      { 'custom-destination': { awesome: true } as CustomTrackOptions },
    )
    ```

=== "JavaScript"

    ```js
    itly.buttonClicked(
      /* event's properties */
      { label: 'Send Event' },
      /* event's metadata for the custom destination plugin */
      { 'custom-destination': { awesome: true } },
    )
    ```

And your plugin would read the call option metadata like this:

=== "TypeScript"

    ```js
    import { Plugin, Options, Event, PluginCallOptions } from './itly';

    export interface CustomTrackOptions extends PluginCallOptions {
      awesome: boolean;
    }

    export default class extends Plugin {
      constructor() {
        super('custom-destination');
      }

      track(_: string, event: Event, options?: CustomTrackOptions) {
        console.log(options?.awesome);
      }
    }
    ```

=== "JavaScript"

    ```js
    import { Plugin } from './itly';

    export default class extends Plugin {
      constructor() {
        super('custom-destination');
      }

      track(_, event, options) {
        console.log(options?.awesome);
      }
    }
    ```

## Migrating from Previous Version

### Introduction

The new Node.js SDK introduces several new features to help developers implement product analytics.

### Tracking Plan Changes

- Update your source's runtime to **Node.js — JavaScript** or **Node.js — TypeScript** (from **Node.js — JavaScript (Legacy)** or **Node.js — TypeScript (Legacy)**, respectively)

### CLI & Code Changes

- Make sure you have downloaded the [Ampli CLI](/using-the-ampli-cli)

- Pull down the new SDK inside your project's folder (the one with the .itlyrc file):

```bash
ampli pull
```

- Validation options are now an enum rather than an object with three boolean fields:
  - Remove e.g. `validation: { disabled: true }` from `options` passed to `load()`
  - Add `validation: Validation.Disabled` instead, e.g.:

    ```js
    itly.load({
      validation: Validation.Disabled,
    });
    ```

### Custom Destination

In the new SDK, custom destinations look almost identical. The following changes were made:

- The `PluginBase` class your plugin extends was renamed to `Plugin`
- The `id()` method was removed. To set a plugin's ID, implement a constructor and call `super('your-plugin-id')` instead
- All plugin methods (except for `load()`, `reset()`, and `flush()`) now accept a new optional argument called `options`. The argument carries additional metadata that the plugin can use to further customize its behavior for a particular identify, track, group, etc. call. The values in this additional metadata object are provided by the analytics tracking developer when making the original call and are passed all the way through to your plugin.
