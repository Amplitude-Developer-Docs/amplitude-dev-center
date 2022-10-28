---
title: Send Events via Fivetran
description: Use this integration to forward Amplitude events to destinations via the Fivetran connector.
status: new
---

Fivetran is the leader in automated data integration, delivering ready-to-use connectors that adapt to change. Using this integration, you can forward events from Amplitude to your destination using the Fivetran connector.

!!!info "This integration is maintained by Fivetran"

    Contact the [Fivetran Support team](mailto:pst@userinsider.com) with any questions about this integration.

## Considerations

- You must enable this integration in each Amplitude project you want to use it in.
- Sync frequencies to Fivetran are dependent on the plan level. Syncs can be anywhere from 1 minute to 24 hours. The default sync frequency is 6 hours.

## Setup

This guide complements the [Fivetran Amplitude setup guide](https://fivetran.com/docs/applications/amplitude/setup-guide).

### Amplitude setup

Copy the Amplitude API key for your project. There are no other setup steps in Amplitude.

### Fivetran setup

1. Log into your Fivetran dashboard.
2. In the [connector setup form](https://fivetran.com/docs/getting-started/fivetran-dashboard/connectors#addanewconnector), enter the Destination schema name of your choice.
3. Click **Add Project**.
4. Enter the project name, `apiKey`, and `secretKey` you found in [Step 1](https://fivetran.com/docs/applications/amplitude/setup-guide#getapikeyandsecretkey).
5. Click **OK**.
6. Click **Save & Test**. Fivetran starts syncing your data from your Amplitude account.