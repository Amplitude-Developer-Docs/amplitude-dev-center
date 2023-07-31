!!! failure "Carrier cannot be tracked in iOS 16+"
    The SDK fetches carrier information by using `serviceSubscriberCellularProviders` and `CTCarrier` which are [deprecated](https://developer.apple.com/documentation/coretelephony/cttelephonynetworkinfo/3024511-servicesubscribercellularprovide) with [no replacement](https://developer.apple.com/forums/thread/714876?answerId=728276022#728276022) starting from iOS 16. Amplitude will keep updated with Apple and re-enable carrier tracking as soon as Apple releases a replacement.

