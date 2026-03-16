# Domain Model

## Core Concepts

### Organization
The top-level entity. Every user belongs to one or more organizations. Organizations own branches, team members, integrations, and billing.

| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| name | text | Display name |
| type | text | "Personal" or "Team" |
| created_at | timestamptz | Creation timestamp |

### Organization Role
Each organization defines its own roles. The "owner" role is automatically seeded on creation. Custom roles can be added later for fine-grained permissions.

| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| organization_id | uuid | FK → organizations |
| name | text | Role name (unique per org) |
| description | text | Human-readable description |

### Organization Member
Links users to organizations with a specific role.

| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| organization_id | uuid | FK → organizations |
| user_id | uuid | FK → auth.users |
| role_id | uuid | FK → organization_roles |

### Branch (planned)
A project environment within an organization. Branches represent isolated workspaces (e.g., production, staging, dev).

Planned fields: id, org_id, name, region, status, created_at.

### Integration (planned)
Third-party service connections per organization.

### Invoice (planned)
Billing records per organization.

## Relationships

```
User (auth.users)
  └── belongs to many → Organization (via organization_members)
                           ├── has many → Organization Roles
                           ├── has many → Organization Members
                           ├── has many → Branches (planned)
                           ├── has many → Integrations (planned)
                           └── has many → Invoices (planned)
```

## Access Control

All tables use Row Level Security (RLS):

- **Organizations**: Users can only see orgs they are members of. Anyone can create. Only owners can update/delete.
- **Organization Roles**: Members can view their org's roles. Only owners can manage (create/update/delete).
- **Organization Members**: Users can view their own membership records. Users can insert themselves as members.

### Organization Creation Flow

The `create_organization()` function (security definer) performs three atomic steps:
1. Insert the organization
2. Create the "owner" role for that org
3. Add the current user as a member with the owner role

This avoids RLS circular dependency issues (can't check membership before org exists).

## Business Rules

- Every organization must have at least one owner
- The "owner" role is system-managed and cannot be deleted
- Organization names are not unique (users identify by ID)
- Organization types: "Personal" (single user) or "Team" (multi-user)
- Branch status types: active, paused (displayed as badges)

## Current Data Status

| Entity | Backend Status |
|--------|---------------|
| Organizations | Connected to Supabase (CRUD via React Query) |
| Organization Roles | Schema exists, not yet surfaced in UI |
| Organization Members | Schema exists, not yet surfaced in UI |
| Branches | Mock data only |
| Team Members | Mock data only |
| Integrations | Mock data only |
| Usage/Billing | Mock data only |
