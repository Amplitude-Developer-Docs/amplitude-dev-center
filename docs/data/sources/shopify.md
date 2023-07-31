---
title: Shopify App
description: Amplitude’s app with Shopify is a smart analytics app that automates eCommerce tracking. 
---

Amplitude’s app with Shopify is a smart analytics app that automates eCommerce tracking. With Amplitude’s app, you can automatically track and ingest key e-commerce events, event properties, and user properties on a Shopify or Shopify Plus store.

### Client-side (device mode) tracking

During installation, the Amplitude Shopify App adds the code snippet to all pages (included in `theme.liquid`) on your Shopify store. The benefit of this approach is that Amplitude’s JavaScript SDK library is loaded on all pages, except for checkout.

### Server-side (cloud mode) tracking

During the Amplitude connection setup, the app adds a set of webhooks to your Shopify store. When a customer interacts with your store these changes, Shopify relays them to Amplitude server-side. The advantages to this approach are:

- 100% event capture for adds to cart, checkout steps, sales.
- Customer data (for example, email) is securely relayed server-side.
- No extra scripts on the sensitive and secure checkout pages.
- Accurate marketing attribution, even when customers use ad blockers or opt out of cookies.
- More reliable and trustworthy than client-side events because it represents final, concluded transactions and states within Shopify.

## Considerations

