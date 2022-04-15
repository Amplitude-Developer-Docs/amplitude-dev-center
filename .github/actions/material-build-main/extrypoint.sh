#!/bin/sh

set -x # verbose mode
set -e # stop executing after error

echo "Starting build"

####################################################
# Set workspace permissions
####################################################

chmod -R a+w /github/workspace

####################################################
# Build the Mkdocs site
####################################################

pip install -r requirements.txt
pip install mkdocs-git-revision-date-plugin

mkdocs build -f insiders.mkdocs.yml

####################################################
# Build completed
####################################################

echo "Completed build"
