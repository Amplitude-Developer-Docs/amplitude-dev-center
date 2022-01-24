---
id: working-with-branches
title: Working with Branches
---

As soon as multiple teams need to make and test changes to a tracking plan at the same time, making sure they can do this without running into each other can become a challenge. Rather than trying to coordinate these parallel efforts, Iteratively lets each team create their own isolated working area called a branch.

A branch is like a point-in-time snapshot of the tracking plan created for you and your team. You can make your own changes to it without those changes being immediately visible to everyone else, and only merge them back into the main tracking plan when they're ready.

:::note Git
If you're familiar with Git, branches in Iteratively will be immediately familiar to you. They work just like branches in your favorite version control system! In fact, in many cases, you'll create a branch in Iteratively anytime you create a new feature branch in Git.
:::

### Getting Started

When you first create your Iteratively account, we'll automatically create a default branch for you called **main** and add a few sample events and properties to it. **main** is a great branch to get started with and you may find that for the longest time, it's the only branch you need.

### Publishing Versions

At first, changes you make on a branch (whether on the **main** branch or your own branch later on) are kept in the branch's staging area and remain *pending*. Pending changes are like work-in-progress changes: visible to you and your team mates, but hidden from your production systems and not yet available for instrumentation by your engineering team.

As soon as you feel that your pending changes are ready for prime time, you'll *publish* them. Publishing changes creates a new version of your tracking plan with those changes applied and exposes that new version to your engineering team for instrumentation. If your new version was created on the **main** branch, those changes will also propagate to your production systems (for example, they'll sync to your Amplitude account).

:::note ⭐ **main**
As you can tell, **main** is a special branch in Iteratively. You can think of **main** as your production branch: it contains your latest official tracking plan and matches what's currently instrumented in your default branch in Git (typically **master** or **main**).
:::

Every new version is assigned a version number and an optional description so you can tell them apart later. Version numbers start at 1 and grow by 1 every time you publish a new one.

:::note Versions Across Branches
Every branch has its own tracking plan versions, which means it's possible you'll have two tracking plan versions 3: one in **main**, and one in your own branch. When this happens, Iteratively will always show you the name of the branch as well to avoid any confusion.
:::

### Creating and Deleting Branches

As you and your team ramp up their use of Iteratively, you'll soon outgrow the **main** branch and need a more robust workflow. This usually happens when:

* Too many people are making changes to **main** at the same time and starting to run into each other
* Feature teams would like their own separate copy of the tracking plan to collaborate in, review their work, and get stakeholder approval

Both are great reasons to create a branch. In Iteratively, all branches are created off **main** and merge back into **main**.

To create a new branch:

1. Click Branch: **main** in the page's header
2. Type in the name of the branch you'd like to create
3. Press Enter

![Create branch](/img/create_branch.png)

If you had any pending changes on **main**, you'll have a chance to either take those changes with you into your new branch, or leave them behind on **main**.

### Working on a Branch

Once your branch is created, working with it is just like working with **main**. You and your team will create and publish new versions on it, instrument those versions in the product, and report back to the branch on the status of the instrumentation.

All of this can happen in parallel with other teams working in their own branches without any impact on you.

From time to time, you'll refresh your branch with any changes that may have been made to **main** since you created your branch. If Iteratively detects that your branch is out of date with **main**, a Refresh button will appear in the page's toolbar and let you catch up.

### Merging Back into Main

Ultimately, you'll be happy with the changes you've made on your branch and feel ready to merge them back into **main**. This typically happens when your product team is also ready to merge their changes into the main branch in Git.

![Merge branch](/img/merge_branch.png)

You can merge your changes into **main** anytime. Just click the Merge button in the page's toolbar, make sure everything looks good, and merge.

:::note Before You Merge
A few things must happen before you can successfully merge:
* First, all pending changes must be published on your branch
* Second, your branch must be up to date with **main**
* And lastly, **main** must have all its pending changes published as well
:::

If your account is configured for [team reviews](managing-your-account/#settings), you may not have permission to merge directly and will instead first create a Merge Request. A Merge Request is a way to ask stakeholders outside your team to review your changes and give their explicit approval. Only team members with the Approval or Admin role can approve (Viewers and Editors cannot), and they can do so by logging into Iteratively and clicking the Merge button in the page's toolbar.

A Merge Request that's been approved (possibly by multiple team members if more than one approver is required) is now ready to merge by anyone on your team.
