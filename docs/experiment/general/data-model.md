---
title: Data Model
description: An overview of the data model used in Amplitude Experiment.
---

At the top level in Amplitude is your **organization**. Within an organization, Amplitude Experiment follows the **project** structure defined by Amplitude Analytics. In short, all Experiment data must be associated with an Amplitude Analytics project.

[Flags](#flags-and-experiments), [experiments](#flags-and-experiments), and [deployments](#deployments) all live within an Amplitude project.
<br />

![Data model diagram](../../assets/images/experiment/data-model.drawio.svg)

## Projects

Experiment uses the same projects which are required for Amplitude Analytics. Generally speaking you want to create a project per product and per environment. Since [flags](#flags-and-experiments), [experiments](#flags-and-experiments), and [deployments](#deployments) only exist within a single project, you will want to duplicate these objects across projects for the same product.

!!!tip "Copying a flag to another project"
    When developing a new feature with an experiment, you can create the experiment in the dev environment project to develop and test that the implementation is correct, then copy the experiment into the prod project to run the experiment in prod.

## Deployments

In Amplitude Experiment, a deployment serves a group of flags or experiments for use in an application. Deployments have an associated randomly generated **deployment key** (a.k.a API key) which is used to uniquely identify the deployment and authorize requests to Amplitude Experiment's evaluation servers. 

!!!info "Client vs Server Deployments"
    Deployments are either client or server deployments. Only server deployments can utilize access flag configs for [local evaluation](./evaluation/local-evaluation.md), and should not be shared to made public in any way.

Deployments live within Amplitude Analytics projects; a project may have multiple deployments. Deployments are [added to Flags and Experiments](../guides/getting-started/create-a-flag.md#add-a-deployment) which exist within the same project. When a request to fetch variants for a user is received by Experiment's evaluation servers, the deployment key is used to look up all associated flags and experiments for evaluation.

## Flags and experiments

Feature flag and experiments are used to serve a variable experience to a user. They're identified by the **flag key**, associated with `0-n` [deployments](#deployments), and contains `1-k` [variants](#variants). Additionally, the **evaluation mode** (local or remote) determines whether or not the flag or experiment can be [locally evaluated](evaluation/local-evaluation.md) and may limit the targeting capabilities for the flag if set to local (local evaluation mode flags cannot utilize advanced targeting features like behavioral cohorts).

### Comparison

Feature flags and experiments share the same underlying data model, and can be migrated from one to the other retroactively. The most visible difference comes in the product interface: experiments guide you through an experiment lifecycle and give you the ability to define success metrics and perform analysis; whereas flags are more bare-bones, and don't include special planning and analysis sections.

#### Flags

Used for standard feature flagging without user analysis. When created, comes with a default variant, `on`.

!!!example "Flag Use Cases"
    - Rolling out a feature to a subset of users (e.g. beta customers).
    - Different experience for a behavioral cohort (e.g. power users).

#### Experiments

Used for feature experimentation on users. When created, comes with two default variants, `control` and `treatment`.

!!!example "Experiment Use Cases"
    - Run an A/B test for a new feature in your application.
    - Experiment on multiple recommendation algorithms on your server.

## Variants

A variant exists within a flag or an experiment, and represents a variable experience for a user.

|<div class='med-column'> Property </div>| Requirement | Description |
| --- | --- | --- |
| `Value` | **Required** | A string which identifies the variant in the instrumentation. The value string is checked for equality when a variant is accessed from the SDK or [Evaluation REST API](../apis/evaluation-api.md). Formatting is limited to all lower case kebab-case or snake_case. |
| `Payload` | Optional | Dynamic JSON payload for sending arbitrary data down with the variant. For example, you could send down a hex code to to change the color of a component in your application. |
| `Name` | Optional | Additional name on top of the `Value` without formatting limitations. Also useful to re-name the variant without potentially breaking the instrumentation in your code base. |
| `Description` | Optional | A more detailed description of the variant. Can be used to describe what the user experiences when viewing the variable experience in more detail. |

!!!info "SDK Usage"
    Only the `Value` and `Payload` are available when accessing a variant from an SDK or the [Evaluation REST API](../apis/evaluation-api.md).

## Users

Experiment users map neatly to a user within Amplitude Analytics. Alongside flag configurations, users are used as input to [evaluation](evaluation/implementation.md). The properties on the user can be used in flag and experiment targeting rules.

Within Amplitude Experiment, users are passed to evaluation via `fetch` requests in [remote evaluation](evaluation/remote-evaluation.md), or directly to the `evaluate` function for [local evaluation](evaluation/local-evaluation.md).

!!!warning
    **Either a user ID or device ID must be included in the user object for evaluation to succeed.** E.g. remote evaluation will return a 400 error if both the User ID and Device ID are null, empty, or missing.

| <div class='med-big-column'> Property </div> | Type | Description |
| --- | --- | --- |
| `user_id` | `string` | The [User ID](https://help.amplitude.com/hc/en-us/articles/206404628-Step-2-Identifying-your-users#h_533ee533-f04d-49d3-873f-5836945f43a6) is the primary identifier for the user, generally when the user is logged into an account within your system. The User ID is used when resolving the Amplitude ID on enrichment  prior to [remote evaluation](evaluation/remote-evaluation.md) where the Amplitude ID is used the default bucketing key. |
| `device_id` | `string` | The Device ID is the secondary identifier for the user, generally randomly generated by an analytics SDK on the client side or on the server-side and set in a cookie. The Device ID is also used when resolving the Amplitude ID on enrichment prior to [remote evaluation](evaluation/remote-evaluation.md) where the Amplitude ID is used the default bucketing key. |
| `user_properties` | `object` | Optional object of additional custom properties to be taken into consideration when evaluating the user during local or remote evaluation.  |
| `groups` | `object` | :material-beta: Optional object listing groups associated with this user. Format is an object where the key is the group type, and the value is an array of strings, the group value for the type (e.g. `{"org name":["Amplitude"]}`)  |
| `group_properties` | `object` | :material-beta: Optional object listing group properties associated with this user. Format is an nested object where the key is the group type, and the value is an object where the key is a the group value, and the value is an object of properties (e.g. `{"org name":{"Amplitude":{"plan":"enterprise"}}}`) |

!!!beta "Group level bucketing & analysis"
    If your organization has purchased the [Accounts add-on](https://help.amplitude.com/hc/en-us/articles/115001765532-Account-level-reporting-in-Amplitude) you may perform bucketing and analysis on groups rather than users. Reach out to your representative to gain access to this beta feature.

    Groups must either be included in the user sent with the fetch request (recommended), or identified with the user via a group identify call from the [Group Identify API](../../analytics/apis/group-identify-api.md) or via [`setGroup()` from an analytics SDK](../../data/sdks/typescript-browser/index.md#user-groups).

    Supported Experiment SDKs:

    * [:javascript-color: JavaScript](../sdks/javascript-sdk.md#fetch)

???abstract "Full User Definition"
    ```json
    {
        "user_id": string,
        "device_id": string,
        "country": string,
        "region": string,
        "city": string,
        "dma": string,
        "language": string,
        "platform": string,
        "version": string,
        "os": string,
        "device_manufacturer": string,
        "device_brand": string,
        "device_model": string,
        "carrier": string,
        "library": string,
        "user_properties": object,
        "groups": object,
        "group_properties": object
    }
    ```