#!/usr/bin/env bash
set -e

APP_DIR="$HOME/learnGitBranching"
WEB_DIR="/var/www/html"

# Load nvm in non-interactive shell
export NVM_DIR="$HOME/.nvm"

if [ -s "$NVM_DIR/nvm.sh" ]; then
  . "$NVM_DIR/nvm.sh"
else
  echo "nvm.sh not found at $NVM_DIR/nvm.sh"
  exit 1
fi

cd "$APP_DIR"

nvm use 14.20.0
yarn gulp fastBuild

sudo rm -rf "$WEB_DIR"
sudo mkdir -p "$WEB_DIR"

sudo cp index.html "$WEB_DIR/"
sudo cp -a build "$WEB_DIR/"
sudo cp -a assets "$WEB_DIR/"

sudo chown -R www-data:www-data "$WEB_DIR"
sudo find "$WEB_DIR" -type d -exec chmod 755 {} \;
sudo find "$WEB_DIR" -type f -exec chmod 644 {} \;

sudo apache2ctl configtest
sudo systemctl reload apache2

echo "Deployed successfully."