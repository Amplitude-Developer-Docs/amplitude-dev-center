---
title: Unreal Engine SDK
description:
icon: material/unreal
---

!!!info "Beta"

    The Amplitude Analytics Unreal Engine SDK is in beta and currently supports projects targeting iOS, MacOS, or tvOS.

## SDK installation

### Install the SDK plugin

You can install the Unreal Engine SDK by downloading the latest version of `AmplitudUnreal.zip` found in our [GitHub releases](https://github.com/amplitude/Amplitude-Unreal/releases/latest). Unzip it into a folder inside your Unreal project's `Plugins` directory.

```bash
mkdir -p Plugins/AmplitudeUnreal
unzip AmplitudeUnreal.zip -d Plugins/AmplitudeUnreal
```

### Enable the SDK plugin in the editor

Open your project in the UE4 editor. Navigate to Settings -> Plugins -> Project -> Analytics and make sure AmplitudeUnreal is enabled.

![screenshot of the plugin enabled](/../assets/images/analytics-unreal-1.png)

### Set Amplitude as your Analytics Provider

Navigate to **Settings -> Project Settings -> Analytics -> Providers** and set the fields to `Amplitude`.

![screenshot of the providers screen with Amplitude entered as the value](/../assets/images/analytics-unreal-2.png)

### Add your API keys

Navigate to Settings -> Project Settings -> Analytics -> Amplitude and fill in the fields with your API key

![screenshot of the api keys screen](/../assets/images/analytics-unreal-3.png)

### Include Analytics Modules

In any file that involves instrumentation, you should include the necessary Unreal Engine analytics headers.

```bash
#include "Runtime/Analytics/Analytics/Public/Analytics.h"
#include "Runtime/Analytics/Analytics/Public/Interfaces/IAnalyticsProvider.h"
```

## Usage and Examples

The API of Amplitude Unreal follows the [analytics provider interface](https://docs.unrealengine.com/en-US/API/Runtime/Analytics/Interfaces/IAnalyticsProvider/index.html) defined by the Unreal Engine.

### Logging Basic Events

```c++
FAnalytics::Get().GetDefaultConfiguredProvider()->StartSession();
FAnalytics::Get().GetDefaultConfiguredProvider()->RecordEvent(TEXT("Game started"));
FAnalytics::Get().GetDefaultConfiguredProvider()->EndSession();
```

### Logging Events with Properties

```c++
TArray<FAnalyticsEventAttribute> AppendedAttributes;
AppendedAttributes.Emplace(TEXT("Test Event Prop key1"), TEXT("Test Event value1"));
AppendedAttributes.Emplace(TEXT("Test Event Prop key2"), TEXT("Test Event value2"));
FAnalytics::Get().GetDefaultConfiguredProvider()->RecordEvent(TEXT("Test Event with Property"), AppendedAttributes);
```

### Setting User Properties


The generic Unreal Engine [`IAnalyticsProvider` ](https://docs.unrealengine.com/en-US/API/Runtime/Analytics/Interfaces/IAnalyticsProvider/index.html) allows access to a limited number of user properties.

```c++
FAnalytics::Get().GetDefaultConfiguredProvider()->SetLocation(TEXT("Test location"));
FAnalytics::Get().GetDefaultConfiguredProvider()->SetGender(TEXT("Test gender"));
FAnalytics::Get().GetDefaultConfiguredProvider()->SetAge(TEXT(27));
```

### Setting Custom User IDs

```c++
FAnalytics::Get().GetDefaultConfiguredProvider()->SetUserID(TEXT("test123@test.com"));
```