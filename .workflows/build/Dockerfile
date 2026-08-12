# ==============================================================================
# Comptasse All-in-One Docker Image
# ==============================================================================
# Multi-stage build that packages API + Dashboard + CLI into a single image.
# PostgreSQL and S3-compatible storage must be provided by the user.
#
# Usage:
#   docker build -f .workflows/build/Dockerfile -t comptasse/comptasse .
#   docker run -d -p 3000:3000 -p 5173:5173 -v comptasse-data:/data \
#     -e SQL_DATABASE_URL=postgres://... \
#     -e STORAGE_ENDPOINT=https://... \
#     -e STORAGE_BUCKET_NAME=... \
#     -e STORAGE_ACCESS_KEY=... \
#     -e STORAGE_SECRET_KEY=... \
#     comptasse/comptasse
# ==============================================================================

# ---------------------------------------------------------------------------
# Stage 1: Build all packages
# ---------------------------------------------------------------------------
FROM node:25.2.1-alpine AS base
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm install -g pnpm@10.26.1

FROM base AS build
WORKDIR /root
COPY . .
RUN pnpm install

# Build API and its workspace dependencies
RUN pnpm --filter @comptasse/application-api... run build

# Build Dashboard and its workspace dependencies
# Dashboard needs VITE_API_BASE_URL for the SPA build.
# We use /api which nginx will proxy to the Node.js API process.
ARG VITE_API_BASE_URL=/api
ARG VITE_WEBSITE_BASE_URL=""
RUN printf "VITE_API_BASE_URL=%s\nVITE_WEBSITE_BASE_URL=%s\n" \
    "$VITE_API_BASE_URL" "$VITE_WEBSITE_BASE_URL" \
    > packages/dashboard/.env
RUN pnpm --filter @comptasse/dashboard... run build

# Stamp CLI version from VERSION file
RUN VER=$(cat VERSION | tr -d 'v[:space:]') && \
    sed -i "s/^VERSION=\".*\"/VERSION=\"$VER\"/" packages/cli/comptasse.sh && \
    printf '%s\n' "$VER" > packages/cli/version

# ---------------------------------------------------------------------------
# Stage 2: Runtime image with all services
# ---------------------------------------------------------------------------
FROM node:25.2.1-alpine AS deploy

# Install runtime dependencies:
# - nginx: serve dashboard static files + proxy API
# - supervisor: manage multiple processes in one container
# - postgresql16-client: psql for schema management on startup
# - curl: health checks and CLI install script
# - bash: entrypoint script
RUN apk add --no-cache nginx supervisor postgresql16-client curl bash

# Install pnpm (needed for running tools scripts)
RUN npm install -g pnpm@10.26.1

WORKDIR /app

# Copy built API
COPY --from=build /root/packages/api /app/api

# Copy built Dashboard (static SPA)
COPY --from=build /root/packages/dashboard/build /app/dashboard

# Copy CLI
COPY --from=build /root/packages/cli /app/cli

# Copy tools (for schema management)
COPY --from=build /root/packages/tools /app/tools

# Copy metadata (dependency of tools and API)
COPY --from=build /root/packages/metadata /app/metadata

# Copy runtime configs
COPY .workflows/build/supervisord.conf /etc/supervisord.conf
COPY .workflows/build/nginx.conf /etc/nginx/nginx.conf
COPY .workflows/build/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Create data directory for volumes
RUN mkdir -p /data

# Expose API and Dashboard ports
EXPOSE 3000 5173

ENTRYPOINT ["/entrypoint.sh"]
