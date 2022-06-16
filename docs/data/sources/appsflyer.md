---
title: Import AppsFlyer Mobile Attribution Data
description: Integrate Amplitude Analytics with AppsFlyer's attribution tools to optimize ad spend and boost your ROI. 
---

This integration combines Amplitude's analytics with AppsFlyer's attribution tools into one unified system. With it, you can share all user data in real-time and allow non-technical product and marketing team members to pinpoint your targeting, optimize your ad spend, and boost your Return on Investment (ROI).

!!!note

    This AppsFlyer integration uses the [Amplitude Attribution API](../../analytics/apis/attribution-api.md) to send data to Amplitude. Make sure you understand how the Attribution API works before setting up this integration.

## About AppsFlyer

[AppsFlyer](https://www.appsflyer.com/) provides mobile advertising attribution and analytics, helping marketers to pinpoint their targeting optimize their ad spend and boost their ROI. Send your AppsFlyer data to Amplitude to see how your different acquisition sources are performing.

## Considerations

- AppsFlyer uses the Attribution API, which means:
    - Attribution events are held for up to 72 hours for potential user matching. If a user didn't trigger an Amplitude event within 72 hours of the attribution event, the attribution data is dropped.
    - Attribution is matched to Amplitude users or events via the Advertising ID (IDFA/IDFV or ADID). Make sure you are sending this ID with your Amplitude events. [Android SDK](../../sdks/android) and [iOS SDK](../../sdks/ios) sends this data automatically. If you use [JavaScript SDK](../../sdks/javascript), you must send the Advertising ID using [HTTP API](../../../analytics/apis/http-v2-api).
- There can sometimes be a discrepancy between AppsFlyer and Amplitude data. When a user doesn't trigger any events tracked by Amplitude within 72 hours, the linkage between the same user across both platforms may be temporarily affected. This may result in a lower event count in Amplitude when comparing to events in AppsFlyer.
- Amplitude removes the ADID information due to privacy concerns, so you see `ADID = null` when you send ADID. The attribution information is processed, but is stripped of the ADID before the event is saved.
- [Appsflyer](https://support.appsflyer.com/hc/en-us/articles/360001546905#how-do-srns-work-restrictions-on-sending-data-to-third-parties) implemented some restrictions to comply with certain media regulations, so app installs from AppsFlyer are categorized as organic. Some SRNs/partners require advertisers to hide media source data. It's hidden before forwarding attribution data to third parties like Amplitude. When required, installs and in-app events are sent without media source name and campaign details. For more information about AppsFlyer's integration, see their [help center](https://support.appsflyer.com/hc/en-us/articles/211200306-Amplitude-integration-with-AppsFlyer). Additionally, [here](https://support.appsflyer.com/hc/en-us/articles/360006091197#sending-data-to-third-parties) is information on the sources not available through AppsFlyer. A possible workaround for this is to either [export the raw data](https://support.appsflyer.com/hc/en-us/articles/209680773-Export-Data-Reports) from AppsFlyer, or collect raw data on your end. Then send the data using Amplitude's HTTP API.

## Set up and use the integration

You can find detailed instructions on implementing this integration in the [AppsFlyer documentation](https://support.appsflyer.com/hc/en-us/articles/211200306-AppsFlyer-Amplitude-Integration).
