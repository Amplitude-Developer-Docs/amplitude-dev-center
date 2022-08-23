---
title: Debugging a Sample Ratio Mismatch (SRM)
description: What to do if you have a Sample Ratio Mismatch (SRM)
---

!!! info
    This doc already assumes that you know what an SRM is. If you do not know what an SRM is, you should read this [Help Center Article](https://help.amplitude.com/hc/en-us/articles/8043418569371-Sample-ratio-mismatches-Debug-issues-with-experiment-allocations). 

A standard question you may have is what to do when an experiment has an SRM. This guide will give a deeper dive into the process of debugging a SRM.

!!! info
    This is mostly for the Experiment product, these same steps work for Experiment Results, but Amplitude does not have information about the assignment event, so it is hard to make some of these graphs. Also, Amplitude do not know what the intended traffic allocation is. 

## How to debug an SRM

!!! info
    If you want a summary of this look at the first five items in the list. You should go through this list one by one and see if the resolution at each step fixes the SRM. Sometimes you may need to completely restart the experiment.

Debugging a SRM is similar to debugging general software. Is the SRM only on a certain segment of users (i.e. filter by [country, OS version, app version, platform](https://help.amplitude.com/hc/en-us/articles/215562387-User-property-definitions), etc). Was there an instrumentation bug that was pushed to a certain app version?

!!! info
    This list is sorted in rough order of what the possible cause is. 

#### 1. Are you using a custom exposure event or the Amplitude exposure event?
<p style="display:inline;">Amplitude recommends you use the Amplitude exposure event as this is sent when fetch() is called. When using local evaluation, Amplitude recommends that you use the Amplitude assignment event as the exposure event. On the other hand, if you use a custom exposure event you may not send it at the time the user is exposed to a variant or may not send the event all the time. This can cause a SRM. Note that it does not cost extra money to use Amplitude Exposure events.</p>
<p></p>
#### 2. Did you change traffic allocation while the experiment was running? 
<p style="display:inline;">For example, changing 50% treatment / 50% control to 60% treatment / 40% control. One of the assumptions of the SRM test is that the traffic allocation does not change while the experiment is running. See this <a href="https://help.amplitude.com/hc/en-us/articles/7985566141083-Interpret-the-cumulative-exposures-graph-in-Amplitude-Experiment#inflection-point"> article</a> for why you should not change the traffic allocation in the middle of an experiment.</p>
<p></p>
#### 3. Is the analysis time window the whole time the experiment was receiving traffic?
<p style="display:inline;">The reason this is important is because if one variant causes users to return to the product more, then you may see more users than expected in that variant. For example, the experiment ran from January 1 to January 30, and the experiment was analyzed from January 15 to January 30. Say there are 100 users in control and treatment respectively every two weeks. Say the treatment you are experimenting on is so good that it makes all the users return the product every day and the control is so bad that they never come back. Then, during the analysis time window you will have 100 exposed users in control and 200 exposed users in treatment. Here the issue is that you are not doing an apples-to-apples comparison between control and treatment. If the analysis time window and the time the experiment was receiving traffic are different, change the analysis window to be the whole time the experiment was receiving traffic and see if there is still a SRM.</p>
<p></p>
#### 4. How much variant jumping (same user seeing both treatment and control) was there? 
<p style="display:inline;">Is it more than 5%?** You can find this graph in the Monitor tab of an experiment. The issue with variant jumping is that you do not know which variant to attribute the metric to. If a users sees control, then treatment, and then does the conversion event, did the user do the conversion event because of the treatment or did the user just need time to think about if they wanted to buy the item and the treatment had no effect on their probability of purchase? If there is variant jumping, is it because of anonymous users (people constantly logging in and out) or changing device ids? You can see this by looking at the <a href="https://help.amplitude.com/hc/en-us/articles/229313067-Look-up-event-data-for-individual-users">User Stream</a>.</p>
<p></p>
#### 5. Do you see a big difference in the conversion percentage between variants for the Assignment event -> Exposure event funnel?
<p style="display:inline;">You can find this graph in the Monitor tab of an experiment. Plug in the conversion rates and sample size in <a href="https://www.socscistatistics.com/tests/ztest/default2.aspx">here</a> and see if its statistically significant or not at the 95% significance level. The conversion rates between variants should be similar (within randomness) because the assignment event should randomly split users into two equal cohorts. Since exposure event gets sent right before the user experiences a variant, there should be no difference between users since they have the same user experience from the time the assignment event is sent ot the time the exposure event is sent.</p>
<p></p>
#### 6. Did you add/remove a variant in the middle of an experiment?
<p style="display:inline;">This is just a special case of #2.</p>
<p></p>
#### 7. Was sticky bucketing turned on and off in the middle of the experiment?
<p style="display:inline;">Generally, once you start an experiment you should not change anything.</p>
<p></p>
#### 8. Are there a lot of users in the ["Individual Users Allocation"](../general/evaluation/implementation.md#Individual-inclusions) section?
<p style="display:inline;">This can cause an SRM because you are not randomly allocating those users. It is fine to add some users in the experiment in the "Individual Users Allocation".</p>
<p></p>
#### 9. Is this your first experiment?
<p style="display:inline;">Maybe there is an instrumentation bug. If you have had multiple SRMs, then the SRM is unlikely to be a false positive.</p>
<p></p>
#### 10. Are users logging in and out a lot?
<p style="display:inline;">You may see this manifested in the variant jumping chart. Is the experiment causing users to log out more? This happens for a lot of financial institutions where you get logged out of your bank account if you are inactive for more than 15 minutes.</p>

>    1. On log out regenerate device id<br>
>    2. Amplitude thinks its a new user<br>
>    3. User can get bucketed into a different variant<br>
>    4. Then id gets resolved<br>

This can also be related to anonymous users from sign up flow experiments. 
<p></p>
#### 11. Are there two users who have the same sequence of events but one is missing exposure?
<p style="display:inline;">Maybe there are some cases where you are not sending the exposure event or are spending the exposure event when you should not be.</p>
<p></p>
#### 12. If the customer is not using the Amplitude SDK is the fall back variant causing issue?
<p style="display:inline;">Is there some case where if the flag does not return a response in a reasonable amount of time, the flag default to control and counts that as an exposure? If so, control will have more exposures than treatment.</p>

!!! info
    Our client side sdk doesn’t send exposure events for fallback variant
<p></p>
#### 13. What is the [Platform user property](https://help.amplitude.com/hc/en-us/articles/215562387-User-property-definitions)?
<p style="display:inline;">Are you sending data to Amplitude though <a href="https://www.docs.developers.amplitude.com/data/sources/segment/#javascript-client-side">Segment</a>, <a href="https://www.docs.developers.amplitude.com/analytics/what-is-amplitude/">Amplitude SDK</a>, <a href="https://www.docs.developers.amplitude.com/analytics/apis/batch-event-upload-api/">Batch API</a>, etc.</p><br>
<p></p>
This is by no means an exhaustive list. Here is another debugging [strategy](https://www.lukasvermeer.nl/srm/docs/faq/#what-can-we-do-about-sample-ratio-mismatch). If you still are having issues debugging a SRM, please reach out to Support or Customer Success.
