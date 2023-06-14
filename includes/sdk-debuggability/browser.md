#### How to debug

Debugging in a browser can help you identify problems related to your code's implementation, as well as potential issues within the SDKs you're using. Here's a basic guide on how to use the browser's built-in Developer Tools (DevTools) for debugging.

##### Console

You can find JavaScript errors under **Inspect > Console**, which might have the details about the line of code and file that caused the problem. The console also allows you to execute JavaScript code in real-time.

* Enable debug mode by following these [instructions](./#debug-mode). Then With the default logger, extra function context information will be output to the developer console when any SDK public method is invoked, which can be helpful for debugging.

* If you're able to send the event successfully after entering `amplitude.init(API_KEY, 'USER_ID')` in the browser console, it indicates that your `amplitude.init` call might not have been triggered. We support deferred initialization, so the events will be dispatched after the initialization call. Therefore, please check your implementation.

##### Network Request

Use the **Inspect > Network** tab to view all network requests made by your page. Search for the Amplitude request.
[SDK DEBUGGABILITY NETWORK REQUEST](../../../assets/images/sdk-debuggability-network-request.png)

Please check the response code and ensure that the response payload is as expected.

##### Instrumentation Explorer/Chrome Extension

The Amplitude Instrumentation Explorer is an extension available in the Google Chrome Web Store. The extension captures each Amplitude event you trigger and displays it in the extension popup. It's important to ensure that the event has been sent out successfully and to check the context in the event payload.

Check [here](../../debugger/#step-2-analyze-the-event-stream) for more details.

#### Common Issues

The following are common issues specific to Browser SDK. For additional general common issues, please refer to [this document](../../sdk-debuggability/).

##### AD Blocker

`Ad Blocker` might lead to event dropping. The following errors indicate that the tracking has been affected by `Ad Blocker`. When loading via a script tag, an error may appear in the console/network tab while loading the SDK script. When loaded with npm package, there could be errors in the network tab when trying to send events to the server. The errors might vary depending on the browser.

* Chrome (Ubuntu, MacOS)
Console: error net::ERR_BLOCKED_BY_CLIENT
Network: status (blocked:other)
* Firefox (Ubuntu)
Console: error text doesn’t contain any blocking-specific info
Network: Transferred column contains name of plugin Blocked by uBlock Origin
* Safari (MacOS)
Console: error contains text Conent blocker prevented frame ... from loading a resource from ...
Network: it looks like blocked requests are not listed. Not sure if it’s possible to show them.

We are recomend to using Proxy server to avoid this situation.

##### Cookies related

Here is the [information](./#cookie-management) SDK store in the cookies. This means that client behavior, like disabling cookies or using a private browser/window/tab, will affect the persistence of these saved values in the cookies. So, if these values are not persistent or are not increasing by one, that could possibly be the reason.

##### CORS

If the issue is like the following, it means the issue is related to Cross-Origin Resource Sharing (CORS), a security measure implemented by browsers to restrict how resources on a web page can be requested from a different domain. When you used `setServerURL`, it might have this issue.

```Access to fetch at 'xxx' from origin 'xxx' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.```

Cross-origin resource sharing (CORS) prevents a malicious site from reading another site's data without permission. The error message suggests that the server you're trying to access is not allowing your origin to access the requested resource. This is due to the lack of the `Access-Control-Allow-Origin` header in the server's response.

* If you have control over the server, you can "Update the server's CORS policy". Add the `Access-Control-Allow-Origin` header to the server's responses. This would allow your origin to make requests. The value of `Access-Control-Allow-Origin` can be * to allow all origins, or it can be the specific URL of your web page.

* If you don't have control over the server, you can set up a proxy server that adds the necessary CORS headers. The web page makes requests to the proxy, which then makes requests to the actual server. The proxy adds the `Access-Control-Allow-Origin` header to the response before sending it back to the web page.

If you have set up an API proxy and run into configuration issues related to that on a platform you’ve selected, that’s no longer an SDK issue but an integration issue between your application and the service provider.

##### Event Dropping When Closes the Browser or Leaves the Page

If you're using standard network requests, scheduled requests might be dropped if the user closes the browser or leaves the page. To solve this issue, you might want to set the transport to `beacon` during initialization or set the transport to `beacon` upon page exit. However, because `sendBeacon` will send events in the background, it doesn't return server responses and thus cannot retry on failure responses like 4xx or 5xx errors. Also, note that only scheduled requests will be sent out in the background with a `sendBeacon` configuration.

Please refer to the [sendBeacon](./#use-sendbeacon) section for more instructions.