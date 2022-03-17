---
title: Set up a Deployment
desctiption: Define your access keys for feature flags and experiments. 
---


The first step in creating an experiment is to configure it. Configuring is a two-step process: first create a deployment, then install the SDK.

## Create a deployment

In Amplitude Experiment, a deployment is where you can serve a group of flags or experiments for code execution. Once you create a deployment, Experiment generates an access key, which you can then use to route your flags and experiments.

Deployments live under Amplitude Analytics projects. A project can have multiple deployments, but each deployment can only be attached to a single project.

1. From Experiment, click **Deployments** , then click **+ Add Environment**.
2. Choose the Amplitude Analytics project you'd like the deployment to be associated with. If you want to create deployments in multiple projects at once, just select all the relevant projects from the drop-down list.
3. Choose a name for your deployment and specify its type:
    - **Client-side**: These deployments run on a client device, such as a web browser or mobile app. The API key associated with client deployments can be viewed publicly and should be used in client-side SDKs.
    - **Server-side**: These deployments run on a server you control, such as a web server or batch processing system. The API key associated with server deployments should be kept secret and are for use in server-side SDKs. Server-side keys can access the REST API for flag evaluation. If, instead of running a full-blown experiment, you only need to evaluate flags using the REST API, you should create a server-side deployment.
    - Secret: These deployments run on a server you control. The API key associated with secret deployments should be kept secret. Secret keys have access to the full REST API. If you need to use the REST API for more than just flag evaluation, create a secret deployment.
4. Click **Add Environment**. Amplitude Experiment creates your deployments and generates keys to copy and use.

## Install the SDK

If you're not planning to use the REST API, the next step is to install the SDK. Each SDK has different installation instructions, which you can find by clicking through these links:

- [Browser JS (Client)](https://developers.experiment.amplitude.com/docs/javascript-client-sdk)
- [Node JS (Server)](https://developers.experiment.amplitude.com/docs/javascript-server-sdk)
- [Android (Client)](https://developers.experiment.amplitude.com/docs/android-sdk)
- [iOS (Client)](https://developers.experiment.amplitude.com/docs/ios-sdk)
- [React Native (Client)](https://developers.experiment.amplitude.com/docs/react-native-sdk)

SDKs send a request to Amplitude Experiment to determine which flag configurations should be served to a particular user. There are some important differences between client-side and server-side SDKs.

### Client-side SDKs

Client-side SDKs are meant to be run in the end-user application deployment. When choosing between client-side and server-side, keep in mind that client-side SDKs:

- Assume a single user deployment.
- Use client-side API Keys, which are public and visible to end users.
- Fetch variants up front for a given user.
- Store variants locally on the client for offline mode.

### Server-side SDKs

Server-side SDKs run in a server deployment. Server-side SDKs:

- Assume a multi-user deployment.
- Use server-side API Keys, which should be kept private.
- Fetch variants on each request.
- The User context.
- When assigning variants, the evaluation engine applies the targeting rules to a user context object. This object represents the identity of an individual user. In client-side SDKs, this object-user relationship is set on initialization and passed to the server on every request for variants. In server-side SDKs, the user may change, and should be set on every request.

When targeting individual users to allocate variants, Experiment matches on any of the listed user IDs ( `user_id` ) or device IDs ( `device_id` ). Using rule-based user segments matches on any of the predefined properties (`country`, `platform`, and so on), or on custom properties specified in the user_properties object.

```json
{
  "user_id": "Amplitude User ID",
  "device_id": "Amplitude Device ID",
  "country": "Country",
  "region": "Region",
  "city": "City",
  "dma": "DMA"
  "language": "Language",
  "platform": "Platform",
  "version": "Version",
  "device_family": "Device Family",
  "device_type": "Device Type",
  "carrier": "Carrier",
  "user_properties": {
    // you can attach custom user properties here
  }
}

```

!!!note
    You should use the same user identifiers (device ID and user ID) for Amplitude Experiment that you use for sending data to Amplitude Analytics. This way, identities will be resolved correctly, and data generated will be correctly associated with the same user in Analytics.
