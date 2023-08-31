---
title: Google Tag Manager Event Streaming
description: Forward Amplitude events to Google Tag Manager using SDK Plugins
---

[Google Tag Manager](https://developers.google.com/tag-platform/tag-manager/) is a platform to manage all your website's tags without code.

## Setup

### Amplitude plugin setup

A variant of an [Amplitude Destination Plugin](../sdk-plugins.md#destination-type-plugin) is required to forward events to Google Tag Manager. Below is a template of a Destination Plugin tailored for Google Tag Manager. It creates an instance of the 
Google Tag Manager [browser snippet](https://developers.google.com/tag-platform/tag-manager/web) and forwards tracked events from Amplitude's SDK. This template is customizable for any needs.

=== "TypeScript"

    ```ts

    import { DestinationPlugin, Event, PluginType, Result } from '@amplitude/analytics-types';

    export class GTMPlugin implements DestinationPlugin {
      name = 'google-tag-manager';
      type = PluginType.DESTINATION as const;
      containerId: string;

      constructor(containerId: string) {
        this.containerId = containerId;
      }

      async setup(): Promise<void> {
        if (!window.dataLayer) {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
          const head = document.getElementsByTagName('head')[0],
            script = document.createElement('script'),
            dataLayer = 'datalayer' != 'dataLayer' ? '&l=' + 'datalayer' : '';
          script.async = true;
          script.src = 'https://www.googletagmanager.com/gtm.js?id=' + this.containerId + dataLayer;
          head.insertBefore(script, head.firstChild);
        }
      }

      async execute(event: Event): Promise<Result> {
        window.dataLayer.push(event);

        return {
          code: 200,
          event: event,
          message: 'Event pushed onto GTM Data Layer',
        };
      }
    }
    ```

### Amplitude plugin usage

Inside the app's code, the plugin may then be imported and added to the Amplitude SDK instance.

=== "TypeScript"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';
    import { GTMPlugin } from './GTMPlugin';

    amplitude.init(AMPLITUDE_API_KEY);
    amplitude.add(new GTMPlugin(GOOGLE_TAG_MANAGER_CONTAINER_ID));

    amplitude.logEvent('open app');
    ```