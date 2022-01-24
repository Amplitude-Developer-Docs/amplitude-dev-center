---
title: "Receiving Cohorts from Amplitude"
slug: "receiving-cohorts-from-amplitude"
hidden: false
createdAt: "2021-09-14T05:26:23.777Z"
updatedAt: "2021-11-16T16:58:05.880Z"
tags:
  - analytics
  - integration
  - cohorts
---
# Overview

With Amplitude, users who take similar actions in a product can be grouped into **Behavioral Cohorts**, such as those who downloaded a song in a music app or added an item to a cart. Behavioral Cohorts can also be defined as customers that don’t take a specific action, such as those who downloaded an app but never took the next step of signing up for a subscription.

Amplitude can sync these Cohorts to other partner platforms through a series of REST API calls. Amplitude is able to create/update lists of cohort memberships (i.e. List-based) or set a user property/trait (i.e. Property-based) in the Partner's platform. Currently, our Cohort endpoint supports authentication via an API Key. Syncs can be scheduled to export as a one-time sync, or be scheduled to export hourly or daily. That said, the first sync will be a full sync of the entire cohort, with each subsequent sync being just the delta of users who have moved in or out of the cohort's definition.

## Authentication

The REST API uses basic authentication. The partner must send across the api_key as username and an empty password
[block:code]
{
  "codes": [
    {
      "code": "curl -u api_key https://[ INSERT URL ]\nSetting traits/properties on user:\nJSON_HEADERS = {\n       'Content-Type': 'application/json',\n  }\nAuth: ($api_key, '')",
      "language": "shell"
    }
  ]
}
[/block]
## List-Based Cohort Integration
A list-based cohort integration works best if a cohort is represented as a list of user identifiers in the target system. A call to a list creation API is needed on the first sync, then subsequent calls to add API and remove API are made to keep the list membership up to date.

### List Creation
[block:code]
{
  "codes": [
    {
      "code": "POST https://your.domain/lists\n{\n    'name': [Amplitude] {$cohort_name}: {$cohort_id},\n    'context': {\n        'integration': {\n            'name': 'Amplitude Cohort Sync',\n            'version': '1.0.0'\n        }\n    }\n}",
      "language": "http",
      "name": "Request"
    },
    {
      "code": "{\n    'listId' : 123\n}",
      "language": "json",
      "name": "Response"
    }
  ]
}
[/block]
### Adding Users to a List
[block:code]
{
  "codes": [
    {
      "code": "POST https://your.domain/lists/$listId/add\n{\n    'userIds':[$userId, $userId, ...]\n    'context': {\n        'integration': {\n            'name': 'Amplitude Cohort Sync',\n            'version': '1.0.0'\n        }\n    }  \n}",
      "language": "http",
      "name": "Request"
    }
  ]
}
[/block]
### Removing Users from a List
[block:code]
{
  "codes": [
    {
      "code": "POST https://your.domain/lists/$listId/remove\n{\n    'userIds':[$userId, $userId, ...]\n    'context': {\n        'integration': {\n            'name': 'Amplitude Cohort Sync',\n            'version': '1.0.0'\n        }\n    }  \n}",
      "language": "http",
      "name": "Request"
    }
  ]
}
[/block]
## Property-Based Cohort Integration
A property-based cohort integration works best with systems that represent cohort membership as a custom user property, such as a boolean flag or a tag. When cohort membership changes, Amplitude will invoke the updateAPI to update the user property accordingly. While no list creation API is needed, some manual setup may be required to create the custom user property.

