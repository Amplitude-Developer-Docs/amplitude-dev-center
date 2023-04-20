---
title: Middleware
description: Use middleware to extend Amplitude by running a sequence of custom code on every event. This pattern is flexible and you can use it to support event enrichment, transformation, filtering, routing to third-party destinations, and more.
template: guide.html

---

!!!note
    Middleware is only supported in Ampli legacy. **[Plugins](../../sdk-plugins/)** replaced middleware in the latest Ampli version.

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

!!!note
    In Amplitude's Browser SDKs, add Middleware directly via `ampli` instead of `ampli.client`. To add Middleware in these
    SDKs you should use `ampli.addEventMiddlware()`.

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

## Middleware Payload Customization

Middleware access to event fields may vary by platform. To ensure comprehensive access, we recommend updating to the latest Ampli version and utilizing the [Plugins](../../sdk-plugins) feature.

For browser ampli, the following are the accessable keys under `payload`.

|<div class="med-column">Name</div>|Type|
| - | - |
| `event.event_type` | string |
| `event.event_properties` | { [key: string]: any } |
| `event.user_id` | string |
| `event.device_id` | string |
| `event.user_properties` | { [key: string]: any } |
| `extra` | { [x: string]: any } |

For other platforms, middleware can access and modify the entire Event JSON object, allowing for comprehensive adjustments as needed. Learn more at [here](../../../analytics/apis/http-v2-api/#keys-for-the-event-argument).

## Middleware examples

### Modify events

```js
ampli.client.addEventMiddleware((payload, next) => {
  const { event } = payload;
  if (hasPii(event.event_properties)) {
    obfuscate(payload.event.event_properties);
  }
  next(payload);
});
```

### Enrich events

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
  if (event.event_type !== 'Event to Skip') {
    next(payload);
  }
});
```

### Forward data to other services, but not Amplitude

```js
import amplitude from 'amplitude/sdk'
import ampli = './ampli';
import adroll from 'adroll';
import segment from 'segment';
import snowplow from 'snowplow';

ampli.client.addEventMiddleware((payload, next) => {
  const { event, extra } = payload;
  segment.track(event.event_type, event.event_properties, { extra.anonymousId })
  adroll.track();
  snowplow.track(event.event_type, event.event_properties, extra.snowplow.context);
  // next();
});
```

### Use client-side validation

```js
ampli.client.addEventMiddleware((payload, next) => {
  if (isDevelopment && !SchemaValidator.isValid(payload.event)) {
    throw Error(`Invalid event ${event.event_type}`);
  }
  next(payload);
});

ampli.client.addEventMiddleware((payload, next) => {
  const { event, extra } = payload;
  segment.track(event.event_type, event.event_properties, { extra.segment.anonymousId })
  next(payload);
});
```
