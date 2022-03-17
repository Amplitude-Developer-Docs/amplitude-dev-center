---
title: Performance and Scaling
description: 
---

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