### Single update
[block:code]
{
  "codes": [
    {
      "code": "POST https://your.domain/lists/$listId/remove\n{\n\t'type': 'identify',\n\t'traits': {\n\t\t'[Amplitude] {$cohort_name}: {$cohort_id}': True / False\n\t},\n\t'userId': ‘$user_id’,\n\t'context': {\n\t\t'integration': {\n\t\t\t'name': 'Amplitude Cohort Sync',\n\t\t\t'version': '1.0.0'\n\t\t}\n\t}\n}",
      "language": "http",
      "name": "Request"
    }
  ]
}
[/block]
### Batch update
[block:code]
{
  "codes": [
    {
      "code": "POST https://your.domain/lists/$listId/remove\n{\n\t'batch': [{\n\t\t'type': 'identify',\n\t\t'traits': {\n\t\t\t'[Amplitude] {$cohort_name}: {$cohort_id}': True / False\n\t\t},\n\t\t'userId': ‘$user_id',\n\t\t'context': {\n\t\t\t'integration': {\n\t\t\t\t'name': 'Amplitude Cohort Sync',\n\t\t\t\t'version': '1.0.0'\n\t\t\t}\n\t\t}\n\t}, {\n\t\t'type': 'identify',\n\t\t'traits': {\n\t\t\t'[Amplitude] {$cohort_name : {$cohort_id}': True / False\n\t\t},\n\t\t'userId': ‘$user_id’,\n\t\t'context': {\n\t\t\t'integration': {\n\t\t\t\t'name': 'Amplitude Cohort Sync',\n\t\t\t\t'version': '1.0.0'\n\t\t\t}\n\t\t}\n\t}]\n}",
      "language": "http",
      "name": "Request"
    }
  ]
}
[/block]
**Responses**:
  * **200**: Success
  * **400**: Invalid request
  * **401**: Unauthorized (bad api_key)
  * **404**: Invalid User ID
  * **429**: Throttling/rate limiting

The property we pass over for cohort members will be set to true when a user becomes part of the cohort and it will be set to false when a user leaves the cohort.

## Testing
In order to test, we recommend creating a mock payload that you would expect to receive from Amplitude. For cohort integrations, the typical payload structure is as follows: 
[block:code]
{
  "codes": [
    {
      "code": "curl --location --request POST 'https://app.staging-01.TEST_COMPANY_NAME.com/api/v1/integration/amplitude/cohort \\\n--header 'api_key: TEST_API_KEY' \\\n--header 'app_id: TEST_APP_ID' \\\n--header 'Content-Type: application/json' \\\n--data-raw '\n{\n  \"traits\": {\n    \"cohort name:123\": true\n  },\n  \"type\": \"identify\",\n  \"userId\": \"test.user@email.com\"\n}\n'",
      "language": "shell"
    }
  ]
}
[/block]
## FAQ
[block:parameters]
{
  "data": {
    "h-0": "Question",
    "h-1": "Answer",
    "0-0": "During the cohort sync, do you batch the users in a single API request or do you make one API call per user?",
    "0-1": "We have a bulk API where we can process multiple users in a single API request. By default, batches will have 1000 users but the batch size is configurable.",
    "1-0": "During the cohort sync do you send all of the cohorts a user belongs to together or is there a separate request for each user and each cohort?",
    "1-1": "We handle sending separate requests for each cohort.",
    "2-0": "During the initial full sync do you only send over users who are present in the cohort?",
    "2-1": "We only send over users that are present in the cohort. During subsequent updates to the cohort, we will send updates that include users that are no longer in the cohort.",
    "3-0": "(API Limits) Do you have any limits on the rate at which you make API requests to the downstream platform?",
    "3-1": "We don’t have explicit rate limits. By default, we use 4 threads to make requests to the downstream platform.",
    "4-0": "(Cohort Limits) Is there a limit on the number of cohorts that can be created in Amplitude?",
    "4-1": "No",
    "5-0": "Do you retry in the event of API failures?",
    "5-1": "We retry eight times exponentially backing off starting with a one-second delay and ramping up to over two minutes for the last retry.",
    "6-0": "Does the API need to receive membership updates in the exact format shared in this document?",
    "6-1": "We are able to create configurations that allow us to send membership information in different formats to conform to different APIs. Please let us know if you’d like to discuss whether we’re able to support a specific format."
  },
  "cols": 2,
  "rows": 7
}
[/block]