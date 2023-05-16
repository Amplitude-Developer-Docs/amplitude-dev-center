--8<-- "includes/sdk-ts/shared-ts-configuration.md"
    |`appVersion`| `string`. The current version of your application. For example: "1.0.0" | `null` |
    |`deviceId`| `string`. A device-specific identifier. | `UUID()` |
    |`cookieExpiration`| `number`. The days when the cookie expires. | 365 days. |
    |`cookieSameSite`| `string`. The SameSite attribute of the Set-Cookie HTTP response header. | `LAX` |
    |`cookieSecure`| `boolean`. If restrict access to cookies or not. A cookie with the Secure attribute is only sent to the server with an encrypted request over the HTTPS protocol. | `false` |
    |`cookieStorage`| `Storage<UserSession>`. Implements a custom `cookieStorage` class from `Storage`. | `MemoryStorage<UserSession>` |
    |`disableCookies`| `boolean`. If disable cookies or not. If cookies is disable, using LocalStorage or MemoryStorage. | The cookies is enable by default. |
    |`domain`| `string`. Set the top level domain. | `null` |
    |`partnerId`| `string`. The partner Id value. Amplitude requires the customer who built an event ingestion integration to add the partner identifier to `partner_id`. | `null` |
    |`sessionManager`| `SessionManager`. Implements a custom `sessionManager` class from `SessionManager`. | `SessionManager(new MemoryStorage<UserSession>(), '')` |
    |`sessionTimeout`| `number`. How long one session expire. | `30` minutes. |
    |`userId`| `number`. ID for the user. Must have a minimum length of 5 characters unless overridden with the `min_user_length` option. | `undefined` |
    |`config.trackingOptions`| `TrackingOptions`. Please check the `Optional tracking` section for more tracking options configuration. | Enable all tracking options by default. |