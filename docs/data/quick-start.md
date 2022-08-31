---
title: Quick Start
description: The quick start guide of how to use amplitude SDK
---

## Overview

### 1. Initialize the library

=== "Browser"

    ```bash

    // NPM
        npm install @amplitude/analytics-browser

    // YARN
        yarn add @amplitude/analytics-browser
    ```

=== "Node"

    ```bash
    // NPM
    npm install @amplitude/analytics-node

    // YARN
    yarn add @amplitude/analytics-node

    ```

=== "Android"

    ```bash
    // Gradle
    dependencies {
        implementation 'com.amplitude:analytics-android:1.0.0'
    }
    ```
=== "iOS"

    ```bash
    // CocoaPods #(1)!
    pod 'Amplitude', '~> 8.8.0'

    // Swift Package Manager #(2)!
    Add 'https://github.com/amplitude/Amplitude-iOS' to Package Dependency

    // Carthage #(3)!

    github 'amplitude/Amplitude-iOS' ~> 8.8.0
    ```
    { .annotate }
    1. Learn more about [Add Dependency using CocoaPods](../data/sdks/java/#step-2-initialize-and-connect-ampli-and-amplitude-data)
    2. Learn more about [Add Dependency using SPM](../data/sdks/java/#step-2-initialize-and-connect-ampli-and-amplitude-data)
    3. Learn more about [Add Dependency using Carthage](../data/sdks/java/#step-2-initialize-and-connect-ampli-and-amplitude-data)


=== "iOS"

    CocoaPods (1)
    { .annotate }

    ```bash
    pod 'Amplitude', '~> 8.8.0'
    ```
    1. Learn more about [Add Dependency using CocoaPods](../data/sdks/java/#step-2-initialize-and-connect-ampli-and-amplitude-data)

    Swift Package Manager (1)
    { .annotate }

    ```bash
    Add 'https://github.com/amplitude/Amplitude-iOS' to Package Dependency
    ```
    1. Learn more about [Add Dependency using SPM](../data/sdks/java/#step-2-initialize-and-connect-ampli-and-amplitude-data)

    Carthage (1)
    { .annotate }

    ```bash
    github 'amplitude/Amplitude-iOS' ~> 8.8.0
    ```
    1. Learn more about [Add Dependency using Carthage](../data/sdks/java/#step-2-initialize-and-connect-ampli-and-amplitude-data)


=== "iOS"

    ```bash title="CocoaPods"

    pod 'Amplitude', '~> 8.8.0'
    ```
    Learn more about [Add Dependency using CocoaPods](../data/sdks/java/#step-2-initialize-and-connect-ampli-and-amplitude-data)


    ```bash title="Swift Package Manager"

    Add 'https://github.com/amplitude/Amplitude-iOS' to Package Dependency
    ```
    Learn more about [Add Dependency using SPM](../data/sdks/java/#step-2-initialize-and-connect-ampli-and-amplitude-data)

    ```bash title="Carthage"

    github 'amplitude/Amplitude-iOS' ~> 8.8.0
    ```
    Learn more about [Add Dependency using Carthage](../data/sdks/java/#step-2-initialize-and-connect-ampli-and-amplitude-data)

=== "JAVA"

    ```bash title="Maven"

    dependencies {
        implementation 'org.json:json:20201115'
        implementation 'com.amplitude:java-sdk:1.10.0'
    }
    ```
    Learn more about [Add Dependency using Gradle](../data/sdks/java/#step-2-initialize-and-connect-ampli-and-amplitude-data)

    ```bash title="Download"
    ```
    Download the [latest JAR file](https://github.com/amplitude/Amplitude-Java/releases) and add it to the project's buildpath. See instructions for your IDE.

=== "PYTHON"

    ```bash
    pip install amplitude-analytics
    ```

=== "React Native"

    ```bash title="NPM"

    npm install @amplitude/react-native@latest
    ```

    ```bash title="YARN"

    yarn add @amplitude/react-native@latest
    ```

=== "Flutter"

    ```bash  title="YAML"

    dependencies:
        amplitude_flutter: ^3.7.0
    ```
    Learn more about [Add Dependency](../data/sdks/flutter/#add-dependencies)

=== "Unity"

    ```bash title="Unity Package Manager"

    Add 'https://github.com/amplitude/unity-plugin.git?path=/Assets'.
    ```
    Learn more about [Unity package manager initizalization](../data/sdks/unity/#option-1-unity-package-manager)

    ```bash title="Manual download"

    Download amplitude-unity.unitypackage
    ```
    Learn more about the [Unity package download](../data/sdks/unity/#option-2-manual-download-and-add-dependency).

=== "Unreal"

    ```txt
    Download AmplitudUnreal.zip[GitHub releases page](https://github.com/amplitude/Amplitude-Unreal/releases/tag/v0.1.0).
    Unzip it into a folder inside your Unreal project's Plugins directory.
    ```

=== "GO"

    ```bash
    go get https://github.com/amplitude/analytics-go
    ```

### 2. Send data

=== "Browser"

    ```bash
    ```

=== "Node"

    ```bash
    ```

=== "Android"

    ```bash
    ```

=== "iOS"

    ```bash

    ```

=== "JAVA"

    ```bash
    ```

=== "PYTHON"

 ```bash
 ```

=== "React Native"

    ```bash
    ```

=== "Flutter"

    ```bash
    ```

=== "Unity"

    ```bash
    ```

=== "Unreal"

    ```txt
    Download AmplitudUnreal.zip[GitHub releases page](https://github.com/amplitude/Amplitude-Unreal/releases/tag/v0.1.0).
    Unzip it into a folder inside your Unreal project's Plugins directory.
    ```

=== "GO"

    ```

    ```

### 3. Check for success

### 4. Enforce event schemas (ampli)

## Complete code example