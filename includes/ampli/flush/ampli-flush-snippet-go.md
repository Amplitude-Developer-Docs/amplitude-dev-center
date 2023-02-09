### Flush

The Ampli wrapper queues events and sends them on an interval based on the configuration.

Call `Flush()` to immediately send any pending events.

=== "Go"

    ```golang
    ampli.Instance.Flush()
    ```
