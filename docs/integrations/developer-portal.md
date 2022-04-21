---
title: Developer Portal
description: The Amplitude developer portal streamlines the process for parters to build a cohort integration with Amplitude. 
---

Amplitude is launching a Developer portal to streamline the process for partners building a cohort integration with Amplitude. Partners can set up, develop their cohort, and test their endpoint using a self-serve UI before submitting it for review.

!!!info "Disclaimer"

    This Developer portal is currently in the Alpha phase and will likely undergo further changes. This Developer portal would suit partners looking to build cohort integrations only.

## Prerequisites

Before you start, make sure you've taken care of a few prerequisites.

1. Applied through our [Technology Partner Portal](https://amplitude.com/partners#:~:text=Technology%20Partner,business%20outcomes%20for%20our%20customers) and signed both the NDA + Partner agreement.
2. Signed up or have an existing Amplitude plan.
3. Reviewed [Receiving Cohorts from Amplitude](https://developers.amplitude.com/docs/receiving-cohorts-from-amplitude) documentation.
4. Emailed integrations@amplitude.com with your ORG ID so we can enable the feature flag for your ORG ID. We'll also create a shared slack channel across our teams to streamline communications.

## High-level process for building integrations at Amplitude

1. Sign up or have an existing Amplitude plan.
2. Create an Amplitude organization and create a project, as you'll need the Project ID for testing.
3. Within Amplitude, navigate to the Organization Settings page and click on "Developer Portal." If you don't see this, send an email to integrations@amplitude.com with your ORG ID, and we'll enable the feature flag.
4. Setup and configure your integration. Once you've submitted your integration, it will trigger an email to notify our Engineering team to review your integration.
5. The Amplitude team will validate the integration during the review process, which could take up to 1 week.
6. Once we've approved the integration, it will automatically be deployed and enabled for your organization. You'll then be able to see a tile on the destination page where you can set up a cohort and start syncing.

## Setup guide

### [Part 1] - Set Up Integration

This section is about configuring your integration tile that will appear on the Destinations page in Amplitude. You'll also need to decide between a List-Based Cohort Integration or a Property-Based Cohort Integration.

![](https://files.readme.io/e48f5e7-Screen_Shot_2022-04-12_at_9.14.00_PM.png "Screen Shot 2022-04-12 at 9.14.00 PM.png")

1) Display Name
This is the integration name that will be displayed to the users in Amplitude. This name will be used in the modal and integration tile.

2) Integration Logo
Upload your company's icon. Ensure that it's a PNG file. Once you've uploaded your company's logo, you'll see a preview of your tile. See below for an example of what your tile would look like if it was on the Destinations page in Amplitude.

![Once your integration has been validated, your tile will appear in the Destinations page in Amplitude.](https://files.readme.io/b226005-Screen_Shot_2022-04-11_at_10.56.15_PM.png "Screen Shot 2022-04-11 at 10.56.15 PM.png")

Once your integration has been validated, your tile will appear in the Destinations page in Amplitude.

1) Integration Type
Please choose if you are building a list-based cohort integration vs a property-based cohort integration.

- List-based Cohort Integration: A list-based cohort integration works best if a cohort is represented as a list of user identifiers in the target system. A call to a list creation API is needed on the first sync, then subsequent calls to add API and remove API are made to keep the list membership up to date.
- Property-Based Cohort Integration: A property-based cohort integration works best with systems that represent cohort membership as a custom user property, such as a boolean flag or a tag. Amplitude will invoke the update API when cohort membership changes to update the user property accordingly. While no list creation API is needed, some manual steps may be required to create the customer user property.

### [Part 2] - Configuration

Note that this page is divided into two sections.

 - Left Panel: First, the "Configuration" section on the left is where you'll build your configuration for your payload would look like and what you expect to receive from Amplitude.
 - Right Panel: The "Testing Integration" section summarizes your configurations, including your setup modal screen for your integrations, variables, and payload.

![](https://files.readme.io/a572852-Screen_Shot_2022-04-12_at_10.41.55_AM.png "Screen Shot 2022-04-12 at 10.41.55 AM.png")

### Walkthrough for a list-based cohort integration

1) Authentication method for all API calls
The first step is determining how you plan to authenticate the API call between Amplitude and your company.

- No authentication: No Authentication header is needed
- Basic Authentication: Use API key and API Secret (optional) as authentication headers
- Authentication Header: Authenticate with API key
- Bearer Token: User Bearer Token as an Authorization header

2) Custom Fields
These fields collect and replace the $variable declared in the payloads in the API calls below.

