---
title: Send Cohorts to Infobip
description: Integrate Amplitude and Infobip to send targeted messages to Amplitude cohorts.
---

[Infobip](https://www.infobip.com/) is a global leader in omnichannel engagement powering a broad range of messaging channels, tools, and solutions for advanced customer engagement, authentication, and security.

This integration lets you send targeted messages using the specific cohorts you've created in Amplitude.

!!!tip

    For issues with Infobip, reach out to Infobip's [support team](https://www.infobip.com/contact).

## Setup

### Infobip setup

1. Navigate to the [Infobip Portal](https://portal.infobip.com/login/?callback=https%3A%2F%2Fportal.infobip.com%2F%3F), click **Project Settings**, and select **API Keys**.
2. Generate a new key and add a description. Copy the key.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Infobip**.
3. Enter a name and Infobip API Key.
4. Save the destination.

## Statuses

### Create a new list

URL: [https://api.infobip.com/saas/amplitude/1/lists](https://api.infobip.com/saas/amplitude/1/lists)

Status codes

=== "200 Success"

    ```json
    {
        "listId": 2568
    }
    ```
=== "400 Bad Request"

    ```json
    {
        "requestError": {
            "serviceException": {
                "messageId": "BAD_REQUEST",
                "text": "Bad request",
                "validationErrors": {
                    "name": [
                        "property not found or blank"
                    ]
                }
            }
        }
    }
    ```
=== "401 Unauthorized"

    ```json
        {
            "requestError": {
                "serviceException": {
                    "messageId": "UNAUTHORIZED",
                    "text": "Invalid login details"
                }
            }
        }
    ```
=== "429 Too Many Requests"

    One request per API key every 2 seconds


    ```json
    {
        "requestError":{
            "serviceException":{
              "messageId":
                  "TOO_MANY_REQUESTS",
                "text":"Too many requests"
              }
          }
    }
    ```

### Add people to list

URL: `https://api.infobip.com/saas/amplitude/1/lists/%257BlistId%257D/add`

=== "200 Success"

    - If no errors, just the modified/created counters will show the number of ids.
    - If one or more ids were unable to be added to a list, the errors section will be populated with the total counter and arrays of grouped ids by type of error

    ```json
    {

        "modifiedCount": 0,

        "createdCount": 3,

        "errors": {

            "count": 1,

            "failed": {

               "VALIDATION_ERROR": ["invalid_mail.com"]

              }

          }   

    } 
    ```
=== "400 Bad Request"

    ```json

    {

         "statusCode": "TAG_NOT_FOUND",

         "message": "Tag with id \"87881\" does not exist"

     }
    ```

=== "401 Unauthorized"

    ```json
    {

         "requestError": {

             "serviceException": {

                 "messageId": "UNAUTHORIZED",

                 "text": "Invalid login details"

             }

         }

     }
    ```

=== "429 Too Many Requests"

    One request per Api key every 10 seconds

    ```json
    {

        "requestError":{

            "serviceException":{

               "messageId":

                   "TOO_MANY_REQUESTS",

                "text":"Too many requests"

              }

           }

    }
    ```
 
### Remove people from list

URL: `https://api.infobip.com/saas/amplitude/1/lists/%257BlistId%257D/remove`

=== "200 Success"

    Empty body. 

=== "400 Bad Request"

    ```json
    {

         "statusCode": "TAG_NOT_FOUND",

         "message": "Tag with id \"87881\" does not exist"

     }
    ```

=== "401 Unauthorized"

    ```json
    {

         "requestError": {

             "serviceException": {

                 "messageId": "UNAUTHORIZED",

                 "text": "Invalid login details"

             }

         }

     }
    ```

=== "429 Too Many Requests"

    One request per Api key every 5 seconds.

    ```json
    {

        "requestError":{

            "serviceException":{

               "messageId":

                   "TOO_MANY_REQUESTS",

                "text":"Too many requests"

              }

           }

    }
    ```
