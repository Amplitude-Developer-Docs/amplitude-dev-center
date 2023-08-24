You can control the level of logs printed to the developer console.

- 'None': Suppresses all log messages.
- 'Error': Shows error messages only.
- 'Warn': Shows error messages and warnings. This is the default value if `logLevel` isn't explicitly specified.
- 'Verbose': Shows informative messages.
- 'Debug': Shows error messages, warnings, and informative messages that may be useful for debugging, including the function context information for all SDK public method invocations. This logging mode is only suggested to be used in development phases.

Set the log level by configuring the `logLevel` with the level you want.

```ts
amplitude.init(AMPLITUDE_API_KEY, OPTIONAL_USER_ID, {
  logLevel: amplitude.Types.LogLevel.Warn,
});
```

The default logger outputs log to the developer console. You can provide your own logger implementation based on the `Logger` interface for any customization purpose. For example, collecting any error messages from the SDK in a production environment.

Set the logger by configuring the `loggerProvider` with your own implementation.

```ts
amplitude.init(AMPLITUDE_API_KEY, OPTIONAL_USER_ID, {
  loggerProvider: new MyLogger(),
});
```

##### Debug Mode
Enable the debug mode by setting the `logLevel` to "Debug", for example:

```ts
amplitude.init(AMPLITUDE_API_KEY, OPTIONAL_USER_ID, {
  logLevel: amplitude.Types.LogLevel.Debug,
});
```

With the default logger, extra function context information will be output to the developer console when invoking any SDK public method, including:

- 'type': Category of this context, e.g., "invoke public method".
- 'name': Name of invoked function, e.g., "track".
- 'args': Arguments of the invoked function.
- 'stacktrace': Stacktrace of the invoked function.
- 'time': Start and end timestamp of the function invocation.
- 'states': Useful internal states snapshot before and after the function invocation.
