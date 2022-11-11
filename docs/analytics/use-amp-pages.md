---
title: Use Accelerated Mobile Pages (AMP) with Amplitude
description: words. 
---

[AMP (Accelerated Mobile Pages)](https://amp.dev/) is an open-source initiative that allows web pages to load faster for mobile users. For example, when you view search results on a mobile device and see articles with a lightning bolt icon in the corner, those pages load using AMP.

![Screenshot of search results with AMP lightning bolt icon in the corner](../assets/images/analytics-amp-results.png){: style="width:400px"}

AMP uses a subset of HTML and doesn't allow the embedding of arbitrary JavaScript. However, Amplitude has created a custom plugin for AMP that enables you to track Amplitude events on AMP websites.

## Considerations

- AMP pages don't have any session support or means of generating a session ID.
- The AMP SDK doesn't support setting identify operations. You would need to pass a user properties object in your event parameters, as documented below.

## Implement Amplitude on AMP

To use Amplitude with AMP, you need to insert a code snippet into your AMP pages.

First, add the [amp-analytics](https://www.ampproject.org/docs/reference/components/amp-analytics) component to your AMP HTML pages at the bottom of your `<head>` tag.

```js
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
```

Add the Amplitude snippet to your AMP HTML page within your `<body>` tag. Replace the `apiKey `value with your amplitude project's API key.

It looks something like this:

```js
<amp-analytics type="amplitude" id="amplitude">
<script type="application/json">
 {
   "vars": {
      "apiKey": "YOUR AMPLITUDE API KEY"
   }
}
</script>
```

You can log events by adding [triggers](https://www.ampproject.org/docs/reference/components/amp-analytics#triggers) and event requests to the JSON in your amplitude snippet.

## Implementation examples

???example "Example: Log a click (click to expand)"

    Imagine you wanted to log an event named `story click` when your users click on a link with the ID `story`. In this case, you would add a trigger on click:

    ```js
    <amp-analytics type="amplitude" id="amplitude">
    <script type="application/json">
    {
      "vars": {

          "apiKey": "YOUR AMPLITUDE API KEY"
      },
      "triggers": {
        "click": {
          "on": "click",
          "selector": "#story",
          "request": "event",
          "extraUrlParams": {
            "event": {
              "event_type": "story click",
            }
          }
        }
      }
    }
    </script>
    ```

    The event parameters are nested under the `event` object in `extraUrlParams`. Int this case, Amplitude just logs the event type, which is required.

???example "Example: Log a page view with event properties (click to expand)"

    Imagine you wanted to log an event named `page view` when a user lands on your page. You also want an event property `page title` to identify the page that was viewed. In this case, your trigger would listen on `visible,` and there is also an `event_properties `object in your JSON that identifies the page title.

    ```js
    <amp-analytics type="amplitude" id="amplitude">
    <script type="application/json">
    {
      "vars": {
          "apiKey": "YOUR AMPLITUDE API KEY"
      },
      "triggers": {
        "pageView": {
          "on": "visible",
          "request": "event",
          "extraUrlParams": {
            "event": {
              "event_type": "page view",
              "event_properties": {
                "page title": "${title}"
              }
            }
          }
          }
        }
    }
    </script>
    ```

    To set the `page title` property, you use variable substitution to substitute in the `title` variable, as in the example above. See the [amp-analytics](https://www.ampproject.org/docs/reference/components/amp-analytics) documentation for more on [triggers](https://www.ampproject.org/docs/reference/components/amp-analytics#triggers) and [variable substitutions](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md).

???example "Example: Log events with user properties and group properties (click to expand)" 

    Add user properties and group properties similarly to event properties by introducing `user_properties` and `groups` objects to your JSON. 

    !!!note

        Group properties are available only if you have the [accounts add-on](https://help.amplitude.com/hc/en-us/articles/115001765532#account-level-properties-group-properties).

    ```js
    <amp-analytics type="amplitude" id="amplitude">
    <script type="application/json">
    {
      "vars": {
            "apiKey": "YOUR AMPLITUDE API KEY"
      },
      "triggers": {
        "click": {
          "on": "click",
          "selector": "#story1",
          "request": "event",
          "extraUrlParams": {
            "event": {
              "event_type": "story click",
              "event_properties": {
                "story id": "story1"
              },
              "groups": {
                "company": "Google"
              },
              "user_properties": {
                "utm_source": "${queryParam(utm_source)}"
              }
            }
          }
        }
      }
    }
    </script>
    ```

## User identification

Instead of a user ID, AMP generates a unique client ID that Amplitude can use for the device ID. This ID gets stored as a cookie for that AMP site.

AMP has a mechanism called a "linker" for sharing the client ID to other websites that are part of the same navigation flow. This lets customers who link from their AMP site to their non-AMP site to carry over the same device ID, so that they can then identify the user ID.

See the AMP documentation for [sending](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/linker-id-forwarding.md) and [receiving](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/linker-id-receiving.md) the linker ID.

## UTM parameters

UTM parameters aren't automatically collected by the SDK. You can pass them explicitly as user properties pulled from query parameters in the URL.

```js
<amp-analytics type="amplitude" id="amplitude">
<script type="application/json">
 {
   "vars": {
         "apiKey": "YOUR AMPLITUDE API KEY"
   },
   "triggers": {
     "click": {
       "on": "click",
       "selector": "#story1",
       "request": "event",
       "extraUrlParams": {
         "event": {
           "event_type": "story click",
           "user_properties": {
             "utm_source": "${queryParam(utm_source)}",
             "utm_campaign": "${queryParam(utm_campaign)}",
             "utm_medium": "${queryParam(utm_medium)}"
           }
         }
       }
     }
   }
 }
</script>
```

## More resources

- [General AMP analytics docs](https://www.ampproject.org/docs/reference/components/amp-analytics)
- [Available variables for customers to use for event/user properties](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)
