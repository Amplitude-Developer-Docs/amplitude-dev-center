---
title: Google Tag Manager Template Quickstart Guide
description: Official Google Tag Manager template for Amplitude Analytics for data collection.
---

Use the official Amplitude Analytics Google Tag Manager templates to collect data. Choose a template to visit the documentation and tutorial video.  

|Template|Type|Description|
|---|---|-----------|
|[Amplitude Analytics Browser SDK](../google-tag-manager-client.md)|Client-side|The tag uses the Amplitude Marketing Analytics SDK for data collection.|
|[Amplitude Analytics](../google-tag-manager-server.md)|Server-side|The tag uses the Amplitude HTTP V2 API for data collection. |
|[Amplitude Analytics Legacy](../google-tag-manager-client-legacy.md)|Client-side|The tag uses the Amplitude JavaScript SDK for data collection. |

Amplitude's GTM templates offer a convenient way for developers to set up event tracking in their applications. These pre-configured templates provide a streamlined solution for deploying tracking tags, reducing the time and effort required to set up event tracking. Learn more about [Google Tag Manager Templates](https://developers.google.com/tag-platform/tag-manager/templates).

## How Amplitude GTM templates fit into your workflow

### Web Container

![How Amplitude GTM templates fit into your workflow - Web](/assets/images/marketing-analytics/google-tag-manager-workflow.drawio.svg)

The data layer is an object used by Google Tag Manager and Google tag (gtag.js) to pass information to tags. Events or variables can be passed via the data layer, and triggers can be set up based on the values of variables. 

Amplitude GTM templates are custom templates which define tags and variables so that you can reuse them alongside the built-in tags and variables. 

Google tags are snippets of code that measure user activity such as time on page, clicks, and purchases.

Learn more about the [client-side container](/data/sources/google-tag-manager-client).

### Server Container

![How Amplitude GTM templates fit into your workflow - Server](/assets/images/marketing-analytics/google-tag-manager-workflow-server.drawio.svg)

Client-side container communicates with the server-side container through HTTP requests with the standardized **Event Data** format.

The client container might be also required because it needs to parse an incoming HTTP request and generate an event data object for tags to utilize.

Learn more about the [service-side container](/data/sources/google-tag-manager-server).

## Client-side vs server-side

Google Tag Manager (GTM) offers both client-side and server-side templates for tag deployment. GTM client side templates and GTM server side templates differ in the way they execute the tracking plan.

Client-side templates run the tracking plan directly on the user's device and use JavaScript code to manage tags. They serve tags that need to interact with the client environment, such as tracking user actions on a website. However, the client browser capabilities restrict these templates and may not be appropriate for tags that require access to server-side data. 

Server-side templates operate on the server rather than the client's browser, whether that be Google Cloud or any Self-Hosted Server. It's important to understand that server-side templates aren't designed to replace GTM client-side tags, but rather to augment and enhance their performance. If your focus is on improving client-side loading speed, bolstering security, or addressing privacy concerns, then using GTM server-side templates can be a viable option. [More details](https://developers.google.com/tag-platform/learn/sst-fundamentals/2-what-is-sst).

Use GTM client-side templates to track user interactions on a website. Use server-side templates if you want to track sensitive customer information or complex tags that require server-side processing.

## Getting started

### Install the template

1. Go to [Tag Manager](https://tagmanager.google.com/) and select your container or [set up a new one](https://support.google.com/tagmanager/answer/6103696).
2. Open the **Templates** tab and click **Search Gallery** in the **Tag Templates** section.
3. Type "Amplitude" in the search bar and select the Amplitude GTM Template.
4. Add the template to your workspace by clicking "Add to Workspace".

### Create a tag

After installing the template, you can then use that template to create a tag.

!!!note EU data residency
    Consult the corresponding template document for more information and EU configuration.

1. Go to the **Tags** tab in your Google Tag Manager Workspace and click **New**.
2. Select the Amplitude GTM Template from the list of available templates under **Tag Configuration**. If you haven't installed an Amplitude GTM Template, [install the template](./#install-the-template) first.
3. Enter your [Amplitude API Key](../../../analytics/find-api-credentials/) in the **Tag Configuration** section.
4. Choose a trigger that you want to use to fire the tag in the **Triggering** section.
5. Save your tag and publish your GTM container.

### Check for success

Verify that the Amplitude tag is firing correctly by checking the Debug mode in GTM and [debugging Analytics](../../debugger). 

To learn more about each template and see a tutorial video, click the template name in the table at the beginning of this page.
