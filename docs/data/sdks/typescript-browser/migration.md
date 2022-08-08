---
title: Browser SDK Migration Guide
description: Use this guide to easily migrate from Amplitude's legacy browser SDK (amplitude-js) to the new SDK (@amplitude/analytics-browser).
---

Amplitude has released a new version of Browser SDK (`@amplitude/analytics-browser`), which features a plugin architecture, built-in type definition and broader support for front-end frameworks. The new version is not backwards compatible with `amplitude-js`. 

To migrate to `@amplitude/analytics-browser`, the dependency and instrumentation must be updated.

### Terminology

* `amplitude-js`: Legacy Browser SDK
* `@amplitude/analytics-browser`: New Browser SDK

## Dependency

For snippet installation, update your project's [snippet loader](https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/analytics-browser#using-script-loader).

For Node projects, update your dependency list in package.json.

=== "amplitude-js"
  ```json
  {
    "dependencies": {
      "amplitude-js": "8"
    }
  }
  ```

=== "amplitude-js"
  ```json
  {
    "dependencies": {
      "@amplitude/analytics-browser": "1"
    }
  }
  ```

## Instrumentation

The new Browser SDK offers a new API to instrument events. To move forward with the migration, the following API calls must be changed.

### Initialization

Similar to all other calls, `getInstance()` has been removed. To initialize the SDK, call `init()`, with the same parameters. However, `config` comes in a different shape. See [Configuration](#configuration).

=== "amplitude-js"
  ```javascript
  import amplitude from "amplitude-js"

  amplitude.getInstance().init(API_KEY, OPTIONAL_USER_ID, config)
  ```

=== "@amplitude/analytics-browser"
  ```typescript
  import * as amplitude from "amplitude-js"

  amplitude.init(API_KEY, OPTIONAL_USER_ID, config)
  ```

### Configuration

The new Browser SDK configuration comes in a different shape. These were updated to have more consistency across other runtimes. In addition, some configurations are no unsupported for various reasons like, simplification, adopted as default hehavior, etc.

|amplitude-js|@amplitude/analytics-browser|
|-|-|
|`config.apiEndpoint`|`config.serverUrl`|
|`config.batchEvents`|`config.flushQueueSize`|
|`config.cookieExpiration`|`config.cookieExpiration`|
|`config.cookieName`|NOT SUPPORTED|
|`config.sameSiteCookie`|`config.cookieSameSite`|
|`config.cookieForceUpgrade`|NOT SUPPORTED|
|`config.deferInitialization`|NOT SUPPORTED. See [Defer initialization](#defer-initialization).|
|`config.disableCookies`|`config.disableCookies`|
|`config.deviceId`|`config.deviceId`|
|`config.deviceIdFromUrlParam`|NOT SUPPORTED|
|`config.domain`|NOT SUPPORTED|
|`config.eventUploadPeriodMillis`|`config.flushIntervalMillis`|
|`config.eventUploadThreshold`|`config.flushQueueSize`|
|`config.forceHttps`|NOT SUPPORTED|
|`config.includeFbclid`|NOT SUPPORTED. See [Web attribution](#web-attribution).|
|`config.includeGclid`|NOT SUPPORTED. See [Web attribution](#web-attribution).|
|`config.includeReferrer`|NOT SUPPORTED. See [Web attribution](#web-attribution).|
|`config.includeUtm`|NOT SUPPORTED. See [Web attribution](#web-attribution).|
|`config.language`|NOT SUPPORTED. See [Plugins](#plugins).|
|`config.library`|NOT SUPPORTED. See [Plugins](#plugins).|
|`config.logLevel`|`config.logLevel`|
|`config.logAttributionCapturedEvent`|NOT SUPPORTED|
|`config.optOut`|`config.optOut`|
|`config.onError`|NOT SUPPORTED|
|`config.onExitPage`|NOT SUPPORTED. See [Flush](#flush-or-onexitpage).|
|`config.plan`|`config.plan`|
|`config.plan.branch`|`config.plan.branch`|
|`config.plan.source`|`config.plan.source`|
|`config.plan.version`|`config.plan.version`|
|`config.plan.versionId`|`config.plan.versionId`|
|`config.platform`|NOT SUPPORTED. See [Plugins](#plugins).|
|`config.savedMaxCount`|NOT SUPPORTED|
|`config.saveEvents`|NOT SUPPORTED|
|`config.saveParamsReferrerOncePerSession`|`config.attribution.trackNewCampaigns`|
|`config.secureCookie`|`config.cookieSecure`|
|`config.sessionTimeout`|`config.sessionTimeout`|
|`config.storage`|`config.storageProvider`|
|`config.trackingOptions`|`config.trackingOptions`|
|`config.transport`|`config.transportProvider`|
|`config.unsetParamsReferrerOnNewSession`|NOT SUPPORTED. Default behavior.|
|`config.unsentKey`|NOT SUPPORTED|
|`config.unsentIdentifyKey`|NOT SUPPORTED|
|`config.uploadBatchSize`|`config.flushQueueSize`|
|`config.headers`|NOT SUPPORTED|
|`config.serverZone`|`config.serverZone`|
|`config.useDynamicConfig`|NOT SUPPORTED|
|`config.serverZoneBasedApi`|NOT SUPPORTED|
|`config.sessionId`|`config.sessionId`|
|`config.partnerId`|`config.partnerId`|

### Tracking events

The APIs to track events the most commonly used. `@amplitude/analytics-browser` offered a variety of `logEvent` APIs like `logEventWithTimestamp`, `logEventWithGroups` to override specific properties in the event payload. Amplitude has simplified all of these variations into a unified `track` API in `@amplitude/analytics-browser`.

#### `logEvent()`

The `logEvent()` API maps to `track()`.

=== "amplitude-js"
  ```javascript
  const eventType = "Button Clicked"
  const eventProperties = {
    type: "primary",
  }
  amplitude.getInstance().logEvent(
    eventType,
    eventProperties,
  )
  ```

=== "@amplitude/analytics-browser"
  ```typescript
  const eventType = "Button Clicked"
  const eventProperties = {
    type: "primary",
  }
  amplitude.track(
    eventType,
    eventProperties,
  ).promise
  ```

#### `logEventWithTimestamp()`

The `logEventWithTimestamp()` API maps to `track()`.

=== "amplitude-js"
  ```javascript
  const eventType = "Button Clicked"
  const eventProperties = {
    type: "primary",
  }
  const timestamp = Date.now()
  amplitude.getInstance().logEventWithTimestamp(
    eventType,
    eventProperties,
    timestamp,
  )
  ```

=== "@amplitude/analytics-browser"
  ```typescript
  const eventType = "Button Clicked"
  const eventProperties = {
    type: "primary",
  }
  const eventOptions = {
    time = Date.now()
  }
  amplitude.track(
    eventType,
    eventProperties,
    eventOptions
  )
  ```

#### `logEventWithGroups()`

The `logEventWithGroups()` API maps to `track()`.

=== "amplitude-js"
  ```javascript
  const eventType = "Button Clicked"
  const eventProperties = {
    type: "primary",
  }
  const groups = {
    orgId: "paid",
  }
  amplitude.getInstance().logEventWithGroups(
    eventType,
    eventProperties,
    groups,
  )
  ```

=== "@amplitude/analytics-browser"
  ```typescript
  const event_type = "Button Clicked"
  const event_properties = {
    type: "primary",
  }
  const groups = {
    orgId: "paid",
  }
  const event = {
    event_type,
    event_properties,
    groups
  }
  amplitude.track(event)
  ```

#### `sendEvents()`

The `sendEvents()` API maps to `flush()`.

=== "amplitude-js"
  ```javascript
  amplitude.getInstance().sendEvents()
  ```

=== "@amplitude/analytics-browser"
  ```typescript
  amplitude.flush()
  ```

### Setting user properties

The APIs for setting user properties remain familiar with the exception of the removal of `getInstance()`. Here are code snippets to migrate APIs for user properties.

#### `setUserId()`

Setting a user ID can be invoked on `amplitude` without calling `getInstance()`.

=== "amplitude-js"
  ```javascript
  const userId = "1"
  amplitude.getInstance().setUserId(userId)
  ```

=== "@amplitude/analytics-browser"
  ```typescript
  const userId = "1"
  amplitude.setUserId(userId)
  ```

#### `setDeviceId()`

Setting a device ID can be invoked on `amplitude` without calling `getInstance()`.

=== "amplitude-js"
  ```javascript
  const deviceId = "1"
  amplitude.getInstance().setDeviceId(deviceId)
  ```

=== "@amplitude/analytics-browser"
  ```typescript
  const deviceId = "1"
  amplitude.getDeviceId(deviceId)
  ```

#### `setSessionId()`

Setting a session ID can be invoked on `amplitude` without calling `getInstance()`.

=== "amplitude-js"
  ```javascript
  const sessionId = Date.now()
  amplitude.getInstance().setSessionId(sessionId)
  ```

=== "@amplitude/analytics-browser"
  ```typescript
  const sessionId = Date.now()
  amplitude.setSessionId(sessionId)
  ```

#### `clearUserProperties()`

The `clearUserProperties` API has been removed; however the same funcationality can be achieved by using a unified `identify` API.

=== "amplitude-js"
  ```javascript
  amplitude.getInstance().clearUserProperties()
  ```

=== "@amplitude/analytics-browser"
  ```typescript
  amplitude.identify(
    new amplitude.Identify().identify.clearAll()
  )
  ```

#### `setUserProperties()`

The `clearUserProperties` API has been removed; however the same funcationality can be achieved by using a unified `identify` API.

=== "amplitude-js"
  ```javascript
  amplitude.getInstance().setUserProperties({
    membership, "paid",
    payment, "bank",
  })
  ```

=== "@amplitude/analytics-browser"
  ```typescript
  const identify = new amplitude.Identify()
  identify
    .set("membership", "paid")
    .set("payment", "bank")
  amplitude.identify(identify)
  ```

#### `identify()`

Making an identify call can be done on `amplitude` without calling `getInstance()`.

=== "amplitude-js"
  ```javascript
  const identify = new amplitude.Identify()
  identify.set("membership", "paid")
  amplitude.getInstance().identify(identify)
  ```

=== "@amplitude/analytics-browser"
  ```typescript
  const identify = new amplitude.Identify()
  identify.set("membership", "paid")
  amplitude.identify(identify)
  ```

### Setting group properties

### `groupIdentify()`

Making an identify call can be done on `amplitude` without calling `getInstance()`.

=== "amplitude-js"
  ```javascript
  const identify = new amplitude.Identify()
  identify.set("membership", "paid")
  amplitude.getInstance().groupIdentify(identify)
  ```

=== "@amplitude/analytics-browser"
  ```typescript
  const identify = new amplitude.Identify()
  identify.set("membership", "paid")
  amplitude.groupIdentify(identify)
  ```

### Tracking revenue

#### `logRevenueV2()`

Tracking revenue can be done using `revenue()` API on `amplitude` without calling `getInstance()`.

=== "amplitude-js"
  ```javascript
  const revenue = new amplitude.Revenue()
  revenue
    .setProductId("productId")
    .setPrice(10)
  amplitude.getInstance().logRevenueV2(revenue)
  ```

=== "@amplitude/analytics-browser"
  ```typescript
  const revenue = new amplitude.Revenue()
  revenue
    .setProductId("productId")
    .setPrice(10)
  amplitude.revenue(revenue)
  ```

### Patterns

#### Plugins

The configs `config.language`, `config.library`, `config.platform` were added to `amplitude-js` to allow modification of event payloads for these specific fields. While `@amplitude/analytics-browser` do not support these configurations anymore, the new Browser SDK allows for plugins to be added and enrich event payloads.

=== "@amplitude/analytics-browser"
  ```ts
  import { BrowserConfig, EnrichmentPlugin, Event, PluginType } from '@amplitude/analytics-types'

  export class LibraryModifierPlugin implements EnrichmentPlugin {
    name = 'library-modifier'
    type = PluginType.ENRICHMENT as const

    /**
    * setup() is called on plugin installation
    * example: client.add(new LibraryModifierPlugin());
    */
    setup(config: BrowserConfig): Promise<undefined> {
      this.config = config
    }

    /**
    * execute() is called on each event instrumented
    * example: client.track('New Event');
    */
    execute(event: Event): Promise<Event> {
      event.library = 'my-library-name/1.0.0'
      return Promise.resolve(event)
    }
  }
  ```

#### Defer initialization

To defer initialization in `amplitude-js`, init must be called with `config.deferInitialization` set to true, and eventually calling `enableTracking()` to formalize initialization and send all enqueued events.

=== "amplitude-js"
  ```javascript
  amplitude.getInstance().init(API_KEY, OPTIONAL_USER_ID, {
    deferInitialization: true,
  })

  amplitude.getInstance().logEvent("Event 1")
  amplitude.getInstance().logEvent("Event 2")
  amplitude.getInstance().logEvent("Event 3")

  amplitude.getInstance().enableTracking()
  ```

For `@amplitude/analytics-browser`, `init()` can be called at a later time than `track()`. All `track()` calls are then processed after initialization is completed.

=== "@amplitude/analytics-browser"
  ```typescript
  amplitude.track("Event 1")
  amplitude.track("Event 2")
  amplitude.track("Event 3")

  amplitude.init(API_KEY, OPTIONAL_USER_ID)
  ```

#### Web attribution

In `amplitude-js`, web attribution is enabled by enabling the following configurations:

* `config.includeGclid`
* `config.includeFbclid`
* `config.includeReferrer`
* `config.includeUtm`

Moving forward, the web attribution is controlled by a single configuration `config.attribution.disabled` which by default is set to `false` and captures all campaign parameters. This configuration collects the same campaign parameters supported in `amplitude-js`.

#### Flush or `onExitPage`

There are certain scenarios that necessiate sending events immediately, like navigating away from a page. This is a common scenario when tracking button clicks that directs the user to another page while sending event payload in batches.

In `amplitude-js` this is done by using `onExitPage()` callback.

=== "amplitude-js"
  ```javascript
  amplitude.getInstance().init(API_KEY, OPTIONAL_USER_ID, {
    onExitPage: () => {
      amplitude.sendEvents()
    },
  })
  ```

For `@amplitude/analytics-browser`, Amplitude recommends adding your own event listerer for `pagehide` event.

=== "@amplitude/analytics-browser"
  ```javascript
  window.addEventListener('pagehide',
    () => {
      amplitude.setTransport('beacon') // Optional. Sets https transport to use `sendBeacon` API
      amplitude.flush()
    },
  );
  ```

#### Callback

For `amplitude-js`, two separate callback functions are passed for success and error. With `@amplitude/analytics-browser` supporting Promises (and async/await), the asynchronous methods like `track()`, `identify()`, `groupIdentify` return a custom promise interface.

=== "@amplitude/analytics-browser"
  ```javascript
  const result = await amplitude.track("Button Clicked").promise
  if (result.code === 200) {
    // success logic
  } else {
    // errr logic
  }

  ```
