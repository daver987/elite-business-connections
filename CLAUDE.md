# Elite Business Connections Development Guide

## Build Commands

- `pnpm dev` - Run development server
- `pnpm build` - Build for production
- `pnpm lint` - Check code formatting with Prettier
- `pnpm lint:fix` - Auto-fix formatting issues

## Code Style

- **Formatting**: Prettier with 2 space tabs, single quotes, no semicolons
- **Components**: Use Vue 3 Composition API with `<script setup lang="ts">`
- **Block Order**: Put the script tag at the top of the file important!
- **Naming**: PascalCase for components, camelCase for variables/functions
- **Auto Imports**: Nuxt 3 uses auto imported composables, components, and utilities.
- **Types**: Use TypeScript interfaces in `/types` directory
- **Error Handling**: Use try/catch with appropriate error messaging
- **Structure**: Follow existing component organization in /components/sections
- **Prisma**: Use the globally supplied singleton from ~/lib/prisma for the prisma client its a defalut import

## Tech Stack

- Nuxt 3 with TypeScript and auto imports.
- Nuxt UI for UI Components
- Tailwind CSS for styling
- Custom CMS
- SendGrid for email functionality
- Prisma's Postgress offering for db
- Prisma ORM for an ORM.

## Stack Specifics

- **Default Styles**: Use the Nuxt UI built-in defaults styles customize at the theme level.
- **VueUse**: Use VueUse whenever possible over custom composable functions.
- **Dark Mode**: Use the Nuxt UI built-in dark mode support.
-
