# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

RectorCup UC 2026 — a Next.js 16 (App Router) web app for a university competition event at Universitas Ciputra. It handles competition listings, team registration, brackets/match scheduling, **real-time live scoring**, and an "all-star" voting system. React 19, TypeScript, Tailwind CSS v4, Prisma + PostgreSQL, NextAuth v5.

> A `WARP.md` also exists but predates several architectural changes (custom Socket.IO server, NextAuth v5, `proxy.ts` routing, ciputra.ac.id-only sign-in). Prefer this file when they conflict.

## Critical: the app runs on a custom server, not `next dev`/`next start`

`server.ts` wraps Next.js in a manual HTTP server with **Socket.IO** attached, for real-time score broadcasting. There is no `next dev` script. Anything that touches Socket.IO will not work if you bypass `server.ts`.

- `pnpm dev` → `tsx watch server.ts` (dev server, port 3000)
- `pnpm build` → `prisma generate && next build`
- `pnpm start` → `NODE_ENV=production tsx server.ts` (run after build)

## Commands (pnpm)

```bash
pnpm install
pnpm dev                 # custom Socket.IO + Next dev server
pnpm build               # prisma generate + next build
pnpm lint                # eslint (flat config, next rules)
pnpm typecheck           # tsc --noEmit
pnpm test                # jest (--passWithNoTests)
pnpm test:watch
pnpm test:ci
pnpm test path/to/file.test.ts        # single file
pnpm test -- -t "test name pattern"   # single test by name

# Prisma (edit prisma/schema.prisma, then:)
pnpm prisma:migrate      # prisma migrate dev
pnpm prisma:deploy       # prisma migrate deploy (used in prod/Docker)
pnpm prisma:reset
pnpm prisma:seed         # tsx prisma/seed.ts — seeds example competitions
pnpm exec prisma generate
pnpm exec prisma studio
```

Jest tests live alongside source as `*.test.ts(x)` under `src/` (jsdom environment).

## Architecture

### Real-time live scoring (Socket.IO)
The signature feature. Flow:
1. Admin uses [LiveScoreController.tsx](src/components/competition/LiveScoreController.tsx) → `socket.emit("update-score-server", {...})` **and** calls the `handleUpdateMatchScore` server action ([src/lib/action.ts](src/lib/action.ts)) to persist to the DB.
2. [server.ts](server.ts) relays the event to everyone in the competition's room: `io.to(competitionId).emit("score-updated-client", data)`. Rooms are joined via `socket.emit("join-competition", competitionId)`.
3. Public viewers in [LiveScore.tsx](src/components/competition/LiveScore.tsx) listen for `score-updated-client` and update the UI.

Socket events are emitted from the client to a relay-only server (no auth/validation on the socket layer) **and** mirrored into a persisted server action — keep both in sync when changing score logic.

### Auth (NextAuth v5 / `next-auth@5.0.0-beta`)
[src/lib/auth.ts](src/lib/auth.ts) exports `{ handlers, auth, signIn, signOut }` (the v5 pattern — there is no `authOptions`). Wired at [src/app/api/auth/[...nextauth]/route.ts](src/app/api/auth/[...nextauth]/route.ts).
- Google provider only. **Sign-in is restricted to `@ciputra.ac.id` emails** (the `signIn` callback returns `/auth/error?error=InvalidDomain` otherwise).
- JWT session strategy. The `jwt` callback **re-validates against the DB on every request** and returns `null` (killing the session) if the user no longer exists in the DB — so resetting the DB logs everyone out. Token carries `id`, `role`, `faculty`, `nim`.
- Secret env var is `AUTH_SECRET`. Session augmentation types are in [src/next-auth.d.ts](src/next-auth.d.ts).

