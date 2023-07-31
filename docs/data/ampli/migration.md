---
title: Migrate to Ampli
description: If you already have analytics implemented in your product you can easily migrate.
template: guide-last.html
---

Ampli provides the benefits of type safety, linting, and data validation to make sure that your analytics are accurate and trustworthy.

To migrate from Amplitude SDK to Ampli, you need to replace all calls using Amplitude SDK with calls using Ampli. However, the process can be done gradually and at your own pace.

## Progressive Migration

### Step 0 - Amplitude SDK Only

This page assumes you have existing analytics instrumentation using the Amplitude SDK.

#### Code Example

```typescript
import * as amplitude from '@amplitude/analytics-browser';

amplitude.init(AMPLITUDE_API_KEY);
amplitude.track('Song Played', { title: 'The best song in the world.' });
amplitude.track({
  event_type: 'Song Played',
  event_properties: {
    title: 'Song 2'
  }
});
amplitude.flush();
```

### Step 1 - Amplitude SDK & Ampli Together

It is easy to use Ampli with your existing Amplitude SDK implementation. Learn more about how Ampli and the Amplitude SDK work together in the [Ampli overview](/data/sdks/ampli-overview) documentation.

Start by passing your existing Amplitude SDK instance to Ampli. Ampli will use the given instance for all event tracking. This includes the API key, plugins, storage provider, log provider and other configuration set on the Amplitude instance.

```typescript
ampli.load({ client: { instance: amplitude }})
```

All existing `amplitude.track('Song Played')` (a.k.a `amplitude.logEvent()`) will continue to work. However, you now also have access to strongly typed methods and types for all events for the Source in your tracking plan e.g. `ampli.songPlayed()` and `ampli.track(new SongPlayed())`.

#### Process

!!!info "Use Branching for easier Migration"
    We recommend creating a branch and adding small sets of events at a time. This splits the migration into manageable parts rather than requiring all events be implemented at once.

    If you are planning to use `ampli status` to verify instrumentation, all events for the current source must be implemented to pass. Isolating the instrumentation into small parts allows you to use `ampli status` at each part of the migration versus waiting for all events to be completed.

1. Add some events to the tracking plan in Data. Add those events to your Source.
2. `ampli pull` to download the generated Events to your project
3. Start replacing `amplitude.track('My Event', {prop: true})` with `ampli.myEvent({ prop: true})` or `ampli.track(new MyEvent({prop:true}))` for each event in the tracking plan.
4. Repeat until all Amplitude SDK calls have been replaced by Ampli.

#### Code Example

```diff
import * as amplitude, { BaseEvent } from '@amplitude/analytics-browser';
+ import { ampli, SongPlayed } from './path/to/ampli';

// Original Implementation
// Notice this will keep working as-is, so you can keep the
// existing implementation while progressively migrating to Ampli

amplitude.init('API-KEY');
amplitude.add(new MyPlugin());
amplitude.setUserId('me');
amplitude.track('Song Played', { title: 'Happy Birthday'});
amplitude.track({
  event_type: 'Song Played',
  event_properties: {
    title: 'The best song in the world.'
  }
});
amplitude.flush();

+ // Ampli implementation
+ // Pass in the existing instance of Amplitude SDK to Ampli
+ // Use Ampli to track new strongly typed methods and types
+ // All Ampli methods call the underlying Amplitude SDK instance
+ 
+ ampli.load({ client: { instance: amplitude }});
+ ampli.songPlayed({ title: 'Hello Sunshine' });
+ ampli.track(new SongPlayed({ title: 'Song 2' }));
+ ampli.flush();
```

### Step 2 - Ampli Only

After all existing Amplitude SDK instrumentation has been replaced with Ampli, you can do a little clean up by removing unnecessary imports and initialization of the Amplitude SDK and instead use the equivalent from Ampli. That’s it!

#### Code Example

