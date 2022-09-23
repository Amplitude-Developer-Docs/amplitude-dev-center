---
title: Create an Event Ingestion Integration
description: This guide walks through the basics of creating an event ingestion integration with Amplitude. 
status: new
template: guide.html
---

--8<-- "includes/partners/partner-portal-prereq.md"

This guide walks through the basics of creating an event ingestion integration with Amplitude. 

## Connection info

Currently, partners can build an integration to send data into Amplitude via the HTTP API v2, Batch API, or SDKs. However, we want to make it easier for Partners (like yourself) to create your Integration tile within the Amplitude app. Ultimately this will benefit your Integration as more customers can discover your Integration within the Amplitude app. Using the Integration Portal, partners can:

- Provide a brief overview of your Integration
- Provide a Display Name for your Integration tile in Amplitude App
- Choose an Integration category (for example, Messaging, Attribution, Ad Network)
- Self upload your company logo for your Integration tile
- Verify that data payload is received successfully in Amplitude
- Update your integration version (for example, V1.1 or V1.2.1)

![](https://lh6.googleusercontent.com/ybjv_Kk-SzwF10BANXVFVkaQSomfRH4DwMW1DLhfxl28aV2f2zfQBOWF6oGUIZP0JxGZ7uQIMSbbIA4QsrGaZ-JYh7Xj1wHZZI7ap-SS-5l_mjycPTt5lTD7EPJeehe8MQN2htsKOreYIdZRI3HTl1nr9abafVixuWJZe39JPdhqVc8SJlEUNf_LvQ)

![](https://lh3.googleusercontent.com/OGlzq8G3s3NdeL-Ee2oOTiYqIAI9EF6FjUfxfKiTjfnX8QlTUum8LkxZHNdcJfaWtE3H0-CKr5ntDBbdDl22IM6HNq9XSwgCD3jLtsu3PcdNzW5oRfpO7WfVYrw4ghs-Aq6_ZiqnGC2L4srH5EXx38yfL6keGSwT9rb3dAgcnRzf2ciMKAcbPh1tMQ)

- Display Name: Integration name that will be displayed to the users
- Category: Choose a category and this will be important for the [Integrations Catalog](https://amplitude.com/integrations)
- Summary: Brief overview of their company
- Full Description: Detailed description of your integration. We recommend including some key use cases. 
- Integration Logo: Uploading your integration logo.

## Add New Source

### Set Up Integration

![](https://lh3.googleusercontent.com/8SsGc7ZWFGVR2bfynUCIPXFPzITWFrIqbZa1H2UZFE-OF3rMnecN0UOYszLQEJaDht7hCmTMoSCxIurAr_XEjZ9CqvQ_e6P_d5j2jC0j3rVWxkgKhBF9jNRkn5uJufLu1Xjfg1Kklo8TJH0QxOMIYC_0r5KVyYzWkWOQjHqHQlRJC3rxGV-ORXZgkg)


![](https://lh6.googleusercontent.com/iKz9HLgVfj3ieaFDAL4Q23TdkewNgbEjnn6z0U8gTa23Dp6Is1DvML6IKklMbPDwvgWaoPFm9ktaVMfTOU57NlY55lz0kJU7BIvwJGKFS1rIpis_iMmySDfMeUl5GnIPZ8GyVHlWkf3n-ecx9OY0sr_kJq_1c4mkEASycKT3APD1Ysg7IHHChOf8-A)

Note that this page is divided into two sections. 

- Left Panel: First, the "Configuration" section on the left is where you'll build you will create the Setup Instructions for your Data Source, Integation tile.
- Right Panel: The "Preview Data Source Setup Page" section provides a preview of what your setup instructions would like for a User


???tip "Example setup flows"

    See below for various example on the Setup flow for Data Source for Braze, Split and Rudderstack.

    ???example "Setup flow for Data Source - Braze Integration"

        ![](https://lh6.googleusercontent.com/tlRYtfAfVPykAbCm--aXxsicBQ5IZoURNqN2x5I9ysou5zXbtMb65XrlNbQ1j4EijR7LzJgJILixv7IwgkA59f_VnAeyi7WXV5Q0k2LKhugEL6_8Q1XedVXufQGdtjJwgjp2gMZFJCS5H9DjBsnyWVY9IYOhVwc-LhsotVOIXplBRNFFXt9b70F_Gg)

    ???example "Setup flow for Data Source - Split Integration"

        ![](https://lh3.googleusercontent.com/6dU_Clcdbvetuo28ac11ZkISadWYcIXC8wkCgUErME95pbeVzuGH19ZE98THSAGF6Cyd44_mkdmxwIOQ4z-A3iQIYBknqQFI61_kq2oLUw3tugaUH8IIChMZw_7wUSxMwXK5QwEKn3zh7YQTf94sKASxeHmSyDZdiGphKKS4XbTl4TvvT9lapF8scg)

    ???example "Setup flow for Data Source - RudderStack Integration"

        ![](https://lh3.googleusercontent.com/vgSf_zu-u9vc2TtvkGvT8M7py3_wRrsZFtMUzykZ2RDWU4gFripsg1Wcsu8kDtrYvw1XF1NKjHp3b_7g-8Lp_aTIRyEk-WQAiDZWLMteplHEFj0qwRzIsBKrvUMdCedWxZQ_62xJizOS4EkHUVX8EjRYD0zwwaFiwIPzqP840MoHmsfZExXsYKiuEA)

### Select Connection Information

The first step is choosing the Connection Info that you configured in [[Part 1] - Connection Info](https://docs.google.com/document/d/1B5fx-Ck87pzxKdqWIiZvDboET-Kwwor-A-im0V_rCV8/edit#heading=h.6nkk1qrrst0q). 

In the future, we will roll out a versioning system so you can select from various Connection types.

![](https://lh3.googleusercontent.com/D3oYnKnizkRjMwBtjfh1P9TQga7fg63J13ew97yzRP5QkouptrNZZfx92wXCw0q3SN5I9NuJIfAlxsb6Xi0hdFRBrO8Q2PTlGkIZ14TG4RqrW7GYjpOrlL9vWBBC69fdt3a1fl6dBHeaYbrsNMyBX2YsO-zhYGJL3s7cBwEG2q5OuVtlUneAnGS6Ew)

### Display Name

![](https://lh4.googleusercontent.com/ekYtkax0gohvfVymo9-CeCBJaAr6SByIuopljTPOcAMXaIBvPX8GV-6zrIvvk1eew4fUV4B3cJiNC-gch6cPuFwFt3NtPlEtJiJtzceU-tv0UKIA5McOSlbIQX0SUOXtway-CQHPEd9xwObAmNaGbpeGP2n6GxqfVC_CUWiHPHKhn3YzC75XxGSeRA)

The Display Name is configured in [[Part 1] - Connection Info](https://docs.google.com/document/d/1B5fx-Ck87pzxKdqWIiZvDboET-Kwwor-A-im0V_rCV8/edit#heading=h.6nkk1qrrst0q). If you like to change it, go back to [[Part 1] - Connection Info](https://docs.google.com/document/d/1B5fx-Ck87pzxKdqWIiZvDboET-Kwwor-A-im0V_rCV8/edit#heading=h.6nkk1qrrst0q), to reconfigure your Connection information.

### Integration subtitle

![](https://lh4.googleusercontent.com/twFNDFnSKXfacMNCZZQ69aKNzVdmMBjkLCeaMMzjlJwRJg-1I3OhiTrruz2PN3gQ6r-wskJSEBUnxoyDx4N7es938lnkRfYTVi3eRBIQ8Q5XkkrKOj8kyEbrwclOCcsNBT-8sw8sREj2e9BByvqRRlMjvN5K7XPvP8681TZ8wnleITnUVjSs46Iwbg)

Include a one-liner to explain your connection.

- Example 1 - If you use Braze, you can now send events to Amplitude.
- Example 2 - If you're using RudderStack to ingest data, you can import events into Amplitude with a few simple steps.
- Example 3 - If you use Split for feature flagging and experimentation, you can track data into Amplitude with a simple configuration.

![](https://lh3.googleusercontent.com/vpxmIUFX2n0lcnUdp0uZv-iVbVWUApXkbOcbHezjiL5WIwcRZdCHtYEun7FC8fTsoGxFB5_oomr_vEohltvpqeSo4I4iTemh5Kx5rA4panxWMpCv6ohoXNC3ZnQLV0IjPM38pTTIrFvfx_bYwfZNETqJbwC8uXxmuoo-hhzmwyRj78azLYBeBogpng)

An illustrative example of what the preview would look like based on Example 1.

### Setup Instructions

![](https://lh4.googleusercontent.com/1RmA1d43inGlw_TILlzinfDYMn7QMkBKGhKctSVFPpHkegQiJnJbQc0tRgFZo9l_Uk57iIh3MOBZy4f5LdidCVHBIA7WVRpiX2ACLMD4cWf96ZzUZbq6fEPyJK8ezwNvH6hjyGFbo4jS-QL2qPAOuUCOegS3Zaivh7EM4a6kZJOmbP_k1q4E0BVZ4w)

- Step Instruction: Put in a brief description for each step.
- Add New Step: Click "Add New Step" to add additional steps. If possible, we recommend keeping the total setup steps between 5-8 steps to improve the user experience
- Show Project API Key: By checking "Show Project API Key", it will automatically pull the relevant Project API on behalf of the user. Remember that all Sources & Destinations for Amplitude are configured at a per [project level](https://help.amplitude.com/hc/en-us/articles/360058073772-Create-and-manage-organizations-and-projects) as opposed to the Org Level.
- Add instruction Image: This step is optional but feel free to include any illustrative image (see below) that would provide more guidance during the setup process.

![](https://lh4.googleusercontent.com/sJauLSDJfbQuiH_bEslkdSrujhXjLVJBnVFULzE7Gxo244GQMRFyJ3zTvXYti1lLJdZVqZGh7xBHfmtHSTKVPiQKd833Fu7u9y_cOAbRk02cciz22jgq95I11qaIWI1OfcWc2JmLC8alc42wsjABB8NRPMy2mawVWQ3larYVkiDd70upr4b6noSPNg)

An illustrative example of what the preview would look like based on the inputs above.

### Additional Resources

![](https://lh6.googleusercontent.com/ydp52C-Y19tyD1xKwNSYRRhw8CQgcLST63xU9Qt7F6b8zy5jw32MXCda63vj06TeJQOOHiy2PKhMmR714si1bdh5gVBZL8rlrAF1-WlJF3szMkGbEK5A3gl1Xncbx4pL3v731VMUozkXF1ty9bk3JCSDvWSbNFQEjZkfxNSbNmJ1y0uGpZdsi8Y-Pw)

Feel free to modify the sections in yellow below.

See the Amplitude [documentation](https://docs.google.com/document/d/1B5fx-Ck87pzxKdqWIiZvDboET-Kwwor-A-im0V_rCV8/edit#heading=h.666581csaxvq) for additional details and instructions.

![](https://lh3.googleusercontent.com/yq_VAjH3R71IfMdZlAnYkvC_5AhND-dL1dGIzFd0cN_gNHNuHeT7q5OMOi2zhsk13FJ_4ERjxkuBt5wHti3oZUi94CNo6amTpmnbQI4ztAa6domHafZcdgmYJbHz1_zaOi-AZW8YPmXDCjX5cKXyvxN4M3mlX_xjxGOlCcaz8yO_9oM8mSFcQlMhUQ)

An illustrative example of what the preview would look like based on the inputs above.\
 |

## Submit the integration

![](https://lh4.googleusercontent.com/0-4IrRtoivvs7XyQsdoAbH8aBtjgXqDcOnWpmTBTPjI3pOtNShUW9sVVYHUzyrmVQpwXX_LHzahdW2odVFfdW1RAoGrA9BXeFZIlTTlBA25EE5nsgQWH7Sqf2K6q74hbKSzazqUjIk7gyR_L7q-okaRGKXTdUcSsMoBqxchdhQricJvQpvHbG2Oxtg)
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

- Valid Project ID: Choose a valid Project ID in your organization for testing.
- Partner_ID: One addition that isn't called out in this [HTTP API V2 document](https://developers.amplitude.com/docs/http-api-v2) is the partner_id parameter that should be added when sending events to Amplitude on behalf of customers. This will allow us to track the events coming from specific partners and validate the number of customers using the integration.
- Send test event from your system: See the example below for a sample payload that includes partner_id.

![](https://lh3.googleusercontent.com/c3cHNA7X3l9x2GselagpmuTbyFZRQMrRFgcLbnImvX6e_FV59C9TzaSu0A6d2CcRY_uHNWZi6bWncPu3uAFOMjTjv5eGRg0sujRDoJiQIwCHzlj38oJiqO7LnJMXS6h5XxyYVzNFOXIojlKxAEeTtq3R2MK0oJEE6NaJdPP7Wa-l7N0TcdA1vS9X-A)

- Verifying events: This will usually take a few minutes for events to register.

Once you've validated that events are received successfully into Amplitude, click "Save" on the top right corner and it will notify our Engineering team to review your integration.
