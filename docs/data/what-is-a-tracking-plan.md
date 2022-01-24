---
id: what-is-a-tracking-plan
title: What is a Tracking Plan?
---

To avoid the common pitfalls that teams face when instrumenting analytics it's important to codify your analytics strategy into a [Tracking Plan](//iterative.ly/blog/tracking-plan/). A Tracking Plan is a living document that outlines what events and properties to track, why you're tracking them, and where they are tracked. Once this has been done, developers can go ahead and instrument the analytics schema in the code base. 

There are two primary roles to think about when creating your tracking plan, the developer who has to implement tracking and the data consumer who needs to answer questions from the data. It's imperative to keep both these folks on the same page. 

### Define your Business Objectives

Before creating your Tracking Plan, it's imperative to define your business objectives as a team so that everyone is bought into what you're tracking and why. Some questions that you should look at answering are:

- What are you and the team working towards? 
- What metric are you trying to optimize for? 
- What questions are you looking to answer with data? 

Everything we work on should be tied to a goal, this helps ensure that you are [prioritizing outcomes over outputs](//iterative.ly/blog/outcomes-over-outputs/) and not celebrating success theater. Once you determine your business objectives it's easier to break them down into metrics (what you're measuring) and events (how you're measuring them) within your Tracking Plan.

If your goal is to improve active usage of your product you first need to determine what the key action in your product is that is most closely tied to value. It's important to break this down further into a [suite of metrics](https://www.reforge.com/blog/north-star-metric-growth) that latter up to that output metric. 

For example, for a music streaming service that could be the time spent listening to music. Your input metrics would be things like `New artist notification` which brings users back to the product increasing their time spent listening to music.

<table>
  <tr>
    <td colspan="2">Input Metrics</td>
    <td>Output Metrics</td>
  </tr>
  <tr>
    <td>New artist notifications →</td>
    <td rowspan="2">Bring users back more often →</td>
    <td rowspan="4">⭐️ Time spent listening to music</td>
  </tr>
  <tr>
    <td>Recommendations →</td>
  </tr>
  <tr>
    <td>Create playlists →</td>
    <td rowspan="2">Increase time spent per session →</td>
  </tr>
  <tr>
    <td>Discover new songs →</td>
  </tr>
</table>

Once you have that suite of metrics you can start to determine what events you need to instrument in your product and get started [Creating your Tracking Plan](/creating-your-tracking-plan).

<!-- Describe how to break down the suite of metrics to Events & Properties, include Identify 
https://segment.com/docs/protocols/whats-a-tracking-plan/
-->