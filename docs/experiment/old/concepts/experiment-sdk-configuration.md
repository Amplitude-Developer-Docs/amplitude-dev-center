---
title: Configuring Experiment SDKs
description: Reference for SDK configurations used by Amplitude Experiment client-side and server-side SDKs.
---

Each SDK can be configured on initialization. Configurations differ between client and server SDKs and may contain language/platform dependent variations.

<!-- Note for Brian G: consider adding a few example configs for diff SDKs and scenarios. There is a demand for this!-->

## Client-side

| <div class="big-column">Name</div> | Description | Default Value |
| --- | --- | --- |
| `debug` | Enable additional debug logging within the SDK and add an option to all fetch requests for viewing in the UI request debugger. Must be disabled in production builds. | `false` |
| `fallbackVariant` | The default variant to fall back if the a variant for the provided key does not exist. | `{}` |
| `initialVariants` | An initial set of variants to access. This field is valuable for bootstrapping the client SDK with values rendered by the server using server-side rendering (SSR). | `{}` |
| `serverUrl` | The host to fetch variants from. | `https://api.lab.amplitude.com` |
| `fetchTimeoutMillis` | The timeout for fetching variants in milliseconds. | `10000` |
| `retryFetchOnFailure` | Whether or not to retry variant fetches in the background if the request does not succeed. | `true` |
| `automaticExposureTracking` | If true, calling `variant()` will track an exposure event through the configured `exposureTrackingProvider`. If no exposure tracking provider is set, this configuration option does nothing. See [Exposure Tracking](https://developers.experiment.amplitude.com/docs/exposure-tracking) for more information about tracking exposure events. | `true` |
| `automaticFetchOnAmplitudeIdentityChange` | Only matters if you use the `initializeWithAmplitudeAnalytics` initialization function to seamlessly integrate with the Amplitude Analytics SDK.   If `true` any change to the user ID, device ID or user properties from analytics will trigger the experiment SDK to fetch variants and update it's cache. | `false` |
| `userProvider` | An interface used to provide the user object to `fetch()` when called. See [Experiment User](https://developers.experiment.amplitude.com/docs/experiment-user#user-providers) for more information. | `null` |
| `exposureTrackingProvider` | Implement and configure this interface to track exposure events through the experiment SDK, either automatically or explicitly. | `null` |

## Server-side

| <div class="big-column">Name</div>  | Description | Default Value |
| --- | --- | --- |
| `debug` | Enable additional debug logging. | `false` |
| `serverUrl` | The host to fetch variants from. | `https://api.lab.amplitude.com` |
| `fetchTimeoutMillis` | The timeout for fetching variants in milliseconds. This timeout only applies to the initial request, not subsequent retries | `10000` |
| `fetchRetries` | The number of retries to attempt if a request to fetch variants fails. | `8` |
| `fetchRetryBackoffMinMillis` | The minimum (initial) backoff after a request to fetch variants fails. This delay is scaled by the `fetchRetryBackoffScalar` | `500` |
| `fetchRetryBackoffMaxMillis` | The maximum backoff between retries. If the scaled backoff becomes greater than the max, the max is used for all subsequent requests | `10000` |
| `fetchRetryBackoffScalar` | Scales the minimum backoff exponentially. | `1.5` |
| `fetchRetryTimeoutMillis` | The request timeout for retrying variant fetches. | `10000` |