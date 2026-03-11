import { supabase } from "./supabase";

export interface Organization {
  id: string;
  name: string;
  type: string;
  created_at: string;
}

export interface OrganizationRole {
  id: string;
  organization_id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface OrganizationMember {
  id: string;
  organization_id: string;
  user_id: string;
  role_id: string;
  created_at: string;
}

export async function fetchUserOrganizations(): Promise<Organization[]> {
  const { data, error } = await supabase
    .from("organizations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function createOrganization(
  name: string,
  type: string,
): Promise<Organization> {
  const { data, error } = await supabase.rpc("create_organization", {
    org_name: name,
    org_type: type,
  });

  if (error) throw error;
  return data;
}
