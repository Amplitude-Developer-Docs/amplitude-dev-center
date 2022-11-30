## Authorization

This API uses [basic authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization#basic_authentication), using the API key and secret key for your project. Pass base64-encoded credentials in the request header like `{{api-key}}:{{secret-key}}`. `api-key` replaces username, and `secret-key` replaces the password. Encoded credentials look like this `bXlvcmdrZXk6bXlvcmdzZWNyZXQ=`.

See [Find your Amplitude Project API Credentials](../find-api-credentials.md) for help locating your credentials. 