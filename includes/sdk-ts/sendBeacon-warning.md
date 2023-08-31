!!!warning

    Because `sendBeacon` sends events in the background, events dispatched from `sendBeacon` don't return a server response and can't be retried when they encounter failures like 4xx or 5xx errors. You can address these retry issues by sending one event/request, but this could increase the network load and the likelihood of throttling.