---
title: Amplitude Lookup Table (Beta)
description: Amplitude's Lookup Table integration lets you import your own data and map it to ingested properties to have an enhanced set of properties.
---

Amplitude's Lookup Table integration lets you import your own data and map it to ingested properties to have an enhanced set of properties.

-8<-- "includes/closed-beta.md"

## Setup

### Prerequisites

To setup this integration, you need the following:

+ An event property or user property to create a mapping from.
+ A CSV that contains the data you want to map to. The first column data must correspond to the mapping property value.

### Amplitude setup

In Amplitude, navigate to **Data Sources**, then find CSV in the **I want to import data into Amplitude** tab.

!!! note
    This source is on a per-project basis.

1. Upload the CSV
![Amplitude Lookup Upload CSV](../../assets/images/integration-lookup-create-upload.png)
2. Click next
![Amplitude Lookup Create Next](../../assets/images/integration-lookup-create-next.png)
3. Select a property
![Amplitude Lookup Select Property](../../assets/images/integration-lookup-create-property.png)
4. Click finish

## Updates

If you want to create a new lookup property or that mapped property is incorrect, you can update the Lookup Table.

In Amplitude, navigate to Data Sources, then find the corresponding lookup table in the Sources table.

1. Navigate to "Edit Lookup Table Configuration"
![Amplitude Lookup Edit Screen](../../assets/images/integration-lookup-update-screen.png)
2. (Optional) Update the mapping property.
![Amplitude Lookup Update Property](../../assets/images/integration-lookup-update-property.png)
3. (Optional) Update the CSV data by uploading the data.
![Amplitude Lookup Update CSV](../../assets/images/integration-lookup-update-csv.png)
4. Click "Update your lookup table configuration".
![Amplitude Lookup Update button](../../assets/images/integration-lookup-update-update.png)

## Delete the lookup table and its properties

If a lookup table is no longer needed, you can delete it.

In Amplitude, navigate to Data Sources, then find the corresponding lookup table in the Sources table.

1. Navigate to "Edit Lookup Table Configuration"
![Amplitude Lookup Edit Screen](../../assets/images/integration-lookup-update-screen.png)
2. Click the delete button.
![Amplitude Lookup Delete Button](../../assets/images/integration-lookup-delete-button.png)
3. Follow the steps in the modal.
![Amplitude Lookup Delete Modal](../../assets/images/integration-lookup-delete-modal.png)