- Field Type: You can specify what Field type is required (String, Single Select, Button Group)
- Field variable name used in the payload: By default, this will match your authentication choice. E.g., If you choose Bearer Token as the authentication method above, it would be "bearer_token."
- Display name: By default, this will match your authentication choice. E.g., If you choose Bearer Token as the authentication method above, it would have a placeholder Display name called "Bearer Token."
- Add New Custom Field: If you need to add another identifier that you think would be required for the payload, you can add custom fields such as String, Single Select, and Button Group.

3) Mapping Fields
This section is a way for you to specify how Amplitude will map to the respective destination (your company). The value of the mapping will replace item_template in the payloads below.

- Mapping Field Display Name: We recommend putting this as "Key," "Identifier," or "User ID Mapping."
- Amplitude Mapping Field: E.g. user_id_field_amplitude
- Field Type: This could either be a "String" or "Single Select."
- Display name: This can be fully customizable by you. E.g., User ID, Email, etc
- Add New Mapping: You can add additional mappings if required such as String, Single Select, Button Group

![An illustrative example for a simple configuration for Bearer Token. Note the Panel on the right "Connect to Amplitude" is the modal screen that the user will see when trying to setup your integration in Amplitude's destination page.](https://files.readme.io/fbb3dff-Screen_Shot_2022-04-12_at_10.38.48_AM.png "Screen Shot 2022-04-12 at 10.38.48 AM.png")

An illustrative example for a simple configuration for Bearer Token. Note the Panel on the right "Connect to Amplitude" is the modal screen that the user will see when trying to setup your integration in Amplitude's destination page.

![This is an example of what a built-out modal would look like in Amplitude once you've finalized your configuration. This would be part of the user's setup process when setting up your integration. Note this example shown is using "Basic Authentication".](https://files.readme.io/387a360-Screen_Shot_2022-04-12_at_10.23.44_AM.png "Screen Shot 2022-04-12 at 10.23.44 AM.png")

This is an example of what a built-out modal would look like in Amplitude once you've finalized your configuration. This would be part of the user's setup process when setting up your integration. Note this example shown is using "Basic Authentication".

1) List Creation Endpoint
You will need to call three different APIs for a List-based Integration. The first one is the List Creation Endpoint. When a cohort syncs for the first time, we'll call this API, and we will create a list on your platform. We expect your company to give us back the identifier. This unique identifier returned will be used later to update the list and keep track of which list to update.

Note that this API call is used for the first cohort sync, and we'll not call this API again for subsequent syncs. Instead, the list_ID returned from the API will be used in the following APIs calls (Add Users Endpoint, Remove Users Endpoint).

![](https://files.readme.io/06b66bd-Screen_Shot_2022-04-12_at_9.26.09_PM.png "Screen Shot 2022-04-12 at 9.26.09 PM.png")

- URL Endpoint: This is the endpoint that you'll define. E.g. <https://api.amplitude.com/list>. You'll also then choose how you'll call the API with the relevant method whether it's a POST or a PATCH.
- API payload that will be sent to the destination: You can customize and define this payload to fit your needs.
- Path to List ID in the response:

1) Add Users Endpoint
This API will be called every time we make a cohort sync from Amplitude to the final destination (your company). This could be hourly or daily. This will calculate the difference in the current cohort size compared to the last successful sync.

![](https://files.readme.io/9ad3ea9-Screen_Shot_2022-04-12_at_9.47.17_PM.png "Screen Shot 2022-04-12 at 9.47.17 PM.png")

- URL Endpoint: We have a placeholder "$list_id" in the URL but it's not required. You could design your API and place this in the payload as well. "<https://your.domain/lists/$listId/add>"
- API payload that will be sent to the destination: The payload will look similar to the example image above. You can customize and define this payload whether it's a Batch payload. The important Key here is the $items variable which will be replaced by the objects below. This $items variable is usually the identifier for every single user in a cohort. E.g. Let's say we have 20 new users to add to your existing cohort. The Batch object will contain a collection (a list of 20 users) so these 20 objects will be sent to your endpoint. See image above for more detail.
- Maximum number of items in each API call (batch size): Default is 10,000 but you can specify this.
- An array of items that replace the $items variable in the payloads above. See the image for more detail on the structure of each object which will replace the $item variable above.

1) Remove Users Endpoint

- URL Endpoint: We have a placeholder "$list_id" in the URL but it's not required. You could design your API and place this in the payload as well. "<https://your.domain/lists/$listId/add>"
- API payload that will be sent to the destination: Similar to Add Users Endpoint.
- Maximum number of items in each API call (batch size): Default is 10,000 but you can specify this.
- An array of items that replace the $items variable in the payloads above.

![](https://files.readme.io/c669935-Screen_Shot_2022-04-12_at_1.08.12_PM.png "Screen Shot 2022-04-12 at 1.08.12 PM.png")

1) Test & Preview Integration\
Before submitting your configuration for review, we recommend testing the mock payload that you would expect to receive from Amplitude. Please follow the steps below to preview and test your configuration.

![](https://files.readme.io/ad1bc39-Screen_Shot_2022-04-12_at_10.04.17_PM.png "Screen Shot 2022-04-12 at 10.04.17 PM.png")

- Provide a valid Project ID in your organization for testing: Please provide the Project ID here
- Name: Enter your company name
- API Key: Provide the API key from the same Project ID
- Key: Choose which Amplitude User Properties to map to your target ID. Note in this example, we are mapping Amplitude User ID to User ID.

![This is our variable tracker table. We have three columns (Declared, Used and Pre-defined)](https://files.readme.io/6cc0021-Screen_Shot_2022-04-12_at_8.48.58_PM.png "Screen Shot 2022-04-12 at 8.48.58 PM.png")
This is our variable tracker table. We have three columns (Declared, Used and Pre-defined)

- 1.  All variables will be declared in the "Authentication calls, Custom Fields and Mapping Fields section"
- 1.  USED columns show variables that are used either in the "List Users Endpoint," "Add Users Endpoint," and "Remove Users Endpoint."
- 1.  We have some PRE-DEFINED variables that our Macro will replace the values accordingly.

![Copy and paste](https://files.readme.io/731ac7a-Screen_Shot_2022-04-12_at_9.53.37_PM.png "Screen Shot 2022-04-12 at 9.53.37 PM.png")

Copy and paste

Tip: Copy the highlighted text and paste the highlighted text into your Command-Line-Interface (CLI). You'll then get back a list ID which you'll then utilize in subsequent API ("Add Users Endpoint", "Remove Users Endpoint")

![Replace the $list_id based on the response object you received after copying and pasting the payload in the "List Creation Endpoint" above into your CLI](https://files.readme.io/9c42bae-Screen_Shot_2022-04-12_at_9.54.56_PM.png "Screen Shot 2022-04-12 at 9.54.56 PM.png")

Replace the $list_id based on the response object you received after copying and pasting the payload in the "List Creation Endpoint" above into your CLI

![Replace the $list_id based on the response object you received after copying and pasting the payload in the "List Creation Endpoint" above into your CLI](https://files.readme.io/d04da4b-Screen_Shot_2022-04-12_at_9.56.20_PM.png "Screen Shot 2022-04-12 at 9.56.20 PM.png")

Replace the $list_id based on the response object you received after copying and pasting the payload in the "List Creation Endpoint" above into your CLI

1) Submit
Once you have finalized your testing, hit "Submit" to submit your integration to the Amplitude team. The review process should take approximately 1-2 weeks. Once your integration has been approved, you'll get notified and be able to see your integration tile in the "Destination" section of Amplitude.

## FAQs

| Question | Answer |
| --- | --- |
| How do I get access to the Developer Portal? | See the Prerequisites section above. |
| What happens after I submit the Integration? | During the review process, the Amplitude team will validate the integration. This could take up to ~1-2 weeks. We will create a slack channel to streamline communications across our teams. |

## More help

If you have any problems or issues, email integrations@amplitude.com.