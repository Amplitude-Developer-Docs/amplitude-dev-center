---
title: Exposures Without Assignments Chart
description: This guide walks through troubleshooting exposures without assignments.
---

The Exposures without Assignments chart appears in the **Monitor** tab and queries for the cumulative number of unique users who have performed an exposure event without a corresponding assignment event within each day. 

If you see a large number or percentage of users in the chart, be careful when interpreting the results of your experiment. Investigate what happens if someone gets exposed to the experiment that shouldn't: 

- Is the experience really bad?
- Can the user even see the experience?
- What does it mean if a user sees both experiments when they are mutually exclusive?

Exposure without assignment may also affect future experiments, so you should investigate and fix the issue. 

!!!note

    This chart doesn't appear if you selected assignment event as the exposure event or if you are using [local evaluation](../../general/evaluation/local-evaluation.md). 

## Causes

A significant number of users in the Exposures without Assignments chart could be caused by:

- Identity mismatch between assignment and exposure.
    - User ID and device ID are incorrect, switched, or [missing](/../analytics/apis/http-v2-api/#device-ids-and-user-ids-minimum-length) on either assignment or exposure (e.g. sending the device ID as the user ID or visa versa).
- Account switching on the same device.
    - If real user has multiple accounts on the same device, and you don't call fetch on login/logout, the value accessed by `variant()` will trigger an exposure for the new user without an assignment event. It's important to re-call `fetch()` whenever there are changes to the user identity.
- Exposures for fallback variants.
    - If you are manually tracking exposure events, you should not track exposure events for fallback or default variant values. For example, if a user is not assigned a variant for an experiment, so you show the user control, the user should not have an exposure event tracked with the variant value control.
    
## Debugging

To debug exposure without assignment, open the chart in analytics and view user streams. Some common problems you may see are:

1. Users who only have assignment or exposure events. This is likely due to an identity mismatch between assignment (`fetch()`) and the exposure tracked through analytics.
2. User login followed by exposure events without an assignment event. This is likely due to account switching on the same device. Use user lookup using the device ID to see if there are multiple logged in users sharing the same device. Someone has multiple accounts on the same device and you call `fetch()` and then they sign out and sign in to another account and then you call `variant()`. It's important to re-call `fetch()` whenever there are changes to the user identity. 

## Problems with your Experiment

- Users may be exposed to the experiment when they don't meet the rule based targeting criteria. This happens because the rule based targeting is checked on the `fetch()` call.
- Users may be exposed to both experiments even though the experiments are mutually exclusive.