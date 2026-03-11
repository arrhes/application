# Use an official Node.js image to build our image from
FROM node:25-alpine AS base
RUN npm install -g pnpm@10.26.1

ENV NODE_OPTIONS="--max-old-space-size=4096"

# Build the monorepo
FROM base AS build
WORKDIR /root
COPY . .
RUN pnpm install
RUN pnpm run build

# Start api
FROM base AS deploy
WORKDIR /root
COPY --from=build /root/packages/api/build ./build
COPY --from=build /root/node_modules ./node_modules
COPY --from=build /root/packages/metadata ./packages/metadata
COPY --from=build /root/packages/api/package.json ./package.json
CMD [ "pnpm", "start"]
