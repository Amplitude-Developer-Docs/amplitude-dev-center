| <div class="big-column">Name</div>  | Description | Default Value |
| --- | --- | --- |
|`product_id` | Optional. `string`. An identifier for the product. Amplitude recommend something like the Google Play Store product ID. | Empty string. |
|`quantity` | Required. `number`. The quantity of products purchased. Note: revenue = quantity * price. | `1` |
|`price` | Required. `number`. The price of the products purchased, and this can be negative. Note: revenue = quantity * price. | `null` |
|`revenue_type` | Optional, but required for revenue verification. `string`. The revenue type (for example, tax, refund, income). | `null` |
|`receipt`| Optional. `string`. The receipt identifier of the revenue. | `null` |
|`receipt_sig`| Optional, but required for revenue verification. `string`. The receipt signature of the revenue. | `null` |
|`properties`| Optional. `{ [key: string]: any }`. An object of event properties to include in the revenue event. | `null` |
