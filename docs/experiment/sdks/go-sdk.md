---
title: Experiment Go SDK (Beta)
description: Official documentation for Amplitude Experiment's server-side Go SDK implementation.
icon: fontawesome/brands/golang
---

Official documentation for Amplitude Experiment's server-side Go SDK implementation.

![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/amplitude/experiment-go-server?sort=semver)

!!!info "SDK Resources"
    [:material-github: Github](https://github.com/amplitude/experiment-go-server) · [:material-code-tags-check: Releases](https://github.com/amplitude/experiment-go-server/releases)

This documentation is split into two sections for [remote](../general/evaluation/remote-evaluation.md) and [local](../general/evaluation/local-evaluation.md) evaluation:

* [Remote evaluation](#remote-evaluation)
* [Local evaluation](#local-evaluation)

## Remote evaluation

Implements fetching variants for a user via [remote evaluation](../general/evaluation/remote-evaluation.md).

### Install

Install the Go Server SDK using `go get`.

```bash
go get github.com/amplitude/experiment-go-server
```

!!!tip "Quick Start"

    1. [Initialize the experiment client](#initialize)
    2. [Fetch variants for the user](#fetch)
    3. [Access a flag's variant](#fetch)

    ```go
    // (1) Initialize the local evaluation client with a server deployment key.
    client := remote.Initialize("<DEPLOYMENT_KEY>", nil)

    // (2) Fetch variants for a user
    user := &experiment.User{
      UserId:   "user@company.com",
      DeviceId: "abcdefg",
      UserProperties: map[string]interface{}{
        "premium": true,
      },
    }
    variants, err := client.Fetch(user)
    if err != nil {
      // Handle error
    }

    // (3) Access a flag's variant
    variant := variants["<FLAG_KEY>"]
    if variant.Value == "on" {
        // Flag is on
    } else {
        // Flag is off
    }
    ```

### Initialize

The SDK client should be initialized in your server on startup. The [deployment key](../general/data-model.md#deployments) argument passed into the `apiKey` parameter must live within the same project that you are sending analytics events to.

```go
func Initialize(apiKey string, config *Config) *Client
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `apiKey` | required | The [deployment key](../general/data-model.md#deployments) which authorizes fetch requests and determines which flags should be evaluated for the user. |
| `config` | optional | The client [configuration](#configuration) used to customize SDK client behavior. |

```go
client := remote.Initialize("<DEPLOYMENT_KEY>", nil)
```

#### Configuration

The SDK client can be configured on initialization.

???config "Configuration Options"
    | <div class="big-column">Name</div> | Description | Default Value |
    | --- | --- | --- |
    | `Debug` | Set to `true` to enable debug logging. | `false` |
    | `ServerUrl` | The host to fetch flag configurations from. | `https://api.lab.amplitude.com` |
    | `FlagConfigPollingInterval` |  The timeout for fetching variants in milliseconds. This timeout only applies to the initial request, not subsequent retries | `500 * time.Millisecond` |
    | `RetryBackoff.FetchRetries` | The number of retries to attempt if a request to fetch variants fails. | `1` |
    | `RetryBackoff.FetchRetryBackoffMin` | The minimum (initial) backoff after a request to fetch variants fails. This delay is scaled by the `RetryBackoff.FetchRetryBackoffScalar` | `0` |
    | `RetryBackoff.FetchRetryBackoffMax` | The maximum backoff between retries. If the scaled backoff becomes greater than the max, the max is used for all subsequent requests | `10 * time.Second` |
    | `RetryBackoff.FetchRetryBackoffScalar` | Scales the minimum backoff exponentially. | `1` |
    | `RetryBackoff.FetchRetryTimeout` | The request timeout for retrying variant fetches. | `500 * time.Millisecond` |

### Fetch

Fetches variants for a [user](../general/data-model.md#users) and returns the results. This function [remote evaluates](../general/evaluation/remote-evaluation.md) the user for flags associated with the deployment used to initialize the SDK client.

```go
func (c *Client) Fetch(user *experiment.User) (map[string]experiment.Variant, error)
```

| Parameter  | Requirement | Description |
| --- | --- | --- |
| `user` | required | The user [user](../general/data-model.md#users) to remote fetch variants for. |

```go
user := &experiment.User{
    UserId:   "user@company.com",
    DeviceId: "abcdefg",
    UserProperties: map[string]interface{}{
        "premium": true,
    },
}
variants, err := client.Fetch(user)
if err != nil {
    // Handle error
}
```

After fetching variants for a user, you may to access the variant for a specific flag.

```go
variant := variants["<FLAG_KEY>"]
if variant.Value == "on" {
    // Flag is on
} else {
    // Flag is off
}
```

## Local evaluation

Implements evaluating variants for a user via [local evaluation](../general/evaluation/local-evaluation.md). If you plan on using local evaluation, you should [understand the tradeoffs](../general/evaluation/local-evaluation.md#targeting-capabilities).

!!!warning "Local Evaluation Mode"
    The local evaluation client can only evaluation flags which are [set to local evaluation mode](../guides/create-local-evaluation-flag.md).

### Install

Install the Go Server SDK's local evaluation package using `go get`.

!!!warning "CGO, OS, and architecture support"
    Local evaluation requires `CGO` be enabled (`CGO_ENABLED=1`). Additionally, the local evaluation package currently only supports the following OS' and architectures (`GOOS/GOARCH`):

    **Supported**

    * darwin/amd64
    * darwin/arm64
    * linux/amd64
    * linux/arm64

    **Alpine linux is not supported** at this time.

    If you need another OS/Arch supported, please [submit an issue on github](https://github.com/amplitude/experiment-go-server/issues/new) or email [experiment@amplitude.com](mailto:experiment@amplitude.com).

Install the Go Server SDK using `go get`.

```bash
go get github.com/amplitude/experiment-go-server
```

!!!tip "Quick Start"

    1. [Initialize the local evaluation client.](#initialize-1)
    2. [Start the local evaluation client.](#start)
    3. [Evaluate a user.](#evaluate)

    ```go
    // (1) Initialize the local evaluation client with a server deployment key.
    client := local.Initialize("<DEPLOYMENT_KEY>", nil)

    // (2) Start the local evaluation client.
  err := client.Start()
  if err != nil {
    panic(err)
  }

    // (3) Evaluate a user.
  user := &experiment.User{DeviceId: "abcdefg"}
  variants, err := client.Evaluate(user, nil)
  if err != nil {
    panic(err)
  }
    ```

### Initialize

Initializes a [local evaluation](../general/evaluation/local-evaluation.md) client.

!!!warning "Server Deployment Key"
    You must [initialize](#initialize-1) the local evaluation client with a server [deployment](../general/data-model.md#deployments) key in order to get access to local evaluation flag configs.

```go
func Initialize(apiKey string, config *Config) *Client
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `apiKey` | required | The server [deployment key](../general/data-model.md#deployments) which authorizes fetch requests and determines which flags should be evaluated for the user. |
| `config` | optional | The client [configuration](#configuration) used to customize SDK client behavior. |

!!!tip "Flag Polling Interval"
    Use the `FlagConfigPollingInterval` [configuration](#configuration-1) to determine the time flag configs take to update once modified (default 30s).

#### Configuration

The SDK client can be configured on initialization.

???config "Configuration Options"
    | <div class="big-column">Name</div> | Description | Default Value |
    | --- | --- | --- |
    | `Debug` | Set to `true` to enable debug logging. | `false` |
    | `ServerUrl` | The host to fetch flag configurations from. | `https://api.lab.amplitude.com` |
    | `FlagConfigPollingInterval` | The interval to poll for updated flag configs after calling [`Start()`](#start) | `30 * time.Second` |
    | `FlagConfigPollerRequestTimeout` | The timeout for the request made by the flag config poller | `10 * time.Second` |

### Start

Start the local evaluation client, pre-fetching local local evaluation mode flag configs for [evaluation](#evaluate) and starting the flag config poller at the [configured](#configuration) interval.

```go
func (c *Client) Start() error
```

You should await the result of `start()` to ensure that flag configs are ready to be used before calling [`evaluate()`](#evaluate)

```go
err := client.Start()
if err != nil {
    panic(err)
}
```

### Evaluate

Executes the [evaluation logic](../general/evaluation/implementation.md) using the flags pre-fetched on [`start()`](#start). Evaluate must be given a user object argument and can optionally be passed an array of flag keys if only a specific subset of required flag variants are required.

```go
func (c *Client) Evaluate(user *experiment.User, flagKeys []string) (map[string]experiment.Variant, error)
```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `user` | required | The [user](../general/data-model.md#users) to evaluate. |
| `flagKeys` | optional | Specific flags or experiments to evaluate. If nil, or empty, all flags and experiments are evaluated. |

```go
// The user to evaluate
user := &experiment.User{DeviceId: "abcdefg"}

// Evaluate all flag variants
allVariants, err := client.Evaluate(user, nil)
if err != nil {
    // Handle Error
}

// Evaluate a specific subset of flag variants
specificVariants, err := client.Evaluate(user, []string{
    "<FLAG_KEY_1>",
    "<FLAG_KEY_2>",
})

// Access a variant
variant := allVariants["<FLAG_KEY>"]
if variant.Value == "on" {
    // Flag is on
} else {
    // Flag is off
}
```
