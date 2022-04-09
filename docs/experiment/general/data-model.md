---
title: Data Model
description: An overview of the data model used in Amplitude Experiment.
---

At the top level in Amplitude is your **organization**. Within an organization, Amplitude Experiment follows the **project** structure defined by Amplitude Analytics. In short, all Experiment data must be associated with an Amplitude Analytics project.

TODO Diagram

## Deployments

In Amplitude Experiment, a deployment serves a group of flags or experiments for use in an application. Deployments have an associated randomly generated key which is used to uniquely identify the deployment and authorize requests to Amplitude Experiment's evaluation servers.

!!!info "The deployment key is what is used to initialize Amplitude Experiment SDKs."

Deployments live within Amplitude Analytics projects; a project may have multiple deployments. Deployments are [added to Flags and Experiments](../guides/getting-started/create-a-flag.md#add-a-deployment) which exist within the same project. When a request to fetch variants for a user is received by Experiment's evaluation servers, the deployment key is used to look up all associated flags and experiments for evaluation.

## Flags

A feature flag is used to serve a variable experience to a user. Flags are identified by the **flag key**, associated with `0-n` [deployments](#deployments), and contains `1-n` [variants](#variants).

## Experiments

TODO

## Variants

TODO

## Users

TODO
