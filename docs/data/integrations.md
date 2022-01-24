---
id: integrations
title: Integrating Other Tools 
---

:::note
Only admins have the ability to [configure integrations](https://app.iterative.ly/settings/integrations). 
:::

You can integrate Iteratively with your existing tools to streamline your analytics workflow.

<!-- ![Integrations](/img/integrations.png) -->

- [Slack](/integrations#slack) - Configure notifications to be sent to a shared Slack channel
- [Amplitude](/integrations#amplitude) - Sync your analytics schema to Amplitude
- [Github](/integrations#github) - Automatically create & merge analytics pull requests
- [Jira](/integrations#jira) - Automatically create tickets for your dev team when new versions are published

### Slack

![Slack Iteratively Integration](/img/slack-integration-notifications.png)

To keep your team on the same page you can configure notifications to be sent to a shared Slack channel. There are a few steps required to enable the feature:

1. Create a new WebHook inside of Slack. Iteratively will use this to send notifications

- In the Slack app menu, click on **Settings & administration** and **Configure apps**
- Select **Custom Integrations** than **Incoming WebHooks** than **Add to Slack**
- Choose a **Channel** to which notifications should be sent
- Copy the **Webhook URL** that's provided

2. Set up the integration in Iteratively

- Visit your **[Iteratively Settings > Integrations](https://app.iterative.ly/settings/integrations)**
- Select **Add** from the Slack section
- Insert your **Webhook URL**, and optionally type a **Channel** name
- Once you save, you're all set

### Amplitude

:::note
Your Amplitude account must include [Govern](https://amplitude.com/govern) (formerly Taxonomy) in order for this integration to work. 
:::

:::note
If you haven't already, you'll need to click the "Initialize Schema" button in Amplitude Govern to set your account up for sync with Iteratively. [Click here](https://help.amplitude.com/hc/en-us/articles/360047579451-Initialize-and-manage-the-Schema) to learn more.
:::

![Amplitude Iteratively Integration](/img/amplitude-iteratively-integration.png)

With the Amplitude integration enabled when you publish a new version of your tracking plan we'll sync your analytics schema so all of your metadata like description, categories, etc. show up inside of Amplitude. This makes it easy to manage your schema in one place and have it populate in the tool your team uses for analysis.

There are a few steps required to enable the feature:

1. Log into Amplitude, navigate to Project Settings (e.g. **analytics.amplitude.com/{org-name}/settings/projects/{project-id}/general**), and copy the **API Key** and **Secret Key**

<!-- ![Amplitude Iteratively Integration](/img/amplitude-integration.png) -->

2. Set up the integration in Iteratively

    - Visit your **[Iteratively Settings > Integrations](https://app.iterative.ly/settings/integrations)**
    - Click **Add** in the Amplitude section
    - Paste the **API Key** and **Secret Key** from the previous step, and click **Save**

Once you've added the integration, Iteratively will immediately upload your existing tracking plan to Amplitude. Later, when you publish new versions of your tracking plan, those changes will upload as well.

### GitHub

**Coming Soon** When you publish a new version we'll auto create a pull request for your development team that includes the latest analytics changes.

### Jira

**Coming Soon** When you publish a new version we'll automatically create a ticket for your team that includes instrumentation instructions and the list of changes for that version. 