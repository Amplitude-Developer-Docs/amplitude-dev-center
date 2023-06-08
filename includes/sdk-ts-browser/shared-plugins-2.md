Plugins allow you to extend Amplitude SDK's behavior by, for example, modifying event properties (enrichment plugin) or sending to a third-party endpoints (destination plugin). A plugin is an `Object` with optional fields `name` and `type` and methods `setup()` and `execute()`.

#### `add`

The `add` method adds a plugin to Amplitude..

```ts
amplitude.add(new Plugin());
```

#### `remove`

The `remove` method removes the given plugin name from the client instance if it exists.

```ts
amplitude.remove(plugin.name);
```

#### Create your custom plugin

##### plugin.name

The name field is an optional property that allows you to reference the plugin for deletion purposes. If not provided, Amplitude will assign a random name when the plugin is added. If you do not plan to delete your plugin, you can skip assigning a name.

##### plugin.type

The type field is an optional property that defines the type of plugin you are creating. Refer to `execute()` function below to distinguish the two types. If not defined, the plugin defaults to an enrichment type.

##### plugin.setup()

The setup function is an optional method and is called when the plugin is added or on first init whichever happens later. This function accepts two parameters: 1) Amplitude configuration; and 2) Amplitude instance. This is useful for setup operations and tasks that depends on either the Ampltidue configuration or instance. Examples include, assigining baseline values to variables, setting up event listeners, and many more.

##### plugin.execute()

For encrichment plugins, execute function is an optional method and is called on each event. This function must return a new event, otherwise the passed event is dropped from the queue. This is useful to for cases where you need to add/remove properties from events, filter events, or perform any operation for each event tracked.

For destination plugins, execute function is a required method and is called on each event. This function must return a response object with keys: `event` (BaseEvent), `code` (number), and `message` (string).. This is useful to for sending events for third-party endpoints.

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
amplitude.add(addEventIdPlugin());
```


##### Destination plugin

Here's an example of a destination plugin that sends each tracked event to a custom server URL using you Fetch API.

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
