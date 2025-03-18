import { useQuery } from "@tanstack/react-query";
import { SemanticScholarPapersGraph } from "../../semantic-scholar-papers-graph";

async function queryFn(query: string) {
  const semanticScholarPapersGraph = new SemanticScholarPapersGraph();
  const suggestions = await semanticScholarPapersGraph.getSuggestions(query);
  return suggestions;
}

export function useGetSuggestions(query: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["suggestions", query],
    queryFn: () => queryFn(query),
  });

  return {
    suggestions: data,
    isLoadingSuggestions: isLoading,
    errorSuggestions: error,
  };
}