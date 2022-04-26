---
title: Fetch Variants
description: How to fetch flag and experiment variants for a user using various methods.
template: guide.html
---

You can fetch variants for a user using either the [Evaluation REST API](../../apis/evaluation-api.md) or one of our [SDKs](../../index.md#sdks).

## Evaluation REST API

To evaluate a user for you flag you'll want to **fetch** variants from our [remote evaluation](../../general/evaluation/remote-evaluation.md) servers. Use the following `curl` replacing `<USER_ID>` and `<EXPERIMENT_DEPLOYMENT_KEY>`, with the User ID and Deployment key respectively.

```
curl --request GET \
     --url 'https://api.lab.amplitude.com/v1/vardata?user_id=<USER_ID>' \
     --header 'Authorization: Api-Key <EXPERIMENT_DEPLOYMENT_KEY>'
```

Replace the following variables with your own values:

| <div class='big-column'>Variable</div> | Description |
| --- | --- |
|   `<EXPERIMENT_DEPLOYMENT_KEY>` | The [deployment](../../general/data-model.md#deployments) key you [created](./create-a-deployment.md). |
| `<USER_ID>` | The user ID used to fetch variants. This should be the same [user](../../general/data-model.md#users) you [track exposure](./track-exposure.md) for. |

You should see the following JSON in the response body:

```
{"getting-started":{"key":"on"}}
```

## SDKs

[Experiment SDKs](../../index.md#sdks) make it even easier to fetch variants for a user. Client-side SDKs are especially useful for storing pre-fetched variants on the client-side for zero latency variant access.
