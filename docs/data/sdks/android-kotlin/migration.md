---
title: Android SDK Migration Guide
description: Use this guide to easily migrate from Amplitude's maintenance Android SDK (com.amplitude:android-sdk) to the new SDK (com.amplitude:analytics-android).
---

## Comparison 

--8<-- "includes/sdk-migration/sdk-migration-note.md"

| <div class="big-column">Feature</div> | [Android Kotlin](../) | [Android Android](../../android/) |
| --- | --- | --- |
| Package | [com.amplitude:analytics-android](https://mvnrepository.com/artifact/com.amplitude/analytics-android) | [com.amplitude:android-sdk](https://mvnrepository.com/artifact/com.amplitude/android-sdk) |
| SSL Pinning | TBD | Supported. Check [here](../../android/#ssl-pinning) for the setup. |
| Configuration | Configuration is implemented by the configuration object. Configurations need to be passed into Amplitude Object during initialization. [More configurations](../#configuration). | Support explicity setter methods. [More configurations](../../android/#configuration). |
| Logger provider | ConsoleLoggerProvider() by default. Fully customizable. | Amplitude Logger. Not customizable. |
| Storage Provider | InMemoryStorageProvider() by default. File storage. Fully customizable. | SQLite Database. |       
| Customization | Plugins | Middelware |
| Server Endpoint | HTTP V2 API | HTTP V1 API |
| Batch API| Supported, with configuration. | Not supported.|


## Data migration

Existing [maintenance SDK](../../android) data (events, user/device ID) can be moved to the new SDK:

=== "Kotlin"

    ```kotlin
    amplitude = Amplitude(
        Configuration(
            ...
            migrateLegacyData = true,
        )
    )
    ```

=== "Java"

    ```java
    Configuration configuration = new Configuration("AMPLITUDE_API_KEY", getApplicationContext());
    configuration.setMigrateLegacyData(true);
    Amplitude amplitude = new Amplitude(configuration);
    ```
