# Use an official Node.js image to build our image from
FROM node:25-alpine AS base
RUN npm install -g pnpm@10.26.1

# Define build arguments for environment variables
ARG VITE_PUBLIC_WEBSITE_URL
ARG VITE_PUBLIC_API_URL

# Set environment variables during the build process
ENV VITE_PUBLIC_WEBSITE_URL=$VITE_PUBLIC_WEBSITE_URL
ENV VITE_PUBLIC_API_URL=$VITE_PUBLIC_API_URL
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Build the repo
FROM base AS build
WORKDIR /root
COPY . .
RUN pnpm install
RUN pnpm run build

# Start application
FROM nginx:alpine AS deploy
WORKDIR /
COPY .workflows/.build/packages/website/nginx/default.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /root/packages/website/build /usr/share/nginx/html
EXPOSE 3101
CMD ["nginx"]
