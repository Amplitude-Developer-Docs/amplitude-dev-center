---
title: Use Domain Proxy to Relay Events
description:  
---

Get total control over the data that you send to Amplitude by using a domain proxy to relay requests.
 This guide explains the basics of setting up a self-owned proxy service and using it with Amplitude SDKs.

!!! info
    This guide focuses on building a proxy to Amplitude’s HTTP API (`api.amplitude.com`). This configuration sends events directly from the proxy service to Amplitude.
     In larger organizations, talk with your developer operations and information security teams before choosing and deploying a proxy server.

## Introduction

A proxy service relays requests between a client and another service, acting as an intermediary step.
 Building a proxy service for your Amplitude org lets you proxy requests to the Amplitude API through your own domain.
 For example, you can send requests on client browsers to `your.domain.com/amplitude` instead of directly to `api.amplitude.com`. A proxy service relays the requests to the Amplitude platform.

You can integrate proxy services into existing API endpoints or built as standalone services. Many cloud providers have tools for easy, flexible, and reliable configuration of proxy services.

Sending data through a self-owned proxy service gives you better control of the data you collect and send to the Amplitude platform. Using a proxy service can have these benefits:

- Ability to toggle event flow to Amplitude.
- Self-owned audit logging of data.
- Easier debugging, filtering, and blocking of events.
- Anonymizing end-users. For example, remove originating IP address, location, userID, and more.

## Proxy Services and the JavaScript Snippet

Although it's possible to build a proxy that supports the loading of the Amplitude JavaScript Snippet, we recommend that you bundle Amplitude into your production builds using the [npm distribution](https://www.npmjs.com/package/amplitude-js).

## Available services on major cloud providers

Most major cloud providers have their own services for easy development and deployment of scalable APIs. You can also use API services to set up outbound traffic to Amplitude.
 If you use a cloud provider to deploy API services, refer to their documentation to set up a proxy service and for their quickstart guides:

- Amazon Web Services: [API Gateway](https://aws.amazon.com/api-gateway/resources/)
- Microsoft Azure: [API Management](https://docs.microsoft.com/en-us/azure/api-management/api-management-key-concepts)
- Google Cloud: [API Gateway](https://cloud.google.com/api-gateway/docs)

## Build a proxy solution

The example in this guide uses [NGINX](https://nginx.org/en/) to build a proxy server. NGINX is an open-source solution to building a proxy.
 If you already have a Node API server, you could consider using the [Node SDK](https://github.com/amplitude/Amplitude-Node/) to pass events from your own endpoint to the main Amplitude event servers.

### Set up an NGINX server

First, install NGINX for local development. Then, configure NGINX to proxy requests on a particular URL to Amplitude.
 Here is an example `nginx.conf` file that proxies requests from the `/amplitude` route to `api.amplitude.com`:

``` title="nginx.conf"
worker_processes  1;

error_log  logs/error.log;
error_log  logs/error.log  notice;
error_log  logs/error.log  info;

events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;

    keepalive_timeout  65;

    server {
        listen       8080;
        server_name  localhost;

        location /amplitude {
          proxy_pass https://api.amplitude.com/;
        }
    }
}
```

### Validation and deployment

After you create the configuration file, you can start and test your proxy. Using the Amplitude HTTP API, send the requests to your endpoint instead of Amplitude's endpoint.

!!!info
    The HTTP API uses a slightly different endpoint from our SDKs, so to test, you need to temporarily set `proxy_pass` to `https://api.amplitude.com/2/httpapi/`.

Here is an example curl command that would test your reverse proxy:

```curl
curl --data 'api_key=API_Key' --data-urlencode 'event=[{"user_id":"12345", "event_type":"test_proxy_event", "time":1396381378123}]' http://localhost:8080/amplitude/
```

This call should return a `200` response code. In the web app, confirm that Amplitude received the event using User Lookup.
 After confirming that the proxy works locally, you can deploy the configuration to a production server. See the [NGINX deployment guides](https://docs.nginx.com/nginx/deployment-guides/) for more help.

### Configuring the SDKs to work with alternate endpoints

After the proxy is working correctly, configure the SDK. Amplitude’s SDKs are open source code that you can change. The SDKs already have built-in options to send events to your defined server endpoint.

!!!note
    The SDK's don't point at the same API endpoint as the HTTP API V2, but rather a special endpoint for its custom payloads. Send them instead to `https://api.amplitude.com/`.

- JavaScript(Web): Set the `apiEndpoint` option when initializing the SDK.
- iOS/Android: Use the `setServerUrl` function to configure the server URL.

Now you can send events through your proxy and see them logged in Amplitude.
