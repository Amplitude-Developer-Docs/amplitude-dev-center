---
id: browser-legacy
title: Browser (Legacy)
---



Iteratively supports tracking analytics events from browser apps written in JavaScript (ES6 and above) and TypeScript (2.1 and above). The generated tracking library is packaged as an ES module.

In TypeScript, the tracking library exposes a type-safe function for every event in your team’s tracking plan. The function’s arguments correspond to the event’s properties and are strongly typed to allow for code completion and compile-time checks.

Since JavaScript is not a type-safe language, the library won't expose type-safe functions for the events in your team’s tracking plan. Instead, the auto-generated library performs those checks at runtime.

## Installation

### Generate the SDK

If you have not yet installed the Ampli CLI, [install it now](using-the-ampli-cli).

To generate the Itly SDK, run `ampli pull {source}` in the folder with your package.json file. By default, the SDK will be generated in `./src/itly/`.

:::note Tip
`{source}` is the name of the source you created in your tracking plan (e.g. `browser`).
:::

### Install dependencies

The generated Itly SDK has several dependencies. To install them, run:

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
npm install @itly/sdk \
            @itly/plugin-schema-validator
```

</TabItem>
<TabItem value="yarn">

```bash
yarn add @itly/sdk \
         @itly/plugin-schema-validator
```

</TabItem>
</Tabs>

If you're using Amplitude or Segment, the SDK will also depend on a few additional plugins that must be installed before your project will compile:

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
# if you're using Segment
npm install @itly/plugin-segment
# if you're using Amplitude
npm install @itly/plugin-amplitude
```

</TabItem>
<TabItem value="yarn">

```bash
# if you're using Segment
yarn add @itly/plugin-segment
# if you're using Amplitude
yarn add @itly/plugin-amplitude
```

</TabItem>
</Tabs>

