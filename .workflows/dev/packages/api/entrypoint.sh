#!/bin/bash
# ==============================================================================
# API Service Entrypoint
# ==============================================================================
# Runs on container startup to initialize and start the API service.
# Environment variables are set directly by Docker Compose.
#
# Database setup (push/seed) is NOT run automatically on startup.
# Use `just dev up` instead.
# ==============================================================================
set -e

SCRIPT_DIR="/workspace/.workflows/dev/packages/api"

# Start the API server (exec replaces shell process)
exec bash "$SCRIPT_DIR/start.sh"
