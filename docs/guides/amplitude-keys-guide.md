---
title: Amplitude Keys and Tokens Guide
description: Learn more about the different kinds of API keys, deployment keys, secret keys, and tokens in Amplitude.
status: new
---

There are several different kinds of keys and tokens across Amplitude's products. This guide walks through what each is for, the basics you need to know about using them, and how to find them. 

## Keys overview

This table gives a brief overview of each kind of key. 

| Product |       Key |       Public | Can it be rotated? |
|---|---|---|---|
| Analytics | Project API Key | :white_check_mark:{ title="This key can be rotated" } <span class="screen-reader-only">Yes</span>| :x:{ title="This key can't be rotated" } <span class="screen-reader-only">No</span> |
| Analytics | Project Secret Key | :x:{ title="This key can't be rotated" }<span class="screen-reader-only">No</span> | Contact Support |
| Experiment | Deployment Key (client-side) | :white_check_mark:{ title="This key can be rotated" }<span class="screen-reader-only">Yes</span> | :white_check_mark:{ title="This key can be rotated" } <span class="screen-reader-only">Yes</span> |
| Experiment | Deployment Key (server-side) | :x:{ title="This key can't be rotated" } <span class="screen-reader-only">No</span> | :white_check_mark:{ title="This key can be rotated" } <span class="screen-reader-only">Yes</span> |
| Experiment | Management API Key | :x:{ title="This key can't be rotated" } <span class="screen-reader-only">No</span> | :white_check_mark:{ title="This key can be rotated" } <span class="screen-reader-only">Yes</span> |
| Data       | API Token | :x:{ title="This key can't be rotated" } <span class="screen-reader-only">No</span> | :white_check_mark:{ title="This key can be rotated" } <span class="screen-reader-only">Yes</span>|
| Other| SCIM Key| :x:{ title="This key can't be rotated" } <span class="screen-reader-only">No</span> | :white_check_mark:{ title="This key can be rotated" } <span class="screen-reader-only">Yes</span>|
| Other| Org-level keys| :x:{ title="This key can't be rotated" } <span class="screen-reader-only">No</span> | Contact Support|

## Analytics keys

Analytics keys are automatically created for each project, and can only be used to manipulate data within the project the key belongs to. 

To view your project's API Key and Secret Key, see [Find your Amplitude Project API Credentials](../../analytics/find-api-credentials/).

### API Key

To collect data from browsers and mobile applications, Amplitude must be able to identify which project the requests should go to. Amplitude does this with an *API Key* that's associated with a single project. 

Files sent to a browser and code distributed as part of a mobile app are shared with end users, so the API Key can't be truly secret. 

Because there's no way to keep the API Key secret, the scope of what the key can be used for is limited to the bare minimum needed to ingest data into Amplitude. This isn't unique to Amplitude: all services that support ingesting data from browsers or mobile apps have a similar key, though what they call it may vary.

!!!tip "API Keys are public"

    Because your API Key is already public, you don't have to worry about it being leaked or compromised.

### Secret Key

Projects also have a *Secret Key*. These are used in conjunction with the project API Key to manage your account.

!!!warning "Secret Keys are private"

    Keep the Secret Key private. If your Secret Key has been compromised, contact Amplitude Support.

## Data keys

Use API Tokens to authenticate to Amplitude Data without logging in with your email address and a password. Tokens authorize applications to enjoy the same roles and permissions granted to you when you log in directly.

!!!warning "Data API Tokens are private"

    Keep your token secret. Your token has global permissions on your account.

You can create and revoke these as needed by navigating to **Data** > **Settings** > **API Tokens**. 

## Experiment keys

### Deployment Key

When you [create a deployment](../../experiment/guides/getting-started/create-a-deployment), Experiment creates a key for that deployment. Whether the key is public or private depends on whether the deployment is client-side or server-side.

!!!tip "Client-side Deployment Keys are public"

    These deployments run on a client device, such as a web browser or mobile app. The API key associated with client deployments can be viewed publicly and should be used in client-side SDKs. These keys are prepended with `client-`. Because this key is already public, you don't have to worry about it being compromised.

!!!warning "Server-side Deployment Keys are private"

    These deployments run on a server you control, such as a web server or batch processing system. The API key associated with server deployments should be kept secret and are for use in server-side SDKs. These keys are prepended with `server-`. If a server-side key is compromised, create a new deployment key, replace the old key with the new key on all flags and experiments, and delete the old key.

Manage your Deployment keys in **Experiment** > **Deployments**. 

### Management API Key 

!!!beta "This API is currently in Beta"

Management API keys are used to authenticate requests made to manage flags and experiments. These keys are different from the deployment keys used to fetch flag variants. 

!!!warning "Management API Keys are private"

    Keep your Management API key secret. If your key has been compromised, create a new key and delete the old key.

Create and manage these keys via the **Management API link** in the Experiment sidebar.

## Other keys 

### Org-level API Key

Some APIs require an org-level API Key and Secret Key. You must request these from Amplitude Support. 

!!!warning "Org-level keys are private"

    Keep org-level keys private. They have access to your entire Amplitude organization. If they have been compromised, contact Amplitude Support.

### SCIM Key

The SCIM key is used with the [SCIM API](../../analytics/apis/scim-api). SCIM features are available in accounts with an Enterprise plan.

!!!warning "SCIM tokens are secret"

    Keep your token secret. It has global user management permissions on your account. If your key has been compromised, you can rotate it yourself in Amplitude.

You can learn more about provisioning and rotating SCIM keys in the [Help Center](https://help.amplitude.com/hc/en-us/articles/360058399851#enable-scim-provisioning-in-amplitude).