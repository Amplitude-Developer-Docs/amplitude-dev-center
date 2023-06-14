---
title: Browser SDK 2.0 Migration Guide
description: Use this guide to easily migrate from Amplitude Browser SDK 1.0 to the Browser SDK 2.0.
---

Amplitude Browser SDK 2.0 (`@amplitude/analytics-browser`) features default event tracking, improved marketing attribution tracking, simplified interface and a lighter weight package.

!!!info "Using Browser SDK with Ampli V2"
    Ampli V2 is compatible with both Browser SDK 2.0 and Browser SDK 1.0. Follow this migration guide to upgrade.

### Terminology

* `@amplitude/analytics-browser@1`: Browser SDK 1.0
* `@amplitude/analytics-browser@2`: Browser SDK 2.0

### Dependency

For snippet installation, update your project's [snippet loader](https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/analytics-browser#using-script-loader).

For Node projects, update your dependency list in package.json.

```diff
{
  "dependencies": {
-     "@amplitude/analytics-browser": "^1"
+     "@amplitude/analytics-browser": "^2"
  }
}
```

### Default events tracking

Starting Browser SDK 2.0, default tracking is enabled by default. Default tracking is implicit tracking performed by Amplitude on your behalf, and includes page views, sessions, file downloads, form interactions, and marketing attribution.

To opt out of default tracking, set `options.defaultTracking` to `false`.

```ts
amplitude.init(API_KEY, undefined, {
  defaultTracking: false,
});
```

Additionally, you can pick and choose which events you want tracked by Amplitude. For example, if you only want default tracking for marketing attribution and page views, you can use the code below.

```ts
amplitude.init(API_KEY, undefined, {
  defaultTracking: {
    attribution: true,
    pageViews: true,
    sessions: false,
    fileDownload: false,
    formInteraction: false,
  },
});
```

### Marketing attribution tracking

Starting Browser SDK 2.0, Amplitude consolidates Browser SDK and Marketing Analytics SDK to povide a single solution for both product and marketing analytics use case.

Marketing attribution tracking excludes all subdomains of the same root domain as referrer. This means traffic from one subdomain to another (ie analytics.amplitude.com to experiment.amplitude.com) are not tracked with no additional configuration.

Browser SDK 1.0, by default, allows other subdomains to be tracked as referrer. If this is behavior is desired, refer to the code below.

```diff
  ampitude.init(API_KEY, undefined, {
+   defaultTracking: {
+     attribution: {
+       excludeReferrers: [location.hostname]
+     },
+   },
  });
```

#### Moved `options.attribution` to `options.defaultTracking.attribution`

This consolidates attribution options together with other default tracking options.

```diff
  ampitude.init(API_KEY, undefined, {
-   attribution: {
-     excludeReferrers: [location.hostname]
+   defaultTracking: {
+     attribution: {
+       excludeReferrers: [location.hostname]
+     },
    },
  });
```

#### Disabling marketing attribution tracking

This provides a simpler and consistent interface to opt out of marketing attribution tracking.

```diff
  ampitude.init(API_KEY, undefined, {
-   attribution: {
-     disabled: true
+   defaultTracking: {
+     attribution: false,
    },
  });
```


#### Deprecates `options.attribution.trackNewCampaigns`

This option is no longer supported as it has been adopted a non configurable default behavior. Amplitude tracks any changes to campaign parameters which includes UTM, referrer and click ID parameters.

#### Deprecates `options.attribution.trackPageViews`

This option no longer exists but Amplitude can be configured similarly using page view options.

```diff
  ampitude.init(API_KEY, undefined, {
-   attribution: {
-     trackPageViews: true
+   defaultTracking: {
+     pageViews: {
+       trackOn: 'attribution',
+     },
    },
  });
```

### Cookie options

Starting Browser SDK 2.0, Amplitude has simplified the options to manage the use of cookies. By default, user identity is stored on browser cookies.

#### Using an alternative storage API

```diff
  amplitude.init(API_KEY, undefined, {
-   disableCookies: true,
+   identityStorage: 'localStorage',
  });
```

#### Disabling user identity persistence

