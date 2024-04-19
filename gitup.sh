#!/bin/bash
# Check if a commit message is provided as a command-line argument
if [ -z "$1" ]; then
  echo "Usage: $0 <commit_message>"
  exit 1
fi

# Commit changes with the provided message
git add .
git commit -m "$1"

# Push changes to the remote repository
git push origin API  # Change 'main' to the name of your branch if needed