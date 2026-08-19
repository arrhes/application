#!/bin/sh
#
# Comptasse all-in-one installer (dashboard + API + CLI)
#
# Usage:
#   curl -fsSL https://comptasse.com/install.sh | sh        # production (GHCR image)
#   curl -fsSL http://localhost:5173/install.sh | sh        # local dev (built from source)
#
# Behaviour:
#   1. Verifies Docker is installed and running.
#   2. Asks whether you already have PostgreSQL + S3, or want the integrated services.
#   3. Integrated: configures PostgreSQL and RustFS automatically.
#      External:   uses the provided connection credentials.
#   4. Generates a COOKIES_KEY session-signing key if none is provided.
#   5. Creates the data/config directory in ~/.comptasse.
#   6. Builds or pulls the Comptasse all-in-one image and starts the stack.
#
# Configuration (environment variables):
#   Image source (automatic, based on the origin the installer is served from):
#       comptasse.com  -> pull the published image from GHCR (production)
#       any other      -> build the image from a local repository checkout (local development)
#   COMPTASSE_SOURCE_ORIGIN                        default: https://comptasse.com
#       Origin the installer was fetched from; injected automatically by the
#       local dev server, and overridable for testing.
#   COMPTASSE_SERVICES=integrated|external        default: integrated
#   COMPTASSE_DATA_DIR                            default: ~/.comptasse
#   COMPTASSE_IMAGE                               full image reference (overrides the source logic)
#   COMPTASSE_REPO_DIR                            local development: path to the repository checkout
#                                                 (optional; otherwise auto-detected from the working directory)
#   COMPTASSE_VERSION                             image tag (default: latest for registry, dev for local build)
#   COMPTASSE_API_PORT / COMPTASSE_DASHBOARD_PORT default: 3000 / 5173
#   COMPTASSE_COOKIES_KEY                         optional; generated if absent
#   External services only:
#       COMPTASSE_SQL_DATABASE_URL, COMPTASSE_STORAGE_ENDPOINT,
#       COMPTASSE_STORAGE_BUCKET_NAME, COMPTASSE_STORAGE_ACCESS_KEY,
#       COMPTASSE_STORAGE_SECRET_KEY, COMPTASSE_STORAGE_REGION
#
set -eu

# ------------------------------------------------------------------------------
# Prerequisites
# ------------------------------------------------------------------------------
command -v docker >/dev/null 2>&1 || { echo "Error: Docker is required." >&2; exit 1; }
docker info >/dev/null 2>&1 || { echo "Error: Docker is not running. Start Docker and retry." >&2; exit 1; }

# ------------------------------------------------------------------------------
# Configuration
# ------------------------------------------------------------------------------
DATA_DIR="${COMPTASSE_DATA_DIR:-$HOME/.comptasse}"
COMPOSE_FILE="${DATA_DIR}/compose.yml"
ENV_FILE="${DATA_DIR}/.env"
API_PORT="${COMPTASSE_API_PORT:-3000}"
DASHBOARD_PORT="${COMPTASSE_DASHBOARD_PORT:-5173}"
SERVICES="${COMPTASSE_SERVICES:-integrated}"
SOURCE_ORIGIN="${COMPTASSE_SOURCE_ORIGIN:-https://comptasse.com}"

INTERACTIVE=false
[ -t 0 ] && INTERACTIVE=true

echo "Installing Comptasse (dashboard + API + CLI)"
echo ""

# ------------------------------------------------------------------------------
# Image source: comptasse.com -> production (GHCR); any other origin -> local build
# ------------------------------------------------------------------------------
_find_repo_root() {
    if [ -n "${COMPTASSE_REPO_DIR:-}" ]; then
        if [ -f "$COMPTASSE_REPO_DIR/.workflows/build/compose.yml" ] && [ -f "$COMPTASSE_REPO_DIR/VERSION" ]; then
            printf '%s\n' "$COMPTASSE_REPO_DIR"
            return 0
        fi
        echo "Warning: COMPTASSE_REPO_DIR is not a Comptasse checkout, ignoring it." >&2
    fi
    _dir=$PWD
    while [ "$_dir" != "/" ]; do
        if [ -f "$_dir/.workflows/build/compose.yml" ] && [ -f "$_dir/VERSION" ]; then
            printf '%s\n' "$_dir"
            return 0
        fi
        _dir=$(dirname "$_dir")
    done
    return 1
}

case "$SOURCE_ORIGIN" in
    *://comptasse.com | *://*.comptasse.com) IMAGE_SOURCE="registry" ;;
    *) IMAGE_SOURCE="local" ;;
esac

