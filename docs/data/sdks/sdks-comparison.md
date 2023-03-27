---
title: Next Generation SDKs vs Maintenance SDKs
description: Comparison between Next Generation SDKs and Maintenance SDKs
---

The Next Generation SDK is newly developed and designed to provide developers a better user experience, while the maintenance SDKs will only receive bug fixes until deprecation. In this doc, we are going to cover what we have for the Next Generation SDKs and the benifits. We highly recommend to upgrade to or adopt the Next Generation of SDK. For the migration guide, please refer to the specific SDK for further details.

All platforms, including the [Browser](../sdks/typescript-browser/), [Node.js](../sdks/typescript-node/), [React Native](../sdks/typescript-react-native/), [Android](../sdks/android-kotlin/), [iOS](../sdks/ios-swift/), [Python](../sdks/python/), [GO](../sdks/go/), have Next Generation SDKs available.

## Next Generation SDK Benifit

- Next generation SDKs are using mordern languages for each platform and with modern tools/frameworks. 
    - For Browser, Node.js, React Native SDK we are using TypeScript. For android, we are using Kotlin. For iOS, we are using Swift,
    - It's improved the code readability, which can also speed up the developement cycle.
    - Browser SDK implement tree-shaking technique to reduce the bundle size.

- Next generation SDKs has aligned interfaces, and with solid and extensible architecture
    - With the next generation design guidline, all next generation SDKs has aligened interfaces. That benifits the customers who are using Amplitude SDKs on multiple platforms. 
    - Next generation SDKs allowed more customization. You can provide your implementation based on your needs, like logger, etc. You can also enrich your data or send your data to other destination with the Plugins archtecture. 

- Next generation SDKs has cleaner interfaces
    - Next generation SDKs provide more possibilities with one single interface. You don't need to memorize the different function names. 
    - For example, previously, we have `logEvent`, `logEventWithTimestamp`, `logEventWithGroup`, etc. Right now with next generation SDK, it can be replaced by `track` by providng more infomation in EventOptions. Please check here for more details.
    
- Next generation SDKs are more reliable and robust
    - Next Generation SDKs DO NOT require any external dependencies. This makes the SDK more lightweight, increases its performance, and reduces potential issues due to the dependency.
    - Instead of using database, for next generation SDKs we are using file storage, which improve the performance.
    - We removed OkHttp in Anroid SDKs. It's reduced the potential issue due to the dependency compatibility.

## Next Generation Archtacture

## Next Generation Common Methods


## Comparison with Maintenance SDK