---
title: Variant Jumping
description: Learn to troubleshoot variant jumping; description, causes, and solutions.
---

Variant jumping describes when a user moves from one variant to another, sometimes multiple times. Variant jumping may occur normally or abnormally, for various reasons. Abnormal variant jumping above a certain threshold may be cause for concern.

## Normal variant jumping

Normal variant jumping may occur due to:

1. [Targeting changes](#targeting-changes): changes to targeting rules while your experiment is running
2. [Anonymous identity resolution](#anonymous-identity-resolution): anonymous users, bucketed by amplitude ID may receive different variants until they are eventually resolved via a matching user ID.

### Targeting changes

Performing the following actions may cause a user to jump variants:

1. Adding or removing a variant
2. Changing variant distribution weights
3. Targeting dynamic cohorts
4. Changing the bucketing key
5. Updating mutual exclusion

!!!info "Avoid variant jumping by enabling sticky bucketing"
    Enabling sticky bucketing before making targeting changes will avoid variant jumping. However, sticky bucketing may cause a sample ratio mismatch (SRM).

### Anonymous identity resolution

Variant jumping cause by anonymous identity resolution happens when user profile with distinct device IDs (resolved to different amplitude IDs) are merged due to a common user ID. When the user is re-evaluated, the change in amplitude ID caused by the user merge may cause variant jumping.

!!!info "[Learn more about Amplitude's identity resolution and merging users.](https://help.amplitude.com/hc/en-us/articles/115003135607-Track-unique-users-in-Amplitude#h_e9913ce1-549a-4d88-a832-1f56aede581a)"

This may happen if a user uses your app on different devices, or if, on logout, the device ID is re-generated.

