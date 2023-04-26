---
title: Cookies and Consent Management
description: Learn more about how cookies and consent management is done in Amplitude.
status: new
---

This guide covers functional and technical information on how Amplitude works with cookies, local storage, opt-in/opt-out options and consent management (including CNIL specificities for France).  

!!!warning "Compatibility with Typescript/Browser SDK"

    The guide covers the behavior with the legacy JavaScript SDK that is the most used client browser SDK with Amplitude Analytics for our current customers; new customers will have to use the new TypeScript SDK. This guide will be updated to apply to the new TypeScript SDK on its Analytics-Browser package which should be used for new browser implementations as well as the migration target from legacy Javascript SDK implementations. However, most of the information presented in this document also applies to the way the TypeScript SDK behaves, including names of options, constants and functionalities explained.

## Using Amplitude Cookies

A **“Cookie”** is a piece of data from a website that is stored within a web browser that the website can retrieve at a later time to access the data that is there stored for functional and/or technical purposes. Upon initialization, the Amplitude SDK will create a cookie that begins with the prefix **amp_** and ends with this first six digits of your project API key; this prefix can be customized using the constant **“COOKIE_PREFIX”** (the constant value can be found in [the constants definition file](https://github.com/amplitude/Amplitude-JavaScript/blob/35e2dd3f342614cfb27fcb6455e361595ae222d7/src/constants.js#L36) and the cookie key definition detail can be found [in this link](https://github.com/amplitude/Amplitude-JavaScript/blob/03c0a890d578db1ada383cf1e6195d71275bac44/src/amplitude-client.js#L121)). For instance, if  the default value for the prefix is used and you do: 

```js
amplitude.getInstance().init("a2dbce0e18dfe5f8e...") 
```

, that would create a cookie with the key **amp_a2dbce**.

![Image showing the cookies that are created by Amplitude.](../../../assets/images/cookies/amplitudeCookies.png)

In previous versions of the SDK, the key for this cookie could be customized upon initialization using the initialization option **“cookieName”**. This has been deprecated in the latest versions for our SDK, but it may happen that, if using old SDK versions, the cookie name will differ from the indicated standard name; that will mean it was customized using that option.

It could be the case where another cookie appears with the key **“amplitude_cookie_test”** followed by a suffix of a random base64 string (the definition detail can be found [in this link](https://github.com/amplitude/Amplitude-JavaScript/blob/main/src/base-cookie.js#L97)); this cookie is used to test whether the user has cookies enabled, and should be automatically removed when the test finishes. However,  if the browser encounters issues, it might not get deleted 100% of the time and therefore, it could remain in the cookie list although it won’t be used for anything else. This key can be customized by using the constant **“COOKIE_TEST_PREFIX”** (its definition belongs to the [constants definition file](https://github.com/amplitude/Amplitude-JavaScript/blob/35e2dd3f342614cfb27fcb6455e361595ae222d7/src/constants.js#L35))

### Stored data in the cookie

The cookie is used to keep track of a few bits of metadata for the SDK:

- **deviceId**: A randomly generated string
- **userId**: Upon user log-in, if the customer’s instrumentation sends us this value, it is stored in the cookie; our customers typically set this to uniquely identify their users (non-anonymous navigation). It is stored encoded using Base64.
- **optOut**: A flag to opt this device out of amplitude tracking. If this flag is set, no additional information will be stored for the user. 
- **sessionId**: A randomly generated string for each session
- **lastEventTime**: Time of the last event, used to determine when to expire and create a new session Id
- **eventId**: An incrementing sequence of identifiers used to distinguish events
- **identifyId**: An incrementing sequence of identifiers used to distinguish identify calls
- **sequenceNumber**: A sequence number used to order events and identifies and properly sequence them

When our JS SDK loads, we check that cookie to see whether it has an amplitude device_id in it (ie user is a returning user and the device_id was generated in a previous visit). If we find one, then we use it; if we don’t find one (either because it is a new user or the user recently cleared cookies), then the JS SDK randomly generates a new one, and also saves that new one to the cookie.

### Cookie size

The cookie size can vary, going from a minimum of 60 bytes to some 120 bytes. Knowing we can have 2 of them (amp_* & amp_*.organisation.domain), you can assume a 120 bytes as a good average size value for Amplitude cookies **per project API key** that is being used in the product to send data to Amplitude.

### Expiration time

The Amplitude SDK has a **cookieExpiration** option to allow customers to set the number of days a cookie will live. Before the version 7.0, this was defaulted to 10 years; now it is **defaulted to 1 year** as of the current version. However, most browsers will by default limit the lifetime of cookies set using document.cookie from 1 to 7 days.

### Removing Amplitude cookies

To programmatically remove the Amplitude cookie, use the method **“clearStorage()”** on the JS SDK which will clear all the cookies, therefore deleting the metadata that was stored there.

### Deprecated cookies

The next cookie keys have been deprecated in the latest SDK versions:

- **amplitude_id_”API key”.your_org_domain**: In previous versions of the Amplitude JS SDK, the cookie key was set by default to “amplitude_id” so it may be it still appears in some projects that are using a SDK version prior to 6.0.0. In that case the cookie will be set under the key “amplitude_id_#Project API Key”.organisation.domain”. 

![Image showing the cookies that are created by Amplitude.](../../../assets/images/cookies/deprecatedCookies.png)

- **amplitude_test.your_org_domain**: Used by Amplitude JS SDK to test more thoroughly whether or not cookies are available. Currently the key is used as “amplitude_cookie_test” but as mentioned above, this cookie should be automatically removed after the test to confirm cookie availability is finished.
