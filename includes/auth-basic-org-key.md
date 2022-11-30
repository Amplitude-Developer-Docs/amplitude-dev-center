## Authorization

This API uses [basic authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization#basic_authentication), using an org-level API key and secret key instead of a project-level API key.
To request an org-level API key, submit a ticket to the support team at support.amplitude.com.

Pass base64-encoded credentials in the request header like `{{org-api-key}}:{{org-secret_key}}`. `org-api-key` replaces username, and `org-secret-key` replaces the password. Encoded credentials look like this `bXlvcmdrZXk6bXlvcmdzZWNyZXQ=`.

See [Find your Amplitude Project API Credentials](../find-api-credentials.md) for help locating your credentials. 