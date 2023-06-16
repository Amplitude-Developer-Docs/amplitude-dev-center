---
title: Browser SDK 2.0
description: The Amplitude Browser SDK Installation & Quick Start guide.
icon: simple/javascript
---


![npm version](https://img.shields.io/npm/v/@amplitude/analytics-browser/latest)

The Browser SDK lets you send events to Amplitude. This library is open-source, check it out on [GitHub](https://github.com/amplitude/Amplitude-TypeScript).

!!!info "Browser SDK Resources"
    [:material-github: GitHub](https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/analytics-browser) · [:material-code-tags-check: Releases](https://github.com/amplitude/Amplitude-TypeScript/releases)

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

// Option 2, initialize with options
amplitude.init(API_KEY, options);

// Option 3, initialize with user ID if it's already known
amplitude.init(API_KEY, 'user@amplitude.com');

// Option 4, initialize with user ID and options
amplitude.init(API_KEY, 'user@amplitude.com', options);
```

### Configuration

--8<-- "includes/sdk-ts/shared-ts-configuration.md"
    |`appVersion` | `string`. Sets an app version for events tracked. This can be the version of your application. For example: "1.0.0" | `undefined` |
    |`defaultTracking` | `boolean | DefaultTrackingOptions`. Configures default event tracking | Check [tracking default events](./#tracking-default-events)|
    |`deviceId` | `string`. Sets an identifier for the device running your application. | `UUID()` |
    |`cookieOptions.domain` | `string`. Sets the domain property of cookies created. | `undefined` |
    |`cookieOptions.expiration` | `number`. Sets expiration of cookies created in days. | 365 days |
    |`cookieOptions.sameSite` | `string`. Sets `SameSite` property of cookies created. | `Lax` |
    |`cookieOptions.secure` | `boolean`. Sets `Secure` property of cookies created. | `false` |
    |`cookieOptions.upgrade` | `boolean`. Sets upgrading from cookies created by legacy Browser SDK. If `true`, new Browser SDK deletes cookies created by legacy Browser SDK. If `false`, Browser SDK keeps cookies created by legacy Browser SDK. | `true` |
    |`identityStorage` | `string`. Sets storage API for user identity. Options include `cookie` for `document.cookie`, `localStorage` for `localStorage`, or `none` to opt-out of persisting user identity. | `cookie` |
    |`partnerId` | `string`. Sets partner ID. Amplitude requires the customer who built an event ingestion integration to add the partner identifier to `partner_id`. | `undefined` |
    |`sessionTimeout` | `number`. Sets the period of inactivity from the last tracked event before a session expires in milliseconds. | 1,800,000 milliseconds (30 minutes) |
    |`storageProvider`| `Storage<Event[]>`. Sets a custom implementation of `Storage<Event[]>` to persist unsent events. | `LocalStorage` |
    |`userId` | `number`. Sets an identifier for the user being tracked. Must have a minimum length of 5 characters unless overridden with the `min_user_length` option. | `undefined` |
    |`trackingOptions` | `TrackingOptions`. Configures tracking of additional properties. Please refer to `Optional tracking` section for more information. | Enable all tracking options by default. |
    |`transport` | `string`. Sets request API to use by name. Options include `fetch` fro fetch, `xhr` for `XMLHttpRequest`, or  `beacon` for `navigator.sendBeacon`. | `fetch` |


--8<-- "includes/sdk-ts/shared-batch-configuration.md"

--8<-- "includes/sdk-ts/shared-batch-code.md"

--8<-- "includes/sdk-quickstart/quickstart-eu-data-residency.md"

```ts
amplitude.init(API_KEY, {
  serverZone: 'EU',
});
```

#### Debugging

You can control the level of logs printed to the developer console.

- 'None': Suppresses all log messages.
- 'Error': Shows error messages only.
- 'Warn': Shows error messages and warnings. This is the default value if `logLevel` isn't explicitly specified.
- 'Verbose': Shows informative messages.
- 'Debug': Shows error messages, warnings, and informative messages that may be useful for debugging, including the function context information for all SDK public method invocations. This logging mode is only suggested to be used in development phases.

Set the log level by configuring the `logLevel` with the level you want.

```ts
amplitude.init(API_KEY, {
  logLevel: amplitude.Types.LogLevel.Warn,
});
```

The default logger outputs logs to the developer console. You can provide your own logger implementation based on the `Logger` interface for any customization purpose. For example, collecting any error messages from the SDK in a production environment.

Set the logger by configuring the `loggerProvider` with your own implementation.

```ts
amplitude.init(API_KEY, {
  loggerProvider: new MyLogger(),
});
```

##### Debug Mode
Enable the debug mode by setting the `logLevel` to "Debug", example:

```ts
amplitude.init(API_KEY, {
  logLevel: amplitude.Types.LogLevel.Debug,
});
```

With the default logger, extra function context information will be output to the developer console when invoking any SDK public method, including:

- 'type': Category of this context, e.g., "invoke public method".
- 'name': Name of invoked function, e.g., "track".
- 'args': Arguments of the invoked function.
- 'stacktrace': Stacktrace of the invoked function.
- 'time': Start and end timestamp of the function invocation.
- 'states': Useful internal states snapshot before and after the function invocation.

### Tracking an event

--8<-- "includes/sdk-ts-browser/tracking-an-event.md"

### Tracking events to multiple projects

--8<-- "includes/sdk-tracking-events-to-multiple-projects.md"

```ts
const defaultInstance = amplitude.createInstance();
const envInstance = amplitude.createInstance();

defaultInstance.init(API_KEY_DEFAULT);
envInstance.init(API_KEY_ENV, {
  instanceName: 'env',
});
```

### Tracking default events

Starting version 1.9.1, Browser SDK now tracks default events. Browser SDK can be configured to track the following events automatically:

* Attribution
* Page views
* Sessions
* Form interactions
* File downloads

???config "Tracking default events options"
    |<div class="big-column">Name</div>|Value|Description|
    |-|-|-|
    `config.defaultTracking.attribution` | Optional. `boolean` | Enables/disables marketing attribution tracking. If value is `true`, Amplitude tracks marketing attribution events otherwise marketing attribution tracking is disabled. Default value is `true`.<br /><br />|
    `config.defaultTracking.pageViews` | Optional. `boolean` | Enables/disables default page view tracking. If value is `true`, Amplitude tracks page view events on initialization otherwise  page view tracking is disabled. Default value is `true`.<br /><br />Event properties tracked includes: `[Amplitude] Page Domain`, `[Amplitude] Page Location`, `[Amplitude] Page Path`, `[Amplitude] Page Title`, `[Amplitude] Page URL`<br /><br />See [Tracking page views](#tracking-page-views) for more information.|
    `config.defaultTracking.sessions` | Optional. `boolean` | Enables/disables session tracking. If value is `true`, Amplitude tracks session start and session end events otherwise session tracking is disabled. Default value is `true`.<br /><br />See [Tracking sessions](#tracking-sessions) for more information.|
    `config.defaultTracking.formInteractions` | Optional. `boolean` | Enables/disables form interaction tracking. If value is `true`, Amplitude tracks form start and form submit events otherwise form interaction tracking is disabled. Default value is `true`.<br /><br />Event properties tracked includes: `[Amplitude]  Form ID`, `[Amplitude] Form Name`, `[Amplitude] Form Destination`<br /><br />See [Tracking form interactions](#tracking-form-interactions) for more information.|
    `config.defaultTracking.fileDownloads` | Optional. `boolean` | Enables/disables file download tracking. If value is `true`, Amplitude tracks file download events otherwise file download tracking is disabled. Default value is `true`.<br /><br />Event properties tracked includes: `[Amplitude] File Extension`, `[Amplitude] File Name`, `[Amplitude] Link ID`, `[Amplitude] Link Text`, `[Amplitude] Link URL`<br /><br />See [Tracking file downloads](#tracking-file-downloads) for more information.|

!!!note
    The events above are tracked by default with no configuration needed. Amplitude may add more events in a future version, and default configuration enables tracking for those events as well.

To opt out, refer to the code below. Otherwise, you can omit the configuration to keep them enabled.

```ts
amplitude.init(API_KEY, {
  defaultTracking: {
    attribution: false,
    pageViews: false,
    sessions: false,
    formInteractions: false,
    fileDownloads: false,
  },
});
```

Alternatively, you can disable Amplitude from tracking all events mentioned above (and future default events) by setting `config.defaultTracking` to `false`.

```ts
amplitude.init(API_KEY, {
  defaultTracking: false,
});
```

#### Tracking marketing attribution

Amplitude marketing attribution by default by tracking UTM, referrers and click IDs as user properties.

???info "Attribution Overview"
    --8<-- "includes/sdk-ts-browser/marketing-analytics-overview.md"

You can opt out of marketing attribution tracking by setting `config.defaultTracking.attribution` to `false`. Refer to the code sample below.

```ts
amplitude.init(API_KEY, {
  defaultTracking: {
    attribution: false,
  },
});
```

##### Advanced configuration for tracking marketing attribution

You can also use advanced configuration for better control of how marketing attribution is tracked.

???config "Marketing attribution options"
    |<div class="big-column">Name</div>|Value|Description|
    |-|-|-|
    `config.defaultTracking.attribution.excludeReferrers` | Optional. Array of `string` or `RegExp` | Sets rules to determine which referrers are excluded from being tracked as traffic source. Use string values for exact matching and RegExp values for pattern matching against the referring domain. By default the current domain (and all its subdomain) are excluded referrers. |
    `config.defaultTracking.attribution.initialEmptyValue` | Optional. `string` | Sets the value to represent undefined/no initial campaign parameter for first-touch attribution. The default value is `"EMPTY`. |
    `config.defaultTracking.attribution.resetSessionOnNewCampaign` | Optional. `boolean` | Configures Amplitude to start a new session if any campaign parameter changes. The default value is `false`. |

For example, you can configure Amplitude to track marketing attribution separately for each of your subdomain. Refer to the code sample for how to achieve this.

```ts
amplitude.init(API_KEY, {
  defaultTracking: {
    attribution: {
      excludeReferrers: [location.hostname],
    },
  },
});
```

#### Tracking page views

Amplitude tracks page view events by default. The default behavior sends a page view event on initialization. The event type for this event is "[Amplitude] Page Viewed".

You can opt out of page view tracking by setting `config.defaultTracking.pageViews` to `false`. Refer to the code sample below.

```ts
amplitude.init(API_KEY, {
  defaultTracking: {
    pageViews: false,
  },
});
```

##### Advanced configuration for tracking page views

--8<-- "includes/sdk-ts-browser/tracking-page-views-advanced.md"

#### Tracking sessions

Amplitude tracks session events by default. The default behavior sends a page view event on initialization. The event type for this event is "[Amplitude] Page Viewed".

Amplitude tracks session events by default. A session is the period of time a user has your website open. See [How Amplitude defines sessions](https://help.amplitude.com/hc/en-us/articles/115002323627-Track-sessions-in-Amplitude#how-amplitude-defines-sessions) for more information. When a new session starts, Amplitude tracks a session start event and is the first event of the session. The event type for session start is "[Amplitude] Start Session". When an existing session ends, a session end is tracked and is the last event of the session. The event type for session end is "[Amplitude] End Session".

You can opt out of session tracking by setting `config.defaultTracking.sessions` to `false`. Refer to the code sample below.

```ts
amplitude.init(API_KEY, {
  defaultTracking: {
    sessions: false,
  },
});
```

#### Tracking form interactions

Amplitude tracks form interaction events by default. A form start event is tracked when the user initially interacts with the form. An initial interaction can be the first change to an text input, or radio button, or dropdown. The event type for session start is "[Amplitude] Form Started". A form submit event is tracked when the user submits the form. The event type for session start is "[Amplitude] Form Submitted". If a form is submitted with no initial change to any form fields, both "[Amplitude] Form Started" and "[Amplitude] Form Submitted" are tracked.

Amplitude can track forms that are constructed with `<form>` tags and `<input>` tags nested. For example:

```html
<form id="subscriber-form" name="subscriber-form" action="/subscribe">
  <input type="text" />
  <input type="submit" />
</form>
```

You can opt out of form interaction tracking by setting `config.defaultTracking.formInteractions` to `false`. Refer to the code sample below.

```ts
amplitude.init(API_KEY, {
  defaultTracking: {
    formInteractions: false,
  },
});
```

#### Tracking file downloads

Amplitude tracks file download events by default. A file download event is tracked when an anchor or `<a>` tag linked to a file is clicked. The event type for file download is "[Amplitude] File Downloaded". Amplitude determines that the anchor or `<a>` tag linked to a file if the file extension matches the following regex:

`pdf|xlsx?|docx?|txt|rtf|csv|exe|key|pp(s|t|tx)|7z|pkg|rar|gz|zip|avi|mov|mp4|mpe?g|wmv|midi?|mp3|wav|wma`

You can opt out of tracking file download events by setting `config.defaultTracking.fileDownloads` to `false`. Refer to the code sample below.

```ts
amplitude.init(API_KEY, {
  defaultTracking: {
    fileDownloads: false,
  },
});
```

### User properties

--8<-- "includes/sdk-ts/shared-user-properties.md"

### User groups

--8<-- "includes/sdk-ts/shared-user-groups.md"

### Group properties

--8<-- "includes/sdk-ts/shared-group-properties.md"

### Revenue tracking

--8<-- "includes/sdk-ts/shared-revenue-tracking.md"

#### Revenue interface

--8<-- "includes/sdk-ts/shared-revenue-interface.md"

### Flush the event buffer

--8<-- "includes/sdk-ts/shared-flush.md"

### Custom user ID

If your app has its own login system that you want to track users with, you can call `setUserId` at any time.

```ts
amplitude.setUserId('user@amplitude.com');
```

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
| `ipAddress` | `true` |
| `language` | `true` |
| `platform` | `true` |

```ts
amplitude.init(API_KEY, {
  trackingOptions: {
    ipAddress: false,
    language: false,
    platform: false,
  },
});
```

### Callback

--8<-- "includes/sdk-ts/shared-callback.md"

### Plugins

--8<-- "includes/sdk-ts-browser/shared-plugins-2.md"

## Advanced topics

### Cross domain tracking

--8<-- "includes/sdk-ts-browser/shared-cross-domain-tracking.md"

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
