### Flush

The Ampli wrapper queues events and sends them on an interval based on the configuration.

Call `Flush()` to immediately send any pending events.

The `Flush()` method returns a promise that can be used to ensure all pending events have been sent before continuing.
This can be useful to call prior to application exit.

=== "Go"

    ```golang
    ampli.Instance.Flush()
    ```
