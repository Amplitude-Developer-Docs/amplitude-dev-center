---
id: unit-testing
title: Unit Testing
---

### Overview

A common problem with analytics is lack of testing. Product teams don't think of analytics as a first class citizen in their SDLC and the lack of attention leads to the problem Iteratively was founded on: low-quality, unreliable, untrustworthy data.

Iteratively has taken a big step forward in helping teams begin to address this problem by:

- Solving the workflow/collaboration problem around analytics tracking requirements so everyone is on the same page about what should be getting tracked, and when
- Solving the taxonomy/conventions problem around consistent naming across teams and platforms so everyone implements, and can then interpret, analytics the same way
- Solving the engineering problem of implementing analytics events correctly so that developers don't get a chance to send invalid data that doesn't conform to spec

However, the big part that is still missing is the confirmation that the validated data is actually being tracked, and is being tracked at the right time. To address this, we're releasing a new plugin to make it  a cinch to add analytics coverage to existing unit tests.

:::note Support
✅ Unit testing using the new plugin is currently only available for the following runtimes:
- **Browser — JavaScript**
- **Browser — TypeScript**
- **Node.js — JavaScript**
- **Node.js — TypeScript**

Support for additional runtimes is in progress!
:::

### TL;DR

An example in Jest.
```tsx
import ItlyTestPlugin from '@itly/plugin-testing'
import itly, { FooCalled } from '../../../itly'

const itlyTestPlugin = new ItlyTestPlugin()

beforeAll(() => {
  itly.load({
    // Disable all destinations
    destinations: { all: { disabled: true } },
    // Enable the testing plugin
    plugins: [itlyTestPlugin],
  })
})

beforeEach(() => {
  // Reset the plugin's state before each test
  itlyTestPlugin.reset()
})

test('test that function foo() returns "foo" and tracks "Foo Called"', () => {
  expect(foo()).toBe('foo')
  expect(itlyTestPlugin.all()).toEqual([new FooCalled()])
})
```

### Testing Analytics with the Itly SDK

A typical unit test will mock out the unit's dependencies to eliminate side effects, simplify test setup, and maximize the test's speed. Not so fast! Keeping the Itly SDK in place can be an inexpensive way to add analytics coverage with relatively minimal effort. Running the Itly SDK at full capacity still wouldn't make sense — there's no point in actually sending analytics events out to their destinations — but with a small bit of configuration, we can reduce the SDK to two key functions:

1. Event schema validation — making sure tracked events match their schema
2. Event order validation — making sure expected events are actually tracked and in the right order

Disabling the Itly SDK altogether is always an option in pure unit tests (`itly.load({ disabled: true })`). There's nothing wrong with writing dedicated unit tests for analytics tracking — or using the approach outlined in this doc in integration tests.

To configure the Itly SDK for the unit test context, we'll need to:

1. Stop Itly from loading underlying analytics provider SDKs (e.g. Segment's, Amplitude's) and sending events to those destinations
2. Load a plugin that will collect those events instead and make them available for the unit test's assertions

For #1, disable all built-in destinations using the `destinations` option:

```tsx
itly.load({
  destinations: { all: { disabled: true } },
  plugins: [itlyTestPlugin],
})
```

### Using the Testing Plugin

For #2, a new OSS helper [plugin](https://www.npmjs.com/package/@itly/plugin-testing) is available that you can use to collect and retrieve all tracked events. You can use the retrieved events with your favorite assertion library to ensure the right events were tracked with the right properties.

To install the plugin into your project, run `npm install -D @itly/plugin-testing` or `yarn add -D @itly/plugin-testing`.

To import the plugin in your unit test file, add `import ItlyTestPlugin from '@itly/plugin-testing'` to your list of imports.

And to enable the plugin in the Itly SDK, include it in the  `plugins` array option when loading the SDK:

```tsx
const itlyTestPlugin = new ItlyTestPlugin()
itly.load({
  destinations: { all: { disabled: true } },
  plugins: [itlyTestPlugin],
})
```

The plugin exposes several methods you can use to retrieve collected events and reset the plugin's state in between tests:

```tsx
all(userId?: string): TrackingEvent[];
```

Return all events tracked during the current session. Optionally, on Node.js, only return events tracked for a particular user.

```tsx
ofType(ev: TrackingEvent, userId?: string): TrackingEvent[];
```

Return events of a specific type tracked during the current session. The generated Itly SDK exposes a type for every event in your tracking plan (for example, if you've defined an event called **User Logged In**, the SDK will expose a class `UserLoggedIn`).

```tsx
firstOfType(ev: TrackingEvent, userId?: string): TrackingEvent;
```

Return the first event of a specific type tracked during the current session, or null if no such event was tracked.

```tsx
reset(): void;
```

Reset the testing plugin's state in between each test run.

For example, to assert that a particular unit tracked the "Foo Called" event:

```tsx
expect(itlyTestPlugin.all()).toEqual([
	new FooCalled()
])
```

You can also assert that the event contained properties with expected values:

```tsx
expect(itlyTestPlugin.ofType(FooCalled)).toEqual([
  new FooCalled({ bar: 'baz' })
])
```