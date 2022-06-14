---
title: Send Cohorts to Qualtrics
description: With the Qualtrics cohort export integration, you can export Amplitude user cohorts into an existing mailing list in your Qualtrics XM directory.
---

With the Qualtrics cohort export integration, you can export Amplitude user cohorts into an existing mailing list in your Qualtrics XM directory.

## Considerations

- In Qualtrics, your cohorts appear as `[Amplitude] <cohort name> (<cohort ID>)`, with a value of `active`. If a user doesn't exist in Qualtrics, a contact is added to the mailing list. See the [Qualtrics documentation](https://www.qualtrics.com/support/iq-directory/lists-tab/creating-mailing-lists/) for more information.

## Setup

You need to complete setup simultaneously in Amplitude and Qualtrics.

1. In Amplitude, navigate to **Data Destinations**, then find **Qualtrics - Cohort**.
2. Click **Connect to Qualtrics** and follow the directions on the Qualtrics site to authorize Amplitude to send cohorts to Qualtrics.
3. In a separate window, log in to your Qualtrics XM account.
4. Click the profile icon. From the *My Account* menu, select **Account Settings**.
5. On the *Qualtrics IDs* tab under *Directories*, find *Default Directory* and copy the ID (it starts with `POOL_`).
6. In Amplitude, paste this ID into the *Directory ID* field.
7. In Qualtrics, locate *Datacenter ID* (under *User*) and copy the ID, a short string of lowercase-alphanumeric characters.
8. Back in Amplitude, paste the ID into the *Datacenter ID* field.
9. In Qualtrics, find a mailing list ID.
      1. Click on the hamburger menu and select **Directories**.

       ![Directories menu](/../../../assets/images/integrations-qualtrics-directories-menu.png)

      2. In the *Segments & lists* tab, click **Lists**.

       ![Segments and lists tab](/../../../assets/images/integrations-qualtrics-lists.png)

10. Select the mailing list you want to add exported Amplitude cohort to. If you don't have a mailing list created, or want to export users to a new list, click *Create a list* and follow the instructions.
11. In the URL (for example `https://org.qualtrics.com/iq-directory/#/POOL_XXXXX/groups/lists/CG_XXXXX`) retrieve your mailing list ID, starting with `CG_`, from the end of the URL.
12. In Amplitude, paste this ID into the *Mailing List ID* field. Then enter a name in the *Name* field to identify your destination.
13. Select an Amplitude user property. It must contain an email address for each user, such as `[Amplitude] User ID`, `email`, or a valid custom user property.
14. Save when finished.
