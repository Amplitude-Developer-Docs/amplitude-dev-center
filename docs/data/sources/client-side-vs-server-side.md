---
title: Client-side vs Server-side Sources
description: Learn the difference between Amplitude's client-side and server-side sources.
status: new
---

Client-side and server-side are terms that describe where an app's code runs: either on the user's device (client-side), or on a server (server-side). Amplitude has several types of sources to cover each of your needs. This doc primarily describes the differences between client-side and server-side sources, and gives a brief overview of third-party sources. 

## Client-side sources

Use client-side sources in apps that your users run on their own devices, like mobile, web browser, and desktop apps. In these types of sources, code runs on the user's device.

Amplitude's client-side sources include these SDKs:

- Web: Browser, Marketing Analytics Browser, React Native
- Mobile: Android, iOS, Unity Plugin, Flutter, React Native
  
See the [Analytics client-side SDKs](/data/sdks/#data-client-side-sdks) and the [Experiment client-side SDKs](/data/sdks/#experiment-client-side-sdks)

## Server-side sources

Use server-side sources in secure, multi-user environments like web servers and services that you run on your own servers. In these types of sources, code runs on the server. 

Amplitude's server-side sources include these SDKs and APIs:

- Node.js SDK
- Go SDK
- Python SDK
- Java SDK
- HTTP V2 API 
- Batch Event Upload API

See the [Analytics server-side SDKs](/data/sdks/#data-server-side-sdks) and the [Experiment server-side SDKs](/data/sdks/#experiment-server-side-sdks)

## Third-party sources

Third-party is another kind of source. These sources let you import data from other platforms into Amplitude. These sources all require that you have an account with the third-party sources, and each have different setup requirements. You can see all third-party sources in the [Source catalog](/data/sources).

## How to choose

Choosing the kinds of sources you need to use can be daunting, so here's a basic guide to help you make a decision.

- **Client-side**: Choose client-side sources for the simplest initial instrumentation.
- **Server-side**: Choose server-side sources if you want track server-side events and leverage existing user data tracking workflows.
- **Hybrid**: Choose a hybrid approach that includes both client-side and server-side sources to get the benefits of simpler implementation and ability to track server-side events. 
- **Third party**: Choose these sources if you already have a third-party data layer such as ad networks or marketing automation tools.
