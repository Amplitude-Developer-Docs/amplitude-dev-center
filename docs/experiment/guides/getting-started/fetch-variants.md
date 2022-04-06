---
title: Fetch Variants
description: How to fetch flag and experiment variants for a user using various methods.
---

You can fetch variants for a user using either the [Evaluation API]() or one of our SDKs.

## Evaluation API

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

## SDK

TODO