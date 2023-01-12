---
title: Send Cohorts to Sendgrid
description: Send audiences from Amplitude to Sendgrid to create more personalized campaigns.
status: new
---

!!!alpha 
    This integration is currently in Alpha and is in active development. If you have any feedback to improve or have suggestions around this documentation, email <integrations@amplitude.com>. 

[SendGrid](https://sendgrid.com/) is a proven cloud-based customer communication platform that successfully delivers over 45 billion emails each month.

This SendGrid integration allows you to send audiences from Amplitude to SendGrid to create more personalized campaigns. 

## Considerations

- The API key from SendGrid must be either Full Access or Restricted Access with Marketing permissions.
- Cohorts cannot have duplicate emails. Duplicates cause sync errors with SendGrid.
  - The recommended way to guarantee unique email addresses is by setting your Amplitude User IDs to use email addresses. 
- All exported emails must be valid or the sync will fail.
- You must map the email, first name, and last name fields. If the Amplitude user doesn't have values for the first and last name fields, the corresponding SendGrid contact won't have first or last names, only the email address.
- In cases where users don't have an email address, they aren't synced to SendGrid. This can cause a discrepancy between the number of users in SendGrid and Amplitude. 
- In SendGrid, emails aren't case-sensitive. For example, "User@Company.com" and "user@company.com" sync to the same contact (user@company.com).
- New contacts are created for Amplitude users that are not SendGrid contacts, and existing contacts aren't duplicated. Both types of users are added to the list.

## Setup

### SendGrid setup

Log in to SendGrid and [create your API key](https://docs.sendgrid.com/ui/account-and-settings/api-keys).
- The type of API key must be either Full Access or Restricted Access with Marketing permissions

### Amplitude setup

1. In Amplitude, navigate to **Data Destinations**, then find **SendGrid - Cohort**.
2. Click **Add another destination**.
3. Enter the name.
4. Paste the API key into the SendGrid destination settings.
5. Assign mappings for email (must be a unique identifier), first name, and last name.
6. Save when finished.

## Send a cohort

To sync your first cohort, follow these steps:

1. In Amplitude, open the cohort you want to sync, then click **Sync**.
2. Select **SendGrid**, then click **Next**.
3. Choose the account you want to sync to.
4. Choose the sync cadence.
5. When finished, save your work.

Depending on the size of your cohort, it can take a few minutes to see the correct number of cohort users in SendGrid.
