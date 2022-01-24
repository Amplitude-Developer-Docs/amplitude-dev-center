---
id: managing-your-account
title: Managing Your Account
---

import useBaseUrl from '@docusaurus/useBaseUrl';

:::note
Only admins have the ability modify [organization settings](https://help.amplitude.com/hc/en-us/articles/360058073772-Create-and-manage-organizations-and-projects). 
:::


### Settings

You can require team reviews before publishing new tracking plan versions for your workspace.

![Settings](/img/settings.png)

When enabled, all tracking plan changes must be made on a non-master branch and approved by a set number of approvers on your team before being published.

###  Taxonomy

Setting your workspace Taxonomy allows you to ensure that you have a consistent data structure for your analytics. Iteratively can enforce your configured conventions to ensure that all teams and stakeholders generate consistently-named events and properties, simplifying the consumption of those events and eliminating the need for data cleanup. Iteratively supports common naming conventions and custom regex-based naming conventions.

<p><img alt="Taxonomy" src={useBaseUrl('/img/taxonomy.png#400')} /></p>

When creating events and properties in the tracking plan, Iteratively will automatically suggest the proper naming and present a warning if an event is defined in a way that conflicts with your company’s naming convention.

### User Management

Accounts and permissions can be edited in the [Amplitude *Members* page](https://help.amplitude.com/hc/en-us/articles/360058531591-Manage-users-and-permissions).

#### Roles & permissions

The Amplitude roles allow users varying levels of permissions in Iteratively.

| Role     | Permissions |
|----------|-------------|
| Admin    | Configure workspace settings, approve tracking plan changes, and modify the tracking plan. |
| Manager | Approve tracking plan changes and modify the tracking plan. |
| Member   | Modify the tracking plan for approval. |
| Viewer   | View the tracking plan and comment. |


###  Creating an API Token

API tokens allow you to authenticate to Iteratively using secrets other than your Amplitude email address and password. Tokens you create authorize an application to enjoy the same roles and permissions granted to you when you log in personally. Tokens are useful when configuring Ampli to run in your [CI pipeline](/integrating-with-ci). 

![Tokens](/img/tokens.png)
