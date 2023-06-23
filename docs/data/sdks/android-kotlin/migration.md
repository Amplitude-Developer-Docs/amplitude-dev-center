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
| Logger Provider | ConsoleLoggerProvider() by default. Fully customizable. | Amplitude Logger. Not customizable. |
| Storage Provider | InMemoryStorageProvider() by default. File storage. Fully customizable. | SQLite Database. |
| Customization | Plugins | Middelware |
| Server Endpoint | HTTP V2 API | HTTP V1 API |
| Batch API| Supported, with configuration. | Not supported.|
| Default Event Tracking| Support sessions, app lifecycles, screen views, and deep links trackings. [More details](../../android-kotlin/#tracking-default-events). | Support sessions tracking only, disabled by default.|

## Data migration

Existing [maintenance SDK](../../android) data (events, user/device ID) are moved to the latest SDK by default. It can be disabled by setting `migrateLegacyData` to `false` in the [Configuration](../#configuration). Learn more in [Github](https://github.com/amplitude/Amplitude-Kotlin/blob/main/android/src/main/java/com/amplitude/android/migration/RemnantDataMigration.kt#L9-L16).

=== "Kotlin"

    ```kotlin
    amplitude = Amplitude(
        Configuration(
            ...
            migrateLegacyData = false,
        )
    )
    ```

=== "Java"

    ```java
    Configuration configuration = new Configuration("AMPLITUDE_API_KEY", getApplicationContext());
    configuration.setMigrateLegacyData(false);
    
    Amplitude amplitude = new Amplitude(configuration);
    ```
