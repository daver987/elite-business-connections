# Use Node.js version 20 as the base image
FROM node:20

# Create app directory and set it as the working directory
WORKDIR /app

# Switch to the root user to perform system-level operations
USER root

# Enable Corepack to support Yarn/PNPM out of the box with Node.js
RUN corepack enable

# Change ownership of the /app directory to the 'node' user
RUN chown -R node:node /app

# Switch to 'node' user before copying files and installing dependencies
USER node

# Copy package.json and pnpm-lock.yaml or other relevant files
COPY --chown=node:node package.json pnpm-lock.yaml ./

# Install app dependencies using PNPM
RUN pnpm install

# Copy the rest of the application code with appropriate ownership
COPY --chown=node:node . .

# Build the app
RUN pnpm run build

# The command to run the app
CMD ["node", ".output/server/index.mjs"]
