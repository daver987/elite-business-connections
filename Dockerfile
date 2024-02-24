# Use Node 20 as the base image
FROM node:20-slim

# Set the working directory in the container
WORKDIR /app

# Switch to root to enable corepack
USER root
RUN corepack enable

# Switch back to node user
USER node

# Copy package.json and pnpm-lock.yaml (or package-lock.json if you use npm) to leverage Docker caching
COPY --chown=node:node package.json pnpm-lock.yaml ./

# Install dependencies as node user
RUN pnpm install

# Copy the Nuxt 3 application source code into the container
COPY --chown=node:node . .

# Build the Nuxt 3 application as node user
RUN pnpm run build

# Expose the port Nuxt 3 runs on
EXPOSE 3000

# Set the command to run your app using Node
CMD ["node", ".output/server/index.mjs"]

