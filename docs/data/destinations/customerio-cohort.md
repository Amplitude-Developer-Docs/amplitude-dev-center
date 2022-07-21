---
title: Send Cohorts to Customer.io 
description: Send Amplitude cohorts to Customer.io for use in automated messaging campaigns.
---

[Customer.io](http://customer.io/ "http://Customer.io") is a messaging platform that allows marketers to turn ideas into powerful automated message campaigns. [Customer.io](http://customer.io/ "http://Customer.io")'s logic-based tools help you capture every edge case and connect to the real people in your audience.

## Considerations

- This integration is only available for customers who have paid plans with Amplitude. 
- The users in your cohort must exist in Customer.io before the sync from Amplitude. Users that don't exist in Customer.io are ignored and not shown in the sync.
- You must enable this integration in each Amplitude project you want to use it in. 

## Setup

### Customer.io setup

1. Find your Customer.io API key by opening Customer.io and navigating to **Account Settings > API Credentials**.
2. Copy the **Tracking API Key**, the **Site ID**, and **App API Key**.

### Amplitude setup

1. In Amplitude, navigate to **Data Destinations**, then find **Customer.io - Cohort**.
2. Enter a name, tracking API key, site ID, and app API key. 
3. Select a region. 
4. Map an Amplitude property to the Customer.io user ID. 
5. Save when finished.

## Send a cohort

1. From the Cohorts page in Amplitude, click the cohort you want to send, or create a cohort.
2. Click **Sync**.
3. Select **Customer.io**, then click **Next**.
4. From the *Select an API target to sync to list*, select your destination.
5. Set the sync cadence.
6. When finished, click **Sync**.
  
After you have exported the cohort, you can see the cohort in the [Segments](https://customer.io/docs/segments/ "https://customer.io/docs/segments/") section of the Customer.io platform. You can use segments as recipient lists, campaign triggers, filters, conversion goals and more. Whenever you need to reference a subset of the people in your workspace, you'll use a segment.
