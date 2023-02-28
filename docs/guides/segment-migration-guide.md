---
title: Migrating from Segment to Amplitude
description: This document explains the step-by-step process of migrating from Segment to Amplitude. It covers the necessary steps for replacing your instrumentation code using the Amplitude SDKs to track your events with minimal code changes.
status: new
hide:
  - toc #unhide if more headings are added
---

Looking to consolidate on Amplitude for both your [Analytics](https://amplitude.com/amplitude-analytics) and [CDP](https://amplitude.com/customer-data-platform) needs? 

This document covers the necessary steps to:

1. Migrate your Source and Destination configuration
2. Update SDK implementation to send data to Amplitude
3. Validate the migration is successful

!!!note "Table of Contents"
    1. [Add a Source](#add-a-source)
    2. [Update SDK implementation](#update-sdk-implementation)
    3. [Validate events](#validate-events)
    4. [Add a Destination](#add-a-destination)
    5. [Migration checklist](#migration-checklist)
    6. [Frequently asked questions](#frequently-asked-questions)

Quickly review the offerings that are available for Segment and how that stacks up to Amplitude. 

| Segment      | Amplitude |
| ----------- | ----------- |
| [Connections](https://segment.com/product/connections/) | [Sources](/data/sources/) & [Destinations](/data/destinations/) |
| [Profiles](https://segment.com/product/profiles/)   | [Audiences](https://help.amplitude.com/hc/en-us/sections/360011146031-Amplitude-Audiences) |
| [Protocols](https://segment.com/product/protocols/) | [Data Management](https://help.amplitude.com/hc/en-us/categories/5078631395227-Amplitude-CDP) |

!!!info "Recommended Best Practice"
    Follow a strict release process and [configure multiple environments](https://help.amplitude.com/hc/en-us/articles/5078848559259-Configure-and-manage-your-Amplitude-Data-settings#the-environments-tab). Validate changes within each environment before deploying.

## Add a Source

You can add a [new source](/data/sources/) in just a few clicks.

1. From Data, click **Sources** in the Connections section.
2. Click **Add Source**.
3. Browse or search for the source you want to add.
4. Follow the on-screen prompts.

For detailed instructions, see the documentation for the [source](/data/sources/) you want to add.

## Update SDK implementation

Both Segment and Amplitude SDKs are meant to capture first party data by tracking user interactions. For the most part both work pretty similarly except some nuances around syntax. Here is high level mapping of concepts between Segment & Amplitude.

| Segment   | Amplitude | Notes                                      |
|-----------|-----------|--------------------------------------------|
| write_key | api_key   | Unique key to validate source of the data. |
| Workspace | Project   | [Projects](https://help.amplitude.com/hc/en-us/articles/360058073772-Create-and-manage-organizations-and-projects#create-a-project) allow you to organize your data.  |
| User      | User      | User who is performing action.             |
| Identify  | Identify  | [Identify](/analytics/what-is-amplitude/#user-properties-are-details-about-your-user) updates properties/attributes of the user.|
| Track     | Event     | [Event](/analytics/apis/http-v2-api-quickstart/) in Amplitude tracks the action user is performing.|
| Screen    | Event     | Create an Event to track Screen views.|
| Page      | Event     | Create an Event to track Page views.|
| Group     | Group     | [Group](/guides/accounts-instrumentation-guide/) is a collection of users. In Amplitude one user could belong to multiple groups. Each group can have properties/attributes that will be available to query/forward on actions performed by any user in the group.|
| Plugins   | Plugins   | [Plugins](/data/ampli/plugin/) les you extend Amplitude by running a sequence of custom code on every event.|


=== "Browser"

    Documentation for [Browser Typescript SDK](/data/sdks/typescript-browser/).

    <table>
    <tr>
    <td>  </td> <td> <b>Segment</b> </td> <td> <b>Amplitude</b> </td>
    </tr>
    <tr>
    <td> Identify </td>
    <td> 
    ```typescript
    analytics.identify('12091906-01011992', {
      name: 'Grace Hopper',
      email: 'grace@usnavy.gov'
    });
    ```
    </td>
    <td>
    ```typescript
    setUserId('12091906-01011992');
    identify(
      Identify()
        .set('name', 'Grace Hopper')
        .set('email', 'grace@usnavy.gov')
    );
    ```
    </td>
    </tr>
    <tr>
    <td> Track </td>
    <td>
    ```typescript
    analytics.track('Article Completed', {
      title: 'How to Create a Tracking Plan',
      course: 'Intro to Analytics',
    });
    ``` 
    </td>
    <td>
    ```typescript
    track('Article Completed', {
      title: 'How to Create a Tracking Plan',
      course: 'Intro to Analytics',
    });
    ``` 
    </td>
    </tr>
    <tr>
    <td> Group </td>
    <td>
    ```typescript
    analytics.group('UNIVAC Working Group', {
      principles: ['Eckert', 'Mauchly'],
      site: 'Eckert–Mauchly Computer Corporation',
      statedGoals: 'Develop the first commercial computer',
      industry: 'Technology'
    });
    ```
    </td>
    <td>
    ```typescript
    groupIdentify(
      'Working Group',
      'UNIVAC' ,
      new Identify()
        .set('principles', ['Eckert', 'Mauchly']);
        .set('site', 'Eckert–Mauchly Computer Corporation');
        .set('statedGoals', 'Develop the first commercial computer');
        .set('industry', 'Technology')
    );
    ``` 
    </td>
    </tr>
    </table>

=== "iOS"

    Documentation for [iOS SDK](/data/sdks/ios/).

    <table>
    <tr>
    <td>  </td> <td> <b>Segment</b> </td> <td> <b>Amplitude</b> </td>
    </tr>
    <tr>
    <td> Identify </td>
    <td> 
    ```swift
    Analytics.shared().identify("abc", traits: ["email": "abc@domain.com"])
    ```
    </td>
    <td>
    ```swift
    Amplitude.instance().setUserId("abc")
    Amplitude.instance().identify(
      AMPIdentify()
        .set("email", value: "female")
        .set("age",value: NSNumber(value: 20))
    )
    ```
    </td>
    </tr>
    <tr>
    <td> Track </td>
    <td>
    ```swift
    Analytics.shared().track("Button Clicked", properties: ["Hover Time": "100ms"])
    ``` 
    </td>
    <td>
    ```swift
    Amplitude.instance().logEvent("Button Clicked", withEventProperties: ["Hover Time": "100ms"] )
    ``` 
    </td>
    </tr>
    <tr>
    <td> Group </td>
    <td>
    ```swift
    Analytics.shared().group("OrgName-xyz", traits: ["plan": "enterprise"])
    ```
    </td>
    <td>
    ```swift
    Amplitude.instance().setGroup("orgName", groupName:NSString(string:"xyz"))
    Amplitude.instance().groupIdentifyWithGroupType(
      "orgName",
      groupName:NSString(string:"xyz"),
      groupIdentify:AMPIdentify().set("plan", value: "enterprise")
    )
    ``` 
    </td>
    </tr>
    </table>


=== "Android"

    Documentation for [Android Kotlin SDK](/data/sdks/android-kotlin/).

    <table>
    <tr>
    <td>  </td> <td> <b>Segment</b> </td> <td> <b>Amplitude</b> </td>
    </tr>
    <tr>
    <td> Identify </td>
    <td> 
    ```kotlin
    Analytics.with(context).identify("abc", Traits().putEmail("abc@domain.com"), null)
    ```
    </td>
    <td>
    ```kotlin
    amplitude.setUserId("abc")
    amplitude.identify(Identify().set("email", "abc@domain.com"))
    ```
    </td>
    </tr>
    <tr>
    <td> Track </td>
    <td>
    ```kotlin
    Analytics.with(context).track("Product Viewed", Properties().putValue("name", "Moto 360"))
    ``` 
    </td>
    <td>
    ```kotlin
    amplitude.track(
      "Product Viewed",
      mutableMapOf<String, Any?>("name" to "Moto 360")
    )
    ``` 
    </td>
    </tr>
    <tr>
    <td> Group </td>
    <td>
    ```kotlin
    Analytics.with(context).group("abc", "orgName-xyz", Traits().putplan("enterprise"))
    ```
    </td>
    <td>
    ```kotlin
    amplitude.setGroup("orgName", "xyz");
    amplitude.groupIdentify("orgName", "xyz", Identify().set("plan", "enterprise"))
    ``` 
    </td>
    </tr>
    </table>
 
For all other SDKs view the [Quickstart Guide](/data/sdks/sdk-quickstart/) and take a look at the [SDK documentation](/data/sdks/sdk-overview/).

## Validate events

Data validation is a critical step in the instrumentation process. Amplitude lets validate your event data via Amplitude's [User Lookup](/data/debugger/#user-lookup) or using the [Instrumentation Explorer](/data/debugger/#instrumentation-explorer) Chrome extension.

## Add a destination

You can add a [new destination](/data/destinations/) in just a few clicks. 

1. From Data, click **Destinations** in the Connections section. 
2. Click **Add Destination**.
3. Browse or search for the destination you want to add. 
4. Follow the on-screen prompts. 

For detailed instructions, see the documentation for the [destination](/data/destinations/) you want to add. 


## Migration checklist

It's important to validate the migration to make sure there is minimal impact on downstream data consumers. 

- [x] Added all sources to Amplitude
- [x] Migrated existing tracking code to Amplitude SDKs
- [x] Validated events are flowing in to Amplitude correctly
- [x] Added all destinations to Amplitude
- [x] Validated data is flowing into destinations correctly
- [x] Validated downstream consumers are not impacted (e.g. BI, Mktg, ML, Ops)
- [x] Celebrate! 🎉

## Frequently asked questions

??? note "How long does it take to migrate?"

    This depends on how you implemented your CDP. For most teams we'd recommend that you plan a few months to be able to complete your migration. If you're looking to update your taxonomy and tracking plan than this could require more upfront planning.

??? note "What if I don't see an integration that I need?"

    We're constantly adding new integrations so either add a request in product or commuincate with your CSM and we'll provide a timeline.

??? note "How much does Amplitude CDP Cost?"

    This depends on what you're using your existing CDP for today and what you're looking to get out of Amplitude — we have comparable offerings that are built into our Digital Analytics Platform that are a fraction of what you'd be paying another CDP provider. 

??? note "What if I have an existing CDP contract?"

    Contact your CSM or AE to discuss what options are available.