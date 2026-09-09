#!/usr/bin/env bash
set -e

APP_DIR="${APP_DIR:-$HOME/learnGitBranching}"
WEB_DIR="${DEV_WEB_DIR:-/var/www/learngit-dev}"
DEV_PORT="${DEV_PORT:-8080}"
DEV_BIND_ADDRESS="${DEV_BIND_ADDRESS:-*}"
DEV_SERVER_NAME="${DEV_SERVER_NAME:-localhost}"
DEV_SITE_CONF="/etc/apache2/sites-available/learngit-dev.conf"
DEV_PORT_CONF="/etc/apache2/conf-available/learngit-dev-port.conf"

# Load nvm in non-interactive shell
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"

if [ -s "$NVM_DIR/nvm.sh" ]; then
  . "$NVM_DIR/nvm.sh"
else
  echo "nvm.sh not found at $NVM_DIR/nvm.sh"
  exit 1
fi

cd "$APP_DIR"

nvm use 14.20.0
yarn gulp fastBuild

case "$WEB_DIR" in
  ""|"/"|"/var"|"/var/www"|"$HOME")
    echo "Refusing to deploy to unsafe DEV_WEB_DIR: $WEB_DIR"
    exit 1
    ;;
esac

sudo mkdir -p "$WEB_DIR"
sudo find "$WEB_DIR" -mindepth 1 -maxdepth 1 -exec rm -rf {} \;

sudo cp index.html "$WEB_DIR/"
sudo cp -a build "$WEB_DIR/"
sudo cp -a assets "$WEB_DIR/"

sudo chown -R www-data:www-data "$WEB_DIR"
sudo find "$WEB_DIR" -type d -exec chmod 755 {} \;
sudo find "$WEB_DIR" -type f -exec chmod 644 {} \;

if ! sudo grep -R -Eq "^[[:space:]]*Listen[[:space:]]+([^#[:space:]]+:)?${DEV_PORT}([[:space:]]|$)" \
  /etc/apache2/ports.conf /etc/apache2/conf-available /etc/apache2/sites-available; then
  printf 'Listen %s\n' "$DEV_PORT" | sudo tee "$DEV_PORT_CONF" >/dev/null
  sudo a2enconf learngit-dev-port >/dev/null
fi

sudo tee "$DEV_SITE_CONF" >/dev/null <<EOF
<VirtualHost ${DEV_BIND_ADDRESS}:${DEV_PORT}>
    ServerName ${DEV_SERVER_NAME}
    DocumentRoot ${WEB_DIR}

    <Directory ${WEB_DIR}>
        Options FollowSymLinks
        AllowOverride None
        Require all granted
    </Directory>

    ErrorLog \${APACHE_LOG_DIR}/learngit-dev-error.log
    CustomLog \${APACHE_LOG_DIR}/learngit-dev-access.log combined
</VirtualHost>
EOF

sudo a2ensite learngit-dev >/dev/null
sudo apache2ctl configtest
sudo systemctl reload apache2

PUBLIC_IP=$(curl -fsS --max-time 2 https://ifconfig.me 2>/dev/null || hostname -I | awk '{print $1}')

echo "Dev website deployed successfully."
echo "Try: http://${PUBLIC_IP}:${DEV_PORT}/"
