---
title: Unreal Engine
description: The Amplitude Unreal Engine SDK Installation & Quick Start guide.
icon: material/unreal
---

!!!note "This SDK is in Beta"

    The Amplitude Analytics Unreal Engine SDK is in beta and currently supports projects targeting iOS, MacOS, or tvOS.

!!!info "SDK Resources"
    - [Unreal Engine SDK Repository :material-github:](https://github.com/amplitude/Amplitude-Unreal)
    - [Unreal Engine SDK Releases :material-code-tags-check:](https://github.com/amplitude/Amplitude-Unreal/releases/tag/v0.1.0)

## SDK installation

### Install the SDK plugin

Install the Unreal Engine SDK by downloading the latest version of `AmplitudUnreal.zip` found on the [GitHub releases](https://github.com/amplitude/Amplitude-Unreal/releases/latest) page.
 Unzip it into a folder inside your Unreal project's `Plugins` directory.

```bash
mkdir -p Plugins/AmplitudeUnreal
unzip AmplitudeUnreal.zip -d Plugins/AmplitudeUnreal
```

### Enable the SDK plugin in the editor

Open your project in the UE4 editor. Navigate to **Settings > Plugins > Project > Analytics** and make sure to enable `AmplitudeUnreal`.

![screenshot of the plugin enabled](/../assets/images/analytics-unreal-1.png)

### Set Amplitude as your analytics provider

Navigate to **Settings -> Project Settings -> Analytics -> Providers** and set the fields to `Amplitude`.

![screenshot of the providers screen with Amplitude entered as the value](/../assets/images/analytics-unreal-2.png)

### Add your API keys

Navigate to Settings -> Project Settings -> Analytics -> Amplitude and fill in the fields with your API key

![screenshot of the API keys screen](/../assets/images/analytics-unreal-3.png)

### Include analytics modules

In any file that involves instrumentation, you should include the necessary Unreal Engine analytics headers.

```bash
#include "Runtime/Analytics/Analytics/Public/Analytics.h"
#include "Runtime/Analytics/Analytics/Public/Interfaces/IAnalyticsProvider.h"
```

## Usage and examples

The API of Amplitude Unreal follows the [analytics provider interface](https://docs.unrealengine.com/en-US/API/Runtime/Analytics/Interfaces/IAnalyticsProvider/index.html) defined by the Unreal Engine.

### Logging basic events

Events represent how users interact with your app. For example, "Game Started" may be an action you want to note.

```c++
FAnalytics::Get().GetDefaultConfiguredProvider()->StartSession();
FAnalytics::Get().GetDefaultConfiguredProvider()->RecordEvent(TEXT("Game started"));
FAnalytics::Get().GetDefaultConfiguredProvider()->EndSession();
```

### Logging events with properties

Events can contain properties. Properties give context about the event taken.

```c++
TArray<FAnalyticsEventAttribute> AppendedAttributes;
AppendedAttributes.Emplace(TEXT("Test Event Prop key1"), TEXT("Test Event value1"));
AppendedAttributes.Emplace(TEXT("Test Event Prop key2"), TEXT("Test Event value2"));
FAnalytics::Get().GetDefaultConfiguredProvider()->RecordEvent(TEXT("Game Started"), AppendedAttributes);
```

### Setting user properties

User properties help you understand your users at the time they performed some action within your app.

The generic Unreal Engine [`IAnalyticsProvider`](https://docs.unrealengine.com/en-US/API/Runtime/Analytics/Interfaces/IAnalyticsProvider/index.html) supports a limited number of user properties.

```c++
FAnalytics::Get().GetDefaultConfiguredProvider()->SetLocation(TEXT("Test location"));
FAnalytics::Get().GetDefaultConfiguredProvider()->SetGender(TEXT("Test gender"));
FAnalytics::Get().GetDefaultConfiguredProvider()->SetAge(TEXT(27));
```

### Setting custom user IDs

If your app has its own login system that you want to track users with, use `SetUserId` to set a custom user ID.

```c++
FAnalytics::Get().GetDefaultConfiguredProvider()->SetUserID(TEXT("test123@test.com"));
```
