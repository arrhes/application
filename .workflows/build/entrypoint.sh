#!/bin/bash
set -e

# ==============================================================================
# Comptasse All-in-One Entrypoint
# ==============================================================================
# Handles:
# 1. Auto-generating COOKIES_KEY if not provided
# 2. Schema management (auto-push if no tables, check if tables exist)
# 3. Starting all services via supervisord
# ==============================================================================

DATA_DIR="/data"
CONFIG_FILE="$DATA_DIR/config.json"

# ------------------------------------------------------------------------------
# 1. COOKIES_KEY management
# ------------------------------------------------------------------------------
if [ -z "$COOKIES_KEY" ]; then
    if [ -f "$CONFIG_FILE" ] && grep -q "COOKIES_KEY" "$CONFIG_FILE" 2>/dev/null; then
        # Extract COOKIES_KEY from existing config
        COOKIES_KEY=$(cat "$CONFIG_FILE" | grep COOKIES_KEY | sed 's/.*"COOKIES_KEY":\s*"\([^"]*\)".*/\1/')
        echo "[entrypoint] Loaded COOKIES_KEY from $CONFIG_FILE"
    else
        # Generate a new random key
        COOKIES_KEY=$(head -c 32 /dev/urandom | base64 | tr -d '/+=' | head -c 32)
        echo "[entrypoint] Generated new COOKIES_KEY"

        # Write config file
        mkdir -p "$DATA_DIR"
        echo "{\"COOKIES_KEY\":\"$COOKIES_KEY\"}" > "$CONFIG_FILE"
        chmod 600 "$CONFIG_FILE"
    fi
    export COOKIES_KEY
else
    echo "[entrypoint] Using provided COOKIES_KEY"
    # Save provided key to config if not already there
    if [ ! -f "$CONFIG_FILE" ] || ! grep -q "COOKIES_KEY" "$CONFIG_FILE" 2>/dev/null; then
        mkdir -p "$DATA_DIR"
        echo "{\"COOKIES_KEY\":\"$COOKIES_KEY\"}" > "$CONFIG_FILE"
        chmod 600 "$CONFIG_FILE"
    fi
fi

# ------------------------------------------------------------------------------
# 2. Schema management
# ------------------------------------------------------------------------------
echo "[entrypoint] Checking database schema..."

# Count tables in public schema
TABLE_COUNT=$(psql "$SQL_DATABASE_URL" -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='public'" 2>/dev/null | tr -d '[:space:]')

if [ "$TABLE_COUNT" = "0" ] || [ -z "$TABLE_COUNT" ]; then
    echo "[entrypoint] No tables found. Pushing schema..."
    cd /app/tools
    pnpm run push
    echo "[entrypoint] Schema pushed successfully."
else
    echo "[entrypoint] Found $TABLE_COUNT tables. Verifying schema..."
    cd /app/tools
    ENV="production" VERBOSE="false" PORT="3000" SCHEMA_CHECK_ONLY=1 \
        node /app/api/build/server.js
    CHECK_EXIT=$?

    if [ $CHECK_EXIT -ne 0 ]; then
        echo ""
        echo "[entrypoint] ERROR: Database schema is out of sync."
        echo ""
        echo "To fix this, you have several options:"
        echo ""
        echo "  1. Push schema (safe, no data loss):"
        echo "     docker exec comptasse pnpm --filter @comptasse/application-tools run push"
        echo ""
        echo "  2. Reset database (DELETES ALL DATA):"
        echo "     docker exec comptasse pnpm --filter @comptasse/application-tools run reset"
        echo ""
        echo "  3. Refer to migration documentation:"
        echo "     https://comptasse.com/documentation/guide/migrations"
        echo ""
        exit 1
    fi
    echo "[entrypoint] Schema check passed."
fi

# ------------------------------------------------------------------------------
# 3. Install CLI in container
# ------------------------------------------------------------------------------
if [ -f /app/cli/comptasse.sh ]; then
    mkdir -p /usr/local/bin
    cp /app/cli/comptasse.sh /usr/local/bin/comptasse
    chmod +x /usr/local/bin/comptasse
    echo "[entrypoint] CLI installed at /usr/local/bin/comptasse"
fi

# ------------------------------------------------------------------------------
# 4. Start services
# ------------------------------------------------------------------------------
echo "[entrypoint] Starting services..."
exec supervisord -c /etc/supervisord.conf
