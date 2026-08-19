#!/bin/sh
set -e

cd /app

echo "[api] Running database migrations..."
node build/migrate.js

echo "[api] Starting server on port ${PORT:-3000}..."
exec node build/server.js