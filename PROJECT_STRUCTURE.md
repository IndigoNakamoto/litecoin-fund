# Project Structure

## Overview
This document outlines the clean, organized structure for the Litecoin OpenSource Fund project.

## Directory Structure

```
├── src/
│   ├── api/
│   │   ├── webflow/
│   │   │   ├── projects.ts          # Get all published projects
│   │   │   ├── project.ts            # Get single project by slug
│   │   │   └── published-projects.ts # Admin: List all published projects
│   │   ├── tgb/
│   │   │   ├── auth.ts               # TGB authentication
│   │   │   ├── donations/
│   │   │   │   ├── fiat.ts           # Create fiat donation pledge
│   │   │   │   ├── crypto.ts         # Create crypto donation (deposit address)
│   │   │   │   └── stock.ts          # Create stock donation pledge
│   │   │   └── info.ts                # Get donation info by project slug
│   │   └── cache/
│   │       └── clear.ts               # Clear KV cache and revalidate
│   ├── pages/
│   │   ├── projects/
│   │   │   ├── index.tsx             # Projects listing page
│   │   │   └── [slug].tsx            # Individual project page
│   │   └── donate/
│   │       └── index.tsx              # Donate page
│   ├── services/
│   │   ├── webflow/
│   │   │   ├── client.ts              # Webflow API client
│   │   │   ├── projects.ts            # Project-related functions
│   │   │   └── types.ts               # Webflow types
│   │   └── tgb/
│   │       ├── client.ts              # TGB API client
│   │       ├── auth.ts                # TGB authentication
│   │       └── types.ts               # TGB types
│   ├── types/
│   │   ├── project.ts                 # Project types
│   │   ├── donation.ts                # Donation types
│   │   └── api.ts                     # API response types
│   ├── utils/
│   │   ├── cache.ts                   # KV cache utilities
│   │   └── errors.ts                  # Error handling utilities
│   └── components/
│       ├── projects/
│       │   ├── ProjectCard.tsx
│       │   ├── ProjectList.tsx
│       │   └── ProjectHeader.tsx
│       └── donate/
│           ├── DonationForm.tsx
│           └── PaymentModal.tsx
├── lib/
│   ├── prisma.ts                      # Prisma client
│   └── kv.ts                          # Vercel KV client
├── prisma/
│   └── schema.prisma                  # Database schema
└── .env.example                       # Environment variables template
```

## Key Features

### Webflow Integration
- Fetch projects from Webflow CMS
- Cache project data in Vercel KV
- Support for project updates, FAQs, contributors

### TGB (The Giving Block) Integration
- Authentication with token refresh
- Fiat donations
- Crypto donations (deposit addresses)
- Stock donations
- Donation tracking and info

### Routes
- `/projects` - List all projects
- `/projects/[slug]` - Individual project page
- `/donate` - Donation page

## Environment Variables

```env
# Webflow
WEBFLOW_API_TOKEN=
WEBFLOW_COLLECTION_ID_PROJECTS=

# The Giving Block
GIVING_BLOCK_LOGIN=
GIVING_BLOCK_PASSWORD=
TGB_ORGANIZATION_ID=

# Vercel KV
KV_REST_API_URL=
KV_REST_API_TOKEN=

# Database
DATABASE_URL=

# App
CRON_SECRET=
```

