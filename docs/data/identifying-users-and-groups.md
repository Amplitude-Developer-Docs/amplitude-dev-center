---
id: identifying-users-and-groups
title: Identifying Users and Groups
---

You can tie a user to their actions and record traits about them, including the group they're in. Similar to events, you can add properties to users and groups to add additional context and better understand customer behavior.

###  Adding User Properties

User properties make it easy to record traits on a user (e.g. name, logins, plan, role, etc...) whenever the `identify()` call is made. We recommend calling identify:

- After a user signs up, e.g. `User Signed Up`
- After a user signs in, e.g. `User Signed In`
- Whenever a user updates their information, e.g. `Profile Updated`

![User Traits](/img/traits_user.png)

### Adding Group Properties

Group properties make it easy to associate a user with a particular account (e.g. name, industry, employees, etc...) whenever the `group()` call is made. This is helpful in software where you have accounts with multiple users.

![Group Traits](/img/traits_group.png)

This requires a paid add-on with Amplitude – [Account Extension](https://amplitude.com/accounts/group-analytics/).