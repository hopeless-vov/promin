import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createOrganization,
  fetchUserOrganizations,
} from "@/lib/organizations";

export function useOrganizations() {
  return useQuery({
    queryKey: ["organizations"],
    queryFn: fetchUserOrganizations,
  });
}

export function useCreateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, type }: { name: string; type: string }) =>
      createOrganization(name, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
}
