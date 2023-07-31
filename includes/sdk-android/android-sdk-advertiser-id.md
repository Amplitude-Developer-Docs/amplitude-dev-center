The Android Advertising ID is a unique identifier provided by the Google Play store. As it's unique to every person and not just their devices, it's useful for mobile attribution. This is similar to the IDFA on iOS.
 [Mobile attribution](https://www.adjust.com/blog/mobile-ad-attribution-introduction-for-beginners/) is the attribution of an installation of a mobile app to its original source (such as ad campaign, app store search).
 Users can choose to disable the Advertising ID, and apps targeted to children can't track at all.

Follow these steps to use Android Ad ID.

!!!warning "Google Ad ID and Tracking Warning"

    As of April 1, 2022, Google allows users to opt out of Ad ID tracking. Ad ID may return null or error. You can use am alternative ID called [App Set ID](#app-set-id), which is unique to every app install on a device. [Learn more](https://support.google.com/googleplay/android-developer/answer/6048248?hl=en).

1. Add `play-services-ads` as a dependency.

    ```bash
    dependencies {
      implementation 'com.google.android.gms:play-services-ads:18.3.0'
    }
    ```

2. `AD_MANAGER_APP` Permission
If you use Google Mobile Ads SDK version 17.0.0 or higher, you need to add `AD_MANAGER_APP` to `AndroidManifest.xml`.

    ```xml
    <manifest>
        <application>
            <meta-data
                android:name="com.google.android.gms.ads.AD_MANAGER_APP"
                android:value="true"/>
        </application>
    </manifest>
    ```

3. Add ProGuard exception

    Amplitude Android SDK uses Java Reflection to use classes in Google Play Services. For Amplitude SDKs to work in your Android application, add these exceptions to `proguard.pro` for the classes from `play-services-ads`.
    `-keep class com.google.android.gms.ads.** { *; }`

4. `AD_ID` Permission 

    When apps update their target to Android 13 or above will need to declare a Google Play services normal permission in the manifest file as follows if you are trying to use the ADID as a deviceId:

    ```xml
    <uses-permission android:name="com.google.android.gms.permission.AD_ID"/>
    ```
    
    Learn More at [here](https://support.google.com/googleplay/android-developer/answer/6048248?hl=en).