### Routing & access control: `src/proxy.ts` (NOT `middleware.ts`)
Next.js 16 renamed middleware to **`proxy.ts`**. [src/proxy.ts](src/proxy.ts) does role-based gating:
- Protected route prefixes: `/dashboard`, `/competitions/register`.
- `/dashboard/admin/web/*` → role `pdd_website` only.
- `/dashboard/admin/lo/*` → `liason_officer` or `pdd_website`.
- `/vote` → `liason_officer` or `pdd_website`.
- Everything else (`/`, `/competitions`, `/storyline`, images, `/api/auth`, `_next`) is public.
- Note: it reads `process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET` for the token — keep `AUTH_SECRET` set.

**Roles** (`Role` enum): `pdd_website` (full web admin), `liason_officer` (LO — registration/join-request approval), `viewer` (default).

### Data & domain layer
- DB access goes through the singleton Prisma client in [src/lib/prisma.ts](src/lib/prisma.ts), extended with `@prisma/extension-accelerate`.
- Domain logic / server actions live in `src/lib/*.ts` (`user.ts`, `team.ts`, `competition.ts`, `admin.ts`, `action.ts`, `filter.ts`) and `src/app/actions/*.ts` (e.g. `vote.ts`). Mutations call `revalidatePath(...)` to refresh affected routes — follow this pattern for new mutations.
- Server actions consistently return an `ActionResult<T>` shape (`{ success, error? , data? }`) — see [src/types/action.md.ts](src/types/action.md.ts).
- [src/lib/filter.ts](src/lib/filter.ts) is a `bad-words` profanity filter extended with Indonesian vocabulary, used to validate user-supplied names.

### Image uploads (local filesystem)
[src/app/api/image/upload/route.ts](src/app/api/image/upload/route.ts) accepts a file (≤5MB), converts to WebP with `sharp`, and writes to `public/uploads/` on the local filesystem — there is no cloud storage. In production this directory is bind-mounted (see `docker-compose.yml`) so uploads persist across container restarts. Server actions allow up to 10MB bodies (`next.config.ts`).

### Types convention
Type modules use a `.md.ts` filename suffix (e.g. `competition.md.ts`) and are imported **without the `.ts`**: `import { MatchWithTeams } from "@/types/competition.md"`. Don't be confused — these are TypeScript files, not Markdown.

### Prisma schema highlights ([prisma/schema.prisma](prisma/schema.prisma))
- Enums: `Role`, `Faculty` (SBM/SCI/SOT/SIFT/SOM/SOP/SOC), `RegistrationStatus`, `CompetitionMatchStatus` (UPCOMMING/ONGOING/COMPLETED — note spelling), `CompetitionMatchType` (QUARTERFINAL/SEMIFINAL/FINAL), `CompetitionCategory` (Sports/ESports/Arts/Learnings).
- NextAuth models: `User`, `Account`, `Session`, `VerificationToken`.
- Domain: `Competition` (+ `Rules`), `Team`, `TeamMember`, `CompetitionRegistration`, `Match`, `Vote`.
- Key constraints: one registration per `(user, competition)`; unique team `(name, competition)`; a `team_referal_code` per team for join-by-code.

## Path aliases
`@/*` → `./src/*` (tsconfig `moduleResolution: bundler`). Import as `@/lib/prisma`, `@/components/...`, `@/types/...`.

## Deployment
- CI/CD: [.github/workflows/deploy.yml](.github/workflows/deploy.yml) — on push to `main`, runs typecheck + tests, builds a Docker image, pushes to GHCR (`ghcr.io/ucyenyen/rectorcupuc-2026:latest`), then SSHes to a VPS and `docker compose pull && up -d`.
- The container starts with `prisma migrate deploy && pnpm start` (`Dockerfile`), so **migrations run automatically on deploy** — commit migration files with schema changes.
- Runs behind Nginx Proxy Manager with **WebSocket support enabled** (required for Socket.IO). PostgreSQL is external, not in compose.

## Required environment variables
`DATABASE_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `AUTH_SECRET`, `AUTH_URL`, `NEXT_PUBLIC_APP_URL`. (The Pusher/Soketi vars in `.env.example` are stale — the app uses the in-process Socket.IO server, not Pusher.)
