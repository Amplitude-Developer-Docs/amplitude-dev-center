---
id: ios-legacy
title: iOS (Legacy)
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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

To validate your analytics events, the iOS SDK depends on [DSJSONSchemaValidation](https://github.com/dashevo/JSONSchemaValidation) (MIT). To install this dependency with CocoaPods:

- Close Xcode
- If you haven't already, install CocoaPods with `sudo gem install cocoapods`
- If you haven't already, create a file called `Podfile` in the project root folder (the one with your `.xcodeproj`) and edit it to contain:

```bash
platform :ios, '9.0'

target '{Project-Name}' do
  use_frameworks!

  pod 'DSJSONSchemaValidation'
end
```
- If you already had a `Podfile`, simply add `pod 'DSJSONSchemaValidation'` to your target
- Run `pod install`
- Open Xcode but don't open the `.xcodeproj` file, instead open the `.xcodeworkspace` file

If you've configured Itly with Amplitude, or Segment, you'll also install each configured provider's SDK. Edit your `Podfile` and add the relevant pods.

```bash
pod 'Amplitude-iOS', '~> 4.5'
pod 'Analytics', '3.7.0'
```

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

Initialize the Itly SDK once when your application starts. The `setup()` (`init` in Objective-C) method accepts an options object that lets you configure how the Itly SDK works:

| Options | Description |
|-|-|
| `context`| An object with a set of properties to add to every event sent by the Itly SDK.<br /><br />Only available if there is at least one [source template](/working-with-templates#adding-a-template-to-a-source) associated with your your team's tracking plan.|
| `isDisabled`<br />(`disabled` in Objective-C)| Specifies whether the Itly SDK does any work. When true, all calls to the Itly SDK will be no-ops. Useful in local or development environments.<br /><br />Optional. Defaults to `false`.|
| `environment` | Specifies the environment the Itly SDK is running in: either `production` or `development`. Environment determines which Access Token is used to load the underlying analytics provider libraries.<br /><br />The option also determines safe defaults for handling event validation errors. In production, when the SDK detects an invalid event, it will log an error but still let the event through. In development, the SDK will throw an exception to alert you that something is wrong.<br /><br />Optional. Defaults to `development`.|
| `logger` | To log Itly's logs to a custom logger, implement the `ItlyLogger` protocol and set `logger` to an instance of your class. The Itly SDK will call into your class with all debug, info, warn, and error-level messages.<br /><br />[Click here](https://bitbucket.org/seasyd/examples/src/master/ios-swift/IterativelySwift/CustomLogger.swift) to see a sample logger implemented in Swift.<br /><br />Optional. Defaults to standard out. |
| `destinations` | Configuration options object to customize the analytics providers used by the Itly SDK.<br /><br />[Click here](https://bitbucket.org/seasyd/examples/src/master/ios-swift/IterativelySwift/CustomDestination.swift) to see a sample custom destination implemented in Swift, and [click here](https://bitbucket.org/seasyd/examples/src/1c87c96354b146448f0a0eb5d4b868ffb13d3c5a/ios-swift/IterativelySwift/AppDelegate.swift#lines-20) to see how to load a custom destination in the Itly SDK.<br /><br />Required if a custom destination is connected to your iOS source.|

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
// With no context properties
Itly.setup(ItlyOptions())

// With context properties (e.g. a string property called version)
Itly.setup(ItlyOptions(context: Context(version: "1.0")))
```

</TabItem>
<TabItem value="obj-c">

```c
// With no context properties or custom destinations
[Itly init];

// With context properties (e.g. a string property called version)
[Itly init:[ItlyOptions context:[Context version:@"1.0"]]];
```

</TabItem>
</Tabs>

<!--
Commented out until we have full docs for custom destinations

// With a custom destination
ItlyCustomOptions *options = [ItlyCustomOptions adapter:[[MyCustomAdapter alloc] init]];
[Itly init:[ItlyOptions destinations:[ItlyDestinations custom:options]]];
-->


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
Itly.instance.trackViewLoaded(ViewLoaded(name: .firstView))
```

</TabItem>
<TabItem value="obj-c">

```c
// Track a View Loaded event with a required enum property called name
[[Itly instance] trackViewLoaded:[ViewLoaded name:ViewLoadedNameFirstView]];

// Track the same event with an optional string property called description
[[Itly instance] trackViewLoaded:[ViewLoaded
  name:ViewLoadedNameFirstView
  builderBlock:^(ViewLoadedBuilder *builder) {
    builder.description = @"First View";
  }
]];
```
> In Objective-C, the builder pattern is used to set optional properties.

</TabItem>
</Tabs>



<!-- Itly includes code docs in the auto-generated library so your IDE can display relevant documentation for every function and property as you type.

![Code documentation](/img/swift.png) -->

<!-- ### Alias



### Plugins & Custom Destinations



### Logging -->


