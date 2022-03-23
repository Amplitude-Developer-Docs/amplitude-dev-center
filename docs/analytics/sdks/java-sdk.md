---
title: Java SDK
description: The Amplitude Analytics Java SDK installation and quick start guide. 
icon: fontawesome/brands/java
---

This is the documentation for the Amplitude Analytics Java SDK. Note that this is not the Android SDK. 

???info "SDK Resources"
    - [Java SDK Repository :material-github:](https://github.com/amplitude/Amplitude-Java)
    - [Java SDK Releases :material-code-tags-check:](https://github.com/amplitude/Amplitude-Java/releases)

--8<-- "includes/ampli-vs-amplitude.md"

## SDK installation

### Maven

Use Gradle or another build system to resolve the Java SDK dependency. The following example is for Gradle:

```java
dependencies {
    implementation 'org.json:json:20201115'
    implementation 'com.amplitude:java-sdk:1.6.1'
}
```

### Download (alternative)

Download the [latest JAR file](https://github.com/amplitude/Amplitude-Java/releases) and add it to the project's buildpath. See instructions for your IDE.

## EU data residency

Sending data to Amplitude's EU servers, you need to configure the server URL during the initialization.

```java
Amplitude amplitude = Amplitude.getInstance();
amplitude.init("API KEY");
amplitude.setServerUrl("https://api.eu.amplitude.com/2/httpapi");
```

## Usage and examples

### Importing

Import Amplitude into any file that uses it. Amplitude uses the open source `JSONObject` library to conveniently create JSON key-value objects.

```java
import com.amplitude.Amplitude;
import org.json.JSONObject;
```

### Initialization

Initialization is necessary before any instrumentation is done. The API key for your Amplitude project is required.

```java
Amplitude client = Amplitude.getInstance();
client.init("YOUR_API_KEY");
```

`Amplitude.getInstance(String name)` may optionally take a name which uniquely holds settings.

```java
Amplitude client = Amplitude.getInstance("YOUR_INSTANCE_NAME");
client.init("YOUR_API_KEY");
```

### Configure batching behavior

To support high performance environments, our SDK sends events in batches. Every event logged by `logEvent` method is queued in memory. Events are flushed in batch in background. You can customize batch behavior with `setEventUpdloadThreshfold` and `setEventUploadPeriodMillis`.

```java
Amplitude client = Amplitude.getInstance();
// events queued in memory will flush when number of events exceed upload threshold
// default value is 10
client.setEventUploadThreshold(20);

// events queue will flush every certain milliseconds based on setting
// default value is 10,000 milliseconds
client.setEventUploadPeriodMillis(5000);
```

You can also flush events on demand.

```java
client.flushEvents();
```

For customers who want to send large batches of data at a time, for example through scheduled jobs, rather than in a continuous real-time stream, Amplitude provides the batch mode.
 Both the regular mode and the batch mode use the same events upload threshold and flush time intervals, but the batch mode allows larger payload size(20MB) and has higher throttling limit.
  Due to the higher rate of data that's permitted by this mode, data sent by batch mode may be delayed based on load. You can see a usage example in [this project](https://github.com/amplitude/Amplitude-Java/blob/main/src/demo/java/com/demo/amplitude/LocalUploadDemo.java) on GitHub.

```java
// Enable batch mode
client.useBatchMode(true);

// Disable batch mode
client.useBatchMode(false);
```

## Sending events

Events represent how users interact with your application. For example, "Button Clicked" may be an action you want to track.

!!!note

    For testing Java SDK out, please make sure your main thread continues until the background daemon thread that has the Amplitude HTTP request is finished. Otherwise, the main thread terminated earlier than the daemon thread will lead `logEvent` to fail silently.

```java
Amplitude client = Amplitude.getInstance();
client.logEvent(new Event("Button Clicked", "test_user_id"));
```

### Events with properties

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

### Set user properties

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

### Set device information

Unlike the Android SDK or iOS SDK, device information in Java SDK isn't collected via SDK. Device information like device id, device brand, device manufacturer, and device model can be set as properties in each event.

```java
Event event = new Event("Button Clicked", "test_user_id");
event.deviceId = "device_id";
event.deviceBrand = "device_brand";
event.deviceManufacturer = "device_manufacturer";
event.deviceModel = "device_model";
client.logEvent(event);
```

### Set session information

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

Middleware is added to Amplitude via `client.addEventMiddleware`. You can add as many middleware as you like. Each middleware runs in the order in which it was added.

You can find examples for [Java](https://github.com/amplitude/ampli-examples/blob/main/jre/java/AmpliApp/src/main/java/org/example/LoggingMiddleware.java) and [Kotlin](https://github.com/amplitude/ampli-examples/blob/main/jre/kotlin/AmpliApp/src/main/kotlin/LoggingMiddleware.kt).

## Troubleshooting

When debugging, check the logs. The SDK prints error messages.

If you have problems, open an issue on the [GitHub issues page](https://github.com/amplitude/Amplitude-Java/issues).
