---
title: Quick Start
description: The quick start guide of how to use amplitude SDK
---
## 1. Initialize the library

=== "Browser"

    <h4> Install the Dependency </h4>
    ```bash title="NPM"

    npm install @amplitude/analytics-browser

    ```

    ```bash title="YARN"

    yarn add @amplitude/analytics-browser
    ```

    ```html title="Script loader"

    <script type="text/javascript">
    !function(){"use strict";!function(e,t){var r=e.amplitude||{_q:[]};if(r.invoked)e.console&&console.error&&console.error("Amplitude snippet has been loaded.");else{r.invoked=!0;var n=t.createElement("script");n.type="text/javascript",n.integrity="sha384-XNX6U2ua04l5JNPk8racSkagg14UYkjWQjQmbRhYhLh0rtnEFZ1QTynnf4EUTukV",n.crossOrigin="anonymous",n.async=!0,n.src="https://cdn.amplitude.com/libs/analytics-browser-1.1.1-min.js.gz",n.onload=function(){e.amplitude.runQueuedFunctions||console.log("[Amplitude] Error: could not load SDK")};var s=t.getElementsByTagName("script")[0];function v(e,t){e.prototype[t]=function(){return this._q.push({name:t,args:Array.prototype.slice.call(arguments,0)}),this}}s.parentNode.insertBefore(n,s);for(var o=function(){return this._q=[],this},i=["add","append","clearAll","prepend","set","setOnce","unset","preInsert","postInsert","remove","getUserProperties"],a=0;a<i.length;a++)v(o,i[a]);r.Identify=o;for(var u=function(){return this._q=[],this},c=["getEventProperties","setProductId","setQuantity","setPrice","setRevenue","setRevenueType","setEventProperties"],l=0;l<c.length;l++)v(u,c[l]);r.Revenue=u;var p=["getDeviceId","setDeviceId","getSessionId","setSessionId","getUserId","setUserId","setOptOut","setTransport","reset"],d=["init","add","remove","track","logEvent","identify","groupIdentify","setGroup","revenue","flush"];function f(e){function t(t,r){e[t]=function(){var n={promise:new Promise((r=>{e._q.push({name:t,args:Array.prototype.slice.call(arguments,0),resolve:r})}))};if(r)return n}}for(var r=0;r<p.length;r++)t(p[r],!1);for(var n=0;n<d.length;n++)t(d[n],!0)}f(r),e.amplitude=r}}(window,document)}();
    </script>
    ```

    <h4> Initialization </h4>

    ```ts
    import { init } from '@amplitude/analytics-browser';

    init(AMPLITUDE_API_KEY, 'user@amplitude.com');
    ```

=== "Node"

    <h4> Install the Dependency </h4>

    ```bash title="NPM"

    npm install @amplitude/analytics-node
    ```

    ```bash title="YARN"

    yarn add @amplitude/analytics-node
    ```

    <h4> Initialization </h4>

    ```ts
    import { init } from '@amplitude/analytics-node';

    init(AMPLITUDE_API_KEY);
    ```

