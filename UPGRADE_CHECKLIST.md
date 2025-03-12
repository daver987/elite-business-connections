# Elite Business Connections Upgrade Checklist

## 1. Update Dependencies

- [ ] Update Nuxt and core dependencies
- [ ] Add Prisma and related packages
- [ ] Add TipTap editor for CMS
- [ ] Add any missing UI components from Nuxt UI
- [ ] Remove unused dependencies

## 2. Remove Old Directus Data

- [ ] Remove Directus-related API calls and helpers
- [ ] Remove `/server/utils/directus-helpers.ts`
- [ ] Clean up any Directus-related types
- [ ] Remove Directus environment variables from config

## 3. API Routes Scaffolding

### Members API

- [ ] `GET /api/members` - List all members
- [ ] `GET /api/members/:id` - Get member details
- [ ] `PUT /api/members/:id` - Update member profile

### Referrals API

- [ ] `GET /api/referrals` - List referrals
- [ ] `POST /api/referrals` - Create new referral
- [ ] `PUT /api/referrals/:id` - Update referral status

### Closed Business API

- [ ] `POST /api/business` - Log closed business
- [ ] `GET /api/business` - Get closed business history

### CMS API

- [ ] `GET /api/posts` - List blog posts
- [ ] `GET /api/posts/:id` - Get single post
- [ ] `POST /api/posts` - Create post (admin only)
- [ ] `PUT /api/posts/:id` - Update post (admin only)
- [ ] `DELETE /api/posts/:id` - Delete post (admin only)
- [ ] `POST /api/media` - Upload media file

## 4. Portal Scaffolding

### Dashboard

- [ ] Create dashboard layout
- [ ] Add stats summary component
- [ ] Create referrals table component

### Referrals Management

- [ ] Create new referral form
- [ ] Create referrals list view
- [ ] Create referral detail view

### Member Directory

- [ ] Create members list view
- [ ] Create member detail view

### Profile

- [ ] Create profile view/edit page

## 5. CMS Scaffolding

### Admin Dashboard

- [ ] Create admin layout
- [ ] Create posts management view

### Blog Editor

- [ ] Create post editor with TipTap
- [ ] Create media library component
- [ ] Create post preview component

### Blog Frontend

- [ ] Create blog list page
- [ ] Create blog post detail page

## 6. Prisma Model & Database

- [ ] Create Prisma schema with models for:
  - [ ] User (member profile data)
  - [ ] Role (admin/member)
  - [ ] Referral
  - [ ] ClosedBusiness
  - [ ] Post (blog content)
  - [ ] Media (uploaded files)
- [ ] Create database seed script with sample data
- [ ] Set up SQLite for local development
- [ ] Create database migration
