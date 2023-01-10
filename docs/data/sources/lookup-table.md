---
title: Amplitude Lookup Table (Beta)
description: Amplitude's Lookup Table integration lets you import your own data and map it to ingested properties to have an enhanced set of properties.
---

Amplitude's Lookup Table integration lets you import your own data and map it to ingested properties to have an enhanced set of properties.

!!!beta "This feature is in closed beta"

    This feature is in closed beta. Customers with an Enterprise plan or the Govern add-on can contact their Amplitude Customer Service Manager or Account Executive to get access.

You can also create and manage lookup tables via an API. See [Lookup Table API](../analytics/apis/lookup-tables-api) for more information.

## Setup

### Prerequisites

To set up this integration, you need the following:

- An event property or user property to create a mapping from.
- A CSV that has the data you want to map to. The first column data must correspond to the mapping property value.

### Amplitude setup

1. Open or create the project where you want to import the CSV data, then click **Data Sources**.
2. Click **I want to import data into Amplitude**, then click **CSV**.
3. Upload the CSV then click **Next**.
4. . Map your event property.
5. When you're done mapping, click **Finish**.

## Update a lookup table

If you want to create a new lookup property or that mapped property is wrong, you can update the lookup table.

1. In Amplitude, navigate to Data Sources, then find the lookup table in the Sources table.
2. Click the **Edit Lookup Table Configuration** tab.
3. Make your changes. You can change the mapping, or replace the CSV by uploading a new one.
4. When finished, click **Update your lookup table configuration**.

## Delete the lookup table and its properties

When you no longer need a lookup table, you can delete it.

1. In Amplitude, navigate to Data Sources, then find the lookup table in the Sources table.
2. Click the **Edit Lookup Table Configuration** tab.
3. Click the trash icon.
4. Follow the on-screen instructions.

## Lookup table use cases

With Amplitude's Lookup Table feature, you can import your own data and map it to ingested properties to create an enhanced set of event and user properties. With them, you can:

- **Enrich data using ingested property values**. You've captured an event called `Purchased` with an event property named `SKU`. The `SKU` value itself doesn't inherently hold a lot of meaning. But with your list of all the SKUs and their corresponding product names, you can use this feature to create a new property called `Product Name` and have it automatically populate based on that list.
- **Bulk update property values.** You've captured a user property called `Language Code` and passed in language codes (`en_US`, `fr_FR`, `de_DE`, etc.). This is difficult to read, so you want a `Language` property that maps to friendlier values like `English`, `French`, and `German`. Use this feature to create a new property called `Language` that maps the language codes to the language names.
- **Bulk filter long lists**. You want to see user behavior for a specific region and you have a list of all the customers and their regions. Use this to map each customer to a region, creating a new "Region" property. Now you can filter specifically to each region in a chart.