=== "Android"

    <h4> Install the Dependency </h4>

    ```bash title="Gradle"

    dependencies {
        implementation 'com.amplitude:analytics-android:1.+'
    }
    ```

    To report events to Amplitude, add the INTERNET permission to your AndroidManifest.xml file.
    <uses-permission android:name="android.permission.INTERNET" />

    Learn more about [Add Android Permission](../sdks/android-kotlin/#2-add-permissions).

    <h4> Initialization </h4>

    ```kotlin title="Kotlin"
    val amplitude = Amplitude(
        Configuration(
            apiKey = AMPLITUDE_API_KEY,
            context = applicationContext
        )
    )
    ```

    ```java title="Java"
    Amplitude amplitude =  new Amplitude(new Configuration(
        apiKey = AMPLITUDE_API_KEY,
        context = applicationContext
    ));
    ```

=== "iOS"

    <h4> Install the Dependency </h4>

    ```bash title="CocoaPods"

    pod 'Amplitude', '~> 8.8.0'
    ```
    Learn more about [Add Dependency using CocoaPods](../sdks/ios/#__tabbed_1_1).


    ```bash title="Swift Package Manager"

    Add 'https://github.com/amplitude/Amplitude-iOS' to Package Dependency
    ```
    Learn more about [Add Dependency using SPM](../sdks/ios/#__tabbed_1_2).

    ```bash title="Carthage"

    github 'amplitude/Amplitude-iOS' ~> 8.8.0
    ```
    Learn more about [Add Dependency using Carthage](../sdks/ios/#__tabbed_1_3).

    <h4> Initialization </h4>

    ```obj-c title="Objective-C"
    [[Amplitude instance] initializeApiKey:@"AMPLITUDE_API_KEY"];
    ```

    ```swift title="Swift"
    Amplitude.instance().initializeApiKey(AMPLITUDE_API_KEY)
    ```

=== "Java"

    <h4> Install the Dependency </h4>

    ```bash title="Maven"

    dependencies {
        implementation 'org.json:json:20201115'
        implementation 'com.amplitude:java-sdk:1.+'
    }
    ```
    Learn more about [Add Dependency using Gradle](../sdks/java/#maven).

    ```bash title="Download"

    Download the latest JAR file and add it to the project's buildpath. See instructions for your IDE.
    ```

    Get the [latest JAR file](https://github.com/amplitude/Amplitude-Java/releases).


    <h4> Initialization </h4>

    ```java title="Java"
    Amplitude amplitude = Amplitude.getInstance();
    amplitude.init(AMPLITUDE_API_KEY);
    ```

=== "Python"

    <h4> Install the Dependency </h4>

    ```bash
    pip install amplitude-analytics
    ```

    <h4> Initialization </h4>

    ```python title="Python"
    from amplitude import Amplitude

    amplitude = Amplitude(AMPLITUDE_API_KEY)
    ```

=== "React Native"

    <h4> Install the Dependency </h4>

    ```bash title="NPM"

    npm install @amplitude/analytics-react-native
    npm install @react-native-async-storage/async-storage
    ```

    ```bash title="YARN"
    yarn add @amplitude/analytics-react-native
    yarn add @react-native-async-storage/async-storage
    ```


    ```bash title="EXPO"
    expo install @amplitude/analytics-react-native
    expo install @react-native-async-storage/async-storage
    ```

    You'll need to install the native modules to run the SDK on iOS.
    ```bash
    cd ios
    pod install
    ```

    <h4> Initialization </h4>

    ```ts
    import { init } from '@amplitude/analytics-react-native';

    init(AMPLITUDE_API_KEY, 'user@amplitude.com');
    ```

=== "Flutter"

    <h4> Install the Dependency </h4>

    ```bash  title="YAML"

    dependencies:
        amplitude_flutter: ^3.7.0
    ```

    iOS installation also need to add `platform :ios, '10.0'` to your Podfile.
    
    Learn more about [Add Dependency](../sdks/flutter/#add-dependencies).

    <h4> Initialization </h4>

    ```dart title="Dart"
    import 'package:amplitude_flutter/amplitude.dart';

    final Amplitude amplitude = Amplitude.getInstance();
    amplitude.init(AMPLITUDE_API_KEY);
    ```

=== "GO"

    <h4> Install the Dependency </h4>

    ```bash title="Command GO"
    go get https://github.com/amplitude/analytics-go
    ```

    <h4> Initialization </h4>

    ```go title="GO"
    import (
    "github.com/amplitude/analytics-go/amplitude"
    )

    config := amplitude.NewConfig(AMPLITUDE_API_KEY)

    client := amplitude.NewClient(config)
    ```

=== "Unity"

    <h4> Install the Dependency </h4>

    ```bash title="Unity Package Manager"

    Add 'https://github.com/amplitude/unity-plugin.git?path=/Assets'.
    ```
    Learn more about [Unity package manager initizalization](../sdks/unity/#option-1-unity-package-manager)

    ```bash title="Manual download"

    Download amplitude-unity.unitypackage
    ```
    Learn more about the [Unity package download](../sdks/unity/#option-2-manual-download-and-add-dependency).

    <h4> Initialization </h4>

    ```c# title="C#"
    Amplitude amplitude = Amplitude.getInstance()
    amplitude.init("YOUR_API_KEY");
    ```

=== "Unreal"

    <h4> Install the Dependency </h4>

    ```txt title="Download SDK and add to project"
    1. Download AmplitudeUnreal.zip.
    2. Unzip it into a folder inside your Unreal project's Plugins directory.
    ```
    Download the latest [AmplitudeUnreal.zip](https://github.com/amplitude/Amplitude-Unreal/releases/tag/v0.1.0).

    <h4> Initialization </h4>

    ```text title="Enable the SDK plugin"

    Settings > Plugins > Project > Analytics
    ```
    Learn more about [How to enable SDK plugin](../sdks/unreal/#enable-the-sdk-plugin-in-the-editor).


    ```text title="Set Amplitude as your analytics provider"

    Settings -> Project Settings -> Analytics -> Providers
    ```

    Learn more about [How to set analytics provider](../sdks/unreal/#set-amplitude-as-your-analytics-provider).


    ```text title="Add your API keys"

    Settings -> Project Settings -> Analytics -> Amplitude
    ```

    Learn more about [How to set API keys](../sdks/unreal/#add-your-api-keys).


    ```c++ title="C++"
    #include "Runtime/Analytics/Analytics/Public/Analytics.h"
    #include "Runtime/Analytics/Analytics/Public/Interfaces/IAnalyticsProvider.h"
    ```

## 2. Send data

=== "Browser"

    ```ts title="TypeScript"
    import { track } from '@amplitude/analytics-browser';

    const eventProperties = {
      buttonColor: 'primary',
    };
    track('Button Clicked', eventProperties);

    ```

=== "Node"

    ```ts title="TypeScript"

    import { track } from '@amplitude/analytics-node';

    const eventProperties = {
      buttonColor: 'primary',
    };

    track('Button Clicked', eventProperties, {
      user_id: 'user@amplitude.com',
    });
    ```

=== "Android"

    ```kotlin title="Kotlin"

    amplitude.track("eventType", mutableMapOf<String, Any?>("test" to "event property value"))
    ```

    ```java title="Java"
    amplitude.track("eventType", new HashMap() {{
        put("test", "test event property value");
    }});
    ```

=== "iOS"

    ```obj-c title="Objective-C"
    [[Amplitude instance] logEvent:@"Button Clicked"];
    ```

    ```swift title="Swift"
    Amplitude.instance().logEvent("Button Click")
    ```

=== "Java"

    ```java

    amplitude.logEvent(new Event("Button Clicked", "test_user_id"));
    ```

=== "Python"

    ```python title="Python"
    from amplitude import BaseEvent

    amplitude.track(
        BaseEvent(
            event_type="type of event",
            user_id="USER_ID",
            device_id="DEVICE_ID",
            event_properties={
                "source": "notification"
            }
    ))
    ```

=== "React Native"

    ```ts title="TypeScript"

    import { track } from '@amplitude/analytics-react-native';

    const eventProperties = {
        buttonColor: 'primary',
    };
    track('Button Clicked', eventProperties);
    ```

=== "Flutter"

    ```dart title="Dart"

    amplitude.logEvent('BUTTON_CLICKED', {"Hover Time": "100ms"});
    ```

=== "Unity"

    ```c# title="C#"
    import 'package:amplitude_flutter/amplitude.dart';

    amplitude.logEvent('MyApp startup', eventProperties: {
      'friend_num': 10,
      'is_heavy_user': true
    });
    ```

=== "Unreal"

    ```c++ title="C++"

    TArray<FAnalyticsEventAttribute> AppendedAttributes;
    AppendedAttributes.Emplace(TEXT("Test Event Prop key1"), TEXT("Test Event value1"));
    AppendedAttributes.Emplace(TEXT("Test Event Prop key2"), TEXT("Test Event value2"));
    FAnalytics::Get().GetDefaultConfiguredProvider()->RecordEvent(TEXT("Game Started"), AppendedAttributes);
    ```

=== "GO"

    ```go title="GO"

    amplitude.Track(amplitude.Event{
           EventType: "Button Clicked",
           EventOptions: amplitude.EventOptions{
           UserID:   "user-id",
           DeviceID: "device-id",
        },
        EventProperties: map[string]interface{}{"source": "notification"},
    })

    ```

## 3. Check for success
#### Ingestion Debugger

1. Login to you Amplitude Analytics Orgnization.
2. Click the `Data Source tab` at the bottom of the navigation bar
3. Choose the `Ingestion Debugger` section. You can check the Requests or which User or Device has been throttled.

Learn more about [Ingestion Debugger](https://help.amplitude.com/hc/en-us/articles/360044835531).
#### User Lookup

After you fired an event, you can navigate to the `User & Account Look-Up` tab in Amplitude validate your event.

Learn more about [User Lookup](https://www.docs.developers.amplitude.com/data/debugger/#user-lookup).

#### Event Explorer

In any Amplitude chart, click `Select events using your product`. You are able to watch the events roll in, in near-real time.

Learn more about [Event Explorer](https://help.amplitude.com/hc/en-us/articles/360050836071-Event-Explorer-View-event-streams-in-real-time).

#### Instrument Explorer(Amplitude Browser SDK only)

Download the Google Chrome Extention which helps you examine and debug your Amplitude Browser SDK.

Learn more about [Instrument Explorer](https://chrome.google.com/webstore/detail/amplitude-event-explorer/acehfjhnmhbmgkedjmjlobpgdicnhkbp).

## 4. Enforce event schemas (Ampli)
The Ampli CLI, Ampli Wrapper, and Amplitude SDK work together to generate a tracking library based on your Tracking Plan.
The autogenerated library provides type-safety, supports linting, and enable features like input validation which contextualizes your analytics instrumentation, and reduces incorrect instrumentations in your production environments.

```ts
ampli.customizeEventType({
    stringProp: "Strongly typed property",
    booleanProp: true
})
```

Learn more about [Ampli and Ampli CLI](../ampli).
## 5. Complete code example

=== "Browser"

    ```ts title="TypeScript"
    import { init, identify, Identify, track } from '@amplitude/analytics-browser';

    init(AMPLITUDE_API_KEY, 'user@amplitude.com');
    const eventProperties = {
        buttonColor: 'primary',
    };

    const identifyObj = new Identify();
    identifyObj.set('location', 'LAX');
    identify(identifyObj);

    track('Button Clicked', eventProperties);

    ```

    Learn more available functionalities in [Broswer SDK](../sdks/typescript-browser/).


=== "Node"

    ```ts title="TypeScript"
    import { init, identify, Identify, track } from '@amplitude/analytics-node';
    init(AMPLITUDE_API_KEY);

    const identifyObj = new Identify();
    identify(identifyObj, {
        user_id: 'user@amplitude.com',
    });

    const eventProperties = {
        buttonColor: 'primary',
    };
    track('Button Clicked', eventProperties, {
        user_id: 'user@amplitude.com',
    });
    ```

    Learn more available functionalities in [Node SDK](../sdks/typescript-node/).

=== "Android"

    ```kotlin title="Kotlin"
    package com.amplitude.android.sample

    import android.os.Bundle
    import com.amplitude.core.events.Identify
    import com.amplitude.android.Amplitude
    import com.amplitude.android.Configuration

    class MainActivity : AppCompatActivity() {
        private val amplitude = Amplitude(
            Configuration(
                apiKey = AMPLITUDE_API_KEY,
                context = applicationContext
            )
        );

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(R.layout.activity_main)

            val identify = Identify()
            identify.set("user-platform", "android")
            amplitude.identify(identify)

            amplitude.track("test event properties", mapOf("test" to "test event property value"))
        }
    }
    ```

    ```java title="Java"
    package com.amplitude.android.sample;

    import androidx.appcompat.app.AppCompatActivity;
    import android.os.Bundle;
    import com.amplitude.android.Amplitude;
    import com.amplitude.core.events.Identify;
    import java.util.HashMap;

    public class MainActivity extends AppCompatActivity {

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_main);
            Amplitude amplitude = new Amplitude(new Configuration(
                apiKey = AMPLITUDE_API_KEY,
                context = applicationContext
            ));

            Identify identify = new Identify()
                    .set("user-platform", "android")
            amplitude.identify(identify);

            amplitude.track("test event properties", new HashMap() {{
                put("test", "test event property value");
            }});
        }
    }

    ```

    Learn more available functionalities in [Android SDK](../sdks/android-kotlin/).


=== "iOS"

    ```obj-c title="Objective-C"
    #import "Amplitude.h"

    (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
        [[Amplitude instance] initializeApiKey:@"AMPLITUDE_API_KEY"];

        AMPIdentify *identify = [[[AMPIdentify identify] set:@"gender" value:@"female"] set:@"age"
            value:[NSNumber numberWithInt:20]];
        [[Amplitude instance] identify:identify];

        [[Amplitude instance] logEvent:@"app_start"];

        return YES;
    }

    ```

    ```swift title="Swift"
    import Amplitude

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        Amplitude.instance().initializeApiKey("AMPLITUDE_API_KEY")

        let identify = AMPIdentify()
            .set("gender", value: "female")
            .set("age",value: NSNumber(value: 20))
        Amplitude.instance().identify(identify)

        Amplitude.instance().logEvent("app_start")

        return true
    }
    ```

    Learn more available functionalities in [iOS SDK](../sdks/ios/).


=== "Java"

    ```java
    package com.demo.amplitude;

    import com.amplitude.*;
    import org.json.JSONObject;
    import org.springframework.web.bind.annotation.RestController;
    import org.springframework.web.bind.annotation.RequestMapping;

    @RestController
    public class DemoController {
        @RequestMapping("/")
        public String index() {
            Amplitude amplitude = Amplitude.getInstance();
            amplitude.init(AMPLITUDE_API_KEY);

            Event event = new Event("Button Clicked", "test_user_id");

            JSONObject eventProps = new JSONObject();
            try {
                eventProps.put("Hover Time", 10).put("prop_2", "value_2");
            } catch (JSONException e) {
                System.err.println("Invalid JSON");
                e.printStackTrace();
            }
            event.eventProperties = eventProps;

            amplitude.logEvent(event);
            return "Amplitude Java SDK Demo: sending test event.";
          }
    }

    ```

    Learn more available functionalities in [Java SDK](../sdks/java/).


=== "Python"

    ```python title="Python"

    from amplitude import Amplitude, Identify, BaseEvent

    amplitude = Amplitude("AMPLITUDE_API_KEY")

    identify_obj=Identify()
    identify_obj.set("location", "LAX")
    amplitude.identify(identify_obj)

    amplitude.track(
        BaseEvent(
            event_type="type of event",
            user_id="USER_ID",
            device_id="DEVICE_ID",
            event_properties={
                "source": "notification"
            }
    ))
    ```

    Learn more available functionalities in [Python SDK](../sdks/python/).


=== "React Native"

    ```ts title="TypeScript"

    import { init, track, Identify, identify } from '@amplitude/analytics-react-native';

    init(AMPLITUDE_API_KEY, 'user@amplitude.com');

    const identifyObj = new Identify();
    identifyObj.set('location', 'LAX');
    identify(identifyObj);

    const eventProperties = {
    buttonColor: 'primary',
    };
    track('Button Clicked', eventProperties);
    ```

    Learn more available functionalities in [React Native SDK](../sdks/typescript-react-native/).

=== "Flutter"

    ```dart title="Dart"

    import 'package:amplitude_flutter/amplitude.dart';
    import 'package:amplitude_flutter/identify.dart';

    class YourClass {
        Future<void> exampleForAmplitude() async {
        final Amplitude amplitude = Amplitude.getInstance();

        amplitude.init(AMPLITUDE_API_KEY);

        final Identify identify1 = Identify();
        identify1.setOnce('sign_up_date', '2015-08-24');
        Amplitude.getInstance().identify(identify1);

        amplitude.logEvent('MyApp startup', eventProperties: {
            'friend_num': 10,
            'is_heavy_user': true
        });
    }

    ```

    Learn more available functionalities in [Flutter SDK](../sdks/flutter/).

=== "GO"

    ```go title="GO"

    package main

    import (
    "github.com/amplitude/analytics-go/amplitude"
    )

    func main() {
        config := amplitude.NewConfig(AMPLITUDE_API_KEY)
        amplitude := amplitude.NewClient(config)

        identifyObj := amplitude.Identify{}
        identifyObj.Set("location", "LAX")
        amplitude.Identify(identifyObj, amplitude.EventOptions{UserID: "user-id"})

        amplitude.Track(amplitude.Event{
            EventType: "Button Clicked",
            EventOptions: amplitude.EventOptions{
                UserID:   "user-id",
                DeviceID: "device-id",
            },
            EventProperties: map[string]interface{}{"source": "notification"},
        })
    }

    ```

    Learn more available functionalities in [Go SDK](../sdks/go/).

=== "Unity"

    ```c# title="C#"
    Amplitude amplitude = Amplitude.getInstance();
    amplitude.init("AMPLITUDE_API_KEY");

    amplitude.addUserProperty("oranges", 5);
    Dictionary<string, object> values = new Dictionary<string, object>();
    values.Add("Key A", "Value A");
    amplitude.addUserPropertyDict("user_facts", values);

    JSONObjecteventProperties=newJSONObject().put("key", "value");
    Amplitude.getInstance().logEvent("initialize_game", eventProperties);

    ```

    Learn more available functionalities in [Unity SDK](../sdks/unity/).

=== "Unreal"

    ```c++ title="C++"

    FAnalytics::Get().GetDefaultConfiguredProvider()->SetLocation(TEXT("Test location"));
    FAnalytics::Get().GetDefaultConfiguredProvider()->SetGender(TEXT("Test gender"));
    FAnalytics::Get().GetDefaultConfiguredProvider()->SetAge(TEXT(27));

    TArray<FAnalyticsEventAttribute> AppendedAttributes;
    AppendedAttributes.Emplace(TEXT("Test Event Prop key1"), TEXT("Test Event value1"));
    AppendedAttributes.Emplace(TEXT("Test Event Prop key2"), TEXT("Test Event value2"));
    FAnalytics::Get().GetDefaultConfiguredProvider()->RecordEvent(TEXT("Game Started"), AppendedAttributes);
    ```

    Learn more available functionalities in [Unreal SDK](../sdks/unreal/).