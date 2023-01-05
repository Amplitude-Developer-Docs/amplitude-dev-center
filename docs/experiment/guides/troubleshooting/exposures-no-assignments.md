---
title: Exposures but no Assignments Chart
description: This guide walks through troubleshooting exposures but no assignments.
---

This chart shows up in the "Monitor" tab and queries for the cumulative number of unique users who have performed an exposure event without a corresponding assignment event within each day. If you see a large number/percentage of users who are in this chart that could mean that 

* Users may be exposed to the experiment when they do not meet the rule based targeting criteria (this happens because the rule based targeting is checked on the `fetch()` call.
* Users may be exposed to both experiments even though the experiments are mutually exclusive.
* You are manually sending exposures for the wrong users
* You are mixing up your ids (i.e. for the assignment event you have send the user id and for the exposure event you have sent the user id as the device id). Often this shows up as certain users only having assignment events and no other events. If the user is anonymous (does not have a user id) still send the device id as the device id. Don't send the device id as the user id. Remember that for an event to be ingested [a user id or a device id must be sent](https://www.docs.developers.amplitude.com/analytics/apis/http-v2-api/#device-ids-and-user-ids-minimum-length). 
* Someone has multiple accounts on the same device and you call `fetch()` and then they sign out and sign in to another account and then you call `variant()` (it is important to re-call `fetch()` whenever there are changes to the user identity. Another example is if someone's user property that you are targeting on changes within a session make sure you re-call `fetch()` otherwise you may target / not target someone you did not want to / wanted to), or etc. Make sure you call `fetch()` before every `variant()` call. 

If you see a large number / percentage of users in this chart, you should take caution when interpreting the results of your experiment. You should understand what happens if someone gets exposed to the experiment that should not. Is the experience really bad? Can the user not even see the experience? It is important to understand that this issue may effect other future experiments, so you should fix this issue. This chart does not show up if you have selected the assignment event as the exposure event or if you are using [local evaluation](../../general/evaluation/local-evaluation.md). 