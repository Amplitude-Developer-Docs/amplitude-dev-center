---
title: Performance & Caching
description: Information on Experiment's evaluation performance and experiment results caching infrastructure.
---

Amplitude Experiment [evaluation](./evaluation/implementation.md) supports two modes, [local](./evaluation/local-evaluation.md) and [remote](./evaluation/remote-evaluation.md), each with different performance metrics and tradeoffs.

## Performance

Evaluation performance depends on what kind of evaluation is used.

### Remote evaluation

[Remote evaluation](./evaluation/remote-evaluation.md) utilizes [Fastly](https://fastly.com) to [cache](#cdn-caching) evaluation results for a user. Cache hits serve variants from the edge, greatly improving performance.

<!-- TODO: tabs with different tables and values per region -->

| Cache | Average | P95 | % of Requests |
| --- | --- | --- | --- |
| HIT | 0.15ms | <1ms | 47.17% |
| MISS | 166.43ms | 201.00ms | 52.83% |

### Local evaluation

[Local evaluation](./evaluation/local-evaluation.md) pre-fetches flag configurations which are then used to evaluate all users, saving a network request and speeding up evaluation compared to remote evaluation.

The following results are for **a single flag evaluation**, and were collected over 10 executions of 10,000 iterations of evaluation with randomized user inputs evaluated for 1 flag configuration, selected at random out of 3 possible flag configurations.

| SDK | Average | Median | Cold Start |
| --- | --- | --- | --- |
| [:material-nodejs: Node.js](experiment/sdks/nodejs-sdk) | 0.025ms | 0.018ms | 3ms |
| [:fontawesome-brands-golang: Go](experiment/sdks/go-sdk) | 0.098ms | 0.071ms | 0.7ms |
| [:material-language-java: JVM](experiment/sdks/jvm-sdk) | 0.007ms | 0.005ms | 6ms |

## CDN caching

!!!info "Content Delivery Network"
    - A CDN (Content Delivery Network) refers to a geographically distributed group of servers that work together to provide fast delivery of Internet content.
    - CDN caching policy is only relevant to [remote evaluation](./evaluation/remote-evaluation.md) performance.

After a response for a request has been computed and retrieved, it's cached so it can be reused to make future requests faster. Experiment uses a CDN to cache the experiments and feature flags for a user for low latency access on subsequent requests.

### Cache time-to-live (TTL)

Requests to Experiment's server are cached on the CDN for 60 minutes. It's a TTL (time-to-live) cache and expires after 60 minutes independent of the key being accessed or not in the 60 minutes. In other words, the 60 minutes cache time starts from the first-page load.

### Cache key

The CDN caches the exact request received, including user information. In short, any change in user info always misses the CDN cache (unless that exact same request has been cached previously).

### Cache invalidation

To make sure you don't get stale results when your underlying flags have changed, Experiment invalidates (deletes) cached results for an entire deployment whenever a flag or experiment associated with that deployment is updated. In other words, as the SDKs retrieve results for all experiments and feature flags for a given deployment for a user, Experiment invalidates all results for a given deployment every time there's a change in even a single flag associated with a deployment. Experiment also invalidates all requests cached for a deployment every time the deployment is added to a flag or removed from a flag.

### Dynamic targeting cache considerations

Amplitude Experiment allows you to target feature-flags and experiments based on dynamic properties (user properties and behavioral cohorts) synced from Amplitude Analytics. Because these properties aren't included in the fetch request, you may be receiving cached experiment results for up to an hour (the TTL) until the cache misses and the user is re-evaluated with the most recent dynamic properties.

#### Amplitude user properties

Amplitude Experiment's remote evaluation servers allow for targeting based on user properties previously identified with the user. Since the CDN caches responses based only on user properties passed explicitly in the request, the caller may still receive stale results for up to 1 hour, even if the user properties in Amplitude Analytics are updated and would cause the user to be evaluated into a different variant.

!!!info "Best Practice"
    User properties used in time-sensitive targeting rules should be explicitly passed to the variant fetch request to receive the most up-to-date variants for a user.

#### Behavioral cohorts

You may want to use behavioral cohorts defined in Amplitude Analytics in your flag and experiment targeting. Since experiment cohorts are computed hourly, and the CDN cache TTL is also hourly, a user may be delayed from being targeted to a variant for up-to 2 hours in the worst case.

!!!info "Best Practice"
    AmplExperiement recommends only using dynamic cohort targeting for flags and experiments where the inclusion in a variant of a flag isn't time-sensitive.
