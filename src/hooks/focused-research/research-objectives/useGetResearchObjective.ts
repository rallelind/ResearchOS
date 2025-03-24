import { useQuery } from "@tanstack/react-query";
import { isOk, Osdk, Result } from "@osdk/client";
import { ResearchObjective } from "@researchos/sdk";
import { foundryClient } from "../../../main";

async function queryFn(id: string) {
  const response: Result<Osdk.Instance<ResearchObjective>> =
    await foundryClient(ResearchObjective).fetchOneWithErrors(id);

  if (!isOk(response)) {
    throw response.error;
  }

  return response.value;
}

export function useGetResearchObjective(id: string) {
  const { data, isLoading, error } = useQuery({
    queryFn: () => queryFn(id),
    queryKey: ["research-objective", id],
  });

  return {
    researchObjective: data,
    researchObjectiveLoading: isLoading,
    researchObjectiveError: error,
  };
}
