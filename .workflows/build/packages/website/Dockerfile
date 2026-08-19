# ==============================================================================
# Comptasse Website Docker Image
# ==============================================================================
# Builds the marketing website (Vite) and serves it with nginx.
# Also serves the CLI install scripts and version file under /cli/ and the
# self-host installer at /install.sh (copied from the public dir by Vite).
#
# Build arguments (Vite environment variables baked into the SPA):
#   VITE_WEBSITE_BASE_URL   the public website URL
#   VITE_API_BASE_URL       the public API URL
#   VITE_DASHBOARD_BASE_URL the public dashboard URL
# ==============================================================================

# ---------------------------------------------------------------------------
# Stage 1: Build
# ---------------------------------------------------------------------------
FROM node:25.2.1-alpine AS base
RUN npm install -g pnpm@10.26.1
ENV NODE_OPTIONS="--max-old-space-size=4096"

FROM base AS build
ARG VITE_WEBSITE_BASE_URL
ARG VITE_API_BASE_URL
ARG VITE_DASHBOARD_BASE_URL

WORKDIR /root
COPY . .
RUN pnpm install

# Write VITE_* build args to .env so Vite can read them during build.
RUN printf "VITE_WEBSITE_BASE_URL=%s\nVITE_API_BASE_URL=%s\nVITE_DASHBOARD_BASE_URL=%s\n" \
    "$VITE_WEBSITE_BASE_URL" "$VITE_API_BASE_URL" "$VITE_DASHBOARD_BASE_URL" \
    > packages/website/.env

RUN pnpm --filter @comptasse/website... run build

# Stamp the CLI version served at /cli/version from the VERSION file
RUN VER=$(cat VERSION | tr -d 'v[:space:]') && \
    printf '%s\n' "$VER" > packages/cli/version && \
    printf '%s\n' "$VER" > packages/website/build/cli/version

# Generate the SQL migration files (0000_setup.sql + 0001_from_last_update.sql)
# served at /migrations/ so users can review the current release's schema SQL.
# Uses the same committed baseline snapshot (drizzle/meta/_snapshot.json) as the
# API image, so both images expose the exact same files.
RUN cd packages/tools && MIGRATIONS_OUT=/root/packages/website/build/migrations \
    pnpm exec tsx ./src/generateMigrations.ts

# ---------------------------------------------------------------------------
# Stage 2: Runtime (nginx)
# ---------------------------------------------------------------------------
FROM nginx:alpine AS deploy
COPY .workflows/build/packages/website/nginx/default.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /root/packages/website/build /usr/share/nginx/html

# Build-time smoke tests
RUN nginx -t && \
    test -f /usr/share/nginx/html/index.html && \
    test -f /usr/share/nginx/html/install.sh && \
    test -f /usr/share/nginx/html/cli/install.sh && \
    test -f /usr/share/nginx/html/cli/version && \
    test -f /usr/share/nginx/html/migrations/0000_setup.sql && \
    test -f /usr/share/nginx/html/migrations/0001_from_last_update.sql && \
    echo "Website smoke tests passed"

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]