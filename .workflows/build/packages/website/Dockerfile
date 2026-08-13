# Use an official Node.js image to build our image from
FROM node:25.2.1-alpine AS base
RUN npm install -g pnpm@10.26.1
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Build the repo
FROM base AS build

# Build argument for the website base URL (used for absolute links in generated .md files)
ARG VITE_WEBSITE_BASE_URL

WORKDIR /root
COPY . .
RUN pnpm install

# Write VITE_* build args to .env so Vite can read them during build.
# Vite reads import.meta.env from .env files, not from process.env.
RUN printf "VITE_WEBSITE_BASE_URL=%s\n" "$VITE_WEBSITE_BASE_URL" \
    > packages/website/.env

RUN pnpm --filter @comptasse/website... run build

# Serve
FROM nginx:alpine AS deploy
WORKDIR /
COPY .workflows/build/packages/website/nginx/default.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /root/packages/website/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx"]
