# Development Environment

Docker-based development environment for the Arrhes application.

## Architecture

```
.workflows/.dev/
├── compose.yml              # Docker Compose config (services + env vars)
├── compose.tunnel.yml       # Cloudflare tunnel overlay
├── .dockerignore            # Build context exclusions
├── .gitignore               # Git tracking rules
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

### Environment Variables
- All environment variables are defined inline in `compose.yml`
- The API entrypoint generates `.env` files at startup from the compose environment
  (needed because package scripts use `--env-file=.env`)
- The website Dockerfile generates its `.env` from `VITE_*` environment variables
  (needed because Vite reads from `.env` files, not `process.env`)

### Services

**Infrastructure:**
- PostgreSQL (port 5432) - Database
- RustFS (ports 9000, 9001) - S3-compatible storage
- Mailpit (ports 1025, 8025) - SMTP server with web UI

**Applications:**
- API (port 3000) - Hono backend
- Website (port 5173) - React website interface

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
docker compose -f .workflows/.dev/compose.yml up -d
```

### Rebuild images (after Node.js or PNPM version changes)
```bash
docker compose -f .workflows/.dev/compose.yml build
docker compose -f .workflows/.dev/compose.yml up -d
```

### View logs
```bash
# All services
docker compose -f .workflows/.dev/compose.yml logs -f

# Specific service
docker compose -f .workflows/.dev/compose.yml logs -f api
```

### Stop services
```bash
just dev down

# Or with Docker Compose directly
docker compose -f .workflows/.dev/compose.yml down
```

### Reset database
```bash
just dev reset
```

### Access running containers
```bash
docker compose -f .workflows/.dev/compose.yml exec api bash
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
docker compose -f .workflows/.dev/compose.yml restart api
```

### Database reset
```bash
# Remove database volume (WARNING: deletes all data)
docker compose -f .workflows/.dev/compose.yml down
docker volume rm application_postgres_data
docker compose -f .workflows/.dev/compose.yml up -d
```

### Clean slate
```bash
# Remove all containers and volumes, then rebuild
docker compose -f .workflows/.dev/compose.yml down -v
docker compose -f .workflows/.dev/compose.yml up -d --build
```
