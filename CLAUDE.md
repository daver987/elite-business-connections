# Elite Business Connections Development Guide

## Build Commands
- `pnpm dev` - Run development server
- `pnpm build` - Build for production
- `pnpm generate` - Generate static site
- `pnpm preview` - Preview production build
- `pnpm lint` - Check code formatting with Prettier
- `pnpm lint:fix` - Auto-fix formatting issues

## Code Style
- **Formatting**: Prettier with 2 space tabs, single quotes, no semicolons
- **Components**: Use Vue 3 Composition API with `<script setup lang="ts">`
- **Naming**: PascalCase for components, camelCase for variables/functions
- **Imports**: Group by: 1) Vue/Nuxt, 2) External packages, 3) Internal modules
- **Types**: Use TypeScript interfaces in `/types` directory
- **Error Handling**: Use try/catch with appropriate error messaging
- **Structure**: Follow existing component organization in /components/sections

## Tech Stack
- Nuxt 3 with TypeScript
- Tailwind CSS for styling
- Sanity for content management
- SendGrid for email functionality