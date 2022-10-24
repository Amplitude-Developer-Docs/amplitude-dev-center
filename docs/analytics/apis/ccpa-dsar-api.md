---
title: Data Subject Access Request API
description: The California Consumer Privacy Act (CCPA) requires our customers to provide all data about an end user on request. This Data Subject Access Request (DSAR) API makes it easy to retrieve all data about a user.
---

The California Consumer Privacy Act (CCPA) requires businesses to provide all data about an end user upon request.
 This Data Subject Access Request (DSAR) API makes it easy to retrieve all data about a user.

--8<-- "includes/postman.md"

--8<-- "includes/auth-basic-org-key.md"

## API overview

To support data volume, this API works asynchronously. Getting user data happens in three steps:

1. Make a POST request, which returns a `requestId`.
2. Make a GET request using the `requestId` to check the status of the job.
3. When the job finishes, make a GET request to fetch a list of URLs from which to get the data files.

### Considerations

- You can expect about one file per month per app for which the user has data.
- Each download URL requires the same auth credentials to access.
- Because the API is asynchronous, you must poll to check the status of the request. See the Rate Limits section to help select the appropriate polling rate.

### Output

Each file is gzipped, and the contents adhere to the following rules:

- One line per event
- Each line is a JSON object
- No order guarantee

Example Output

``` json
{"amplitude_id":123456789,"app":12345,"event_time":"2020-02-15 01:00:00.123456","event_type":"first_event","server_upload_time":"2020-02-18 01:00:00.234567"}
{"amplitude_id":123456789,"app":12345,"event_time":"2020-02-15 01:00:11.345678","event_type":"second_event","server_upload_time":"2020-02-18 01:00:11.456789"}
{"amplitude_id":123456789,"app":12345,"event_time":"2020-02-15 01:02:00.123456","event_type":"third_event","server_upload_time":"2020-02-18 01:02:00.234567"}

```

### Rate limits

All DSAR endpoints share a budget of 14.4 K “cost” per hour. POST requests cost 8, and GET requests cost 1. Requests beyond this count get 429 response codes.

In general for each POST, there is typically one output file per month per project the user has events for.
 For example, if you are fetching 13 months of data for a user with data in two projects, expect about 26 files.

If you need to get data for 40 users per hour, you can spend `14400 / 40 = 360` cost per request.
 Conservatively allocating 52 GETs for output files (twice the computed amount) and 8 for the initial POST, you can poll for the status of the request `360 - 8 - 52 = 300` times.
 Given the 5 day SLA for results, this allows for checking the status every `52460 / 300 = 24` minutes over 5 days.
  A practical usage might be to have a service which runs every 30 minutes, posting 20 new requests and checking on the status of all outstanding requests.

### SLAs

- Request jobs complete within 5 days.
- Request result expires in 2 days.
- Users with more than 100k events per month aren't supported.

### Example client implementation

```python

base_url = 'https://amplitude.com/api/2/dsar/requests'
payload = {
  "amplitudeId": AMPLITUDE_ID,
  "startDate": "2019-03-01",
  "endDate": "2020-04-01"
}
r = requests.post(base_url, auth=(API_KEY, SECRET_KEY), data=payload)
request_id = r.json().get('requestId')
time.sleep(POLL_DELAY)
while (True):
    r = requests.get(f'{base_url}/{request_id}', auth=(API_KEY, SECRET_KEY))
    response = r.json()
    if response.get('status') == 'failed':
        sys.exit(1)
    if response.get('status') == 'done':
        break
    time.sleep(POLL_INTERVAL)
for url in response.get('urls'):
    r = requests.get(url, auth=(API_KEY, SECRET_KEY), allow_redirects=True)
    index = url.split('/')[-1]
    filename = f'{AMPLITUDE_ID}-{index}.gz'
    with open(f'{OUTPUT_DIR}/{filename}','wb') as f:
        f.write(r.content)
```

## Create data request

Create a request for user data.

```bash
POST /api/2/dsar/requests HTTP/1.1
Host: amplitude.com
Accept: application/json
Content-Type: application/json
Authorization: Basic {{org-api-key}}:{{org-secret_key}}
{
    "userId": 12345,
    "startDate": "2020-04-24",
    "endDate": "2022-02-20"
}
```

### Body parameter

| Name | Description |
| --- | --- |
| `userId` | Required if `amplitudeID` isn't set. The user ID of the user to request data for. |
| `amplitudeId` | Required if `userID` isn't set. Integer. The Amplitude ID of the user to request data for. |
| `startDate` | Required. Date. The start date for the data request. |
| `endDate` | Required. Date. The end date for the data request. |

### Response

When successful, the call returns a `202 Accepted` response and `requestID`. Use the `requestID` to poll the job status.

```json
{
    "requestId": 53367
}
```

## Get data request status

Poll the data request job to get its status.

```bash
GET /api/2/dsar/requests/53369 HTTP/1.1
Host: amplitude.com
Accept: application/json
Authorization: Basic {{org-api-key}}:{{org-secret_key}}
```

### Path variables

|Name|Description|
|----|-----------|
|`requestId`|Required. The request ID retrieved with the [create data request](#create-data-request) call.|

### Response body

| Name | Description |
| --- | --- |
| `requestId` | Integer. The ID of the request. |
| `userId` | String. The User Id of the user to request data for. |
| `amplitudeId` | Integer. The Amplitude ID of the user to request data for. |
| `startDate` | Date. The start date for the data request. |
| `endDate` | The end date for the data request. |
| `status` | **staging**: not started  <br>**submitted**: in progress  <br>**done**: job completed and download URLs populated  <br>**failed**: job failed, may need to retry  <br> |
| `failReason` | String. If the job failed, contains Information about the failure. |
| `urls` | Array of strings. A list of download URLs for the data. |
| `expires` | Data. The date that the output download links expire. |

## Get output files

Download a returned output file.

The download link is valid for two days. Most clients used to send API requests automatically download the data from the S3 link.
 If your API client doesn't automatically download the file from the link, access it manually using your org API key as the username and your org secret key as the password.

```bash
GET /api/2/dsar/requests/request_id/outputs/:output_id HTTP/1.1
Host: analytics.amplitude.com
Authorization: Basic {{org-api-key}}:{{org-secret_key}}
```

### Path variables

| <div class="big-column">Name</div>|Description|
|-----|-----|
|`request_id`|Required. Integer. The ID of the request. Returned with the original GET request.|
|`output_id`|Required. Integer. The ID of the output to download. An integer at the end of the URL returned in the status response after the job finishes.|

--8<-- "includes/abbreviations.md"
