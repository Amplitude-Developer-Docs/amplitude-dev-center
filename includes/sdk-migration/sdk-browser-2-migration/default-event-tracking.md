Starting Browser SDK 2.0, default tracking is enabled by default. Default tracking is implicit tracking performed by Amplitude on your behalf, and includes page views, sessions, file downloads, form interactions, and marketing attribution.

To opt out of default tracking, set `options.defaultTracking` to `false`.

```ts
amplitude.init(API_KEY, undefined, {
  defaultTracking: false,
});
```

Additionally, you can pick and choose which events you want tracked by Amplitude. For example, if you only want default tracking for marketing attribution and page views, you can use the code below.

```ts
amplitude.init(API_KEY, undefined, {
  defaultTracking: {
    attribution: true,
    pageViews: true,
    sessions: false,
    fileDownload: false,
    formInteraction: false,
  },
});
```