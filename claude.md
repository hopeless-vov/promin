# Promin — SRM Dashboard

## Project Overview
Organization & Supplier Relationship Management dashboard. React + TypeScript + Vite. Started from Figma export, evolving into production app with Supabase backend.

## Tech Stack
- **Framework**: React 18.3, TypeScript, Vite 6.3
- **Routing**: React Router v7 (createBrowserRouter)
- **Styling**: Tailwind CSS v4 + shadcn/ui components + inline styles (dark theme)
- **Backend**: Supabase (auth, database, realtime) — local dev on localhost:54321
- **Forms**: React Hook Form
- **Charts**: Recharts
- **Icons**: lucide-react, MUI Material Icons
- **Animation**: motion (Framer Motion), tw-animate-css
- **Notifications**: sonner (toasts)

## Project Structure
```
src/
  main.tsx                  # Entry point
  app/
    App.tsx                 # RouterProvider wrapper
    routes.ts               # All route definitions
    components/
      AuthLayout.tsx        # Split-screen auth pages
      DashboardLayout.tsx   # Minimal wrapper
      OrgLayout.tsx         # Sidebar + TopNav for org pages
      BranchLayout.tsx      # Sidebar + TopNav for branch pages
      TopNav.tsx            # 3 variants: plain, org, branch
      Logo.tsx              # Green triangle + "SRM"w
      ui/                   # shadcn/ui primitives
      figma/                # Figma export helpers
    pages/
      SignIn.tsx, SignUp.tsx, ForgotPassword.tsx  # Auth
      Organizations.tsx, NewOrganization.tsx      # Dashboard
      OrgBranches.tsx, OrgTeam.tsx, OrgIntegrations.tsx,
      OrgUsage.tsx, OrgBilling.tsx, OrgSettings.tsx  # Org
      BranchOverview.tsx, BranchPlaceholder.tsx      # Branch
  styles/
    index.css               # Imports all CSS
    fonts.css               # Inter font (Google Fonts)
    tailwind.css            # Tailwind v4 source config
    theme.css               # CSS custom properties (light/dark)
```

## Route Structure
- `/dashboard/sign-in|sign-up|forgot-password` → AuthLayout
- `/dashboard/organizations|new` → DashboardLayout
- `/dashboard/org/:orgId/*` → OrgLayout (branches, team, integrations, usage, billing, settings)
- `/dashboard/org/:orgId/branch/:branchId/*` → BranchLayout (overview + many placeholder pages)

## Design Tokens
- **Brand green**: #3ecf8e
- **Background**: #171717
- **Cards/inputs**: #1e1e1e
- **Borders**: #2e2e2e
- **Text**: #ffffff, #d4d4d4, #a3a3a3
- **Destructive**: #a37c52 (paused), #d4183d (error)
- **Border radius**: 0.625rem (10px)
- **Font**: Inter (300–700)

## Coding Conventions
- Use function declarations for components (not arrow functions)
- shadcn/ui components use `data-slot` attributes
- Use `cn()` helper from `./utils` for class merging
- Path alias: `@` → `./src`
- Inline styles are common (Figma export legacy) — migrate to Tailwind when editing
- All pages currently use mock/hardcoded data — replace with Supabase calls
- Environment variables prefixed with `VITE_` for Vite exposure

## Environment Variables
```
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_ANON_KEY=<anon-key>
```

## Current State
- UI is fully built from Figma designs (static/mock data)
- No backend integration yet — Supabase being connected
- No state management library (local state only)
- No tests yet
- Many branch sub-pages are placeholders
