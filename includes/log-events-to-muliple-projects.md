To log events to multiple Amplitude projects, you must have separate instances for each Amplitude project.
 Each instance allows for independent `apiKeys`, `userIds`, `deviceIds`, and settings.

Assign a name to each Amplitude project and instance and use that name consistently when fetching that instance to call functions.

!!!important
    After you have chosen a name for that instance you can't change it. 
    An instance's data and settings are associated with its name, and you must use that instance name for all future versions of your project to maintain data continuity.
    Instance names don't need be the names of your projects in the Amplitude platform, but they need to remain consistent throughout your code. Each instance must also be initialized with the correct `apiKey`.

Instance names must be non-null and non-empty strings. Names are case insensitive, and you can fetch each instance name by calling.

Each new instance has its own `apiKey`, `userId`, `deviceId`, and settings.

The following is an example of how to set up and log events to two separate projects: