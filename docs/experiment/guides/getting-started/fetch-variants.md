---
title: Fetch Variants
description: How to fetch flag and experiment variants for a user using various methods.
template: guide.html
---

To evaluate a user for your flag,  **fetch** variants from Experiment's [remote evaluation](../../general/evaluation/remote-evaluation.md) servers. You can fetch variants for a user using either the [Evaluation REST API](../../apis/evaluation-api.md) or one of the [SDKs](../../index.md#sdks).

### Evaluation REST API

The [Evaluation REST API](../../apis/evaluation-api.md) is the fastest way to test your flag without having to install an SDK.

Input your `deployment_key` and a `user_id` into the table below. You may either copy the `curl` command, or press the **Fetch Variants** button to make the request in the browser.

--8<-- "includes/experiment-interactive-fetch-table.md"

### SDKs

[Experiment SDKs](../../index.md#sdks) make it even easier to fetch variants for a user. Client-side SDKs are especially useful for storing pre-fetched variants on the client-side for zero latency variant access.
