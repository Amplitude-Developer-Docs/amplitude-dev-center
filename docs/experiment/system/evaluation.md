---
title: Evaluation
description: Information about how Amplitude experiment evaluates a user, and different ways to evaluate within your own system.
---

## Randomization

TODO: Rewrite

Randomization of variations is deterministic based on the Amplitude ID that Amplitude assigns based on the `device_id` and `user_id` fields of the context, as well as the `bucketing salt` of the flag.

We use a two dimensional model for randomization. We perform a murmur3 hash of `"bucketingSalt/amplitude_id"`, and use that hash to determine first, whether a user should be assigned a variant, and second, which variant the user should be assigned.

### Implementation Details

#### Assignment
 Users are divided into 100 buckets based on `mod(murmur3_x86_32("bucketingSalt/id", 100)`

If the bucket is less than the percentage rollout, then the user is assigned into the experiment, in which case the user will be assigned a variant. If the user is not assigned into the experiment, they will receive the fallback variant.

#### Variation assignment
If a user is assigned into the experiment, they are assigned a variant according to the value of `floor(murmur3_x86_32("bucketingSalt/id"), 100)`

Variants are associated with values between 0 and 42949672, based on their weights. For example, if Variant A has weight 1 and Variant B has weight 1, Variant A would be associated with values in the interval [0, 21474835], and Variant B would be associated with values in the interval [21474836, 42949672].

--------------

## Evaluation Architectures

TODO

### Remote Evaluation

TODO

### Local Evaluation

TODO

### Edge Evaluation

TODO