# UT Austin Alumni Connector

A simple full-stack MVP built with Next.js App Router, TypeScript, Tailwind CSS, Prisma, and SQLite. It helps students discover fictional UT Austin alumni, search with natural language, send email outreach with a `mailto:` template, award stars, and view a top-10 leaderboard.

## Tech stack

- Next.js App Router + TypeScript
- Tailwind CSS
- Prisma + SQLite
- Vitest for unit tests

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a local environment file:
   ```bash
   Copy-Item .env.example .env
   ```
3. Create or update the SQLite schema:
   ```bash
   npm run db:push
   ```
4. Seed the fictional alumni data:
   ```bash
   npm run db:seed
   ```
5. Start the local dev server:
   ```bash
   npm run dev
   ```

The default `.env` value is `DATABASE_URL="file:./dev.db"`, which places the SQLite database in the `prisma` folder.

## Useful commands

```bash
npm run dev
npm run db:push
npm run db:seed
npm test
npm run lint
npm run typecheck
npm run build
```

## What is included

- 40 fictional alumni profiles with clearly fake names, companies, and `example.com` email addresses
- Natural-language alumni search with a local weighted relevance algorithm
- Search score breakdown shown in the UI so students can see why results rank where they do
- Alumni detail pages
- `mailto:` outreach buttons with a friendly student template
- Persistent star counts stored in SQLite
- Browser-level duplicate star prevention with `localStorage`
- Backend duplicate-star guard using a unique `(alumniId, clientId)` constraint
- Home page leaderboard preview and a full leaderboard page
- Responsive empty, loading, and error states

## Assumptions and tradeoffs

- The MVP intentionally skips authentication, so stars are guarded only by browser local storage and a lightweight backend client identifier.
- The natural-language search is local and heuristic-based instead of semantic embeddings, which keeps the app easy to run locally and avoids paid services.
- Search filters are exact-match dropdowns for simplicity.
- Messaging is intentionally limited to `mailto:` so the app stays local-first and easy to understand.
- `npm run db:push` uses a Prisma diff-and-execute helper script because `prisma db push` itself was flaky in this Windows sandbox.

## Future improvements

- Add authentication so stars, saved outreach, and favorites are tied to real student accounts.
- Add conversation logging or CRM-style outreach tracking instead of `mailto:` only.
- Introduce semantic search behind a feature flag when an API key is available.
- Add richer alumni tags, saved searches, and pagination.
- Add integration tests for the route handlers and Prisma-backed services.
