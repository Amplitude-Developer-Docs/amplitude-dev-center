---
title: "Android SDK"
icon: material/android
---
# Android SDK Overview

[![Maven Central](https://img.shields.io/maven-central/v/com.amplitude/android-sdk.svg?label=Maven%20Central)](https://search.maven.org/search?q=g:%22com.amplitude%22%20AND%20a:%22android-sdk%22)

# SDK Installation

## 1. Add dependencies
- We recommend using Android Studio as an IDE and Gradle to manage dependencies.
- In `build.gradle` file, please add the following dependencies. OkHttp is needed for our SDK.
```
dependencies {
  implementation 'com.amplitude:android-sdk:2.34.1'
  implementation 'com.squareup.okhttp3:okhttp:4.2.2'
}
```
- Sync project with gradle files.

## 2. Add permissions
To report events to Amplitude, add the INTERNET permission to your `AndroidManifest.xml` file.
```<uses-permission android:name="android.permission.INTERNET" />```

For Android 6.0 (Marshmallow) and above, explicitly add the `READ_PHONE_STATE` permission to fetch phone related information.
```<uses-permission android:name="android.permission.READ_PHONE_STATE" />```

# Importing
Import Amplitude into any file that uses it.
[block:code]
{
  "codes": [
    {
      "code": "import com.amplitude.api.Amplitude;\nimport com.amplitude.api.AmplitudeClient;\n/*\nImport any more files that are needed, use the SDK reference\nhttp://amplitude.github.io/Amplitude-Android/\n*/",
      "language": "java"
    }
  ]
}
[/block]
# Initialization
Initialization is necessary before any instrumentation is done. The API key for your Amplitude project is required. We recommend but do not require putting this in `onCreate(...)` of your Activity class. However, the Android SDK can be used anywhere after it is initialized anywhere in an Android application. 
[block:code]
{
  "codes": [
    {
      "code": "AmplitudeClient client = Amplitude.getInstance()\n  .initialize(getApplicationContext(), \"YOUR_API_KEY_HERE\")\n  .enableForegroundTracking(getApplication());",
      "language": "java"
    },
    {
      "code": "val client = Amplitude.getInstance()\n  .initialize(getApplicationContext(), \"YOUR_API_KEY_HERE\")\n  .enableForegroundTracking(application)",
      "language": "kotlin"
    }
  ]
}
[/block]
Note that `enableForegroundTracking(getApplication())` is necessary for accurate session tracking and off by default. 

`Amplitude.getInstance(String name)` may optionally take a name which uniquely holds settings. This instance is now linked to the name and can be retrieved somewhere else.  
[block:code]
{
  "codes": [
    {
      "code": "AmplitudeClient client1 = Amplitude.getInstance(\"Andy_Client\");\nAmplitudeClient client2 = Amplitude.getInstance(\"Bob_Client\");\n\n//In the same file, or a different activity in the app\nAmplitudeClient sameClient = Amplitude.getInstance(\"Andy_Client\");",
      "language": "java"
    },
    {
      "code": "val client1 = Amplitude.getInstance(\"Andy_Client\")\nval client2 = Amplitude.getInstance(\"Bob_Client\")\n\n//In the same file, or a different activity in the app\nval sameClient = Amplitude.getInstance(\"Andy_Client\")",
      "language": "kotlin"
    }
  ]
}
[/block]
# EU Data Residency
Starting from version 2.34.0, you can configure the server zone after initializing the client for sending data to Amplitude's EU servers. SDK will switch and send data based on the server zone if it is set. The server zone config supports dynamic configuration as well. 

For previous versions,  you need to configure the serverURL property after initializing the client.

Warning: For EU data residency, project need to be set up inside Amplitude EU and SDK initialized with api key from Amplitude EU first. This method won't work without proper set up first.
[block:code]
{
  "codes": [
    {
      "code": "// For versions starting from 2.34.0\n// No need to call setServerUrl for sending data to Amplitude's EU servers\nclient.setServerZone(AmplitudeServerZone.EU);\n\n// For earlier versions\nclient.setServerUrl(\"https://api.eu.amplitude.com\");",
      "language": "java"
    },
    {
      "code": "// For versions starting from 2.34.0\n// No need to call setServerUrl for sending data to Amplitude's EU servers\nclient.setServerZone(AmplitudeServerZone.EU)\n\n// For earlier versions\nclient.setServerUrl(\"https://api.eu.amplitude.com\")",
      "language": "kotlin"
    }
  ]
}
[/block]
# Sending Events

## Basic Events
Events represent how users interact with your application. For example, “Button Clicked” may be an action you want to track.
[block:code]
{
  "codes": [
    {
      "code": "client.logEvent(\"Button Clicked\");",
      "language": "java"
    }
  ]
}
[/block]
## Events with Properties
Events can also contain properties. They provide context about the event taken. For example, “hover time” may be a relevant event property to “button click."
[block:code]
{
  "codes": [
    {
      "code": "JSONObject eventProperties = new JSONObject();\ntry {\n  eventProperties.put(\"Hover Time\", 10).put(\"prop_2\", \"value_2\");\n} catch (JSONException e) {\n  System.err.println(\"Invalid JSON\");\n  e.printStackTrace();\n}\nclient.logEvent(\"Button Clicked\", eventProperties);\n// Note: You will also need to add two JSONObject imports to the code.\n// import org.json.JSONException;\n// import org.json.JSONObject;",
      "language": "java"
    },
    {
      "code": "val eventProperties = JSONObject() \ntry {\n  eventProperties.put(\"Hover Time\", 10).put(\"prop_2\", \"value_2\")\n} catch (e: JSONException) {\n  System.err.println(\"Invalid JSON\")\n  e.printStackTrace()\n}\nclient.logEvent(\"Button Clicked\", eventProperties)",
      "language": "kotlin"
    }
  ]
}
[/block]
## Flush Events
Events are typically stored in a buffer and flushed periodically. This behavior is configurable. On Android, this is enabled by default.
[block:code]
{
  "codes": [
    {
      "code": "client.setFlushEventsOnClose(false); //Don't flush events ",
      "language": "java"
    }
  ]
}
[/block]
To force SDK to upload any unsent events, the method uploadEvents can be used. Most time you don't need to call this method in Android SDK.

# Set User Properties
[block:callout]
{
  "type": "warning",
  "body": "Please be sure to not track any user data that may be against your privacy terms. If you need any assistance with privacy concerns, then please reach out to our Platform team.",
  "title": "Privacy and Tracking"
}
[/block]
## Identify

Identify is for setting the user properties of a particular user without sending any event. The SDK supports the operations `set`, `setOnce`, `unset`, `add`, `append`, `prepend`, `preInsert`, `postInsert`, and `remove` on individual user properties. The operations are declared via a provided Identify interface. Multiple operations can be chained together in a single Identify object. The Identify object is then passed to the Amplitude client to send to the server. 
[block:callout]
{
  "type": "warning",
  "body": "If the Identify call is sent after the event, the results of operations will be visible immediately in the dashboard user’s profile area, but it will not appear in chart result until another event is sent after the Identify call. So the identify call only affects events going forward. More details [here](https://amplitude.zendesk.com/hc/en-us/articles/115002380567-User-Properties-Event-Properties#applying-user-properties-to-events).",
  "title": "Important Note"
}
[/block]
## Managing User Identity
You can handle the identity of a user using the identify methods. Proper use of these methods can connect events to the correct user as they move across devices, browsers, and other platforms. Send an identify call containing those user property operations (please check the Identify section below) to Amplitude server to tie a user's events with specific user properties.
[block:code]
{
  "codes": [
    {
      "code": "Identify identify = new Identify();\nidentify.set(\"color\", \"green\");\nclient.identify(identify);",
      "language": "java"
    },
    {
      "code": "val identify = Identify()\nidentify[\"color\"] = \"green\"\nclient.identify(identify)",
      "language": "kotlin"
    }
  ]
}
[/block]
### set
`set` sets the value of a user property. You can also chain together multiple identify calls.
[block:code]
{
  "codes": [
    {
      "code": "Identify identify = new Identify().set(\"color\", \"green\");",
      "language": "java"
    },
    {
      "code": "val identify = Identify().set(\"color\", \"green\")",
      "language": "kotlin"
    }
  ]
}
[/block]
### setOnce
`setOnce` sets the value of a user property only once. Subsequent calls using `setOnce` will be ignored.
[block:code]
{
  "codes": [
    {
      "code": "Identify identify = new Identify().setOnce(\"color\", \"green\");",
      "language": "java"
    },
    {
      "code": "val identify = Identify().setOnce(\"color\", \"green\")",
      "language": "kotlin"
    }
  ]
}
[/block]
### add 
`add` increments a user property by some numerical value. If the user property does not have a value set yet, it will be initialized to 0 before being incremented.
[block:code]
{
  "codes": [
    {
      "code": "Identify identify = new Identify().set(\"number_of_clients\", 10);\n//...\nidentify.add(\"number_of_clients\", 5); //15\nidentify.add(\"annual_revenue\", 100);  //100",
      "language": "java"
    },
    {
      "code": "val identify = Identify().set(\"number_of_clients\", 10)\nidentify.add(\"number_of_clients\", 5) //15\nidentify.add(\"annual_revenue\", 100) //100",
      "language": "kotlin"
    }
  ]
}
[/block]
## Setting Multiple User Properties
`logEvent()` method allows you to set the user properties along with event logging. You can use `setUserProperties` as a shorthand to set multiple user properties at once. This method is simply a wrapper around `Identify.set`.
[block:code]
{
  "codes": [
    {
      "code": "JSONObject userProperties = new JSONObject();\ntry {\n  userProperties.put(\"team\", \"red\").put(\"favorite_food\", \"cabbage\");\n} catch (JSONException e) {\n  e.printStackTrace();\n  System.err.println(\"Invalid JSON\");\n}\nclient.setUserProperties(userProperties);\nclient.logEvent(\"event name\");",
      "language": "java"
    },
    {
      "code": "val userProperties = JSONObject()\ntry {\n  userProperties.put(\"team\", \"red\").put(\"favorite_food\", \"cabbage\")\n} catch (e: JSONException) {\n  e.printStackTrace()\n  System.err.println(\"Invalid JSON\")\n}\nclient.setUserProperties(userProperties)\nclient.logEvent(\"event name\")",
      "language": "kotlin"
    }
  ]
}
[/block]
## Arrays in User Properties
Arrays can be used as user properties. You can directly set arrays or use `append` (see section below this one) to generate an array.
[block:code]
{
  "codes": [
    {
      "code": "JSONArray value1 = new JSONArray();\nvalue1.put(1);\nvalue1.put(2);\nvalue1.put(3);\n\nIdentify identify = new Identify();\nidentify.set(\"array value\", value1);",
      "language": "java"
    },
    {
      "code": "val value1 = JSONArray()\nvalue1.put(1)\nvalue1.put(2)\nvalue1.put(3)\n\nval identify = Identify()\nidentify[\"array value\"] = value1",
      "language": "kotlin"
    }
  ]
}
[/block]
### prepend/append
- `append` will append a value or values to a user property array.
- `prepend` will prepend a value or values to a user property.
If the user property does not have a value set yet, it will be initialized to an empty list before the new values are added. If the user property has an existing value and it is not a list, it will be converted into a list with the new value added.
[block:callout]
{
  "type": "info",
  "body": "`prepend` and `append` do not check for duplicates. Please see preInsert and postInsert for that."
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "String property1 = \"array value\";\nJSONArray value1 = new JSONArray();\nvalue1.put(1);\nvalue1.put(2);\nvalue1.put(3);\nIdentify identify = new Identify();\nidentify.append(property1, value1);\nidentify.prepend(\"float value\", 0.625f);",
      "language": "java"
    },
    {
      "code": "val property1 = \"array value\"\nval value1 = JSONArray()\nvalue1.put(1)\nvalue1.put(2)\nvalue1.put(3)\nval identify = Identify()\nidentify.append(property1, value1)\nidentify.prepend(\"float value\", 0.625f)",
      "language": "kotlin"
    }
  ]
}
[/block]
### preInsert/postInsert
- `preInsert` will insert a value or values to the front of a user property array if it does not exist in the array yet.
- `postInsert` will insert a value or values to the end of a user property array if it does not exist in the array yet.

