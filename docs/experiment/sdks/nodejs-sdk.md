---
title: Experiment Node.js SDK
description: Amplitude Experiment's server-side Node.js SDK implementation reference.
icon: fontawesome/brands/node-js
---

![npm version](https://badge.fury.io/js/%40amplitude%2Fexperiment-node-server.svg)

This is the official documentation for the Amplitude Experiment server-side Node.js SDK implementation reference.

!!!info "SDK Resources"
    [:material-github: Github](https://github.com/amplitude/experiment-node-server) · [:material-code-tags-check: Releases](https://github.com/amplitude/experiment-node-server/releases) · [:material-book: API Reference](https://amplitude.github.io/experiment-node-server/)

## Installation

Install the Node.js Server SDK with npm or yarn.

=== "npm"

    ```bash
    npm install --save @amplitude/experiment-node-server
    ```

=== "yarn"

    ```bash
    yarn add @amplitude/experiment-node-server
    ```

!!!info "Node version compatibility"

    The Node Server SDK works with Node 10+.

## Quick Start

1. [Get your deployment's API key](../create-deployment.md)
2. [Initialize the experiment client](#initialization)
3. [Fetch variants for a user](#fetch-variants-for-a-user)
4. [Lookup a flag's variant](#look-up-a-variant)

```js
import { Experiment } from '@amplitude/experiment-node-server';

// (1) Get your deployment's API key
const apiKey = 'YOUR-API-KEY';

// (2) Initialize the experiment client
const experiment = Experiment.initialize(apiKey);

// (3) Fetch variants for a user
const user = {
  user_id: 'user@company.com',
  device_id: 'abcezas123',
  user_properties: {
    'premium': true,
  },
};
const variants = await experiment.fetch(user);

// (4) Lookup a flag's variant
const variant = variants['YOUR-FLAG-KEY'];
if (variant?.value === 'on') {
  // Flag is on
} else {
    // Flag is off
}
```

## Initialization

Initialize an `ExperimentClient` in your server startup. You will need the API Key for your [Project deployment](https://developers.experiment.amplitude.com/docs/deployments).

You can find the API Key in the Deployments section of your Experiment instance.

```js title="index.js"
import { Experiment } from '@amplitude/experiment-node-server';

const experiment = Experiment.initialize('api-key');
```

!!!info "Singleton Instance"

    `Experiment.initialize` returns a default singleton instance. It is recommended that you either (a) inject the initialized instance throughout your system or (b) wrap the initialized `ExperimentClient` in your own API. Ultimately, subsequent calls to `initialize` will return the initial instance regardless of input.

## Configuration

The `ExperimentClient` can be configured on initialization. Once initialized, the client's configuration cannot be changed. Initialize an empty object for the default configuration, or use the `ExperimentConfig.Builder` to build a [custom configuration](https://developers.experiment.amplitude.com/docs/configuration#server-side).

```js
const defaultConfig = {};
const customConfig = {
  debug: true,
  fetchTimeoutMillis: 500,
  fetchRetries: 4,
};
```

## Fetch Variants for a User

After initializing an `ExperimentClient`, you will need to fetch variants for your user. First, create your `ExperimentUser` then call your client's `fetch` method with the user. This will make a request for all variants that the user is assigned, and return a promise that resolves when the request completes. The result is a dictionary from `key` to assigned `Variant`. Variants contain a `value` field containing the value of the variant assigned to the user.


```js title="feature.js"
// Create an experiment user
const user = {
  user_id: 'user@company.com',
  device_id: 'abcezas123',
  user_properties: {
    'premium': true,
  },
};

// Fetch variants assigned to the user
const variants = await experiment.fetch(user);
```

## Look up a Variant

The client's `fetch` returns a map of flag key to variant. Simply use the desired flag's key to look up the assigned variant in the map returned by `fetch`.

```js
// `variants` map is the result of `fetch`
const variant = variants[key];
// Change the experience based on the variant
if (variant?.value === "on") { // "on" is a variant value
  return true;
} else {
  return false;
}
```

## Connecting to Amplitude Analytics

In order to connect with Amplitude Analytics, you will need to configure the user object provided in `fetch()` with Device ID and/or User ID information.

```js
const user = {
  'user_id': 'user_id',
  'device_id': 'device_id',
}
const allVariants = await experimentClient.fetch(user);
```

This should be the same Device ID and/or User ID that you send to Amplitude for a user. This will ensure that Amplitude will track users properly. Read more about [identity resolution in Amplitude](https://help.amplitude.com/hc/en-us/articles/115003135607).

The SDK provides an `AmplitudeCookie` class with convenience functions for parsing and interacting with the Amplitude identity cookie. This is useful for ensuring that the Device ID on the server matches the Device ID set on the client, especially if the client has not yet generated a Device ID. An example for parsing and generating Amplitude cookies is provided below:

```js
import { AmplitudeCookie } from '@amplitude/experiment-node-server';

app.use((req, res, next) => {
  const { query, cookies, url, path, ip, host } = req

  // grab amp device id if present
  const ampCookieName = AmplitudeCookie.cookieName('amplitude-api-key');
  let deviceId = null;
  if (cookies[ampCookieName]) {
    deviceId = AmplitudeCookie.parse(cookies[ampCookieName]).device_id;
  }
  if (!deviceId) {
    // deviceId doesn't exist, set the Amplitude Cookie
    deviceId = random22CharBase64String();
    const ampCookieValue = AmplitudeCookie.generate(deviceId);
    res.cookie(ampCookieName, ampCookieValue, {
      domain: '.yourdomain.com', // this should be the same domain used by the Amplitude JS SDK
      maxAge: 365 * 24 * 60 * 60 * 1000, // this is currently the same as the default in the Amplitude JS SDK, can be modified
      sameSite: 'Lax'
    });
  }

  next()
});
```
