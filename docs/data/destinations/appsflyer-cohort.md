---
title: Send Cohorts to AppsFlyer
description: Send Amplitude cohorts to AppsFlyer Audiences to leverage your first-party Amplitude data to create rich audiences that power performance and organic marketing initiatives at scale.
---

!!!beta

    The AppsFlyer destination is in open beta, and is still in active development. If you have any feedback to help improve the AppsFlyer destination and its documentation, contact your AppsFlyer CSM or send an email to <hello@appsflyer.com>.

[AppsFlyer Audiences](https://www.appsflyer.com/products/audiences/) is a privacy-first audience segmentation and analytics solution aimed at increasing user retention and LTV through personalized interactions on owned and paid channels. With Audiences, you can effectively build, manage, and connect your audiences to more than 70 different partners and measure their performance and incremental impact from a single dashboard.

By sending Amplitude cohorts to AppsFlyer Audiences, you can leverage your first-party Amplitude data to create rich audiences that power performance and organic marketing initiatives at scale.

!!!note "Other Amplitude + AppsFlyer integrations"

    This integration sends Amplitude cohorts into AppsFlyer. Amplitude offers two other integrations with AppsFlyer: 

    - [Import AppsFlyer data](/data/sources/appsflyer)
    - [Send event data to AppsFlyer](/data/destinations/appsflyer)

## Considerations

- You must define a separate data destination in Amplitude for each app for which you are syncing data to AppsFlyer. For example, if you have an Android and an iOS app, you need to create two destinations in Amplitude: one for the Android app, and one for the iOS app.

## Setup

### AppsFlyer setup

Get your AppsFlyer App ID and AppsFlyer API token. 

#### Get app ID

Copy the app ID from your AppsFlyer dashboard.

![Image of the AppsFlyer dashboard](/../assets/images/integrations-appsflyer-app-id.png)

#### Get API token 

1. In AppsFlyer, access the user menu (email address drop-down in the top right corner).
2. Select **Security center**.
3. In the AppsFlyer API tokens section, click **Manage your AppsFlyer API tokens**.
4. Copy the V2.0 token.

### Amplitude setup 

#### Add the destination

1. In Amplitude, navigate to **Data Destinations**, then find **AppsFlyer - Cohort**.
2. Click **Add another destination**.
3. Enter *Name* and then paste your *AppsFlyer App ID* and *AppsFlyer API Token V2*.
4. Choose a platform.
5. Map your user identifier.
      - For iOS audiences: iOS Advertiser ID, Amplitude User ID, or AppsFlyer Customer User ID
      - For Android audiences: Google Advertiser ID, Amplitude User ID, or AppsFlyer Customer User ID
6. Save the destination.

## Send a cohort

Follow these steps to sync any of your Amplitude cohorts to your AppsFlyer destinations:

1. From the Cohorts page in Amplitude, click the cohort for which you want to create an AppsFlyer audience, or create a cohort.
2. Click **Sync**.
3. Select **AppsFlyer**, then click **Next**.
4. From the *Select an API target to sync to list*, select your AppsFlyer destination.
5. Define the sync cadence.
6. Click **Sync** to start syncing.

When the first sync finishes running, a new audience for this cohort is visible the Audiences tab of the Audiences dashboard in AppsFlyer.

By default, the name of the new audience is the name of the synced Amplitude cohort, followed by an alphanumeric identifier. You can edit the audience name from the Audiences dashboard if you wish.
