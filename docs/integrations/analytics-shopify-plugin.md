---
title: "Shopify App"
slug: "shopify-plugin"
hidden: false
createdAt: "2021-12-15T18:05:20.610Z"
updatedAt: "2021-12-20T17:29:54.098Z"
---

Amplitude’s app with Shopify is a smart analytics app that automates eCommerce tracking. With Amplitude’s app, you can automatically track and ingest key e-commerce events, event properties, and user properties on a Shopify or Shopify Plus store. 

## Key Consideration

- Our Shopify App was built to solve the general use cases for most Shopify stores. We designed a generalized Out of the Box Taxonomy to include events and properties that most Shopify stores would be interested in tracking.

- We recommend leveraging our Amplitude SDKs or APIs in addition to this app if your Shopify Store has a high degree of in-built functionality or if you require instrumenting a lot of custom events outside our taxonomy list. 

- In addition, using [Govern](https://help.amplitude.com/hc/en-us/articles/360043750992-Govern-Manage-your-Amplitude-data-at-scale), you’ll be able to manage event types, properties, and user properties from a single interface.

# Getting Started

### Installation requirements

- Have an existing online Shopify or Shopify Plus store
- Sign up OR have an existing Amplitude Starter, Growth, or Enterprise plan

## Installation Steps

1) Login to your Shopify Store account.
2) Go to the Shopify app store listing and search for "Amplitude" or use this direct link [here](https://www.google.com/url?q=https://apps.shopify.com/amplitude?surface_detail%3Damplitude%26surface_inter_position%3D1%26surface_intra_position%3D2%26surface_type%3Dsearch&sa=D&source=docs&ust=1639610653341000&usg=AOvVaw2Z_lud4-S1WhAHoDKWdJKC).
3) Click **Add app** to begin the installation process
4) 
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/a2fa87b-Install_App.png",
        "Install App.png",
        512,
        220,
        "#e8edee"
      ]
    }
  ]
}
[/block]

4) **Sign up** for an Amplitude account or login to your existing Amplitude organization.
5) Once you are inside your Amplitude project, Navigate to *Sources and Destinations* → *Destinations*.
6) Under Add More Destinations …, click the Shopify panel.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/6ed3a0f-Screen_Shot_2021-12-15_at_2.43.41_PM.png",
        "Screen Shot 2021-12-15 at 2.43.41 PM.png",
        1858,
        971,
        "#f7f7f8"
      ]
    }
  ]
}
[/block]
7) Once you’ve clicked on the Shopify tile, copy the Amplitude project’s API key from your respective project.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/1f9f3c6-Screen_Shot_2021-12-15_at_4.06.15_PM.png",
        "Screen Shot 2021-12-15 at 4.06.15 PM.png",
        1510,
        1027,
        "#f6f5f6"
      ]
    }
  ]
}
[/block]
8) Paste the “Amplitude API Key” field in the Shopify Admin portal and click the Connect Button. The app will show Connected if the app has been installed successfully and created a valid connection between your Shopify store and Amplitude.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/ddd5319-Screen_Shot_2021-12-20_at_8.52.50_AM.png",
        "Screen Shot 2021-12-20 at 8.52.50 AM.png",
        2706,
        1444,
        "#f5f5f5"
      ]
    }
  ]
}
[/block]
9) Choose a User_ID for known customers. To support a broader range of use cases, our app lets you choose which of the following fields you want to send as the User_Id for known customers.

- **Email (default)** – Recommended when other platforms use the email and can’t hash it, and you are comfortable with the privacy implications.

