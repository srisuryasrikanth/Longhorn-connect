# UT Austin Alumni Connector

A simple full-stack MVP built with Next.js App Router, TypeScript, Tailwind CSS, Prisma, and SQLite-compatible storage. Locally it runs against SQLite; for deployment it can use Turso through Prisma's libSQL adapter.

## Tech stack

- Next.js App Router + TypeScript
- Tailwind CSS
- Prisma ORM
- Local SQLite for development
- Turso for cloud deployment
- Vitest for unit tests

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a local environment file:
   ```bash
   Copy-Item .env.example .env
   ```
3. Create or update the local SQLite schema:
   ```bash
   npm run db:push
   ```
4. Seed the fictional alumni and job-board data locally:
   ```bash
   npm run db:seed
   ```
5. Start the local dev server:
   ```bash
   npm run dev
   ```

The local Prisma CLI uses `DATABASE_URL="file:./dev.db"`, which places the SQLite database in the `prisma` folder.

## Vercel + Turso deployment

1. Create a Turso database and auth token in the Turso dashboard or CLI.
2. Set local PowerShell env vars before provisioning the remote schema:
   ```bash
   $env:TURSO_DATABASE_URL="libsql://your-database-your-org.turso.io"
   $env:TURSO_AUTH_TOKEN="your-turso-auth-token"
   ```
3. Push the current Prisma schema to Turso:
   ```bash
   npm run db:push:turso
   ```
4. Seed Turso with the fictional alumni profiles and job postings. `npm run db:seed` now uses Turso whenever `TURSO_DATABASE_URL` is set in your shell:
   ```bash
   npm run db:seed
   ```
5. In Vercel Project Settings, add `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` as environment variables, then deploy.

Notes:

- The app automatically uses Turso at runtime whenever `TURSO_DATABASE_URL` is present.
- Local Prisma CLI commands still use `DATABASE_URL`, which keeps local schema diffing simple.
- `npm run db:push:turso` is intentionally simple and best for initial schema creation or reapplying the current MVP schema.

## Useful commands

```bash
npm run dev
npm run db:push
npm run db:push:turso
npm run db:seed
npm test
npm run lint
npm run typecheck
npm run build
```

## What is included

- 40 fictional alumni profiles with clearly fake names, companies, and `example.com` email addresses
- 8 fictional alumni-posted job listings seeded into the job board
- Natural-language alumni search with a local weighted relevance algorithm
- Search score breakdown shown in the UI so students can see why results rank where they do
- Alumni detail pages
- A dedicated `/jobs` route where alumni can post roles and students can browse openings
- `mailto:` outreach buttons for both alumni discovery and job-board follow-up
- Persistent star counts stored in SQLite locally or Turso in deployment
- Browser-level duplicate star prevention with `localStorage`
- Backend duplicate-star guard using a unique `(alumniId, clientId)` constraint
- Home page leaderboard preview and a full leaderboard page
- Responsive empty, loading, and error states

## Assumptions and tradeoffs

- The MVP intentionally skips authentication, so stars are guarded only by browser local storage and a lightweight backend client identifier.
- The job board uses a selected alumni profile as the poster identity because there is no authentication yet.
- The natural-language search is local and heuristic-based instead of semantic embeddings, which keeps the app easy to run locally and avoids paid services.
- Search filters are exact-match dropdowns for simplicity.
- Messaging is intentionally limited to `mailto:` so the app stays local-first and easy to understand.
- The Turso deployment path keeps Prisma CLI on local SQLite while the runtime client switches to Turso.

## Future improvements

- Add authentication so stars, job posts, saved outreach, and favorites are tied to real student or alumni accounts.
- Add job editing, expiration dates, and moderation controls for alumni postings.
- Add conversation logging or CRM-style outreach tracking instead of `mailto:` only.
- Introduce semantic search behind a feature flag when an API key is available.
- Add richer alumni tags, saved searches, and pagination.
- Add a proper migration pipeline for applying incremental schema changes to Turso.