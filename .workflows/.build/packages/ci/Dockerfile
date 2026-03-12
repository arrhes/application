# ==============================================================================
# CI Dockerfile
# ==============================================================================
# Runs the full check pipeline inside Docker:
#   1. Install dependencies
#   2. Biome check (lint + format)
#   3. Unit tests
#   4. Build all packages
#
# Usage: just build
# ==============================================================================

FROM node:25-alpine
RUN npm install -g pnpm@10.26.1

WORKDIR /workspace

# Copy everything needed for install + build
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml biome.json .gitignore ./
COPY packages/ ./packages/
COPY tests/ ./tests/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build all packages (must run before tests so workspace deps are compiled)
RUN pnpm run build

# Run Biome check (lint + format)
RUN pnpm check

# Run unit tests
RUN pnpm --recursive --if-present --filter='./packages/**' run test:unit
