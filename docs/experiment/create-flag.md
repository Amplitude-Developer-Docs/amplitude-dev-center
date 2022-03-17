---
title: Create a Flag or Experiment
description: Create a new flag or experiment in Amplitude Experiment.
---

After you have completed setting up a product, you're taken to the Flags page filtered for the product you just created. 
If your product had multiple deployments, make sure you pick the one that you want to create and test your first flag in. We recommend starting in a development/test deployment each time for a new flag.
 You can copy your flag definition across all other deployments at any time.

## Create a flag

1. From the Flags screen in Experiment, select your target project and deployment from the dropdowns.
2. Click **Create Flag**.
3. Enter a **Name** for the flag. 
4. Enter a complete **Flag Description**.
5. Save your work. You can edit these details at any time from the flag's detail page.

Experiment handles some fields automatically for you.

- Experiment generates a key for the flag. This is an identifier for the flag used in your codebase. This is populated by us with a normalized version of your flag's Name.
- Experiment supports an internal Amplitude ID as a bucketing key, and computes an Amplitude ID for a user using a User ID and a Device ID. Learn more in the [Help Center](https://help.amplitude.com/hc/en-us/articles/115003135607-Tracking-unique-users#h_7cf7c47f-ec71-4e15-8c47-a2bda5d84186). We recommend sending the same User ID and Device ID that you send to Amplitude to Experiment.
- Experiment creates a bucketing salt to use for hashing your ID.

## Define variants

After you have created your flag, you are ready to define its variants. By default, Experiment creates one variant of "true" but you can edit these at any time. If you are rolling out more than one variant of a feature, add variants using the **Create Variant** button. Make sure to add descriptions to your variants so that your team members can follow along.

Your flag isn't active yet. You want to complete implementing your flag before activating it for debugging as a healthy practice. <!-- note for Brian -- what does the user need to do to complete implementation?-->

!!!info "Variants"

    Your flag must have at least one variant. A variant of on is provided upon creation, and can be edited. The default value off is the value returned when the flag is not active.
