---
title: Middleware
description: Use middleware to extend Amplitude by running a sequence of custom code on every event. This pattern is flexible and you can use it to support event enrichment, transformation, filtering, routing to third-party destinations, and more.

---

!!!note
    Middleware is only supported in Ampli legacy. If you are on the latest Ampli this functionality has been replaced by **[Plugins](#data/ampli/plugin/)**.

Middleware lets you extend Amplitude by running a sequence of custom code on every event.
 This pattern is flexible and you can use it to support event enrichment, transformation, filtering, routing to third-party destinations, and more.

Each middleware is a simple function with this signature:

```js
function (payload: MiddlewarePayload: next: MiddlewareNext): void;
```

The `payload` contains the `event` to send and an optional `extra` that lets you pass custom data to your own middleware implementations.

To invoke the next middleware in the queue, use the `next` function.
 You must call `next(payload)` to continue the middleware chain. If a middleware doesn't call `next`, then the event processing stops executing after the current middleware completes.

Add middleware to Ampli via `ampli.client.addEventMiddleware()`. You can add as many middleware as you like. Each middleware runs in the order in which it's added.

```js
const loggingMiddleware: Middleware = (payload, next) => {
  console.log(`[ampli] event=${payload.event} extra=${payload.extra}`);
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

ampli.client.addEventMiddleware(loggingMiddleware)
ampli.client.addEventMiddleware(filteringMiddleware)
```

## Middleware examples

### Modifying events

```js
ampli.client.addEventMiddleware((payload, next) => {
  const { event } = payload;
  if (hasPii(event.properties)) {
    obfuscate(payload.event.properties);
  }
  next(payload);
});
```

### Enriching events

```js
ampli.client.addEventMiddleware((payload, next) => {
  const { event } = payload;
  if (needsDeviceId(event)) {
    payload.event.deviceId = getDeviceId();
  }
  next(payload)
});
```

### Basic filtering

```js
ampli.client.addEventMiddleware((payload, next) => {
  const { event } = payload;
  if (event.name !== 'Event to Skip') {
    next(payload);
  }
});
```

### Forwarding data to other services, but not Amplitude

```js
import amplitude from 'amplitude/sdk'
import ampli = './ampli';
import adroll from 'adroll';
import segment from 'segment';
import snowplow from 'snowplow';

ampli.client.addEventMiddleware((payload, next) => {
  const { event, extra } = payload;
  segment.track(event.name, event.properties, { extra.anonymousId })
  adroll.track();
  snowplow.track(event.name, event.properties, extra.snowplow.context);
  // next();
});
```

### Using client-side validation

```js
ampli.client.addEventMiddleware((payload, next) => {
  if (isDevelopment && !SchemaValidator.isValid(payload.event)) {
    throw Error(`Invalid event ${event.name}`);
  }
  next(payload);
});

ampli.client.addEventMiddleware((payload, next) => {
  const { event, extra } = payload;
  segment.track(event.name, event.properties, { extra.segment.anonymousId })
  next(payload);
});
```