---
id: migration-guide
title: Migration Guide
---

If you already have analytics implemented in your product and want to migrate to Iteratively, we make it easy to switch from your existing Analytics provider.

### Migrating Events

For example, if you're currently tracking events with Segment's SDK: 

```ts
analytics.track('Song Uploaded',{
  device: 'iOS'
});
``` 

Once you import your [Tracking Plan](/creating-your-tracking-plan) into Iteratively, this event becomes: 

```ts
itly.songUploaded({
  device: 'iOS'
});
```

With all the benefits of type-safety, linting, and data validation to ensure that your analytics are accurate and trustworthy.

<!-- Consider showing example for Identify, Group, Page
https://segment.com/guides/how-to-guides/migrate-from-other-tools/
 -->


### Adopting Iteratively

Quite often teams don't trust their existing analytics and they want to start from scratch. While this approach works for some teams it is not recommended for everybody. It is a lot of work to rethink your existing tracking plan and while implementing Iteratively is straightforward we recommend that teams take a more pragmatic approach by starting with a pilot project.

This can be instrumenting analytics for a new feature or for a particular source such as your iOS app. Once the team is happy and bought in to this new approach spend the time focusing on your analytics strategy and migrating your existing tracking calls.

**Step 1:** Export your existing analytics schema from your analytics provider and import it into Iteratively. 

**Step 2:** Remove loosely typed libraries and replace all existing tracking calls.

**Step 3:** Moving forward all new events are added in Iteratively.