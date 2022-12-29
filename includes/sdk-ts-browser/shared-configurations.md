|<div class="big-column">Name</div>|Value|Description|
|-|-|-|
|`flushIntervalMillis`| Optional. `number` | The amount of time waiting to upload the event to the server. The default is 1 second.|
|`flushMaxRetries`| Optional. `number` | The max retry limits. The default is 5 times.|
|`flushQueueSize`| Optional. `number` |  The maximum number of events that can be stored locally before forcing an upload. The default is 30 events. |
|`logLevel`| Optional. `LogLevel.None` or `LogLevel.Error` or `LogLevel.Warn` or `LogLevel.Verbose` or `LogLevel.Debug` | The log level.|
|`loggerProvider`| Optional. `Logger` | Implements a custom `loggerProvider` class from the Logger, and pass it in the configuration during the initialization to help with collecting any error messages from the SDK in a production environment.|
|`minIdLength`| Optional. `number` | Overrides the minimum length of `user_id` & `device_id` fields. The default is 5. |
|`plan`| Optional. `Plan` | Tracking plan properties. Amplitude supports only branch, source, version properties. |
|`plan.branch`| Optional. `string` | The tracking plan branch name. For example: "main". |
|`plan.source`| Optional. `string` | The tracking plan source. For example: "web". |
|`plan.version`| Optional. `string` | The tracking plan version. For example: "1", "15". |
|`serverUrl`| Optional. `string` | Sends events to a different URL other than AMPLITUDE_SERVER_URL. Used for proxy servers |
|`serverZone`| Optional. `ServerZone.EU` or  `ServerZone.US` | Set Amplitude Server Zone, switch to zone related configuration. To send data to Amplitude's EU servers should configure to `ServerZone.EU` |
|`storageProvider`| Optional.  `Storage<Event[]>` | Implements a custom `storageProvider` class from Storage. The default is `MemoryStorage`. |
|`useBatch`| Optional. `boolean` | When `true`, uses the Batch API instead of the HTTP V2 API.|
|`appVersion`| Optional. `string` | The current version of your application. For example: "1.0.0" |
|`deviceId`| Optional. `string` | A device-specific identifier. |
|`cookieExpiration`| Optional. `number` | The days when the cookie expires. The default is 365 days. |
|`cookieSameSite`| Optional. `string` | The SameSite attribute of the Set-Cookie HTTP response header. The default is `LAX`. |
|`cookieSecure`| Optional. `boolean` | If restrict access to cookies or not. A cookie with the Secure attribute is only sent to the server with an encrypted request over the HTTPS protocol. |
|`cookieStorage`| Optional. `Storage<UserSession>` | Implements a custom `cookieStorage` class from `Storage`. The default is `MemoryStorage<UserSession>`|
|`disableCookies`| Optional. `boolean` | If disable cookies or not. If cookies is disable, using LocalStorage or MemoryStorage. The cookies is enable by default. |
|`domain`| Optional. `string` | Set the top level domain. |
|`partnerId`| Optional. `string` | The partner Id value. Amplitude requires the customer who built an event ingestion integration to add the partner identifier to `partner_id`. |
|`sessionManager`| Optional. `SessionManager` | Implements a custom `sessionManager` class from `SessionManager`. The default is `SessionManager(new MemoryStorage<UserSession>(), '')`. |
|`sessionTimeout`| Optional. `number` | How long one session expire. The default is `30` minutes. |
|`userId`| Optional. `number` | ID for the user. Must have a minimum length of 5 characters unless overridden with the `min_user_length` option. |
|`optOut`| Optional. `boolean` | If `optOut` is `true`, the event isn't sent to Amplitude's servers. The default is `false`. |
|`transport`| Optional. `TransportType.XHR` or `TransportType.SendBeacon` or `TransportType.Fetch`| Set the transport type. |
|`config.trackingOptions`| Optional. `TrackingOptions` | [Learn more about tracking options](/data/sdks/typescript-browser/#optional-tracking). |