- The Amplitude app is free to install.
- You need an Amplitude Starter, Growth, or Enterprise plan to start sending data from your Shopify store.
- The Shopify App aims to solve general use cases for most Shopify stores. Amplitude has designed a generalized default taxonomy to include events and properties that most Shopify stores want to track. 
- Amplitude recommends leveraging the Amplitude SDKs or API along with this app if your Shopify Store has a high degree of in-built functionality or if you require instrumenting a lot of custom events outside the taxonomy list. 
- All events sent by the Shopify app have the pre-header `[Shopify]` to help distinguish them from custom events.
- Using Govern, you can change the display name and description for events, event properties, and user properties. You can also block, delete or filter out events and user properties.
- Using [Govern](https://help.amplitude.com/hc/en-us/articles/360043750992-Govern-Manage-your-Amplitude-data-at-scale), enables you to manage event types, properties, and user properties from a single interface.
- The Amplitude App doesn't interact with other third-party Shopify apps.
- If you have more than one Shopify store, you can use the same project and API key all them. Or, you can use a separate project for each store. If you use separate projects and you want to analyze or generate a holistic view of how your users interact with your entire product portfolio, you need to purchase Amplitude’s [Portfolio add-on](https://help.amplitude.com/hc/en-us/articles/360002750712-Portfolio-Conduct-cross-project-analysis-in-Amplitude).

## Key limitations

- Each Shopify store uses a particular theme to shape the online store experience for merchants and their customers. Currently Amplitude's Shopify App only installs this client-side snippet code to every existing theme in a store. If you add a new theme after app installation, the Amplitude code snippet isn't added to the new theme and certain client-side events aren't forwarded from Shopify to Amplitude. 
- Amplitude's Shopify App code isn't open source, and Amplitude isn't able to support specific customer use cases, such as custom event properties.
- User identity `User_ID` is limited to just email address and SHA-256. You can't customize or set your own identifier.
- The app doesn't track revenue event properties.
- The app doesn't track Order Fulfillment status events.
- The app doesn't track Subscription events.
- The app doesn't sales/return events.

## Events taxonomy

See the entire tracking plan and event schema in [Google Sheets](https://docs.google.com/spreadsheets/d/13EZKuXbcnFUIgj721791Nx1LfvIincGndDDt1v7lpUs/edit#gid=95612975). You can see which events and properties are automatically sent by default by installing the Shopify App onto your store.

|<div class="big-column">Event</div>| Description|
|------|--------|
|`[Shopify] Login`|When the user logs into their account|
|`[Shopify] Logout`| When the user logs out of their account|
|`[Shopify] Page Viewed`| When the user visits any page on the site|
|`[Shopify] Account` |When the user successfully creates their account|
|`[Shopify] Product Details Viewed`| When the user views a product detail page|
|`[Shopify] Product Clicked`| When the user has clicked on a product from the collection|
|`[Shopify] Product Added`| When the user adds a product to their cart|
|`[Shopify] Cart Viewed`| When the user views their cart|
|`[Shopify] Checkout Started`| When the user starts the checkout flow|
|`[Shopify] Checkout Completed`| When the user completes the checkout|
|`[Shopify] Order Created` | When the user’s order is successfully processed and revenue incurred|
|`[Shopify] Order Cancelled`| When the user’s order is canceled|
|`[Shopify] Order Updated`|When the order is updated by the user|
|`[Shopify] View Thank you Confirmation`|When the user receives a thank you confirmation|

## User identity

To support a broader range of use cases, Amplitude lets you choose which of the following fields you want to send as the `User_Id` for known customers.

- **Email (default)**: Recommended when other platforms use the email and can’t hash it, and you are comfortable with the privacy implications.
- **Hashed email**: The MD5 email hash is useful if you have other marketing platforms sending traffic where you know the email of the visitor (fore example, email marketing like Bronto or Marketo), but not their Shopify customer ID.

## UTM tracking

By default, the Shopify Plugin uses Amplitude’s JavaScript SDK to pull UTM parameters from the referring URL and include them as user properties on all the relevant events:

- `includeGclid`: Gclid (Google Click Identifier) is a globally unique tracking parameter used by Google. If used, Google appends a unique parameter (for example, `?gclid=734fsdf3`) to URLs at runtime. By setting this to `true`, the SDK capture `initial_gclid` and gclid as user properties.
- `includeFbclid`: Fbclid (Facebook Click Identifier) is a globally unique tracking parameter used by Facebook. If used, Facebook appends a unique parameter (for example, `?fbclid=392foih3`) to URLs at runtime. By setting this to `true`, the SDK captures `initial_fblid` and `fbclid` as user properties.
- `includeUtm`: If `true`, the plugin finds the standard UTM parameters from either the URL or the browser cookie and set them as user properties. This sets `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, and `utm_content` as well as `initial_utm_source`, `initial_utm_medium`, `initial_utm_campaign`, `initial_utm_term`, and `initial_utm_content` as user properties for the user.

UTM parameters are captured once per session by default and occur when the user loads your site and the Amplitude SDK for the first time. When the SDK detects that it should start a new session, it pulls the UTM parameters available at the time.
 Those UTM parameters are set as user properties that persist for all user events going forward. However, initial UTM parameters are captured only once for each user via a `setOnce` operation.

## Cross-domain tracking

By default, the Shopify App automatically tracks anonymous behavior across two different domains. Anonymous users are identified by their Device IDs which must be passed between the domains. For example:

Site 1: www.example.com

Site 2: www.example.org

Users who start on Site 1 and then navigate to Site 2 have their Device ID generated from Site 1 passed as a parameter to Site 2. Site 2 then initializes the SDK with that Device ID. The SDK can parse the URL parameter automatically if deviceIdFromUrlParam is enabled.

## Setup

### Installation steps

1. Go to the [Amplitude app](https://www.google.com/url?q=https://apps.shopify.com/amplitude?surface_detail%3Damplitude%26surface_inter_position%3D1%26surface_intra_position%3D2%26surface_type%3Dsearch&sa=D&source=docs&ust=1639610653341000&usg=AOvVaw2Z_lud4-S1WhAHoDKWdJKC) in the Shopify app store.
2. Click **Add app** to begin the installation process.
3. Go to your Amplitude project, then navigate to **Settings => Projects**.
4. Navigate to the project you want to import events into (portfolio views cannot be used as a destination).
5. Copy the Amplitude project’s API key.
6. In the Shopify admin portal, enter the API key in **Amplitude API Key** field. Then click **Connect**.
7. Choose a `User_ID` for known customers. To support a broader range of use cases, the app lets you choose which of the following fields you want to send as the `User_ID` for known customers.
   - **Email (default)**: Recommended when other platforms use the email and can’t hash it, and you are comfortable with the privacy implications.
   - **Hashed email**: The MD5 email hash is useful if you have other marketing platforms sending traffic where you know the email of the visitor (for example, email marketing like Bronto or Marketo), but not their Shopify customer ID.
8. Finally, navigate to **Themes > Current Theme > Actions > Edit Code**, and check if the Amplitude code snippet is installed. It should be located before the theme’s closing `</head>` tag in the `theme.liquid` file. If not, add it.

    ```liquid
    <!-- Amplitude -->
    {% render 'amplitude' %}
    ```

### SDK configurations

Amplitude's JavaScript SDK powers the out-of-the-box integration with Shopify stores. You can extend this behavior with custom-defined events and SDK configurations.

To do this perform the following steps:

1. In your Shopify Admin portal, navigate to **Online Store > Themes > Actions > Edit Code**.
2. Create an `amplitude-options.liquid` file in the Layout section.
3. Insert the following code template inside this file:
  
    ```json
    window.amplitudeShopify.customOptions = {
      // custom options definitions
    }
    ```

!!!note
    Any configurations defined here are passed onto the underlying JavaScript SDK used by Amplitude's Shopify app (as this also overrides the default options you see in `theme.liquid`).
