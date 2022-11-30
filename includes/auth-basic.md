## Authorization

This API uses [basic authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization#basic_authentication), using the API key and secret key for your project. Pass base64-encoded credentials in the request header like `{{api-key}}:{{secret-key}}`. `api-key` replaces username, and `secret-key` replaces the password. 

Your authorization header should look something like this: 

`--header 'Authorization: Basic YWhhbWwsdG9uQGFwaWdlZS5jb206bClwYXNzdzByZAo'`


See [Find your Amplitude Project API Credentials](../find-api-credentials.md) for help locating your credentials. 