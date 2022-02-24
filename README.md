# README

This is the Amplitude Developer Center site. 

To get started with contributing, first read <PLACEHOLDER FOR DOCS>.

## Install 

### 1. Install Material

Most dependencies are installed with this command. 

`pip install mkdocs-material`

### 2. Install Git Revision Plugin

`pip install mkdocs-git-revision-date-plugin`
  
### 3. (Optional) Install Local Link Checker
   
`npm install -g markdown-link-check`
  
  We have a GitHub Action that runs a link checker for PRs, but it's annoying to only find out links are broken after you open your PR. If you install the link checker, you can run the linter locally with this command: `markdown-link-check -c .github/workflows/link-check-config.json path/to/your/file.md`. It's not perfect, so if you find that the job repeatedly fails on a valid link, then add the pattern to ignore to the config.json file. 

### 3. Clone this Repo
  
### 4. Create a branch and make your changes
  
  When you're ready, open a PR against [PLACEHOLDER FOR STAGING BRANCH], and tag your reviewer. Opening a PR against [PLACEHOLDER FOR STAGING BRANCH] creates a preview site where you can check your changes. 

### 5. Merge
  
After your PR is approved, merge it. 


## Notes
- The files in the repo make use of [Insiders](https://squidfunk.github.io/mkdocs-material/insiders/) features. If you don't have Insiders, you can still build, but some [features](https://squidfunk.github.io/mkdocs-material/insiders/#available-features) won't render in your build. 


## Resources 
[Material Docs](https://squidfunk.github.io/mkdocs-material/)
  
[Markdown Link Check](https://github.com/tcort/markdown-link-check)
