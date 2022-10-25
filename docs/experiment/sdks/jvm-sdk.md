---
title: Experiment JVM SDK (Beta)
description: Official documentation for Amplitude Experiment's server-side JVM SDK implementation.
icon: material/language-java
---

Official documentation for Amplitude Experiment's server-side JVM SDK implementation. This SDK may be used in **either Java or Kotlin** server-side implementations.

!!!info "SDK Resources"
    [:material-github: GitHub](https://github.com/amplitude/experiment-jvm-server) · [:material-code-tags-check: Releases](https://github.com/amplitude/experiment-jvm-server/releases)

This documentation is split into two sections for [remote](../general/evaluation/remote-evaluation.md) and [local](../general/evaluation/local-evaluation.md) evaluation:

* [Remote evaluation](#remote-evaluation)
* [Local evaluation](#local-evaluation)

## Remote evaluation

Implements fetching variants for a user via [remote evaluation](../general/evaluation/remote-evaluation.md).

### Install

![Maven Central](https://img.shields.io/maven-central/v/com.amplitude/experiment-jvm-server.svg?label=Maven%20Central)

Install the JVM Server SDK using Gradle.

=== "Groovy"

    ```groovy
    implementation "com.amplitude:experiment-jvm-server:<VERSION>"
    ```

=== "Kotlin"

    ```kotlin
    implementation("com.amplitude:experiment-jvm-server:<VERSION>")
    ```

!!!tip "Quick Start"

    1. [Initialize the experiment client](#initialize-remote)
    2. [Fetch variants for the user](#fetch)
    3. [Access a flag's variant](#fetch)

    === "Kotlin"

        ```kotlin
        // (1) Initialize the remote evaluation client with a server deployment key.
        val experiment = Experiment.initializeRemote("<DEPLOYMENT_KEY>")

        // (2) Fetch variants for a user
        val user = ExperimentUser.builder()
            .userId("user@company.com")
            .deviceId("abcdefg")
            .userProperty("premium", true)
            .build()
        val variants = try {
            experiment.fetch(user).get()
        } catch (e: Exception) {
            e.printStackTrace()
            return
        }

        // (3) Access a flag's variant
        val variant = variants["<FLAG_KEY>"]
        if (variant?.value == "on") {
            // Flag is on
        } else {
            // Flag is off
        }
        ```

    === "Java"

        ```java
        // (1) Initialize the remote evaluation client with a server deployment key.
        RemoteEvaluationClient experiment =
                Experiment.initializeRemote("<DEPLOYMENT_KEY>");

        // (2) Fetch variants for a user
        ExperimentUser user = ExperimentUser.builder()
                .userId("user@company.com")
                .deviceId("abcdefg")
                .userProperty("premium", true)
                .build();
        Map<String, Variant> variants;
        try {
            variants = experiment.fetch(user).get();
        } catch (Exception e) {
            e.printStackTrace();
            return;
        }

        // (3) Access a flag's variant
        Variant variant = variants.get("<FLAG_KEY>");
        if (Variant.valueEquals(variant, "on")) {
            // Flag is on
        } else {
            // Flag is off
        }
        ```

### Initialize remote

The SDK client should be initialized in your server on startup. The [deployment key](../general/data-model.md#deployments) argument passed into the `apiKey` parameter must live within the same project that you are sending analytics events to.

=== "Kotlin"

    ```kotlin
    fun initializeRemote(
        apiKey: String,
        config: RemoteEvaluationConfig = RemoteEvaluationConfig()
    ): RemoteEvaluationClient
    ```

=== "Java"

    ```java
    @Nonnull
    public RemoteEvaluationClient initializeRemote(
        @Nonnull String apiKey,
        @Nonnull RemoteEvaluationConfig config
    );
    ```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `apiKey` | required | The [deployment key](../general/data-model.md#deployments) which authorizes fetch requests and determines which flags should be evaluated for the user. |
| `config` | optional | The client [configuration](#configuration) used to customize SDK client behavior. |

=== "Kotlin"

    ```kotlin
    val experiment = Experiment.initializeRemote("<DEPLOYMENT_KEY>")
    ```

=== "Java"

    ```java
    RemoteEvaluationClient experiment = Experiment.initializeRemote("<DEPLOYMENT_KEY>");
    ```

#### Configuration

The SDK client can be configured on initialization.

???config "Configuration Options"
    | <div class="big-column">Name</div> | Description | Default Value |
    | --- | --- | --- |
    | `debug` | Set to `true` to enable debug logging. | `false` |
    | `serverUrl` | The host to fetch flag configurations from. | `https://api.lab.amplitude.com` |
    | `fetchTimeoutMillis` |  The timeout for fetching variants in milliseconds. This timeout only applies to the initial request, not subsequent retries | `500` |
    | `fetchRetries` | The number of retries to attempt if a request to fetch variants fails. | `1` |
    | `fetchRetryBackoffMinMillis` | The minimum (initial) backoff after a request to fetch variants fails. This delay is scaled by the `fetchRetryBackoffScalar` | `0` |
    | `fetchRetryBackoffMaxMillis` | The maximum backoff between retries. If the scaled backoff becomes greater than the max, the max is used for all subsequent requests | `10000` |
    | `fetchRetryBackoffScalar` | Scales the minimum backoff exponentially. | `1` |

### Fetch

Fetches variants for a [user](../general/data-model.md#users) and returns the results. This function [remote evaluates](../general/evaluation/remote-evaluation.md) the user for flags associated with the deployment used to initialize the SDK client.

=== "Kotlin"

    ```kotlin
    fun fetch(user: ExperimentUser): CompletableFuture<Map<String, Variant>>
    ```

=== "Java"

    ```java
    @Nonnull
    public CompletableFuture<Map<String, Variant>> fetch(@Nonnull ExperimentUser user);
    ```

| Parameter  | Requirement | Description |
| --- | --- | --- |
| `user` | required | The [user](../general/data-model.md#users) to remote fetch variants for. |

=== "Kotlin"

    ```kotlin
    val user = ExperimentUser.builder()
        .userId("user@company.com")
        .deviceId("abcdefg")
        .userProperty("premium", true)
        .build()
    val variants = try {
        experiment.fetch(user).get()
    } catch (e: Exception) {
        e.printStackTrace()
        return
    }
    ```

=== "Java"

    ```java
    ExperimentUser user = ExperimentUser.builder()
        .userId("user@company.com")
        .deviceId("abcdefg")
        .userProperty("premium", true)
        .build();
    Map<String, Variant> variants;
    try {
        variants = experiment.fetch(user).get();
    } catch (Exception e) {
        e.printStackTrace();
        return;
    }
    ```

After fetching variants for a user, you may to access the variant for a specific flag.

=== "Kotlin"

    ```kotlin
    val variant = variants["<FLAG_KEY>"]
    if (variant?.value == "on") {
        // Flag is on
    } else {
        // Flag is off
    }
    ```

=== "Java"

    ```java
    Variant variant = variants.get("<FLAG_KEY>");
    if (Variant.valueEquals(variant, "on")) {
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

![Maven Central](https://img.shields.io/maven-central/v/com.amplitude/experiment-jvm-server.svg?label=Maven%20Central)

Install the JVM Server SDK using Gradle.

=== "Groovy"

    ```groovy
    implementation "com.amplitude:experiment-jvm-server:<VERSION>"
    ```

=== "Kotlin"

    ```kotlin
    implementation("com.amplitude:experiment-jvm-server:<VERSION>")
    ```

!!!tip "Quick Start"

    1. [Initialize the local evaluation client.](#initialize-local)
    2. [Start the local evaluation client.](#start)
    3. [Evaluate a user.](#evaluate)

    === "Kotlin"

        ```kotlin
        // (1) Initialize the local evaluation client with a server deployment key.
        val experiment = Experiment.initializeLocal("<DEPLOYMENT_KEY>")

        // (2) Start the local evaluation client.
        experiment.start()

        // (3) Evaluate a user.
        val user = ExperimentUser.builder()
            .userId("user@company.com")
            .deviceId("abcdefg")
            .userProperty("premium", true)
            .build()
        val variants = experiment.evaluate(user)
        ```

    === "Java"

        ```java
        // (1) Initialize the local evaluation client with a server deployment key.
        LocalEvaluationClient experiment = Experiment.initializeLocal("<DEPLOYMENT_KEY>");

        // (2) Start the local evaluation client.
        experiment.start();

        // (3) Evaluate a user.
        ExperimentUser user = ExperimentUser.builder()
            .userId("user@company.com")
            .deviceId("abcdefg")
            .userProperty("premium", true)
            .build();
        Map<String, Variant> variants = experiment.evaluate(user);
        ```

### Initialize local

Initializes a [local evaluation](../general/evaluation/local-evaluation.md) client.

!!!warning "Server Deployment Key"
    You must [initialize](#initialize-local) the local evaluation client with a server [deployment](../general/data-model.md#deployments) key to get access to local evaluation flag configs.

=== "Kotlin"

    ```kotlin
    fun initializeLocal(
        apiKey: String,
        config: LocalEvaluationConfig = LocalEvaluationConfig(),
    ): LocalEvaluationClient
    ```

=== "Java"

    ```java
    @Nonnull
    public LocalEvaluationClient initializeLocal(
        @Nonnull String apiKey,
        @Nonnull LocalEvaluationConfig config
    );
    ```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `apiKey` | required | The server [deployment key](../general/data-model.md#deployments) which authorizes fetch requests and determines which flags should be evaluated for the user. |
| `config` | optional | The client [configuration](#configuration) used to customize SDK client behavior. |

!!!tip "Flag Polling Interval"
    Use the `flagConfigPollingIntervalMillis` [configuration](#configuration-1) to determine the time flag configs take to update once modified (default 30s).

#### Configuration

The SDK client can be configured on initialization.

???config "Configuration Options"
    | <div class="big-column">Name</div> | Description | Default Value |
    | --- | --- | --- |
    | `debug` | Set to `true` to enable debug logging. | `false` |
    | `serverUrl` | The host to fetch flag configurations from. | `https://api.lab.amplitude.com` |
    | `flagConfigPollingIntervalMillis` | The interval to poll for updated flag configs after calling [`Start()`](#start) | `30000` |
    | `flagConfigPollerRequestTimeoutMillis` | The timeout for the request made by the flag config poller | `10000` |

### Start

Start the local evaluation client, pre-fetching local evaluation mode flag configs for [evaluation](#evaluate) and starting the flag config poller at the [configured](#configuration) interval.

=== "Kotlin"

    ```kotlin
    fun start()
    ```

=== "Java"

    ```java
    public void start();
    ```

You should wait for `start()` to return before calling [`evaluate()`](#evaluate) to ensure that flag configs are available for use in evaluation.

### Evaluate

Executes the [evaluation logic](../general/evaluation/implementation.md) using the flags pre-fetched on [`start()`](#start). Evaluate must be given a user object argument and can optionally be passed an array of flag keys if only a specific subset of required flag variants are required.

=== "Kotlin"

    ```kotlin
    fun evaluate(user: ExperimentUser, flagKeys: List<String> = listOf()): Map<String, Variant>
    ```

=== "Java"

    ```java
    @Nonnull
    public Map<String, Variant> evaluate(@Nonnull experimentUser, @Nonnull List<String> flagKeys);
    ```

| Parameter | Requirement | Description |
| --- | --- | --- |
| `user` | required | The [user](../general/data-model.md#users) to evaluate. |
| `flagKeys` | optional | Specific flags or experiments to evaluate. If empty, all flags and experiments are evaluated. |

=== "Kotlin"

    ```kotlin
    // The user to evaluate
    val user = ExperimentUser.builder()
        .userId("user@company.com")
        .deviceId("abcdefg")
        .userProperty("premium", true)
        .build()

    // Evaluate all flag variants
    val allVariants = experiment.evaluate(user)

    // Evaluate a specific subset of flag variants
    val specificVariants = experiment.evaluate(user, listOf(
        "<FLAG_KEY_1>",
        "<FLAG_KEY_2>",
    ))

    // Access a variant
    val variant = allVariants["<FLAG_KEY>"]
    if (variant?.value == "on") {
        // Flag is on
    } else {
        // Flag is off
    }
    ```

=== "Java"

    ```java
    // The user to evaluate
    ExperimentUser user = ExperimentUser.builder()
        .userId("user@company.com")
        .deviceId("abcdefg")
        .userProperty("premium", true)
        .build();

    // Evaluate all flag variants
    Map<String, Variant> allVariants = experiment.evaluate(user);

    // Evaluate a specific subset of flag variants
    Map<String, Variant> specificVariants = experiment.evaluate(user,
        List.of("<FLAG_KEY_1>", "<FLAG_KEY_2>"));

    // Access a variant
    Variant variant = allVariants.get("<FLAG_KEY>");
    if (Variant.valueEquals(variant, "on")) {
        // Flag is on
    } else {
        // Flag is off
    }
    ```
