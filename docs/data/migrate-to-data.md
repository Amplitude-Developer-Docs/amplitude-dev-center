---
title: Migrate to Amplitude Data
description: If you already have analytics implemented in your product you can migrate to Amplitude Data.
---

If you already have analytics implemented in your product and want to migrate to Amplitude Data, we make it easy to switch from your existing Analytics provider.

### Migrating Events

For example, if you're currently tracking events with Segment's SDK:

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

### Adopting Amplitude Data

Quite often teams don't trust their existing analytics and they want to start from scratch. While this approach works for some teams it is not recommended for everybody. It is a lot of work to rethink your existing tracking plan and while implementing Amplitude Data is straightforward we recommend that teams take a more pragmatic approach by starting with a pilot project.

This can be instrumenting analytics for a new feature or for a particular source such as your iOS app. Once the team is happy and bought in to this new approach spend the time focusing on your analytics strategy and migrating your existing tracking calls.

**Step 1:** Export your existing analytics schema from your analytics provider and import it into Amplitude Data.

**Step 2:** Remove loosely-typed libraries and replace all existing tracking calls.

**Step 3:** Moving forward all new events are added in Amplitude Data.
