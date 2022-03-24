---
title: Dynamic Configuration
description: Use dynamic configuration to find the best server URLs based on a user's location.
---

Some Amplitude SDK versions (iOS 5.3.0+, Android 2.28.0+, and JavaScript 8.9.0+, Unity) let you set your apps to use dynamic configuration.
 Dynamic configuration finds the best Amplitude server URL based on app users' location.

## Considerations

- If you have your own proxy server and use `setServerUrl` API, don't use dynamic configuration.
- If you have users in Mainland China, we recommend that you use dynamic configuration.
- By default, this feature is off. You must explicitly enabled it to use it.

## Use cases

### Region-based

Send users from different regions to the server for their region.

``` mermaid
stateDiagram-v2
  s1: Dynamic Config Server
  cn_user: User in China
  us_user: User in United States
    s1 --> cn_user : api2.amplitude.com
    s1 --> us_user : api.amplitude.com

```

### Dynamically adjust server URLs

If a server URL becomes unreachable for some reason, Amplitude can change the address in the dynamic configuration server.
 This makes the ingestion endpoint dynamic, so you don't need to release a new version of your app.

``` mermaid
stateDiagram-v2
  s1: Dynamic Config Server
  user: User
    s1 --> user : new.amplitude.com (new URL)
    s1 --> user : old.amplitude.com (broken URL)
```

## Usage

Enable the `useDynamicConfig` flag.

=== "iOS"

    ```obj-c
    [Amplitude instance].useDynamicConfig = YES;
    ```

=== "Android"

    ```java
    AmplitudeClient.getInstance().setUseDynamicConfig(true);
    ```

=== "JavaScript"

    ```js
    amplitude.getInstance().init(euApiKey, null, {
      useDynamicConfig: true,
    });
    ```

=== "Unity"

    ```c#
    amplitude.setUseDynamicConfig(true);
    ```