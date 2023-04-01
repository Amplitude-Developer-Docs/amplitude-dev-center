---
title: Evaluation Proxy
description: Containerized service to enhance local evaluation running in your infrastructure.
icon: simple/docker
---

!!!beta "Evaluation Proxy is in closed beta."
    Reach out to your customer success manager or email [experiment@amplitude.com](mailto:experiment@amplitude.com) to request access to this feature.

The Evaluation Proxy is a Service to enable, enhance, and optimize [local evaluation](../general/evaluation/local-evaluation.md) running within your infrastructure.

![Architectural diagram showing how the evaluation proxy interacts with your services and Amplitude.](../../../assets/images/experiment/evaluation-proxy.drawio.svg)

:material-check-circle: **Enable local evaluation on unsupported platforms**:<br /> Use remote [Evaluation APIs](../apis/evaluation-api.md) and [SDKs](../index.md#sdks) to run local evaluation in your infrastructure.

:material-check-circle: **Automatically track assignment events for local evaluations**:<br /> Identical assignment events are deduplicated for 24 hours.

:material-check-circle: **Enhance local evaluation with large cohort targeting**:<br /> Targeted cohorts are synced hourly to the Evaluation Proxy and added to the user prior to evaluation.

## Configuration

The evaluation proxy requires keys as environment variables to run. Otherwise, the service crashes on startup.

| <div class="big-column">Environment Variable</div> | Description |
| --- | --- |
| `AMPLITUDE_API_KEY` | The project's API key. |
| `AMPLITUDE_SECRET_KEY` | The project's secret key. |
| `AMPLITUDE_DEPLOYMENT_KEY` | The key for the deployment to manage. The deployment key must exist within the same project as the API and secret key. |

## Deployment

The evaluation proxy is stateless, and should be deployed with multiple instances behind a load balancer for high availability and scalability.
For example, a kubernetes deployment with greater than one replica.

### Docker

The service is deployed via a [docker image](https://hub.docker.com/r/amplitudeinc/evaluation-proxy).

#### Pull

```bash
docker pull amplitudeinc/evaluation-proxy
```

#### Run

```bash
docker run \
    -e AMPLITUDE_API_KEY=${AMPLITUDE_API_KEY} \
    -e AMPLITUDE_SECRET_KEY=${AMPLITUDE_SECRET_KEY} \
    -e AMPLITUDE_DEPLOYMENT_KEY=${AMPLITUDE_DEPLOYMENT_KEY} \
    -p 3546:3546 \
    amplitudeinc/evaluation-proxy
```

### Source

Build and run the service from source.

#### Build

```bash
./gradlew assemble
```

#### Run

```bash
./gradlew run
```

## Evaluation

The Evaluation Proxy exposes remote [Evaluation API](#TODO) and [SDK](#TODO) endpoints to run local evaluation within your cluster. This is useful to enable platforms and languages which aren't supported by local evaluation SDKs. As an added benefit, fetch requests made to the evaluation proxy can target cohorts of users, and have assignment events tracked automatically to Amplitude.

**Requests must be sent to the service using `http` on port `3546`.** For example, a deployed Evaluation Proxy service (named `evaluation-proxy`) running within a kubernetes namespace `prod` may be accessed from within the cluster at:

```
http://evaluation-proxy.prod.svc.cluster.local:3546
```

## SDK proxy mode

Certain local evaluation SDKs are configurable to run in proxy mode. In proxy mode, flag configurations, full cohorts, and cohort memberships are synced from the evaluation proxy rather than from Amplitude directly. This reduces SDK startup time and provides redundancy for flags and cohorts for local evaluation SDKs running within your infrastructure.

| SDK | Proxy Mode Support |
| --- |:---:|
| [:material-language-java: Java/Kotlin](../sdks/jvm-sdk.md) |  :material-check-bold:{ .green } |
| [:material-nodejs: Node.js](../sdks/nodejs-sdk.md) |  :material-close-thick:{ .red } |
| [:material-language-ruby: Ruby](../sdks/ruby-sdk.md) |  :material-close-thick:{ .red } |
| [:fontawesome-brands-golang: Go](../sdks/go-sdk.md) |  :material-close-thick:{ .red } |
| [:material-language-python: Python](../sdks/python-sdk.md) |  :material-close-thick:{ .red } |