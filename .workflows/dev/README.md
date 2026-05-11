# Development Environment

Docker-based development environment for the Arrhes application.

## Architecture

```
.workflows/dev/
├── compose.yml              # Docker Compose config (services + env vars)
├── compose.tunnel.yml       # Cloudflare tunnel overlay
├── up.sh                    # Dev startup script (port allocation + compose up)
├── tunnel.sh                # Tunnel startup script
├── .dockerignore            # Build context exclusions
└── packages/
    ├── api/
    │   ├── Dockerfile       # API service image
    │   ├── entrypoint.sh    # API startup script (generates .env files)
    │   ├── migrate.sh       # Database migration script
    │   ├── seed.sh          # Database seed script
    │   └── start.sh         # API start script
    └── website/
        └── Dockerfile       # Website service image
```

## Key Concepts

### Full Workspace Volume Mount
- The **entire workspace** (including `node_modules`) is bind-mounted from host
- Dependencies must be installed on the host (`pnpm install`) before starting
- Changes on either host or container are instantly synced
- No separate dependency installation inside containers

### Networking
- The API and Worker containers use `network_mode: host`, sharing the host
  network stack directly.
- All services are reached via `localhost:<PORT>` — the same address works
  inside containers, in the browser, and in local dev tools.
- Infrastructure services (Postgres, Redis, RustFS, Mailpit) are published on
  `127.0.0.1:<RANDOM_PORT>`.

### Port Allocation
- `just dev up` assigns random 5-digit host ports for all exposed services.
- The first generated values are saved in `.workflows/dev/.ports`.
- Subsequent runs reuse saved ports when they are still free.
- If a saved port is occupied, only that specific key is replaced with a new
  random 5-digit free port.
- Startup output always prints the effective `localhost:<PORT>` endpoints.

### Environment Variables
- All environment variables are defined inline in `compose.yml`.
- The API entrypoint generates `.env` files at startup from the compose
  environment (needed because package scripts use `--env-file=.env`).
- The website Dockerfile generates its `.env` from `VITE_*` environment
  variables (needed because Vite reads from `.env` files, not `process.env`).

### Services

**Infrastructure:**
- PostgreSQL (`postgres://postgres:admin@localhost:<POSTGRES_HOST_PORT>/default`)
- Storage S3 API (`http://localhost:<STORAGE_HOST_PORT>`)
- RustFS UI (`http://localhost:<RUSTFS_UI_HOST_PORT>`)
- Mailpit UI (`http://localhost:<MAILPIT_UI_HOST_PORT>`), SMTP `localhost:<MAILPIT_SMTP_HOST_PORT>`
- Redis (`redis://localhost:<REDIS_HOST_PORT>`)

**Applications:**
- API (`http://localhost:<API_HOST_PORT>`)
- Website (`http://localhost:<WEBSITE_HOST_PORT>`)
- Worker (no exposed port — internal background processor)

## Prerequisites

Before starting the dev environment, install dependencies on the host:

```bash
pnpm install
```

## Usage

### Start all services
```bash
just dev up
```

The command prints effective `localhost:<PORT>` endpoints for every service.

### Rebuild images (after Node.js or PNPM version changes)
```bash
docker compose -f .workflows/dev/compose.yml build
just dev up
```

### View logs
```bash
# All services
docker compose -f .workflows/dev/compose.yml logs -f

# Specific service
docker compose -f .workflows/dev/compose.yml logs -f api
```

### Stop services
```bash
just dev down
```

### Reset database
```bash
just dev reset
```


## Key Concepts

### Full Workspace Volume Mount
- The **entire workspace** (including `node_modules`) is bind-mounted from host
- Dependencies must be installed on the host (`pnpm install`) before starting
- Changes on either host or container are instantly synced
- No separate dependency installation inside containers

### Environment Variables
- All environment variables are defined inline in `compose.yml`
- The API entrypoint generates `.env` files at startup from the compose environment
  (needed because package scripts use `--env-file=.env`)
- The website Dockerfile generates its `.env` from `VITE_*` environment variables
  (needed because Vite reads from `.env` files, not `process.env`)

### Services

