---
title: Exposures but no Assignments Chart
description: This guide walks through troubleshooting exposures but no assignments.
---

The Exposures but no Assignments chart appears in the **Monitor** tab and queries for the cumulative number of unique users who have performed an exposure event without a corresponding assignment event within each day. 

If you see a large number or percentage of users in the chart, be careful when interpreting the results of your experiment. Investigate what happens if someone gets exposed to the experiment that shouldn't: *Is the experience really bad?* *Can the user even see the experience?* *What does it mean if a user sees both experiments when they are mutually exclusive?* 

Exposure without assignment can affect future experiments, so you should investigate and fix the issue. 

!!!note

    This chart doesn't appear if you selected assignment event as the exposure event or if you are using [local evaluation](../../general/evaluation/local-evaluation.md). 

## Causes

A significant number of users in the Exposures but no Assignments chart could be caused by:

- You are manually sending exposures for the wrong users.
- You are mixing up your IDs. For example, for the assignment event you sent the user ID and for the exposure event you have sent the user ID as the device ID. Often, this shows up as certain users only having assignment events and no other events. If the user is anonymous (doesn't have a user ID), you still need to send the device ID as the device ID. Don't send the device ID as the user ID. Remember that for an event to be ingested [you must send it with a user ID or a device ID](/../analytics/apis/http-v2-api/#device-ids-and-user-ids-minimum-length). 
- Another reason that you may see a user having lots of assignment events in a row is if there are processes wake up the app without the user taking action for example push notifications.
- User property or identity changes:
    - Someone has multiple accounts on the same device and you call `fetch()` and then they sign out and sign in to another account and then you call `variant()`. It's important to re-call `fetch()` whenever there are changes to the user identity. 

## Problems with your Experiment

- Users may be exposed to the experiment when they don't meet the rule based targeting criteria. This happens because the rule based targeting is checked on the `fetch()` call.
- Users may be exposed to both experiments even though the experiments are mutually exclusive.
- Exposures are are sent for fallback variant values.
    - If `fetch()` does not return a variant, and you default the user to control and send an exposure for it.