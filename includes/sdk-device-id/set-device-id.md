#### Set device ID

If your app has its own login system that you want to track users with, you can call `setUserId()` at any time.

!!!note
    Amplitude doesn't recommend defining your own device IDs unless you have your own system for tracking user devices. Make sure the `deviceId` you set is unique to prevent conflicts with other devices in your Amplitude data.
    
    Amplitude recommends using a UUID. [See an example](https://github.com/amplitude/Amplitude-Javascript/blob/master/src/uuid.js) of how to generate UUIDs with JavaScript.