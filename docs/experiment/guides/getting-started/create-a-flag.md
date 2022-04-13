---
title: Create a Flag
description: How to create a feature flag, add a deployment, configure targeting rules, and activate the feature flag.
---

1. From the Flags screen in Experiment, select your target project from the dropdowns.
2. Click **Create Flag**.
3. Enter a **Name** for the flag (e.g. `Getting Started`).
   1. Experiment will automatically generate a normalized **Key** for your flag/experiment. The key is the string which is used to access the variant in you application. You may choose to customize this key, as once the key is set it cannot be changed.
4. (Optional) Enter a **Flag Description** (e.g. `Getting started with Amplitude Experiment`) to better describe the flag.
5. Save the experiment configuration. You can edit most fields from the flag's settings.

### Add a deployment

Once you've created the flag, you'll need to add a deployment. To add a deployment, click the selection drop down in the upper right corner of the screen and select the deployment you created previously.

!!!tip "Multiple Deployments"
    You may select multiple deployments in the dropdown if you want to target multiple deployments. E.g. if you are running an experiment on both your iOS and Android apps, you should create separate deployments for each and select both in the multi-deployment experiment.

### Define variants

After you have created your flag, you are ready to define its variants. A flag will contain an initial variant, "on", by default. If you are rolling out more than one variant of a feature, add variants using the **Create Variant** button. Make sure to add descriptions to your variants so that your team members can follow along.

!!!info "Your flag must have at least one variant."

### Configure targeting rules

Your flag will not target any users by default. To target users, navigate to the "Targeting" tab and set the **Percentage Rollout** to 100%. Now all evaluated users will be assigned the "on" variant for this feature flag.

TODO: Add Image

### Activate the flag

Once you're done configuring your flag, activate the flag using the toggle in the upper right corner and follow the instructions in the activation modal.

TODO: Add Image
