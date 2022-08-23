---
title: Migrate to Ampli
description: If you already have analytics implemented in your product you can easily migrate.
---

If you already have analytics implemented in your product and want to migrate, Amplitude makes it easy to switch from your existing Analytics provider.

## Considerations

- The `context` parameter isn't supported in Ampli. This was originally based on per Source Templates which is a feature that is deprecated. To add additional data on each event you can do so by creating a Middleware like below that will set "contextProp=true" on all events.

    ```js
    export const contextMiddleware:Middleware = (payload, next) => {
      payload.event.event_properties = {
        ...payload.event.event_properties,    contextProp: true,  };  next(payload);};
    ```

- The `validation` parameter isn't supported in Ampli. This flag previously enabled/disabled local schema validation in the SDK. The new Ampli SDKs no longer do local schema validation and instead rely on backend validation on our servers which can be viewed on the Event "sparklines" in the Events page in Data.

## Migrate events 

For example, if you're currently tracking events like:

```ts
analytics.track('Song Uploaded',{
  device: 'iOS'
});
```

After you import your tracking plan into Amplitude Data, this event becomes the following, with all the benefits of type-safety, linting, and data validation to make sure that your analytics are accurate and trustworthy.

```ts
ampli.songUploaded({
  device: 'iOS'
});
```