---
title: Send Cohort Updates to AWS Kinesis
description: Amplitude Data's AWS Kinesis Cohort integration lets you stream your cohort membership updates straight to a Kinesis stream.
---

--8<-- "includes/open-beta.md"

Amplitude Data's AWS Kinesis Cohort integration lets you stream your cohort membership updates straight to a Kinesis stream.

## Considerations

- This integration is only available for customers who have paid plans with Amplitude.
- You must enable this integration for each Amplitude project you want to use it in.
- You should have an understanding of [Amplitude Audiences](https://help.amplitude.com/hc/en-us/articles/360028552471-Amplitude-Engage) and [Behavioral Cohorts](https://help.amplitude.com/hc/en-us/articles/231881448) before setting up this integration.
- Cohort updates can be sent via all the supported cadences (Daily, Hourly, Real Time).
- All the existing Real Time Cohort Sync limits apply here.

## Payload

The payload sent to Pub/Sub is a JSON object. Example:

```json
{
  "cohort_name": "Test Cohort",
  "cohort_id": "gs72ns",
  "in_cohort": true,
  "computed_time": "1685748245",
  "message_id": "some-message-id:54",
  "users": [{
    "user_id": "user1@amplitude.com",
    "user_properties": {
      "city": "San Francisco",
      "fav_animal": "Bat"
    }
  },
    {
      "user_id": "user2@amplitude.com",
      "user_properties": {
        "city": "Seattle",
        "fav_animal": "Cat"
      }
    }]
}
```

- **cohort_name**: String. the name of the audience
- **cohort_id**: String. the unique ID of the audience, which can also be found in URL when viewing it on Amplitude
- **in_cohort**: Boolean. Indicating this batch of users is “entering” or “exiting” an audience. Each message will only have one of either state but not both.
- **compute_time**: String. The Epoch timestamp when we re-compute the audience in Amplitude. Due to the nature of Kinesis streaming, it’s impossible to enforce order upon receiving the message. The team can leverage this to resume the order.
    - We kept it as a string rather than a number because depending on the programming language/platform the team is using, a JSON number can be interpreted as a float and lose precision.
- **message_id**: String. The unique id of each message.
- **users**: List. The users batch. Each user will be represented as a JSON object
    - **user_id**: String. the id of the user
    - **(optional) user_properties**: Map. A list of user properties to include, with key as the property name and value as the property value.

**Note:** The feature of having **user_properties** in the payload is in development. Please follow this page for updates. 

## Setup

### Prerequisites

Before you get started, create a Kinesis topic in your AWS account, and an IAM role that will be used by Amplitude to publish cohort updates to the stream.

### Kinesis setup
<!-- vale Amplitude.Headings = NO-->
#### 1. Create a Kinesis stream

Create a [Kinesis stream](https://docs.aws.amazon.com/streams/latest/dev/introduction.html "https://docs.aws.amazon.com/streams/latest/dev/introduction.html") in the AWS console.

#### 2. Create an IAM role

Create an [IAM role](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user.html#roles-creatingrole-user-console) that gives Amplitude permission to **write** directly to your AWS Kinesis Stream.
<!-- vale Amplitude.TooWordy = NO -->
- For Account ID, specify: 358203115967. This is Amplitude's AWS account used to export events.
- Finalize the role without assigning any policies.
- The Trust Relationships for the new should look like this:

```json title="Trust Relationships"
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::358203115967:root"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

#### 3. Create an IAM policy

1. Create an [IAM Policy](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create.html) to give Amplitude permission to write to your Kinesis Stream.
2. Select the **Create Policy from JSON** option and use the following template policy in the Policy Document field. Be sure to change the {account-id} to your account-id, and replace {region} and {stream-name} with the applicable values. Also replace {role-name} with the role just created.

    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": [
                    "kinesis:PutRecord",
                    "kinesis:PutRecords",
                    "iam:SimulatePrincipalPolicy"
                ],
                "Resource": [
                    "arn:aws:kinesis:{region}:{account-id}:stream/{stream-name}",
                    "arn:aws:iam::{account-id}:role/{role-name}"
                ]
            }
        ]
    }
    ```

3. Assign the new policy to the role.
      1. Open the role
      2. Select the **Attach Policies** option, and select the new policy.

Make note of the role ARN, stream region, and stream name. You need these to set up the destination in Amplitude.
<!-- vale Amplitude.Headings = ON-->

### Amplitude setup

1. In Amplitude Data, click Catalog and select the Destinations tab.
2. In the Cohort section, click on Kinesis Data Stream.
3. Click Add another destination.
4. Enter the Display Name for this destination. This is just a name to identify the destination when syncing the cohort.
5. Enter the stream name the AWS region and the role ARN that was created above.
6. Save the destination.

### Syncing Cohort Updates

1. In Amplitude, open the cohort you want to export.
2. Click Sync, and choose Kinesis Data Stream.
3. Select the destination created above.
4. Select the sync frequency you need.
