---
id: typical-workflow
title: Typical Workflow
---

This guide describes your and your team's typical workflow once you've outgrown the **main** branch. It distills best practices and approaches we see in customer deployments and will hopefully navigate you on your own journey.

:::note The Main Branch
Up to this point, the **main** branch has been your tracking plan's home. **main** is a great place to start and you may find it to be more than enough for quite some time.

Working with branches becomes relevant when more teams get involved with Iteratively and allowing them to work in isolation becomes critical. Branches also become useful as you mature your tracking plan definition process with formal reviews and approvals.
:::

### #1 Create a Branch

The product team's kicking off a new feature. Engineering has already created a new branch in Git, and your product manager is getting ready to spec out corresponding changes to the product's tracking plan.

![Create branch](/img/create_branch.png)

This is a great time to create a new branch in Iteratively as well. Just as engineering is using a Git branch to work "on the side", you're using an Iteratively branch to work "on the side" on your tracking plan. The two branches will co-exist for almost exactly the same time and be linked: engineering will pull analytics code from the Iteratively branch into their Git branch throughout the feature's development.

:::note Tip
It helps to keep the names of the Git branch and the Itly branch the same, but it's not a requirement.
:::

### #2 Define Events

The first step in updating your tracking plan is figuring out what you want to track about your new feature in the first place. What does success look like? What metrics will your feature move and what events do you need to collect to calculate those metrics?

![Define Events](/img/define_events.png)

Creating events and properties in a branch works just like it does on **main**. See our guide [here](creating-your-tracking-plan#step-3-create-your-events) to learn more about creating events and [here](working-with-templates) to learn more about leveraging templates, a great way to keep your events consistent.

When you're done with your first draft and feel ready for engineering to take a look, [publish a new version](creating-your-tracking-plan/#step-5-publish-your-changes). You'll publish a lot of versions as you iterate on your plan with the team, so don't hesitate to publish early and often.

:::note Tip
Changes you make to your branch can't be instrumented until you've published a new version. This means you can safely work in your branch and only release changes to developers when you're ready.
:::

### #3 Instrument Events

If you haven't already, invite the developers working on the feature to Iteratively and ask them to review your proposed plan so far. Does it make sense?

:::note Tip
To see all the changes you've made to your branch, click the Merge button. Don't see the Merge button? Be sure you've published all your pending changes (the Publish button will appear instead if you haven't) and that your branch is up-to-date with **main** (the Refresh button will appear instead if it isn't).
:::

Next, engineers will get started on implementing the updated tracking plan in their branch. They'll use the Ampli [CLI](using-the-ampli-cli) to generate a new tracking library that matches the changes in the Iteratively branch (`ampli pull -b {branch-name}`).


What issues do they encounter? What's easy and hard for them? It's normal to iterate on your tracking plan with your developers. Publish new versions as needed and as your understanding evolves based on their feedback.

:::note Tip
To keep your branch's tracking plan in sync with the source code, ask your developers to report their status with `ampli status -u`. You'll see which events have been instrumented, which are out of date, and which are still TBD. Only merge your changes into **main** once all checkmarks are green.
:::

### #4 Request Reviews

Once the feature team is happy with the changes — the plan is comprehensive and engineering was able to implement it correctly — your branch is ready for review by other stakeholders.

:::note Tip
Be sure to refresh your changes from **main** to get your branch up to date and resolve any potential conflicts. You may do this more than once as your developers refresh their branch as well (via `git merge` or `git rebase`).
:::

Analytics changes typically impact the broader organization, so getting feedback is important. Typical stakeholders include the security and legal team, the growth team, and the data team.

Soliciting reviews starts with the creation of a Merge Request. When creating a Merge Request, describe the changes you're proposing and @mention any specific reviewers or approvers you'd like to take a look.

### #5 Merge

Finally! The tracking plan changes are ready to go, everyone who's needed to approve has approved, and you're ready to merge into **main**.

![Merge branch](/img/merge_branch.png)

Once the rest of the feature team is ready to merge in Git as well, merge your branch in Iteratively first. This will create a new official version of your tracking plan on **main** and assign new versions to all new and changed events.

Now that the Iteratively branch is merged, it's time to update the Git branch with the latest tracking plan before it gets merged as well. Ask your developers to finalize their work by pulling the latest tracking library from **main** (`ampli pull -b main`). If your branch was already up-to-date with **main**, engineering's work is done.

🎉 Congratulations!