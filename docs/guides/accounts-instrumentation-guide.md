---
title: Plan Your Accounts Instrumentation
description: words
status: new
---

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

In Amplitude, the default level of reporting is the individual user. What this means is that, unless you specify otherwise, your Amplitude charts and analyses are all based on data drawn from individual users.

Often, this is enough. But sometimes you need reports built around an aggregated unit of measurement. For example, accounts, order IDs, or charts.

The Amplitude Accounts add on enables you to do exactly this, by giving you analytical capabilities at the group level.

A **group** is an object that a set of users might belong to, such as a company of customers, a team of users, or a playlist with listeners. A group type defines the group, for example *`organziation_id`*, *`account_id`*, *`playlist`*, or *`company`*. Groups can help you understand how specific accounts interact with your product, instead of just seeing the individual users in those companies.

This guide aims to help you plan your Accounts instrumentation and also offers guidance for using Amplitude Accounts with Segment and Salesforce.

## Considerations

- Changes to account groups and group properties are applied only to new data moving forward.
- Historical data can't be retroactively updated to include account groups and group properties.
- Amplitude recommends that you make a copy of this [planning workbook](https://docs.google.com/spreadsheets/d/1U4tXFWBzl1LETzjYR_DLBamwgpYt4kRSXyS9K4qdaU0/edit#gid=479331585) to help plan your Accounts implementation.

## Limits 

- You can instrument up to 5 different group types per project.
- You can have up to 1000 account-level properties per project.

## Plan your instrumentation

### Define event level or user level groups

Before you can instrument groups, you need to decide whether you should define event level or user level groups.

<div class="grid cards" markdown>

- **Event level group**

    ---

    - Creates a group that incorporates only specific events in the user's journey.
    - Users are assigned to a group at the time the event is sent.
    - Users don't remain part of the group unless you explicitly assign them when the event is sent. 
    !!!example "Use case"
        Multi-product companies who only want users events related to a specific product to be associated with a group.

- **User level group**

    ---

    - Groups users regardless of the event.
    - Useful when you want to attribute all events performed by a user to a particular group. 
    - Users are assigned to the group once and remain part of the group for future events until you explicitly remove them. 
    !!!example "Use case"
        You want to associate all users who work for "Acme Company" are with a particular group.

</div>

### Differences between event and user level instrumentation

The instrumentation approach you should take varies depending on whether you've chosen to define event level or user level groups.

#### Approach for event level groups

Amplitude recommends taking the following approach for event level groups.

<div class="grid cards" markdown>

- :material-numeric-1-circle:{ .lg .middle } **Events**

    ---

    **Tie users to a group** at the time an event is sent. 

    **Send events** server-side to the [HTTP V2 API](/../analytics/apis/http-v2-api) or [Batch API](/../analytics/apis/batch-event-upload-api), or using an SDK. 

    The group association **doesn't** persist for the user. You must pass it with each relevant event.

- :material-numeric-2-circle:{ .lg .middle } **Group Identify**

    ---

    **Set and update group properties** via group identify calls. 

    Send group identify calls server-side to the [Group Identify API](/../analytics/apis/group-identify-api) or using an SDK. 

    Group properties persist for the group until they're explicitly updated or unset. Updates to group properties aren't retroactive. 

</div>

#### Approach for user level groups

Amplitude recommends taking the following approach for user level groups.

<div class="grid cards" markdown>

- :material-numeric-1-circle:{ .lg .middle } **Identify**

    ---

    **Tie users to a group** via identify calls. 

    Send identify calls server-side to the [Identify API](/../analytics/apis/identify-api) or using an SDK. 

    The group association persists for the user until it's explicitly updated or unsets. Updates to groups aren't retroactive.

- :material-numeric-2-circle:{ .lg .middle } **Group Identify**

    ---

    **Set and update group properties** via group identify calls. 

    Send group identify calls server-side to the [Group Identify API](/../analytics/apis/group-identify-api) or using an SDK. 

    Group properties persist for the group until they're explicitly updated or unset. Updates to group properties aren't retroactive. 

- :material-numeric-3-circle:{ .lg .middle } **Events**

    ---

    **Send events** server-side to the [HTTP V2 API](/../analytics/apis/http-v2-api) or [Batch API](/../analytics/apis/batch-event-upload-api), or using an SDK. 

    Users are associated with a group and group properties are assigned.

</div>

## Dynamic group properties

Amplitude's Dynamic Group Properties feature turns your existing KPIs into dynamically updating group properties. Using this feature, you can add group properties such as "Last 7 Day Active Users" or "Monthly Active Users" to each group.

See [Dynamic Group Properties](https://help.amplitude.com/hc/en-us/articles/115001765532-Accounts#dynamic-group-properties) in the Help Center for more details and full instructions for using this feature.

## Best practices

### Use a test project first

Historical data can't be retroactively updated so it's important that you test and validate your instrumentation before promoting to production. 

Validate your test instrumentation using the [Taxonomy & Data QA](https://docs.google.com/spreadsheets/d/1U4tXFWBzl1LETzjYR_DLBamwgpYt4kRSXyS9K4qdaU0/edit#gid=2101347389) tab in the Accounts Implementation Workbook.

### Group values

Group values must be unique and because of this are typically numeric. Amplitude recommends that you send a group property that's human-readable and clearly distinguishes the group from others so you can segment and group by this property in Amplitude.

!!!example "Group prop

    Consider this example where an "Account Name" group property is sent. You can use the "Account Name" property for a human-readable version of the group value.

    - Group Type: Company
    - Group Value: 123456789
    - Group Property:
        - Account Name = Amplitude

## Salesforce integration

If you use the [Salesforce integration](/../data/sources/salesforce-group/), you can set and update group properties using both the integration and the Group Identify API.

- You can use the Group Identify API to set group properties not available in Salesforce and also use the Salesforce integration to manipulate properties simultaneously.
- The group value in Amplitude is the key used to sync with Salesforce. The group value in Amplitude needs to exist in Salesforce to use the integration and pull in group properties.
- Amplitude runs a daily job (every morning UTC time) that updates all group properties whose pickup dates are the current date. When the Salesforce integration is activated, the first sync is executed the next day in the morning (UTC).
- You can update the sync interval to the number of days you'd like, such as: daily, weekly, monthly or a specific number of days. For example, if the last update was on September 1, 2017 and the interval is 7 days, then the next pickup date is September 8, 2017. 

## Segment integration

Segment can also accommodate structuring groups at the event level vs. user level and the instrumentation approaches varies depending on your customers approach.

### Amplitude Actions

!!!tip "See Segment's documentation for Amplitude (Actions)"

    This content comes from Segment's documentation, and is high-level. See the [Segment documentation](https://segment.com/docs/connections/destinations/catalog/actions-amplitude/#group-identify-user-1) for complete details on using Groups with Segment.

To use Amplitude’s groups with Segment, you must enable the following Action settings and make sure to include the data values they need to function. These settings act as a mapping from Segment group traits to Amplitude group types and values.

- **“Amplitude Group Type”**: This specifies what trait in your Group calls contains the Amplitude “group type”. In other words, it’s how you tell Segment which trait to use as the group type. 
- **“Amplitude Group Value”**: This specifies what trait in your Group calls contains the Amplitude “group value”. It’s how you tell Segment which trait to use as the group value.

For event level groups, update your Track, Screen, and Page Call mappings in your Amplitude Destination to include the “Groups” key-value pair, for example `group type - group value`). For user level groups, update your Identify Call mapping to include the “Groups” key-value pair. To send group properties, update the Group Identify User mapping. 

See the [Segment documentation](https://segment.com/docs/connections/destinations/catalog/actions-amplitude) for the Amplitude (Actions) Destination for full details.

### Amplitude Classic

!!!tip "See Segment's documentation for Amplitude (Classic)"

    This content comes from Segment's documentation, and is high-level. See the [Segment documentation](https://segment.com/docs/connections/destinations/catalog/amplitude/) for complete details on using Groups with Segment.

#### User level groups

To enable sending user level groups, customers using Segment must first configure [group calls](https://segment.com/docs/connections/spec/group/ "https://segment.com/docs/connections/spec/group/"). If you have configured group calls, you must enable the following destination settings in Segment. These settings act as a mapping from Segment group traits to Amplitude group types and values.

- **Amplitude Group Type Trait**: This specifies what trait in your Group calls contains the Amplitude "group type". In other words, it's how you tell Segment which trait to use as the group type.
- **Amplitude Group Value Trait**: This specifies what trait in your Group calls contains the Amplitude "group value". It's how you tell Segment which trait to use as the group value.

For example, if you specified `group_type` as the "Amplitude Group Type Trait", and `name` as the "Amplitude Group Value Trait", then the example group call is structured as follows:

```js
analytics.group("082108b9-f41d-486g-9d2d-b5ab68bb3d5o", {
  group_type: "Organization",
  name: "ExampleCorp, LLC",
  employees: "20",
  email: "hello@example.com"
});
```

In the example, group properties are created for `group_type`, `name`, `employees`, and `email`.

If you don't provide "Amplitude Group Type/Value Trait", or one of the traits wasn't provided in your call: 

- Segment associates the user with a group with the type "[Segment] Group", with the value "(Group Id)". 
- No properties are associated with that group.

#### Event level groups

You can also use Segment to set event-level groups. This means the group designation only applies for the specific event you are recording, and doesn't persist on the user. Groups get specified by providing an integration-specific `groups` property with key-value pairs corresponding to the `groupType`-`groupValue` pairs you want to appear in Amplitude.

```js
analytics.track("Clicked Benefits Dropdown", {
  dropdownColor: "blue";
},
{
  integrations: {
    Amplitude: {
      groups: {
        onboarding_cohort: "Summer 2022"
      }
    }
  }
});
```