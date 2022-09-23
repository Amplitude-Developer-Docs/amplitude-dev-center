---
title: Integration Portal
description: Use the Amplitude Integration Portal to self-service most aspects of integrating your product with Amplitude. 
status: new
template: guide-first.html
---

The Integration Portal enables partners and the Amplitude team to scale the number of data connections available to Amplitude customers. Use the Amplitude Integration Portal to self-service most aspects of integrating your product with Amplitude.

!!!beta

    This Integration Portal is in Closed Beta, and is still in active development. 

## Getting started 

This Integration Portal suits partners who want build these kinds of integrations:

1. [Event Ingestion](https://docs.google.com/document/d/1B5fx-Ck87pzxKdqWIiZvDboET-Kwwor-A-im0V_rCV8/edit#bookmark=id.36vif7agpt15) - Today, partners (such as yourself) send event data into Amplitude via the [HTTP API v2](https://www.docs.developers.amplitude.com/analytics/apis/http-v2-api/),  [Batch Event Upload API](https://www.docs.developers.amplitude.com/analytics/apis/batch-event-upload-api/), or [SDKs](https://www.docs.developers.amplitude.com/data/sources/). However, Amplitude aims to make it easier for partners to self-define and add all the contextual information for your own integration tile in the Amplitude App. Using the Integration Portal, you can:
      - Add a brief overview of your integration.
      - Add a display name for your integration tile in Amplitude.
      - Choose an integration category (for example, Messaging, Attribution, Ad Network).
      - Upload your company logo for your integration tile.
      - Verify that Amplitude successfully receives your data payload.
      - Update your integration version (for example, V1.1 or V1.2.1).
2. [Cohorts](https://docs.google.com/document/d/1B5fx-Ck87pzxKdqWIiZvDboET-Kwwor-A-im0V_rCV8/edit#bookmark=kix.9crabkxbid7l) - Build your own Amplitude Data Destination cohort tile to enable users to [sync cohorts](https://docs.google.com/document/d/1B5fx-Ck87pzxKdqWIiZvDboET-Kwwor-A-im0V_rCV8/edit#heading=h.nq2arr5g93ci) (audiences) from Amplitude to your platform through a series of REST API calls.
3. [Event Streaming](https://docs.google.com/document/d/1B5fx-Ck87pzxKdqWIiZvDboET-Kwwor-A-im0V_rCV8/edit#bookmark=id.id25je5n2n11) - Build your own Amplitude Data Destination Event Streaming tile to enable users to stream Amplitude event data straight to your platforms. Amplitude sends all user, event, and group properties along with the event. COMING SOON during week of Sep 26th 

### Prerequisites 

To get started, you need to do the following:

1. Apply through the [Technology Partner Portal](https://info.amplitude.com/technology-partners).
2. Sign both the mNDA + Partner agreement.
3. [Sign up](https://amplitude.com/get-started?utm_source=adwordsb&utm_medium=ppc&utm_campaign=Search_APAC_AU_EN_Brand&utm_content=Brand_Phrase&utm_term=amplitude&gclid=CjwKCAjwo_KXBhAaEiwA2RZ8hEl3xAKC7rR315frp2apgK-x2xNwp6iImFVAJ_ruLDcfUj3Uhp7xahoC6ogQAvD_BwE) or have an existing Amplitude plan.
4. Email integrations@amplitude.com with  [Org ID](https://help.amplitude.com/hc/en-us/articles/235649848-The-Settings-page) so Amplitude can enable the Integration Portal. This also enables the partner sandbox plan to give you access to all the same features as the Enterprise plan for testing purposes.

### High-level process to get listed in Amplitude

Here are the high-level steps to having your integration listed within the Amplitude app. 

1. **Go to the Integration Portal**: In Amplitude, navigate to the **My Settings** page and click **Developer Portal**. If you don't see this option, send an email to integrations@amplitude.com with your [Org ID](https://help.amplitude.com/hc/en-us/articles/235649848-The-Settings-page), and Amplitude will enable it for you.
2. **Configure your integration**: After you've submitted your integration, it notifies the Amplitude Engineering team to review your integration.
3. **Amplitude Engineering team reviews integration**: During the review process, the Amplitude team validates the integration which could take up to 1 week. During this process, Amplitude may reach out to you if the team has questions.
4. **Integration goes live in Amplitude**: After Amplitude approves the integration, it's automatically deployed and enabled for your organization. You'll then be able to see a tile within Amplitude app on the source or destination page depending on the integration type.
5. **Get listed on Partner Directory**: After you have filled out this [survey](https://docs.google.com/forms/d/e/1FAIpQLSc-fQrCQsV48V46QroyjEonKkn02PXmwhsVEKguES9M-la7CQ/viewform) and sent your logo to partnerships@amplitude.com (ideally on a transparent background), the Amplitude Partnerships team posts your listing and technical documentation on the Amplitude Partner Directory. You need at least 4 customers using your integration to get access to the Partner Directory.
6. **Get listed on Integrations Catalog**: Amplitude includes your logo on the [Integration Catalog](https://amplitude.com/integrations) page to improve discoverability and promote your Integration. Just make sure you complete this [survey](https://docs.google.com/forms/d/e/1FAIpQLSc-fQrCQsV48V46QroyjEonKkn02PXmwhsVEKguES9M-la7CQ/viewform).
7. **Co-Marketing Opportunities**: Click on this [Amplitude Technology Partner Overview doc](https://info.amplitude.com/rs/138-CDN-550/images/Amplitude_Tech_Partner_Overview.pdf) to learn more about the benefits and requirements associated with each partnership tier (Integration, Advanced & Premier). Each level provides benefits designed to help your company evolve towards digital optimization.

## Give feedback

If you'd like to share your experience and give feedback on the Integration Portal, fill out this [short survey](https://docs.google.com/forms/d/e/1FAIpQLScdj-pbOK5EbItwBNgF7KF9pBjeJZNzXNkqZ1ARJLm-Z3q1_Q/viewform?usp=sf_link). If you run into issues using the Integration Portal, you can email questions to <integrations@amplitude.com>.

## Release notes

<!-- vale off -->
### August 2022 

- Connection metadata for catalog display:
    - Partners can define the connection category, summary, and full description, which are displayed on [Amplitude Integrations Catalog page](https://amplitude.com/integrations)
    - Partners can keep these contents up to date through the Integration Portal without having to make a formal request to Amplitude or requiring Amplitude to make those changes on your behalf
- Error classification for each connection:
    - Developers can add error code and error messages for every endpoint so that the end-users can debug and get faster help
- Data Source creation

### June 2022 

- Improved JSON editor:
    - Payload editor is updated to a more developer-friendly JSON editor tool,it also includes auto suggestions for created variables by typing `$`
    - Better syntax highlighting and brackets matching for debugging
- New application selection dropdown:
    - Previously, the developer needs to know the app-id in order to pull the user properties list. With this new feature, developers can select any application in the dropdown to pull the user properties for testing purposes
- Improved testing functionalities:
    - Headers and payloads are displayed in a more readable way
    - Instead of copying & paste the curl command into CLI, now developer can click the Test Endpoint button to send a test API call to the predefined endpoint.
    - We also display the response/error for easy debugging.
- Added additional headers support:
    - This feature allows the developer to add new fields to the headers in every API call, further supporting customization in cohort sync API calls.
    - The additional header can use any variables that are created by the developer and predefined internally.
- Other smaller bug fixes:
    - Prevent unnecessary fields in the config
    - Prevent undefined fields from being stored

<!-- vale on-->