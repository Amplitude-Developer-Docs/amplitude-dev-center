---
title: User Profile API
description: The User Profile API serves Amplitude User Profiles, which includes user properties, computed user properties, a list of cohort IDs of cohorts that the user is in, and recommendations.
---

The User Profile API serves Amplitude user profiles, which include user properties, computed user properties, a list of cohort IDs of cohorts that the user is in, and recommendations.

!!!note "Some features require Amplitude Recommend"

    To get cohort IDs or Recommendation IDs, you must have a plan with Recommend. 

--8<-- "includes/postman.md"

--8<-- "includes/auth-secret-key.md"

## Endpoints

| Region | Endpoint |
| --- | --- |
| Standard Server | <https://profile-api.amplitude.com/v1/userprofile> |

## Considerations

### Default experiences

- If you don't serve your default user experience for users with `is_control=true`, Amplitude can't measure performance.
- Serve a default experience in case there is an error. There are two common error responses from the API:
  - When the user just signed up ( less than 5 min ago), you might get this response:`{"error":"User id and device id not seen before"}`
  - If a user is more than 2 hours old or has been inactive longer than 90 days, there is an API response, but it returns `"recommendations": null`.
- If Amplitude is unavailable and returns a 500 response, you can retry or serve the default experience.

### Authentication errors

- If the secret key is correct but user IDs are improperly formatted, or are user IDs from a different project, you get this error: `{"error":"User id and device id not seen before"}`
- If the secret key is wrong, you get an HTTP 401 response: `Invalid Api-Key`
- If the authorization header is missing or malformed you get an HTTP 401 response: `Missing Api-Key in Authorization header`

### Configuration errors

- If the endpoint or path are wrong, you get an empty error (HTTP 404) response.
- If an insecure HTTP request is sent, it's redirected to the HTTPs endpoint (HTTPS 301) with an HTML body - the Location header contains the proper protocol and URL.

## Parameters

| <div class= "big-column">Parameter</div> | Description |
| --- | --- |
| `user_id`[^1] | Optional, but required unless `device_id` is set. The user id (external database id) to be queried. |
| `device_id`[^1] | Optional, but required unless `user_id` is set. The device id (anonymous id) to be queried, required unless `user_id` is set. |
| `get_recs` | Optional. Return a recommendation result for this user. Defaults to `false`.|
| `rec_id`| Optional. Recommendation(s) to retrieve, required if `get_recs` is true. Fetch multiple recommendations by separating the `rec_ids` with commas. |
| `rec_type` | Optional. Overrides the default experimental control setting and `rec_type=model` returns modeled recommendations and `rec_type=random` returns random recommendations. |
| `get_amp_props`| Optional. Return a full set of user properties for this user, not including computations. Defaults to `false`. |
| `get_cohort_ids`| Optional. Return a list of all the cohort IDs that this user is a part of that have been set up to be tracked. By default cohort membership isn't tracked for users for any cohort. Defaults to `false`.|
| `get_computations` | Optional. Return a list of all the computations that are enabled for this user. Defaults to `false`. |
| `comp_id` | Optional. Return a single computation that might be enabled for this user. It returns a null value if it doesn't exist. If `get_computations` is true, all values are fetched, including this one (unless it's archived or deleted). |

[^1]:
    Requests must include either a `user_id` or a `device_id`.

## Examples

### Get a recommendation

!!!note

    This feature is available in accounts with Amplitude Recommend.

Retrieve a single recommendation by ID.

#### Request

```bash
GET /v1/userprofile?user_id=12345&get_recs=true&rec_id=testRecId HTTP/1.1
Host: profile-api.amplitude.com
Authorization: Api-Key INSERT SECRET KEY
```

#### Response

```json
{
  "userData":{
    "recommendations":[
      {
        "rec_id":"testRecId",
        "child_rec_id":"testRecId",
        "items":[
          "cookie",
          "cracker",
          "chocolate milk",
          "donut",
          "croissant"
        ],
        "is_control":false,
        "recommendation_source":"model",
        "last_updated":1608670720
      }
    ],
    "user_id":"testUser",
    "device_id":"ffff-ffff-ffff-ffff",
    "amp_props":null,
    "cohort_ids":null
  }
}
```

| Response Parameter | Description |
| --- | --- |
| `rec_id` | The requested recommendation ID. |
| `child_rec_id` | A more detailed recommendation ID that Amplitude may use on the backend as part of an internal experiment to improve model performance. In most cases is the same as `rec_id`. |
| `items` | List of recommendations for this user. |
| `is_control` | true if this user is part of the control group. |
| `recommendation_source` | Name of the model used to generate this recommendation. |
| `last_updated` | Timestamp of when this recommendation was last generated and synced. |

### Get multiple recommendations

!!!note

    This feature is available in accounts with Amplitude Recommend.

Retrieves multiple recommendations for a user.

#### Request

```bash
GET /v1/userprofile?user_id=12345&get_recs=true&rec_id=testRecId,testRecId2 HTTP/1.1
Host: profile-api.amplitude.com
Authorization: Api-Key INSERT SECRET KEY
```

#### Response

