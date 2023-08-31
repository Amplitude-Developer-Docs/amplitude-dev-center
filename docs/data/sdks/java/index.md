---
title: JRE Java SDK
description: The Amplitude JRE Java SDK installation and quick start guide. 
icon: fontawesome/brands/java
---


![Maven Central](https://img.shields.io/maven-central/v/com.amplitude/java-sdk)

This is the documentation for the **Amplitude Analytics Java SDK**, not the Android SDK.

!!!info "JRE SDK Resources"
    [:material-github: GitHub](https://github.com/amplitude/Amplitude-Java) · [:material-code-tags-check: Releases](https://github.com/amplitude/Amplitude-Java/releases)

--8<-- "includes/ampli-vs-amplitude.md"
    Click here for more documentation on [Ampli for JRE](./ampli.md).

## Getting started

Use [this quickstart guide](../../sdks/sdk-quickstart#java) to get started with Amplitude Java SDK.

## Usage and examples

### Import

Import Amplitude into any file that uses it. Amplitude uses the open source `JSONObject` library to conveniently create JSON key-value objects.

```java
import com.amplitude.Amplitude;
import org.json.JSONObject;
```

### Initialization

You must initialize the SDK before any events are instrumented. The API key for your Amplitude project is required.

```java
Amplitude client = Amplitude.getInstance();
client.init(AMPLITUDE_API_KEY);
```

`Amplitude.getInstance(String name)` may optionally take a name which uniquely holds settings.

```java
Amplitude client = Amplitude.getInstance("YOUR_INSTANCE_NAME");
client.init(AMPLITUDE_API_KEY);
```

### Configuration

???config "Configuration Options"
    | <div class="big-column">Name</div>  | Description | Default Value |
    | --- | --- | --- |
    | `setServerUrl()` | `String`. The server url events are uploaded to. For example, `Amplitude.getInstance().setServerUrl("https://www.your-server-url.com")`. | `https://api2.amplitude.com/2/httpapi` |
    | `useBatchMode()` | `Boolean`. Whether to use [batch API](../../../analytics/apis/batch-event-upload-api/#batch-event-upload). By default, the SDK will use the default `serverUrl`. For example, `Amplitude.getInstance().useBatchMode(true)`. | `false` |
    | `setLogMode()` | `AmplitudeLog.LogMode`. The level at which to filter out debug messages. For example, `Amplitude.getInstance().setLogMode(AmplitudeLog.LogMode.DEBUG);`. | `AmplitudeLog.LogMode.ERROR` |
    | `setEventUploadThreshold()` | `int`. SDK will attempt to upload once unsent event count exceeds the event upload threshold or reach eventUploadPeriodSeconds interval. For example, `Amplitude.getInstance().setEventUploadThreshold(50);`. | `10` |
    | `setEventUploadPeriodMillis()` | `int`. The amount of time SDK will attempt to upload the unsent events to the server or reach eventUploadThreshold threshold. The input parameter is in milliseconds. For example, `Amplitude.getInstance().setEventUploadPeriodMillis(200000);`. | `10 seconds` |
    | `setCallbacks()` | `AmplitudeCallbacks`. Event callback which are triggered after event sent. | `null`|
    | `setProxy()` | `Proxy`. Custom proxy for https requests. For example, `Amplitude.getInstance().setProxy(new Proxy(Proxy.Type.HTTP, new InetSocketAddress("proxy.domain.com", port)));`. | `Proxy.NO_PROXY` |
    | `setFlushTimeout()` | `long`. Events flushing thread timeout in milliseconds.  For example, `Amplitude.getInstance().setFlushTimeout(2000L);`. | `0` |
    | `setOptions()` | `Options`. A dictionary of key-value pairs that represent additional instructions for server save operation. For example, `Amplitude.getInstance().setOptions(new Options().setMinIdLength(8));`. | Please check [available options](/#options). |

### Options

???config "Available Options"
    | <div class="big-column">Name</div>  | Description | Default Value |
    | --- | --- | --- |
    | `Options.setMinIdLength()` | `Integer`. Set the minimum length for user id or device id. For example, `Amplitude.getInstance().setOptions(new Options().setMinIdLength(8));`. | `5` |
    | `Options.setHeaders()` | `Map<String, String>`. Set the custom headers. For example, `Amplitude.getInstance().setOptions(new Options().setHeaders(new HashMap<>(Map.of("Custom Header", "value"))));`. | `{"Content-Type", "application/json", "Accept", "application/json"}` |
    | `Options.addHeader()` | `String, String`. Add more custom headers. For example, `Amplitude.getInstance().setOptions(new Options().addHeader("Custom Header", "value"));`. | `{"Content-Type", "application/json", "Accept", "application/json"}` |

#### Configure batching behavior

To support high-performance environments, the SDK sends events in batches. Every event logged by `logEvent` method is queued in memory. Events are flushed in batches in background. You can customize batch behavior with `setEventUploadThreshold` and `setEventUploadPeriodMillis`. By default, the SDK is in regular mode with `serverUrl` to `https://api2.amplitude.com/2/httpapi`. For customers who want to send large batches of data at a time, switch to batch mode by setting `useBatchMode` to `true` to set setServerUrl to batch event upload API `https://api2.amplitude.com/batch`. Both the regular mode and the batch mode use the same flush queue size and flush intervals.

```java
Amplitude client = Amplitude.getInstance();
// Events queued in memory will flush when number of events exceed upload threshold
// Default value is 10
client.setEventUploadThreshold(20);

// Events queue will flush every certain milliseconds based on setting
// Default value is 10,000 milliseconds
client.setEventUploadPeriodMillis(5000);

// Using batch mode with batch API endpoint, `https://api2.amplitude.com/batch`
client.useBatchMode(true);
```

You can also flush events on demand.

```java
client.flushEvents();
```

For customers who want to send large batches of data at a time, for example through scheduled jobs, rather than in a continuous real-time stream, Amplitude provides the batch mode.
 Both the regular mode and the batch mode use the same events upload threshold and flush time intervals. The batch mode allows larger payload size (20MB) and has a higher throttling limit.
  Due to the higher rate of data that's permitted by this mode, data sent by batch mode may be delayed based on load. You can see a usage example in [this project](https://github.com/amplitude/Amplitude-Java/blob/main/src/demo/java/com/demo/amplitude/LocalUploadDemo.java) on GitHub.

```java
// Enable batch mode
client.useBatchMode(true);

// Disable batch mode
client.useBatchMode(false);
```

#### Config custom HTTP proxy

New in version 1.9.0. Set and unset custom proxy for HTTP requests.

```java
// Set proxy for http requests
client.setProxy(new Proxy(Proxy.Type.HTTP, new InetSocketAddress("proxy.domain.com", port)));

// Unset proxy
client.setProxy(Proxy.NO_PROXY);
```

#### Config custom logger

New in version 1.10.0. Set a customized logger for amplitude client.

```java
// Set logger 
client.setLogger(new AmplitudeLog() {
  @Override
  public void log(String tag, String message, LogMode messageMode) {
    if (messageMode.level >= logMode.level) {
      // implement using custom logging framework and format
    }
  }
});
```

#### Config minIdLength and header 

Amplitude Java SDK supports customizing the min length of ID and header on the version later than 1.7.0.

```java
// Set logger 
client.setOptions(new Options()
      .addHeader("Custom Header", "value")
      .setMinIdLength(5));
```

#### Config events flushing thread timeout

New in version 1.10.0. Set events flushing thread timeout in milliseconds. If set to a positive long integer, events flushing tasks time out and trigger callbacks for those events.

```java
client.setFlushTimeout(2000L); // 2 seconds
```

### Shutdown client and release resource

New in version 1.10.0. Stops the Amplitude client from accepting new events and shuts down the threads pool. Events in the buffer trigger callbacks. A new instance is created and returned if you call `Amplitude.getInstance(INSTANCE_NAME)` with the same instance name.

```java
client.shutdown();
```

### Send events

--8<-- "includes/sdk-httpv2-notice.md"

Events represent how users interact with your application. For example, "Button Clicked" may be an action you want to track. In Java, `logEvent` only accepts an event object. Please check [here](../../../analytics/apis/http-v2-api/#keys-for-the-event-argument) for available keys for the Event object.

!!!note

    For testing Java SDK out, please make sure your main thread continues until the background daemon thread that has the Amplitude HTTP request is finished. Otherwise, the main thread terminated earlier than the daemon thread will lead `logEvent` to fail silently.

```java
Amplitude client = Amplitude.getInstance();
client.logEvent(new Event("Button Clicked", "test_user_id"));
```

#### Events with properties

Events can also contain properties. They provide context about the event taken. For example, "hover time" may be a relevant event property to "button click."

```java
Event event = new Event("Button Clicked", "test_user_id");

JSONObject eventProps = new JSONObject();
try {
  eventProps.put("Hover Time", 10).put("prop_2", "value_2");
} catch (JSONException e) {
  System.err.println("Invalid JSON");
  e.printStackTrace();
}

event.eventProperties = eventProps;

client.logEvent(event);
```

#### Events with groups

--8<-- "includes/groups-intro-paragraph.md"

!!! example
    If Joe is in 'orgId' '10', then the `groupName` would be '10':

    ```java
    Event event = new Event("$identify");

    JSONObject groups = new JSONObject();
    try {
        groups.put("orgId", 10);
    } catch (JSONException e) {
        e.printStackTrace();
        System.err.println("Invalid JSON");
    }

    event.groups = groups;
    client.logEvent(event);
    ```

    If Joe is in 'sport' 'tennis' and 'soccer', then the `groupName` would be '["tennis", "soccer"]'.

    ```java
    Event event = new Event("$identify");

    JSONObject groups = new JSONObject();
    try {
        groups.put("sport", new String[] {"tennis", "soccer"});
    } catch (JSONException e) {
        e.printStackTrace();
        System.err.println("Invalid JSON");
    }

    event.groups = groupProps;
    client.logEvent(event);
    ```

You can also use `logEvent` to set **event-level groups**. With event-level groups, the group designation applies only to the specific event being logged, and doesn't persist on the user.

```java
Event event = New Event('event type', 'test_user_id');

JsonObject groups = new JSONObject();
try {
    groups.put("orgId", 10);
} catch (JSONException e) {
    e.printStackTrace();
    System.err.println("Invalid JSON");
}
event.groups = groups;

client.logEvent(event);
```

After setting groups, you can then set or update the properties of particular groups. However, these updates will only affect events going forward. 

--8<-- "includes/editions-growth-enterprise-with-accounts.md"

```java
Event event = new Event("$groupidentify");

JsonObject groups = new JSONObject();
JSONObject groupProps = new JSONObject();

try {
    groups.put("orgId", 10);
    groupProps.put("Hover Time", 10).put("prop_2", "value_2");
} catch (JSONException e) {
    e.printStackTrace();
    System.err.println("Invalid JSON");
}
event.groups = groups
event.groupProperties = groupProps

client.logEvent(event);
```

#### Set user properties

!!!warning "Privacy and tracking"

    Don't track any user data that may be against your privacy terms. 

Use `event.userProperties` as a shorthand to set multiple user properties at one time.

```java
Event event = new Event("Button Clicked", "test_user_id");

JSONObject userProps = new JSONObject();
double[] arr = {1,2,4,8};
try {
  userProps.put("team", "red").put("running_times", arr);
} catch (JSONException e) {
  e.printStackTrace();
  System.err.println("Invalid JSON");
}

event.userProperties = userProps;
client.logEvent(event);
```

#### Set device information

Unlike the Android SDK or iOS SDK, device information in Java SDK isn't collected via SDK. Device information like device id, device brand, device manufacturer, and device model can be set as properties in each event.

```java
Event event = new Event("Button Clicked", "test_user_id");
event.deviceId = "device_id";
event.deviceBrand = "device_brand";
event.deviceManufacturer = "device_manufacturer";
event.deviceModel = "device_model";
client.logEvent(event);
```

#### Set session information

You can set `sessionId` in an event. This pattern also applies to other properties like `city` and `price`. You can see a full list of events properties in [Event.java](https://github.com/amplitude/Amplitude-Java/blob/main/src/main/java/com/amplitude/Event.java).

```java
Event event = new Event("Button Clicked", "test_user_id");
event.sessionId = 1;
client.logEvent(event);
```

### Amplitude callbacks

Support for AmplitudeCallBacks is available beginning with 1.4.0. You can trigger a callback when event is sent to server or failed after retries.

```java
Amplitude client = Amplitude.getInstance();
AmplitudeCallbacks callbacks =
  new AmplitudeCallbacks() {
  @Override
    public void onLogEventServerResponse(Event event, int status, String message) {
    // Event: Event processed.
    // status: response code, like 200, 400, etc.
    // message: success or error message.
  }
};
client.setCallbacks(callbacks);
```

From 1.5.0, callbacks can be added to event level and triggered when the event is sent to server or failed after retries. One event can trigger both client level callbacks and event level callbacks.

```java
Amplitude client = Amplitude.getInstance();
AmplitudeCallbacks eventCallbacks =
  new AmplitudeCallbacks() {
  @Override
    public void onLogEventServerResponse(Event event, int status, String message) {
    // Event: Event processed.
    // status: response code, like 200, 400, etc.
    // message: success or error message.
  }
};
client.logEvent(event, eventCallbacks)
```

### Middleware

Middleware allows you to extend Amplitude by running a sequence of custom code on every event.
 This pattern is flexible and can be used to support event enrichment, transformation, filtering, routing to third-party destinations, and more.

Each middleware is a simple interface with a run method:

```java
void run(MiddlewarePayload payload, MiddlewareNext next);
```

The `payload` contains the `event` being sent as well as an optional `extra` that allows you to pass custom data to your own middleware implementations.

To invoke the next middleware in the queue, use the `next` function. You must call `next.run(payload)` to continue the middleware chain.
 If a middleware doesn't call `next`, then the event processing stop executing after the current middleware completes.

Add middleware to Amplitude via `client.addEventMiddleware`. You can add as many middleware as you like. Each middleware runs in the order in which it was added.

You can find examples for [Java](https://github.com/amplitude/ampli-examples/blob/main/jre/java/AmpliApp/src/main/java/org/example/LoggingMiddleware.java) and [Kotlin](https://github.com/amplitude/ampli-examples/blob/main/jre/kotlin/AmpliApp/src/main/kotlin/LoggingMiddleware.kt).

## Troubleshooting

When debugging, check the logs. The SDK prints error messages.

If you have problems, open an issue on the [GitHub issues page](https://github.com/amplitude/Amplitude-Java/issues).
