# ==============================================================================
# Website Development Dockerfile
# ==============================================================================
# Minimal Node.js + PNPM image for running the website dev server.
# The full workspace (including node_modules) is bind-mounted at runtime.
# Dependencies must be installed on the host before starting.
#
# Environment variables are set in compose.yml and written to .env at startup
# so Vite can read them (Vite reads VITE_* from .env files, not process.env).
# ==============================================================================

ARG NODE_VERSION="25.2.1"
ARG PNPM_VERSION="10.26.1"

FROM node:${NODE_VERSION}-bullseye-slim

ARG PNPM_VERSION

# Install PNPM
RUN npm install -g "pnpm@${PNPM_VERSION}"

WORKDIR /workspace/packages/website

# Generate .env from compose environment variables, then start Vite
CMD ["sh", "-c", "printenv | grep '^VITE_' > .env && pnpm dev -- --host 0.0.0.0"]
