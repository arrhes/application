#!/bin/bash
# ==============================================================================
# Worker Service Entrypoint
# ==============================================================================
# Runs on container startup to generate .env and start the worker.
# ==============================================================================
set -e

SCRIPT_DIR="/workspace/.workflows/dev/packages/worker"

# Generate .env file from environment variables set in compose.yml
cat > /workspace/packages/worker/.env <<EOF
ENV=$ENV
VERBOSE=$VERBOSE
SQL_DATABASE_URL=$SQL_DATABASE_URL
QDRANT_URL=$QDRANT_URL
QDRANT_API_KEY=$QDRANT_API_KEY
AI_HF_API_KEY=$AI_HF_API_KEY
AI_OPENAI_API_KEY=$AI_OPENAI_API_KEY
AI_GOOGLE_CREDENTIALS_BASE64=$AI_GOOGLE_CREDENTIALS_BASE64
STORAGE_ENDPOINT=$STORAGE_ENDPOINT
STORAGE_NAME=$STORAGE_NAME
STORAGE_ACCESS_KEY=$STORAGE_ACCESS_KEY
STORAGE_SECRET_KEY=$STORAGE_SECRET_KEY
REDIS_HOST=$REDIS_HOST
REDIS_PORT=$REDIS_PORT
REDIS_USERNAME=$REDIS_USERNAME
REDIS_PASSWORD=$REDIS_PASSWORD
LLM_PROVIDER=$LLM_PROVIDER
LLM_BASE_URL=$LLM_BASE_URL
LLM_MODEL=$LLM_MODEL
LLM_API_KEY=$LLM_API_KEY
EOF

# Start the worker (exec replaces shell process)
exec bash "$SCRIPT_DIR/start.sh"
