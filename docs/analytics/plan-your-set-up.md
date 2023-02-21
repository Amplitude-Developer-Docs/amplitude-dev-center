---
title: Plan Your Set Up
description: Get started with Amplitude and set up instrumentation. 
---

 This document walks you through each of the steps needed to successfully set up and get familiar with Amplitude basics.

It's highly recommended to go through [What is Amplitude](../what-is-amplitude/) to get a high-level overview of Amplitude before proceeding with this document.

## Send data

An Amplitude Source is the location where you send your data from. It could be a mobile application, a website, or any other source of data. The data is then collected, processed, and analyzed by Amplitude to generate insights and reports about user behavior. It's recommended to pick one source to start but you can always add more sources later. 

Here are two ways to send data to Amplitude:

1. [import existing data](./#import-existing-data) if you have data stored elsewhere
2. [track data](./#track-product-data) using Amplitude SDKs and APIs if you are beginning from scratch

Don't forget to [validate your data](../../data/debugger/) after instrumentation. 

### Import existing data

If you already collect data outside of Amplitude, you can stream events directly from your chosen source by [adding a source](../../data/sources/#add-a-source).

### Track product data 

You can track your product data using Amplitude SDKs and APIs:

1. To choose the most suitable method for your needs, refer to [client-side vs server-side sources](../../data/sources/client-side-vs-server-side/)
2. Know [what events to track](./#what-events-to-track)
3. Check out [Amplitude SDK Quickstart Guide](../../data/sdks/sdk-quickstart/) for a quick and easy way to get started.

## What events to track

The decision you make of which events to track can have a significant effect on the value you derive from Amplitude. 

If you're just starting out, Amplitude recommends **resisting the urge to track everything** upfront. Tracking too much events actually obscures insights although it feels that more data lead to more insight. The number of events you should track depends on the complexity of your product. 

Amplitude recommends to get started with two important events in your product to help you get initial insights. 

Here are some sample questions to get you thinking:

|Questions|Events|
|---------------|---------------|
|How many daily active users or how many logins per week do I get? | **Login** event|
|What percentage of users who add an item to their cart successfully checkout? | **Add to Cart** event and **Checkout** event|
|What percentage of sign ups request a demo? | **Sign Up** event and Request Demo event|
|What's the retention rate? How many users come back to the product after signing up 2 weeks later? | **Sign Up** event and **Session Start** event|

!!!note "Know key concepts before you get started"
    For more details on the definitions of users, events, and properties, see [What is Amplitude?](../what-is-amplitude/) article.

Know what events to track now? Check out [Amplitude SDK Quickstart Guide](../../data/sdks/sdk-quickstart/) for a quick and easy way to get started.

After successfully tracking these events, you can start to [track more](https://help.amplitude.com/hc/en-us/articles/115000465251-Data-taxonomy-playbook-part-one-Getting-started).

## Create a tracking plan

As you advance, it’s critical to [create a tracking plan](https://help.amplitude.com/hc/en-us/articles/5078731378203-Create-a-tracking-plan) document that outlines what events and properties to track, why you're tracking them, and where they're tracked. A tracking plan should be based on the business outcomes you’re trying to measure or improve.

If you are using Amplitude SDKs, it's recommended to use Ampli Wrapper which is a lightweight wrapper over the Amplitude SDK that provides type-safety, supports linting, and enables features like input validation. Ampli CLI works together with the Ampli wrapper to bring a tracking library into your project. Learn more about [Ampli](../../data/ampli/).