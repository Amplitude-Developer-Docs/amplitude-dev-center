### Marketing attribution

--8<-- "includes/sdk-ts-browser/marketing-analytics-overview.md"

For users who initially visits a page directly or organically, by default, the initial value is set to `"EMPTY"`. If you prefer a different initial value, set `attribution.initialEmptyValue` to any string value.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  attribution: {
    initialEmptyValue: 'none',
  }
});
```

#### Exclude the referrers from specific domain

You can configure Amplitude to opt out of collection of attribution data for a given list of referrers.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  attribution: {
    excludeReferrers: ['www.test.com'],
  }
});
```

#### Reset the session on a new campaign

You can configure Amplitude to start a new session if any campaign parameter changes. Do this by setting `attribution.resetSessionOnNewCampaign` to `true`. By default `attribution.resetSessionOnNewCampaign` is set to `false`.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  attribution: {
    resetSessionOnNewCampaign: true,
  }
});
```

#### Disable attribution tracking

You can configure Amplitude to opt out of automatic collection of attribution data. Do this by setting `attribution.disabled` to `true`. By default `attribution.disabled` is set to `false`.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  attribution: {
    disabled: true,
  }
});
```

### Page view

Enable page view tracking by setting `pageViewTracking` to `true`. The page view event is fired when the page loads.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  pageViewTracking: true
});
```

You can set `pageViewTracking` to an object to pass more options.

#### Track the page view event when the attribution changed

Set the `trackOn` option to `'attribution'` to send Page View events _only_ when attribution information changes.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  pageViewTracking: {
    trackOn: 'attribution',
  }
});
```

#### Track the page view event based on specific criteria

`trackOn` can also be set to a function callback to fully customize when a Page View event is sent.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  pageViewTracking: {
    trackOn: () => {
      return window.location.pathname === '/landing_page'
    },
  }
});
```

#### Single page app page view tracking

If you have a single page app that uses a [history](https://developer.mozilla.org/en-US/docs/Web/API/History) based router such as react-router, you can enable `trackHistoryChanges` to send Page View events when users navigate between pages.
Possible values for `trackHistoryChanges`:

|<div class="med-column">Name</div>|Description|
|---|---|
|`all`| All pushes and pops from history send a page view. |
|`pathOnly`| Page Views are sent if the [URL pathname](https://developer.mozilla.org/en-US/docs/Web/API/URL/pathname) changes. This prevents changes to the query string or hash from sending events. |

You can set the `trackHistoryChanges` to `pathOnly` to only track the on path changes. By default, full page URL is considered into the page view changes.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  pageViewTracking: {
    trackHistoryChanges: 'pathOnly' // or 'all'
  }
});
```
