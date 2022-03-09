---
title: Receiving Cohorts from Amplitude
description: 
---

With Amplitude, users who take similar actions in a product can be grouped into Behavioral cohorts, such as those who downloaded a song in a music app or added an item to a cart. Behavioral cohorts can also be defined as customers that don’t take a specific action, such as those who downloaded an app but never took the next step of signing up for a subscription.

Amplitude can sync these Cohorts to other partner platforms through a series of REST API calls. Amplitude is able to create and update lists of cohort memberships (list-based) or set a user property or trait (property-based) in the Partner's platform.

## Authentication

The REST API uses basic authentication. The partner must send across the api_key as username and an empty password

```json
{
  "codes": [
    {
      "code": "curl -u api_key https://[ INSERT URL ]\nSetting traits/properties on user:\nJSON_HEADERS = {\n       'Content-Type': 'application/json',\n  }\nAuth: ($api_key, '')",
      "language": "shell"
    }
  ]
}
```

## Considerations

- Amplitude uses bulk API, and batches multiple users in a single API request. By default, batches have 1000 users but the batch size is configurable.
- Syncs can be scheduled to export as a one-time sync, or be scheduled to export hourly or daily.
- The first sync is a full sync of the entire cohort. Subsequent syncs include only the users who have moved in or out of the cohort's definition.
- During the cohort sync, Amplitude sends a separate request for each cohort a user belongs to.
- There aren't explicit rate limits. By default, Amplitude uses 4 threads to make requests to the downstream platform.
- There isn't a limit on the number of cohorts that can be created in Amplitude.
- If a request fails, Amplitude retries eight times exponentially backing off starting with a one-second delay and ramping up to over two minutes for the last retry.
- Amplitude can create configurations that allow us to send membership information in different formats to conform to different APIs. Please contact the Support team if you’d like to discuss support for a specific format.

## List-Based Cohort Integration

A list-based cohort integration works best if a cohort is represented as a list of user identifiers in the target system. A call to a list creation API is needed on the first sync, then subsequent calls to add API and remove API are made to keep the list membership up to date.

### List Creation

```json
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
```

### Adding Users to a List

```json
{
  "codes": [
    {
      "code": "POST https://your.domain/lists/$listId/add\n{\n    'userIds':[$userId, $userId, ...]\n    'context': {\n        'integration': {\n            'name': 'Amplitude Cohort Sync',\n            'version': '1.0.0'\n        }\n    }  \n}",
      "language": "http",
      "name": "Request"
    }
  ]
}
```

### Removing Users from a List

```json
{
  "codes": [
    {
      "code": "POST https://your.domain/lists/$listId/remove\n{\n    'userIds':[$userId, $userId, ...]\n    'context': {\n        'integration': {\n            'name': 'Amplitude Cohort Sync',\n            'version': '1.0.0'\n        }\n    }  \n}",
      "language": "http",
      "name": "Request"
    }
  ]
}
```

## Property-Based Cohort Integration

A property-based cohort integration works best with systems that represent cohort membership as a custom user property, such as a boolean flag or a tag. When cohort membership changes, Amplitude will invoke the updateAPI to update the user property accordingly. While no list creation API is needed, some manual setup may be required to create the custom user property.

### Single update

```json
{
  "codes": [
    {
      "code": "POST https://your.domain/lists/$listId/remove\n{\n\t'type': 'identify',\n\t'traits': {\n\t\t'[Amplitude] {$cohort_name}: {$cohort_id}': True / False\n\t},\n\t'userId': ‘$user_id’,\n\t'context': {\n\t\t'integration': {\n\t\t\t'name': 'Amplitude Cohort Sync',\n\t\t\t'version': '1.0.0'\n\t\t}\n\t}\n}",
      "language": "http",
      "name": "Request"
    }
  ]
}
```

### Batch update

```json
{
  "codes": [
    {
      "code": "POST https://your.domain/lists/$listId/remove\n{\n\t'batch': [{\n\t\t'type': 'identify',\n\t\t'traits': {\n\t\t\t'[Amplitude] {$cohort_name}: {$cohort_id}': True / False\n\t\t},\n\t\t'userId': ‘$user_id',\n\t\t'context': {\n\t\t\t'integration': {\n\t\t\t\t'name': 'Amplitude Cohort Sync',\n\t\t\t\t'version': '1.0.0'\n\t\t\t}\n\t\t}\n\t}, {\n\t\t'type': 'identify',\n\t\t'traits': {\n\t\t\t'[Amplitude] {$cohort_name : {$cohort_id}': True / False\n\t\t},\n\t\t'userId': ‘$user_id’,\n\t\t'context': {\n\t\t\t'integration': {\n\t\t\t\t'name': 'Amplitude Cohort Sync',\n\t\t\t\t'version': '1.0.0'\n\t\t\t}\n\t\t}\n\t}]\n}",
      "language": "http",
      "name": "Request"
    }
  ]
}
```

**Responses**:

- **200**: Success
- **400**: Invalid request
- **401**: Unauthorized (bad `api_key`)
- **404**: Invalid User ID
- **429**: Throttling/rate limiting

The property we pass over for cohort members will be set to true when a user becomes part of the cohort and it will be set to false when a user leaves the cohort.

## Testing

In order to test, we recommend creating a mock payload that you would expect to receive from Amplitude. For cohort integrations, the typical payload structure is as follows:

```json
{
  "codes": [
    {
      "code": "curl --location --request POST 'https://app.staging-01.TEST_COMPANY_NAME.com/api/v1/integration/amplitude/cohort \\\n--header 'api_key: TEST_API_KEY' \\\n--header 'app_id: TEST_APP_ID' \\\n--header 'Content-Type: application/json' \\\n--data-raw '\n{\n  \"traits\": {\n    \"cohort name:123\": true\n  },\n  \"type\": \"identify\",\n  \"userId\": \"test.user@email.com\"\n}\n'",
      "language": "shell"
    }
  ]
}
```
