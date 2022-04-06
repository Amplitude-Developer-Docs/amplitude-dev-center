---
title: Create a Local Evaluation Flag
description: Create a local evaluation mode flag or migrate an existing remote evaluation flag to local.
---

This document describes how to create a local evaluation flag or experiment as well as how to migrate an existing remote evaluation flag or experiment to local.
 This document assumes general knowledge about Amplitude Experiment.

## Create a Local Evaluation Experiment

Create an experiment as you normally would, and select the **Local** option for the **Evaluation Mode** setting.

!!!note
    If you don't see the evaluation mode setting when creating a flag/experiment, please contact us to turn on the feature.

Within your new experiment, set your server-side deployment, configure the allocation to target 100% of users, and activate your flag.

Your local evaluation experiment has been set up and is ready to use.

## Remote to Local Flag Migration

You can transition a remote flag to local evaluation mode by changing the flag settings and updating the bucketing key from "Amplitude ID" to "Device ID".

!!!warning

    Migrating a flag from remote to local evaluation mode will change the bucketing behavior. This is not recommended for active experiments.

    In addition, you need to make sure that there are no targeting rules which do not abide by the limitations of local evaluation.

1. Change the flag's "Evaluation Mode" setting to "Local"
2. Update the "bucketed by" setting from Amplitude ID to Device ID in each "Rule Based User Segment" and "All Non-Targeted Users" Section

!!!note
    If you don't see the "bucketed by" setting please contact us to turn on the feature.
