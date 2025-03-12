# Elite Business Connections Upgrade Project.

Below is a distilled version of the Product Requirements Document (PRD) for the Elite Business Connections (EBC) Upgrade Project that includes a new portal as they migrate away from Directus. THis will include a lightweight CMS, for their blog posts, and a light vesion of BNI dashboard.
new portal as they migrate away from Directus. THis will include a lightweight CMS, for their blog posts, and a light vesion of BNI dashboard.

## Auth

- Authentication Provider: Use Clerk for user authentication (registration, login, password resets, etc.).
- Integration: Integrate Clerk with Nuxt 3 using the Clerk Nuxt SDK.
- Roles: Support two roles:
- Regular Member: Access to the member dashboard.
- Admin: Additional access to manage members and content.
- Protection: Secure dashboard pages with Clerk’s Nuxt middleware, restricting access to authenticated users only.

## Frontend

- Framework: Use Nuxt 3 for the frontend, supporting server-side rendering (SSR) and static site generation.
- UI Library: Leverage Nuxt UI for a consistent, pre-styled interface (e.g., forms, tables).
- Public Pages: Retain and enhance existing front-facing website pages (Home, About, Contact, Blog) with SEO optimization.
- Member Dashboard: Build protected dashboard pages for authenticated users (e.g., referrals, stats).
- Responsive Design: Ensure the interface is mobile-friendly.

## Portal (Member Dashboard)

- Summary View: Display member stats (e.g., referrals given/received, closed business amount).
- Referrals Management:
- Submit new referrals (e.g., recipient, contact info, notes).
- View and update the status of given and received referrals (e.g., “New”, “Contacted”, “Closed”).
- Thank You For Business: Log closed business and credit the referring member.
- Member Directory: Provide an internal directory of members.
- Profile Page: Allow members to view and update their personal information.

## CMS

- Build Our Own Simple CMS
- Development: Create a custom CMS within the Nuxt 3 application.
- Features: Admin interfaces to manage blog posts, pages, and member data.
- Editor: Integrate a rich text editor (e.g., TipTap) for content creation.
- Media: Handle image uploads and management.
- Usability: Design a user-friendly interface tailored to EBC’s needs.
- Security: Restrict access based on authentication and roles.

## Database

- Database: Use Prisma Postgres—Prisma’s new DB solution for all data storage (members, referrals, content).
- ORM: Implement Prisma ORM for type-safe database interactions.
- Data Models: Define tables for:
- Members (profile, role).
- Referrals (giver, receiver, status).
- ClosedBusiness (linked to referrals, amount).
- Posts (blog content).

## Automation & Notifications

- Email Notifications: Send immediate emails for referral submissions and closed business.
- Summaries: Generate periodic summary emails (e.g., monthly activity reports).
- Service: Use SendGrid or SMTP for email delivery (likely SMTP with Zoho).

## SEO and Sitemap

- Meta Tags: Add meta and open graph tags to public pages.
- Sitemap: Generate a sitemap.xml for public URLs.
- Robots.txt: Configure to manage search engine crawling.

## Additional Notes

- Front-Facing Website: The existing public website is retained and integrated into the Nuxt 3 application, with enhancements for SEO and content management via the chosen CMS.

## INSTRUCTIONS

Complete the following tasks in order, ignoring anything to do with auth right now:
Also make a file with a list of each thing that will be needed for each page that you scaffold.

1. Update dependencies.
2. Remove any of the old Directus data.
3. Scaffold the API routes with boilerplate Just the necessary boilerplate Only.
4. Scaffold the Portal. Just the necessary boilerplate Only.
5. Scaffold the CMS. Just the necessary boilerplate Only.
6. Create the Prisma model and seed the local SQLite DB.

The objective is to clean out unnecessary old code and complete the most minimal scaffolding required. When you’re done, we should have a site with basically all the routes defined and ready for development.