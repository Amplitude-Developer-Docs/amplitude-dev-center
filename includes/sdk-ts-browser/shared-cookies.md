The SDK creates two types of cookies: user session cookies and marketing campaign cookies.

???config "User session cookies"
    |<div class="big-column">Name</div>| Description|
    |---|----|
    |`optOut`|<span class="required">Required</span>. A flag to opt this device out of Amplitude tracking. If this flag is set, no additional information will be stored for the user|
    |`userId`|Upon user log-in, if you send this value, it is stored in the cookie. Set this to uniquely identify their users (non-anonymous navigation). It is stored encoded using Base64|
    |`deviceId`|A randomly generated string. It will persist unless a user clears their browser cookies and/ or is browsing in private mode. Even if a user consistently uses the same the device and browser, the device ID can still vary|
    |`sessionId`|A randomly generated string for each session|
    |`lastEventTime`|Time of the last event, used to determine when to expire and create a new session Id|
    |`lastEventId`|Id of the last event|

???config "Marketing campaign cookies"
    |<div class="big-column">Name</div>| Description|
    | --- | --- |
    |`utm_campaign`| This identifies a specific campaign used (for example, "summer_sale") |
    |`utm_content` | This identifies what brought the user to the site and is commonly used for A/B testing (for example, "bannerlink", "textlink") |
    |`utm_id`|An optional parameter for tracking unique IDs or transaction IDs associated with the link.|
    |`utm_medium`| This identifies a specific campaign used (for example, "summer_sale") |
    |`utm_source`| This identifies which website sent the traffic (for example, Google, Facebook) |
    |`utm_term`| This identifies paid search terms used (for example, product+analytics) |
    |`referrer`|The last page the user was on (for example, `https://amplitude.com/behavioral-analytics-platform?ref=nav`)|
    |`referring_domain`|The domain that the user was last on (for example, `https://amplitude.com`)|
    |`dclid`|Google campaign manager Click Identifier|
    |`gbraid`|Google Click Identifier for iOS device from Web to App|
    |`gclid`|Google Click Identifier from URL parameters|
    |`fbclid`|Facebook Click Identifier from URL parameters|
    |`ko_click_id`|Kochava Click Identifier from URL parameters|
    |`msclkid`|Microsoft Click Identifier|
    |`ttclid`|TikTok Click Identifier|
    |`twclid`|Twitter Click Identifier from URL parameter|
    |`wbraid`|Google Click Identifier for iOS device from App to Web|
    |`li_fat_id`|LinkedIn member indirect identifier for Members for conversion tracking, retargeting, analytics|
    |`rtd_cid`|Reddit Click Identifier| 
