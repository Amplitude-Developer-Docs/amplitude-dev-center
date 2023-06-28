--8<-- "includes/sdk-troubleshooting-and-debugging//latest-sdk-how-to-debug.md"

#### Plugins
You can take advantage of the Destination Plugin to print out the configuration value and event payload before sending them to the server. You can set the logLevel to debug, copy the following `ToubleShootingPlugin` into your project, add the plugin into amplitude instance.

- [SwiftUI TroubleShootingPlugin example](https://github.com/amplitude/Amplitude-Swift/tree/main/Examples/AmplitudeSwiftUIExample/AmplitudeSwiftUIExample/ExamplePlugins/TroubleShootingPlugin.swift).

--8<-- "includes/sdk-troubleshooting-and-debugging/latest-sdk-event-callback.md"
 
--8<-- "includes/sdk-troubleshooting-and-debugging//common-issues.md"