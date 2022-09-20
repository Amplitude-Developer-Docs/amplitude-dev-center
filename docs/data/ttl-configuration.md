# Time to Live

The Time-to-Live (TTL) feature allows you to have control over how long event data lives in your Amplitude instance. This feature allows you to set the time period for which you retain event data in Amplitude. The TTL feature is set at the Amplitude Organization level. Therefore, if you choose to set a retention period using the TTL feature, all event data that was sent to Amplitude prior to your retention period will be deleted from Amplitude. This job runs daily to ensure that the event data that you send to Amplitude is retained in accordance with the TTL policy set up by your organization.

This retention period is set at the **Amplitude Organization** level and impacts all event data. Using the TTL feature will not impact user data that you have sent to Amplitude. We currently do not support project level TTL, nor do we have the ability to set a retention period for only a subset of event data. 

**Note**: Amplitude uses the date the event data reaches the Amplitude server when determining the retention period for event data and therefore any backfill or migration of event data may affect the retention period for that event data.

## FAQ:

**Q: How do I enable/disable TTL for my organization?**
In order to enable or disable TTL today, you have to reach out to your Account Manager at Amplitude or fill out a support request [here](https://help.amplitude.com/hc/en-us/requests/new).

**Q: How will TTL affect my existing Amplitude reports?**
Once TTL is set up, charts that query data outside the retention period that you have set will be zeroed out. They will appear as if the data for that period never existed within Amplitude.

**Q: Can I retrieve the deleted data?**
Amplitude support can help you retrieve deleted data within 5 days following the first time that you enable TTL. Once data is deleted, it cannot be retrieved outside the first 5 days after TTL is first enabled. To retrieve deleted data within the first 5 days after you enable TTL for the first time, please contact support [here](https://help.amplitude.com/hc/en-us/requests/new).