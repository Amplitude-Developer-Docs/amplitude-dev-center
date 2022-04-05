---
title: Performance & Caching
description: Information on Experiment's evaluation performance and experiment results caching infrastructure.
---

TODO: Refactor & Rewrite

Powerful experimentation has three important components:

- Robust Identity Resolution System
- Access to User Metadata Store
- Access to Behavioral Cohorts

At Amplitude, we have built the necessary components required for running powerful experiments. To leverage these capabilities, we recommend making a request to our endpoint for each individual user. We have built a highly available and performant system to alleviate concerns around an external call in your application.

Performance over the last 7 days:\
CDN Hits (Approximately, 60% of requests)

| Average | P95 |
| --- | --- |
| 0.15ms | <1ms |

CDN Misses (Approximately 40% of requests)

| Average | P95 |
| --- | --- |
| 220ms | 370ms |

For the rare occurrence that our systems go down, we support and strongly recommend using local defaults for all your experiments.

## Implementation Recommendations

- Use Local Defaults: All our SDKs support local defaults for experiments. For the rare occurrence that our systems go down, we support and strongly recommend using local defaults for all your experiments
- Use Local Storage (Cache) on Client SDKs: our client side SDKs store user variants in local storage. Leverage this to reduce network calls being made from the client.

## Architecture

- Leverage Fastly CDN: All requests to our servers are routed through Fastly, which is one of the best CDNs out there.
- Leverage reliable hosted AWS services: We use Application Load Balancer, Relational Databases, and DynamoDB which guarantee high availability.

![Experiment Evaluation Architecture]( /../assets/images/experiment-architecture.png)

--8<-- "includes/abbreviations.md"

-----------------

After a response for a request has been computed and retrieved, it's cached so it can be reused to make future requests faster.

## Experiment CDN Caching

A CDN (Content Delivery Network) refers to a geographically distributed group of servers that work together to provide fast delivery of Internet content. Experiment uses a CDN (Content Delivery Network) to cache the experiments and feature flags a user belongs to.

### Time to live for cache

Requests to Experiment's server are cached on the CDN for 60 minutes. It's a TTL (time-to-live) cache and expires after 60 minutes independent of the key being accessed or not in the 60 minutes. In other words, the 60 minutes cache time starts from the first-page load.

### Cache key

CDN caches the exact request that was received. If there's any change in the URL or any of its parameters, it will be a cache miss.

Examples Requests:

- The /sdk/vardata end point is the endpoint that all our SDKs hit. The context part here contains the device_id, user_id and other user properties sent in the request\
    [https://api.lab.amplitude.com/sdk/vardata/{base-64-encoded-context}](https://api.lab.amplitude.com/sdk/vardata/%7Bbase-64-encoded-context%7D)
- The /v1/vardata end point is the REST API endpoint used to retrieve flag(s) for a user.\
    <https://api.lab.amplitude.com/v1/vardata?device_id=d1&user_id=u1&context=%7B%22country%22%3A%22United%20States%22%7D>

### Cache hits

There will be a cache hit only if it's the exact same request: there's no change in user_id, no change in device_id, and no change in any of the other user properties sent in the context. It's also important that it hasn't been 60 minutes since the last time the request was cached.

### When is the cache invalidated?

To make sure you don't get stale results when your underlying flags have changed, we invalidate (delete) cached results. As our SDKs retrieve results for all experiments and feature flags for a given deployment for a user, we invalidate all results for a given deployment every time there's a change in even a single flag associated with a deployment. We also invalidate all requests cached for a deployment every time the deployment is added to a flag or removed from a flag.

### Are there any delays while accessing un-cached data?

When an Experiment is being deployed for the very first time for a user and no responses have been saved on the CDN, that response will be uncached - that means that there will be a delay before the flag is delivered to the application. This delay can take up to ~250ms on average, whereas cached responses take <1ms on average.


### Changing the flag configuration

If I make any changes to the flag configuration, do I have to wait for 60 minutes to see the new results?
No. Every time there's a flag configuration update, we invalidate the CDN cache and you will get fresh results

## Caching for Amplitude Analytics data for Targeting

We allow customers to target users based on the data received by Amplitude Analytics. Experiment allows leveraging two types of Analytics data for targeting: behavioral cohorts and Amplitude user properties.

### Behavioral Cohorts

If you want to target an experiment to users that exhibit a certain behavior, you can use our powerful Behavioral Cohorts to do that. When you add a Cohort as a targeting rule to the Experiment, we immediately compute all users that belong to the Cohort and any request for the users in the Cohort will resolve to the right variant immediately and there's no delay here. If you are using a Dynamic Cohort where users are being added to a cohort or being removed from the cohort frequently, they are only refreshed once every 60 minutes. It's possible that a user's experiment results are delayed by a max of 60 minutes since the user exhibited a cohort behavior.

!!!note
    we also have a 60-minute caching on the CDN which doesn't get invalidated when a user enters or leaves a cohort. So, in the worst-case scenario, it's possible that there is a max delay of 120 minutes when using Behavioral Cohorts.

### Amplitude User Properties

You can also use the user properties you have sent to Amplitude for a user to target users for an experiment. Every request to our server retrieves the most recent value seen by Amplitude for the user and does the evaluation based on the most recent value. It is also possible that the user's property (e.g. Language) has changed and the user hasn't performed an analytics event yet; in that case, we will have a stale value for the user based on the most recent value in our systems. If you have access to a user's most recent property on the evaluation side, you can send the property in the request. We prioritize properties received in the request for evaluation over properties stored in the Amplitude Analytics metadata store.

!!!note
    We have a 60-minute caching on the CDN which doesn't get invalidated when the user's property changes in Amplitude Analytics. In the worst-case scenario, it's possible that there's a max delay of 60 minutes before we start using the most recent value seen by Amplitude Analytics.
