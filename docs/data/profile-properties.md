---
title: Profile Properties 
description: Profile Properties allow you to sync a current property value from a source (currently only Snowflake) to use within the Amplitude platform.
---

Profile Properties enable you to merge customer profile data from your data warehouse with existing behavioral product data already in Amplitude. These values display the most current data synced from your warehouse.

## Setup

To set up a Profile Property in Amplitude, you must connect Amplitude to your data warehouse. Once connected, and you reach the data configuration section, you must select the “Warehouse Props” data type in the dropdown. From there, there are two minimum requirements for the import: a user identifier (user_id) and a profile property. Note: you may add more than one warehouse property per import, but there must be at least one per import.

## Data specifications

Profile Properties supports a maximum of 200 warehouse properties, and supports known Amplitude users. A `user_id` must accompany each profile property.

| Field               | Description                                                                                                                   | Example                  |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| User ID             | Identifier for the user. Must have a minimum length of 5.                                                                     | xyz@abc.com              |
| Profile Property 1  | Profile property set at the user-level. The value of this field is the value from the customer’s source since last sync. | “Title”: “Data Engineer” |
| Profile Property 2… | Profile property set at the user-level. The value of this field is the value from the customer’s source since last sync. | “City”: “San Francisco”  |

## SQL template


```sql
SELECT
__________ AS "user_id",
__________ AS "profile_property_1",
__________ AS "profile_property_2"
FROM DATABASE_NAME.SCHEMA_NAME.TABLE_OR_VIEW_NAME
```

## Clear a Profile Property value

You can remove profile property values in your data warehouse, and they will sync to Amplitude during the next sync operation. You can also use Amplitude Data to remove unused property fields from users in Amplitude.

## Sample queries

```sql
SELECT 
	user_id as "user_id",
	upgrade_propensity_score as "Upgrade Propensity Score",
	user_model_version as "User Model Version"
FROM
	ml_models.prod_propensity_scoring
```

```sql
SELECT 
	m.uid as "user_id",
	m.title as "Title",
	m.seniority as "Seniority",
	m.dma as "DMA"
FROM
	prod_users.demo_data m
```
