## Authorization

This API doesn't use authorization, but uses your API key. How you pass it depends on whether you're passing data in the URL or the body of your request. 

- For URL parameters: pass the API key in the URL of the request like `https://api2.amplitude.com/endpoint?api_key={{api-key}}` or in the body
- For body parameters: pass the API key in the body of the request like this: 
    ```bash
    curl --location --request POST 'https://api2.amplitude.com/identify' --header 'Content-Type: application/x-www-form-urlencoded' --data-urlencode 'api_key=<API-KEY>'
    ```


See [Find your Amplitude Project API Credentials](../find-api-credentials.md) for help locating your credentials. 