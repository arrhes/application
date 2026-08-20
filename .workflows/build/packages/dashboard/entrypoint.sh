#!/bin/sh
set -e

# Render the runtime config.js from API_BASE_URL (browser-reachable API base).
# Only substitute the API_BASE_URL variable so unrelated $vars in the template
# are left untouched.
envsubst '$API_BASE_URL' < /config.template.js > /usr/share/nginx/html/config.js

exec nginx -g "daemon off;"