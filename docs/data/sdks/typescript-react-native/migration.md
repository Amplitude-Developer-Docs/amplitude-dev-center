---
title: React Native SDK Migration Guide
description: Use this guide to easily migrate from Amplitude's maintenance React Native SDK (@amplitude/react-native) to the new SDK (@amplitude/analytics-react-native).
---

Amplitude New React Native SDK (`@amplitude/analytics-react-native`) features a plugin architecture, built-in type definition and broader platform support. New React Native SDK isn't backwards compatible with maintenance React Native SDK `@amplitude/react-native`. 

To migrate to `@amplitude/analytics-react-native`, update your dependencies and instrumentation.

## Terminology

* `@amplitude/react-native`: Maintenance React Native SDK
* `@amplitude/analytics-react-native`: New React Native SDK

## Dependency

Uninstall `@amplitude/react-native` by either `yarn remove @amplitude/react-native` or deleting your dependency list in package.json

=== "@amplitude/react-native"

    ```json
    {
      "dependencies": {
        "@amplitude/react-native": "^2"
      }
    }
    ```

Follow [the installation section](../#installation) to add new React Native SDK dependencies.

## Instrumentation

New React Native SDK offers an API to instrument events. To migrate to it, you need to update a few calls. The following sections detail which calls have changed.

### Initialization

`getInstance()` in the maintenance SDK only accepts API key and has been removed. To initialize the SDK, call `init()`, with the user ID and configuration parameters.

=== "@amplitude/react-native"

    ```typescript
    import { Amplitude } from '@amplitude/react-native';

    Amplitude.getInstance().init(API_KEY)
    ```

=== "@amplitude/analytics-react-native"

    ```typescript
    import { init } from '@amplitude/analytics-react-native';

    init(API_KEY, OPTIONAL_USER_ID, config);
    ```

### Configuration

However, the new React Native SDK instance includes a configuration object, allowing us to set configurations directly upon initialization via the instance.

|@amplitude/react-native|@amplitude/analytics-react-native|
|-|-|
| `enableCoppaControl()` | NOT SUPPORTED |
| `disableCoppaControl()` | NOT SUPPORTED |
| `setAdvertisingIdForDeviceId()` | No configuration to set ADID as device ID. But ADID is still tracked by default as `config.trackingOptions.adid` defaults to `true`. To learn more about how device ID is initialized [here](./#device-id).  |
| `setAppSetIdForDeviceId()` | NOT SUPPORTED |
| `setOptOut()` | both `setOptOut()` and `config.optOut` are supported |
| `trackingSessionEvents()` | `config.trackingSessionEvents` |
| `setUseDynamicConfig()` | NOT SUPPORTED |
| `setMinTimeBetweenSessionsMillis()`| similar to `config.sessionTimeout`, but they are not completely the same. Learn more about [session management](./#session-management)|
| `setServerZone()` | `config.serverZone` |
| `setServerUrl()` | `config.serverUrl` |
| `setEventUploadMaxBatchSize()` | `config.flushQueueSize` |
| `setEventUploadPeriodMillis()` | `config.flushIntervalMillis` |
| `setEventUploadThreshold()` | `config.flushQueueSize` |
| `enableLogging()`| Logging is enabled and cannot be turned off. However, you can set `config.logLevel` and customize `config.loggerProvider` |
| `setLogLevel()`| `config.logLevel` |
| `addLogCallback()` | It's not fully supported but you can customize a logger by setting `config.loggerProvider`. |

### Tracking events

#### `logEvent()`

The `logEvent()` API maps to `track()`.

=== "@amplitude/react-native"

    ```typescript
    import { Amplitude } from '@amplitude/react-native';
    
    Amplitude.getInstance().logEvent('Button Clicked', {buttonColor: 'primary'});
    ```

=== "@amplitude/analytics-react-native"

    ```typescript
    import { track } from '@amplitude/analytics-react-native';

    track('Button Clicked', {buttonColor: 'primary'});
    ```

#### `uploadEvents()`

The `uploadEvents()` API maps to `flush()`.

=== "@amplitude/react-native"

    ```typescript
    import { Amplitude } from '@amplitude/react-native';
    
    Amplitude.getInstance().uploadEvents();
    ```

=== "@amplitude/analytics-react-native"

    ```typescript
    import { flush } from '@amplitude/analytics-react-native';

    flush();
    ```

### Set user properties

#### `identify()`

The `identify()` API and `Identify` type remain the same.

=== "@amplitude/react-native"

    ```typescript
    import { Amplitude, Identify } from '@amplitude/react-native';
    
    const identifyObj = new Identify();
    identifyObj.set('location', 'LAX');
    Amplitude.getInstance().identify(identifyObj);
    ```

=== "@amplitude/analytics-react-native"

    ```typescript
    import { Identify, identify } from '@amplitude/analytics-react-native';

    const identifyObj = new Identify();
    identifyObj.set('location', 'LAX');

    identify(identifyObj);
    ```

#### `setUserProperties()`

The `setUserProperties()` API has been removed, but you can now use the unified `identify()` API to add user properties.

=== "@amplitude/react-native"

    ```typescript
    import { Amplitude } from '@amplitude/react-native';
    
    Amplitude.getInstance().setUserProperties({
        membership, "paid",
        payment, "bank",
    })
    ```

=== "@amplitude/analytics-react-native"

    ```typescript
    import { Identify, identify } from '@amplitude/analytics-react-native';

    const identifyObj = new amplitude.Identify()
    identifyObj
        .set("membership", "paid")
        .set("payment", "bank")
    amplitude.identify(identifyObj)
    ```

#### `clearUserProperties()`

The `clearUserProperties()` API has been removed, but you can now use the unified `identify()` API to remove user properties.

=== "@amplitude/react-native"

    ```typescript
    import { Amplitude } from '@amplitude/react-native';
    
    Amplitude.getInstance().clearUserProperties();
    ```

=== "@amplitude/analytics-react-native"

    ```typescript
    import { Identify, identify } from '@amplitude/analytics-react-native';

    const identifyObj = new amplitude.Identify()
    identifyObj.clearAll()
    amplitude.identify(identifyObj)
    ```

#### `setUserId()`

The `setUserId()` API remains the same`.

=== "@amplitude/react-native"

    ```typescript
    import { Amplitude } from '@amplitude/react-native';
    
    Amplitude.getInstance().setUserId("test_user_id");
    ```

=== "@amplitude/analytics-react-native"

    ```typescript
    import { setUserId } from '@amplitude/analytics-react-native';

    setUserId('user@amplitude.com');
    ```

### Set group properties

### `groupIdentify()`

You can now make an identify call without calling `getInstance()`.

=== "@amplitude/react-native"

    ```typescript
    import { Amplitude } from '@amplitude/react-native';
    
    const groupType = 'plan';
    const groupName = 'enterprise';
    const identifyObj = new Identify()
    identifyObj.set('key1', 'value1');

    Amplitude.getInstance().groupIdentify(groupType, groupName, identifyObj);
    ```

=== "@amplitude/analytics-react-native"

    ```typescript
    import { Identify, groupIdentify } from '@amplitude/analytics-react-native';

    const groupType = 'plan';
    const groupName = 'enterprise';
    const identifyObj = new Identify()
    identifyObj.set('key1', 'value1');

    groupIdentify(groupType, groupName, identifyObj);
    ```

### Tracking revenue

#### `logRevenue()`

The `logRevenue()` API maps to `revenue()`. `receipt` and `receiptSignature` is not supported.

=== "@amplitude/react-native"

    ```typescript
    import { Amplitude } from '@amplitude/react-native';
    
    const userProperties = {
        price: 3,
        productId: 'com.company.productId',
        quantity: 2,
        revenueType: 'productRevenue',
        eventProperties: {
            key: 'value',
        },
    };

    ampInstance.logRevenue(userProperties);
    ```

=== "@amplitude/analytics-react-native"

    ```typescript
    import { Revenue, revenue } from '@amplitude/analytics-react-native';

    const event = new Revenue()
        .setPrice(3)
        .setProductId('com.company.productId')
        .setQuantity(2)
        .setRevenueType('productRevenue')
        .setEventProperties({
            key: 'value',
        })

    revenue(event);
    ```
You can also `setRevenue(6)` instead of `setPrice(3)` and `setQuantity(2)`.

## Advanced topics

### Identity

#### Device ID

As the maintenance React Native SDK is a wrapper of the maintenance iOS, maintenance Android SDK and maintenance Browser SDK and provides mappings from React Native to native SDK functions, device ID generation follows the native SDK of each platform. Learn more about device ID lifecycle of [maintenance iOS SDK](../../ios/#device-id-lifecycle) and [maintenance Android SDK](../../android/#device-id-lifecycle). You can also call `setAdvertisingIdForDeviceId()` or `setAppSetIdForDeviceId()` to set ADID or App Set ID as device ID.

The new React Native SDK initializes the device ID in the following order, with the device ID being set to the first valid value encountered:

1. Device ID of in the configuration on initialization
2. "deviceId" value from URL param, for example http://example.com/?deviceId=123456789. If it runs on Web.
3. Device ID in cookie storage.
4. A randomly generated 36-character UUID

#### Advertising IDs

Maintenance React Native SDK supports setting an advertising ID as device ID by `setAdvertisingIdForDeviceId()` or `setAppSetIdForDeviceId()`. The new React Native SDK tracks ADID  by default as `config.trackingOptions.adid` defaults to `true`. However, the new React Native SDK doesn't support App Set ID, IDFA, or IDFV.

### COPPA

You can enable COPPA control by `enableCoppaControl()` in maintenance React Native SDK. The new React Native SDK doesn't support that API but you can still enable COPPA:

* For iOS, IDFA and IDFV aren't tracked. For Android, you can turn off ADID by setting `config.trackingOptions.adid` to `false`
* You can use an [enrichment Plugin](../#enrichment-type-plugin) to delete city in the payload.
* You can turn off IP address tracking by setting `config.trackingOptions.ipAddress` to `false`
* Location (latitude and longitude) isn't tracked

### Session management

Amplitude [defines a session](https://help.amplitude.com/hc/en-us/articles/115002323627-Track-sessions-in-Amplitude#how-amplitude-defines-sessions) slightly differently between mobile and web applications.

The maintenance React Native SDK follows mobile-style session tracking definition based on foreground and background switching. You can set session expiration time by `setMinTimeBetweenSessionsMillis()`. It also supports automatically log start and end session events by calling `trackingSessionEvents(true)`.

The new React Native SDK follows web-style session tracking definition based on the last event. You can customize the timeout window by `config.sessionTimeout`. It doesn't support automatic start and end session event tracking, but session is still managed by the SDK. Events that are logged within the same session have the same session ID and Amplitude still groups events together by session.

## Comparison 

--8<-- "includes/sdk-migration/sdk-migration-note.md"

| <div class="big-column">Feature</div> | [Latest React Native SDK](./) | [Maintenance React Native SDK](../../react-native/) |
| --- | --- | --- |
| Package | [@amplitude/analytics-react-native](https://www.npmjs.com/package/@amplitude/analytics-react-native) | [@amplitude/react-native](https://www.npmjs.com/package/@amplitude/react-native) |
| Structure | Mobile platforms (Android & iOS) utilize native app context modules for accessing system info, async storage for persistence. | Wrapper of the iOS and Android SDK and Amplitude JavaScript SDK.  Providing mappings from React Native to native SDK functions. |
| Supported platform | iOS, Android, Web and Expo. | iOS, Android, Web. |
| Configuration | Configuration is implemented by Configuration object during initialize amplitude. [More configurations](./#configuration). | Support explicity setter methods. [More configurations](../../react-native/#configuration). |
| Storage Provider | LocalStorage() by default, if not enabled, use MemoryStrogate(). Fully configurable. | Depened on the Maintenance iOS, Maintenance Android and Maintenance Browser SDK storage. |
| Logger provider | Amplitude Logger. Fully customizable. | Depened on the native iOS, Android, Amplitude JavaScript logger provider. |
| Customization | Plugins | Middleware |
| Server Endpoint | HTTP V2 API |  HTTP V1 API |