#### How to debug

Debugging in a browser can help you identify the issues of problems related to your code's implementation as well as any potential issue within the SDKs you're using. Here's a basic guide on how to use the browser's built-in Developer Tools (DevTools) for debugging.

##### Console

You can find JavaScript errors under **Inspect > Console**, including details about the line of code and file that caused the problem. The console also allows you to run JavaScript code in real-time. 

* Enable the debug mode by following [the instruction](./#debug-mode). With the default logger, extra function context information will be output to the developer console when invoking any SDK public method. It will be helpful to debug.

* If you are able to send the event successfully, after you input `amplitude.init(API_KEY, 'USER_ID')` in the browser console, that means your `amplitude.init` call has not been triggered. We support defer initialization, the events will be sent out after the initialization call. So please check your implementation. 

##### Network Request

Use the **Inspect > Network** tab to view all the network requests made by your page. Search the amplitude request. 
[SDK DEBUGGABILITY NETWORK REQUEST](../../../assets/images/sdk-debuggability-network-request.png)

Please check the response code and also make sure the response payload is as expected.

##### Instrumentation Explorer/Chrome Extension

The Amplitude Instrumentation Explorer is an extension in the Google Chrome Web Store that helps you examine and debug your Amplitude Browser SDK instrumentation just by interacting with your product. It captures each Amplitude event you trigger and display it in the extension popup.It's important to make sure the event has been sent out successfully and to check the context in the event payload.

Check [here](../data/debugger/#step-2-analyze-the-event-stream) for more details.

#### Common Issues

The following are common issues specific to Browser SDK. Please refer to [this document](../../sdk-debuggability/) for additional common issues in general.

##### AD Blocker

`AD Blocker` might lead event dropping. The following are the errors indicate that the tracking has been effect by `AD Blocker`.
When loading via script tag, there will be an error in console/network tab loading the SDK script. When loaded with NPM, there will be errors in netwrok tab when trying to send events to the server. The errors might be different for different browser. 

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

##### Cookies

Here are the [info](./#cookie-management) we stored in the cookies. That means, the client behavior, like diable cookies, or use a privacy browser/window/tab will effect the persistency of those values has saved in cookies. So if those values are not persistent or not inceasing by one. That's possible the reason.

##### CORS

If the issue is like the following, it means the issue is related to Cross-Origin Resource Sharing (CORS), a security measure implemented by browsers to restrict how resources on a web page can be requested from a different domain. When you used `setServerURL`, it might have this issue.

```Access to fetch at 'xxx' from origin 'xxx' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.```

It prevents a malicious site from reading another site's data without permission. The error message suggests that the server you are trying to access is not allowing your origin to access the requested resource. This is due to the lack of the Access-Control-Allow-Origin header in the server's response.

1. If you control over the server, you can "Update the server's CORS policy". Add the Access-Control-Allow-Origin header to the server's responses. This would allow your origin to make requests. The value `Access-Control-Allow-Origin` can be * to allow all origins, or it can be the specific URL of your web page.

2. If they don't have control over the server, they can set up a proxy server that adds the necessary CORS headers. The web page makes requests to the proxy, which then makes requests to the actual server. The proxy adds the `Access-Control-Allow-Origin` header to the response before sending it back to the web page.

If the you have set up an API proxy and run into configuration issues related to that on a platform they’ve selected, that’s no longer an SDK issue but an integration issue between your application and the service provider. 

##### Event Dropping When Closes the Browser or Leaves the Page

If you're using standard network requests, scheduled request might be dropped if the user closes the browser or leaves the page. To solve this issue, you might either set the transport to `beacon` during initialization or set the transport to `beacon` upon page exit. However, because sendBeacon sends events in the background, it doesn't return server responses and thus cannot retry on failure responses like 4xx or 5xx errors. Also, note that only scheduled requests will be sent out in the background with a sendBeacon configuration.
Please refer to the [sendBeacon](./#use-sendbeacon) section for more instructions.