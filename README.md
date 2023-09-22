<!-- markdownlint-disable-file -->
<!-- markdown-link-check-disable -->
<!-- vale off -->

This repository is archived as of September 22, 2023, and is in the process of migrating to a new location.

---
# README

This is the repo for the [Amplitude developer docs site](https://docs.developers.amplitude.com).

We use [Material for MkDocs](https://github.com/squidfunk/mkdocs-material) to create our docs.

If you have any questions, comments, or concerns open an issue.

## Contribute

Anyone can suggest changes to the docs. Just open a PR with your changes! See our [contribution guide](CONTRIBUTING.md) to get started.

## Getting Started

> :pushpin: This is an abbreviated version of the install instructions. For a full walkthrough that includes optional steps to create the best contributor experience, check out the [Amplitude Developer Center Wiki](https://github.com/Amplitude-Developer-Docs/amplitude-dev-center/wiki)

  Before you can install, you need pip. To install the link checker and Vale locally, you need brew and npm too.

1. Install Material. This command installs almost every dependency.

    `pip install mkdocs-material`

2. Install the git revision plugin

    `pip install mkdocs-git-revision-date-plugin`

3. (Optional) Install Vale and markdown-link-check. See [the Wiki](https://github.com/Amplitude-Developer-Docs/amplitude-dev-center/wiki#install) for full details.
4. Get the repo.
   -  **Ampliteers**: clone the repo: `git clone https://github.com/Amplitude-Developer-Docs/amplitude-dev-center.git`. If you aren't on the team, request access in #dev-doc-requests.
   - **Everyone else**: Fork the repo.
5. Preview changes locally using `mkdocs serve`
6. When you're ready, open a PR against main. Fill out the pull request template the best you can.
7. Check your PR preview build. The bot will add a PR comment with the link. 
8. Merge. After your PR is approved, you can merge it if you have write access. If you don't someone on the team will merge for you. 

>:pushpin: The files in the repo make use of [Insiders](https://squidfunk.github.io/mkdocs-material/insiders/) features. If you don't have Insiders, you can still build, but some [features](https://squidfunk.github.io/mkdocs-material/insiders/#available-features) won't render in your build. However, you can see them on the preview site when you open a PR.

## Resources

- [Developer Center Wiki](https://github.com/Amplitude-Developer-Docs/amplitude-dev-center/wiki)
- [Formatting Cheatsheet](https://github.com/Amplitude-Developer-Docs/amplitude-dev-center/wiki/Formatting-Cheatsheet)
- [Style Guide](https://github.com/Amplitude-Developer-Docs/amplitude-dev-center/wiki/Style-Guide)
- [Known issues and hacks I don't feel bad about](https://github.com/Amplitude-Developer-Docs/amplitude-dev-center/wiki#known-issues-and-hacks-i-dont-feel-bad-about)
- [Contribution Guide](CONTRIBUTING.md)
- [Material Docs](https://squidfunk.github.io/mkdocs-material/)
- [Markdown Link Check](https://github.com/tcort/markdown-link-check)
- [Vale Docs](https://docs.errata.ai/)
