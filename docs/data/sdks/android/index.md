---
title: Android SDK (Legacy)
description: The Amplitude Android SDK installation and quick start guide.
icon: simple/android
---

<!-- vale off -->

[![Maven Central](https://img.shields.io/maven-central/v/com.amplitude/android-sdk.svg?label=Maven%20Central&versionPrefix=2)](https://search.maven.org/search?q=g:%22com.amplitude%22%20AND%20a:%22android-sdk%22)

This is the official documentation for the Amplitude Analytics Android SDK.

!!!deprecated "Legacy SDK"
    This is a legacy SDK and will only receive bug fixes until deprecation. Upgrade to the [Android Kotlin SDK](../android-kotlin) which supports plugins, SDK integrations, and more.

!!!info "Android SDK Resources (Legacy)"
    [:material-github: GitHub](https://github.com/amplitude/Amplitude-Android) · [:material-code-tags-check: Releases](https://github.com/amplitude/Amplitude-Android/releases) · [:material-book: API Reference](https://amplitude.github.io/Amplitude-Android)

--8<-- "includes/ampli-vs-amplitude.md"
    Click here for more documentation on [Ampli for Android](./ampli.md).

## Install

### Add dependencies

!!!tip

    We recommend using Android Studio as an IDE and Gradle to manage dependencies. Please user version 2.x, version 3.35.1 is invalid. 
<!--vale off-->
1. In the `build.gradle` file, add these dependencies. The SDK requires OkHttp.

    ```bash
    dependencies {
      implementation 'com.amplitude:android-sdk:2.+'
      implementation 'com.squareup.okhttp3:okhttp:4.2.2'
    }
    ```

2. Sync project with Gradle files.
3. To report events to Amplitude, add the INTERNET permission to your `AndroidManifest.xml` file:
    `<uses-permission android:name="android.permission.INTERNET" />`
4. For Android 6.0 (Marshmallow) and higher, explicitly add the `READ_PHONE_STATE` permission to fetch phone related information. `<uses-permission android:name="android.permission.READ_PHONE_STATE" />`
<!--vale on-->
After you've installed the SDK and its dependencies, import Amplitude into any file that uses it.

=== "Java"

    ```java
    import com.amplitude.api.Amplitude;
    import com.amplitude.api.AmplitudeClient;
    /*
    Import any more files that are needed, use the SDK reference
    http://amplitude.github.io/Amplitude-Android/
    */

    ```

!!!tip "Quickstart"
    1. [Initialize](#initialize)
    2. [Send an event](#send-events)

    === "Java"

        ```java
        // initialize 

        AmplitudeClient client = Amplitude.getInstance()
          .initialize(getApplicationContext(), "YOUR_API_KEY_HERE")
          .enableForegroundTracking(getApplication());

        // send an event 
        
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

        ```kotlin 
        // initialize 

        val client = Amplitude.getInstance()
          .initialize(getApplicationContext(), "YOUR_API_KEY_HERE")
          .enableForegroundTracking(application)

        // send event 

        val eventProperties = JSONObject() 
        try {
          eventProperties.put("Hover Time", 10).put("prop_2", "value_2")
        } catch (e: JSONException) {
          System.err.println("Invalid JSON")
          e.printStackTrace()
        }
        client.logEvent("Button Clicked", eventProperties)
        ```

## Core functions

The following functions make up the core of the Amplitude Analytics Android SDK.

----------------------------------------

### Initialize

You must initialize the SDK before you can instrument. The API key for your Amplitude project is required. Amplitude recommends adding this in `onCreate(...)` of your Activity class.

You can use the Android SDK anywhere after it's initialized in an Android application.

Accurate session tracking requires that you enable `enableForegroundTracking(getApplication())`. It's disabled by default.

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

`Amplitude.getInstance(String name)` can take a name that holds settings. This instance is now linked to the name and you can retrieve it somewhere else.

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

#### Configuration

???config "Configuration Options"
    | <div class="big-column">Name</div>  | Description | Default Value |
    | --- | --- | --- |
    | `eventUploadPeriodMillis` | The amount of time SDK will attempt to upload the unsent events to the server or reach `eventUploadThreshold` threshold. | `30000` |
    | `eventUploadThreshold` | SDK will attempt to upload once unsent event count exceeds the event upload threshold or reach `eventUploadPeriodMillis` interval.  | `30` |
    | `eventUploadMaxBatchSize` | The maximum number of events sent with each upload request. | `50` |
    | `eventMaxCount` | The maximum number of unsent events to keep on the device. | `1000` |
    | `identifyBatchIntervalMillis` | The amount of time SDK will attempt to batch intercepted identify events. | `30000` |
    | `flushEventsOnClose` | Flushing of unsent events on app close. | `true` |
    | `optOut` | Opt the user out of tracking. | `false` |
    | `trackingSessionEvents` | Flushing of unsent events on app close. | `false` |
    | `sessionTimeoutMillis` | The amount of time for session timeout if enable foreground tracking. | `1800000` |
    | `minTimeBetweenSessionsMillis` | The amount of time for session timeout if disable foreground tracking. | `300000` |
    | `serverUrl` | The server url events upload to. | `https://api2.amplitude.com/` |
    | `useDynamicConfig` |  Find the best server url automatically based on users' geo location. | `false` |

#### EU data residency

Beginning with version 2.34.0, you can configure the server zone after initializing the client for sending data to Amplitude's EU servers. The SDK sends data based on the server zone if it's set.
 The server zone configuration supports dynamic configuration as well.

For earlier versions, you need to configure the `serverURL` property after initializing the client.

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

### Send events

#### Basic events

Events represent how users interact with your application. For example, the event "button click" may be an action you want to track.

=== "Java"

    ```java
    client.logEvent("Button Clicked");

    ```

#### Events with properties

Events can contain properties, which give more context about the event. For example, "hover time" may be a relevant event property for "button click."

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

### Flush events

Unset events are stored in a buffer and flushed (sent) on app close by default. Events are flushed based on which criteria is met first: `eventUploadPeriodMillis` or `eventUploadThreshold`. 

You can disable flushing or configure the upload period of the event upload threshold. 

=== "Disable flushing"

    ```java 
    client.setFlushEventsOnClose(false); //Don't flush events

    ```

=== "Change upload period"

    The default upload period is 30 seconds. Input is in milliseconds.
    
    ```shell

    Amplitude.getInstance(instanceName).setEventUploadPeriodMillis(100000); // Changes event upload period to 100 seconds

    ```

=== "Change default event buffer"

    The default event buffer is 30. Input is an int. 

    ```shell

    Amplitude.getInstance(instanceName).setEventUploadThreshold(4); // Changes event upload buffer to 4

    ```

To force the SDK to upload unsent events, the use the method `uploadEvents`.

### User properties

!!!warning "Privacy and Tracking"
    Don't track any user data that's against your privacy terms.

#### Set user properties

Identify is for setting the user properties of a particular user without sending any event.
 The SDK supports these operations on individual user properties: `set`, `setOnce`, `unset`, `add`, `append`, `prepend`, `preInsert`, `postInsert`, and `remove`. Declare the operations via a provided Identify interface. You can chain together multiple operations in a single Identify object.
  The Identify object is passed to the Amplitude client to send to the server. Starting from release v2.29.0, identify events with set operations would be batched and sent with fewer events. This change wouldn't affect running the set operations. There is a config `identifyBatchIntervalMillis` managing the interval
  to flush the batched identify intercepts.

!!!note

    If the Identify call is sent after the event, the results of operations is visible immediately in the dashboard user's profile area, but it doesn't appear in chart result until another event is sent after the Identify call. The identify call only affects events going forward.
     [Learn more in the Help Center](https://help.amplitude.com/hc/en-us/articles/115002380567-User-Properties-Event-Properties#applying-user-properties-to-events).

You can handle the identity of a user using the identify methods. Proper use of these methods can connect events to the correct user as they move across devices, browsers, and other platforms.
 Send an identify call containing those user property operations to Amplitude server to tie a user's events with specific user properties.

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

##### set

`set` sets the value of a user property. You can also chain together multiple identify calls.

=== "Java"

    ```java
    Identify identify = new Identify().set("color", "green");

    ```

=== "Kotlin"

    ```kotlin
    val identify = Identify().set("color", "green")
    ```

##### `setOnce`

`setOnce` sets the value of a user property one time. Later calls using `setOnce` are ignored.

=== "Java"

    ```java 
    Identify identify = new Identify().setOnce("color", "green");

    ```
=== "Kotlin"

    ```kotlin
    val identify = Identify().setOnce("color", "green")
    ```

##### `add`

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

#### Set multiple user properties

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

#### Arrays in user properties

You can use arrays as user properties. You can directly set arrays or use `append` to generate an array.

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

##### `prepend` and `append`

- `append` appends a value or values to a user property array.
- `prepend` prepends a value or values to a user property.

If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are added. If the user property has an existing value and it's not a list, it's converted into a list with the new value added.

!!!note

    `append` and `prepend` doesn't check for duplicates. Please see `preInsert` and `postInsert` for that.

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

##### `preInsert` and `postInsert`

- `preInsert` inserts a value or values to the front of a user property array if it doesn't exist in the array yet.
- `postInsert` inserts a value or values to the end of a user property array if it doesn't exist in the array yet.

If the user property doesn't exist, it's initialized to an empty list before the new values are pre-inserted. If the user property has an existing value, nothing is inserted.

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

#### Clear user properties

`clearUserProperties` removes all the current user's user properties.

!!!warning "This action is irreversible"

    If you clear user properties, Amplitude can't sync the user's user property values from before the wipe to any future events.

=== "Java"

    ```java
    client.clearUserProperties();
    ```

##### `unset`

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

### Set user groups

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

--8<-- "includes/groups-intro-paragraph.md"

!!! example

    If Joe is in 'orgId' '10' and '16', then the `groupName` would be '[10, 16]'). Here is what your code might look like:

    ```java
    Amplitude.getInstance().setGroup("orgID", new JSONArray().put("10").put("16"));  // list values
    ```

You can also use `logEventWithGroups` to set event-level groups. This means that the group designation only applies for the specific event being logged and doesn't persist on the user unless you explicitly set it with `setGroup`:

=== "Java"

    ```java
    JSONObject eventProperties = new JSONObject().put("key", "value");
    JSONObject groups = new JSONObject().put("orgId", 10);

    Amplitude.getInstance().logEvent("initialize_game", eventProperties, groups);
    ```

### Group identify

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

--8<-- "includes/group-identify-considerations.md"

=== "Java"

    ```java
    String groupType = "plan";
    Object groupName = "enterprise";

    Identify identify = new Identify().set("key", "value");
    Amplitude.getInstance().groupIdentify(groupType, groupName, identify);
    ```

An optional `outOfSession` boolean input can be supplied as fourth argument to `groupIdentify`.

### Track revenue

Amplitude can track revenue generated by a user. Revenue is tracked through distinct revenue objects, which have special fields used in Amplitude's Event Segmentation and Revenue LTV charts.
 This lets Amplitude to automatically display data relevant to revenue in the platform.

 To track revenue from a user, call `logRevenueV2` each time a user generates revenue.

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

| <div class="big-column">Name</div>  | Description  |
| --- | --- |
| `productId` | Optional. String. An identifier for the product. Amplitude recommends something like the "Google Play Store product ID". Defaults to `null`. |
| `quantity`| Required. Integer. The quantity of products purchased. Note: revenue = quantity * price. Defaults to 1. |
| `price` | Required. Double. The price of the products purchased. This can be negative to track revenue lost, like refunds or costs. Note: revenue = quantity * price. Defaults to `null`.|
| `revenueType` | Optional, but required for revenue verification. String. The revenue type. For example: tax, refund, income. Defaults to `null`. |
| `receipt`  | Optional. String. The revenue type. For example: tax, refund, income. Defaults to `null` |
| `receiptSignature` | Optional, but required for revenue verification. The revenue type. For example: tax, refund, income). Defaults to `null`. |
| `eventProperties`| Optional. JSONObject. An object of event properties to include in the revenue event. Defaults to `null`. |

!!!note

    Amplitude doesn't support currency conversion. Normalize all revenue data to your currency of choice before being sent.

### Revenue verification

The `logRevenue` method also supports revenue validation.

By default, revenue events recorded on the Android SDK appear in Amplitude as [Amplitude] Revenue (Unverified) events. To enable revenue verification,
 copy your Google Play License Public Key into the Sources & Destinations section of your project in Amplitude.
 You must put in a key for every single project in Amplitude where you want revenue to be verified.

There are two main Android libraries for revenue verifications: AIDL and Google Play Billing. AIDL is older and deprecated. See [this Google guide](https://developer.android.com/google/play/billing/migrate) on how to migrate,
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

#### Amazon Store revenue verification

For purchases on the Amazon store, you first need to set up Amazon as a data source in Amplitude.
<!--vale off -->
1. In Amplitude, navigate to the **Data Sources** page.
2. Click **I want to import data into Amplitude**, then select **Amazon**.
3. Paste your Amazon Developer Shared Secret in the box and save. 
<!--vale on-->
 After a successful purchase, send the purchase token (For Amazon IAP 2.0 use receipt ID) as the `receipt` and the User ID as the `receiptSignature`:

=== "Java"

    ```java
    // for a purchase request onActivityResult
    String purchaseToken = purchaseResponse.getReceipt();
    String userId = getUserIdResponse.getUserId();

    Revenue revenue = new Revenue().setProductId("com.company.productId").setQuantity(1);
    revenue.setPrice(3.99).setReceipt(purchaseToken, userId);

    client.logRevenueV2(revenue);
    ```

## Advanced topics

### User sessions

A session on Android is a period of time that a user has the app in the foreground.

Amplitude groups events together by session. Events that are logged within the same session have the same `session_id`. Sessions are handled automatically so you don't have to manually call `startSession()` or `endSession()`.

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

You can also log events as out-of-session. Out-of-session events have a `session_id` of `-1` and aren't considered part of the current session, meaning they don't extend the current session.
 This might be useful if you are logging events triggered by push notifications, for example. You can log events as out-of-session by setting the input parameter `outOfSession` to true when calling `logEvent()`.

=== "Java"

    ```java
    JSONObject eventProperties = //...

    //This event is now out of session
    client.logEvent("event type", eventProperties, true);
    ```

You can also log identify events as out-of-session. This is useful if you are updating user properties in the background and don't want to start a new session. You can do this by setting the input parameter outOfSession to true when calling `identify()`.

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

You can use the helper method `getSessionId` to get the value of the current `sessionId`.

=== "Java"

    ```java
    long sessionId = Amplitude.getInstance().getSessionId();
    ```

!!!note
    For Android API level 14 and higher, a new session is created when the app comes back into the foreground after being in the background for five or more minutes or when the last event was logged
     (whichever occurred last).
     Otherwise, the background event logged is part of the current session.
      Note that you can define your own session expiration time by calling setMinTimeBetweenSessionsMillis(timeout), where the timeout input is in milliseconds.

    For Android API level 13 and below, foreground tracking is not available so a new session is automatically started when an event is logged 30 minutes or more after the last logged event. If another event is logged within 30 minutes, it will extend the current session. Note that you can define your own session expiration time here as well by calling setSessionTimeoutMillis(timeout), where the timeout input is in milliseconds. Also note that enableForegroundTracking(getApplication) is still safe to call for Android API level 13 and below even though it's not available.

### Set custom user ID

If your app has its own login system that you want to track users with, you can call `setUserId` at any time.

=== "Java"

    ```java
    client.setUserId("USER_ID");
    ```

You can also add the User ID as an argument to the init call.

=== "Java"

    ```java
    client.initialize(this, "API_KEY", "USER_ID");
    ```

Don't assign users a user ID that could change, because each unique user ID is a unique user in Amplitude. Learn more about how Amplitude tracks unique users in the [Help Center](https://help.amplitude.com/hc/en-us/articles/115003135607-Track-unique-users-in-Amplitude).

### Log level

You can control the level of logs that print to the developer console.

- 'INFO': Shows informative messages about events. 
- 'WARN': Shows error messages and warnings. This level logs issues that might be a problem and cause some oddities in the data. For example, this level would display a warning for properties with null values.
- 'ERROR': Shows error messages only.
- 'DISABLE': Suppresses all log messages.
- 'DEBUG': Shows error messages, warnings, and informative messages that may be useful for debugging.

Set the log level by calling `setLogLevel` with the level you want.

=== "Java"

    ```java
    Amplitude.getInstance().setLogLevel(log.DEBUG)
    ```

### Logged out and anonymous users

--8<-- "includes/logged-out-and-anonymous-users.md"

=== "Java"

    ```java
    client.setUserId(null);
    client.regenerateDeviceId();
    ```

### Disable tracking

By default the Android SDK tracks several user properties such as `carrier`, `city`, `country`, `ip_address`, `language`, and `platform`.
Use the provided `TrackingOptions` interface to customize and toggle individual fields.

To use the `TrackingOptions` interface, import the class.

=== "Java"

    ```java
    import com.amplitude.api.TrackingOptions;
    ```

Before initializing the SDK with your apiKey, create a `TrackingOptions` instance with your configuration and set it on the SDK instance.

=== "Java"

    ```java
    TrackingOptions options = new TrackingOptions().disableCity().disableIpAddress().disableLatLng();
    Amplitude.getInstance().setTrackingOptions(options);
    ```

Tracking for each field can be individually controlled, and has a corresponding method (for example, `disableCountry`, `disableLanguage`).

| <div class="big-column">Method</div> | Description |
| --- | --- |
| `disableAdid()` | Disable tracking of Google ADID |
| `disableCarrier()` | Disable tracking of device's carrier |
| `disableCity()` | Disable tracking of user's city |
| `disableCountry()` | Disable tracking of user's country |
| `disableDeviceBrand()` | Disable tracking of device brand |
| `disableDeviceModel()` | Disable tracking of device model |
| `disableDma()` | Disable tracking of user's designated market area (DMA). |
| `disableIpAddress()` | Disable tracking of user's IP address |
| `disableLanguage()` | Disable tracking of device's language |
| `disableLatLng()` | Disable tracking of user's current latitude and longitude coordinates |
| `disableOsName()` | Disable tracking of device's OS Name |
| `disableOsVersion()` | Disable tracking of device's OS Version |
| `disablePlatform()` | Disable tracking of device's platform |
| `disableRegion()` | Disable tracking of user's region. |
| `disableVersionName()` | Disable tracking of your app's version name |

!!!note

    Using `TrackingOptions` only prevents default properties from being tracked on newly created projects, where data has not yet been sent. If you have a project  with existing data that you want to stop collecting the default properties for, get help in the [Amplitude Community](https://community.amplitude.com/?utm_source=devdocs&utm_medium=helpcontent&utm_campaign=devdocswebsite). Disabling tracking doesn't delete any existing data in your project.

### Carrier 

Amplitude determines the user's mobile carrier using [Android's TelephonyManager](https://developer.android.com/reference/android/telephony/TelephonyManager#getNetworkOperatorName()) `getNetworkOperatorName()`, which returns the current registered operator of the `tower`. 

### COPPA control

COPPA (Children's Online Privacy Protection Act) restrictions on IDFA, IDFV, city, IP address and location tracking can all be enabled or disabled at one time. Apps that ask for information from children under 13 years of age must comply with COPPA.

=== "Java"

    ```java
    client.enableCoppaControl(); //Disables ADID, city, IP, and location tracking
    ```

### Advertiser ID

Advertiser ID (also referred to as IDFA) is a unique identifier provided by the iOS and Google Play stores. As it's unique to every person and not just their devices, it's useful for mobile attribution.
 [Mobile attribution](https://www.adjust.com/blog/mobile-ad-attribution-introduction-for-beginners/) is the attribution of an installation of a mobile app to its original source (such as ad campaign, app store search).
 Mobile apps need permission to ask for IDFA, and apps targeted to children can't track at all. Consider IDFV or device ID when IDFA isn't available.

Follow these steps to use Android Ad ID.

!!!warning "Google Ad ID and Tracking Warning"

    As of April 1, 2022, Google allows users to opt out of Ad ID tracking. Ad ID may return null or error. You can use am alternative ID called [App Set ID](#app-set-id), which is unique to every app install on a device. [Learn more](https://support.google.com/googleplay/android-developer/answer/6048248?hl=en)

1. Add `play-services-ads` as a dependency.

    ```bash
    dependencies {
      implementation 'com.google.android.gms:play-services-ads:18.3.0'
    }
    ```

2. `AD_MANAGER_APP` Permission
If you use Google Mobile Ads SDK version 17.0.0 or higher, you need to add `AD_MANAGER_APP` to `AndroidManifest.xml`.

    ```xml
    <manifest>
        <application>
            <meta-data
                android:name="com.google.android.gms.ads.AD_MANAGER_APP"
                android:value="true"/>
        </application>
    </manifest>
    ```

3. Add ProGuard exception

Amplitude Android SDK uses Java Reflection to use classes in Google Play Services. For Amplitude SDKs to work in your Android application, add these exceptions to `proguard.pro` for the classes from `play-services-ads`.
`-keep class com.google.android.gms.ads.** { *; }`

#### Set advertising ID as device ID

After you set up the logic to fetch the advertising ID, you can use `useAdvertisingIdForDeviceId` to set it as the device ID.

=== "Java"

    ```java
    client.useAdvertisingIdForDeviceId();
    ```

### App set ID

App set ID is a unique identifier for each app install on a device. App set ID is reset by the user manually when they uninstall the app, or after 13 months of not opening the app.
 Google designed this as a privacy-friendly alternative to Ad ID for users who want to opt out of stronger analytics.

 To use App Set ID, follow these steps.

1. Add `play-services-appset` as a dependency. For versions earlier than 2.35.3, use `'com.google.android.gms:play-services-appset:16.0.0-alpha1'`

    ```bash
    dependencies {
        implementation 'com.google.android.gms:play-services-appset:16.0.2'
    }
    ```

2. Set app set ID as Device ID.

    === "Java"

        ```java
        client.useAppSetIdForDeviceId();
        ```

### Location tracking

Amplitude converts the IP of a user event into a location (GeoIP lookup) by default. This information may be overridden by an app's own tracking solution or user data.

By default, Amplitude can use Android location service (if available) to add the specific coordinates (longitude and latitude) for the location from which an event is logged. Control this behavior by calling the `enableLocationListening` or `disableLocationListening` method after initializing.

=== "Java"

    ```java 
    client.enableLocationListening();
    client.disableLocationListening();
    ```

!!!note "ProGuard obfuscation"
    If you use ProGuard obfuscation, add the following exception to the file:
    `-keep class com.google.android.gms.common.** { *; }`

### Opt users out of tracking

Users may wish to opt out of tracking entirely, which means Amplitude won't track any of their events or browsing history. `setOptOut` provides a way to fulfill a user's requests for privacy.

=== "Java"

    ```java
    client.setOptOut(true); //Disables all tracking of events for this user
    ```

### Push notification events

Don't send push notification events client-side via the Android SDK. Because a user must open the app to initialize the Amplitude SDK to send the event, events aren't sent to Amplitude until the next time they open the app. This can cause data delays.

You can use [mobile marketing automation partners](https://amplitude.com/integrations?category=mobile-marketing-automation) or the [HTTP API V2](https://developers.amplitude.com/docs/http-api-v2) to send push notification events to Amplitude.

### Event Explorer

To use Event Explorer, you need either `deviceId` or `userId` to look up live events. This SDK provides a way to view them while using a debug build.

First, add the following code into your `AndroidManifest.xml`.

```xml
<activity
            android:name="com.amplitude.eventexplorer.EventExplorerInfoActivity"
            android:exported="true"
            android:screenOrientation="portrait"
            />

```

Second, add the following code in your root activity's `onCreate` life cycle.

=== "Java"

    ```java
    @Override
    public void onCreate(Bundle savedInstanceState) {
      //...
      client.showEventExplorer(this);
      //...
    }
    ```

### Dynamic configuration

Android SDK lets you configure your apps to use [dynamic configuration](../../dynamic-configuration.md). This feature finds the best server URL automatically based on app users' location.

- If you have your own proxy server and use `setServerUrl` API, leave dynamic configuration off.
- If you have users in China Mainland, then Amplitude recommends using dynamic configuration.
- By default, this feature returns server URL of Amplitude's US servers, if you need to send data to Amplitude's EU servers, use `setServerZone` to set it to EU zone.

 To use, set `setUseDynamicConfig` to `true`.

=== "Java"

    ```java
    client.setUseDynamicConfig(true);
    ```

### SSL pinning

SSL Pinning is a technique used in the client side to avoid man-in-the-middle attack by validating the server certificates again after SSL handshaking. Only use SSL pinning if you have a specific reason to do so. Contact Support before you ship any products with SSL pinning enabled.

To use SSL Pinning in the Android SDK, use the class `PinnedAmplitudeClient` instead of `AmplitudeClient` to turn it on.

### Set log callback

The Amplitude Android SDK allows the app to set a callback (version 2.32.2+). Create a class and set the callback to help with collecting any error messages from the SDK in a production environment.

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
 This pattern is flexible and you can use it to support event enrichment, transformation, filtering, routing to third-party destinations, and more.

Each middleware is a simple interface with a run method:

```java
void run(MiddlewarePayload payload, MiddlewareNext next);
```

The `payload` contains the `event` and an optional `extra` that allows you to pass custom data to your own middleware implementations.

To invoke the next middleware in the queue, use the `next` function. You must call `next.run(payload)` to continue the middleware chain.
 If a middleware doesn't call `next`, then the event processing stop executing after the current middleware completes.

Add middleware to Amplitude via `client.addEventMiddleware`. You can add as many middleware as you like. Each middleware runs in the order in which it's added.

Find middleware examples for [Java](https://github.com/amplitude/ampli-examples/blob/main/android/java/v1/AmpliApp/app/src/test/java/com/example/ampliapp/AmpliTest.java)
 and [Kotlin](https://github.com/amplitude/ampli-examples/blob/main/android/kotlin/v1/AmpliApp/app/src/test/java/com/example/ampliapp/AmpliTest.kt) on GitHub.

## More help

If you have any issues with the SDK, [create a GitHub issue](https://github.com/amplitude/Amplitude-Android/issues/new) or submit a request on [Amplitude Help](https://help.amplitude.com/hc/en-us/requests/new).

--8<-- "includes/abbreviations.md"
