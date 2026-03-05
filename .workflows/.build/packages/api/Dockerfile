# Use an official Node.js image to build our image from
FROM node:25-alpine AS base
RUN npm i -g corepack@latest
RUN corepack enable

ENV NODE_OPTIONS="--max-old-space-size=4096"

# Build the monorepo
FROM base AS build
WORKDIR /root
COPY . .

# Build the api
RUN echo "@arrhes:registry=https://npm.pkg.github.com/" >> .npmrc
RUN --mount=type=secret,id=github_token echo "//npm.pkg.github.com/:_authToken=$(cat /run/secrets/github_token)" >> .npmrc
RUN pnpm install
RUN rm -f .npmrc
RUN pnpm run build

# Start api
FROM base AS deploy
WORKDIR /root
COPY --from=build /root/build ./build
COPY --from=build /root/node_modules ./node_modules
COPY --from=build /root/packages/metadata ./packages/metadata
COPY --from=build /root/package.json ./package.json
CMD [ "pnpm", "start"]
