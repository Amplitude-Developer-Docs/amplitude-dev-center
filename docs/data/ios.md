---
id: ios
title: iOS (Itly)
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::note Previous Version
Still using the **iOS (Legacy)** runtime? Docs for the previous version are available [here](ios-legacy).
:::
:::note Migrating
Migrating from **iOS (Legacy)** to the new **iOS** runtime? A migration guide is available [here](#migrating-from-previous-version).
:::

Iteratively supports tracking analytics events from iOS apps written in Swift and Objective-C.

In Swift and Objective-C, the tracking library exposes a type-safe function for every event in your team’s tracking plan. The function’s arguments correspond to the event’s properties and are strongly typed to allow for code completion and compile-time checks.

## Installation

### Generate the SDK

If you have not yet installed the Ampli CLI, [install it now](/using-the-ampli-cli).

To generate the Itly SDK, run `ampli pull {source}` in the folder with your Info.plist file. By default, the SDK will be generated in `./Itly/`.

:::note Tip
`{source}` is the name of the source you created in your tracking plan (e.g. `ios`).
:::

After calling `ampli pull` for the first time, add the generated tracking library to your project:

- Right click on the yellow project folder and click **Add Files to "{Project}"**
- Select the Itly folder
- Select **Create groups**
- Make sure **{Project}** is checked in **Add to targets**
- Click **Add**

### Install dependencies

The generated Itly SDK will automatically reference its dependencies based on the destinations you've configured in your tracking plan. By default, the SDK depends on [ItlySdk](https://github.com/iterativelyhq/itly-sdk-ios) (the base Itly library), [SchemaValidatorPlugin](https://github.com/iterativelyhq/itly-sdk-ios/tree/master/SchemaValidatorPlugin) (the event validation plugin). Optionally, it also depends on provider-specific plugins like [AmplitudePlugin](https://github.com/iterativelyhq/itly-sdk-ios/tree/master/AmplitudePlugin) and [SegmentPlugin](https://github.com/iterativelyhq/itly-sdk-ios/tree/master/SegmentPlugin).

To install these dependencies with CocoaPods:

- Close Xcode
- If you haven't already, install CocoaPods with `sudo gem install cocoapods`
- If you haven't already, create a file called `Podfile` in the project root folder (the one with your `.xcodeproj`) and edit it to contain:

```bash
platform :ios, '10.0'

target '{Project-Name}' do
  use_frameworks!

  pod 'ItlySdk', '~> 1.0'
  pod 'ItlySchemaValidatorPlugin', '~> 1.0'
end
```
- Run `pod install`
- Open Xcode but don't open the `.xcodeproj` file, instead open the `.xcodeworkspace` file

If you've configured Itly with Amplitude or Segment, you'll also install each configured provider's SDK. Edit your `Podfile` and add the relevant pods.

```bash
  pod 'ItlyAmplitudePlugin', '~> 1.0'
  pod 'ItlySegmentPlugin', '~> 1.0'
```

To install these dependencies with Carthage:

- Close Xcode
- If you haven't already, install Carthage with `brew install carthage`
- If you haven't already, create a file called `Cartfile` in the project root folder (the one with your `.xcodeproj`) and edit it to contain:

```bash
github "iterativelyhq/itly-sdk-ios"
```
- Run `carthage update --platform iOS`
- Run `carthage build --platform iOS` to build nested dependencies
- Open Xcode
- Select the top-level app in the Project Navigator
- Make sure the main project's target (in the TARGETS section) is selected
- Select the General tab
- Drag and drop ItlySdk.framework, ItlySchemaValidatorPlugin.framework, and DSJSONSchemaValidation.framework from the `Carthage/Build` folder to the Frameworks, Libraries, and Embedded Content section
- Select the Build Phases tab
    - Click the Plus icon in the top left corner of that tab, click New Run Script Phase
    - Create a new run script:
        - Shell: `/bin/sh`
        - Script: `/usr/local/bin/carthage copy-frameworks`

If you've configured Itly with Amplitude or Segment, you'll drag and drop each configured provider's SDK:
 - ItlyAmplitudePlugin.framework and Amplitude.framework for Amplitude
 - ItlySegmentPlugin.framework and Analytics.framework for Segment

### Import into your app

If you are using Swift, no import is needed to use the library. If you are using Objective-C, you'll need to import it first:

<Tabs
  groupId="ios-source"
  defaultValue="obj-c"
  values={[
    { label: 'Swift', value: 'swift', },
    { label: 'Objective-C', value: 'obj-c', },
  ]
}>
<TabItem value="swift">
N/A
</TabItem>
<TabItem value="obj-c">

```c
#import "Itly/Itly.h"
```

</TabItem>
</Tabs>

## API

### Load

Initialize the Itly SDK once when your application starts. The `load` method accepts an options object that lets you configure how the Itly SDK works:

| Options | Description |
|-|-|
| `context`| An object with a set of properties to add to every event sent by the Itly SDK.<br /><br />Only available if there is at least one [source template](/working-with-templates#adding-a-template-to-a-source) associated with your your team's tracking plan.|
| `destinations` | Specifies any analytics provider-specific configuration. The Itly SDK passes these objects in when loading the underlying analytics provider libraries.<br /><br />Note: only the Iteratively destination is currently supported.<br /><br />Optional.|
| `options` | Specifies additional configuration options for the Itly SDK. Optional.<br /><br />`disabled`<br />Specifies whether the Itly SDK does any work. When true, all calls to the Itly SDK will be no-ops. Useful in local or development environments.<br /><br />Optional. Defaults to `false`.<br /><br />`environment`<br />Specifies the environment the Itly SDK is running in: either `ItlySdk.Environment.production` (`ITLEnvironmentProduction` in Obj-C) or `ItlySdk.Environment.development` (`ITLEnvironmentDevelopment` in Obj-C). Environment determines which Access Token is used to load the underlying analytics provider libraries.<br /><br />The option also determines safe defaults for handling event validation errors. In production, when the SDK detects an invalid event, it will log an error but still let the event through. In development, the SDK will terminate the application to alert you that something is wrong.<br /><br />Optional. Defaults to `development`.<br /><br />`plugins`<br />An array of additional plugins to load into the Itly SDK. Plugins allow you to extend the Itly SDK's event validation and event tracking functionality with your own. For example, a plugin can be used to implement a custom destination or a custom event validator.<br /><br />[Click here](https://bitbucket.org/seasyd/examples/src/master/ios-swift-v2/ItlySwiftCarthageExample/CustomPlugin.swift) to see a sample custom destination plugin written in Swift.<br /><br />[Click here](https://bitbucket.org/seasyd/examples/src/master/ios-objc-v2/ItlyObjCCarthageExample/CustomPlugin.m) to see a sample custom destination plugin written in Objective-C.<br /><br />Optional.<br /><br />`logger`<br />To log Itly's logs to a custom logger, extend the `Logger` class (`ITLLogger` in Objective-C) and set `logger` to an instance of your class. The Itly SDK will call into your class with all debug, info, warn, and error-level messages.<br /><br />[Click here](https://bitbucket.org/seasyd/examples/src/master/ios-swift-v2/ItlySwiftCarthageExample/CustomLogger.swift) to see a a sample custom logger written in Swift.<br /><br />[Click here](https://bitbucket.org/seasyd/examples/src/master/ios-objc-v2/ItlyObjCCarthageExample/CustomLogger.m) to see a a sample custom logger written in Objective-C.<br /><br />Optional. |

For example:

<Tabs
  groupId="ios-source"
  defaultValue="swift"
  values={[
    { label: 'Swift', value: 'swift', },
    { label: 'Objective-C', value: 'obj-c', },
  ]
}>
<TabItem value="swift">

```c
// Load Itly with no custom plugins or logger
Itly.instance.load()

// Or, load Itly with a custom plugin and logger
Itly.instance.load(
    options: Options(
        environment: Environment.development,
        plugins: [CustomPlugin()],
        logger: CustomLogger()
    )
)
```

</TabItem>
<TabItem value="obj-c">

```c
// Load Itly with no custom plugins or logger
// [Itly.instance load];

// Or, load Itly with a custom plugin and logger
[Itly.instance load:nil options:[ITLItlyOptions builderBlock:^(ITLItlyOptionsBuilder *b) {
    b.environment = ITLEnvironmentDevelopment;
    b.plugins = @[[CustomPlugin new]];
    b.logger = [CustomLogger new];
}]];
```

</TabItem>
</Tabs>

### Track

To track an event, call the event’s corresponding function. Every event in your tracking plan gets its own function in the Itly SDK.

For example, in the code snippet below, our tracking plan contains an event called `View Loaded`. The event was defined with one required property called `name` and one optional property called `description`. The `name` property's type is an enum. The `description` property's type is a string.

<Tabs
  groupId="ios-source"
  defaultValue="swift"
  values={[
    { label: 'Swift', value: 'swift', },
    { label: 'Objective-C', value: 'obj-c', },
  ]
}>
<TabItem value="swift">

```c
Itly.instance.viewLoaded(name: ViewLoaded.Name.firstView)
```

</TabItem>
<TabItem value="obj-c">

```c
// Track a View Loaded event with a required enum property called name
[Itly.instance viewLoadedWithName:ViewLoadedNameFirstView];
```
> In Objective-C, the builder pattern is used to set optional properties.

</TabItem>
</Tabs>

## Migrating from Previous Version

### Introduction

The new Iteratively Swift & Objective-C SDK enjoys a simpler deployment model and introduces several new features to help developers implement product analytics:

- Previously, the entire SDK was codegen'd into your source tree. In the new version, the SDK is split into two, allowing developers to call `ampli pull` freely without worrying about pulling down changes that may affect their application's behavior:
    - The static, core SDK — open source, hosted on GitHub, and usable standalone, the static SDK contains all the logic needed to validate, track, and test analytics events. It is now semantically versioned and published to popular package repos, incl. Carthage and CocoaPods.
    - The dynamic, codegen'd API — generated by `ampli pull` and placed into your source tree, the codegen'd API contains event classes and a corresponding strongly-typed API only. It delegates all work to the core SDK and contains no logic.
- The core SDK is now extensible via plugins. 5 plugins are currently available out of the box: a JSON Schema validation plugin, and 4 destination plugins: Segment, Amplitude, and Iteratively.
- When environment is set to `development`, the SDK will stream events to Amplitude's [User Lookup](https://help.amplitude.com/hc/en-us/articles/229313067-User-Look-Up) dashboard. The live debugger allows developers to watch tracked events, inspect their payloads, and detect validation problems.

### Tracking Plan Changes

- Update your source's runtime to **iOS — Swift (2.0)** or **iOS — Obj-C (2.0)**

### Xcode Changes (Carthage)

- Remove from Cartfile:

```java
github "dashevo/JSONSchemaValidation"
// If using Amplitude
github "amplitude/Amplitude-iOS"
// If using Segment
github "segmentio/analytics-ios"
```

- Add to Cartfile:

```java
github "iterativelyhq/itly-sdk-ios"
```

### Xcode Changes (CocoaPods)

- Remove from Podfile:

```java
pod 'DSJSONSchemaValidation'
// If using Amplitude
pod 'Amplitude-iOS', '~> 4.5'
// If using Segment
pod 'Analytics', '3.7.0'
```

- Add to Podfile:

```java
pod 'ItlySdk', '~> 1.0'
pod 'ItlySchemaValidatorPlugin', '~> 1.0'
// If using Amplitude
pod 'ItlyAmplitudePlugin', '~> 1.0'
// If using Segment
pod 'ItlySegmentPlugin', '~> 1.0'
```

### CLI Changes

- Pull down the new SDK inside your iOS project's folder (the one with Info.plist):

```bash
ampli pull
```

- Custom destination adapters are now passed in as plugins rather than as part of `ItlyDestinations`. If you are using a custom destination:
    - Remove e.g. `custom: ItlyCustomOptions(adapter: CustomDestination())` from `destinations`
    - Add `plugins: [CustomPlugin()]` to `Options`:

    ```java
    Itly.instance.load(
        options: Options(
            environment: Environment.development,
            plugins: [CustomPlugin()],
            logger: CustomLogger()
        )
    )
    ```

    - Or in Objective-C:

    ```objectivec
    [Itly.instance load:nil options:[ITLItlyOptions builderBlock:^(ITLItlyOptionsBuilder *b) {
        b.environment = ITLEnvironmentDevelopment;
        b.plugins = @[[CustomPlugin new]];
        b.logger = [CustomLogger new];
    }]];
    ```

### Custom Destination

In the new SDK, custom destinations no longer implement an `ItlyDestination` interface. They are now considered plugins and extend the `Plugin` class (`ITLPlugin` in Objective-C).

For example, the following custom destination:

```java
final class MyCustomAdapter: ItlyDestination {
    func identify(_ userId: String?, properties: [String: Any]?) {
    }
    
    func alias(_ userId: String, previousId: String?) {
    }
    
    func group(_ groupId: String, properties: [String: Any]?) {
    }
    
    func track(_ userId: String?, eventName: String, properties: [String: Any]) {
    }
    
    func reset() {
    }
}
```

```objectivec
@interface MyCustomAdapter: NSObject<ItlyDestination>
@end

@implementation MyCustomAdapter
- (instancetype)init {
    if (self = [super init]) {
    }
    return self;
}

- (void)track:(NSString *)userId eventName:(NSString *)eventName properties:(NSDictionary *)properties {
}

- (void)alias:(NSString *)userId previousId:(NSString *)previousId {
}

- (void)group:(NSString *)groupId properties:(NSDictionary *)properties {
}

- (void)identify:(NSString *)userId properties:(NSDictionary *)properties {    
}

- (void)reset {
}
@end
```

Now looks like this:

```java
class CustomPlugin: Plugin {
    override init() {
        super.init(id: "custom-plugin")
    }
    
    public override func load(_ options: Options) {
        super.load(options)
    }
    
    override func alias(_ userId: String, previousId: String?) {
    }
    
    override func identify(_ userId: String?, properties: Properties?) {
    }

    override func group(_ userId: String?, groupId: String, properties: Properties?) {
    }
    
    override func track(_ userId: String?, event: Event) {
    }
    
    override func reset() {
    }
    
    override func flush() {
    }
    
    override func shutdown() {
    }
}
```

```objectivec
@interface CustomPlugin : ITLPlugin
@property id<ITLLogger> _Nullable logger;
@end

@implementation CustomPlugin: ITLPlugin
- (instancetype)init {
    if (self = [super initWithId:@"custom-plugin"]) {
    }
    return self;
}

- (void)load:(ITLItlyOptions *)options {
}

- (void)alias:(NSString *)userId previousId:(NSString *)previousId {
}

- (void)identify:(NSString *)userId properties:(ITLProperties *)properties {
}

- (void)group:(NSString *)userId groupId:(NSString *)groupId properties:(ITLProperties *)properties {
}

- (void)track:(NSString *)userId event:(ITLEvent *)event {
}
@end
```

`Properties` exposes a dictionary of properties as `NSDictionary<NSString*, id>* properties`. `Event` exposes the event's `id`, `name`, `version`, and `properties`.