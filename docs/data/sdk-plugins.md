---
title: Analytics SDK Plugins
description: Use plugins to extend Amplitude by running a sequence of custom code on every event. This pattern is flexible and you can use it to support event enrichment, transformation, filtering, routing to third-party destinations, and more.
---

!!!note
    Plugins are supported in the latest version of Ampli and the latest SDKs. If you are using an older version of Ampli or a [Maintenance Amplitude SDK](https://www.docs.developers.amplitude.com/data/sdks/javascript/), see **[Middleware](../../data/ampli/middleware/)**.

Plugins allow you to extend the Amplitude behavior. This pattern is flexible and you can use it to support event enrichment, transformation, filtering, routing to third-party destinations, and more. 

## Plugin methods

A plugin is an object with methods `setup()` and `execute()`:

### Plugin.setup

This method contains logic for preparing the plugin for use and has config as a parameter. The expected return value is undefined. A typical use for this method, is to copy configuration from config or instantiate plugin dependencies. This method is called when the plugin is registered to the client via `amplitude.add()`.

### Plugin.execute

This method contains the logic for processing events and has event as parameter. If used as enrichment type plugin, the expected return value is the modified/enriched event. If used as a destination type plugin, the expected return value is a map with keys: `event` (BaseEvent), `code` (number), and `message` (string). This method is called for each event, including Identify, GroupIdentify and Revenue instrumented using the client interface.

Add plugin to Ampli via `amplitude.add()`. You can add as many plugin as you like. Each plugin runs in the order based on the plugin type.

=== "Javascript"
    ```js
    amplitude.add(yourPlugin())
    ```

=== "Typescript"
    ```js
    amplitude.add(yourPlugin())
    ```

!!!note
    if `execute()` doesn't returns an event, the event will **NOT** propagate through the remaining plugins

## Plugin types

### Enrichment type plugin

Enrichment Plugin is for modifying properties in Event object or drop an Event. Here are the [availabe keys for Event Object](../../analytics/apis/http-v2-api/#keys-for-the-event-argument) which you can enrich in the Enrichment Plugin. Please check [here](./#enrichment-type-plugin_1) for more examples.

### Destination type plugin

Destination Plugin is for sending events to a third-party API. Please check [here](./#destination-type-plugin_1) for more examples.

Enrichment Plugins are executed before Destination Plugins. All Enrichment Plugins are executed in the same order in which they were added, and then all Destination Plugins are executed in the order they were added. This ensures that all data is enriched before being sent to its final destination. 

## Plugin examples

### Enrichment type plugin

Use an Enrichment Plugin to modify event properties:
!!!example "Enrichment plugin examples"

    ???code-example "Drop-event plugin example(click to expand)"

        === "JavaScript"
            ```js
            import * as amplitude from '@amplitude/analytics-browser';
    
            import {PluginType} from '@amplitude/analytics-types';
    
            class FilterEventsPlugin {
              name = 'filter-events-plugin';
              type = PluginType.ENRICHMENT;
    
              async setup(config) {
                return undefined;
              }
    
              async execute(event) {
                // ignore events with a certain property
                if (event.event_properties['ignore'] === true){
                // returning null will prevent this event from being processed by subsequent plugins
                return null;
              }
    
              // Allow other events to be processed and sent to destination plugins
              return event;
              }
            }
    
            amplitude.init('API_KEY');
            amplitude.add(new FilterEventsPlugin());
            ```

        === "TypeScript"
            ```ts
            import * as amplitude from '@amplitude/analytics-browser';

            import { EnrichmentPlugin, BrowserConfig, PluginType, Event } from '@amplitude/analytics-types';

            class FilterEventsPlugin implements EnrichmentPlugin {
              name = 'filter-events-plugin';
              type = PluginType.ENRICHMENT as any;

              async setup(config: BrowserConfig): Promise<void> {
                return undefined;
              }

              async execute(event: Event): Promise<Event | null> {
                // ignore events with a certain property
                if (event.event_properties['ignore'] === true){
                // returning null will prevent this event from being processed by subsequent plugins
                return null;
              }

              // Allow other events to be processed and sent to destination plugins
              return event;
              }
            }

            amplitude.init('API_KEY');
            amplitude.add(new FilterEventsPlugin());
            ```

    ???code-example "Remove PII (Personally Identifiable Information) (click to expand)"

        === "JavaScript"
            ```js
            import * as amplitude from '@amplitude/analytics-browser';
            import {PluginType} from '@amplitude/analytics-types';
    
            class FilterEventsPlugin {
              name = 'remove-PII-plugin';
              type = PluginType.ENRICHMENT;
    
              async setup(config) {
                return undefined;
              }
    
              async execute(event) {
                  // remove PII on the event
                  if(event.user_properties['phone']) {
                    delete event.user_properties['phone'];
                    
                    // set a new prop to mark this event as modified
                    event.event_properties['pii-removed'] = true;
                  }
      
                  // return modified event with PII removed
                  return event
              }
            }
    
            amplitude.init('API_KEY');
            amplitude.add(new FilterEventsPlugin());
            ```

        === "TypeScript"

            ```ts
            import * as amplitude from '@amplitude/analytics-browser';
    
            import { EnrichmentPlugin, BrowserConfig, PluginType, Event } from '@amplitude/analytics-types';
    
            class FilterEventsPlugin implements EnrichmentPlugin {
              name = 'remove-PII-plugin';
              type = PluginType.ENRICHMENT as any;
    
              async setup(config: BrowserConfig): Promise<void> {
                return undefined;
              }
    
              async execute(event: Event): Promise<Event> {
                  // remove PII on the event
                  if(event.user_properties['phone']) {
                    delete event.user_properties['phone'];

                    // set a new prop to mark this event as modified
                    event.event_properties['pii-removed'] = true;
                  }

                  // return modified event with PII removed
                  return event
              }
            }
    
            amplitude.init('API_KEY');
            amplitude.add(new FilterEventsPlugin());
            ```
  
### Destination type plugin

Use a Destination Plugin to send events to a third-party APIs
!!!example "Destination plugin examples"

    ???code-example "Send to Segment (click to expand)"
        Follow Segment's guide to install [Segment Analytics.js 2.0 Web SDK](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/quickstart/) first.
    
        === "JavaScript"

            ```js
            import { AnalyticsBrowser } from '@segment/analytics-next';
            import { Types } from '@amplitude/analytics-browser';
            
            export default class SegmentPlugin {
              name = 'segment';
              type = Types.PluginType.DESTINATION;
            
              constructor(private readonly writeKey) {
                // Create Segment tracker
                this.segment = new AnalyticsBrowser();
              }
            
              async setup(config) {
                this.segment.load({
                  writeKey: this.writeKey,
                });
                return;
              }
            
              execute(context) {
                return new Promise(resolve => {
                  const {
                    event_type,
                    event_properties,
                    user_id,
                    user_properties,
                    groups,
                    group_properties,
                  } = context;
                  const callback = (ctx) => {
                    resolve({ event: context, code: 200, message: '' });
                  };
            
                  switch (event_type) {
                    case Types.SpecialEventType.IDENTIFY:
                    case Types.SpecialEventType.GROUP_IDENTIFY:
                      const groupValues = groups ? Object.values(groups) : [];
                      if (groupValues.length === 0) {
                        this.segment.identify(
                          user_id,
                          user_properties?.[Types.IdentifyOperation.SET],
                          {},
                          callback,
                        );
                      } else {
                        this.segment.group(
                          groupValues[0],
                          group_properties?.[Types.IdentifyOperation.SET],
                          {},
                          callback,
                        );
                      }
                      break;
            
                    case 'page':
                      // @ts-ignore
                      const { name, category, ...properties } = event_properties;
                      this.segment.page(category, name, properties, {}, callback);
                      break;
            
                    default:
                      this.segment.track(event_type, event_properties, {}, callback);
                      break;
                  }
                });
              }
            }
            ```

        === "TypeScript"
            ```ts
            import { AnalyticsBrowser } from '@segment/analytics-next';
            import { Types } from '@amplitude/analytics-browser';
            
            export default class SegmentPlugin implements Types.DestinationPlugin {
              name = 'segment';
              type = Types.PluginType.DESTINATION as any;
              segment: AnalyticsBrowser;
            
              constructor(private readonly writeKey: string) {
                // Create Segment tracker
                this.segment = new AnalyticsBrowser();
              }
            
              async setup(config: Types.Config): Promise<undefined> {
                this.segment.load({
                  writeKey: this.writeKey,
                });
                return;
              }
            
              execute(context: Types.Event): Promise<Types.Result> {
                return new Promise<Types.Result>(resolve => {
                  const {
                    event_type,
                    event_properties,
                    user_id,
                    user_properties,
                    groups,
                    group_properties,
                  } = context;
                  const callback = (ctx: any) => {
                    resolve({ event: context, code: 200, message: '' });
                  };
            
                  switch (event_type) {
                    case Types.SpecialEventType.IDENTIFY:
                    case Types.SpecialEventType.GROUP_IDENTIFY:
                      const groupValues = groups ? Object.values(groups) : [];
                      if (groupValues.length === 0) {
                        this.segment.identify(
                          user_id,
                          user_properties?.[Types.IdentifyOperation.SET],
                          {},
                          callback,
                        );
                      } else {
                        this.segment.group(
                          groupValues[0],
                          group_properties?.[Types.IdentifyOperation.SET],
                          {},
                          callback,
                        );
                      }
                      break;
            
                    case 'page':
                      // @ts-ignore
                      const { name, category, ...properties } = event_properties;
                      this.segment.page(category, name, properties, {}, callback);
                      break;
            
                    default:
                      this.segment.track(event_type, event_properties, {}, callback);
                      break;
                  }
                });
              }
            }
            ```

    ???code-example "Send to Hotjar using their [tracking code](https://help.hotjar.com/hc/en-us/articles/115011639927-What-is-the-Hotjar-Tracking-Code-) (click to expand)"

        === "JavaScript"
        
            ```js
            import { PluginType } from "@amplitude/analytics-types"
            import { default as hj } from "@hotjar/browser"
            export class HotjarPlugin {
              name = "hotjar"
              type = PluginType.DESTINATION
              constructor(siteId, hotjarVersion, debug = false) {
                this.siteId = siteId
                this.hotjarVersion = hotjarVersion
              }
              async setup() {
                hj.init(this.siteId, this.hotjarVersion)
              }
              async execute(event) {
                if (event.event_type === "$identify") {
                  const { user_id, device_id, user_properties } = event
                  const hotjarId = user_id || device_id || ""
                  hj.identify(hotjarId, user_properties || {})
                } else {
                  hj.event(event.event_type)
                }
                return {
                  code: 0,
                  event: event,
                  message: "Event forwarded to Hotjar SDK"
                }
              }
            }
            ```
        
        === "TypeScript"
        
            ```ts
            import { BrowserConfig, DestinationPlugin, Event, PluginType, Result } from '@amplitude/analytics-types';
            import { default as hj } from '@hotjar/browser';
            export class HotjarPlugin implements DestinationPlugin {
              name = 'hotjar';
              type = PluginType.DESTINATION as const;
              siteId: number;
              hotjarVersion: number;

              constructor(siteId: number, hotjarVersion: number, debug: boolean = false) {
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