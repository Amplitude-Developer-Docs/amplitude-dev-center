---
title: Integrate Tealium with Amplitude
---

This article is a guide to setting up and using Amplitude's Tealium integration. 

Tealium's two main products are an enterprise tag management service, [Tealium iQ](https://tealium.com/products/tealium-iq-tag-management-system/), and a real-time unified marketing platform, [Tealium AudienceStream](https://tealium.com/products/audiencestream/). 

There are two ways customers can send data to Amplitude:

1. Tealium iQ & Tag Management (TIQ)
2. Tealium AudienceStream & Universal Data Hub (Tealium sends data from TIQ to Amplitude)

## Tealium iQ and tag management (TIQ)

Tealium IQ is a universal JavaScript library that creates a universal data object (UDO) for all elements of a page. This data is first sent to the data layer in Tealium, after which you can send it to third-party vendors (including Amplitude) with the tag.

There are two ways you can integrate Tealium iQ with your website: you can use Tealium's tag manager or their JavaScript library. This section discusses using Tealium iQ (tag manager) to send data to Amplitude.  

## Set up the integration

To integrate Tealium with Amplitude, follow these steps:

1. In your Tealium workspace, create a [**data layer**](#the-data-layer) for your application. This is where you define the variables you need. (See the next section for more details.)
2. Next, create a project for your data on Amplitude. This generates an API key for you.
3. In the *Tags* tab in Tealium, add Amplitude. You can input the Amplitude API key in the tag configuration. You can also create load rules and data mappings here.
4. In Tealium, navigate to the Code Center, which can you can find in the dropdown menu in the top right-hand corner. This is where you find the JavaScript snippet to paste into your app.
5. In your app, paste the snippet after the opening `body` tag. Specify the environment and whether you want to load the tags synchronously or asynchronously. (Asynchronously provides faster page loading. Amplitude's JavaScript SDK also loads asynchronously.)  

<!-- /* cSpell:disable */ -->
    ```js
    <script type="text/javascript">  
    var utag_data = {  
        "page_type": "home",  
        "customer_id": "t: feb-27"  
    };  
    </script>  
    

    <!-- Loading script asynchronously -->  
    <script type="text/javascript">  
        (function(a,b,c,d){  
        a='//tags.tiqcdn.com/utag/sbx-amplitud/main/prod/utag.js';  
        b=document;c='script';d=b.createElement(c);d.src=a;d.type='text/java'+c;d.async=true;  
        a=b.getElementsByTagName(c)[0];a.parentNode.insertBefore(d,a);  
        })();  
    </script>  
    ```
<!-- /* cSpell:enable */ -->

6. Make sure all variables you're adding to your instrumentation code have been defined in the *Data Layer* tab. Then, add an Amplitude vendor tag for any events you want to track. Tags can't have multiple variables mapped to the same destination; to send multiple events from the same page load, configure separate vendor tags for each. The destinations represent the different forms of data that you can send to Amplitude:  
  
## The data layer

Tealium iQ uses data layers, which are a spec of the data that flow from a company's digital products and identifies events containing certain event attributes. After you define the data layer, you can install it across all your digital products and use that data for tag vendor configurations like Amplitude. The data layer is vendor-neutral, so you can instrument a data layer and then send it to many different vendor tags.

!!!note
    Include every data layer variable on your app in the *Data Layer* tab.

In the data layer, you can define the following variable types:

* **UDO Variables:** Variables defined in your UDO. This is a JavaScript object on your website. It contains dynamic values that describe each page and visitor:

<!-- /* cSpell:disable */ -->
```js
<script type="text/javascript">  
    var utag_data={
        "country_code": "US",
        "currency_code": "USD",
        "page_name": "Cart: View Shopping Bag",
        "page_type": "cart",
        "product_id": ["PROD123", "PROD456"],
        "product_name": ["Red Shoes", "Black Socks"],
        "product_category": ["Footwear", "Apparel"],
        "product_quantity": ["1", "2"],
        "product_unit_price": ["65.00", "4.75"],
        "cart_total_items": "3",
        "cart_subtotal": "74.00" 
    };
</script> 
```
<!-- /* cSpell:enable */ -->
* **Querystring Parameters:** This captures parameters from the URL. For example, if the URL is `http://example.com/path/file.html?sortOrder=price`,  the variable name in Tealium is `sortOrder`.
* **First-Party Cookies:** Reference value in a cookie being set on your domain. When creating a cookie variable, you can either specify Tealium cookie, `utag_main`, or standard cookie. You can also add your own custom values to the `utag_main cookie`. The `utag.js` library creates and maintains a single cookie called `utag_main`; within it are several built-in values that keep track of the visitor session.
    * `ses_id`: Unique identifier for the session.
    * `_st`: Unix/epoch time stamp in milliseconds.
    * `v_id`: Unique identifier for each visitor.
    * `_ss`: Boolean that indicates if the page viewed is the first in a session. A value of 1 means yes and 0 means no.
    * `_pn`: Number of pages viewed during the current session.
    * `_sn`: The number of sessions for this visitor.
* **JavaScript Variables:** Select this to reference a JavaScript variable on the web page other than the `utag_data` object.
* **Meta Data Elements:** Reference content of a meta tag in the page.
* **AudienceStream Attributes:** Attributes such as badges, metrics, and properties that are defined in AudienceStream, which takes data that flows into Tealium's other product (Universal Data Hub) and creates visitor profiles representing the most important attributes of user engagement.

### Load rules

Load rules are conditions that define when and where to load a tag. They consist of logical conditions that must pass before Amplitude loads a tag. For example, you can set it up so that only certain tags load on certain domains. You can use AND/OR logic or time/date-based conditions to load tags.

You can delete load rules when they're no longer useful to you, or just deactivate them if you think you might use them again in the future.

### Observations

* **Amplitude library and Device ID:** `Device ID` is set to the randomly generated UUID set by Amplitude's JavaScript SDK. `Library = 'amplitude-js'`.
* You can update UDO values outside of the declaration block as long as the variable is set prior to loading `utag.js`. Otherwise, it's ignored. Here is a UDO on the initial page load:

    ```js
    <script type="text/javascript">  
    var utag_data = {  
        "page_type": "landing", // page type
        "page_name": "Home Page", // page name
        "event_name": "",
        "customer_id": "t: mar-20",
        "button_counter": "0"  
    };  
    </script>
    ```

    To trigger another event when users click a button on the page and increment the `button_counter` variable by one each time:.

    ```js
    <script type = "text/javascript">
        document.addEventListener("DOMContentLoaded", function () {
            document.querySelectorAll(".amp-track").forEach(function (element) {
                element.addEventListener("click", function () {
                    var eventName = element.dataset.event;
                    if (eventName == "resume") {
                        utag.link({
                            "button_counter": "1",
                            "event_name": "t: button clicked"
                        });
                    }
                });
            });
        }); 
    </script>
    ```

* You can configure the different SDK settings by mapping variables to the available destinations.
