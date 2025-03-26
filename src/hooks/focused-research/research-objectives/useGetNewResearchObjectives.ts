import { foundryClient } from "../../../main";
import {
  extractResearchObjectivesAndGoals,
  ResearchObjective,
} from "@researchos/sdk";
import { Osdk } from "@osdk/client";
import { useQuery } from "@tanstack/react-query";

async function queryFn(
  newObjective: string,
  researchObjective: Osdk.Instance<ResearchObjective> | undefined
) {
  if (!researchObjective) return;
  if (newObjective.length === 0) return;

  const researchObjectivesAndGoals = await foundryClient(
    extractResearchObjectivesAndGoals
  ).executeFunction({
    newObjective,
    researchObjective,
  });

  return researchObjectivesAndGoals;
}

export function useGetNewResearchObjectives(
  newObjective: string,
  researchObjective: Osdk.Instance<ResearchObjective> | undefined
) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["new-research-objectives", newObjective, researchObjective],
    queryFn: () => queryFn(newObjective, researchObjective),
  });

  return {
    newResearchObjectives: data,
    isLoadingNewResearchObjectives: isLoading,
    errorNewResearchObjectives: error,
  };
}
