# Script for running Markdown-link-check with our config file locally in Terminal. Saves some typing.
# You must have markdown-link-check installed for this script to work.
# Run with `bash linkcheck.sh full/path/to/file`
# Example: `bash linkcheck.sh docs/getting-started.md`

markdown-link-check $1 -c .markdown-link-check.json