```diff
- import { MemoryStorage } from '@amplitude/analytics-core';
-
  amplitude.init(API_KEY, undefined, {
-   cookieStorageProvider: new MemoryStorage(),
+   identityStorage: 'none',
  });
```

#### Configuring cookie options

The options to manage cookie usage are now nested under `options.cookieOptions` for a more discoverable interface.

```diff
  amplitude.init(API_KEY, undefined, {
-   cookieExpiration: 365,
-   cookieSameSite: 'Lax',
-   cookieSecure: false,
-   cookieUpgrade: true,
-   domain: '',
+   cookieOptions: {
+     expiration: 365,
+     sameSite: 'Lax',
+     secure: false,
+     upgrade: true,
+     domain: '',
+   },
  });
```

### No to enums

Amplitude no longer requires the use of enums specifically `TransportType`, `ServerZone` and `PluginType`, and accepts its literaal values.

Setting transport provider on initialization

```diff
  import * as amplitude from '@amplitude/analytics-browser';

  amplitude.init(API_KEY, USER_ID, {
-   transport: amplitude.Types.TransportType.Fetch,
+   transport: 'fetch',
  });
```

Setting transport provider using setTransport()

```diff
  import * as amplitude from '@amplitude/analytics-browser';

- amplitude.setTransport(amplitude.Types.TransportProvider.Fetch);
+ amplitude.setTransport('fetch');
```

Setting server zone on initialization

```diff
  import * as amplitude from '@amplitude/analytics-browser';

  amplitude.init(API_KEY, USER_ID, {
-   serverZone: amplitude.Types.ServerZone.US,
+   serverZone: 'US',
  });
```

### Simplified plugin interface

Amplitude has made it easier to create your own plugins, requiring less properties for faster authoring.

--8<-- "includes/sdk-ts-browser/shared-plugin-2-properties.md"

### Comparison

This section provides a comparison between different version of Browser SDK. This overview provides key insights for developers, identifying areas that have significant changes and need careful consideration.


| Feature | <div class="big-column"> [Browser SDK 2.0](../) </div> | <div class="big-column"> [Browser SDK 1.0](../../typescript-browser/) <div> |
| --- | --- | --- |
| Package | [@amplitude/analytics-browser@2](https://www.npmjs.com/package/@amplitude/analytics-browser) | [@amplitude/analytics-browser@1](https://www.npmjs.com/package/@amplitude/analytics-browser) |
| Web Attribution | Enabled by default with [**Web Attribution V2**](./#web-attribution-v2-vs-web-attribution-v1-vs-maintenance-web-attribution). | Enabled by default with [**Web Attribution V1**](./#web-attribution-v2-vs-web-attribution-v1-vs-maintenance-web-attribution). |
| Default Event Tracking |  Enabled by default | Disabled by default |

#### Web Attribution V2 vs Web Attribution V1

| <div class="big-column"> Web Attribution V2 </div> | <div class="big-column"> Web Attribution V1 </div> |
| --- | --- |
| <ul><li>Enabled by default.</li> <li>Tracks attribution on init with a new campaign regardless of session context (new or existing). Not configurable.</li> <li>Default value for all initial touch attribution properties is `"EMPTY"`. Configurable with `config.initialEmptyValue`. Value is configurable.</li> <li>Does not start a new session on new campaign. Configurable with `config.resetSessionOnNewCampaign = true`.</li><li>Tracks ad click IDs.</li></ul> | <ul><li>Enabled by default.</li> <li>Tracks attribution on init with a new session. Not configurable.</li> <li>Does not track attribution on init with a new campaign. Configurable with `config.trackNewCampaigns`.</li> <li>Default value for all initial touch attribution properties is `"EMPTY"`. Configurable with `config.initialEmptyValue`.</li> <li>Does not start a new session on new campaign. Configurable with `config.resetOnNewCampaign`.</li><li>Tracks ad click IDs.</li> |

| Web Attribution V2 | Web Attribution V1 |
| --- | --- |
|  ![Web Attribution V2](../../../assets/images/sdk/web-attribution-v2.drawio.svg)  | ![Web Attribution V1](../../../assets/images/sdk/web-attribution-v1.drawio.svg) |
