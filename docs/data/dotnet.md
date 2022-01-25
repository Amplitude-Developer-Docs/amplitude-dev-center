---
id: dotnet
title: .NET
icon: material/dot-net
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Iteratively supports tracking analytics events from .NET (Standard 1.3 and Standard 2.0) apps written in C# (6 and above).

In C#, the tracking library exposes a type-safe function for every event in your team’s tracking plan. The function’s arguments correspond to the event’s properties and are strongly typed to allow for code completion and compile-time checks.

## Installation

### Generate the SDK

If you have not yet installed the Ampli CLI, [install it now](/using-the-ampli-cli).

To generate the Itly SDK, run `ampli pull {source}` in the top-most folder of your project. By default, the SDK will be generated in `./Itly/`.

:::note Tip
`{source}` is the name of the source you created in your tracking plan (e.g. `csharp`).
:::

### Install dependencies

To validate your analytics events, the .NET/C# SDK depends on [Manatee.Json](https://github.com/gregsdennis/Manatee.Json) (MIT).

In the Itly's folder you'll find the SDK's source code along with a `.csproj` file that automatically links to both Manatee and any underlying analytics provider SDKs required.

To include the SDK in your project, add Itly's `.csproj` file as a project reference. For example, in the folder with your project's `.csproj` file, run:

```bash
dotnet add reference ../Itly/Itly.csproj
dotnet restore
```

If you've configured Itly with Segment, the steps above will also install the vendor's SDK:

- [Segment](https://github.com/segmentio/Analytics.NET) (MIT)

### Import into your app

To use the library, you'll need to import it first:

<Tabs
  groupId="dotnet-source"
  defaultValue="csharp"
  values={[
    { label: 'C#', value: 'csharp', },
  ]
}>
<TabItem value="csharp">

```java
using Iteratively;
```

</TabItem>
</Tabs>

## API

### Load

Load the Itly SDK once when your application starts. The `Load()` method accepts an options object that lets you configure how the Itly SDK works:

| Options | Description |
|-|-|
| `context`| CAn object with a set of properties to add to every event sent by the Itly SDK.<br /><br />Only available if there is at least one [source template](/working-with-templates#adding-a-template-to-a-source) associated with your your team's tracking plan.|
| `disabled`| Specifies whether the Itly SDK does any work. When true, all calls to the Itly SDK will be no-ops. Useful in local or development environments.<br /><br />Optional. Defaults to `false`.|
| `environment` | Specifies the environment the Itly SDK is running in: either `production` or `development`. Environment determines which Access Token is used to load the underlying analytics provider libraries.<br /><br />The option also determines safe defaults for handling event validation errors. In production, when the SDK detects an invalid event, it will log an error but still let the event through. In development, the SDK will throw an exception to alert you that something is wrong.<br /><br />Optional. Defaults to `development`.|
| `destinations` | Specifies any analytics provider-specific configuration. The Itly SDK passes these objects in when loading the underlying analytics provider libraries.<br /><br />Optional.|
| `logger` | To log Itly's logs to a custom logger, implement the `ItlyLogger` protocol and set `logger` to an instance of your class. The Itly SDK will call into your class with all debug, info, warn, and error-level messages.<br /><br />Optional. Defaults to standard out. |
| `validation` | Configures the Itly SDK's behavior when events or traits fail validation against your tracking plan. Supports the following properties:<br /><br />`disabled`<br /> Disables validation altogether. Defaults to `false`.<br /><br />`failOnError`<br />Specifies whether the SDK should throw an exception when validation fails. Defaults to `true` in development, `false` in production.|

For example:

<Tabs
  groupId="dotnet-source"
  defaultValue="csharp"
  values={[
    { label: 'C#', value: 'csharp', },
  ]
}>
<TabItem value="csharp">

```java
# With no context properties or custom destinations
Itly.Load(new Options())

# With context properties (e.g. a string property called version)
Itly.Load(new Options(
    new Context(version: "1.0")
));

# With all options
Itly.Load(new Options(
    new Context(version: "1.0"),
    new DestinationsOptions(
        new CustomOptions(new CustomDestination())
    ),
    disabled: false,
    environment: Iteratively.Environment.Development,
    logger: null,
    validation: new ValidationOptions(
        disabled: false,
        failOnError: true
    )
));
```

</TabItem>
</Tabs>

### Track

To track an event, call the event’s corresponding function. Every event in your tracking plan gets its own function in the Itly SDK.

For example, in the code snippet below, our tracking plan contains an event called `Process Started`. The event was defined with one required property called `userId` and one optional property called `availableProcessors`. The `userId` property's type is a string. The `availableProcessors` property's type an integer.

<Tabs
  groupId="dotnet-source"
  defaultValue="csharp"
  values={[
    { label: 'C#', value: 'csharp', },
  ]
}>
<TabItem value="csharp">

```java
Itly.ProcessStarted("some-user-id",
    availableProcessors: System.Environment.ProcessorCount
);
```

</TabItem>
</Tabs>

<!-- Itly includes code docs in the auto-generated library so your IDE can display relevant documentation for every function and property as you type.

![Code documentation](/img/csharp.png) -->

<!-- ### Alias



### Plugins & Custom Destinations



### Logging -->


