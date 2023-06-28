### How to debug

Please verify if the configuration and payload are correct and if there are any suspicious debug messages during debugging. If everything appears to be right, check the value of `flushQueueSize` or `flushIntervalMillis`. Events are queued and sent in batches by default, which means they are not immediately dispatched to the server. Ensure that you have waited for the events to be sent to the server before checking for them in the charts.

#### Log

- Set the log level to debug to collect useful information during debuggging. [More details](../#log-level).
- You are also able to customize loggerProvider class from the LoggerProvide implement your own logic, like log error message in server in a a production environment. [More details](../#set-log-callback).