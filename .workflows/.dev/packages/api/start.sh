#!/bin/bash
# ==============================================================================
# Start API Server
# ==============================================================================
# Starts the API development server with hot reload.
# Builds workspace dependencies first (tsc --build follows project references).
# ==============================================================================
set -e

echo "Building workspace dependencies..."
cd /workspace/packages/api
pnpm run build

echo "Starting API dev server..."
exec pnpm --filter="@arrhes/application-api" dev
