# Supabase Integration Plan — Promin SRM Dashboard

## Completed
- [x] Install `@supabase/supabase-js`
- [x] Fix `.env` vars (`REACT_APP_` → `VITE_`)
- [x] Create Supabase client (`src/lib/supabase.ts`)
- [x] Create `AuthContext` + `useAuth()` hook
- [x] Wrap App with `AuthProvider`
- [x] Add `tsconfig.json` with path alias

## Phase 1 — Refactor Flow
- [ ] Refactor all colors and styles to use Tailwind (remove inline styles from Figma export)
- [ ] Refactor components to use smaller components and better structure (e.g. split `Organizations.tsx` into `OrganizationList.tsx` and `OrganizationCard.tsx` or use the same layout as `OrgBranches.tsx` with sidebar, heder (which gonna change context as well depending on where are you) and main content)

## Phase 2 — Auth Flow
- [ ] Wire `SignIn.tsx` to `useAuth().signIn()` with form validation & error handling
- [ ] Wire `SignUp.tsx` to `useAuth().signUp()` with form validation & error handling
- [ ] Wire `ForgotPassword.tsx` to `useAuth().resetPassword()`
- [ ] Add GitHub OAuth flow (`supabase.auth.signInWithOAuth({ provider: 'github' })`)
- [ ] Create auth guard (redirect unauthenticated users to `/dashboard/sign-in`)
- [ ] Redirect authenticated users away from auth pages to `/dashboard/organizations`
- [ ] Handle auth loading state (spinner/skeleton while session resolves)

## Phase 3 — Database Schema
- [ ] Design and create Supabase tables:
  - `organizations` (id, name, slug, type, plan, owner_id, created_at)
  - `branches` (id, org_id, name, region, status, created_at)
  - `team_members` (id, org_id, user_id, role, mfa_enabled, invited_at)
  - `integrations` (id, org_id, provider, status, connected_at)
  - `invoices` (id, org_id, amount, status, period, created_at)
- [ ] Set up Row Level Security (RLS) policies per table
- [ ] Create Supabase migrations for version control

## Phase 4 — Replace Mock Data with Supabase Queries
- [ ] `Organizations.tsx` — fetch user's orgs from `organizations` table
- [ ] `NewOrganization.tsx` — insert into `organizations` table
- [ ] `OrgBranches.tsx` — fetch branches for current org
- [ ] `OrgTeam.tsx` — fetch team members, handle invite flow
- [ ] `OrgIntegrations.tsx` — fetch integration statuses
- [ ] `OrgUsage.tsx` — fetch usage metrics (API requests, storage)
- [ ] `OrgBilling.tsx` — fetch plan info and invoice history
- [ ] `OrgSettings.tsx` — update org name/slug, handle delete
- [ ] `BranchOverview.tsx` — fetch branch stats and activity feed
- [ ] `TopNav.tsx` — fetch orgs/branches for dropdowns (replace mock data)
- [ ] `OrgLayout.tsx` — fetch org list for sidebar switcher

## Phase 5 — Realtime & Polish
- [ ] Subscribe to realtime updates on `branches` table (status changes)
- [ ] Subscribe to `team_members` changes (new invites)
- [ ] Add optimistic updates for common mutations
- [ ] Add error toasts (sonner) for failed Supabase operations
- [ ] Add loading skeletons to all data-fetching pages

## Notes
- Local Supabase runs on `http://127.0.0.1:54321`
- All components use function declarations and `cn()` for class merging
- Existing code uses relative imports (not `@/` alias)
- Pages heavily use inline styles from Figma export — migrate to Tailwind as needed
