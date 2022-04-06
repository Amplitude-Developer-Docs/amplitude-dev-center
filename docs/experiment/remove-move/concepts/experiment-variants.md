---
title: Variants in Experiment SDKs
description: Describles the Variant object used within Amplitude Experiment SDKs
---

An active feature flag or experiment's variant may be assigned to a user when the SDK fetches variants from the server. An assignment is a mapping from a [flag or experiment](../create-flag.md) key (String) to the Variant object.

The Variant object contains a value and a payload. A variant with a null value is called an empty variant, and signifies that a user has not been assigned a variant for a given flag or experiment.

## Value

A valid variant must contain a non-null value. A non-null value identifies the variant assigned to the user for the flag or experiment.

## Payload

A variant payload is an optional JSON value used for sending additional data to the application consuming the variant. A payload may contain any valid JSON, and must be handled by the application.