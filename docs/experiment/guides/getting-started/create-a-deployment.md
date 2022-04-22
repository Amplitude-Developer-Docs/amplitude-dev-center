---
title: Create a Deployment
description: How to create a deployment for delivering your feature flags and experiments.
template: guide-first.html
---

Before creating a [feature-flag or experiment](../../general/data-model.md#flags-and-experiments), you'll need to first create a [deployment](../../general/data-model.md#deployments). In Amplitude Experiment, a deployment serves a group of flags or experiments for use in an application. Deployments have an associated key which is used to authorize requests to Amplitude Experiment's evaluation servers.

!!!info
    Deployments live within Amplitude Analytics [projects](../../general/data-model.md#projects). A project can have multiple deployments, but each deployment can only be attached to a single project.

TODO: Images for how to create a deployment

1. From Experiment, click **Deployments** in left nav bar, then click **+ Add Deployment**.
2. Choose the Amplitude Analytics project you'd like the deployment to be associated with. If you want to create deployments in multiple projects at once, just select all the relevant projects from the drop-down list.
3. Choose a name (e.g. `getting-started`) for your deployment and specify its type:
    - **Client-side**: These deployments run on a client device, such as a web browser or mobile app. The API key associated with client deployments can be viewed publicly and should be used in client-side SDKs.
    - **Server-side**: These deployments run on a server you control, such as a web server or batch processing system. The API key associated with server deployments should be kept secret and are for use in server-side SDKs.
4. Click **Add Deployment**.