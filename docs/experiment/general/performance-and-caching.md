---
title: Performance & Caching
description: Information on Experiment's evaluation performance and experiment results caching infrastructure.
---

Amplitude Experiment [evaluation]() supports two modes, [local]() and [remote](), each with different performance metrics and tradeoffs.

## Remove Evaluation

### Performance

| Cache | Average | P95 | % of Requests |
| --- | --- | --- | --- |
| HIT | 0.15ms | <1ms | 60% |
| MISS | 220ms | 370ms | 40% |

TODO: Update numbers -- is it really correct to say that a cache hit resolves in < ms? network latency from the caller would be much higher than that.

### Architecture

- CDN: All requests to our servers are routed through our CDN provider, [Fastly](fastly.com).
- Reliable AWS services: We use Application Load Balancer, Relational Databases, and DynamoDB which guarantee high availability.

TODO: Redo diagram

![Experiment Evaluation Architecture]( /../../assets/images/experiment-architecture.png)

--8<-- "includes/abbreviations.md"

!!!info "Best Practice"
    On the rare occurrence that our systems go down, we recommend using local defaults for all your experiments.

## Local Evaluation

### Performance

Local evaluation does not require a network request per user evaluation, and therefore performance depends mostly on the hardware and SDK (language) used.

The following results were collected over 10 executions of 10,000 iterations of evaluation with randomized user inputs evaluated for 1 of 3 flag configurations selected at random.

| SDK | Average | Median | Cold Start |
| --- | --- | --- | --- |
| Node.js | 0.40ms | 0.38ms | 15ms |

TODO: Update numbers and add languages -- rerun benchmarks for updated optimized package and benchmark Java & Go

### Architecture

TODO

## CDN Caching

After a response for a request has been computed and retrieved, it's cached so it can be reused to make future requests faster. Experiment uses a CDN to cache the experiments and feature flags for a user for low latency access on subsequent requests.

!!!info "Content Delivery Network"
    A CDN (Content Delivery Network) refers to a geographically distributed group of servers that work together to provide fast delivery of Internet content.

### Cache Time-to-live (TTL)

Requests to Experiment's server are cached on the CDN for 60 minutes. It's a TTL (time-to-live) cache and expires after 60 minutes independent of the key being accessed or not in the 60 minutes. In other words, the 60 minutes cache time starts from the first-page load.

### Cache Key

The CDN caches the exact request received, including user information. In short, any change in user info will always miss the CDN cache (unless that exact same request has been cached previously).

### Cache Invalidation

To make sure you don't get stale results when your underlying flags have changed, we invalidate (delete) cached results for an entire deployment whenever a flag or experiment associated with that deployment is updated. I other words, as our SDKs retrieve results for all experiments and feature flags for a given deployment for a user, we invalidate all results for a given deployment every time there's a change in even a single flag associated with a deployment. We also invalidate all requests cached for a deployment every time the deployment is added to a flag or removed from a flag.

### Dynamic Targeting Cache Considerations

Amplitude Experiment allows you to target feature-flags and experiments based on dynamic properties (user properties and behavioral cohorts) synced from Amplitude Analytics. Since these properties are not included in the fetch request, you may be receiving cached experiment results for up to an hour (the TTL) until the cache misses and the user is re-evaluated with the most recent dynamic properties.

#### Amplitude User Properties

Amplitude Experiment's remote evaluation servers allow for targeting based on user properties previously identified with the user. Since the CDN caches responses based only on user properties passed explicitly in the request, the caller may still receive stale results for up to 1 hour, even if the user properties in Amplitude Analytics are updated and would cause the user to be evaluated into a different variant.

!!!info "Best Practice"
    User properties used in time-sensitive targeting rules should be explicitly passed to the variant fetch request in order to receive the most up-to-date variants for a user.

#### Behavioral Cohorts

You may want to use behavior cohorts defined in Amplitude Analytics in your flag and experiment targeting. Since experiment cohorts are computed hourly, and the CDN cache TTL is also hourly, a user may be delayed from being targeted to a variant for up-to 2 hours in the worst case.

!!!info "Best Practice"
    We recommend only using dynamic cohort targeting for flags and experiments where the inclusion in a variant of a flag is not time-sensitive.
