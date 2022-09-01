<!-- markdownlint-disable-file -->
<!-- markdown-link-check-disable -->

# Amplitude Developer Center Style Guide

> :pushpin: **Expect this guide to change**. The Amplitude Developer Center is maturing and this guide will evolve. 

Audience for this guide
-----------------------

Anyone contributing to the Amplitude developer docs, primarily engineers, product, partners.

## About Vale
----------

Vale is a syntax-aware linter. We use it in the Developer Doc Center project. If you are contributing to dev doc, I **highly recommend** taking the time to install Vale locally. It is configured for our style guide, and flags style issues in your work. Learn more in the [README](https://github.com/Amplitude-Developer-Docs/amplitude-dev-center).

## The reason we have a style guide
-------------

A style guide keeps our voice and how we talk about our products consistent. Consistent docs foster trust from our customers because they learn how to find what they need. Consistent docs are reliable and trustworthy.

A style guide helps us write for a global audience, and helps keep the docs accessible. Writing for a global audience means that *all* readers can better understand our docs, and future translation will be cheaper, faster, and better. Global English is often more accessible. Simpler = better, almost always.

## General rules
-----------

|**Rule**|**Don't** :x: |**Do** :white_check_mark:|
|---|---|---|
|Use present tense.|You will see the code update.|The code updates.|
|Don't use directional language.|In the example below...|In the following example...|
|Use short sentences. Try to keep them under 30 words. | |  |
|Use a single word when possible.|There are a *number of* ways to accomplish this task.|There are *many* ways to accomplish this task.|
|Avoid first-person pronouns.|When you perform this task, we then take the data and upload it to space.|When you perform this task, Amplitude takes the data and uploads it to space.|
|AM and PM. Capitalized, preceded by a space.|The job starts at 9am|The job starts at 9 AM.|
|Use sentence case in headlines.|How Amplitude Works|How Amplitude works|
|Avoid gerunds in headlines.|Setting up the thing|Set up the thing|
|Use contractions.|Do not add the values there.|Don't add the values there.|
|Spell out month names.|Run the job for Apr-Jun|Run the job for April through June.|
|Don't use ie or eg. *i.e* is in essence, which is just a way of rephrasing the point. If you find yourself wanting to use i.e, try rephrasing the sentence instead.|Enter the date in YYYYMMDD format, e.g. 20220101.|Enter the date in YYYYMMDD format. For example, 20220101.|
|Don't use passive voice unless necessary.|Export size for cohorts *is limited* to 10 million users.|The size limit for cohort export is 10 million users.|
|Don't use "since" when you mean "because"|Since there are millions of records in the queue, uploads can take a long time.|Because there are millions of records in the queue, uploads can take a long time.|
|Don't use "once" when you mean "after" or "when".|Once the upload is finished, close the window.|When the upload is finished, close the window. / After the upload is finished, close the window.|
|Don't refer to potential future functionality. As a public company, we want customers to make buying decisions based on current functionality. We can't say anything in the docs that can be construed as any promise.|Currently, only the wizzybop parameter is supported. In the future, Amplitude plans to add support for 8 other parameters.|The wizzybop parameter is supported.|

## Dummy tokens
-----------

Use these dummy values in code samples. If using a dummy value wouldn't be clear and you need a more demonstrative value in an example use the field name itself.

For example, when introducing a function in the docs:

`Amplitude.instance().setUserId("userId")` where a dummy "userId" value wouldn't be clear enough.

|**Token**|**Value**|
|--------|---------|
|API Key|<API_KEY>|
|`user_id`|`576dbce6-e2b7-11ec-8fea-0242ac120002`|
|`device_id`|`C8F9E604-F01A-4BD9-95C6-8E5357DF265D`|

## Parameter tables
---------------

|**Rule**|**Don't** :x:|**Do** :white_check_mark:|
|-------|----------|-------|
|*Optional, required. Type. Description.* *Defaults*.|Specifies additional configuration options for the Ampli Wrapper. This field is optional. Default is `false`.|Optional. String. Specifies additional configuration options for the Ampli Wrapper. Defaults to `false`.|