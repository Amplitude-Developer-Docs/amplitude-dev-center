---
title: Client-side vs Server-side Sources
description: Learn the difference between Amplitude's client-side and server-side sources.
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