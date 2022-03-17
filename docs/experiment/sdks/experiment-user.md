---
title: Experiment User
description: Description of the Experiment User object used throughout Experiment SDKs
--- 


When assigning variants, the evaluation engine applies the targeting rules to a user object. The user object represents the user's identity and contains additional context regarding the application and user deployment.

In client side SDKs, the user is generally set once immediately after initialization and passed to the server on every request for variants. In server side SDKs, the user must be passed to the SDK on every request.


!!!note "User Identity"

    The Experiment User being sent to fetch assignments must contain either a Device ID, User ID, or both. Moreover, the Device and User ID values must be the same as the values passed to Amplitude Analytics.

```json
{
  "user_id": "Amplitude User ID",
  "device_id": "Amplitude Device ID",
  "country": "Country",
  "region": "Region",
  "city": "City",
  "dma": "Designated Marketing Area",
  "language": "Language",
  "platform": "Platform",
  "version": "Version",
  "os": "Operating System",
  "device_manufacturer": "Device Manufacturer",
  "device_brand": "Device Brand",
  "device_model": "Device Model",
  "carrier": "Carrier",
  "library": "SDK platform and version",
  "user_properties": {
    // you can attach custom user properties here
  }
}
```

!!!note 
    Custom user properties sent via the Experiment User object will not be saved to Amplitude Analytics. These are temporary properties used for allocation only.


## User Providers

!!! info "Amplitude Integrated SDK Support"

    If you use Amplitude's client-side Experiment and Analytics SDKs you should upgrade your SDKs to the latest version and change the experiment SDK's initialization to enable the analytics SDK to provide user information to the experiment client.

Client-side SDKs define an `ExperimentUserProvider` interface which can be added to an experiment client after the client has been initialized. If the provider is set, the `ExperimentClient` calls the provider's `getUser()` function before `fetch`ing variants.

## User Merge


The user object passed into `fetch()` and the user object provided by the `ExperimentUserProvider` are merged prior to sending the request. The merge always prefers fields from the user passed into `fetch()` over the provided user. The `user_properties` objects are also merged, with fields passed into `fetch()` preferred over provided fields.

Merge Examples:

<table>
    <tr>
        <td align="center">Explicit User</td>
        <td align="center">Provided User</td>
        <td align="center">Merge Result</td>
    </tr>
    <tr>
        <td>
        <pre lang="json">
        {
        "user_id":"coolguy123"
        }
          </pre>
          </td>
        <td>
        <pre lang="json">
        {
        "device_id":"jf837dmcus"
        }
        </pre>
        </td>
        <td><pre lang="json">
        {
        "user_id":"coolguy123",
        "device_id":"jf837dmcus"
        }
        </pre>
        </td>
    </tr>
    <tr>
        <td>
        <pre lang="json">
        {
        "user_id":"coolguy123"
        }
        </pre>
        </td>
        <td>
        <pre lang="json">
        {
        "user_id":"superman32"
        }
        </pre>
        </td>
        <td><pre lang="json">
        {
        "user_id":"coolguy123"
        }
        </pre>
        </td>
    </tr>
    <tr>
        <td>
        <pre lang="json">
        {
          "user_id":"coolguy123", 
          "user_properties":
            {
              "company": "Amplitude"
            }
        }
        </pre></td>
        <td>
        <pre lang="json">
        {
          "device_id":"jf837dmcus",
          "user_properties":
            {
            "premium": false,
            "company":"Apple"
            }
        }
        </pre>
        </td>
        <td>
        <pre lang="json">
        {
        "user_id":"coolguy123", 
        "device_id":"jf837dmcus",
        "user_properties":
          { 
            "premium":false, 
            "company": "Amplitude"
          }
        }
        </pre>
        </td>
    </tr>
</table>