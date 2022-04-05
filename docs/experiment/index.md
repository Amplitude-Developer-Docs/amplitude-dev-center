---
title: Amplitude Experiment Overview
description: Learn about Amplitude's experimentation and feature-flagging platform.
---

Welcome to Amplitude Experiment! This page acts as a quick reference as well as a high level system overview of Experiment's end-to-end feature-flagging and experimentation platform.

## Getting Started Guide

Guide to getting started developing for Amplitude Experiment.

1. [Create a deployment]()
2. [Create and configure an experiment]()
3. [Fetch variants for a user]()
4. [Send an exposure event]()

## SDKs

TODO: Grid of SDKs and logos

## APIs

* [Evaluation API]()
* [Management API]()

## System Overview

When it comes to feature flag delivery and experimentation, one size does _not_ fit all. Amplitude Experiment is built for flexibility in order to fit in with any architecture and a variety of needs. Visit our [flag delivery architecture decision guide]() to help choose the right flag delivery architecture for you.

That said, we can generally segment experimentation and feature-flagging systems into client-side and server-side architectures.

### Client-side

* Great for experimenting on client-side applications.
* Easiest way to get started experimenting quickly.

Client-side experimentation and feature-flagging involves the client making a request to fetch flags and experiments from Amplitude's [remote evaluation]() servers when the application is initialized.

TODO: Image of client-side architecture

1. Client-side application fetches variants for the user from Amplitude Experiment's remote evaluation servers.
2. Variants are stored client-side for quick session agnostic access.
3. Application accesses a variant for a flag/experiment and displays the variable experience to the user.
4. When the user views the variable experience, an Exposure event is tracked to Amplitude analytics.

### Server-side

TODO
