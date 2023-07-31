You can also use advanced configuration for better control of when page views event are sent.

???config "Tracking page views options"
    |<div class="big-column">Name</div>|Value|Description|
    |-|-|-|
    `config.defaultTracking.pageViews.trackOn` | Optional. `"attribution"` or `() => boolean` | Provides advanced control on when page view events are tracked.<br /><br />You can omit or set the value to `undefined`,  and configure page view events to be tracked on initialization.<br /><br />You can set the value to `"attribution"` and configure page view events to be tracked only when web attribution are tracked.<br /><br />You can set the value to a function that returns a boolean (`true` or `false`) and configure page view events to be tracked based on your criteria.|
    `config.defaultTracking.pageViews.trackHistoryChanges` | Optional. `"pathOnly"` or `"all"` | Provides advanced control for single page application on when page views are tracked.<br /><br />You can omit or set the value to `"all"`, and configure page view events to be tracked on any navigation change to the URL within your single page application. For example: navigating from `https://amplitude.com/#company` to `https://amplitude.com/#blog`.<br /><br />You can omit or set the value to "pathOnly",  and configure page view events to be tracked on navigation change to the URL path only within your single page application. For example: navigating from `https://amplitude.com/company` to `https://amplitude.com/blog`.|
    `config.defaultTracking.pageViews.eventType` | Optional. `string` | Customize the event_type for page view event. |

For example, you can configure Amplitude to track page views only when the URL path contains a certain substring, let’s say “home”. Refer to the code sample for how to achieve this.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  defaultTracking: {
    pageViews: {
      trackOn: () => {
        return window.location.pathname.includes('home');
      },
    },
  },
});
```

The following information is tracked in the page view events.

|<div class="big-column">Name</div>| Description| Default Value|
|---|----|---|
|`event_type`| `string`. The event type for page view event. Configurable through `defaultTracking.pageViews.eventType` or enrichment plugin. | `[Amplitude] Page Viewed` from version 1.9.1. |
|`event_properties.[Amplitude] Page Domain`| `string`. The page domain. | location.hostname or ''. |
|`event_properties.[Amplitude] Page Location`| `string`. The page location. | location.href or ''. |
|`event_properties.[Amplitude] Page Path`| `string`. The page path. | location.path or ''.|
|`event_properties.[Amplitude] Page Title`| `string`. The page title. | document.title or ''.|
|`event_properties.[Amplitude] Page URL`| `string`. The value of page url. | location.href.split('?')[0] or ``.|
|`event_properties.${CampaignParam}`| `string`. The value of `UTMParameters` `ReferrerParameters` `ClickIdParameters` if has any. Check [here](./#web-attribution) for the possible keys. | Any undefined campaignParam or `undefined`. |

Check [this example](https://github.com/amplitude/Amplitude-TypeScript/blob/main/examples/plugins/page-view-tracking-enrichment/index.ts) to understand how to enrich default page view events, such as adding more properties along with page view tracking.
