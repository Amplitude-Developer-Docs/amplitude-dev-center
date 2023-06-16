--8<-- "includes/sdk-ts/shared-ts-configuration.md"
    |`appVersion` | `string`. Sets an app version for events tracked. This can be the version of your application. For example: "1.0.0" | `undefined` |
    |`deviceId` | `string`. Sets an identifier for the device running your application. | `UUID()` |
    |`cookieExpiration` | `number`. Sets expiration of cookies created in days. | 365 days |
    |`cookieSameSite` | `string`. Sets `SameSite` property of cookies created. | `Lax` |
    |`cookieSecure` | `boolean`. Sets `Secure` property of cookies created. | `false` |
    |`cookieStorage` | `Storage<UserSession>`. Sets a custom implementation of `Storage<UserSession>` to persist user identity. | `MemoryStorage<UserSession>` |
    |`disableCookies`| `boolean`. Sets permission to use cookies. If value is `true`, localStorage API is used to persist user identity. | The cookies is enable by default. |
    |`domain` | `string`. Sets the domain property of cookies created. | `undefined` |
    |`partnerId` | `string`. Sets partner ID. Amplitude requires the customer who built an event ingestion integration to add the partner identifier to `partner_id`. | `undefined` |
    |`sessionTimeout` | `number`. Sets the period of inactivity from the last tracked event before a session expires in milliseconds. | 1,800,000 milliseconds (30 minutes) |
    |`userId` | `number`. Sets an identifier for the user being tracked. Must have a minimum length of 5 characters unless overridden with the `minIdLength` option. | `undefined` |
    |`trackingOptions`| `TrackingOptions`. Configures tracking of additional properties. Please refer to `Optional tracking` section for more information. | Enable all tracking options by default. |
