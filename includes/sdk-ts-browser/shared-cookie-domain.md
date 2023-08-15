By default, the SDK assigns these cookies to the top-level domain which supports cookie storage. Cookies can be shared on multiple subdomains which allows for a seamless user experience across all subdomains.

For example, if a user logs into the website on one subdomain (`data.amplitude.com`) where the SDK is initialized. On initialization, the SDK assigns cookies to `.amplitude.com`. If the user then navigates to another subdomain (`analytics.amplitude.com`), the login information can be seamlessly shared by shared cookies.
