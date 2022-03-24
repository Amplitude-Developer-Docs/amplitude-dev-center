Amplitude [merges user data](https://help.amplitude.com/hc/en-us/articles/115003135607#h_c323d7e5-4662-4a36-b0a1-5110a341e80c), so any events associated with a known `userId` or `deviceId` are linked the existing user.
 If a user logs out, Amplitude can merge that user's logged-out events to the user's record. You can change this behavior and log those events to an anonymous user instead.

To log events to an anonymous user:

1. Set the `userId` to null.
2. Generate a new `deviceId`.

Events coming from the current user or device appear as a new user in Amplitude. Note: If you do this, you can't see that the two users were using the same device.