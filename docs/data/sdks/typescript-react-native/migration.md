---
title: React Native SDK Migration Guide
description: Use this guide to easily migrate from Amplitude's maintenance React Native SDK (@amplitude/react-native) to the new SDK (@amplitude/analytics-react-native).
---

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