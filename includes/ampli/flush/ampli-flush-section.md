### Flush

Call `flush()` to immediately send any pending events.

The Amplitude SDK queues events and sends them on an interval based on the configuration. By default, the SDK will flush
every 10 events or 30 seconds, which ever happens first.

The `flush()` method returns a promise that can be used to ensure all pending events have been sent before continuing.
This can be useful to call prior to application exit.
