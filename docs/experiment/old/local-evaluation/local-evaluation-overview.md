---
title: Local Evaluation Overview
description: Documentation on Amplitude Experiment local evaluation architecture, performance, and best-practices.
---

An overview of the experiment local evaluation alpha.

This document serves as an overview of local evaluation: terms, tradeoffs, best practices, and performance benchmarks.

## Glossary

`User`

: Information about the end user. Contains the user's identifier (`user_id`, `device_id` ) and additional contextual information. Used as input to evaluation.

`Flag Config`

: Contains all the flag's information (key, description, targeting rules, allocations, etc.) used for local evaluation.

`Evaluation`

: A function which takes a *user* and a set of *flag configs* as inputs, and outputs a set of *variants* which have been assigned to the user.

`Variant`

: The variation of a flag which has been assigned to a user.

`Local Flag`

: A flag configuration with limited targeting/segmentation capabilities. Able to be evaluated locally on a customer's server or remotely on Amplitude Experiment's evaluation servers.

`Remote Flag`

: A flag configuration with fully featured targeting/segmentation capabilities. Can only be evaluated remotely on Amplitude Experiment's evaluation servers.

`Local Evaluation`

: Evaluation which runs on either a customer's server. Can only evaluate *local flags*.

`Remote Evaluation`

: Evaluation running on Amplitude Experiment's evaluation api servers. Can evaluate either *local* or *remote flags*.

## Overview

Put simply, local evaluation means evaluating variant assignments for a user without needing to- make a network request to Amplitude Experiment's evaluation servers. By removing the network request requirement, local evaluation greatly reduces latency and network overhead, but gives up the ability to utilize the advanced targeting provided by Amplitude.

![workflow of server evaluation](../assets/images/experiment-server-evaluation.png)
## Use Cases

- Landing Page Experiments: When experimenting on a brand new, anonymous user for the first time, a remote evaluation will *always* miss the CDN cache, leading to ~250ms performance hit. By performing local evaluation on the server-side we can effectively reduce the performance penalty caused by remote evaluation latency by 100x--from ~250ms to <2.5ms.

## Tradeoffs

One of the most important benefits of using Amplitude Experiment over competitors is being able to integrate seamlessly with Amplitude Analytics for amplitude ID bucketing and targeting based on user properties, behavioral cohorts, and other enriched user data.

However, when latency is a concern, it is often better to perform local evaluation in order to circumvent a network request or avoid a CDN cache miss. In addition, some flags may simply not use any advanced targeting capibilities, and thus not require remote evaluation.

| Feature | Remote Evaluation | Local Evaluation |
| --- | --- | --- |
| Deterministic Randomized Bucketing | ✅ | ✅ |
| Individual Users Targeting | ✅ | ✅ |
| Percentage Rollouts | ✅ | ✅ |
| Variant Distributions | ✅ | ✅ |
| Amplitude ID Resolution/Bucketing | ✅ | ❌ |
| Targeting Synced Amplitude User Properties | ✅ | ❌ |
| Sticky Bucketing | ✅ | ❌ |
| Targeting Amplitude Cohorts | ✅ | ❌ |

### Caveat: Amplitude ID Resolution/Bucketing

Amplitude Experiment's remote evaluation utilizes Amplitude's identity resolution to identify the same user across multiple devices/platforms and between logins. More specifically, experiment utilizes the Amplitude ID for bucketing. This allows for a user to always get bucketed into the same variant, regardless of login status or which device they are using.

Since local evaluation cant resolve the user's `device_id` and `user_id` into an `amplitude_id` from Amplitude's ID resolution service, local flags used for local evaluation must use either the `device_id` or `user_id` for bucketing. We recommend using the `device_id` as the bucketing key for local flags, since it is not effected by the user's log in status and

#### Caveat: Targeting Synced Amplitude User Properties

Remote evaluations on remote flags allow you to target users based on user properties that have been previously identified with the user via Amplitude Analytics and synced with Experiment. With local evaluation on local flags, targeting user properties via rule-based user segments requires that the developer input the user properties directly into the user object that is passed to the evaluation function. In short, targeting user properties in local evaluation is possible, but not automatic.

#### Caveat: Sticky Bucketing

Local evaluation cannot enable sticky bucketing since it is unable to use synced Amplitude user properties. Modifying targeting rules outside of percentage allocation may cause a user to be assigned a different variant.

#### Caveat: Targeting Amplitude Cohorts

Remote evaluation on remote flags allow you to target users based on whether or not they belong to a cohort. Local evaluation of local flags does not allow this targeting feature.

## Best Practices

Switching to local evaluation from remote evaluation is not easy. It may be difficult to conceptualize tradeoffs and limitations without a deep understanding of Amplitude Experiment and the evaluation process. Ultimately

###  Bucketing

We recommend using `device_id` as the bucketing key for locally evaluated flags.

The bucking key is the field used as input to the hash function which determines which variant a user is assigned to when there is some randomization factor. In remote evaluation, the `amplitude_id` resolved from the `user_id` and `device_id` is used as the default bucketing key. Since local evaluation cannot rely on the amplitude ID resolution service, we must use either `device_id` or `user_id` to bucket the user.

Since local evaluation is best suited for first time, anonymous users who do not have a `user_id`, bucking by `device_id` is almost always preferred, unless you are sure that the user will always be logged in when the experiment evaluation occurs.

### Targeting

We recommend keeping targeting as simple as possible, using variant distribution and allocation as much as possible. Explicit user properties can be used for more advanced targeting use cases.

Targeting rules with local flag should primarily rely on variant distribution and allocation. User properties can be used in more advanced use cases with the understanding that *all user properties used in targeting must be explicitly passed into user object prior to evaluation.*

### Bootstrapping

We recommend bootstrapping the client-side SDK with locally evaluated variants in order allow for remote evaluation from the client side after the page loads.

Local evaluation and server-side rendering using the server-side SDK can be used in alongside the client-side SDK by bootstrapping the experiment client sdk instance with the locally evaluated flags. When the client side SDK renders you may evaluate remote flags for the same user in the background.

### Exposure

We recommend bootstrapping the client-side SDK with locally evaluated variants in conjunction with using an analytics provider to enable client-side exposure tracking.

Unlike remote evaluation, local evaluation does not track assignment events. Therefore, we must rely on exposure events sent client side for tracking when a user has been exposed to a variant for analysis. You may either use your own analytics events to track exposure or utilize the bootstrapped client-side SDK with exposure tracking.

## Performance

The main goal of local evaluation is increased performance (reduced latency) when evaluating variants for a user. This section goes over the results of benchmarking tests running the local evalation code for the node server SDK.

### Results

These results were collected over 10 executions of 10,000 iterations of evaluation with randomized user inputs and 3 experiment config's (selected at random).

![Graph of evaluation duration by iteration](../assets/images/experiment-evaluation-duration.png)

### JIT Compilation Consideration

JavaScript is more difficult to benchmark outside of a real-world situation due to it's just-in-time (JIT) compilation and other optimizations made by the engine. JIT compilation means that the first execution of a function or code path will be slower as the compiler takes some time to warm-up. Once the compiler has compiled and and optimized the byte code, the performance will improve significantly. To take this into account, we call evaluate before each test run in order to get the compiler warmed up for consistent measurements.
