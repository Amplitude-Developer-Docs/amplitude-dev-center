Plugins allow you to extend Amplitude SDK's behavior by, for example, modifying event properties (enrichment type) or sending to third-party APIs (destination type). A plugin is an object with methods `setup()` and `execute()`.

#### `add`

The `add` method adds a plugin to Amplitude. Plugins can help processing and sending events.

```ts
amplitude.add(new Plugin());
```

#### `remove`

The `remove` method removes the given plugin name from the client instance if it exists.

```ts
amplitude.remove(plugin.name);
```

#### Create your custom plugin

##### Plugin.setup

This method contains logic for preparing the plugin for use and has config as a parameter. The expected return value is undefined. A typical use for this method, is to copy configuration from config or instantiate plugin dependencies. This method is called when the plugin is registered to the client via `amplitude.add()`.

##### Plugin.execute

This method contains the logic for processing events and has event as parameter. If used as enrichment type plugin, the expected return value is the modified/enriched event. If used as a destination type plugin, the expected return value is a map with keys: `event` (BaseEvent), `code` (number), and `message` (string). This method is called for each event that's instrumented using the client interface, including Identify, GroupIdentify and Revenue events.

#### Plugin examples

##### Destination type plugin

Here's an example of a plugin that sends each event that's instrumented to a target server URL using your preferred HTTP client.

```ts
function myDestinationPlugin (serverUrl) {
  const name = 'my-destination-plugin';
  const type = amplitude.Types.PluginType.DESTINATION;
  let amplitudeConfig;
  
  /**
   * setup() is called on plugin installation
   * example: amplitude.add(new myDestinationPlugin());
   */
  const setup = function (config) {
    amplitudeConfig = config;
  }

  /**
   * execute() is called on each event instrumented
   * example: amplitude.track('New Event');
   */
  const execute = function (event) {
    const payload = {
      key: 'secret',
      data: event,
    };
    return fetch(this.serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
      body: JSON.stringify(payload),
    }).then(function(response) {
      return {
        code: response.status,
        event: event,
        message: response.statusText,
      };
    });
  }

  return {
    name,
    type,
    setup,
    execute,
  },
}

amplitude.init(API_KEY);
amplitude.add(myDestinationPlugin('https://custom.domain.com'));
```

##### Enrichment type plugin

Here's an example of a plugin that modifies each event that's instrumented by adding an increment integer to `event_id` property of an event starting from 100.

```ts
const addEventIdPlugin = () => {
  const name = 'add-event-id';
  const type = amplitude.Types.PluginType.ENRICHMENT;
  let currentId = 100;
  let amplitudeConfig;

  /**
   * setup() is called on plugin installation
   * example: amplitude.add(new AddEventIdPlugin());
   */
  const setup = function (config) {
    amplitudeConfig = config;
  }

  /**
   * execute() is called on each event instrumented
   * example: client.track('New Event');
   */
  const execute = function (event: Event) {
    event.event_id = currentId++;
    return event;
  }

  return {
    name,
    type,
    setup,
    execute,
  }
}

amplitude.init(API_KEY);
amplitude.add(addEventIdPlugin());
```
