| <div class="big-column">Name</div>  | Description  |
| --- | --- |
| `productId` | Optional. String. An identifier for the product. Amplitude recommends something like the "Google Play Store product ID". Defaults to `null`. |
| `quantity`| Required. Integer. The quantity of products purchased. Note: revenue = quantity * price. Defaults to 1. |
| `price` | Required. Double. The price of the products purchased, and this can be negative. Note: revenue = quantity * price. Defaults to `null`.|
| `revenueType` | Optional, but required for revenue verification. String. The type of revenue (e.g. tax, refund, income). Defaults to `null`. |
| `receipt`  | Optional. String. The type of revenue (e.g. tax, refund, income). Defaults to `null` |
| `receiptSignature` | Optional, but required for revenue verification. The type of revenue (e.g. tax, refund, income). | null |
| `eventProperties`| Optional. JSONObject. An object of event properties to include in the revenue event. Defaults to `null`. |