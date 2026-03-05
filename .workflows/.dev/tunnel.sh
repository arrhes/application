#!/bin/bash
# ==============================================================================
# Tunnel Startup Script
# ==============================================================================
# Starts a Cloudflare quick tunnel, captures the public URL, then starts
# all dev services with API_BASE_URL set to the tunnel URL.
#
# Usage: called by `just dev tunnel`
# ==============================================================================
set -euo pipefail

DC_TUNNEL="$1"
COMPOSE_FILE="$2"

echo "Starting tunnel..."
$DC_TUNNEL up -d tunnel

echo "Waiting for tunnel URL..."
TUNNEL_URL=""
for i in $(seq 1 30); do
    TUNNEL_URL=$(
        docker logs arrhes-tunnel 2>&1 \
        | grep -oP 'https://[a-z0-9-]+\.trycloudflare\.com' \
        | head -1 \
        || true
    )
    if [ -n "$TUNNEL_URL" ]; then break; fi
    sleep 2
done

if [ -z "$TUNNEL_URL" ]; then
    echo "ERROR: Could not detect tunnel URL after 60 s."
    echo "Check logs:  docker logs arrhes-tunnel"
    exit 1
fi

echo "Tunnel URL: $TUNNEL_URL"
echo "Starting services..."

export API_BASE_URL="$TUNNEL_URL"
$DC_TUNNEL up -d --build

echo ""
echo "=============================================="
echo "  Arrhes Development Environment Started"
echo "=============================================="
echo ""
echo "  Services:"
echo "    Dashboard:  http://localhost:5173"
echo "    API:        http://localhost:3000"
echo "    Tunnel:     $TUNNEL_URL"
echo ""
echo "  Infrastructure:"
echo "    PostgreSQL: localhost:5432"
echo "    Mailpit:    http://localhost:8025"
echo "    RustFS:     http://localhost:9001"
echo ""
echo "  Demo Credentials:"
echo "    Email:      demo@arrhes.com"
echo "    Password:   demo"
echo ""
echo "  Mollie webhook URL:"
echo "    $TUNNEL_URL/public/mollie-webhook"
echo ""
echo "  Logs: docker compose -f $COMPOSE_FILE logs -f"
echo "=============================================="
