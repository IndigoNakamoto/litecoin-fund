# Litecoin Fund

A clean, modern Next.js application for managing Litecoin open-source projects and donations.

## Features

- **Webflow Integration**: Fetch and display projects from Webflow CMS
- **TGB (The Giving Block) Integration**: Handle fiat and crypto donations
- **Project Pages**: Browse and view individual project details
- **Donation Flow**: Complete donation process with TGB API

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── webflow/          # Webflow API routes
│   │   ├── tgb/              # The Giving Block API routes
│   │   └── cache/            # Cache management
│   ├── projects/             # Project pages
│   └── donate/               # Donation page
├── services/
│   ├── webflow/              # Webflow service layer
│   └── tgb/                  # TGB service layer
├── types/                     # TypeScript type definitions
├── lib/                       # Shared libraries (KV, Prisma)
└── utils/                     # Utility functions
```

## Setup

1. **Install dependencies** (Note: Requires Node.js 20.19+ or 22.12+ for Prisma)
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your credentials:
   - Webflow API token and collection ID
   - The Giving Block login credentials
   - Vercel KV credentials
   - Database URL (for Prisma)

3. **Set up Prisma** (after upgrading Node.js)
   ```bash
   npx prisma init
   npx prisma generate
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## API Routes

### Webflow
- `GET /api/webflow/projects` - Get all published projects
- `GET /api/webflow/projects/[slug]` - Get project by slug

### The Giving Block
- `POST /api/tgb/donations/fiat` - Create fiat donation pledge
- `POST /api/tgb/donations/crypto` - Create crypto donation (deposit address)

## Pages

- `/projects` - List all projects
- `/projects/[slug]` - Individual project page
- `/donate` - Donation form

## Environment Variables

This app expects env vars compatible with the **existing (legacy) production DB** and TGB.

- **Database**
  - **`DATABASE_URL`**: must point at the *existing live DB* (same one used by the old project).
    - The current Prisma client (`litecoin-fund/lib/prisma.ts`) reads **only** `DATABASE_URL`.
    - Do **not** run `prisma migrate` against the live DB.

- **The Giving Block**
  - **`GIVING_BLOCK_LOGIN`**
  - **`GIVING_BLOCK_PASSWORD`**

- **Schema expectations (legacy parity)**
  - Token caching uses the legacy **`tokens`** table with columns:
    - `access_token`, `refresh_token`, `expires_at`, `refreshed_at`
  - Donation persistence uses the legacy **`donations`** table (and `webhook_events` when webhook parity is implemented).

## Note on Node.js Version

This project requires Node.js 20.19+ or 22.12+ for Prisma support. If you're on an older version, you can still develop the frontend and API routes, but Prisma functionality will be disabled until you upgrade.
