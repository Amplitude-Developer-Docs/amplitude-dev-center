### How to debug

Please ensure that the configuration and payload are accurate and check for any unusual messages during the debugging process. If everything appears to be right, check the value of `flushQueueSize` or `flushIntervalMillis`. Events are queued and sent in batches by default, which means they are not immediately dispatched to the server. Ensure that you have waited for the events to be sent to the server before checking for them in the charts.

#### Log

- Set the log level to debug to collect useful information during debuggging. [More details](./#log-level).
- Customize `loggerProvider` class from the `LoggerProvide` and implement your own logic, like log error message in server in a a production environment. [More details](./#set-log-callback).