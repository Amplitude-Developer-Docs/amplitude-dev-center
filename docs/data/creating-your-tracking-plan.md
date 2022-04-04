---

title: Creating Your Tracking Plan
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Now that we know what a [Tracking Plan](/what-is-a-tracking-plan) is and how it can benefit your company, let's get started.

The Amplitude Data web app allows all stakeholders to collaborate on a single source of truth for analytics definitions. It keeps everyone in sync on what data to track, when, and why, and maintains a consistent schema across engineering, product management, data science, and other consumers of analytics data.

### Step 1: Add your Sources

Sources represent the main parts of your product, e.g. your `iOS`, `Android`, `Web`, and `Backend`. Create a new Source for every standalone part that will send events to your analytics backends.

From [Connections](//data.amplitude.com/connections) select `Add source` to create a new source.

<!-- ![Sources](/img/sources.png#400) -->
<p><img alt="Sources" src={useBaseUrl('/img/sources.png#400')} /></p>

Every Source has a name, runtime, and a set of destinations associated with it.

<!-- ![Source Modal](/img/source.png#400) -->
<p><img alt="Source Modal" src={useBaseUrl('/img/source.png#400')} /></p>

A Source's runtime defines the [platform-language combination](/using-the-tracking-library) used by that part of your application (e.g. iOS — Swift). Amplitude Data uses this information to generate the correct tracking library for engineers implementing your tracking plan.

A Source's set of destinations defines the analytics providers that will receive events from this particular Source.

### Step 2: Add your Destinations


:::note Tip
If you are sending data to an Amplitude destination, your keys will be automatically synchronized and you won't need to do any manual setup.
:::

Destinations represent the analytics providers events will be sent to from your Sources.

From [Connections](//data.amplitude.com/connections) select `Add destination` to create a new destination.

<!-- ![Destinations](/img/destinations.png#400) -->
<p><img alt="Destinations" src={useBaseUrl('/img/destinations.png#400')} /></p>

Every Destination has a vendor, access token, and a set of sources associated with it.

<!-- ![Destination Modal](/img/destination.png#400) -->
<p><img alt="Destination Modal" src={useBaseUrl('/img/destination.png#400')} /></p>

A Destination's vendor identifies a particular analytics provider you're working with. Amplitude Data uses this information when generating a tracking library for your engineering team to make sure it sends events to all the right places. For Amplitude specifically, you can choose your respective projects directly from a dropdown menu.

A Destination's set of sources defines the parts of your applications that will send events to this particular Destination.

<!-- ### Step 3: Create a Template (Coming soon!)

From [Templates](//app.iterative.ly/templates) select `Add template` -->

### Step 3: Create your Events

An event is a distinct action that a user can perform in your product. You should not be tracking all user interactions but those that are important for understanding user behavior or triggering marketing automation.

From Events select `Add Event` to create your first event.

<!-- ![Events Page](/img/events.png) -->
<p><img alt="Events Page" src={useBaseUrl('/img/events.png')} /></p>

:::note Tip
Amplitude Data recommends the Object-Action Framework as a best practice for governing the structure of your events. Each event is associated with an Object in your application (e.g. Song, File, or User) and an Action (e.g. Played, Uploaded, or Logged In).
:::

Every event has a name, description, sources it applies to (e.g. iOS, Android), and a set of properties.

![Event Details](/img/event.png)

### Step 4: Add Properties

An event may have one or more properties associated with it. Properties further describe the particular event and the context it was invoked in. For example, a Song Played event may contain a songTitle property.

![Properties](/img/properties.png)

Every property is defined by a name, description, examples, and rules for that property. Properties get validated at runtime to insure that only data that conforms to your rules makes its way into your analytics destinations. Rules are specific to each data type. For example, property songTitle of type String can have the following rules: Min Length, Max Length, and Regex.

<!-- ![Property](/img/property.png#400) -->
<p><img alt="Property" src={useBaseUrl('/img/property.png#400')} /></p>

If you have events that share similar properties you can [create a property group](/working-with-templates) which is a group of properties that can be applied to multiple events. Property groups makes it much easier to manage complex tracking plans as you don't have to keep adding the same properties multiple times. When you update a property group it applies the changes to all events it's associated with. 

### Step 5: Publish your Changes

Once you've reviewed the changes with your team you can publish a new version of the tracking plan to have a developer instrument them. You can do this by selecting the `5 Changes` button in the header.

![Publish](/img/publish.png)

This will open up a review panel that lists all of the changes to your tracking plan since the last published version. Only [admins or approvers](/managing-your-account#user-management) can publish changes to the tracking plan while anybody can propose changes. If you'd like to reset your tracking plan to the last published version you can discard all proposed changes. 

![Publish Version](/img/publish_version.png)

### Step 6: Solicit your Team's Feedback

Collaborating with your team on your tracking plan helps ensure everyone is aligned and you can gather feedback from your colleagues before instrumenting new events. We've made collaboration easy in Amplitude Data with the ability to comment on events, properties, property groups and more. Using the rich text editor you can even add code snippets and images for more detailed explanations.

![Add a Comment](/img/comment.png)

You can @mention your colleagues and they'll receive an email notification, letting folks know they're needed. And with our [Slack integration](/integrations/#slack) you ensure everyone stays in the loop.

### Step 7: Instrument your Product

A Tracking Plan is consumed by developers in the form of type-safe auto-generated code. Amplitude Data can generate a tracking library for all popular platforms and programming languages. The auto-generated library is a lightweight wrapper over your analytics provider's SDK that provides type-safety, supports linting, and enables additional features like input validation. The code exactly replicates the spec in the tracking plan and enforces all its rules and requirements.

The next step is to have your developers instrument your product [using the Ampli CLI](/using-the-ampli-cli).
