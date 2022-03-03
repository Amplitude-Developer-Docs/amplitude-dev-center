# README

**THIS IS A WIP. PING CASEY SMITH FOR HELP 
**

This is the Amplitude Developer Center site. 

To get started with contributing, first read PLACEHOLDER FOR DOCS ONCE I WRITE THEM.

## Install 
  
  Before you get started, you need pip installed. To install the the link checker and Vale locally, you'll need to have brew and npm too. 

### 1. Install Material

Most dependencies are installed with this command. 

`pip install mkdocs-material`

### 2. Install Git Revision Plugin

`pip install mkdocs-git-revision-date-plugin`
  
### 3. (Optional) Install Local Link Checker
   
`npm install -g markdown-link-check`
  
  We have a GitHub Action that runs a link checker for PRs, but it's annoying to only find out links are broken after you open your PR. If you install the link checker, you can run the linter locally with this command: `markdown-link-check -c .github/workflows/link-check-config.json path/to/your/file.md`. It's not perfect, so if you find that the job repeatedly fails on a valid link, then add the pattern to ignore to the config.json file. 

### 4. (Optional, but highly encouraged) Install Vale CLI
  
  Vale is a style linter we use to help enforce consistency and accessibilty in our docs. Our style guide config is included in this repo as a git submodule. To use the linter, you need to install Vale. 
  
  `brew install vale` 
  
  After it's installed, you can run Vale in the terminal. See [Vale docs](https://docs.errata.ai/vale/cli). You can also install the plugin for your editor:
  - [Atom](https://github.com/errata-ai/vale-atom)
  - [VS Code](https://github.com/errata-ai/vale-vscode)
  - [Vim](https://github.com/dense-analysis/ale)
  - [Sublime](https://github.com/errata-ai/SubVale)
  
### 5. Clone this Repo
  
### 6. Create a branch and make your changes
  
  Preview changes locally using `mkdocs serve`
  
  When you're ready, open a PR against [PLACEHOLDER FOR STAGING BRANCH], and tag your reviewer. Opening a PR against [PLACEHOLDER FOR STAGING BRANCH] creates a preview site where you can check your changes. 
  
  

### 7. Merge
  
After your PR is approved, merge it. 


## Notes
- The files in the repo make use of [Insiders](https://squidfunk.github.io/mkdocs-material/insiders/) features. If you don't have Insiders, you can still build, but some [features](https://squidfunk.github.io/mkdocs-material/insiders/#available-features) won't render in your build. 


## Resources 
[Material Docs](https://squidfunk.github.io/mkdocs-material/)
  
[Markdown Link Check](https://github.com/tcort/markdown-link-check)

[Vale Docs](https://docs.errata.ai/)
