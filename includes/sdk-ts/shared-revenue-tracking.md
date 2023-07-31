<!-- vale off-->

The preferred method of tracking revenue for a user is to use `revenue()` in conjunction with the provided Revenue interface. Revenue instances store each revenue transaction and allow you to define several special revenue properties (such as 'revenueType' and 'productIdentifier') that are used in Amplitude's Event Segmentation and Revenue LTV charts. These Revenue instance objects are then passed into `revenue()` to send as revenue events to Amplitude. This lets automatically display data relevant to revenue in the platform. You can use this to track both in-app and non-in-app purchases.

<!--vale on-->

To track revenue from a user, call revenue each time a user generates revenue. In this example, 3 units of a product was purchased at $3.99.

```ts
const event = new amplitude.Revenue()
  .setProductId('com.company.productId')
  .setPrice(3.99)
  .setQuantity(3);

amplitude.revenue(event);
```
