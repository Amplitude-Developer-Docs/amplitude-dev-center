---
title: Receiving Behavioral Cohorts
description: Amplitude can sync behavioral cohorts to other partner platforms through a series of REST API calls. 
---

Amplitude lets you group users who take similar actions into behavioral cohorts, such as those who downloaded a song in a music app or added an item to a cart. You can also define behavioral cohorts as customers that don’t take a specific action, like those who downloaded an app, but never finished signing up for a subscription.

Amplitude can sync these cohorts to other partner platforms through a series of REST API calls. Amplitude is able to create and update lists of cohort memberships (list-based) or set a user property or trait (property-based) in the Partner's platform.

## Authentication

The REST API uses basic authentication. The partner must send across the `api_key` as username and an empty password

```bash
curl -u api_key https://[ INSERT URL ]
Setting traits/properties on user:
JSON_HEADERS = {
       'Content-Type': 'application/json',
  }
Auth: ($api_key, '')
```

## Considerations

- Amplitude uses bulk API, and batches multiple users in a single API request. By default, batches have 1000 users but the batch size is configurable.
- You can schedule syncs to export as a one-time sync, or to export hourly or daily.
- The first sync is a full sync of the entire cohort. Subsequent syncs include only the users who have moved in or out of the cohort's definition.
- During the cohort sync, Amplitude sends a separate request for each cohort a user belongs to.
- There aren't explicit rate limits. By default, Amplitude uses 4 threads to make requests to the downstream platform.
- There's no limit to the number of cohorts you can create in Amplitude.
- If a request fails, Amplitude retries eight times exponentially backing off starting with a one-second delay and ramping up to over two minutes for the last retry.

## List-based cohort integration

A list-based cohort integration works best if a cohort is represented as a list of user identifiers in the target system. You must call a list creation API on the first sync. Make subsequent calls to the add API and remove API to keep the list membership up to date.

### List creation

```bash
POST https://your.domain/lists
{
    'name': [Amplitude] {$cohort_name}: {$cohort_id},
    'context': {
        'integration': {
            'name': 'Amplitude Cohort Sync',
            'version': '1.0.0'
        }
    }
}
```

### Add users to a list

```bash
POST https://your.domain/lists/$listId/add
{
    'userIds':[$userId, $userId, ...]
    'context': {
        'integration': {
            'name': 'Amplitude Cohort Sync',
            'version': '1.0.0'
        }
    }  
}
```

### Remove users from a list

```bash
POST https://your.domain/lists/$listId/remove
{
    'userIds':[$userId, $userId, ...]
    'context': {
        'integration': {
            'name': 'Amplitude Cohort Sync',
            'version': '1.0.0'
        }
    }  
}
```

## Property-based cohort integration

A property-based cohort integration works best with systems that represent cohort membership as a custom user property, such as a boolean flag or a tag. When cohort membership changes, Amplitude invokes the `updateAPI` to update the user property. Although you don't need list creation API here, some manual setup may be required to create the custom user property.

### Single update

```bash
POST https://your.domain/lists/$listId/remove
{
    'type': 'identify',
    'traits': {
        '[Amplitude] {$cohort_name}: {$cohort_id}': True / False
    },
    'userId': ‘$user_id’,
    'context': {
        'integration': {
            'name': 'Amplitude Cohort Sync',
            'version': '1.0.0'
        }
    }
}
```

### Batch update

```bash
POST https://your.domain/lists/$listId/remove
{
    'batch': [{
        'type': 'identify',
        'traits': {
            '[Amplitude] {$cohort_name}: {$cohort_id}': True / False
        },
        'userId': ‘$user_id',
        'context': {
            'integration': {
                'name': 'Amplitude Cohort Sync',
                'version': '1.0.0'
            }
        }
    }, {
        'type': 'identify',
        'traits': {
            '[Amplitude] {$cohort_name : {$cohort_id}': True / False
        },
        'userId': ‘$user_id’,
        'context': {
            'integration': {
                'name': 'Amplitude Cohort Sync',
                'version': '1.0.0'
            }
        }
    }]
}
```

**Responses**:

- **200**: Success
- **400**: Invalid request
- **401**: Unauthorized (bad `api_key`)
- **404**: Invalid User ID
- **429**: Throttling/rate limiting

The property Amplitude passes over for cohort members is set to `true` when a user becomes part of the cohort and it's set to `false` when a user leaves the cohort.

## Testing

To test, Amplitude recommends creating a mock payload that you would expect to receive from Amplitude. For cohort integrations, the typical payload structure is as follows:

```bash
curl --location --request POST 'https://app.staging-01.TEST_COMPANY_NAME.com/api/v1/integration/amplitude/cohort \
--header 'api_key: TEST_API_KEY' \
--header 'app_id: TEST_APP_ID' \
--header 'Content-Type: application/json' \
--data-raw '
{
  "traits": {
    "cohort name:123": true
  },
  "type": "identify",
  "userId": "test.user@email.com"
}
'
```
