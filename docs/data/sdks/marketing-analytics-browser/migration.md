---
title: Browser SDK 2.0 Migration Guide
description: Use this guide to easily migrate from Amplitude Marketing Analytics Browser to the Browser SDK 2.0.
---

Amplitude Browser SDK 2.0 (`@amplitude/analytics-browser`) features default event tracking, improved marketing attribution tracking, simplified interface and a lighter weight package.

### Terminology

* `@amplitude/marketing-analytics-browser@1`: Marketing Analytics Browser SDK
* `@amplitude/analytics-browser@2`:  Browser SDK 2.0

### Dependency

dependency.md

```diff
{
  "dependencies": {
-     "@amplitude/marketing-analytics-browser": "^1"
+     "@amplitude/analytics-browser": "^2"
  }
}
```

### Default events tracking

--8<-- "includes/sdk-migration/sdk-browser-2-migration/default-event-tracking.md"

### Deprecates user agent client-side parsing

--8<-- "includes/sdk-migration/sdk-browser-2-migration/user-agent-parsing.md"

### Marketing attribution tracking

--8<-- "includes/sdk-migration/sdk-browser-2-migration/marketing-attribution-tracking-1.md"

Marketing Analytics Browser SDK by default, allows other subdomains to be tracked as referrer. If this is behavior is desired, refer to the code below.

--8<-- "includes/sdk-migration/sdk-browser-2-migration/marketing-attribution-tracking-2.md"

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

--8<-- "includes/sdk-migration/sdk-browser-2-migration/cookie-options.md"

### No to enums

--8<-- "includes/sdk-migration/sdk-browser-2-migration/no-enum.md" 

### Simplified plugin interface

--8<-- "includes/sdk-migration/sdk-browser-2-migration/simplified-plugin-interface.md" 

### Comparison

The behavior for web attribution and page view tracking are compatible with Browser 2.0.