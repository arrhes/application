set shell := ["bash", "-cu"]
COMPOSE_FILE := ".workflows/dev/compose.yml"
TUNNEL_FILE := ".workflows/dev/compose.tunnel.yml"
PROJECT := "application"
DC := "docker compose --project-directory=.workflows/dev --file=" + COMPOSE_FILE + " --project-name=" + PROJECT
DC_TUNNEL := DC + " --file=" + TUNNEL_FILE

dev cmd:
    @just dev-{{cmd}}

dev-up:
    @bash .workflows/dev/up.sh

# Start dev environment with a Cloudflare tunnel for Mollie webhook testing.
# The tunnel exposes the API on a public *.trycloudflare.com URL and
# automatically sets API_BASE_URL inside the API container.
#
# How it works:
#   1. Start only the tunnel service (no dependencies, connects when API is up)
#   2. Wait for cloudflared to print the *.trycloudflare.com URL
#   3. Start all remaining services with the tunnel URL as API_BASE_URL
dev-tunnel:
    @bash .workflows/dev/tunnel.sh '{{DC_TUNNEL}}' '{{COMPOSE_FILE}}'

dev-down:
    {{DC}} down --remove-orphans

dev-tunnel-down:
    {{DC_TUNNEL}} down --remove-orphans

# ==============================================================================
# Database (requires dev environment running)
# ==============================================================================

db cmd:
    @just db-{{cmd}}

# Push schema to database (idempotent, no data loss)
db-push:
    @echo "Pushing schema to database..."
    {{DC}} exec api sh -c "cd /workspace/packages/tools && pnpm run push"
    @echo "Schema push complete."

# Seed database with demo data (skips if data already exists)
db-seed:
    @echo "Seeding database..."
    {{DC}} exec api sh -c "cd /workspace/packages/tools && pnpm run seed"
    @echo "Seeding complete."

# Reset database (clear all tables, push schema, seed)
db-reset:
    @echo "Resetting database (clear + push + seed)..."
    {{DC}} exec api sh -c "cd /workspace/packages/tools && pnpm run reset"
    @echo "Database reset complete."

# ==============================================================================
# Build Pipeline
# ==============================================================================
# Uses the same compose file as CI (single source of truth):
#   1. ci service: pnpm install, Biome check, unit tests, build
#   2. api/website/worker services: production Docker images
#
# Usage:
#   just build ci      - Run CI gate only (lint + typecheck + tests + build)
#   just build images  - CI gate + build api/website/worker images (same as publish GH Action)
#   just build start   - Start built images against local infra to check for startup errors

COMPOSE_BUILD := "docker compose -f .workflows/build/compose.yml"
COMPOSE_START := "docker compose -f .workflows/build/compose.start.yml --project-name comptasse-prod"

build cmd:
    @just build-{{cmd}}

# Stamp packages/cli/comptasse.sh and packages/cli/version from the VERSION file
build-cli:
    @VER=$(cat VERSION | tr -d 'v[:space:]') && \
    sed -i "s/^VERSION=\".*\"/VERSION=\"$VER\"/" packages/cli/comptasse.sh && \
    printf '%s\n' "$VER" > packages/cli/version && \
    echo "CLI stamped: $VER"

# Build all-in-one Docker image (api + dashboard + cli)
build-all-in-one:
    @echo "=============================================="
    @echo "  Comptasse All-in-One Image Build"
    @echo "=============================================="
    @echo ""
    COMPATSSE_VERSION=$(cat VERSION) {{COMPOSE_BUILD}} build --progress=plain --no-cache comptasse
    @echo ""
    @echo "=============================================="
    @echo "  Image built: comptasse/comptasse ($(cat VERSION))"
    @echo "=============================================="

# Run CI gate: lint + typecheck + unit tests + build
build-ci:
    @echo "=============================================="
    @echo "  Comptasse Build (lint + test + build)"
    @echo "=============================================="
    @echo ""
    {{COMPOSE_BUILD}} build --progress=plain --no-cache ci
    @echo ""
    @echo "=============================================="
    @echo "  Build succeeded"
    @echo "=============================================="

# Build production images (api, website, worker) - mirrors the publish GitHub Action
# Runs the CI gate first, then builds all three images tagged with VERSION
build-images:
    @echo "=============================================="
    @echo "  Comptasse Image Build (ci + api + website + worker)"
    @echo "=============================================="
    @echo ""
    {{COMPOSE_BUILD}} build --progress=plain --no-cache ci
    COMPATSSE_VERSION=$(cat VERSION) \
    VITE_API_BASE_URL=http://localhost:3000 \
    VITE_WEBSITE_BASE_URL=http://localhost:5173 \
    {{COMPOSE_BUILD}} build --progress=plain api website worker
    @echo ""
    @echo "=============================================="
    @echo "  Images built: comptasse-api, comptasse-website, comptasse-worker ($(cat VERSION))"
    @echo "=============================================="

# Start production images against local infrastructure to check for startup errors
# Requires images to be built first: just build images
# Stops the dev environment first to free ports, then starts production images
build-start:
    @echo "=============================================="
    @echo "  Starting production images (version: $(cat VERSION))"
    @echo "  Press Ctrl+C to stop"
    @echo "=============================================="
    @echo ""
    -{{DC}} down --remove-orphans 2>/dev/null || true
    -COMPATSSE_VERSION=$(cat VERSION) {{COMPOSE_START}} down --remove-orphans 2>/dev/null || true
    COMPATSSE_VERSION=$(cat VERSION) {{COMPOSE_START}} up --force-recreate --remove-orphans

# ==============================================================================
# Tests (requires dev environment running)
# ==============================================================================

# Run all unit tests
test-unit:
    {{DC}} exec api sh -c "pnpm --recursive --if-present --filter='./packages/**' run test:unit"

# Run all integration tests
test-integration:
    {{DC}} exec api sh -c "pnpm --filter='@comptasse/application-api' run test:integration"

# Run all Playwright E2E tests
test-e2e:
    {{DC}} exec api sh -c "pnpm run test:e2e"

# Run all tests: unit + integration + E2E
test:
    {{DC}} exec api sh -c "pnpm --recursive --if-present --filter='./packages/**' run test && pnpm run test:e2e"
