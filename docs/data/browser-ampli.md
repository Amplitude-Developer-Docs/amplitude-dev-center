---
id: browser-ampli
title: Browser 
tags: 
  - Data
  - Kerfluffle
icon: material/language-javascript
---

--8<-- "includes/growth.md"

!!!note
    This doc covers the Ampli Browser runtime. The **Browser (Itly)** runtime is deprecated. See the [migration guide](#migrating-from-previous-version) to ugrade to the newest runtime. Docs for the Itly version are available [here](browser).

Iteratively supports tracking analytics events from browser apps written in JavaScript (ES6 and above) and TypeScript (2.1 and above). The generated tracking library is packaged as an ES module.

In TypeScript, the tracking library exposes a type-safe function for every event in your team’s tracking plan. The function’s arguments correspond to the event’s properties, and they are strongly typed to allow for code completion and compile-time checks.
!!! info inline end
    Lorem ipsum dolor sit amet, consectetur
    adipiscing elit. Nulla et euismod nulla.
    Curabitur feugiat, tortor non consequat
    finibus, justo purus auctor massa, nec
    semper lorem quam in massa.

Because JavaScript is not a type-safe language, the library doesn't expose type-safe functions for the events in your team’s tracking plan. Instead, the auto-generated library performs those checks at runtime.

``` mermaid
stateDiagram-v2
  state fork_state <<fork>>
    [*] --> fork_state
    fork_state --> State2
    fork_state --> State3

    state join_state <<join>>
    State2 --> join_state
    State3 --> join_state
    join_state --> State4
    State4 --> [*]
```

## Installation

These instructions are also available from the **Implementation** page of your Iteratively workspace.

??? note annotate "Note with a Custom Title"

    Lorem ipsum dolor sit amet, (1) consectetur adipiscing elit. Nulla et
    euismod nulla. Curabitur feugiat, tortor non consequat finibus, justo
    purus auctor massa, nec semper lorem quam in massa.

  1.  :man_raising_hand: I'm an annotation!

### Install the Ampli CLI

If you have not yet installed the Ampli CLI, [install it now](using-the-ampli-cli).

### Install dependencies

If you haven't already, install the core Amplitude SDK dependencies.

=== "npm"

    ```bash
    npm install amplitude-js
    ```  
=== "yarn"

    ```bash
    yarn add amplitude-js
    ```


!!!note

    When using Ampli in the browser we recommend loading amplitude-js as a module rather than as a JS snippet.


### Pull the SDK into your project

At the project root, run `pull` command.

```bash
ampli pull
```

This prompts you to log in to your workspace and select a source.

=== "JavaScript"

    ```bash linenums="1" hl_lines="2 3"
    ➜ ampli pull sourcename
    Ampli project is not initialized. No existing `ampli.json` configuration found.
    ? Create a new Ampli project here? Yes
    Organization: Amplitude
    Workspace: My Workspace
    Source: sourcename
    Runtime: Browser - JavaScript
    Branch: main
    Pulling latest version (1.0.0)...
    Tracking library generated successfully.
    Path: ./src/itly #(1)!
    ``` 
    
    1. This is a code annotation
    ```bash
        More Code I guess
    ```


=== "TypeScript"

    ```bash
    ➜ ampli pull sourcename
    Ampli project is not initialized. No existing `ampli.json` configuration found.
    ? Create a new Ampli project here? Yes
    Organization: Amplitude
    Workspace: My Workspace
    Source: sourcename
    Runtime: Browser - TypeScript
    Branch: main
    Pulling latest version (1.0.0)...
    Tracking library generated successfully.
    Path: ./src/itly
    ```

#### This is a 4th level heading? 

Would we do this? Maybe?

## API

### Load

Initialize Ampli in your code.
The `load()` function accepts an options object to configure the SDK's behavior:

| Option         | Type                              | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| -------------- | --------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `disabled`     | Boolean                           | optional | Specifies whether the Itly SDK does any work. When `true`, all calls to the Itly SDK will be no-ops. Useful in local or development environments.<br /><br />Defaults to `false`.                                                                                                                                                   |
| `environment`  | String                            | optional | Specifies the environment the Itly SDK is running in: `production` or `development`.<br /><br />Environment determines which Access Token is used to load the underlying analytics provider libraries.<br /><br />The option also determines safe defaults for handling event validation errors. In production, when the SDK detects an invalid event, it will log an error but still let the event through. In development, the SDK will throw an exception to alert you that something is wrong.<br /><br />Defaults to `development`.                                                                                                                                                                                                                    |


### Identify

Call `identify()` to identify a user in your application and associate all future events with their identity, or to set their traits.

Just as Iteratively creates types for events and their properties (and validates them at runtime), Iteratively creates types for user traits (and validates them at runtime).

The `identify()` function accepts an optional `userId`, optional `traits`, and optional `options`.

For example, in the code snippet below, our tracking plan contains a user trait called `role`. The trait's type is a string.

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


The `options` argument allows you to pass additional metadata about this call, such as a callback function or custom configuration, to the SDK's destinations. For example, to specify that Segment should only send data to Intercom and Google Analytics:

<Tabs
  groupId="browser-source"
  defaultValue="tsx"
  values={[
    { label: 'TypeScript', value: 'tsx', },
    { label: 'JavaScript', value: 'js', },
  ]
}>
<TabItem value="tsx">

```js
ampli.identify(
  'user-id',
  {
    role: 'admin',
  },
  {
    segment: {
      options: {
        integrations: {
          All: false,
          Intercom: true,
          'Google Analytics': true,
        },
      },
    },
  }
);
```

</TabItem>
<TabItem value="js">

```js
ampli.identify(
  'user-id',
  {
    role: 'admin',
  },
  {
    segment: {
      options: {
        integrations: {
          All: false,
          Intercom: true,
          'Google Analytics': true,
        },
      },
    },
  }
);
```

</TabItem>
</Tabs>

### Group

!!!note
    This feature is available for Growth customers who have purchased the [Accounts add-on](https://help.amplitude.com/hc/en-us/articles/115001765532).


Call `setGroup()` to associate a user with their group (for example, their department or company). The `setGroup()` function accepts a required `groupType`, and `groupName`.


<Tabs
  groupId="browser-source"
  defaultValue="tsx"
  values={[
    { label: 'TypeScript', value: 'tsx', },
    { label: 'JavaScript', value: 'js', },
  ]
}>
<TabItem value="tsx">

```js
ampli.setGroup('groupType', 'groupName');
```

</TabItem>
<TabItem value="js">

```js
ampli.setGroup('groupType', 'groupName');
```

</TabItem>
</Tabs>

Amplitude supports assigning users to groups and performing queries, such as Count by Distinct, on those groups. If at least one member of the group has performed the specific event, that group will be included in the count.

For example, you want to group your users based on what organization they are in by using an 'orgId'. Joe is in 'orgId' '10', and Sue is in 'orgId' '15'. Sue and Joe both perform a certain event. You can query their organizations in the Event Segmentation Chart. 

When setting groups, define a `groupType` and `groupName`. In the previous example, 'orgId' is the `groupType` and '10' and '15' are the values for `groupName`. Another example of a `groupType` could be 'sport' with `groupName` values like 'tennis' and 'baseball'.

 Setting a group also sets the 'groupType:groupName' as a user property, and overwrites any existing groupName value set for that user's groupType, and the corresponding user property value. groupType is a string, and groupName can be either a string or an array of strings to indicate a user being in multiple groups. For example, if Joe is in 'orgId' '10' and '16', then the `groupName` is '[10, 16]'). 
 
 Your code might look like this: 


<Tabs
  groupId="browser-source"
  defaultValue="tsx"
  values={[
    { label: 'TypeScript', value: 'tsx', },
    { label: 'JavaScript', value: 'js', },
  ]
}>
<TabItem value="tsx">

```js
ampli.setGroup('orgId', '[10,16]');
```

</TabItem>
<TabItem value="js">

```js
ampli.setGroup('orgId', '[10,16]');
```

</TabItem>
</Tabs>

-- need help with the group options stuff. Could use a good example. 

The `options` argument lets you pass Amplitude field options. For example, to specify that Segment should invoke a callback function when it's done calling `group()`:

<Tabs
  groupId="browser-source"
  defaultValue="tsx"
  values={[
    { label: 'TypeScript', value: 'tsx', },
    { label: 'JavaScript', value: 'js', },
  ]
}>
<TabItem value="tsx">

```js
itly.group(
  'group-id',
  { name: 'Iteratively, Inc.' },
  {
    segment: {
      callback: () => console.log('Segment is done!'),
    },
  }
);
```

</TabItem>
<TabItem value="js">

```js
itly.group(
  'group-id',
  { name: 'Iteratively, Inc.' },
  {
    segment: {
      callback: () => console.log('Segment is done!'),
    },
  }
);
```

</TabItem>
</Tabs>

### Track

To track an event, call the event’s corresponding function. Every event in your tracking plan gets its own function in the Ampli SDK. The call is structured like this: 

<Tabs
  groupId="browser-source"
  defaultValue="tsx"
  values={[
    { label: 'TypeScript', value: 'tsx', },
    { label: 'JavaScript', value: 'js', },
  ]
}>
<TabItem value="tsx">

```js
ampli.eventName(userId: string, properties: eventProperties, options: AmplitudeEventFields, extra: MiddlewareExtra)
```

</TabItem>
<TabItem value="js">

```js
ampli.eventName(userId: string, properties: eventProperties, options: AmplitudeEventFields, extra: MiddlewareExtra)
```

</TabItem>
</Tabs>

For example, in the code snippet below, our tracking plan contains an event called `songPlayed`. The event was defined with two required properties: `songId` and `songFavorited.` The property type for `songId` is string, and `songFavorited` is a boolean. 

The event also has two AmplitudeEventFields defined: `price`, and `quantity`. Learn more about AmplitudeEventFields [here](https://developers.amplitude.com/docs/http-api-v2#properties-1).

-- need to add bit about middleware. 


<Tabs
  groupId="browser-source"
  defaultValue="tsx"
  values={[
    { label: 'TypeScript', value: 'tsx', },
    { label: 'JavaScript', value: 'js', },
  ]
}>
<TabItem value="tsx">

```js
ampli.songPlayed( {
  songId: 'songId', // string,
  songFavorited: true, // boolean
}, {
  price: 1.23,
  quantity: 2
}, {
  myMiddleware: "a value to send to middleware"
})
```

</TabItem>
<TabItem value="js">

```js
ampli.songPlayed( {
  songId: 'songId', // string,
  songFavorited: true, // boolean
}, {
  price: 1.23,
  quantity: 2
}, {
  myMiddleware: "a value to send to middleware"
})
```

</TabItem>
</Tabs>


Ampli also generates a class for each event.

<Tabs
  groupId="browser-source"
  defaultValue="tsx"
  values={[
    { label: 'TypeScript', value: 'tsx', },
    { label: 'JavaScript', value: 'js', },
  ]
}>
<TabItem value="tsx">

```js
const myEventObject = new Ampli.SongPlayed({
  songId: 'songId', // string,
  songFavorited: true, // boolean
});
```

</TabItem>
<TabItem value="js">

```js
const myEventObject = new Ampli.SongPlayed({
  songId: 'songId', // string,
  songFavorited: true, // boolean
});
```

</TabItem>
</Tabs>

Event objects can be tracked using the Ampli `track`:

<Tabs
  groupId="browser-source"
  defaultValue="tsx"
  values={[
    { label: 'TypeScript', value: 'tsx', },
    { label: 'JavaScript', value: 'js', },
  ]
}>
<TabItem value="tsx">

```js
ampli.track(new Ampli.SongPlayed({
  songId: 'songId', // string,
  songFavorited: true, // boolean
}));
```

</TabItem>
<TabItem value="js">

```js
ampli.track(new Ampli.SongPlayed({
  songId: 'songId', // string,
  songFavorited: true, // boolean
}));
```

</TabItem>
</Tabs>

<br />

 -- all of this stuff has changed. See slack for info from justin. Options AmplitudeFields are all the fields listed in HTTP V2 Api. Add the 3rd Param: Middlewareextra it's unstructured data that you can send to middleware. 

The `options` argument allows you to pass additional metadata about this call, such as a callback function or custom configuration, to the SDK's destinations. For example, to specify that Segment should only track the event to Intercom and Google Analytics:

<Tabs
  groupId="browser-source"
  defaultValue="tsx"
  values={[
    { label: 'TypeScript', value: 'tsx', },
    { label: 'JavaScript', value: 'js', },
  ]
}>
<TabItem value="tsx">

```js
itly.userSignedIn(
  { platform: 'web' },
  {
    segment: {
      options: {
        integrations: {
          All: false,
          Intercom: true,
          'Google Analytics': true,
        },
      },
    },
  }
);
```

</TabItem>
<TabItem value="js">

```js
itly.userSignedIn(
  { platform: 'web' },
  {
    segment: {
      options: {
        integrations: {
          All: false,
          Intercom: true,
          'Google Analytics': true,
        },
      },
    },
  }
);
```

</TabItem>
</Tabs>

## Middleware

-- Placeholder! Get the rest of the info from chat with Justin. 

## Migrating from Previous Version

### Introduction

The new Browser SDK introduces several new features to help developers implement product analytics.

### Tracking Plan Changes

- Update your source's runtime to **Browser — JavaScript** or **Browser — TypeScript** (from **Browser — JavaScript (Legacy)** or **Browser — TypeScript (Legacy)**, respectively)

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

- The SDK's plugins no longer initialize analytics provider libraries if they're detected on `window`. In version 1.0, if the SDK's plugin detected that a library has already loaded, it would skip loading it, but would still initialize it using the access key provided in the tracking plan. In the 2.0 version of the SDK, this is no longer the case, and Iteratively simply reuses the instance from `window` as is.

### Custom Destination

In the new SDK, custom destinations look almost identical. The following changes were made:

- The `PluginBase` class your plugin extends was renamed to `Plugin`
- The `id()` method was removed. To set a plugin's ID, implement a constructor and call `super('your-plugin-id')` instead
- All plugin methods (except for `load()`, `reset()`, and `flush()`) now accept a new optional argument called `options`. The argument carries additional metadata that the plugin can use to further customize its behavior for a particular identify, track, group, etc. call. The values in this additional metadata object are provided by the analytics tracking developer when making the original call and are passed all the way through to your plugin.
