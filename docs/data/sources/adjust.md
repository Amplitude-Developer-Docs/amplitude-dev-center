---
title: Import Adjust Attribution Data
description: Integrate Amplitude Analytics with Adjusts's attribution tools to see where users are coming from and which are your best-performing sources.
---

This integration combines Amplitude's analytics with Adjust's attribution tools into one unified system. Use this integration to share all user data in real-time and allow non-technical product and marketing team members to see where your users are coming from, and which are your highest performing sources.

!!!note

    This Adjust integration uses the [Amplitude Attribution API](../../analytics/apis/attribution-api.md) to send data to Amplitude. Make sure you understand how the Attribution API works before setting up this integration.

## About Adjust

[Adjust](https://www.adjust.com/) combines attribution for advertising sources with advanced analytics and store statistics. Segment your users by Adjust parameters like ad group or network to see how engagement, conversion, and retention rates differ across ad channels.

## Considerations

- Adjust uses the Attribution API, which means:
    - Attribution events are held for up to 72 hours for potential user matching. If a user didn't trigger an Amplitude event within 72 hours of the attribution event, the attribution data is dropped.
    - Attribution is matched to Amplitude users or events via the Advertising ID (IDFA/IDFV or ADID). Make sure you are sending this ID with your Amplitude events. [Android SDK](../../sdks/android) and [iOS SDK](../../sdks/ios) sends this data automatically. If you use [JavaScript SDK](../../sdks/javascript), you must send the Advertising ID using [HTTP API](../../../analytics/apis/http-v2-api).
- There can sometimes be a discrepancy between Adjust and Amplitude data. When a user doesn't trigger any events tracked by Amplitude within 72 hours, the linkage between the same user across both platforms may be temporarily affected. This may result in a lower event count in Amplitude when comparing to events in Adjust.
- Amplitude removes the ADID information due to privacy concerns, so you see `ADID = null` when you send ADID. The attribution information is processed, but is stripped of the ADID before the event is saved.

## Set up and use the integration

<!-- markdown-link-check-disable -->
You can find a complete set of instructions for implementing this integration in the [Adjust documentation](https://help.adjust.com/en/integrated-partners/amplitude).
