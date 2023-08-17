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

--8<-- "includes/dependency.md"

```diff
{
  "dependencies": {
-     "@amplitude/analytics-browser": "^1"
+     "@amplitude/analytics-browser": "^2"
  }
}
```

### Default events tracking

--8<-- "includes/sdk-migration/sdk-browser-2-migration/default-event-tracking.md"

### Marketing attribution tracking

--8<-- "includes/sdk-migration/sdk-browser-2-migration/marketing-attribution-tracking-1.md"

Browser SDK 1.0, by default, allows other subdomains to be tracked as referrer. If this is behavior is desired, refer to the code below.

--8<-- "includes/sdk-migration/sdk-browser-2-migration/default-event-tracking-2.md"

#### Deprecates `options.attribution.trackNewCampaigns`

This option is no longer supported as it has been adopted a non configurable default behavior. Amplitude tracks any changes to campaign parameters which includes UTM, referrer and click ID parameters.

#### Deprecates `options.attribution.trackPageViews`

This option no longer exists but Amplitude can be configured similarly using page view options.

```diff
  amplitude.init(API_KEY, undefined, {
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

--8<-- "includes/sdk-migration/sdk-browser-2-migration/cookie-options.md"

### Deprecates user agent client-side parsing

--8<-- "includes/sdk-migration/sdk-browser-2-migration/user-agent-parsing.md"

### No to enums

--8<-- "includes/sdk-migration/sdk-browser-2-migration/no-enum.md"

### Simplified plugin interface

--8<-- "includes/sdk-migration/sdk-browser-2-migration/simplified-plugin-interface.md"

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
