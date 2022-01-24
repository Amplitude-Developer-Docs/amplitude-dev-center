---
id: working-with-templates
title: Working with Property Groups
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Property groups allow you to define groups of properties that can be applied quickly to events.

Property groups make it much easier to manage complex tracking plans as you don't have to keep adding the same properties to events multiple times. When you update a property group, it applies the changes to all events it's associated with. 

### Creating a Property Group

For example, a music app might have a **Song** property group that can be associated with all song-related events that include the following properties:

- albumName
- artistName
- genre
- songDuration
- songTitle

![Templates](/img/templates.png)

### Adding a Property Group to an Event

To add a property group to an event, select the event, and you'll see a property group field. Once you've added the property group the property group properties will show up in the tracking plan for that event. To modify the properties for a property group, simply navigate back to the property group and make your changes; they'll be applied across all events or sources. 

<p><img alt="Event Templates" src={useBaseUrl('/img/template_event.png#400')} /></p>

<!-- ### Adding a Property Group to a Source

It's pretty common to capture source-specific context, such as `appVersion` for iOS and Android sources. Once you've created your property group you can apply it to a Source by navigating to [Connections](//app.iterative.ly/connections) and adding it to the property group field for the appropriate source. These property group properties are included on all events sent from that source.

![Event Templates](/img/template_source.png) -->