---
title: iOS SDK
description: The Amplitude iOS SDK installation and quick start guide.
icon: simple/ios
---


![CocoaPods](https://img.shields.io/cocoapods/v/Amplitude)

This is the official documentation for the Amplitude Analytics iOS SDK.

!!!warning New Version Available
    This is the time tested iOS SDK, however here is a new version in beta that is highly recommended for all customers using Swift. The latest [iOS Swift SDK](../ios-swift/) has additional features such as plugins and more. See the [Migration Guide](../ios-swift/migration/) for more help. For customers beginning with Amplitude Experiment, please note that the beta iOS SDK does not support the [Amplitude Experiment integration](https://www.docs.developers.amplitude.com/experiment/sdks/ios-sdk/#initialize).

    Please note that the latest iOS Swift SDK is **NOT** compatible with Objective-C projects. Use this SDK if your project requires compatibility with Objective-C.

!!!info "iOS SDK Resources"
    [:material-github: GitHub](https://github.com/amplitude/Amplitude-iOS) · [:material-code-tags-check: Releases](https://github.com/amplitude/Amplitude-iOS/releases) · [:material-book: API Reference](http://amplitude.github.io/Amplitude-iOS)

--8<-- "includes/ampli-vs-amplitude.md"
    Click here for more documentation on [Ampli for iOS](./ampli.md).

--8<-- "includes/sdk-ios/apple-deprecate-carrier.md"

## Getting started

Use [this quickstart guide](../../sdks/sdk-quickstart#ios) to get started with Amplitude iOS SDK.

## Core functions

The following functions make up the core of the Amplitude Analytics iOS SDK.

---

### Initialize

You must initialize the SDK before you can instrument. The API key for your Amplitude project is required.

Usually, you can initialize the SDK in the `application:didFinishLaunchingWithOptions:` method of your `YourAppAppDelegate.m` file.

=== "Objective-C"

    ```obj-c
    - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
      // Enable sending automatic session events
      [Amplitude instance].defaultTracking.sessions = YES;
      // Initialize SDK
      [[Amplitude instance] initializeApiKey:@"API_KEY"];
      // Set userId
      [[Amplitude instance] setUserId:@"userId"];
      // Log an event
      [[Amplitude instance] logEvent:@"app_start"];

      return YES;
    }
    ```

=== "Swift"

    ```swift
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
      // Enable sending automatic session events
      Amplitude.instance().defaultTracking.sessions = true
      // Initialize SDK
      Amplitude.instance().initializeApiKey("API_KEY")
      // Set userId
      Amplitude.instance().setUserId("userId")
      // Log an event
      Amplitude.instance().logEvent("app_start")

      return true
    }
    ```

#### Configuration

???config "Configuration Options"
    | <div class="big-column">Name</div>  | Description | Default Value |
    | --- | --- | --- |
    | `eventUploadPeriodSeconds` | The amount of time SDK will attempt to upload the unsent events to the server or reach `eventUploadThreshold` threshold. | `30` |
    | `eventUploadThreshold` | SDK will attempt to upload once unsent event count exceeds the event upload threshold or reach `eventUploadPeriodSeconds` interval.  | `30` |
    | `eventUploadMaxBatchSize` | The maximum number of events sent with each upload request. | `100` |
    | `eventMaxCount` | The maximum number of unsent events to keep on the device. | `1000` |
    | `minTimeBetweenSessionsMillis` |  When a user closes and reopens the app within minTimeBetweenSessionsMillis milliseconds, the reopen is considered part of the same session and the session continues. Otherwise, a new session is created. The default is 5 minutes. | `5 minutes` |
    | `trackingSessionEvents` |  Deprecated. Whether to automatically log start and end session events corresponding to the start and end of a user's session. | `NO` |
    | `setServerUrl` | Sends events to a custom URL. | `Amplitude HTTP API URL` |
    | `setOptOut` | Opt the user out of tracking. | `NO` |
    | `setTrackingOptions` | By default the iOS SDK will track several user properties such as carrier, city, country, ip_address, language, platform, etc. You can use the provided AMPTrackingOptions interface to customize and disable individual fields. | `NO` |
    | `setOffline` | Disables sending logged events to Amplitude servers. Events will be sent when set to `true`. | `NO` |
    | `setIdentifyUploadPeriodSeconds` | The amount of time SDK will attempt to batch intercepted identify events. | `30` |

#### EU data residency

Beginning with version 8.5.0, you can configure the server zone after initializing the client for sending data to Amplitude's EU servers. The SDK sends data based on the server zone if it's set.
 The server zone configuration supports dynamic configuration as well.

For earlier versions, you need to configure the `serverURL` property after initializing the client.

!!!note
    For EU data residency, the project must be set up inside Amplitude EU. You must initialize the SDK with the API key from Amplitude EU.

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

### Send events

#### Basic events

Events represent how users interact with your application. For example, "Button Clicked" may be an action you want to note.

=== "Objective-C"

    ```obj-c
    [[Amplitude instance] logEvent:@"Button Clicked"];
    ```

=== "Swift"

    ```swift
    Amplitude.instance().logEvent("Button Click")
    ```

#### Events with properties

Events can also contain properties, which give more context about the event. For example, "hover time" may be a relevant event property for "button click".

=== "Objective C"

    ```obj-c
    NSMutableDictionary *eventProperties = [NSMutableDictionary dictionary];
    [eventProperties setValue:@"100ms" forKey:@"Hover Time"];
    [[Amplitude instance] logEvent:@"Button Clicked" withEventProperties:eventProperties];
    ```

=== "Swift"

    ```swift
    Amplitude.instance().logEvent("Button Clicked", withEventProperties: ["Hover Time": "100ms"] )
    ```

### User properties

!!!warning "User privacy warning"

    Don't track any user data that may be against your privacy terms.

User properties help you understand your users at the time they performed some action within your app. For example, you can learn about their device details, their preferences, or language.

Amplitude-iOS's `AMPIdentity` class manages these features. Identify is for setting the user properties of a particular user without sending any event. The SDK supports these operations on individual user properties: `set`, `setOnce`, `unset`, `add`, `append`, `prepend`, `preInsert`, `postInsert`, and `remove`. Declare the operations via a provided Identify interface. You can chain together multiple operations in a single Identify object.

The `AMPIdentify` object is passed to the Amplitude client to send to the server. Starting from release v8.15.0, identify events with set operations will be batched and sent with fewer events. This change doesn't affect the result the set operations. The flush interval for batched Identify's can be managed with `setIdentifyUploadPeriodSeconds`.

#### Set a user property

##### `set`

`set` sets the value of a user property. You can also chain together multiple identify calls.

=== "Objective-C"

    ```obj-c
    AMPIdentify *identify = [[[AMPIdentify identify] set:@"gender" value:@"female"] set:@"age"
        value:[NSNumber numberWithInt:20]];
    [[Amplitude instance] identify:identify];
    ```

=== "Swift"

    ```swift
    let identify = AMPIdentify()
        .set("gender", value: "female")
        .set("age",value: NSNumber(value: 20))
    Amplitude.instance().identify(identify)
    ```

##### `setOnce`

`setOnce` sets the value of a user property only once. Subsequent calls using `setOnce`are ignored.

=== "Objective-C"

    ```obj-c
    AMPIdentify *identify1 = [[AMPIdentify identify] setOnce:@"sign_up_date" value:@"2015-08-24"];
    [[Amplitude instance] identify:identify1];

    AMPIdentify *identify2 = [[AMPIdentify identify] setOnce:@"sign_up_date" value:@"2015-09-14"];
    [[Amplitude instance] identify:identify2]; // Is ignored
    ```

=== "Swift"

    ```swift
    let identify1 = AMPIdentify().setOnce("sign_up_date", value: "2015-08-24")
    Amplitude.instance().identify(identify1)

    let identify2 = AMPIdentify().setOnce("sign_up_date", value: "2015-09-14")
    Amplitude.instance().identify(identify2) // Is ignored
    ```

##### `add`

`add` increments a user property by some numerical value. If the user property doesn't have a value set yet, it's initialized to `0` before being incremented.

=== "Objective-C"

    ```obj-c
    AMPIdentify *identify = [[[AMPIdentify identify] add:@"karma" value:[NSNumber numberWithFloat:0.123]]
        add:@"friends" value:[NSNumber numberWithInt:1]];
    [[Amplitude instance] identify:identify];
    ```

=== "Swift"

    ```swift
    let identify = AMPIdentify()
        .add("karma", value: NSNumber(value: 0.123))
        .add("friends",value: NSNumber(value: 1))
    Amplitude.instance().identify(identify)
    ```

##### `preInsert` and `postInsert`

See the [arrays in user properties](#arrays-in-user-properties) section for information.

##### `remove`

Remove a value or values from a user property. If the item doesn't exist in the user property, nothing is removed.

=== "Objective-C"

    ```obj-c
    NSMutableArray *array = [NSMutableArray array];
    [array addObject:@"some_string"];
    [array addObject:[NSNumber numberWithInt:56]];
    AMPIdentify *identify = [[[AMPIdentify identify] remove:@"ab-tests" value:@"new-user-test"]
        remove:@"some_list" value:array];
    [[Amplitude instance] identify:identify];
    ```

##### Set multiple user properties

You can use `setUserProperties` as a shorthand to set multiple user properties at once. This method is a wrapper around `Identify.set` and `identify`.

=== "Objective-C"

    ```obj-c
    NSMutableDictionary *userProperties = [NSMutableDictionary dictionary];
    [userProperties setValue:@"VALUE" forKey:@"KEY"];
    [userProperties setValue:@"OTHER_VALUE" forKey:@"OTHER_KEY"];
    [[Amplitude instance] setUserProperties:userProperties];
    ```

=== "Swift"

    ```swift
    var userProperties: [AnyHashable : Any] = [:]
    userProperties["KEY"] = "VALUE"
    userProperties["OTHER_KEY"] = "OTHER_VALUE"
    Amplitude.instance().userProperties = userProperties
    ```

#### Arrays in user properties

Arrays can be used as user properties. You can directly set arrays or use `append` to generate an array.

=== "Objective-C"

    ```obj-c
    NSMutableArray *colors = [NSMutableArray array];
    [colors addObject:@"rose"];
    [colors addObject:@"gold"];
    NSMutableArray *numbers = [NSMutableArray array];
    [numbers addObject:[NSNumber numberWithInt:4]];
    [numbers addObject:[NSNumber numberWithInt:5]];
    AMPIdentify *identify = [[[[AMPIdentify identify] set:@"colors" value:colors] append:@"ab-tests"
        value:@"campaign_a"] append:@"existing_list" value:numbers];
    [[Amplitude instance] identify:identify];
    ```

=== "Swift"

    ```swift
    var colors: [AnyHashable] = []
    colors.append("rose")
    colors.append("gold")
    var numbers: [AnyHashable] = []
    numbers.append(NSNumber(value: 4))
    numbers.append(NSNumber(value: 5))
    let identify = AMPIdentify().set("colors", value: colors)
        .append("ab-tests", value: "campaign_a")
        .append("existing_list",value: numbers)
    Amplitude.instance().identify(identify)
    ```

##### `prepend` and `append`

- `append` appends a value or values to a user property array.
- `prepend` prepends a value or values to a user property.

If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are added. If the user property has an existing value and it's not a list, it's converted into a list with the new value added.

!!!note

    `append` and `prepend` doesn't check for duplicates. Please see `preInsert` and `postInsert` for that.

=== "Objective-C"

    ```obj-c
    NSMutableArray *array = [NSMutableArray array];
    [array addObject:@"some_string"];
    [array addObject:[NSNumber numberWithInt:56]];
    AMPIdentify *identify = [[[AMPIdentify identify] append:@"ab-tests" value:@"new-user-test"]
        append:@"some_list" value:array];
    [[Amplitude instance] identify:identify];
    ```

=== "Swift"

    ```swift
    var array: [AnyHashable] = []
    array.append("some_string")
    array.append(NSNumber(value: 56))
    let identify = AMPIdentify()
        .append("ab-tests", value: "new-user-test")
        .append("some_list",value: array)
    Amplitude.instance().identify(identify)
    ```

##### `preInsert` and `postInsert`

- `preInsert` inserts a value or values to the front of a user property array if it doesn't exist in the array yet.
- `postInsert` inserts a value or values to the end of a user property array if it doesn't exist in the array yet.

If the user property doesn't exist, it's initialized to an empty list before the new values are pre-inserted. If the user property has an existing value, nothing is inserted.

=== "Objective-C"

    ```obj-c
    NSMutableArray *array = [NSMutableArray array];
    [array addObject:@"some_string"];
    [array addObject:[NSNumber numberWithInt:56]];
    AMPIdentify *identify = [[[AMPIdentify identify] preInsert:@"ab-tests" value:@"new-user-test"]
        preInsert:@"some_list" value:array];
    [[Amplitude instance] identify:identify];
    ```

=== "Swift"

    ```swift
    var array: [AnyHashable] = []
    array.append("some_string")
    array.append(NSNumber(value: 56))
    let identify = AMPIdentify()
        .preInsert("ab-tests", value: "new-user-test")
        .preInsert("some_list",value: array)
    Amplitude.instance().identify(identify)
    ```

#### Remove user properties

##### Clear all user properties

`clearUserProperties` removes all the current user's user properties.

!!!warning "This action is irreversible"

    If you clear user properties, Amplitude can't sync the user's user property values from before the wipe to any future events.

=== "Objective-C"

    ```obj-c
    [[Amplitude instance] clearUserProperties];
    ```

=== "Swift"

    ```swift
    Amplitude.instance().clearUserProperties()
    ```

##### `remove`

`remove` removes an existing value or values from a user property. If the item doesn't exist in the user property, nothing is removed.

=== "Objective-C"

    ```obj-c
    NSMutableArray *array = [NSMutableArray array];
    [array addObject:@"some_string"];
    [array addObject:[NSNumber numberWithInt:56]];
    AMPIdentify *identify = [[[AMPIdentify identify] remove:@"ab-tests" value:@"new-user-test"]
        remove:@"some_list" value:array];
    [[Amplitude instance] identify:identify];
    ```

=== "Swift"

    ```swift
    var array: [AnyHashable] = []
    array.append("some_string")
    array.append(NSNumber(value: 56))
    let identify = AMPIdentify()
        .remove("ab-tests", value: "new-user-test")
        .remove("some_list", value: array)
    Amplitude.instance().identify(identify)
    ```

### Tracking default events

Starting from release v8.17.0, the SDK is able to track more default events now. It can be configured to track the following events automatically:

* Sessions [^1]
* App lifecycles
* Screen views
* Deep links [^2]

[^1]:
    Session tracking is the same as supported in previous versions, which was previously enabled/disabled via the [`trackingSessionEvents`](#configuration) configuration.
[^2]:
    Deep link tracking is not fully automated, you will need to call the correspoding methods manually.

???config "Tracking default events options"
    | <div class="big-column">Name</div> | Type | Default Value | Description |
    |-|-|-|-|
    `defaultTracking.sessions` | Optional. `boolean` | `NO` | Enables session tracking. This configuration replaces [`trackingSessionEvents`](#configuration). If value is `YES`, Amplitude tracks session start and session end events.<br /><br />See [Tracking sessions](#tracking-sessions) for more information.|
    `defaultTracking.appLifecycles` | Optional. `boolean` | `NO` | Enables application lifecycle events tracking. If value is `YES`, Amplitude tracks application installed, application updated, application opened, and application backgrounded events.<br /><br />Event properties tracked includes: `[Amplitude] Version`,<br /> `[Amplitude] Build`,<br /> `[Amplitude] Previous Version`, `[Amplitude] Previous Build`, `[Amplitude] From Background`<br /><br />See [Tracking application lifecycles](#tracking-application-lifecycles) for more information.|
    `defaultTracking.screenViews` | Optional. `boolean` | `NO` | Enables screen views tracking. If value is `YES`, Amplitude tracks screen viewed events.<br /><br />Event properties tracked includes: `[Amplitude] Screen Name`<br /><br />See [Tracking screen views](#tracking-screen-views) for more information.|
    `defaultTracking.deepLinks` | Optional. `boolean` | `NO` | Enables deep link tracking. If value is `YES`, Amplitude tracks deep link opened events. Note that you still need to call `continueUserActivity` or `openURL` manually for tracking this event.<br /><br />Event properties tracked includes: `[Amplitude] Link URL`, `[Amplitude] Link Referrer`<br /><br />See [Tracking deep links](#tracking-deep-links) for more information.|

You can enable Amplitude to start tracking all events mentioned above, use the code sample below.

=== "Objective-C"

    ```obj-c
    [Amplitude instance].defaultTracking = [AMPDefaultTrackingOptions initWithAllEnabled];
    [[Amplitude instance] initializeApiKey:@"API_KEY"];
    ```

=== "Swift"

    ```swift
    Amplitude.instance().defaultTracking = AMPDefaultTrackingOptions.initWithAllEnabled()
    Amplitude.instance().initializeApiKey("API_KEY")
    ```

!!!note
    Amplitude may add more events in a future version, and this configuration enables tracking for those events as well.

Similarly, you can disable Amplitude to track all events mentioned above with the code sample below.

=== "Objective-C"

    ```obj-c
    [Amplitude instance].defaultTracking = [AMPDefaultTrackingOptions initWithNoneEnabled];
    [[Amplitude instance] initializeApiKey:@"API_KEY"];
    ```

=== "Swift"

    ```swift
    Amplitude.instance().defaultTracking = AMPDefaultTrackingOptions.initWithNoneEnabled()
    Amplitude.instance().initializeApiKey("API_KEY")
    ```

You can also customize the tracking with `DefaultTrackingOptions`, see code sample below.

=== "Objective-C"

    ```obj-c
    [Amplitude instance].defaultTracking = [AMPDefaultTrackingOptions initWithSessions:YES
                                                                         appLifecycles:NO
                                                                             deepLinks:NO
                                                                           screenViews:NO];
    [[Amplitude instance] initializeApiKey:@"API_KEY"];
    ```

=== "Swift"

    ```swift
    Amplitude.instance().defaultTracking = AMPDefaultTrackingOptions.initWithSessions(
        true,
        appLifecycles: false,
        deepLinks: false,
        screenViews: false
    )
    Amplitude.instance().initializeApiKey("API_KEY")
    ```

#### Tracking sessions

You can enable Amplitude to start tracking session events by setting `defaultTracking.sessions` to `true`. Refer to the code sample below.

=== "Objective-C"

    ```obj-c
    [Amplitude instance].defaultTracking = [AMPDefaultTrackingOptions initWithSessions:YES
                                                                         appLifecycles:NO
                                                                             deepLinks:NO
                                                                           screenViews:NO];
    [[Amplitude instance] initializeApiKey:@"API_KEY"];
    ```

=== "Swift"

    ```swift
    Amplitude.instance().defaultTracking = AMPDefaultTrackingOptions.initWithSessions(
        true,
        appLifecycles: false,
        deepLinks: false,
        screenViews: false
    )
    Amplitude.instance().initializeApiKey("API_KEY")
    ```

For more information about session tracking, refer to [User sessions](#user-sessions).

!!!note
    `trackingSessionEvents` is deprecated and replaced with `defaultTracking.sessions`.

#### Tracking application lifecycles

You can enable Amplitude to start tracking application lifecycle events by setting `defaultTracking.appLifecycles` to `true`. Refer to the code sample below.

=== "Objective-C"

    ```obj-c
    [Amplitude instance].defaultTracking = [AMPDefaultTrackingOptions initWithSessions:NO
                                                                         appLifecycles:YES
                                                                             deepLinks:NO
                                                                           screenViews:NO];
    [[Amplitude instance] initializeApiKey:@"API_KEY"];
    ```

=== "Swift"

    ```swift
    Amplitude.instance().defaultTracking = AMPDefaultTrackingOptions.initWithSessions(
        false,
        appLifecycles: true,
        deepLinks: false,
        screenViews: false
    )
    Amplitude.instance().initializeApiKey("API_KEY")
    ```

After enabling this setting, Amplitude will track the following events:

* `[Amplitude] Application Installed`, this event fires when a user opens the application for the first time right after installation, by observing the `UIApplicationDidFinishLaunchingNotification` notification underneath.
* `[Amplitude] Application Updated`, this event fires when a user opens the application after updating the application, by observing the `UIApplicationDidFinishLaunchingNotification` notification underneath.
* `[Amplitude] Application Opened`, this event fires when a user launches or foregrounds the application after the first open, by observing the `UIApplicationDidFinishLaunchingNotification` or `UIApplicationWillEnterForegroundNotification` notification underneath.
* `[Amplitude] Application Backgrounded`, this event fires when a user backgrounds the application, by observing the `UIApplicationDidEnterBackgroundNotification` notification underneath.

#### Tracking screen views

You can enable Amplitude to start tracking screen view events by setting `defaultTracking.screenViews` to `true`. Refer to the code sample below.

=== "Objective-C"

    ```obj-c
    [Amplitude instance].defaultTracking = [AMPDefaultTrackingOptions initWithSessions:NO
                                                                         appLifecycles:NO
                                                                             deepLinks:NO
                                                                           screenViews:YES];
    [[Amplitude instance] initializeApiKey:@"API_KEY"];
    ```

=== "Swift"

    ```swift
    Amplitude.instance().defaultTracking = AMPDefaultTrackingOptions.initWithSessions(
        false,
        appLifecycles: false,
        deepLinks: false,
        screenViews: true
    )
    Amplitude.instance().initializeApiKey("API_KEY")
    ```

After enabling this setting, Amplitude will track the `[Amplitude] Screen Viewed` event with the screen name property. This property value is read from the controller class metadata with `viewDidAppear` method swizzling.

#### Tracking deep links

You can enable Amplitude to start tracking deep link events by setting `defaultTracking.deepLinks` to `true`. Refer to the code sample below.

=== "Objective-C"

    ```obj-c
    // Enable tracking deep links.
    [Amplitude instance].defaultTracking = [AMPDefaultTrackingOptions initWithSessions:NO
                                                                         appLifecycles:NO
                                                                             deepLinks:YES
                                                                           screenViews:NO];
    [[Amplitude instance] initializeApiKey:@"API_KEY"];

    // Call helper method to track, e.g., in `onOpenURL` callback.
    [[Amplitude instance] openURL:url];
    [[Amplitude instance] continueUserActivity:activity];
    ```

=== "Swift"

    ```swift
    // Enable tracking deep links.
    Amplitude.instance().defaultTracking = AMPDefaultTrackingOptions.initWithSessions(
        false,
        appLifecycles: false,
        deepLinks: true,
        screenViews: false
    )
    Amplitude.instance().initializeApiKey("API_KEY")

    // Call helper method to track, e.g., in `onOpenURL` callback.
    Amplitude.instance().openURL(url: url)
    Amplitude.instance().continueUserActivity(activity: activity)
    ```

After enabling this setting, Amplitude is able to track the `[Amplitude] Deep Link Opened` event with the URL and referrer information. Note that you still need to call `continueUserActivity` or `openURL` manually for tracking deep links.

### Set user groups

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

--8<-- "includes/groups-intro-paragraph.md"

!!! example

    Joe is in 'orgID' with the groupName 15. He is also in "sport" with groupNames "tennis" and "soccer". Here is what your code might look like:

    === "Objective-C"

        ```obj-c
        [[Amplitude instance] setGroup:@"orgId" groupName:[NSNumber numberWithInt:15]];
        [[Amplitude instance] setGroup:@"sport" groupName:[NSArray arrayWithObjects: @"tennis", @"soccer", nil];
        ```

    === "Swift"

        ```swift
        Amplitude.instance().setGroup("orgId", groupName: NSNumber(value: 15))
                Amplitude.instance().setGroup("sport", groupName: NSArray(objects: "tennis", "soccer"))
        ```

You can also use `logEventWithGroups` to set event-level groups, meaning the group designation only applies for the specific event being logged and doesn't persist on the user unless you explicitly set it with `setGroup`:

=== "Objective-C"

    ```obj-c
    NSDictionary *eventProperties = [NSDictionary dictionaryWithObjectsAndKeys: @"value", @"key", nil];
    NSDictionary *groups = [NSDictionary dictionaryWithObjectsAndKeys:[NSNumber numberWithInt:10],
        @"orgId", @"soccer", @"sport", nil];
    [[Amplitude instance] logEvent:@"initialize_game" withEventProperties:eventProperties withGroups:groups];
    ```

=== "Swift"

    ```swift
    let eventProperties: [String: Any] = ["key": "value"]
    let groups: [String: Any] = ["orgId": 10]

    Amplitude.instance().logEvent("initialize_game", withEventProperties: eventProperties, withGroups: groups)
    ```

### Group identify

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

Use the Group Identify API to set or update properties of particular groups. These updates only affect events going forward.

The `groupIdentifyWithGroupType` method accepts a group type string parameter and group name object parameter, as well as an Identify object that's applied to the group.

=== "Objective-C"

    ```obj-c
    NSString *groupType = @"plan";
    NSObject *groupName = @"enterprese";
    AMPIdentify *identify = [[AMPIdentify identify] set:@"key" value:@"value"];
    [[Amplitude instance] groupIdentifyWithGroupType:groupType groupName:groupName groupIdentify:identify];
    ```

=== "Swift"

    ```swift
    let identify = AMPIdentify()
        .set("key", value: "value")
    Amplitude.instance().groupIdentifyWithGroupType("plan", groupName:NSString(string:"enterprise"), groupIdentify:identify)
    ```

You can add an optional `outOfSession` boolean input as a fourth argument to `groupIdentifyWithGroupType`

### Track revenue

Instances of `AMPRevenue` stores revenue transactions and defines special revenue properties (such as `revenueType`) used in Amplitude's Event Segmentation and Revenue LTV charts. Each instance is passed to `Amplitude.logRevenueV2`.
 This allows Amplitude to automatically display data relevant to revenue.

To track revenue from a user, call `logRevenueV2` each time a user generates revenue. Here is an example:

=== "Objective-C"

    ```obj-c
    AMPRevenue *revenue = [[[AMPRevenue revenue] setProductIdentifier:@"productIdentifier"] setQuantity:3];
    [revenue setPrice:[NSNumber numberWithDouble:3.99]];
    [[Amplitude instance] logRevenueV2:revenue];
    ```

=== "Swift"

    ```swift
    let revenue = AMPRevenue()
    revenue.setProductIdentifier("productIdentifier")
    revenue.setQuantity(3)
    revenue.setPrice(NSNumber(value: 3.99))
    Amplitude.instance().logRevenueV2(revenue)
    ```

Calling `logRevenueV2` generates up to 2 different event types in the platform:

- `[Amplitude] Revenue`: This event is logged for all revenue events, regardless of whether verification is turned on.
- `[Amplitude] Revenue (Verified/Unverified)`: These revenue events contain the actual `$revenue` property.

You can't change the default names given to these client-side revenue events in the raw data, but you can change the [display name](https://help.amplitude.com/hc/en-us/articles/235649848#events). Learn more about tracking revenue in the [Help Center](https://help.amplitude.com/hc/en-us/articles/115003116888).

!!!note

    Amplitude doesn't support currency conversion. Normalize all revenue data to your currency of choice before being sent.

Each revenue event has fields available, and each field has a corresponding set method (such as `price` and `setPrice`). See the [API docs for `AMPRevenue`](http://amplitude.github.io/Amplitude-iOS/Classes/AMPRevenue.html#//api/name/productId) for a full list of fields.

Like `logEvent`, you can attach event properties for each call to `logRevenueV2` . However, these event properties only appear in the [Event Segmentation](https://help.amplitude.com/hc/en-us/articles/230290208-Amplitude-2-0-Event-Segmentation) chart and not in the Revenue charts.

<!-- vale Vale.Spelling = NO-->
| <div class="big-column">Name</div>  | Description  |
| --- | --- |
| `productId` | Optional. NSString. An identifier for the product. Amplitude recommends something like the "Google Play Store product ID". Defaults to `null`. |
| `quantity`| Required. NSInteger. The quantity of products purchased. Note: revenue = quantity * price. Defaults to 1. |
| `price` | Required. NSNumber. The price of the products purchased, and this can be negative. Note: revenue = quantity * price. Defaults to `null`.|
| `revenueType` | Optional, but required for revenue verification. NSString. The revenue type. For example tax, refund, income. Defaults to `null`. |
| `receipt`  | Optional, but required for revenue verification. NSData. Defaults to `null` |
| `receiptSignature` | Optional, but required for revenue verification. Defaults to `null`. |
| `eventProperties`| Optional. NSDictionary. An object of event properties to include in the revenue event. Defaults to `null`. |
<!-- vale Vale.Spelling = YES -->

!!!info

    Price can be negative, which may be useful for tracking revenue lost (such as refunds or costs)

## Troubleshooting and Debugging

--8<-- "includes/sdk-troubleshooting-and-debugging/legacy-ios.md"

## Advanced topics

### User sessions

A session is a period of time that a user has the app in the foreground. Events that are logged within the same session has the same `session_id`. Sessions are handled automatically so you don't have to manually call an API like `startSession()` or `endSession()`.

You can adjust the time window for which sessions are extended by changing the variable `minTimeBetweenSessionsMillis`.

Amplitude groups events together by session. A session represents a single period of user activity, with a start and end time. Different SDKs track sessions differently, depending on the requirements of the platform. The minimum duration of a session can be configured within the SDK.

=== "Objective-C"

    ```obj-c
    [Amplitude instance].defaultTracking.sessions = YES;
    [[Amplitude instance].minTimeBetweenSessionsMillis = 10 * 60 * 1000; // 10 minutes
    [[Amplitude instance] initializeApiKey:@"API_KEY"];
    ```

=== "Swift"

    ```swift
    Amplitude.instance().defaultTracking.sessions = true
    Amplitude.instance().minTimeBetweenSessionsMillis = 10 * 60 * 1000 // 10 minutes
    Amplitude.instance().initializeApiKey("API_KEY")
    ```

You can also log events as out-of-session. Out-of-session events have a `session_id` of -1 and aren't considered part of the current session, meaning they don't extend the current session. This might be useful if you are logging events triggered by push notifications, for example. You can log events as out-of-session by setting the input parameter `outOfSession` to true when calling `logEvent`

=== "Objective-C"

    ```obj-c
    [[Amplitude instance] logEvent:@"EVENT_TYPE" withEventProperties:nil outOfSession:YES];
    ```

=== "Swift"

    ```swift
    Amplitude.instance().logEvent("Push Notification", withEventProperties: nil, outOfSession: true)
    ```

You can also log identify events as out-of-session. This is useful if you are updating user properties in the background and don't want to start a new session. Do this by setting the input parameter `outOfSession` to `true` when calling `identify`.

=== "Objective-C"

    ```obj-c
    AMPIdentify *identify = [[AMPIdentify identify] set:@"key" value:@"value"];
    [[Amplitude instance] identify:identify outOfSession:YES];
    ```

=== "Swift"

    ```swift
    let identify = AMPIdentify()
        .set("key", value: "value")
    Amplitude.instance().identify(identify, outOfSession: true)
    ```

You can use the helper method getSessionId to get the value of the current `sessionId`.

=== "Objective-C"

    ```obj-c
    long long sessionId = [[Amplitude instance] getSessionId];
    ```

=== "Swift"

    ```swift
    Amplitude.instance().getSessionId()
    ```

### Set custom user ID

If your app has its own login system that you want to track users with, you can call setUserId at any time.

=== "Objective-C"

    ```obj-c
    [[Amplitude] instance] setUserId:@"USER_ID"];
    ```

=== "Swift"

    ```swift
    Amplitude.instance().setUserId("USER_ID")
    ```

You can also add the User ID as an argument to the init call.

=== "Objective-C"

    ```obj-c
    [[Amplitude] instance] initializeApiKey:@"API_KEY" userId:@"USER_ID"];
    ```

=== "Swift"

    ```swift
    Amplitude.instance().initializeApiKey("API_KEY", userId: "USER_ID")
    ```

Don't assign users a user ID that could change, because each unique user ID is a unique user in Amplitude. Learn more about how Amplitude tracks unique users in the [Help Center](https://help.amplitude.com/hc/en-us/articles/115003135607-Track-unique-users-in-Amplitude).

### Debug logging

By default, only critical errors are logged to console. To enable debug logging in iOS, change `AMPLITUDE_DEBUG` from 0 to 1 at the top of the Objective-C file you wish to examine. Error messages are printed by default. To disable error logging, change `AMPLITUDE_LOG_ERRORS` from 1 to 0 in Amplitude.m.

### Logged out and anonymous users

<!-- Casey replace this with the includes-->

--8<-- "includes/logged-out-and-anonymous-users.md"

=== "Objective-C"

    ```obj-c
    [[Amplitude instance] setUserId:nil]; // not string nil
    [[Amplitude instance] regenerateDeviceId];
    ```

=== "Swift"

    ```swift
    Amplitude.instance().setUserId("userId")
    Amplitude.instance().regenerateDeviceId()
    ```

### Log events to multiple projects

--8<-- "includes/log-events-to-multiple-projects.md"

=== "Objective-C"

    ```obj-c
    // existing project, existing settings, and existing API key
    [[Amplitude instance] initializeApiKey:@"12345"];
    [[Amplitude instanceWithName:@"new_project"] initializeApiKey:@"67890"]; // new project, new API key

    [[Amplitude instanceWithName:@"new_project"] setUserId:@"123456"]; // need to reconfigure new project
    [[Amplitude instanceWithName:@"new_project"] logEvent:@"Clicked"];

    AMPIdentify *identify = [[AMPIdentify identify] add:@"karma" value:[NSNumber numberWithInt:1]];
    [[Amplitude instance] identify:identify];
    [[Amplitude instance] logEvent:@"Viewed Home Page"];
    ```

=== "Swift"

    ```swift
    // existing project, existing settings, and existing API key
    Amplitude.instance().initializeApiKey("12345")
    Amplitude.instance(withName: "new_project").initializeApiKey("67890") // new project, new API key


    Amplitude.instance(withName: "new_project").initializeApiKey("123456") // need to reconfigure new project
    Amplitude.instance(withName: "new_project").logEvent("Clicked")

    let identify = AMPIdentify()
        .add("karma",value: NSNumber(value: 1))
    Amplitude.instance().identify(identify)
    Amplitude.instance().logEvent("Viewed Home Page")
    ```

### Disable tracking

By default the iOS SDK tracks several user properties such as `carrier`, `city`, `country`, `ip_address`, `language`, `platform`, etc. You can use the provided `AMPTrackingOptions` interface to customize and disable individual fields.

Each operation on the `AMPTrackingOptions` object returns the same instance, letting you chain multiple operations together.

To use the AMPTrackingOptions interface, first include the header:

=== "Objective-C"

    ```obj-c
    #import "AMPTrackingOptions.h"
    ```

Before initializing the SDK with your `apiKey`, create a `AMPTrackingOptions` instance with your configuration and set it on the SDK instance

=== "Objective-C"

    ```obj-c
    AMPTrackingOptions *options = [[[[AMPTrackingOptions options] disableCity] disableIPAddress] disablePlatform];
    [[Amplitude instance] setTrackingOptions:options];
    ```

Tracking for each field can be individually controlled, and has a corresponding method (for example, `disableCountry`, `disableLanguage`).

| <div class="big-column">Method</div> | Description |
| --- | --- |
| `disableCarrier` | Disable tracking of device's carrier. |
| `disableCity` | Disable tracking of user's city. |
| `disableCountry` | Disable tracking of user's country. |
| `disableDeviceManufacturer` | Disable tracking of device manufacturer. |
| `disableDeviceModel` | Disable tracking of device model. |
| `disableDMA` | Disable tracking of user's DMA. |
| `disableIDFA` | Disable tracking of user's IDFA. |
| `disableIDFV` | Disable tracking of user's IDFV. |
| `disableIPAddress` | Disable tracking of user's IP address. |
| `disableLanguage` | Disable tracking of device's language. |
| `disableLatLng` | Disable tracking of user's current latitude and longitude coordinates. |
| `disableOSName` | Disable tracking of device's OS Name. |
| `disableOSVersion` | Disable tracking of device's OS Version. |
| `disablePlatform` | Disable tracking of device's platform. |
| `disableRegion` | Disable tracking of user's region. |
| `disableVersionName` | Disable tracking of your app's version name. |

!!!note

    AMPTrackingOptions only prevents default properties from being tracked on newly created projects, where data has not yet been sent. If you have a project with existing data that you would like to stop collecting the default properties for, please get help in the [Amplitude Community](https://community.amplitude.com/?utm_source=devdocs&utm_medium=helpcontent&utm_campaign=devdocswebsite). Note that the existing data **is not** deleted.

### Carrier

Amplitude determines the user's mobile carrier using [`CTTelephonyNetworkInfo`](https://developer.apple.com/documentation/coretelephony/cttelephonynetworkinfo), which returns the registered operator of the `sim`. 

### COPPA control

COPPA (Children's Online Privacy Protection Act) restrictions on IDFA, IDFV, city, IP address and location tracking can all be enabled or disabled at one time. Apps that ask for information from children under 13 years of age must comply with COPPA.

=== "Objective-C"

    ```obj-c
    [[Amplitude instance] enableCoppaControl];
    ```

=== "Swift"

    ```swift
    Amplitude.instance().enableCoppaControl()
    ```

### Advertiser ID

Advertiser ID (also referred to as IDFA) is a unique identifier provided by the iOS and Google Play stores. As it's unique to every person and not just their devices, it's useful for mobile attribution.
 [Mobile attribution](https://www.adjust.com/blog/mobile-ad-attribution-introduction-for-beginners/) is the attribution of an installation of a mobile app to its original source (such as ad campaign, app store search).
 Mobile apps need permission to ask for IDFA, and apps targeted to children can't track at all. Consider using IDFV, device ID, or an email login system when IDFA isn't available.

=== "Objective-C"

    ```obj-c
    amplitude.adSupportBlock = ^{
        return [[[ASIdentifierManager sharedManager] advertisingIdentifier] UUIDString];
    };
    ```

=== "Swift"

    ```swift
    //  Converted to Swift 5.3 by Swiftify v5.3.22312 - https://swiftify.com/
    amplitude.adSupportBlock = {
        return ASIdentifierManager.shared().advertisingIdentifier.uuidString
    }
    ```

Note that you need to also add `AdSupport.framework` to your project

### Set IDFA as device ID

Amplitude uses the IDFV as the device ID by default, but you can change this behavior. After you set up the logic to fetch IDFA, you can also call this [useAdvertisingIdForDeviceId](http://amplitude.github.io/Amplitude-iOS/Classes/Amplitude.html#//api/name/useAdvertisingIdForDeviceId) API to set the IDFA as your `deviceId`. 

--8<-- "includes/sdk-device-id/lifecycle-header.md"

1. Device id fetched from the SQLite database
2. IDFA if `useAdvertisingIdForDeviceId` is true and `disableIDFA()` wasn’t called
3. IDFV If `disableIDFA()` wasn’t called
4. A randomly generated UUID

--8<-- "includes/sdk-device-id/transfer-to-a-new-device.md"

--8<-- "includes/sdk-device-id/get-device-id.md"

=== "Objective-C"

    ```obj-c
    NSString *deviceId = [[Amplitude instance] getDeviceId];
    ```

=== "Swift"

    ```swift
    let deviceId = Amplitude.instance().getDeviceId()
    ```

--8<-- "includes/sdk-device-id/set-device-id.md"

=== "Objective-C"

    ```obj-c
    [[Amplitude instance] setDeviceId:@"DEVICE_ID"];
    ```

=== "Swift"

    ```swift
    Amplitude.instance().setDeviceId("DEVICE_ID")
    ```

### Location tracking

Amplitude converts the IP of a user event into a location (GeoIP lookup) by default. This information may be overridden by an app's own tracking solution or user data.

### Carrier information

Amplitude-iOS can help report carrier information

If you want to enable SDK to report this information from devices, add `CoreTelephony.framework` as a dependency.

### Dynamic configuration

The iOS SDK lets you configure your apps to use [dynamic configuration](../../dynamic-configuration.md).
 This feature finds the best server URL automatically based on app users' location.

 To use, enable the `useDynamicConfig` flag.

- If you have your own proxy server and use `apiEndPoint` API, leave dynamic configuration off.
- If you have users in China Mainland, then Amplitude recommends using dynamic configuration.
- By default, this feature returns server URL of Amplitude's US servers, if you need to send data to Amplitude's EU servers, use `setServerZone` to set it to EU zone.

=== "Objective-C"

    ```obj-c
    [Amplitude instance].useDynamicConfig = YES;
    ```

=== "Swift"

    ```swift
    Amplitude.instance().useDynamicConfig = true
    ```

### SSL pinning

SSL Pinning is a technique used in the client side to avoid man-in-the-middle attack by validating the server certificates again after SSL handshaking. Only use SSL pinning if you have a specific reason to do so. Contact Support before you ship any products with SSL pinning enabled.

If you installed the SDK using CocoaPods, you must enable the preprocessor macro via your Podfile by adding this post install hook:
<!-- vale off-->
```text title="PodFile"
post_install do |installer_representation|
   installer_representation.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
         config.build_settings['GCC_PREPROCESSOR_DEFINITIONS'] ||= ['$(inherited)', 'AMPLITUDE_SSL_PINNING=1']
      end
   end
end
```
<!--vale on-->
If you installed the SDK directly from the source or Swift Package Manager, you can enable SSL pinning by adding the following preprocessor macro. See this [StackOverflow post](https://stackoverflow.com/questions/26928622/add-preprocessor-macro-to-a-target-in-xcode-6) to see how to add preprocessor macro.

```bash title="xCode Settings"
AMPLITUDE_SSL_PINNING=1
```

### Opt users out of tracking

Users may wish to opt out of tracking entirely, which means Amplitude won't track any of their events or browsing history. `setOptOut` provides a way to fulfill a user's requests for privacy.

=== "Objective-C"

    ```obj-c
    [[Amplitude instance] setOptOut:YES]; // disables instrumentation
    [[Amplitude instance] setOptOut:NO]; // enables instrumentation
    ```

=== "Swift"

    ```swift
    Amplitude.instance().optOut = true // disables instrumentation
    Amplitude.instance().optOut = false // enables instrumentation
    ```

### tvOS and watchOS

This SDK works with tvOS and watch OS apps. To begin, follow the same setup instructions for iOS apps.

!!!note
     tvOS apps don't have persistent storage (they only have temporary storage), so for tvOS the SDK is configured to upload events as soon as they're logged.
      This means `eventUploadThreshold` is set to 1 by default for tvOS. it's assumed that Apple TV devices have a stable internet connection and as a result, uploading events immediately is reasonable.
       If you wish to revert back to the iOS batching behavior, you can do so by changing `eventUploadThreshold` (this is set by default to 30 for iOS).

=== "Objective-C"

    ```obj-c
    [[Amplitude instance] setEventUploadThreshold:30];
    ```

### iOS extensions

The SDK allows for tracking in iOS extensions. To set up tracking in iOS extensions, follow the same setup instructions but initialize the SDK in your extension's `viewDidLoad` method instead from `application:didFinishLaunchingWithOptions:`.

There are a few things to note:

- The `viewDidLoad` method gets called every time your extension is opened. This means that the SDK's `initializeApiKey` method gets called every single time. However, this is okay because it safely ignores calls after the first one. You can protect the initialization with something like a `dispatch_once` block.
- Amplitude's sessions are defined for an app use case. Depending on your expected extension use case, you might not want to enable `defaultTracking.sessions`, or you may want to extend the `minTimeBetweenSessionsMillis` to be longer than five minutes. You should experiment with these two settings to get your desired session definition.
- If you don't expect users to keep your extension open long, you can decrease `eventUploadPeriodSeconds` to something shorter than 30 seconds to upload events at shorter intervals. You can also manually call `[[Amplitude instance] uploadEvents];` to manually force an upload.
    Here is a simple [demo application](https://github.com/amplitude/iOS-Extension-Demo) showing how to instrument the iOS SDK in an extension.

### App Clips

The SDK also allows for tracking in App Clips. To set up tracking in App Clips, you need to install Amplitude-iOS under your App Clip target. Make sure the amplitude-iOS SDK is installed on your main app first.

#### CocoaPods

After creating an App Clip target, open your project Podfile and append the following code:

```text title="Podfile"
target 'appClipTarget' do
  # Comment the next line if you don't want to use dynamic frameworks
  use_frameworks!
  pod 'Amplitude', :git => 'https://github.com/Amplitude/Amplitude-iOS.git'
end
```

Save the Podfile and run `pod install`

#### Swift Package Manager

1. Open your App Clip target in Xcode. And click the + button under `Framework, Libraries, and Embedded Content` section
2. Select `Amplitude` under `Amplitude Package` and click `add` button

### Push notification events

Don't send push notification events client-side via the iOS SDK. Because a user must open the app to initialize the Amplitude SDK in order for the SDK to send the event, events aren't sent to the Amplitude servers until the next time the user opens the app. This can cause data delays.

You can use [mobile marketing automation partners](https://amplitude.com/integrations?category=mobile-marketing-automation) or the [HTTP API V2](https://developers.amplitude.com/docs/http-api-v2) to send push notification events to Amplitude.

### Middleware

Middleware lets you extend Amplitude by running a sequence of custom code on every event. This pattern is flexible and can be used to support event enrichment, transformation, filtering, routing to third-party destinations, and more.

Each middleware is a simple interface with a run method:

```obj-c
- (void)run:(AMPMiddlewarePayload *_Nonnull)payload next:(AMPMiddlewareNext _Nonnull)next;
```

The `payload` contains the `event` being sent and an optional `extra` that lets you pass custom data to your own middleware implementations.

To invoke the next middleware in the queue, use the `next` function. You must call `next(payload)` to continue the middleware chain. If a middleware doesn't call `next`, then the event processing stop executing after the current middleware completes.

Add middleware to Amplitude via `client.addEventMiddleware`. You can add as many middleware as you like. Each middleware runs in the order in which it was added.

You can find examples for [Objective-C](https://github.com/amplitude/ampli-examples/blob/main/ios/objective-c/AmpliObjectiveCSampleApp/AmpliObjectiveCSampleApp/AppDelegate.m#L65) and [Swift](https://github.com/amplitude/ampli-examples/blob/main/ios/swift/AmpliSwiftSampleApp/Shared/AmpliSwiftSampleAppApp.swift#L48).

Learn more about [Middleware](../../sdk-middleware).

### More resources

If you have any problems or issues with the SDK, [create a GitHub issue](https://github.com/amplitude/Amplitude-iOS/issues/new) or submit a request on [Amplitude Help](https://help.amplitude.com/hc/en-us/requests/new).

--8<-- "includes/abbreviations.md"
