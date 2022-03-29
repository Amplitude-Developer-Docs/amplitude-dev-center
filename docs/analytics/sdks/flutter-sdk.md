---
title: Flutter SDK
description: Docs for Amplitude Analytic's Flutter SDK installationa and quickstart.
icon: flutter
---

![pub package](https://img.shields.io/pub/v/amplitude_flutter.svg)

This is the official documentation for the Amplitude Analytics Flutter SDK. 

???info "SDK Resources"
    - [Android SDK Reference :material-book:](https://pub.dev/documentation/amplitude_flutter/latest/)
    - [Android SDK Repository :material-github:](https://github.com/amplitude/Amplitude-Flutter)
    - [Android SDK Releases :material-code-tags-check:](https://github.com/amplitude/Amplitude-Flutter/releases)

--8<-- "includes/ampli-vs-amplitude.md"

## Installation

### Add dependencies

1. Go to the `pubspec.yaml` file and add Amplitude SDK as a dependency.

    ```yml
    dependencies:
      amplitude_flutter: ^3.7.0
    ```

2. Run flutter pub get in the terminal to install the SDK.

## iOS Installation

Add `platform :ios, '10.0'` to your Podfile.

To enable Bitcode, follow Flutter's [documentation](https://github.com/flutter/flutter/wiki/Creating-an-iOS-Bitcode-enabled-app).

## Usage and examples

### Initialization

Initialization is necessary before any instrumentation is done. The API key for your Amplitude project is required.

```dart
import 'package:amplitude_flutter/amplitude.dart';
import 'package:amplitude_flutter/identify.dart';

class YourClass {
  Future<void> exampleForAmplitude() async {
    // Create the instance
    final Amplitude analytics = Amplitude.getInstance(instanceName: "project");

    // Initialize SDK
    analytics.init(widget.apiKey);

    // Log an event
    analytics.logEvent('MyApp startup', eventProperties: {
      'friend_num': 10,
      'is_heavy_user': true
    });
  }
}
```

## EU Data Residency

Starting from version 3.6.0, you can configure the server zone after initializing the client for sending data to Amplitude's EU servers. SDK will switch and send data based on the server zone if it is set. The server zone config supports dynamic configuration as well.

For previous versions, you need to configure the serverURL property after initializing the client.

Warning: For EU data residency, project need to be set up inside Amplitude EU and SDK initialized with api key from Amplitude EU first. This method won't work without proper set up first.

```dart
// For versions starting from 3.6.0
// No need to call setServerUrl for sending data to Amplitude's EU servers
Amplitude.getInstance().setServerZone("EU");

// For earlier versions
Amplitude.getInstance().setServerUrl("https://api.eu.amplitude.com")
```

### Sending Events

#### Basic Events

Events represent how users interact with your application. For example, "button clicked" may be an action you want to track.

```dart
Amplitude.getInstance().logEvent('BUTTON_CLICKED');
```

#### Events with properties

Events can also contain properties. They provide context about the event taken. For example, "hover time" may be a relevant event property to "button click"

```dart
Amplitude.getInstance().logEvent('BUTTON_CLICKED', {"Hover Time": "100ms"});
```

#### Flush Events

Events are typically stored in a buffer and flushed periodically. This behavior is configurable. You can also flush events manually

```dart
Amplitude.getInstance().uploadEvents();
```

### User properties

User properties help you understand your users at the time they performed some action within your app such as their device details, their preferences, or language. Amplitude-Flutter's identify manage this feature. You need to import the `identify` before using it.

```dart
import 'package:amplitude_flutter/identify.dart';
```

!!!warning "User privacy warning"

    Don't track any user data that may be against your privacy terms.

#### Setting a User Property

#### `set`

`set` sets the value of a user property. You can also chain together multiple identify calls.

```dart
final Identify identify = Identify()
                          ..set('gender','female')
                          ..set('age',20);
Amplitude.getInstance().identify(identify);
```

#### `setOnce`

`setOnce` sets the value of a user property only once. Subsequent calls using `setOnce` will be ignored.

```dart
final Identify identify1 = Identify();
identify1.setOnce('sign_up_date', '2015-08-24');
Amplitude.getInstance().identify(identify1);
final Identify identify2 = Identify();
identify2.setOnce('sign_up_date', '2015-08-24');
Amplitude.getInstance().identify(identify2);// is ignored
```

#### `add`

`add` increments a user property by some numerical value. If the user property does not have a value set yet, it will be initialized to 0 before being incremented.

```dart
final Identify identify = Identify().add('karma', 0.123);
Amplitude.getInstance().identify(identify);
```

#### `preInsert`

This will pre insert a value or values to a user property, if it does not exist in the user property yet.\
Pre insert means inserting the value(s) at the beginning of a given list. If the user property does not have a value set yet, it will be initialized to an empty list before the new values are pre inserted. If the user property has an existing value, it will be no operation.

```dart
final Identify identify = Identify()
                          ..preInsert('existing_list', 'some_property')
Amplitude.getInstance().identify(identify);
```

### `postInsert`

This will post insert a value or values to a user property, if it does not exist in the user property yet. Post insert means inserting the value(s) at the end of a given list. If the user property does not have a value set yet, it will be initialized to an empty list before the new values are post inserted. If the user property has an existing value, it will be no operation.

```dart
final Identify identify = Identify()
                          ..postInsert('existing_list','some_property')
Amplitude.getInstance().identify(identify);
```

### Setting multiple user properties

You can use `setUserProperties` as a shorthand to set multiple user properties at once. This method is simply a wrapper around `Identify.set` and `identify`.

```dart
Map<String, dynamic> userProps = {
  'KEY': 'VALUE',
  'OTHER_KEY': 'OTHER_VALUE'
};
Amplitude.getInstance().setUserProperties(userProperties);
```

### Arrays in user properties

Arrays can be used as user properties. You can directly set arrays or use append to generate an array.

```dart
const colors = ["rose", "gold"];
const numbers = [4, 5];
final Identify identify = Identify()
                          ..set("colors", colors)
                          ..append("ab-tests", "campaign_a")
                          ..prepend("existing_list", numbers);
Amplitude.getInstance().identify(identify);
```

#### `prepend` and `append`

- `prepend` will prepend a value or values to a user property.
- `append` will append a value or values to a user property array.\
    If the user property does not have a value set yet, it will be initialized to an empty list before the new values are added. If the user property has an existing value and it is not a list, it will be converted into a list with the new value added.

```dart
const array = ["some_string", 56];
final Identify identify = Identify()
                          ..append("ab-tests", "new-user-test")
                          ..preappend("some_list", array)
Amplitude.getInstance().identify(identify);
```

### Removing User Properties

#### Clearing All User Properties

`clearUserProperties` will wipe all of the current user's user properties.

!!!warning

    The result is irreversible! Amplitude can't sync the user's user property values from before the wipe to any future events.

```dart
Amplitude.getInstance().clearUserProperties();
```

#### `remove`

`remove` will remove a value or values to a user property, if it does exist in the user property. Remove means remove the existing value(s) from the given list. If the item does not exist in the user property, there will be no operation.

```dart
const array = ["some_string", 56];
final Identify identify = Identify()
                          ..remove("ab-tests", "new-user-test")
                          ..remove("some_list",array);
Amplitude.getInstance().identify(identify);
```

#### `unset`

`unset` unsets and removes a user property.

```dart
final Identify identify = Identify()
                          ..unset("ab-tests", "new-user-test")
                          ..unset("some_list",array);
Amplitude.getInstance().identify(identify)
```

### Track Revenue

Amplitude can track revenue generated by a user. Revenue is tracked through distinct revenue objects, which have special fields that are used in Amplitude's Event Segmentation and Revenue LTV charts. This allows Amplitude to automatically display data relevant to revenue in the platform.

!!!note

    Amplitude doesn't support currency conversion. All revenue data should be normalized to your currency of choice before being sent.

```dart
String productId = "product001";
int quantity = 2;
double price = 20;
double amount = 35;
Amplitude.getInstance().logRevenue(productId, quantity, price);
Amplitude.getInstance().logRevenueAmount(amount);
```

!!!info

    Price can be negative, which may be useful for tracking revenue lost (such as refunds or costs).



### Group user properties

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

Use `groupIdentify` to set or update properties of particular groups. These updates only affect events going forward.

```dart
final Identify identify = Identify()
                          ..set("gender", "female")
                          ..set("age", 20);
Amplitude.getInstance().groupIdentify("groupType", "groupValue", identify);

```

### User sessions

A session is a period of time that a user has the app in the foreground. Events that are logged within the same session will have the same session_id. Sessions are handled automatically so you do not have to manually call an API like startSession() or endSession().\
Amplitude groups events together by session. A session represents a single period of user activity, with a start and end time. Different SDKs will track sessions differently, depending on the requirements of the platform.\
You are able to determine whether to automatically log start and end session events corresponding to the start and end of a user's session.

```dart
//Enable automatically log start and end session events
Ampiltidue.getInstance().trackingSessionEvents(true);
//Disable automatically log start and end session events
Amplitidue.getInstance().trackingSessionEvents(false);
```

### Set Custom User ID

If your app has its own login system that you want to track users with, you can call `setUserId` at any time.

```dart
Amplitude.instance().setUserId("test_user_id");
```

## Advanced topics

### COPPA Control

COPPA (Children's Online Privacy Protection Act) restrictions on IDFA, IDFV, city, IP address and location tracking can be enabled or disabled all at once. Remember that apps asking for information from children under 13 years of age must comply with COPPA.

```dart
//Enable COPPA Control
Amplitude.getInstance().enableCoppaControl();
//Disable COPPA Control
Amplitude.getInstance().disableCoppaControl();
```

### Advertising Id

Advertiser ID (also referred to as IDFA) is a unique identifier provided by the iOS and Google Play stores. As it is unique to every person and not just their devices, it is useful for mobile attribution. [Mobile attribution](https://www.adjust.com/blog/mobile-ad-attribution-introduction-for-beginners/) is the attribution of an installation of a mobile app to its original source (e.g. ad campaign, app store search). Mobile apps need permission to ask for IDFA, and apps targeted to children cannot track at all. Consider IDFV, device id, or an email login system as alternatives when IDFA is not available.\
Please check the [iOS Advertising Id](https://developers.amplitude.com/docs/ios#advertising-id) or the [Android Advertising Id](https://developers.amplitude.com/docs/android#advertising-id) info based on your needs.

### Opt Out of Tracking

Users may wish to opt out of tracking entirely, which means no events and no records of their browsing history. setOptOut provides a way to fulfill certain users' requests for privacy.

```dart
//Disables instrumentation
Amplitude.getInstance().setOptOut(true);
//Enables instrumentation
Amplitude.getInstance().setOptOut(false);

```

### Dynamic Configuration

Flutter SDK allows users to configure their apps to use [dynamic configuration](../dynamic-configuration.md). This feature will find the best server url automatically based on app users' geo location.

- If you have your own proxy server and use setServerUrl API, please leave this OFF.
- If you have users in China Mainland, we suggest you turn this on.
- By default, this feature is OFF. So you need to explicitly set it to ON to use it.
- By default, this feature returns server url for Amplitude's US servers, if you need to send data to Amplitude's EU servers, please use setServerZone to set it to EU zone.

```dart
Amplitude.getInstance().setUseDynamicConfig(true);
```

### Flutter Web Support

Flutter web support delivers the same experiences on the web as on mobile. Amplitude-Flutter starts to support flutter web from v3.8.0.

These APIs aren't supported in Flutter web:

- `enableCoppaControl`
- `disableCoppaControl`
- `trackingSessionEvents`
- `useAppSetIdForDeviceId`

#### Usage

Append the following Amplitude-JavaScript snippet into `web/index.html` in your Flutter project. Noticed that Amplitude-JavaScript version should be v8.12.0 and higher.

```js
<script type="text/javascript" defer>
   (function(e,t){var n=e.amplitude||{_q:[],_iq:{}};var r=t.createElement("script")
    ;r.type="text/javascript"
    ;r.integrity="sha384-UcvEbHmT0LE2ZB30Y3FmY3Nfw6puAKXz/LpCFuoywywYikMOr/519Uu1yNq2nL9w"
    ;r.crossOrigin="anonymous";r.async=true
    ;r.src="https://cdn.amplitude.com/libs/amplitude-8.12.0-min.gz.js"
    ;r.onload=function(){if(!e.amplitude.runQueuedFunctions){
    console.log("[Amplitude] Error: could not load SDK")}}
    ;var s=t.getElementsByTagName("script")[0];s.parentNode.insertBefore(r,s)
    ;function i(e,t){e.prototype[t]=function(){
    this._q.push([t].concat(Array.prototype.slice.call(arguments,0)));return this}}
    var o=function(){this._q=[];return this}
    ;var a=["add","append","clearAll","prepend","set","setOnce","unset","preInsert","postInsert","remove"]
    ;for(var c=0;c<a.length;c++){i(o,a[c])}n.Identify=o;var u=function(){this._q=[]
    ;return this}
    ;var l=["setProductId","setQuantity","setPrice","setRevenueType","setEventProperties"]
    ;for(var p=0;p<l.length;p++){i(u,l[p])}n.Revenue=u
    ;var d=["init","logEvent","logRevenue","setUserId","setUserProperties","setOptOut","setVersionName","setDomain","setDeviceId","enableTracking","setGlobalUserProperties","identify","clearUserProperties","setGroup","logRevenueV2","regenerateDeviceId","groupIdentify","onInit","logEventWithTimestamp","logEventWithGroups","setSessionId","resetSessionId","getDeviceId","getUserId","setMinTimeBetweenSessionsMillis","setEventUploadThreshold","setUseDynamicConfig","setServerZone","setServerUrl","sendEvents","setLibrary","setTransport"]
    ;function v(e){function t(t){e[t]=function(){
    e._q.push([t].concat(Array.prototype.slice.call(arguments,0)))}}
    for(var n=0;n<d.length;n++){t(d[n])}}v(n);n.getInstance=function(e){
    e=(!e||e.length===0?"$default_instance":e).toLowerCase()
    ;if(!Object.prototype.hasOwnProperty.call(n._iq,e)){n._iq[e]={_q:[]};v(n._iq[e])
    }return n._iq[e]};e.amplitude=n})(window,document);
</script>
```

## Troubleshooting

- Errors on turning on Bitcode in iOS?\
    Please follow the Flutter's [documentation](https://github.com/flutter/flutter/wiki/Creating-an-iOS-Bitcode-enabled-app)

## More resources

If you have any problems or issues over our SDK, feel free to [create a github issue](https://github.com/amplitude/Amplitude-Flutter/issues/new) or submit a request on [Amplitude Help](https://help.amplitude.com/hc/en-us/requests/new).


--8<-- "includes/abbreviations.md"