If the user property does not exist, it will be initialized to an empty list before the new values are pre-inserted. If the user property has an existing value, there will be no operation.
[block:code]
{
  "codes": [
    {
      "code": "String property1 = \"array value\";\ndouble[] values = {1, 2, 4, 8};\nIdentify identify = new Identify();\nidentify.postInsert(property1, values);\n\n// identify should ignore this since duplicate key\nidentify.postInsert(property1, 3.0);",
      "language": "java"
    },
    {
      "code": "val property1 = \"array value\"\nval values = doubleArrayOf(1.0, 2.0, 4.0, 8.0)\nval identify = Identify()\nidentify.postInsert(property1, values)\nidentify.postInsert(property1, 3.0)",
      "language": "kotlin"
    }
  ]
}
[/block]
### Clearing User Properties
`clearUserProperties` method is for clearing all user properties at once. This will wipe all of the current user's user properties.
[block:callout]
{
  "type": "danger",
  "title": "The result is irreversible!",
  "body": "Amplitude will not be able to sync the user's user property values before the wipe to any future events that the user triggers as they will have been reset."
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "client.clearUserProperties();",
      "language": "java"
    }
  ]
}
[/block]
### unset
`unset` unsets and removes a user property. 
[block:code]
{
  "codes": [
    {
      "code": "Identify identify = new Identify().setOnce(\"favorite_food\", \"candy\");\nidentify.unset(\"favorite_food\");",
      "language": "java"
    },
    {
      "code": " val identify = Identify().setOnce(\"favorite_food\", \"candy\")\n identify.unset(\"favorite_food\")",
      "language": "kotlin"
    }
  ]
}
[/block]
# Setting User Groups
[block:callout]
{
  "type": "info",
  "title": "",
  "body": "This feature is only available for Growth customers who have purchased the [Accounts add-on](https://amplitude.zendesk.com/hc/en-us/articles/115001765532)."
}
[/block]
Amplitude supports assigning users to groups and performing queries such as Count by Distinct on those groups. An example would be if you want to group your users based on what organization they are in by using an 'orgId'. You can designate Joe to be in 'orgId' '10' while Sue is in 'orgId' '15'. When performing a query in our Event Segmentation chart, you can then select "..performed by" 'orgId' to query the number of different organizations that have performed a specific event. As long as at least one member of that group has performed the specific event, that group will be included in the count.

