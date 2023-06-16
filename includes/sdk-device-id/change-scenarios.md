#### When does a device ID change

A device ID changes in many scenarios:

!!!Note "Amplitude Analytics SDKs share an identity store with Experiment SDKs"
    `setDeviceId` also updates the identity store to propagate new user info to experiment SDK and trigger a fetch if device ID has changed.

- `setDeviceId()` is called explicitly