---
title: What is Amplitude?
description: Amplitude Analytics is the leading product analytics tool. It helps you gather and democratize data about how users engage with your apps.
---
<script src="https://fast.wistia.com/embed/medias/g704qzqk6e.jsonp" async></script><script src="https://fast.wistia.com/assets/external/E-v1.js" async></script><div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div class="wistia_embed wistia_async_g704qzqk6e videoFoam=true" style="height:100%;position:relative;width:100%"><div class="wistia_swatch" style="height:100%;left:0;opacity:0;overflow:hidden;position:absolute;top:0;transition:opacity 200ms;width:100%;"><img src="https://fast.wistia.com/embed/medias/g704qzqk6e/swatch" style="filter:blur(5px);height:100%;object-fit:contain;width:100%;" alt="" aria-hidden="true" onload="this.parentNode.style.opacity=1;" /></div></div></div></div>

Amplitude is a powerful product analytics platform that enables you to build better products by tracking and understanding user behavior. 

With Amplitude, you can track user data and gain insights into user engagement, retention, and revenue. Amplitude keeps your data trustworthy and secure, ensuring that you have access to accurate and reliable information. Amplitude offers powerful analytics tools that help answer questions about what happened, why it happened, and which actions to take next. With Amplitude, you can seamlessly share your work across teams, facilitating collaboration and driving growth.

If you are new to Amplitude, it's recommended to complete [this course](https://academy.amplitude.com/path/getting-started-with-amplitude-analytics-learning-path) to get started.

## Key concepts

Before you get started with Amplitude, it's important to know the key concepts used in Amplitude. 

|Name|Description|A music player app example)|
|---|-----------|-----------|
|Users|A user is the specific individual that interacts with your product|A user uses the app to play music|
|Events|An event is an action a user has taken|A user presses the "Play Song" button|
|User Properties|User properties are details about users|Whether a user is on a paid or free plan|
|Event Properties|Event properties are details about events|The genre of the music|
|Sessions|A session is the period of time a user has your app|A user uses the app to play music|

TL;DR: If you aren't interested in the details of these concepts you can stop reading now. 

### Users

A user is the specific individual that completed an interaction with your product. Amplitude analyses depend on accurately tracking **unique users**. This is often trickier than it sounds, because your users can log in and out at will, browse anonymously, or use multiple devices. 

You can learn more about how to [identify your users](https://help.amplitude.com/hc/en-us/articles/206404628) and [how Amplitude tracks unique users](https://help.amplitude.com/hc/en-us/articles/115003135607-Track-unique-users-in-Amplitude) by using a combination of device IDs, user IDs, and Amplitude IDs.

### Events

An event is an action a user has taken. For example, you could send an “Play Song” event every time a user presses the Play button in a music player application.

You can learn more about how to [track events and understand your users' actions](https://help.amplitude.com/hc/en-us/articles/206404698).

### Properties

Here are two types of properties: event properties and user properties. 

#### Event properties

Event Properties are details about events. For example, when someone presses the “Play Song” event in a music player application, you can use event properties to track the genre. Any detail related to the event can be an event property.

#### User properties

User properties are details about users. For example, you could keep track of whether a user was on a paid or free plan in a music player application.

### Sessions

A session is the period of time a user has your app in the foreground or has your website open. Sessions are a useful metric in Amplitude for understanding the frequency and duration of your users' engagement with your product. Amplitude assigns a session ID to each session, and all events within the same session share the same session ID. To send data, Amplitude SDKs automatically generate and manage session IDs. However, you have to manage session IDs yourself, you use HTTP APIs. 

You can learn more about [how Amplitude tracks sessions](https://help.amplitude.com/hc/en-us/articles/115002323627-Tracking-Sessions).

Learn more [helpful definitions](https://help.amplitude.com/hc/en-us/articles/204620508-Helpful-definitions).