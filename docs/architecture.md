# Architecture

## Overview

Promin is a single-page React application with a Supabase backend. The frontend is built with Vite and uses React Router v7 for client-side routing. All data fetching goes through Supabase's JavaScript client, managed by React Query for caching and synchronization.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18.3 + TypeScript 5 |
| Build | Vite 6.3 |
| Routing | React Router v7 (createBrowserRouter) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Backend | Supabase (PostgreSQL + Auth + RLS) |
| Server State | React Query (@tanstack/react-query) |
| Forms | React Hook Form |
| Charts | Recharts |
| Icons | lucide-react, MUI Material Icons |
| i18n | i18next + react-i18next |
| Animations | motion (Framer Motion), tw-animate-css |
| Toasts | sonner |
| Linting | ESLint 9 + husky + lint-staged |

## Directory Structure

```
src/
├── main.tsx                    # Entry point — imports i18n, renders App
├── vite-env.d.ts               # Vite client type declarations
├── app/
│   ├── App.tsx                 # QueryClientProvider + RouterProvider
│   ├── AuthContext.tsx          # Supabase auth state + useAuth() hook
│   ├── routes.ts               # All route definitions
│   ├── components/
│   │   ├── AuthLayout.tsx      # Split-screen layout for auth pages
│   │   ├── DashboardLayout.tsx # Minimal wrapper for dashboard pages
│   │   ├── OrgLayout.tsx       # Sidebar + TopNav for org-level pages
│   │   ├── BranchLayout.tsx    # Sidebar + TopNav for branch-level pages
│   │   ├── ProtectedRoute.tsx  # Auth guard + public route redirect
│   │   ├── TopNav.tsx          # Top navigation (3 variants)
│   │   ├── OrganizationCard.tsx
│   │   ├── Logo.tsx
│   │   └── ui/                 # shadcn/ui primitives (button, card, input, etc.)
│   └── pages/
│       ├── SignIn.tsx, SignUp.tsx, ForgotPassword.tsx
│       ├── Organizations.tsx, NewOrganization.tsx
│       ├── OrgBranches.tsx, OrgTeam.tsx, OrgIntegrations.tsx
│       ├── OrgUsage.tsx, OrgBilling.tsx, OrgSettings.tsx
│       ├── BranchOverview.tsx, BranchPlaceholder.tsx
├── hooks/
│   └── useOrganizations.ts     # React Query hook for org CRUD
├── lib/
│   ├── supabase.ts             # Supabase client singleton
│   ├── organizations.ts        # Organization API functions
│   └── i18n.ts                 # i18next configuration
├── locales/
│   └── en.json                 # English translation strings
└── styles/
    ├── index.css               # Master import
    ├── fonts.css               # Inter font (Google Fonts)
    ├── tailwind.css            # Tailwind v4 source config
    └── theme.css               # CSS custom properties (dark theme)

supabase/
├── config.toml                 # Local Supabase configuration
└── migrations/                 # SQL migration files

docs/
├── architecture.md             # This file
├── domain.md                   # Domain model & business logic
└── roadmap.md                  # Development roadmap
```

## Routing

All routes are defined in `src/app/routes.ts` using `createBrowserRouter`.

| Route Pattern | Guard | Layout | Page |
|---------------|-------|--------|------|
| `/` | — | — | Redirects to `/dashboard/sign-in` |
| `/dashboard/sign-in` | PublicRoute | AuthLayout | SignIn |
| `/dashboard/sign-up` | PublicRoute | AuthLayout | SignUp |
| `/dashboard/forgot-password` | PublicRoute | AuthLayout | ForgotPassword |
| `/dashboard/organizations` | ProtectedRoute | DashboardLayout | Organizations |
| `/dashboard/new` | ProtectedRoute | DashboardLayout | NewOrganization |
| `/dashboard/org/:orgId` | ProtectedRoute | OrgLayout | OrgBranches (index) |
| `/dashboard/org/:orgId/team` | ProtectedRoute | OrgLayout | OrgTeam |
| `/dashboard/org/:orgId/integrations` | ProtectedRoute | OrgLayout | OrgIntegrations |
| `/dashboard/org/:orgId/usage` | ProtectedRoute | OrgLayout | OrgUsage |
| `/dashboard/org/:orgId/billing` | ProtectedRoute | OrgLayout | OrgBilling |
| `/dashboard/org/:orgId/settings` | ProtectedRoute | OrgLayout | OrgSettings |
| `/dashboard/org/:orgId/branch/:branchId` | ProtectedRoute | BranchLayout | BranchOverview (index) |
| `/dashboard/org/:orgId/branch/:branchId/*` | ProtectedRoute | BranchLayout | BranchPlaceholder |

Branch sub-pages (placeholder): suppliers, query, contacts, access, documents, automations, activity, insights, analytics, logs, integrations, settings.

## Layout Hierarchy

```
App
├── PublicRoute (redirects authenticated users to /dashboard/organizations)
│   └── AuthLayout (split-screen: left branding, right form)
│       └── SignIn / SignUp / ForgotPassword
└── ProtectedRoute (redirects unauthenticated users to /dashboard/sign-in)
    ├── DashboardLayout (minimal wrapper)
    │   └── Organizations / NewOrganization
    ├── OrgLayout (sidebar + TopNav variant="org")
    │   └── OrgBranches / OrgTeam / OrgIntegrations / OrgUsage / OrgBilling / OrgSettings
    └── BranchLayout (sidebar + TopNav variant="branch")
        └── BranchOverview / BranchPlaceholder
```

## Data Flow

1. **Auth**: `AuthContext` wraps the app, provides `useAuth()` with user/session state + signIn/signUp/signOut/resetPassword methods. Backed by Supabase Auth.
2. **Organizations**: `useOrganizations()` hook (React Query) calls `lib/organizations.ts` → Supabase client → `organizations` table with RLS.
3. **Creation**: `create_organization()` PostgreSQL function (security definer) atomically creates org + owner role + membership.
4. **Other pages**: Currently use mock/static data. Will be migrated to Supabase queries.

## Conventions

- **Components**: Function declarations, not arrow functions
- **Imports**: `@/` alias enforced by ESLint (no relative `../` imports)
- **Styling**: Tailwind classes + `cn()` helper from `@/app/components/ui/utils`
- **Text**: All user-facing strings via `useTranslation()` / `t()` from i18n
- **shadcn/ui**: Components use `data-slot` attributes for styling hooks
- **Env vars**: Prefixed with `VITE_` for Vite exposure
- **npm**: Always use `--legacy-peer-deps` due to peer dependency conflicts

## Design Tokens

| Token | Value |
|-------|-------|
| Brand green | `#3ecf8e` |
| Background | `#171717` |
| Cards/inputs | `#1e1e1e` |
| Borders | `#2e2e2e` |
| Primary text | `#ffffff` |
| Secondary text | `#d4d4d4` |
| Muted text | `#a3a3a3` |
| Border radius | `0.625rem` (10px) |
| Font | Inter (300–700) |
