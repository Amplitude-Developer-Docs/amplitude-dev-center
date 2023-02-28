You must initialize the SDK before you can instrument any events. Your Amplitude project's API key is required. You can pass an optional user ID and config object in this call. You can use the SDK anywhere after it's initialized anywhere in an application.

=== "Classic script"

    ```ts
    // Option 1, initialize with API_KEY only
    amplitude.init(API_KEY);

    // Option 2, initialize including user ID if it's already known
    amplitude.init(API_KEY, 'user@amplitude.com');

    // Option 3, initialize including configuration
    amplitude.init(API_KEY, 'user@amplitude.com', configurationObj);
    ```

=== "Module script"

    ```ts
    import * as amplitude from '@amplitude/analytics-browser';

    // Option 1, initialize with API_KEY only
    amplitude.init(API_KEY);

    // Option 2, initialize including user ID if it's already known
    amplitude.init(API_KEY, 'user@amplitude.com');

    // Option 3, initialize including configuration
    amplitude.init(API_KEY, 'user@amplitude.com', configurationObj);
    ```
