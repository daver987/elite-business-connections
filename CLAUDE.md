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
- **Prisma**: Use the globally supplied singleton from ~/lib/prisma as a default export - `import prisma from '~/lib/prisma'`

## Data Fetching

- **useLazyFetch**: Use for client-side data fetching with defaults. This won't block rendering and will show defaults first:
  ```ts
  const { data } = useLazyFetch('/api/endpoint', {
    default: () => ({
      statusCode: 200,
      data: defaultData,
    }),
  })
  ```
- **useFetch**: Use for SSR data fetching when blocking rendering is acceptable
- **Default Values**: Always provide fallbacks when using API data
- **API Response Format**: All API endpoints return { statusCode, data, error } format

## CMS

- **Page Content API**: Use `/api/pages/[pageId]/[sectionId]` for content
- **Content Structure**: JSON data stored in database for each section
- **Admin Interface**: Edit JSON at `/admin/pages`
- **Default Content**: Use the seed endpoint `/api/pages/seed` to populate default content

## Tech Stack

- Nuxt 3 with TypeScript and auto imports.
- Nuxt UI for UI Components
- Tailwind CSS for styling
- Custom CMS with Prisma/PostgreSQL backend
- SendGrid for email functionality
- Prisma's PostgreSQL offering for database
- Prisma ORM for database access

## Stack Specifics

- **Default Styles**: Use the Nuxt UI built-in defaults styles customize at the theme level.
- **VueUse**: Use VueUse whenever possible over custom composable functions.
- **Dark Mode**: Use the Nuxt UI built-in dark mode support.
- **Database Column Names**: Use snake_case for database columns, camelCase for TypeScript properties
- **API Endpoints**: Use `[paramName].[method].ts` file naming convention for API routes
