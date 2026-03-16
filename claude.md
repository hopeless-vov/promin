# Promin — SRM Dashboard

## Project Overview
Supplier Relationship Management dashboard. Users create organizations, manage branches (project environments), invite team members, configure integrations, and monitor usage/billing. React + TypeScript + Vite. Started from Figma export, evolving into production app with Supabase backend.

## Tech Stack
- **Framework**: React 18.3, TypeScript 5, Vite 6.3
- **Routing**: React Router v7 (createBrowserRouter)
- **Styling**: Tailwind CSS v4 + shadcn/ui components (dark theme)
- **Backend**: Supabase (auth, database, RLS, realtime) — local dev on localhost:54321
- **State**: React Query (@tanstack/react-query) for server state, local state elsewhere
- **Forms**: React Hook Form
- **Charts**: Recharts
- **Icons**: lucide-react, MUI Material Icons
- **i18n**: i18next + react-i18next (English only, extensible)
- **Animation**: motion (Framer Motion), tw-animate-css
- **Notifications**: sonner (toasts)
- **Linting**: ESLint 9 (flat config) + husky + lint-staged (auto-fix on commit)

## Project Structure
```
src/
  main.tsx                  # Entry point, imports i18n
  vite-env.d.ts             # Vite client type reference
  app/
    App.tsx                 # QueryClientProvider + RouterProvider
    AuthContext.tsx          # Supabase auth (useAuth hook)
    routes.ts               # All route definitions
    components/
      AuthLayout.tsx        # Split-screen auth pages
      DashboardLayout.tsx   # Minimal wrapper
      OrgLayout.tsx         # Sidebar + TopNav for org pages
      BranchLayout.tsx      # Sidebar + TopNav for branch pages
      ProtectedRoute.tsx    # Auth guard (ProtectedRoute + PublicRoute)
      TopNav.tsx            # 3 variants: plain, org, branch
      OrganizationCard.tsx  # Org card component
      Logo.tsx              # Green triangle + "SRM"
      ui/                   # shadcn/ui primitives
    pages/
      SignIn.tsx, SignUp.tsx, ForgotPassword.tsx  # Auth
      Organizations.tsx, NewOrganization.tsx      # Dashboard
      OrgBranches.tsx, OrgTeam.tsx, OrgIntegrations.tsx,
      OrgUsage.tsx, OrgBilling.tsx, OrgSettings.tsx  # Org
      BranchOverview.tsx, BranchPlaceholder.tsx      # Branch
  hooks/
    useOrganizations.ts     # React Query hook for orgs CRUD
  lib/
    supabase.ts             # Supabase client instance
    organizations.ts        # Org API functions (fetch, create)
    i18n.ts                 # i18next configuration
  locales/
    en.json                 # English translations
  styles/
    index.css               # Imports all CSS
    fonts.css               # Inter font (Google Fonts)
    tailwind.css            # Tailwind v4 source config
    theme.css               # CSS custom properties (light/dark)
supabase/
  config.toml               # Local Supabase config
  migrations/               # SQL migrations (organizations, roles, members, RLS)
docs/
  architecture.md           # Project architecture & structure
  domain.md                 # Domain model & business logic
  roadmap.md                # Development roadmap & phases
```

## Route Structure
- `/` → redirects to `/dashboard/sign-in`
- `/dashboard/sign-in|sign-up|forgot-password` → PublicRoute → AuthLayout
- `/dashboard/organizations|new` → ProtectedRoute → DashboardLayout
- `/dashboard/org/:orgId/*` → ProtectedRoute → OrgLayout (branches, team, integrations, usage, billing, settings)
- `/dashboard/org/:orgId/branch/:branchId/*` → ProtectedRoute → BranchLayout (overview + placeholder pages)

## Database Schema (Supabase)
- `organizations` (id, name, type, created_at) — RLS by membership
- `organization_roles` (id, organization_id, name, description) — seeded with "owner" on org creation
- `organization_members` (id, organization_id, user_id, role_id) — links users to orgs with roles
- `create_organization()` — security definer function: creates org + owner role + adds creator

## Design Tokens
- **Brand green**: #3ecf8e
- **Background**: #171717
- **Cards/inputs**: #1e1e1e
- **Borders**: #2e2e2e
- **Text**: #ffffff, #d4d4d4, #a3a3a3
- **Border radius**: 0.625rem (10px)
- **Font**: Inter (300–700)

## Coding Conventions
- Function declarations for components (not arrow functions)
- shadcn/ui components use `data-slot` attributes
- `cn()` helper from `@/app/components/ui/utils` for class merging
- Path alias: `@` → `./src` (enforced by ESLint — no `../` imports)
- All user-facing text must come from i18n translations (`useTranslation()`)
- Environment variables prefixed with `VITE_`
- Use `--legacy-peer-deps` for all npm installs

## Environment Variables
```
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_ANON_KEY=<anon-key>
```

## Current State
- UI fully built from Figma designs
- Auth flow wired to Supabase (sign in, sign up, forgot password, protected routes)
- Organizations: create + list connected to Supabase with React Query
- i18n set up with English translations for all pages
- ESLint configured with strict rules, auto-fix on commit
- Many branch sub-pages are still placeholders
- Most org pages still use mock data (team, integrations, usage, billing)
- No tests yet

## What to Update
When making changes, also update:
1. This file (`claude.md`) if architecture, conventions, or state changes
2. `docs/architecture.md` if structure or tech changes
3. `docs/domain.md` if new entities or business logic
4. `docs/roadmap.md` — mark completed items, add new ones
5. `src/locales/en.json` if adding new user-facing text
