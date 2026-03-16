# Promin — SRM Dashboard

Supplier Relationship Management dashboard for managing organizations, branches, team members, and integrations.

## Tech Stack

- **Frontend**: React 18.3 + TypeScript + Vite 6.3
- **Styling**: Tailwind CSS v4 + shadcn/ui (dark theme)
- **Routing**: React Router v7
- **Backend**: Supabase (auth, database, RLS)
- **Charts**: Recharts
- **i18n**: i18next + react-i18next (English, extensible)
- **Linting**: ESLint 9 (flat config) + husky + lint-staged

## Getting Started

```bash
npm install --legacy-peer-deps
npm run dev
```

### Supabase (local)

```bash
supabase start
```

Runs on `http://127.0.0.1:54321`. Copy anon key to `.env`:

```
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | Check lint errors |
| `npm run lint:fix` | Auto-fix lint errors |

## Project Structure

```
src/
  main.tsx                    # Entry point + i18n init
  vite-env.d.ts               # Vite client types
  app/
    App.tsx                   # RouterProvider
    AuthContext.tsx            # Supabase auth state
    routes.ts                 # All route definitions
    components/
      AuthLayout.tsx          # Split-screen auth pages
      DashboardLayout.tsx     # Minimal wrapper
      OrgLayout.tsx           # Sidebar + TopNav for org pages
      BranchLayout.tsx        # Sidebar + TopNav for branch pages
      ProtectedRoute.tsx      # Auth guard + public route redirect
      TopNav.tsx              # 3 variants: plain, org, branch
      OrganizationCard.tsx    # Org card for dashboard
      Logo.tsx                # Brand logo
      ui/                     # shadcn/ui primitives
    pages/                    # All page components
  hooks/
    useOrganizations.ts       # React Query hook for orgs
  lib/
    supabase.ts               # Supabase client
    organizations.ts          # Org API (fetch, create)
    i18n.ts                   # i18next config
  locales/
    en.json                   # English translations
  styles/                     # CSS (Tailwind, theme, fonts)
supabase/
  migrations/                 # Database migrations
  config.toml                 # Local Supabase config
docs/                         # Project & domain documentation
```

## Linting

ESLint runs automatically on commit via husky + lint-staged. Rules:
- 2-space indentation
- Auto-remove unused imports
- Alphabetical import sorting
- No relative parent imports (`../`) — use `@/` alias
- No raw text in JSX — must use i18n translations
- React hooks rules

## Documentation

See [docs/](docs/) for project architecture, domain model, and development roadmap.