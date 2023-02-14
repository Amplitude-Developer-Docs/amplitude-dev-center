---
title: Google Tag Manager Template Quickstart Guide
description: Official Google Tag Manager template for Amplitude Analytics for data collection.
---

Use the official Amplitude Analytics Google Tag Manager templates to collect data. Choose a template to visit the documentation and tutorial video.  

|Template|Type|Description|
|---|---|-----------|
|[Amplitude Analytics Browser SDK](./google-tag-manager-client.md)|Client-side|The tag uses the Amplitude Marketing Analytics SDK for data collection.|
|[Amplitude Analytics](./google-tag-manager-server.md)|Server-side|The tag uses the Amplitude HTTP V2 API for data collection. |
|[Amplitude Analytics Legacy](./google-tag-manager-client-legacy.md)|Client-side|The tag uses the Amplitude JavaScript SDK for data collection. |

Amplitude's GTM templates offer a convenient way for developers to set up event tracking in their applications. These pre-configured templates provide a streamlined solution for deploying tracking tags, reducing the time and effort required to set up event tracking. Learn more about [Google Tag Manager Templates](https://developers.google.com/tag-platform/tag-manager/templates).

## Client-side vs server-side

Google Tag Manager (GTM) offers both client-side and server-side templates for tag deployment. GTM client side templates and GTM server side templates differ in the way they execute the tracking plan.

Client-side templates run the tracking plan directly on the user's device and use JavaScript code to manage tags. They serve tags that need to interact with the client environment, such as tracking user actions on a website. However, the client browser capabilities restrict these templates and may not be appropriate for tags that require access to server-side data. 

GTM server-side templates run on the server, not on the client's browser. They control tags with server-side code and serve tags that require access to server-side data, such as monitoring server-side events. These templates offer a higher level of control over tag deployment and can handle complex tag implementations

Use GTM client-side templates to track user interactions on a website. Use server-side templates if you want to track sensitive customer information or complex tags that require server-side processing.

## Getting started

### Install the template

1. [Set up and install Google Tag Manager](https://support.google.com/tagmanager/answer/6103696) if you haven't done so. 
2. Browse to the target container. 
3. Click the **Templates** tab on the left.
4. In the **Tag Templates** section, click **Search Gallery**.
5. In the search bar, type "Amplitude" and select the Amplitude GTM Template from the list of results.
6. Click the "Add to Workspace" button to add the template.

### Create a tag

After installing the template, you can then use that template to create a tag. 

1. In Google Tag Manager Workspace, click the **Tags** tab on the left, then click **New**.
2. Click "Tag Configuration" to select the Amplitude GTM Template from the list of available templates. If you haven't installed any Amplitude GTM Template, [install the template](./google-tag-manager/#install-the-template) first.
3. In the Configuration section, enter your [Amplitude API Key](../../analytics/find-api-credentials.md).
4. In the Triggers section, select the triggers that you want to use to fire the Amplitude tag. For example, you may want to fire the tag when a user visits a specific page on your website.
5. Save your tag and publish your GTM container.

### Check for success

Verify that the Amplitude tag is firing correctly by checking the Debug mode in GTM and [debugging Analytics](../../debugger). 

To learn more about each template and access the corresponding tutorial video, click on the template name in the chart located at the top of the article.