---
title: Create an Event Streaming Integration
description: This guide walks through the basics of creating a event streaming integration with Amplitude. 
template: guide-last.html
status: new
---

--8<-- "includes/partners/partner-portal-prereq.md"

This guide walks through the basics of creating a event streaming integration with Amplitude.

## Overview

We're excited to announce an upcoming self-serve capability for our [Integration Portal](https://docs.google.com/document/d/1B5fx-Ck87pzxKdqWIiZvDboET-Kwwor-A-im0V_rCV8/edit#heading=h.g8n5uh1mjapp). Starting from September 26th, partners (like yourself) will be able to create your own Event Streaming tile in Amplitude to allow users to forward events in real-time from Amplitude.

Amplitude has just made [Event streaming destination connections widely available for all Amplitude customers on Aug 22](https://www.linkedin.com/posts/amplitude-analytics_good-news-destination-connections-are-activity-6967874913131003904-jxdN?utm_source=share&utm_medium=member_desktop). Amplitude customers (including customers on starter plans) can stream up to 10 million events a month for free. This is an excellent opportunity to get extra exposure and enable more customers to try out your integration to get more value.

## Considerations

### Supported features

- **Event Forwarding:**  Event forwarding is the concept of forwarding Amplitude Track calls to a destination. Amplitude forwards both the 'raw' event and merged or [transformed events](https://help.amplitude.com/hc/en-us/articles/5913315221915-Transformations-Retroactively-modify-your-event-data-structure). Amplitude also sends the `user_id`, `event_name`, and `created_at` to your destination.
- **User Properties Types:** Amplitude sends all user, event, and group properties along with the event.
- **Event Selective Property Forwarding:** Amplitude has fine-grain filtering options that allow you to choose which events to send based on selecting event types and property conditions.

### Limitations

- **User selective property forwarding:** Forwarding certain event, group, or user properties from an event based on an allow-list isn't supported at this time.
- **User identifiers:** The only currently supported user identifier is the Amplitude `user_id`.
- **Mapping fields:** You can't currently map fields.
- **Forwarding arrays or object type properties:** You can't currently arrays or object type properties. For example, you can't forward a property called cities which is an array of cities
- **Regular User Identify Forwarding (creating and updating a user):**  Currently, Identify calls aren't forwarded. See the [Identify documentation](../analytics/apis/identify-api) for more information.
- **Change-based user Identify Forwarding:** Currently, Amplitude won't automatically generate and forward an identify event when there's a user property change during the event ingestion.
- **Property Value Transformation:** You can't currently transform a property value or type to another value or type for example, Amplitude int `user_id` -> Destination string `user_id`, formatting such as encoding and datetime format transformations.
- **OAuth Authentication:** Amplitude doesn't support OAuth, so partners need to generate you API key.
- **Event Category name:** Amplitude doesn't send the Event Category name.

## Preparation tips for Partners

1. **Freemarker:** Familiarize yourself with [Freemarker](https://freemarker.apache.org/) is the template that Amplitude uses to send events.
2. **Rate limits:** Make sure your rate limits are as high as possible to minimize throttling. For example, Amplitude respects the rate limit that [Braze](https://www.docs.developers.amplitude.com/data/destinations/braze/) communicates: 50,000 requests per minute for event tracking. Amplitude has a retry mechanism w/ exponential backoff that tries 9 times over 4 hours. Temporary throttling should be resolved through this process.
3. **Event limits:** Make sure that your event size limit is flexible enough for customer use cases. 
    ???example "Event limits example (click to expand)"

        For example, [Customer.io](https://www.docs.developers.amplitude.com/data/destinations/customerio/) events have the following limits:
        - Maximum length of Customer ID: 150 bytes
        - Maximum number of Unique Identify attributes: 300
        - Maximum size of event data: 100K bytes
        
        For example, [Intercom](https://www.docs.developers.amplitude.com/data/destinations/intercom/) has a limit of 120 Event Types and 20 meta (which are event properties) per Event Types. Currently our customers will have to leverage the Event Filter to select the specific events they want to forward from Amplitude to Intercom.

4. **Authentication method:** Amplitude doesn't support OAuth, so partners need to generate their API key.
5. **Make sure the endpoint is flexible to ingest objects in a specific format:** We will generate a list of objects in this specific format. You will need to make sure your endpoint handles this specific payload structure. See below for an example.

### Example Payload structure

![](https://lh5.googleusercontent.com/t7xQ3KCCf7U9xPLLHBpJdIdGAajP8SOEhrjTZo79LhFmdfYkeTmCoiTu6zFUBxmlzCXXyDmM2xKqCZjjUxUyOllBEOjAmAMUGtIgugNDDsE7p68pc5J3vZ00I0skl0iMhBwupnC5LFzz20rBsfgHA5SG5_K0O3hXIY-LogJQz7oZOJxTvYrvtNQ_7g)

### What will it look like?

![](https://lh3.googleusercontent.com/2vSY_bOC2tUWZkiaLZ9mbsr_QOlaly0J0X1yD2-59yrL7r-QaEVwebPvS4Y-    Tf_r84O95Mx8kPWNfgyq3byJw25XVFdQSlmK9rSfE0PBGCfACUJ89tulE5abrbfmnGW8iw_3fWyagAWHf1e-BJwYh3aS3zoGJXWkCNbU_2ZKdKxoAnVzxeRBilJS)

![](https://lh3.googleusercontent.com/S6BnZXYivKhM4u0jUuWGjNSf9mli8jr5PUHG0DK5uWNOYP-9eisbhJArIuheZGZoPD6nqp3rmNczIKaoWxo-MjxWVtzqX_DRh9MMJmaDwnBF71hpj6pBPEX5veiv5qsJdjFl0bOwnzFLZsTlFXw0v8csCxxfTnlfHiTLMTpY6Hzzsy0oVlKw92tC)

This is an example of what a built-out setup modal would look like in Amplitude once you've finalized your configuration. This would be part of the user's setup process when setting up your Event Streaming destination. Note this example shown is using our [Braze Event streaming destination](https://www.docs.developers.amplitude.com/data/destinations/braze/#considerations).

## Integration setup

The first step is to configure the integration tile that appears on the Destinations page in Amplitude after your integration is validated. 

1. From the Integration Portal page (**Settings > Developer Portal**), click **Add New Destination**.
2. Choose Event Streaming under Select Destination Type.

## Configuration

The configuration page has two sections.  

- The **Configuration** section on the left is where you configure your payload and what you expect to receive from Amplitude.
- The **Preview Integration** section summarizes your configurations, including your setup modal screen for your integration, parameters, and payload.

## Select Connection Information

You must add connection information before you can configure the specifics of your integration.

1. In Amplitude, navigate to Settings > Developer Portal.
2. Click Add Connection Info.
3. Enter the connection info:

- Display Name: The display name of the integration. This is the name that appears in the Integration Catalog and on your integration tile.
- Category: Choose a category. The Integration Catalog uses the category in filters.
- Summary: A brief overview of your product.
- Full Description: Detailed description of your integration. Include some common use cases so users understand why they should use the integration.
- Integration Logo: Upload your integration logo in PNG format.

## Create Parameters

This section allows you to define the parameters that can be used in the URL, headers and event body below. See this Braze Integration for an example where they

- **Parameter Display Name:** This is fully customizable, so use something descriptive as this will be the display name in Amplitude. For example, REST API Endpoint & REST API Key.

## Customize Events Payload

- **URL Endpoint:** Depending on your endpoint, you can choose between the following methods PUT, POST or PATCH.
- **REST API Headers:** You can customize the type of API Headers to suit your use case. Examples include:
  - **Authorization:** Contains the authentication credentials for HTTP authentication.
  - **Content-Type:** Tells the client what media type (e.g., application/json, application/javascript, etc.) a response is sent in. This is an important header field that helps the client know how to process the response body correctly.
  - **WWW-Authenticate:** The server may send this as an initial response if it needs some form of authentication before responding with the actual resource being requested. Often following this header is the response code 401, which means “unauthorized”.
  - **Accept-Charset:** This header is set with the request and tells the server which character sets (e.g., UTF-8, ISO-8859-1, Windows-1251, etc.) are acceptable by the client.
  - **Cache-Control:** The cache policy defined by the server for this response, a cached response can be stored by the client and re-used till the time defined by the Cache-Control header.

- **Header Display Name & Header Value:** This is fully customizable, so use something descriptive. This is fully customizable, so use something descriptive as it will help us to understand what each Header is for. E.g. API Key. This does not contribute anything towards the payload below.

## Event Body Editor

This section is a Freemarker template that allows you to construct the payload that will be sent to your destination. 

- **Input:** This object includes the event being forwarded and its fields, and is also enriched with the user’s other events and user properties.
  - Recommendation: the input fields are not guaranteed and heavily relied on the way each customer instrument their events. We suggest keeping the input fields usage to minimum and just use the most common ones such as: user_id, event_type, event_time.

- **MappedProperties:** A key-value pair of event/user properties that the customer might want to forward to your destination. For example, they may be tracking a property `email: example@example.com` and may want to forward that to your platform. These properties will only be forwarded if the user selects them in the UI under “Specify event properties to send”

## Preview & Test

1) Before submitting your configuration for review, test the mock payload that you expect to receive from Amplitude. On the right side of the configuration page, follow these steps to preview and test your configuration. 

- Configure the test integration instance:
  1. **API Endpoint:** https://localhost:3000
  2. **REST API Key:** Enter the API key from the Amplitude project.

- **Note:** If you would like to disable “Specify event properties to be sent (optional)”, please send an email to integrations@amplitude.com and we can disable it for you as this is controlled by a feature flag.

2) Copy the CURL command and paste it into your Command Line Interface (CLI).

3) If you see any errors, please check the parameters table to make sure all declared parameters are used.

- **DECLARED:** All declared parameters in the “Create Parameters” section.
- **USED:** All parameters that are used either in the url, headers and event body below.

## Submit

After you have finalized your testing, click Submit to submit your integration to the Amplitude team. The review process should take about one week. When Amplitude approves you integration, you'll get notified via email and be able to see your integration tile in the Destination section of Amplitude.
