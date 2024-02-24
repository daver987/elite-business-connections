# Use Node 20 as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Change to the non-root 'node' user for better security
USER node

# Enable Corepack to manage package managers
RUN corepack enable

# Copy package.json and pnpm-lock.yaml (or package-lock.json if you use npm) to the container
# Note: These operations need to be performed as root if you're copying before switching to the 'node' user
USER root
COPY --chown=node:node package.json pnpm-lock.yaml ./
USER node

# Install dependencies with pnpm
RUN pnpm install

# Copy the rest of the application code to the container
COPY --chown=node:node . .

# Build the Nuxt 3 application
RUN pnpm run build

# Expose the port Nuxt 3 runs on
EXPOSE 3000

# Set the command to run your app using Node
CMD ["node", ".output/server/index.mjs"]
