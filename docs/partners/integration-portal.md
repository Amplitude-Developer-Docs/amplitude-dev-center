---
title: Integration Portal
description: words
status: new
---

The Integration Portal enables partners and the Amplitude team to scale the growing number of data connections available to Amplitude customers as you get ready to unify customer behavior data and better understand the complete customer experience.

!!!beta

    This Integration Portal is in Closed Beta, and is still in active development. 

## Getting started 

This Integration Portal suits partners who want to either build all or any of these kinds of integrations:

1. [Event Ingestion](https://docs.google.com/document/d/1B5fx-Ck87pzxKdqWIiZvDboET-Kwwor-A-im0V_rCV8/edit#bookmark=id.36vif7agpt15) - Today, partners (such as yourself) send event data into Amplitude via our[HTTP API v2](https://www.docs.developers.amplitude.com/analytics/apis/http-v2-api/),  [Batch Event Upload API](https://www.docs.developers.amplitude.com/analytics/apis/batch-event-upload-api/), or [SDKs](https://www.docs.developers.amplitude.com/data/sources/). However, we want to make it easier for Partners to self-define and provide all the contextual information for their own Data Source Integration tile within Amplitude App. Using the Integration Portal, partners can:
      - Provide a brief overview of their Integration
      - Provide a Display Name for your Integration tile in Amplitude App
      - Choose an Integration category (for example, Messaging, Attribution, Ad Network)
      - Self upload your company logo for your Integration tile
      - Verify that data payload is received successfully in Amplitude
      - Update your integration version (for example, V1.1 or V1.2.1)
2. [Cohorts](https://docs.google.com/document/d/1B5fx-Ck87pzxKdqWIiZvDboET-Kwwor-A-im0V_rCV8/edit#bookmark=kix.9crabkxbid7l) - Build your own Amplitude Data Destination cohort tile to enable users to [sync cohorts](https://docs.google.com/document/d/1B5fx-Ck87pzxKdqWIiZvDboET-Kwwor-A-im0V_rCV8/edit#heading=h.nq2arr5g93ci) (audiences) from Amplitude to your platform through a series of REST API calls.
3. [Event Streaming](https://docs.google.com/document/d/1B5fx-Ck87pzxKdqWIiZvDboET-Kwwor-A-im0V_rCV8/edit#bookmark=id.id25je5n2n11) - Build your own Amplitude Data Destination Event Streaming tile to enable users to stream Amplitude event data straight to your platforms. Amplitude sends all user, event, and group properties along with the event. COMING SOON during week of Sep 26th 

### Prerequisites 

To get started, you need to do the following:

1. Apply through our [Technology Partner Portal](https://info.amplitude.com/technology-partners).
2. Sign both the mNDA + Partner agreement.
3. [Sign up](https://amplitude.com/get-started?utm_source=adwordsb&utm_medium=ppc&utm_campaign=Search_APAC_AU_EN_Brand&utm_content=Brand_Phrase&utm_term=amplitude&gclid=CjwKCAjwo_KXBhAaEiwA2RZ8hEl3xAKC7rR315frp2apgK-x2xNwp6iImFVAJ_ruLDcfUj3Uhp7xahoC6ogQAvD_BwE) or have an existing Amplitude plan.
4. Email integrations@amplitude.com with your [Org ID](https://help.amplitude.com/hc/en-us/articles/235649848-The-Settings-page) so we can enable the Integration Portal.  This also enables the partner sandbox plan to provide you access to all the same features as the Enterprise plan for testing purposes.

### High-level Process to get listed within Amplitude App

1. Partner to navigate to Integration Portal: Within Amplitude, navigate to the My Settings page and click on "Developer Portal." If you don't see this, send an email to integrations@amplitude.com with your [Org ID](https://help.amplitude.com/hc/en-us/articles/235649848-The-Settings-page), and we'll enable the feature flag.
2. Partner to configure Integration: Once you've submitted your integration, it will notify our Engineering team to review your integration.
3. Amplitude Engineering team to review Integration: During the review process, the Amplitude team will validate the integration which could take up to 1 week. During this process, we may reach out to you if we have any further questions.
4. Integration live in Amplitude: Once we've approved the integration, it will automatically be deployed and enabled for your organization. You'll then be able to see a tile within Amplitude app on the source or destination page depending on the type of integration you've built.
5. Get listed on Partner Directory: Once you have filled out this [survey](https://docs.google.com/forms/d/e/1FAIpQLSc-fQrCQsV48V46QroyjEonKkn02PXmwhsVEKguES9M-la7CQ/viewform) and sent your logo to partnerships@amplitude.com (ideally on a transparent background), our Partnerships team will post your listing and technical documentation on the Amplitude Partner Directory. Note you will need at least 4 customers using your integration to get access to the Partner Directory.
6. Get listed on Integrations Catalog: We will also include your Logo on our [Integration Catalog](https://amplitude.com/integrations) page to improve discoverability and promote your Integration. Just make sure you complete this [survey](https://docs.google.com/forms/d/e/1FAIpQLSc-fQrCQsV48V46QroyjEonKkn02PXmwhsVEKguES9M-la7CQ/viewform).
7. Co-Marketing Opportunities: Click on this [Amplitude Technology Partner Overview doc](https://info.amplitude.com/rs/138-CDN-550/images/Amplitude_Tech_Partner_Overview.pdf)  to learn more about the benefits and requirements associated with each partnership tier (Integration, Advanced & Premier). Each level provides benefits designed to help your company evolve towards digital optimization.

After you submit your integration to Amplitude, it's reviewed. During the review process, the Amplitude team validates the integration. This could take 1 to 2 weeks. To help streamline communications between your team and Amplitude, Amplitude will create a mutual Slack channel.

## Event Ingestion

### Part 1: Connection info

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

### Part 2: Add New Source

#### Set Up Integration

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

### 1) Select Connection Information

The first step is choosing the Connection Info that you configured in [[Part 1] - Connection Info](https://docs.google.com/document/d/1B5fx-Ck87pzxKdqWIiZvDboET-Kwwor-A-im0V_rCV8/edit#heading=h.6nkk1qrrst0q). 

In the future, we will roll out a versioning system so you can select from various Connection types.

![](https://lh3.googleusercontent.com/D3oYnKnizkRjMwBtjfh1P9TQga7fg63J13ew97yzRP5QkouptrNZZfx92wXCw0q3SN5I9NuJIfAlxsb6Xi0hdFRBrO8Q2PTlGkIZ14TG4RqrW7GYjpOrlL9vWBBC69fdt3a1fl6dBHeaYbrsNMyBX2YsO-zhYGJL3s7cBwEG2q5OuVtlUneAnGS6Ew)

### 2) Display Name

![](https://lh4.googleusercontent.com/ekYtkax0gohvfVymo9-CeCBJaAr6SByIuopljTPOcAMXaIBvPX8GV-6zrIvvk1eew4fUV4B3cJiNC-gch6cPuFwFt3NtPlEtJiJtzceU-tv0UKIA5McOSlbIQX0SUOXtway-CQHPEd9xwObAmNaGbpeGP2n6GxqfVC_CUWiHPHKhn3YzC75XxGSeRA)

The Display Name is configured in [[Part 1] - Connection Info](https://docs.google.com/document/d/1B5fx-Ck87pzxKdqWIiZvDboET-Kwwor-A-im0V_rCV8/edit#heading=h.6nkk1qrrst0q). If you like to change it, go back to [[Part 1] - Connection Info](https://docs.google.com/document/d/1B5fx-Ck87pzxKdqWIiZvDboET-Kwwor-A-im0V_rCV8/edit#heading=h.6nkk1qrrst0q), to reconfigure your Connection information.

### 3) Integration subtitle

![](https://lh4.googleusercontent.com/twFNDFnSKXfacMNCZZQ69aKNzVdmMBjkLCeaMMzjlJwRJg-1I3OhiTrruz2PN3gQ6r-wskJSEBUnxoyDx4N7es938lnkRfYTVi3eRBIQ8Q5XkkrKOj8kyEbrwclOCcsNBT-8sw8sREj2e9BByvqRRlMjvN5K7XPvP8681TZ8wnleITnUVjSs46Iwbg)

Include a one-liner to explain your connection.

- Example 1 - If you use Braze, you can now send events to Amplitude.

- Example 2 - If you're using RudderStack to ingest data, you can import events into Amplitude with a few simple steps.

- Example 3 - If you use Split for feature flagging and experimentation, you can track data into Amplitude with a simple configuration.

![](https://lh3.googleusercontent.com/vpxmIUFX2n0lcnUdp0uZv-iVbVWUApXkbOcbHezjiL5WIwcRZdCHtYEun7FC8fTsoGxFB5_oomr_vEohltvpqeSo4I4iTemh5Kx5rA4panxWMpCv6ohoXNC3ZnQLV0IjPM38pTTIrFvfx_bYwfZNETqJbwC8uXxmuoo-hhzmwyRj78azLYBeBogpng)

An illustrative example of what the preview would look like based on Example 1.

### 4) Setup Instructions

![](https://lh4.googleusercontent.com/1RmA1d43inGlw_TILlzinfDYMn7QMkBKGhKctSVFPpHkegQiJnJbQc0tRgFZo9l_Uk57iIh3MOBZy4f5LdidCVHBIA7WVRpiX2ACLMD4cWf96ZzUZbq6fEPyJK8ezwNvH6hjyGFbo4jS-QL2qPAOuUCOegS3Zaivh7EM4a6kZJOmbP_k1q4E0BVZ4w)

- Step Instruction: Put in a brief description for each step.

- Add New Step: Click "Add New Step" to add additional steps. If possible, we recommend keeping the total setup steps between 5-8 steps to improve the user experience

- Show Project API Key: By checking "Show Project API Key", it will automatically pull the relevant Project API on behalf of the user. Remember that all Sources & Destinations for Amplitude are configured at a per [project level](https://help.amplitude.com/hc/en-us/articles/360058073772-Create-and-manage-organizations-and-projects) as opposed to the Org Level.

- Add Instruction Image: This step is optional but feel free to include any illustrative image (see below) that would provide more guidance during the setup process.

![](https://lh4.googleusercontent.com/sJauLSDJfbQuiH_bEslkdSrujhXjLVJBnVFULzE7Gxo244GQMRFyJ3zTvXYti1lLJdZVqZGh7xBHfmtHSTKVPiQKd833Fu7u9y_cOAbRk02cciz22jgq95I11qaIWI1OfcWc2JmLC8alc42wsjABB8NRPMy2mawVWQ3larYVkiDd70upr4b6noSPNg)

An illustrative example of what the preview would look like based on the inputs above.

### 5) Additional Resources

![](https://lh6.googleusercontent.com/ydp52C-Y19tyD1xKwNSYRRhw8CQgcLST63xU9Qt7F6b8zy5jw32MXCda63vj06TeJQOOHiy2PKhMmR714si1bdh5gVBZL8rlrAF1-WlJF3szMkGbEK5A3gl1Xncbx4pL3v731VMUozkXF1ty9bk3JCSDvWSbNFQEjZkfxNSbNmJ1y0uGpZdsi8Y-Pw)

|

Feel free to modify the sections in yellow below.

-----------------------------------------------------------------------------------------------------------------------

See the Amplitude [documentation](https://docs.google.com/document/d/1B5fx-Ck87pzxKdqWIiZvDboET-Kwwor-A-im0V_rCV8/edit#heading=h.666581csaxvq) for additional details and instructions.

![](https://lh3.googleusercontent.com/yq_VAjH3R71IfMdZlAnYkvC_5AhND-dL1dGIzFd0cN_gNHNuHeT7q5OMOi2zhsk13FJ_4ERjxkuBt5wHti3oZUi94CNo6amTpmnbQI4ztAa6domHafZcdgmYJbHz1_zaOi-AZW8YPmXDCjX5cKXyvxN4M3mlX_xjxGOlCcaz8yO_9oM8mSFcQlMhUQ)
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

An illustrative example of what the preview would look like based on the inputs above.\
 |

[Part 3] - Submit
-----------------

![](https://lh4.googleusercontent.com/0-4IrRtoivvs7XyQsdoAbH8aBtjgXqDcOnWpmTBTPjI3pOtNShUW9sVVYHUzyrmVQpwXX_LHzahdW2odVFfdW1RAoGrA9BXeFZIlTTlBA25EE5nsgQWH7Sqf2K6q74hbKSzazqUjIk7gyR_L7q-okaRGKXTdUcSsMoBqxchdhQricJvQpvHbG2Oxtg)
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

- Valid Project ID: Choose a valid Project ID in your organization for testing.

- Partner_ID: One addition that isn't called out in this [HTTP API V2 document](https://developers.amplitude.com/docs/http-api-v2) is the partner_id parameter that should be added when sending events to Amplitude on behalf of customers. This will allow us to track the events coming from specific partners and validate the number of customers using the integration.

- Send test event from your system: See the example below for a sample payload that includes partner_id.

![](https://lh3.googleusercontent.com/c3cHNA7X3l9x2GselagpmuTbyFZRQMrRFgcLbnImvX6e_FV59C9TzaSu0A6d2CcRY_uHNWZi6bWncPu3uAFOMjTjv5eGRg0sujRDoJiQIwCHzlj38oJiqO7LnJMXS6h5XxyYVzNFOXIojlKxAEeTtq3R2MK0oJEE6NaJdPP7Wa-l7N0TcdA1vS9X-A)

- Verifying events: This will usually take a few minutes for events to register.

Once you've validated that events are received successfully into Amplitude, click "Save" on the top right corner and it will notify our Engineering team to review your integration.

2) Cohorts
==========

[Part 1] - Set Up Integration
-----------------------------

|\
 |

✐ [Part 1] - Set Up Integration

 |
|\
 |

This section is about configuring your integration tile that will appear on the Destinations page in Amplitude. You'll also need to decide between a **List-Based Cohort Integration** or a **Property-Based Cohort Integration**. See this [doc](https://www.docs.developers.amplitude.com/partners/sending-cohorts/) for more information.

 |

![](https://lh5.googleusercontent.com/ZJzu0rjc6R8Zs8zrJPcvlRxaNJM4zePnPtMUcDVFVs5voYUBmYuGiU2kNTwBbiV_1Qfe-f2hJUYguX7aKL2K65UqvA01zS4qUFGWrd0nnZYiuf3WyfmyeJr7OYQP67lYDQLoxmI-88532-JtF3w2E5VWdo6_NG-qBIumc4XzX7KrpWYTJyPkqbnNuw)

1) Display Name

- This is the integration name that will be displayed to the users in Amplitude. This name will be used in the modal and integration tile.

2) Integration Logo

- Upload your company's icon. Ensure that it's a PNG file. Once you've uploaded your company's logo, you'll see a preview of your tile. See below for an example of what your tile would look like if it was on the Destinations page in Amplitude.

![](https://lh4.googleusercontent.com/Y95LSLDM-7xWPaZ-RE9YUVwK1TzFyNJP3y1w5BOSfsfBaiyrNxXbNJfYrPFaqkr5G-aS1KJO_6j3_MUmZ_lG3BTrm_Oqgf00opaPvkGd1J5rYNBlujNyLir5Kh4ltmg_S-5PXvpbNMFeuzc-ZQl3QeaUOsQn-1FPqEEhcLK0Eld0RSXsrDOq1putsQ)

Once your integration has been validated, your tile will appear in the Destinations page in Amplitude.

3) Integration Type

Please choose if you are building a list-based vs a property-based cohort integration. 

- List-based Cohort Integration: A list-based cohort integration works best if a cohort is represented as a list of user identifiers in the target system. A call to a list creation API is needed on the first sync, then subsequent calls to add API and remove API are made to keep the list membership up to date.

- Property-Based Cohort Integration: A property-based cohort integration works best with systems that represent cohort membership as a custom user property, such as a boolean flag or a tag. Amplitude will invoke the update API when cohort membership changes to update the user property accordingly. While no list creation API is needed, some manual steps may be required to create the customer user property.

[Part 2] - Configuration
------------------------

|\
 |

✐ [Part 2] - Set Up Integration

 |
|\
 |

Note that this page is divided into two sections. 

- Left Panel: First, the "Configuration" section on the left is where you'll build your configuration for your payload would look like and what you expect to receive from Amplitude.

- Right Panel: The "Testing Integration" section summarizes your configurations, including your setup modal screen for your integrations, variables, and payload.

 |

![](https://lh4.googleusercontent.com/HglYGdrFcEMhftaclislKDK11uGVGmqadx4QHYBtYA91oUD5gyqKeH9XIyKWMEfvWCRIqkgAzQN3v44FEqsK53CnKvngwlinU5f-VoZt8hUe1JF7RN13Y40x65FqwqTn2Fbtl_ACE57qev4mA3XDHwc77Y0S6LfqLK7nXLnj0ud0cH0lIeJ2TnA2Mg)

### 1) Authentication method for all API calls

The first step is determining how you plan to authenticate the API call between Amplitude and your company.

![](https://lh6.googleusercontent.com/5e0UDO_NbyrGd61RHQgmbb3iKAPnxB1KgVwowcXtbbwb86Y2-xObD-R0kNsluxSx3_jVI4JsEGNfaD5OYL5dIzZ_NlZbfn16aTVbY-5qmTmyxxztIzWfAyo25BCr3pcuFxLXhwT_u6TdnwS84KjotMTSYOE9qzQE7i171HJhjKtipqA68q-fitmI5A)

Once you click on "Customer Headers", you'll be able to choose from the following:

- No authentication: No Authentication header is needed

- Basic Authentication: Use API key and API Secret (optional) as authentication headers

- Authentication Header: Authenticate with API key

- Bearer Token: User Bearer Token as an Authorization header

### 2) Custom Fields

![](https://lh6.googleusercontent.com/5e0UDO_NbyrGd61RHQgmbb3iKAPnxB1KgVwowcXtbbwb86Y2-xObD-R0kNsluxSx3_jVI4JsEGNfaD5OYL5dIzZ_NlZbfn16aTVbY-5qmTmyxxztIzWfAyo25BCr3pcuFxLXhwT_u6TdnwS84KjotMTSYOE9qzQE7i171HJhjKtipqA68q-fitmI5A)

These fields collect and replace the $variable declared in the payloads in the API calls below.

- Field Type: You can specify what Field type is required (String, Single Select, Button Group)

- Field variable name used in the payload: By default, this will match your authentication choice. for example,, If you choose Bearer Token as the authentication method above, it would be "bearer_token."

- Display name: By default, this will match your authentication choice. for example,, If you choose Bearer Token as the authentication method above, it would have a placeholder Display name called "Bearer Token."

- Add New Custom Field: If you need to add another identifier that you think would be required for the payload, you can add custom fields such as String, Single Select, and Button Group.

|\
 |

✐  Note

 |
|\
 |

1. We recommend using underscore "_" instead of dash for the Header Values. for example, `$api_key` instead of `$api-key`.

 |

### 3) Mapping Fields

This section is a way for you to specify how Amplitude will map to the respective destination (your company). The value of the mapping will replace item_template in the payloads below.

![](https://lh5.googleusercontent.com/wH4dm8pMnjnqO3hgXBngdgNpfaykzFVBUBhfYOz1k7kpYLSgmjjw74DzaHqr8MfFM-diiMt6v83DT5AEFR6pptKtKGL9Q0LePQLMsmOhAmhZKWHDVAwS91rUwI8Jn-eImZlcqousza5OZln-facBeSImFbLK_nWmw__tbCvR2P10OAfOtmKSLwxi9g)

- Mapping Field Display Name: We recommend putting this as "Key," "Identifier," or "User ID Mapping."
- Amplitude Mapping Field:  for example, user_id_field_amplitude
- Field Type: This could either be a "String" or "Single Select."
- Display name: This can be fully customizable by you. for example,, User ID, Email, etc
- Add New Mapping: You can add additional mappings if required such as String, Single Select, Button Group

![](https://lh5.googleusercontent.com/3ulMtSM-hwn6SyzgPbchNzUy04u48xLxFaevV5DsQcgblspwj5nVV_EkzAZimpMm83ptS_3Efp4ivPh94FGVfknkBY7tHYaOA0jOUDK331LOCYl1W7csUtn6lwfp2YjBDisHMihmNFtju4NRhAHvI-jomJm_CwIerfRDE9V25teSncL71gJfOgSDQw)

An illustrative example for a simple configuration for Bearer Token. Note the Panel on the right "Connect to Amplitude" is the modal screen that the user will see when trying to setup your integration in Amplitude's destination page.

![](https://lh4.googleusercontent.com/c28531wIrI4iuQda3uXNHKVUc_QqWO8iwHzJs4FxeYRZ4uhrsSRsXSKHMO-X6E-jVVJq03Z-h7H5QJNjF5uE1VhO3Y0eXry1b9jQuerZeNavk3Wmxkui4zBRXSsC3jGfOl4R5Fcvw32nAAiyVaBWrkXi3LTLENulcFn5kHrkNyNKI57pF3Yy0KpMlQ)

This is an example of what a built-out modal would look like in Amplitude once you've finalized your configuration. This would be part of the user's setup process when setting up your integration. Note this example shown is using "Basic Authentication".

### 4) Slugify Amplitude Cohort Name

You will have an option to apply our slugify support. This would be helpful to standardize the cohort name for in the event that your system that does not support special characters (for example, Spanish, French).This feature is to convert your Cohort Name to a URL slug by replacing the special characters in unicode and spaces with ascii and hyphen. This feature is only available when the variable `$amplitude_cohort_name` appears in the payload of the endpoints. Our slugify rule is as follows:

- Convert the original Cohort Name to normalization form KD (NFKD), which is compatibility decomposition.

- Substitute the hyphens for the characters except for the alphabets (a-z, A-Z), the numbers (0-9) and the underscores (_).

- Cut the words to be up to 100 characters.

![](https://lh4.googleusercontent.com/JQTiuqvrYPCYnVyc79apVD5Z9cTEahgMOcT-M4r0ZVU1y-0VQWCUHZxaaOri2INKXhUDMtVA8abYReWMTchzhi1Gq300Z0Pr9sqm0WJ_sXEO52diac29o22-CZ8WXyjGgfhxsHmW1Zxdcw9zDyonxcpLhdzHDDBPwr4jfkSmjT8VIOUL8XlxM-zlVA)

### 5) "List Creation" Endpoint

You will need to call three different APIs for a List-based Integration. The first one is the List Creation Endpoint. When a cohort syncs for the first time, we'll call this API, and we will create a list on your platform. We expect your company to provide us a response with the unique identifier. From that response, we will store that in our own database and for any subsequent sync, we will use that ID as part of the subsequent payload. i.e. This unique identifier returned will be used later to update the list and keep track of which list to update.

Note that this API call is used for the first cohort sync, and we'll not call this API again for subsequent syncs. Instead, the **list_ID** returned from the API will be used in the following APIs calls (Add Users Endpoint, Remove Users Endpoint).

![](https://lh3.googleusercontent.com/1K-uqMZta7eQBgmyktS-r0LJIpGDeDUvZJ1gmshLmVEixXhBv_tiaCsHgywjh4BFdW7do4NAX_VS2qRoV2DACq1INbhmdnXnefvmtbRacWghG6mPLPzosHjA_L5uuume_RuhdnEk7PgVmlQwJRYK1MkInXxjDzK4kGT29pBer3f8_XQwx9-80iPWMw)

- URL Endpoint: This is the endpoint that you'll define. for example, https://api.amplitude.com/list. You'll also then choose how you'll call the API with the relevant method whether it's a POST or a PATCH.
- API payload that will be sent to the destination: You can customize and define this payload to fit your needs.
- Path to List ID in the response: N/A


!!!note "Payload editor"

    Payload editor is updated to a more developer friendly JSON editor tool, it also includes auto suggestion for created variables by typing $.


![](https://lh5.googleusercontent.com/F3XOxcAZ3VYRx2gmG-wVy2APiNBujioLVhqBg3ILQWTsHKqTgKEzTTkq2pny5Mvx1tb7_FosQAZbAPpBgvoADPDBe7E33yh7P0QIBGzIZ3TuX5lfFGhj3wbklJJKN4jQaZAcCNxmpCPhNpE2W1p4wBw-HnIw6vQuqAZpyKx666vggI0nWa01YZThJw)

#### 5a) Error Classifications for "List Creation" Endpoint

As mentioned above you will need to call three different APIs for a List-based Integration (Add Users Endpoint, Remove Users Endpoint). Developers can now add error status code and error messages for every endpoint so that the end-users can debug and get faster help. 

![](https://lh5.googleusercontent.com/oichwRTi5me2_Xb-NzB6roMGKO1kB5nmi0grEafopJ7lXEab9y53-yTc1ahCfj4slHvpxVBZ5UMG26RfQfbKuuSj1z3rqY1_jjKIshwiLHFkEcpviRTGjoOByW4kMUECKnAzcAYl0uT9b0CEfpB0C12svX8Q2uCB1pP4LDJ8oOYwu-POm62sBspTjQ)

Click on the Add New Error to add additional Status Codes. We recommend including as much Status Code and Sub Error Code (recommended you want to use the same Status Code for multiple errors) which will enable faster debugging in the event of an unsuccessful cohort sync.

As a baseline, some common examples of status codes that most partners include:

- 200: Success
- 400: Invalid request
- 401: Unauthorized (bad api_key)
- 404: Invalid User ID
- 429: Throttling/rate limiting

Also, we highly suggest providing a clear Failure Reason (Description)  and Error Message as this will improve the overall End-User Experience within Amplitude App in case a cohort sync fails. See example below for an example within Amplitude web app that shows what happens when a user syncs a cohort but has the wrong API key.

![](https://lh3.googleusercontent.com/wuoWUi2H3zbbYkjriCd00hUIkqSJsF8_Ir5xK6IjCGKEtct998UKpjZf2yiqYAUu0V4Ws4jiVuS-F3QbyWF1hgqI6YI3GG3kwxmv6kcIu17MG_kisasu2mn2ppFLgZjcXtAzVkv66G5tPN81Bt8kyV9QDUWhv-pFI1dXe6wceX9FOZ0sR03rt6VBHQ)

Example (Image A): This is an illustrative example of a user navigating to the cohort dashboard panel to investigate the errors in more detail after the cohort export failed to ModuleApps failed. The user is able to quickly understand that the error is due to an API key.

![](https://lh4.googleusercontent.com/2yGZMzQk4ElkU7hGRDBQNBmhR-8boh1Y_ftF0iscfpj7aemkRgcAyjqAAKvmspiR8gnw7MSUHIajxD_yXsZWY7qJjG8OD-WPMTYmkXa3wo-Eqv0VyRAOCDuW_ttSnq7dy7d4gEML-BmcnusAaGD-LF59lJbpMmSIMOjq5-hi7I7-LHDaoFK4rzcu7g)

Example (Image B): This is the modal screen that pops up when a user clicks on "API key" error.

|\
 |

✐  Note -  How Amplitude will handle undefined Status codes

 |
|\
 |

For any error response code that's "undefined" at the point of configuration (without Failure reason or Status code), Amplitude will by default show an "unclassified" error type with the following Error Message:

"This cohort sync has encountered an unidentified kind of error for this integration. Please contact support or your CSM to create a ticket and ask for help in solving this issue."

 |

![](https://lh5.googleusercontent.com/DA5dJUKwtJ-cIZjn8O_kDq3RRItnLCGMGztn95jM1uJ1NpqvvL5O4QLepwBFdxXCy1qGjHSxlbDgi96lCEtWRI0QDLAuzOkMCH3GwjKvOED8e1HfvKC5FWd7VfV7XD-UT16VKIx7hqPihJr-5k20rmL2W36CmqnBoL-WyGMifq1-iywFPjtb4kU7kg)

![](https://lh3.googleusercontent.com/Hm1HvseEMs7jodo_xWHCUpSU5d0O64wDT4zTApqu4Uj5FskjrWdzxJQdT6-hXhFPBmhZ8QyZTxOpStsBwed75lW7WP7kdbh0DW1ElzgrkU7ORtBcEcMDLI9CbpK64JH_oeXAc-ju6VGJV6p6KttNLR-goosTew64QWy5iGTq7B2rOdl_dXALaHdjpQ)

### 6) "Add Users" Endpoint

This API will be called every time we make a cohort sync from Amplitude to the final destination (your company). This could be hourly or daily. This will calculate the difference in the current cohort size compared to the last successful sync.

![](https://lh4.googleusercontent.com/SxL6cx1htfL8cxNKSzCyW5vmB4NC8vYBoC7oIafEyjvzwXLrT52sOh7oFNCR-x8DqVHGx--WT_oqAJPcvucmhVok5zI-6GdKEHc-xDsUbV5ekGXAEQcNPK-dPvcCAiyUryXdkyIAr9ZG6Aecy_RrVx27moscb7lcwR7CdE18UJ-65q3oir_FJzjQCQ)

- URL Endpoint: We have a placeholder "$list_id" in the URL but it's not required. You could design your API and place this in the payload as well. "https://your.domain/lists/$listId/add"

- API payload that will be sent to the destination: The payload will look similar to the example image above. You can customize and define this payload whether it's a Batch payload. The important Key here is the $items variable which will be replaced by the objects below. This $items variable is usually the identifier for every single user in a cohort. for example, Let's say we have 20 new users to add to your existing cohort. The Batch object will contain a collection (a list of 20 users) so these 20 objects will be sent to your endpoint. See image above for more detail.

- Maximum number of items in each API call (batch size): Default is 10,000 but you can specify this. Our recommendation is to have a 10,000 user per cohort batch.

- An array of items that replace the $items variable in the payloads above: See the image for more detail on the structure of each object which will replace the $item variable above. Essentially you will specifiy the format of object that will replace the $item variable in the payload above. We will give you a list of those objects to replace the items variable above.

|\
 |

✐  Note

 |
|\
 |

We also try not have rate limiting if possible. If there is a rate limiter (for example, 90 requests per second) we recommend, making it explicit in your help center documentation. Amplitude sends out 4 requests in parallel, at the same time with each request having up to 10,000 users.

 |

#### 6a) Error Classifications for "Add Users" Endpoint

|\
 |

💡  Tip

 |
|

Instead of creating every single "Status Code", "Failure Reason", "Error Message" and "Sub Error Code" again, you may find it easier to the same set of error codes from your "List Creation Endpoint". This can easily be done by checking the box "Copy errors from other endpoints" and selecting "List Creation".

 |

![](https://lh5.googleusercontent.com/9rgTuyIKqySupjMuJEHDkSOfFHxq8140yQgnPzbeMgTXjh-8X-gxjTLvqmGIphGK1MHUU7ItW6dYT1Hvxbg1i-hLe-JRGAFb-nfteu2pFMz56W6XjnGiXRLQsID8pAF7ufvfXahGAd8COpghe8UlPvPF99IqYzbPs-aZqda2Plm6mTsJ7BsFrIivnQ)

### 7) "Remove Users" Endpoint

![](https://lh6.googleusercontent.com/dHxjakD5WHA5kfhSR6KGZU_mJQg2VxM8rTBYrx1BtvVW4wKApzyWX2OerFIy7KUW8tezyoQubeSAY1l3RrIeoz2PqrUHfS8QvWt__iEllzs9kajIS6zZ2myii7_VGj-c0TH8HMJ_eoAanPtB1z4JOCvFx5oKRkaNpHAregwbF0y_8H6jO09GbXYyrQ)

- URL Endpoint: We have a placeholder "$list_id" in the URL but it's not required. You could design your API and place this in the payload as well. "https://your.domain/lists/$listId/add"

- API payload that will be sent to the destination: Similar to Add Users Endpoint.

- Maximum number of items in each API call (batch size): Default is 10,000 but you can specify this. Our recommendation is to have a 10,000 user per cohort batch.

- An array of items that replace the $items variable in the payloads above: N/A

#### 7a) Error Classifications for "Remove Users" Endpoint

|\
 |

💡  Tip

 |
|

Instead of creating every single "Status Code", "Failure Reason", "Error Message" and "Sub Error Code" again, you may find it easier to the same set of error codes from your "List Creation Endpoint". This can easily be done by checking the box "Copy errors from other endpoints" and selecting "List Creation".

 |

![](https://lh6.googleusercontent.com/4RTTmhNLB_NNGTmxEXBr_PmoyQADNjOnZW7fsETKw3RkFVnnfrUGPhA8cKfjAVI6MHkAoCBR2a2TSyta0Ou3Oo5fEAlh5LYtJ6KmJHXaaGUPf5g2oZSaUJRI1vuHuBP3Mj0bYNvbyK6FAiYFAJdTEB2VpFALCVhgfqnxWxh368je_GjMt4OCwjha3Q)

### 8) Preview & Test Endpoint

Before submitting your configuration for review, we recommend testing the mock payload that you would expect to receive from Amplitude. Please follow the steps below to preview and test your configuration.

![](https://lh6.googleusercontent.com/0GRuqU2wrYxFD6DgxS4lmoQZc7ZQkQOcapdt7-JIVQvCnp-lvkVnW4rzDNmaoIenWoy3QdmlIVNvGJKytgysUo8ylghLvhswZyt5UGJnAtiPSlqP7M3Xtu6_DHGq3aRH9anaJG3NyQ61UNOyZsp-26OJlTiQON-0ZZ-KK6kxPLClXlntU1BOMYawvA)

1. Provide a valid Project ID in your organization for testing: Please provide the Project ID here

2. Name: Enter your company name

3. API Key: Provide the API key from the same Project ID

4. Key: Choose which Amplitude User Properties to map to your target ID. Note in this example, we are mapping Amplitude User ID to User ID.

![](https://lh6.googleusercontent.com/QswvC3rCr6ke3YZcm_Omoi4zQTOFRXElrGs8MQVfPJaj28fOcLoEOi1MotNR88noHiMZdEc7i3ibdsqf_RERASjXXBwyxtHLU0U8l5l8X0uxi8YzrNR2-_M2WdWu7J2JLKEWve89G7IkR9_QwH3ORJoJz1IDZhYNbcxckPiDicxPHaOOAAdpmNtI_w)

- DECLARED: All variables will be declared in the "Authentication calls, Custom Fields and Mapping Fields section"

- USED: Used columns show variables that are used either in the "List Users Endpoint," "Add Users Endpoint," and "Remove Users Endpoint."

- PRE-DEFINED: We have some PRE-DEFINED variables that our Macro will replace the values accordingly.

![](https://lh3.googleusercontent.com/DEmjbYDeZdz5B-zcGklsGQn9UeYxw_vyJRnTzuVeAU-wNrGPpiZVNMKTNhAovPLnsx5ejyEXs4dhXBeAt0ussC5viT6CpYrHsZpfDITxyOaUQoHUMjIky-KfLAXo83Dc6PexubbuBK14-DAb3r07kMahYDDFUgslddg9DTpfRuPBOmqlheuF6egACQ)

Headers and payloads are displayed in a more readable way. Developers can click Test Endpoint button to send a test API call to the predefined endpoint. We also display the response/error for easy debugging.

![](https://lh6.googleusercontent.com/IS_SD7yK10Zno1s_0-tJqNUYvbgK-qQtK2R9eewAUAEWd6z1mIXvdsdfam5OMIEQ7rDR15o9fce7H_HwmtQl08n6dUp64L6ervmcoLohbTPAE-AP4BbBpGeEb9EQWsGzfgFHzZnachs4V2yYrBiMNoYLmtOOQRYZHCN6M8jjRGPoTpH6e8hcWbkGAA)

Once you click on "Test Endpoint", we can see that the response is a "Success". We retrieve the $list_id here and then we use the $list_id for the "Add Users Endpoint".

|\
 |

✐  Note

 |
|\
 |

1. The {listId: $list_id} is the expected response for this API call. If you want to change it, you can change it on the path to list_ID in the response so that tis the object structures that we expect from you.

 |

![](https://lh3.googleusercontent.com/WdbJCVGpaW51zfCCL9YTOUa15bhVXDJx2rFh_TpkJlCGV8FK8pokpZDvVMztlonZ8HKE8B0WEnb9UpwNw1aLvdL7scyOzd0oen3IgY_4jKEMhoCu6MhAzTjW5OBJw7XIhl9t0qQgPcxT5LoDp9oIzaTBhfSuBUoH6TCFFN4fogGeTUxMYFOW7fmp4A)

Similarly, you can do the same by clicking the "Test Endpoint" for "Add Users Endpoint".

### 9) Submit your Integration

Once you have finalized your testing, hit "Submit" to submit your integration to the Amplitude team. The review process should take approximately 1 week. Once your integration has been approved, you'll get notified via email and be able to see your integration tile in the "Destination" section of Amplitude.

3) Event Streaming (WIP)
========================

Overview
--------

We're excited to announce an upcoming self-serve capability for our [Integration Portal](https://docs.google.com/document/d/1B5fx-Ck87pzxKdqWIiZvDboET-Kwwor-A-im0V_rCV8/edit#heading=h.g8n5uh1mjapp). Starting from September 26th, partners (like yourself) will be able to create your own Event Streaming tile in Amplitude to allow users to forward events in real-time from Amplitude.

### Why should you consider building an Event Streaming destination?

Amplitude has just made [Event streaming destination connections widely available for all Amplitude customers on Aug 22](https://www.linkedin.com/posts/amplitude-analytics_good-news-destination-connections-are-activity-6967874913131003904-jxdN?utm_source=share&utm_medium=member_desktop). Amplitude customers (including customers on starter plans) can stream up to 10 million events a month for free. This is an excellent opportunity to get extra exposure and enable more customers to try out your integration to get more value.

### Considerations

Supported features

- Event Forwarding:  Event forwarding is the concept of forwarding Amplitude Track calls to a destination. Amplitude will forward both the 'raw' event, and also merged or [transformed events](https://help.amplitude.com/hc/en-us/articles/5913315221915-Transformations-Retroactively-modify-your-event-data-structure). Amplitude also sends the user_id, event_name, and created_at to your destination.

- User Properties Types: Amplitude sends all user, event, and group properties along with the event.

- Event Selective Property Forwarding: We will also provide fine-grain filtering options that will allow the customer to choose which events to send based on selecting event types and/or property conditions.

Planned enhancements

- User Selective Property Forwarding: We will enable users to forward certain event/group/user properties from an event based on an allow-list (the topic at hand).

- Select Amplitude property as the identifier: We will provide the ability for users to select which amplitude property to use as an identifier. Currently our default is using Amplitude user_id.

- Mapping fields: Currently we do not have Mapped Fields implemented. This enhancement will allow partners to have a field that can be mapped to from an Amplitude field. Eg. Partner requires a deviceId field, or country field or something and we want to let the customer choose which Amplitude field to populate that with.

- Forwarding arrays or object type properties: (eg. if user wants to forward a property called cities which is an array of cities, it won't work)

What we don't support currently

- Regular User Identify Forwarding (i.e. creating and updating a user): Amplitude will forward the user identify events that are sent by customers directly to the configured destinations. Anytime you make an Identify call to Amplitude, we forward that user information. See  [Identify documentation](https://www.docs.developers.amplitude.com/analytics/apis/identify-api/)  for more information.

- Change-based user Identify Forwarding: When there's a user property change during the event ingestion, we will automatically generate a user identify event and forward it to the configured destinations. 

- Property Value Transformation: Transform a property value or type to another value or type (eg. Amplitude int user_id -> Destination string user_id , formatting such as encoding, datetime format transformations, etc.)

- oAuth Authentication: We don't support OAuth, so partners need to generate their API key

- Event Category name: We do not send the Event Category name.

### Preparation tips for Partners

1. Freemarker: Familiarize yourself with [Freemarker](https://freemarker.apache.org/)  is the template that we use to send Events out from Amplitude

2. Rate limits: Ensure your rate limits are as high as possible to minimize throttling. for example, We respect the rate limit that [Braze](https://www.docs.developers.amplitude.com/data/destinations/braze/) communicates: 50,000 requests per minute for Event Tracking. In addition, we have a retry mechanism w/ exponential backoff that will try 9 times over 4 hours. So any temporary throttling will be resolved through this process.

3. Event limits: Ensure that your event size limit is flexible enough for customer use cases. 

1. for example, [Customer.io](https://www.docs.developers.amplitude.com/data/destinations/customerio/) events have the following limits:

1. Maximum length of Customer ID: 150 bytes

2. Maximum number of Unique Identify attributes: 300

3. Maximum size of event data: 100K bytes

3. for example, [Intercom](https://www.docs.developers.amplitude.com/data/destinations/intercom/) has a limit of 120 Event Types and 20 meta (which are event properties) per Event Types. Currently our customers will have to leverage the Event Filter to select the specific events they want to forward from Amplitude to Intercom.

5. Authentication method: We don't support OAuth, so partners need to generate their API key

6. Ensure endpoint is flexible to ingest objects in a specific format: We will generate a list of objects in this specific format. You will need to make sure your endpoint handles this specific payload structure. See below for an example.

![](https://lh5.googleusercontent.com/t7xQ3KCCf7U9xPLLHBpJdIdGAajP8SOEhrjTZo79LhFmdfYkeTmCoiTu6zFUBxmlzCXXyDmM2xKqCZjjUxUyOllBEOjAmAMUGtIgugNDDsE7p68pc5J3vZ00I0skl0iMhBwupnC5LFzz20rBsfgHA5SG5_K0O3hXIY-LogJQz7oZOJxTvYrvtNQ_7g)

Example Payload structure

### What will it look like?

![](https://lh3.googleusercontent.com/2vSY_bOC2tUWZkiaLZ9mbsr_QOlaly0J0X1yD2-59yrL7r-QaEVwebPvS4Y-Tf_r84O95Mx8kPWNfgyq3byJw25XVFdQSlmK9rSfE0PBGCfACUJ89tulE5abrbfmnGW8iw_3fWyagAWHf1e-BJwYh3aS3zoGJXWkCNbU_2ZKdKxoAnVzxeRBilJS)

![](https://lh3.googleusercontent.com/S6BnZXYivKhM4u0jUuWGjNSf9mli8jr5PUHG0DK5uWNOYP-9eisbhJArIuheZGZoPD6nqp3rmNczIKaoWxo-MjxWVtzqX_DRh9MMJmaDwnBF71hpj6pBPEX5veiv5qsJdjFl0bOwnzFLZsTlFXw0v8csCxxfTnlfHiTLMTpY6Hzzsy0oVlKw92tC)

This is an example of what a built-out setup modal would look like in Amplitude once you've finalized your configuration. This would be part of the user's setup process when setting up your Event Streaming destination. Note this example shown is using our [Braze Event streaming destination](https://www.docs.developers.amplitude.com/data/destinations/braze/#considerations).

[Part 1] - Set Up Integration
-----------------------------

... TBD

[Part 2] - Configuration
------------------------

... TBD

[Part 3] - Submit
-----------------

... TBD



## Give us feedback

We're always listening to our feedback. If you'd like to share your experience and provide feedback on this Integration Portal, please fill out this [2-minute survey](https://docs.google.com/forms/d/e/1FAIpQLScdj-pbOK5EbItwBNgF7KF9pBjeJZNzXNkqZ1ARJLm-Z3q1_Q/viewform?usp=sf_link). If you encounter issues while using the Integration Portal, you can email questions to <integrations@amplitude.com>.

## Release Notes

### August 2022 

- Connection metadata for catalog display:
    - Partners can define the connection category, summary, and full description, which are displayed on [Amplitude Integrations Catalog page](https://amplitude.com/integrations)
    - Partners can keep these contents up to date through the Integration Portal without having to make a formal request to Amplitude or requiring Amplitude to make those changes on your behalf
- Error classification for each connection:
    - Developers can add error code and error messages for every endpoint so that the end-users can debug and get faster help
- Data Source creation

### June 2022 

- Improved JSON editor:
    - Payload editor is updated to a more developer-friendly JSON editor tool,it also includes auto suggestions for created variables by typing `$`
    - Better syntax highlighting and brackets matching for debugging
- New application selection dropdown:
    - Previously, the developer needs to know the app-id in order to pull the user properties list. With this new feature, developers can select any application in the dropdown to pull the user properties for testing purposes
- Improved testing functionalities:
    - Headers and payloads are displayed in a more readable way
    - Instead of copying & paste the curl command into CLI, now developer can click the Test Endpoint button to send a test API call to the predefined endpoint.
    - We also display the response/error for easy debugging.
- Added additional headers support:
    - This feature allows the developer to add new fields to the headers in every API call, further supporting customization in cohort sync API calls.
    - The additional header can use any variables that are created by the developer and predefined internally.
- Other smaller bug fixes:
    - Prevent unnecessary fields in the config
    - Prevent undefined fields from being stored