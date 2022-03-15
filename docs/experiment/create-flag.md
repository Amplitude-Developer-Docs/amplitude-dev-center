---
title: Create a Flag or Experiment
description: Create a new flag or experiment in Amplitude Experiment.
---

As soon as you have completed setting up a product, you will land on our Flags page filtered for the product you just created. If your product had multiple deployments, make sure you pick the one that you want to create and test your first flag in. We recommend starting in a development/test deployment each time for a new flag. You can easily copy your flag definition across all other deployments at any time.

In the image below, you can see that we have selected the "To-Do-List" product and android dev deployment for our first flag.

Flag Dashboard
Flag Dashboard

Select "Create Flag" to create a new flag.

Enter a Name for the flag. This is a display name used in the lab interface.
Enter a complete Flag Description. This will help other team members understand all the context behind this rollout/experiment.
We will automatically generate a Key for the flag. This is an identifier for the flag used in your codebase. This is populated by us with a normalized version of your flag's Name.
We currently only support an internal "Amplitude ID" as a bucketing key. We compute an Amplitude ID for a user using a User ID and a Device ID: Docs. We recommend sending the same User ID and Device ID that you send to Amplitude to our new Experiment product as well.
We will automatically create a bucketing salt to use for hashing your ID.
Once you have created a flag, you can edit these details at any time from the flag's detail page.


Now that you have created your flag, you are ready to define its variants. By default, we create one variant of "true" but you can edit and modify these at any time. If you are trying to roll out more than one variant of a feature, you will need to add variants using the "Create Variant" button. Make sure to add descriptions to your variants so that your team members can follow along.

Not that your flag is not active at this time. You want to complete implementing your flag before activating it for debugging as a healthy practice.

Flag details page
Flag details page

!!!info "Variants"

    Your flag must have at least one variant. A variant of on is provided upon creation, and can be edited. The default value off is the value returned when the flag is not active.