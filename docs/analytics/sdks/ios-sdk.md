--- 
title: Analytics iOS SDK
description: The Amplitude Analytics iOS SDK Installation & Quick Start guide. 
icon: material/apple-ios
---

![CocoaPods](https://img.shields.io/cocoapods/v/Amplitude)

This is official Amplitude Analytics iOS SDK installation and quick start guide.

???info "SDK Resources"
    - [iOS SDK Reference :material-book:](http://amplitude.github.io/Amplitude-iOS/)
    - [iOS SDK Repository :material-github:](https://github.com/amplitude/Amplitude-iOS)
    - [iOS SDK Releases :material-code-tags-check:](https://github.com/amplitude/Amplitude-iOS/releases)

--8<-- "includes/ampli-vs-amplitude.md"

## SDK Installation

### Cocoapods

1. Add dependency to `Podfile`.

  ```bash
  pod 'Amplitude', '~> 8.8.0'
  ```

2. Run `pod install` in the project directory to download dependency.

### Swift Package Manager

1. Navigate to `File` -> `Swift Package Manager` -> `Add Package Dependency`
2. Type in `https://github.com/amplitude/Amplitude-iOS` when choosing package repository.
3. It will automatically resolve it and located to the latest version.
4. After successfully being added, it will show up as a dependency.


### Carthage

Add the following line to your `Cartfile`.
  
```bash 
github "amplitude/Amplitude-iOS" ~> 8.5.0
```

## Usage & Examples

### Importing

Import Amplitude into any file that uses it.

=== "Objective-C"

    ```obj-c
    #import <Amplitude/Amplitude.h>
    ```

=== "Swift"

    ```swift
    import Amplitude
    ```

### Initialization

Initialization is necessary before any instrumentation is done. The API key for your Amplitude project is required. Usually, you can initialize the SDK in the `application:didFinishLaunchingWithOptions:` method of your `YourAppAppDelegate.m` file

=== "Objective-C"

=== "Swift"

=== "Objective-C"

    ```obj-c
    - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
      // Enable sending automatic session events
      [Amplitude instance].trackingSessionEvents = YES;
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
      Amplitude.instance().trackingSessionEvents = true
      // Initialize SDK
      Amplitude.instance().initializeApiKey("API_KEY")
      // Set userId
      Amplitude.instance().setUserId("userId")
      // Log an event
      Amplitude.instance().logEvent("app_start")
          
      return true
    }
    ```

## EU Data Residency

Beginning with version 8.5.0, you can configure the server zone after initializing the client for sending data to Amplitude's EU servers. The SDK sends data based on the server zone if it's set.
 The server zone config supports dynamic configuration as well.

For previous versions, you need to configure the `serverURL` property after initializing the client.

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

## Sending Events


### Basic Events


Events represent how users interact with your application. For example, "Button Clicked" may be an action you want to note.

=== "Objective-C"

    ```obj-c
    [[Amplitude instance] logEvent:@"Button Clicked"];
    ```

=== "Swift"

    ```swift
    Amplitude.instance().logEvent("Button Click")
    ```

### Events with Properties

Events can also contain properties. They provide context about the event taken. For example, "hover time" may be a relevant event property to "button click".

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

## User Properties

User properties help you understand your users at the time they performed some action within your app such as their device details, their preferences, or language. Amplitude-iOS's `AMPIdentity` class manages these features.

!!!warning "User privacy warning"

    Don't track any user data that may be against your privacy terms.

### Setting a User Property

#### `set`

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

#### `setOnce`

`setOnce` sets the value of a user property only once. Subsequent calls using `setOnce` will be ignored.

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


#### `add`

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

#### `preInsert`

This will pre-insert a value or values to a user property, if it doesn't exist in the user property yet.
Preinsert means inserting the value(s) at the beginning of a given list. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are pre inserted. If the user property has an existing value, it will be no operation.

=== "Objective-C"

    ```obj-c
    NSMutableArray *array = [NSMutableArray array];
    [array addObject:@"some_string"];
    [array addObject:[NSNumber numberWithInt:56]];
    AMPIdentify *identify = [[[AMPIdentify identify] preInsert:@"ab-tests" value:@"new-user-test"]
        preInsert:@"some_list" value:array];
    [[Amplitude instance] identify:identify];
    ```

#### `postInsert`

This will post insert a value or values to a user property, if it doesn't exist in the user property yet. Post insert means inserting the value(s) at the end of a given list. If the user property doesn't have a value set yet, it will be initialized to an empty list before the new values are post inserted. If the user property has an existing value, it will be no operation.

=== "Objective-C"

    ```obj-c
    NSMutableArray *array = [NSMutableArray array];
    [array addObject:@"some_string"];
    [array addObject:[NSNumber numberWithInt:56]];
    AMPIdentify *identify = [[[AMPIdentify identify] postInsert:@"ab-tests" value:@"new-user-test"]
        postInsert:@"some_list" value:array];
    [[Amplitude instance] identify:identify];
    ```

#### `remove`

Remove a value or values to a user property, if it does exist in the user property. Remove means remove the existing value(s) from the given list. If the item doesn't exist in the user property, it will be no operation.

=== "Objective-C"

    ```obj-c
    NSMutableArray *array = [NSMutableArray array];
    [array addObject:@"some_string"];
    [array addObject:[NSNumber numberWithInt:56]];
    AMPIdentify *identify = [[[AMPIdentify identify] remove:@"ab-tests" value:@"new-user-test"]
        remove:@"some_list" value:array];
    [[Amplitude instance] identify:identify];
    ```

#### Setting Multiple User Properties

You can use `setUserProperties` as a shorthand to set multiple user properties at once. This method is simply a wrapper around `Identify.set` and `identify`.

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


### Arrays in User Properties

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


#### `prepend` and `append`

- `append` will append a value or values to a user property array.
- `prepend` will prepend a value or values to a user property.

If the user property doesn't have a value set yet, it will be initialized to an empty list before the new values are added. If the user property has an existing value and it's not a list, it will be converted into a list with the new value added.

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



#### `preInsert` and `postInsert`

- `preInsert` will insert a value or values to the front of a user property array if it doesn't exist in the array yet.
- `postInsert` will insert a value or values to the end of a user property array if it doesn't exist in the array yet.

If the user property doesn't exist, it will be initialized to an empty list before the new values are pre-inserted. If the user property has an existing value, there will be no operation.

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


### Removing User Properties

#### Clearing All User Properties

`clearUserProperties` will wipe all of the current user's user properties.

!!!warning

The result is irreversible! Amplitude can't sync the user's user property values from before the wipe to any future events.

=== "Objective-C"

    ```obj-c
    [[Amplitude instance] clearUserProperties];
    ```

=== "Swift"

    ```swift
    Amplitude.instance().clearUserProperties()
    ```


#### `remove`

`remove` removes an existing value or values from a user property. If the item doesn't exist in the user property, there will be no operation.

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

## Setting User Groups

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


You can also use `logEventWithGroups` to set event-level groups, meaning the group designation only applies for the specific event being logged and doesn't persist on the user unless you explicitly set it with setGroup:

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

## Group Identify

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

Use the Group Identify API to set or update properties of particular groups. However, these updates will only affect events going forward.

The `groupIdentifyWithGroupType` method accepts a group type string parameter and group name object parameter, as well as an Identify object that will be applied to the group.

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

An optional `outOfSession` boolean input can be supplied as fourth argument to `groupIdentifyWithGroupType`

## Tracking Revenue

Instances of `AMPRevenue` storesrevenue transactions and defines special revenue properties (such as `revenueType`) used in Amplitude's Event Segmentation and Revenue LTV charts. Each instance is passed to `Amplitude.logRevenueV2`. This allows us to automatically display data relevant to revenue in Amplitude.

To track revenue from a user, call `logRevenueV2` each time a user generates revenue. Here is an example:

=== "Objective-C"

    ```obj-c
    AMPRevenue *revenue = [[[AMPRevenue revenue] setProductIdentifier:@"productIdentifier"] setQuantity:3];
    [revenue setPrice:[NSNumber numberWithDouble:3.99]];
    [[Amplitude instance] logRevenueV2:revenue];
    ```

=== "Swift"

    ```swift
    let revenue = AMPRevenue().setProductIdentifier("productIdentifier").quantity = 3
    revenue?.price = NSNumber(value: 3.99)
    Amplitude.instance().logRevenueV2(revenue)
```



Calling logRevenueV2 will generate up to 2 different event types in the platform:

- '[Amplitude] Revenue': This event is logged for all revenue events, regardless of whether or not verification is turned on.
- '[Amplitude] Revenue (Verified/Unverified)': These revenue events will contain the actual '$revenue' property.

You cannot change the default names given to these client-side revenue events in the raw data but you do have the option to modify the [display name](https://amplitude.zendesk.com/hc/en-us/articles/235649848#events). To learn more about tracking revenue, see our documentation [here](https://amplitude.zendesk.com/hc/en-us/articles/115003116888).

!!!note
    
    Amplitude doesn't support currency conversion. All revenue data should be normalized to your currency of choice before being sent.

Each revenue event has fields available, and each field has a corresponding set method (such as `price` and `setPrice`). See the [API docs for `AMPRevenue`](http://amplitude.github.io/Amplitude-iOS/Classes/AMPRevenue.html#//api/name/productId) for a full list of fields.

Like `logEvent`, event properties can also be attached for each call to `logRevenueV2` . However, these event properties will only appear in the [Event Segmentation](https://help.amplitude.com/hc/en-us/articles/230290208-Amplitude-2-0-Event-Segmentation) chart and not in the Revenue charts.

| <div class="big-column">Name</div> | Type | Description | Default |
| --- | --- | --- | --- |
| `productId` (optional) | NSString | An identifier for the product. We recommend something like the Google Play Store product ID. | null |
| `quantity` (required) | NSInteger | The quantity of products purchased. Note: revenue = quantity * price | 1 |
| `price` (required) | NSNumber | The price of the products purchased, and this can be negative. Note: revenue = quantity * price | null |
| `revenueType` (optional) | NSString | The type of revenue (e.g. tax, refund, income). | null |
| `receipt` (optional, *required for revenue verification) | NSData | This is required if you want to verify the revenue event. | null |
| `eventProperties` (optional) | NSDictionary | A NSDictionary of event properties to include in the revenue event. | null |

!!!info
    
    Price can be negative, which may be useful for tracking revenue lost (such as refunds or costs)

## User Sessions

A session is a period of time that a user has the app in the foreground. Events that are logged within the same session will have the same session_id. Sessions are handled automatically so you don't have to manually call an API like `startSession()` or `endSession()`.

You can adjust the time window for which sessions are extended by changing the variable `minTimeBetweenSessionsMillis`.

Amplitude groups events together by session. A session represents a single period of user activity, with a start and end time. Different SDKs will track sessions differently, depending on the requirements of the platform. The minimum duration of a session can be configured within the SDK.

=== "Objective-C"

    ```obj-c
    [Amplitude instance].trackingSessionEvents = YES;
    [[Amplitude instance].minTimeBetweenSessionsMillis = 10 * 60 * 1000; // 10 minutes
    [[Amplitude instance] initializeApiKey:@"API_KEY"];
    ```

=== "Swift"

    ```swift
    Amplitude.instance().trackingSessionEvents = true
    Amplitude.instance().minTimeBetweenSessionsMillis = 10 * 60 * 1000 // 10 minutes
    Amplitude.instance().initializeApiKey("API_KEY")
    ```

You can also log events as out-of-session. Out-of-session events have a session_id of -1 and are not considered part of the current session, meaning they don't extend the current session. This might be useful if you are logging events triggered by push notifications, for example. You can log events as out-of-session by setting the input parameter `outOfSession` to true when calling `logEvent`

=== "Objective-C"

    ```obj-c
    [[Amplitude instance] logEvent:@"EVENT_TYPE" withEventProperties:nil outOfSession:YES];
    ```

=== "Swift"

    ```swift
    Amplitude.instance().logEvent("Push Notification", withEventProperties: nil, outOfSession: true)
    ```


You can also log identify events as out-of-session, which is useful if you are updating user properties in the background and don't want to start a new session. You can do this by setting the input parameter outOfSession to true when calling `identify`.

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

You can use the helper method getSessionId to get the value of the current sessionId.

=== "Objective-C"

    ```obj-c
    long long sessionId = [[Amplitude instance] getSessionId];
    ```

=== "Swift"

    ```swift
    Amplitude.instance().getSessionId()
    ```


## Set Custom User ID


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

You should not assign users a User ID that could change as each unique User ID is interpreted as a unique user in Amplitude. Please see our article on how we identify and count unique users for further information.

## Debug Logging

By default, only critical errors are logged to console. To enable debug logging in iOS, change `AMPLITUDE_DEBUG` from 0 to 1 at the top of the Objective-C file you wish to examine. Error messages are printed by default. To disable error logging, change `AMPLITUDE_LOG_ERRORS` from 1 to 0 in Amplitude.m.

## Log Out and Anonymous Users

A user's data will be [merged](https://help.amplitude.com/hc/en-us/articles/115003135607) on the backend so that any events up to that point from the same browser will be tracked under the same user. If a user logs out or you want to log the events under an anonymous user, you will need to:

1. Set the `userId` to `null`.
2. Regenerate a new `deviceId`.

After doing that, events coming from the current user/device will appear as a brand new user in Amplitude. Note: If you choose to do this, you will not be able to see that the two users were using the same device.

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

## Advanced Topics


### Logging Events to Multiple Projects

If you want to log events to multiple Amplitude projects, then you will need to have separate instances for each Amplitude project. As mentioned earlier, each instance will allow for completely independent apiKeys, userIds, deviceIds, and settings.

You will need to assign a name to each Amplitude project/instance and use that name consistently when fetching that instance to call functions.

IMPORTANT NOTE: Once you have chosen a name for that instance you cannot change it.

Choose your instance names wisely because every instance's data and settings are tied to its name, and you will need to continue using that instance name for all future versions of your project to maintain data continuity. These names don't need to be the names of your projects in the Amplitude platform, but they will need to remain consistent throughout your code. You also need to be sure that each instance is initialized with the correct apiKey.

Instance names must be non-null and non-empty strings. Names are case insensitive, and you can fetch each instance name by calling.

Each new instance created will have its own apiKey, userId, deviceId, and settings.

The following is an example of how to set up and log events to two separate projects:

=== "Objective-C"

    ```obj-c
    // existing project, existing settings, and existing API key
    [[Amplitude instance] initializeApiKey:@"12345"];
    [[Amplitude instanceWithName:@"new_project"] initializeApiKey:@"67890"]; // new project, new API key

    [[Amplitude instanceWithName:@"new_project"] setUserId:@"joe@gmail.com"]; // need to reconfigure new project
    [[Amplitude instanceWithName:@"new_project"] logEvent:@"Clicked"];

    AMPIdentify *identify = [[AMPIdentify identify] add:@"karma" value:[NSNumber numberWithInt:1]];
    [[Amplitude instance] identify:identify];
    [[Amplitude instance] logEvent:@"Viewed Home Page"];
    ```

### Disable Tracking

By default the iOS SDK will track several user properties such as carrier, city, country, ip_address, language, platform, etc. You can use the provided `AMPTrackingOptions` interface to customize and disable individual fields.\
*Note: Each operation on the AMPTrackingOptions object returns the same instance which allows you to chain multiple operations together.*

To use the AMPTrackingOptions interface, you will first need to include the header:

=== "Objective-C"

    ```obj-c
    #import "AMPTrackingOptions.h"
    ```

Before initializing the SDK with your apiKey, create a `AMPTrackingOptions` instance with your configuration and set it on the SDK instance

=== "Objective-C"

    ```obj-c
    AMPTrackingOptions *options = [[[[AMPTrackingOptions options] disableCity] disableIPAddress] disablePlatform];
    [[Amplitude instance] setTrackingOptions:options];
    ```

Each field can be individually disabled and has a corresponding disable method (for example, disableCountry, disableLanguage, etc.). This table describes the different methods:

| <div class="big-column">Method</div> | Description |
| --- | --- |
| `disableCarrier` | Disable tracking of device's carrier |
| `disableCity` | Disable tracking of user's city |
| `disableCountry` | Disable tracking of user's country |
| `disableDeviceManufacturer` | Disable tracking of device manufacturer |
| `disableDeviceModel` | Disable tracking of device model |
| `disableDMA` | Disable tracking of user's DMA |
| `disableIDFA` | Disable tracking of user's IDFA |
| `disableIDFV` | Disable tracking of user's IDFV |
| `disableIPAddress` | Disable tracking of user's IP address |
| `disableLanguage` | Disable tracking of device's language |
| `disableLatLng` | Disable tracking of user's current lattitude and longitude coordinates |
| `disableOSName` | Disable tracking of device's OS Name |
| `disableOSVersion` | Disable tracking of device's OS Version |
| `disablePlatform` | Disable tracking of device's platform |
| `disableRegion` | Disable tracking of user's couregiontry |
| `disableVersionName` | Disable tracking of your app's version name |

!!!note

    The *AMPTrackingOptions* will only prevent default properties from being tracked on newly created projects, where data has not yet been sent. If you have a project with existing data that you would like to stop collecting the default properties for, please get help in the [Amplitude Community](https://community.amplitude.com/). Note that the existing data will not be deleted.

### COPPA Control

COPPA (Children's Online Privacy Protection Act) restrictions on IDFA, IDFV, city, IP address and location tracking can be enabled or disabled all at once. Remember that apps asking for information from children under 13 years of age must comply with COPPA.

=== "Objective-C"

    ```obj-c
    [[Amplitude instance] enableCoppaControl];
    ```

=== "Swift"

    ```swift
    Amplitude.instance().enableCoppaControl()
    ```


### Advertising Id

Advertiser ID (also referred to as IDFA) is a unique identifier provided by the iOS and Google Play stores. As it's unique to every person and not just their devices, it's useful for mobile attribution. [Mobile attribution](https://www.adjust.com/blog/mobile-ad-attribution-introduction-for-beginners/) is the attribution of an installation of a mobile app to its original source (e.g. ad campaign, app store search). Mobile apps need permission to ask for IDFA, and apps targeted to children cannot track at all. Consider IDFV, device id, or an email login system as alternatives when IDFA is not available.

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


### Set IDFA As Device Id

After you set up the logic to fetch idfa, you can also call this [useAdvertisingIdForDeviceId](http://amplitude.github.io/Amplitude-iOS/Classes/Amplitude.html#//api/name/useAdvertisingIdForDeviceId) API to set the idfa as your device Id.

### Location Tracking

Amplitude converts the IP of a user event into a location (GeoIP lookup) by default. This information may be overridden by an app's own tracking solution or user data.

### Carrier Information

Amplitude-iOS can help report carrier information

If you want to enable SDK to report this information from devices, please add `CoreTelephony.framework` as a dependency.

### Dynamic Configuration

Android SDK allows users to configure their apps to use [dynamic configuration](https://developers.amplitude.com/docs/dynamic-configuration). This feature will find the best server url automatically based on app users' geo location.

- If you have your own proxy server and use setServerUrl API, please leave this OFF.
- If you have users in China Mainland, we suggest you turn this on.
- By default, this feature is OFF. So you need to explicitly set it to ON to use it.
- By default, this feature returns server url for Amplitude's US servers, if you need to send data to Amplitude's EU servers, please use setServerZone to set it to EU zone.

=== "Objective-C"

    ```obj-c
    [Amplitude instance].useDynamicConfig = YES;
    ```

=== "Swift"

    ```swift
    Amplitude.instance().useDynamicConfig = true
    ```


### SSL Pinning


SSL Pinning is a technique that we use in the client side to avoid man-in-the-middle attack by validating the server certificates again even after SSL handshaking.

it's typically not needed unless you have a specific need. Please contact Amplitude support before you ship any products with SSL pinning enabled so that we are aware of it.

- If you installed the SDK using CocoaPods, you will need to enable the preprocessor macro via your Podfile by adding this post install hook:

PodFile

```text title="PodFile"
post_install do |installer_representation|
   installer_representation.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
         config.build_settings['GCC_PREPROCESSOR_DEFINITIONS'] ||= ['$(inherited)', 'AMPLITUDE_SSL_PINNING=1']
      end
   end
end
```

If you installed the SDK directly from the source or Swift Package Manager, you can enable SSL pinning by adding the following preprocessor macro. See this [StackOverflow post](https://stackoverflow.com/questions/26928622/add-preprocessor-macro-to-a-target-in-xcode-6) to see how to add preprocessor macro.

```bash title="xCode Settings"
AMPLITUDE_SSL_PINNING=1
```

### Opt Out of Tracking

Users may wish to opt out of tracking entirely, which means no events and no records of their browsing history. `setOptOut` provides a way to fulfill certain users' requests for privacy.

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

This SDK will work with tvOS and watch OS apps. To begin, follow the same setup instructions for iOS apps.

!!!note
     tvOS apps don't have persistent storage (they only have temporary storage), so for tvOS the SDK is configured to upload events immediately as they are logged. This means `eventUploadThreshold` is set to 1 by default for tvOS. it's assumed that Apple TV devices have a stable internet connection and as a result, uploading events immediately is reasonable. If you wish to revert back to the iOS batching behavior, you can do so by changing `eventUploadThreshold` (this is set by default to 30 for iOS).

=== "Objective-C"

    ```obj-c
    [[Amplitude instance] setEventUploadThreshold:30];
    ```

### iOS Extensions

The SDK allows for tracking in iOS extensions. To set up tracking in iOS extensions, you should follow the same setup instructions. In step six. The only difference is to initialize the SDK in your extension's `viewDidLoad` method instead from `application:didFinishLaunchingWithOptions:`.

Here are a couple of things to note:

- The `viewDidLoad` method will get called every time your extension is opened. This means that our SDK's `initializeApiKey` method will get called every single time. However, this is okay since it will safely ignore subsequent calls after the first one. If you wish to, you can protect the initialization with something like a dispatch_once block.
- Our definition of sessions was intended for an app use case. Depending on your expected extension use case, you might not want to enable `trackingSessionEvents`, or you may want to extend the `minTimeBetweenSessionsMillis` to be longer than five minutes. You should experiment with these two settings to get your desired session definition.
- In addition, you may want to decrease `eventUploadPeriodSeconds` to something shorter than 30 seconds to upload events at shorter intervals if you don't expect users to keep your extension open that long. You can also manually call `[[Amplitude instance] uploadEvents];` to manually force an upload.\
    Here is a simple demo application showing how to instrument the iOS SDK in an extension.

Here is a simple [demo application](https://github.com/amplitude/iOS-Extension-Demo) showing how to instrument the iOS SDK in an extension.

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


### Push Notification Events

Push notification events shouldn't be sent client-side via the iOS SDK because a user must open the app to initialize the Amplitude SDK in order for the SDK to send the event. Therefore, if push notification events are tracked client-side then there can be data delays as the push notification event will not be sent to Amplitude's servers until the next time the user opens the app.

You can use our [mobile marketing automation partners](https://amplitude.com/integrations?category=mobile-marketing-automation) or our [HTTP API V2](https://developers.amplitude.com/docs/http-api-v2) to send push notification events to Amplitude.

### Middleware

Middleware allows you to extend Amplitude by running a sequence of custom code on every event. This pattern is flexible and can be used to support event enrichment, transformation, filtering, routing to third-party destinations, and more.

Each middleware is a simple interface with a run method:

```obj-c
- (void)run:(AMPMiddlewarePayload *_Nonnull)payload next:(AMPMiddlewareNext _Nonnull)next;
```

The `payload` contains the `event` being sent as well as an optional `extra` that allows you to pass custom data to your own middleware implementations.

To invoke the next middleware in the queue, use the `next` function. You must call `next(payload)` to continue the middleware chain. If a middleware doesn't call `next`, then the event processing stop executing after the current middleware completes.

Middleware is added to Amplitude via `client.addEventMiddleware`. You can add as many middleware as you like. Each middleware runs in the order in which it was added.

You can find sample example for [Objective-C](https://github.com/amplitude/ampli-examples/blob/main/ios/objective-c/AmpliObjectiveCSampleApp/AmpliObjectiveCSampleApp/AppDelegate.m#L65) and [Swift](https://github.com/amplitude/ampli-examples/blob/main/ios/swift/AmpliSwiftSampleApp/Shared/AmpliSwiftSampleAppApp.swift#L48).

### Need Help?

If you have any problems or issues with the SDK, [create a GitHub issue](https://github.com/amplitude/Amplitude-iOS/issues/new) or submit a request on [Amplitude Help](https://help.amplitude.com/hc/en-us/requests/new).
