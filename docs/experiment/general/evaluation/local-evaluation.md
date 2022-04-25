---
title: Local Evaluation (Alpha)
description: Detailed information about Amplitude Experiment's local evaluation architecture, limitations, and tradeoffs.
---

Server-side [local evaluation](./general/evaluation/local-evaluation.md) runs [evaluation logic](./general/evaluation/implementation.md) on your server, saving you the overhead incurred by making a network request per user evaluation. The [sub-millisecond evaluation](./general/performance-and-caching.md#local-evaluation) is perfect for latency-minded systems which need to be performant at scale.

![Client-side local evaluation experimentation diagram.](../../../assets/images/experiment/server-side-local-overview.drawio.svg)

## Targeting Capabilities

Because local evaluation happens outside of Amplitude, advanced targeting and identity resolution powered by Amplitude Analytics is not supported. That said, local evaluation allows you to perform consistent bucketing with target segments, which is sufficient in many cases.

| <div class='big-column'>Feature</div> | Remote Evaluation | Local Evaluation |
| --- | --- | --- |
| [Consistent bucketing](./implementation.md#consistent-bucketing) | :material-check-bold:{ .green } | :material-check-bold:{ .green } |
| [Individual inclusions](./implementation.md#individual-inclusions) | :material-check-bold:{ .green } | :material-check-bold:{ .green } |
| [Targeting segments](./implementation.md#allocation-bucketing) | :material-check-bold:{ .green } | :material-check-bold:{ .green } |
| [Amplitude ID resolution](#TODO) | :material-check-bold:{ .green } | :material-close-thick:{ .red } |
| [User enrichment](#TODO) | :material-check-bold:{ .green } | :material-close-thick:{ .red } |
| [Sticky bucketing](./implementation#sticky-bucketing) | :material-check-bold:{ .green } | :material-close-thick:{ .red } |

## Architectures

Local evaluation architecture decisions must be made depending on your use case.

TODO



## SDKs

Local evaluation is only supported by server-side SDKs which have local evaluation implemented.

| SDK | Remote Evaluation | Local Evaluation | Version |
| --- | --- | --- | --- |
| [:material-nodejs: Node.js](../sdks/nodejs-sdk.md) |  :material-check-bold:{ .green } | :material-check-bold:{ .green } | `1.1.0-alpha.8` |

### Performance

The following results were collected over 10 executions of 10,000 iterations of evaluation with randomized user inputs evaluated for 1 flag configuration, selected at random out of 3 possible flag configurations.

| SDK | Average | Median | Cold Start |
| --- | --- | --- | --- |
| [:material-nodejs: Node.js](../sdks/nodejs-sdk.md) | 0.025ms | 0.018ms | 3ms |