When setting groups, you will need to define a groupType and groupName(s). In the above example, 'orgId' is the groupType and the values '10' and '15' are groupName(s). Another example of a groupType could be 'sport' with groupName(s) like 'tennis' and 'baseball'. You can use setGroup(groupType, groupName) to designate which groups a user belongs to. Note: This will also set the 'groupType:groupName' as a user property. This will overwrite any existing groupName value set for that user's groupType, as well as the corresponding user property value. groupType is a string and groupName can be either a string or an array of strings to indicate a user being in multiple groups (for example, if Joe is in 'orgId' '10' and '16', then the groupName would be '[10, 16]'). Here is what your code might look like:
[block:code]
{
  "codes": [
    {
      "code": "Amplitude.getInstance().setGroup(\"orgId\", \"15\");\nAmplitude.getInstance().setGroup(\"sport\", new JSONArray().put(\"tennis\").put(\"soccer\"));  // list values",
      "language": "java"
    }
  ]
}
[/block]
You can also use logEventWithGroups to set event-level groups, meaning the group designation only applies for the specific event being logged and does not persist on the user unless you explicitly set it with setGroup:
[block:code]
{
  "codes": [
    {
      "code": "JSONObject eventProperties = new JSONObject().put(\"key\", \"value\");\nJSONObject groups = new JSONObject().put(\"orgId\", 10);\n\nAmplitude.getInstance().logEvent(\"initialize_game\", eventProperties, groups);",
      "language": "java"
    }
  ]
}
[/block]
# Group Identify
(Enterprise only) This feature is only available to Growth and Enterprise customers who have purchased the [Accounts add-on](https://amplitude.zendesk.com/hc/en-us/articles/115001765532).

Use the Group Identify API to set or update properties of particular groups. However, these updates will only affect events going forward. 

The `groupIdentify` method accepts a group type string parameter and group name object parameter, as well as an Identify object that will be applied to the group. 
[block:code]
{
  "codes": [
    {
      "code": "String groupType = \"plan\";\nObject groupName = \"enterprise\";\n\nIdentify identify = new Identify().set(\"key\", \"value\");\nAmplitude.getInstance().groupIdentify(groupType, groupName, identify);",
      "language": "java"
    }
  ]
}
[/block]
An optional `outOfSession` boolean input can be supplied as fourth argument to `groupIdentify`

# Track Revenue
Amplitude can track revenue generated by a user. Revenue is tracked through distinct revenue objects, which have special fields that are used in Amplitude's Event Segmentation and Revenue LTV charts. This allows Amplitude to automatically display data relevant to revenue in the platform. Revenue objects support the following special properties, as well as user-defined properties through the eventProperties field.
[block:code]
{
  "codes": [
    {
      "code": "Revenue revenue = new Revenue().setProductId(\"com.company.productId\").setPrice(3.99).setQuantity(3);\nclient.logRevenueV2(revenue);",
      "language": "java"
    },
    {
      "code": "val revenue = Revenue().setProductId(\"com.company.productId\").setPrice(3.99).setQuantity(3)\nclient.logRevenueV2(revenue)",
      "language": "kotlin"
    }
  ]
}
[/block]
Name |	Type |	Description	| Default
-----|-------|--------------|--------
productId (optional) | string	 | An identifier for the product. We recommend something like the Google Play Store product ID. | null
quantity *(required)* | int	| The quantity of products purchased. Note: revenue = quantity * price | 1
price *(required)* | Double	| The price of the products purchased, and this can be negative. Note: revenue = quantity * price | null
revenueType (optional, *required for revenue verification*) | String	| The type of revenue (e.g. tax, refund, income). | null
receipt (optional) | String	| The type of revenue (e.g. tax, refund, income). | null
receiptSignature (optional, *required for revenue verification*) | String	| The type of revenue (e.g. tax, refund, income). | null
eventProperties (optional) | JSONObject	| An object of event properties to include in the revenue event.	| null
[block:callout]
{
  "type": "info",
  "title": "",
  "body": "Price can be negative, which may be useful for tracking revenue lost (such as refunds or costs)"
}
[/block]

[block:callout]
{
  "type": "warning",
  "body": "Amplitude currently does not support currency conversion. All revenue data should be normalized to a currency of choice before being sent to Amplitude.\n\nThe logRevenue() API is deprecated, and the logRevenueV2() API should be used going forward."
}
[/block]
# Revenue Verification
The logRevenue method also supports revenue validation.

By default, revenue events recorded on the Android SDK will appear in Amplitude as **[Amplitude] Revenue (Unverified)** events. To enable revenue verification, copy your Google Play License Public Key into the Sources & Destinations section of your project in Amplitude. You must put in a key for every single project in Amplitude where you want revenue to be verified.

There are two main Android  libraries for revenue verificaitons: AIDL and Google Play Billing. AIDL is the older and deprecated one. See [this Google guide](https://developer.android.com/google/play/billing/migrate) on how to migrate, as well as the class specification for the [Purchase class]
(https://developer.android.com/reference/com/android/billingclient/api/Purchase). Please see the code examples below for the two different libraries, in Java or Kotlin.

After a successful purchase transaction, add the purchase data and receipt signature to the Revenue object:
[block:code]
{
  "codes": [
    {
      "code": "// For AIDL (old deprecated library)\n\nIntent data = ...;\n\nString purchaseData = data.getStringExtra(\"PURCHASE_DATA\");\nString dataSignature = data.getStringExtra(\"DATA_SIGNATURE\");\n\nRevenue revenue = new Revenue().setProductId(\"com.company.productId\").setQuantity(1);\nrevenue.setPrice(3.99).setReceipt(purchaseData, dataSignature);\n\nclient.logRevenueV2(revenue);",
      "language": "java"
    },
    {
      "code": "//For Google Play Billing Library\npublic class MyBillingImpl implements PurchasesUpdatedListener {\n    private BillingClient billingClient;\n    //...\n\n    public void initialize() {\n        billingClient = BillingClient.newBuilder(activity).setListener(this).build();\n        billingClient.startConnection(new BillingClientStateListener() {\n            @Override\n            public void onBillingSetupFinished(BillingResult billingResult) {\n                // Logic from ServiceConnection.onServiceConnected should be moved here.\n            }\n\n            @Override\n            public void onBillingServiceDisconnected() {\n                // Logic from ServiceConnection.onServiceDisconnected should be moved here.\n            }\n        });\n    }\n\n    @Override\n    public void onPurchasesUpdated(\n        @BillingResponse int responseCode, @Nullable List<Purchase> purchases) {\n        //Here is the important part. \n      \tfor (Purchase purchase: purchases) {\n          Revenue revenue = new Revenue()\n            .setProductId(\"com.company.productId\")\n            .setQuantity(1)\n            .setPrice(price);\n          revenue.setReceipt(purchase.getOriginalJson(), purchase.getSignature());\n          client.logRevenueV2(revenue);\n        }\n    }\n}",
      "language": "java"
    },
    {
      "code": "// For AIDL (old deprecated library)\n        \nIntent data = ...\n\nval purchaseData: String = data.getStringExtra(\"PURCHASE_DATA\")\nval dataSignature: String = data.getStringExtra(\"DATA_SIGNATURE\")\n\nval revenue = Revenue().setProductId(\"com.company.productId\").setQuantity(1)\nrevenue.setPrice(3.99).setReceipt(purchaseData, dataSignature)\n\nclient.logRevenueV2(revenue)",
      "language": "kotlin"
    },
    {
      "code": "class MyBillingImpl(private var billingClient: BillingClient) : PurchasesUpdatedListener {\n\n    init {\n        billingClient = BillingClient.newBuilder(activity).setListener(this).build()\n        billingClient.startConnection(object : BillingClientStateListener {\n            override fun onBillingSetupFinished(billingResult: BillingResult?) {\n                // Logic from ServiceConnection.onServiceConnected should be moved here.\n            }\n\n            override fun onBillingServiceDisconnected() {\n                // Logic from ServiceConnection.onServiceDisconnected should be moved here.\n            }\n        })\n    }\n\n    override fun onPurchasesUpdated(\n        billingResult: BillingResult?,\n        purchases: MutableList<Purchase>?\n    ) {\n        // Logic from onActivityResult should be moved here.\n      \tfor (Purchase purchase: purchases) {\n          Revenue revenue = new Revenue()\n            .setProductId(\"com.company.productId\")\n            .setQuantity(1)\n            .setPrice(price);\n          revenue.setReceipt(purchase.getOriginalJson(), purchase.getSignature());\n          client.logRevenueV2(revenue);\n        }\n    }\n}\n",
      "language": "kotlin"
    }
  ]
}
[/block]
### Amazon Store Revenue Verification
For purchases on the Amazon store, you should copy your Amazon Developer Shared Secret into the Sources & Destinations section of your project in Amplitude. After a successful purchase transaction, you should send the purchase token (For Amazon IAP 2.0 use receipt id) as the 'receipt' and the User ID as the 'receiptSignature':
[block:code]
{
  "codes": [
    {
      "code": "// for a purchase request onActivityResult\nString purchaseToken = purchaseResponse.getReceipt();\nString userId = getUserIdResponse.getUserId();\n\nRevenue revenue = new Revenue().setProductId(\"com.company.productId\").setQuantity(1);\nrevenue.setPrice(3.99).setReceipt(purchaseToken, userId);\n\nclient.logRevenueV2(revenue);",
      "language": "java"
    }
  ]
}
[/block]
# User Sessions
A session on Android is a period of time that a user has the app in the foreground. 

Amplitude groups events together by session. Events that are logged within the same session will have the same `session_id`. Sessions are handled automatically so you do not have to manually call an API like `startSession()` or `endSession()`.

You can adjust the time window for which sessions are extended.
[block:code]
{
  "codes": [
    {
      "code": "client.setMinTimeBetweenSessionsMillis(10000); //Must be a 'long'; 10 seconds",
      "language": "java"
    }
  ]
}
[/block]
By default, '[Amplitude] Start Session' and '[Amplitude] End Session' events are not sent. Even though these events are not sent, sessions are still tracked by using session_id. To enable those session events, add this line before initializing the SDK.
[block:code]
{
  "codes": [
    {
      "code": "Amplitude.getInstance().trackSessionEvents(true);",
      "language": "java"
    }
  ]
}
[/block]
You can also log events as out-of-session. Out-of-session events have a `session_id` of `-1` and are not considered part of the current session, meaning they do not extend the current session. This might be useful if you are logging events triggered by push notifications, for example. You can log events as out-of-session by setting the input parameter `outOfSession` to true when calling `logEvent()`.
[block:code]
{
  "codes": [
    {
      "code": "JSONObject eventProperties = //...\n  \n//This event is now out of session\nclient.logEvent(\"event type\", eventProperties, true);",
      "language": "java"
    }
  ]
}
[/block]
You can also log identify events as out-of-session, which is useful if you are updating user properties in the background and do not want to start a new session. You can do this by setting the input parameter outOfSession to true when calling `identify()`.
[block:code]
{
  "codes": [
    {
      "code": "Identify identify = new Identify().set(\"key\", \"value\");\nAmplitude.getInstance().identify(identify, true);",
      "language": "java"
    }
  ]
}
[/block]
You may also manually start a new session with its own ID.
[block:code]
{
  "codes": [
    {
      "code": "long sessionId = ...;\nclient.startNewSessionIfNeeded(sessionId);",
      "language": "java"
    }
  ]
}
[/block]
You can use the helper method getSessionId to get the value of the current sessionId.
[block:code]
{
  "codes": [
    {
      "code": "long sessionId = Amplitude.getInstance().getSessionId();",
      "language": "java"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "",
  "body": "For Android API level 14 and above, a new session is created when the app comes back into the foreground after being in the background for five or more minutes or when the last event was logged (whichever occurred last). Otherwise, the background event logged will be part of the current session. Note that you can define your own session expiration time by calling setMinTimeBetweenSessionsMillis(timeout), where the timeout input is in milliseconds.\n\nFor Android API level 13 and below, foreground tracking is not available so a new session is automatically started when an event is logged 30 minutes or more after the last logged event. If another event is logged within 30 minutes, it will extend the current session. Note that you can define your own session expiration time here as well by calling setSessionTimeoutMillis(timeout), where the timeout input is in milliseconds. Also note that enableForegroundTracking(getApplication) is still safe to call for Android API level 13 and below even though it is not available."
}
[/block]
# Setting Custom User ID

If your app has its own login system that you want to track users with, you can call setUserId at any time.
[block:code]
{
  "codes": [
    {
      "code": "client.setUserId(\"USER_ID\");",
      "language": "java"
    }
  ]
}
[/block]
You can also add the User ID as an argument to the init call.
[block:code]
{
  "codes": [
    {
      "code": "client.initialize(this, \"API_KEY\", \"USER_ID\");",
      "language": "java"
    }
  ]
}
[/block]
You should not assign users a User ID that could change as each unique User ID is interpreted as a unique user in Amplitude. Please see our article on how we identify and count unique users for further information.

# Log Level
The log level allows you to set the level of logs printed to be printed in the developer console. The different levels are as follows:

* 'INFO': This option will show error messages, warnings, and informative messages that may be useful for debugging.
* 'WARN': This option will show error messages and warnings. This level will log issues that might be a problem and cause some oddities in the data. For example, this level would display a warning for properties with null values.
* 'ERROR': This option will show error messages only.
* 'DISABLE': This will suppress all log messages.

You can set the log level by calling the following on Android:
[block:code]
{
  "codes": [
    {
      "code": "Amplitude.getInstance().setLogLevel(log.DEBUG)",
      "language": "java"
    }
  ]
}
[/block]
# Log Out and Anonymous Users

A user's data will be [merged](https://help.amplitude.com/hc/en-us/articles/115003135607) on the backend so that any events up to that point from the same browser will be tracked under the same user. If a user logs out or you want to log the events under an anonymous user, you will need to:

1. Set the userId to null.
2. Regenerate a new deviceId.

After doing that, events coming from the current user/device will appear as a brand new user in Amplitude. Note: If you choose to do this, you will not be able to see that the two users were using the same device. 
[block:code]
{
  "codes": [
    {
      "code": "client.setUserId(null);\nclient.regenerateDeviceId();",
      "language": "java"
    }
  ]
}
[/block]
# Advanced Topics

## Disable Tracking
By default the Android SDK will track several user properties such as carrier, city, country, ip_address, language, platform, etc. You can use the provided `TrackingOptions` interface to customize and disable individual fields.

To use the `TrackingOptions` interface, you will first need to import the class.
[block:code]
{
  "codes": [
    {
      "code": "import com.amplitude.api.TrackingOptions;",
      "language": "java"
    }
  ]
}
[/block]
Before initializing the SDK with your apiKey, create a `TrackingOptions` instance with your configuration and set it on the SDK instance
[block:code]
{
  "codes": [
    {
      "code": "TrackingOptions options = new TrackingOptions().disableCity().disableIpAddress().disableLatLng();\nAmplitude.getInstance().setTrackingOptions(options);",
      "language": "java"
    }
  ]
}
[/block]
Each field can be individually disabled and has a corresponding disable method (for example, disableCountry, disableLanguage, etc.). This table describes the different methods:

Method | Description
-------|------------
disableAdid() | Disable tracking of Google ADID
disableCarrier() | Disable tracking of device's carrier
disableCity() | Disable tracking of user's city
disableCountry() | Disable tracking of user's country
disableDeviceBrand() | Disable tracking of device brand
disableDeviceModel() | Disable tracking of device model
disableDma() | Disable tracking of user's dma
disableIpAddress() | Disable tracking of user's ip address
disableLanguage() | Disable tracking of device's language
disableLatLng() | Disable tracking of user's current lattitude and longitude coordinates
disableOsName() | Disable tracking of device's OS Name
disableOsVersion() | Disable tracking of device's OS Version
disablePlatform() | Disable tracking of device's platform
disableRegion() | Disable tracking of user's couregiontry
disableVersionName() | Disable tracking of your app's version name
[block:callout]
{
  "type": "warning",
  "body": "The *TrackingOptions* will only prevent default properties from being tracked on **newly created** projects, where data has not yet been sent. If you have a project with existing data that you would like to stop collecting the default properties for, please contact our Support team at support.amplitude.com. Note that the existing data will not be deleted.",
  "title": "Important Note"
}
[/block]
## COPPA Control
COPPA (Children's Online Privacy Protection Act) restrictions on IDFA, IDFV, city, IP address and location tracking can be enabled or disabled all at once. Remember that apps asking for information from children under 13 years of age must comply with COPPA.
[block:code]
{
  "codes": [
    {
      "code": "client.enableCoppaControl(); //Disables ADID, city, IP, and location tracking",
      "language": "java"
    }
  ]
}
[/block]
## Advertising ID
Advertiser ID (also referred to as IDFA) is a unique identifier provided by the iOS and Google Play stores. As it is unique to every person and not just their devices, it is useful for mobile attribution. [Mobile attribution](https://www.adjust.com/blog/mobile-ad-attribution-introduction-for-beginners/) is the attribution of an installation of a mobile app to its original source (e.g. ad campaign, app store search). Mobile apps need permission to ask for IDFA, and apps targeted to children cannot track at all. Consider IDFV, device id, or an email login system as alternatives when IDFA is not available. 

Follow the three steps below to use Android Ad ID.
[block:callout]
{
  "type": "danger",
  "title": "Google Ad ID / Tracking Warning!",
  "body": "[Google will allow users to opt out of Ad ID tracking in Q4 for Android 12 devices, and in 2022 for all Android devices](https://support.google.com/googleplay/android-developer/answer/6048248?hl=en). Ad ID may return null or error. See the next section on the alternative ID called 'App Set ID', which is unique to every app install on a device."
}
[/block]
### 1. Add play-services-ads as a dependency.
```
dependencies {
  implementation 'com.google.android.gms:play-services-ads:18.3.0'
}
```

### 2. AD_MANAGER_APP Permission
If you use Google Mobile Ads SDK version 17.0.0 above, you need to add AD_MANAGER_APP to `AndroidManifest.xml`.
```
<manifest>
    <application>
        <meta-data
            android:name="com.google.android.gms.ads.AD_MANAGER_APP"
            android:value="true"/>
    </application>
</manifest>
```

### 3. Add Proguard exception
Amplitude Android SDK uses Java Reflection to use classes in Google Play Services. For Amplitude SDKs to work properly in your Android application, please add these exceptions to `proguard.pro` for the classes from `play-services-ads`.
```-keep class com.google.android.gms.ads.** { *; }```

### Set Advertising ID as Device ID
After you set up the logic to fetch the advertising ID, you can also call this useAdvertisingIdForDeviceId API to set it as your device ID.
[block:code]
{
  "codes": [
    {
      "code": "client.useAdvertisingIdForDeviceId();",
      "language": "java"
    }
  ]
}
[/block]
## App Set ID
'App Set ID' is unique to every app install on a device. App Set ID can be reset by the user manually, when they uninstall the app, or after 13 months of not opening the app. Google intends this as a privacy-friendly alternative to Ad ID for users who wish to opt out of stronger analytics.

### 1. Add `play-services-appset` as a dependency
```
dependencies {
    implementation 'com.google.android.gms:play-services-appset:16.0.0-alpha1'
}
```

### 2. Set App Set ID as Device ID
[block:code]
{
  "codes": [
    {
      "code": "client.useAppSetIdForDeviceId();",
      "language": "java"
    }
  ]
}
[/block]
## Location Tracking
Amplitude converts the IP of a user event into a location (GeoIP lookup) by default. This information may be overridden by an app’s own tracking solution or user data.

Amplitude can access the Android location service (if possible) to add the specific coordinates (longitude and latitude) where an event is logged. This behavior is enabled by default but can be adjusted by calling the following methods after initializing:
[block:code]
{
  "codes": [
    {
      "code": "client.enableLocationListening();\nclient.disableLocationListening();",
      "language": "java"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "warning",
  "title": "Proguard",
  "body": "If you use Proguard obfuscation, please also add the following exception to the file:\n`-keep class com.google.android.gms.common.** { *; }`"
}
[/block]
## Opt Out of Tracking
Users may wish to opt out of tracking entirely, which means no events and no records of their browsing history. This API provides a way to fulfill certain users’ requests for privacy.
[block:code]
{
  "codes": [
    {
      "code": "client.setOptOut(true); //Disables all tracking of events for this user",
      "language": "java"
    }
  ]
}
[/block]
## Push Notification Events

Push notification events should not be sent client-side via the Android SDK because a user must open the app to initialize the Amplitude SDK in order for the SDK to send the event. Therefore, if push notification events are tracked client-side then there can be data delays as the push notification event will not be sent to Amplitude's servers until the next time the user opens the app.

You can use our <a href='https://amplitude.com/integrations?category=mobile-marketing-automation'>mobile marketing automation partners</a> or our [HTTP API V2](doc:http-api-v2) to send push notification events to Amplitude.

## Event Explorer
To use Event Explorer, you will need to know either `deviceId` or `userId` to look up live events. Android SDKs provide functionalities to view them while using a debug build.

First, add the following code into your `AndroidManifest.xml`.
[block:code]
{
  "codes": [
    {
      "code": "<activity\n            android:name=\"com.amplitude.eventexplorer.EventExplorerInfoActivity\"\n            android:exported=\"true\"\n            android:screenOrientation=\"portrait\"\n            />",
      "language": "xml"
    }
  ]
}
[/block]
Second, add the following code in your root activity's onCreate life cycle.
[block:code]
{
  "codes": [
    {
      "code": "@Override\npublic void onCreate(Bundle savedInstanceState) {\n  //...\n  client.showEventExplorer(this);\n  //...\n}",
      "language": "java"
    }
  ]
}
[/block]

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/c08c057-android_event_explorer.png",
        "android_event_explorer.png",
        2160,
        1920,
        "#666666"
      ]
    }
  ]
}
[/block]
## Dynamic Configuration

Android SDK allows users to configure their apps to use [dynamic configuration](https://developers.amplitude.com/docs/dynamic-configuration). This feature will find the best server url automatically based on app users' geo location.

- If you have your own proxy server and use setServerUrl API, please leave this OFF.
- If you have users in China Mainland, we suggest you turn this on.
- By default, this feature is OFF. So you need to explicitly set it to ON to use it.
- By default, this feature returns server url for Amplitude's US servers, if you need to send data to Amplitude's EU servers, please use setServerZone to set it to EU zone.
[block:code]
{
  "codes": [
    {
      "code": "client.setUseDynamicConfig(true);",
      "language": "java"
    }
  ]
}
[/block]
## SSL Pinning
SSL Pinning is a technique on the client side to avoid man-in-the-middle attacks by validating the server certificates again even after SSL handshaking. Please contact Amplitude Support before you ship any products with SSL pinning enabled so we are aware.

To use SSL Pinning in the Android SDK, use the class `PinnedAmplitudeClient` instead of `AmplitudeClient` to turn it on.

## Set Log Callback
Amplitude Android SDK allows the app to set a callback (version 2.32.2+).  Creating a class and setting the callback would help with collecting any error messages from the SDK in a production environment. Below is an example:
[block:code]
{
  "codes": [
    {
      "code": "class SampleLogCallback implements AmplitudeLogCallback {\n  @Override\n    public void onError(String tag, String message) {\n    // handling of error message\n  }\n}\nSampleLogCallback callback = new SampleLogCallback();\nclient.setLogCallback(callback);",
      "language": "java"
    }
  ]
}
[/block]
# Need Help?

If you have any problems or issues over our SDK, feel free to [create a github issue](https://github.com/amplitude/Amplitude-Android/issues/new) or submit a request on [Amplitude Help](https://help.amplitude.com/hc/en-us/requests/new).
---
[![Maven Central](https://img.shields.io/maven-central/v/com.amplitude/android-sdk.svg?label=Maven%20Central)](https://search.maven.org/search?q=g:%22com.amplitude%22%20AND%20a:%22android-sdk%22)

# SDK Installation

## 1. Add dependencies
- We recommend using Android Studio as an IDE and Gradle to manage dependencies.
- In `build.gradle` file, please add the following dependencies. OkHttp is needed for our SDK.
```
dependencies {
  implementation 'com.amplitude:android-sdk:2.34.1'
  implementation 'com.squareup.okhttp3:okhttp:4.2.2'
}
```
- Sync project with gradle files.

## 2. Add permissions
To report events to Amplitude, add the INTERNET permission to your `AndroidManifest.xml` file.
```<uses-permission android:name="android.permission.INTERNET" />```

For Android 6.0 (Marshmallow) and above, explicitly add the `READ_PHONE_STATE` permission to fetch phone related information.
```<uses-permission android:name="android.permission.READ_PHONE_STATE" />```

# Importing
Import Amplitude into any file that uses it.
[block:code]
{
  "codes": [
    {
      "code": "import com.amplitude.api.Amplitude;\nimport com.amplitude.api.AmplitudeClient;\n/*\nImport any more files that are needed, use the SDK reference\nhttp://amplitude.github.io/Amplitude-Android/\n*/",
      "language": "java"
    }
  ]
}
[/block]
# Initialization
Initialization is necessary before any instrumentation is done. The API key for your Amplitude project is required. We recommend but do not require putting this in `onCreate(...)` of your Activity class. However, the Android SDK can be used anywhere after it is initialized anywhere in an Android application. 
[block:code]
{
  "codes": [
    {
      "code": "AmplitudeClient client = Amplitude.getInstance()\n  .initialize(getApplicationContext(), \"YOUR_API_KEY_HERE\")\n  .enableForegroundTracking(getApplication());",
      "language": "java"
    },
    {
      "code": "val client = Amplitude.getInstance()\n  .initialize(getApplicationContext(), \"YOUR_API_KEY_HERE\")\n  .enableForegroundTracking(application)",
      "language": "kotlin"
    }
  ]
}
[/block]
Note that `enableForegroundTracking(getApplication())` is necessary for accurate session tracking and off by default. 

`Amplitude.getInstance(String name)` may optionally take a name which uniquely holds settings. This instance is now linked to the name and can be retrieved somewhere else.  
[block:code]
{
  "codes": [
    {
      "code": "AmplitudeClient client1 = Amplitude.getInstance(\"Andy_Client\");\nAmplitudeClient client2 = Amplitude.getInstance(\"Bob_Client\");\n\n//In the same file, or a different activity in the app\nAmplitudeClient sameClient = Amplitude.getInstance(\"Andy_Client\");",
      "language": "java"
    },
    {
      "code": "val client1 = Amplitude.getInstance(\"Andy_Client\")\nval client2 = Amplitude.getInstance(\"Bob_Client\")\n\n//In the same file, or a different activity in the app\nval sameClient = Amplitude.getInstance(\"Andy_Client\")",
      "language": "kotlin"
    }
  ]
}
[/block]
# EU Data Residency
Starting from version 2.34.0, you can configure the server zone after initializing the client for sending data to Amplitude's EU servers. SDK will switch and send data based on the server zone if it is set. The server zone config supports dynamic configuration as well. 

For previous versions,  you need to configure the serverURL property after initializing the client.

Warning: For EU data residency, project need to be set up inside Amplitude EU and SDK initialized with api key from Amplitude EU first. This method won't work without proper set up first.
[block:code]
{
  "codes": [
    {
      "code": "// For versions starting from 2.34.0\n// No need to call setServerUrl for sending data to Amplitude's EU servers\nclient.setServerZone(AmplitudeServerZone.EU);\n\n// For earlier versions\nclient.setServerUrl(\"https://api.eu.amplitude.com\");",
      "language": "java"
    },
    {
      "code": "// For versions starting from 2.34.0\n// No need to call setServerUrl for sending data to Amplitude's EU servers\nclient.setServerZone(AmplitudeServerZone.EU)\n\n// For earlier versions\nclient.setServerUrl(\"https://api.eu.amplitude.com\")",
      "language": "kotlin"
    }
  ]
}
[/block]
# Sending Events

## Basic Events
Events represent how users interact with your application. For example, “Button Clicked” may be an action you want to track.
[block:code]
{
  "codes": [
    {
      "code": "client.logEvent(\"Button Clicked\");",
      "language": "java"
    }
  ]
}
[/block]
## Events with Properties
Events can also contain properties. They provide context about the event taken. For example, “hover time” may be a relevant event property to “button click."
[block:code]
{
  "codes": [
    {
      "code": "JSONObject eventProperties = new JSONObject();\ntry {\n  eventProperties.put(\"Hover Time\", 10).put(\"prop_2\", \"value_2\");\n} catch (JSONException e) {\n  System.err.println(\"Invalid JSON\");\n  e.printStackTrace();\n}\nclient.logEvent(\"Button Clicked\", eventProperties);\n// Note: You will also need to add two JSONObject imports to the code.\n// import org.json.JSONException;\n// import org.json.JSONObject;",
      "language": "java"
    },
    {
      "code": "val eventProperties = JSONObject() \ntry {\n  eventProperties.put(\"Hover Time\", 10).put(\"prop_2\", \"value_2\")\n} catch (e: JSONException) {\n  System.err.println(\"Invalid JSON\")\n  e.printStackTrace()\n}\nclient.logEvent(\"Button Clicked\", eventProperties)",
      "language": "kotlin"
    }
  ]
}
[/block]
## Flush Events
Events are typically stored in a buffer and flushed periodically. This behavior is configurable. On Android, this is enabled by default.
[block:code]
{
  "codes": [
    {
      "code": "client.setFlushEventsOnClose(false); //Don't flush events ",
      "language": "java"
    }
  ]
}
[/block]
To force SDK to upload any unsent events, the method uploadEvents can be used. Most time you don't need to call this method in Android SDK.

# Set User Properties
[block:callout]
{
  "type": "warning",
  "body": "Please be sure to not track any user data that may be against your privacy terms. If you need any assistance with privacy concerns, then please reach out to our Platform team.",
  "title": "Privacy and Tracking"
}
[/block]
## Identify

Identify is for setting the user properties of a particular user without sending any event. The SDK supports the operations `set`, `setOnce`, `unset`, `add`, `append`, `prepend`, `preInsert`, `postInsert`, and `remove` on individual user properties. The operations are declared via a provided Identify interface. Multiple operations can be chained together in a single Identify object. The Identify object is then passed to the Amplitude client to send to the server. 
[block:callout]
{
  "type": "warning",
  "body": "If the Identify call is sent after the event, the results of operations will be visible immediately in the dashboard user’s profile area, but it will not appear in chart result until another event is sent after the Identify call. So the identify call only affects events going forward. More details [here](https://amplitude.zendesk.com/hc/en-us/articles/115002380567-User-Properties-Event-Properties#applying-user-properties-to-events).",
  "title": "Important Note"
}
[/block]
## Managing User Identity
You can handle the identity of a user using the identify methods. Proper use of these methods can connect events to the correct user as they move across devices, browsers, and other platforms. Send an identify call containing those user property operations (please check the Identify section below) to Amplitude server to tie a user's events with specific user properties.
[block:code]
{
  "codes": [
    {
      "code": "Identify identify = new Identify();\nidentify.set(\"color\", \"green\");\nclient.identify(identify);",
      "language": "java"
    },
    {
      "code": "val identify = Identify()\nidentify[\"color\"] = \"green\"\nclient.identify(identify)",
      "language": "kotlin"
    }
  ]
}
[/block]
### set
`set` sets the value of a user property. You can also chain together multiple identify calls.
[block:code]
{
  "codes": [
    {
      "code": "Identify identify = new Identify().set(\"color\", \"green\");",
      "language": "java"
    },
    {
      "code": "val identify = Identify().set(\"color\", \"green\")",
      "language": "kotlin"
    }
  ]
}
[/block]
### setOnce
`setOnce` sets the value of a user property only once. Subsequent calls using `setOnce` will be ignored.
[block:code]
{
  "codes": [
    {
      "code": "Identify identify = new Identify().setOnce(\"color\", \"green\");",
      "language": "java"
    },
    {
      "code": "val identify = Identify().setOnce(\"color\", \"green\")",
      "language": "kotlin"
    }
  ]
}
[/block]
### add 
`add` increments a user property by some numerical value. If the user property does not have a value set yet, it will be initialized to 0 before being incremented.
[block:code]
{
  "codes": [
    {
      "code": "Identify identify = new Identify().set(\"number_of_clients\", 10);\n//...\nidentify.add(\"number_of_clients\", 5); //15\nidentify.add(\"annual_revenue\", 100);  //100",
      "language": "java"
    },
    {
      "code": "val identify = Identify().set(\"number_of_clients\", 10)\nidentify.add(\"number_of_clients\", 5) //15\nidentify.add(\"annual_revenue\", 100) //100",
      "language": "kotlin"
    }
  ]
}
[/block]
## Setting Multiple User Properties
`logEvent()` method allows you to set the user properties along with event logging. You can use `setUserProperties` as a shorthand to set multiple user properties at once. This method is simply a wrapper around `Identify.set`.
[block:code]
{
  "codes": [
    {
      "code": "JSONObject userProperties = new JSONObject();\ntry {\n  userProperties.put(\"team\", \"red\").put(\"favorite_food\", \"cabbage\");\n} catch (JSONException e) {\n  e.printStackTrace();\n  System.err.println(\"Invalid JSON\");\n}\nclient.setUserProperties(userProperties);\nclient.logEvent(\"event name\");",
      "language": "java"
    },
    {
      "code": "val userProperties = JSONObject()\ntry {\n  userProperties.put(\"team\", \"red\").put(\"favorite_food\", \"cabbage\")\n} catch (e: JSONException) {\n  e.printStackTrace()\n  System.err.println(\"Invalid JSON\")\n}\nclient.setUserProperties(userProperties)\nclient.logEvent(\"event name\")",
      "language": "kotlin"
    }
  ]
}
[/block]
## Arrays in User Properties
Arrays can be used as user properties. You can directly set arrays or use `append` (see section below this one) to generate an array.
[block:code]
{
  "codes": [
    {
      "code": "JSONArray value1 = new JSONArray();\nvalue1.put(1);\nvalue1.put(2);\nvalue1.put(3);\n\nIdentify identify = new Identify();\nidentify.set(\"array value\", value1);",
      "language": "java"
    },
    {
      "code": "val value1 = JSONArray()\nvalue1.put(1)\nvalue1.put(2)\nvalue1.put(3)\n\nval identify = Identify()\nidentify[\"array value\"] = value1",
      "language": "kotlin"
    }
  ]
}
[/block]
### prepend/append
- `append` will append a value or values to a user property array.
- `prepend` will prepend a value or values to a user property.
If the user property does not have a value set yet, it will be initialized to an empty list before the new values are added. If the user property has an existing value and it is not a list, it will be converted into a list with the new value added.
[block:callout]
{
  "type": "info",
  "body": "`prepend` and `append` do not check for duplicates. Please see preInsert and postInsert for that."
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "String property1 = \"array value\";\nJSONArray value1 = new JSONArray();\nvalue1.put(1);\nvalue1.put(2);\nvalue1.put(3);\nIdentify identify = new Identify();\nidentify.append(property1, value1);\nidentify.prepend(\"float value\", 0.625f);",
      "language": "java"
    },
    {
      "code": "val property1 = \"array value\"\nval value1 = JSONArray()\nvalue1.put(1)\nvalue1.put(2)\nvalue1.put(3)\nval identify = Identify()\nidentify.append(property1, value1)\nidentify.prepend(\"float value\", 0.625f)",
      "language": "kotlin"
    }
  ]
}
[/block]
### preInsert/postInsert
- `preInsert` will insert a value or values to the front of a user property array if it does not exist in the array yet.
- `postInsert` will insert a value or values to the end of a user property array if it does not exist in the array yet.

If the user property does not exist, it will be initialized to an empty list before the new values are pre-inserted. If the user property has an existing value, there will be no operation.
[block:code]
{
  "codes": [
    {
      "code": "String property1 = \"array value\";\ndouble[] values = {1, 2, 4, 8};\nIdentify identify = new Identify();\nidentify.postInsert(property1, values);\n\n// identify should ignore this since duplicate key\nidentify.postInsert(property1, 3.0);",
      "language": "java"
    },
    {
      "code": "val property1 = \"array value\"\nval values = doubleArrayOf(1.0, 2.0, 4.0, 8.0)\nval identify = Identify()\nidentify.postInsert(property1, values)\nidentify.postInsert(property1, 3.0)",
      "language": "kotlin"
    }
  ]
}
[/block]
### Clearing User Properties
`clearUserProperties` method is for clearing all user properties at once. This will wipe all of the current user's user properties.
[block:callout]
{
  "type": "danger",
  "title": "The result is irreversible!",
  "body": "Amplitude will not be able to sync the user's user property values before the wipe to any future events that the user triggers as they will have been reset."
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "client.clearUserProperties();",
      "language": "java"
    }
  ]
}
[/block]
### unset
`unset` unsets and removes a user property. 
[block:code]
{
  "codes": [
    {
      "code": "Identify identify = new Identify().setOnce(\"favorite_food\", \"candy\");\nidentify.unset(\"favorite_food\");",
      "language": "java"
    },
    {
      "code": " val identify = Identify().setOnce(\"favorite_food\", \"candy\")\n identify.unset(\"favorite_food\")",
      "language": "kotlin"
    }
  ]
}
[/block]
# Setting User Groups
[block:callout]
{
  "type": "info",
  "title": "",
  "body": "This feature is only available for Growth customers who have purchased the [Accounts add-on](https://amplitude.zendesk.com/hc/en-us/articles/115001765532)."
}
[/block]
Amplitude supports assigning users to groups and performing queries such as Count by Distinct on those groups. An example would be if you want to group your users based on what organization they are in by using an 'orgId'. You can designate Joe to be in 'orgId' '10' while Sue is in 'orgId' '15'. When performing a query in our Event Segmentation chart, you can then select "..performed by" 'orgId' to query the number of different organizations that have performed a specific event. As long as at least one member of that group has performed the specific event, that group will be included in the count.

When setting groups, you will need to define a groupType and groupName(s). In the above example, 'orgId' is the groupType and the values '10' and '15' are groupName(s). Another example of a groupType could be 'sport' with groupName(s) like 'tennis' and 'baseball'. You can use setGroup(groupType, groupName) to designate which groups a user belongs to. Note: This will also set the 'groupType:groupName' as a user property. This will overwrite any existing groupName value set for that user's groupType, as well as the corresponding user property value. groupType is a string and groupName can be either a string or an array of strings to indicate a user being in multiple groups (for example, if Joe is in 'orgId' '10' and '16', then the groupName would be '[10, 16]'). Here is what your code might look like:
[block:code]
{
  "codes": [
    {
      "code": "Amplitude.getInstance().setGroup(\"orgId\", \"15\");\nAmplitude.getInstance().setGroup(\"sport\", new JSONArray().put(\"tennis\").put(\"soccer\"));  // list values",
      "language": "java"
    }
  ]
}
[/block]
You can also use logEventWithGroups to set event-level groups, meaning the group designation only applies for the specific event being logged and does not persist on the user unless you explicitly set it with setGroup:
[block:code]
{
  "codes": [
    {
      "code": "JSONObject eventProperties = new JSONObject().put(\"key\", \"value\");\nJSONObject groups = new JSONObject().put(\"orgId\", 10);\n\nAmplitude.getInstance().logEvent(\"initialize_game\", eventProperties, groups);",
      "language": "java"
    }
  ]
}
[/block]
# Group Identify
(Enterprise only) This feature is only available to Growth and Enterprise customers who have purchased the [Accounts add-on](https://amplitude.zendesk.com/hc/en-us/articles/115001765532).

Use the Group Identify API to set or update properties of particular groups. However, these updates will only affect events going forward. 

The `groupIdentify` method accepts a group type string parameter and group name object parameter, as well as an Identify object that will be applied to the group. 
[block:code]
{
  "codes": [
    {
      "code": "String groupType = \"plan\";\nObject groupName = \"enterprise\";\n\nIdentify identify = new Identify().set(\"key\", \"value\");\nAmplitude.getInstance().groupIdentify(groupType, groupName, identify);",
      "language": "java"
    }
  ]
}
[/block]
An optional `outOfSession` boolean input can be supplied as fourth argument to `groupIdentify`

# Track Revenue
Amplitude can track revenue generated by a user. Revenue is tracked through distinct revenue objects, which have special fields that are used in Amplitude's Event Segmentation and Revenue LTV charts. This allows Amplitude to automatically display data relevant to revenue in the platform. Revenue objects support the following special properties, as well as user-defined properties through the eventProperties field.
[block:code]
{
  "codes": [
    {
      "code": "Revenue revenue = new Revenue().setProductId(\"com.company.productId\").setPrice(3.99).setQuantity(3);\nclient.logRevenueV2(revenue);",
      "language": "java"
    },
    {
      "code": "val revenue = Revenue().setProductId(\"com.company.productId\").setPrice(3.99).setQuantity(3)\nclient.logRevenueV2(revenue)",
      "language": "kotlin"
    }
  ]
}
[/block]
Name |	Type |	Description	| Default
-----|-------|--------------|--------
productId (optional) | string	 | An identifier for the product. We recommend something like the Google Play Store product ID. | null
quantity *(required)* | int	| The quantity of products purchased. Note: revenue = quantity * price | 1
price *(required)* | Double	| The price of the products purchased, and this can be negative. Note: revenue = quantity * price | null
revenueType (optional, *required for revenue verification*) | String	| The type of revenue (e.g. tax, refund, income). | null
receipt (optional) | String	| The type of revenue (e.g. tax, refund, income). | null
receiptSignature (optional, *required for revenue verification*) | String	| The type of revenue (e.g. tax, refund, income). | null
eventProperties (optional) | JSONObject	| An object of event properties to include in the revenue event.	| null
[block:callout]
{
  "type": "info",
  "title": "",
  "body": "Price can be negative, which may be useful for tracking revenue lost (such as refunds or costs)"
}
[/block]

[block:callout]
{
  "type": "warning",
  "body": "Amplitude currently does not support currency conversion. All revenue data should be normalized to a currency of choice before being sent to Amplitude.\n\nThe logRevenue() API is deprecated, and the logRevenueV2() API should be used going forward."
}
[/block]
# Revenue Verification
The logRevenue method also supports revenue validation.

By default, revenue events recorded on the Android SDK will appear in Amplitude as **[Amplitude] Revenue (Unverified)** events. To enable revenue verification, copy your Google Play License Public Key into the Sources & Destinations section of your project in Amplitude. You must put in a key for every single project in Amplitude where you want revenue to be verified.

There are two main Android  libraries for revenue verificaitons: AIDL and Google Play Billing. AIDL is the older and deprecated one. See [this Google guide](https://developer.android.com/google/play/billing/migrate) on how to migrate, as well as the class specification for the [Purchase class]
(https://developer.android.com/reference/com/android/billingclient/api/Purchase). Please see the code examples below for the two different libraries, in Java or Kotlin.

After a successful purchase transaction, add the purchase data and receipt signature to the Revenue object:
[block:code]
{
  "codes": [
    {
      "code": "// For AIDL (old deprecated library)\n\nIntent data = ...;\n\nString purchaseData = data.getStringExtra(\"PURCHASE_DATA\");\nString dataSignature = data.getStringExtra(\"DATA_SIGNATURE\");\n\nRevenue revenue = new Revenue().setProductId(\"com.company.productId\").setQuantity(1);\nrevenue.setPrice(3.99).setReceipt(purchaseData, dataSignature);\n\nclient.logRevenueV2(revenue);",
      "language": "java"
    },
    {
      "code": "//For Google Play Billing Library\npublic class MyBillingImpl implements PurchasesUpdatedListener {\n    private BillingClient billingClient;\n    //...\n\n    public void initialize() {\n        billingClient = BillingClient.newBuilder(activity).setListener(this).build();\n        billingClient.startConnection(new BillingClientStateListener() {\n            @Override\n            public void onBillingSetupFinished(BillingResult billingResult) {\n                // Logic from ServiceConnection.onServiceConnected should be moved here.\n            }\n\n            @Override\n            public void onBillingServiceDisconnected() {\n                // Logic from ServiceConnection.onServiceDisconnected should be moved here.\n            }\n        });\n    }\n\n    @Override\n    public void onPurchasesUpdated(\n        @BillingResponse int responseCode, @Nullable List<Purchase> purchases) {\n        //Here is the important part. \n      \tfor (Purchase purchase: purchases) {\n          Revenue revenue = new Revenue()\n            .setProductId(\"com.company.productId\")\n            .setQuantity(1)\n            .setPrice(price);\n          revenue.setReceipt(purchase.getOriginalJson(), purchase.getSignature());\n          client.logRevenueV2(revenue);\n        }\n    }\n}",
      "language": "java"
    },
    {
      "code": "// For AIDL (old deprecated library)\n        \nIntent data = ...\n\nval purchaseData: String = data.getStringExtra(\"PURCHASE_DATA\")\nval dataSignature: String = data.getStringExtra(\"DATA_SIGNATURE\")\n\nval revenue = Revenue().setProductId(\"com.company.productId\").setQuantity(1)\nrevenue.setPrice(3.99).setReceipt(purchaseData, dataSignature)\n\nclient.logRevenueV2(revenue)",
      "language": "kotlin"
    },
    {
      "code": "class MyBillingImpl(private var billingClient: BillingClient) : PurchasesUpdatedListener {\n\n    init {\n        billingClient = BillingClient.newBuilder(activity).setListener(this).build()\n        billingClient.startConnection(object : BillingClientStateListener {\n            override fun onBillingSetupFinished(billingResult: BillingResult?) {\n                // Logic from ServiceConnection.onServiceConnected should be moved here.\n            }\n\n            override fun onBillingServiceDisconnected() {\n                // Logic from ServiceConnection.onServiceDisconnected should be moved here.\n            }\n        })\n    }\n\n    override fun onPurchasesUpdated(\n        billingResult: BillingResult?,\n        purchases: MutableList<Purchase>?\n    ) {\n        // Logic from onActivityResult should be moved here.\n      \tfor (Purchase purchase: purchases) {\n          Revenue revenue = new Revenue()\n            .setProductId(\"com.company.productId\")\n            .setQuantity(1)\n            .setPrice(price);\n          revenue.setReceipt(purchase.getOriginalJson(), purchase.getSignature());\n          client.logRevenueV2(revenue);\n        }\n    }\n}\n",
      "language": "kotlin"
    }
  ]
}
[/block]
### Amazon Store Revenue Verification
For purchases on the Amazon store, you should copy your Amazon Developer Shared Secret into the Sources & Destinations section of your project in Amplitude. After a successful purchase transaction, you should send the purchase token (For Amazon IAP 2.0 use receipt id) as the 'receipt' and the User ID as the 'receiptSignature':
[block:code]
{
  "codes": [
    {
      "code": "// for a purchase request onActivityResult\nString purchaseToken = purchaseResponse.getReceipt();\nString userId = getUserIdResponse.getUserId();\n\nRevenue revenue = new Revenue().setProductId(\"com.company.productId\").setQuantity(1);\nrevenue.setPrice(3.99).setReceipt(purchaseToken, userId);\n\nclient.logRevenueV2(revenue);",
      "language": "java"
    }
  ]
}
[/block]
# User Sessions
A session on Android is a period of time that a user has the app in the foreground. 

Amplitude groups events together by session. Events that are logged within the same session will have the same `session_id`. Sessions are handled automatically so you do not have to manually call an API like `startSession()` or `endSession()`.

You can adjust the time window for which sessions are extended.
[block:code]
{
  "codes": [
    {
      "code": "client.setMinTimeBetweenSessionsMillis(10000); //Must be a 'long'; 10 seconds",
      "language": "java"
    }
  ]
}
[/block]
By default, '[Amplitude] Start Session' and '[Amplitude] End Session' events are not sent. Even though these events are not sent, sessions are still tracked by using session_id. To enable those session events, add this line before initializing the SDK.
[block:code]
{
  "codes": [
    {
      "code": "Amplitude.getInstance().trackSessionEvents(true);",
      "language": "java"
    }
  ]
}
[/block]
You can also log events as out-of-session. Out-of-session events have a `session_id` of `-1` and are not considered part of the current session, meaning they do not extend the current session. This might be useful if you are logging events triggered by push notifications, for example. You can log events as out-of-session by setting the input parameter `outOfSession` to true when calling `logEvent()`.
[block:code]
{
  "codes": [
    {
      "code": "JSONObject eventProperties = //...\n  \n//This event is now out of session\nclient.logEvent(\"event type\", eventProperties, true);",
      "language": "java"
    }
  ]
}
[/block]
You can also log identify events as out-of-session, which is useful if you are updating user properties in the background and do not want to start a new session. You can do this by setting the input parameter outOfSession to true when calling `identify()`.
[block:code]
{
  "codes": [
    {
      "code": "Identify identify = new Identify().set(\"key\", \"value\");\nAmplitude.getInstance().identify(identify, true);",
      "language": "java"
    }
  ]
}
[/block]
You may also manually start a new session with its own ID.
[block:code]
{
  "codes": [
    {
      "code": "long sessionId = ...;\nclient.startNewSessionIfNeeded(sessionId);",
      "language": "java"
    }
  ]
}
[/block]
You can use the helper method getSessionId to get the value of the current sessionId.
[block:code]
{
  "codes": [
    {
      "code": "long sessionId = Amplitude.getInstance().getSessionId();",
      "language": "java"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "",
  "body": "For Android API level 14 and above, a new session is created when the app comes back into the foreground after being in the background for five or more minutes or when the last event was logged (whichever occurred last). Otherwise, the background event logged will be part of the current session. Note that you can define your own session expiration time by calling setMinTimeBetweenSessionsMillis(timeout), where the timeout input is in milliseconds.\n\nFor Android API level 13 and below, foreground tracking is not available so a new session is automatically started when an event is logged 30 minutes or more after the last logged event. If another event is logged within 30 minutes, it will extend the current session. Note that you can define your own session expiration time here as well by calling setSessionTimeoutMillis(timeout), where the timeout input is in milliseconds. Also note that enableForegroundTracking(getApplication) is still safe to call for Android API level 13 and below even though it is not available."
}
[/block]
# Setting Custom User ID

If your app has its own login system that you want to track users with, you can call setUserId at any time.
[block:code]
{
  "codes": [
    {
      "code": "client.setUserId(\"USER_ID\");",
      "language": "java"
    }
  ]
}
[/block]
You can also add the User ID as an argument to the init call.
[block:code]
{
  "codes": [
    {
      "code": "client.initialize(this, \"API_KEY\", \"USER_ID\");",
      "language": "java"
    }
  ]
}
[/block]
You should not assign users a User ID that could change as each unique User ID is interpreted as a unique user in Amplitude. Please see our article on how we identify and count unique users for further information.

# Log Level
The log level allows you to set the level of logs printed to be printed in the developer console. The different levels are as follows:

* 'INFO': This option will show error messages, warnings, and informative messages that may be useful for debugging.
* 'WARN': This option will show error messages and warnings. This level will log issues that might be a problem and cause some oddities in the data. For example, this level would display a warning for properties with null values.
* 'ERROR': This option will show error messages only.
* 'DISABLE': This will suppress all log messages.

You can set the log level by calling the following on Android:
[block:code]
{
  "codes": [
    {
      "code": "Amplitude.getInstance().setLogLevel(log.DEBUG)",
      "language": "java"
    }
  ]
}
[/block]
# Log Out and Anonymous Users

A user's data will be [merged](https://help.amplitude.com/hc/en-us/articles/115003135607) on the backend so that any events up to that point from the same browser will be tracked under the same user. If a user logs out or you want to log the events under an anonymous user, you will need to:

1. Set the userId to null.
2. Regenerate a new deviceId.

After doing that, events coming from the current user/device will appear as a brand new user in Amplitude. Note: If you choose to do this, you will not be able to see that the two users were using the same device. 
[block:code]
{
  "codes": [
    {
      "code": "client.setUserId(null);\nclient.regenerateDeviceId();",
      "language": "java"
    }
  ]
}
[/block]
# Advanced Topics

## Disable Tracking
By default the Android SDK will track several user properties such as carrier, city, country, ip_address, language, platform, etc. You can use the provided `TrackingOptions` interface to customize and disable individual fields.

To use the `TrackingOptions` interface, you will first need to import the class.
[block:code]
{
  "codes": [
    {
      "code": "import com.amplitude.api.TrackingOptions;",
      "language": "java"
    }
  ]
}
[/block]
Before initializing the SDK with your apiKey, create a `TrackingOptions` instance with your configuration and set it on the SDK instance
[block:code]
{
  "codes": [
    {
      "code": "TrackingOptions options = new TrackingOptions().disableCity().disableIpAddress().disableLatLng();\nAmplitude.getInstance().setTrackingOptions(options);",
      "language": "java"
    }
  ]
}
[/block]
Each field can be individually disabled and has a corresponding disable method (for example, disableCountry, disableLanguage, etc.). This table describes the different methods:

Method | Description
-------|------------
disableAdid() | Disable tracking of Google ADID
disableCarrier() | Disable tracking of device's carrier
disableCity() | Disable tracking of user's city
disableCountry() | Disable tracking of user's country
disableDeviceBrand() | Disable tracking of device brand
disableDeviceModel() | Disable tracking of device model
disableDma() | Disable tracking of user's dma
disableIpAddress() | Disable tracking of user's ip address
disableLanguage() | Disable tracking of device's language
disableLatLng() | Disable tracking of user's current lattitude and longitude coordinates
disableOsName() | Disable tracking of device's OS Name
disableOsVersion() | Disable tracking of device's OS Version
disablePlatform() | Disable tracking of device's platform
disableRegion() | Disable tracking of user's couregiontry
disableVersionName() | Disable tracking of your app's version name
[block:callout]
{
  "type": "warning",
  "body": "The *TrackingOptions* will only prevent default properties from being tracked on **newly created** projects, where data has not yet been sent. If you have a project with existing data that you would like to stop collecting the default properties for, please contact our Support team at support.amplitude.com. Note that the existing data will not be deleted.",
  "title": "Important Note"
}
[/block]
## COPPA Control
COPPA (Children's Online Privacy Protection Act) restrictions on IDFA, IDFV, city, IP address and location tracking can be enabled or disabled all at once. Remember that apps asking for information from children under 13 years of age must comply with COPPA.
[block:code]
{
  "codes": [
    {
      "code": "client.enableCoppaControl(); //Disables ADID, city, IP, and location tracking",
      "language": "java"
    }
  ]
}
[/block]
## Advertising ID
Advertiser ID (also referred to as IDFA) is a unique identifier provided by the iOS and Google Play stores. As it is unique to every person and not just their devices, it is useful for mobile attribution. [Mobile attribution](https://www.adjust.com/blog/mobile-ad-attribution-introduction-for-beginners/) is the attribution of an installation of a mobile app to its original source (e.g. ad campaign, app store search). Mobile apps need permission to ask for IDFA, and apps targeted to children cannot track at all. Consider IDFV, device id, or an email login system as alternatives when IDFA is not available. 

Follow the three steps below to use Android Ad ID.
[block:callout]
{
  "type": "danger",
  "title": "Google Ad ID / Tracking Warning!",
  "body": "[Google will allow users to opt out of Ad ID tracking in Q4 for Android 12 devices, and in 2022 for all Android devices](https://support.google.com/googleplay/android-developer/answer/6048248?hl=en). Ad ID may return null or error. See the next section on the alternative ID called 'App Set ID', which is unique to every app install on a device."
}
[/block]
### 1. Add play-services-ads as a dependency.
```
dependencies {
  implementation 'com.google.android.gms:play-services-ads:18.3.0'
}
```

### 2. AD_MANAGER_APP Permission
If you use Google Mobile Ads SDK version 17.0.0 above, you need to add AD_MANAGER_APP to `AndroidManifest.xml`.
```
<manifest>
    <application>
        <meta-data
            android:name="com.google.android.gms.ads.AD_MANAGER_APP"
            android:value="true"/>
    </application>
</manifest>
```

### 3. Add Proguard exception
Amplitude Android SDK uses Java Reflection to use classes in Google Play Services. For Amplitude SDKs to work properly in your Android application, please add these exceptions to `proguard.pro` for the classes from `play-services-ads`.
```-keep class com.google.android.gms.ads.** { *; }```

### Set Advertising ID as Device ID
After you set up the logic to fetch the advertising ID, you can also call this useAdvertisingIdForDeviceId API to set it as your device ID.
[block:code]
{
  "codes": [
    {
      "code": "client.useAdvertisingIdForDeviceId();",
      "language": "java"
    }
  ]
}
[/block]
## App Set ID
'App Set ID' is unique to every app install on a device. App Set ID can be reset by the user manually, when they uninstall the app, or after 13 months of not opening the app. Google intends this as a privacy-friendly alternative to Ad ID for users who wish to opt out of stronger analytics.

### 1. Add `play-services-appset` as a dependency
```
dependencies {
    implementation 'com.google.android.gms:play-services-appset:16.0.0-alpha1'
}
```

### 2. Set App Set ID as Device ID
[block:code]
{
  "codes": [
    {
      "code": "client.useAppSetIdForDeviceId();",
      "language": "java"
    }
  ]
}
[/block]
## Location Tracking
Amplitude converts the IP of a user event into a location (GeoIP lookup) by default. This information may be overridden by an app’s own tracking solution or user data.

Amplitude can access the Android location service (if possible) to add the specific coordinates (longitude and latitude) where an event is logged. This behavior is enabled by default but can be adjusted by calling the following methods after initializing:
[block:code]
{
  "codes": [
    {
      "code": "client.enableLocationListening();\nclient.disableLocationListening();",
      "language": "java"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "warning",
  "title": "Proguard",
  "body": "If you use Proguard obfuscation, please also add the following exception to the file:\n`-keep class com.google.android.gms.common.** { *; }`"
}
[/block]
## Opt Out of Tracking
Users may wish to opt out of tracking entirely, which means no events and no records of their browsing history. This API provides a way to fulfill certain users’ requests for privacy.
[block:code]
{
  "codes": [
    {
      "code": "client.setOptOut(true); //Disables all tracking of events for this user",
      "language": "java"
    }
  ]
}
[/block]
## Push Notification Events

Push notification events should not be sent client-side via the Android SDK because a user must open the app to initialize the Amplitude SDK in order for the SDK to send the event. Therefore, if push notification events are tracked client-side then there can be data delays as the push notification event will not be sent to Amplitude's servers until the next time the user opens the app.

You can use our <a href='https://amplitude.com/integrations?category=mobile-marketing-automation'>mobile marketing automation partners</a> or our [HTTP API V2](doc:http-api-v2) to send push notification events to Amplitude.

## Event Explorer
To use Event Explorer, you will need to know either `deviceId` or `userId` to look up live events. Android SDKs provide functionalities to view them while using a debug build.

First, add the following code into your `AndroidManifest.xml`.
[block:code]
{
  "codes": [
    {
      "code": "<activity\n            android:name=\"com.amplitude.eventexplorer.EventExplorerInfoActivity\"\n            android:exported=\"true\"\n            android:screenOrientation=\"portrait\"\n            />",
      "language": "xml"
    }
  ]
}
[/block]
Second, add the following code in your root activity's onCreate life cycle.
[block:code]
{
  "codes": [
    {
      "code": "@Override\npublic void onCreate(Bundle savedInstanceState) {\n  //...\n  client.showEventExplorer(this);\n  //...\n}",
      "language": "java"
    }
  ]
}
[/block]

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/c08c057-android_event_explorer.png",
        "android_event_explorer.png",
        2160,
        1920,
        "#666666"
      ]
    }
  ]
}
[/block]
## Dynamic Configuration

Android SDK allows users to configure their apps to use [dynamic configuration](https://developers.amplitude.com/docs/dynamic-configuration). This feature will find the best server url automatically based on app users' geo location.

- If you have your own proxy server and use setServerUrl API, please leave this OFF.
- If you have users in China Mainland, we suggest you turn this on.
- By default, this feature is OFF. So you need to explicitly set it to ON to use it.
- By default, this feature returns server url for Amplitude's US servers, if you need to send data to Amplitude's EU servers, please use setServerZone to set it to EU zone.
[block:code]
{
  "codes": [
    {
      "code": "client.setUseDynamicConfig(true);",
      "language": "java"
    }
  ]
}
[/block]
## SSL Pinning
SSL Pinning is a technique on the client side to avoid man-in-the-middle attacks by validating the server certificates again even after SSL handshaking. Please contact Amplitude Support before you ship any products with SSL pinning enabled so we are aware.

To use SSL Pinning in the Android SDK, use the class `PinnedAmplitudeClient` instead of `AmplitudeClient` to turn it on.

## Set Log Callback
Amplitude Android SDK allows the app to set a callback (version 2.32.2+).  Creating a class and setting the callback would help with collecting any error messages from the SDK in a production environment. Below is an example:
[block:code]
{
  "codes": [
    {
      "code": "class SampleLogCallback implements AmplitudeLogCallback {\n  @Override\n    public void onError(String tag, String message) {\n    // handling of error message\n  }\n}\nSampleLogCallback callback = new SampleLogCallback();\nclient.setLogCallback(callback);",
      "language": "java"
    }
  ]
}
[/block]
# Need Help?

If you have any problems or issues over our SDK, feel free to [create a github issue](https://github.com/amplitude/Amplitude-Android/issues/new) or submit a request on [Amplitude Help](https://help.amplitude.com/hc/en-us/requests/new).