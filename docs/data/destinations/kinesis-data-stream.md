---
title: Kinesis Data Stream Event Streaming
description: Amplitude Data's Kinesis Data Stream integration lets you stream your Amplitude event data straight to a Kinesis Data Stream.
---

Amplitude Data's Kinesis Data Stream integration lets you stream your Amplitude event data straight to a Kinesis Data Stream.

## Considerations

- Amplitude sends the `user_id`, `event_name`, and `created_at`  along with all user, group, and event properties to Kinesis streams. 
- The data Amplitude posts in Kinesis is the same JSON as documented in the [Amplitude Export API](https://www.docs.developers.amplitude.com/analytics/apis/export-api/#response).
- This destination supports Identify Forwarding. Anytime you make an Identify call to Amplitude, we forward that user information. See [Identify documentation](https://www.docs.developers.amplitude.com/analytics/apis/identify-api/) for more information.
- Role Name should be entered in the following format: `arn:aws:iam::{your aws account id}:role/{role name}` 

## Setup

### Kinesis setup

#### 1. Create a Kinesis stream

Create a [Kinesis stream](https://docs.aws.amazon.com/streams/latest/dev/introduction.html "https://docs.aws.amazon.com/streams/latest/dev/introduction.html") in the AWS console.


#### 2. Create an IAM role

Create an [IAM role](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user.html#roles-creatingrole-user-console) that gives Amplitude permission to **write** directly to your AWS Kinesis Stream.

- For Account ID, specify: 358203115967. This is Amplitude's AWS account used to export events.
- Finalize the role without assigning any policies.
- The Trust Relationships for the new should look like this:

    ```json title="Trust Relationshps"
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
2. Select the **Create Policy from JSON** option and use the following template policy in the Policy Document field. Be sure to change the {region}, {account-id} and {stream-name} with the applicable values. Also replace {role-name} with the role just created.

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

### Amplitude setup

Create a Kinesis destination in Amplitude.

1. In Amplitude, navigate to **Data Destinations** then find **Kinesis Data Stream - Event Stream**.
2. Enter a sync name, then click **Create Sync**.
3. Click **Edit**, then enter your AWS region, stream name, and role name (ARN) you created during Kinesis setup.
4. Use the _Send events_ filter to select the events you want to send. You can send all events, but we recommend choosing the most important ones. 
5. When finished, enable the destination and save.