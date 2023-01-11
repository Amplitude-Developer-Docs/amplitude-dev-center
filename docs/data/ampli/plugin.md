---
title: Plugin
description: Use plugins to extend Amplitude by running a sequence of custom code on every event. This pattern is flexible and you can use it to support event enrichment, transformation, filtering, routing to third-party destinations, and more.
template: guide.html

---

!!!note
    Plugins are supported in the latest version of Ampli. If you are using an older version of Ampli, see **[Middleware](../middleware/)**.

Plugins allow you to extend the Amplitude behavior. For example use plugins to modify event properties (enrichment type) or send data to a third-party APIs (destination type). This is a replacement for Middleware in Ampli legacy.
This pattern is flexible and you can use it to support event enrichment, transformation, filtering, routing to third-party destinations, and more. A plugin is an object with methods `setup()` and `execute()`.

### Plugin.setup

This method contains logic for preparing the plugin for use and has config as a parameter. The expected return value is undefined. A typical use for this method, is to copy configuration from config or instantiate plugin dependencies. This method is called when the plugin is registered to the client via `ampli.client.add()`.

### Plugin.execute

This method contains the logic for processing events and has event as parameter. If used as enrichment type plugin, the expected return value is the modified/enriched event. If used as a destination type plugin, the expected return value is a map with keys: `event` (BaseEvent), `code` (number), and `message` (string). This method is called for each event, including Identify, GroupIdentify and Revenue) instrumented using the client interface.

Add plugin to Ampli via `ampli.client.add()`. You can add as many plugin as you like. Each plugin runs in the order based on the plugin type.

=== "Typescript"
    ```js
    ampli.client.add(yourPlugin())
    ```

=== "Javascript"
    ```js
    ampli.client.add(yourPlugin())
    ```

## Plugin examples

### Enrichment type plugin

=== "Javascript"

    ```js
    export class AddEventIdPlugin implements EnrichmentPlugin {
      name = 'add-event-id';
      type = PluginType.ENRICHMENT;
      currentId = 100;

      /**
       * setup() is called on plugin installation
       * example: client.add(new AddEventIdPlugin());
       */
      setup(config) {
       this.config = config;
      }

      /**
       * execute() is called on each event instrumented
       * example: client.track('New Event');
       */
      execute(event) {
        event.event_id = this.currentId++;;
        return event;
      }
    }
    ```

=== "Typescript"

    ```js
    import { BrowserConfig, EnrichmentPlugin, Event, PluginType } from '@amplitude/analytics-types';

    export class AddEventIdPlugin implements EnrichmentPlugin {
      name = 'add-event-id';
      type = PluginType.ENRICHMENT as const;
      currentId = 100;

      /**
       * setup() is called on plugin installation
       * example: client.add(new AddEventIdPlugin());
       */
      setup(config: BrowserConfig): Promise<undefined> {
        this.config = config;
      }

      /**
       * execute() is called on each event instrumented
       * example: client.track('New Event');
       */
      execute(event: Event): Promise<Event> {
        event.event_id = this.currentId++;;
        return event;
      }
    }
    ```
