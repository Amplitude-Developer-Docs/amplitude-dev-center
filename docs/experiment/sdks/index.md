---
title: Experiment SDKS Overview
description:
---

Welcome to the Amplitude Experiment SDK introduction. This section Introduces SDK fundamentals and describes core concepts encompassing Experiment SDK usage across all platforms.

At its core, Amplitude Experiment SDKs `fetch` assigned variants (evaluated by the server) for a user within an [deployment](../create-deployment.md). Your application can then use the variant information provided by the SDK to customize the experience for the user.

## Concepts

Before integrating an Experiment SDK into your application/server, it may be useful to understand some core concepts:

- [Client vs Server SDKs](https://developers.experiment.amplitude.com/docs/client-side-vs-server-side)
- [Experiment User](https://developers.experiment.amplitude.com/docs/experiment-user)
- [Configuration](https://developers.experiment.amplitude.com/docs/configuration)
- [Variants](https://developers.experiment.amplitude.com/docs/variants)
- [User Providers](https://developers.experiment.amplitude.com/docs/user-providers)
- [Server-side Rendering](https://developers.experiment.amplitude.com/docs/server-side-rendering)

### Client-side versus Server-side SDKs

Client-side SDKs are meant to be run in the end user application deployment. Client-side SDKs:
- Assume a single user deployment
- Use Client Keys, which are public and visible to the end user
- Fetch variants up front for a given user
- Store variants locally on the client for offline mode

Server-side SDKs are meant to be run in a server deployment. Server-side SDKs:

- Assume a multi user deployment
- Use Server Keys, which should be kept private
- Fetch variants on each request

## Implementations

The following table lists the current Experiment SDK implementations.

| Platform / Language | Client / Server |
| --- | --- |
| [JavaScript](https://developers.experiment.amplitude.com/docs/javascript-client-sdk) | Client |
| [Node](https://developers.experiment.amplitude.com/docs/javascript-server-sdk) | Server |
| [Android](https://developers.experiment.amplitude.com/docs/android-sdk) | Client |
| [iOS](https://developers.experiment.amplitude.com/docs/ios-sdk) | Client |
| [React Native](https://developers.experiment.amplitude.com/docs/react-native-sdk) | Client |

Is your desired language or platform not supported with an SDK? Contact us at <experiment@amplitude.com> to let us know--we'd be happy to help.
