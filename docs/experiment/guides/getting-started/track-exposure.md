---
title: Track Exposure
description: How to track an exposure event for the variant which a user has been exposed to.
template: guide-last.html
---

[Exposure tracking](../../general/exposure-tracking.md) plays a key role in tracking if and when a user has actually viewed the variable experience from your feature flag. Exposure tracking may be considered optional for feature flags which don't require analysis; however, it is essential when running experiment. Accurate exposure tracking is crucial for reliable results.

## Analytics REST API

To keep things simple, we're going to `curl` an [exposure event](../../general/exposure-tracking.md#exposure-event) to amplitude using the [Analytics REST API v2.0](../../../analytics/apis/http-v2-api.md).

```
curl --request POST \
     --url https://api2.amplitude.com/2/httpapi \
     --data '{"api_key": "<ANALYTICS_API_KEY>","events":[{"event_type":"$exposure","user_id":"<USER_ID>","event_properties":{"flag_key":"<FLAG_KEY>","variant":"<VARIANT>"}}]}'
```

Replace the following variables with your own values:

| <div class='big-column'>Variable</div> | Description |
| --- | --- |
|   `<ANALYTICS_API_KEY>` | The analytics API key from [project](../../general/data-model.md#projects) which you created your [flag](../../general/data-model.md#flags-and-experiments) and [deployment](../../general/data-model.md#deployments) in. |
| `<USER_ID>` | The user ID used to fetch variants. This should be the same [user](../../general/data-model.md#users) you [fetched variants](./fetch-variants.md) for. |
| `<FLAG_KEY>` | The flag key; `getting-started` if you're using the naming from this guide. |
| `<VARIANT>` | The variant key, `on` if you're using the default flag variant. |

If the request succeeded, you should see a user in the Exposures chart in Experiment.

!!!success "Done!"
    Your flag is now active within your deployment and a user has been evaluated and exposed to a variant.

## SDKs

As with fetching variants, exposure tracking can be simplified by using a client-side [Experiment SDK](../../index.md#sdks) in your app. Client-side Experiment SDKs come equipped with the ability to [automatically track exposures](../../general/exposure-tracking.md#automatic-exposure-tracking) through your installed analytics SDK whenever a variant is accessed from the variant store.
