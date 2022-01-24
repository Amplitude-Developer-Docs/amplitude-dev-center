---
id: best-practices
title: Best Practices
---

In order to get the most out of your analytics tools it's important to spend the time ensuring that you have a good foundation in place. We recommend the following as best practices for analytics:

### 1. Start with your goals and metrics

We talked about this in [What is a Tracking Plan](/what-is-a-tracking-plan#step-1-define-your-business-objectives), but it is important to start with your goals and metrics first. This helps you determine what events and properties you should be capturing and how to prioritize them for instrumentation.


### 2. Keep it simple and establish consistency

Event and property names should be simple and self explanatory. Similar to writing code, establishing a set of conventions from day one will make your data easier to understand for everyone at your company. This includes naming conventions for your events and properties which you can configure in your account [taxonomy](/managing-your-account#taxonomy).

### 3. Identify users correctly

When identifying users, avoid using email as the distinct ID but instead use the same UUID that you use in your database. This avoids analytics breaking when users change their email down the line. And make sure to alias users once they've logged into your product to associate previous anonymous events. 

### 4. Determine where to capture events

Chose where to capture your events, on the server or the client. While capturing events on the server is more reliable you have less access to information about the user such as IP, user agent, referrer, and UTM parameters. We recommend tracking any key events on the server and only capturing events on the client when you need to understand the context for how that event occurred. There are many things that impact reliability when tracking events on the client such as ad blockers. 

### 5. Add event properties and user properties

Properties are the place to articulate all the details associated with an event or user. Properties describe the context of the data; this allows your analysts to be able to group, filter, and cohort. Properties fall into two camps: event specific (like the revenue associated with a purchase event) and user specific (like demographic information about a user). Most events and users have multiple properties associated with them but again, keep it simple.

### 6. Separate development and production environments

Don't dirty your production data by sending events from your development environments. Make sure that you use separate access tokens which can be configured in [Destinations](/creating-your-tracking-plan#step-2-add-your-destinations) in Iteratively. 

### 7. QA analytics in CI/CD

Run [`ampli status`](/using-the-ampli-cli#step-5-verify-the-instrumentation) to lint the source and verify that the implementation matches the spec. No more fixing analytics bugs or having to manually QA analytics.

### 8. Assign an owner

Lastly assign someone on your team to take ownership over the Tracking Plan. With Iteratively they have a process in place to review any changes and insure that analytics quality stays high.