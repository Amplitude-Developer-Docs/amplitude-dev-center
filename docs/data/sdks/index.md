---
title: Amplitude SDK Quickstart Guide
description: Use this guide to get started with the Amplitude SDKs. 
hide: 
  - toc
status: new
---

Use this guide to get started with the Amplitude SDKs. Choose your target language:

=== "Browser"

    ???info "Table of Contents"
        1. [Initialize the library]()
        2. [Send data]()
        3. [Check for success]()
        4. [Enforce event schemas]()
        5. [Complete code example]()

    --8<-- "includes/sdk-quickstart/quickstart-initialize-library.md"

    ### Install dependencies
        
    Install dependencies using NPM, YARN, or script loader.

    === "NPM"
        ```bash

        npm install @amplitude/analytics-browser

        ```
    === "YARN"
        ```bash

        yarn add @amplitude/analytics-browser
        ```

    === "Script loader"
        ```html

        <script type="text/javascript">
        !function(){"use strict";!function(e,t){var r=e.amplitude||{_q:[]};if(r.invoked)e.console&&console.error&&console.error("Amplitude snippet has been loaded.");else{r.invoked=!0;var n=t.createElement("script");n.type="text/javascript",n.integrity="sha384-XNX6U2ua04l5JNPk8racSkagg14UYkjWQjQmbRhYhLh0rtnEFZ1QTynnf4EUTukV",n.crossOrigin="anonymous",n.async=!0,n.src="https://cdn.amplitude.com/libs/analytics-browser-1.1.1-min.js.gz",n.onload=function(){e.amplitude.runQueuedFunctions||console.log("[Amplitude] Error: could not load SDK")};var s=t.getElementsByTagName("script")[0];function v(e,t){e.prototype[t]=function(){return this._q.push({name:t,args:Array.prototype.slice.call(arguments,0)}),this}}s.parentNode.insertBefore(n,s);for(var o=function(){return this._q=[],this},i=["add","append","clearAll","prepend","set","setOnce","unset","preInsert","postInsert","remove","getUserProperties"],a=0;a<i.length;a++)v(o,i[a]);r.Identify=o;for(var u=function(){return this._q=[],this},c=["getEventProperties","setProductId","setQuantity","setPrice","setRevenue","setRevenueType","setEventProperties"],l=0;l<c.length;l++)v(u,c[l]);r.Revenue=u;var p=["getDeviceId","setDeviceId","getSessionId","setSessionId","getUserId","setUserId","setOptOut","setTransport","reset"],d=["init","add","remove","track","logEvent","identify","groupIdentify","setGroup","revenue","flush"];function f(e){function t(t,r){e[t]=function(){var n={promise:new Promise((r=>{e._q.push({name:t,args:Array.prototype.slice.call(arguments,0),resolve:r})}))};if(r)return n}}for(var r=0;r<p.length;r++)t(p[r],!1);for(var n=0;n<d.length;n++)t(d[n],!0)}f(r),e.amplitude=r}}(window,document)}();
        </script>
        ```

    ### Initialization

    ```ts
    import { init } from '@amplitude/analytics-browser';

    init(AMPLITUDE_API_KEY, 'user@amplitude.com');
    ```
    
    --8<-- "includes/sdk-quickstart/quickstart-send-data.md"

    ```ts title="TypeScript"
    import { track } from '@amplitude/analytics-browser';

    const eventProperties = {
      buttonColor: 'primary',
    };
    track('Button Clicked', eventProperties);

    ```
  
    --8<-- "includes/sdk-quickstart/quickstart-check-for-success.md"

    ### Instrument Explorer

    Download the Google Chrome Extension, which helps you examine and debug your Amplitude Browser SDK.

    Learn more about [Instrument Explorer](https://chrome.google.com/webstore/detail/amplitude-event-explorer/acehfjhnmhbmgkedjmjlobpgdicnhkbp?hl=en).

    --8<-- "includes/sdk-quickstart/quickstart-enforce-event-schema-intro.md"

    ```ts

    ampli.load();

    ampli.yourEventType({
        stringProp: "Strongly typed property",
        booleanProp: true
    });

    ```

    Learn more about [Ampli Browser](../sdks/typescript-browser/ampli/).

    --8<-- "includes/sdk-quickstart/quickstart-complete-code-example.md"

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

    Learn more available functionalities in [Browser SDK](../sdks/typescript-browser/).
    
=== "Node"

    ???info "Table of Contents"
        1. [Initialize the library]()
        2. [Send data]()
        3. [Check for success]()
        4. [Enforce event schemas]()
        5. [Complete code example]()

    --8<-- "includes/sdk-quickstart/quickstart-initialize-library.md"

    ### Install the Dependency

      Install dependencies using NPM or YARN.

    === "NPM"

        ```bash

        npm install @amplitude/analytics-node
        ```

    === "YARN"

        ```bash title="YARN"

        yarn add @amplitude/analytics-node
        ```

    ### Initialization

    ```ts
    import { init } from '@amplitude/analytics-node';

    init(AMPLITUDE_API_KEY);
    ```

    --8<-- "includes/sdk-quickstart/quickstart-send-data.md"

    ```ts title="TypeScript"

    import { track } from '@amplitude/analytics-node';

    const eventProperties = {
      buttonColor: 'primary',
    };

    track('Button Clicked', eventProperties, {
      user_id: 'user@amplitude.com',
    });

    ```

    --8<-- "includes/sdk-quickstart/quickstart-check-for-success.md"

    --8<-- "includes/sdk-quickstart/quickstart-enforce-event-schema-intro.md"

    ```ts

    ampli.load();

    ampli.yourEventType("ampli-user-id", {
        stringProp: "Strongly typed property",
        booleanProp: true,
    });

    ```

    Learn more about [Ampli Node](../sdks/typescript-node/ampli/).

    --8<-- "includes/sdk-quickstart/quickstart-complete-code-example.md"

    ```ts
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

    ???info "Table of Contents"
        1. [Initialize the library]()
        2. [Send data]()
        3. [Check for success]()
        4. [Enforce event schemas]()
        5. [Complete code example]()

    --8<-- "includes/sdk-quickstart/quickstart-initialize-library.md"

    ### Install dependencies

    === "Gradle"

        ```bash

        dependencies {
            implementation 'com.amplitude:analytics-android:1.+'
        }
        ```

    To report events to Amplitude, add the INTERNET permission to your AndroidManifest.xml file. `<uses-permission android:name="android.permission.INTERNET" />`

    Learn more about [Add Android Permission](../sdks/android-kotlin/#2-add-permissions).

    ### Initialization

    === "Kotlin"

        ```kotlin
        val amplitude = Amplitude(
            Configuration(
                apiKey = AMPLITUDE_API_KEY,
                context = applicationContext
            )
        )
        ```
    === "Java"

        ```java
        Amplitude amplitude =  new Amplitude(new Configuration(
            apiKey = AMPLITUDE_API_KEY,
            context = applicationContext
        ));
        ```

    --8<-- "includes/sdk-quickstart/quickstart-send-data.md"

    ```kotlin title="Kotlin"

    amplitude.track("eventType", mutableMapOf<String, Any?>("test" to "event property value"))
    ```

    ```java title="Java"
    amplitude.track("eventType", new HashMap() {{
        put("test", "test event property value");
    }});
    ```

    --8<-- "includes/sdk-quickstart/quickstart-check-for-success.md"

    --8<-- "includes/sdk-quickstart/quickstart-enforce-event-schema-intro.md"

    ```kotlin title="Kotlin"

    ampli.load()

    ampli.yourEventType({
        stringProp = "Strongly typed property",
        booleanProp = true
    })

    ```

    ```java title="Java"
    Ampli.getInstance().load();

    Ampli.getInstance().yourEventType(YourEventType.builder()
                       .stringProp("Strongly typed property")
                       .booleanProp(true)
                       .build());
    ```

    Learn more about [Ampli Android](../sdks/android-kotlin/ampli/).

    --8<-- "includes/sdk-quickstart/quickstart-complete-code-example.md"

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

    ???info "Table of Contents"
        1. [Initialize the library]()
        2. [Send data]()
        3. [Check for success]()
        4. [Enforce event schemas]()
        5. [Complete code example]()

    --8<-- "includes/sdk-quickstart/quickstart-initialize-library.md"

    ### Install the dependency

    === "CocoaPods"

        ```bash

        pod 'Amplitude', '~> 8.8.0'
        ```
        [Learn more](../sdks/ios/#__tabbed_1_1)

    === "Swift Package Manager"

        ```bash

        Add 'https://github.com/amplitude/Amplitude-iOS' to Package Dependency
        ```
        [Learn more](../sdks/ios/#__tabbed_1_2)
    
    === "Carthage"

        ```bash

        github 'amplitude/Amplitude-iOS' ~> 8.8.0
        ```
        [Learn more](../sdks/ios/#__tabbed_1_3)

    ### Initialization

    === "Objective-C"

        ```obj-c
        [[Amplitude instance] initializeApiKey:@"AMPLITUDE_API_KEY"];
        ```
    === "Swift"

        ```swift
        Amplitude.instance().initializeApiKey(AMPLITUDE_API_KEY)
        ```

    --8<-- "includes/sdk-quickstart/quickstart-send-data.md"

    ```obj-c title="Objective-C"
    [[Amplitude instance] logEvent:@"Button Clicked"];
    ```

    ```swift title="Swift"
    Amplitude.instance().logEvent("Button Click")
    ```

    --8<-- "includes/sdk-quickstart/quickstart-check-for-success.md"

    --8<-- "includes/sdk-quickstart/quickstart-enforce-event-schema-intro.md"

    ```obj-c title="Objective-C"

    Ampli *ampli = [Ampli instance];
    [ampli load];

    [ampli yourEventType:[YourEventType stringProp:@[@"Strongly typed property"]
                                        booleanProp:true
    ]];

    ```

    ```swift title="Swift"

    ampli.load();

    ampli.yourEventType(
        stringProp: "Strongly typed property",
        booleanProp: true
    )

    ```

    Learn more about [Ampli iOS](../sdks/ios/ampli/).

    --8<-- "includes/sdk-quickstart/quickstart-complete-code-example.md"

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

    ???info "Table of Contents"
        1. [Initialize the library]()
        2. [Send data]()
        3. [Check for success]()
        4. [Enforce event schemas]()
        5. [Complete code example]()

    --8<-- "includes/sdk-quickstart/quickstart-initialize-library.md"

    **Install the Dependency**

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


    **Initialization**

    ```java title="Java"
    Amplitude amplitude = Amplitude.getInstance();
    amplitude.init(AMPLITUDE_API_KEY);
    ```

    --8<-- "includes/sdk-quickstart/quickstart-send-data.md"

    ```java

    amplitude.logEvent(new Event("Button Clicked", "test_user_id"));
    ```

    --8<-- "includes/sdk-quickstart/quickstart-check-for-success.md"

    --8<-- "includes/sdk-quickstart/quickstart-enforce-event-schema-intro.md"

    ```java

    Ampli.getInstance().load();

    Ampli.getInstance().yourEventType("ampli-user-id",
        YourEventType.builder("Strongly typed property")
            .stringProp()
            .booleanProp(false)
            .build()
    );

    ```
    Learn more about [Ampli Java](../sdks/java/ampli/).

    --8<-- "includes/sdk-quickstart/quickstart-complete-code-example.md"

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

    ???info "Table of Contents"
        1. [Initialize the library]()
        2. [Send data]()
        3. [Check for success]()
        4. [Enforce event schemas]()
        5. [Complete code example]()

    --8<-- "includes/sdk-quickstart/quickstart-initialize-library.md"

    **Install the Dependency**

    ```bash
    pip install amplitude-analytics
    ```

    **Initialization**

    ```python title="Python"
    from amplitude import Amplitude

    amplitude = Amplitude(AMPLITUDE_API_KEY)
    ```

    --8<-- "includes/sdk-quickstart/quickstart-send-data.md"

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

    --8<-- "includes/sdk-quickstart/quickstart-check-for-success.md"

    --8<-- "includes/sdk-quickstart/quickstart-enforce-event-schema-intro.md"

    ```python

    ampli.load();
    ampli.yourEventType(
        "user_id",
        YourEventType(
            stringProp= "Strongly typed property",
            booleanProp=True
        )
    )

    ```
    Learn more about [Ampli Python](../sdks/python/ampli/).

    --8<-- "includes/sdk-quickstart/quickstart-complete-code-example.md"

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

    ???info "Table of Contents"
        1. [Initialize the library]()
        2. [Send data]()
        3. [Check for success]()
        4. [Enforce event schemas]()
        5. [Complete code example]()

    --8<-- "includes/sdk-quickstart/quickstart-initialize-library.md"

    **Install the Dependency**

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

    **Initialization**

    ```ts
    import { init } from '@amplitude/analytics-react-native';

    init(AMPLITUDE_API_KEY, 'user@amplitude.com');
    ```

    --8<-- "includes/sdk-quickstart/quickstart-send-data.md"

    ```ts title="TypeScript"

    import { track } from '@amplitude/analytics-react-native';

    const eventProperties = {
        buttonColor: 'primary',
    };
    track('Button Clicked', eventProperties);
    ```

    --8<-- "includes/sdk-quickstart/quickstart-check-for-success.md"

    --8<-- "includes/sdk-quickstart/quickstart-enforce-event-schema-intro.md"

    ```ts

    ampli.load();
    ampli.yourEventType({
        stringProp: "Strongly typed property",
    });

    ```

    Learn more about [Ampli React Native](../sdks/typescript-react-native/ampli/).

    --8<-- "includes/sdk-quickstart/quickstart-complete-code-example.md"

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

    ???info "Table of Contents"
        1. [Initialize the library]()
        2. [Send data]()
        3. [Check for success]()
        4. [Enforce event schemas]()
        5. [Complete code example]()

    --8<-- "includes/sdk-quickstart/quickstart-initialize-library.md"


    **Install the Dependency**

    ```bash  title="YAML"

    dependencies:
        amplitude_flutter: ^3.7.0
    ```

    iOS installation also need to add `platform :ios, '10.0'` to your Podfile.
    
    Learn more about [Add Dependency](../sdks/flutter/#add-dependencies).

    **Initialization**

    ```dart title="Dart"
    import 'package:amplitude_flutter/amplitude.dart';

    final Amplitude amplitude = Amplitude.getInstance();
    amplitude.init(AMPLITUDE_API_KEY);
    ```

    --8<-- "includes/sdk-quickstart/quickstart-send-data.md"

    ```dart title="Dart"

    amplitude.logEvent('BUTTON_CLICKED', {"Hover Time": "100ms"});
    ```

    --8<-- "includes/sdk-quickstart/quickstart-check-for-success.md"

    --8<-- "includes/sdk-quickstart/quickstart-enforce-event-schema-intro.md"

    TBD

    --8<-- "includes/sdk-quickstart/quickstart-complete-code-example.md"

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

=== "Go"

    ???info "Table of Contents"
        1. [Initialize the library]()
        2. [Send data]()
        3. [Check for success]()
        4. [Enforce event schemas]()
        5. [Complete code example]()

    --8<-- "includes/sdk-quickstart/quickstart-initialize-library.md"

    **Install the Dependency**

    ```bash title="Command GO"
    go get https://github.com/amplitude/analytics-go
    ```

    **Initialization**

    ```go title="GO"
    import (
    "github.com/amplitude/analytics-go/amplitude"
    )

    config := amplitude.NewConfig(AMPLITUDE_API_KEY)

    client := amplitude.NewClient(config)
    ```

    --8<-- "includes/sdk-quickstart/quickstart-send-data.md"

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

    --8<-- "includes/sdk-quickstart/quickstart-check-for-success.md"

    --8<-- "includes/sdk-quickstart/quickstart-enforce-event-schema-intro.md"

    Coming soon.

    --8<-- "includes/sdk-quickstart/quickstart-complete-code-example.md"

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

    ???info "Table of Contents"
        1. [Initialize the library]()
        2. [Send data]()
        3. [Check for success]()
        4. [Enforce event schemas]()
        5. [Complete code example]()

    --8<-- "includes/sdk-quickstart/quickstart-initialize-library.md"

    **Install the Dependency**

    ```bash title="Unity Package Manager"

    Add 'https://github.com/amplitude/unity-plugin.git?path=/Assets'.
    ```
    Learn more about [Unity package manager initizalization](../sdks/unity/#option-1-unity-package-manager)

    ```bash title="Manual download"

    Download amplitude-unity.unitypackage
    ```
    Learn more about the [Unity package download](../sdks/unity/#option-2-manual-download-and-add-dependency).

    **Initialization**

    ```c# title="C#"
    Amplitude amplitude = Amplitude.getInstance()
    amplitude.init("YOUR_API_KEY");
    ```

    --8<-- "includes/sdk-quickstart/quickstart-send-data.md"

    ```c# title="C#"
    import 'package:amplitude_flutter/amplitude.dart';

    amplitude.logEvent('MyApp startup', eventProperties: {
      'friend_num': 10,
      'is_heavy_user': true
    });
    ```

    --8<-- "includes/sdk-quickstart/quickstart-check-for-success.md"

    --8<-- "includes/sdk-quickstart/quickstart-enforce-event-schema-intro.md"

    TBD

    --8<-- "includes/sdk-quickstart/quickstart-complete-code-example.md"

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

    ???info "Table of Contents"
        1. [Initialize the library]()
        2. [Send data]()
        3. [Check for success]()
        4. [Enforce event schemas]()
        5. [Complete code example]()

    --8<-- "includes/sdk-quickstart/quickstart-initialize-library.md"

        **Install the Dependency**

    ```txt title="Download SDK and add to project"
    1. Download AmplitudeUnreal.zip.
    2. Unzip it into a folder inside your Unreal project's Plugins directory.
    ```
    Download the latest [AmplitudeUnreal.zip](https://github.com/amplitude/Amplitude-Unreal/releases/tag/v0.1.0).

    **Initialization**

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

    --8<-- "includes/sdk-quickstart/quickstart-send-data.md"

    ```c++ title="C++"

    TArray<FAnalyticsEventAttribute> AppendedAttributes;
    AppendedAttributes.Emplace(TEXT("Test Event Prop key1"), TEXT("Test Event value1"));
    AppendedAttributes.Emplace(TEXT("Test Event Prop key2"), TEXT("Test Event value2"));
    FAnalytics::Get().GetDefaultConfiguredProvider()->RecordEvent(TEXT("Game Started"), AppendedAttributes);
    ```

    --8<-- "includes/sdk-quickstart/quickstart-check-for-success.md"

    --8<-- "includes/sdk-quickstart/quickstart-enforce-event-schema-intro.md"

    TBD

    --8<-- "includes/sdk-quickstart/quickstart-complete-code-example.md"

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
