---
title: Variant Jumping
description: Learn to troubleshoot variant jumping; description, causes, and solutions.
---

Variant jumping describes when a user is exposed two or more variants for a single flag or experiment. Variant jumping may occur normally or abnormally, for various reasons. Variant jumping above a certain threshold may be cause for concern in being able to trust an analysis.

## Debugging

The best way to debug variant jumping is by identifying a user that has jumped variants, and analyzing their user timeline. If you're using remote evaluation, you should also check the Assignment event to identify assignment vs exposure discrepancies.

!!!info "To find a user who has jumped variants:"

    1. Go to the monitor tab of your experiment
    2. Find the variant jumping charts, and click "Open in Analytics"
    3. Select the bar for users who jumped variants and click "View User Streams" (you may need to use uniques instead of a formula)

    You may find it helpful to "only show" assignment and exposure events in the user timeline.

Important things to note when debugging a user timeline include:

1. Did you introduce any [targeting changes](#targeting-changes) while your flag/experiment was active? Could the timing of this change have effected the variant assigned to this user? Check the flag/experiment version history by clicking on the version number.
2. What's the bucketing key used in the flag/experiment? Does the value for this property change between assignments/exposures for this user?
3. Does the user seem have "missing" exposures or assignment events? If so the "missing" event may have been sent for a "different" user.
4. Does an assignment not have a user property that's expected? If so, double check the server upload timestamp of the assignment event vs surrounding active events. You may notice that events sent from the client are actually uploaded and received after the assignment event, even if the client order is different.

## Normal variant jumping

Normal variant jumping may occur due to:

1. [Targeting changes](#targeting-changes): changes to targeting rules while your experiment is running
2. [Anonymous identity merging](#anonymous-identity-merging): anonymous users, bucketed by amplitude ID may receive different variants until they're eventually resolved via a matching user ID.

### Targeting changes

Performing the following actions may cause a user to jump variants:

1. Adding or removing a variant
2. Changing variant distribution weights
3. Targeting dynamic cohorts
4. Changing the bucketing key
5. Updating mutual exclusion

!!!tip "Avoid variant jumping by enabling sticky bucketing"
    Enabling sticky bucketing before making targeting changes prevents variant jumping. However, sticky bucketing may cause a [sample ratio mismatch (SRM)](./sample-ratio-mismatch.md).

### Anonymous identity merging

Variant jumping caused by anonymous identity merging may occur due to bucketing by Amplitude ID, when user profiles with distinct device IDs (resolved to different amplitude IDs) are merged when resolved to a common user ID. This may happen if a user uses your app on different devices, or if, on logout, the device ID is re-generated.

!!!info "[Learn more about Amplitude's identity resolution and merging users.](https://help.amplitude.com/hc/en-us/articles/115003135607-Track-unique-users-in-Amplitude#h_e9913ce1-549a-4d88-a832-1f56aede581a)"

 Identifying this type of variant jumping is easy by identifying the assignment event where the user jumped between variants, and comparing the value of the Amplitude ID for both events. If the Amplitude ID is different on the two events, then there then it's very likely that anonymous identity merging was the cause.

To combat this type of variant jumping, consider bucketing by:

* User ID: If you're only targeting user who are logged in, and have a user ID.
* Device ID: If you're only targeting anonymous users. For example, a sign up experiment.

### Inclusion list

Say you have some user ids in the inclusion list. You call `fetch()` with the user id passed in to the `fetch()` call. You get control since that is what the inclusion list said. Then the next time you call `fetch()` you do not pass in the user id so the user does not meet the inclusion list criteria so the bucketing key gets hashed and they may see treatment. The same thing can happen if you include device ids.

![Has a user id so matches the inclusion list and gets signin-up-new_design](../../../assets/images/experiment/inclusion-list-variant-jumping-1.png) Has a user id so matches the inclusion list and gets `signin-up-new_design`.

![Does not have a user id so does not match the inclusion list and hits the all other users segment and gets signin-up-original-view](../../../assets/images/experiment/inclusion-list-variant-jumping-2.png) Does not have a user id so does not match the inclusion list and hits the all other users segment and gets `signin-up-original-view`.

## Abnormal variant jumping

Abnormal variant jumping is unexpected variant jumping that can't be explained by any [normal means](#normal-variant-jumping). Abnormal variant jumping can be tough to track down, however most abnormal variant jumping is caused by some form of identity mismatch: **when the user identity used in assignment is different from the identity used to track the exposure.** In short, abnormal variant jumping is almost always due to an inconsistency in implementation.

The following examples aren't exhaustive, but should get you thinking about the use of identity in your system with respect to Amplitude Experiment.

### Multiple logged in accounts on a single device

Consider this timeline for a person with multiple user accounts (U1 and U2), for your app on a single device.

1. Open app as user U1 and fetch variants, assigned `treatment` for `experiment-1`.
2. Exposure to `experiment-1` variant `treatment` for U1.
3. Log out of U1, and into U2, fetching variants asynchronously on log in.
4. Prior fetch for U2 resolving, exposure to `experiment-1` variant `treatment` for U2.
5. Fetch for U2 resolves, assigned `control` for `experiment-1`.
6. Exposure to `experiment-1` variant `control` for U2.

In this case, user U2 has jumped variants, from `treatment` to `control` due to being exposed to U1's stored variant. To avoid this sort of issue, you can either wait for the fetch to resolve before rendering the user experience, or call the SDK's `clear()` method on log out to clear all stored variants from the SDK. Clearing variants wipes the SDK's variant storage, and is a way to ensure that the user isn't exposed to cached variants, but doesn't protect the user from viewing a fallback experience before the fetch request resolves.

If you keep a consistent device ID across logins, you can easily check for this type of variant jumping by searching for different users that have the same device ID.

### Inconsistent identity input between assignment and exposure

In Amplitude, the user ID and device ID properties are essential to identify your user and [resolve their Amplitude ID](https://help.amplitude.com/hc/en-us/articles/115003135607-Track-unique-users-in-Amplitude#h_e9913ce1-549a-4d88-a832-1f56aede581a). If the device ID or user ID used to fetch/evaluate assignments is different from the device ID and user ID used to track the exposure event, you may see variant jumping, SRMs and inconsistent or unexpected bucketing behavior.

For example, you may be sending events through a proxy or CDP which obfuscates or canonicalizes IDs before sending to Amplitude. In this case, the identity used to fetch variants would be different from the identity included in the exposure events.

Another common case is simple overlooked implementation error. For example, the following cases have caused variant jumping:

* Additional characters in the ID. For example Extra quotes around the actual identity.
    * `15a4f7e9-db4e-4c57-82c7-e57a2995803a`
    * `"15a4f7e9-db4e-4c57-82c7-e57a2995803a"`
* Inconsistent capitalization, especially with UUIDs.
    * `15a4f7e9-db4e-4c57-82c7-e57a2995803a`
    * `15A4F7E9-DB4E-4C57-82C7-E57A2995803A`

## Remove users who variant jumped from experiment analysis

Generally, when doing analysis you want to be careful when removing data as you may introduce bias in your results. It's better to understand the cause of variant jumping and fix any implementation bugs so this doesn't happen again in future  experiments. If you feel you have a legitimate reason for removing users who jumped variants, you can follow these steps:

1. Go to the Monitor tab and click "Open in Analytics" on one of the variant jumping charts.
2. Click the user segment for users who jumped variants and select "Create Cohort" then save the cohort.
3. Repeat steps 1 & 2 for each variant.
4. Go to the Analyze tab and click "Open in Analytics"
5. In the component for the user segments, add `where cohort != <cohort name>` for each variant

If you have more than two variants, you need to make multiple cohorts of users who variant jumped and filter out each one of them.