IMAGE="${COMPTASSE_IMAGE:-}"
if [ -z "$IMAGE" ]; then
    if [ "$IMAGE_SOURCE" = "local" ]; then
        echo "[1/4] Preparing the local Comptasse image (no registry)..."
        REPO_ROOT=$(_find_repo_root) || true
        if [ -n "$REPO_ROOT" ]; then
            (
                cd "$REPO_ROOT" &&
                # Supply placeholder values: .workflows/build/compose.yml interpolates
                # these eagerly (they're runtime config), but the image BUILD does not
                # need them. Real values come from the generated runtime compose.yml.
                SQL_DATABASE_URL=postgres://placeholder:placeholder@postgres:5432/comptasse \
                STORAGE_ENDPOINT=http://rustfs:9000 \
                STORAGE_BUCKET_NAME=placeholder \
                STORAGE_ACCESS_KEY=placeholder \
                STORAGE_SECRET_KEY=placeholder \
                COMPTASSE_VERSION="${COMPTASSE_VERSION:-dev}" \
                docker compose -f .workflows/build/compose.yml build comptasse
            )
            IMAGE="comptasse/comptasse:${COMPTASSE_VERSION:-dev}"
        elif docker image inspect comptasse/comptasse:dev >/dev/null 2>&1; then
            IMAGE="comptasse/comptasse:dev"
            echo "Using the already-built local image $IMAGE."
        else
            echo "Error: local build requires the Comptasse repository checkout." >&2
            echo "Run the installer from the repository (or any of its subdirectories), or pass the checkout path:" >&2
            echo "  curl -fsSL $SOURCE_ORIGIN/install.sh | COMPTASSE_REPO_DIR=/path/to/comptasse sh" >&2
            exit 1
        fi
    else
        echo "[1/4] Preparing to pull ghcr.io/comptasse/application/comptasse..."
        IMAGE="ghcr.io/comptasse/application/comptasse:${COMPTASSE_VERSION:-latest}"
    fi
fi

# ------------------------------------------------------------------------------
# Services choice
# ------------------------------------------------------------------------------
if [ "$INTERACTIVE" = "true" ] && [ -z "${COMPTASSE_SERVICES:-}" ]; then
    printf 'Do you already have PostgreSQL and S3 storage? [y/N] '
    read -r answer
    case "$answer" in
        y | Y | yes | oui) SERVICES="external" ;;
        *) SERVICES="integrated" ;;
    esac
fi

# ------------------------------------------------------------------------------
# COOKIES_KEY (session signing key)
# ------------------------------------------------------------------------------
COOKIES_KEY="${COMPTASSE_COOKIES_KEY:-}"
if [ -z "$COOKIES_KEY" ] && [ -f "$ENV_FILE" ]; then
    COOKIES_KEY=$(sed -n 's/^COOKIES_KEY=//p' "$ENV_FILE" | tail -n 1)
fi
if [ -z "$COOKIES_KEY" ]; then
    COOKIES_KEY=$(head -c 32 /dev/urandom | base64 | tr -d '/+=' | head -c 32)
fi

mkdir -p "$DATA_DIR"

# ------------------------------------------------------------------------------
# Generate compose.yml + .env
# ------------------------------------------------------------------------------
if [ "$SERVICES" = "integrated" ]; then
    echo "[2/4] Configuring integrated services (PostgreSQL + RustFS)..."
    cat > "$ENV_FILE" <<EOF
COMPTASSE_IMAGE=$IMAGE
COMPTASSE_API_PORT=$API_PORT
COMPTASSE_DASHBOARD_PORT=$DASHBOARD_PORT
COMPTASSE_DATA_MOUNT=$DATA_DIR/data
COOKIES_KEY=$COOKIES_KEY
EOF

    cat > "$COMPOSE_FILE" <<'EOF'
