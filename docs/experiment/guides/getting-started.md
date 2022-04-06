---
title: Getting Started
description: Step-by-step guide to get started developing with Amplitude Experiment.
---

!!!info "Flag vs Experiment"
    You may want to create an experiment instead of a flag. Since the underlying model and creation flow is very similar, you may follow along with the guide creating an experiment instead of a flag. The main difference is the user interface and the default variants (i.e. an experiment has two variants, control and treatment, by default)

## Create a Deployment

Before creating a feature-flag or experiment, you'll want to first create a[deployment](). In Amplitude Experiment, a deployment serves a group of flags or experiments for use in an application. Deployments have an associated key which is used to authorize requests to Amplitude Experiment's evaluation servers.

Deployments live within Amplitude Analytics projects. A project can have multiple deployments, but each deployment can only be attached to a single project.

1. From Experiment, click **Deployments** in left nav bar, then click **+ Add Deployment**.
2. Choose the Amplitude Analytics project you'd like the deployment to be associated with. If you want to create deployments in multiple projects at once, just select all the relevant projects from the drop-down list.
3. Choose a name (e.g. `getting-started`) for your deployment and specify its type:
    - **Client-side**: These deployments run on a client device, such as a web browser or mobile app. The API key associated with client deployments can be viewed publicly and should be used in client-side SDKs.
    - **Server-side**: These deployments run on a server you control, such as a web server or batch processing system. The API key associated with server deployments should be kept secret and are for use in server-side SDKs.
4. Click **Add Deployment**.

## Create a Flag

1. From the Flags screen in Experiment, select your target project from the dropdowns.
2. Click **Create Flag**.
3. Enter a **Name** for the flag (e.g. `Getting Started`).
   1. Experiment will automatically generate a normalized **Key** for your flag/experiment. The key is the string which is used to access the variant in you application. You may choose to customize this key, as once the key is set it cannot be changed.
4. (Optional) Enter a **Flag Description** (e.g. `Getting started with Amplitude Experiment`) to better describe the flag.
5. Save the experiment configuration. You can edit most fields from the flag's settings.

### Add a Deployment

Once you've created the flag, you'll need to add a deployment. To add a deployment, click the selection drop down in the upper right corner of the screen and select the deployment you created previously.

!!!tip "Multiple Deployments"
    You may select multiple deployments in the dropdown if you want to target multiple deployments. E.g. if you are running an experiment on both your iOS and Android apps, you should create separate deployments for each and select both in the multi-deployment experiment.

### Define Variants

After you have created your flag, you are ready to define its variants. A flag will contain an initial variant, "on", by default. If you are rolling out more than one variant of a feature, add variants using the **Create Variant** button. Make sure to add descriptions to your variants so that your team members can follow along.

!!!info ""
    Your flag must have at least one variant.

### Configure Targeting Rules

Your flag will not target any users by default. To target users, navigate to the "Targeting" tab and set the **Percentage Rollout** to 100%. Now all users who fetch variants using the

### Activate the Flag

Once you're done configuring your flag, activate the flag using the toggle in the upper right corner and follow the instructions in the activation modal.

## Fetch Variants

To evaluate a user for you flag you'll need to **fetch** variants. You can either set up an [SDK]() in your application or simply use the curl a request to our [Evaluation REST API]() to get started quickly. Use the following `curl` replacing `<USER_ID>` and `<EXPERIMENT_DEPLOYMENT_KEY>`, with the User ID and Deployment key respectively.

```
curl --request GET \
     --url 'https://api.lab.amplitude.com/v1/vardata?user_id=<USER_ID>' \
     --header 'Authorization: Api-Key <EXPERIMENT_DEPLOYMENT_KEY>'
```

You should see the following JSON in the response body:

```
{"getting-started":{"key":"on"}}
```

## Track Exposure

[Exposure tracking]() plays a key role in tracking when a user has actually viewed the variable experience from your feature flag. Exposure tracking may be considered optional for feature flags don't require any analysis; however, it is essential when running experiment, since accurate exposure tracking is crucial for reliable results.

As with fetching variants, exposure tracking can be simplified by using a [client-side Experiment SDK]() in your application. Client-side Experiment SDKs come equipped with the ability to [automatically track exposures]() through your installed analytics SDK whenever a variant is accessed from the variant store.

To keep things simple, we're going to track an [exposure event]() on the [Analytics REST API 2.0]() using `curl`.

```
curl --request POST \
     --url https://api2.amplitude.com/2/httpapi \
     --data '{"api_key": "<ANALYTICS_API_KEY>","events":[{"event_type":"$exposure","user_id":"<USER_ID>","event_properties":{"flag_key":"<FLAG_KEY>","variant":"<VARIANT>"}}]}'
```

* `<ANALYTICS_API_KEY>`: The analytics api key from project which you created your flag and deployment in.
* `<USER_ID>`: the user ID used to fetch variants.
* `<FLAG_KEY>`: The flag key; `getting-started` if you're using the naming from this guide.
* `<VARIANT>`: The variant key, `on` if you're using the default flag variant.

If the request succeeded, you should see a user in the Exposures chart in Experiment.

!!!success "Done!"
    Your flag is now active within your deployment and a user has been evaluated and exposed to a variant.
