---
title: User Privacy API
description: The User Privacy API lets you programmatically submit requests to delete all data for a set of known Amplitude IDs or User IDs.

---

The User Privacy API helps you comply with end-user data deletion requests mandated by global privacy laws such as GDPR and CCPA.
 The API lets you programmatically submit requests to delete all data for a set of known Amplitude IDs or User IDs.

--8<-- "includes/postman.md"

--8<-- "includes/auth-basic.md"

## Endpoints

| Region | Endpoint |
| --- | --- |
| Standard Server | [https://amplitude.com/api/2/deletions/users](https://amplitude.com/api/2/deletions/users) |
| EU Residency Server | [https://analytics.eu.amplitude.com/api/2/deletions/users](https://analytics.eu.amplitude.com/api/2/deletions/users) |

## Considerations

Keep these considerations in mind when using the User Privacy API.

- When you make a deletion request, Amplitude emails all account admins with the deletion details.
- Amplitude deletes all events and user properties added up until the time that job runs for each Amplitude ID in a deletion job.
- Running a deletion job for a user doesn't block new events for that user. Amplitude accepts new events from a deleted user.
- If Amplitude receives events for a deleted user, then the deleted user is counted as a new user.
 Because deletion removes all user data from Amplitude servers, Amplitude doesn't recognize the new user as the deleted user.
- To reduce resource impact and ensure high availability, Amplitude batches requests for deletions. Batch jobs are scheduled for 10-13 days after the date of the batch's first request.
 In line with GDPR article 12.3 and 17, Amplitude processes deletion requests without undue delay, within 30 days after receiving the request.
 The actual timeline for deletion depends on the complexity and number of requests Amplitude receives.
 If your data volume is large (>1BB/month), then Amplitude may need to reduce your frequency of deletion scheduling.
- You can revoke requests in the batch until three (3) days before the day the job scheduled run date. During the three (3) day period, you can't edit the batch.
 Amplitude adds deletion requests made during this time to a new batch.
- After the three (3) day period, the request's status changes to `submitted`. You can't stop the job at this point.
 The deletion process removes all data associated with the user from all Amplitude's systems, including associated recovery and back-up systems.
 After the job completes, its status changes to `done`.

!!! warning
    Using this API doesn't prevent future user tracking for the deleted users. To learn about how to stop tracking users in your application, see the `setOptOut()` method in the SDKs.

## Limits

The endpoint `/api/2/deletions/users` has a rate limit of 1 HTTP request per second. Each HTTP request can contain up to 100 `amplitude_ids` or `user_ids`.
 You can make up to 100 deletion requests per second if you batch 100 users in each request.

## Delete users

`POST /deletions/users`

Add a user for deletion using a JSON body. Specify up to 100 users at a time. You can use mix of Amplitude IDs and User IDs.

### JSON Body Parameter

The body parameter is required. It's the deletion request object listing the `user_ids` and `amplitude_ids` for the users to delete.

| <div class="big-column">Name</div> | Description |
| --- | --- |
| `amplitude_ids` | Amplitude IDs for the users to delete. |
| `user_ids` | User IDs for the users to delete. |
| `requester` | The internal user who requested the deletion. This is useful for auditing. |
| `ignore_invalid_id` | When `true`, the job ignores invalid user IDs. Invalid user IDs are users that don't exist in the project. |
| `delete_from_org` | Delete user from the entire org instead of a single project. This feature is available in orgs with the Portfolio feature enabled. Requests must be by `user_ids`. Values can be either `True` or `False`. Defaults to `False`. |

### Example request

=== "cURL"
    ```bash
    # You can also use wget
    curl -X POST https://amplitude.com/api/2/deletions/users \
      -H 'Content-Type: application/json' \
      -H 'Accept: application/json'
    ```

=== "HTTP"
    ```bash
    POST https://amplitude.com/api/2/deletions/users HTTP/1.1
    Host: amplitude.com
    Authorization: Basic {{api-key}}:{{secret_key}}
    Content-Type: application/json
    Accept: application/json
    ```

=== "JavaScript"
    ```js
    var headers = {
      'Content-Type':'application/json',
      'Accept':'application/json'

    };

    $.ajax({
      url: 'https://amplitude.com/api/2/deletions/users',
      method: 'post',

      headers: headers,
      success: function(data) {
        console.log(JSON.stringify(data));
      }
    })
    ```

=== "NodeJs"
    ```js
    const request = require('node-fetch');
    const inputBody = '{
      "amplitude_ids": [
        "amp_id_1",
        "amp_id_2",
        "..."
      ],
      "user_ids": [
        "user_id_1",
        "user_id_2",
        "..."
      ],
      "requester": "employee@yourcompany.com"
    }';
    const headers = {
      'Content-Type':'application/json',
      'Accept':'application/json'

    };

    fetch('https://amplitude.com/api/2/deletions/users',
    {
      method: 'POST',
      body: inputBody,
      headers: headers
    })
    .then(function(res) {
        return res.json();
    }).then(function(body) {
        console.log(body);
    });
    ```

=== "Ruby"
    ```ruby
    require 'rest-client'
    require 'json'

    headers = {
      'Content-Type' => 'application/json',
      'Accept' => 'application/json'
    }

    result = RestClient.post 'https://amplitude.com/api/2/deletions/users',
      params: {
      }, headers: headers

    p JSON.parse(result)
    ```

=== "Python"
    ```python
    import requests
    headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }

    r = requests.post('https://amplitude.com/api/2/deletions/users', params={

    }, headers = headers)

    print r.json()
    ```

=== "Java"
    ```java
    URL obj = new URL("https://amplitude.com/api/2/deletions/users");
    HttpURLConnection con = (HttpURLConnection) obj.openConnection();
    con.setRequestMethod("POST");
    int responseCode = con.getResponseCode();
    BufferedReader in = new BufferedReader(
        new InputStreamReader(con.getInputStream()));
    String inputLine;
    StringBuffer response = new StringBuffer();
    while ((inputLine = in.readLine()) != null) {
        response.append(inputLine);
    }
    in.close();
    System.out.println(response.toString());
    ```

=== "Go"
    ```go
    package main

    import (
          "bytes"
          "net/http"
    )

    func main() {

        headers := map[string][]string{
            "Content-Type": []string{"application/json"},
            "Accept": []string{"application/json"},

        }

        data := bytes.NewBuffer([]byte{jsonReq})
        req, err := http.NewRequest("POST", "https://amplitude.com/api/2/deletions/users", data)
        req.Header = headers

        client := &http.Client{}
        resp, err := client.Do(req)
        // ...
    }
    ```

### Response

The response for a POST request contains these fields:

| <div class="big-column">Name</div>  | Description |
| --- | --- |
| `day` | The day the deletion job is scheduled to begin. |
| `status` | The status of the deletion job. |
| `amplitude_ids` and `user_ids` | List of the Amplitude IDs to delete. |
| `app` | The project or app ID. Included when the deletion request is for multiple projects. |

## Get deletion jobs

`/api/2/deletions/users?start_day=YYYY-MM-DD&end_day=YYYY-MM-DD`

Retrieves a list of deletion jobs scheduled in a time range; this time range should include the date you made the request on plus 30 days. For example, you made a deletion request on August 1st, 2018.
 Your deletion request should have `start_day = 2018-08-01` and `end_day = 2018-08-31`.

If the request returns no values, then no jobs are scheduled for that time range. Note: The largest permitted time range is six months.

### Example request

=== "cURL"
    ```bash
    # You can also use wget
    curl -X GET https://amplitude.com/api/2/deletions/users?start_day=string&end_day=string \
      -H 'Accept: application/json' \
      -U API_Key:API_Secret
    ```

=== "HTTP"
    ```bash
    GET https://amplitude.com/api/2/deletions/users?start_day=string&end_day=string HTTP/1.1
    Host: amplitude.com
    Authorization: Basic {{api-key}}:{{secret_key}}
    Accept: application/json
    ```
=== "JavaScript"
    ```js
    var headers = {
      'Accept':'application/json'

    };

    $.ajax({
      url: 'https://amplitude.com/api/2/deletions/users',
      method: 'get',
      data: '?start_day=string&end_day=string',
      headers: headers,
      success: function(data) {
        console.log(JSON.stringify(data));
      }
    })
    ```
=== "NodeJs"
    ```js
    const request = require('node-fetch');

    const headers = {
      'Accept':'application/json'

    };

    fetch('https://amplitude.com/api/2/deletions/users?start_day=string&end_day=string',
    {
      method: 'GET',

      headers: headers
    })
    .then(function(res) {
        return res.json();
    }).then(function(body) {
        console.log(body);
    });
    ```
=== "Ruby"
    ```ruby
    require 'rest-client'
    require 'json'

    headers = {
      'Accept' => 'application/json'
    }

    result = RestClient.get 'https://amplitude.com/api/2/deletions/users',
      params: {
      'start_day' => 'string',
    'end_day' => 'string'
    }, headers: headers

    p JSON.parse(result)
    ```
=== "Python"
    ```python
    import requests
    headers = {
      'Accept': 'application/json'
    }

    r = requests.get('https://amplitude.com/api/2/deletions/users', params={
      'start_day': 'string',  'end_day': 'string'
    }, headers = headers)

    print r.json()
    ```
=== "Java"
    ```java
    URL obj = new URL("https://amplitude.com/api/2/deletions/users?start_day=string&end_day=string");
    HttpURLConnection con = (HttpURLConnection) obj.openConnection();
    con.setRequestMethod("GET");
    int responseCode = con.getResponseCode();
    BufferedReader in = new BufferedReader(
        new InputStreamReader(con.getInputStream()));
    String inputLine;
    StringBuffer response = new StringBuffer();
    while ((inputLine = in.readLine()) != null) {
        response.append(inputLine);
    }
    in.close();
    System.out.println(response.toString());
    ```

=== "Go"
    ```go
    package main

    import (
          "bytes"
          "net/http"
    )

    func main() {

        headers := map[string][]string{
            "Accept": []string{"application/json"},

        }

        data := bytes.NewBuffer([]byte{jsonReq})
        req, err := http.NewRequest("GET", "https://amplitude.com/api/2/deletions/users", data)
        req.Header = headers

        client := &http.Client{}
        resp, err := client.Do(req)
        // ...
    }
    ```

### Query parameters

|Name|Description|
|-----|------------|
|`start`| Required. First hour included in data series, formatted `YYYYMMDDTHH`. For example, `20220201T05`.|
|`end` |Required. Last hour included in data series, formatted `YYYYMMDDTHH` For example, `20220201T05`.|

### Response

The success response for a `GET` request contains these fields:

| <div class="big-column">Property</div> | Description |
| --- | --- |
| `day` | The day the deletion job is scheduled to begin. |
| `status` | The deletion job's status.  <br>  <br>**Staging**: The job hasn't started, and can be modified. More deletion requests may get scheduled into this job and you can remove requests from this job.  <br>  <br>**Submitted**: The job is submitted to run. It can't be modified.  <br>  <br>**Done**: The job has finished running. It can't be modified. |
| `amplitude_ids` | List of the Amplitude Ids of users to delete. |
| `app` | Project/app id. Appears if the deletion is applies to more than one project. |

The `amplitude_ids` key contains these fields:

| <div class="big-column">Name</div> | Description |
| --- | --- |
| `amplitude_id` | The Amplitude ID of the user to be deleted. |
| `requester` | The person who requested the Amplitude ID to be deleted. |
| `requested_on_day` | The day this deletion was requested. |

```json
[
  {
    "day": "string",
    "amplitude_ids": [
      {
        "amplitude_id": 0,
        "requested_on_day": "string",
        "requester": "string"
      }
    ],
    "status": "string"
  }
]
```

## Delete deletion job

Removes the specified ID from a deletion job.

`/api/2/deletions/users/AMPLITUDE_ID/YYYY-MM-DD`

### Example request

```bash
DELETE /api/2/deletions/users/12345/ HTTP/1.1
Host: amplitude.com
Authorization: Basic {{api-key}}:{{secret-key}}
```

{
  "amplitude_ids": [
    "amp_id_1",
    "amp_id_2",
    "..."
  ],
  "user_ids": [
    "user_id_1",
    "user_id_2",
    "..."
  ],
  "requester": "employee@yourcompany.com"
}

### Path variables

|<div class="big-column">Name</div>| Description|
|----|-----|
|`amplitude_ids` or `user_ids`| Required. The `user_ids` or `amplitude_ids` to remove from the deletion job.|
|`date`| Required. Day the deletion is schedule for.|

### Response

A successful request returns a response with this schema:

| <div class="big-column">Property</div> | Description |
| --- | --- |
| `amplitude_id` | The Amplitude ID of the user to be deleted. |
| `requester` | The person who requested the Amplitude ID to be deleted. |
| `requested_on_day` | The day this deletion was requested. |

```json
{
  "day": "string",
  "amplitude_ids": [
    {
      "amplitude_id": 0,
      "requested_on_day": "string",
      "requester": "string"
    }
  ],
  "status": "string"
}
```

| <div class="big-column">Property</div> | Description |
| --- | --- |
| `day` | The day the deletion job is scheduled to begin. |
| `status` | The deletion job's status.  <br>  <br>**Staging**: The job hasn't started, and can be modified. More deletion requests may get scheduled into this job and you can remove requests from this job.  <br>  <br>**Submitted**: The job is submitted to run. It can't be modified.  <br>  <br>**Done**: The job has finished running. It can't be modified. |
| `amplitude_ids` | List of the Amplitude Ids of users to delete. |

The `amplitude_ids` key contains these fields:

| <div class="big-column">Name</div> | Description |
| --- | --- |
| `amplitude_id` | The Amplitude ID of the user to be deleted. |
| `requester` | The person who requested the Amplitude ID to be deleted. |
| `requested_on_day` | The day this deletion was requested. |

## Status codes

|Code|Message|
|----|---------|
|200|Success|
|400| Bad Request|

--8<-- "includes/abbreviations.md"