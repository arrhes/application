# Use an official Node.js image to build our image from
FROM node:25.2.1-alpine AS base
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm install -g pnpm@10.26.1

# Build only what the API runtime needs
FROM base AS build
WORKDIR /root
COPY . .
RUN pnpm install
RUN pnpm --filter @comptasse/application-api... run build

# Create a self-contained deploy output with production dependencies only
RUN pnpm --filter @comptasse/application-api deploy --legacy --prod /deploy

# Start api with only Node.js runtime
FROM node:25.2.1-alpine AS deploy
WORKDIR /root
COPY --from=build /deploy .
CMD ["node", "./build/server.js"]
