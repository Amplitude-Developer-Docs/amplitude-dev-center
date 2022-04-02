---
title: Send Amplitude Behavioral Cohorts to Other Platforms
description: Amplitude can sync behavioral cohorts to other partner platforms through a series of REST API calls. 
---

With Amplitude, users who take similar actions in a product can be grouped into Behavioral cohorts, such as those who downloaded a song in a music app or added an item to a cart.
 Behavioral cohorts can also be defined as customers that don’t take a specific action, such as those who downloaded an app but never took the next step of signing up for a subscription.

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
- Syncs can be scheduled to export as a one-time sync, or be scheduled to export hourly or daily.
- The first sync is a full sync of the entire cohort. Subsequent syncs include only the users who have moved in or out of the cohort's definition.
- During the cohort sync, Amplitude sends a separate request for each cohort a user belongs to.
- There aren't explicit rate limits. By default, Amplitude uses 4 threads to make requests to the downstream platform.
- There isn't a limit on the number of cohorts that can be created in Amplitude.
- If a request fails, Amplitude retries eight times exponentially backing off starting with a one-second delay and ramping up to over two minutes for the last retry.

## List-Based Cohort Integration

A list-based cohort integration works best if a cohort is represented as a list of user identifiers in the target system. A call to a list creation API is needed on the first sync, then subsequent calls to add API and remove API are made to keep the list membership up to date.

### List Creation

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

### Adding Users to a List

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

### Removing Users from a List

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

## Property-Based Cohort Integration

A property-based cohort integration works best with systems that represent cohort membership as a custom user property, such as a boolean flag or a tag. When cohort membership changes,
 Amplitude will invoke the `updateAPI` to update the user property accordingly. While no list creation API is needed, some manual setup may be required to create the custom user property.

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

The property we pass over for cohort members is set to `true` when a user becomes part of the cohort and it is set to `false` when a user leaves the cohort.

## Testing

In order to test, we recommend creating a mock payload that you would expect to receive from Amplitude. For cohort integrations, the typical payload structure is as follows:

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
