---
id: browser-ampli
title: Browser
---


!!! note
    This page covers Browser JavaScript and TypeScript runtimes. All (Itly) runtimes are deprecated. If you are still using an (Itly) runtime, see the **[migration guide](#migrating-from-previous-version)** to ugrade to the newest runtime. Docs for the Itly version are available **[here](browser)**.



Iteratively supports tracking analytics events from Node.js apps written in JavaScript (ES6 and above) and TypeScript (2.1 and above). The generated tracking library is packaged as a CJS module.

The tracking library exposes a function for every event in your team’s tracking plan. The function’s arguments correspond to the event’s properties and are strongly typed to allow for code completion and compile-time checks.

:::tip
Because JavaScript is not a type-safe language, static type checking isn't built in like TypeScript. Some common IDEs allow for real-time type checks in JavaScript based on JSDoc. For a better development experience Ampli generates JSDocs for all methods and classes.

To enable real-time type checking in VSCode for JavaScript:

1. Go to **Preferences > Settings** then search for **checkJs**.
2. Select **JS/TS > Implicit Project Config: Check JS**.

After it's activated, type errors appear directly in the IDE.

Jetbrains provides similar support:

1. Go to **Preferences > Editor > Inspections > JavaScript and TypeScript > General**.
2. In **Signature mismatch** and **Type mismatch**, set the **Severity** to Warning or Error based on your desired level of strictness.

:::


## Installation

These instructions are also available from the **Implementation** page of your Iteratively workspace.

### Install the Ampli CLI

If you haven't installed the Ampli CLI, [install it now](using-the-ampli-cli).

### Install dependencies

If you haven't already, install the core Amplitude SDK dependencies.

<Tabs
  groupId="dependency-man"
  defaultValue="npm"
  values={[
    { label: 'npm', value: 'npm', },
    { label: 'Yarn', value: 'yarn', },
  ]
}>
<TabItem value="npm">

```bash
npm install amplitude-js
```

</TabItem>
<TabItem value="yarn">

```bash
yarn add amplitude-js
```

</TabItem>
</Tabs>

:::note
Note: when using Ampli in the browser, we recommend loading amplitude-js as a module rather than as a JS snippet.
:::


### Pull the SDK into your project

At the project root, run `pull` command.

```bash
ampli pull
```

This prompts you to log in to your workspace and select a source.

<Tabs
  groupId="browser-source"
  defaultValue="JavaScript"
  values={[
    { label: 'JavaScript', value: 'JavaScript', },
    { label: 'TypeScript', value: 'TypeScript', },
  ]
}>
<TabItem value="JavaScript">

```bash
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
Path: ./src/itly
```

</TabItem>
<TabItem value="TypeScript">

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

</TabItem>
</Tabs>

## API

### Load

Initialize Ampli in your code.
The `load()` function accepts an options object to configure the SDK's behavior:



| Option          | Type                              | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| --------------- | --------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `disabled`      | Boolean                           | optional | Specifies whether the Ampli SDK does any work. When `true`, all calls to the Ampli SDK will be no-ops. Useful in local or development environments.<br /><br />Defaults to `false`.                                                                                                                                                   |
| `environment`   | String                            | optional | Specifies the environment the Ampli SDK is running in: `production` or `development`.<br /><br />Environment determines which Access Token is used to load the underlying analytics provider libraries.<br /><br />Defaults to `development`.                                                                                                                                                                                                                    |
| `client.apiKey` | String                            | optional |Specifies an API Key. This option overrides the default, which is the API Key configured in your tracking plan.|
|`client.instance`| AmplitudeClient                   | optional | Specifies an Amplitude instance. By default Ampli creates an instance for you.|
| `client.config` | Amplitude.Config                  | optional | Overrides the default configuration for the AmplitudeClient.|

### Identify

Call `identify()` to identify a user in your app and associate all future events with their identity, or to set their properties.

Just as the Ampli SDK creates types for events and their properties, it creates types for user properties.

The `identify()` function accepts an optional `userId`, optional user properties, and optional `options`.

For example, your tracking plan contains a user property called `role`. The property's type is a string.

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
ampli.identify('user-id', {
  role: 'admin'
});
```

</TabItem>
<TabItem value="js">

```js
ampli.identify('user-id', {
  role: 'admin'
});
```

</TabItem>
</Tabs>

<br />

The options argument allows you to pass [Amplitude fields](https://developers.amplitude.com/docs/http-api-v2#keys-for-the-event-argument) for this call, such as `deviceId`.


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
ampli.identify('user-id', {
  role: 'admin'
}, {
  deviceId: 'my-device-id'
});
```

</TabItem>
<TabItem value="js">

```js
ampli.identify('user-id', {
  role: 'admin'
}, {
  deviceId: 'my-device-id'
});
```

</TabItem>
</Tabs>

### Group

:::note
This feature is available for Growth customers who have purchased the [Accounts add-on](https://help.amplitude.com/hc/en-us/articles/115001765532).
:::

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

Amplitude supports assigning users to groups and performing queries, such as Count by Distinct, on those groups. If at least one member of the group has performed the specific event, then the count includes the group.

For example, you want to group your users based on what organization they're in by using an 'orgId'. Joe is in 'orgId' '10', and Sue is in 'orgId' '15'. Sue and Joe both perform a certain event. You can query their organizations in the Event Segmentation Chart.

When setting groups, define a `groupType` and `groupName`. In the previous example, 'orgId' is the `groupType` and '10' and '15' are the values for `groupName`. Another example of a `groupType` could be 'sport' with `groupName` values like 'tennis' and 'baseball'.

 Setting a group also sets the 'groupType:groupName' as a user property, and overwrites any existing groupName value set for that user's groupType, and the corresponding user property value. groupType is a string, and groupName can be either a string or an array of strings to indicate that a user is in multiple groups. For example, if Joe is in 'orgId' '10' and '20', then the `groupName` is '[10, 20]').

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
ampli.setGroup('orgId', ['10', '20']);
```

</TabItem>
<TabItem value="js">

```js
ampli.setGroup('orgId', ['10', '20']);
```

</TabItem>
</Tabs>


### Track

To track an event, call the event's corresponding function. Every event in your tracking plan gets its own function in the Ampli SDK. The call is structured like this:

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
ampli.eventName(properties: EventNameProperties, options: EventOptions, extra: MiddlewareExtra)
```

</TabItem>
<TabItem value="js">

```js
ampli.eventName(properties: EventNameProperties, options: EventOptions, extra: MiddlewareExtra)
```

</TabItem>
</Tabs>

The `properties` argument passes event properties.

The `options` argument allows you to pass to pass [Amplitude fields](https://developers.amplitude.com/docs/http-api-v2#properties-1), like `price`, `quanity` and `revenue`.

The `extra` argument lets you pass data to middleware.

For example, in the code snippet below, your tracking plan contains an event called `songPlayed`. The event is defined with two required properties: `songId` and `songFavorited.` The property type for `songId` is string, and `songFavorited` is a boolean.

The event has an Amplitude field defined: `deviceId`. Learn more about Amplitude fields [here](https://developers.amplitude.com/docs/http-api-v2#properties-1). The event has one MiddlewareExtra defined: `myMiddleware`. Learn more about [Middleware](#middleware).

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
  deviceId: 'a-device-id',
}, {
  myMiddleware: { myMiddlewareProp: "value to send to middleware" }
});
```

</TabItem>
<TabItem value="js">

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
const myEventObject = new SongPlayed({
  songId: 'songId', // string,
  songFavorited: true, // boolean
});
```

</TabItem>
<TabItem value="js">

```js
const myEventObject = new SongPlayed({
  songId: 'songId', // string,
  songFavorited: true, // boolean
});
```

</TabItem>
</Tabs>

Track Event objects using Ampli `track`:

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
ampli.track(new SongPlayed({
  songId: 'songId', // string,
  songFavorited: true, // boolean
}));
```

</TabItem>
<TabItem value="js">

```js
ampli.track(new SongPlayed({
  songId: 'songId', // string,
  songFavorited: true, // boolean
}));
```

</TabItem>
</Tabs>

<br />

##  Verify implementation status

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
Events Tracked: 2 missed, 3 total
```
Learn more about [`ampli status`](https://developers.data.amplitude.com/using-the-ampli-cli/#ampli-status).

## Migrating from an Itly Browser runtime

Migrate from an Itly Browser runtime to Ampli by following these steps.

1. Update Source runtime. In the web app open the **Connections > Source** modal. From the dropdown, update the source to a non-`(Itly)` runtime.
2. Go to the **Implementation** page, then select the new Source for detailed setup and usage instructions.
3. Remove legacy Itly dependencies from your project. This includes anything that contains `@itly`:

    `yarn remove @itly/sdk @itly/plugin-schema-validator @itly/plugin-amplitude ...`
4. Add Amplitude dependencies:

  `yarn add amplitude-js`

5. Pull the latest Ampli SDK:

   `ampli pull`

6. Find and replace:
    - `import { itly } from '../itly'` => `import { ampli } from '../ampli'`
    - `itly.group(userId, groupId) => ampli.setGroup(userId, groupType, groupName)`
    - `itly.load()` => `ampli.load()`
    - All `itly.` with `ampli.`
7. See updated Event tracking details on your Implementation page in the web app.
