User properties are details like device details, user preferences, or language to help you understand your users at the time they performed an action in your app.

Identify is for setting the user properties of a particular user without sending any event. The SDK supports the operations `set`, `setOnce`, `unset`, `add`, `append`, `prepend`, `preInsert`, `postInsert`, and `remove` on individual user properties. Declare the operations via a provided Identify interface. You can chain together multiple operations in a single Identify object. The Identify object is then passed to the Amplitude client to send to the server.

!!!note
    If the Identify call is sent after the event, the results of operations are visible immediately in the dashboard user’s profile area. However, they don't appear in chart results until another event is sent after the Identify call. The identify call only affects events going forward. More details [here](https://amplitude.zendesk.com/hc/en-us/articles/115002380567-User-Properties-Event-Properties#applying-user-properties-to-events).

#### Set a user property

The Identify object provides controls over setting user properties. It works like this: first, instantiate an Identify object, then call Identify methods on it, and finally, the client can make a call with the Identify object.

```ts
const identifyEvent = new amplitude.Identify();
amplitude.identify(identifyEvent);
```

#### Identify.set

This method sets the value of a user property. For example, you can set a role property of a user.

```ts
const identifyEvent = new amplitude.Identify();
identifyEvent.set('location', 'LAX');

amplitude.identify(identifyEvent);
```

#### Identify.setOnce

This method sets the value of a user property only one time. Subsequent calls using `setOnce()` are ignored. For example, you can set an initial login method for a user and because only the initial value is tracked, `setOnce()` ignores later calls.

```ts
const identifyEvent = new amplitude.Identify();
identifyEvent.setOnce('initial-location', 'SFO');

identify(identifyEvent);
```

#### Identify.add

This method increments a user property by some numerical value. If the user property doesn't have a value set yet, it's initialized to 0 before it's incremented. For example, you can track a user's travel count.

```ts
const identifyEvent = new amplitude.Identify();
identifyEvent.add('travel-count', 1);

amplitude.identify(identifyEvent);
```

#### Arrays in user properties

You can use arrays as user properties. Directly set arrays or use `prepend`, `append`, `preInsert` and `postInsert` to generate an array.

#### Identify.prepend

This method prepends a value or values to a user property array. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are prepended.

```ts
const identifyEvent = new Identify();
identifyEvent.prepend('visited-locations', 'LAX');

identify(identifyEvent);
```

#### Identify.append

This method appends a value or values to a user property array. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are prepended.

```ts
const identifyEvent = new amplitude.Identify();
identifyEvent.append('visited-locations', 'SFO');

amplitude.identify(identifyEvent);
```

#### Identify.preInsert

This method pre-inserts a value or values to a user property, if it doesn't exist in the user property yet. Pre-insert means inserting the values at the beginning of a given list. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are pre-inserted. If the user property has an existing value, this method is a no-op.

```ts
const identifyEvent = new amplitude.Identify();
identifyEvent.preInsert('unique-locations', 'LAX');

identify(identifyEvent);
```

#### Identify.postInsert

This method post-inserts a value or values to a user property, if it doesn't exist in the user property yet. Post-insert means inserting the values at the end of a given list. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are post-inserted. If the user property has an existing value, this method is a no-op..

```ts
const identifyEvent = new amplitude.Identify();
identifyEvent.postInsert('unique-locations', 'SFO');

amplitude.identify(identifyEvent);
```

#### Identify.remove

This method removes a value or values to a user property, if it exists in the user property. Remove means remove the existing values from the given list. If the user property has an existing value, this method is a no-op.

```ts
const identifyEvent = new amplitude.Identify();
identifyEvent.remove('unique-locations', 'JFK')

amplitude.identify(identifyEvent);
```
