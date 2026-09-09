#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "apache.sh is kept for compatibility. Use rebuildProductionWebsite.sh directly for production deploys."
exec "$SCRIPT_DIR/rebuildProductionWebsite.sh"