**Infrastructure:**
- PostgreSQL (`postgres://postgres:admin@postgres.arrhes.localhost:<POSTGRES_HOST_PORT>/default`) - Database
- Storage API (`http://storage.arrhes.localhost:<GATEWAY_HOST_PORT>`) - Browser/container S3 access via edge gateway
- RustFS UI (`http://rustfs.arrhes.localhost:<GATEWAY_HOST_PORT>`) - S3-compatible storage admin UI via edge gateway
- Mailpit (`http://mailpit.arrhes.localhost:<GATEWAY_HOST_PORT>`, SMTP `smtp.arrhes.localhost:<MAILPIT_SMTP_HOST_PORT>`) - SMTP server with web UI
- Redis (`redis://redis.arrhes.localhost:<REDIS_HOST_PORT>`) - Message broker

**Applications:**
- API (`http://api.arrhes.localhost:<GATEWAY_HOST_PORT>`) - Hono backend via edge gateway
- Website (`http://website.arrhes.localhost:<GATEWAY_HOST_PORT>`) - React website interface via edge gateway
- Worker (`worker.arrhes.localhost`) - Background job processor (internal service)

All host endpoints use explicit random 5-digit ports persisted in
`.workflows/dev/.ports`.

Required host mappings for no-port access:

```text
127.20.0.10 api.arrhes.localhost website.arrhes.localhost storage.arrhes.localhost rustfs.arrhes.localhost mailpit.arrhes.localhost
127.20.0.2 postgres.arrhes.localhost
127.20.0.3 redis.arrhes.localhost
127.20.0.4 smtp.arrhes.localhost
```

If these names resolve elsewhere (for example `127.0.0.1`), add equivalent
entries in your system hosts file or local DNS. A ready-to-copy template is
provided in `.workflows/dev/hosts.example`.

Port allocation behavior:
- `just dev up` uses random 5-digit host ports for all exposed services.
- The first generated values are saved in `.workflows/dev/.ports`.
- Subsequent runs reuse saved ports when they are still free.
- If a saved port is occupied, only that specific key is replaced with a new
   random 5-digit free port.
- Startup output always prints the effective endpoints with explicit ports.

## Prerequisites

Before starting the dev environment, install dependencies on the host:

```bash
pnpm install
```

## Usage

### Start all services
```bash
# Using just (recommended)
just dev up

# Or with Docker Compose directly
docker compose -f .workflows/dev/compose.yml up -d
```

The `just dev up` helper prints warnings when hostnames do not resolve to the
expected loopback IPs.

### Rebuild images (after Node.js or PNPM version changes)
```bash
docker compose -f .workflows/dev/compose.yml build
docker compose -f .workflows/dev/compose.yml up -d
```

### View logs
```bash
# All services
docker compose -f .workflows/dev/compose.yml logs -f

# Specific service
docker compose -f .workflows/dev/compose.yml logs -f api
```

### Stop services
```bash
just dev down

# Or with Docker Compose directly
docker compose -f .workflows/dev/compose.yml down
```

### Reset database
```bash
just dev reset
```

### Access running containers
```bash
docker compose -f .workflows/dev/compose.yml exec api bash
```

## How It Works

1. **Build Phase:**
   - Dockerfiles create minimal images with Node.js + PNPM
   - No source code or dependencies are copied during build
   - Images are lightweight and rarely need rebuilding

2. **Runtime Phase:**
   - Full workspace bind-mounted to `/workspace` (including `node_modules`)
   - Environment variables from `compose.yml` are written to `.env` files at startup
   - API entrypoint runs migrations, seeds, and starts the dev server
   - Website container generates its `.env` and starts the Vite dev server

3. **Development:**
   - Install/update dependencies on host with `pnpm install`
   - Edit code on host with your IDE
   - Changes instantly reflected in containers
   - Vite HMR updates browser automatically
   - No manual container restarts needed for code changes

## Troubleshooting

### Port already in use
```bash
# Check what's using the port
lsof -i :3000
```

### Dependencies out of sync
```bash
# Run on host
pnpm install

# Restart containers to pick up changes
docker compose -f .workflows/dev/compose.yml restart api
```

### Database reset
```bash
# Remove database volume (WARNING: deletes all data)
docker compose -f .workflows/dev/compose.yml down
docker volume rm application_postgres_data
docker compose -f .workflows/dev/compose.yml up -d
```

### Clean slate
```bash
# Remove all containers and volumes, then rebuild
docker compose -f .workflows/dev/compose.yml down -v
docker compose -f .workflows/dev/compose.yml up -d --build
```
