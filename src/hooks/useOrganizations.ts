import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchUserOrganizations,
  createOrganization,
} from "../lib/organizations";

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
