# ==============================================================================
# Comptasse Dashboard Docker Image
# ==============================================================================
# Builds the dashboard SPA (Vite) and serves it with nginx.
#
# Build arguments (Vite environment variables baked into the SPA):
#   VITE_API_BASE_URL       default /api (proxied by nginx to the api service)
#   VITE_WEBSITE_BASE_URL   default empty
#   VITE_DASHBOARD_BASE_URL default empty
#
# The nginx config also proxies /api/ to the `api` service on the compose
# network, which is how self-hosted installs reach the API from the browser.
# ==============================================================================

# ---------------------------------------------------------------------------
# Stage 1: Build
# ---------------------------------------------------------------------------
FROM node:25.2.1-alpine AS base
RUN npm install -g pnpm@10.26.1
ENV NODE_OPTIONS="--max-old-space-size=4096"

FROM base AS build
ARG VITE_API_BASE_URL=/api
ARG VITE_WEBSITE_BASE_URL=""
ARG VITE_DASHBOARD_BASE_URL=""

WORKDIR /root
COPY . .
RUN pnpm install

# Write VITE_* build args to .env so Vite can read them during build.
RUN printf "VITE_API_BASE_URL=%s\nVITE_WEBSITE_BASE_URL=%s\nVITE_DASHBOARD_BASE_URL=%s\n" \
    "$VITE_API_BASE_URL" "$VITE_WEBSITE_BASE_URL" "$VITE_DASHBOARD_BASE_URL" \
    > packages/dashboard/.env

RUN pnpm --filter @comptasse/dashboard... run build

# ---------------------------------------------------------------------------
# Stage 2: Runtime (nginx)
# ---------------------------------------------------------------------------
FROM nginx:alpine AS deploy
COPY .workflows/build/packages/dashboard/nginx/default.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /root/packages/dashboard/build /usr/share/nginx/html

# Build-time smoke tests
RUN nginx -t && \
    test -f /usr/share/nginx/html/index.html && \
    echo "Dashboard smoke tests passed"

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]