- **Hashed email** – The MD5 email hash is useful if you have other marketing platforms sending traffic where you know the email of the visitor (e.g. email marketing like Bronto or Marketo), but not their Shopify customer ID.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/04457ea-Screen_Shot_2021-12-20_at_8.53.58_AM.png",
        "Screen Shot 2021-12-20 at 8.53.58 AM.png",
        2706,
        1444,
        "#f2f3f4"
      ]
    }
  ]
}
[/block]
10) The last step involves confirming that Amplitude’s code snippet is installed which will allow Amplitude's SDK to automatically track key events and events properties. To do this, you’ll need to go into **Themes **> **Current Theme** > **Actions** > **“Edit Code.”** 
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/09b194f-Screen_Shot_2021-12-15_at_5.25.16_PM.png",
        "Screen Shot 2021-12-15 at 5.25.16 PM.png",
        2160,
        1276,
        "#f3f2ef"
      ]
    }
  ]
}
[/block]
11) Check if the following code snippet is installed. It should be located before the theme’s closing </head> tag in the theme.liquid file. If not, please paste in the following code snippet before the theme's closing </head>tag theme.liquid file. Once that’s done, the installation process is now complete.

```json
{
  "codes": [
    {
      "code": "<!-- Amplitude -->\n{% render 'amplitude' %}\n",
      "language": "json"
    }
  ]
}
```


[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/12ca7ff-Screen_Shot_2021-12-15_at_5.44.57_PM.png",
        "Screen Shot 2021-12-15 at 5.44.57 PM.png",
        2554,
        1227,
        "#f5f5f5"
      ]
    }
  ]
}
[/block]

## SDK Configurations

Amplitude's JS SDK powers the out-of-the-box integration with Shopify stores. This behavior can be extended with custom-defined events and SDK configurations.

To do this perform the following steps:
1) In your Shopify Admin portal, navigate to Online Store > Themes > Actions > Edit Code
2) Create an **amplitude-options.liquid file** in the "Layout" section
3) Insert the following code template inside this file:
[block:code]
{
  "codes": [
    {
      "code": "window.amplitudeShopify.customOptions = {\n  // custom options definitions\n}",
      "language": "json"
    }
  ]
}
[/block]

**Note:** Any configurations defined here will be passed onto the underlying JS SDK used by Amplitude's Shopify app (as this also overrides the default options you see in theme.liquid).


## Events Taxonomy

This link has the entire tracking plan and event schema in google sheets. You can see which events and properties are automatically sent by default by installing the Shopify App onto your store.

```json
{
  "data": {
    "h-0": "Event",
    "h-1": "Description",
    "0-0": "[Shopify] Login",
    "1-0": "[Shopify] Logout",
    "2-0": "[Shopify] Page Viewed",
    "3-0": "[Shopify] Account Created",
    "4-0": "[Shopify] Product Details Viewed",
    "5-0": "[Shopify] Product Clicked",
    "6-0": "[Shopify] Product Added",
    "7-0": "[Shopify] Cart Viewed",
    "8-0": "[Shopify] Checkout Started",
    "9-0": "[Shopify] Checkout Completed",
    "10-0": "[Shopify] Order Created",
    "11-0": "[Shopify] Order Cancelled",
    "12-0": "[Shopify] Order Updated",
    "13-0": "[Shopify] View Thank you Confirmation",
    "0-1": "When the user logs into their account",
    "1-1": "When the user logs out of their account",
    "2-1": "When the user visits any page on the site",
    "3-1": "When the user successfully creates their account",
    "4-1": "When the user views a product detail page",
    "5-1": "When the user has clicked on a product from the collection",
    "6-1": "When the user adds a product to their cart",
    "7-1": "When the user views their cart",
    "8-1": "When the user starts the checkout flow",
    "9-1": "When the user completes the checkout",
    "10-1": "When the user’s order is successfully processed and revenue incurred",
    "12-1": "When the order is updated by the user",
    "13-1": "When the user receives a thank you confirmation",
    "11-1": "When the user’s order is canceled"
  },
  "cols": 2,
  "rows": 14
}
```

## User Identity

To support a broader range of use cases, our app lets you choose which of the following fields you want to send as the User_Id for known customers.

