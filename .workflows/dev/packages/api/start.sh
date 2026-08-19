#!/bin/bash
# ==============================================================================
# Start API Server
# ==============================================================================
# 1. Runs a one-off schema drift check (plain tsx, no watch).
#    If the DB is out of sync with the Drizzle models the script exits non-zero,
#    the container stops, and `docker compose up --wait` surfaces the error.
# 2. Starts the API dev server with hot reload (tsx watch).
#    tsx is started with --conditions source so that @comptasse/application-metadata
#    resolves to ./src/index.ts directly - no build step needed in dev.
# ==============================================================================
set -e

echo "Checking database schema..."
SCHEMA_CHECK_ONLY=1 pnpm --filter="@comptasse/application-api" exec tsx --conditions source ./src/server.ts

echo "Starting API dev server..."
exec pnpm --filter="@comptasse/application-api" dev
