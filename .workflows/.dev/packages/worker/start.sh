#!/bin/bash
# ==============================================================================
# Start Worker
# ==============================================================================
# Starts the worker development process with hot reload via tsx.
# tsx transpiles TypeScript directly — no tsc build step needed for dev.
# ==============================================================================
set -e

echo "Starting worker..."
exec pnpm --filter="@evidensy/worker" dev
