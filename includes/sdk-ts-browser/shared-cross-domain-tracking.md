You can track anonymous behavior across two different domains. Amplitude identifies anonymous users by their device IDs which must be passed between the domains. For example:

* Site 1: `www.example.com`
* Site 2: `www.example.org`

Users who start on Site 1 and then navigate to Site 2 must have the device ID generated from Site 1 passed as a parameter to Site 2. Site 2 then needs to initialize the SDK with the device ID.
 The SDK can parse the URL parameter automatically if `deviceId` is in the URL query parameters.

1. From Site 1, grab the device ID from `getDeviceId()`.
2. Pass the device ID to Site 2 via a URL parameter when the user navigates. (for example: `www.example.com?deviceId=device_id_from_site_1`)
3. Initialize the Amplitude SDK on Site 2 with `init('API_KEY', null)`.

If the `deviceId` isn't provided with the `init` like `init('API_KEY', null, { deviceId: 'custom-device-id' })`, then it automatically fallbacks to using the URL parameter.
