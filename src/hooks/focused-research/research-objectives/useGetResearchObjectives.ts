import { useQuery } from "@tanstack/react-query";
import { foundryClient } from "../../../main";
import { ResearchObjective } from "@researchos/sdk";
import { Osdk } from "@osdk/client";

async function queryFn() {

    const researchObjectives: Osdk.Instance<ResearchObjective>[] = []

    for await (const researchObjective of foundryClient(ResearchObjective).asyncIter()) {
        researchObjectives.push(researchObjective)
    }

    return researchObjectives
}

export function useGetResearchObjectives() {

    const { data, isLoading, error } = useQuery({
        queryKey: ["research-objectives"],
        queryFn,
    });

    return {
        researchObjectives: data,
        researchObjectivesLoading: isLoading,
        researchObjectivesError: error,
    }
}