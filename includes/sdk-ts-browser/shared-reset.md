`reset` is a shortcut to anonymize users after they log out, by:

* setting `userId` to `undefined`
* setting `deviceId` to a new UUID value

With an undefined `userId` and a completely new `deviceId`, the current user would appear as a brand new user in dashboard.

```ts
amplitude.reset();
```
