---
title: User Profile API
description: The User Profile API serves Amplitude User Profiles, which includes user properties, computed user properties, a list of cohort IDs of cohorts that the user is in, and recommendations.
---
<!-- markdownlint-disable MD036 -->
The User Profile API serves Amplitude user profiles, which include user properties, computed user properties, a list of cohort IDs of cohorts that the user is in, and recommendations.

!!!note "Some features require Amplitude Audiences"

    To get cohort IDs or recommendation IDs, you must have a plan with Audiences.

--8<-- "includes/postman-interactive.md"

--8<-- "includes/auth-secret-key.md"

## Endpoints

| Region | Endpoint |
| --- | --- |
| Standard Server | `https://profile-api.amplitude.com/v1/userprofile` |

## Considerations

**Default experiences**

- If you don't serve your default user experience for users with `is_control=true`, Amplitude can't measure performance.
- Serve a default experience in case there is an error.
- If Amplitude is unavailable and returns a 500 response, you can retry or serve the default experience.

**Authentication errors**

- If the secret key is correct but user IDs are improperly formatted, or are user IDs from a different project, you get this error: `{"error":"User id and device id not seen before"}`
- If the secret key is wrong, you get an HTTP 401 response: `Invalid Api-Key`
- If the authorization header is missing or malformed you get an HTTP 401 response: `Missing Api-Key in Authorization header`

**Configuration errors**

- If the endpoint or path are wrong, you get an empty error (HTTP 404) response.
- If an insecure HTTP request is sent, it's redirected to the HTTPs endpoint (HTTPS 301) with an HTML body - the Location header contains the proper protocol and URL.

**Throttling errors**

- Amplitude orgs have a limit of 100,000 recommendation requests per minute. If you go above this limit, the API returns the following error response:
    - `{"error":"Number of requests per minute exceeds system limit. Contact Support if you need this limit raised"}`
- For batch recommendation use cases, consider rate limiting your requests so you don't go above this limit.
- If you need this limit increased for your org, contact Support.

## Parameters

| <div class= "big-column">Parameter</div> | Description |
| --- | --- |
| `user_id`[^1] | <span class="optional">Optional</span>, but <span class="required">required unless `device_id` is set</span>. The user ID (external database ID) to be queried. |
| `device_id`[^1] | <span class="optional">Optional</span>, but <span class="required">required unless `user_id` is set</span>. The device ID (anonymous ID) to be queried. |
| `get_recs` | <span class="optional">Optional</span>. Return a recommendation result for this user. Defaults to `false`.|
| `rec_id`| <span class="optional">Optional</span>. Recommendations to retrieve, required if `get_recs` is true. Fetch multiple recommendations by separating the `rec_ids` with commas. |
| `rec_type` | <span class="optional">Optional</span>. Overrides the default experimental control setting and `rec_type=model` returns modeled recommendations and `rec_type=random` returns random recommendations. |
| `get_amp_props`| <span class="optional">Optional</span>. Return a full set of user properties for this user, not including computations. Defaults to `false`. |
| `get_cohort_ids`| <span class="optional">Optional</span>. Return a list of all the cohort IDs that this user is a part of that have been set up to be tracked. By default cohort membership isn't tracked for users for any cohort. Defaults to `false`.|
| `get_computations` | <span class="optional">Optional</span>. Return a list of all the computations that are enabled for this user. Defaults to `false`. |
| `comp_id` | <span class="optional">Optional</span>. Return a single computation that might be enabled for this user. It returns a null value if it doesn't exist. If `get_computations` is true, all values are fetched, including this one (unless it's archived or deleted). |

[^1]:
    Requests must include either a `user_id` or a `device_id`.

## Get a recommendation

!!!note "Feature availability"

    This feature is available in accounts with Amplitude Audiences.

Retrieve a single recommendation by ID.

### Request

=== "cURL"

    ```bash
    curl --location --request GET 'https://profile-api.amplitude.com/v1/userprofile?user_id=USER_ID&get_recs=true&rec_id=testRecId' \
    --header 'Authorization: Api-Key <SECRET KEY>'
    ```

=== "HTTP"

    ```bash
    GET /v1/userprofile?user_id=USER_ID&get_recs=true&rec_id=testRecId HTTP/1.1
    Host: profile-api.amplitude.com
    Authorization: Api-Key <SECRET KEY>
    ```

