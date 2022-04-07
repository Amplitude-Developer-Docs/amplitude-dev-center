---
title: Debugging with User Lookup
description: Use Amplitude's User Lookup feature to debug your instrumentation. 
---

When implementing analytics, it can be helpful to see exactly what events your application sends to your analytics destinations. The Itly SDK helps you do just that! The SDK sends all tracked events to your Amplitude account so you can inspect them and make sure everything works as expected.

The User Lookup page can be used as a debugger for your analytics. It helps build confidence in your instrumentation during development by letting you see the event's name and type, the version that was sent, which app sent it, and when.

User Lookup is on by default for all projects.

Before using User Lookup, make sure you have: 

- Installed the Ampli SDK into your application (see [Using the Ampli CLI](using-the-ampli-cli))
- Loaded the Ampli SDK in your application (see [Using the Tracking Library](using-the-tracking-library))

## Further Reading
For more information on how to use the User Lookup page, please refer to the [Amplitude User & Account Look-Up documentation](https://help.amplitude.com/hc/en-us/articles/229313067-User-Look-Up).
