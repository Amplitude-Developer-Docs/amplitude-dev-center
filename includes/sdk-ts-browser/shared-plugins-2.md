Plugins allow you to extend Amplitude SDK's behavior by, for example, modifying event properties (enrichment plugin) or sending to third-party endpoints (destination plugin). A plugin is an `Object` with optional fields `name` and `type` and methods `setup()`, `execute()` and `teardown()`.

#### `add`

The `add` method adds a plugin to Amplitude.

```ts
amplitude.add(new Plugin());
```

#### `remove`

The `remove` method removes the given plugin name from the client instance if it exists.

```ts
amplitude.remove(plugin.name);
```

#### Create your custom plugin

--8<-- "includes/sdk-ts-browser/shared-plugin-2-properties.md"

#### Plugin examples

##### Enrichment plugin

Here's an example of an enrichment plugin that includes an additional event property `page_url` to all events.

```ts
const enrichPageUrlPlugin = (): EnrichmentPlugin => {
  return {
    execute: async (event: Event) => {
      event.event_properties = {
        ...event.event_properties,
        page_url: location.href,
      };
      return event;
    },
  }
}

amplitude.init(API_KEY);
amplitude.add(enrichPageUrlPlugin());
```


##### Destination plugin

Here's an example of a destination plugin that sends each tracked event to a custom server URL using Fetch API.

```ts
const customDestination = (customUrl: string): DestinationPlugin => {
  return {
    type: 'destination',
    execute: async (event: Event) => {
      const payload = {
        k: 'apikey',
        d: event,
      };

      const response = await fetch(customUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
        },
        body: JSON.stringify(payload),
      });

      return {
        code: response.status,
        event: event,
        message: response.statusText,
      };
    },
  };
};


amplitude.init(API_KEY);
amplitude.add(myDestinationPlugin('https://custom.url.com'));
```
