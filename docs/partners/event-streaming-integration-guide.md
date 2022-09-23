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

- Event Forwarding:  Event forwarding is the concept of forwarding Amplitude Track calls to a destination. Amplitude will forward both the 'raw' event, and also merged or [transformed events](https://help.amplitude.com/hc/en-us/articles/5913315221915-Transformations-Retroactively-modify-your-event-data-structure). Amplitude also sends the user_id, event_name, and created_at to your destination.
- User Properties Types: Amplitude sends all user, event, and group properties along with the event.
- Event Selective Property Forwarding: We will also provide fine-grain filtering options that will allow the customer to choose which events to send based on selecting event types and/or property conditions.

### Limitations

- Regular User Identify Forwarding (i.e. creating and updating a user): Amplitude will forward the user identify events that are sent by customers directly to the configured destinations. Anytime you make an Identify call to Amplitude, we forward that user information. See  [Identify documentation](https://www.docs.developers.amplitude.com/analytics/apis/identify-api/)  for more information.
- Change-based user Identify Forwarding: When there's a user property change during the event ingestion, we will automatically generate a user identify event and forward it to the configured destinations. 
- Property Value Transformation: Transform a property value or type to another value or type (eg. Amplitude int user_id -> Destination string user_id , formatting such as encoding, datetime format transformations, etc.)
- oAuth Authentication: We don't support OAuth, so partners need to generate their API key
- Event Category name: We do not send the Event Category name.

## Preparation tips for Partners

1. Freemarker: Familiarize yourself with [Freemarker](https://freemarker.apache.org/)  is the template that we use to send Events out from Amplitude
2. Rate limits: Ensure your rate limits are as high as possible to minimize throttling. for example, We respect the rate limit that [Braze](https://www.docs.developers.amplitude.com/data/destinations/braze/) communicates: 50,000 requests per minute for Event Tracking. In addition, we have a retry mechanism w/ exponential backoff that will try 9 times over 4 hours. So any temporary throttling will be resolved through this process.
3. Event limits: Ensure that your event size limit is flexible enough for customer use cases. 
  - For example, [Customer.io](https://www.docs.developers.amplitude.com/data/destinations/customerio/) events have the following limits:

4. Maximum length of Customer ID: 150 bytes

5. Maximum number of Unique Identify attributes: 300

6. Maximum size of event data: 100K bytes

7. for example, [Intercom](https://www.docs.developers.amplitude.com/data/destinations/intercom/) has a limit of 120 Event Types and 20 meta (which are event properties) per Event Types. Currently our customers will have to leverage the Event Filter to select the specific events they want to forward from Amplitude to Intercom.

8. Authentication method: We don't support OAuth, so partners need to generate their API key

9. Ensure endpoint is flexible to ingest objects in a specific format: We will generate a list of objects in this specific format. You will need to make sure your endpoint handles this specific payload structure. See below for an example.

![](https://lh5.googleusercontent.com/t7xQ3KCCf7U9xPLLHBpJdIdGAajP8SOEhrjTZo79LhFmdfYkeTmCoiTu6zFUBxmlzCXXyDmM2xKqCZjjUxUyOllBEOjAmAMUGtIgugNDDsE7p68pc5J3vZ00I0skl0iMhBwupnC5LFzz20rBsfgHA5SG5_K0O3hXIY-LogJQz7oZOJxTvYrvtNQ_7g)

Example Payload structure

### What will it look like?

![](https://lh3.googleusercontent.com/2vSY_bOC2tUWZkiaLZ9mbsr_QOlaly0J0X1yD2-59yrL7r-QaEVwebPvS4Y-Tf_r84O95Mx8kPWNfgyq3byJw25XVFdQSlmK9rSfE0PBGCfACUJ89tulE5abrbfmnGW8iw_3fWyagAWHf1e-BJwYh3aS3zoGJXWkCNbU_2ZKdKxoAnVzxeRBilJS)

![](https://lh3.googleusercontent.com/S6BnZXYivKhM4u0jUuWGjNSf9mli8jr5PUHG0DK5uWNOYP-9eisbhJArIuheZGZoPD6nqp3rmNczIKaoWxo-MjxWVtzqX_DRh9MMJmaDwnBF71hpj6pBPEX5veiv5qsJdjFl0bOwnzFLZsTlFXw0v8csCxxfTnlfHiTLMTpY6Hzzsy0oVlKw92tC)

This is an example of what a built-out setup modal would look like in Amplitude once you've finalized your configuration. This would be part of the user's setup process when setting up your Event Streaming destination. Note this example shown is using our [Braze Event streaming destination](https://www.docs.developers.amplitude.com/data/destinations/braze/#considerations).