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

![Experiment Evaluation Architecture]( /../assets/images/experiment-architecture.png)

--8<-- "includes/abbreviations.md"

!!!info "Best Practice"
    For the rare occurrence that our systems go down, we support and strongly recommend using local defaults for all your experiments.

## Local Evaluation

### Performance

Local evaluation performance happens without any network required, and depends mostly on the hardware and SDK used.

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

### Advanced Targeting Cache Considerations

We allow customers to target users based on the data received by Amplitude Analytics. Experiment allows leveraging two types of Analytics data for targeting: user properties and behavioral cohorts.

#### Amplitude User Properties

Amplitude Experiment's remote evaluation servers allow for targeting based on user properties previously identified with the user. Since the CDN caches responses based only on user properties passed explicitly in the request, the caller may still receive stale results for up to 1 hour, even if the user properties in Amplitude Analytics are updated and would cause the user to be evaluated into a different variant.



!!!info "Best Practice"
    User properties used in time-sensitive targeting rules should be explicitly passed to the variant fetch request in order to receive the most up-to-date variants for a user.

--------

#### Behavioral Cohorts

If you want to target an experiment to users that exhibit a certain behavior, you can use our powerful Behavioral Cohorts to do that. When you add a Cohort as a targeting rule to the Experiment, we immediately compute all users that belong to the Cohort and any request for the users in the Cohort will resolve to the right variant immediately and there's no delay here. Dynamic Cohorts are recomputed every hour, so it's possible that  user's updated evaluation results are delayed by a max of 60 minutes since the user exhibited a cohort behavior.

!!!note
    we also have a 60-minute caching on the CDN which doesn't get invalidated when a user enters or leaves a cohort. So, in the worst-case scenario, it's possible that there is a max delay of 120 minutes when using Behavioral Cohorts.



### Cache FAQs

#### Are there any delays while accessing un-cached data?

When an Experiment is being deployed for the very first time for a user and no responses have been saved on the CDN, that response will be uncached - that means that there will be a delay before the flag is delivered to the application. This delay can take up to ~250ms on average, whereas cached responses take <1ms on average.

TODO: Update ^above^ latency numbers

#### If I change the flag configuration do I have to wait for updated results?

No. Every time there's a flag configuration update, we invalidate the CDN cache for all associated deployments and you will get fresh results for all users.