???code-example "Example: Get a specific recommendation (click to expand)"

    This example retrieves the recommendation with ID `98765` for the user with ID `12345`.

    === "cURL"

        ```bash
        curl --location --request GET 'https://profile-api.amplitude.com/v1/userprofile?user_id=12345&get_recs=true&rec_id=98765' \
        --header 'Authorization: Api-Key 1234567890'
        ```

    === "HTTP"

        ```bash
        GET /v1/userprofile?user_id=12345&get_recs=true&rec_id=98765 HTTP/1.1
        Host: profile-api.amplitude.com
        Authorization: Api-Key 1234567890
        ```

### Response

```json
{
  "userData":{
    "recommendations":[
      {
        "rec_id":"98765",
        "child_rec_id":"98765",
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
    "user_id":"12345",
    "device_id":"ffff-ffff-ffff-ffff",
    "amp_props":null,
    "cohort_ids":null
  }
}
```

| Response Parameter | Description |
| --- | --- |
| `rec_id` | The requested recommendation ID. |
| `child_rec_id` | A more detailed recommendation ID that Amplitude may use as part of an internal experiment to improve model performance. This usually the same as `rec_id`. |
| `items` | List of recommendations for this user. |
| `is_control` | true if this user is part of the control group. |
| `recommendation_source` | Name of the model used to generate this recommendation. |
| `last_updated` | Timestamp of when this recommendation was last generated and synced. |

## Get multiple recommendations

!!!note "Feature availability"

    This feature is available in accounts with Amplitude Audiences.

Retrieves multiple recommendations for a user.

### Request

=== "cURL"

    ```bash
    curl --location --request GET 'https://profile-api.amplitude.com/v1/userprofile?user_id=USER_ID&get_recs=true&rec_id=testRecId,testRecID2' \
    --header 'Authorization: Api-Key <SECRET KEY>'
    ```

=== "HTTP"

    ```bash
    GET /v1/userprofile?user_id=USER_ID&get_recs=true&rec_id=testRecId,testRecId2 HTTP/1.1
    Host: profile-api.amplitude.com
    Authorization: Api-Key <SECRET KEY>
    ```

???code-example "Example: Get multiple recommendations (click to expand)"

    This example retrieves the recommendation with ID `98765` and `56789` for the user with ID `12345`.

    === "cURL"

        ```bash
        curl --location --request GET 'https://profile-api.amplitude.com/v1/userprofile?user_id=12345&get_recs=true&rec_id=98765,56789' \
        --header 'Authorization: Api-Key 1234567890'
        ```

    === "HTTP"

        ```bash
        GET /v1/userprofile?user_id=12345&get_recs=true&rec_id=98765,56789 HTTP/1.1
        Host: profile-api.amplitude.com
        Authorization: Api-Key 1234567890
        ```

