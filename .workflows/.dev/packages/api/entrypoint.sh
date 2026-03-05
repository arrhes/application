#!/bin/bash
# ==============================================================================
# API Service Entrypoint
# ==============================================================================
# Runs on container startup to initialize and start the API service.
# Generates .env files from Docker Compose environment variables so that
# package scripts using --env-file=.env work correctly.
# ==============================================================================
set -e

SCRIPT_DIR="/workspace/.workflows/.dev/packages/api"

# Generate .env files from environment variables set in compose.yml.
# The package scripts use --env-file=.env, which reads from these files.

cat > /workspace/packages/api/.env <<EOF
ENV=$ENV
VERBOSE=$VERBOSE
PORT=$PORT
CORS_ORIGIN=$CORS_ORIGIN
COOKIES_DOMAIN=$COOKIES_DOMAIN
COOKIES_KEY=$COOKIES_KEY
API_BASE_URL=$API_BASE_URL
APPLICATION_BASE_URL=$APPLICATION_BASE_URL
WEBSITE_BASE_URL=$WEBSITE_BASE_URL
SQL_DATABASE_URL=$SQL_DATABASE_URL
STORAGE_ENDPOINT=$STORAGE_ENDPOINT
STORAGE_PUBLIC_ENDPOINT=$STORAGE_PUBLIC_ENDPOINT
STORAGE_BUCKET_NAME=$STORAGE_BUCKET_NAME
STORAGE_ACCESS_KEY=$STORAGE_ACCESS_KEY
STORAGE_SECRET_KEY=$STORAGE_SECRET_KEY
EMAIL_ENDPOINT=$EMAIL_ENDPOINT
EMAIL_USER=$EMAIL_USER
EMAIL_PASSWORD=$EMAIL_PASSWORD
MOLLIE_API_KEY=$MOLLIE_API_KEY
EOF

cat > /workspace/packages/tools/.env <<EOF
NODE_ENV=$NODE_ENV
SQL_DATABASE_URL=$SQL_DATABASE_URL
EOF

# Run setup tasks
bash "$SCRIPT_DIR/migrate.sh"
bash "$SCRIPT_DIR/seed.sh"

# Start the API server (exec replaces shell process)
exec bash "$SCRIPT_DIR/start.sh"