:::note Note
- To validate your analytics events, the SDK depends on [ajv](https://github.com/ajv-validator/ajv) (MIT).
:::

### Import into your app

To use the library, you'll need to import it first:

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
import itly from './itly';
```

</TabItem>
<TabItem value="js">

```js
import itly from './itly';
```

</TabItem>
</Tabs>

You can now call functions on `itly` directly.

:::note Note
Adjust the relative import path to the location where `ampli pull` generated your SDK. By default, this path is `./src/itly`.
:::

## API

### Load

Load the Itly SDK once when your application starts. The `load()` function accepts an options object to configure the SDK's behavior:

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
itly.load({ environment: 'development' });
```

</TabItem>
<TabItem value="js">

```js
itly.load({ environment: 'development' });
```

</TabItem>
</Tabs>

| Option ||||
|-|-|-|-|
| `context` | Object<br />`Context` | required | An object with a set of properties to add to every event sent by the Itly SDK.<br /><br />Only available if there is at least one [source template](working-with-templates#adding-a-template-to-a-source) associated with your your team's tracking plan.|
| `disabled` | Boolean | optional | Specifies whether the Itly SDK does any work. When `true`, all calls to the Itly SDK will be no-ops. Useful in local or development environments.<br /><br />Defaults to `false`.|
| `environment` | String | optional | Specifies the environment the Itly SDK is running in: `production` or `development`.<br /><br />Environment determines which Access Token is used to load the underlying analytics provider libraries.<br /><br />The option also determines safe defaults for handling event validation errors. In production, when the SDK detects an invalid event, it will log an error but still let the event through. In development, the SDK will throw an exception to alert you that something is wrong.<br /><br />Defaults to `development`.|
| `destinations` | Object<br />`DestinationsOptions` | optional | Specifies any analytics provider-specific configuration. The Itly SDK passes these objects in when loading the underlying analytics provider libraries.|
| `validation` | Object<br />`ValidationOptions` | optional | Configures the Itly SDK's behavior when events or traits fail validation against your tracking plan. Supports the following properties:<br /><br />`disabled`<br /> Disables validation altogether. Defaults to `false`.<br /><br />`trackInvalid`<br />Secifies whether events that failed validation should still be tracked. Defaults to `false` in development, `true` in production.<br /><br />`errorOnInvalid`<br />Specifies whether the SDK should throw an exception when validation fails. Defaults to `true` in development, `false` in production.|
| `plugins` | Array | optional | An array of additional plugins to load into the Itly SDK. Plugins allow you to extend the Itly SDK's event validation and event tracking functionality with your own. For example, a plugin can be used to implement a custom destination or a custom event validator.<br /><br />[Click here](#custom-destination) to learn about writing a custom destination plugin.<br /><br />[Click here](https://bitbucket.org/seasyd/examples/src/master/browser-javascript/src/CustomDestination.js) to see a sample custom destination plugin written in JavaScript.<br /><br />[Click here](https://bitbucket.org/seasyd/examples/src/master/browser-typescript/src/CustomDestination.ts) to see a sample custom destination plugin written in TypeScript.|

:::note Note
The Itly SDK will automatically load and initialize your analytics providers' libraries using your each library's official installation instructions.
:::

### Identify

Call `identify()` to identify a user in your application and associate all future events with their identity, or to set their traits.

Just as Iteratively creates types for events and their properties (and validates them at runtime), Iteratively creates types for user traits (and validates them at runtime).

The `identify()` function accepts an optional `userId` and optional `traits`.

For example, in the code snippet below, our tracking plan contains a user trait called `role`. The trait's type is a string.

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
itly.identify('user-id', { role: 'admin' });
```

</TabItem>
<TabItem value="js">

```js
itly.identify('user-id', { role: 'admin' });
```

</TabItem>
</Tabs>

### Group

Call `group()` to associate a user with their group (for example, their department or company), or to set the group's traits.

Just as Iteratively creates types for events and their properties (and validates them at runtime), Iteratively creates types for group traits (and validates them at runtime).

The `group()` function accepts a required `groupId` and optional `traits`.

For example, in the code snippet below, our tracking plan contains a group trait called `name`. The trait's type is a string.

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
itly.group('group-id', { name: 'Iteratively, Inc.' });
```

</TabItem>
<TabItem value="js">

```js
itly.group('group-id', { name: 'Iteratively, Inc.' });
```

</TabItem>
</Tabs>

### Track

To track an event, call the event’s corresponding function. Every event in your tracking plan gets its own function in the Itly SDK.

For example, in the code snippet below, our tracking plan contains an event called `User Signed In`. The event was defined with one required property called `platform`. The property's type is a string.

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
itly.userSignedIn({ platform: 'web' });
```

</TabItem>
<TabItem value="js">

```js
itly.userSignedIn({ platform: 'web' });
```

</TabItem>
</Tabs>

<!--

Itly includes code docs in the auto-generated library so your IDE can display relevant documentation for every function and property as you type.

![Code documentation](/img/vscode.png)

-->

## Custom Destination

:::note Advanced
If you're using Iteratively with Amplitude or Segment, you can safely skip this section!
:::

To send clean, valid events to custom analytics destinations, or those not yet supported by the Itly SDK natively, the SDK is extensible via plugins. Writing a plugin is easy! Extend the `PluginBase` class, override `track()`, and include your new plugin in the `plugins` array when calling `itly.load()`.

Plugins allow you to implement your own processing logic for analytics tracking. When you call a function on the Itly SDK, the SDK will first validate your event (or user, group, and page properties) against your tracking plan, then call into your plugin's implementation.

The following functions are available to override when developing your plugin. Only override those functions that matter to your custom destination.

:::note Examples
A sample custom destination plugin is available [here](https://bitbucket.org/seasyd/examples/src/master/browser-javascript/src/CustomDestination.js) in JavaScript and [here](https://bitbucket.org/seasyd/examples/src/master/browser-typescript/src/CustomDestination.ts) in TypeScript.
:::

#### ID
Every plugin has a unique ID. To set one, override `id()` and return your plugin's ID. The function has the following signature:

```javascript
id(): string;
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
alias(userId: string, previousId: string | undefined): void;
```

| Argument | Type || Description |
|-|-|-|-|
| `userId` | String | required | The ID that the user will be identified by going forward. This is typically the user's database ID (as opposed to an anonymous ID), or their updated ID (for example, if the ID is an email address which the user just updated). |
| `previousId` | String | optional | The ID the user has been identified by so far. |
<br />

#### Identify
Called when Itly SDK's `identify()` function is called to identify a user with a specific ID or set the user's traits. The `identify()` function has the following signature:

```javascript
identify(userId: string | undefined, properties: Properties | undefined): void;
```

| Argument | Type || Description |
|-|-|-|-|
| `userId` | String | optional | The user's ID, if it was provided to `itly.identify()`. The ID may not be provided if `identify()` was called only to update the user's traits. |
| `properties` | Object<br />`Properties` | optional | The user's traits. |
<br />

#### Track
Called when an event is tracked. The function receives a validated event with its complete set of properties (a combination of the event's own properties any any other properties associated with the source via a [source template](working-with-templates#adding-a-template-to-a-source)) The `track()` function has the following signature:

```javascript
track(userId: string | undefined, event: Event): void;
```

| Argument | Type || Description |
|-|-|-|-|
| `userId` | String | optional | Always undefined in the Browser SDK. |
| `event` | Object<br />`Event` | required | The event that was tracked by the Itly SDK. The event object contains the following properties:<br /><br />`name`<br />The event's name.<br /><br />`properties`<br />The event's properties.<br /><br />`id`<br />The event's unique ID in Iteratively.<br /><br />`version`<br />The event's version, e.g. 2.0.1.<br /><br /> |
<br />

#### Group
Called when Itly SDK's `group()` function is called to associate the user with a specific account (for example, their department or company) or set the group's properties. The `group()` function has the following signature:

```javascript
group(userId: string | undefined, groupId: string, properties?: Properties | undefined): void;
```

| Argument | Type || Description |
|-|-|-|-|
| `userId` | String | optional | Always undefined in the Browser SDK. |
| `groupId` | String | required | The ID of the group (for example, the user's department or company) to associate the user with. |
| `properties` | Object<br />`Properties` | optional | The group's traits. |
<br />

#### Page
Called when Itly SDK's `page()` function is called to track a page view in a web application. The `page()` function has the following signature:

```javascript
page(userId: string | undefined, category: string | undefined, name: string | undefined, properties: Properties | undefined): void;
```

| Argument | Type || Description |
|-|-|-|-|
| `userId` | String | optional | Always undefined in the Browser SDK. |
| `category` | String | optional | The page's category. Useful when many pages might live under a single category. |
| `name` | String | optional | The page's name. |
| `properties` | Object<br />`Properties` | optional | The page's traits. |
<br />

#### Reset
Called when Itly SDK's `reset()` function is called to reset the SDK's (and all plugins') state. This method is usually called when a user logs out. The `reset()` function has the following signature:

```javascript
reset(): void;
```

<!-- ### Logging -->
