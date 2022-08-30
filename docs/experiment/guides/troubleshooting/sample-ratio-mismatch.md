---
title: Troubleshooting Sample Ratio Mismatch (SRM)
description: What to do if you have a Sample Ratio Mismatch (SRM)
---

<style type="text/css" rel="stylesheet">
h4 {
  display:inline
}
</style>

!!! info
    This doc already assumes that you know what an SRM is. If you do not know what an SRM is, you should read this [Help Center Article](https://help.amplitude.com/hc/en-us/articles/8043418569371-Sample-ratio-mismatches-Debug-issues-with-experiment-allocations). 

This guide provides a deeper dive into the process of troubleshooting and debugging a sample ratio mismatch (SRM). This guide assumes that you're using the "end-to-end" Experiment product. However, you may apply some of the same debugging steps to experiments which have been set up in Experiment Results.

!!! info
    This list is sorted in rough order of what the possible cause is. 

#### 1. Are you using a custom exposure event or the Amplitude exposure event?
<p style="display:inline;">Amplitude recommends you use the <a href="../../../general/exposure-tracking">Amplitude exposure event</a>. When using client-side SDKs the Amplitude exposure event is automatically tracked when the variant is accessed from the cache, not when variants are fetched. When using local evaluation, there is no assignment event and requires the customer to use a custom exposure event. If you use a custom exposure event make sure you send it when the user experiences the variant. More importantly, the custom exposure event may happen before assignment, meaning that the user property is not yet set, and the initial custom exposure event is not actually counted as an exposure in analysis. Note that it does not cost extra money to use Amplitude Exposure events.</p>
<p></p>
#### 2. Did you change variant distribution weights while the experiment was running?
<p style="display:inline;">For example, changing 50% treatment / 50% control to 60% treatment / 40% control may cause users to jump between variants while the experiment is running. One of the assumptions of the SRM test is that the traffic allocation does not change while the experiment is running. See this <a href="https://help.amplitude.com/hc/en-us/articles/7985566141083-Interpret-the-cumulative-exposures-graph-in-Amplitude-Experiment#inflection-point"> article</a> for why you should not change the traffic allocation in the middle of an experiment.</p>
<p></p>
#### 3. Do experiment exposures start before the analysis window begins?
<p style="display:inline;">This is important because if one variant causes users to return to the product more, then you may see more users than expected in that variant. For example, the experiment ran from January 1 to January 30, and the experiment was analyzed from January 15 to January 30. Say there are 100 users in control and treatment respectively every two weeks. Say the treatment you are experimenting on is so good that it makes all the users return the product every day and the control is so bad that they never come back. Then, during the analysis time window you will have 100 exposed users in control and 200 exposed users in treatment. Here the issue is that you are not doing a fair comparison between control and treatment. Thus, if the analysis time window and the time the experiment was receiving traffic are different, you should change the analysis window to be the whole time the experiment was receiving traffic and see if there is still a SRM.</p>
<p></p>
#### 4. Did users frequently jump between variants?
<p style="display:inline;">Variant jumping describes when a user moves from one variant to another, sometimes multiple times. Variant jumping makes it difficult to attribute the metric to a specific variant. Amplitude Experiment's built-in diagnostics in the "Monitor" tab has charts to make it easy to track the percentage of users jumping between variants. If there is variant jumping, is it because of anonymous users (people constantly logging in and out) or changing device ids? You can see this by looking at the <a href="https://help.amplitude.com/hc/en-us/articles/229313067-Look-up-event-data-for-individual-users">User Stream</a>.</p>
<p></p>
#### 5. Did significantly more users convert from Assignment to Exposure for one variant over another?
<p style="display:inline;">You can find the Assignment to Exposure funnel chart in the "Monitor" tab of an experiment. Plug in the conversion rates and sample size in <a href="https://www.socscistatistics.com/tests/ztest/default2.aspx">here</a> and see if it is statistically significant or not at the 95% significance level. The conversion rates between variants should be similar (within randomness) because the assignment event should randomly split users into two equal cohorts. Since exposure events get sent right before the user experiences a variant, there should be no difference between users since they have the same user experience from the time the assignment event is sent to the time the exposure event is sent.</p>
<p></p>
#### 6. Did you add/remove a variant in the middle of an experiment?
<p style="display:inline;">This is just a special case of #2. Generally, you should not change an experiment in any way which may cause a user to jump between variants while an experiment is running.</p>
<p></p>
#### 7. Was sticky bucketing turned on and off in the middle of the experiment?
<p style="display:inline;">Generally, you should not change an experiment in any way which may cause a user to jump between variants while an experiment is running.</p>
<p></p>
#### 8. Is the SRM only on a certain segment of users  (i.e. filter by [country, OS version, app version, platform](https://help.amplitude.com/hc/en-us/articles/215562387-User-property-definitions), etc)?
<p style="display:inline;">Debugging a SRM is similar to debugging general software in that you want to find out which specific users were affected. Was there an instrumentation bug that was pushed to a certain app version?</p>
<p></p>
#### 9. Did you [individually allocate](../../general/evaluation/implementation.md#Individual-inclusions) a large number of users?
<p style="display:inline;">This can cause an SRM because you are not randomly allocating those users. It is fine to add some users in the experiment in the "Individual Users Allocation".</p>
<p></p>
#### 10. Is this your first experiment?
<p style="display:inline;">Maybe there is an instrumentation bug. If you have had multiple SRMs, then the SRM is unlikely to be a false positive.</p>
<p></p>
#### 11. Are users logging in and out frequently?
<p style="display:inline;">You may see this manifested in the variant jumping chart. Is the experiment causing users to log out more? This happens for a lot of financial institutions where you get logged out of your bank account if you are inactive for more than 15 minutes.</p>

>    1. On log out regenerate device id<br>
>    2. Amplitude thinks its a new user<br>
>    3. User can get bucketed into a different variant<br>
>    4. Then id gets resolved<br>

This can also be related to anonymous users from sign up flow experiments. 
<p></p>
#### 12. Are there two users who have the same sequence of events but one is missing exposure?
<p style="display:inline;">Maybe there are some cases where you are not sending the exposure event or are spending the exposure event when you should not be.</p>
<p></p>
#### 13. If you're not using the Experiment SDK to automatically track exposures, are you incorrectly sending exposures for a fallback (default) variant?
<p style="display:inline;">Is there some case where if the flag does not return a response in a reasonable amount of time, the flag default to control and counts that as an exposure? If so, control will have more exposures than treatment.</p>

!!! info
    Client-side SDKs don't send exposure events for fallback variants
<p></p>
#### 14. What is the [platform user property](https://help.amplitude.com/hc/en-us/articles/215562387-User-property-definitions)?
<p style="display:inline;">Are you sending data to Amplitude though <a href="https://www.docs.developers.amplitude.com/data/sources/segment/#javascript-client-side">Segment</a>, <a href="https://www.docs.developers.amplitude.com/analytics/what-is-amplitude/">Amplitude SDK</a>, <a href="https://www.docs.developers.amplitude.com/analytics/apis/batch-event-upload-api/">Batch API</a>, etc. If you are using the batch API make sure events are being sent in the right order.</p><br>
<p></p>

This is by no means an exhaustive list. Here is another debugging [strategy](https://www.lukasvermeer.nl/srm/docs/faq/#what-can-we-do-about-sample-ratio-mismatch). If you still are having issues debugging a SRM, please reach out to Support or Customer Success.
