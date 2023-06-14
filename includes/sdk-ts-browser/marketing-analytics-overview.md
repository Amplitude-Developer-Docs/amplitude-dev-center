Amplitude tracks marketing attribution to identify your user's traffic source using the UTM, referrer and click ID parameters.

#### UTM parameters

UTM (Urchin Traffic Monitor) parameters are useful for analyzing the effectiveness of different ad campaigns and referring sites. UTM parameters are case-sensitive, so they're treated as different values when the capitalization varies.

There are five different standard UTM parameters:

|<div class="med-column">Name</div>|Description|
|-|-|
|`utm_source`| This identifies which website sent the traffic (for example, Google, Facebook) |
|`utm_medium`| This identifies a specific campaign used (for example, "summer_sale") |
|`utm_campaign`| This identifies a specific campaign used (for example, "summer_sale") |
|`utm_term`| This identifies paid search terms used (for example, product+analytics) |
|`utm_content` | This identifies what brought the user to the site and is commonly used for A/B testing (for example, "bannerlink", "textlink") |

Here is an example URL with UTM parameters:

```html
https://www.amplitude.com/?utm_source=newsletter&utm_campaign=product_analytics_playbook&utm_medium=email&utm_term=product%20analytics&utm_content=bannerlink
```

#### Referrer parameters

Referrer is the URL of the page that linked to the destination page. Amplitude tracks the following parameters:

|<div class="big-column">Name</div>|Description|
|-|-|
|`referrer`| The last page the user was on (for example, `https://amplitude.com/behavioral-analytics-platform?ref=nav`) |
|`referring_domain`| The domain that the user was last on (for example, `https://amplitude.com`) |

Referrer is an empty string (`''`) if the user navigated to the destination page directly.

#### Click ID parameters

Click IDs are campaign identifiers included as URL query parameters. Ad platforms use these IDs to identify the campaign and other attributes. While Amplitude doesn't have access to further campaign attributes associated to Click IDs, Amplitude can track Click ID values specified in the following table.

|<div class="med-column">Name</div>|Description|
|-|-|
|`dclid`| Google Click Identifier from URL parameters |
|`fbclid`| Facebook Click Identifier from URL parameters |
|`gbraid`| Google campaign manager Click Identifier |
|`gclid`| Google Click Identifier for iOS device from Web to App |
|`ko_click_id`| Google Click Identifier for iOS device from App to Web |
|`li_fat_id`| Kochava Click Identifier from URL parameters |
|`msclkid`| Microsoft Click Identifier |
|`rtd_cid`| TikTok Click Identifier |
|`ttclid`| Twitter Click Identifier from URL parameter |
|`twclid`| Linkedin Click identifier |
|`wbraid`| Reddit campaign tracking/attribution Click identifier |

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
- `initial_li_fat_id`
- `initial_rdt_cid`

#### Multi-touch attribution

Amplitude captures the attribution data at the start of each session, and sets those values as user properties. For organic or direct traffic, these properties may not be available. Therefore, these user properties are unset from user identity.

For every new campaign (when new attribution data is seen), Amplitude captures the changes regardless of the state of the user session. You can configure `resetSessionOnNewCampaign` to `true` to reset the session on every new campaign. The default behavior is to not reset the session on new campaign.

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
- `li_fat_id`
- `rdt_cid`
