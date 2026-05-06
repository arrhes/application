#!/usr/bin/env bash
# ==============================================================================
# dev-up helper — called by `just dev up`
# Selects free host ports (persisting choices across runs) and starts all
# Docker Compose services with the resolved port bindings.
# ==============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
COMPOSE_FILE="$SCRIPT_DIR/compose.yml"
PORTS_FILE="$SCRIPT_DIR/.ports"

DC=(docker compose --project-directory="$SCRIPT_DIR" --file="$COMPOSE_FILE" --project-name=application)

# Stop any existing project containers first so their ports are freed before
# we check availability. This ensures saved ports are reusable on re-runs.
"${DC[@]}" down --remove-orphans 2>/dev/null || true

# Load previously persisted ports.
declare -A saved
if [[ -f "$PORTS_FILE" ]]; then
    while IFS='=' read -r key val; do
        [[ -n "$key" ]] && saved["$key"]="$val"
    done < "$PORTS_FILE"
fi

_random_port() {
    python3 -c "import socket; s=socket.socket(); s.bind(('',0)); p=s.getsockname()[1]; s.close(); print(p)"
}

# Use saved port if free, else a random OS port.
_free_port() {
    local key=$1
    local candidate="${saved[$key]:-}"
    if [[ -n "$candidate" ]] && ! ss -tln "sport = :$candidate" 2>/dev/null | grep -q LISTEN; then
        echo "$candidate"
    else
        _random_port
    fi
}

smtp_port=$(_free_port MAILPIT_SMTP_PORT)
ui_port=$(_free_port MAILPIT_UI_PORT)
redis_port=$(_free_port REDIS_HOST_PORT)
postgres_port=$(_free_port POSTGRES_HOST_PORT)
rustfs_api_port=$(_free_port RUSTFS_API_PORT)
rustfs_ui_port=$(_free_port RUSTFS_UI_PORT)
api_port=$(_free_port API_HOST_PORT)
website_port=$(_free_port WEBSITE_HOST_PORT)

# Persist chosen ports for the next run.
cat > "$PORTS_FILE" <<EOF
MAILPIT_SMTP_PORT=$smtp_port
MAILPIT_UI_PORT=$ui_port
REDIS_HOST_PORT=$redis_port
POSTGRES_HOST_PORT=$postgres_port
RUSTFS_API_PORT=$rustfs_api_port
RUSTFS_UI_PORT=$rustfs_ui_port
API_HOST_PORT=$api_port
WEBSITE_HOST_PORT=$website_port
EOF

MAILPIT_SMTP_PORT=$smtp_port \
MAILPIT_UI_PORT=$ui_port \
REDIS_HOST_PORT=$redis_port \
POSTGRES_HOST_PORT=$postgres_port \
RUSTFS_API_PORT=$rustfs_api_port \
RUSTFS_UI_PORT=$rustfs_ui_port \
API_HOST_PORT=$api_port \
WEBSITE_HOST_PORT=$website_port \
    "${DC[@]}" up --detach --build --force-recreate

echo ""
echo "=============================================="
echo "  Arrhes Development Environment Started"
echo "=============================================="
echo ""
echo "  Services:"
echo "    Website:  http://localhost:$website_port"
echo "    API:      http://localhost:$api_port"
echo ""
echo "  Infrastructure:"
echo "    PostgreSQL: localhost:$postgres_port"
echo "    Mailpit:    http://localhost:$ui_port"
echo "    RustFS:     http://localhost:$rustfs_ui_port"
echo "    Redis:      localhost:$redis_port"
echo ""
echo "  Demo Credentials:"
echo "    Email:      demo@arrhes.com"
echo "    Password:   demo"
echo ""
echo "  Admin Credentials:"
echo "    Email:      admin@arrhes.com"
echo "    Password:   admin"
echo ""
echo "  Logs: docker compose -f $COMPOSE_FILE logs -f"
echo "=============================================="
