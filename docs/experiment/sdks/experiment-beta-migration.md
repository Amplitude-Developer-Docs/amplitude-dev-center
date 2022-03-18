---
title: Experiment Beta Migration Guide
description: Guide for migrating from Amplitude Experiment's Beta SDKs to Release SDKs.
---

With the general availability release of Amplitude Experiment, we have created all new SDKs which change the "Skylab" branding to "Experiment". This means all new SDKs with different packages, GitHub repositories, and SDK APIs.

The beta "Skylab" SDKs vary quite a bit across platforms and languages. One of the goals with the new SDKs is to keep the core APIs and functionality similar across all SDKs. This guide will go over the primary changes made to all SDKs, but is by no means exhaustive. Please contact <experiment@amplitude.com> with any questions.

## New SDKs

| <div class="big-column">Old SDK</div> | New SDK | New Documentation |
| --- | --- | --- |
| [skylab-js-server](https://github.com/amplitude/skylab-js-server) | [experiment-node-server](https://github.com/amplitude/experiment-node-server) | [Documentation](experiment-node-server-sdk.md) |
| [skylab-js-client](https://github.com/amplitude/skylab-js-client) | [experiment-js-client](https://github.com/amplitude/experiment-js-client) | [Documentation](experiment-javascript-sdk.md) |
| [skylab-android-client](https://github.com/amplitude/skylab-android-client) | [experiment-android-client](https://github.com/amplitude/experiment-android-client) | [Documentation](experiment-android-sdk.md) |
| [skylab-ios-client](https://github.com/amplitude/skylab-ios-client) | [experiment-ios-client](https://github.com/amplitude/experiment-ios-client) | [Documentation](experiment-ios-sdk.md) |
| [skylab-reactnative-client](https://github.com/amplitude/skylab-reactnative-client) | [experiment-react-native-client](https://github.com/amplitude/experiment-react-native-client) | [Documentation](experiment-react-native-sdk.md) |

## Nomenclature Changes

The primary reason for creating new SDKs was to rebrand "Skylab" to "Experiment". The general rule is any class with `Skylab` in its name can be changed to `Experiment`. For example:

- `SkylabClient` --> `ExperimentClient`
- `SkylabConfig` --> `ExperimentConfig`
- `SkylabUser` --> `ExperimentUser`

## Client Method Changes

The `Client` or `ExperimentClient` interface has had the largest change in the new SDKs.

### Client-side Changes

| Old Method | New Method | Description of Change |
| --- | --- | --- |
| `start` | `fetch` | The start method effectively just fetched variants from the server, and therefore the method name has changed to `fetch` to be more descriptive.

This method can also be called to refresh the variants for a user or to overwrite and fetch variants for a new user. |
| `getVariant` | `variant` | Method name change. Functionality remains the same. |
| `getVariants` or `getAll` | `all` | Method name change. Functionality remains the same. |
| `setUser` | `setUser` | Functionality Change: `setUser` used to set the user *and* fetch variants for the new user.

The new implementation simply sets the user within the client. Call `fetch` to fetch variants for the user. |
| `setContextProvider` | `setUserProvider` | The context provider has been updated to `ExperimentUserProvider` for a more fully featured and extensible API. |

### Server-side Changes

| Old Method | New Method | Description of Change |
| --- | --- | --- |
| `getVariants` | `fetch` | Method name change. Functionality remains the same. |

## Context Provider Changes

The `ContextProvider` has been change to the more fully featured and extensible `ExperimentUserProvider`. The `ExperimentUserProvider` interface defines a single method, `getUser`, which returns an `ExperimentUser` object to provide to the client.

The `AmplitiudeContextProvider`, used to hook directly into the amplitude analytics SDKs, have been updated to `AmplitudeUserProvider`. The functionality remains the same.

## Configuration

See the [configuration documentation](experiment-sdk-configuration.md) for the new client configurations.
