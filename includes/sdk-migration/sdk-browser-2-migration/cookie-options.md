Starting Browser SDK 2.0, Amplitude has simplified the options to manage the use of cookies. By default, user identity is stored on browser cookies.

#### Using an alternative storage API

```diff
  amplitude.init(API_KEY, undefined, {
-   disableCookies: true,
+   identityStorage: 'localStorage',
  });
```

#### Disabling user identity persistence

```diff
- import { MemoryStorage } from '@amplitude/analytics-core';
-
  amplitude.init(API_KEY, undefined, {
-   cookieStorageProvider: new MemoryStorage(),
+   identityStorage: 'none',
  });
```

#### Configuring cookie options

The options to manage cookie usage are now nested under `options.cookieOptions` for a more discoverable interface.

```diff
  amplitude.init(API_KEY, undefined, {
-   cookieExpiration: 365,
-   cookieSameSite: 'Lax',
-   cookieSecure: false,
-   cookieUpgrade: true,
-   domain: '',
+   cookieOptions: {
+     expiration: 365,
+     sameSite: 'Lax',
+     secure: false,
+     upgrade: true,
+     domain: '',
+   },
  });
```