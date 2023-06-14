The `flush` method triggers the client to send buffered events immediately.

```ts
amplitude.flush();
```

By default, `flush` is called automatically in an interval, if you want to flush the events all together, you can control the async flow with the optional Promise interface, example:

```ts
amplitude.init(API_KEY).promise.then(function() {
  amplitude.track('Button Clicked');
  amplitude.flush();
});
```
