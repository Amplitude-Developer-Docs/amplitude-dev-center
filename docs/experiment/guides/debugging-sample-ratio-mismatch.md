---
title: Guide to debugging a Sample Ratio Mismatch (SRM)
description: What to do if you have a Sample Ratio Mismatch (SRM)
---

You may be visiting this page from the [Help Center Article](https://help.amplitude.com/hc/en-us/articles/8043418569371-Sample-ratio-mismatches-Debug-issues-with-experiment-allocations) or from the [Blog Post](// TODO (AKHIL) add link here once published). A standard question you may have is what do I do that my experiment has an SRM and I understand what an SRM is.

In this guide, we will give a deeper dive into the process of debugging a SRM. 

!!! info
    This is mostly for the Experiment product, these same steps work for Experiment Results but we do not have information about the assignment event so it is hard to make some of these graphs. Also, we do not know what the intended traffic allocation is. 

## How to debug an SRM

!!! info
    If you want a TLDR version of this look at the first five items in the list.

Some of this debugging is similar to debugging general software. Is the SRM only on a certain segment of users (i.e. filter by country, OS version, app version, platform, etc). Was there an instrumentation bug that was pushed to a certain app version?

!!! info
    This list is sorted in rough priority order. 

### 1. Are you using a custom exposure event or the Amplitude exposure event?
     
We recommend you use the Amplitude exposure event as this is sent when `fetch()` is called. (TODO AKHIL Should we say something about local event since that doesn't use Amplitude Exposure). On th other hand, if you use a custom exposure event you may not send it at the time the user is exposed to a variant. Note that it does not cost extra money to use Amplitude Exposure events.

### 2. Did they change traffic allocation in the middle of the experiment?

By traffic allocation, I mean changing 50% treatment / 50% control to 60% treatment / 40% control, not changing it from 2% of all traffic going to the experiment to 5% of all traffic going to the experiment. One of the assumptions of the SRM test is that the traffic allocation does not change in the middle of the test. See this [article](https://help.amplitude.com/hc/en-us/articles/7985566141083-Interpret-the-cumulative-exposures-graph-in-Amplitude-Experiment#inflection-point) for why you should not change the traffic allocation in the middle of an experiment. // TODO AKHIL see if can link to specific paragraph.

### 3. Is the analysis time window the whole time the experiment was receiving traffic?

The reason this is important is because if one variant causes users to return to the product then you may see more users than expected in that variant. For example, the experiment ran from January 1 to January 30, and the experiment was analyzed from January 15 to January 30. Say there are 100 users in control and treatment respectively every two weeks. Say the treatment you are experimenting on is so good that it makes the users return the product every day and the control is so bad that they never come back. Then, during the analysis you will have 100 exposed users in control and 200 exposed users in treatment. Here the issue is that you are not doing an apples-to-apples comparison between control and treatment. If the analysis time window and the time the experiment was receiving traffic are different, change the analysis window to be the whole time the experiment was receiving traffic and see if there is still a SRM.

### 4. How much [variant jumping](// TODO AKHIL link to Brian's article) (same user seeing both treatment and control) was there? Is it more than 5%? 

The issue with variant jumping is that you do not know which variant to attribute the metric to. If a users sees control and then treatment and then does the conversion event, did the user do the conversion event because of the treatment or did the user just need time to think about if they wanted to buy the item and the treatment had no effect on their probability of purchase. You can look at variant jumping chart on the Monitor tab of an experiment. If there is variant jumping, is it because of anonymous users (people constantly logging in and out) or changing device ids? You can see this by looking at the [User Stream](https://help.amplitude.com/hc/en-us/articles/229313067-Look-up-event-data-for-individual-users). 

### 5. Do you see a big difference in the conversion percentage between variants for the Assignment event -> Exposure event funnel? 

Plug in conversion rates and sample size in [here](https://www.socscistatistics.com/tests/ztest/default2.aspx) and see if its statistically significant or not at the 95% significance level, You can find this graph in the Monitor tab of an Experiment. The conversion rates between variants should be similar (within randomness) because the assignment event should randomly split users into two equal cohorts. Since exposure event gets sent right before the user experiences a variant, there should be no difference between users since they have the same user experience from the time the assignment event is sent ot the time the exposure event is sent. 

### 6. Adding a new variant in the middle of an experiment

This is just a special case of #2.

### 7. Removing a variant in the middle of an experiment

This is just a special case of #2.

### 8. Was sticky bucketing turned on and off in the middle of the experiment?

Generally, once you start an experiment you should not change anything.

### 9. Are there a lot of users in the ["Individual Users Allocation"](../general/evaluation/implementation.md#Individual-inclusions) section?

This can cause an SRM because you are not randomly allocating those users. It is fine to add < 1% (// TODO Akhil do I want to be this prescriptive with a number) of the users in the experiment in the "Individual Users Allocation". 

### 10. Is this your first experiment?

Maybe there is an instrumentation bug. If you have had multiple SRMs, then it is unlikely to be a false positive.

### 11. Are users logging in and out a lot?

You may see this manifested in the variant jumping chart. Is the experiment causing users to log out more? This happens for a lot of financial institutions where you get logged out of your bank account if you are inactive for more than 15 minutes.<br>

>    1. On log out regenerate device id<br>
>    2. Amplitude thinks its a new user<br>
>    3. User can get bucketed into a different variant<br>
>    4. Then id gets resolved<br>

This can also be related to anonymous users from sign up flow experiments. 

### 12. Are there two users who have the same sequence of events but one is missing exposure?

Maybe there are some cases where you are not sending the exposure event or are spending the exposure event when you should not be.

### 13. If the customer is not using our sdk is the fall back variant causing issue?

Is there some case where if the flag does not return a response in a reasonable amount of time, they default to control and count that as an exposure? Then control will have more exposures than treatment. 

!!! info
    Our client side sdk doesn’t send exposure events for fallback variant

### 14. Look at the [Platform user property](https://help.amplitude.com/hc/en-us/articles/215562387-User-property-definitions)

Are you sending data to Amplitude though [Segment](https://www.docs.developers.amplitude.com/data/sources/segment/#javascript-client-side), [Amplitude SDK](https://www.docs.developers.amplitude.com/analytics/what-is-amplitude/), [Batch API](https://www.docs.developers.amplitude.com/analytics/apis/batch-event-upload-api/), etc.<br>

This is by no means an exhaustive list. Here is another debugging [strategy](https://www.lukasvermeer.nl/srm/docs/faq/#what-can-we-do-about-sample-ratio-mismatch). If you still are having issues debugging a SRM, please reach out to support or Customer Success by ... //TODO AKhil fill this in.