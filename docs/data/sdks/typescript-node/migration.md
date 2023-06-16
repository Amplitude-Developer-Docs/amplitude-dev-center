---
title: Node.JS SDK Migration Guide
description: Use this guide to easily migrate from Amplitude's maintenance Node.JS SDK (@amplitude/node) to the new SDK (@amplitude/analytics-node).
---

Amplitude new Node.js SDK (`@amplitude/analytics-node`) features a plugin architecture and built-in type definition. New Node.js SDK isn't backwards compatible with maintenance Node.js SDK `@amplitude/node`. 

To migrate to `@amplitude/analytics-node`, update your dependencies and instrumentation.

## Terminology

* `@amplitude/node`: Maintenance Node.js SDK
* `@amplitude/analytics-node`: New Node.js SDK

## Dependency

Uninstall `@amplitude/node` by either `npm uninstall @amplitude/analytics-node` or deleting your dependency list in package.json

=== "@amplitude/react-native"

    ```json
    {
      "dependencies": {
        "@amplitude/node": "^1",
      }
    }
    ```

Install `@amplitude/analytics-node` by `npm install @amplitude/analytics-node`.

## Instrumentation

New Node.js SDK offers an API to instrument events. To migrate to it, you need to update a few calls. The following sections detail which calls have changed.

### Initialization

The maintenance Node.js SDK only supports namespace import. The new Node.js SDK supports namespace import (`import * as amplitude from '@amplitude/analytics-node'`) and named import (`import { init } from '@amplitude/analytics-node'`) as well. We are using named import in the examples of new Node.js SDK in this documentation.

To initialize the SDK, call `init()`, with the user ID and configuration parameters.

=== "@amplitude/node"

    ```javascript
    import * as Amplitude from '@amplitude/node'

    var options = {};
    const client = Amplitude.init(AMPLITUDE_API_KEY, options);

    ```

=== "@amplitude/analytics-node"

    ```typescript
    import { init } from '@amplitude/analytics-node';

    var options = {};
    init(API_KEY, options);
    ```

### Configuration

The new Node.js SDK configuration comes in a different shape. Some configurations are no longer supported.

|@amplitude/node|@amplitude/analytics-node|
|-|-|
| `debug` | `logLevel` set to WARN level|
| `logLevel` | `logLevel` |
| `maxCachedEvents` | `flushQueueSize` |
| `retryTimeouts` | `flushMaxRetries` can only be set to a number instead of an array of number as in `retryTimeouts`
| `optOut` | `optOut` |
| `retryClass` | CUSTOMIZATION NOT SUPPORT. Retry logic is handled by new Node.js SDK|
| `transportClass` | `transportProvider` |
| `serverUrl` | `serverUrl` |
| `uploadIntervalInSec` | `flushIntervalMillis` is in milliseconds while `uploadIntervalInSec` is in seconds|
| `minIdLength` | `minIdLength` |
| `requestTimeoutMillis` | NOT SUPPORT |
| `onRetry` | CUSTOMIZATION NOT SUPPORT. Retry logic is handled by new Node.js SDK |

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

As the maintenance Node.js SDK is a wrapper of the maintenance iOS, maintenance Android SDK and maintenance Browser SDK and provides mappings from Node.js to native SDK functions, device ID generation follows the native SDK of each platform. Learn more about device ID lifecycle of [maintenance iOS SDK](../../ios/#device-id-lifecycle) and [maintenance Android SDK](../../android/#device-id-lifecycle). You can also call `setAdvertisingIdForDeviceId()` or `setAppSetIdForDeviceId()` to set ADID or App Set ID as device ID.

The new Node.js SDK initializes the device ID in the following order, with the device ID being set to the first valid value encountered:

1. Device ID of in the configuration on initialization
2. "deviceId" value from URL param, for example http://example.com/?deviceId=123456789. If it runs on Web.
3. Device ID in cookie storage.
4. A randomly generated 36-character UUID

#### Advertising IDs

Maintenance Node.js SDK supports setting an advertising ID as device ID by `setAdvertisingIdForDeviceId()` or `setAppSetIdForDeviceId()`. The new Node.js SDK tracks ADID  by default as `config.trackingOptions.adid` defaults to `true`. However, the new Node.js SDK doesn't support App Set ID, IDFA, or IDFV.

### COPPA

You can enable COPPA control by `enableCoppaControl()` in maintenance Node.js SDK. The new Node.js SDK doesn't support that API but you can still enable COPPA:

* For iOS, IDFA and IDFV aren't tracked. For Android, you can turn off ADID by setting `config.trackingOptions.adid` to `false`
* You can use an [enrichment Plugin](../#enrichment-type-plugin) to delete city in the payload.
* You can turn off IP address tracking by setting `config.trackingOptions.ipAddress` to `false`
* Location (latitude and longitude) isn't tracked

### Session management

Amplitude [defines a session](https://help.amplitude.com/hc/en-us/articles/115002323627-Track-sessions-in-Amplitude#how-amplitude-defines-sessions) slightly differently between mobile and web applications.

The maintenance Node.js SDK follows mobile-style session tracking definition based on foreground and background switching. You can set session expiration time by `setMinTimeBetweenSessionsMillis()`. It also supports automatically log start and end session events by calling `trackingSessionEvents(true)`.

The new Node.js SDK follows web-style session tracking definition based on the last event. You can customize the timeout window by `config.sessionTimeout`. It doesn't support automatic start and end session event tracking, but session is still managed by the SDK. Events that are logged within the same session have the same session ID and Amplitude still groups events together by session.

## Comparison 

--8<-- "includes/sdk-migration/sdk-migration-note.md"

| <div class="big-column">Feature</div> | [Latest Node SDK](./) | [Maintenance Node SDK](../../node/) |
| --- | --- | --- |
| Package | [@amplitude/analytics-node](https://www.npmjs.com/package/@amplitude/analytics-node) | [@amplitude/node](https://www.npmjs.com/package/@amplitude/node)|
| Configuration | Configuration is implemented by Configuration object during initialize amplitude. [More configurations](./#configuration). | Support explicity setter methods. [More configurations](../../node/#configuration).|
| Logger Provider | Amplitude Logger. Fully customizable. | Amplitude Logger.  Not customizable. |
| Storage Provider | LocalStorage by default. Fully customizable. | Local Storage. |
| Customization | Plugins | Middleware |
| Retry | Regular retry. | Regular retry by default. Also provide offline retry. You are able to customize your retry logic. Fully customizible. |
| Server Endpoint | HTTP V2 API |  HTTP V2 API |
| Batch API | Supported, with configuration. | Not supported. |