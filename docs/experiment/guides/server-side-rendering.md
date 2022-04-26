---
title: Server-side Rendering
description: Use the Amplitude Experiment JavaScript Server SDK and JavaScript Client SDK together to create a seamless server-side rendered experience.
---

<!-- TODO Rewrite and clean up example project -->

Use the JavaScript Server SDK and JavaScript Client SDK together to create a seamless server-side rendered experience.

!!!example

    For a complete example, see the [experiment-node-server demo app](https://github.com/amplitude/experiment-node-server/tree/main/packages/ssr-demo) on GitHub.

## Installation

Install both the JavaScript Server SDK and JavaScript Client SDKs.

=== "npm"

    ```bash
    npm install --save @amplitude/experiment-js-client @amplitude/experiment-node-server
    ```

=== "yarn"

    ```bash
    yarn add @amplitude/skylab-js-client @amplitude/skylab-js-server
    ```

## Initialize the Server SDK

On server startup, you should run initialize the Server SDK. To distinguish from the Client SDK `Experiment` object, we have aliased the `Experiment` object from the Server SDK as `ExperimentServer` here.


```js
let ExperimentServer;
if (typeof window === 'undefined') {
  console.debug('Initializing Server Experiment');
  ExperimentServer = require('@amplitude/experiment-node-server').Experiment.initialize(
    'client-IAxMYws9vVQESrrK88aTcToyqMxiiJoR',
    { debug: true },
  );
}

export { ExperimentServer };
```

## Fetch Variants on Request

On each request, fetch variants using the server side SDK. The result is a plain javascript object mapping feature keys to variant values. You should store the result where your rendering code can access it in both server side and client side contexts.

```js
const allFlags = await experimentServer.fetch({
  id: 'userId',
});

// store the result where the rendering code can access it
global.appProps = { flags: allFlags };
```

## Initialize the Client SDK on Render

At the start of your server side render, initialize the Client SDK with the fetched variants. Here you will need to instantiate a `ExperimentClient` that is accessible in the render scope (for example, a React ContextProvider). If we are in the server side context, we should create a new `ExperimentClient` every time. If we are in the client side, we should create a new `ExperimentClient` if one does not already exist.

```js
import { ExperimentClient } from '@amplitude/experiment-js-client';

let experimentClient;

const render = (appProps) => {
const isServerSide = typeof window === 'undefined';
  if (isServerSide) {
    console.debug('Initializing Client Experiment');
    // on the server, we want to create a new ExperimentClient every time
    experimentClient = new ExperimentClient(
      'client-IAxMYws9vVQESrrK88aTcToyqMxiiJoR',
      {
        initialVariants: appProps['features'],
      },
    );
  } else if (!experiment) {
    // in the client, we only want to create the ExperimentClient once
    experimentClient = Experiment.initialize(
      'client-IAxMYws9vVQESrrK88aTcToyqMxiiJoR',
      {
        initialVariants: appProps['features'],
      },
    );
  }
}

// be sure to use a provider or store the ExperimentClient so that it is accessible in the render scope
```

## Get Variants on Render

Once the Client SDK is initialized, you can fetch the flag status in any component.

```js
// experimentClient should be the same ExperimentClient instance that was instantiated in the previous step
'experimentClient.variant('flag-key');
```