Amplitude no longer requires the use of enums specifically `TransportType`, `ServerZone` and `PluginType`, and accepts its literaal values.

Setting transport provider on initialization

```diff
  import * as amplitude from '@amplitude/analytics-browser';

  amplitude.init(API_KEY, USER_ID, {
-   transport: amplitude.Types.TransportType.Fetch,
+   transport: 'fetch',
  });
```

Setting transport provider using setTransport()

```diff
  import * as amplitude from '@amplitude/analytics-browser';

- amplitude.setTransport(amplitude.Types.TransportProvider.Fetch);
+ amplitude.setTransport('fetch');
```

Setting server zone on initialization

```diff
  import * as amplitude from '@amplitude/analytics-browser';

  amplitude.init(API_KEY, USER_ID, {
-   serverZone: amplitude.Types.ServerZone.US,
+   serverZone: 'US',
  });
```