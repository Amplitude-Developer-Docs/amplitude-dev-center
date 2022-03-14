---
title: "Android SDK"
icon: material/android
description: This is the official documentation for the Amplitude Android SDK. 
---

[![Maven Central](https://img.shields.io/maven-central/v/com.amplitude/android-sdk.svg?label=Maven%20Central)](https://search.maven.org/search?q=g:%22com.amplitude%22%20AND%20a:%22android-sdk%22)

This is the official documentation for the Amplitude Android SDK.

???info "SDK Resources"
    - [Android SDK Reference :material-book:](http://amplitude.github.io/Amplitude-Android/)
    - [Android SDK Repository :material-github:](https://github.com/amplitude/Amplitude-Android)
    - [Android SDK Releases :material-code-tags-check:](https://github.com/amplitude/Amplitude-Android/releases)

--8<-- "includes/ampli-vs-amplitude.md"

## SDK installation

### Add dependencies

!!!note

    We recommend using Android Studio as an IDE and Gradle to manage dependencies.

1. In the `build.gradle` file, add these dependencies. OkHttp is needed for our SDK.

    ```bash
    dependencies {
      implementation 'com.amplitude:android-sdk:2.36.1'
      implementation 'com.squareup.okhttp3:okhttp:4.2.2'
    }
    ```

2. Sync project with Gradle files.

### Add permissions

To report events to Amplitude, add the INTERNET permission to your `AndroidManifest.xml` file.

`<uses-permission android:name="android.permission.INTERNET" />`

For Android 6.0 (Marshmallow) and above, explicitly add the `READ_PHONE_STATE` permission to fetch phone related information.

`<uses-permission android:name="android.permission.READ_PHONE_STATE" />`

## Importing

Import Amplitude into any file that uses it.

=== "Java"

    ```java
    import com.amplitude.api.Amplitude;
    import com.amplitude.api.AmplitudeClient;
    /*
    Import any more files that are needed, use the SDK reference
    http://amplitude.github.io/Amplitude-Android/
    */

    ```

## Initialization

Before you can instrument, you must initialize the SDK using the API key for your Amplitude project. We recommend adding this in `onCreate(...)` of your Activity class.

The Android SDK can be used anywhere after it's initialized anywhere in an Android application.

For accurate session tracking, `enableForegroundTracking(getApplication())` is required. It's disabled by default.

=== "Java"

    ```java
    AmplitudeClient client = Amplitude.getInstance()
      .initialize(getApplicationContext(), "YOUR_API_KEY_HERE")
      .enableForegroundTracking(getApplication());
    ```

=== "Kotlin"
    ```kotlin
    val client = Amplitude.getInstance()
      .initialize(getApplicationContext(), "YOUR_API_KEY_HERE")
      .enableForegroundTracking(application)
    ```

`Amplitude.getInstance(String name)` can take a name that holds settings. This instance is now linked to the name and can be retrieved somewhere else.

=== "Java"

    ```java
    AmplitudeClient client1 = Amplitude.getInstance("Andy_Client");
    AmplitudeClient client2 = Amplitude.getInstance("Bob_Client");

    //In the same file, or a different activity in the app
    AmplitudeClient sameClient = Amplitude.getInstance("Andy_Client");
    ```
=== "Kotlin"

    ```kotlin
    val client1 = Amplitude.getInstance("Andy_Client")
    val client2 = Amplitude.getInstance("Bob_Client")

    //In the same file, or a different activity in the app
    val sameClient = Amplitude.getInstance("Andy_Client")
    ```

## EU Data Residency

Beginning with version 2.34.0, you can configure the server zone after initializing the client for sending data to Amplitude's EU servers. The SDK sends data based on the server zone if it's set.
 The server zone config supports dynamic configuration as well.

For previous versions, you need to configure the `serverURL` property after initializing the client.

!!!note
    For EU data residency, the project must be set up inside Amplitude EU. You must initialize the SDK with the API key from Amplitude EU.

=== "Java"

    ```java 
    // For versions starting from 2.34.0
    // No need to call setServerUrl for sending data to Amplitude's EU servers
    client.setServerZone(AmplitudeServerZone.EU);

    // For earlier versions
    client.setServerUrl("https://api.eu.amplitude.com");
    ```
=== "Kotlin"

    ```kotlin
    // For versions starting from 2.34.0
    // No need to call setServerUrl for sending data to Amplitude's EU servers
    client.setServerZone(AmplitudeServerZone.EU)

    // For earlier versions
    client.setServerUrl("https://api.eu.amplitude.com")
    ```

## Sending Events

### Basic Events

Events represent how users interact with your application. For example, the event "button click" may be an action you want to track.

=== "Java"

    ```java
    client.logEvent("Button Clicked");

    ```

### Events with Properties

Events can contain properties. Properties provide context about the event taken. For example, "hover time" may be a relevant event property to "button click."

=== "Java"

    ```java 
    JSONObject eventProperties = new JSONObject();
    try {
      eventProperties.put("Hover Time", 10).put("prop_2", "value_2");
    } catch (JSONException e) {
      System.err.println("Invalid JSON");
      e.printStackTrace();
    }
    client.logEvent("Button Clicked", eventProperties);
    // Note: You will also need to add two JSONObject imports to the code.
    // import org.json.JSONException;
    // import org.json.JSONObject;

    ```
=== "Kotlin"

    ```
    val eventProperties = JSONObject() 
    try {
      eventProperties.put("Hover Time", 10).put("prop_2", "value_2")
    } catch (e: JSONException) {
      System.err.println("Invalid JSON")
      e.printStackTrace()
    }
    client.logEvent("Button Clicked", eventProperties)
    ```

### Flush Events

Events are typically stored in a buffer and flushed periodically. This behavior is configurable. On Android, this is enabled by default.

=== "Java"

    ```java 
    client.setFlushEventsOnClose(false); //Don't flush events

    ```

To force the SDK to upload unsent events, the use the method `uploadEvents`.

## Set User Properties

!!!warning "Privacy and Tracking"
    Don't track any user data that is against your privacy terms. If you need help with privacy concerns, contact the Support team.

## Identify

Identify is for setting the user properties of a particular user without sending any event.
 The SDK supports the operations `set`, `setOnce`, `unset`, `add`, `append`, `prepend`, `preInsert`, `postInsert`, and `remove` on individual user properties.
 The operations are declared via a provided Identify interface. You can chain together multiple operations in a single Identify object.
  The Identify object is passed to the Amplitude client to send to the server.

!!!note
    If the Identify call is sent after the event, the results of operations is visible immediately in the dashboard user's profile area, but it doesn't appear in chart result until another event is sent after the Identify call. The identify call only affects events going forward.
     [Learn more in the Help Center](https://help.amplitude.com/hc/en-us/articles/115002380567-User-Properties-Event-Properties#applying-user-properties-to-events).

### Managing User Identity

You can handle the identity of a user using the identify methods. Proper use of these methods can connect events to the correct user as they move across devices, browsers, and other platforms.
 Send an identify call containing those user property operations (please check the Identify section below) to Amplitude server to tie a user's events with specific user properties.

=== "Java"

    ```java 
    Identify identify = new Identify();
    identify.set("color", "green");
    client.identify(identify);

    ```
=== "Kotlin"

    ```kotlin
    val identify = Identify()
    identify["color"] = "green"
    client.identify(identify)
    ```

#### set

[](https://developers.amplitude.com/docs/android#set)

`set` sets the value of a user property. You can also chain together multiple identify calls.

=== "Java"

    ```java
    Identify identify = new Identify().set("color", "green");

    ```

=== "Kotlin"

    ```kotlin
    val identify = Identify().set("color", "green")
    ```

#### setOnce

`setOnce` sets the value of a user property one time. Later calls using `setOnce` are ignored.

=== "Java"

    ```java 
    Identify identify = new Identify().setOnce("color", "green");

    ```
=== "Kotlin"

    ```kotlin
    val identify = Identify().setOnce("color", "green")
    ```

#### add

`add` increments a user property by some numerical value. If the user property doesn't have a value set yet, it's initialized to 0 before being incremented.

=== "Java"

    ```java
    Identify identify = new Identify().set("number_of_clients", 10);
    //...
    identify.add("number_of_clients", 5); //15
    identify.add("annual_revenue", 100);  //100

    ```
=== "Kotlin"

    ```kotlin
    val identify = Identify().set("number_of_clients", 10)
    identify.add("number_of_clients", 5) //15
    identify.add("annual_revenue", 100) //100
    ```

### Setting Multiple User Properties

`logEvent()` method allows you to set the user properties along with event logging. You can use `setUserProperties` as a shorthand to set multiple user properties at one time.
 This method is a wrapper around `Identify.set`.

=== "Java"

    ```java
    JSONObject userProperties = new JSONObject();
    try {
      userProperties.put("team", "red").put("favorite_food", "cabbage");
    } catch (JSONException e) {
      e.printStackTrace();
      System.err.println("Invalid JSON");
    }
    client.setUserProperties(userProperties);
    client.logEvent("event name");

    ```
=== "Kotlin"

    ```kotlin
    val userProperties = JSONObject()
    try {
      userProperties.put("team", "red").put("favorite_food", "cabbage")
    } catch (e: JSONException) {
      e.printStackTrace()
      System.err.println("Invalid JSON")
    }
    client.setUserProperties(userProperties)
    client.logEvent("event name")
    ```

### Arrays in User Properties

Arrays can be used as user properties. You can directly set arrays or use `append` (see section below this one) to generate an array.

=== "Java"

    ```java 
    JSONArray value1 = new JSONArray();
    value1.put(1);
    value1.put(2);
    value1.put(3);

    Identify identify = new Identify();
    identify.set("array value", value1);
    ```

=== "Kotlin"

    ```kotlin
    val value1 = JSONArray()
    value1.put(1)
    value1.put(2)
    value1.put(3)

    val identify = Identify()
    identify["array value"] = value1
    ```

#### prepend/append

- `append` appends a value or values to a user property array.
- `prepend` prepends a value or values to a user property.
  
If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are added.
 If the user property has an existing value and it's not a list, it's converted into a list with the new value added.

!!!note

    `prepend` and `append` don't check for duplicates. Use `preInsert` and `postInsert` instead.

=== "Java"

    ```java
    String property1 = "array value";
    JSONArray value1 = new JSONArray();
    value1.put(1);
    value1.put(2);
    value1.put(3);
    Identify identify = new Identify();
    identify.append(property1, value1);
    identify.prepend("float value", 0.625f);
    ```
=== "Kotlin"

    ```kotlin
    val property1 = "array value"
    val value1 = JSONArray()
    value1.put(1)
    value1.put(2)
    value1.put(3)
    val identify = Identify()
    identify.append(property1, value1)
    identify.prepend("float value", 0.625f)
    ```

#### preInsert/postInsert

- `preInsert` inserts a value or values to the front of a user property array if it doesn't exist in the array yet.
- `postInsert` inserts a value or values to the end of a user property array if it doesn't exist in the array yet.

If the user property doesn't exist, it's initialized to an empty list before the new values are pre-inserted. If the user property has an existing value, the operation won't execute.

=== "Java"

    ```java
    String property1 = "array value";
    double[] values = {1, 2, 4, 8};
    Identify identify = new Identify();
    identify.postInsert(property1, values);

    // identify should ignore this since duplicate key
    identify.postInsert(property1, 3.0);
    ```
=== "Kotlin"

    ```kotlin
    val property1 = "array value"
    val values = doubleArrayOf(1.0, 2.0, 4.0, 8.0)
    val identify = Identify()
    identify.postInsert(property1, values)
    identify.postInsert(property1, 3.0)
    ```

#### Clearing User Properties

`clearUserProperties` method is for clearing all user properties at one time. This wipes all the current user's user properties.

!!!warning "This action is permanent"
    Because this action clears all user properties, Amplitude can't sync the user's user property values from before the wipe to any of the user's future events.

=== "Java"

    ```java
    client.clearUserProperties();
    ```

#### unset

`unset` unsets and removes a user property.

=== "Java"

    ```java
    Identify identify = new Identify().setOnce("favorite_food", "candy");
    identify.unset("favorite_food");
    ```
=== "Kotlin"

    ```kotlin
    val identify = Identify().setOnce("favorite_food", "candy")
    identify.unset("favorite_food")
    ```

## Setting User Groups

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

--8<-- "includes/groups-intro-paragraph.md"

!!! example

    If Joe is in 'orgId' '10' and '16', then the `groupName` would be '[10, 16]'). Here is what your code might look like:

    ```java
    Amplitude.getInstance().setGroup("orgID", new JSONArray().put("10").put("16"));  // list values
    ```

You can also use `logEventWithGroups` to set event-level groups, meaning the group designation only applies for the specific event being logged
 and doesn't persist on the user unless you explicitly set it with `setGroup`:

=== "Java"

    ```java
    JSONObject eventProperties = new JSONObject().put("key", "value");
    JSONObject groups = new JSONObject().put("orgId", 10);

    Amplitude.getInstance().logEvent("initialize_game", eventProperties, groups);
    ```

## Group Identify

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

--8<-- "includes/group-identify-considerations.md"

=== "Java"

    ```java
    String groupType = "plan";
    Object groupName = "enterprise";

    Identify identify = new Identify().set("key", "value");
    Amplitude.getInstance().groupIdentify(groupType, groupName, identify);
    ```

An optional `outOfSession` boolean input can be supplied as fourth argument to `groupIdentify`

## Track Revenue

Amplitude can track revenue generated by a user. Revenue is tracked through distinct revenue objects, which have special fields that are used in Amplitude's Event Segmentation and Revenue LTV charts.
 This lets Amplitude to automatically display data relevant to revenue in the platform.

=== "Java"

    ```java
    Revenue revenue = new Revenue().setProductId("com.company.productId").setPrice(3.99).setQuantity(3);
    client.logRevenueV2(revenue);
    ```

=== "Kotlin"

    ```kotlin
    val revenue = Revenue().setProductId("com.company.productId").setPrice(3.99).setQuantity(3)
    client.logRevenueV2(revenue)
    ```

  Revenue objects support the following special properties, as well as user-defined properties through the `eventProperties` field.

--8<-- "includes/track-revenue-properties-table.md"

!!!note "Notes about tracking revenue"

    - Price can be negative, which may be useful for tracking revenue lost (such as refunds or costs)
    - Amplitude currently does not support currency conversion. All revenue data should be normalized to a currency of choice before being sent to Amplitude.
    - The logRevenue() API is deprecated, and the logRevenueV2() API should be used going forward.

## Revenue Verification

The `logRevenue` method also supports revenue validation.

By default, revenue events recorded on the Android SDK appear in Amplitude as [Amplitude] Revenue (Unverified) events. To enable revenue verification,
 copy your Google Play License Public Key into the Sources & Destinations section of your project in Amplitude.
 You must put in a key for every single project in Amplitude where you want revenue to be verified.

There are two main Android libraries for revenue verificaitons: AIDL and Google Play Billing. AIDL is older and deprecated. See [this Google guide](https://developer.android.com/google/play/billing/migrate) on how to migrate,
 as well as the class specification for the [Purchase class](https://developer.android.com/reference/com/android/billingclient/api/Purchase).

After a successful purchase transaction, add the purchase data and receipt signature to the Revenue object:

=== "Java: AIDL"

    ```java
    // For AIDL (old deprecated library)

    Intent data = ...;

    String purchaseData = data.getStringExtra("PURCHASE_DATA");
    String dataSignature = data.getStringExtra("DATA_SIGNATURE");

    Revenue revenue = new Revenue().setProductId("com.company.productId").setQuantity(1);
    revenue.setPrice(3.99).setReceipt(purchaseData, dataSignature);

    client.logRevenueV2(revenue);
    ```
=== "Java: Google Play Billing Library"

    ```java
    //For Google Play Billing Library
    public class MyBillingImpl implements PurchasesUpdatedListener {
        private BillingClient billingClient;
        //...

        public void initialize() {
            billingClient = BillingClient.newBuilder(activity).setListener(this).build();
            billingClient.startConnection(new BillingClientStateListener() {
                @Override
                public void onBillingSetupFinished(BillingResult billingResult) {
                    // Logic from ServiceConnection.onServiceConnected should be moved here.
                }

                @Override
                public void onBillingServiceDisconnected() {
                    // Logic from ServiceConnection.onServiceDisconnected should be moved here.
                }
            });
        }

        @Override
        public void onPurchasesUpdated(
            @BillingResponse int responseCode, @Nullable List<Purchase> purchases) {
            //Here is the important part. 
            for (Purchase purchase: purchases) {
              Revenue revenue = new Revenue()
                .setProductId("com.company.productId")
                .setQuantity(1)
                .setPrice(price);
              revenue.setReceipt(purchase.getOriginalJson(), purchase.getSignature());
              client.logRevenueV2(revenue);
            }
        }
    }
    ```
=== "Kotlin: AIDL"

    ```kotlin
    // For AIDL (old deprecated library)
            
    Intent data = ...

    val purchaseData: String = data.getStringExtra("PURCHASE_DATA")
    val dataSignature: String = data.getStringExtra("DATA_SIGNATURE")

    val revenue = Revenue().setProductId("com.company.productId").setQuantity(1)
    revenue.setPrice(3.99).setReceipt(purchaseData, dataSignature)

    client.logRevenueV2(revenue)
    ```
=== "Kotlin: Google Play Billing Library"

    ```kotlin
    class MyBillingImpl(private var billingClient: BillingClient) : PurchasesUpdatedListener {

        init {
            billingClient = BillingClient.newBuilder(activity).setListener(this).build()
            billingClient.startConnection(object : BillingClientStateListener {
                override fun onBillingSetupFinished(billingResult: BillingResult?) {
                    // Logic from ServiceConnection.onServiceConnected should be moved here.
                }

                override fun onBillingServiceDisconnected() {
                    // Logic from ServiceConnection.onServiceDisconnected should be moved here.
                }
            })
        }

        override fun onPurchasesUpdated(
            billingResult: BillingResult?,
            purchases: MutableList<Purchase>?
        ) {
            // Logic from onActivityResult should be moved here.
            for (Purchase purchase: purchases) {
              Revenue revenue = new Revenue()
                .setProductId("com.company.productId")
                .setQuantity(1)
                .setPrice(price);
              revenue.setReceipt(purchase.getOriginalJson(), purchase.getSignature());
              client.logRevenueV2(revenue);
            }
        }
    }
    ```

### Amazon Store Revenue Verification

For purchases on the Amazon store, you should copy your Amazon Developer Shared Secret into the Sources & Destinations section of your project in Amplitude.
 After a successful purchase transaction, you should send the purchase token (For Amazon IAP 2.0 use receipt id) as the 'receipt' and the User ID as the 'receiptSignature':

=== "Java"

    ```java
    // for a purchase request onActivityResult
    String purchaseToken = purchaseResponse.getReceipt();
    String userId = getUserIdResponse.getUserId();

    Revenue revenue = new Revenue().setProductId("com.company.productId").setQuantity(1);
    revenue.setPrice(3.99).setReceipt(purchaseToken, userId);

    client.logRevenueV2(revenue);
    ```

## User Sessions

A session on Android is a period of time that a user has the app in the foreground.

Amplitude groups events together by session. Events that are logged within the same session have the same `session_id`. Sessions are handled automatically so you don't have to manually call an API
 like `startSession()` or `endSession()`.

You can adjust the time window for which sessions are extended.

=== "Java"

    ```java
    client.setMinTimeBetweenSessionsMillis(10000); //Must be a 'long'; 10 seconds
    ```

By default, '[Amplitude] Start Session' and '[Amplitude] End Session' events aren't sent. Even though these events aren't sent, sessions are still tracked by using `session_id`.
 To enable those session events, add this line before initializing the SDK.

=== "Java"

    ```java
    Amplitude.getInstance().trackSessionEvents(true);

    ```

You can also log events as out-of-session. Out-of-session events have a `session_id` of `-1` and are not considered part of the current session, meaning they do not extend the current session.
 This might be useful if you are logging events triggered by push notifications, for example. You can log events as out-of-session by setting the input parameter `outOfSession` to true when calling `logEvent()`.

=== "Java"

    ```java
    JSONObject eventProperties = //...

    //This event is now out of session
    client.logEvent("event type", eventProperties, true);
    ```

You can also log identify events as out-of-session, which is useful if you are updating user properties in the background and do not want to start a new session. You can do this by setting the input parameter outOfSession to true when calling `identify()`.

=== "Java"

    ```java
    Identify identify = new Identify().set("key", "value");
    Amplitude.getInstance().identify(identify, true);
    ```

You may also manually start a new session with its own ID.

=== "Java"

    ```java 
    long sessionId = ...;
    client.startNewSessionIfNeeded(sessionId);
    ```

You can use the helper method getSessionId to get the value of the current sessionId.

=== "Java"

    ```java
    long sessionId = Amplitude.getInstance().getSessionId();
    ```

!!!note
    For Android API level 14 and above, a new session is created when the app comes back into the foreground after being in the background for five or more minutes or when the last event was logged
     (whichever occurred last).
     Otherwise, the background event logged is part of the current session.
      Note that you can define your own session expiration time by calling setMinTimeBetweenSessionsMillis(timeout), where the timeout input is in milliseconds.

    For Android API level 13 and below, foreground tracking is not available so a new session is automatically started when an event is logged 30 minutes or more after the last logged event. If another event is logged within 30 minutes, it will extend the current session. Note that you can define your own session expiration time here as well by calling setSessionTimeoutMillis(timeout), where the timeout input is in milliseconds. Also note that enableForegroundTracking(getApplication) is still safe to call for Android API level 13 and below even though it's not available.

## Setting Custom User ID

If your app has its own login system that you want to track users with, you can call setUserId at any time.

=== "Java"

    ```java
    client.setUserId("USER_ID");
    ```

You can also add the User ID as an argument to the init call.

=== "Java"

    ```java
    client.initialize(this, "API_KEY", "USER_ID");
    ```

You shouldn't assign users a User ID that could change as each unique User ID is interpreted as a unique user in Amplitude.

## Log Level

The log level allows you to set the level of logs printed to be printed in the developer console. The different levels are as follows:

- 'INFO': This option shows error messages, warnings, and informative messages that may be useful for debugging.
- 'WARN': This option shows error messages and warnings. This level logs issues that might be a problem and cause some oddities in the data. For example, this level would display a warning for properties with null values.
- 'ERROR': This option shows error messages only.
- 'DISABLE': This suppresses all log messages.

You can set the log level by calling the following on Android:

=== "Java"

    ```java
    Amplitude.getInstance().setLogLevel(log.DEBUG)
    ```

## Logged out and anonymous users

--8<-- "includes/logged-out-and-anonymous-users.md"

=== "Java"

    ```java
    client.setUserId(null);
    client.regenerateDeviceId();
    ```

## Advanced Topics

### Disable Tracking

By default the Android SDK tracks several user properties such as `carrier`, `city`, `country`, `ip_address`, `language`, and `platform`.
Use the provided `TrackingOptions` interface to customize and toggle individual fields.

To use the `TrackingOptions` interface, import the class.

=== "Java"

    ```java
    import com.amplitude.api.TrackingOptions;
    ```

Before initializing the SDK with your apiKey, create a `TrackingOptions` instance with your configuration and set it on the SDK instance

=== "Java"

    ```java
    TrackingOptions options = new TrackingOptions().disableCity().disableIpAddress().disableLatLng();
    Amplitude.getInstance().setTrackingOptions(options);
    ```

Each field can be individually disabled and has a corresponding disable method (for example, `disableCountry`, `disableLanguage`, etc.). This table describes the different methods:

| <div class="big-column">Method</div> | Description |
| --- | --- |
| `disableAdid()` | Disable tracking of Google ADID |
| `disableCarrier()` | Disable tracking of device's carrier |
| `disableCity()` | Disable tracking of user's city |
| `disableCountry()` | Disable tracking of user's country |
| `disableDeviceBrand()` | Disable tracking of device brand |
| `disableDeviceModel()` | Disable tracking of device model |
| `disableDma()` | Disable tracking of user's DMA |
| `disableIpAddress()` | Disable tracking of user's IP address |
| `disableLanguage()` | Disable tracking of device's language |
| `disableLatLng()` | Disable tracking of user's current latitude and longitude coordinates |
| `disableOsName()` | Disable tracking of device's OS Name |
| `disableOsVersion()` | Disable tracking of device's OS Version |
| `disablePlatform()` | Disable tracking of device's platform |
| `disableRegion()` | Disable tracking of user's couregiontry |
| `disableVersionName()` | Disable tracking of your app's version name |

!!!note

    The `TrackingOptions` only prevents default properties from being tracked on newly created projects, where data has not yet been sent. If you have a project with existing data that you would like to stop collecting the default properties for, please get help in the [Amplitude Community](https://community.amplitude.com/). Note that the existing data will not be deleted.

### COPPA Control

COPPA (Children's Online Privacy Protection Act) restrictions on IDFA, IDFV, city, IP address and location tracking can be enabled or disabled all at once.
 Apps asking for information from children under 13 years of age must comply with COPPA.

=== "Java"

    ```java
    client.enableCoppaControl(); //Disables ADID, city, IP, and location tracking
    ```

### Advertising ID

Advertiser ID (also referred to as IDFA) is a unique identifier provided by the iOS and Google Play stores. As it's unique to every person and not just their devices, it's useful for mobile attribution.
 [Mobile attribution](https://www.adjust.com/blog/mobile-ad-attribution-introduction-for-beginners/) is the attribution of an installation of a mobile app to its original source (e.g. ad campaign, app store search).
 Mobile apps need permission to ask for IDFA, and apps targeted to children can't track at all. Consider IDFV, device id, or an email login system as alternatives when IDFA is not available.

Follow the three steps below to use Android Ad ID.

!!!warning "Google Ad ID and Tracking Warning"

    [Google will allow users to opt out of Ad ID tracking in Q4 for Android 12 devices, and in 2022 for all Android devices](https://support.google.com/googleplay/android-developer/answer/6048248?hl=en). Ad ID may return null or error. See the next section on the alternative ID called 'App Set ID', which is unique to every app install on a device.

1. Add play-services-ads as a dependency.

    ```bash
    dependencies {
      implementation 'com.google.android.gms:play-services-ads:18.3.0'
    }
    ```

2. `AD_MANAGER_APP` Permission
If you use Google Mobile Ads SDK version 17.0.0 above, you need to add `AD_MANAGER_APP` to `AndroidManifest.xml`.

    ```xml
    <manifest>
        <application>
            <meta-data
                android:name="com.google.android.gms.ads.AD_MANAGER_APP"
                android:value="true"/>
        </application>
    </manifest>
    ```

3. Add Proguard exception

Amplitude Android SDK uses Java Reflection to use classes in Google Play Services. For Amplitude SDKs to work in your Android application, please add these exceptions to `proguard.pro` for the classes from `play-services-ads`.
`-keep class com.google.android.gms.ads.** { *; }`

#### Set Advertising ID as Device ID

After you set up the logic to fetch the advertising ID, you can also call this useAdvertisingIdForDeviceId API to set it as your device ID.

=== "Java"

    ```java
    client.useAdvertisingIdForDeviceId();
    ```

### App Set ID

App Set ID is a unique identifier for each app install on a device. App Set ID can be reset by the user manually, when they uninstall the app, or after 13 months of not opening the app.
 Google designed this as a privacy-friendly alternative to Ad ID for users who want to opt out of stronger analytics.

 To implement App Set ID, follow these steps.

1. Add `play-services-appset` as a dependency. For versions earlier than 2.35.3, use `'com.google.android.gms:play-services-appset:16.0.0-alpha1'`

    ```bash
    dependencies {
        implementation 'com.google.android.gms:play-services-appset:16.0.2'
    }
    ```

2. Set App Set ID as Device ID.

    === "Java"

        ```java
        client.useAppSetIdForDeviceId();
        ```

### Location Tracking

Amplitude converts the IP of a user event into a location (GeoIP lookup) by default. This information may be overridden by an app's own tracking solution or user data.

Amplitude can access the Android location service (if possible) to add the specific coordinates (longitude and latitude) where an event is logged. This behavior is enabled by default but can be adjusted by calling the following methods after initializing:

=== "Java"

    ```java 
    client.enableLocationListening();
    client.disableLocationListening();
    ```

!!!note "Proguard obfuscation"
    If you use Proguard obfuscation, please also add the following exception to the file:
    `-keep class com.google.android.gms.common.** { *; }`

### Opt Out of Tracking

Users may wish to opt out of tracking entirely, which means no events and no records of their browsing history. This API provides a way to fulfill certain users' requests for privacy.

=== "Java"

    ```java
    client.setOptOut(true); //Disables all tracking of events for this user
    ```

### Push Notification Events

Push notification events shouldn't be sent client-side via the Android SDK because a user must open the app to initialize the Amplitude SDK in order for the SDK to send the event. Therefore, if push notification events are tracked client-side then there can be data delays as the push notification event isn't sent to Amplitude's servers until the next time the user opens the app.

You can use our [mobile marketing automation partners](https://amplitude.com/integrations?category=mobile-marketing-automation) or our [HTTP API V2](https://developers.amplitude.com/docs/http-api-v2) to send push notification events to Amplitude.

### Event Explorer

To use Event Explorer, you will need to know either `deviceId` or `userId` to look up live events. Android SDKs provide functionalities to view them while using a debug build.

First, add the following code into your `AndroidManifest.xml`.

```xml
<activity
            android:name="com.amplitude.eventexplorer.EventExplorerInfoActivity"
            android:exported="true"
            android:screenOrientation="portrait"
            />

```

Second, add the following code in your root activity's onCreate life cycle.

=== "Java"

    ```java
    @Override
    public void onCreate(Bundle savedInstanceState) {
      //...
      client.showEventExplorer(this);
      //...
    }
    ```

### Dynamic Configuration

Android SDK allows users to configure their apps to use [dynamic configuration](https://developers.amplitude.com/docs/dynamic-configuration). This feature finds the best server URL automatically based on app users' location.

- If you have your own proxy server and use `setServerUrl` API, leave dynamic configuration off.
- If you have users in China Mainland, then we recommend using dynamic configuration.
- By default, this feature returns server URL of Amplitude's US servers, if you need to send data to Amplitude's EU servers, use `setServerZone` to set it to EU zone.

 To use, set `setUseDynamicConfig` to `true`.

=== "Java"

    ```java
    client.setUseDynamicConfig(true);
    ```

### SSL Pinning

SSL Pinning is a technique on the client side to avoid man-in-the-middle attacks by validating the server certificates again even after SSL handshaking. Please let Amplitude Support know before you ship any products with SSL pinning enabled.

To use SSL Pinning in the Android SDK, use the class `PinnedAmplitudeClient` instead of `AmplitudeClient` to turn it on.

### Set Log Callback

Amplitude Android SDK allows the app to set a callback (version 2.32.2+). Creating a class and setting the callback would help with collecting any error messages from the SDK in a production environment.

=== "Java"

    ```java
    class SampleLogCallback implements AmplitudeLogCallback {
      @Override
        public void onError(String tag, String message) {
        // handling of error message
      }
    }
    SampleLogCallback callback = new SampleLogCallback();
    client.setLogCallback(callback);
    ```

### Middleware

Middleware lets you extend Amplitude by running a sequence of custom code on every event.
 This pattern is flexible and can be used to support event enrichment, transformation, filtering, routing to third-party destinations, and more.

Each middleware is a simple interface with a run method:

```bash
void run(MiddlewarePayload payload, MiddlewareNext next);
```

The `payload` contains the `event` being sent as well as an optional `extra` that allows you to pass custom data to your own middleware implementations.

To invoke the next middleware in the queue, use the `next` function. You must call `next.run(payload)` to continue the middleware chain.
 If a middleware doesn't call `next`, then the event processing stop executing after the current middleware completes.

Middleware is added to Amplitude via `client.addEventMiddleware`. You can add as many middleware as you like. Each middleware runs in the order in which it's added.

Find middleware examples for [Java](https://github.com/amplitude/ampli-examples/blob/main/android/java/AmpliApp/app/src/main/java/com/example/ampliapp/LoggingMiddleware.java)
 and [Kotlin](https://github.com/amplitude/ampli-examples/blob/main/android/kotlin/AmpliApp/app/src/main/java/com/example/ampliapp/LoggingMiddleware.kt) on GitHub.

## More help

If you have any problems or issues over our SDK, feel free to [create a github issue](https://github.com/amplitude/Amplitude-Android/issues/new) or submit a request on [Amplitude Help](https://help.amplitude.com/hc/en-us/requests/new).

--8<-- "includes/abbreviations.md"
