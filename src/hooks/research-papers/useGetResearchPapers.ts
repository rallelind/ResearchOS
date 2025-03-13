import { ResearchPaper } from "@researchos/sdk";
import { Osdk, PageResult, Result, isOk } from "@osdk/client";
import { foundryClient } from "../../main";
import { useQuery } from "@tanstack/react-query";

const QUERY_KEY = ["research-papers"];

async function queryFn() {
    const response:  Result<PageResult<Osdk.Instance<ResearchPaper>>>
    = await foundryClient(ResearchPaper).fetchPageWithErrors({ $pageSize: 30 });

    if (isOk(response)) {
        return response.value;
    }

    throw new Error(response.error.message);
}

export function useGetResearchPapers() {
  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEY,
    queryFn,
  });

  return {
    data,
    isLoading,
    error,
  };
}
