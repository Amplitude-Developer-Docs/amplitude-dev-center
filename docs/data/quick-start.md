---
title: Quick Start
description: The quick start guide of how to use amplitude SDK
---

## Overview
1. Initialize the Library
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
	// CocoaPods [^1]
    pod 'Amplitude', '~> 8.8.0'

	// Swift Package Manager
	Add 'https://github.com/amplitude/Amplitude-iOS' to Package Dependency

	// Carthage
	github 'amplitude/Amplitude-iOS' ~> 8.8.0
	```
=== "JAVA"
	```bash
	// Gradle
	dependencies {
	    implementation 'org.json:json:20201115'
	    implementation 'com.amplitude:java-sdk:1.10.0'
	}
	```
=== "PYTHON"
	```bash
	pip install amplitude-analytics
	```
=== "React Native"
	```bash
	// NPM
	npm install @amplitude/react-native@latest

	// YARN
	yarn add @amplitude/react-native@latest
	```
=== "Flutter"
	```bash
	// YAML
	dependencies:
  		amplitude_flutter: ^3.7.0
	```
=== "Unity"
	```bash
	// Unity Package Manager
	Add 'https://github.com/amplitude/unity-plugin.git?path=/Assets'.

	// Manual Download
	Download amplitude-unity.unitypackage # (unitypackage)
	```
=== "Unreal"
	```txt
	Download AmplitudUnreal.zip[GitHub releases page](https://github.com/amplitude/Amplitude-Unreal/releases/tag/v0.1.0).
	Unzip it into a folder inside your Unreal project's Plugins directory.
	```
=== "GO"
	```bash
	go get https://github.com/amplitude/analytics-go
	```

unitypackage. [ Unity Package Manager Initialization] (../data/sources)


2. Send Data
3. Check for Sucess
4. Enforce event schemas  (ampli)

## Complete Code Example