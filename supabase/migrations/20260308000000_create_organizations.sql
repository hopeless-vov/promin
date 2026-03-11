-- Organizations table
create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null default 'Personal',
  created_at timestamptz not null default now()
);

-- Organization roles: each org defines its own roles.
-- Owners can create custom roles and assign permissions to them later.
create table public.organization_roles (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  description text,
  created_at timestamptz not null default now(),
  unique (organization_id, name)
);

-- Organization members table
create table public.organization_members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role_id uuid not null references public.organization_roles(id),
  created_at timestamptz not null default now(),
  unique (organization_id, user_id)
);

-- Enable RLS
alter table public.organizations enable row level security;
alter table public.organization_roles enable row level security;
alter table public.organization_members enable row level security;

-- organization_roles: members of the org can read roles
create policy "Org members can view their org roles"
  on public.organization_roles for select
  using (
    exists (
      select 1 from public.organization_members
      where organization_members.organization_id = organization_roles.organization_id
        and organization_members.user_id = auth.uid()
    )
  );

-- organization_roles: only owners can manage roles
-- (checked via a security definer helper to avoid recursion)
create policy "Owners can manage org roles"
  on public.organization_roles for all
  using (
    exists (
      select 1 from public.organization_members om
      join public.organization_roles r on r.id = om.role_id
      where om.organization_id = organization_roles.organization_id
        and om.user_id = auth.uid()
        and r.name = 'owner'
    )
  );

-- Policies: users can only see orgs they are members of
create policy "Users can view their organizations"
  on public.organizations for select
  using (
    exists (
      select 1 from public.organization_members
      where organization_members.organization_id = organizations.id
        and organization_members.user_id = auth.uid()
    )
  );

create policy "Users can insert organizations"
  on public.organizations for insert
  with check (true);

create policy "Owners can update their organizations"
  on public.organizations for update
  using (
    exists (
      select 1 from public.organization_members om
      join public.organization_roles r on r.id = om.role_id
      where om.organization_id = organizations.id
        and om.user_id = auth.uid()
        and r.name = 'owner'
    )
  );

create policy "Owners can delete their organizations"
  on public.organizations for delete
  using (
    exists (
      select 1 from public.organization_members om
      join public.organization_roles r on r.id = om.role_id
      where om.organization_id = organizations.id
        and om.user_id = auth.uid()
        and r.name = 'owner'
    )
  );

-- organization_members: direct uid check avoids infinite recursion
create policy "Users can view members of their organizations"
  on public.organization_members for select
  using (user_id = auth.uid());

create policy "Users can insert themselves as members"
  on public.organization_members for insert
  with check (user_id = auth.uid());

-- Indexes
create index idx_org_roles_org_id on public.organization_roles(organization_id);
create index idx_org_members_org_id on public.organization_members(organization_id);
create index idx_org_members_user_id on public.organization_members(user_id);

-- Atomic function: creates org, seeds owner role, adds creator as owner
create or replace function public.create_organization(org_name text, org_type text)
returns public.organizations
language plpgsql
security definer
set search_path = public
as $$
declare
  new_org   public.organizations;
  owner_role public.organization_roles;
begin
  insert into public.organizations (name, type)
  values (org_name, org_type)
  returning * into new_org;

  insert into public.organization_roles (organization_id, name, description)
  values (new_org.id, 'owner', 'Organization owner with full control')
  returning * into owner_role;

  insert into public.organization_members (organization_id, user_id, role_id)
  values (new_org.id, auth.uid(), owner_role.id);

  return new_org;
end;
$$;
