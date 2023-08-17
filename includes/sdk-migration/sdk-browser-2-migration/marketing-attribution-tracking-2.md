```diff
  amplitude.init(API_KEY, undefined, {
+   defaultTracking: {
+     attribution: {
+       excludeReferrers: [location.hostname]
+     },
+   },
  });
```

#### Moved `options.attribution` to `options.defaultTracking.attribution`

This consolidates attribution options together with other default tracking options.

```diff
  amplitude.init(API_KEY, undefined, {
-   attribution: {
-     excludeReferrers: [location.hostname]
+   defaultTracking: {
+     attribution: {
+       excludeReferrers: [location.hostname]
+     },
    },
  });
```

#### Disabling marketing attribution tracking

This provides a simpler and consistent interface to opt out of marketing attribution tracking.

```diff
  amplitude.init(API_KEY, undefined, {
-   attribution: {
-     disabled: true
+   defaultTracking: {
+     attribution: false,
    },
  });
```