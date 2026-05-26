#!/usr/bin/env bash
set -e

APP_DIR="$HOME/learnGitBranching"
WEB_DIR="$HOME/sites/learngit/public"

# Load nvm in non-interactive shell
export NVM_DIR="$HOME/.nvm"

if [ -s "$NVM_DIR/nvm.sh" ]; then
  . "$NVM_DIR/nvm.sh"
else
  echo "nvm.sh not found at $NVM_DIR/nvm.sh"
  exit 1
fi

cd ~/learnGitBranching
nvm use 14.20.0
yarn gulp fastBuild

rm -rf ~/sites/learngit/public
mkdir -p ~/sites/learngit/public

cp index.html ~/sites/learngit/public/
cp -a build ~/sites/learngit/public/
cp -a assets ~/sites/learngit/public/