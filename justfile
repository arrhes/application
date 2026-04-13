set shell := ["bash", "-cu"]
COMPOSE_FILE := ".workflows/dev/compose.yml"
TUNNEL_FILE := ".workflows/dev/compose.tunnel.yml"
PROJECT := "application"
DC := "docker compose --project-directory=.workflows/dev --file=" + COMPOSE_FILE + " --project-name=" + PROJECT
DC_TUNNEL := DC + " --file=" + TUNNEL_FILE

dev cmd:
    @just dev-{{cmd}}

dev-up:
    {{DC}} up -d --build --force-recreate
    @echo ""
    @echo "=============================================="
    @echo "  Arrhes Development Environment Started"
    @echo "=============================================="
    @echo ""
    @echo "  Services:"
    @echo "    Website:  http://localhost:5173"
    @echo "    Admin:    http://localhost:5174"
    @echo "    API:      http://localhost:3000"
    @echo ""
    @echo "  Infrastructure:"
    @echo "    PostgreSQL: localhost:5432"
    @echo "    Mailpit:    http://localhost:8025"
    @echo "    RustFS:     http://localhost:9001"
    @echo ""
    @echo "  Demo Credentials:"
    @echo "    Email:      demo@arrhes.com"
    @echo "    Password:   demo"
    @echo ""
    @echo "  Admin Credentials:"
    @echo "    Email:      admin@arrhes.com"
    @echo "    Password:   admin"
    @echo ""
    @echo "  Logs: docker compose -f {{COMPOSE_FILE}} logs -f"
    @echo "=============================================="

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
#   2. api/website services: production Docker images
#
# Usage:
#   just build        - Run CI checks only
#   just build-all    - Run CI checks + build production images

COMPOSE_BUILD := "docker compose -f .workflows/build/compose.yml"

build:
    @echo "=============================================="
    @echo "  Arrhes Build (lint + test + build)"
    @echo "=============================================="
    @echo ""
    {{COMPOSE_BUILD}} build --progress=plain --no-cache ci
    @echo ""
    @echo "=============================================="
    @echo "  Build succeeded"
    @echo "=============================================="

build-all:
    @echo "=============================================="
    @echo "  Arrhes Full Build (ci + images)"
    @echo "=============================================="
    @echo ""
    {{COMPOSE_BUILD}} build --progress=plain --no-cache ci
    ARRHES_VERSION=$(cat VERSION) {{COMPOSE_BUILD}} build --progress=plain --no-cache api website admin
    @echo ""
    @echo "=============================================="
    @echo "  Build succeeded"
    @echo "=============================================="

# ==============================================================================
# Tests (requires dev environment running)
# ==============================================================================

# Run all unit tests
test-unit:
    {{DC}} exec api sh -c "pnpm --recursive --if-present --filter='./packages/**' run test:unit"

# Run all integration tests
test-integration:
    {{DC}} exec api sh -c "pnpm --filter='@arrhes/application-api' run test:integration"

# Run all Playwright E2E tests
test-e2e:
    {{DC}} exec api sh -c "pnpm run test:e2e"

# Run all tests: unit + integration + E2E
test:
    {{DC}} exec api sh -c "pnpm --recursive --if-present --filter='./packages/**' run test && pnpm run test:e2e"
