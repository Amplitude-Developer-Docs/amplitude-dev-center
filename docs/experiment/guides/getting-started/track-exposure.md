---
title: Track Exposure
description: How to track an exposure event for the variant which a user has been exposed to.
---

[Exposure tracking]() plays a key role in tracking if and when a user has actually viewed the variable experience from your feature flag. Exposure tracking may be considered optional for feature flags don't require any analysis; however, it is essential when running experiment, since accurate exposure tracking is crucial for reliable results.

## Analytics REST API

To keep things simple, we're going to track an [exposure event]() on the [Analytics REST API 2.0]() using `curl`.

```
curl --request POST \
     --url https://api2.amplitude.com/2/httpapi \
     --data '{"api_key": "<ANALYTICS_API_KEY>","events":[{"event_type":"$exposure","user_id":"<USER_ID>","event_properties":{"flag_key":"<FLAG_KEY>","variant":"<VARIANT>"}}]}'
```

* `<ANALYTICS_API_KEY>`: The analytics api key from project which you created your flag and deployment in.
* `<USER_ID>`: the user ID used to fetch variants.
* `<FLAG_KEY>`: The flag key; `getting-started` if you're using the naming from this guide.
* `<VARIANT>`: The variant key, `on` if you're using the default flag variant.

If the request succeeded, you should see a user in the Exposures chart in Experiment.

!!!success "Done!"
    Your flag is now active within your deployment and a user has been evaluated and exposed to a variant.

## SDKs

As with fetching variants, exposure tracking can be simplified by using a [client-side Experiment SDK]() in your application. Client-side Experiment SDKs come equipped with the ability to [automatically track exposures]() through your installed analytics SDK whenever a variant is accessed from the variant store.

TODO