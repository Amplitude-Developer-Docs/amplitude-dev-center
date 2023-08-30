Unlike standard network requests, sendBeacon sends events in the background, even if the user closes the browser or leaves the page.

--8<-- "includes/sdk-ts/sendBeacon-warning.md"

#### Set the transport to use sendBeacon for all events

To send an event using `sendBeacon`, set the transport SDK option to 'beacon' in one of two ways

```ts
amplitude.init(API_KEY, 'user@amplitude.com', 
  {
    transport: TransportType.SendBeacon,
    // To make sure the event will be scheduled right away.
    flushIntervalMillis: 0,
    flushQueueSize: 1,
  }
);
```

#### Set the transport to use beacon only when exiting page

Amplitude recommends adding your own event listener for pagehide event.

```ts
window.addEventListener('pagehide',
  () => {
    amplitude.setTransport('beacon') 
    // Sets https transport to use `sendBeacon` API
    amplitude.flush()
  },
);
```