```json
{
  "userData": {
    "recommendations": [
      {
        "rec_id": "testRecId",
        "child_rec_id": "testRecId",
        "items": [
          "cookie",
          "cracker",
          "chocolate milk",
          "donut",
          "croissant"
        ],
        "is_control": false,
        "recommendation_source": "model",
        "last_updated": 1608670720
      },
            {
        "rec_id": "testRecId2",
        "child_rec_id": "testRecId2",
        "items": [
          "bulgogi",
          "bibimbap",
          "kimchi",
          "croffles",
          "samgyeopsal"
        ],
        "is_control": false,
        "recommendation_source": "model2",
        "last_updated": 1608670658
      }
    ],
    "user_id": "testUser",
    "device_id": "ffff-ffff-ffff-ffff",
    "amp_props": null,
    "cohort_ids": null
  }
}
```

### Get user properties

Retrieves the user's properties.

#### Request

```bash
GET /v1/userprofile?user_id=12345&get_amp_props=true HTTP/1.1
Host: profile-api.amplitude.com
Authorization: Api-Key INSERT SECRET KEY
```

#### Response

```json
{
  "userData": {
    "recommendations": null,
    "user_id": "testUser",
    "device_id": "ffff-ffff-ffff-ffff",
    "amp_props": {
      "library": "http/1.0",
      "first_used": "2020-01-13",
      "last_used": "2021-03-24",
      "number_property": 12,
      "boolean_property": true
    },
    "cohort_ids": null
  }
}
```

### Get cohort IDs

Retrieves a user's cohort IDs.

#### Request

```bash
GET /v1/userprofile?user_id=&get_cohort_ids=true HTTP/1.1
Host: profile-api.amplitude.com
Authorization: Api-Key INSERT SECRET KEY
```

#### Response

```json
{
  "userData": {
    "recommendations": null,
    "user_id": "testUser",
    "device_id": "ffff-ffff-ffff-ffff",
    "amp_props": null,
    "cohort_ids": ["cohort1", "cohort3", "cohort7"]
  }
}
```

### Get all computations

!!!note

    This feature is available in accounts with Amplitude Recommend.

Computations convert events into a new user property you can use to segment your users.

Computations work by transforming an event or event property into a computed user property. 
You can use the computed property as a configurable filter in any Amplitude chart for analysis, or as a personalization tool by syncing it to an external destination.

#### Request

```bash
GET /v1/userprofile?get_computations=&comp_id= HTTP/1.1
Host: profile-api.amplitude.com
Authorization: Api-Key INSERT SECRET KEY
```

#### Response

```json
{
  "userData": {
    "recommendations": null,
    "user_id": "testUser",
    "device_id": "ffff-ffff-ffff-ffff",
    "amp_props": {
      "computed-prop-1": "5000000.0",
      "computed-prop-2": "3"
    },
    "cohort_ids": null
  }
}

```

### Get a single computation

!!!note

    This feature is available in accounts with Amplitude Recommend.

Retrieves a single computation by ID. Find the computation ID by navigating to the computation in the Recommend web app and copying the ID at the end of the URL. The ID is bold in this example:

<recommend.amplitude.com/org/00000/computations/**t14bqib**>

#### Request

```bash
GET /v1/userprofile?user_id=12345&get_computations=true&comp_id=1 HTTP/1.1
Host: profile-api.amplitude.com
Authorization: Api-Key INSERT SECRET KEY
```

#### Response

```json
{
  "userData": {
    "recommendations": null,
    "user_id": "testUser",
    "device_id": "ffff-ffff-ffff-ffff",
    "amp_props": {
      "computed-prop-2": "3"
    },
    "cohort_ids": null
  }
}
```

### Get prediction propensity

!!!note

    This feature is available in accounts with Amplitude Recommend.

When you create a prediction in Amplitude Recommend, you can sync the prediction score to the Profile API. A prediction propensity is the probability that a user will perform a predicted action.

To fetch a user's prediction propensity, send a request that includes a `prediction_id` and `propensity_type`. The propensity type can be either the raw score or a percentile.

Percentile is useful to understand users in comparison to each other. For example, is this user in the 80% of users likely do an action?

Score is the raw propensity score.

Find the `prediction_id` by navigating to the prediction in the Recommend web app and copying the ID at the end of the URL. The ID is bold in this example:

recommend.amplitude.com/0000/predictions/**0x10x**

#### Request (prediction propensity score)

```bash
GET /v1/userprofile?user_id=&get_propensity=&prediction_id=null&propensity_type=score HTTP/1.1
Host: profile-api.amplitude.com
Authorization: Api-Key INSERT SECRET KEY
```

#### Response (prediction propensity score)

```json
{
  "userData": {
    "recommendations": null,
    "user_id": "testUser",
    "device_id": "ffff-ffff-ffff-ffff",
    "amp_props": {
      "computed-prop-2": "3"
    },
    "propensity": 0.500001
  }
}
```

#### Request (prediction propensity percentile)

```bash
GET /v1/userprofile?user_id=&get_propensity=&prediction_id=null&propensity_type=pct HTTP/1.1
Host: profile-api.amplitude.com
Authorization: Api-Key INSERT SECRET KEY
```

#### Response (prediction propensity percentile)

```json
{
  "userData": {
    "recommendations": null,
    "user_id": "testUser",
    "device_id": "ffff-ffff-ffff-ffff",
    "amp_props": {
      "computed-prop-2": "3"
    },
    "propensity": 83
  }
}
```