services:
  comptasse:
    image: ${COMPTASSE_IMAGE}
    container_name: comptasse
    ports:
      - "${COMPTASSE_API_PORT}:3000"
      - "${COMPTASSE_DASHBOARD_PORT}:5173"
    volumes:
      - ${COMPTASSE_DATA_MOUNT}:/data
    environment:
      SQL_DATABASE_URL: postgres://postgres:password@postgres:5432/comptasse
      STORAGE_ENDPOINT: http://rustfs:9000
      STORAGE_BUCKET_NAME: comptasse-files
      STORAGE_ACCESS_KEY: admin
      STORAGE_SECRET_KEY: admin
      STORAGE_REGION: fr-par
      COOKIES_DOMAIN: localhost
      CORS_ORIGIN: "*"
      API_BASE_URL: http://localhost:3000
      WEBSITE_BASE_URL: http://localhost:5173
      DASHBOARD_BASE_URL: http://localhost:5173
      COOKIES_KEY: ${COOKIES_KEY:?COOKIES_KEY is required}
    depends_on:
      postgres:
        condition: service_healthy
      rustfs:
        condition: service_started
    healthcheck:
      test: ["CMD-SHELL", "curl -f http://127.0.0.1:3000/ || curl -f http://localhost:5173/"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 60s
    restart: unless-stopped

  postgres:
    image: postgres:18.1
    volumes:
      - postgres-data:/var/lib/postgresql
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: comptasse
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d comptasse"]
      interval: 5s
      timeout: 5s
      retries: 5
    restart: unless-stopped

  rustfs:
    image: rustfs/rustfs:latest
    volumes:
      - rustfs-data:/data
    environment:
      RUSTFS_CONSOLE_ENABLE: "false"
      RUSTFS_ACCESS_KEY: admin
      RUSTFS_SECRET_KEY: admin
      RUSTFS_VOLUMES: /data
    restart: unless-stopped

volumes:
  postgres-data:
  rustfs-data:
EOF
else
    echo "[2/4] Configuring external services (your PostgreSQL + S3)..."

    SQL_DATABASE_URL="${COMPTASSE_SQL_DATABASE_URL:-}"
    STORAGE_ENDPOINT="${COMPTASSE_STORAGE_ENDPOINT:-}"
    STORAGE_BUCKET_NAME="${COMPTASSE_STORAGE_BUCKET_NAME:-}"
    STORAGE_ACCESS_KEY="${COMPTASSE_STORAGE_ACCESS_KEY:-}"
    STORAGE_SECRET_KEY="${COMPTASSE_STORAGE_SECRET_KEY:-}"

    prompt_or_fail() {
        _var=$1
        _label=$2
        eval "_value=\${$_var:-}"
        if [ -z "$_value" ]; then
            if [ "$INTERACTIVE" = "true" ]; then
                printf '%s: ' "$_label"
                read -r _value
                eval "$_var=\$_value"
            else
                echo "Error: $_label is required." >&2
                echo "Set the corresponding COMPTASSE_* environment variable (e.g. COMPTASSE_SQL_DATABASE_URL) or run the installer interactively." >&2
                exit 1
            fi
        fi
    }

    prompt_or_fail SQL_DATABASE_URL "PostgreSQL connection URL (postgres://user:password@host:5432/db)"
    prompt_or_fail STORAGE_ENDPOINT "S3 endpoint URL (https://...)"
    prompt_or_fail STORAGE_BUCKET_NAME "S3 bucket name"
    prompt_or_fail STORAGE_ACCESS_KEY "S3 access key"
    prompt_or_fail STORAGE_SECRET_KEY "S3 secret key"
    STORAGE_REGION="${COMPTASSE_STORAGE_REGION:-fr-par}"

    cat > "$ENV_FILE" <<EOF
COMPTASSE_IMAGE=$IMAGE
COMPTASSE_API_PORT=$API_PORT
COMPTASSE_DASHBOARD_PORT=$DASHBOARD_PORT
COMPTASSE_DATA_MOUNT=$DATA_DIR/data
COOKIES_KEY=$COOKIES_KEY
SQL_DATABASE_URL=$SQL_DATABASE_URL
STORAGE_ENDPOINT=$STORAGE_ENDPOINT
STORAGE_BUCKET_NAME=$STORAGE_BUCKET_NAME
STORAGE_ACCESS_KEY=$STORAGE_ACCESS_KEY
STORAGE_SECRET_KEY=$STORAGE_SECRET_KEY
STORAGE_REGION=$STORAGE_REGION
EOF

    cat > "$COMPOSE_FILE" <<'EOF'
services:
  comptasse:
    image: ${COMPTASSE_IMAGE}
    container_name: comptasse
    ports:
      - "${COMPTASSE_API_PORT}:3000"
      - "${COMPTASSE_DASHBOARD_PORT}:5173"
    volumes:
      - ${COMPTASSE_DATA_MOUNT}:/data
    environment:
      SQL_DATABASE_URL: ${SQL_DATABASE_URL:?required}
      STORAGE_ENDPOINT: ${STORAGE_ENDPOINT:?required}
      STORAGE_BUCKET_NAME: ${STORAGE_BUCKET_NAME:?required}
      STORAGE_ACCESS_KEY: ${STORAGE_ACCESS_KEY:?required}
      STORAGE_SECRET_KEY: ${STORAGE_SECRET_KEY:?required}
      STORAGE_REGION: ${STORAGE_REGION:-fr-par}
      COOKIES_KEY: ${COOKIES_KEY:?required}
    restart: unless-stopped

volumes:
  comptasse-data:
EOF
fi

# ------------------------------------------------------------------------------
# Start
# ------------------------------------------------------------------------------
echo "[3/4] Starting Comptasse (image: $IMAGE)..."
docker compose --project-name comptasse --env-file "$ENV_FILE" -f "$COMPOSE_FILE" up -d

echo "[4/4] "
echo ""
echo "Installation complete"
echo ""
echo "  Dashboard: http://localhost:$DASHBOARD_PORT"
echo "  API:       http://localhost:$API_PORT"
echo "  CLI:       docker exec comptasse comptasse --help"
echo ""
echo "  Config:    $DATA_DIR"
echo "  Services:  docker compose --project-name comptasse -f $COMPOSE_FILE ps"
echo "  Logs:      docker compose --project-name comptasse -f $COMPOSE_FILE logs -f comptasse"
echo ""
echo "Next steps: open the Dashboard, create your account and your first organization."