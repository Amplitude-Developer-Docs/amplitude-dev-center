---
title: Browser SDK 2.0 Migration Guide
description: Use this guide to easily migrate from Amplitude Marketing Analytics Browser to the Browser SDK 2.0.
---

Amplitude Browser SDK 2.0 (`@amplitude/analytics-browser`) features default event tracking, improved marketing attribution tracking, simplified interface and a lighter weight package.

### Terminology

* `@amplitude/marketing-analytics-browser@1`: Marketing Analytics Browser SDK
* `@amplitude/analytics-browser@2`:  Browser SDK 2.0

### Dependency

For snippet installation, update your project's [snippet loader](https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/analytics-browser#using-script-loader).

For Node projects, update your dependency list in package.json.

```diff
{
  "dependencies": {
-     "@amplitude/marketing-analytics-browser": "^1"
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

### Deprecates user agent client-side parsing

In Browser 2.0, we removes functionality to parse user agent that populates `event.os_name`, `event.os_version`, `event.device_model`, `event.device_manufacturer` on the client side. This is replaced with user agent server-side parsing which offered by Amplitude ingestion endpoints. This breaking changes might affect your chart analystic related to the user agent properties. However, we provided a [user agnet enrichment plugin](https://www.npmjs.com/package/@amplitude/plugin-user-agent-enrichment-browser) to enrich the user agent info to keep it backward compatible. Please check [here](https://github.com/amplitude/Amplitude-TypeScript/tree/v1.x/packages/plugin-user-agent-enrichment-browser) for more details.

### Marketing attribution tracking

Starting Browser SDK 2.0, Amplitude consolidates Browser SDK and Marketing Analytics SDK to povide a single solution for both product and marketing analytics use case.

Marketing attribution tracking excludes all subdomains of the same root domain as referrer. This means traffic from one subdomain to another (ie analytics.amplitude.com to experiment.amplitude.com) are not tracked with no additional configuration.

Marketing Analytics Browser SDK by default, allows other subdomains to be tracked as referrer. If this is behavior is desired, refer to the code below.

```diff
  amplitude.init(API_KEY, undefined, {
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
  amplitude.init(API_KEY, undefined, {
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
  amplitude.init(API_KEY, undefined, {
-   attribution: {
-     disabled: true
+   defaultTracking: {
+     attribution: false,
    },
  });
```

### Page View tracking

#### Moved `options.pageViewTracking` to `options.defaultTracking.pageViews`

```diff
  amplitude.init(API_KEY, undefined, {
-   pageViewTracking: {
-     trackOn: true,
-     trackHistoryChanges: 'pathOnly', 
-     eventType: 'Page View',
+   defaultTracking: {
+     trackOn: true,
+     trackHistoryChanges: 'pathOnly', 
+     eventType:'Page View',
    },
  });
```

#### Disabling page view tracking

This provides a simpler and consistent interface to opt out of page view tracking.

```diff
  amplitude.init(API_KEY, undefined, {
-   pageViewTracking: false,
+   defaultTracking: {
+     pageViews: false,
    },
  });
```

#### Updates on page view tracking

* The event type of page view has been changed from `Page View` to `[Amplitude] Page Viewed`.
* The event properties name also be updated. Check [here](https://www.docs.developers.amplitude.com/data/sdks/browser-2/#tracking-default-events.) for more info.

| property | <div class="big-column"> [Browser SDK 2.0](../) </div> | <div class="big-column"> [Marketing Analytics Browser SDK](../../typescript-browser/) <div> |
| --- | --- | --- |
| `Event Type` | `[Amplitude] Page Viewed` | `Page View` |
| `Event Properties` | `page_domain` |  `[Amplitude] Page Domain` |
| | `page_location` | `[Amplitude] Page Location` |
| | `page_path` | `[Amplitude] Page Path` |
| | `page_title` | `[Amplitude] Page Title` |
| | `page_url` | `[Amplitude] Page URL` |

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

The behavior for web attribution and page view tracking are compatible with Browser 2.0.