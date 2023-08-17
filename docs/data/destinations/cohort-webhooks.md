---
title: Cohort Webhooks
description: Use this integration to send Amplitude cohort updates to your custom webhooks.
---
!!!beta

    This feature is in closed beta and is in active development. Contact your Amplitude Success Manager for support with this integration.

Amplitude CDP’s cohort webhook allows customers to receive cohort updates to their own webhook endpoints. This allows for custom data enrichment, filtering, or aggregation based on the specific requirements of the webhook endpoint or internal systems. The transformed cohort data can then be seamlessly integrated into marketing automation platforms or other systems, enabling personalized and targeted marketing campaigns with up-to-date cohort insights.

## Considerations

- You must enable this integration in each Amplitude project you want to use it in.
- You will need a paid Amplitude plan to leverage Cohort Webhooks.

## Setup

### 1) Prerequisites

To configure streaming from Amplitude to your webhook, you need the following information.

- **Webhook URL** The destination URL Amplitude should use to send events and users.
- **Header Information** You can set up to five extra headers for the webhook request.

### 2) Create a new destination

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohorts section, click **Webhook**.

### 3) Enter webhook URL

Enter the URL endpoint for the webhook. For example, `https://mycompany.com/webhook`.
Note that Amplitude doesn't have a single IP address for forwarding events and users, so ensure that your URL can receive payloads from any Amplitude hosts.

### 4) Select headers

There are two preset headers for every webhook sync:

- `Content-Type`: `application/json`
- `User-Agent`: `Amplitude/Webhook/1.0`

After these preset headers, you can define five more headers. To create a new header:

1. Enter the header name on the left side text box
2. Enter the header value on the right side text box
3. A new header row appears if the limit isn't reached

### 5) Define cohort payload

1. Define the payload you want to receive in the webhook. You can choose to:
    1. Send the default Amplitude payload which follows the Amplitude cohort format. 
    2. Customize the payload using an [Apache FreeMarker](https://freemarker.apache.org/) template. See more details below.

### 6) Save destination
When satisfied with your configuration, click Save to complete the setup process.

## Establish Cohort syncs to your destination

1. In Amplitude, open the cohort you want to export.
2. Click Sync, and choose Webhook.
3. Select your defined webhook destination.
4. Select the sync cadence.
5. Click sync to initiate the sync. 

## FreeMarker Templating Language

!!!tip "More FreeMarker help"

    See the FreeMarker [guide to creating templates](https://freemarker.apache.org/docs/dgui.html) for more help.

### Example template for sending cohort updates

```text
{
    "cohort_name": "${input.cohort_name}",
    "cohort_id": "${input.cohort_id}",
    "in_cohort": ${input.in_cohort?c},
    "computed_time": "${input.computed_time}",
     "message_id": "${input.message_id}",
    "users": [
     <#list input.users as user>
     {
         "user_id": "${user.user_id}"
      }<#sep>,
     </#list>
]
}
```

Using this template results in sending this JSON payload to the Webhook endpoint:

```json
{
    "cohort_name": "My Test Cohort",
    "cohort_id": "7khm89cz",
    "in_cohort": true,
    "computed_time": "1692206763",
    "message_id": "9baaa88f-9d46-4ee5-a946-be0c6aea0046::enter::0",
    "users": [
      {
         "user_id": "user_one@example.com"
      },
      {
         "user_id": "user_two@example.com"
      },
      {
         "user_id": "user_three@example.com"
      }
    ]
}
```

### Example template for sending cohort updates per user
Some webhook destinations would need a list of users as a batch. For these cases, the template can be updated accordingly. In the below example, we can set the cohort name and cohort id as a single boolean property determining whether the user is in the cohort or not.

```text
[ < #list input.users.iterator() as user > {
	'user_id': '${user.user_id}',
	'amplitude_${input.cohort_name}_${input.cohort_id}': $ {
		input.in_cohort
	}
} < #if user_has_next > , < /#if></#list > ]
```

Using this template results in sending this JSON array payload to the Webhook endpoint:
```json
{
      {
         "user_id": "user_one@example.com",
         "amplitude_My Test Cohort_7khm89cz": true
      },
      {
         "user_id": "user_two@example.com"
         "amplitude_My Test Cohort_7khm89cz": true
      },
      {
         "user_id": "user_three@example.com"
         "amplitude_My Test Cohort_7khm89cz": true
      }
}
```

### Other useful information for templates
- FreeMarker replaces the `${ ... }` constructs with the actual value of the expression inside the curly braces.
- `input` is a reserved variable that refers to the event as an object. The "input" will have the exact format as the example payload we provided.
- `input` has the following below format:
  - `cohort_name` string. The display name of the cohort.
  - `cohort_id` string. The unique identifier of the cohort.
  - `in_cohort` boolean. Indicate whether this batch of users is entering/leaving the cohort
  - `compute_time` string. The time when this cohort update is computed
  - `message_id` string. The unique identifier of this update message. When a retry happens, it can be used to de-duplicate.
  - `users` list of JSON objects. The actual user payload.
    - `user_id:` string. The Amplitude user_id of the user. 

    

     
