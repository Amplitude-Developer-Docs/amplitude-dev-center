---
title: Amplitude Lookup Table (Beta)
description: Amplitude's Lookup Table integration lets you import your own data and map it to ingested properties to have an enhanced set of properties.
---

Amplitude's Lookup Table integration lets you import your own data and map it to ingested properties to have an enhanced set of properties.

--8<-- "includes/closed-beta.md"

## Setup

### Prerequisites

To set up this integration, you need the following:

+ An event property or user property to create a mapping from.
+ A CSV that has the data you want to map to. The first column data must correspond to the mapping property value.

### Amplitude setup

1. Open or create the project where you want to import the CSV data, then click **Data Sources**.
2. Click **I want to import data into Amplitude**, then click **CSV**.
3. Upload the CSV then click **Next**.
3. Map your event property.
4. When you're done mapping, click **Finish**.

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
