# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- Framework: Next.js (App Router) with TypeScript and Turbopack
- Package manager: pnpm (pnpm-lock.yaml present)
- Styling: Tailwind CSS v4 (via @tailwindcss/postcss)
- Auth: next-auth with Google provider + PrismaAdapter
- Database: PostgreSQL via Prisma Client (with Accelerate extension)
- Code location: application code in src/, App Router pages in src/app, Prisma schema in prisma/

Required environment variables
- DATABASE_URL: PostgreSQL connection string for Prisma
- NEXTAUTH_SECRET: secret for NextAuth
- GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET: OAuth credentials for Google provider
- Note: Sign-in is allowed only for emails containing "ciputra.ac.id" or "gmail.com" (see src/lib/auth.ts).

Commands (pnpm)
- Install deps
  - pnpm install
- Dev server (Next.js + Turbopack)
  - pnpm dev
- Production build
  - pnpm build
- Start production server (after build)
  - pnpm start
- Lint (ESLint flat config with Next rules)
  - pnpm lint
  - Lint a specific file: pnpm exec eslint src/components/NavigationBar.tsx
- Type check (no script defined; use tsc directly)
  - pnpm exec tsc --noEmit
- Prisma
  - Generate client (run after editing prisma/schema.prisma): pnpm exec prisma generate
  - Create and apply a dev migration: pnpm exec prisma migrate dev --name <migration_name>
  - Apply migrations in deployment: pnpm exec prisma migrate deploy
  - Open Prisma Studio: pnpm exec prisma studio
  - Seed data: a prisma/seed.ts exists, but no seed script is configured. You can run it with a temporary runner: pnpm dlx tsx prisma/seed.ts

Tests (Jest)
- Run all tests: pnpm test
- Watch mode: pnpm test:watch
- Single file: pnpm test src/components/NavigationBar.test.tsx
- Single test name pattern: pnpm test -- -t "renders the navbar"
- CI run: pnpm test:ci
- Test files: place alongside source as *.test.ts or *.test.tsx under src/

High-level architecture
- App Router (src/app)
  - src/app/layout.tsx: Root layout. Wraps children with the app Provider (SessionProvider) and renders the NavigationBar. Injects Vercel Analytics/SpeedInsights. Sets default Metadata (title/description).
  - src/app/page.tsx: Landing page component.
  - API routes
    - src/app/api/auth/[...nextauth]/route.ts: NextAuth handler wired to authOptions from src/lib/auth.ts. Exposes GET/POST.
- Authentication (src/lib/auth.ts)
  - NextAuth configuration
    - PrismaAdapter(prisma) to persist users/sessions/accounts in Postgres.
    - GoogleProvider using GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET.
    - Session strategy: JWT.
    - pages.error: /auth/error.
  - Callbacks
    - signIn: restricts email domain to ciputra.ac.id or gmail.com. On accepted sign-ins, ensures user role is synchronized from DB and revalidates /dashboard.
    - jwt: enriches token with persisted user fields (id, name, email, image, role).
    - session: mirrors token fields onto session.user.
- Middleware (src/middleware.ts)
  - Uses next-auth/middleware. The function checks role-based access when the pathname starts with /admin; the exported matcher restricts /dashboard/:path*. Requests without a valid token redirect to /login; insufficient roles redirect to /unauthorized.
- Database and domain (prisma/ and src/lib)
  - Prisma client (src/lib/prisma.ts): Creates a singleton PrismaClient and extends with Accelerate. Uses global caching in dev to avoid multiple instances.
  - Prisma schema (prisma/schema.prisma)
    - Enums: Role (pdd_website, liason_officer, viewer), RegistrationStatus, CompetitionCategory.
    - Auth models: User, Account, Session, VerificationToken (matching NextAuth expectations).
    - Domain models: Competition, CompetitionRegistration, Team, TeamMember, Match, Vote with appropriate relations and uniqueness constraints (e.g., one registration per user per competition; unique team name within a competition).
  - Seed (prisma/seed.ts): Populates example competitions across Sports/ESports/Arts/Learnings.
  - Server actions and domain helpers (src/lib)
    - user.ts: Server actions to read/update/delete users. Includes role edits (with path revalidation) and a profanity-checked name update using a custom filter.
    - competition.ts: Prepared for competition-related server actions (imports Prisma and types); fill out as needed.
    - filter.ts: Profanity filter (bad-words) extended with Indonesian vocabulary; exported filter and word list.
- UI components (src/components)
  - Provider.tsx: Wraps children with SessionProvider for client components.
  - NavigationBar.tsx: Top nav with simple links (Competitions, Votes, Last Day); conditionally renders GoogleLogin or LogoutButton based on next-auth session.
  - GoogleLogin.tsx: Button that triggers signIn("google", { callbackUrl: "/" }).
  - LogoutButton.tsx: Button that triggers signOut().
- Styling
  - Tailwind v4 via PostCSS: postcss.config.mjs includes "@tailwindcss/postcss".
  - Global styles: src/app/globals.css imports tailwindcss and defines a few CSS variables/theme tokens.
- Type aliases (src/types)
  - action.md.ts, competition.md.ts, match.md.ts, user.md.ts: Project-level TypeScript types used in server actions and domain logic.

Path aliases and TS config
- tsconfig.json defines path alias @/* -> ./src/* and uses moduleResolution: bundler with Next.js plugin settings. Import code using paths like "@/lib/prisma" and "@/components/Provider".

Operational tips for future changes
- When modifying Prisma models, run: pnpm exec prisma generate and pnpm exec prisma migrate dev --name <name>, then restart the dev server if types change.
- After server actions update data, many functions already call revalidatePath to refresh relevant routes; lean on that pattern when adding new mutations.
- Authentication-dependent UI should be client components using useSession from next-auth/react (see NavigationBar) or server components reading session via next-auth helpers.
