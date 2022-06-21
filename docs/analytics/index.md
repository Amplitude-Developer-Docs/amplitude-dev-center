---
title: Amplitude Analytics Overview
description: Amplitude Analytics is the leading product analytics tool. It helps you gather and democratize data about how users engage with your apps.
hide:
  - tags
  - feedback
---

Amplitude Analytics is the leading product analytics tool. It helps you gather and democratize data about how users engage with your apps.

<div class="grid cards" markdown>

-   :material-book-open-variant:{ .lg .middle } __Getting started__

    ---

    Learn the basics of Amplitude Analytics.

    [:octicons-arrow-right-24: Understand the basics](what-is-amplitude)

-   :material-code-braces:{ .lg .middle } __Instrument analytics__

    ---

    Send data to Amplitude.

    [:octicons-arrow-right-24: See the SDKs](/data/sources#sdks)

-   :material-file-code-outline:{ .lg .middle } __Analytics APIs__

    ---

    Explore the APIs for Amplitude Analytics.

    [:octicons-arrow-right-24: See the APIs](#api-references)

-   :material-help:{ .lg .middle } __Get more resources__

    ---

    Explore more resources for Amplitude Analytics.

    [:octicons-arrow-right-24: Resources](#more-resources)

</div>

<!-- Need content for this section

## Getting started

Guide to getting started with Amplitude Analytics.

1. [Plan your implementation]()
2. [Define your tracking plan]()
3. [Instrument analytics](/data/sources#sdks)
4. [Validate your data]()

-->

<!-- - Data Model: "https://foo"
- Creating a Tracking Plan: "https://foo"
- Instrumenting Analytics: "https://foo"
- Testing & Debugging: "https://foo"
- Sending Data to Destinations: "https://foo" -->

## API References

Amplitude Analytics has several APIs that let you easily extend Amplitude.
!!!tip

    See the Amplitude Analytics Postman Collection for example requests and responses.

    [![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/20044411-a8a06899-34c5-4d6d-908f-9f70ba5bbdf9?action=collection%2Ffork&collection-url=entityId%3D20044411-a8a06899-34c5-4d6d-908f-9f70ba5bbdf9%26entityType%3Dcollection%26workspaceId%3D2ffc735a-10a6-4f54-818e-16c87aeebcd7#?env%5BAmplitude%20API%20Environment%5D=W3sia2V5IjoiYXBpX2tleSIsInZhbHVlIjoiSU5TRVJUIEFQSSBLRVkiLCJ0eXBlIjoic2VjcmV0IiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJzZWNyZXRfa2V5IiwidmFsdWUiOiJJTlNFUlQgU0VDUkVUIEtFWSIsInR5cGUiOiJzZWNyZXQiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6IlNDSU1fdG9rZW4iLCJ2YWx1ZSI6IklOU0VSVCBTQ0lNIFRPS0VOIiwidHlwZSI6InNlY3JldCIsImVuYWJsZWQiOnRydWV9LHsia2V5Ijoib3JnX2FwaV9rZXkiLCJ2YWx1ZSI6IklOU0VSVCBPUkcgQVBJIEtFWSIsInR5cGUiOiJzZWNyZXQiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6Im9yZ19zZWNyZXRfa2V5IiwidmFsdWUiOiJJTlNFUlQgT1JHIFNFQ1JFVCBLRVkiLCJ0eXBlIjoic2VjcmV0IiwiZW5hYmxlZCI6dHJ1ZX1d)

|API|This API lets you:|
|---|-----------|
|[Attribution](apis/attribution-api.md)| Send attribution campaign events (identified by `idfa`, `idfv`, or `adid`) that contain attribution information. |
|[Batch Event Upload](apis/batch-event-upload-api.md)| Upload large amounts of event data.|
|[Behavioral Cohorts](apis/behavioral-cohorts-api.md)|List all your cohorts in Amplitude, export a cohort in Amplitude, or upload a cohort.|
|[CCPA DSAR](apis/ccpa-dsar-api.md)| The Data Subject Access Request (DSAR) API makes it easy to retrieve all data about a user. |
|[Chart Annotations](apis/chart-annotations-api.md)|Programmatically annotate important dates like feature releases and marketing campaigns on your organization's charts with a horizontal axis of calendar dates. |
|[Dashboard REST](apis/dashboard-rest-api.md)| Get data that's displayed on the dashboard graphs in JSON format via the Dashboard REST API.|
|[Export](apis/export-api.md)|Export your project's event data. |
|[Group Identify](apis/group-identify-api.md)|Set or update properties of particular groups.|
|[HTTP V2](apis/http-v2-api.md)|Send data directly from your server to the HTTP V2 endpoint.|
|[Identify](apis/identify-api.md)|Set the User ID for a particular Device ID or update user properties of a particular user without sending an event.|
|[Lookup Tables](apis/lookup-tables-api.md)|Augment your properties with static data.|
|[Releases](apis/releases-api.md)|Programmatically create releases in Amplitude using the Releases API. |
|[SCIM](apis/scim-api.md)|Provision and manage users and groups. This API uses the System for Cross-domain Identity Management (SCIM) 2.0 Standard.|
|[Taxonomy](apis/taxonomy-api.md)|Create, get, update, and delete categories, event types, event properties, and user properties.|
|[User Privacy](apis/user-privacy-api.md)|Programmatically submit requests to delete all data for a set of known Amplitude IDs or User IDs.|
|[User Profile](apis/user-profile-api.md)|Fetch a user profile, which include user properties, computed properties, a list of cohort IDs, and recommendations.|

## More resources

- *Help Center*: [Amplitude Analytics](https://help.amplitude.com/hc/en-us/categories/360006505092-Amplitude-Analytics)
- *API Examples*: [Postman Collection](https://www.postman.com/amplitude-developer-docs/workspace/amplitude-developers/collection/20044411-a8a06899-34c5-4d6d-908f-9f70ba5bbdf9)
