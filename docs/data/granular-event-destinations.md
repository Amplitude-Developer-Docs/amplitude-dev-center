---
id: granular-event-destinations
title: Granular Event Destinations
---

Sending events to the right analytics destinations based on the source that sent them (for example, iOS to Firebase Analytics) has been a powerful way to control the flow of your data. With granular event destinations you can take that control further by configuring your destinations at the level of the event itself. 

With multiple teams requiring event data in their tools of choice, granular destinations gives you the flexibility you need to control your event routing. You might want to send all your events to Amplitude, but only a select few to Intercom. Maybe you want to exclude high-volume events from certain destinations to optimize your spend or exclude PII data from entering certain tools.

:::note Support
✅ Granular event destinations is currently available for the following runtimes:
- **Browser — JavaScript**
- **Browser — TypeScript**
- **Node.js — JavaScript**
- **Node.js — TypeScript**

Support for additional runtimes is in progress! [Reach out to us](https://support.amplitude.com/) if there's a specific runtime you're looking for.
:::

### Modifying Your Existing Events
By default, when a destination is connected to a source, all events from that source are sent to that destination. With granular event destinations, you can now override this configuration on the event itself.

![Amplitude Enabled](/img/amplitude-enabled.png)

If you don't see any destination icons on your Events page, it could be because:
- You don't have a destination configured yet
- The event source is not supported yet (see above for the current runtimes we support)

Simply click on the icon for the destination that you would like to disable. You'll have to do that for all the events you want to disable.

![Segment Disabled](/img/segment-disabled.png)

Once you've reviewed the changes with your team you can publish a new version of your tracking plan (and depending on your workflow, merge your changes into **main**).

⭐ This doesn't require any additional coding from your engineering team. Use the usual `ampli pull` command to automatically update the Itly SDK and route your events accordingly. 

If your requirements change, you can easily re-renable destinations for your events. Just as you disabled the destination you can enable the destination again by clicking the destination icon.

:::note Tip
💡 Remember to always execute the `ampli pull` command when changes have been made to your destination configurations.
:::

### Best Practices 
What's best practice when it comes to enabling or disabling destinations by default? It depends on your setup, but we usually recommend enabling all events for a destination at first. This will allow you and your teams to decide which events are not needed in your respective destinations and fine-tune your tracking plan from there.

#### Enable all events for a destination
Clicking on a destination allows you to further configure the destination's default send behavior using the **Send Events By Default** setting. When this setting is enabled, all events sent from connected sources will be sent to this destination by default.

![Configure Destinations](/img/configure-destinations.png)

#### Disable all events for a destination
If you'd rather opt events in to a destination rather than opting them out, disable the **Send Events By Default** setting. When disabled, no events will be sent to this destination from connected sources by default. To incrementally include additional events to this destination as you see fit, enable them individually as outlined in the [Modifying Your Existing Events](#modifying-your-existing-events) section above.