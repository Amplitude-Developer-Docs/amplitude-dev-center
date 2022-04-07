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

CDN caches the exact request that was received. If there's any change in the URL or any of its parameters, it will be a cache miss.

Examples Requests:

- The /sdk/vardata end point is the endpoint that all our SDKs hit. The context part here contains the device_id, user_id and other user properties sent in the request\
    [https://api.lab.amplitude.com/sdk/vardata/{base-64-encoded-context}](https://api.lab.amplitude.com/sdk/vardata/%7Bbase-64-encoded-context%7D)
- The /v1/vardata end point is the REST API endpoint used to retrieve flag(s) for a user.\
    <https://api.lab.amplitude.com/v1/vardata?device_id=d1&user_id=u1&context=%7B%22country%22%3A%22United%20States%22%7D>

### Cache Hits

There will be a cache hit only if it's the exact same request: there's no change in user_id, no change in device_id, and no change in any of the other user properties sent in the context. It's also important that it hasn't been 60 minutes since the last time the request was cached.

### Cache Invalidation

To make sure you don't get stale results when your underlying flags have changed, we invalidate (delete) cached results for an entire deployment whenever a flag or experiment associated with that deployment is updated. I other words, as our SDKs retrieve results for all experiments and feature flags for a given deployment for a user, we invalidate all results for a given deployment every time there's a change in even a single flag associated with a deployment. We also invalidate all requests cached for a deployment every time the deployment is added to a flag or removed from a flag.

------------

STILL TODO

### Caching for Amplitude Analytics data for Targeting

We allow customers to target users based on the data received by Amplitude Analytics. Experiment allows leveraging two types of Analytics data for targeting: behavioral cohorts and Amplitude user properties.

#### Behavioral Cohorts

If you want to target an experiment to users that exhibit a certain behavior, you can use our powerful Behavioral Cohorts to do that. When you add a Cohort as a targeting rule to the Experiment, we immediately compute all users that belong to the Cohort and any request for the users in the Cohort will resolve to the right variant immediately and there's no delay here. If you are using a Dynamic Cohort where users are being added to a cohort or being removed from the cohort frequently, they are only refreshed once every 60 minutes. It's possible that a user's experiment results are delayed by a max of 60 minutes since the user exhibited a cohort behavior.

!!!note
    we also have a 60-minute caching on the CDN which doesn't get invalidated when a user enters or leaves a cohort. So, in the worst-case scenario, it's possible that there is a max delay of 120 minutes when using Behavioral Cohorts.

#### Amplitude User Properties

You can also use the user properties you have sent to Amplitude for a user to target users for an experiment. Every request to our server retrieves the most recent value seen by Amplitude for the user and does the evaluation based on the most recent value. It is also possible that the user's property (e.g. Language) has changed and the user hasn't performed an analytics event yet; in that case, we will have a stale value for the user based on the most recent value in our systems. If you have access to a user's most recent property on the evaluation side, you can send the property in the request. We prioritize properties received in the request for evaluation over properties stored in the Amplitude Analytics metadata store.

!!!note
    We have a 60-minute caching on the CDN which doesn't get invalidated when the user's property changes in Amplitude Analytics. In the worst-case scenario, it's possible that there's a max delay of 60 minutes before we start using the most recent value seen by Amplitude Analytics.

### Cache FAQs

#### Are there any delays while accessing un-cached data?

When an Experiment is being deployed for the very first time for a user and no responses have been saved on the CDN, that response will be uncached - that means that there will be a delay before the flag is delivered to the application. This delay can take up to ~250ms on average, whereas cached responses take <1ms on average.

TODO: Update ^above^ latency numbers

#### If I change the flag configuration do I have to wait for updated results?

No. Every time there's a flag configuration update, we invalidate the CDN cache for all associated deployments and you will get fresh results for all users.
