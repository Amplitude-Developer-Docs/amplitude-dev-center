You can assign a new Session ID using `setSessionId`. When setting a custom session ID, make sure the value is in milliseconds since epoch (Unix Timestamp).

```ts
amplitude.setSessionId(Date.now());
```
