You can turn off logging for a given user by setting `setOptOut` to `true`.

```ts
amplitude.setOptOut(true);
```

Events aren't saved or sent to the server while `setOptOut` is enabled, and the setting persists across page loads. 

Re-enable logging by setting `setOptOut` to `false`.

```ts
amplitude.setOptOut(false);
```
