--8<-- "includes/sdk-httpv2-notice.md"

Events represent how users interact with your application. For example, "Button Clicked" may be an action you want to note.

```ts
// Track a basic event
amplitude.track('Button Clicked');

// Track events with optional properties
const eventProperties = {
  buttonColor: 'primary',
};
amplitude.track('Button Clicked', eventProperties);
```

You are also able to pass an event object in the `track` function. Check [here](https://amplitude.github.io/Amplitude-TypeScript/interfaces/_amplitude_analytics_browser.Types.BaseEvent.html) to chek what you can pass through the event object.

```ts
const event_propertie = {
  buttonColor: 'primary',
};

const event = {event_type: "Button Clicked", event_properties};
amplitude.track(event);
```