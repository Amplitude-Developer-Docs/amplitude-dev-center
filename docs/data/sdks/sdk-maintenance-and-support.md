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

- **Developer Preview (Beta) (Phase 0)** - During this phase, SDKs are fully supported, and can used in production environments, however, there may be breaking changes without a new major version release. If used in a production environment, we recommend setting a fixed version, updating regularly, and testing after each update.  These SDKs provide early access to the latest features and allow for user feedback prior to GA. Once Amplitude identifies a release to be a stable product, it may mark it as GA.

- **General Availability (GA) (Phase 1)** - During this phase, SDKs are fully supported. Amplitude will provide regular SDK releases that include support for new services, API updates for existing services, as well as bug and security fixes. For Tools, Amplitude will provide regular releases that include new feature updates and bug fixes.

- **Maintenance Announcement (Phase 2)** - Amplitude will make a public announcement at least 6 months before an SDK or Tool enters maintenance mode. During this period, the SDK will continue to be fully supported. Typically, maintenance mode is announced at the same time as the next major version is transitioned to GA.

- **Maintenance (Phase 3)** - During the maintenance mode, Amplitude limits SDK releases to address critical bug fixes and security issues only. An SDK will not receive API updates for new or existing services, or be updated to support new regions. Maintenance mode has a default duration of at least 12 months, unless otherwise specified.

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

