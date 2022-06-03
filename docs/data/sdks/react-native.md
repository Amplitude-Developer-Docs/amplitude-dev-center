---
title: React Native
description: The Amplitude React Native SDK Installation & Quick Start guide.
icon: fontawesome/brands/react
---


![npm version](https://badge.fury.io/js/%40amplitude%2Freact-native.svg)

This is the official documentation for the Amplitude Analytics React Native SDK.

!!!info "SDK Resources"
    - [React SDK Reference :material-book:](https://amplitude.github.io/Amplitude-ReactNative/)
    - [React SDK Repository :material-github:](https://github.com/amplitude/Amplitude-ReactNative)
    - [React SDK Releases :material-code-tags-check:](https://github.com/amplitude/Amplitude-ReactNative/releases)

--8<-- "includes/ampli-vs-amplitude.md"

## SDK installation

### Add dependencies

Run `yarn add @amplitude/react-native` in your project directory, the same level with `package.json`.

```bash
yarn add @amplitude/react-native@latest
```

### iOS installation

```bash
cd /ios && pod install
```

## Usage and examples

### Initialization

Before you can instrument, you must initialize the SDK using the API key for your Amplitude project.

=== "TypeScript"

    ```ts
    import * as React from 'react';
    import { Button } from 'react-native';
    import { Amplitude, Identify } from '@amplitude/react-native';

    const ampInstance = Amplitude.getInstance();
    ampInstance.init(API_KEY);

    export function MyApp() {
      return (
        <Button
          title="Log Event"
          onPress={() => ampInstance.logEvent('BUTTON_CLICKED')}
        />
      );
    }
    ```

### EU data residency

Beginning with version 2.6.0, you can configure the server zone after initializing the client for sending data to Amplitude's EU servers. The SDK sends data based on the server zone if it's set.
 The server zone configuration supports dynamic configuration as well.

For earlier versions, you need to configure the `serverURL` property after initializing the client.

!!!note
    For EU data residency, the project must be set up inside Amplitude EU. You must initialize the SDK with the API key from Amplitude EU.

=== "TypeScript"

    ```ts
    // For versions starting from 2.6.0
    // No need to call setServerUrl for sending data to Amplitude's EU servers
    Amplitude.getInstance().setServerZone('EU');

    // For earlier versions
    Amplitude.getInstance().setServerUrl("https://api.eu.amplitude.com"));
    ```

### Sending events

#### Basic events

Events represent how users interact with your application. For example, "button clicked" may be an action you want to track.

=== "TypeScript"

    ```ts
    Amplitude.getInstance().logEvent('BUTTON_CLICKED');
    ```

#### Events with properties

Events can also contain properties that give context about the event. For example, "hover time" may be a relevant event property to "button click"

=== "TypeScript"

    ```ts
    Amplitude.getInstance().logEvent("BUTTON_CLICKED", {"Hover Time": "100ms"});
    ```

#### Flush events

Events are typically stored in a buffer and flushed periodically. This behavior is configurable. You can also flush events manually

=== "TypeScript"

    ```ts
    Amplitude.getInstance().uploadEvents();
    ```

### User Properties

User properties help you understand your users at the time they performed some action within your app such as their device details, their preferences, or language.
 Amplitude-ReactNative's Identify class manages these features. You need to import the `Identify` before using it.

```ts
import { Identify } from '@amplitude/react-native';
```

!!!warning "Privacy and Tracking"
    Don't track any user data that's against your privacy terms.

#### Setting a user property

#### `set`

`set` sets the value of a user property. You can also chain together multiple identify calls.

=== "TypeScript"

    ```ts
    const identify = new Identify();
    identify.set("gender", "female").set("age", 20);
    Amplitude.getInstance().identify(identify);
    ```

#### `setOnce`

`setOnce` sets the value of a user property once. Later calls using `setOnce` are ignored.

=== "TypeScript"

    ```ts
    const identify1 = new Identify();
    identify1.setOnce("sign_up_date", "2015-08-24");
    Amplitude.getInstance().identify(identify1);
    const identify2 = new Identify();
    identify2.setOnce("sign_up_date", "2015-08-24");
    Amplitude.getInstance().identify(identify2);// is ignored
    ```

#### `add`

`add` increments a user property by some numerical value. If the user property does not have a value set yet, it will be initialized to 0 before being incremented.

=== "TypeScript"

    ```ts
    const identify = new Identify();
    identify.add("karma", 0.123);
    Amplitude.getInstance().identify(identify);
    ```

### Setting multiple user properties

You can use `setUserProperties` as a shorthand to set multiple user properties at once. This method is simply a wrapper around `Identify.set` and `identify`.

=== "TypeScript"

    ```ts
    const userProperties = {
        "KEY": "VALUE",
        "OTHER_KEY": "OTHER_VALUE",
    }
    Amplitude.getInstance().setUserProperties(userProperties);
    ```

### Arrays in user properties

Arrays can be used as user properties. You can directly set arrays or use append to generate an array.

=== "TypeScript"

    ```ts
    const colors = ["rose", "gold"];
    const numbers = [4, 5];
    const identify = new Identify();
    identify.set("colors", colors)
            .append("ab-tests", "campaign_a")
            .append("existing_list", numbers);
    Amplitude.getInstance().identify(identify);
    ```

#### `append`

`append` appends a value or values to a user property array.
If the user property does not have a value set yet, it will be initialized to an empty list before the new values are added. If the user property has an existing value and it is not a list, it will be converted into a list with the new value added.

=== "TypeScript"

    ```ts
    const array = ["some_string", 56];
    const identify = new Identify();
    identify.append("ab-tests", "new-user-test")
    Amplitude.getInstance().identify(identify);
    ```

#### Removing user properties

##### Clearing all user properties

`clearUserProperties` will wipe all of the current user's user properties.

!!!warning "This action is permanent"

    Because this action clears all user properties, Amplitude can't sync the user's user property values from before the wipe to any of the user's future events.

=== "TypeScript"

```ts
Amplitude.getInstance().clearUserProperties();
```

##### `remove`

`remove` removes a value or values to a user property, if it does exist in the user property. If the item doesn't exist in the user property, nothing happens.

=== "TypeScript"

    ```ts
    const array = ["some_string", 56];
    const identify = new Identify();
    identify.remove("ab-tests", "new-user-test")
            .remove("some_list",array);
    Amplitude.getInstance().identify(identify);
    ```

##### `unset`

`unset` unsets and removes a user property.

=== "TypeScript"

    ```ts
    const identify = new Identify();
    identify.unset("karma").unset("gender");
    Amplitude.getInstance().identify(identify);
    ```

### Track Revenue

Amplitude can track revenue generated by a user. Revenue is tracked through distinct revenue objects, which have special fields that are used in Amplitude's Event Segmentation and Revenue LTV charts.
 This allows Amplitude to automatically display data relevant to revenue in the platform. Revenue objects support the following special properties, as well as user-defined properties through the `eventProperties` field.

Price can be a negative value, which is useful for tracking lost revenue.

!!!note

    Amplitude doesn't support currency conversion. All revenue data should be normalized to your currency of choice before being sent.

=== "TypeScript"

    ```ts
    type RevenueProperties = {
      price: number;
      productId?: string;
      quantity?: number;
      revenueType?: string;
      receipt?: string;
      receiptSignature?: string;
      eventProperties?: PropertiesObject;
    };
    ```

=== "TypeScript Example"

    ```ts
    const userProperties = {
        price: 100;
        productId: "123";
        quantity: 2;
        revenueType: "productRevenue";
        receipt: "11111";
        receiptSignature: "signature";
        eventProperties: {
            "KAY": "VALUE",
          "OTHER_KEY": "OTHER_VALUE"
        };
    }
    Amplitude.getInstance().logRevenue(userProperties);
    ```

### Group user properties

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

--8<-- "includes/group-identify-considerations.md"

=== "TypeScript"

```ts
const identify = new Identify();
identify.set("gender", "female").set("age", 20);
Amplitude.getInstance().groupIdentify("groupType", "groupValue", identify);
```

### User sessions

A session is a period of time that a user has the app in the foreground. Events that are logged within the same session  have the same `session_id`.
 Sessions are handled automatically so you don't have to manually call an API like `startSession()` or `endSession()`.
Amplitude groups events together by session.
 A session represents a single period of user activity, with a start and end time. Different SDKs track sessions differently, depending on the requirements of the platform.
You are able to determine whether to automatically log start and end session events corresponding to the start and end of a user's session.

=== "TypeScript"

    ```ts
    //Enable automatically log start and end session events
    Amplitude.getInstance().trackingSessionEvents(true);
    //Disable automatically log start and end session events
    Amplitude.getInstance().trackingSessionEvents(false);
    ```

### Set custom user ID

If your app has its own login system that you want to track users with, you can call `setUserId` at any time.

=== "TypeScript"

    ```ts
    Amplitude.getInstance().setUserId("test_user_id");
    ```

## Advanced topics

### COPPA Control

COPPA (Children's Online Privacy Protection Act) restrictions on IDFA, IDFV, city, IP address and location tracking can be enabled or disabled all at once.
 Remember that apps asking for information from children under 13 years of age must comply with COPPA.

=== "TypeScript"

    ```ts
    //Enable COPPA Control
    Amplitude.instance().enableCoppaControl();
    //Disable COPPA Control
    Amplitude.instance().disableCoppaControl();
    ```

### Opt out of tracking

Users may wish to opt out of tracking entirely, which means no events and no records of their browsing history. `setOptOut` provides a way to fulfill certain users' requests for privacy.

=== "TypeScript"

    ```ts
    //Disables instrumentation
    Amplitude.getInstance().setOptOut(true);
    //Enables instrumentation
    Amplitude.getInstance().setOptOut(false);
    ```

### Dynamic Configuration

React Native SDK allows users to configure their apps to use [dynamic configuration](../dynamic-configuration.md). This feature finds the best server URL automatically based on app users' location.

- If you have your own proxy server and use `setServerUrl` API, don't use dynamic configuration.
- If you have users in Mainland China, we recommend that you use dynamic configuration.
- By default, this feature is off. You must explicitly enable it to use it.
- By default, this feature returns the server URL for Amplitude's US servers. If you need to send data to Amplitude's EU servers, please use `setServerZone` to set it to EU zone.

=== "TypeScript"

    ```ts
    Amplitude.getInstance().setUseDynamicConfig(true);
    ```

## Migration Guide

The JavaScript SDK no longer has support for React Native. If you already have installed the `amplitude-js` or the old version of `@amplitude/react-native`, please follow the [Migration Guide](https://github.com/amplitude/Amplitude-ReactNative/blob/main/MIGRATION_GUIDE.md) to implement `@amplitude/react-native` v2.

## Troubleshooting

Using an older React Native version and having trouble with iOS? We support versions of React Native >= 0.61.\
Here's the process to set up with React Native 0.61

1. Swift Setup (Xcode):
   - Open your `[project-name].xcodeproj` file in Xcode
   - Right click your project name in the file navigator and then click New File, pick swift, it prompts you to create a bridging headers file. This is necessary to support swift in RN 0.61.
   - Source of this fix: <https://stackoverflow.com/a/54586937>

2. Podfile changes:
   - Make sure you are targeting iOS 10 or greater
   - Add `use_modular_headers!` globally to the top of the Podfile
   - Disable modular headers for DoubleConversion, Glog and Folly using `:use_modular_headers => false`.

## More resources

If you have any problems with the SDK, [create a GitHub issue](https://github.com/amplitude/Amplitude-ReactNative/issues/new) or submit a request on [Amplitude Help](https://help.amplitude.com/hc/en-us/requests/new).

--8<-- "includes/abbreviations.md"
