import { useQuery } from "@tanstack/react-query";
import { SemanticScholarPapersGraph } from "../../semantic-scholar-papers-graph";

async function queryFn(query: string) {
  if (!query.trim()) {
    return { matches: [] };
  }
  const semanticScholarPapersGraph = new SemanticScholarPapersGraph();
  const suggestions = await semanticScholarPapersGraph.getSuggestions(query);
  return suggestions;
}

export function useGetSuggestions(query: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["suggestions", query],
    queryFn: () => queryFn(query),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: query.trim().length > 0,
  });

  return {
    suggestions: data,
    isLoadingSuggestions: isLoading,
    errorSuggestions: error,
  };
}