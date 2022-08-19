## Authorization

This API uses Basic Auth, using an org-level API key and secret key instead of a project-level API key.
To request an org-level API key, submit a ticket to the support team at support.amplitude.com.

Pass your API key in the request header like `{{org-api-key}}:{{org-secret_key}}`. `org-api-key` replaces username, and `org-secret-key` replaces the password.

See [Find your Amplitude Project API Credentials](../find-api-credentials.md) for help locating your credentials. 