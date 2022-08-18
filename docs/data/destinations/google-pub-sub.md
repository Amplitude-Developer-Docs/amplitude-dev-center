---
title: Google Pub/Sub Event Streaming
description: Amplitude Data's Google Pub/Sub integration lets you stream your Amplitude event data straight to Pub/Sub.
---

--8<-- "includes/closed-beta.md"

Amplitude Data's Google Pub/Sub integration lets you stream your Amplitude event data straight to Pub/Sub.

## Considerations

- Amplitude sends the `user_id`, `event_name`, and `created_at`  along with all user, group, and event properties to Pub/Sub.
- The data Amplitude posts in Pub/Sub is the same JSON as documented in the [Amplitude Export API](https://www.docs.developers.amplitude.com/analytics/apis/export-api/#response).
- This destination supports Identify Forwarding. Anytime you make an Identify call to Amplitude, we forward that user information. See [Identify documentation](https://www.docs.developers.amplitude.com/analytics/apis/identify-api/) for more information.
- The ‘Google Cloud Service Account’ must be entered in as a base64 encoded string.  

## Setup

### Prerequisites

Before you get started, create a topic in Pub/Sub, and a Google IAM service account.

Amplitude needs two things from Pub/Sub to set up the integration:

- **Pub/Sub topic name**: the name of the topic, not the full name in the google cloud. See the [Google Pub/Sub](https://cloud.google.com/pubsub/docs/admin) documentation for help with this step. 
- **Google service account key**: A dedicated service account for Amplitude Pub/Sub integration should be created by the customer. See the [Google documentation](https://cloud.google.com/iam/docs/service-accounts) for help with this step.

### Google Pub/Sub setup

After you create your topic and service role, you must add the service account as a principle for the topic you created. For more detailed instructions for this step, see the[Google documentation](https://cloud.google.com/pubsub/docs/access-control?hl=en#console).

1. Open the topic.
2. In the *Permissions tab*, click **Add Principal**.
3. Add the service account's name.
4. Select **Pub/Sub Publisher** as the role.

Now, create a key for the service account. You need this to complete Amplitude setup. See the [Google documentation](https://cloud.google.com/iam/docs/creating-managing-service-account-keys) for help with this step.

### Amplitude Setup

1. In Amplitude, navigate to **Data Destinations**, then find **Google Pub/Sub - Event Stream**.
2. Enter a sync name, then click **Create Sync**.
3. Click **Edit**, then paste your Pub/Sub topic name and Google Cloud service account key.
4. Use the **Send events** filter to select the events you want to send. You can send all events, but we recommend choosing the most important ones.
5. When finished, enable the destination and save.
