---
title: Node.js SDK
description: The Amplitude Node.js SDK installation and quick start guide.
icon: simple/nodedotjs
---


![npm version](https://badge.fury.io/js/%40amplitude%2Fnode.svg)

This is Amplitude Node.js SDK written in Typescript, the 1st backend SDK for Amplitude. We would like to hear your ideas too!

While the client-side SDKs are optimized to track session and attribution for a single user or device, the Node SDK's focus is to provide a helpful developer experience to help back-end services reliably and correctly send events from many users and sources. Out of the box, the Node SDK provides:

- Batching of events to send multiple events in the same request.
- Retry handling mechanisms to handle when a network request fails, or a payload is throttled or invalid.
- Useful utilities and typing help debug instrumentation issues.

By default, the Node SDK uses the [HTTP API V2](../analytics/apis/http-v2-api/).

!!!deprecated "Legacy SDK"
    This is a legacy SDK and will only receive bug fixes until deprecation. A new [Analytics SDK for Node.js](../typescript-node/) available in Beta. The new SDK offers an improved code architecture which supports plugins. 
    
    The Beta SDK does not yet support the [Ampli Wrapper](/data/ampli/sdk/). If you use Ampli please continue to use the non-Beta SDK at this time.

!!!info "Node SDK Resources (Legacy)"
    - [Node.js SDK Repository :material-github:](https://github.com/amplitude/Amplitude-Node)
    - [Node.js SDK Releases :material-code-tags-check:](https://github.com/amplitude/Amplitude-Node/releases)

--8<-- "includes/ampli-vs-amplitude.md"
    Click here for more documentation on [Ampli for Node](./ampli.md).

## Installation

Run `npm install @amplitude/node` in your project directory, the same level with `package.json`.

## EU Data Residency

Sending data to Amplitude's EU servers, you need to configure the server URL during the initialization.

```ts
client = Amplitude.init(<AMPLITUDE_API_KEY>, {
    serverUrl: "https://api.eu.amplitude.com/2/httpapi"
});
```

## Usage

- Please see the code snippet below.

--8<-- "includes/sdk-httpv2-notice.md"

=== "TypeScript"

    ```ts
    import * as Amplitude from '@amplitude/node';

    const client = Amplitude.init(<AMPLITUDE_API_KEY>);

    client.logEvent({
      event_type: 'Node.js Event',
      user_id: 'datamonster@gmail.com',
      location_lat: 37.77,
      location_lng: -122.39,
      ip: '127.0.0.1',
      event_properties: {
        keyString: 'valueString',
        keyInt: 11,
        keyBool: true
      }
    });

    // Send any events that are currently queued for sending.
    // Will automatically happen on the next event loop.
    client.flush();
    ```

=== "JavaScript"

    ```js
    // ES5 Syntax
    const Amplitude = require('@amplitude/node');
    // ES6 Syntax
    import * as Amplitude from '@amplitude/node';

    var client = Amplitude.init(<AMPLITUDE_API_KEY>);
    client.logEvent({
      event_type: 'Node.js Event',
      user_id: 'datamonster@gmail.com',
      location_lat: 37.77,
      location_lng: -122.39,
      ip: '127.0.0.1',
      event_properties: {
        keyString: 'valueString',
        keyInt: 11,
        keyBool: true
      }
    });

    // Send any events that are currently queued for sending.
    // Will automatically happen on the next event loop.
    client.flush();
    ```

## Middleware

Middleware allows you to extend Amplitude by running a sequence of custom code on every event. This pattern is flexible and can be used to support event enrichment, transformation, filtering, routing to third-party destinations, and more.

Each middleware is a simple function with this signature:

```js
function (payload: MiddlwarePayload: next: MiddlewareNext): void;
```

The `payload` contains the `event` being sent as well as an optional `extra` that allows you to pass custom data to your own middleware implementations.

To invoke the next Middleware in the queue, use the `next` function. You must call `next(payload)` to continue the Middleware chain. If a Middleware doesn't call `next`, then the event processing stop executing after the current middleware completes.

Middleware is added to Amplitude via `client.addEventMiddleware()`. You can add as many middleware as you like. Each middleware runs in the order in which it was added.

```ts
const loggingMiddleware: Middleware = (payload, next) => {
  console.log(`[amplitude] event=${payload.event} extra=${payload.extra}`);
  // continue to next middleware in chain
  next(payload);
}

const filteringMiddleware: Middleware = (payload, next) => {
  const {eventType} =  payload.event;
  if (shouldSendEvent(eventType)) {
    next(payload)
  } else {
    // event will not continue to following middleware or be sent to Amplitude
    console.log(`Filtered event: ${eventType}`);
  }
}

client.addEventMiddleware(loggingMiddleware)
client.addEventMiddleware(filteringMiddleware)
```

You can find examples for [Typescript](https://github.com/amplitude/ampli-examples/tree/main/browser/typescript/v1/react-app/src/middleware) and [Javasscript](https://github.com/amplitude/ampli-examples/tree/main/browser/javascript/v1/react-app/src/middleware).

## More resources

If you have any problems or issues with the SDK, feel free to [create a GitHub issue](https://github.com/amplitude/Amplitude-Node/issues/new) or submit a request on [Amplitude Help](https://help.amplitude.com/hc/en-us/requests/new).
