If your app has its login system that you want to track users with, you can call `setUserId` at any time.

You can assign a new device ID using `deviceId`. When setting a custom device ID, make sure the value is sufficiently unique. Amplitude recommends using a UUID.

```ts
amplitude.setDeviceId(uuid());
```