### Response

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
    "user_id": "12345",
    "device_id": "ffff-ffff-ffff-ffff",
    "amp_props": null,
    "cohort_ids": null
  }
}
```

## Get user properties

Retrieves the user's properties.

### Request

=== "cURL"

    ```bash
    curl --location --request GET 'https://profile-api.amplitude.com/v1/userprofile?user_id=USER_ID&get_amp_props=true' \
    --header 'Authorization: Api-Key <SECRET KEY>'
    ```

=== "HTTP"

    ```bash
    GET /v1/userprofile?user_id=USER_ID&get_amp_props=true HTTP/1.1
    Host: profile-api.amplitude.com
    Authorization: Api-Key <SECRET KEY>
    ```

???code-example "Example: Get user properties for a user ID (click to expand)"

    This example retrieves the user properties for the user with ID `12345`.

    === "cURL"

        ```bash
        curl --location --request GET 'https://profile-api.amplitude.com/v1/userprofile?user_id=12345&get_amp_props=true' \
        --header 'Authorization: Api-Key 1234567890'
        ```

    === "HTTP"

        ```bash
        GET /v1/userprofile?user_id=12345&get_amp_props=true HTTP/1.1
        Host: profile-api.amplitude.com
        Authorization: Api-Key 1234567890
        ```

### Response

```json
{
  "userData": {
    "recommendations": null,
    "user_id": "12345",
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

## Get cohort IDs

Retrieves a user's cohort IDs.

### Request

=== "cURL"

    ```bash
    curl --location --request GET 'https://profile-api.amplitude.com/v1/userprofile?user_id=USER_ID&get_cohort_ids=true' \
    --header 'Authorization: Api-Key <SECRET KEY>'
    ```

=== "HTTP"

    ```bash
    GET /v1/userprofile?user_id=USER_ID&get_cohort_ids=true HTTP/1.1
    Host: profile-api.amplitude.com
    Authorization: Api-Key <SECRET KEY>
    ```

???code-example "Example: Get cohort IDs for a user (click to expand)"

    This example gets cohort IDs for user ID `12345`

    === "cURL"

        ```bash
        curl --location --request GET 'https://profile-api.amplitude.com/v1/userprofile?user_id=12345&get_cohort_ids=true' \
        --header 'Authorization: Api-Key 123456789'
        ```

    === "HTTP"

        ```bash
        GET /v1/userprofile?user_id=12345&get_cohort_ids=true HTTP/1.1
        Host: profile-api.amplitude.com
        Authorization: Api-Key 123456789
        ```

### Response

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

## Get all computations

!!!note "Feature availability"

    This feature is available in accounts with Amplitude Audiences.

Computations convert events into a new user property you can use to segment your users.

Computations work by transforming an event or event property into a computed user property.
You can use the computed property as a configurable filter in any Amplitude chart for analysis, or as a personalization tool by syncing it to an external destination.

### Request

Retrieve all computations for a user.

=== "cURL"

    ```bash
    curl --location --request GET 'https://profile-api.amplitude.com/v1/userprofile?get_computations=true&user_id=USER_ID' \
    --header 'Authorization: Api-Key <SECRET KEY>'
    ```

=== "HTTP"

    ```bash
    GET /v1/userprofile?get_computations=true&user_id=USER_ID HTTP/1.1
    Host: profile-api.amplitude.com
    Authorization: Api-Key <SECRET KEY>
    ```

???code-example "Example: Get all computations for a user (click to expand)"

    This example retrieves all computations for user ID `12345`.

    === "cURL"

        ```bash
        curl --location --request GET 'https://profile-api.amplitude.com/v1/userprofile?user_id=12345&get_computations=true'
        --header 'Authorization: Api-Key 123456789'
        ```

    === "HTTP"

        ```bash
        GET /v1/userprofile?get_computations=true&user_id=1234 HTTP/1.1
        Host: profile-api.amplitude.com
        Authorization: Api-Key 123456789
        ```

### Response

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

## Get a single computation

!!!note "Feature availability"

    This feature is available in accounts with Amplitude Audiences.

Retrieves a single computation by ID. Find the computation ID by navigating to the computation in the Audiences web app and copying the ID at the end of the URL. The ID is bold in this example:

<recommend.amplitude.com/org/00000/computations/**t14bqib**>

### Request

Retrieve a computation for a user by ID.

=== "cURL"

    ```bash
    curl --location --request GET 'https://profile-api.amplitude.com/v1/userprofile?user_id=USER_ID&get_computations=true&comp_id=COMP_ID' \
    --header 'Authorization: Api-Key <SECRET KEY>'
    ```

=== "HTTP"

    ```bash
    GET /v1/userprofile?user_id=USER_ID&get_computations=true&comp_id=COMP_ID HTTP/1.1
    Host: profile-api.amplitude.com
    Authorization: Api-Key <SECRET KEY>
    ```

???code-example "Example: Get a computation by ID for a specific user (click to expand)"

    This example retrieves the computation with ID `t14bqib` for user ID `12345`.

    === "cURL"

        ```bash
        curl --location --request GET 'https://profile-api.amplitude.com/v1/userprofile?user_id=12345&get_computations=true&comp_id=t14bqib'
        --header 'Authorization: Api-Key 123456789'
        ```

    === "HTTP"

        ```bash
        GET /v1/userprofile?get_computations=true&user_id=1234&comp_id=t14bqib HTTP/1.1
        Host: profile-api.amplitude.com
        Authorization: Api-Key 123456789
        ```

### Response

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

## Get single/multiple prediction propensity

!!!note "Feature availability"

    This feature is available in accounts with Amplitude Audiences.

When you create a prediction in Amplitude Audiences, you can sync the prediction score to the Profile API. A prediction propensity is the probability that a user will perform a predicted action.

To fetch a user's prediction propensity, send a request that includes a `prediction_id` and `propensity_type`. The propensity type can be either the raw score (`score`) or a percentile (`pct`).

Percentile is useful to understand users in comparison to each other. For example, is this user in the 80% of users likely to do an action?

Score is the raw propensity score.

Find the `prediction_id` by navigating to the prediction in the Audiences web app and copying the ID at the end of the URL. The ID is bold in this example:

recommend.amplitude.com/0000/predictions/**0x10x**

!!!note "Multiple Prediction IDs"

    To fetch multiple prediction_id, separate prediction_id by comma(,). For example: `prediction_id=id1,id2`. Responses for multiple prediction IDs are in the `propensities` field.

### Request

=== "cURL"

    ```bash
    curl --location --request GET 'https://profile-api.amplitude.com/v1/userprofile?user_id=USER_ID&get_propensity=true&prediction_id=PREDICTION_ID&propensity_type=PROPENSITY_TYPE'
    --header 'Authorization: Api-Key <SECRET KEY>'
    ```

=== "HTTP"

    ```bash
    GET /v1/userprofile?user_id=USER_ID&get_propensity=&prediction_id=PREDICTION_ID&propensity_type=PROPENSITY_TYPE HTTP/1.1
    Host: profile-api.amplitude.com
    Authorization: Api-Key <SECRET KEY>
    ```

???example "More examples (click to expand)"

    ???code-example "Propensity score example"

        This example requests a propensity score for prediction ID `0x10x` for the user ID `12345`.

        === "cURL"

            ```bash
            curl --location --request GET 'https://profile-api.amplitude.com/v1/userprofile?user_id=12345&get_propensity=true&prediction_id=0x10x&propensity_type=score'
            --header 'Authorization: Api-Key 123456789'
            ```
        === "HTTP"

            ```bash
            GET /v1/userprofile?user_id=12345&get_propensity=&prediction_id=0x10x&propensity_type=score HTTP/1.1
            Host: profile-api.amplitude.com
            Authorization: Api-Key 123456789
            ```
    ???code-example "Propensity percentage example"

        This example requests a propensity percentage for prediction ID `0x10x` for the user ID `12345`.

        === "cURL"

            ```bash
            curl --location --request GET 'https://profile-api.amplitude.com/v1/userprofile?user_id=12345&get_propensity=true&prediction_id=0x10x&propensity_type=pct'
            --header 'Authorization: Api-Key 123456789'
            ```
        === "HTTP"

            ```bash
            GET /v1/userprofile?user_id=12345&get_propensity=&prediction_id=0x10x&propensity_type=pct HTTP/1.1
            Host: profile-api.amplitude.com
            Authorization: Api-Key 123456789
            ```
    ???code-example "Propensity percentage with multiple prediction IDs example"

        This example requests a propensity percentage for prediction ID `0x10x` and `0x11x` for the user ID `12345`.

        === "cURL"

            ```bash
            curl --location --request GET 'https://profile-api.amplitude.com/v1/userprofile?user_id=12345&get_propensity=true&prediction_id=0x10x,0x11x&propensity_type=pct'
            --header 'Authorization: Api-Key 123456789'
            ```
        === "HTTP"

            ```bash
            GET /v1/userprofile?user_id=12345&get_propensity=&prediction_id=0x10x,0x11x&propensity_type=pct HTTP/1.1
            Host: profile-api.amplitude.com
            Authorization: Api-Key 123456789
            ```

### Response

=== "Prediction propensity score response"

    ```json
    {
      "userData": {
        "recommendations": null,
        "user_id": "testUser",
        "device_id": null,
        "amp_props": null,
        "cohort_ids": null,
        "propensity": 0.500001,
        "propensities": [
            {
                "prop": 0.500001,
                "pred_id": "0x10x",
                "prop_type": "score"
            }
        ]
      }
    }
    ```

=== "Prediction propensity percentile response"

    ```json
    {
      "userData": {
        "recommendations": null,
        "user_id": "testUser",
        "device_id": null,
        "amp_props": null,
        "cohort_ids": null,
        "propensity": 83,
        "propensities": [
            {
                "prop": 83,
                "pred_id": "0x10x",
                "prop_type": "pct"
            }
        ]
      }
    }
    ```

=== "Prediction propensity score with multiple prediction IDs response"

    ```json
    {
      "userData": {
        "recommendations": null,
        "user_id": "testUser",
        "device_id": null,
        "amp_props": null,
        "cohort_ids": null,
        "propensity": null,
        "propensities": [
            {
                "prop": 83,
                "pred_id": "0x10x",
                "prop_type": "score"
            },
            {
                "prop": 85,
                "pred_id": "0x11x",
                "prop_type": "score"
            }
        ]
      }
    }
    ```
