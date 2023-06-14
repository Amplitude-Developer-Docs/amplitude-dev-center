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

You can also pass a `BaseEvent` object to the `track` function. Refer to the [BaseEvent](https://amplitude.github.io/Amplitude-TypeScript/interfaces/_amplitude_analytics_browser.Types.BaseEvent.html) interface for all available fields.

```ts
const event_properties = {
  buttonColor: 'primary',
};

const event = {
  event_type: "Button Clicked", 
  event_properties,
  groups: { 'role': 'engineering' },
  group_properties: { 'groupPropertyKey': 'groupPropertyValue' }
};

amplitude.track(event);
```