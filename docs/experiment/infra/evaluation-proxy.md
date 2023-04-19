---
title: Evaluation Proxy
description: Containerized service to enhance local evaluation running in your infrastructure.
icon: simple/docker
---

!!!beta "Evaluation Proxy is in closed beta."
    Reach out to your customer success manager or email [experiment@amplitude.com](mailto:experiment@amplitude.com) to request access to this feature.

!!!info "Resources"
    [:material-github: GitHub](https://github.com/amplitude/evaluation-proxy) · [:material-code-tags-check: Releases](https://github.com/amplitude/evaluation-proxy/releases) · [:simple-docker: Docker Image](https://hub.docker.com/r/amplitudeinc/evaluation-proxy) · [:simple-helm: Helm Chart](https://github.com/amplitude/evaluation-proxy-helm)
<br />
The Evaluation Proxy is a Service to enable, enhance, and optimize [local evaluation](../general/evaluation/local-evaluation.md) running within your infrastructure.

![Architectural diagram showing how the evaluation proxy interacts with your services and Amplitude.](../../../assets/images/experiment/evaluation-proxy.drawio.svg)

:material-check-circle: **Enable local evaluation on unsupported platforms**:<br /> Use remote [Evaluation APIs](../apis/evaluation-api.md) and [SDKs](../index.md#sdks) to run local evaluation in your infrastructure.

:material-check-circle: **Automatically track assignment events for local evaluations**:<br /> Identical assignment events are deduplicated for 24 hours.

:material-check-circle: **Enhance local evaluation with large cohort targeting**:<br /> Targeted cohorts are synced hourly to the Evaluation Proxy and added to the user prior to evaluation.

## Configuration

The evaluation proxy is either configured via a `yaml` file (recommended, more configuration options), or using environment variables.

The default location for the configuration yaml file is `/etc/evaluation-proxy-config.yaml`. You may also configure the file location using the `PROXY_CONFIG_FILE_PATH` environment variable.

The `yaml` configuration file base is an object with two primary sub objects:

* [`projects`](#projects) (required)
* [`configuration`](#configuration-1) (optional).

!!!tip "Recommended configuration"

    Replace the fields in the configuration with values specific to your account/infrastructure.

    ```yaml
    projects:
      - id: "YOUR PROJECT ID"
        apiKey: "YOUR API KEY"
        secretKey: " YOUR SECRET KEY"
        deploymentKeys:
          - "YOUR DEPLOYMENT KEY 1"
          - "YOUR DEPLOYMENT KEY 2"

    configuration:
      redis:
        uri: "YOUR REDIS URI" # e.g. "redis://localhost:6379"
    ```

???config "Environment variable configuration (click to open)"

    Environment configuration can only configure a single deployment within a single project. Environment variable configuration is only considered if the configuration file is not found.

    | Environment Variable | Description |
    | --- | --- |
    | `AMPLITUDE_PROJECT_ID` | The project's ID. Found in the project settings. |
    | `AMPLITUDE_API_KEY` | The project's [API key](../../guides/amplitude-keys-guide.md#api-key). |
    | `AMPLITUDE_SECRET_KEY` | The project's [secret key](../../guides/amplitude-keys-guide.md#secret-key). |
    | `AMPLITUDE_EXPERIMENT_DEPLOYMENT_KEY` | <span style="max-width:450px;display:inline-block">The key for the deployment to manage. The [deployment key](../../guides/amplitude-keys-guide.md#deployment-key) must exist within the same project as the API and secret key.</span> |
    | `AMPLITUDE_REDIS_URI` | The entire URI to connect to redis. Include the protocol, host, port, and optional username, password, and path (for example `redis://localhost:6379`). |
    | `AMPLITUDE_REDIS_PREFIX` | The prefix to connect  |

| Field | Type | Description |
| --- | --- | --- |
| `projects` | array | Required. See [`projects`](#projects). |
| `configuration` | object | Optional. See [`configuration`](#configuration-1) |

### `projects`

A required array of objects with the following fields, all which are required.

| <div class="big-column">Field</div> | <div style="max-width:450px;display:inline-block">Description</div> |
| --- | --- |
| `id` | The project's ID. Found in the project settings. |
| `apiKey` | The project's [API key](../../guides/amplitude-keys-guide.md#api-key). |
| `secretKey` | The project's [secret key](../../guides/amplitude-keys-guide.md#secret-key). |
| `deploymentKeys` | The keys of the deployments to manage within the project. The [deployment keys](../../guides/amplitude-keys-guide.md#deployment-key) must exist within the same project as the API and secret key. |

### `configuration`

An optional object of extra configuration.

| <div class="big-column">Field</div> | <div style="max-width:450px;display:inline-block">Description</div> |
| --- | --- |
| `redis` | Optional (Recommended). See [`redis`](#redis). Configure the proxy to use redis as persistent storage. |
| `flagSyncIntervalMillis` | Optional. The polling interval to update flag configurations (default `10000`). |
| `maxCohortSize` | Optional. The maximum size of targeted cohorts that the proxy can download (default `2147483647`). |

#### `redis`

Configure the evaluation proxy to use redis as a persistent storage. Highly recommended to enable the evaluation proxy to run efficiently.

| <div class="big-column">Field</div> | <div style="max-width:450px;display:inline-block">Description</div> |
| --- | --- |
| `uri` | Required. The full URI to connect to redis with. Include the protocol, host, port, and optional username, password, and path. |
| `readOnlyUri` | Optional. Optional URI to connect to read only replicas for high scaling high volume reads to redis read replicas. |
| `prefix` | Optional. A prefix for all keys saved by the evaluation proxy (default `amplitude`). |

## Deployment

The evaluation proxy is stateless, and should be deployed with multiple instances behind a load balancer for high availability and scalability.
For example, a kubernetes deployment with greater than one replica.

### Kubernetes

Use the evaluation proxy [Helm chart](https://github.com/amplitude/evaluation-proxy-helm) to install the proxy service on kubernetes or generate the files needed to deploy the service manually. The repository also contains an [example of running the evaluation proxy on kubernetes](https://github.com/amplitude/evaluation-proxy-helm/tree/main/example) locally using `minikube`.

#### Add helm repo

```bash
helm repo add \
    evaluation-proxy-helm https://amplitude.github.io/evaluation-proxy-helm
```

#### Configure `values.yaml`

Configure the chart values. The recommended approach to configuring and installing the helm chart is using a values.yaml configuration file.

The chart's `evaluationProxy` value contents exactly match the evaluation proxy's configuration file fields.

```yaml title="values.yaml"
evaluationProxy:
  # At least one project is required.
  projects:
    - id: "TODO"
      apiKey: "TODO"
      secretKey: "TODO"
      deploymentKeys:
        - "TODO"
  configuration: {}
#    redis:
#      uri: "redis://redis-master.default.svc.cluster.local:6379"
```

#### Install helm chart

```bash
helm install -f values.yaml \
    evaluation-proxy evaluation-proxy-helm/evaluation-proxy
```

### Docker

You may run [the docker image](https://hub.docker.com/r/amplitudeinc/evaluation-proxy) directly. First, create a [configuration](#configuration) file, then run the docker image mounting the file as a volume to the expected directory in the container.

```bash
docker run \
    -v CONFIG_FILE_PATH:/etc/evaluation-proxy-config.yaml \
    amplitudeinc/evaluation-proxy
```

!!!tip "Docker compose example"
    The [evaluation-proxy GitHub repository](https://github.com/amplitude/evaluation-proxy) also contains an example using `docker compose` to run the proxy alongside a local redis image.

## Evaluation

The Evaluation Proxy exposes remote [Evaluation API](../apis/evaluation-api.md) and [SDK](../index.md#sdks) endpoints to run local evaluation within your cluster. This is useful to enable platforms and languages which aren't supported by local evaluation SDKs. As an added benefit, fetch requests made to the evaluation proxy can target cohorts of users, and have assignment events tracked automatically to Amplitude.

**Requests must be sent to the service using `http` on port `3546`.** 

!!!example "Kubernetes" 
    A Kubernetes deployed Evaluation Proxy service (named `evaluation-proxy`) running within a kubernetes namespace `prod` may be accessed from within the cluster at: `http://evaluation-proxy.prod.svc.cluster.local:3546`

## SDK proxy mode

Certain local evaluation SDKs are configurable to run in proxy mode. In proxy mode, flag configurations, full cohorts, and cohort memberships are synced from the evaluation proxy rather than from Amplitude directly. This reduces SDK startup time and provides redundancy for flags and cohorts for local evaluation SDKs running within your infrastructure.

| SDK | Proxy Mode Support |
| --- |:---:|
| [:material-language-java: Java/Kotlin](../sdks/jvm-sdk.md) |  :material-check-bold:{ .green } |
| [:material-nodejs: Node.js](../sdks/nodejs-sdk.md) |  :material-close-thick:{ .red } |
| [:material-language-ruby: Ruby](../sdks/ruby-sdk.md) |  :material-close-thick:{ .red } |
| [:fontawesome-brands-golang: Go](../sdks/go-sdk.md) |  :material-close-thick:{ .red } |
| [:material-language-python: Python](../sdks/python-sdk.md) |  :material-close-thick:{ .red } |