```diff
- import * as amplitude, { BaseEvent, Options } from '@amplitude/analytics-browser';
+ import { ampli, SongPlayed, Options } from './path/to/ampli';

// Initialize
const sdkOptions: Options = { ... };
- amplitude.init('API-KEY', undefined, sdkOptions);
+ ampli.load({
+   environment: 'production',
+   client: {
+     configuration: sdkOptions
+   }
+ })

// Plugins
- amplitude.add(new MyPlugin())
+ ampli.client.add(new MyPlugin())

// Set User
- amplitude.setUserId('me')
+ ampli.client.setUserId('me')

// Track Events
- amplitude.track('Song Played', { songId: 'Happy Birthday'});
+ ampli.songPlayed({title: 'Happy Birthday'});
+ ampli.track(new SongPlayed({ songId: 'The best song in the world.' }));

// Flush Events
- amplitude.flush();
+ ampli.flush();
```

## Side by Side Comparison

### Install

<table>
<tr>
<th><div style="min-width:300px">Amplitude SDK</div></th>
<th>Ampli</th>
</tr>
<tr>
<td>

```shell
npm install @amplitude/analytics-browser
```

</td>
<td>

```shell
npm install @amplitude/analytics-browser
npm install -g @amplitude/ampli
ampli pull [--path ./ampli]
```

Note: `ampli pull` requires a Source in Data. Without Events on the Source the user can still pull, but will only be able to use `ampli.track()` without strongly typed events.

</td>
</tr>
</table>

### Initialize

<table>
<tr>
<th><div style="min-width:300px">Amplitude SDK</div></th>
<th>Ampli</th>
</tr>
<tr>
<td>

```typescript
import * as amplitude from '@amplitude/analytics-browser';

amplitude.init(AMPLITUDE_API_KEY);
```

</td>
<td>

```typescript
import { ampli, SongPlayed } from './ampli';

// Initialize with an Environment from Data
ampli.load({
  environment: 'my-production'
});

// Initialize with pre-existing Amplitude SDK instance
ampli.load({
  client: {
    instance: amplitude,
  }
});
```

</td>
</tr>
</table>

### Track

<table>
<tr>
<th><div style="min-width:300px">Amplitude SDK</div></th>
<th>Ampli</th>
</tr>
<tr>
<td>

```typescript
amplitude.track('Sign Up');

amplitude.track({
  event_type: 'Song Played',
  user_properties: {
    title: 'Get Back'
  }
})
```

</td>
<td>

```typescript
ampli.songPlayed({ title: "Get Back" })
ampli.track(new SongPlayed({ title: "Hey"}))

// Not recommended, but possible
// Ampli can track untyped events if desired
ampli.track({
  event_type: 'Sign Up',
  user_properties: {
    userProp: 1
  }
})
```

</td>
</tr>
</table>

### Flush

<table style="width:100%">
<tr>
<th><div style="min-width:300px">Amplitude SDK</div></th>
<th>Ampli</th>
</tr>
<tr>
<td>

```typescript
amplitude.flush();
```

</td>
<td>

```typescript
ampli.flush();
```

</td>
</tr>
</table>

### Other Methods

<table>
<tr>
<th><div style="min-width:300px">Amplitude SDK</div></th>
<th>Ampli</th>
</tr>
<tr>
<td>

```typescript
amplitude.setUserId('me');
amplitude.add(new MyPlugin())
amplitude.setGroup('team', 'awesome')
amplitude.groupIdentify(
  'team',
  'awesome',
  {
    groupProperty: true
  },
)
```

</td>
<td>

```typescript
ampli.client.setUserId('me');
ampli.client.add(new MyPlugin())
ampli.client.setGroup('team', 'awesome')
ampli.client.groupIdentify(
  'team',
  'awesome',
  {
    groupProperty: true
  },
)
```

Use `ampli.client` to access the underlying Amplitude SDK directly.

</td>
</tr>
</table>