1) **Email (default)** – Recommended when other platforms use the email and can’t hash it, and you are comfortable with the privacy implications.

2) **Hashed email** – The MD5 email hash is useful if you have other marketing platforms sending traffic where you know the email of the visitor (e.g. email marketing like Bronto or Marketo), but not their Shopify customer ID.

## UTM Tracking

By default, the Shopify Plugin will automatically rely on Amplitude’s JavaScript SDK to pull UTM parameters from the referring URL and include them as user properties on all of the relevant events:

- includeGclid: Gclid (Google Click Identifier) is a globally unique tracking parameter used by Google. If utilized, Google will append a unique parameter (e.g. "?gclid=734fsdf3") to URLs at runtime. By setting this to true, the SDK will capture initial_glid and gclid as user properties.

- includeFbclid: Fbclid (Facebook Click Identifier) is a globally unique tracking parameter used by Facebook. If utilized, Facebook will append a unique parameter (e.g. "?fbclid=392foih3") to URLs at runtime. By setting this to true, the SDK will capture initial_fblid and fbclid as user properties.

- includeUtm: If true, the plugin will find the standard UTM parameters from either the URL or the browser cookie and set them as user properties. This will set utm_source, utm_medium, utm_campaign, utm_term, and utm_content as well as initial_utm_source, initial_utm_medium, initial_utm_campaign, initial_utm_term, and initial_utm_content as user properties for the user.
UTM parameters are captured once per session by default and occur when the user loads your site and the Amplitude SDK for the first time. When the SDK detects that it should start a new session, it will pull the UTM parameters available at the time. Those UTM parameters will be set as user properties that will persist for all user events going forward. However, initial UTM parameters are captured only once for each user via a setOnce operation. 


## Cross-Domain Tracking

By default, the Shopify App will automatically track anonymous behavior across two different domains. Anonymous users are identified by their Device IDs which will need to be passed between the domains. For example:

Site 1: www.example.com
Site 2: www.example.org

Users who start on Site 1 and then navigate to Site 2 will have their Device ID generated from Site 1 passed as a parameter to Site 2. Site 2 will then initialize the SDK with that Device ID. The SDK can parse the URL parameter automatically if deviceIdFromUrlParam is enabled.



# FAQ
[block:parameters]
{
  "data": {
    "h-0": "Question",
    "h-1": "Answer",
    "0-1": "No. The Amplitude app is free to install but you will need either an Amplitude Starter, Growth, or Enterprise plan to start sending data from your Shopify store.",
    "0-0": "Does the Amplitude App with Shopify cost anything?",
    "1-0": "Can I send additional custom events in the future outside the default taxonomy list?",
    "1-1": "Yes, you can. You will need to partner with your Engineering team to leverage Amplitude’s SDKs to instrument additional events and properties as needed.",
    "2-0": "What if I need to rename the event names sent by Amplitude’s app?",
    "2-1": "Using Govern, you can change the display name and description for events, event properties, and user properties. See this guide for more detail. Note all events sent by the Shopify app will have a preheader [Shopify] to distinguish themselves from the custom events sent by your team.",
    "3-0": "What if I need to block, drop, or filter certain events so that I can use my own custom events instead?",
    "4-0": "Does this Amplitude App interact with third-party apps on the Shopify Marketplace?",
    "3-1": "Using Govern, you can block, delete or filter out events and user properties. See this guide for more detail.",
    "4-1": "No. We have not enabled this functionality.",
    "5-0": "How can I send data from multiple Shopify stores into Amplitude?",
    "5-1": "You can use the same project and API key for all the Shopify stores. Alternatively, you can use the API key from multiple projects if you prefer to have a separate project for each of your Shopify stores. \n\nHowever, with the latter method, if you want to analyze or generate a holistic view of how your users interact with your entire product portfolio, you will need to purchase Amplitude’s Portfolio add-on. Please see this article for more information."
  },
  "cols": 2,
  "rows": 6
}
[/block]