---
title: Troubleshoot a Sample Ratio Mismatch (SRM)
description: This guide walks through troubleshooting and debugging a Sample Ratio Mismatch (SRM) in Amplitude Experiment.
---
<!-- vale Amplitude.HeadingGerunds = NO -->

In Amplitude Experiment, a sample ratio mismatch occurs when the observed allocation for variants significantly differs from the specified allocation. For example, you allocated 50% of your Experiment traffic to the control and 50% to the treatment variant, but you are seeing a ratio of 55% control to 45% treatment.

A SRM points to biases in the data, and if unresolved, can lead to unexpected results. You should be wary of the results of any experiment experiencing a SRM.

## About this guide

This guide provides a deep dive into the process of troubleshooting and debugging a sample ratio mismatch (SRM). This guide assumes that you're using the "end-to-end" Experiment product. However, you may apply some of these debugging steps to experiments which have been set up in Experiment Results.

This page is ordered from most common cause to least common cause of an SRM.

!!! info "More resources"

    This isn't an exhaustive list of every possible cause of SRMs. See [SRM Checker](https://www.lukasvermeer.nl/srm/docs/faq/#what-can-we-do-about-sample-ratio-mismatch) for more debugging strategies. 
        
    If you are still having issues with an SRM after using this guide, contact support. 

## Amplitude exposure events versus custom exposure events
<!-- Casey: Revisit -->
Amplitude recommends that you use the [Amplitude exposure event](../../../general/exposure-tracking). When using client-side SDKs, the Amplitude exposure event is automatically tracked when the variant is accessed from the cache, not when variants are fetched. When using local evaluation, there is no assignment event and you are required to use a custom exposure event. 

If you use a custom exposure event, make sure that you send it when the user experiences the variant. More importantly, the custom exposure event may happen before assignment, meaning that the user property isn't yet set, and the initial custom exposure event isn't actually counted as an exposure in analysis. Note that it doesn't cost extra money to use Amplitude Exposure events.

## Variant distribution weights changed during the experiment

As a best practice, you shouldn't change a running experiment in a way that could cause users to jump between variants. This can cause an SRM.

For example, changing 50% treatment / 50% control to 60% treatment / 40% control may cause users to jump between variants while the experiment is running. One of the assumptions of the SRM test is that the traffic allocation doesn't change while the experiment is running. See [Interpret the Cumulative Exposures Graph in Amplitude Experiment](https://help.amplitude.com/hc/en-us/articles/7985566141083-Interpret-the-cumulative-exposures-graph-in-Amplitude-Experiment#inflection-point) for more context about why you shouldn't change the traffic allocation in the middle of an experiment.

## Experiment exposures started before analysis window begins

If one variant causes users to return to the product more, then you may see more users than expected in that variant if your exposures and analysis window don't align. 

!!!example 
    The experiment ran from January 1 to January 30, and the experiment was analyzed from January 15 to January 30. There are 100 users in control and treatment respectively every two weeks. The treatment you are experimenting on is so good that it makes all the users return the product every day and the control is so bad that they never come back. 
    
    During the analysis time window you have 100 exposed users in control and 200 exposed users in treatment. Here the issue is that you aren't doing a fair comparison between control and treatment. 
    
If the analysis time window and the time the experiment was receiving traffic are different, change the analysis window to be the whole time the experiment was receiving traffic and see if there is still a SRM.

## Variant jumping

Variant jumping describes when a user moves from one variant to another, sometimes multiple times. Variant jumping makes it difficult to attribute the metric to a specific variant. Amplitude Experiment's built-in diagnostics in the **Monitor** tab has charts to make it easy to track the percentage of users jumping between variants. 

If there is variant jumping, is it because of anonymous users (people logging in and out frequently) or changing device IDs? You can see this by looking at the [User Stream](https://help.amplitude.com/hc/en-us/articles/229313067-Look-up-event-data-for-individual-users).

As a best practice, you shouldn't change a running experiment in a way that could cause users to jump between variants. This can cause an SRM.

## Significantly more users converted from Assignment to Exposure for one variant over another

You can find the Assignment to Exposure funnel chart in the **Monitor** tab of an experiment. Enter the conversion rates and sample size into [this calculator](https://www.socscistatistics.com/tests/ztest/default2.aspx) to see if it's statistically significant or not at the 95% significance level. The conversion rates between variants should be similar (within randomness) because the assignment event should randomly split users into two equal cohorts. Because exposure events get sent right before the user experiences a variant, there should be no difference between users because they have the same user experience from the time the assignment event is sent to the time the exposure event is sent.

## Variant added or removed in the experiment

Adding or removing a variant while an experiment is running can cause an SRM. As a best practice, you shouldn't change a running experiment in a way that could cause users to jump between variants. 

## Sticky bucketing enabled or disabled during experiment

Enabling or disabling sticky bucketing on a running experiment can cause a mismatch between what you expect and which variant a user actually sees. If sticky bucketing was _ever_ enabled on an experiment (even if it's later disabled), a user is always evaluated to the same previously bucketed variant, regardless of the current targeting.

## Changes that affected a segment of users

Is the SRM only on a certain segment of users? For example, filter by [country, OS version, app version, platform](https://help.amplitude.com/hc/en-us/articles/215562387-User-property-definitions)

To troubleshoot this kind of problem, find out which specific users were affected. Ask questions like:

- Did an instrumentation bug get pushed to an app version a subset of users have?
- Did a change get pushed that only affects users in a certain country?

## Individual allocation of many users

Did you [individually allocate](../../general/evaluation/implementation.md#individual-inclusions) a large number of users?
This can cause an SRM because individually allocating users doesn't randomly allocate them and can skew your ratio. 

It's fine to add a few users in the experiment individually, but avoid adding many users.

## First experiment 

If you see an SRM in your first experiment, it could be an instrumentation bug. However, if you have had multiple SRMs, then the SRM is unlikely to be a false positive and you should find the root cause. 

## Users often logging out

You may see frequent logouts manifested in the variant jumping chart. Is the experiment causing users to log out more frequently? This is common in financial institutions where users are logged out after 15 minutes of inactivity.

1. On log out regenerate device id
2. Amplitude thinks its a new user
3. User can get bucketed into a different variant
4. Then id gets resolved

This can also be related to anonymous users from sign up flow experiments. 

## Missing exposures

Are there two users who have the same sequence of events but one is missing exposure? There may be some cases where you aren't sending the exposure event or are spending the exposure event when you shouldn't be.

## Incorrectly sending exposures for fallback variant 

If you're not using the Experiment SDK to automatically track exposures, are you incorrectly sending exposures for a fallback (default) variant?

Is there a case where if the flag doesn't return a response in a reasonable amount of time, the flag defaults to control and counts that as an exposure? If so, the control will have more exposures than treatment.

!!! note "Note about Client-side SDKs"

    Client-side SDKs don't send exposure events for fallback variants.

## Event sending order

What's the [library user property](https://help.amplitude.com/hc/en-us/articles/215562387-User-property-definitions)?
Are you sending data to Amplitude though [Segment](https://www.docs.developers.amplitude.com/data/sources/segment/#javascript-client-side), [Amplitude SDK](https://www.docs.developers.amplitude.com/analytics/what-is-amplitude/), or [Batch API](https://www.docs.developers.amplitude.com/analytics/apis/batch-event-upload-api/). If you are using the batch API make sure events are being sent in the right order.
