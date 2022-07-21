---
title: Optimizely
description: Import Optimizely Experiment Data
---

Integrating Optimizely's experiment tools with Amplitude Analytics lets you share user data in real-time and helps non-technical product and marketing team members to do full-circle tracking, analysis, and engagement across web and mobile apps.

This integration is available to all customers who have access to Optimizely's Custom Analytics Integration feature.

## Before you begin

Be sure you have the most recent Amplitude Browser SDK implemented. Also, you **must** place the Amplitude snippet above the Optimizely snippet.

## Set up and use the integration

To integrate Optimizely with Amplitude, follow these steps:

1. Log in to your Optimizely account, select a project, and navigate to **Settings > Integrations**. The URL should adhere to this format: `https://app.optimizely.com/v2/projects/[PROJECT_ID]/settings/integrations`
2. From the *Create Analytics Integration..* dropdown, select **Using JSON.**
3. Insert the following code:

    ```json
      {
        "plugin_type":"analytics_integration",
        "name":"Amplitude Analytics Integration",
        "form_schema":[
          {
            "default_value":"[Optimizely Experiment]",
            "field_type":"text",
            "name":"property_prefix",
            "label":"User Property Prefix: A user property for your experiment will be sent in an identify call. The user property will be prefixed with this prefix.",
            "options":null
          },
          {
            "default_value":"n",
            "field_type":"dropdown",
            "name":"send_event",
            "label":"Send Event: Optionally send an event with campaign, experiment, and variation info",
            "options":{
              "choices":[
                {
                  "value":"n",
                  "label":"No (not needed)"
                },
                {
                  "value":"y",
                  "label":"Yes"
                }
              ]
            }
          },
          {
            "default_value":"User in Experiment",
            "field_type":"text",
            "name":"event_name",
            "label":"Event Name (optional)",
            "options":null
          },
          {
            "default_value":"",
            "field_type":"text",
            "name":"instance_name",
            "label":"Instance Name (optional): The instance name you are using in your amplitude instrumentation eg: amplitude.getInstance('my instance name'). Usually this is blank.",
            "options":null
          }
        ],
        "description":"Send an identify call to amplitude identifying the experiment variation the user is seeing. Also, optionally send an event to amplitude that the user is in an experiment.\n\nSettings:",
        "options":{
          "track_layer_decision":"// VERSION 0.1.0\n// Last Updated: July 9th 2019\n\nvar dataSent = false;\nvar MAX_ATTEMPTS = 9;\nvar RETRY_DELAY_MS = 1000;\n\nfunction getCampaignInfo() {\n return window.optimizely\n .get(\"state\")\n .getDecisionObject({ campaignId: campaignId });\n}\n\nfunction logEvent() {\n var campaignInfo = getCampaignInfo();\n\n if (campaignInfo) {\n var eventProperties = {\n \"[Optimizely Campaign]\": campaignInfo.campaign,\n \"[Optimizely Experiment]\": campaignInfo.experiment,\n \"[Optimizely Variation]\": campaignInfo.variation,\n \"[Optimizely Holdback]\": campaignInfo.holdback\n };\n amplitude.getInstance(extension.instance_name).logEvent(extension.event_name, eventProperties);\n }\n}\n\nfunction identifyCall() {\n var campaignInfo = getCampaignInfo();\n\n if (campaignInfo) {\n var identify = new amplitude.Identify().set(\n extension.property_prefix + \" \" + campaignInfo.experiment,\n campaignInfo.variation\n );\n amplitude.getInstance(extension.instance_name).identify(identify);\n }\n}\n\nfunction sendData() {\n if (!dataSent) {\n identifyCall();\n if (extension.send_event === \"y\") {\n logEvent();\n }\n }\n dataSent = true;\n}\n\nfunction sendToAmplitude(call) {\n if (call >= MAX_ATTEMPTS) {\n return;\n }\n \n var instanceKey = extension.instance_name || \"$default_instance\";\n\n if (window.amplitude && window.amplitude.getInstance) {\n var instance = window.amplitude.getInstance(extension.instance_name);\n \n if (instance._isInitialized) {\n return sendData();\n } else if (instance.onInit) {\n instance.onInit(function() {\n sendData();\n });\n return;\n }\n }\n \n return setTimeout(function() {\n sendToAmplitude(call + 1);\n }, RETRY_DELAY_MS);\n}\nsendToAmplitude(0);"
        }
      }
        
    ```

4. Turn the integration from Optimizely's Project Settings page. It's listed as *Amplitude Analytics Integration.*
5. Navigate to an experiment that's generating data that you want in Amplitude. In the Optimizely experiment settings panel, go to *Integrations*, and enable *Tracked* for the Amplitude Analytics Integration.
    You can also take this opportunity to adjust the following settings:
    1. **User Property Prefix**: Optimizely sends a user property to Amplitude to identify users who have been bucketed into the Optimizely experiment. This prefix setting makes it easier to identify these properties in Amplitude.
    2. **Send Event [Optional]**: When enabled, sends an event every time an experiment is fired. Configure to either yes or no.
    3. **Event Name [Optional]**: If you've selected to send an event, use this setting to specify it. Example: "Viewed Experiment"
    4. **Instance Name [Optional]**: See the [Amplitude JavaScript SDK](../sdks/javascript/#initialize) docs for more information about instance names.
6. Save your settings.
7. When the Optimizely experiment is running and collecting data, the user properties for this experiment appear in Amplitude.