| <div class="big-column">SDK / Tool</div>                                                                                                                                                                                                                                                                                                           | Version   | Phase          | GA Date    | Notes                   |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|----------------|------------|-------------------------|
| :material-console: [Ampli CLI](../ampli/index.md) <br/> :octicons-package-16: [`@amplitude/ampli`](https://www.npmjs.com/package/@amplitude/ampli)                                                                                                                                                                                                 | 1.x       | GA             | 2021-11-15 |                         |
| :material-android: [Android SDK](./android-kotlin/index.md)<br/>:octicons-package-16: [`com.amplitude:analytics-android`](https://mvnrepository.com/artifact/com.amplitude/analytics-android)<br/>[:material-github: Amplitude-Kotlin](https://github.com/amplitude/Amplitude-Kotlin)                                                              | 1.x       | GA             | 2022-06-28 |                         |
| :material-android: [Android SDK](./android/index.md)<br/>:octicons-package-16: [`com.amplitude:android-sdk`](https://mvnrepository.com/artifact/com.amplitude/android-sdk)<br/>[:material-github: Amplitude-Android](https://github.com/amplitude/Amplitude-Android)                                                                               | 3.x       | End of support | 2021-12-16 | Bad release (3.35.1)    |
| :material-android: [Android SDK](./android/index.md)<br/>:octicons-package-16: [`com.amplitude:android-sdk`](https://mvnrepository.com/artifact/com.amplitude/android-sdk)<br/>[:material-github: Amplitude-Android](https://github.com/amplitude/Amplitude-Android)                                                                               | 1.x -2.x  | Maintenance    | 2014-05-01 |                         |
| :material-language-typescript: [Browser SDK](./browser-2/index.md) <br/> :octicons-package-16: [`@amplitude/analytics-browser`](https://www.npmjs.com/package/@amplitude/analytics-browser)<br/>[:material-github: Amplitude-TypeScript](https://github.com/amplitude/Amplitude-TypeScript)                                                        | 2.x       | GA             | 2023-06-14 |                         |
| :material-language-typescript: [Browser SDK](./typescript-browser/index.md) <br/> :octicons-package-16: [`@amplitude/analytics-browser`](https://www.npmjs.com/package/@amplitude/analytics-browser)<br/>[:material-github: Amplitude-TypeScript](https://github.com/amplitude/Amplitude-TypeScript)                                               | 1.x       | GA             | 2022-06-29 |                         |
| :material-language-typescript: [Browser SDK](./marketing-analytics-browser/index.md) <br/> :octicons-package-16: [`@amplitude/marketing-analytics-browser`](https://www.npmjs.com/package/@amplitude/arketing-analytics-browser)<br/>[:material-github: Amplitude-TypeScript](https://github.com/amplitude/Amplitude-TypeScript)                   | 1.x       | Maintenance    | 2022-06-29 | Replaced by Browser 2.0 |
| :material-language-javascript: [Browser SDK](./javascript/index.md)<br/>:octicons-package-16: [`@amplitude/amplitude-js`](https://www.npmjs.com/package/amplitude-js)<br/>[:material-github: Amplitude-JavaScript](https://github.com/amplitude/Amplitude-JavaScript)                                                                              | 1.x - 8.x | Maintenance    | 2014-06-11 |                         |
| :simple-flutter: [Flutter SDK](./flutter/index.md)<br/>:octicons-package-16: [`amplitude_flutter`](https://pub.dev/packages/amplitude_flutter)<br/>[:material-github: Amplitude-Flutter](https://github.com/amplitude/Amplitude-Flutter)                                                                                                           | 1.x - 3.X | GA             | 2020-04-30 |                         |
| :material-google: [Google Tag Manager (Client)](../sources/google-tag-manager-client/)<br/>:simple-googletagmanager: [Amplitude Analytics Browser SDK](https://tagmanager.google.com/gallery/#/owners/amplitude/templates/amplitude-browser-sdk-gtm-template)<br/>[:material-github: amplitude-browser-sdk-gtm-template](https://github.com/amplitude/amplitude-browser-sdk-gtm-template) | 1.x       | GA             | 2022-11-13 |                         |
| :material-google: [Google Tag Manager (Server)](../sources/google-tag-manager-server/)<br/>:simple-googletagmanager: [Amplitude Analytics](https://tagmanager.google.com/gallery/#/owners/amplitude/templates/amplitude-server-gtm-template)<br/>[:material-github: amplitude-browser-sdk-gtm-template](https://github.com/amplitude/amplitude-server-gtm-template) | 1.x       | GA             | 2022-05-02 |                         |
| :material-google: [Google Tag Manager (Client)](../sources/google-tag-manager-client-legacy/)<br/>:simple-googletagmanager: [Amplitude Analytics Legacy](https://tagmanager.google.com/gallery/#/owners/amplitude/templates/amplitude-gtm-template)<br/>[:material-github: amplitude-gtm-template](https://github.com/amplitude/amplitude-gtm-template) | 1.x       | Maintenance    | 2021-10-21 |                         |
| :material-language-go: [Go SDK](./go/index.md)<br/>:octicons-package-16: [`github.com/amplitude/analytics-go`](https://pkg.go.dev/github.com/amplitude/analytics-go)<br/>[:material-github: analytics-go](https://github.com/amplitude/analytics-go)                                                                                               | 1.x       | GA             | 2023-02-09 |                         |
| :material-apple-ios: [iOS SDK](./ios-swift/index.md)<br/>:octicons-package-16: `AmplitudeSwift`<br/>[:material-github: Amplitude-Swift](https://github.com/amplitude/Amplitude-Swift)                                                                                                                                                              | 1.x       | Beta           | N/A        |                         |
| :material-apple-ios: [iOS SDK](./ios/index.md)<br/>:octicons-package-16: [`Amplitude`](https://cocoapods.org/pods/Amplitude-iOS)<br/>[:material-github: Amplitude-iOS](https://github.com/amplitude/Amplitude-iOS)                                                                                                                                 | 1.x - 8.X | GA             | 2014-06-05 |                         |
| :material-language-java: [Java SDK](./java/index.md)<br/>:octicons-package-16: [`com.amplitude.:java-sdk`](https://mvnrepository.com/artifact/com.amplitude/java-sdk)<br/>[:material-github: Amplitude-Java](https://github.com/amplitude/Amplitude-Java)                                                                                          | 1.x       | GA             | 2021-06-15 |                         |
| :material-nodejs: [Node SDK](./typescript-node/index.md)<br/>:octicons-package-16: [`@amplitude/analytics-node`](https://www.npmjs.com/package/@amplitude/analytics-node)<br/>[:material-github: Amplitude-Typescript](https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/analytics-node)                                        | 1.x       | GA             | 2022-12-10 |                         |
| :material-nodejs: [Node SDK](./node/index.md) <br/>:octicons-package-16: [`@amplitude/node`](https://www.npmjs.com/package/@amplitude/node)<br/>[:material-github: Amplitude-Node](https://github.com/amplitude/Amplitude-Node)                                                                                                                    | 1.x       | Maintenance    | 2020-09-25 |                         |
| :material-language-python: [Python SDK](./python/index.md)<br/>:octicons-package-16: [`amplitude-analytics`](https://pypi.org/project/amplitude-analytics/)<br/>[:material-github: Amplitude-Python](https://github.com/amplitude/Amplitude-Python)                                                                                                | 1.x       | GA             | 2022-06-29 |                         |
| :material-react: [React SDK](https://github.com/amplitude/react-amplitude#readme)<br/>:octicons-package-16: [`@amplitude/react-amplitude`](https://www.npmjs.com/package/@amplitude/react-amplitude)<br/>[:material-github: react-amplitude](https://github.com/amplitude/react-amplitude)                                                         | 1.x       | End of support | 2019-05-27 |                         |
| :material-react: [React Native SDK](./typescript-react-native/index.md)<br/>:octicons-package-16: [`@amplitude/analytics-react-native`](https://www.npmjs.com/package/@amplitude/analytics-react-native)<br/>[:material-github: Amplitude-TypeScript](https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/analytics-react-native) | 1.x       | GA             | 2023-02-02 |                         |
| :material-react: [React Native SDK](./react-native/index.md)<br/>:octicons-package-16: [`@amplitude/react-native`](https://www.npmjs.com/package/@amplitude/react-native)<br/>[:material-github: Amplitude-ReactNative](https://github.com/amplitude/Amplitude-ReactNative)                                                                        | 2.x       | Maintenance    | 2021-03-02 |                         |
| :material-unity: [Unity SDK](./unity/index.md)<br/>:octicons-package-16: [`amplitude-unity.unitypackage`](https://github.com/amplitude/unity-plugin/releases)<br/>[:material-github: unity-plugin](https://github.com/amplitude/unity-plugin)                                                                                                      | 1.x - 2.X | GA             | 2020-03-18 |                         |
| :material-unreal: [Unreal SDK](./unreal/index.md)<br/>:octicons-package-16: [`AmplitudeUnreal`](https://github.com/amplitude/Amplitude-Unreal/releases)<br/>[:material-github: Amplitude-Unreal](https://github.com/amplitude/Amplitude-Unreal)                                                                                                    | 0.x       | Beta           | N/A        |                         |
