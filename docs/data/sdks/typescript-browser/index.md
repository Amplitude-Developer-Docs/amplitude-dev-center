---
title: Browser SDK
description: The Amplitude Browser SDK Installation & Quick Start guide.
icon: simple/javascript
---


![npm version](https://img.shields.io/npm/v/@amplitude/analytics-browser/latest)

The Browser SDK lets you send events to Amplitude. This library is open-source, check it out on [GitHub](https://github.com/amplitude/Amplitude-TypeScript).

!!!info "Browser SDK Resources"
    [:material-github: GitHub](https://github.com/amplitude/Amplitude-TypeScript/tree/v1.x/packages/analytics-browser) · [:material-code-tags-check: Releases](https://github.com/amplitude/Amplitude-TypeScript/releases) · [:material-book: API Reference](https://amplitude.github.io/Amplitude-TypeScript/)

!!!info "Browser SDK 2.0 is now available"
    An improved version of Amplitude Browser SDK is now available. Amplitude Browser SDK 2.0 features default event tracking, improved marketing attribution tracking, simplified interface and a lighter weight package. Amplitude recommends the Browser SDK 2.0 for both product analytics and marketing analytics use cases. Upgrade to the latest [Browser SDK 2.0](../browser-2/index.md). See the [Migration Guide](../browser-2/migration.md) for more help.


!!!note "Browser SDK versus the Marketing Analytics Browser"
    Amplitude recommends the Browser SDK for most users. You can extend its functionality using plugins.
    However, if you want web attribution and page view tracking without extra setup, use the Marketing Analytics Browser SDK instead. It extends the Browser SDK with built-in web attribution and page view tracking. Learn more about [Marketing Analytics Browser SDK](../marketing-analytics-browser/).

--8<-- "includes/ampli-vs-amplitude.md"
    Click here for more documentation on [Ampli for Browser](./ampli.md).

## Getting started

Use [this quickstart guide](../sdk-quickstart#browser) to get started with Amplitude Browser SDK.

## Usage

### Initialize the SDK

--8<-- "includes/sdk-httpv2-notice.md"

--8<-- "includes/sdk-ts-browser/init.md"

```ts
// Option 1, initialize with API_KEY only
amplitude.init(API_KEY);

// Option 2, initialize with user ID if it's already known
amplitude.init(API_KEY, 'user@amplitude.com');

// Option 3, initialize with configuration
amplitude.init(API_KEY, 'user@amplitude.com', options);
```

### Configuration

--8<-- "includes/sdk-ts-browser/shared-configurations.md"
    |`storageProvider`| `Storage<Event[]>`. Implements a custom `storageProvider` class from Storage. | `LocalStorage` |
    |`attribution`| `AttributionOptions`. Configurations for web attribution plugin | Check "Attribution Options" config table below |
    |`defaultTracking`| `boolean | DefaultTrackingOptions`. Configurations for default event tracking | Check [tracking default events](./#tracking-default-events)|

In addition to the basic configuration options, there also has options to configure attribution.
    
???config "Attribution Options"
    |<div class="big-column">Name</div>| Description| Default Value|
    |---|----|---|
    |`config.attribution.disabled`| `boolean`. Whether disable the attribution tracking. | `false` |
    |`config.attribution.excludeReferrers`| `string[]`. Exclude the attribution tracking for the provided referrers string | Including all referrers by default. |
    |`config.attribution.initialEmptyValue`| `string`. Customize the initial empty value for attribution related user properties to any string value. | `EMPTY` |
    |`config.attribution.resetSessionOnNewCampaign`| `boolean`. Whether to reset user sessions when a new campaign is detected. Note a new| `false` |
    |`config.attribution.trackNewCampaigns`| `boolean`. Whether tracking new campaigns on the current session. | `false` | 
    |`config.attribution.trackPageViews`| `boolean`. Whether track page view on attribution. Note that `config.defaultTracking.pageViews` has higher priority over this configuration. Learn more about it [here](./#tracking-page-views). | `false` |

--8<-- "includes/sdk-ts/shared-batch-configuration.md"

--8<-- "includes/sdk-ts-browser/shared-batch-code.md"

--8<-- "includes/sdk-ts/client-eu-residency.md"

#### Debugging

--8<-- "includes/sdk-ts/client-debugging.md"

### Tracking an event

--8<-- "includes/sdk-ts-browser/tracking-an-event.md"

### Tracking default events

Starting version 1.9.1, Browser SDK now tracks default events. Browser SDK can be configured to track the following events automatically:

* Page views [^1]
* Sessions
* Form interactions
* File downloads

[^1]:
    If you want to track page views before 1.9.0, you need to enable config.attribution.trackPageViews ([More details](./#configuration)) or add `page-view-tracking` plugin ([More details](../marketing-analytics-browser/#page-view)). The event type for page views will be different.

???config "Tracking default events options"
    |<div class="big-column">Name</div>|Value|Description|
    |-|-|-|
    `config.defaultTracking.pageViews` | Optional. `boolean` | Enables default page view tracking. If value is `true`, Amplitude tracks page view events on initialization. Default value is `false`.<br /><br />Event properties tracked includes: `[Amplitude] Page Domain`, `[Amplitude] Page Location`, `[Amplitude] Page Path`, `[Amplitude] Page Title`, `[Amplitude] Page URL`<br /><br />See [Tracking page views](#tracking-page-views) for more information.|
    `config.defaultTracking.sessions` | Optional. `boolean` | Enables session tracking. If value is `true`, Amplitude tracks session start and session end events. Default value is `false`.<br /><br />See [Tracking sessions](#tracking-sessions) for more information.|
    `config.defaultTracking.formInteractions` | Optional. `boolean` | Enables form interaction tracking. If value is `true`, Amplitude tracks form start and form submit events. Default value is `false`.<br /><br />Event properties tracked includes: `[Amplitude]  Form ID`, `[Amplitude] Form Name`, `[Amplitude] Form Destination`<br /><br />See [Tracking form interactions](#tracking-form-interactions) for more information.|
    `config.defaultTracking.fileDownloads` | Optional. `boolean` | Enables file download tracking. If value is `true`, Amplitude tracks file download events. Default value is `false`.<br /><br />Event properties tracked includes: `[Amplitude] File Extension`, `[Amplitude] File Name`, `[Amplitude] Link ID`, `[Amplitude] Link Text`, `[Amplitude] Link URL`<br /><br />See [Tracking file downloads](#tracking-file-downloads) for more information.|

You can enable Amplitude to start tracking all events mentioned above, use the code sample below. Otherwise, you can omit the configuration to keep them disabled.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  defaultTracking: {
    pageViews: true,
    sessions: true,
    formInteractions: true,
    fileDownloads: true,
  },
});
```

Alternatively, you can enable Amplitude to track all events mentioned above by setting `config.defaultTracking` to `true`.

!!!note
    Amplitude may add more events in a future version, and this configuration enables tracking for those events as well.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  defaultTracking: true,
});
```

#### Tracking page views

You can enable Amplitude to start tracking page view events by setting `config.defaultTracking.pageViews` to `true`. Refer to the code sample below.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  defaultTracking: {
    pageViews: true,
  },
});
```

By setting `config.defaultTracking.pageViews` to `true`, you enable Amplitude to use default page view tracking behavior. The default behavior sends a page view event on initialization. The event type for this event is "[Amplitude] Page Viewed".

!!!note Page view event configuration priority
    You may notice that both `config.defaultTracking.pageViews` and `config.attribution.trackPageViews` have configurations for whether to enable page view tracking especially when you are using the web attribution plugin. Notice that `config.defaultTracking.pageViews` has higher priority over `config.attribution.trackPageViews` which means that `config.defaultTracking.pageViews` will overwrite the setting of the attribution page view event. When `config.attribution.trackPageViews` is enabled, the SDK tracks page view events only when attribution changed. When `config.defaultTracking.pageViews` is enabled, the SDK tracks page view events when page changed.

##### Advanced configuration for tracking page views

--8<-- "includes/sdk-ts-browser/tracking-page-views-advanced.md"

#### Tracking sessions

You can enable Amplitude to start tracking session events by setting `config.defaultTracking.sessions` to `true`. Refer to the code sample below.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  defaultTracking: {
    sessions: true,
  },
});
```

By setting `config.defaultTracking.sessions` to `true`, you enable Amplitude to track session start and session end events. A session is the period of time a user has your website open. See [How Amplitude defines sessions](https://help.amplitude.com/hc/en-us/articles/115002323627-Track-sessions-in-Amplitude#how-amplitude-defines-sessions) for more information. When a new session starts, Amplitude tracks a session start event is and is the first event of the session. The event type for session start is "[Amplitude] Start Session". When an existing session ends, a session start end is tracked and is the last event of the session. The event type for session end is "[Amplitude] End Session".

#### Tracking form interactions

You can enable Amplitude to start tracking form interaction events by setting `config.defaultTracking.formInteractions` to `true`. Refer to the code sample below.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  defaultTracking: {
    formInteractions: true,
  },
});
```

By setting `config.defaultTracking.formInteractions` to `true`, you enable Amplitude to track form start and form submit events. A form start event is tracked when the user initially interacts with the form. An initial interaction can be the first change to an text input, or radio button, or dropdown. The event type for session start is "[Amplitude] Form Started". A form submit event is tracked when the user submits the form. The event type for session start is "[Amplitude] Form Submitted". If a form is submitted with no initial change to any form fields, both "[Amplitude] Form Started" and "[Amplitude] Form Submitted" are tracked.

Amplitude can track forms that are constructed with `<form>` tags and `<input>` tags nested. For example:

```html
<form id="subscriber-form" name="subscriber-form" action="/subscribe">
  <input type="text" />
  <input type="submit" />
</form>
```

#### Tracking file downloads

You can enable Amplitude to start tracking file download events by setting `config.defaultTracking.fileDownloads` to `true`. Refer to the code sample below.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  defaultTracking: {
    fileDownloads: true,
  },
});
```

By setting `config.defaultTracking.fileDownloads` to `true`, you enable Amplitude to track file download events. A file download event is tracked when an anchor or `<a>` tag linked to a file is clicked. The event type for file download is "[Amplitude] File Downloaded". Amplitude determines that the anchor or `<a>` tag linked to a file if the file extension matches the following regex:

`pdf|xlsx?|docx?|txt|rtf|csv|exe|key|pp(s|t|tx)|7z|pkg|rar|gz|zip|avi|mov|mp4|mpe?g|wmv|midi?|mp3|wav|wma`

### User properties

--8<-- "includes/sdk-ts/shared-user-properties.md"

### User groups

--8<-- "includes/sdk-ts/shared-user-groups.md"

### Group properties

--8<-- "includes/sdk-ts/shared-group-properties.md"

### Revenue tracking
<!-- vale off-->

--8<-- "includes/sdk-ts/shared-revenue-tracking.md"

#### Revenue interface

--8<-- "includes/sdk-ts/shared-revenue-interface.md"

### Flush the event buffer

--8<-- "includes/sdk-ts/shared-flush.md"

### Custom user ID

--8<-- "includes/sdk-ts-browser/shared-custom-user-id.md"

### Custom session ID

--8<-- "includes/sdk-ts-browser/shared-custom-session-id.md"

### Custom device ID

--8<-- "includes/sdk-ts-browser/shared-custom-device-id.md"

### Reset when user logs out

--8<-- "includes/sdk-ts-browser/shared-reset.md"

### Opt users out of tracking

--8<-- "includes/sdk-ts/shared-opt-out.md"

### Optional tracking

By default, the SDK tracks these properties automatically. You can override this behavior by passing a configuration called `trackingOptions` when initializing the SDK, setting the appropriate options to false.

| Tracking Options | Default |
| --- | --- |
| `deviceManufacturer` | `true` |
| `deviceModel` | `true` |
| `ipAddress` | `true` |
| `language` | `true` |
| `osName` | `true` |
| `osVersion` | `true` |
| `platform` | `true` |

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  trackingOptions: {
    deviceManufacturer: false,
    deviceModel: false,
    ipAddress: false,
    language: false,
    osName: false,
    osVersion: false,
    platform: false,
  },
});
```

### Callback

--8<-- "includes/sdk-ts/shared-callback.md"

### Plugins

--8<-- "includes/sdk-ts-browser/shared-plugins.md"

##### Web attribution enrichment plugin

You need to download `plugin-web-attribution-browser` package and add the `webAttributionPlugin` before call init method. 

=== "npm"

    ```bash
    npm install @amplitude/plugin-web-attribution-browser
    ```

=== "yarn"

    ```bash
    yarn add @amplitude/plugin-web-attribution-browser
    ```

Add plugin to Amplitude instance.

```ts
amplitude.add(webAttributionPlugin());
amplitude.init(API_KEY);
```

See the [configuration options](../marketing-analytics-browser/#configuration).
Learn more about what the [Web Attribution Plugin](../marketing-analytics-browser/#web-attribution) supports.

###### Differences from base SDK

Enabling the Attribution plugin overwrites the default attribution tracking behavior of the SDK.

The SDK’s built in attribution tracking only tracks attribution at the start of sessions. This mean if a user re-enters the site through a new campaign channel (such as direct or an ad) in the middle of a session, this new channel isn't recorded.

If the `trackNewCampaigns` option is set to `true`, the campaigns are tracked, and the user’s session is reset when a new campaign is detected.

The Attribution plugin tracks all campaigns, regardless of whether the user is at the start of a session.

Set the `resetSessionOnNewCampaign` option to `true` to cause the user’s session to be reset when a new campaign is detected. The session isn't reset in the case where the referrer is just a different subdomain of your site.

##### Page view enrichment plugin

You need to download `plugin-page-view-tracking-browser` and add the `pageViewTrackingPlugin` before calling the init method.

=== "npm"

    ```bash
    npm install @amplitude/plugin-page-view-tracking-browser
    ```
=== "yarn"

    ```bash
    yarn add @amplitude/plugin-page-view-tracking-browser
    ```

Add plugin to Amplitude instance.

```ts
amplitude.add(pageViewTrackingPlugin());
amplitude.init(API_KEY);
```

See the [configuration options](../marketing-analytics-browser/#configuration).
Learn more about what the [Page View Plugin](../marketing-analytics-browser/#page-view) supports.

###### Differences from base SDK

The base SDK sends Page View events when a user’s campaign is tracked if the `attribution.trackPageViews` option is set to `true`.

The page view plugin sends a Page View event on each page a user visits by default. It also offers options to customize this behavior.

## Advanced topics

### Cross domain tracking

--8<-- "includes/sdk-ts-browser/shared-cross-domain-tracking.md"

### Custom HTTP client

You can provide an implementation of `Transport` interface to the `transportProvider` configuration option for customization purpose, for example, sending requests to your proxy server with customized HTTP request headers.

```ts
class MyTransport {
  send(serverUrl, payload) {
    // check example: https://github.com/amplitude/Amplitude-TypeScript/blob/main/packages/analytics-client-common/src/transports/fetch.ts
  }
}

amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  transportProvider: new MyTransport(),
});
```

### Content Security Policy (CSP)

--8<-- "includes/sdk-ts-browser/shared-csp.md"

--8<-- "includes/abbreviations.md"

### Cookie management

--8<-- "includes/sdk-ts-browser/shared-cookie-management.md"

#### Cookie prefix

--8<-- "includes/sdk-ts-browser/shared-cookie-prefix.md"

#### Cookie domain

--8<-- "includes/sdk-ts-browser/shared-cookie-domain.md"

#### Cookie data

--8<-- "includes/sdk-ts-browser/shared-cookies.md"

#### Disable cookies

You can opt out using cookies by setting `disableCookies` to `true` so that the SDK will use `LocalStorage` instead. `LocalStorage` is a great alternative, but because access to `LocalStorage` is restricted by subdomain, you can't track anonymous users across subdomains of your product (for example: `www.amplitude.com` vs `analytics.amplitude.com`).

--8<-- "includes/sdk-device-id/lifecycle-header.md"

1. Device id in configuration on initialization
2. "deviceId" value from URL param, for example http://example.com/?deviceId=123456789. Refer to [cross domain tracking](./#cross-domain-tracking) for more details
3. Device id in cookie storage. Refer to [cookie management](./#cookie-management) for more details
4. Device iD in cookie storage of JavaScript SDK. Refer to [JavaScript's cookie management](../typescript-browser/#cookie-management) for more details
5. A randomly generated 36-character UUID

--8<-- "includes/sdk-device-id/change-scenarios.md"

- By default the SDK stores device IDs in cookies, so a device ID will change if a user clears cookies, uses another device, or uses privacy mode
- On initialization, a device ID is passed in from URL param `deviceId`
- `unset()` is called

--8<-- "includes/sdk-device-id/set-device-id.md"

```ts
amplitude.setDeviceId(uuid());
```

--8<-- "includes/sdk-device-id/get-device-id.md"

```ts
const deviceId = amplitude.getDeviceId();
```
