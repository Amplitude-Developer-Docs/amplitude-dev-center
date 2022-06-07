<!-- markdownlint-disable-file -->

# README

This is the Amplitude Developer Center site. This site is currently in beta and the workflows may change.

## About

We use [Material for MkDocs](https://github.com/squidfunk/mkdocs-material) to create our docs. 

If you have any questions, comments, or concerns open an issue.

## Contribute

Anyone can suggest changes to the docs. Just open a PR with your changes! See our [contribution guide](CONTRIBUTING.md) to get started. 

## Install
  
  Before you can install, you need pip. To install the link checker and Vale locally, you need brew and npm too.

### 1. Install Material

This command installs almost every dependency.

`pip install mkdocs-material`

### 2. Install Git Revision Plugin

`pip install mkdocs-git-revision-date-plugin`
  
### 3. (Optional, but highly encouraged) Install Vale CLI
  
  Vale is a style linter we use to help enforce consistency and accessibilty in our docs. Our style guide config is included in this repo. To use the linter, you need to install Vale. 
  
  `brew install vale`
  
  After it's installed, you can run Vale in the terminal. See [Vale docs](https://docs.errata.ai/vale/cli). You can also install the plugin for your editor:
  - [Atom](https://github.com/errata-ai/vale-atom)
  - [VS Code](https://github.com/errata-ai/vale-vscode)
  - [Vim](https://github.com/dense-analysis/ale)
  - [Sublime](https://github.com/errata-ai/SubVale)

The changes Vale flags are mostly suggestions, but please make an effort to address problems. The closer we stick to the style guide, the better the docs will be.
  
## Write and publish

### 1. Get the repo 

- Ampliteers, clone the repo: `git clone https://github.com/Amplitude-Developer-Docs/amplitude-dev-center.git`. If you aren't on the team, request access in #dev-doc-requests.
- Everyone else: Fork the repo. 

**Note for Ampliteers**: If you're working on a secret feature, use the amp-internal-dev repo instead. Contact Casey Smith for access and instructions.
  
### 2. Create a branch and make your changes

  - See our [formatting cheatsheet](/formatting-cheatsheet.md) for help with our most frequently used formatting elements. 

### 3. Run a local server and preview your changes

Preview changes locally using `mkdocs serve`
  
When you're ready, open a PR against the staging branch*. Fill out the pull request template the best you can.
  
 **Note for Ampliteers**: *If you have questions about which staging branch to use, ask in #dev-doc-requests.

### 4. Merge

After your PR is approved, we'll merge it. Merging to `main` publishes to the website.

## Notes
- The files in the repo make use of [Insiders](https://squidfunk.github.io/mkdocs-material/insiders/) features. If you don't have Insiders, you can still build, but some [features](https://squidfunk.github.io/mkdocs-material/insiders/#available-features) won't render in your build. However, you can see them on the preview site when you open a PR. 
- If you're using VS Code, install the [markdownlint extension](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint). This extension flags problems with your markdown. The project includes a config file to cut down on noisier errors. 

## Resources

[Formatting Cheatsheet](formatting-cheatsheet.md)

[Style Guide](style-guide.md)

[Contribution Guide](CONTRIBUTING.md)

[Material Docs](https://squidfunk.github.io/mkdocs-material/)
  
[Markdown Link Check](https://github.com/tcort/markdown-link-check)

[Vale Docs](https://docs.errata.ai/)

## Known issues and hacks I don't feel bad about

- **Two mkdocs config files**. Because of the way Insiders and config inheritance work, I had to make a config file for people who don't have Insiders and one for the build bot (which does have Insiders). This was intentional. Site builds should always use `insiders.mkdocs.yml`. If you want to know more, read the dissertation I wrote in `insiders.mkdocs.yml`.
- **Column CSS classes**. Markdown tables are easier to write than HTML tables. However, column width is set by the width of the contents in the first cell for each column. This can lead to too-narrow column widths in some data tables (especially param tables). Because you can add HTML to markdown, I created some CSS classes to manually set the width in cases where it makes sense. Just wrap the contents of the column's table heading with a `<div class="big-column">` (180px) or <div class="med-column"> (100px) as needed. See `docs/stylesheets/extra.css` and search for "column width classes" for an explanation and the classes. 
- **Unsupported language syntax highlighting**. The project uses Pygments for code syntax highlighting. As with all highlighters, some languages aren't explicitly supported. If you can't find your language supported in [this list](https://pygments.org/languages/), you can either write your own, or just use the closest thing you can. This is an edge case. For NodeJs, just use `js`. 
