---
title: Plugin
description: Use plugins to extend Amplitude by running a sequence of custom code on every event. This pattern is flexible and you can use it to support event enrichment, transformation, filtering, routing to third-party destinations, and more.
template: guide.html
---

!!!note
Plugins are supported in the latest version of Ampli when used in conjunction with the [new Amplitude browser SDKs](https://www.docs.developers.amplitude.com/data/sdks/typescript-browser/migration/). If you are using an older version of Ampli or a [Maintenance Amplitude SDK](https://www.docs.developers.amplitude.com/data/sdks/typescript-browser/migration/), see **[Middleware](../middleware/)**.

Plugins allow you to extend the Amplitude behavior. For example use plugins to modify event properties (enrichment type) or send data to a third-party APIs (destination type). This is a replacement for Middleware in Ampli legacy.
This pattern is flexible and you can use it to support event enrichment, transformation, filtering, routing to third-party destinations, and more. A plugin is an object with methods `setup()` and `execute()`.

## Plugin.setup

This method contains logic for preparing the plugin for use and has config as a parameter. The expected return value is undefined. A typical use for this method, is to copy configuration from config or instantiate plugin dependencies. This method is called when the plugin is registered to the client via `ampli.client.add()`.

## Plugin.execute

This method contains the logic for processing events and has event as parameter. If used as enrichment type plugin, the expected return value is the modified/enriched event. If used as a destination type plugin, the expected return value is a map with keys: `event` (BaseEvent), `code` (number), and `message` (string). This method is called for each event, including Identify, GroupIdentify and Revenue) instrumented using the client interface.

Add plugin to Ampli via `ampli.client.add()`. You can add as many plugin as you like. Each plugin runs in the order based on the plugin type.

=== "Typescript/Javascript"
    ```ts
    ampli.client.add(yourPlugin())
    ```

## Destination type plugin

Here's an example of a plugin that sends each event that's instrumented to a target server URL using your preferred HTTP client.

=== "Javascript"

    ```js
    export class MyDestinationPlugin {
      name = 'my-destination-plugin
      type = PluginType.DESTINATION

      constructor(serverUrl) {
        this.serverUrl = serverUrl
      }

      /**
       * setup() is called on plugin installation
       * example: client.add(new AddEventIdPlugin());
       */
      setup(config) {
        this.amplitudeConfig = config
      }

      /**
       * execute() is called on each event instrumented
       * example: client.track('New Event');
       */
      execute(event) {
        const payload = {
          key: 'secret',
          data: event
        }
        return fetch(this.serverUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: "*/*"
          },
          body: JSON.stringify(payload)
        }).then(function(response) {
          return {
            code: response.status,
            event: event,
            message: response.statusText
          }
        })
      }
    }
    ```

=== "Typescript"

    ```ts
    export class MyDestinationPlugin implements DestinationPlugin {
      name = 'my-destination-plugin';
      type = PluginType.DESTINATION as const;
      amplitudeConfig: Config;
      serverUrl: string;

      constructor(serverUrl: string) {
        this.serverUrl = serverUrl;
      }

     /**
       * setup() is called on plugin installation
       * example: client.add(new AddEventIdPlugin());
       */
      setup(config) {
        this.amplitudeConfig = config;
      }

      /**
       * execute() is called on each event instrumented
       * example: client.track('New Event');
       */
      execute(event) {
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
    }
    ```

## Enrichment type plugin

Here's an example of a plugin that modifies each event that's instrumented by adding an increment integer to `event_id` property of an event starting from 100.

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

    ```ts
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
