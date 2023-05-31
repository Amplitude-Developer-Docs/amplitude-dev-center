---
title: Google Tag Manager Template - Amplitude Analytics Browser SDK
description: Collect data with ease using Amplitude Analytics Browser SDK GTM template - the official client-side Google Tag Manager template for seamless data collection.
---

This is the client-side Google Tag Manager Template for Amplitude Analytics. The tag uses the [Amplitude Marketing Analytics SDK](../../sdks/marketing-analytics-browser/) for data collection. However, due to inherent limitations of GTM, certain features, such as plugins, are not available in this GTM template.

!!!info Resources
    [:simple-googletagmanager: GTM Template Gallery](https://tagmanager.google.com/gallery/#/owners/amplitude/templates/amplitude-browser-sdk-gtm-template) · [:material-github: GitHub](https://github.com/amplitude/amplitude-browser-sdk-gtm-template)

## Workflow

### Container Setup

If you start from zero, you need to setup your conatiner first. This Amplitude Analytics Browser SDK tag template can be found in **Web** target platorm which for use on descktop and mobile web pages.

### Add Templage

Create a new tag template by searching the gallery. Choose Amplitude Analytics Browser SDK and click `add` button.

### Create Tags

Create tags for your amplitude browser SDK tracking. Click the `New` button to create your new tags.

#### Tag Configuration

We provided a list of tag type for amplitude tracking. Some times you are also reqruied to create a Custom HTML tag to do customization, like cross domain tracking or others. In order to access `amplitude` successfully, please make sure that the `init` tag is loaded before this Custome HTML tag, [time sequence](https://support.google.com/tagmanager/answer/6238868) might be helpful in this case. Please check [this section](./#access-amplitude-instance) for accessing amplitude instance. Also notice that  We are not recomended to use script loading to init amplitude through Cusom HTML tag.

#### API Key

Copy your amplitude API Key in the API Key field. For EU recidency, please make your API Key is under analytics.eu.amplitude.com. See [this page](https://tagmanager.google.com/?authuser=0#/container/accounts/6053924196/containers/91603214/workspaces/62/tags:~:text=project%20settings.%20See-,this%20page,-for%20more%20information) for more details. 

#### Instance Name

If you want to run more than one Amplitude instance (with different API keys or different initialization options), you can provide an Instance Name here. Make sure that all the Amplitude tags that should reference this instance have the Instance Name configured in the tag settings.

#### Access amplitude instance 

If you have a Custome HTML tag, you might need to acccess `amplitude` instance in your script tag. 

- to access `amplitude` instance with defualt instance name 

```js
// for the underlining marketing-analytics-browser-gtm version greater than v0.5.4
amplitudeGTM.getDeviceId();

// for the underlining marketing-analytics-browser
amplitude.getDeviceId();
```

- to access `amplitude` instance with customized instance name

```js
// for the underlining using marketing-analytics-browser-gtm
amplitudeGTM._iq["yourInstanceName"].getDeviceId();

// for the underlining musing arketing-analytics-browser
amplitude._iq["yourInstanceName"].getDeviceId();
```

#### Tag Types

Please check [here](./) to see all avaliable tag taps in Amplitude Analytics Browser SDK GTM.

note!!!
    `init` tag type are seprate from other api methods. You must to make sure you create a tag for `init` tag type. Otherwise, none of you amplitude tag will be fired.

#### Triggering

All tags fire based on events. Anytime Google Tag Manager registers an event, event triggers are evaluated and tags are fired accordingly. Please check [here](https://support.google.com/tagmanager/topic/7679108?sjid=4311393792871502449-NA) for avaialbe triggers in GTM. 

note!!!
    Tipically `init` tag is the first thing you need to fire on the page. It's common to fire the `init` tag using `All Pages` or `Initialization - All Pages` triggers. You can also defer the `init` tag until you receive a signal and fire it using customized triggers, such as a consent grant. But notice that all other tags will wait for the `init` tag to fire before they can be sent to Amplitude. 

### Tag Types

#### init

##### EU Data Residency

For EU data residency, you must set up your project inside Amplitude EU and use the API key from Amplitude EU. You can configure the server zone by checking the checkbox **EU Data Residency** under **Tag Configuration** -> **Initialization** of the `init` tag. The initialization section only shows up when tag type is set to init. 

##### Enable attribution tracking

Check this box to enable additional configuration options for attribution. [More details](https://www.docs.developers.amplitude.com/data/sdks/marketing-analytics-browser/#configuration).

#### User ID

If you want, you can initialize the instance with a User ID, if already available. You can also use the setUserId command to initialize the User ID at a later time. Check [here] for more details.

##### Configurations

- `Use default values`, then the initialization is done with the default values.
--8<-- "includes/sdk-ts-browser/shared-configurations.md"

- Select a {{GTM variable}} from the list, which needs to return an object that has the key-value pairs you want to configure the instance with.

- Set configuration manually in the tag itself, by selecting the corresponding option. The following configurations are the available ones with the value type in GTM template. 

???config "Configuration Options"
    | <div class="big-column">Name</div>  | Description | Default Value |
    | --- | --- | --- |
   |`flushIntervalMillis`| `number`. The amount of time waiting to upload the event to the server in millionseconds. | 1 second.|
    |`flushQueueSize`| `number`. The maximum number of events that can be stored locally before forcing an upload.  | 30 events. |
    |`flushMaxRetries`| `number`. The max retry limits. | 5 times.|
    |`logLevel`| `LogLevel.None` or `LogLevel.Error` or `LogLevel.Warn` or `LogLevel.Verbose` or `LogLevel.Debug`. The log level. | `LogLevel.Warn` |
    |`minIdLength`| `number`. Overrides the minimum length of `user_id` & `device_id` fields. | `5` |
    |`optOut`| `boolean`. If `optOut` is `true`, the event isn't sent to Amplitude's servers. | `false` |
    |`serverUrl`| `string`. The server url events upload to. | `https://api2.amplitude.com/2/httpapi` | 
    |`useBatch`| `boolean`. When `true`, uses the Batch API instead of the HTTP V2 API.| `false` |
    |`appVersion`| `string`. The current version of your application. For example: "1.0.0" | `null` |
    |`deviceId`| `string`. A device-specific identifier. | `UUID()` |
    |`cookieExpiration`| `number`. The days when the cookie expires. | 365 days. |
    |`cookieSameSite`| `string`. The SameSite attribute of the Set-Cookie HTTP response header. | `LAX` |
    |`cookieSecure`| `boolean`. If restrict access to cookies or not. A cookie with the Secure attribute is only sent to the server with an encrypted request over the HTTPS protocol. | `false` |
    |`disableCookies`| `boolean`. If disable cookies or not. If cookies is disable, using LocalStorage or MemoryStorage. | The cookies is enable by default. |
    |`domain`| `string`. Set the top level domain. | `null` |
    |`partnerId`| `string`. The partner Id value. Amplitude requires the customer who built an event ingestion integration to add the partner identifier to `partner_id`. | `null` |
    |`sessionTimeout`| `number`. How long one session expire. | `30` minutes. |
    |`userId`| `number`. ID for the user. Must have a minimum length of 5 characters unless overridden with the `min_user_length` option. | `undefined` |
    |`trackingOptions`| `TrackingOptions`. Please check the `Optional tracking` section for more tracking options configuration. | Enable all tracking options by default. |
    |`transport`| `TransportType.XHR` or `TransportType.SendBeacon` or `TransportType.Fetch`. Set the transport type. | `TransportType.Fetch` |

##### Attribution Options

???config "Configuration Options"
    | <div class="big-column">Name</div>  | Description | Default Value |
    | --- | --- | --- |
    |`Exclude Referrers`| `string` or `string1, string2`. The referrer_domain you want to exclude the attribution tracking. If you exclude a referring_domain, it won't fire any web attribution tracking. That means for the event fired from the exclude referring_domain won't have any web attribution user properties, it will maps to `(none)` in chart analysis. | `[]` | 
    | `Reset the session on new campaign` | `boolean`. Enable this will broke the current session and create a new session if there has a new campaign is deteted. [More details](https://www.docs.developers.amplitude.com/data/sdks/marketing-analytics-browser/#reset-the-session-on-a-new-campaign). | `false`|
    | `Initial empty value` | `string`. Customize the initial empty value for attribution related user properties to any string value. | `EMPTY`|
    | `Page View Tracking` | `check box`. Whether enable the page view tracking. |  Not track page view tracking by default.|
    | `Page View trigger` | `Page Loads` or `Only with Attribution changes` or a `Variable Configuration`.  The trigger of `Page View` event. A variable configuration can be either build-in or customized that returns a function with a true or false return value. If the function returns true, then Page Views are tracked automatically, if it returns false then Page Views are not tracked. [More details](https://www.docs.developers.amplitude.com/data/sdks/marketing-analytics-browser/#page-view). | `Page Loads` if enable page view tracking. |
    | `Track history events automatically` | `Do not track history change` or `All history changes` or `Only when page path changes`. Whether to track history events. This is for tracking page view on SPA. [More details](https://www.docs.developers.amplitude.com/data/sdks/marketing-analytics-browser/#single-page-app-page-view-tracking). | `Do not track history change` by default. |

#### track

#### identify

Add individual user property operations each as its own row in the table. You can add as many as you like, but note that you can only include a specific User Property in a single operation. The operations are executed in order. More information.

#### setGroup 

| Name</div>  | Description | Default Value |
| --- | --- | --- |
| `Group Type` | `string`. The group type| |
| `Group Name(s)` | `string`. The group name(s) under the group You can add a single group name or a comma-separated list (e.g. 2,12,24) of group names.| |

Check here for [more details](/sdks/typescript-browser/#user-groups)

#### groupIdentify

#### revenue

???config "revenue configuration"
    | <div class="big-column">Name</div>  | Description | Default Value |
    | --- | --- | --- |
    |`product_id` | Required. `string`. An identifier for the product. Amplitude recommend something like the Google Play Store product ID. | Empty string. |
    |`quantity` | Required. `number`. The quantity of products purchased. For version after marketing-analytics-browser-gtm 0.5.4 , we auto assign `revenue = quantity * price`. &&&&&& | `1` |
    |`price` | Required. `number`. The price of the products purchased, and this can be negative. Note: revenue = quantity* price. | `null` |
    |`revenue_type` | Optional, but required for revenue verification. `string`. The revenue type (for example, tax, refund, income). | `null` |
    |`event properties`| Optional. `{ [key: string]: any }`. An object of event properties to include in the revenue event. | `null` |

#### flush

The flush method triggers the client to send buffered events immediately. [More Details](/docs/data/sdks/typescript-browser/#flush-the-event-buffer). You don't need to manuelly trigger the `flush` tag type, it will be auto triggered depended on `flushIntervalMillis` and `flushQueueSize` which has been triggered first. If you want to prevent event dropping caused by closing a browser, you can use `sendBeacon` transport instead  or lower down the flushQueueSize and flushIntervalMillis based on your events traffic load to make sure those event not get stucked in the client side.

### setUserId

If you want to reset the userId and deviceId after logout, please check `reset` tag type instead.

| Name | Description | Default Value |
| --- | --- | --- |
| `User ID`| `empty` or `string`. Set the userId. Leave empty if you want to set the userId to undefined. | `empty` |

### setDeviceId

If you want to reset the userId and deviceId after logout, please check `reset` tag type instead.

| Name | Description | Default Value |
| --- | --- | --- |
| `Device ID`| `string`. Set deviceId for the current user. Amplitude will assign an unique identifier for the deviceId by default. For the cross domain case, Amplitue will auto assign the deviceId from the url. This is not recommended unless you know what you are doing. [More Details](https://www.docs.developers.amplitude.com/data/sdks/typescript-browser/#custom-device-id) | `string` |

### setSessionId

Session logic is auto handled by Amplitude. You might need to set the sessionId to `-1` if you want to out of session control. 
Please make sure the value is in milliseconds since epoch (Unix Timestamp) or -1.

[Learn More](./sdks/typescript-browser/#custom-session-id)

### reset 

`reset` have 2 operations which include setUserId(undefined) and setDeviceId(UUID())
[Learn More](/sdks/typescript-browser/#reset-when-user-logs-out)

### setOptOut

Check the `Opt current user out of tracking` checkbox to opt user out of tracking. [Learn More](sdks/typescript-browser/#opt-users-out-of-tracking)

## Others

This video tutorial walks through the implementation basics. 

<script src="https://fast.wistia.com/embed/medias/n337njhoot.jsonp" async></script><script src="https://fast.wistia.com/assets/external/E-v1.js" async></script><div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div class="wistia_embed wistia_async_n337njhoot videoFoam=true" style="height:100%;position:relative;width:100%"><div class="wistia_swatch" style="height:100%;left:0;opacity:0;overflow:hidden;position:absolute;top:0;transition:opacity 200ms;width:100%;"><img src="https://fast.wistia.com/embed/medias/n337njhoot/swatch" style="filter:blur(5px);height:100%;object-fit:contain;width:100%;" alt="" aria-hidden="true" onload="this.parentNode.style.opacity=1;" /></div></div></div></div>