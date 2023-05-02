---
title: Middleware
description: Use middleware to extend Amplitude by running a sequence of custom code on every event. This pattern is flexible and you can use it to support event enrichment, transformation, filtering, routing to third-party destinations, and more.
---

Middleware lets you extend Amplitude by running a sequence of custom code on every event. This pattern is flexible and you can use it to support event enrichment, transformation, filtering, routing to third-party destinations, and more.

!!!note
    Middleware is only supported in [Maintenance Amplitude SDK](../sdks/javascript/) except the maintenance Browser SDK and legacy Ampli. Middleware has been replaced by **[Plugins](../sdk-plugins/)** in the latest SDK and Ampli versions.

## Middleware Structure
 
### Function Signature 

Each middleware is a simple function with this signature:

```js
/**
 * A function to run on the Event stream (each logEvent call)
 *
 * @param payload The `payload` contains the `event` to send and an optional `extra` that lets you pass custom data to your own middleware implementations.
 * @param next Function to run the next middleware in the chain, not calling next will end the middleware chain
 */

function (payload: MiddlewarePayload: next: MiddlewareNext): void;
```

???types "Types in  Middleware"
    |<div class="med-column">Name</div>| Type | Description |
    | - | - | - |
    | `MiddlewarePayload.event` | Event | The event data being sent. The event may vary by platform. |
    | `MiddlewarePayload.extra` | { [x: string]: any } | Unstructured object to let users pass extra data to middleware. |
    | `MiddlewareNext` | (payload: MiddlewarePayload) => void | Function called at the end of each Middleware to run the next middleware in the chain. |

To invoke the next middleware in the queue, use the `next` function. You must call `next(payload)` to continue the middleware chain. If a middleware doesn't call `next`, then the event processing stops executing after the current middleware completes.

### Payload Customization

Middleware access to event fields may vary by platform. To ensure comprehensive access, we recommend updating to the latest Ampli version and utilizing the [Plugins](../sdk-plugins) feature.

For browser ampli, the following are the accessable keys under `payload`.

|<div class="med-column">Name</div>|Type|Description|
| - | - | - |
| `event.event_type` | string | The event name. |
| `event.event_properties` | { [key: string]: any } | The event properties. |
| `event.user_id` | string | The event level user ID. |
| `event.device_id` | string | The event level device ID. |
| `event.user_properties` | { [key: string]: any } | The event level user properties. |
| `extra` | { [x: string]: any } | The extra information you want to send that lets you pass custom data to your own middleware implementations. |

For other platforms, middleware can access and modify the entire Event JSON object, allowing for comprehensive adjustments as needed. Learn more at [here](../../../analytics/apis/http-v2-api/#keys-for-the-event-argument).

### Usage

Add middleware to Amplitude via `amplitude.addEventMiddleware()`. You can add as many middleware as you like. Each middleware runs in the order in which it's added.

```js
amplitude.addEventMiddleware(yourMiddleware());
```

## Middleware examples

Use an Middleware to modify event properties, transformation, filtering, routing to third-party destinations, and more:
!!!example "Modify event properties, transformation, filtering examples"

    ???code-example "Filtering middleware example (click to expand)"

        ```ts
         amplitude.addEventMiddleware((payload, next) => {
          const {eventType} =  payload.event;
          if (shouldSendEvent(eventType)) {
            next(payload)
          } else {
            // event will not continue to following middleware or be sent to Amplitude
            console.log(`Filtered event: ${eventType}`);
          }
        });
        ```
        
    ???code-example "Remove PII (Personally Identifiable Information) (click to expand)"

        ```js
        amplitude.addEventMiddleware((payload, next) => {
          const { event } = payload;
          if (hasPii(event.event_properties)) {
            payload.event.event_properties = obfuscate(payload.event.event_properties);
          }
          next(payload);
        });
        ```
    
    ???code-example "Enrich Event Properties (click to expand)"

        ```js
        amplitude.addEventMiddleware((payload, next) => {
          const { event } = payload;
          if (needsDeviceId(event)) {
            payload.event.deviceId = getDeviceId();
          }
          next(payload)
        });
        ```

    ???code-example "Send event level groups (click to expand)"

        This is an example of how to send event level groups in Ampli V1
        How to send event level groups in SDKs(not in Ampli) is different. Please check the specific SDKs for the usage.
        
        ```js
        ampli.addEventMiddleware((payload, next) => {
          const {event, extra} =  payload;
          if (event && extra && event.extra.groups) {
            event.groups =  event.extra.groups;
          }

          next(payload);
        });

        // Pass the event level groups info though middleware extra when calling the tracking plan.
        const extra = {groups: {"test_group_name": "test_group_value"}};
        ampli.eventWithGroups({requiredNumber: 1.23, requiredBoolean: false}, extra);
        ```

!!!example "Routing to third-party destinations example"

    ???code-example "Forward data to other services, but not Amplitude (click to expand)"

        ```js
        import amplitude from 'amplitude/sdk'
        import adroll from 'adroll';
        import segment from 'segment';
        import snowplow from 'snowplow';
        
        amplitude.addEventMiddleware((payload, next) => {
          const { event, extra } = payload;
          segment.track(event.event_type, event.event_properties, { extra.anonymousId })
          adroll.track();
          snowplow.track(event.event_type, event.event_properties, extra.snowplow.context);
          // next();
        });
        ```

!!!example "client side validation example"

    ???code-example "Use client-side validation (click to expand)"

        ```js
        amplitude.addEventMiddleware((payload, next) => {
          if (isDevelopment && !SchemaValidator.isValid(payload.event)) {
            throw Error(`Invalid event ${event.event_type}`);
          }
          next(payload);
        });
        ```

## Supported SDKs

|Platform|SDK|Github|
|--------|--------|--------|
|[Android](../sdks/android/#middleware)|:octicons-package-16: [`com.amplitude:android-sdk`](https://mvnrepository.com/artifact/com.amplitude/android-sdk) | [:material-github: Amplitude-Android](https://github.com/amplitude/Amplitude-Android) |
|[Node.js](../sdks/node/#middleware)|:octicons-package-16: [`@amplitude/node`](https://www.npmjs.com/package/@amplitude/node) | [:material-github: Amplitude-Node](https://github.com/amplitude/Amplitude-Node)|
|[React Native](../sdks/react-native)|:octicons-package-16: [`@amplitude/react-native`](https://www.npmjs.com/package/@amplitude/react-native) | [:material-github: Amplitude-ReactNative](https://github.com/amplitude/Amplitude-ReactNative) |
|[iOS](../sdks/ios/#middleware)|:octicons-package-16: [`Amplitude`](https://cocoapods.org/pods/Amplitude-iOS) | [:material-github: Amplitude-iOS](https://github.com/amplitude/Amplitude-iOS)|
|[Java](../sdks/java/#middleware)|:octicons-package-16: [`com.amplitude.:java-sdk`](https://mvnrepository.com/artifact/com.amplitude/java-sdk) | [:material-github: Amplitude-Java](https://github.com/amplitude/Amplitude-Java)|