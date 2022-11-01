---
title: Import SendGrid Message Event Data
description: Send your SendGrid message event data to Amplitude to help you attribute results stemming from your organization's marketing and communication efforts.
---

SendGrid is a cloud-based customer communication platform that drives engagement and business growth through email delivery. Send your SendGrid message event data to Amplitude to help you attribute results stemming from your organization's marketing and communication efforts.

## Considerations

- If you are in the European Union, be sure you are working within the `eu.amplitude.com domain`, not `amplitude.com`.
- By default, SendGrid sends events with the email address as the user ID. If you use a different key, then attach a `unique_arg` to all your email events called `amp_user_id` and assign the Amplitude user ID to that value. This makes sure that Amplitude sends events using that value as the user ID.

## Setup

### Prerequisites

Before you begin, you need your Amplitude project API key. 

There are no other required setup steps in Amplitude. 

### SendGrid setup

1. In SendGrid, find Settings, then click **Mail Settings**.
2. Select **Event Webhook**.
3. Under HTTP Post URL, enter the following text: `https://<your-api-key>:CJdAK9fWEn4dH2UzKht37sAM@api.amplitude.com/sendgrid`.
4. Select the event data you want to send to Amplitude.
5. Toggle the Event Webhook Status to **Enabled**.
6. Save your work. 

Your selected events will now be sent to Amplitude. SendGrid event names in Amplitude are prepended with the prefix `[Sendgrid]` , and the Library is `sendgrid`.
