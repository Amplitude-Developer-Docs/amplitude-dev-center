#### One user with multiple devices

A single user may have multiple devices, each having a different device ID. To ensure coherence, set the user ID consistently across all these devices. Even though the device IDs differ, Amplitude can still merge them into a single Amplitude ID, thus identifying them as a unique user.

#### Transfer to a new device

It's possible for multiple devices to have the same device ID when a user switches to a new device. When transitioning to a new device, users often transfer their applications along with other relevant data. The specific transferred content may vary depending on the application. In general, it includes databases and file directories associated with the app. However, the exact items included depend on the app's design and the choices made by the developers. If databases or file directories have been backed up from one device to another, the device ID stored within them may still be present. Consequently, if the SDK attempts to retrieve it during initialization, different devices might end up using the same device ID.