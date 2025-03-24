import { useMutation } from "@tanstack/react-query";
import { createResearchObjective } from "@researchos/sdk";
import { foundryClient } from "../../../main";
import { useCallback } from "react";

async function mutationFn(title: string): Promise<string> {
  const result = await foundryClient(createResearchObjective).applyAction(
    {
      research_objective_title: title,
      research_objective: "",
    },
    {
      $returnEdits: true,
    }
  );

  const researchObjective = result?.addedObjects?.[0];

  if (!researchObjective) { 
    throw new Error("Failed to create research objective");
  }

  return researchObjective.primaryKey as string;
}

export function useCreateResearchObjective( ) {
  const { mutateAsync, isPending, isSuccess, data } = useMutation({
    mutationFn,
  });

  const handleCreateResearchObjective = useCallback(async (title: string) => {
    const result = await mutateAsync(title);
    return result;
  }, [mutateAsync]);

  return {
    createResearchObjectiveIsPending: isPending,
    createResearchObjectiveIsSuccess: isSuccess,
    createdResearchObjectiveId: data,
    handleCreateResearchObjective,
  };
}
