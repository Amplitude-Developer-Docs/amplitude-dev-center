If your web app configures the strict Content Security Policy (CSP) for security concerns, adjust the policy to whitelist the Amplitude domains:

* When using ["Script Loader"](../sdk-quickstart/#install-the-dependency), add `https://*.amplitude.com` to `script-src`.
* Add `https://*.amplitude.com` to `connect-src`.
