# Use an official Node.js image to build our image from
FROM node:25-alpine AS base
RUN npm i -g corepack@latest
RUN corepack enable

# Define build arguments for environment variables
ARG VITE_PUBLIC_APPLICATION_URL
ARG VITE_PUBLIC_WEBSITE_URL
ARG VITE_PUBLIC_API_URL

# Set environment variables during the build process
ENV VITE_PUBLIC_APPLICATION_URL=$VITE_PUBLIC_APPLICATION_URL
ENV VITE_PUBLIC_WEBSITE_URL=$VITE_PUBLIC_WEBSITE_URL
ENV VITE_PUBLIC_API_URL=$VITE_PUBLIC_API_URL
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Build the repo
FROM base AS build
WORKDIR /root
COPY . .
RUN echo "@arrhes:registry=https://npm.pkg.github.com/" >> .npmrc
RUN --mount=type=secret,id=github_token echo "//npm.pkg.github.com/:_authToken=$(cat /run/secrets/github_token)" >> .npmrc
RUN pnpm install
RUN rm -f .npmrc
RUN pnpm run build

# Start application
FROM nginx:alpine AS deploy
WORKDIR /
COPY .workflows/.build/packages/dashboard/nginx/default.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /root/build /usr/share/nginx/html
EXPOSE 3101
CMD ["nginx"]
