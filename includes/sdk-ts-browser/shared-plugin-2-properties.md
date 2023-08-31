##### plugin.name [optional]

The name field is an optional property that allows you to reference the plugin for deletion purposes. If not provided, Amplitude will assign a random name when the plugin is added. If you do not plan to delete your plugin, you can skip assigning a name.

##### plugin.type [optional]

The type field is an optional property that defines the type of plugin you are creating. Refer to `execute()` function below to distinguish the two types. If not defined, the plugin defaults to an enrichment type.

##### plugin.setup() [optional]

The setup function is an optional method and is called when the plugin is added or on first init whichever happens later. This function accepts two parameters: 1) Amplitude configuration; and 2) Amplitude instance. This is useful for setup operations and tasks that depend on either the Amplitude configuration or instance. Examples include assigning baseline values to variables, setting up event listeners, and many more.

##### plugin.execute() [optional for type: enrichment]

For enrichment plugins, execute function is an optional method and is called on each event. This function must return a new event, otherwise, the passed event is dropped from the queue. This is useful for cases where you need to add/remove properties from events, filter events, or perform any operation for each event tracked.

For destination plugins, execute function is a required method and is called on each event. This function must return a response object with keys: `event` (BaseEvent), `code` (number), and `message` (string). This is useful for sending events for third-party endpoints.

##### plugin.teardown() [optional]

The teardown function is an optional method and is called when Amplitude re-initializes. This is useful for resetting unneeded persistent state created/set by setup or execute methods. Examples include removing event listeners, mutation observers, etc.
