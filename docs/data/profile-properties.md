---
title: Profile Properties 
description: Profile Properties allow you to sync a current property value from a source (currently only Snowflake) to use within the Amplitude platform.
---

## Context
Customers can now bring in non-behavioral, customer profile data from their data warehouse to merge it with the existing behavioral product data already living in Amplitude. These values will always display the most current value being synced from the customer’s data warehouse.

## Setup
To set up a Profile Property in Amplitude, you must connect Amplitude to your data warehouse. Once connected, and you reach the data configuration section, you must select the “Warehouse Props” data type in the dropdown. From there, there are two minimum requirements for the import: a user identifier (user_id) and a profile property. Note: you may add more than one warehouse property per import, but there must be at least one per import.

## Data Specifications
The maximum number of warehouse properties currently supported for a single profile property import is 200. Today, profile properties are only supported for known Amplitude users. Therefore, each profile property must be accompanied by a user identifier (user_id).

| Field               | Description                                                                                                                   | Example                  |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| User ID             | Identifier for the user. Must have a minimum length of 5.                                                                     | xyz@abc.com              |
| Profile Property 1  | Profile property set at the user-level. The value of this field will be the value from the customer’s source since last sync. | “Title”: “Data Engineer” |
| Profile Property 2… | Profile property set at the user-level. The value of this field will be the value from the customer’s source since last sync. | “City”: “San Francisco”  |

## SQL Template

```
SELECT
__________ AS "user_id",
__________ AS "profile_property_1",
__________ AS "profile_property_2"
FROM DATABASE_NAME.SCHEMA_NAME.TABLE_OR_VIEW_NAME
```

## Clearing a Profile Property Value
Sometimes customers want to remove the value associated with a user in Amplitude. Because Amplitude performs a “full sync” with the customer’s data warehouse, all that is needed is for the customer to update the underlying value in the table with an empty value. This will zero out the value in Amplitude during the subsequent sync. Customers can use Amplitude Data to fully remove unused property fields from users in Amplitude.

## Sample Queries

```
SELECT 
	user_id as "user_id",
	upgrade_propensity_score as "Upgrade Propensity Score",
	user_model_version as "User Model Version"
FROM
	ml_models.prod_propensity_scoring
```

```
SELECT 
	m.uid as "user_id",
	m.title as "Title",
	m.seniority as "Seniority",
	m.dma as "DMA"
FROM
	prod_users.demo_data m
```
