---
title: Hotjar Event Streaming
description: Forward Amplitude events to Hotjar using SDK Plugins
---

[Hotjar](https://www.hotjar.com/) is a product experience insights tool that provides behavioral analytics and feedback data with users.

## Setup

### Hotjar plugin setup

A variant of an [Amplitude Destination Plugin](../sdk-plugins.md#destination-type-plugin) is required to forward events to Hotjar. Below is a template of a Destination Plugin tailored for Hotjar. It creates an instance of the 
Hotjar [browser tracking code](https://help.hotjar.com/hc/en-us/articles/115011639927-What-is-the-Hotjar-Tracking-Code-) and forwards tracked events from Amplitude's SDK. This template is customizable for any needs.

=== "TypeScript"

    ```ts
    import { BrowserConfig, DestinationPlugin, Event, PluginType, Result } from '@amplitude/analytics-types';
    import { default as hj } from '@hotjar/browser';
    export class HotjarPlugin implements DestinationPlugin {
      name = 'hotjar';
      type = PluginType.DESTINATION as const;
      siteId: number;
      hotjarVersion: number;

      constructor(siteId: number, hotjarVersion: number) {
        this.siteId = siteId;
        this.hotjarVersion = hotjarVersion;
      }

      async setup(): Promise<void> {
        hj.init(this.siteId, this.hotjarVersion);
      }

      async execute(event: Event): Promise<Result> {
        if (event.event_type === '$identify') {
          const { user_id, device_id, user_properties } = event;
          const hotjarId = user_id || device_id || '';
          hj.identify(hotjarId, user_properties || {});
        } else {
          hj.event(event.event_type);
        }
        return {
          code: 0,
          event: event,
          message: 'Event forwarded to Hotjar API',
        };
      }
    }
    ```

### Amplitude plugin usage

Inside the app's code, the plugin may then be imported and added to the Amplitude SDK instance.

=== "TypeScript"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';
    import { HotjarPlugin } from './HotjarPlugin';

    amplitude.init(AMPLITUDE_API_KEY);
    amplitude.add(new HotjarPlugin(HOTJAR_SIDE_ID, HOTJAR_VERSION));

    amplitude.logEvent('open app');
    ```