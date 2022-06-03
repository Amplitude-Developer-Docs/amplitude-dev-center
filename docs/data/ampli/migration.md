---
title: Migrate to Ampli
description: If you already have analytics implemented in your product you can easily migrate.
---

If you already have analytics implemented in your product and want to migrate, we make it easy to switch from your existing Analytics provider.

### Migrating Events

For example, if you're currently tracking events like:

```ts
analytics.track('Song Uploaded',{
  device: 'iOS'
});
```

After you import your tracking plan into Amplitude Data, this event becomes:

```ts
ampli.songUploaded({
  device: 'iOS'
});
```

With all the benefits of type-safety, linting, and data validation to ensure that your analytics are accurate and trustworthy.