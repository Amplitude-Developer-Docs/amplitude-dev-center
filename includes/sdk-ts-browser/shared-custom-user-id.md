If your app has its login system that you want to track users with, you can call `setUserId` at any time.

```ts
amplitude.setUserId('user@amplitude.com');
```

You can also assign the User ID as an argument to the init call.

```ts
amplitude.init(API_KEY, 'user@amplitude.com');
```
