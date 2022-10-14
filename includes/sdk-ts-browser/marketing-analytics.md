### Web attribution

With web attribution tracking, Amplitude supports automatically tracking the following attribution parameters:

- The 5 standard UTM parameters from the user's browser cookie or URL parameters
- The referring URL and domain
- 9 Click Identifiers

#### UTM parameters

UTM (Urchin Traffic Monitor) parameters are useful for analyzing the effectiveness of different ad campaigns and referring sites. UTM parameters are case-sensitive, so they're treated as different values when the capitalization varies.

There are five different standard UTM parameters:

|Name|Description|
|-|-|
|`utm_source`| This identifies which website sent the traffic (for example, Google, Facebook) |
|`utm_medium`| This identifies a specific campaign used (for example, "summer_sale") |
|`utm_campaign`| This identifies a specific campaign used (for example, "summer_sale") |
|`utm_term`| This identifies paid search terms used (for example, product+analytics) |
|`utm_content` | This identifies what brought the user to the site and is commonly used for A/B testing (for example, bannerlink, textlink) |

Here is an example URL with UTM parameters:

```html
https://www.amplitude.com/?utm_source=newsletter&utm_campaign=product_analytics_playbook&utm_medium=email&utm_term=product%20analytics&utm_content=bannerlink
```

#### Referrer parameters

Referrer is the URL of the page that linked to the destination page. Amplitude tracks the following parameters:

|Name|Description|
|-|-|
|`referrer`| The last page the user was on (for example, `https://amplitude.com/behavioral-analytics-platform?ref=nav`) |
|`referring_domain`| The domain that the user was last on (for example, `https://amplitude.com`) |

Referrer is an empty string (`''`) if the user navigated to the destination page directly.

#### Click ID parameters

Click IDs are campaign identifiers included as URL parameters. These IDs are used by Ad platforms to identify the campaign and other attributes. While Amplitude doesn't have access to further campaign attributes associated to Click IDs, Amplitude can track Click ID values specified below.

|Name|Description|
|-|-|
|`GCLID`| Google Click Identifier from URL parameters |
|`FCLID`| Facebook Click Identifier from URL parameters |
|`DCLID`| Google campaign manager Click Identifier |
|`GBRAID`| Google Click Identifier for iOS device from Web to App |
|`WBRAID`| Google Click Identifier for iOS device from App to Web |
|`KO_CLICK_ID`| Kochava Click Identifier from URL parameters |
|`MSCLKID`| Mircrosoft Click Identifier |
|`TTCLID`| TikTok Click Identifier |
|`TWCLID`| Twitter Click Identifier from URL parameter |

#### First-touch attribution

Amplitude captures the initial attribution data at the start of the first session. The first-touch attribution values are set when a user's attribution data are seen for the first time. The following user properties are set one time:

- `initial_utm_source`
- `initial_utm_medium`
- `initial_utm_campaign`
- `initial_utm_term`
- `initial_utm_content`
- `initial_referrer`
- `initial_referring_domain`
- `initial_gclid`
- `initial_fbclid`
- `initial_dclid`
- `initial_gbraid`
- `initial_ko_click_id`
- `initial_msclkid`
- `initial_ttclid`
- `initial_twclid`
- `initial_wbraid`

#### Multi-touch attribution

Amplitude captures the attribution data at the start of each session, and tracks some values as user properties. For campaign-related traffic where the URL or browser cookies include these values, the properties are set as user identity. For organic or direct traffic, these properties may not be available. Therefore, these user properties are unset from user identity.

For every new campaign, we capture the changes regardless of the state of the user session. You can configure `resetSessionOnNewCampaign` to `ture` to reset the session on every new campaign. The default behavior won't reset session on new campaign.

Amplitude tracks the following as user properties:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`
- `referrer`
- `referring_domain`
- `gclid`
- `fbclid`
- `dclid`
- `gbraid`
- `ko_click_id`
- `msclkid`
- `ttclid`
- `twclid`
- `wbraid`

For users who initially visits a page directly or organically, by default, the initial value is set to `"EMPTY"`. If you prefer a different initial value, set `attriubtion.initialEmptyValue` to any string value.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  attribution: {
    initialEmptyValue: "none",
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

You can configure Amplitude to reset the session on a new campaign. Do this by setting `attribution.resetSessionOnNewCampaign` to `true`. By default `attribution.resetSessionOnNewCampaign` is set to `false`.

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

You are able to configurate how the page view event get tracked. You can configure to fire a page view event when attribution information changed. Or specify the callback function to return a boolean to limit event volume on the page view tracking.

#### Track the page view event when the attribution changed

A page view event will be send along with the attribution properties when the attribution changed.

```ts
init(API_KEY, 'user@amplitude.com', {
  attribution: {
    trackPageViews: true,
  },
  pageViewTracking: {
    trackOn: 'attribution',
  }
});
```

#### Track the page view event based on specific criteria

You are able to pass a customized functions to track the page view event on specific criteria

```ts
init(API_KEY, 'user@amplitude.com', {
  attribution: {
    trackPageViews: true,
  },
  pageViewTracking: {
    trackOn: () => {
      return window.location.pathname === '/landing_page'
    },
  }
});
```

#### Track the page view event for changes on page history

You can set the `trackHistoryChanges` to `pathOnly` to only track the on path changes. By default, full page url will be considered into the page view changes.

```ts
init(API_KEY, 'user@amplitude.com', {
  attribution: {
    trackPageViews: true,
  },
  pageViewTracking: {
    trackHistoryChanges: 'pathOnly' // or 'all' by default
  }
});
```