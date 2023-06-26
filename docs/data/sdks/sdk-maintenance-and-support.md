---
title: Amplitude SDKs and Tools Maintenance & Support Policy
description: This document outlines the maintenance policy for Amplitude Software Development Kits (SDKs) and Tools, including Browser and Mobile SDKs, the Ampli CLI, and their underlying dependencies
---

## Overview
This document outlines the maintenance policy for Amplitude Software Development Kits (SDKs) and Tools, including Browser and Mobile SDKs, the Ampli CLI, and their underlying dependencies. Amplitude regularly provides the Amplitude SDKs and Tools with updates that may contain support for new or updated Amplitude APIs, new features, enhancements, bug fixes, security patches, or documentation updates. Updates may also address changes with dependencies, language runtimes, and operating systems. Amplitude SDK releases are published to package managers (e.g. NPM, Cocoapods, Maven, PyPI), and are available as source code on GitHub.

We recommend users to stay up-to-date with SDK releases to keep up with the latest features, security updates, and underlying dependencies. Continued use of an unsupported SDK version is not recommended and is done at the user’s discretion.

## Versioning
The Amplitude SDK and Tools release versions are in the form of `X.Y.Z` where `X` represents the major version. Increasing the major version of an SDK indicates that this SDK underwent significant and substantial changes to support new idioms and patterns in the language. Major versions are introduced when public interfaces (e.g. classes, methods, types, etc.), behaviors, or semantics have changed. Applications need to be updated in order for them to work with the newest SDK version. It is important to update major versions carefully and in accordance with the upgrade guidelines provided by Amplitude.

## SDK major version life-cycle
The life-cycle for major SDKs and Tools versions consists of 5 phases, which are outlined below.

- **Developer Preview (Beta) (Phase 0)** - During this phase, SDKs are not supported, should not be used in production environments, and are meant for early access and feedback purposes only. It is possible for future releases to introduce breaking changes. Once Amplitude identifies a release to be a stable product, it may mark it as a Release Candidate. Release Candidates are ready for GA release unless significant bugs emerge, and will receive full Amplitude support.

- **General Availability (GA) (Phase 1)** - During this phase, SDKs are fully supported. Amplitude will provide regular SDK releases that include support for new services, API updates for existing services, as well as bug and security fixes. For Tools, Amplitude will provide regular releases that include new feature updates and bug fixes.

- **Maintenance Announcement (Phase 2)** - Amplitude will make a public announcement at least 6 months before an SDK or Tool enters maintenance mode. During this period, the SDK will continue to be fully supported. Typically, maintenance mode is announced at the same time as the next major version is transitioned to GA.

- **Maintenance (Phase 3)** - During the maintenance mode, Amplitude limits SDK releases to address critical bug fixes and security issues only. An SDK will not receive API updates for new or existing services, or be updated to support new regions. Maintenance mode has a default duration of 12 months, unless otherwise specified.

- **End-of-Support (Phase 4)** - When an SDK reaches end-of support, it will no longer receive updates or releases. Previously published releases will continue to be available via public package managers and the code will remain on GitHub. The GitHub repository may be archived. Use of an SDK which has reached end-of-support is done at the user’s discretion. We recommend users upgrade to the new major version.

## Dependency life-cycle
Most Amplitude SDKs have underlying dependencies, such as language runtimes, operating systems, or third party libraries and frameworks. These dependencies are typically tied to the language community or the vendor who owns that particular component. Each community or vendor publishes their own end-of-support schedule for their product.

The following terms are used to classify underlying third party dependencies:

- **Operating System (OS):** Examples include MacOS 12.6, Android 13, Windows 11, etc.
- **Language Runtime**: Examples include TypeScript 4.1.6, Swift 5.7, Java 8, Python 3.10.4, etc.
- **Third party Library / Framework**: Examples include OpenSSL, OCLIF, React, etc.

Our policy is to continue supporting SDK dependencies for at least 6 months after the community or vendor ends support for the dependency. This policy, however, could vary depending on the specific dependency.

!!! note
    Amplitude reserves the right to stop support for an underlying dependency without increasing the major SDK version


## Communication methods
Maintenance announcements are communicated in several ways:

An email announcement is sent to affected accounts, announcing our plans to end support for the specific SDK version. The email will outline the path to end-of-support, specify the campaign timelines, and provide upgrade guidance.

Amplitude SDK documentation, such as API reference documentation, user guides, SDK product marketing pages, and GitHub readme(s) are updated to indicate the campaign timeline and provide guidance on upgrading affected applications.

An Amplitude blog post is published in the [Amplitude Community](https://community.amplitude.com/) that outlines the path to end-of-support, as well as reiterates the campaign timelines.

Deprecation warnings are added to the SDKs, outlining the path to end-of-support and linking to the SDK documentation.

To see the list of available major versions of Amplitude SDKs and Tools and where they are in their maintenance life cycle, see Amplitude SDKs and Tools version support matrix.

## SDKs and Tools version support matrix

The matrix below shows the list of available AWS SDK major versions and where they are in the maintenance life cycle with associated timelines. The matrix is updated when a new major version is released or when a major version transitions to a new phase in the maintenance life cycle.

| SDK / Tool       | Package                             | Major Version | Current Phase  | GA Date    | Notes                |
|------------------|-------------------------------------|---------------|----------------|------------|----------------------|
| Ampli CLI        | `@amplitude/ampli`                  | 1.x           | GA             | 2021-11-15 |                      |
| Android SDK      | `com.amplitude:analytics-android`   | 1.x           | GA             | 2022-06-28 |                      |
| Android SDK      | `com.amplitude:android-sdk`         | 3.x           | End of Support | 2021-12-16 | Bad release (3.25.1) |
| Android SDK      | `com.amplitude:android-sdk`         | 2.x           | Maintenance    | 2015-08-21 |                      |
| Android SDK      | `com.amplitude:android-sdk`         | 1.x           | Maintenance    | 2014-05-01 |                      |
| Browser SDK      | `@amplitude/analytics-browser`      | 2.x           | GA             | 2023-06-14 |                      |
| Browser SDK      | `@amplitude/analytics-browser`      | 1.x           | GA             | 2022-06-29 |                      |
| Browser SDK      | `amplitude-js`                      | 1.x - 8.x     | Maintenance    | 2014-06-11 |                      |
| React Native SDK | `@amplitude/analytics-react-native` | 1.x           | GA             | 2023-02-02 |                      |
| React Native SDK | `@amplitude/react-native`           | 2.x           | Maintenance    | 2021-03-02 |                      |
| Node SDK         | `@amplitude/analytics-node`         | 1.x           | GA             | 2022-12-10 |                      |
| Node SDK         | `@amplitude/node`                   | 1.x           | Maintenance    | 2020-09-25 |                      |
