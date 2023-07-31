---
title: Amplitude SDK Quickstart Guide
description: Use this guide to get started with the Amplitude SDKs.
icon: material/clock-fast
hide: 
  - toc
status: new
---
<!-- Note to contributors: This doc has creative uses of standard formatting features. It's kind of brittle and can be hard to work with. If you have any questions or need help, reach out in #dev-doc-requests-->

Use this guide to get started with the Amplitude SDKs. Choose your target platform:

=== "Browser"

    The Browser SDK lets you send events to Amplitude. See the [Browser SDK documentation](../typescript-browser/) for additional configurations and advanced topics.

    !!!info "Table of Contents"
        1. [Initialize the library](#initialize-the-library)
        2. [Send data](#send-data)
        3. [Check for success](#check-for-success)
        4. [Complete code example](#complete-code-example)
        5. [Enforce event schemas](#enforce-event-schemas-ampli)

    --8<-- "includes/sdk-quickstart/quickstart-initialize-library.md"

    ### Install the dependency
        
    Install the dependency using NPM, YARN, or script loader.

    === "Script loader"
        This package is also distributed through a CDN. Copy and paste this script in your HTML file.
        ```html

        <script type="text/javascript">
        !function(){"use strict";!function(e,t){var n=e.amplitude||{_q:[],_iq:{}};if(n.invoked)e.console&&console.error&&console.error("Amplitude snippet has been loaded.");else{var r=function(e,t){e.prototype[t]=function(){return this._q.push({name:t,args:Array.prototype.slice.call(arguments,0)}),this}},s=function(e,t,n){return function(r){e._q.push({name:t,args:Array.prototype.slice.call(n,0),resolve:r})}},o=function(e,t,n){e[t]=function(){if(n)return{promise:new Promise(s(e,t,Array.prototype.slice.call(arguments)))}}},i=function(e){for(var t=0;t<m.length;t++)o(e,m[t],!1);for(var n=0;n<g.length;n++)o(e,g[n],!0)};n.invoked=!0;var u=t.createElement("script");u.type="text/javascript",u.integrity="sha384-x0ik2D45ZDEEEpYpEuDpmj05fY91P7EOZkgdKmq4dKL/ZAVcufJ+nULFtGn0HIZE",u.crossOrigin="anonymous",u.async=!0,u.src="https://cdn.amplitude.com/libs/analytics-browser-2.0.0-min.js.gz",u.onload=function(){e.amplitude.runQueuedFunctions||console.log("[Amplitude] Error: could not load SDK")};var a=t.getElementsByTagName("script")[0];a.parentNode.insertBefore(u,a);for(var c=function(){return this._q=[],this},p=["add","append","clearAll","prepend","set","setOnce","unset","preInsert","postInsert","remove","getUserProperties"],l=0;l<p.length;l++)r(c,p[l]);n.Identify=c;for(var d=function(){return this._q=[],this},f=["getEventProperties","setProductId","setQuantity","setPrice","setRevenue","setRevenueType","setEventProperties"],v=0;v<f.length;v++)r(d,f[v]);n.Revenue=d;var m=["getDeviceId","setDeviceId","getSessionId","setSessionId","getUserId","setUserId","setOptOut","setTransport","reset","extendSession"],g=["init","add","remove","track","logEvent","identify","groupIdentify","setGroup","revenue","flush"];i(n),n.createInstance=function(e){return n._iq[e]={_q:[]},i(n._iq[e]),n._iq[e]},e.amplitude=n}}(window,document)}();
        </script>
        ```
    === "NPM"
        ```bash
        npm install @amplitude/analytics-browser
        ```

        Import Amplitude to your project

        ```ts
        import * as amplitude from '@amplitude/analytics-browser';
        ```

    === "YARN"
        ```bash

        yarn add @amplitude/analytics-browser
        ```

        Import Amplitude to your project

        ```ts
        import * as amplitude from '@amplitude/analytics-browser';
        ```

    --8<-- "includes/sdk-quickstart/quickstart-initialization.md"

    ```ts
    amplitude.init(AMPLITUDE_API_KEY);
    ```

    --8<-- "includes/sdk-quickstart/quickstart-send-data.md"

    ```ts
    const eventProperties = {
        buttonColor: 'primary',
    };
    amplitude.track('Button Clicked', eventProperties);
    ```

    --8<-- "includes/sdk-quickstart/quickstart-check-for-success.md"

    --8<-- "includes/sdk-quickstart/quickstart-complete-code-example.md"

    ```ts
    amplitude.init(AMPLITUDE_API_KEY, 'user@amplitude.com');
    const eventProperties = {
        buttonColor: 'primary',
    };

    const identifyObj = new Identify();
    identifyObj.set('location', 'LAX');
    amplitude.identify(identifyObj);

    amplitude.track('Button Clicked', eventProperties);
    ```

    Learn more available functionalities in [Browser SDK](../typescript-browser/).

    --8<-- "includes/sdk-quickstart/quickstart-enforce-event-schema-intro.md"

    ```ts
    import { ampli } from './ampli';
    ampli.load({ environment: 'production' });

    ampli.buttonClicked({
        buttonColor: 'primary',
    });
    ```

    Learn more about and set up the [Browser Ampli](../typescript-browser/ampli/).

=== "Node"

    The Node.js SDK lets you send events to Amplitude. See the [Node.js SDK documentation](../typescript-node/) for additional configurations and advanced topics.

    !!!info "Table of Contents"
        1. [Initialize the library](#initialize-the-library_1)
        2. [Send data](#send-data_1)
        3. [Check for success](#check-for-success_1)
        4. [Complete code example](#complete-code-example_1)
        5. [Enforce event schemas](#enforce-event-schemas-ampli_1)

    --8<-- "includes/sdk-quickstart/quickstart-initialize-library.md"

    ### Install the dependency

      Install the dependency using NPM or YARN.

    === "NPM"

        ```bash

        npm install @amplitude/analytics-node
        ```

    === "YARN"

        ```bash

        yarn add @amplitude/analytics-node
        ```

    --8<-- "includes/sdk-quickstart/quickstart-initialization.md"

    === "TypeScript"

        ```ts
        import { init } from '@amplitude/analytics-node';

        init(AMPLITUDE_API_KEY);
        ```

    === "JavaScript"

        ```js
        import { init } from '@amplitude/analytics-node';

        init(AMPLITUDE_API_KEY);
        ```

    --8<-- "includes/sdk-quickstart/quickstart-send-data.md"

    === "TypeScript"

        ```ts

        import { track } from '@amplitude/analytics-node';

        const eventProperties = {
          buttonColor: 'primary',
        };

        track('Button Clicked', eventProperties, {
          user_id: 'user@amplitude.com',
        });
        ```

    === "JavaScript"

        ```js

        import { track } from '@amplitude/analytics-node';

        const eventProperties = {
          buttonColor: 'primary',
        };

        track('Button Clicked', eventProperties, {
          user_id: 'user@amplitude.com',
        });
        ```

    --8<-- "includes/sdk-quickstart/quickstart-check-for-success.md"

    --8<-- "includes/sdk-quickstart/quickstart-complete-code-example.md"

    === "TypeScript"

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

    === "JavaScript"

        ```js
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

    Learn more available functionalities in [Node.js SDK](../typescript-node/).

    --8<-- "includes/sdk-quickstart/quickstart-enforce-event-schema-intro.md"

    === "TypeScript"

        ```ts

        ampli.load();

        ampli.yourEventType('ampli-user-id', {
            stringProp: 'Strongly typed property',
            booleanProp: true,
        });
        ```

    === "JavaScript"

        ```ts

        ampli.load();

        ampli.yourEventType('ampli-user-id', {
            stringProp: 'Strongly typed property',
            booleanProp: true,
        });
        ```

    Learn more about [Node Ampli](../typescript-node/ampli/).

=== "Android"

    The Android SDK lets you send events to Amplitude. See the [Android SDK documentation](../android-kotlin/) for additional configurations and advanced topics.

    ???example "Get started fast with an example project (click to expand)"
    
        ???code-example "Kotlin Android example project (click to expand)"
            To get started fast, check out an [example Kotlin Android project](https://github.com/amplitude/Amplitude-Kotlin/tree/main/samples/kotlin-android-app):

            1. Clone the repo.
            2. Open it with Android Studio.
            3. Change your [API key](../../analytics/find-api-credentials.md) in `build.gradle` for `Module: samples: kotlin-android-app` under Gradle Scripts. 
            4. Sync the project with Gradle files. 
            4. Run `samples.kotlin-android-app`.
            5. Press the button to send events in the running application. 
            6. [Check for success](./#check-for-success_2).
        
        ???code-example "Java Android example project (click to expand)"
            To get started fast, check out an [example Java Android project](https://github.com/amplitude/Amplitude-Kotlin/tree/main/samples/java-android-app):

            1. Clone the repo.
            2. Open it with Android Studio.
            3. Change your [API key](../../analytics/find-api-credentials.md) in `build.gradle` for `Module: samples: java-android-app` under Gradle Scripts. 
            4. Sync the project with Gradle files. 
            4. Run `samples.java-android-app`.
            5. Press the button to send events in the running application. 
            6. [Check for success](./#check-for-success_2).

        ???code-example "Kotlin JVM example project (click to expand)"
            To get started fast, check out an [example Kotlin JVM project](https://github.com/amplitude/Amplitude-Kotlin/tree/main/samples/kotlin-jvm-app):

            1. Clone the repo.
            2. Open it with Android Studio.
            3. Change your [API key](../../analytics/find-api-credentials.md) in `samples/kotlin-jvm-app/main/java/main.kt` and run the file.
            4. [Check for success](./#check-for-success_2).

    !!!info "Quickstart table of contents"

        Skip to a section: 

        7. [Initialize the library](#initialize-the-library_2)
        8. [Send data](#send-data_2)
        9. [Check for success](#check-for-success_2)
        10. [Complete code example](#complete-code-example_2)
        11. [Enforce event schemas](#enforce-event-schemas-ampli_2)

    --8<-- "includes/sdk-quickstart/quickstart-initialize-library.md"

    ### Install the dependency

    Amplitude recommends using Android Studio as an IDE and Gradle to manage dependencies.

    === "Gradle"

        If you are using Gradle in your project, include the following dependencies in `build.gradle` file. And then sync project with Gradle files.
        
        ```bash

        dependencies {
            implementation 'com.amplitude:analytics-android:1.+'
        }
        ```
    === "Maven"
        If you are using Maven in your project, the jar is available on Maven Central using the following configuration in your pom.xml

        ```bash
        <dependency>
            <groupId>com.amplitude</groupId>
            <artifactId>analytics-android</artifactId>
            <version>[1.0,2.0)</version>
        </dependency>
        ```

    ### Add permissions 

    To report events to Amplitude, add the INTERNET permission to your `AndroidManifest.xml` file.
    ```
    <uses-permission android:name="android.permission.INTERNET" />
    ```

    For Android 6.0 (Marshmallow) and above, explicitly add the `READ_PHONE_STATE` permission to fetch phone carrier information. If you don't add this permission, the SDK still works, but doesn't track phone carrier information.
    ```
    <uses-permission android:name="android.permission.READ_PHONE_STATE" />
    ```

    The SDK internally uses a few Java 8 language APIs through desugaring. Make sure your project either [enables desugaring](https://developer.android.com/studio/write/java8-support#library-desugaring) or requires a minimum API level of 16.

    --8<-- "includes/sdk-quickstart/quickstart-initialization.md"

    Amplitude recommends doing the initialization in the Main Activity, which never gets destroyed, or the Application class if you have one. After it's initialized, you can use the Android SDK anywhere in your Android application.
    
    === "Kotlin"

        ```kotlin
        import com.amplitude.android.Amplitude

        val amplitude = Amplitude(
            Configuration(
                apiKey = AMPLITUDE_API_KEY,
                context = applicationContext
            )
        )
        ```
    === "Java"

        ```java
        import com.amplitude.android.Amplitude;

        Amplitude amplitude =  new Amplitude(new Configuration(
            apiKey = AMPLITUDE_API_KEY,
            context = applicationContext
        ));
        ```

    --8<-- "includes/sdk-quickstart/quickstart-eu-data-residency.md"

    === "Kotlin"

        ```kotlin
        import com.amplitude.android.Amplitude
        
        val amplitude = Amplitude(
            Configuration(
                apiKey = AMPLITUDE_API_KEY,
                context = applicationContext,
                serverZone = ServerZone.EU
            )
        )
        ```

    === "Java"

        ```java
        import com.amplitude.android.Amplitude;
        
        Amplitude amplitude =  new Amplitude(new Configuration(
            apiKey = AMPLITUDE_API_KEY,
            context = applicationContext,
            serverZone = ServerZone.EU
        ));
        ```

    --8<-- "includes/sdk-quickstart/quickstart-send-data.md"

    Events tracked are buffered locally and flushed every 30 seconds. After calling track() in your app, it may take several seconds for event data to appear in Amplitude.

    === "Kotlin"

        ```kotlin
        // Track a basic event
        amplitude.track("Button Clicked")
        // Track events with optional properties
        amplitude.track(
            "Button Clicked",
            mapOf("buttonColor" to "primary")
        )
        ```

    === "Java"

        ```java
        // Track a basic event
        amplitude.track("Button Clicked");
        // Track events with optional properties
        amplitude.track("Button Clicked", new HashMap() {{
            put("buttonColor", "primary");
        }});
        ```

    --8<-- "includes/sdk-quickstart/quickstart-check-for-success.md"

    --8<-- "includes/sdk-quickstart/quickstart-complete-code-example.md"

    === "Kotlin"

        ```kotlin 
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

    === "Java"

        ```java
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

                Identify identify = new Identify().set("user-platform", "android")
                amplitude.identify(identify);

                amplitude.track("test event properties", new HashMap() {{
                    put("test", "test event property value");
                }});
            }
        }

        ```

    Learn more available functionalities in [Android SDK](../android-kotlin/).

    --8<-- "includes/sdk-quickstart/quickstart-enforce-event-schema-intro.md"

    === "Kotlin"

        ```kotlin

        ampli.load()

        ampli.yourEventType(
            stringProp = "Strongly typed property",
            booleanProp = true
        )

        ```
    === "Java"

        ```java
        Ampli.getInstance().load();

        Ampli.getInstance().yourEventType(
            YourEventType.builder()
                .stringProp("Strongly typed property")
                .booleanProp(true)
                .build()
        );
        ```

    Learn more about [Ampli Android](../android-kotlin/ampli/).

=== "iOS"
    The iOS SDK lets you send events to Amplitude. See the [iOS SDK documentation](./ios/index.md) for additional configurations and advanced topics.

    !!!warning New Version Available
        This is the time tested iOS SDK, however here is a new version in beta that is highly recommended for all customers using Swift. The latest [iOS Swift SDK](./ios-swift/index.md) has additional features such as plugins and more. See the [Migration Guide](./ios-swift/migration.md) for more help.

        Please note that the latest iOS Swift SDK is **NOT** compatible with Objective-C projects. Use this SDK if your project requires compatibility with Objective-C.

    !!!info "Table of Contents"
        1. [Initialize the library](#initialize-the-library_3)
        2. [Send data](#send-data_3)
        3. [Check for success](#check-for-success_3)
        4. [Complete code example](#complete-code-example_3)
        5. [Enforce event schemas](#enforce-event-schemas-ampli_3)

    --8<-- "includes/sdk-quickstart/quickstart-initialize-library.md"

    ### Install the dependency

    Install the Amplitude Analytics iOS SDK via CocoaPods, Carthage, or Swift Package Manager.

    === "CocoaPods"

        Add the dependency to `Podfile`.

        ```bash
        pod 'Amplitude', '~> 8.17.1'
        ```
        Run `pod install` in the project directory to download the dependency.

    === "Swift Package Manager"

        1. Navigate to `File` > `Swift Package Manager` > `Add Package Dependency`.
        2. Enter `https://github.com/amplitude/Amplitude-iOS` into the search bar.
        3. It automatically resolves to the latest version.

        The Amplitude-iOS package appears as a dependency after it's added.

    === "Carthage"

        Add the following line to your `Cartfile`.
      
        ```bash
        github "amplitude/Amplitude-iOS" ~> 8.14
        ```

    --8<-- "includes/sdk-quickstart/quickstart-initialization.md"

    === "Objective-C"

        ```obj-c
        #import <Amplitude.h>

        [[Amplitude instance] initializeApiKey:@"YOUR_API_KEY"];
        ```

    === "Swift"

        ```swift
        import Amplitude

        Amplitude.instance().initializeApiKey("YOUR_API_KEY")
        ```

    --8<-- "includes/sdk-quickstart/quickstart-eu-data-residency.md"

    Beginning with version `8.5.0`, you can configure the server zone after initializing the client for sending data to Amplitude's EU servers. The SDK sends data based on the server zone if it's set. The server zone configuration supports dynamic configuration as well.

    For earlier versions, you need to configure the `serverURL` property after initializing the client.

    === "Objective-C"

        ```obj-c
        // For versions starting from 8.5.0
        // No need to call setServerUrl for sending data to Amplitude's EU servers

        [[Amplitude instance] setServerZone:AMPServerZone.EU];

        // For earlier versions
        [[Amplitude instance] setServerUrl: @"https://api.eu.amplitude.com"];

        ```

    === "Swift"

        ```swift
        // For versions starting from 8.5.0
        // No need to call setServerUrl for sending data to Amplitude's EU servers

        Amplitude.instance().setServerZone(AMPServerZone.EU)

        // For earlier versions

        Amplitude.instance().setServerUrl("https://api.eu.amplitude.com")

        ```

    --8<-- "includes/sdk-quickstart/quickstart-send-data.md"

    === "Objective-C"

        ```obj-c
        [[Amplitude instance] logEvent:@"Button Clicked"];
        ```
    
    === "Swift"

        ```swift
        Amplitude.instance().logEvent("Button Click")
        ```

    --8<-- "includes/sdk-quickstart/quickstart-check-for-success.md"

    --8<-- "includes/sdk-quickstart/quickstart-complete-code-example.md"

    === "Objective-C"

        ```obj-c
        #import <Amplitude.h>

        (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

            // Enable sending automatic session events
            [Amplitude instance].defaultTracking.sessions = YES;

            // Initialize SDK
            [[Amplitude instance] initializeApiKey:@"YOUR_API_KEY"];

            // Set userId
            [[Amplitude instance] setUserId:@"userId"];

            // Log an event
            [[Amplitude instance] logEvent:@"app_start"];
        }

        ```

    === "Swift"

        ```swift
        import Amplitude

        func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {

            // Enable sending automatic session events
            Amplitude.instance().defaultTracking.sessions = true
            // Initialize SDK
            Amplitude.instance().initializeApiKey("YOUR_API_KEY")
            // Set userId
            Amplitude.instance().setUserId("userId")
            // Log an event
            Amplitude.instance().logEvent("app_start")

            return true
        }
        ```

    Learn more available functionalities in [iOS SDK](./ios/index.md).

    --8<-- "includes/sdk-quickstart/quickstart-enforce-event-schema-intro.md"

    === "Objective-C"

        ```obj-c title

        Ampli *ampli = [Ampli instance];
        [ampli load];

        [ampli yourEventType:[YourEventType stringProp:@[@"Strongly typed property"]
                                            booleanProp:true]];

        ```

    === "Swift"

        ```swift

        ampli.load();

        ampli.yourEventType(
            stringProp: "Strongly typed property",
            booleanProp: true
        )

        ```

    Learn more about [Ampli iOS](./ios/ampli.md).

=== "iOS-Beta"

    The iOS SDK lets you send events to Amplitude. See the [iOS SDK (Beta) documentation](./ios-swift/index.md) for additional configurations and advanced topics.

    !!!beta "iOS Swift SDK (Beta)"
        This SDK is currently in beta version. It can only be used in Swift projects and is **NOT** compatible with Objective-C projects. If you require support for Objective-C or have any concern with the Beta version, check out the [non-Beta iOS SDK](./ios/index.md).

        To migrate to the latest version of Amplitude iOS SDK, see the [Migration Guide](./ios-swift/migration.md).

    !!!info "Table of Contents"
        1. [Initialize the library](#initialize-the-library_4)
        2. [Send data](#send-data_4)
        3. [Check for success](#check-for-success_4)
        4. [Complete code example](#complete-code-example_4)
        5. [Enforce event schemas](#enforce-event-schemas-ampli_4)

    --8<-- "includes/sdk-quickstart/quickstart-initialize-library.md"

    ### Install the dependency

    Install the Amplitude Analytics iOS SDK via CocoaPods, Carthage, or Swift Package Manager. 

    === "CocoaPods"

        1. Add dependency to `Podfile`. 
        ```bash
        pod 'AmplitudeSwift', '~> 0.3.0'
        ```
        2. Run `pod install` in the project directory to install the dependency. 

    === "Swift Package Manager"

        1. Navigate to `File` > `Swift Package Manager` > 'Add Package Dependency`. This opens a dialog that allows you to add a package dependency. 
        2. Enter the URL `https://github.com/amplitude/Amplitude-Swift` in the search bar. 
        3. Xcode will automatically resolve to the latest version. Or you can select a specific version. 
        4. Click the "Next" button to confirm the addition of the package as a dependency. 
        5. Build your project to make sure the package is properly integrated. 
        
    
    === "Carthage"

        Add the following line to your `Cartfile`.
        ```bash
        github "amplitude/Amplitude-Swift" ~> 0.3.0
        ```
        Check out the [Carthage docs](https://github.com/Carthage/Carthage#adding-frameworks-to-an-application) for more info. 

    --8<-- "includes/sdk-quickstart/quickstart-initialization.md"

    ```swift
    import Amplitude_Swift

    let amplitude = Amplitude(
        configuration: Configuration(
            apiKey: "YOUR-API-KEY"
        )
    )
    ```
    --8<-- "includes/sdk-quickstart/quickstart-eu-data-residency.md"

    ```swift
    import Amplitude_Swift

    let amplitude = Amplitude(
        Configuration(
            apiKey: "YOUR-API-KEY",
            serverZone: ServerZone.EU
        )
    )
    ```

    --8<-- "includes/sdk-quickstart/quickstart-send-data.md"

    ```swift
    amplitude.track(
        eventType: "Button Clicked",
        eventProperties: ["my event prop key": "my event prop value"]
    )
    ```

    --8<-- "includes/sdk-quickstart/quickstart-check-for-success.md"

    --8<-- "includes/sdk-quickstart/quickstart-complete-code-example.md"

    ```swift
    import Amplitude_Swift

    let amplitude = Amplitude(
        configuration: Configuration(
            apiKey: "YOUR-API-KEY"
        )
    )

    amplitude.track(
        eventType: "Button Clicked",
        eventProperties: ["my event prop key": "my event prop value"]
    )
    ```

    Learn more available functionalities in [iOS SDK](./ios-swift/index.md).

    --8<-- "includes/sdk-quickstart/quickstart-enforce-event-schema-intro.md"

    --8<-- "includes/no-ampli.md"
        To use Ampli see the [non-Beta SDK](./ios/index.md) and [Ampli Wrapper](./ios/ampli.md) instead.

    Coming soon.

=== "JRE"

    This is the documentation for the **Amplitude Analytics Java SDK**. This is not the Android SDK. See the [Java SDK documentation](../java/) for additional configurations and advanced topics.

    !!!info "Table of Contents"
        1. [Initialize the library](#initialize-the-library_5)
        2. [Send data](#send-data_5)
        3. [Check for success](#check-for-success_5)
        4. [Complete code example](#complete-code-example_5)
        5. [Enforce event schemas](#enforce-event-schemas-ampli_5)

    --8<-- "includes/sdk-quickstart/quickstart-initialize-library.md"

    ### Install the dependency

    === "Gradle"
        If you are using Gradle in your project, include the following dependencies in `build.gradle` file. And then sync project with Gradle files. 
        ```bash

        dependencies {
            implementation 'org.json:json:20201115'
            implementation 'com.amplitude:java-sdk:1.+'
        }
        ```

    === "Download"

        Download [the latest JAR file](https://github.com/amplitude/Amplitude-Java/releases) and add it to the project's buildpath. See instructions for your IDE.

    --8<-- "includes/sdk-quickstart/quickstart-initialization.md"

    Import Amplitude into any file that uses it. Amplitude uses the open source `JSONObject` library to conveniently create JSON key-value objects.

    === "Java"

        ```java
        import com.amplitude.Amplitude;
        import org.json.JSONObject;

        Amplitude amplitude = Amplitude.getInstance();
        amplitude.init(AMPLITUDE_API_KEY);
        ```

    === "Kotlin"

        ```kotlin
        import com.amplitude.Amplitude
        import org.json.JSONObject

        val amplitude = Amplitude.getInstance()
        amplitude.init(AMPLITUDE_API_KEY)
        ```
    
    --8<-- "includes/sdk-quickstart/quickstart-eu-data-residency.md"

    === "Java"

        ```java
        import com.amplitude.Amplitude;
        import org.json.JSONObject;

        Amplitude amplitude = Amplitude.getInstance();
        amplitude.init(AMPLITUDE_API_KEY);
        amplitude.setServerUrl("https://api.eu.amplitude.com/2/httpapi");
        ```

    === "Kotlin"

        ```kotlin
        import com.amplitude.Amplitude
        import org.json.JSONObject

        val amplitude = Amplitude.getInstance()
        amplitude.init(AMPLITUDE_API_KEY)
        amplitude.setServerUrl("https://api.eu.amplitude.com/2/httpapi");
        ```

    --8<-- "includes/sdk-quickstart/quickstart-send-data.md"

    === "Java"

        ```java
        amplitude.logEvent(new Event("Button Clicked", "test_user_id"));
        ```

    === "Kotlin"

        ```kotlin
        amplitude.logEvent(Event("Button Clicked", "test_user_id"))
        ```

    --8<-- "includes/sdk-quickstart/quickstart-check-for-success.md"

    --8<-- "includes/sdk-quickstart/quickstart-complete-code-example.md"

    === "Java"

        ```java
        import com.amplitude.Amplitude;
        import org.json.JSONObject;

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
        ```

    === "Kotlin"

        ```kotlin
        import com.amplitude.Amplitude
        import org.json.JSONObject

        val amplitude = Amplitude.getInstance()
        amplitude.init(AMPLITUDE_API_KEY)

        val eventProps= JSONObject()
        eventProps.put("Hover Time", 10).put("prop_2", "value_2")

        val event = Event("Button Clicked", "test_user_id")
        event.eventProperties = eventProps

        amplitude.logEvent(event)
        ```

    Learn more in [Java SDK](../java/).

    --8<-- "includes/sdk-quickstart/quickstart-enforce-event-schema-intro.md"

    === "Java"
        ```java
        Ampli.getInstance().load();

        Ampli.getInstance().yourEventType("ampli-user-id",
            YourEventType.builder("Strongly typed property")
                .stringProp()
                .booleanProp(false)
                .build()
        );

        ```

    === "Kotlin"

        ```kotlin
        Ampli.getInstance().load()

        Ampli.getInstance().yourEventType("ampli-user-id",
            YourEventType(
                stringProp = "Strongly typed property",
                booleanProp = false
            )
        )

        ```

    Learn more about [Ampli Java](../java/ampli/).

=== "Python"

    The Python SDK lets you send events to Amplitude. See the [Python SDK documentation](./python/index.md) for additional configurations and advanced topics.

    !!!info "Table of Contents"
        1. [Initialize the library](#initialize-the-library_6)
        2. [Send data](#send-data_6)
        3. [Check for success](#check-for-success_6)
        4. [Complete code example](#complete-code-example_6)
        5. [Enforce event schemas](#enforce-event-schemas-ampli_6)

    --8<-- "includes/sdk-quickstart/quickstart-initialize-library.md"

    ### Install the dependency

    Install `amplitude-analytics` using pip:

    ```bash
    pip install amplitude-analytics
    ```

    --8<-- "includes/sdk-quickstart/quickstart-initialization.md"

    === "Python"

        ```python
        from amplitude import Amplitude

        amplitude = Amplitude(AMPLITUDE_API_KEY)
        ```
    
    --8<-- "includes/sdk-quickstart/quickstart-eu-data-residency.md"

    === "Python"

        ```python
        from amplitude import Amplitude

        amplitude = Amplitude(AMPLITUDE_API_KEY)
        amplitude.configuration.server_zone = 'EU'
        ```

    --8<-- "includes/sdk-quickstart/quickstart-send-data.md"

    === "Python"

        ```python
        from amplitude import BaseEvent

        amplitude.track(
            BaseEvent(
                event_type="type of event",
                user_id="USER_ID",
                device_id="DEVICE_ID",
                event_properties={
                    "source": "notification"
                }
            )
        )
        ```

    --8<-- "includes/sdk-quickstart/quickstart-check-for-success.md"

    --8<-- "includes/sdk-quickstart/quickstart-complete-code-example.md"

    === "Python"

        ```python

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
            )
        )

        # Flush the event buffer
        amplitude.flush()

        # Shutdown the client, recommend to call before program exit 
        amplitude.shutdown()
        ```

    Learn more available functionalities in [Python SDK](../python/).

    --8<-- "includes/sdk-quickstart/quickstart-enforce-event-schema-intro.md"

    === "Python"

        ```python

        ampli.load()

        ampli.yourEventType(
            "user_id",
            YourEventType(
                stringProp= "Strongly typed property",
                booleanProp=True
            )
        )

        ```
    Learn more about [Ampli Python](../python/ampli/).

=== "React Native"

    The React Native SDK lets you send events to Amplitude. See the [React Native SDK documentation](../typescript-react-native/) for additional configurations and advanced topics.

    !!!info "Table of Contents"
        1. [Initialize the library](#initialize-the-library_7)
        2. [Send data](#send-data_7)
        3. [Check for success](#check-for-success_7)
        4. [Complete code example](#complete-code-example_7)
        5. [Enforce event schemas](#enforce-event-schemas-ampli_7)

    --8<-- "includes/sdk-quickstart/quickstart-initialize-library.md"

    ### Install the dependency

    === "NPM"

        ```bash

        npm install @amplitude/analytics-react-native
        npm install @react-native-async-storage/async-storage
        ```

    === "YARN"

        ```bash
        yarn add @amplitude/analytics-react-native
        yarn add @react-native-async-storage/async-storage
        ```

    === "EXPO"

        ```bash
        expo install @amplitude/analytics-react-native
        expo install @react-native-async-storage/async-storage
        ```

    Install the native modules to run the SDK on iOS.

    ```bash
    cd ios
    pod install
    ```

    --8<-- "includes/sdk-quickstart/quickstart-initialization.md"

    === "TypeScript"

        ```ts
        import { init } from '@amplitude/analytics-react-native';

        init(AMPLITUDE_API_KEY, 'user@amplitude.com');
        ```

    === "JavaScript"

        ```js
        import { init } from '@amplitude/analytics-react-native';

        init(AMPLITUDE_API_KEY, 'user@amplitude.com');
        ```

    --8<-- "includes/sdk-quickstart/quickstart-send-data.md"

    === "TypeScript"

        ```ts

        import { track } from '@amplitude/analytics-react-native';

        const eventProperties = {
            buttonColor: 'primary',
        };
        track('Button Clicked', eventProperties);
        ```

    === "JavaScript"

        ```js

        import { track } from '@amplitude/analytics-react-native';

        const eventProperties = {
            buttonColor: 'primary',
        };
        track('Button Clicked', eventProperties);
        ```

    --8<-- "includes/sdk-quickstart/quickstart-check-for-success.md"

    --8<-- "includes/sdk-quickstart/quickstart-complete-code-example.md"

    === "TypeScript"
        ```ts

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

    === "JavaScript"
        ```js

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

    Learn more available functionalities in [React Native SDK](../typescript-react-native/).

    --8<-- "includes/sdk-quickstart/quickstart-enforce-event-schema-intro.md"

    === "TypeScript"

        ```ts

        ampli.load();

        ampli.yourEventType({
            stringProp: 'Strongly typed property',
        });

        ```

    === "JavaScript"

        ```js

        ampli.load();

        ampli.yourEventType({
            stringProp: 'Strongly typed property',
        });

        ```

    Learn more about [Ampli React Native](../typescript-react-native/ampli/).

=== "Flutter"

    The Flutter SDK lets you send events to Amplitude. See the [Flutter SDK documentation](../flutter/) for additional configurations and advanced topics.

    !!!info "Table of Contents"
        1. [Initialize the library](#initialize-the-library_8)
        2. [Send data](#send-data_8)
        3. [Check for success](#check-for-success_8)
        4. [Complete code example](#complete-code-example_8)
        5. [Enforce event schemas](#enforce-event-schemas-ampli_8)

    --8<-- "includes/sdk-quickstart/quickstart-initialize-library.md"


    ### Install the dependency

    === "YAML"

        ```bash

        dependencies:
            amplitude_flutter: ^3.13.0
        ```

    iOS installation also need to add `platform :ios, '10.0'` to your Podfile.

    Learn more about [adding the dependency](../flutter/#add-dependencies).

    --8<-- "includes/sdk-quickstart/quickstart-initialization.md"

    === "Dart"

        ```dart
        import 'package:amplitude_flutter/amplitude.dart';

        final Amplitude amplitude = Amplitude.getInstance();
        amplitude.init(AMPLITUDE_API_KEY);
        ```

    --8<-- "includes/sdk-quickstart/quickstart-send-data.md"

    === "Dart"

        ```dart

        amplitude.logEvent('BUTTON_CLICKED', {"Hover Time": "100ms"});
        ```

    --8<-- "includes/sdk-quickstart/quickstart-check-for-success.md"

    --8<-- "includes/sdk-quickstart/quickstart-complete-code-example.md"

    === "Dart"

      ```dart

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

      Learn more in [Flutter SDK](../flutter/).

    --8<-- "includes/sdk-quickstart/quickstart-enforce-event-schema-intro.md"

    More information TBD.

=== "Go"

    The Go SDK lets you send events to Amplitude. See the [Go SDK documentation](../go/) for additional configurations and advanced topics.

    !!!info "Table of Contents"
        1. [Initialize the library](#initialize-the-library_9)
        2. [Send data](#send-data_9)
        3. [Check for success](#check-for-success_9)
        4. [Complete code example](#complete-code-example_9)
        5. [Enforce event schemas](#enforce-event-schemas-ampli_9)

    --8<-- "includes/sdk-quickstart/quickstart-initialize-library.md"

    ### Install the dependency

    === "Command Go"

        ```bash
        go get github.com/amplitude/analytics-go
        ```

    --8<-- "includes/sdk-quickstart/quickstart-initialization.md"

    === "Go"

        ```go
        import (
            "github.com/amplitude/analytics-go/amplitude"
        )

        config := amplitude.NewConfig(AMPLITUDE_API_KEY)

        client := amplitude.NewClient(config)
        ```

    --8<-- "includes/sdk-quickstart/quickstart-send-data.md"

    === "Go"

        ```

        client.Track(amplitude.Event{
              EventType: "Button Clicked",
              EventOptions: amplitude.EventOptions{
              UserID:   "user-id",
              DeviceID: "device-id",
            },
            EventProperties: map[string]interface{}{"source": "notification"},
        })

        ```

    --8<-- "includes/sdk-quickstart/quickstart-check-for-success.md"

    --8<-- "includes/sdk-quickstart/quickstart-complete-code-example.md"

    === "Go"

        ```go

        package main

        import (
            "github.com/amplitude/analytics-go/amplitude"
        )

        func main() {
            config := amplitude.NewConfig(AMPLITUDE_API_KEY)
            client := amplitude.NewClient(config)

            identifyObj := amplitude.Identify{}
            identifyObj.Set("location", "LAX")
            client.Identify(identifyObj, amplitude.EventOptions{UserID: "user-id"})

            client.Track(amplitude.Event{
                EventType: "Button Clicked",
                EventOptions: amplitude.EventOptions{
                    UserID:   "user-id",
                    DeviceID: "device-id",
                },
                EventProperties: map[string]interface{}{"source": "notification"},
            })
        }

        ```

        Learn more available functionalities in [Go SDK](../go/).

    --8<-- "includes/sdk-quickstart/quickstart-enforce-event-schema-intro.md"

    Coming soon.

=== "Unity"

    The Amplitude Analytics Unity SDK is a plugin to simplify the integration of Amplitude iOS and Android SDKs into your Unity project. This SDK works with Unity 2019.3.11 and higher. See the [Unity SDK documentation](../unity/) for additional configurations and advanced topics.

    !!!info "Table of Contents"
        1. [Initialize the library](#initialize-the-library_10)
        2. [Send data](#send-data_10)
        3. [Check for success](#check-for-success_10)
        4. [Complete code example](#complete-code-example_10)
        5. [Enforce event schemas](#enforce-event-schemas-ampli_10)

    --8<-- "includes/sdk-quickstart/quickstart-initialize-library.md"

    ### Install the dependency

    === "Unity Package Manager"

        ```bash

        Add 'https://github.com/amplitude/unity-plugin.git?path=/Assets'.
        ```
        Learn more about [Unity package manager initialization](../unity/#option-1-unity-package-manager)

    === "Manual download"

        ```bash

        Download amplitude-unity.unitypackage
        ```

        Learn more about the [Unity package download](../unity/#option-2-manual-download-and-add-dependency).

    --8<-- "includes/sdk-quickstart/quickstart-initialization.md"

    === "C#"

        ```
        Amplitude amplitude = Amplitude.getInstance()
        amplitude.init("YOUR_API_KEY");

        ```

    --8<-- "includes/sdk-quickstart/quickstart-send-data.md"

    === "C#"

        ```c#
        import 'package:amplitude_flutter/amplitude.dart';

        amplitude.logEvent('MyApp startup', eventProperties: {
          'friend_num': 10,
          'is_heavy_user': true
        });

        ```

    --8<-- "includes/sdk-quickstart/quickstart-check-for-success.md"

    --8<-- "includes/sdk-quickstart/quickstart-complete-code-example.md"

    === "C#"

        ```c#
        Amplitude amplitude = Amplitude.getInstance();
        amplitude.init("AMPLITUDE_API_KEY");

        amplitude.addUserProperty("oranges", 5);
        Dictionary<string, object> values = new Dictionary<string, object>();
        values.Add("Key A", "Value A");
        amplitude.addUserPropertyDict("user_facts", values);

        JSONObjecteventProperties=newJSONObject().put("key", "value");
        Amplitude.getInstance().logEvent("initialize_game", eventProperties);

        ```

    Learn more in [Unity SDK](../unity/).

    --8<-- "includes/sdk-quickstart/quickstart-enforce-event-schema-intro.md"

    More information TBD.

=== "Unreal"

    The Amplitude Analytics Unreal Engine SDK supports projects targeting iOS, MacOS, or tvOS. See the [Unreal Engine SDK documentation](../unreal/) for additional configurations and advanced topics.

    !!!info "Table of Contents"
        1. [Initialize the library](#initialize-the-library_11)
        2. [Send data](#send-data_11)
        3. [Check for success](#check-for-success_11)
        4. [Complete code example](#complete-code-example_11)
        5. [Enforce event schemas](#enforce-event-schemas-ampli_11)

    --8<-- "includes/sdk-quickstart/quickstart-initialize-library.md"

    ### Install the dependency

    #### Download SDK and add to project

    1. Download `AmplitudeUnreal.zip.`
    2. Unzip it into a folder inside your Unreal project's Plugins directory.
   
    Download the latest [AmplitudeUnreal.zip](https://github.com/amplitude/Amplitude-Unreal/releases/tag/v0.1.0).

    --8<-- "includes/sdk-quickstart/quickstart-initialization.md"

    #### Enable the SDK plugin

    Settings > Plugins > Project > Analytics
    
    Learn more about [how to enable SDK plugin](../unreal/#enable-the-sdk-plugin-in-the-editor).

    #### Set Amplitude as your analytics provider

    Settings -> Project Settings -> Analytics -> Providers

    Learn more about [how to set analytics provider](../unreal/#set-amplitude-as-your-analytics-provider).

    #### Add your API keys

    Settings -> Project Settings -> Analytics -> Amplitude

    Learn more about [how to set API keys](../unreal/#add-your-api-keys).

    === "C++"

        ```c++
        #include "Runtime/Analytics/Analytics/Public/Analytics.h"
        #include "Runtime/Analytics/Analytics/Public/Interfaces/IAnalyticsProvider.h"
        ```

    --8<-- "includes/sdk-quickstart/quickstart-send-data.md"

    === "C++"

        ```c++

        TArray<FAnalyticsEventAttribute> AppendedAttributes;
        AppendedAttributes.Emplace(TEXT("Test Event Prop key1"), TEXT("Test Event value1"));
        AppendedAttributes.Emplace(TEXT("Test Event Prop key2"), TEXT("Test Event value2"));
        FAnalytics::Get().GetDefaultConfiguredProvider()->RecordEvent(TEXT("Game Started"), AppendedAttributes);
        ```

    --8<-- "includes/sdk-quickstart/quickstart-check-for-success.md"

    --8<-- "includes/sdk-quickstart/quickstart-complete-code-example.md"

    === "C++"

        ```c++

        FAnalytics::Get().GetDefaultConfiguredProvider()->SetLocation(TEXT("Test location"));
        FAnalytics::Get().GetDefaultConfiguredProvider()->SetGender(TEXT("Test gender"));
        FAnalytics::Get().GetDefaultConfiguredProvider()->SetAge(TEXT(27));

        TArray<FAnalyticsEventAttribute> AppendedAttributes;
        AppendedAttributes.Emplace(TEXT("Test Event Prop key1"), TEXT("Test Event value1"));
        AppendedAttributes.Emplace(TEXT("Test Event Prop key2"), TEXT("Test Event value2"));
        FAnalytics::Get().GetDefaultConfiguredProvider()->RecordEvent(TEXT("Game Started"), AppendedAttributes);
        ```

    Learn more in [Unreal SDK](../unreal/).

    --8<-- "includes/sdk-quickstart/quickstart-enforce-event-schema-intro.md"

    More information TBD.
