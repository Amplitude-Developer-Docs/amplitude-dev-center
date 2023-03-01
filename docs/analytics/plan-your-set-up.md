---
title: Plan Your Set Up
description: Get started with Amplitude and set up instrumentation. 
---

Welcome to Amplitude! This document walks you through each of the steps needed to successfully set up and get familiar with Amplitude basics.

Amplitude is an event-based analytics tool that tracks the behaviors of users based on in-product interactions and analyzes user behaviors in real-time. It's highly recommended to review [What is Amplitude](../what-is-amplitude/) for a high-level overview before proceeding.

## Send data

Amplitude needs a data source to help you understand who your customers are and their behavior with your product. It's recommended to pick one source to start but you can always add more sources later. You can send data to Amplitude client-side, server-side, or through a third party.

There are two main ways to send data into Amplitude:

1. [Import existing data](./#import-existing-data) if you have data stored elsewhere
2. [Track data](./#track-product-data) using Amplitude SDKs and APIs if you are beginning from scratch

After your source is set up, use the [debugging guide](../../data/debugger/) to check your initial set up.

### Import existing data

If you already collect data outside of Amplitude, you can stream events directly from your chosen source by [adding a source](../../data/sources/#add-a-source).

### Track product data 

You can track your product data using Amplitude SDKs or APIs:

1. Determine which data source works best for your product (refer to [client-side vs server-side sources](../../data/sources/client-side-vs-server-side/))
2. Install a data source using [SDK Quick Start](../../data/sdks/sdk-quickstart/) Guide or [API Guide](../../analytics/apis/http-v2-api-quickstart/) 
3. Tag a few [important events](./#what-events-to-track) upfront.

## What events to track

!!!note "Know key concepts before you get started"
    See [What is Amplitude?](../what-is-amplitude/) for definitions of users, events, and properties.

If you're just starting out, Amplitude recommends **resisting the urge to track everything** upfront. The number of events you should track depends on the complexity of your product. 

Amplitude recommends to get started with two important events in your product to help you get initial insights. 

Here are some sample questions to get you thinking:

|Questions|Events|
|---------------|---------------|
|How many daily active users or how many logins per week do I get? | **Login** event|
|What percentage of users who add an item to their cart successfully checkout? | **Add to Cart** event and **Checkout** event|
|What percentage of sign ups request a demo? | **Sign Up** event and **Request Demo** event|
|What's the retention rate? How many users come back to the product after signing up 2 weeks later? | **Sign Up** event and **Session Start** event|

After successfully tracking these events, you can start to [track more](https://help.amplitude.com/hc/en-us/articles/115000465251-Data-taxonomy-playbook-part-one-Getting-started).

## Create a tracking plan

As you advance, it’s critical to [create a tracking plan](https://help.amplitude.com/hc/en-us/articles/5078731378203-Create-a-tracking-plan) document that outlines what events and properties to track, why you're tracking them, and where they're tracked. A tracking plan should be based on the business outcomes you’re trying to measure or improve.

If you are using Amplitude SDKs, it's recommended to use Ampli Wrapper which is a lightweight wrapper over the Amplitude SDK that provides type-safety, supports linting, and enables features like input validation. Ampli CLI works together with the Ampli wrapper to bring a tracking library into your project. Learn more about [Ampli](../../data/ampli/).